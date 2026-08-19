// 生成安全相关 meta 标签：CSP（内容安全策略）/ Referrer-Policy / Permissions-Policy
// GitHub Pages 等静态托管无法设置 HTTP 响应头，meta 标签是用户落地 CSP 的唯一途径。
// 策略来源白名单按已开启的功能自动收集：未开启的评论/统计/一言不会放宽策略。
module.exports = hexo => {
  return function securityMeta() {
    const theme = hexo.theme.config || {};
    const cfg = theme.security || {};
    const esc = s => String(s).replace(/"/g, '&quot;');

    const script = new Set(["'self'", "'unsafe-inline'"]); // 主题含内联脚本（主题色/统计/搜索初始化）
    const style = new Set(["'self'", "'unsafe-inline'"]); // 含内联 @font-face 与少量行内样式
    const font = new Set(["'self'", 'data:']);
    const img = new Set(["'self'", 'data:', 'https:']); // 放行 https 外链图片，阻断非安全协议
    const connect = new Set(["'self'"]);
    const frame = new Set(["'self'"]);

    function origin(url) {
      try { return new URL(url).origin; } catch (e) { return null; }
    }

    // CDN（Mermaid / MathJax / DocSearch 等第三方库的 js/css/字体）
    const cdnOrigin = origin(theme.cdn || 'https://cdn.jsdelivr.net/npm');
    if (cdnOrigin) {
      script.add(cdnOrigin);
      style.add(cdnOrigin);
      font.add(cdnOrigin);
    }

    // 一言 API（客户端 fetch）
    if (theme.slogan_hitokoto) connect.add('https://v1.hitokoto.cn');

    // 百度统计（脚本 + 上报信标）
    if (theme.baidu_analytics) {
      script.add('https://hm.baidu.com');
      connect.add('https://hm.baidu.com');
      img.add('https://hm.baidu.com');
    }

    // 评论系统：按实际开启的方案放宽对应域名
    const comments = theme.comments || {};
    if (comments.enable) {
      if (comments.giscus && comments.giscus.repo) {
        script.add('https://giscus.app');
        frame.add('https://giscus.app');
        connect.add('https://giscus.app');
      }
      if (comments.waline && comments.waline.serverURL) {
        // waline 客户端脚本/样式固定从 unpkg 加载，API 请求走 serverURL
        script.add('https://unpkg.com');
        style.add('https://unpkg.com');
        const o = origin(comments.waline.serverURL);
        if (o) {
          script.add(o);
          style.add(o);
          connect.add(o);
          frame.add(o);
        }
      }
      if (comments.disqus && comments.disqus.shortname) {
        script.add('https://disqus.com');
        script.add('https://*.disqus.com');
        script.add('https://*.disquscdn.com');
        style.add('https://*.disquscdn.com');
        connect.add('https://*.disqus.com');
        frame.add('https://disqus.com');
        img.add('https://*.disquscdn.com');
      }
    }

    // Algolia DocSearch（搜索 API）
    if (theme.algolia && theme.algolia.enable) {
      connect.add('https://*.algolia.net');
      connect.add('https://*.algolianet.com');
    }

    // 指令表：值为来源数组。csp_extra 中的同名指令来源会被合并进对应指令
    // （CSP 规范规定同一 policy 内同名指令重复出现时后者被忽略，直接拼接会导致追加失效）
    const directives = {
      'default-src': ["'self'"],
      'script-src': Array.from(script),
      'style-src': Array.from(style),
      'img-src': Array.from(img),
      'font-src': Array.from(font),
      'connect-src': Array.from(connect),
      'frame-src': Array.from(frame),
      'media-src': ["'self'"],
      'object-src': ["'none'"],
      'base-uri': ["'self'"],
      'form-action': ["'self'"]
    };

    (Array.isArray(cfg.csp_extra) ? cfg.csp_extra : []).forEach(entry => {
      if (typeof entry !== 'string') return;
      const sep = entry.indexOf(' ');
      if (sep <= 0) return; // 无来源的指令无效，跳过
      const name = entry.slice(0, sep).trim().toLowerCase();
      const value = entry.slice(sep + 1).trim();
      if (!name || !value) return;
      if (directives[name]) {
        value.split(/\s+/).forEach(v => {
          if (!directives[name].includes(v)) directives[name].push(v);
        });
      } else {
        directives[name] = value.split(/\s+/);
      }
    });

    const policy = Object.keys(directives)
      .map(name => `${name} ${directives[name].join(' ')}`)
      .join('; ');

    const tags = [`<meta http-equiv="Content-Security-Policy" content="${esc(policy)}"/>`];

    // Referrer-Policy：仅向跨域目标发送 origin，避免完整 URL 泄露浏览路径
    const rp = cfg.referrer_policy === false ? null : (cfg.referrer_policy || 'strict-origin-when-cross-origin');
    if (rp) tags.push(`<meta name="referrer" content="${esc(rp)}"/>`);

    // Permissions-Policy：默认禁用敏感能力
    const pp = cfg.permissions_policy === false ? null : (cfg.permissions_policy || 'camera=(), microphone=(), geolocation=()');
    if (pp) tags.push(`<meta http-equiv="Permissions-Policy" content="${esc(pp)}"/>`);

    return tags.join('\n    ');
  };
};
