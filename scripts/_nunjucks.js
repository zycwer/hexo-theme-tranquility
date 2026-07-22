'use strict';

// 适配 hexo 8.x + hexo-renderer-nunjucks 2.x：
// 该渲染器的 compile 用 nunjucks.compile(text) 不传 env，会创建无 loader 的空 env，
// 导致模板中的 {% extends %} / {% include %} 无法解析相对路径（报 "template not found"）。
// 这里重新注册 njk/j2 渲染器，使用配置了 FileSystemLoader（指向主题 layout 目录）的 env，
// 使继承与包含能够正常工作。
const nunjucks = require('nunjucks');
const path = require('path');
const fs = require('fs');

module.exports = hexo => {
  hexo.extend.filter.register('after_init', () => {
    if (!hexo.theme_dir) return;
    const layoutDir = path.join(hexo.theme_dir, 'layout');
    const env = nunjucks.configure(layoutDir, {
      autoescape: false,
      throwOnUndefined: false,
      // server 模式禁用缓存便于热更新；generate 模式启用缓存提升性能
      noCache: hexo.env && hexo.env.cmd === 'server',
      trimBlocks: false,
      lstripBlocks: false
    });

    function render(data, locals) {
      if ('text' in data) {
        return env.renderString(data.text, locals);
      }
      return env.render(data.path, locals);
    }

    function compile(data) {
      const src = 'text' in data ? data.text : fs.readFileSync(data.path, 'utf8');
      const tmpl = nunjucks.compile(src, env);
      return tmpl.render.bind(tmpl);
    }
    render.compile = compile;

    hexo.extend.renderer.register('njk', 'html', render, true);
    hexo.extend.renderer.register('j2', 'html', render, true);
  });
};
