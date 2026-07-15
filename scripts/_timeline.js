moment = require("moment");

module.exports = hexo => {
  hexo.locals.set('timelineData', getTimeline);

  function getTimeline() {
    const url_for = hexo.extend.helper.get('url_for').bind(hexo);

    if (!hexo.theme.config.timeline || !hexo.theme.config.timeline.enable) return {};
    const items = hexo.theme.config.timeline.items;
    const types = items.map(item => item.name);
    const order = hexo.theme.config.timeline.order ? 'date' : '-date';
    const iconOf = type => url_for((items.find(item => item.name == type) || {}).icon || '');

    // 来自本地文章（文章 front-matter 含 timeline 字段）
    const postItems = hexo.locals.get('posts').sort(order)
      .filter(post => types.includes(post.timeline))
      .map(p => ({
        title: p.title,
        path: url_for(p.path),
        icon: iconOf(p.timeline),
        type: p.timeline,
        date: moment(p.date).format('YYYY-MM-DD'),
        desc: ''
      }));

    // 来自配置定义的大事件（不依赖文章，适合 landing 模式）
    const configEvents = (hexo.theme.config.timeline.events || [])
      .filter(ev => types.includes(ev.type))
      .map(ev => ({
        title: ev.title,
        path: ev.link || '',
        icon: iconOf(ev.type),
        type: ev.type,
        date: moment(ev.date).format('YYYY-MM-DD'),
        desc: ev.description || ''
      }));

    const posts = postItems.concat(configEvents).sort((a, b) => {
      return order === 'date'
        ? a.date.localeCompare(b.date)
        : b.date.localeCompare(a.date);
    });

    return { types, posts };
  };
};
