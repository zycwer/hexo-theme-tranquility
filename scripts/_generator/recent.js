// 最近更新：构建时抓取外部博客 RSS 并解析为文章卡片数据（site.recentUpdates）
// 构建时抓取（非客户端）：无 CORS、不依赖第三方代理、SEO 友好、国内加载稳定
// 抓取失败不中断构建，仅警告并返回空数组（首页区块自动隐藏）
// 支持 RSS 2.0 与 Atom 1.0，结构要求见 README

const http = require('http');
const https = require('https');

let cachedRecent = null;

module.exports = hexo => {
  hexo.extend.filter.register('before_generate', async () => {
    const cfg = hexo.theme.config.recent_updates;
    if (!cfg || !cfg.enable || !cfg.rss_url) {
      cachedRecent = [];
      return;
    }
    try {
      const xml = await fetchText(cfg.rss_url, 8000);
      const items = parseFeed(xml, cfg.max_count || 3);
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

function fetchText(url, timeout, maxRedirects) {
  maxRedirects = maxRedirects == null ? 5 : maxRedirects;
  return new Promise((resolve, reject) => {
    const lib = url.startsWith('https') ? https : http;
    const req = lib.get(url, { headers: { 'User-Agent': 'hexo-theme-tranquility' } }, res => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        res.resume();
        if (maxRedirects <= 0) return reject(new Error('too many redirects'));
        return resolve(fetchText(new URL(res.headers.location, url).href, timeout, maxRedirects - 1));
      }
      if (res.statusCode !== 200) {
        res.resume();
        return reject(new Error('HTTP ' + res.statusCode));
      }
      let data = '';
      res.setEncoding('utf8');
      res.on('data', chunk => { data += chunk; });
      res.on('end', () => resolve(data));
      res.on('error', reject);
    });
    req.on('error', reject);
    req.setTimeout(timeout, () => req.destroy(new Error('timeout')));
  });
}

// 统一解析 RSS 2.0 与 Atom 1.0：两者结构相似，仅条目标签与字段名不同
function parseFeed(xml, max) {
  const isAtom = /<feed[\s>]/i.test(xml);
  const entryTag = isAtom ? 'entry' : 'item';
  const fields = isAtom
    ? { link: ['href'], date: ['updated', 'published'], desc: ['summary', 'content'] }
    : { date: ['pubDate', 'dc:date'], desc: ['description', 'content:encoded'] };

  const items = [];
  const re = new RegExp('<' + entryTag + '\\b[\\s\\S]*?</' + entryTag + '>', 'gi');
  let m;
  while ((m = re.exec(xml)) && items.length < max) {
    const block = m[0];
    const link = isAtom
      ? (pickAttr(block, 'link', 'href') || pickText(block, 'link'))
      : (pickText(block, 'link') || pickAttr(block, 'link', 'href'));
    items.push({
      title: pickText(block, 'title'),
      link,
      date: formatDate(fields.date.reduce((v, t) => v || pickText(block, t), '')),
      description: fields.desc.reduce((v, t) => v || pickText(block, t), '')
    });
  }
  return items;
}

// 提取 <tag>...</tag> 的文本内容（去 CDATA）
function pickText(block, tag) {
  const m = block.match(new RegExp('<' + tag + '[\\s>][\\s\\S]*?</' + tag + '>', 'i'));
  if (!m) return '';
  return stripCdata(m[0].replace(/^<[^>]*>/, '').replace(/<\/[^>]*>$/, '')).trim();
}

// 提取 <tag attr="..."/> 的属性值
function pickAttr(block, tag, attr) {
  const m = block.match(new RegExp('<' + tag + '\\b[^>]*\\b' + attr + '\\s*=\\s*["\']([^"\']*)["\']', 'i'));
  return m ? m[1].trim() : '';
}

const stripCdata = s => s.replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, '$1');
const stripTags = s => stripCdata(s).replace(/<[^>]*>/g, '').replace(/\s+/g, ' ').trim();
const truncate = (s, len) => s && s.length > len ? s.slice(0, len) + '…' : (s || '');

function formatDate(s) {
  if (!s) return '';
  const d = new Date(s);
  if (isNaN(d.getTime())) return s;
  const pad = n => String(n).padStart(2, '0');
  return d.getFullYear() + '-' + pad(d.getMonth() + 1) + '-' + pad(d.getDate());
}
