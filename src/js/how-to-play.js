import Swiper from 'swiper';
import { Navigation, Pagination } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const HOW_SWIPER_BREAKPOINT = 1440;

const howSection = document.querySelector('[data-how-section]');

let howSwiper = null;

function initializeHowSwiper() {
  if (!howSection) {
    return;
  }

  const swiperElement = howSection.querySelector('[data-how-swiper]');
  const nextButton = howSection.querySelector(
    '[data-how-swiper-next]'
  );
  const previousButton = howSection.querySelector(
    '[data-how-swiper-prev]'
  );
  const paginationElement = howSection.querySelector(
    '[data-how-swiper-pagination]'
  );

  if (
    !swiperElement ||
    !nextButton ||
    !previousButton ||
    !paginationElement
  ) {
    return;
  }

  if (window.innerWidth >= HOW_SWIPER_BREAKPOINT) {
    if (howSwiper) {
      howSwiper.destroy(true, true);
      howSwiper = null;
    }

    return;
  }

  if (howSwiper) {
    howSwiper.update();
    return;
  }

  howSwiper = new Swiper(swiperElement, {
    modules: [Navigation, Pagination],

    slidesPerView: 1,
    spaceBetween: 16,
    loop: true,

    navigation: {
      nextEl: nextButton,
      prevEl: previousButton,
    },

    pagination: {
      el: paginationElement,
      clickable: true,
    },
  });
}

initializeHowSwiper();

window.addEventListener('resize', initializeHowSwiper);