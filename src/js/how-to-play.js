import Swiper from 'swiper';
import { Navigation, Pagination } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const HOW_SWIPER_BREAKPOINT = 1440;

const howSwiperElement = document.querySelector('[data-how-swiper]');

let howSwiper = null;

function initializeHowSwiper() {
  if (!howSwiperElement) {
    return;
  }

  const nextButton = document.querySelector('[data-how-swiper-next]');
  const previousButton = document.querySelector('[data-how-swiper-prev]');
  const paginationElement = document.querySelector(
    '[data-how-swiper-pagination]'
  );

  if (window.innerWidth >= HOW_SWIPER_BREAKPOINT) {
    if (howSwiper) {
      howSwiper.destroy(true, true);
      howSwiper = null;
    }

    return;
  }

  if (howSwiper) {
    return;
  }

  howSwiper = new Swiper(howSwiperElement, {
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