const swiperWrapper = document.querySelector('.swiper-wrapper');

function initSwiper() {
  new Swiper('.swiper', {
    loop: true,
    grabCursor: true,
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
    },
    navigation: {
      prevEl: '.swiper-button-prev',
      nextEl: '.swiper-button-next',
    },
    breakpoints: {
      320: {
        slidesPerView: 1,
        autoHeight: true,
        spaceBetween: 24,
      },
      768: {
        slidesPerView: 2,
        autoHeight: false,
        spaceBetween: 24,
      },
      992: {
        slidesPerView: 2,
        autoHeight: false,
        spaceBetween: 30,
      },
      1200: {
        slidesPerView: 3,
        autoHeight: false,
        spaceBetween: 30,
      }
    },
    on: {
      resize: function () {
        if (window.innerWidth >= 768) {
          swiperWrapper.style.height = 'auto';
        }
      },
    },
  });
}

window.addEventListener('DOMContentLoaded', initSwiper);
