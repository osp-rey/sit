import { slideDown, slideUp } from "./helpFunctions.js";

export default function spollers() {
  const spollers = document.querySelectorAll("[data-spoller]");

  if (spollers.length) {
    spollers.forEach((spoller) => {
      const buttons = spoller.querySelectorAll("[data-spoller-btn]");
      const body = spoller.querySelector("[data-spoller-body]");

      slideUp(body, 0);

      buttons.forEach((btn) => {
        btn.addEventListener("click", () => {
          if (spoller.classList.contains("_active")) {
            spoller.classList.remove("_active");
            slideUp(body);
          } else {
            spoller.classList.add("_active");
            slideDown(body);
          }
        });
      });
    });
  }
}
