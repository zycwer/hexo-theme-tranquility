// 中文字体子集提取：从主题配置文本中提取所需字符，用 opentype.js 生成精简字体
const opentype = require('opentype.js');
const path = require('path');
const fs = require('fs');
const { Buffer } = require('node:buffer');

const notdefGlyph = new opentype.Glyph({
  name: '.notdef',
  advanceWidth: 650,
  path: new opentype.Path()
});

module.exports = function (hexo) {
  hexo.extend.generator.register('subfont', locals => {
    const zhFont = hexo.theme.config.zh_font || {};
    const { enable, fontName, type, style } = zhFont;
    if (!enable) return;
    if (!fontName || !type || !Array.isArray(style)) {
      hexo.log.warn('zh_font config incomplete: fontName/type/style required');
      return;
    }

    const sourceFolder = path.resolve(__dirname, '../../_font/');
    const text = getSubText(hexo);
    hexo.log.info('Extract subfont:', text);

    return style.map(subfont => {
      const source = path.resolve(sourceFolder, `${subfont}.${type}`);
      const data = compress(text, { source, name: fontName, style: subfont });
      if (!data) return null;
      return {
        path: path.join('/font', `${subfont}.${type}`),
        data: data
      };
    }).filter(Boolean);
  });
};

function compress(text, { source, name, style }) {
  try {
    let data = new Uint8Array(fs.readFileSync(source)).buffer;
    const font = opentype.parse(data);
    const glyphs = [notdefGlyph].concat(font.stringToGlyphs(text));
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
    console.warn('subfont compress failed for %s: %s', source, err && err.message);
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
