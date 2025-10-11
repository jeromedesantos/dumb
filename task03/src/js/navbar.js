// ambil element
const toggleMenu = document.querySelector(`.menu-toggle`);
const toggleAnimate = document.querySelectorAll(`.menu-toggle span`);
const miniMenu = document.querySelector(`.menu-mini`);

// tambahin class baru
toggleMenu.addEventListener(`click`, () => {
  miniMenu.classList.toggle(`active`);
  toggleAnimate.forEach((toggle) => toggle.classList.toggle(`active`));
});
