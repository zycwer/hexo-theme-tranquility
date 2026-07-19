// 文章目录（TOC）随滚动定位：顶部/跟随/底部三态
// 性能：scroll/resize 用 rAF 节流，避免每帧多次 reflow
// 选择器：模板中 Hexo 的 toc() helper 生成 <ol class="post-toc">，
// 文章正文容器为 .post-content__body，aside.toc-outer 为目录外层
(function () {
  var tocEl = document.querySelector('.post-toc');
  var contentEl = document.querySelector('.post-content__body');
  var outerEl = document.querySelector('.toc-outer');
  if (!tocEl || !contentEl || !outerEl) return;

  var tocOffsetTop = 0;
  var articleHeight = 0;
  var tocHeight = 0;
  var breakPoint1 = 0;
  var breakPoint2 = 0;
  var ticking = false;

  function getOffsetTop(el) {
    var offsetTop = 0;
    var cur = el;
    while (cur != null) {
      offsetTop += cur.offsetTop;
      cur = cur.offsetParent;
    }
    return offsetTop;
  }

  function updateData() {
    // 用 toc-outer 作为锚点（post-toc 内边距变化不影响其 offsetTop）
    tocOffsetTop = getOffsetTop(outerEl);
    articleHeight = contentEl.offsetHeight;
    tocHeight = tocEl.offsetHeight;
    breakPoint1 = tocOffsetTop;
    breakPoint2 = articleHeight + tocOffsetTop - tocHeight;
  }

  function adjustToc() {
    var y = window.scrollY;
    if (y < breakPoint1) {
      tocEl.className = 'post-toc';
      tocEl.style.top = '0';
    } else if (y < breakPoint2) {
      tocEl.className = 'post-toc--attached';
      tocEl.style.top = '0';
    } else {
      tocEl.className = 'post-toc--bottom';
      tocEl.style.top = (articleHeight - tocHeight) + 'px';
    }
    ticking = false;
  }

  function requestAdjust() {
    if (!ticking) {
      window.requestAnimationFrame(adjustToc);
      ticking = true;
    }
  }

  window.addEventListener('scroll', requestAdjust, { passive: true });
  window.addEventListener('resize', function () {
    updateData();
    requestAdjust();
  }, { passive: true });
  window.addEventListener('load', updateData);
  // DOMContentLoaded 后内容已渲染，立即初始化一次
  updateData();
  adjustToc();
})();
