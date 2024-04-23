export const burger = () => {
  const headerMenuButton = document.querySelector('.header__menu-button');
  const headerMenu = document.querySelector('.header__menu');

  headerMenuButton.addEventListener('click', () => {
    if (headerMenu.style.zIndex === '1') {
      headerMenu.style.opacity = 0;
      headerMenu.style.zIndex = -1;
    } else {
      headerMenu.style.opacity = 100;
      headerMenu.style.zIndex = 1;
    }
  });

  document.addEventListener('click', e => {
    if ((!e.target.closest('.header__menu') && e.target !== headerMenuButton) || e.target.closest('.header__link')) {
      headerMenu.style.opacity = 0;
      headerMenu.style.zIndex = -1;
    }
  });
};
