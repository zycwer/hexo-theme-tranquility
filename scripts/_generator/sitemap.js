// 站点地图生成器：输出 sitemap.xml，覆盖文章/页面/分类/标签
// 轻量自实现，无需额外依赖。若已使用 hexo-generator-sitemap，可在配置中关闭
// 配置：theme.sitemap.enable（默认 true）
module.exports = hexo => {
  hexo.extend.generator.register('sitemap', function (locals) {
    const cfg = this.theme.config.sitemap;
    if (cfg && cfg.enable === false) return;

    const fullUrlFor = hexo.extend.helper.get('full_url_for').bind(this);
    const urls = [];
    const seen = new Set();
    const add = (path, lastmod, changefreq, priority) => {
      if (path === null || path === undefined || seen.has(path)) return;
      seen.add(path);
      // 空字符串代表首页，用根 URL（full_url_for('') 可能不带尾斜杠）
      const loc = path === '' ? fullUrlFor('/') : fullUrlFor(path);
      urls.push({ loc, lastmod, changefreq, priority });
    };

    // 首页（用根路径，避免 /index.html 与 / 产生重复 URL）
    add('', Date.now(), 'daily', '1.0');

    // 文章
    locals.posts.sort('-date').each(post => {
      add(post.path, post.updated || post.date, 'weekly', '0.8');
    });

    // 页面
    locals.pages.each(page => {
      add(page.path, page.updated || page.date, 'monthly', '0.6');
    });

    // 分类与标签
    locals.categories.each(cat => add(cat.path, null, 'weekly', '0.4'));
    locals.tags.each(tag => add(tag.path, null, 'weekly', '0.4'));

    const xml = urls.map(u => '  <url>\n' +
      `    <loc>${escapeXml(u.loc)}</loc>\n` +
      (u.lastmod ? `    <lastmod>${toIso(u.lastmod)}</lastmod>\n` : '') +
      (u.changefreq ? `    <changefreq>${u.changefreq}</changefreq>\n` : '') +
      (u.priority ? `    <priority>${u.priority}</priority>\n` : '') +
      '  </url>').join('\n');

    return {
      path: 'sitemap.xml',
      data: '<?xml version="1.0" encoding="UTF-8"?>\n' +
        '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n' +
        xml + '\n</urlset>\n'
    };
  });
};

const escapeXml = s => String(s).replace(/[<>&'"]/g, c => ({
  '<': '&lt;', '>': '&gt;', '&': '&amp;', '\'': '&apos;', '"': '&quot;'
}[c]));

const toIso = d => {
  if (!d) return '';
  const date = d instanceof Date ? d : (d && d.toDate ? d.toDate() : new Date(d));
  return isNaN(date.getTime()) ? '' : date.toISOString();
};
