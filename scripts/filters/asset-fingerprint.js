// 静态资源内容指纹：为主题的 css/js/图片引用追加内容哈希（?v=xxxxxxxx）
// 浏览器可对带指纹的资源启用强缓存；主题更新后哈希变化 URL 即变，缓存自动失效，
// 回访者零重复下载、更新即时生效。
const crypto = require('crypto');
const fs = require('fs');
const path = require('path');

// 仅处理这些扩展名（字体由生成器产出且已有 preload，不纳入）
const FINGERPRINT_EXT = /\.(css|js|mjs|png|jpe?g|gif|svg|webp|avif|ico)([?#]|$)/i;

// 计算主题 source 下相对路径资源的哈希（带缓存），找不到返回 null
// .css 产物由 stylus 编译生成，源目录无对应文件：
// 改为对 .styl 源文件及其 @import 依赖合集取哈希，任一源文件变化即失效
function assetHash(hexo, relPath) {
  const cache = assetHash._cache || (assetHash._cache = new Map());
  if (cache.has(relPath)) return cache.get(relPath);
  let hash = null;
  try {
    const srcDir = path.join(hexo.theme_dir, 'source');
    const files = resolveSourceFiles(srcDir, relPath);
    if (files.length) {
      const h = crypto.createHash('sha256');
      files.sort().forEach(f => h.update(fs.readFileSync(f)));
      hash = h.digest('hex').slice(0, 8);
    }
  } catch (e) { /* 资源不可读则跳过，保持原 URL */ }
  cache.set(relPath, hash);
  return hash;
}

// 将资源路径映射到主题 source 下的源文件列表
function resolveSourceFiles(srcDir, relPath) {
  const direct = path.join(srcDir, relPath);
  if (fs.existsSync(direct) && fs.statSync(direct).isFile()) return [direct];

  if (/\.css$/i.test(relPath)) {
    // 编译产物：解析对应 .styl 及其 @import 依赖闭包
    const styl = path.join(srcDir, relPath.replace(/\.css$/i, '.styl'));
    if (fs.existsSync(styl)) {
      const deps = new Set();
      collectStylusDeps(styl, deps);
      return Array.from(deps);
    }
  }
  return [];
}

// 递归收集 stylus 文件的 @import/@require 依赖（含自身）
function collectStylusDeps(file, seen) {
  const real = fs.realpathSync(file);
  if (seen.has(real)) return;
  seen.add(real);
  const dir = path.dirname(file);
  const content = fs.readFileSync(file, 'utf8');
  const re = /@(?:import|require)\s+(?:\(\s*)?['"]([^'"]+)['"]/g;
  let m;
  while ((m = re.exec(content))) {
    const dep = resolveStylusPath(dir, m[1]);
    if (dep) collectStylusDeps(dep, seen);
  }
}

// stylus 导入解析：按 stylus 查找规则尝试 basename、_basename 及 index 形式
function resolveStylusPath(dir, spec) {
  const base = path.resolve(dir, spec);
  const candidates = /\.styl$/i.test(spec)
    ? [base]
    : [base + '.styl', path.join(base, 'index.styl'),
       path.join(dir, '_' + path.basename(base)) + '.styl',
       path.join(dir, '_' + path.basename(base), 'index.styl')];
  return candidates.find(c => fs.existsSync(c) && fs.statSync(c).isFile()) || null;
}

module.exports = hexo => {
  const enabled = () => {
    const cfg = hexo.theme.config && hexo.theme.config.fingerprint;
    return cfg && cfg.enable !== false; // 默认开启
  };

  hexo.extend.filter.register('after_render:html', str => {
    if (!str || !enabled()) return str;
    const root = hexo.config.root || '/';

    // 匹配 src/href 属性中的本地资源 URL
    return str.replace(/\b(src|href)=["']([^"']+)["']/g, (match, attr, url) => {
      // 跳过任何绝对 URI（http/https/data/mailto…）、协议相对地址与纯锚点
      if (/^[a-z][a-z0-9+.-]*:/i.test(url) || url.startsWith('//') || url.startsWith('#')) return match;

      const hashIndex = url.indexOf('#');
      const fragment = hashIndex >= 0 ? url.slice(hashIndex) : '';
      const clean = hashIndex >= 0 ? url.slice(0, hashIndex) : url;
      if (!FINGERPRINT_EXT.test(clean)) return match;

      // 去掉 root 前缀得到资源路径（兼容子目录部署）
      let rel = clean.split('?')[0];
      if (root !== '/' && rel.startsWith(root)) rel = rel.slice(root.length - 1);
      if (!rel.startsWith('/')) return match; // 相对路径不处理

      const hash = assetHash(hexo, rel);
      if (!hash) return match;
      return `${attr}="${clean}?v=${hash}${fragment}"`;
    });
  });
};

module.exports.assetHash = assetHash;
