// 文章目录（TOC）随滚动定位：顶部/跟随/底部三态
// 性能：scroll/resize 用 rAF 节流，避免每帧多次 reflow
const tocEl = document.querySelector('#toc')
const contentEl = document.querySelector('#postBody')
if (tocEl && contentEl) {
  let tocOffsetTop = getOffsetTop(tocEl)
  let articleHeight = contentEl.offsetHeight
  let tocHeight = tocEl.offsetHeight
  let breakPoint1 = tocOffsetTop
  let breakPoint2 = articleHeight + tocOffsetTop - tocHeight
  let ticking = false

  function updateData() {
    tocOffsetTop = getOffsetTop(tocEl)
    articleHeight = contentEl.offsetHeight
    tocHeight = tocEl.offsetHeight
    breakPoint1 = tocOffsetTop
    breakPoint2 = articleHeight + tocOffsetTop - tocHeight
  }

  function getOffsetTop(el) {
    let offsetTop = 0
    while (el != null) {
      offsetTop += el.offsetTop
      el = el.offsetParent
    }
    return offsetTop
  }

  function adjustToc() {
    const y = window.scrollY
    if (y < breakPoint1) {
      tocEl.className = 'post-toc'
      tocEl.style.top = '0'
    } else if (y < breakPoint2) {
      tocEl.className = 'post-toc--attached'
      tocEl.style.top = '0'
    } else {
      tocEl.className = 'post-toc--bottom'
      tocEl.style.top = articleHeight - tocHeight + 'px'
    }
    ticking = false
  }

  function requestAdjust() {
    if (!ticking) {
      window.requestAnimationFrame(adjustToc)
      ticking = true
    }
  }

  window.addEventListener('scroll', requestAdjust, { passive: true })
  window.addEventListener('resize', function () {
    updateData()
    requestAdjust()
  }, { passive: true })
  window.addEventListener('load', updateData)
}
