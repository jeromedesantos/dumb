const editForm = document.querySelector(`input[name="edit"]`);
const name = document.querySelector(`#name`);
const start = document.querySelector(`#start`);
const end = document.querySelector(`#end`);
const desc = document.querySelector(`#desc`);
const tech = document.querySelectorAll(`input[name="tech"]`);
const img = document.querySelector(`#img`);
const submit = document.querySelector(`.submit`);
const nameERR = document.querySelector(`.name span`);
const dateERR = document.querySelector(`.date span`);
const descERR = document.querySelector(`.desc span`);
const techERR = document.querySelector(`.tech span`);
const imgERR = document.querySelector(`.img span`);

// event validasi
name.addEventListener(`input`, nameValid);
start.addEventListener(`input`, dateValid);
end.addEventListener(`input`, dateValid);
desc.addEventListener(`input`, descValid);
tech.forEach((tc) => tc.addEventListener(`click`, techValid));
submit.addEventListener(`click`, (e) => handleSubmit(e));

img.addEventListener(`change`, () => {
  const file = img.files[0]; // isinya nama file, tipe dan ukuran dalam byte.
  if (imgValid(file)) {
    preview.classList.add(`active`);
    imgPreview(file);
  } else {
    img.value = ``;
    preview.src = ``;
    preview.classList.remove(`active`);
  }
});

function nameValid() {
  switch (true) {
    case !name.value:
      nameERR.innerText = `*Nama Project tidak boleh kosong!`;
      name.classList.add(`err`);
      return false;
    case !/^[a-zA-Z\s]+$/.test(name.value):
      nameERR.innerText = `*Nama Project hanya boleh berisi huruf dan spasi!`;
      name.classList.add(`err`);
      return false;
    case name.value.trim().length < 2:
      nameERR.innerText = `*Nama Project terlalu pendek!`;
      name.classList.add(`err`);
      return false;
    case name.value.trim().length > 99:
      nameERR.innerText = `*Nama Project terlalu panjang!`;
      name.classList.add(`err`);
      return false;
    default:
      nameERR.innerText = ``;
      name.classList.remove(`err`);
      return true;
  }
}

function dateValid() {
  switch (true) {
    case !start.value || !end.value:
      dateERR.innerText = `*Tanggal mulai dan/atau tanggal akhir belum dipilih.`;
      start.classList.add(`err`);
      end.classList.add(`err`);
      return false;
    case start.value > end.value:
      dateERR.innerText = `*Tanggal mulai tidak boleh lebih besar dari tanggal akhir.`;
      start.classList.add(`err`);
      end.classList.add(`err`);
      return false;
    case start.value === end.value:
      dateERR.innerText = `*Tanggal mulai dan tanggal akhir tidak boleh sama.`;
      start.classList.add(`err`);
      end.classList.add(`err`);
      return false;
    default:
      dateERR.innerText = ``;
      start.classList.remove(`err`);
      end.classList.remove(`err`);
      return true;
  }
}

function descValid() {
  switch (true) {
    case desc.value.length === 0:
      descERR.innerText = `*Deskripsi tidak boleh kosong.`;
      desc.classList.add(`err`);
      return false;
    case desc.value.length < 10:
      descERR.innerText = `*Deskripsi harus minimal 10 karakter.`;
      desc.classList.add(`err`);
      return false;
    case desc.value.length > 10000:
      descERR.innerText = `*Deskripsi tidak boleh lebih dari 2000 karakter.`;
      desc.classList.add(`err`);
      return false;
    default:
      descERR.innerText = ``;
      desc.classList.remove(`err`);
      return true;
  }
}

function techValid() {
  // buat array baru isinya cuma yang udah di ceklis
  const checkedTechs = Array.from(tech)
    .filter((cb) => cb.checked)
    .map((cb) => cb.value);

  switch (true) {
    case checkedTechs.length === 0:
      techERR.innerText = `*Pilih minimal satu teknologi.`;
      return false;
    case checkedTechs.length > 2:
      techERR.innerText = `*Maksimal 2 teknologi boleh dipilih.`;
      return false;
    default:
      techERR.innerText = ``;
      return true;
  }
}

function imgValid(file) {
  switch (true) {
    case !file:
      if (editForm.checked) {
        img.classList.remove(`err`);
        return true;
      } else {
        imgERR.innerText = `*Gambar belum dipilih.`;
        img.classList.add(`err`);
        return false;
      }
    case ![`image/jpeg`, `image/png`, `image/webp`].includes(file.type):
      imgERR.innerText = `*Format gambar harus JPG, PNG, atau WEBP.`;
      img.classList.add(`err`);
      return false;
    case file.size > 2 * 1024 * 1024:
      imgERR.innerText = `*Ukuran gambar tidak boleh lebih dari 2MB.`;
      img.classList.add(`err`);
      return false;
    default:
      imgERR.innerText = ``;
      img.classList.remove(`err`);
      return true;
  }
}

function imgPreview(file) {
  preview.classList.add(`active`);
  const reader = new FileReader(); // membaca file secara lokal di browser

  // event handler yang dijalankan setelah file selesai dibaca
  reader.onload = () => (preview.src = reader.result); // hasil pembacaan berupa Base64 Data URL
  reader.readAsDataURL(file); // fungsi dijalankan
}

function handleSubmit(e) {
  const file = img.files[0];

  // jalankan semua validasi
  const isNameValid = nameValid();
  const isDateValid = dateValid();
  const isDescValid = descValid();
  const isTechValid = techValid();
  const isImageValid = imgValid(file);

  // ambil data
  (!isNameValid ||
    !isDateValid ||
    !isDescValid ||
    !isTechValid ||
    !isImageValid) &&
    e.preventDefault();
}
