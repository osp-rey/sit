import burger from "./functions/burger.js";
import formValid from "./functions/formValid.js";
import headerDrop from "./functions/headerDrop.js";
import headerHeight from "./functions/headerHeight.js";
import headerScroll from "./functions/headerScroll.js";
import inputmask from "./functions/inputmask.js";
import mediaAdaptive from "./functions/mediaAdaptive.js";
import sliders from "./functions/sliders.js";
import tab from "./functions/tab.js";

document.addEventListener("DOMContentLoaded", () => {
  headerDrop();
  headerHeight();
  burger();
  headerScroll();
  sliders();
  mediaAdaptive();
  tab();
  formValid();
  inputmask();

  Fancybox.bind("[data-fancybox]", { closeButton: false });
  // Fancybox.show([{ src: "#modal-feedback", type: "inline" }], {
  //   closeButton: false,
  // });
});
