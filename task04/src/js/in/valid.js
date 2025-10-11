// event validasi
name.addEventListener(`input`, nameValid);
startDate.addEventListener(`input`, dateValid);
endDate.addEventListener(`input`, dateValid);
desc.addEventListener(`input`, descriptionValid);
tech.forEach((tc) => tc.addEventListener(`click`, techValid));
image.addEventListener(`change`, () => {
  const file = image.files[0]; // isinya nama file, tipe dan ukuran dalam byte.
  if (imageValid(file)) {
    preview.classList.add(`active`);
    imagePreview(file);
  } else {
    preview.src = ``;
    preview.classList.remove(`active`);
  }
});

// validasi nama
function nameValid() {
  switch (true) {
    case !name.value:
      projectNameERR.innerText = `*Nama Project tidak boleh kosong!`;
      return false;
    case !/^[a-zA-Z\s]+$/.test(name.value):
      projectNameERR.innerText = `*Nama Project hanya boleh berisi huruf dan spasi!`;
      return false;
    case name.value.trim().length < 2:
      projectNameERR.innerText = `*Nama Project terlalu pendek!`;
      return false;
    default:
      projectNameERR.innerText = ``;
      return true;
  }
}

// validasi tanggal
function dateValid() {
  switch (true) {
    case !startDate.value || !endDate.value:
      dateERR.innerText = `*Tanggal mulai dan/atau tanggal akhir belum dipilih.`;
      return false;
    case startDate.value > endDate.value:
      dateERR.innerText = `*Tanggal mulai tidak boleh lebih besar dari tanggal akhir.`;
      return false;
    case startDate.value === endDate.value:
      dateERR.innerText = `*Tanggal mulai dan tanggal akhir tidak boleh sama.`;
      return false;
    default:
      dateERR.innerText = ``;
      return true;
  }
}

// validasi textarea
function descriptionValid() {
  switch (true) {
    case desc.value.length === 0:
      descriptionERR.innerText = `*Deskripsi tidak boleh kosong.`;
      return false;
    case desc.value.length < 10:
      descriptionERR.innerText = `*Deskripsi harus minimal 10 karakter.`;
      return false;
    case desc.value.length > 2000:
      descriptionERR.innerText = `*Deskripsi tidak boleh lebih dari 2000 karakter.`;
      return false;
    default:
      descriptionERR.innerText = ``;
      return true;
  }
}

// validasi checkbox
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

// validasi gambar
function imageValid(file) {
  switch (true) {
    case !file:
      if (editForm.checked) {
        return true;
      } else {
        imageERR.innerText = `*Gambar belum dipilih.`;
        return false;
      }
    case ![`image/jpeg`, `image/png`, `image/webp`].includes(file.type):
      imageERR.innerText = `*Format gambar harus JPG, PNG, atau WEBP.`;
      return false;
    case file.size > 2 * 1024 * 1024:
      imageERR.innerText = `*Ukuran gambar tidak boleh lebih dari 2MB.`;
      return false;
    default:
      imageERR.innerText = ``;
      return true;
  }
}

function imagePreview(file) {
  preview.classList.add(`active`);
  const reader = new FileReader(); // membaca file secara lokal di browser

  // event handler yang dijalankan setelah file selesai dibaca
  reader.onload = () => (preview.src = reader.result); // hasil pembacaan berupa Base64 Data URL
  reader.readAsDataURL(file); // fungsi dijalankan
}
