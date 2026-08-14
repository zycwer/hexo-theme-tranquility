module.exports = hexo => {
  hexo.extend.filter.register('stylus:renderer', function (style) {
    // url_for 只读取 this.config 与 this.path；绑定 hexo 实例时 path 为 undefined，
    // relative_link: true 下会走 relative_url(undefined, path) 崩溃，故绑定带 path 的中性对象
    const url_for = hexo.extend.helper.get('url_for').bind({ config: hexo.config, path: '/' });
    style
      .define('url_for', function (data) {
        return url_for(data.val);
      });
  });
};
