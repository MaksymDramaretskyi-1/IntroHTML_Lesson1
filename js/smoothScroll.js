export function setupSmoothScrollWithOffset(offset = 80) {
  const links = document.querySelectorAll('a[href^="#"]');

  links.forEach(link => {
    link.addEventListener('click', function (e) {
      const targetId = link.getAttribute('href').substring(1);
      const target = document.getElementById(targetId);

      if (target) {
        e.preventDefault();

        const topPosition = target.getBoundingClientRect().top + window.scrollY - offset;

        window.scrollTo({
          top: topPosition,
          behavior: 'smooth'
        });
      }
    });
  });
}
