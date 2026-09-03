const deck = document.querySelector(".deck");
const slides = Array.from(document.querySelectorAll(".slide"));

if (deck && slides.length) {
  let ticking = false;

  const update = () => {
    slides.forEach((slide) => {
      const rect = slide.getBoundingClientRect();
      const distance = Math.abs(rect.top);
      const normalized = Math.min(distance / rect.height, 1);

      const inFocus = normalized < 0.03;
      const blur = normalized * 14;
      const opacity = Math.max(1 - normalized * 0.85, 0.4);

      slide.style.filter = inFocus ? "none" : `blur(${blur}px)`;
      slide.style.opacity = inFocus ? 1 : opacity;
    });

    ticking = false;
  };

  const onScroll = () => {
    if (!ticking) {
      requestAnimationFrame(update);
      ticking = true;
    }
  };

  deck.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("resize", update);
  update();
}
