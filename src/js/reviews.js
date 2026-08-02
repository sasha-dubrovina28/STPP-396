import Swiper from 'swiper';
import { Navigation, Pagination } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import sprite from '../img/sprite.svg';

const createStar = isEmpty => {
  const star = document.createElementNS(
    'http://www.w3.org/2000/svg',
    'svg'
  );

  const icon = document.createElementNS(
    'http://www.w3.org/2000/svg',
    'use'
  );

  star.dataset.reviewStar = '';
  star.dataset.reviewStarState = isEmpty
    ? 'empty'
    : 'filled';

  star.setAttribute('width', '17');
  star.setAttribute('height', '17');
  star.setAttribute('aria-hidden', 'true');

  icon.setAttribute('href', `${sprite}#icon-star`);

  star.append(icon);

  return star;
};

const renderStars = element => {
  const parsedRating = Math.round(
    Number(element.dataset.rating)
  );

  const rating = Number.isFinite(parsedRating)
    ? Math.min(Math.max(parsedRating, 0), 5)
    : 0;

  const fragment = document.createDocumentFragment();

  for (let index = 0; index < 5; index += 1) {
    fragment.append(createStar(index >= rating));
  }

  element.replaceChildren(fragment);
};
document
  .querySelectorAll('[data-reviews]')
  .forEach(reviewsElement => {
    reviewsElement
      .querySelectorAll('[data-reviews-stars]')
      .forEach(renderStars);

    const swiperElement = reviewsElement.querySelector(
      '[data-reviews-swiper]'
    );

    if (!swiperElement) {
      return;
    }

    const previousButton = reviewsElement.querySelector(
      '[data-reviews-action="previous"]'
    );

    const nextButton = reviewsElement.querySelector(
      '[data-reviews-action="next"]'
    );

    const paginationElement = reviewsElement.querySelector(
      '[data-reviews-pagination]'
    );

    new Swiper(swiperElement, {
      modules: [Navigation, Pagination],
      centeredSlides: true,
      slidesPerView: 'auto',
      spaceBetween: 12,

      navigation: {
        nextEl: nextButton,
        prevEl: previousButton,
      },

      pagination: {
        el: paginationElement,
        clickable: true,
      },

      breakpoints: {
        1440: {
          slidesPerView: 3,
          spaceBetween: 102,
          centeredSlides: false,
        },
      },
    });
  });