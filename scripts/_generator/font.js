// 中文字体子集提取：从主题配置文本中提取所需字符，用 opentype.js 生成精简字体
// 输出格式由 zh_font.type 决定：woff（默认，体积约为 ttf 的一半）/ ttf
const opentype = require('opentype.js');
const path = require('path');
const fs = require('fs');
const zlib = require('zlib');
const crypto = require('crypto');
const { Buffer } = require('node:buffer');

// 生成字体的内容哈希（路由路径 → 8 位哈希），供资源指纹 filter 复用，
// 保证替换 _font/ 源字体或子集字符集变化后，字体 URL 指纹随之变化
const fontHashes = {};

module.exports = function (hexo) {
  hexo.extend.generator.register('subfont', locals => {
    const zhFont = hexo.theme.config.zh_font || {};
    const { enable, fontName, type, style } = zhFont;
    if (!enable) return;
    if (!fontName || !type || !Array.isArray(style)) {
      hexo.log.warn('zh_font 配置不完整：需指定 fontName/type/style');
      return;
    }
    if (type !== 'woff' && type !== 'ttf') {
      hexo.log.warn('zh_font.type 仅支持 woff / ttf，当前为 %s', type);
      return;
    }

    const sourceFolder = path.resolve(__dirname, '../../_font/');
    const text = getSubText(hexo);
    hexo.log.info('Extract subfont:', text);

    return style.map(subfont => {
      if (/[\/\\]|\.\./.test(subfont)) {
        hexo.log.warn('zh_font.style 含非法字符：%s', subfont);
        return null;
      }
      // 源字体优先使用 woff（体积更小），回退 ttf 以兼容用户自行替换的字体
      const source = ['.woff', '.ttf']
        .map(ext => path.resolve(sourceFolder, `${subfont}${ext}`))
        .find(p => fs.existsSync(p));
      if (!source) {
        hexo.log.warn('subfont: 未找到源字体 _font/%s.woff（或 .ttf）', subfont);
        return null;
      }
      const data = compress(text, { source, name: fontName, style: subfont, type }, hexo);
      if (!data) return null;
      const routePath = path.join('/font', `${subfont}.${type}`);
      fontHashes[routePath] = crypto.createHash('sha256').update(data).digest('hex').slice(0, 8);
      return {
        path: routePath,
        data: data
      };
    }).filter(Boolean);
  });
};

// 供资源指纹 filter 读取生成字体的内容哈希；必须在 module.exports 赋值之后挂载
module.exports._hashes = fontHashes;

function compress(text, { source, name, style, type }, hexo) {
  try {
    const notdefGlyph = new opentype.Glyph({ name: '.notdef', advanceWidth: 650, path: new opentype.Path() });
    const data = new Uint8Array(fs.readFileSync(source)).buffer;
    const font = opentype.parse(data);
    // 检测源字体中缺失的字符（如生僻字/繁体字超出 GB2312 子集范围）
    // 缺失字符从子集文本中剔除，避免 opentype.js 产生 "Undefined CHARARRAY" 警告；
    // 浏览器遇到这些字符时会以系统字体兜底显示
    const missing = new Set();
    const available = [];
    for (const ch of text) {
      const g = font.charToGlyph(ch);
      if (!g || g.name === '.notdef' || (g.unicode === undefined && g.name !== '.null')) {
        missing.add(ch);
      } else {
        available.push(ch);
      }
    }
    if (missing.size) {
      hexo.log.warn('subfont: 源字体缺失字符（将以系统字体兜底）：%s', Array.from(missing).join(' '));
    }
    const subGlyphs = font.stringToGlyphs(available.join(''));
    // 源字体经 pyftsubset 子集化后 post 表为 version 3（不含 glyph name），
    // opentype.js 解析时 glyph.name 为 undefined，构建新字体时会输出
    // "Undefined CHARARRAY" 警告。这里按 unicode 为每个 glyph 补一个合法 name。
    subGlyphs.forEach((g, i) => {
      if (!g.name || g.name === 'undefined') {
        g.name = g.unicode != null ? 'uni' + g.unicode.toString(16).toUpperCase() : 'glyph' + i;
      }
    });
    const glyphs = [notdefGlyph].concat(subGlyphs);
    const subFont = new opentype.Font({
      unitsPerEm: font.unitsPerEm,
      ascender: font.ascender,
      descender: font.descender,
      familyName: name,
      styleName: style,
      glyphs
    });
    return encode(Buffer.from(subFont.toArrayBuffer()), type);
  } catch (err) {
    hexo.log.warn('subfont compress failed for %s: %s', source, err && err.message);
    return null;
  }
}

