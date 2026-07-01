export default function sliders() {
  const aboutSlider = document.querySelector(".s-about__slider");

  if (aboutSlider) {
    const swiper = new Swiper(aboutSlider, {
      speed: 900,
      spaceBetween: 10,
      slidesPerView: 1,
      autoplay: {
        delay: 6500,
      },
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

  const productsNavSliders = document.querySelectorAll(
    ".s-products__slider-nav",
  );

  if (
    productsNavSliders.length &&
    window.matchMedia("(max-width: 991px)").matches
  ) {
    productsNavSliders.forEach((slider) => {
      const swiper = new Swiper(slider, {
        speed: 900,
        spaceBetween: 4,
        slidesPerView: "auto",
      });
    });
  }
  const productsSliders = document.querySelectorAll(".s-products__slider");

  if (productsSliders.length) {
    productsSliders.forEach((slider) => {
      const idTab = slider.closest("[data-tab]").dataset.tab;
      const navTab = document.querySelector(
        `.s-products__toggle [data-tab="${idTab}"]`,
      );
      const swiper = new Swiper(slider, {
        speed: 900,
        spaceBetween: 10,
        slidesPerView: "auto",
        navigation: {
          prevEl: navTab?.querySelector(".slider-arrow._prev"),
          nextEl: navTab?.querySelector(".slider-arrow._next"),
        },
        breakpoints: {
          1540: {
            spaceBetween: 16,
            slidesPerView: 6,
          },
          992: {
            spaceBetween: 16,
            slidesPerView: 5,
          },
          700: {
            spaceBetween: 8,
            slidesPerView: 4,
          },
        },
        on: {
          init: function () {
            updateVisibleSlides(this);
          },
          slideChange: function () {
            updateVisibleSlides(this);
          },
          resize: function () {
            updateVisibleSlides(this);
          },
        },
      });
    });
  }
}

function updateVisibleSlides(swiper) {
  const visibleCount = Math.ceil(swiper.params.slidesPerView);

  swiper.slides.forEach((slide) => {
    slide.classList.remove("_visible");
  });

  for (let i = 0; i < visibleCount; i++) {
    const index = (swiper.activeIndex + i) % swiper.slides.length;
    if (swiper.slides[index]) {
      swiper.slides[index].classList.add("_visible");
    }
  }
}
