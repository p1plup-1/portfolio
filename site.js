// Entrances: the parts of each section rise in once, staggered, as they enter the screen.
// The hidden starting state only exists under html.js + no reduced motion (see style.css),
// so without this script, or with reduced motion, everything is simply visible.
(() => {
  const groups = [
    ".hello > *",
    ".work > .tile",
    ".about-intro > *",
    ".about-list",
    ".project-head > *",
    ".project-section",
    ".sketch-wall > img",
    ".project-next",
    ".footer-links",
  ];
  const els = [];
  for (const sel of groups) {
    document.querySelectorAll(sel).forEach((el) => {
      const i = Array.prototype.indexOf.call(el.parentElement.children, el);
      const step = sel === ".sketch-wall > img" ? 45 : 80;
      el.style.setProperty("--d", (i % 8) * step + "ms");
      el.setAttribute("data-reveal", "");
      els.push(el);
    });
  }
  if (!("IntersectionObserver" in window)) {
    els.forEach((el) => el.classList.add("is-in"));
    return;
  }
  const io = new IntersectionObserver(
    (entries) => {
      for (const e of entries) {
        if (e.isIntersecting) {
          e.target.classList.add("is-in");
          io.unobserve(e.target);
        }
      }
    },
    { rootMargin: "0px 0px -8% 0px", threshold: 0.05 }
  );
  els.forEach((el) => io.observe(el));
})();
