// slider.js
import MomentumSlider from 'https://cdn.jsdelivr.net/npm/momentum-slider@1.1.0/dist/momentum-slider.esm.js';

export function initSlider(containerSelector, paginationSelector) {
  const slidersContainer = document.querySelector(containerSelector);
  const pagination = document.querySelector(paginationSelector);
  const paginationItems = Array.from(pagination.children);

  const msNumbers = new MomentumSlider({
    el: slidersContainer,
    cssClass: 'ms--numbers',
    range: [1, 4],
    rangeContent: i => '0' + i,
    style: {
      transform: [{ scale: [0.4, 1] }],
      opacity: [0, 1]
    },
    interactive: false
  });

  const titles = [
    'King of the Ring Fight',
    'Sound of Streets',
    'Urban Fashion',
    'Windy Sunset'
  ];

  const msTitles = new MomentumSlider({
    el: slidersContainer,
    cssClass: 'ms--titles',
    range: [0, 3],
    rangeContent: i => `<h3>${titles[i]}</h3>`,
    vertical: true,
    reverse: true,
    style: {
      opacity: [0, 1]
    },
    interactive: false
  });

  const msLinks = new MomentumSlider({
    el: slidersContainer,
    cssClass: 'ms--links',
    range: [0, 3],
    rangeContent: () => '<a class="ms-slide__link">View Case</a>',
    vertical: true,
    interactive: false
  });

  const msImages = new MomentumSlider({
    el: slidersContainer,
    cssClass: 'ms--images',
    range: [0, 3],
    sync: [msNumbers, msTitles, msLinks],
    rangeContent: () => '',
    style: {
      '.ms-slide__image': {
        transform: [{ scale: [1.5, 1] }]
      }
    },
    change: (newIndex, oldIndex) => {
      if (typeof oldIndex !== 'undefined') {
        paginationItems[oldIndex].classList.remove('pagination__item--active');
      }
      paginationItems[newIndex].classList.add('pagination__item--active');
    }
  });

  pagination.addEventListener('click', e => {
    if (e.target.matches('.pagination__button')) {
      const index = paginationItems.indexOf(e.target.parentNode);
      msImages.select(index);
    }
  });
}
