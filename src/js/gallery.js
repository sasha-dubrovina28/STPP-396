import Swiper from 'swiper';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';


const swiper = new Swiper('.gallery-swiper', {

  modules: [
    Navigation,
    Pagination,
    Autoplay
  ],

  loop: true,

  centeredSlides: true,

  slidesPerView: 1.5,

  spaceBetween: 26,


  navigation: {
    nextEl: '.gallery .swiper-button-next',
    prevEl: '.gallery .swiper-button-prev',
  },


  pagination: {
    el: '.gallery .swiper-pagination',
    clickable: true,
  },


  autoplay: {
    delay: 3000,
  },


  breakpoints: {
    1440: {
      slidesPerView: 'auto',
      centeredSlides: true,
      spaceBetween: 0,
      loop: true,
      loopAdditionalSlides: 10,
    }
  }
});

swiper.on('breakpoint', () => {
  swiper.loopDestroy();
  swiper.loopCreate();
  swiper.slideToLoop(swiper.realIndex, 0, false);
  swiper.update();
});