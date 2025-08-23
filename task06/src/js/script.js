const toggle = document.querySelector(`.toggle`);
const nav = document.querySelector(`.nav`);

toggle.addEventListener("click", () => {
  nav.classList.toggle(`opacity-100`);
  nav.classList.toggle(`translate-y-full`);
  nav.classList.toggle(`md:translate-y-0`);
});
