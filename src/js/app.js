import burger from "./functions/burger.js";
import headerDrop from "./functions/headerDrop.js";
import headerHeight from "./functions/headerHeight.js";
import headerScroll from "./functions/headerScroll.js";
import sliders from "./functions/sliders.js";

document.addEventListener("DOMContentLoaded", () => {
  headerDrop();
  headerHeight();
  burger();
  headerScroll();
  sliders();

  Fancybox.bind("[data-fancybox]", { closeButton: false });
});
