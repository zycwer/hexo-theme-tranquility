// 为文章正文中的 <img> 注入 loading="lazy" 与 decoding="async"
// 提升首屏性能，浏览器原生懒加载，无需额外 JS
// 跳过已含 loading 属性的图片，避免覆盖作者显式设置
module.exports = hexo => {
  hexo.extend.filter.register('after_post_render', function (data) {
    if (!data || !data.content) return data;
    data.content = data.content.replace(/<img\b([^>]*?)(\s*\/?)>/gi, function (match, attrs, closing) {
      if (/\bloading\s*=/i.test(attrs) && /\bdecoding\s*=/i.test(attrs)) return match;
      var inject = '';
      if (!/\bloading\s*=/i.test(attrs)) inject += ' loading="lazy"';
      if (!/\bdecoding\s*=/i.test(attrs)) inject += ' decoding="async"';
      return '<img' + attrs + inject + closing + '>';
    });
    return data;
  });
};
