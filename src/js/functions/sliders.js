export default function sliders() {
  const aboutSlider = document.querySelector(".s-about__slider");

  if (aboutSlider) {
    const swiper = new Swiper(aboutSlider, {
      speed: 900,
      spaceBetween: 10,
      slidesPerView: 1,
      // autoplay: {
      //   delay: 6500
      // },
      navigation: {
        prevEl: ".s-about .slider-arrow._prev",
        nextEl: ".s-about .slider-arrow._next",
      },
      breakpoints: {
        1200: {
          spaceBetween: 20,
          slidesPerView: 1,
        },
        576: {
          spaceBetween: 10,
          slidesPerView: 2,
        },
      },
    });
  }
}
