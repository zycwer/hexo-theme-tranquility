// 构建时校验主题配置中的 URL，拦截 javascript: / vbscript: / data: 等危险协议
// 个人主页外链密集（社交/友链/联系方式/图标），配置文件一旦被注入恶意协议
// 将形成存储型 XSS。在生成前统一校验并中和危险值，构建日志给出告警。
module.exports = hexo => {
  hexo.extend.filter.register('before_generate', () => {
    const cfg = hexo.theme.config;
    if (!cfg) return;

    // 允许的协议；相对路径（无协议前缀）直接放行
    const SAFE = ['http', 'https', 'mailto', 'tel', 'ftp'];
    // 仅校验这些键下的值，避免误伤普通文本
    const URL_KEYS = new Set([
      'url', 'icon', 'photo', 'face', 'paycode', 'rss_url',
      'serverurl', 'cdn', 'logo', 'path', 'link',
      'small', 'medium', 'apple_touch_icon', 'safari_pinned_tab', 'android_manifest'
    ]);

    const neutralized = [];

    function isDangerous(v) {
      if (typeof v !== 'string' || v === '') return false;
      const m = v.match(/^([a-zA-Z][a-zA-Z0-9+.-]*):/);
      if (!m) return false;
      return !SAFE.includes(m[1].toLowerCase());
    }

    function walk(node, trail) {
      if (Array.isArray(node)) {
        node.forEach((v, i) => walk(v, trail + '[' + i + ']'));
        return;
      }
      if (!node || typeof node !== 'object') return;
      for (const [k, v] of Object.entries(node)) {
        if (typeof v === 'string') {
          if (URL_KEYS.has(k.toLowerCase()) && isDangerous(v)) {
            neutralized.push(trail + '.' + k + ' = ' + JSON.stringify(v.slice(0, 40)));
            node[k] = '#';
          }
        } else if (v && typeof v === 'object') {
          walk(v, trail + '.' + k);
        }
      }
    }

    walk(cfg, 'theme');

    if (neutralized.length) {
      hexo.log.warn('url-guard: 检测到 %s 处危险协议链接，已中和为 "#"（详见下方列表）', neutralized.length);
      neutralized.forEach(t => hexo.log.warn('url-guard: %s', t));
    }
  });
};
