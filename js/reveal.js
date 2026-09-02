// 轻量滚动显现 —— 尊重 prefers-reduced-motion
(function () {
  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reduce) return;

  var els = document.querySelectorAll(".job, .work, .sum-card, .section > .metrics, .edu-card");
  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (e.isIntersecting) {
        e.target.classList.add("in");
        io.unobserve(e.target);
      }
    });
  }, { threshold: 0.06, rootMargin: "0px 0px -6% 0px" });

  els.forEach(function (el) {
    el.classList.add("reveal");
    io.observe(el);
  });
})();
