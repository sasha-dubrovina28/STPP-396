import Swiper from 'swiper';
import 'swiper/css';

const howSwiper = document.querySelector('.how-swiper');

if (howSwiper) {
  new Swiper(howSwiper, {
    slidesPerView: 1,
    spaceBetween: 16,
    loop: true,
    allowTouchMove: true,
  });
}
