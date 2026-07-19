(() => {
    "use strict";
    function burger() {
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
                header.classList.add("_static");
                updateHeightBurger();
            }
            function handleClose() {
                document.body.classList.remove("body-hidden");
                burger.classList.remove("_open");
                header.classList.remove("_static");
            }
            window.visualViewport.addEventListener("resize", updateHeightBurger);
            window.visualViewport.addEventListener("scroll", updateHeightBurger);
            updateHeightBurger();
        }
    }
    function disabledButtonsDraggable() {
        const buttons = document.querySelectorAll(".btn-s");
        if (buttons.length) {
            buttons.forEach(btn => {
                btn.setAttribute("draggable", false);
            });
        }
    }
    function formValid() {
        const modalFeedbackForm = document.querySelector("#modal-feedback .modal__form");
        if (modalFeedbackForm) {
            const validator = new JustValidate(modalFeedbackForm);
            validator.addField("#modal-feedback-name", [ {
                rule: "required"
            } ]).addField("#modal-feedback-tel", [ {
                rule: "required"
            } ]).addField("#modal-feedback-policy", [ {
                rule: "required"
            } ]);
        }
        const connectForm = document.querySelector(".s-connect__form");
        if (connectForm) {
            const validator = new JustValidate(connectForm);
            validator.addField("#connect-name", [ {
                rule: "required"
            } ]).addField("#connect-tel", [ {
                rule: "required"
            } ]).addField("#connect-policy", [ {
                rule: "required"
            } ]);
        }
        const briefForm = document.querySelector(".s-brief__form");
        if (briefForm) {
            const validator = new JustValidate(briefForm);
            validator.addField("#brief-name", [ {
                rule: "required"
            } ]).addField("#brief-tel", [ {
                rule: "required"
            } ]).addField("#brief-policy", [ {
                rule: "required"
            } ]);
        }
    }
    function createScript(url, type) {
        if (!url) return;
        return new Promise((resolve, reject) => {
            const script = document.querySelector(`script[src="${url}"]`);
            if (script) {
                resolve(script);
            } else {
                const htmlScript = document.createElement("script");
                htmlScript.src = url;
                if (type) {
                    htmlScript.type = type;
                }
                htmlScript.onload = () => {
                    resolve(htmlScript);
                };
                htmlScript.onerror = () => {
                    reject(new Error(`Не удалось загрузить скрипт: ${url}`));
                };
                document.head.appendChild(htmlScript);
            }
        });
    }
    function slideUp(target, duration = 500, showmore = 0) {
        if (!target.classList.contains("_slide")) {
            target.classList.add("_slide");
            target.style.transitionProperty = "height, margin, padding";
            target.style.transitionDuration = duration + "ms";
            target.style.height = `${target.offsetHeight}px`;
            target.offsetHeight;
            target.style.overflow = "hidden";
            target.style.height = showmore ? `${showmore}px` : `0px`;
            target.style.paddingTop = 0;
            target.style.paddingBottom = 0;
            target.style.marginTop = 0;
            target.style.marginBottom = 0;
            window.setTimeout(() => {
                target.hidden = !showmore ? true : false;
                !showmore ? target.style.removeProperty("height") : null;
                target.style.removeProperty("padding-top");
                target.style.removeProperty("padding-bottom");
                target.style.removeProperty("margin-top");
                target.style.removeProperty("margin-bottom");
                !showmore ? target.style.removeProperty("overflow") : null;
                target.style.removeProperty("transition-duration");
                target.style.removeProperty("transition-property");
                target.classList.remove("_slide");
                document.dispatchEvent(new CustomEvent("slideUpDone", {
                    detail: {
                        target
                    }
                }));
            }, duration);
        }
    }
    function slideDown(target, duration = 500, showmore = 0) {
        if (!target.classList.contains("_slide")) {
            target.classList.add("_slide");
            target.hidden = target.hidden ? false : null;
            showmore ? target.style.removeProperty("height") : null;
            let height = target.offsetHeight;
            target.style.overflow = "hidden";
            target.style.height = showmore ? `${showmore}px` : `0px`;
            target.style.paddingTop = 0;
            target.style.paddingBottom = 0;
            target.style.marginTop = 0;
            target.style.marginBottom = 0;
            target.offsetHeight;
            target.style.transitionProperty = "height, margin, padding";
            target.style.transitionDuration = duration + "ms";
            target.style.height = height + "px";
            target.style.removeProperty("padding-top");
            target.style.removeProperty("padding-bottom");
            target.style.removeProperty("margin-top");
            target.style.removeProperty("margin-bottom");
            window.setTimeout(() => {
                target.style.removeProperty("height");
                target.style.removeProperty("overflow");
                target.style.removeProperty("transition-duration");
                target.style.removeProperty("transition-property");
                target.classList.remove("_slide");
                document.dispatchEvent(new CustomEvent("slideDownDone", {
                    detail: {
                        target
                    }
                }));
            }, duration);
        }
    }
    function createEl(tag, classes = "") {
        const item = document.createElement(tag);
        if (classes) {
            classes.split(" ").forEach(c => {
                item.classList.add(c);
            });
        }
        return item;
    }
    function headerDrop() {
        const drops = document.querySelectorAll("[data-header-drop]");
        let isHeaderScroll = true;
        if (drops.length) {
            const buttons = document.querySelectorAll("[data-header-drop-btn]");
            const backdrop = document.querySelector(".header-drop-backdrop");
            const header = document.querySelector(".header");
            backdrop.addEventListener("click", () => {
                const currentDrop = document.querySelector("[data-header-drop]._open");
                currentDrop.classList.remove("_open");
                backdrop.classList.remove("_active");
                header.classList.remove("_fill");
                slideUp(currentDrop);
                isHeaderScroll = true;
            });
            buttons.forEach(btn => {
                btn.addEventListener("click", () => {
                    const id = btn.dataset.headerDropBtn;
                    const currentDrop = document.querySelector(`[data-header-drop="${id}"]`);
                    if (currentDrop.classList.contains("_slide")) return;
                    if (currentDrop.classList.contains("_open")) {
                        currentDrop.classList.remove("_open");
                        backdrop.classList.remove("_active");
                        header.classList.remove("_fill");
                        isHeaderScroll = true;
                        slideUp(currentDrop);
                    } else {
                        currentDrop.classList.add("_open");
                        backdrop.classList.add("_active");
                        header.classList.add("_fill");
                        drops.forEach(d => slideUp(d, 0));
                        isHeaderScroll = false;
                        setTimeout(() => {
                            slideDown(currentDrop);
                        }, 0);
                    }
                });
            });
        }
        function blockScroll(e) {
            if (!isHeaderScroll) {
                e.preventDefault();
                return false;
            }
        }
        document.addEventListener("wheel", blockScroll, {
            passive: false
        });
        document.addEventListener("touchmove", blockScroll, {
            passive: false
        });
        document.addEventListener("keydown", blockScroll);
    }
    function headerHeight() {
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
    function headerScroll() {
        const header = document.querySelector(".header");
        if (header) {
            let lastScrollTop = 0;
            function changeScroll() {
                let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
                if (scrollTop > 0) {
                    header.classList.add("_scroll");
                } else {
                    header.classList.remove("_scroll");
                }
                if (scrollTop > lastScrollTop && scrollTop > header.clientHeight) {
                    header.classList.add("_hide");
                } else {
                    header.classList.remove("_hide");
                }
                lastScrollTop = scrollTop;
            }
            window.addEventListener("scroll", changeScroll);
            changeScroll();
        }
    }
    function inputFiles() {
        const inputs = document.querySelectorAll(".input-file");
        if (inputs.length) {
            inputs.forEach(input => {
                input.addEventListener("change", e => {
                    const file = e.target.files[0];
                    const label = document.querySelector(`label[for="${input.id}"]`);
                    const labelText = label.querySelector(".label-file-name");
                    labelText.textContent = file.name;
                });
            });
        }
    }
    function inputmask() {
        const inputs = document.querySelectorAll('input[type="tel"]');
        const im = new Inputmask("+7 (999) 999-99-99");
        im.mask(inputs);
    }
    function map() {
        const maps = document.querySelectorAll(".map");
        if (maps.length) {
            maps.forEach(map => {
                const options = {
                    root: null,
                    rootMargin: "0px",
                    scrollMargin: "0px",
                    threshold: .01
                };
                function callback(entries, observer) {
                    entries.forEach(entry => {
                        const target = entry.target;
                        if (entry.isIntersecting) {
                            createScript("https://api-maps.yandex.ru/2.1/?apikey=b46e9249-4925-4460-b11c-3aaf76ad0115&lang=ru_RU", "text/javascript").then(() => handlerCreateMap(target));
                            observer.unobserve(target);
                        }
                    });
                }
                const observer = new IntersectionObserver(callback, options);
                observer.observe(map);
            });
            function handlerCreateMap(map) {
                const center = JSON.parse(map.dataset.center);
                const zoom = Number(map.dataset.zoom);
                const iconHref = map.dataset.icon;
                let iconSize = [ 162, 178 ];
                let iconPosition = [ -80, -125 ];
                let objectMark = {};
                if (iconHref) {
                    objectMark = {
                        iconLayout: "default#image",
                        iconImageHref: iconHref,
                        iconImageSize: iconSize,
                        iconImageOffset: iconPosition
                    };
                }
                function init() {
                    const htmlMap = new ymaps.Map(map, {
                        center,
                        zoom
                    });
                    const placemark = new ymaps.Placemark(center, {}, objectMark);
                    htmlMap.geoObjects.add(placemark);
                    htmlMap.controls.remove("geolocationControl");
                    htmlMap.controls.remove("searchControl");
                    htmlMap.controls.remove("trafficControl");
                    htmlMap.controls.remove("typeSelector");
                    htmlMap.controls.remove("fullscreenControl");
                    htmlMap.controls.remove("rulerControl");
                }
                ymaps.ready(init);
            }
        }
    }
    function mediaAdaptive() {
        function DynamicAdapt(type) {
            this.type = type;
        }
        DynamicAdapt.prototype.init = function() {
            const _this = this;
            this.оbjects = [];
            this.daClassname = "_dynamic_adapt_";
            this.nodes = document.querySelectorAll("[data-da]");
            for (let i = 0; i < this.nodes.length; i++) {
                const node = this.nodes[i];
                const data = node.dataset.da.trim();
                const dataArray = data.split(",");
                const оbject = {};
                оbject.element = node;
                оbject.parent = node.parentNode;
                оbject.destination = document.querySelector(dataArray[0].trim());
                оbject.breakpoint = dataArray[1] ? dataArray[1].trim() : "767";
                оbject.place = dataArray[2] ? dataArray[2].trim() : "last";
                оbject.index = this.indexInParent(оbject.parent, оbject.element);
                this.оbjects.push(оbject);
            }
            this.arraySort(this.оbjects);
            this.mediaQueries = Array.prototype.map.call(this.оbjects, function(item) {
                return "(" + this.type + "-width: " + item.breakpoint + "px)," + item.breakpoint;
            }, this);
            this.mediaQueries = Array.prototype.filter.call(this.mediaQueries, function(item, index, self) {
                return Array.prototype.indexOf.call(self, item) === index;
            });
            for (let i = 0; i < this.mediaQueries.length; i++) {
                const media = this.mediaQueries[i];
                const mediaSplit = String.prototype.split.call(media, ",");
                const matchMedia = window.matchMedia(mediaSplit[0]);
                const mediaBreakpoint = mediaSplit[1];
                const оbjectsFilter = Array.prototype.filter.call(this.оbjects, function(item) {
                    return item.breakpoint === mediaBreakpoint;
                });
                matchMedia.addListener(function() {
                    _this.mediaHandler(matchMedia, оbjectsFilter);
                });
                this.mediaHandler(matchMedia, оbjectsFilter);
            }
        };
        DynamicAdapt.prototype.mediaHandler = function(matchMedia, оbjects) {
            if (matchMedia.matches) {
                for (let i = 0; i < оbjects.length; i++) {
                    const оbject = оbjects[i];
                    оbject.index = this.indexInParent(оbject.parent, оbject.element);
                    this.moveTo(оbject.place, оbject.element, оbject.destination);
                }
            } else {
                for (let i = 0; i < оbjects.length; i++) {
                    const оbject = оbjects[i];
                    if (оbject.element.classList.contains(this.daClassname)) {
                        this.moveBack(оbject.parent, оbject.element, оbject.index);
                    }
                }
            }
        };
        DynamicAdapt.prototype.moveTo = function(place, element, destination) {
            element.classList.add(this.daClassname);
            if (place === "last" || place >= destination.children.length) {
                destination.insertAdjacentElement("beforeend", element);
                return;
            }
            if (place === "first") {
                destination.insertAdjacentElement("afterbegin", element);
                return;
            }
            destination.children[place].insertAdjacentElement("beforebegin", element);
        };
        DynamicAdapt.prototype.moveBack = function(parent, element, index) {
            element.classList.remove(this.daClassname);
            if (parent.children[index] !== undefined) {
                parent.children[index].insertAdjacentElement("beforebegin", element);
            } else {
                parent.insertAdjacentElement("beforeend", element);
            }
        };
        DynamicAdapt.prototype.indexInParent = function(parent, element) {
            const array = Array.prototype.slice.call(parent.children);
            return Array.prototype.indexOf.call(array, element);
        };
        DynamicAdapt.prototype.arraySort = function(arr) {
            if (this.type === "min") {
                Array.prototype.sort.call(arr, function(a, b) {
                    if (a.breakpoint === b.breakpoint) {
                        if (a.place === b.place) {
                            return 0;
                        }
                        if (a.place === "first" || b.place === "last") {
                            return -1;
                        }
                        if (a.place === "last" || b.place === "first") {
                            return 1;
                        }
                        return a.place - b.place;
                    }
                    return a.breakpoint - b.breakpoint;
                });
            } else {
                Array.prototype.sort.call(arr, function(a, b) {
                    if (a.breakpoint === b.breakpoint) {
                        if (a.place === b.place) {
                            return 0;
                        }
                        if (a.place === "first" || b.place === "last") {
                            return 1;
                        }
                        if (a.place === "last" || b.place === "first") {
                            return -1;
                        }
                        return b.place - a.place;
                    }
                    return b.breakpoint - a.breakpoint;
                });
                return;
            }
        };
        const da = new DynamicAdapt("max");
        da.init();
    }
    function moreReviews() {
        const items = document.querySelectorAll(".s-reviews .swiper-slide");
        if (items.length) {
            const btn = document.querySelector(".s-reviews__btn-more");
            const count = 6;
            const hideItems = Array.from(items).filter(item => window.getComputedStyle(item).display === "none");
            if (hideItems.length === 0) btn.remove();
            btn.addEventListener("click", () => {
                const items = document.querySelectorAll(".s-reviews .swiper-slide");
                const hideItems = Array.from(items).filter(item => window.getComputedStyle(item).display === "none");
                hideItems.splice(0, count).forEach(item => {
                    item.classList.add("_active");
                    setTimeout(() => {
                        item.classList.add("_show");
                    });
                });
                if (hideItems.length <= 0) btn.remove();
            });
        }
    }
    function sliders() {
        const aboutSlider = document.querySelector(".s-about__slider");
        if (aboutSlider) {
            const swiper = new Swiper(aboutSlider, {
                speed: 900,
                spaceBetween: 10,
                slidesPerView: 1,
                autoplay: {
                    delay: 6500
                },
                navigation: {
                    prevEl: ".s-about .slider-arrow._prev",
                    nextEl: ".s-about .slider-arrow._next"
                },
                breakpoints: {
                    1200: {
                        spaceBetween: 20,
                        slidesPerView: 1
                    },
                    576: {
                        spaceBetween: 10,
                        slidesPerView: 2
                    }
                }
            });
        }
        const productsNavSliders = document.querySelectorAll(".s-products__slider-nav");
        if (productsNavSliders.length && window.matchMedia("(max-width: 1025px)").matches) {
            productsNavSliders.forEach(slider => {
                const swiper = new Swiper(slider, {
                    speed: 900,
                    spaceBetween: 4,
                    slidesPerView: "auto"
                });
            });
        }
        const productsSliders = document.querySelectorAll(".s-products__slider");
        if (productsSliders.length) {
            productsSliders.forEach(slider => {
                const idTab = slider.closest("[data-tab]")?.dataset.tab;
                const navTab = document.querySelector(`.s-products__toggle [data-tab="${idTab}"]`);
                let navigation = {
                    prevEl: navTab?.querySelector(".slider-arrow._prev"),
                    nextEl: navTab?.querySelector(".slider-arrow._next")
                };
                if (!idTab) {
                    navigation = {
                        prevEl: ".s-products .slider-arrow._prev",
                        nextEl: ".s-products .slider-arrow._next"
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
                            slidesPerView: +slider.dataset.startPreview || 6
                        },
                        1025: {
                            spaceBetween: 16,
                            slidesPerView: 5
                        },
                        700: {
                            spaceBetween: 8,
                            slidesPerView: 4
                        }
                    },
                    on: {
                        init: function() {
                            updateVisibleSlides(this);
                        },
                        slideChange: function() {
                            updateVisibleSlides(this);
                        },
                        resize: function() {
                            updateVisibleSlides(this);
                        }
                    }
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
                    nextEl: ".s-reviews .slider-arrow._next"
                },
                breakpoints: {
                    1365: {
                        spaceBetween: 16,
                        slidesPerView: 4
                    },
                    1025: {
                        spaceBetween: 16,
                        slidesPerView: 3
                    }
                }
            });
        }
        const rowNavSliders = document.querySelectorAll(".row-nav");
        if (rowNavSliders.length) {
            rowNavSliders.forEach(slider => {
                const swiper = new Swiper(slider, {
                    speed: 900,
                    spaceBetween: 4,
                    slidesPerView: "auto",
                    breakpoints: {
                        769: {
                            spaceBetween: 6,
                            slidesPerView: "auto"
                        }
                    }
                });
            });
        }
        const productSlider = document.querySelector(".s-product__slider");
        if (productSlider) {
            const productThumbSlider = document.querySelector(".s-product__thumb-slider");
            const thumbSwiper = new Swiper(productThumbSlider, {
                speed: 900,
                spaceBetween: 5,
                slidesPerView: 5,
                navigation: {
                    prevEl: ".s-product__thumb-wrap .slider-arrow._prev",
                    nextEl: ".s-product__thumb-wrap .slider-arrow._next"
                },
                breakpoints: {
                    576: {
                        spaceBetween: 10,
                        slidesPerView: 5
                    }
                }
            });
            const swiper = new Swiper(productSlider, {
                speed: 900,
                slidesPerView: "auto",
                spaceBetween: 10,
                navigation: {
                    prevEl: productSlider.querySelector(".slider-arrow._prev"),
                    nextEl: productSlider.querySelector(".slider-arrow._next")
                },
                thumbs: {
                    swiper: thumbSwiper
                },
                breakpoints: {
                    1200: {
                        slidesPerView: 1,
                        spaceBetween: 20
                    }
                }
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
                    clickable: true
                },
                navigation: {
                    prevEl: ".s-preview .slider-arrow._prev",
                    nextEl: ".s-preview .slider-arrow._next"
                },
                autoplay: {
                    delay: 6e3
                },
                breakpoints: {
                    1200: {
                        spaceBetween: 15,
                        slidesPerView: 3
                    }
                }
            });
        }
    }
    function updateVisibleSlides(swiper) {
        const visibleCount = Math.ceil(swiper.params.slidesPerView);
        swiper.slides.forEach(slide => {
            slide.classList.remove("_visible");
        });
        for (let i = 0; i < visibleCount; i++) {
            const index = (swiper.activeIndex + i) % swiper.slides.length;
            if (swiper.slides[index]) {
                swiper.slides[index].classList.add("_visible");
            }
        }
    }
    function spollers() {
        const spollers = document.querySelectorAll("[data-spoller]");
        if (spollers.length) {
            let timeSlide = 300;
            spollers.forEach(spoller => {
                const buttons = spoller.querySelectorAll("[data-spoller-btn]");
                const body = spoller.querySelector("[data-spoller-body]");
                if (!spoller.classList.contains("_active")) {
                    slideUp(body, 0);
                }
                buttons.forEach(btn => {
                    let isSlide = false;
                    btn.addEventListener("click", () => {
                        if (isSlide) return;
                        isSlide = true;
                        if (spoller.classList.contains("_active")) {
                            spoller.classList.remove("_active");
                            slideUp(body, timeSlide);
                        } else {
                            spoller.classList.add("_active");
                            slideDown(body, timeSlide);
                        }
                        setTimeout(() => {
                            isSlide = false;
                        }, timeSlide);
                    });
                });
            });
        }
    }
    function tab() {
        const buttons = document.querySelectorAll("[data-tab-btn]");
        if (buttons.length) {
            buttons.forEach(btn => {
                btn.addEventListener("click", () => {
                    const container = btn.closest(".tabs");
                    const tabId = btn.dataset.tabBtn;
                    const allButtons = container.querySelector(".tabs-nav").querySelectorAll("[data-tab-btn]");
                    const allTabs = [];
                    const allTabsContents = container.querySelectorAll(".tabs-content");
                    allTabsContents.forEach(tabsContent => {
                        const tabs = Array.from(tabsContent.children).filter(child => child.hasAttribute("data-tab"));
                        allTabs.push(...tabs);
                    });
                    const currentTabs = container.querySelectorAll(`[data-tab="${tabId}"]`);
                    allTabs.forEach(t => {
                        t.classList.remove("_show");
                        setTimeout(() => {
                            t.classList.remove("_active");
                        }, 150);
                    });
                    setTimeout(() => {
                        currentTabs.forEach(t => {
                            t.classList.add("_active");
                            setTimeout(() => {
                                t.classList.add("_show");
                            }, 150);
                        });
                    }, 150);
                    allButtons.forEach(b => b.classList.remove("_active"));
                    btn.classList.add("_active");
                });
            });
        }
    }
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
        moreReviews();
        spollers();
        inputFiles();
        map();
        disabledButtonsDraggable();
        Fancybox.bind("[data-fancybox]", {
            closeButton: false
        });
    });
})();