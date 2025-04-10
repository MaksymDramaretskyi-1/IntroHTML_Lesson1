export function setupBurgerMenu() {
  const burger = document.querySelector('.menu');
  const navLinks = document.querySelectorAll('.nav-links a');
  const navbar = document.querySelector('.navbar');

  if (!burger || !navbar || navLinks.length === 0) return;

  // Открытие/закрытие бургера
  burger.addEventListener('click', () => {
    navbar.classList.toggle('active');
    burger.classList.toggle('active');
    document.body.classList.toggle('lock-scroll');
  });

  // При клике на пункт меню — закрыть бургер и вернуть скролл
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      navbar.classList.remove('active');
      burger.classList.remove('active');
      document.body.classList.remove('lock-scroll');
    });
  });
}



