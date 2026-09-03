const dropdowns = document.querySelectorAll(".dropdown");

dropdowns.forEach((dropdown) => {
  const toggle = dropdown.querySelector(".dropdown-toggle");

  toggle.addEventListener("click", (e) => {
    e.stopPropagation();
    const isOpen = dropdown.classList.contains("open");

    dropdowns.forEach((d) => {
      d.classList.remove("open");
      d.querySelector(".dropdown-toggle").setAttribute("aria-expanded", "false");
    });

    if (!isOpen) {
      dropdown.classList.add("open");
      toggle.setAttribute("aria-expanded", "true");
    }
  });
});

document.addEventListener("click", () => {
  dropdowns.forEach((d) => {
    d.classList.remove("open");
    d.querySelector(".dropdown-toggle").setAttribute("aria-expanded", "false");
  });
});
