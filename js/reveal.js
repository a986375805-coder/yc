// 轻量滚动显现 + 手风琴互斥 —— 尊重 prefers-reduced-motion
(function () {
  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // ---- 滚动显现 ----
  if (!reduce) {
    var els = document.querySelectorAll(".job, .work, .sum-card, .section > .metrics, .edu-card, .acc");
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) {
          e.target.classList.add("in");
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.05, rootMargin: "0px 0px -5% 0px" });

    els.forEach(function (el) {
      el.classList.add("reveal");
      io.observe(el);
    });
  }

  // ---- 手风琴互斥：同时只展开一个 ----
  var groups = document.querySelectorAll(".accordion");
  groups.forEach(function (group) {
    var details = group.querySelectorAll("details.acc");
    details.forEach(function (d) {
      d.addEventListener("toggle", function () {
        if (d.open) {
          details.forEach(function (other) {
            if (other !== d) other.open = false;
          });
        }
      });
    });
  });
})();
