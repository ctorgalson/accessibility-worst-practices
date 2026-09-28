const carouselElement = document.querySelector(
  '[aria-roledescription="carousel"]'
);

if (carouselElement && typeof BhCarousel !== "undefined") {
  new BhCarousel(carouselElement, { automatic: false, wrap: false });
}
