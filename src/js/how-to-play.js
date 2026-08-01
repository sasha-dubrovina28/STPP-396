import Swiper from 'swiper';
import { Navigation, Pagination } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const howSwiperElement = document.querySelector('.how-swiper');

let howSwiper = null;

function initializeHowSwiper() {
  if (!howSwiperElement) return;

  if (window.innerWidth >= 1440) {
    if (howSwiper) {
      howSwiper.destroy(true, true);
      howSwiper = null;
    }

    return;
  }

  if (!howSwiper) {
    howSwiper = new Swiper(howSwiperElement, {
      modules: [Navigation, Pagination],

      slidesPerView: 1,
      spaceBetween: 16,
      loop: true,

      navigation: {
        nextEl: '.play-btn-next',
        prevEl: '.play-btn-prev',
      },

      pagination: {
        el: '.play-pagination',
        clickable: true,
      },
    });
  }
}

initializeHowSwiper();

window.addEventListener('resize', initializeHowSwiper);