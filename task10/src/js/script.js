const hamburger = document.querySelector(`#hamburger`);
const navMenu = document.querySelector(`#nav-menu`);
const home = document.querySelector(`#home`);
const toTop = document.querySelector(`#to-top`);
const darkToggle = document.querySelector(`#dark-toggle`);
const html = document.querySelector(`html`);

// Nav menu toggle
hamburger.addEventListener(`click`, () => {
  hamburger.classList.toggle(`hamburger-active`);
  navMenu.classList.toggle(`hidden`);
});

// Close nav menu when clicking outside the menu
window.addEventListener(`click`, (e) => {
  if (e.target !== hamburger && e.target !== navMenu) {
    hamburger.classList.remove(`hamburger-active`);
    navMenu.classList.add(`hidden`);
  }
});

// Scroll to top button
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) {
      toTop.classList.remove(`invisible`);
      toTop.classList.remove(`opacity-0`);
    } else {
      toTop.classList.add(`invisible`);
      toTop.classList.add(`opacity-0`);
    }
  });
});
observer.observe(home);

// Darkmode toggle
darkToggle.addEventListener(`click`, () => {
  if (darkToggle.checked) {
    html.classList.add(`dark`);
  } else {
    html.classList.remove(`dark`);
  }
});
