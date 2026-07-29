import Swiper from 'swiper';
import { Navigation, Pagination } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';


const reviews = [
  {
    avatar: "./img/reviews/jason.jpg",
    name: "Jason P.",
    text: "Love picking my helper character before each run.",
    rating: "4.0"
  },
  {
    avatar: "./img/reviews/Melissa.jpg",
    name: "Melissa H.",
    text: "Sweet visuals and the boosters feel really powerful.",
    rating: "4.0"
  },
  {
    avatar: "./img/reviews/puzzle.jpg",
    name: "PuzzleTeamCaptain",
    text: "Joining a team completely changed how I play.",
    rating: "5.0"
  },
  {
    avatar: "./img/reviews/candy.jpg",
    name: "CandyCrusherPro",
    text: "Team events make this way more fun than typical match-3s.",
    rating: "5.0"
  },
  {
    avatar: "./img/reviews/sweet.jpg",
    name: "SweetTilesFan",
    text: "Restoring the town after the storm is so satisfying.",
    rating: "5.0"
  }
];


const reviewsList = document.querySelector('.reviews-list');

reviewsList.innerHTML = reviews.map(({ avatar, name, text, rating }) => `
  <li class="swiper-slide reviews-item">

    <img 
      class="reviews-avatar"
      src="${avatar}"
      alt="${name}"
    >

    <h3 class="reviews-name">
      ${name}
    </h3>

    <p class="reviews-text">
      ${text}
    </p>

    <div class="reviews-rating">
      <span class="reviews-score">${rating}</span>
      <span class="reviews-stars">★★★★★</span>
    </div>

  </li>
`).join("");


const swiper = new Swiper('.reviews-swiper', {
  modules: [Navigation, Pagination],

  centeredSlides: true,

  slidesPerView: 'auto',
  spaceBetween: 12,

  navigation: {
    nextEl: '.reviews-btn-next',
    prevEl: '.reviews-btn-prev',
  },

  pagination: {
    el: '.reviews-pagination',
    clickable: true,
  },

  breakpoints: {

    1440: {
      slidesPerView: 3,
        centeredSlides: true,

      spaceBetween: 102,
    },

  },
});
