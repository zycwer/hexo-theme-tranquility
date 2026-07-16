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

    // 时间线条目全部来自文章：文章 front-matter 含 timeline 字段（值为 items 中的 name）
    // 即可展示在时间线，点击标题进入对应文章查看详情
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
  };
};
