/* global ctx */

'use strict';

// 最近更新生成器：在构建时(hexo generate)抓取外部博客的 RSS，
// 解析为文章卡片数据并暴露给模板通过 site.recentUpdates 读取。
//
// 为什么构建时抓取而非客户端抓取：
//   - 静态站点客户端抓取 RSS 受 CORS 限制，国内第三方代理不稳定；
//   - 构建时在服务端抓取无 CORS 问题，生成纯静态 HTML，国内加载稳定且 SEO 友好。
//
// 抓取失败不会中断构建，仅打印警告并返回空数组（首页区块会自动隐藏）。
// 支持 RSS 2.0 与 Atom 1.0，结构要求见 README。

const http = require('http');
const https = require('https');

let cachedRecent = null;

module.exports = hexo => {
  // before_generate 过滤器在生成前执行，且会被 await，确保数据就绪
  hexo.extend.filter.register('before_generate', async () => {
    const cfg = hexo.theme.config.recent_updates;
    if (!cfg || !cfg.enable || !cfg.rss_url) {
      cachedRecent = [];
      return;
    }
    try {
      const xml = await fetchText(cfg.rss_url, 8000);
      const max = cfg.max_count || 3;
      const items = parseFeed(xml, max);
      const excerptLen = cfg.excerpt_length || 80;
      cachedRecent = items.map(item => ({
        title: item.title,
        link: item.link,
        date: item.date,
        excerpt: cfg.show_excerpt === false ? '' : truncate(stripTags(item.description), excerptLen)
      }));
      hexo.log.info('recent_updates: fetched %d item(s) from %s', cachedRecent.length, cfg.rss_url);
    } catch (err) {
      hexo.log.warn('recent_updates: fetch RSS failed (%s) — section will be hidden', err && err.message);
      cachedRecent = [];
    }
  });

  hexo.locals.set('recentUpdates', () => cachedRecent || []);
};

function fetchText(url, timeout) {
  return new Promise((resolve, reject) => {
    const lib = url.startsWith('https') ? https : http;
    const req = lib.get(url, { headers: { 'User-Agent': 'hexo-theme-tranquility' } }, res => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        // 跟随一次重定向
        res.resume();
        return resolve(fetchText(absoluteUrl(res.headers.location, url), timeout));
      }
      if (res.statusCode !== 200) {
        res.resume();
        return reject(new Error('HTTP ' + res.statusCode));
      }
      let data = '';
      res.setEncoding('utf8');
      res.on('data', chunk => { data += chunk; });
      res.on('end', () => resolve(data));
    });
    req.on('error', reject);
    req.setTimeout(timeout, () => {
      req.destroy(new Error('timeout'));
    });
  });
}

function absoluteUrl(location, base) {
  try {
    return new URL(location, base).href;
  } catch (e) {
    return location;
  }
}

// 解析 RSS 2.0 与 Atom 1.0，返回 [{title, link, date, description}]
function parseFeed(xml, max) {
  if (/<feed[\s>]/i.test(xml) && /<entry/i.test(xml)) {
    return parseAtom(xml, max);
  }
  return parseRss(xml, max);
}

function parseRss(xml, max) {
  const items = [];
  const itemRe = /<item\b[\s\S]*?<\/item>/gi;
  let m;
  while ((m = itemRe.exec(xml)) && items.length < max) {
    const block = m[0];
    const title = pick(block, 'title');
    const link = pick(block, 'link') || pickAttr(block, 'link', 'href');
    const date = pick(block, 'pubDate') || pick(block, 'dc:date');
    const description = pick(block, 'description') || pick(block, 'content:encoded');
    items.push({ title, link, date: formatDate(date), description });
  }
  return items;
}

function parseAtom(xml, max) {
  const items = [];
  const entryRe = /<entry\b[\s\S]*?<\/entry>/gi;
  let m;
  while ((m = entryRe.exec(xml)) && items.length < max) {
    const block = m[0];
    const title = pick(block, 'title');
    const link = pickAttr(block, 'link', 'href') || pick(block, 'link');
    const date = pick(block, 'updated') || pick(block, 'published');
    const description = pick(block, 'summary') || pick(block, 'content');
    items.push({ title, link, date: formatDate(date), description });
  }
  return items;
}

// 提取 <tag>...</tag> 的文本内容（去 CDATA、去标签）
function pick(block, tag) {
  const re = new RegExp('<' + tag + '[\\s>][\\s\\S]*?</' + tag + '>', 'i');
  const m = block.match(re);
  if (!m) return '';
  let s = m[0].replace(/^<[^>]*>/, '').replace(/<\/[^>]*>$/, '');
  s = stripCdata(s);
  return s.trim();
}

// 提取 <tag href="..."/> 形式的属性
function pickAttr(block, tag, attr) {
  const re = new RegExp('<' + tag + '\\b[^>]*\\b' + attr + '\\s*=\\s*["\']([^"\']*)["\']', 'i');
  const m = block.match(re);
  return m ? m[1].trim() : '';
}

function stripCdata(s) {
  return s.replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, '$1');
}

function stripTags(s) {
  return stripCdata(s).replace(/<[^>]*>/g, '').replace(/\s+/g, ' ').trim();
}

function truncate(s, len) {
  if (!s) return '';
  return s.length > len ? s.slice(0, len) + '…' : s;
}

function formatDate(s) {
  if (!s) return '';
  const d = new Date(s);
  if (isNaN(d.getTime())) return s;
  const pad = n => String(n).padStart(2, '0');
  return d.getFullYear() + '-' + pad(d.getMonth() + 1) + '-' + pad(d.getDate());
}
