const deck = document.querySelector(".deck");
const slides = Array.from(document.querySelectorAll(".slide"));

if (deck && slides.length) {
  let ticking = false;

  const update = () => {
    const viewportCenter = deck.clientHeight / 2;

    slides.forEach((slide) => {
      const rect = slide.getBoundingClientRect();
      const slideCenter = rect.top + rect.height / 2;
      const distance = Math.abs(slideCenter - viewportCenter);
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

  // Turn wheel input into one deliberate, animated step between slides
  // instead of raw free-scrolling.
  const nearestIndex = () => {
    const viewportCenter = deck.clientHeight / 2;
    let closest = 0;
    let closestDistance = Infinity;

    slides.forEach((slide, i) => {
      const rect = slide.getBoundingClientRect();
      const distance = Math.abs(rect.top + rect.height / 2 - viewportCenter);
      if (distance < closestDistance) {
        closestDistance = distance;
        closest = i;
      }
    });

    return closest;
  };

  let animating = false;

  const goTo = (index) => {
    const target = Math.max(0, Math.min(slides.length - 1, index));
    animating = true;
    slides[target].scrollIntoView({ behavior: "smooth", block: "center" });
    window.clearTimeout(goTo.timer);
    goTo.timer = window.setTimeout(() => {
      animating = false;
    }, 700);
  };

  deck.addEventListener(
    "wheel",
    (e) => {
      e.preventDefault();
      if (animating) return;
      goTo(nearestIndex() + (e.deltaY > 0 ? 1 : -1));
    },
    { passive: false }
  );

  window.addEventListener("keydown", (e) => {
    if (e.key === "ArrowDown" || e.key === "PageDown") {
      e.preventDefault();
      if (!animating) goTo(nearestIndex() + 1);
    } else if (e.key === "ArrowUp" || e.key === "PageUp") {
      e.preventDefault();
      if (!animating) goTo(nearestIndex() - 1);
    }
  });
}
