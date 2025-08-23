// event submit
submit.addEventListener(`click`, (e) => {
  e.preventDefault();
  handleSubmit();
});

// fungsi submit
function handleSubmit() {
  const file = image.files[0];

  // jalankan semua validasi
  const isNameValid = nameValid();
  const isDateValid = dateValid();
  const isDescValid = descriptionValid();
  const isTechValid = techValid();
  const isImageValid = imageValid(file);

  // ambil data
  if (
    !isNameValid ||
    !isDateValid ||
    !isDescValid ||
    !isTechValid ||
    !isImageValid
  ) {
    alert("Form tidak valid, periksa kembali input!");
    scrollToSection(header); // refresh
    return;
  } else {
    // ambil daftar teknologi yang dicentang oleh pengguna
    const checkedTechs = Array.from(tech)
      .filter((cb) => cb.checked)
      .map((cb) => cb.value);

    // data yang mau di kirim ke local storage
    const projectData = {
      name: name.value.trim(),
      startDate: startDate.value,
      endDate: endDate.value,
      desc: desc.value.trim(),
      tech: checkedTechs,
      imgData: preview.src,
    };

    let index = 1;
    while (localStorage.getItem(`projectData-${index}`)) index++;
    // Menarik semua item yang ada di localStorage (selama true dia looping terus)
    // Misal:
    // - projectData-1 → ✅ ada
    // - projectData-2 → ❌ kosong
    // - projectData-3 → ✅ ada

    // - data baru isi di projectData-2 (yang kosong di key)
    // - lalu data berikutnya longkap ke projectData-4

    if (editForm.checked) index = editForm.value;
    // jika editForm checked, timpa index dengan editForm.value

    localStorage.setItem(`projectData-${index}`, JSON.stringify(projectData));

    // kembali default
    preview.src = ``;
    preview.classList.remove(`active`);
    title.textContent = `ADD MY PROJECT`;
    submit.textContent = `submit`;
    editForm.checked = false;
    editForm.value = ``;

    alert(`✅ Data berhasil disimpan di localStorage`);
    load(dropDown); // refresh
  }
}
