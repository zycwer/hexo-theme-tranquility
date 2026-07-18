// PWA 支持：生成 manifest.json 与 sw.js（Service Worker）
// 配置 theme.pwa.enable 开启。manifest 引用 favicon 作为图标，sw 采用
// 静态资源缓存优先 + HTML 网络优先策略，离线可访问已缓存页面
module.exports = hexo => {
  hexo.extend.generator.register('pwa', function () {
    const cfg = this.theme.config.pwa;
    if (!cfg || !cfg.enable) return;

    const url_for = hexo.extend.helper.get('url_for').bind(this);
    const fav = this.theme.config.favicon || {};
    const icons = [];
    if (fav.apple_touch_icon) icons.push({ src: url_for(fav.apple_touch_icon), sizes: '180x180', type: 'image/png' });
    if (fav.medium) icons.push({ src: url_for(fav.medium), sizes: '32x32', type: 'image/png' });
    // logo.svg 作为任意尺寸图标
    if (this.theme.config.logo) icons.push({ src: url_for(this.theme.config.logo), sizes: 'any', type: 'image/svg+xml' });

    const manifest = {
      name: cfg.name || this.config.title,
      short_name: cfg.short_name || this.config.title,
      description: cfg.description || this.config.description,
      start_url: url_for('/'),
      scope: url_for('/'),
      display: cfg.display || 'standalone',
      background_color: cfg.background_color || '#fcfcfb',
      theme_color: cfg.theme_color || '#fcfcfb',
      icons
    };

    const root = (this.config.root || '/').replace(/\/$/, '');
    const sw = buildSW(root);

    return [
      { path: 'manifest.json', data: JSON.stringify(manifest, null, 2) },
      { path: 'sw.js', data: sw }
    ];
  });
};

// 简洁 Service Worker：静态资源缓存优先，HTML 网络优先失败回退缓存
function buildSW(root) {
  return `// 由 hexo-theme-tranquility 自动生成，请勿手动编辑
const CACHE = 'tranquility-v1';
const ROOT = ${JSON.stringify(root)};
const PRECACHE = [ROOT + '/', ROOT + '/css/layout.css'];

self.addEventListener('install', e => {
  self.skipWaiting();
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(PRECACHE)).catch(() => {}));
});

self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))).then(() => self.clients.claim()));
});

self.addEventListener('fetch', e => {
  const req = e.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);
  if (url.origin !== location.origin) return;

  const isHTML = req.mode === 'navigate' || (req.headers.get('accept') || '').includes('text/html');
  if (isHTML) {
    e.respondWith(fetch(req).then(res => {
      const copy = res.clone();
      caches.open(CACHE).then(c => c.put(req, copy));
      return res;
    }).catch(() => caches.match(req).then(r => r || caches.match(ROOT + '/')));
    return;
  }
  // 静态资源：缓存优先
  e.respondWith(caches.match(req).then(cached => cached || fetch(req).then(res => {
    const copy = res.clone();
    caches.open(CACHE).then(c => c.put(req, copy));
    return res;
  })));
});
`;
}