// 将 sfnt（TTF）字节封装为 WOFF：逐表 zlib 压缩 + WOFF 头/目录重组。
// WOFF 结构见 https://www.w3.org/TR/WOFF/ ：44 字节头 + 20 字节/表目录 + 压缩表数据（4 字节对齐）
function encode(sfnt, type) {
  if (type !== 'woff') return sfnt;

  const numTables = sfnt.readUInt16BE(4); // sfnt 头：4 字节版本号 + UInt16 numTables
  const tables = [];
  let totalSfntSize = 12 + numTables * 16;
  for (let i = 0; i < numTables; i++) {
    const off = 12 + i * 16;
    tables.push({
      tag: sfnt.toString('latin1', off, off + 4),
      checksum: sfnt.readUInt32BE(off + 4),
      offset: sfnt.readUInt32BE(off + 8),
      length: sfnt.readUInt32BE(off + 12)
    });
    totalSfntSize += tables[i].length + ((4 - (tables[i].length % 4)) % 4);
  }

  const entries = [];
  let pos = 44 + numTables * 20;
  for (const t of tables) {
    const orig = sfnt.slice(t.offset, t.offset + t.length);
    const compressed = zlib.deflateSync(orig);
    const stored = compressed.length < orig.length ? compressed : orig; // 压缩无收益则原样存储
    entries.push({ ...t, data: stored, compLength: stored.length });
    pos += stored.length + ((4 - (stored.length % 4)) % 4);
  }

  const out = Buffer.alloc(pos);
  out.write('wOFF', 0, 'latin1');
  out.writeUInt32BE(sfnt.readUInt32BE(0), 4);          // flavor：沿用 sfnt 版本
  out.writeUInt32BE(pos, 8);                            // woff 总长度
  out.writeUInt16BE(numTables, 12);
  out.writeUInt16BE(0, 14);                             // reserved
  out.writeUInt32BE(totalSfntSize, 16);
  out.writeUInt16BE(1, 20);                             // majorVersion
  out.writeUInt16BE(0, 22);                             // minorVersion
  // metaOffset/metaLength/metaOrigLength/privOffset/privLength 均为 0（Buffer.alloc 已置零）

  let dataPos = 44 + numTables * 20;
  for (let i = 0; i < entries.length; i++) {
    const e = entries[i];
    const dirOff = 44 + i * 20;
    out.write(e.tag, dirOff, 'latin1');
    out.writeUInt32BE(dataPos, dirOff + 4);
    out.writeUInt32BE(e.compLength, dirOff + 8);
    out.writeUInt32BE(e.length, dirOff + 12);
    out.writeUInt32BE(e.checksum, dirOff + 16);
    e.data.copy(out, dataPos);
    dataPos += e.compLength + ((4 - (e.compLength % 4)) % 4);
  }
  return out;
}

// 从主题配置的各项文本中收集字符，去重排序后返回
function getSubText(hexo) {
  const c = hexo.theme.config || {};
  const idx = c.index || {};
  const projects = (c.projects && c.projects.enable && c.projects.items) || [];
  const skillGroups = (c.skills && c.skills.enable && c.skills.groups) || [];
  const text = [
    c.slogan,
    idx.about && idx.about.title,
    ...((c.subpage && c.subpage.pages) || []).map(p => p.description),
    ...((hexo.locals.get('tags') || []).map(tag => tag.name)),
    ...((idx.about && idx.about.text) || []),
    ...(idx.poem || []),
    ...((c.reward && c.reward.text) || []),
    ...((c.foot && c.foot.title) || []),
    // 新增功能文案：公告 / 项目 / 技能 / 建站时长
    (c.announcement && c.announcement.enable && c.announcement.content),
    (c.announcement && c.announcement.enable && c.announcement.link_text),
    (c.projects && c.projects.enable && c.projects.title),
    ...projects.map(p => p.name),
    ...projects.map(p => p.description),
    (c.skills && c.skills.enable && c.skills.title),
    ...skillGroups.map(g => g.name),
    ...skillGroups.reduce((acc, g) => acc.concat((g.items || []).map(s => s.name)), []),
    (c.uptime && c.uptime.enable && c.uptime.template)
  ].filter(s => s != null);
  return Array.from(new Set(text.join('').split(''))).sort().join('');
  // must be sorted and .notdef at first position. see: https://github.com/opentypejs/opentype.js/issues/94
}
