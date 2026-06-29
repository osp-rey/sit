import { slideDown, slideUp } from "./helpFunctions.js";

export default function headerDrop() {
  const drops = document.querySelectorAll("[data-header-drop]");

  if (drops.length) {
    const buttons = document.querySelectorAll("[data-header-drop-btn]");
    const backdrop = document.querySelector(".header-drop-backdrop");
    const headerInside = document.querySelector(".header__inside");

    backdrop.addEventListener("click", () => {
      const currentDrop = document.querySelector("[data-header-drop]._open");
      currentDrop.classList.remove("_open");
      backdrop.classList.remove("_active");
      headerInside.classList.remove("_active");
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
          headerInside.classList.remove("_active");
          slideUp(currentDrop);
        } else {
          currentDrop.classList.add("_open");
          backdrop.classList.add("_active");
          headerInside.classList.add("_active");
          drops.forEach((d) => slideUp(d, 0));
          setTimeout(() => {
            slideDown(currentDrop);
          }, 0);
        }
      });
    });
  }
}
