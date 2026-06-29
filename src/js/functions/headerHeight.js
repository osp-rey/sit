export default function headerHeight() {
  const header = document.querySelector(".header");
  if (header) {
    changeHeight();

    window.addEventListener("resize", changeHeight);

    function changeHeight() {
      const headerInside = header.querySelector(".header__inside");

      header.style.height = `${headerInside.clientHeight}px`;
    }
  }
}
