import Swiper from 'swiper';
import { Autoplay } from 'swiper/modules';

import 'swiper/css';

const gallery = document.querySelector('[data-gallery]');

if (gallery) {
  const swiperElement = gallery.querySelector(
    '[data-gallery-swiper]'
  );
  const wrapper = swiperElement?.querySelector(
    '[data-gallery-wrapper]'
  );

  const slides = wrapper
    ? Array.from(
        wrapper.querySelectorAll('[data-gallery-slide]')
      )
    : [];

  const previousButton = gallery.querySelector(
    '[data-gallery-action="previous"]'
  );
  const nextButton = gallery.querySelector(
    '[data-gallery-action="next"]'
  );
  const paginationElement = gallery.querySelector(
    '[data-gallery-pagination]'
  );

  const desktopMedia = window.matchMedia('(min-width: 1440px)');
  const slidesCount = slides.length;

  let mobileSwiper = null;
  let desktopAutoplay = null;
  let currentMode = null;

  let activeIndex = Number(
    swiperElement?.dataset.initialSlide ??
      Math.floor(slidesCount / 2)
  );

  const normalizeIndex = index => {
    return ((index % slidesCount) + slidesCount) % slidesCount;
  };

  activeIndex = normalizeIndex(activeIndex);

  const bullets = [];

  if (paginationElement) {
    paginationElement.innerHTML = '';

    slides.forEach((_, index) => {
      const bullet = document.createElement('button');

      bullet.type = 'button';
      bullet.dataset.galleryBullet = '';

      bullet.setAttribute(
        'aria-label',
        `Перейти до слайда ${index + 1}`
      );

      bullet.addEventListener('click', () => {
        if (desktopMedia.matches) {
          activeIndex = index;

          renderDesktopGallery();
          restartDesktopAutoplay();

          return;
        }

        mobileSwiper?.slideToLoop(index);
      });

      paginationElement.append(bullet);
      bullets.push(bullet);
    });
  }

  const updatePagination = () => {
    bullets.forEach((bullet, index) => {
      const isActive = index === activeIndex;

      bullet.dataset.galleryActive = String(isActive);

      if (isActive) {
        bullet.setAttribute('aria-current', 'true');
      } else {
        bullet.removeAttribute('aria-current');
      }
    });
  };

  const getCircularPosition = slideIndex => {
    let position = slideIndex - activeIndex;

    const half = slidesCount / 2;

    if (position > half) {
      position -= slidesCount;
    }

    if (position < -half) {
      position += slidesCount;
    }

    return position;
  };

  const renderDesktopGallery = () => {
    activeIndex = normalizeIndex(activeIndex);

    slides.forEach((slide, slideIndex) => {
      const position = getCircularPosition(slideIndex);
      const isVisible = Math.abs(position) <= 2;

      slide.removeAttribute('data-gallery-position');
      slide.dataset.galleryVisible = String(isVisible);

      if (!isVisible) {
        slide.setAttribute('aria-hidden', 'true');

        return;
      }

      slide.dataset.galleryPosition = String(position);
      slide.removeAttribute('aria-hidden');
    });

    updatePagination();
  };

  const stopDesktopAutoplay = () => {
    if (!desktopAutoplay) {
      return;
    }

    window.clearInterval(desktopAutoplay);
    desktopAutoplay = null;
  };

  const startDesktopAutoplay = () => {
    stopDesktopAutoplay();

    desktopAutoplay = window.setInterval(() => {
      activeIndex = normalizeIndex(activeIndex + 1);
      renderDesktopGallery();
    }, 3000);
  };

  const restartDesktopAutoplay = () => {
    startDesktopAutoplay();
  };

  const destroyMobileSwiper = () => {
    if (!mobileSwiper) {
      return;
    }

    activeIndex = normalizeIndex(mobileSwiper.realIndex);

    mobileSwiper.destroy(true, true);
    mobileSwiper = null;
  };

  const initializeDesktop = () => {
    destroyMobileSwiper();

    swiperElement.dataset.galleryMode = 'desktop';

    slides.forEach(slide => {
      slide.removeAttribute('style');
    });

    renderDesktopGallery();
    startDesktopAutoplay();
  };

  const clearDesktopState = () => {
    stopDesktopAutoplay();

    swiperElement.removeAttribute('data-gallery-mode');

    slides.forEach(slide => {
      slide.removeAttribute('data-gallery-position');
      slide.removeAttribute('data-gallery-visible');
      slide.removeAttribute('aria-hidden');
      slide.removeAttribute('style');
    });
  };

  const initializeMobile = () => {
    clearDesktopState();

    mobileSwiper = new Swiper(swiperElement, {
      modules: [Autoplay],

      initialSlide: activeIndex,

      loop: true,
      centeredSlides: true,

      slidesPerView: 1.5,
      spaceBetween: 26,

      speed: 500,

      autoplay: {
        delay: 3000,
        disableOnInteraction: false,
        pauseOnMouseEnter: true,
      },

      on: {
        init(instance) {
          activeIndex = normalizeIndex(instance.realIndex);
          updatePagination();
        },

        realIndexChange(instance) {
          activeIndex = normalizeIndex(instance.realIndex);
          updatePagination();
        },
      },
    });
  };

  previousButton?.addEventListener('click', () => {
    if (desktopMedia.matches) {
      activeIndex = normalizeIndex(activeIndex - 1);

      renderDesktopGallery();
      restartDesktopAutoplay();

      return;
    }

    mobileSwiper?.slidePrev();
  });

  nextButton?.addEventListener('click', () => {
    if (desktopMedia.matches) {
      activeIndex = normalizeIndex(activeIndex + 1);

      renderDesktopGallery();
      restartDesktopAutoplay();

      return;
    }

    mobileSwiper?.slideNext();
  });

  const initializeGallery = () => {
    const newMode = desktopMedia.matches
      ? 'desktop'
      : 'mobile';

    if (newMode === currentMode) {
      return;
    }

    currentMode = newMode;

    if (newMode === 'desktop') {
      initializeDesktop();
    } else {
      initializeMobile();
    }
  };

  if (typeof desktopMedia.addEventListener === 'function') {
    desktopMedia.addEventListener(
      'change',
      initializeGallery
    );
  } else {
    desktopMedia.addListener(initializeGallery);
  }

  initializeGallery();
}