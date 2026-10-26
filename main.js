(() => {
  const motion = window.matchMedia("(prefers-reduced-motion: no-preference)").matches;

  // Work filter: every stage, or only the prototypes that got built.
  const work = document.querySelector(".work");
  const filters = document.querySelector(".filters");
  if (work && filters) {
    filters.hidden = false;
    filters.addEventListener("click", (event) => {
      const button = event.target.closest(".filter");
      if (!button) return;
      for (const b of filters.querySelectorAll(".filter")) {
        b.setAttribute("aria-pressed", String(b === button));
      }
      work.dataset.filter = button.dataset.filter;
    });
  }

  if (!motion) return;

  // Stagger indexes for entrances.
  document.querySelectorAll(".sheet-frame").forEach((el, i) => el.style.setProperty("--i", i % 8));
  document.querySelectorAll(".run").forEach((run) => {
    run.querySelectorAll(".frame").forEach((el, i) => el.style.setProperty("--i", i));
  });
  document.querySelectorAll(".contact > *, .about .reveal").forEach((el, i) => {
    el.style.setProperty("--i", i % 4);
  });

  // Hero sheet opens on load.
  const sheet = document.querySelector(".sheet");
  if (sheet) requestAnimationFrame(() => requestAnimationFrame(() => sheet.classList.add("is-loaded")));

  // Sections enter once as they reach the screen.
  const io = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        entry.target.classList.add("is-in");
        io.unobserve(entry.target);
      }
    },
    { rootMargin: "0px 0px -10% 0px" }
  );
  document
    .querySelectorAll(".run, .work-rail, .contact, .reveal")
    .forEach((el) => io.observe(el));

  // Sheet columns drift at different speeds while the hero scrolls away.
  const cols = [...document.querySelectorAll(".sheet-col")];
  const speeds = [0.12, -0.08, 0.05, -0.05, 0.1, -0.14];
  let ticking = false;
  const drift = () => {
    const y = Math.min(window.scrollY, window.innerHeight);
    cols.forEach((col, i) => col.style.setProperty("--drift", `${y * speeds[i]}px`));
    ticking = false;
  };
  if (cols.length) {
    window.addEventListener(
      "scroll",
      () => {
        if (!ticking) {
          ticking = true;
          requestAnimationFrame(drift);
        }
      },
      { passive: true }
    );
  }
})();
