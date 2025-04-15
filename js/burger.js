export function setupBurgerMenu() {
  const burger = document.querySelector('.menu');
  const navLinks = document.querySelectorAll('.nav-links a');
  const navbar = document.querySelector('.navbar');
  const logo = document.querySelector('.logo');
  const main = document.querySelector('main');

  if (!burger || !navbar || navLinks.length === 0 || !logo || !main) return;

  // Создаём блокировочный оверлей
  const blocker = document.createElement('div');
  blocker.classList.add('click-blocker');
  blocker.style.position = 'fixed';
  blocker.style.top = '0';
  blocker.style.left = '0';
  blocker.style.width = '100vw';
  blocker.style.height = '100vh';
  blocker.style.zIndex = '998';
  blocker.style.background = 'transparent';
  blocker.style.pointerEvents = 'auto';
  blocker.style.display = 'none';
  document.body.appendChild(blocker);

  // Клик по фону — закрыть бургер
  blocker.addEventListener('click', (e) => {
    const allowed = [burger, logo, ...navLinks];
    const isAllowed = allowed.some(el => el.contains(e.target));
    if (!isAllowed) {
      closeBurger();
    }
  });

  // Клик по <main> — тоже закрыть бургер
  main.addEventListener('click', () => {
    if (navbar.classList.contains('active')) {
      closeBurger();
    }
  });

  // Клик по бургеру
  burger.addEventListener('click', () => {
    const isActive = navbar.classList.toggle('active');
    burger.classList.toggle('active');
    document.body.classList.toggle('lock-scroll');
    blocker.style.display = isActive ? 'block' : 'none';
  });

  // Клик по ссылке — закрыть
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      closeBurger();
    });
  });

  // Закрытие по ESC
  window.addEventListener('keydown', e => {
    if (e.key === 'Escape') {
      closeBurger();
    }
  });

  function closeBurger() {
    navbar.classList.remove('active');
    burger.classList.remove('active');
    document.body.classList.remove('lock-scroll');
    blocker.style.display = 'none';
  }
}



