export default function burger() {
  const burger = document.querySelector("#burger");

  if (burger) {
    const headerHeight = document.querySelector(".header").clientHeight;

    const burgerToggle = document.querySelector("#burger-toggle");
    const header = document.querySelector(".header");

    burgerToggle.addEventListener("click", () => {
      if (burger.classList.contains("_open")) {
        handleClose();
      } else {
        handleOpen();
      }
    });

    function updateHeightBurger() {
      burger.style.maxHeight = `${window.visualViewport.height - headerHeight}px`;
      burger.style.top = `${headerHeight}px`;
    }

    function handleOpen() {
      document.body.classList.add("body-hidden");
      burger.classList.add("_open");

      updateHeightBurger();
    }
    function handleClose() {
      document.body.classList.remove("body-hidden");
      burger.classList.remove("_open");
    }

    window.visualViewport.addEventListener("resize", updateHeightBurger);
    window.visualViewport.addEventListener("scroll", updateHeightBurger);

    updateHeightBurger();
  }
}
