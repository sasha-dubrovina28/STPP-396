import Swiper from 'swiper';

import 'swiper/css';

import sprite from '../img/sprite.svg';

const SVG_NAMESPACE = 'http://www.w3.org/2000/svg';

const createStar = isEmpty => {
  const star = document.createElementNS(SVG_NAMESPACE, 'svg');
  const icon = document.createElementNS(SVG_NAMESPACE, 'use');

  star.dataset.reviewStar = '';
  star.dataset.reviewStarState = isEmpty ? 'empty' : 'filled';

  star.setAttribute('width', '17');
  star.setAttribute('height', '17');
  star.setAttribute('aria-hidden', 'true');
  star.setAttribute('focusable', 'false');

  icon.setAttribute('href', `${sprite}#icon-star`);

  star.append(icon);

  return star;
};

const renderStars = element => {
  const parsedRating = Math.round(Number(element.dataset.rating));

  const rating = Number.isFinite(parsedRating)
    ? Math.min(Math.max(parsedRating, 0), 5)
    : 0;

  const fragment = document.createDocumentFragment();

  for (let index = 0; index < 5; index += 1) {
    fragment.append(createStar(index >= rating));
  }

  element.replaceChildren(fragment);
};

const setActionDisabled = (element, isDisabled) => {
  if (!element) {
    return;
  }

  element.disabled = isDisabled;
  element.dataset.reviewsDisabled = String(isDisabled);
};

const initializeReviews = reviewsElement => {
  reviewsElement
    .querySelectorAll('[data-reviews-stars]')
    .forEach(renderStars);

  const swiperElement = reviewsElement.querySelector(
    '[data-reviews-swiper]'
  );

  const previousButton = reviewsElement.querySelector(
    '[data-reviews-action="previous"]'
  );

  const nextButton = reviewsElement.querySelector(
    '[data-reviews-action="next"]'
  );

  const paginationElement = reviewsElement.querySelector(
    '[data-reviews-pagination]'
  );

  if (!swiperElement) {
    return;
  }

  let paginationBullets = [];

  const updateSlidesState = swiper => {
    swiper.slides.forEach((slide, index) => {
      const position = index - swiper.activeIndex;

      if (position === 0) {
        slide.dataset.reviewsItemState = 'active';
      } else if (position === -1) {
        slide.dataset.reviewsItemState = 'previous';
      } else if (position === 1) {
        slide.dataset.reviewsItemState = 'next';
      } else {
        slide.removeAttribute('data-reviews-item-state');
      }
    });
  };

  const updateControlsState = swiper => {
    setActionDisabled(previousButton, swiper.isBeginning);
    setActionDisabled(nextButton, swiper.isEnd);
  };

  const updatePaginationState = swiper => {
    paginationBullets.forEach((bullet, index) => {
      const isActive = index === swiper.snapIndex;

      bullet.dataset.reviewsBulletActive = String(isActive);

      if (isActive) {
        bullet.setAttribute('aria-current', 'true');
      } else {
        bullet.removeAttribute('aria-current');
      }
    });
  };

  const renderPagination = swiper => {
    if (!paginationElement) {
      paginationBullets = [];
      return;
    }

    const bulletsCount = swiper.snapGrid.length;
    const fragment = document.createDocumentFragment();

    paginationBullets = Array.from(
      { length: bulletsCount },
      (_, index) => {
        const bullet = document.createElement('button');

        bullet.type = 'button';
        bullet.dataset.reviewsBullet = '';
        bullet.dataset.reviewsBulletIndex = String(index);

        bullet.setAttribute(
          'aria-label',
          `Go to review slide ${index + 1}`
        );

        bullet.addEventListener('click', () => {
          swiper.slideTo(index);
        });

        fragment.append(bullet);

        return bullet;
      }
    );

    paginationElement.replaceChildren(fragment);

    updatePaginationState(swiper);
  };

  const syncInterface = (
    swiper,
    rebuildPagination = false
  ) => {
    updateSlidesState(swiper);
    updateControlsState(swiper);

    if (
      rebuildPagination ||
      paginationBullets.length !== swiper.snapGrid.length
    ) {
      renderPagination(swiper);
    } else {
      updatePaginationState(swiper);
    }
  };

  const scheduleInterfaceSync = (
    swiper,
    rebuildPagination = false
  ) => {
    window.requestAnimationFrame(() => {
      syncInterface(swiper, rebuildPagination);
    });
  };

  const swiper = new Swiper(swiperElement, {
    centeredSlides: true,
    slidesPerView: 'auto',
    spaceBetween: 12,
    watchOverflow: true,

    breakpoints: {
      1440: {
        slidesPerView: 3,
        spaceBetween: 102,
        centeredSlides: false,
      },
    },

    on: {
      init: instance => {
        syncInterface(instance, true);
      },

      slideChange: instance => {
        syncInterface(instance);
      },

      breakpoint: instance => {
        scheduleInterfaceSync(instance, true);
      },

      resize: instance => {
        scheduleInterfaceSync(instance);
      },

      snapGridLengthChange: instance => {
        scheduleInterfaceSync(instance, true);
      },
    },
  });

  previousButton?.addEventListener('click', () => {
    swiper.slidePrev();
  });

  nextButton?.addEventListener('click', () => {
    swiper.slideNext();
  });
};

document
  .querySelectorAll('[data-reviews]')
  .forEach(initializeReviews);