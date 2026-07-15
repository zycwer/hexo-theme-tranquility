/* global ctx */

'use strict';

// 关于页生成器：生成独立的 /about 路由
// 内容来自主题配置 theme.about.content（段落数组）
module.exports = ctx => {
  ctx.extend.generator.register('about', aboutGenerator);
};

function aboutGenerator(locals) {
  const config = this.theme.config;
  if (!config.about || !config.about.enable) return;

  return {
    path: '/about/index.html',
    layout: ['about'],
    data: config.about
  };
}
