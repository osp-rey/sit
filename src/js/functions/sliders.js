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
    window.matchMedia("(max-width: 1024px)").matches
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
      const idTab = slider.closest("[data-tab]")?.dataset.tab;
      const navTab = document.querySelector(
        `.s-products__toggle [data-tab="${idTab}"]`,
      );
      let navigation = {
        prevEl: navTab?.querySelector(".slider-arrow._prev"),
        nextEl: navTab?.querySelector(".slider-arrow._next"),
      };

      if (!idTab) {
        navigation = {
          prevEl: ".s-products .slider-arrow._prev",
          nextEl: ".s-products .slider-arrow._next",
        };
      }

      const swiper = new Swiper(slider, {
        speed: 900,
        spaceBetween: 10,
        slidesPerView: "auto",
        navigation,
        breakpoints: {
          1540: {
            spaceBetween: 16,
            slidesPerView: +slider.dataset.startPreview || 6,
          },
          1025: {
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

  const reviewsSlider = document.querySelector(".s-reviews__slider");

  if (reviewsSlider && window.matchMedia("(min-width: 576px)").matches) {
    const swiper = new Swiper(reviewsSlider, {
      speed: 900,
      spaceBetween: 10,
      slidesPerView: 2,
      navigation: {
        prevEl: ".s-reviews .slider-arrow._prev",
        nextEl: ".s-reviews .slider-arrow._next",
      },
      breakpoints: {
        1365: {
          spaceBetween: 16,
          slidesPerView: 4,
        },
        1025: {
          spaceBetween: 16,
          slidesPerView: 3,
        },
      },
    });
  }

  const rowNavSliders = document.querySelectorAll(".row-nav");

  if (rowNavSliders.length) {
    rowNavSliders.forEach((slider) => {
      const swiper = new Swiper(slider, {
        speed: 900,
        spaceBetween: 4,
        slidesPerView: "auto",
        breakpoints: {
          769: {
            spaceBetween: 6,
            slidesPerView: "auto",
          },
        },
      });
    });
  }

  const productSlider = document.querySelector(".s-product__slider");

  if (productSlider) {
    const productThumbSlider = document.querySelector(
      ".s-product__thumb-slider",
    );

    const thumbSwiper = new Swiper(productThumbSlider, {
      speed: 900,
      spaceBetween: 5,
      slidesPerView: 5,
      navigation: {
        prevEl: ".s-product__thumb-wrap .slider-arrow._prev",
        nextEl: ".s-product__thumb-wrap .slider-arrow._next",
      },
      breakpoints: {
        576: {
          spaceBetween: 10,
          slidesPerView: 5,
        },
      },
    });

    const swiper = new Swiper(productSlider, {
      speed: 900,
      slidesPerView: "auto",
      spaceBetween: 10,
      navigation: {
        prevEl: productSlider.querySelector(".slider-arrow._prev"),
        nextEl: productSlider.querySelector(".slider-arrow._next"),
      },
      thumbs: {
        swiper: thumbSwiper,
      },
      breakpoints: {
        1200: {
          slidesPerView: 1,
          spaceBetween: 20,
        },
      },
    });
  }

  const previewSlider = document.querySelector(".s-preview__slider");

  if (previewSlider) {
    const swiper = new Swiper(previewSlider, {
      speed: 900,
      spaceBetween: 10,
      slidesPerView: "auto",
      pagination: {
        el: ".s-preview .slider-pagination-l",
        clickable: true,
      },
      navigation: {
        prevEl: ".s-preview .slider-arrow._prev",
        nextEl: ".s-preview .slider-arrow._next",
      },
      autoplay: {
        delay: 6000
      },
      breakpoints: {
        1200: {
          spaceBetween: 15,
          slidesPerView: 3,
        },
      },
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
