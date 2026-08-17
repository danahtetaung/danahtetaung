(() => {
  'use strict';

  document.documentElement.dataset.scripting = 'enabled';

  const skipLink = document.querySelector('.skip-link');
  const main = document.querySelector('main');

  if (!skipLink || !main) return;

  skipLink.addEventListener('click', () => {
    window.requestAnimationFrame(() => {
      main.setAttribute('tabindex', '-1');
      main.focus({ preventScroll: true });
      main.addEventListener('blur', () => main.removeAttribute('tabindex'), { once: true });
    });
  });
})();
