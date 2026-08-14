// 将文章中的 ```mermaid 围栏代码块转换为 mermaid.js 可识别的 <pre class="mermaid">
//
// 背景：hexo 8 默认 syntax_highlighter: highlight.js，核心 filter backtick_code_block
// (before_post_render, 优先级 10) 会在 markdown 渲染前把围栏代码块交给 hexo-util highlight。
// hljs 不认识 mermaid 语言（不在 highlight_alias 中），按 plaintext 处理，
// 最终输出 <figure class="highlight plaintext">…，class 中不残留任何 mermaid 信息，
// 渲染后无法与普通 plaintext 块区分，因此必须在渲染前拦截。
//
// 方案：
// 1. before_post_render（优先级 9，先于 backtick_code_block）把 ```mermaid 围栏
//    原地替换为 HTML 转义后的 <pre class="mermaid">，mermaid.run() 默认选择器即可命中。
//    内容转义 & < > 与 { }（同核心 escapeSwigTag，防止 nunjucks 解析 {{ }}），
//    浏览器读 textContent 时会自动解码回原文。
// 2. after_post_render 兜底：若某些环境下仍产出 figure.highlight.mermaid
//    （如注册了 hljs 别名），从中提取代码文本并转换。
module.exports = hexo => {
  const enabled = () => {
    const cfg = hexo.theme.config.mermaid;
    return cfg && cfg.enable;
  };

  // 围栏结构对齐 hexo 核心 rBacktick，语言限定为 mermaid
  const rMermaidFence = /^((?:(?:[^\S\r\n]*>){0,3}|[-*+]|[0-9]+\.)[^\S\r\n]*)(`{3,}|~{3,})[^\S\r\n]*mermaid[^\S\r\n]*\n((?:[\s\S]*?\n)?)[^\S\r\n]*\2[^\S\r\n]?(\n+|$)/gm;

  const escapeMermaid = str => str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/{/g, '&#123;')
    .replace(/}/g, '&#125;');

  hexo.extend.filter.register('before_post_render', data => {
    if (!enabled() || !data || !data.content) return data;
    if (!data.content.includes('```') && !data.content.includes('~~~')) return data;
    data.content = data.content.replace(rMermaidFence, (match, start, marker, body, end) =>
      start + '<pre class="mermaid">' + escapeMermaid(body.replace(/\n$/, '').trim()) + '</pre>' + end
    );
    return data;
  }, 9);

  // 兜底：渲染后的 figure.highlight.mermaid（结构参考 hexo-util highlight 输出）转 <pre class="mermaid">
  hexo.extend.filter.register('after_post_render', data => {
    if (!enabled() || !data || !data.content) return data;
    data.content = data.content.replace(
      /<figure class="highlight mermaid"[^>]*>[\s\S]*?<\/figure>/g,
      match => {
        const m = match.match(/<td class="code">[\s\S]*?<\/td>/);
        if (!m) return match;
        let code = m[0]
          .replace(/<\/?td[^>]*>/g, '')
          .replace(/<span[^>]*>/g, '')
          .replace(/<\/span>/g, '')
          .replace(/<br\s*\/?>/g, '\n')
          .replace(/<[^>]+>/g, '');
        // &amp; 必须最后解码，避免二次解码
        code = code.replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '"').replace(/&#39;/g, "'").replace(/&amp;/g, '&');
        return '<pre class="mermaid">' + code.trim() + '</pre>';
      }
    );
    return data;
  });
};
