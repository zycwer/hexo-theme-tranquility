// 数学公式保护：hexo-renderer-marked 会破坏 LaTeX（\\ 被转义成 \、& 变实体、
// 公式行被误解析为标题等），导致矩阵/方程组/多行推导损坏。
// 思路：对 front-matter 标记 mathjax: true 的文章，渲染前把公式提取为占位符，
// 渲染后原样还原（marked 完全碰不到公式内容）。
'use strict';

const STORE = new Map();

hexo.extend.filter.register('before_post_render', data => {
  if (!data.mathjax || typeof data.content !== 'string') return data;

  const chunks = [];
  const stash = tex => {
    const key = `MathJaxPlaceholder${chunks.length}End`;
    chunks.push(tex);
    return key;
  };

  let content = data.content;
  // 先块级 $$...$$（可跨行），后行内 $...$（单行内，避开货币符号误配的简单场景）
  content = content.replace(/\$\$([\s\S]+?)\$\$/g, (_, tex) => stash(`$$${tex}$$`));
  content = content.replace(/\$([^\$\n]+?)\$/g, (_, tex) => stash(`$${tex}$`));

  if (chunks.length) {
    STORE.set(data.source, chunks);
    data.content = content;
  }
  return data;
});

hexo.extend.filter.register('after_post_render', data => {
  const chunks = STORE.get(data.source);
  if (!chunks) return data;

  // LaTeX 原文放入 HTML 需转义；MathJax 读取 textContent 时自动解码还原
  const escapeHtml = s => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  data.content = data.content.replace(/MathJaxPlaceholder(\d+)End/g, (_, i) => escapeHtml(chunks[Number(i)]));
  STORE.delete(data.source);
  return data;
});
