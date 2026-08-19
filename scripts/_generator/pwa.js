// PWA 支持：生成 manifest.json、sw.js（Service Worker）与 offline.html（离线兜底页）
// 配置 theme.pwa.enable 开启。SW 策略：
//   HTML     —— 网络优先，失败回退缓存，再回退离线页
//   静态资源 —— stale-while-revalidate：命中缓存立即返回，后台静默更新
// 预缓存清单与页面资源指纹（fingerprint）保持一致，避免缓存键不匹配

const { assetHash } = require('../filters/asset-fingerprint');

// 按扩展名推断图标 MIME，避免 svg 被误判为 image/svg（无效）
function mimeFromPath(p) {
  const ext = (p || '').split('.').pop().toLowerCase();
  const map = { svg: 'image/svg+xml', jpg: 'image/jpeg', jpeg: 'image/jpeg', png: 'image/png', gif: 'image/gif', webp: 'image/webp', ico: 'image/x-icon' };
  return map[ext] || 'image/png';
}

module.exports = hexo => {
  hexo.extend.generator.register('pwa', function () {
    const cfg = this.theme.config.pwa;
    if (!cfg || !cfg.enable) return;

    const url_for = hexo.extend.helper.get('url_for').bind(this);
    const fav = this.theme.config.favicon || {};
    const icons = [];
    // PWA 安装提示要求至少 192x192 与 512x512。
    // 主题无法保证用户提供了这两个尺寸的位图，因此：
    //   - apple_touch_icon (180x180) 同时声明为 192x192（浏览器会缩放）
    //   - logo.svg 声明 sizes="any" 覆盖 512x512（矢量图任意尺寸清晰）
    if (fav.apple_touch_icon) {
      icons.push({ src: url_for(fav.apple_touch_icon), sizes: '180x180', type: mimeFromPath(fav.apple_touch_icon), purpose: 'any' });
      icons.push({ src: url_for(fav.apple_touch_icon), sizes: '192x192', type: mimeFromPath(fav.apple_touch_icon), purpose: 'any' });
      icons.push({ src: url_for(fav.apple_touch_icon), sizes: '512x512', type: mimeFromPath(fav.apple_touch_icon), purpose: 'any' });
    }
    if (fav.medium) icons.push({ src: url_for(fav.medium), sizes: '32x32', type: mimeFromPath(fav.medium), purpose: 'any' });
    // logo.svg 作为任意尺寸图标（含 maskable，适配 Android 自适应图标）
    if (this.theme.config.logo) {
      icons.push({ src: url_for(this.theme.config.logo), sizes: 'any', type: 'image/svg+xml', purpose: 'any' });
      icons.push({ src: url_for(this.theme.config.logo), sizes: 'any', type: 'image/svg+xml', purpose: 'maskable' });
    }

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
    const sw = buildSW(root, hexo);
    const offline = buildOfflinePage(cfg);

    return [
      { path: 'manifest.json', data: JSON.stringify(manifest, null, 2) },
      { path: 'sw.js', data: sw },
      { path: 'offline.html', data: offline }
    ];
  });
};

// 预缓存版本化资源 URL：与 asset-fingerprint 输出的 ?v= 指纹一致
function versioned(root, hexo, relPath) {
  const hash = assetHash(hexo, relPath);
  return root + relPath + (hash ? '?v=' + hash : '');
}

function buildSW(root, hexo) {
  // generate 模式用时间戳确保主题更新后旧缓存被清理；
  // server 模式热重载频繁，用固定版本避免反复清空缓存丧失离线能力
  const isServer = hexo.env && hexo.env.cmd === 'server';
  const cacheVersion = 'tranquility-' + (isServer ? 'dev' : ((hexo.theme.config.pwa || {}).cache_version || Date.now()));
  const css = versioned(root, hexo, '/css/layout.css');
  return `// 由 hexo-theme-tranquility 自动生成，请勿手动编辑
const CACHE = ${JSON.stringify(cacheVersion)};
const ROOT = ${JSON.stringify(root)};
const OFFLINE = ROOT + '/offline.html';
const PRECACHE = [ROOT + '/', ${JSON.stringify(css)}, OFFLINE];

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
    // HTML：网络优先，失败回退缓存，再回退离线页
    e.respondWith(fetch(req).then(res => {
      if (res.ok) {
        const copy = res.clone();
        caches.open(CACHE).then(c => c.put(req, copy));
      }
      return res;
    }).catch(() => caches.match(req).then(r => r || caches.match(OFFLINE))));
    return;
  }
  // 静态资源：stale-while-revalidate —— 命中缓存立即返回，后台静默更新
  e.respondWith(caches.match(req).then(cached => {
    const refresh = fetch(req).then(res => {
      // 仅缓存成功响应，避免 404/500 等被缓存
      if (res.ok) {
        const copy = res.clone();
        caches.open(CACHE).then(c => c.put(req, copy));
      }
      return res;
    }).catch(() => cached);
    return cached || refresh;
  }));
});
`;
}

// 自包含离线兜底页：无外部依赖（样式内联），断网时也可渲染
function buildOfflinePage(cfg) {
  const themeColor = cfg.theme_color || '#fcfcfb';
  const bgColor = cfg.background_color || '#fcfcfb';
  return `<!DOCTYPE html>
<html lang="zh">
<head>
<meta charset="utf-8"/>
<meta name="viewport" content="width=device-width, initial-scale=1"/>
<meta name="robots" content="noindex"/>
<title>离线</title>
<style>
  :root { color-scheme: light dark; }
  body {
    margin: 0; min-height: 100vh; display: flex; flex-direction: column;
    align-items: center; justify-content: center; gap: 16px;
    font-family: serif, sans-serif; background: ${bgColor}; color: #444;
    text-align: center; padding: 24px;
  }
  h1 { font-size: 28px; margin: 0; font-weight: normal; }
  p { margin: 0; color: #888; }
  a {
    display: inline-block; padding: 8px 28px; border: 1px solid #bbb;
    border-radius: 4px; color: #444; text-decoration: none; margin-top: 8px;
  }
  a:hover { border-color: ${themeColor}; }
</style>
</head>
<body>
  <h1>当前离线</h1>
  <p>无法连接网络，且该页面尚未缓存。</p>
  <a href="/">重试</a>
</body>
</html>
`;
}
