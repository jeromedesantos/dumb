## 🧩 Logika Kode

### 📍 IntersectionObserver

Mengamati elemen #home. Saat tidak terlihat di viewport, tombol muncul.

```js
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
```

### 🧱 window.onscroll (Cadangan)

Memastikan tombol tetap muncul meski IntersectionObserver gagal (mis. pada browser lama).

```js
window.onscroll = () => {
  if (window.pageYOffset > home.offsetTop) {
    toTop.classList.remove(`invisible`);
    toTop.classList.remove(`opacity-0`);
  } else {
    toTop.classList.add(`invisible`);
    toTop.classList.add(`opacity-0`);
  }
};
```

## 🎯 Cara Menggunakan

1. Pastikan elemen utama memiliki id="home".
2. Tambahkan tombol dengan id="toTop" di akhir body.
3. Import scrollToTop.js di layout atau view utama.
4. Gunakan Tailwind utility classes untuk styling.

### 🪄 Contoh Tailwind Style untuk Tombol

```html
 <a
      href="#"
      class="bottom-10 right-10 h-14 w-14 bg-primary hover:animate-pulse fixed z-10 invisible opacity-0 flex flex-col items-center justify-center gap-0.5 p-4 text-white rounded-full transition duration-300 ease-in-out"
      id="to-top"
    >
      <i class="fa-solid fa-play -rotate-90"></i>
      <p class="text-sm font-semibold uppercase">Top</p>
    </a>
  ↑
</button>
```
