// 相关文章 / 热门文章列表 HTML 生成器（供 helper 调用）
module.exports = function (args) {
  if (!args || !args.json || !args.json.length) return '';

  const cls = args.class;
  const items = args.json.map(item => `
    <div class="${cls}-item">
      ${item.date ? `<div class="${cls}-date">${item.date}</div>` : ''}
      ${item.img ? `<div class="${cls}-img"><img src="${item.img}" /></div>` : ''}
      <div class="${cls}-title"><a href="${item.path}" title="${item.title}" rel="bookmark">${item.title}</a></div>
      ${item.excerpt ? `<div class="${cls}-excerpt"><p>${item.excerpt}</p></div>` : ''}
    </div>`).join('');

  return `<div class="${cls}">${items}</div>`;
};
