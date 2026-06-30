import { slideDown, slideUp } from "./helpFunctions.js";

export default function headerDrop() {
  const drops = document.querySelectorAll("[data-header-drop]");
  let isHeaderScroll = true;

  if (drops.length) {
    const buttons = document.querySelectorAll("[data-header-drop-btn]");
    const backdrop = document.querySelector(".header-drop-backdrop");
    const header = document.querySelector(".header");

    backdrop.addEventListener("click", () => {
      const currentDrop = document.querySelector("[data-header-drop]._open");
      currentDrop.classList.remove("_open");
      backdrop.classList.remove("_active");
      header.classList.remove("_fill");

      slideUp(currentDrop);
      isHeaderScroll = true;
    });

    buttons.forEach((btn) => {
      btn.addEventListener("click", () => {
        const id = btn.dataset.headerDropBtn;
        const currentDrop = document.querySelector(
          `[data-header-drop="${id}"]`,
        );

        if (currentDrop.classList.contains("_slide")) return;

        if (currentDrop.classList.contains("_open")) {
          currentDrop.classList.remove("_open");
          backdrop.classList.remove("_active");
          header.classList.remove("_fill");
          isHeaderScroll = true;
          slideUp(currentDrop);
        } else {
          currentDrop.classList.add("_open");
          backdrop.classList.add("_active");
          header.classList.add("_fill");
          drops.forEach((d) => slideUp(d, 0));
          isHeaderScroll = false;
          setTimeout(() => {
            slideDown(currentDrop);
          }, 0);
        }
      });
    });
  }

  function blockScroll(e) {
    if (!isHeaderScroll) {
      e.preventDefault();
      return false;
    }
  }

  document.addEventListener("wheel", blockScroll, { passive: false });
  document.addEventListener("touchmove", blockScroll, { passive: false });
  document.addEventListener("keydown", blockScroll);
}
