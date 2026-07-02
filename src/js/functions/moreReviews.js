export default function moreReviews() {
  const items = document.querySelectorAll(".s-reviews .swiper-slide");

  if (items.length) {
    const btn = document.querySelector(".s-reviews__btn-more");
    const count = 6;
    const hideItems = Array.from(items).filter(
      (item) => window.getComputedStyle(item).display === "none",
    );

    if (hideItems.length === 0) btn.remove();

    btn.addEventListener("click", () => {
      const items = document.querySelectorAll(".s-reviews .swiper-slide");
      const hideItems = Array.from(items).filter(
        (item) => window.getComputedStyle(item).display === "none",
      );

      hideItems.splice(0, count).forEach((item) => {
        item.classList.add("_active");

        setTimeout(() => {
          item.classList.add("_show");
        });
      });

      if (hideItems.length <= 0) btn.remove();
    });
  }
}
