// Simple floating animation for chapter cards
const cards = document.querySelectorAll('.chapter-card');

cards.forEach((card, index) => {
  let direction = index % 2 === 0 ? 1 : -1;
  let pos = 0;

  function animate() {
    pos += 0.5 * direction;
    if (pos > 10 || pos < -10) direction *= -1;
    card.style.transform = `translateY(${pos}px)`;
    requestAnimationFrame(animate);
  }

  animate();
});
