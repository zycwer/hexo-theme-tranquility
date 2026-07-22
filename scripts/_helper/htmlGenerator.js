// 相关文章 / 热门文章列表 HTML 生成器（供 helper 调用）
function escapeHtml(s) {
  if (s == null) return '';
  return String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

module.exports = function (args) {
  if (!args || !args.json || !args.json.length) return '';

  const cls = args.class;
  const items = args.json.map(item => {
    const title = escapeHtml(item.title);
    const path = escapeHtml(item.path);
    const date = item.date ? `<div class="${cls}-date">${escapeHtml(item.date)}</div>` : '';
    const img = item.img ? `<div class="${cls}-img"><img src="${escapeHtml(item.img)}" loading="lazy" /></div>` : '';
    const excerpt = item.excerpt ? `<div class="${cls}-excerpt"><p>${escapeHtml(item.excerpt)}</p></div>` : '';
    return `
    <div class="${cls}-item">
      ${date}
      ${img}
      <div class="${cls}-title"><a href="${path}" title="${title}" rel="bookmark">${title}</a></div>
      ${excerpt}
    </div>`;
  }).join('');

  return `<div class="${cls}">${items}</div>`;
};
