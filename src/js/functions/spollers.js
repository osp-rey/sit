import { slideDown, slideUp } from "./helpFunctions.js";

export default function spollers() {
  const spollers = document.querySelectorAll("[data-spoller]");

  if (spollers.length) {
    let timeSlide = 300;

    spollers.forEach((spoller) => {
      const buttons = spoller.querySelectorAll("[data-spoller-btn]");
      const body = spoller.querySelector("[data-spoller-body]");

      if (!spoller.classList.contains("_active")) {
        slideUp(body, 0);

      }

      buttons.forEach((btn) => {
        let isSlide = false;
        btn.addEventListener("click", () => {
          if (isSlide) return;
          isSlide = true;
          if (spoller.classList.contains("_active")) {
            spoller.classList.remove("_active");
            slideUp(body, timeSlide);
          } else {
            spoller.classList.add("_active");
            slideDown(body, timeSlide);
          }

          setTimeout(() => {
            isSlide = false;
          }, timeSlide);
        });
      });
    });
  }
}
