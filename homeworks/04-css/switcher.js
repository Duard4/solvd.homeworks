document.addEventListener('DOMContentLoaded', () => {
  const themeSwitcher = document.querySelector('.header__theme-switcher');

  themeSwitcher.addEventListener('click', () => {
    document.body.classList.toggle('dark');
  });
});
