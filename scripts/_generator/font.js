// 中文字体子集提取：从主题配置文本中提取所需字符，用 opentype.js 生成精简字体
const opentype = require('opentype.js');
const path = require('path');
const fs = require('fs');
const { Buffer } = require('node:buffer');

module.exports = function (hexo) {
  hexo.extend.generator.register('subfont', locals => {
    const zhFont = hexo.theme.config.zh_font || {};
    const { enable, fontName, type, style } = zhFont;
    if (!enable) return;
    if (!fontName || !type || !Array.isArray(style)) {
      hexo.log.warn('zh_font 配置不完整：需指定 fontName/type/style');
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
      const source = path.resolve(sourceFolder, `${subfont}.${type}`);
      const data = compress(text, { source, name: fontName, style: subfont }, hexo);
      if (!data) return null;
      return {
        path: path.join('/font', `${subfont}.${type}`),
        data: data
      };
    }).filter(Boolean);
  });
};

function compress(text, { source, name, style }, hexo) {
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
    return Buffer.from(subFont.toArrayBuffer());
  } catch (err) {
    hexo.log.warn('subfont compress failed for %s: %s', source, err && err.message);
    return null;
  }
}

// 从主题配置的各项文本中收集字符，去重排序后返回
function getSubText(hexo) {
  const c = hexo.theme.config || {};
  const idx = c.index || {};
  const text = [
    c.slogan,
    idx.about && idx.about.title,
    ...((c.subpage && c.subpage.pages) || []).map(p => p.description),
    ...((hexo.locals.get('tags') || []).map(tag => tag.name)),
    ...((idx.about && idx.about.text) || []),
    ...(idx.poem || []),
    ...((c.reward && c.reward.text) || []),
    ...((c.foot && c.foot.title) || [])
  ].filter(s => s != null);
  return Array.from(new Set(text.join('').split(''))).sort().join('');
  // must be sorted and .notdef at first position. see: https://github.com/opentypejs/opentype.js/issues/94
}
