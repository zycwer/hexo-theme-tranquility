// 时间线：从文章聚合，文章 front-matter 含 timeline 字段（值为 items 中的 name）即展示
const moment = require('moment');

module.exports = hexo => {
  hexo.locals.set('timelineData', () => {
    const url_for = hexo.extend.helper.get('url_for').bind(hexo);
    const cfg = hexo.theme.config.timeline;
    if (!cfg || !cfg.enable) return {};

    const items = cfg.items;
    const types = items.map(item => item.name);
    const order = cfg.order ? 'date' : '-date';
    const iconOf = type => url_for((items.find(item => item.name == type) || {}).icon || '');

    const posts = hexo.locals.get('posts').sort(order)
      .filter(post => types.includes(post.timeline))
      .map(p => ({
        title: p.title,
        path: url_for(p.path),
        icon: iconOf(p.timeline),
        type: p.timeline,
        date: moment(p.date).format('YYYY-MM-DD')
      }));

    return { types, posts };
  });
};
