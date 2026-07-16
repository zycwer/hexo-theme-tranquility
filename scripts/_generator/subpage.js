// 子页与博客列表生成器：基于 hexo-pagination 分页
// - blog: 所有文章的聚合分页页（/blog）
// - subpage: 按 subpage.pages 配置为每个分类生成独立分页页
'use strict';

const pagination = require('hexo-pagination');

module.exports = ctx => {
  ctx.config.subpage_generator = Object.assign({
    per_page: ctx.config.per_page == null ? 10 : ctx.config.per_page
  }, ctx.config.subpage_generator);

  ctx.extend.generator.register('subpage', subpageGenerator);
  ctx.extend.generator.register('blog', blog);
};

// 按置顶排序（sticky 越大越靠前），不改变原数组
function sortBySticky(posts) {
  posts.data.sort((a, b) => (b.sticky || 0) - (a.sticky || 0));
}

function blog(locals) {
  const config = this.config;
  const posts = locals.posts.sort(config.index_generator.order_by);
  sortBySticky(posts);
  return pagination('blog', posts, {
    perPage: config.index_generator.per_page,
    layout: ['category'],
    format: (config.pagination_dir || 'page') + '/%d/',
    data: { name: '博客', icon: 'blog' }
  });
}

function subpageGenerator(locals) {
  const ctx = this;
  if (!ctx.theme.config.subpage.enable) return;

  const config = ctx.config;
  const perPage = config.subpage_generator.per_page;
  const orderBy = config.subpage_generator.order_by || '-date';
  const paginationDir = config.pagination_dir || 'page';

  return ctx.theme.config.subpage.pages.reduce((result, page) => {
    const category = locals.categories.findOne({ name: page.name });
    let p = page.path || page.name;
    p = p.endsWith('/') ? p : p + '/';

    if (!category || !category.length) {
      console.warn(`Warn: There is no post in subpage '${page.title}'`);
      return result.concat([{ path: p, layout: ['category', 'archive', 'index'], data: { ...page } }]);
    }

    const posts = category.posts.sort(orderBy);
    sortBySticky(posts);

    // 收集该分类下所有文章的标签
    const tagIds = new Set();
    posts.forEach(post => post.tags.toArray().forEach(tag => tagIds.add(tag._id)));
    const tags = ctx.model('Tag').find({ _id: { $in: Array.from(tagIds) } });

    return result.concat(pagination(p, posts, {
      perPage,
      layout: ['category', 'archive', 'index'],
      format: paginationDir + '/%d/',
      data: { ...page, tags }
    }));
  }, []);
};
