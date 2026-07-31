import Swiper from 'swiper';
import { Navigation, Pagination } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import sprite from "../img/sprite.svg";

function renderStars(rating) {
  const fullStars = Number(rating);
  let stars = "";
  for (let i = 0; i < 5; i++) {
    const emptyClass = i < fullStars ? "" : " is-empty";
    stars += `
      <svg class="star-icon${emptyClass}">
        <use href="${sprite}#icon-star"></use>
      </svg>
    `;
  }
  return stars;
}

document.querySelectorAll(".reviews-stars")
  .forEach(item => {
    item.innerHTML = renderStars(
      item.dataset.rating
    );
  });
new Swiper(".reviews-swiper", {
  modules: [
    Navigation,
    Pagination
  ],
  centeredSlides: true,
  slidesPerView: "auto",
  spaceBetween: 12,
  navigation: {
    nextEl: ".reviews-btn-next",
    prevEl: ".reviews-btn-prev",
  },
  pagination: {
    el: ".reviews-pagination",
    clickable: true,
  },
  breakpoints: {

    1440: {
      slidesPerView: 3,
      spaceBetween: 102,
      centeredSlides: false
    }
  }
});