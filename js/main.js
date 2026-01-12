AOS.init({
  once: true,
  disable: 'phone',
  duration: 700,
  easing: 'ease-out-cubic',
});

// Inicializar carousel solo si ya tiene slides (para páginas que no usan data-loader)
const carouselEl = document.querySelectorAll('.carousel');
if (carouselEl.length > 0) {
  const carouselWrapper = document.querySelector('.carousel .swiper-wrapper');
  // Solo inicializar si hay slides (no se cargan dinámicamente)
  if (carouselWrapper && carouselWrapper.children.length > 0) {
    const carousel = new Swiper('.carousel', {
      slidesPerView: 'auto',
      grabCursor: true,
      loop: false,
      centeredSlides: false,
      initialSlide: 0,
      spaceBetween: 24,
      watchSlidesProgress: true,
      navigation: {
        nextEl: '.carousel-next',
        prevEl: '.carousel-prev',
      },
    });
  }
}