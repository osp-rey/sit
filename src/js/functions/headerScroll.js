export default function headerScroll() {
  const header = document.querySelector(".header");

  if (header) {
    let lastScrollTop = 0;

    window.addEventListener("scroll", () => {
      let scrollTop = window.pageYOffset || document.documentElement.scrollTop;

      if (scrollTop > 0) {
        header.classList.add("_scroll");
      } else {
        header.classList.remove("_scroll")
      }

      if (scrollTop > lastScrollTop) {
        header.classList.add("_hide");
      } else {
        header.classList.remove("_hide");
      }

      lastScrollTop = scrollTop;
    });
  }
}