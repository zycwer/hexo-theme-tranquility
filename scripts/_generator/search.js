// 生成前端本地搜索用的 search.json
// field: post | page | 空(全部)
module.exports = hexo => {
  hexo.extend.generator.register('search', function (locals) {
    const cfg = {
      path: 'search.json',
      field: 'post',
      ...this.config.search,
      ...this.theme.config.search,
      root: this.config.root
    };

    const sources = [];
    if (cfg.field === 'post' || cfg.field === '') sources.push(locals.posts.sort('-date'));
    if (cfg.field === 'page' || cfg.field === '') sources.push(locals.pages);

    const res = [];
    sources.forEach(items => {
      items.each(item => {
        if (item.indexing === false) return;
        res.push({
          title: item.title || 'No Title',
          url: item.path ? cfg.root + item.path : undefined,
          content: cfg.content !== false ? (item._content || '') : undefined,
          tags: pluck(item.tags, 'name'),
          categories: pluck(item.categories, 'name')
        });
      });
    });

    return { path: cfg.path, data: JSON.stringify(res) };
  });
};

// 从 Warehouse 集合或普通数组中提取字段，统一处理两种遍历方式
function pluck(coll, key) {
  if (!coll || !coll.length) return undefined;
  const out = [];
  (coll.each || coll.forEach).call(coll, v => out.push(v[key]));
  return out;
}
