// 最近更新卡片轮播：左右箭头/圆点切换，键盘左右键支持
// 卡片由模板服务端渲染，本脚本仅负责切换交互
(function () {
  var root = document.getElementById('recent-updates');
  if (!root) return;

  var cards = Array.prototype.slice.call(root.querySelectorAll('.recent-card'));
  var dots = Array.prototype.slice.call(root.querySelectorAll('.recent-updates__dot'));
  if (cards.length <= 1) return; // 单张或无图无需切换

  var current = 0;

  function show(index) {
    current = (index + cards.length) % cards.length;
    cards.forEach(function (card, i) {
      card.classList.toggle('is-active', i === current);
    });
    dots.forEach(function (dot, i) {
      dot.classList.toggle('is-active', i === current);
    });
  }

  root.querySelector('.recent-updates__arrow--prev').addEventListener('click', function () {
    show(current - 1);
  });
  root.querySelector('.recent-updates__arrow--next').addEventListener('click', function () {
    show(current + 1);
  });
  dots.forEach(function (dot) {
    dot.addEventListener('click', function () {
      show(parseInt(dot.getAttribute('data-index'), 10));
    });
  });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'ArrowLeft') show(current - 1);
    if (e.key === 'ArrowRight') show(current + 1);
  });
})();
