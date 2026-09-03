const deck = document.querySelector(".deck");
const slides = Array.from(document.querySelectorAll(".slide"));

if (deck && slides.length) {
  let ticking = false;

  const update = () => {
    const center = deck.clientHeight / 2;

    slides.forEach((slide) => {
      const rect = slide.getBoundingClientRect();
      const slideCenter = rect.top + rect.height / 2;
      const distance = Math.abs(slideCenter - center);
      const normalized = Math.min(distance / deck.clientHeight, 1);

      const blur = normalized * 16;
      const opacity = Math.max(1 - normalized * 1.15, 0.12);
      const scale = 1 - normalized * 0.1;

      slide.style.filter = `blur(${blur}px)`;
      slide.style.opacity = opacity;
      slide.style.transform = `scale(${scale})`;
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
