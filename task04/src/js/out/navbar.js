// buat scroll button -> cari isIntersecting (kondisinya true-false) dari array entries
const observer = new IntersectionObserver((entries) =>
  entries.forEach((entry) =>
    !entry.isIntersecting
      ? upElement.classList.add(`active`)
      : upElement.classList.remove(`active`)
  )
); // isIntersecting = elemen target sedang terlihat di layar?

// focus ke header
observer.observe(header);

// add di klik ->  scroll ke atas
upElement.addEventListener(`click`, () => {
  scrollToSection(header);
});

// buat navigasi -> tambahin class baru
toggleMenu.addEventListener(`click`, () => {
  miniMenu.classList.toggle(`active`);
  toggleAnimate.forEach((toggle) => toggle.classList.toggle(`active`));
});
