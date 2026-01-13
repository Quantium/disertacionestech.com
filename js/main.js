// Inicializar AOS si está disponible
if (typeof AOS !== 'undefined') {
  AOS.init({
    once: true,
    disable: 'phone',
    duration: 700,
    easing: 'ease-out-cubic',
  });
}
console.log(`___________________________________________________________________________
    _____
    /    )   ,                                     ,
---/----/-------__----__---)__--_/_----__----__--------__----__----__---__-
  /    /   /   (_ \` /___) /   ) /    /   ) /   ' /   /   ) /   ) /___) (_ \`
_/____/___/___(__)_(___ _/_____(_ __(___(_(___ _/___(___/_/___/_(___ _(__)_


________________________________________________________________
  ______
    /                              /          ,
---/-------__----__----__----__---/-----__--------__----__---__-
  /      /___) /   ' /   ) /   ) /    /   ) /   /   ' /   ) (_ \`
_/______(___ _(___ _/___/_(___/_/____(___/_/___(___ _(___(_(__)_
                                        /
                                    (_ /`);

// Inicializar carousel solo si ya tiene slides (para páginas que no usan data-loader)
if (typeof Swiper !== 'undefined') {
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
}