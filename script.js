document.querySelectorAll('.carousel').forEach((carousel) => {
  const images = carousel.querySelectorAll('.carousel-image');
  const prevBtn = carousel.querySelector('.prev-btn');
  const nextBtn = carousel.querySelector('.next-btn');
  let currentIndex = 0;

  function updateCarousel() {
    images.forEach((img, index) => {
      img.classList.toggle('active', index === currentIndex);
    });
  }

  prevBtn.addEventListener('click', () => {
    currentIndex = (currentIndex - 1 + images.length) % images.length;
    updateCarousel();
  });

  nextBtn.addEventListener('click', () => {
    currentIndex = (currentIndex + 1) % images.length;
    updateCarousel();
  });

  updateCarousel(); // Initialize the carousel
});

const backToTopButton = document.querySelector('.back-to-top');
if (backToTopButton) {
  backToTopButton.addEventListener('click', (event) => {
    event.preventDefault(); // Empêche le comportement par défaut
    window.scrollTo({
      top: 0,
      behavior: 'smooth', // Défilement fluide
    });
  });
}
