// robots.txt 生成器：自动生成 robots.txt 指向 sitemap.xml
// 用户可在主题配置中通过 robots.enable: false 关闭
module.exports = hexo => {
  hexo.extend.generator.register('robots', function (locals) {
    const theme = this.theme.config;
    const cfg = theme.robots || {};
    if (cfg.enable === false) return;

    const root = (this.config.root || '/').replace(/\/$/, '');
    const base = (this.config.url || '').replace(/\/$/, '');
    const sitemapUrl = base + root + '/sitemap.xml';

    const lines = [
      'User-agent: *',
      'Allow: /'
    ];

    // 禁止索引的路径（如 CSS、JS、字体等）
    if (cfg.disallow && cfg.disallow.length) {
      cfg.disallow.forEach(function (p) { lines.push('Disallow: ' + p); });
    } else {
      lines.push('Disallow: /css/');
      lines.push('Disallow: /js/');
      lines.push('Disallow: /font/');
    }

    // sitemap 引用
    if (!theme.sitemap || theme.sitemap.enable !== false) {
      lines.push('');
      lines.push('Sitemap: ' + sitemapUrl);
    }

    return {
      path: 'robots.txt',
      data: lines.join('\n') + '\n'
    };
  });
};
