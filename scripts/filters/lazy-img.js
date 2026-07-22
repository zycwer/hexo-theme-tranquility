// 为文章正文中的 <img> 注入 loading="lazy" 与 decoding="async"
// 提升首屏性能，浏览器原生懒加载，无需额外 JS
// 跳过已含 loading 属性的图片，避免覆盖作者显式设置
module.exports = hexo => {
  hexo.extend.filter.register('after_post_render', function (data) {
    if (!data || !data.content) return data;
    data.content = data.content.replace(/<img\b(?![^>]*\bloading=)([^>]*)>/gi, (m, attrs) => {
      // 不为 already async 的图片重复添加 decoding
      const decoding = /\bdecoding=/i.test(attrs) ? '' : ' decoding="async"';
      return `<img${attrs} loading="lazy"${decoding}>`;
    });
    return data;
  });
};
