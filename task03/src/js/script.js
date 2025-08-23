// ambil input
const name = document.querySelector(`#name`);
const email = document.querySelector(`#email`);
const phone = document.querySelector(`#phone`);
const subject = document.querySelector(`#subject`);
const notes = document.querySelector(`#notes`);
const submit = document.querySelector(`.submit`);

// ambil span
const nameErr = document.querySelector(`#name + span`);
const emailErr = document.querySelector(`#email + span`);
const phoneErr = document.querySelector(`#phone + span`);
const subjectErr = document.querySelector(`#subject + span`);
const notesErr = document.querySelector(`#notes + span`);

// validasi nama
name.addEventListener(`input`, () => {
  switch (true) {
    case !name.value:
      nameErr.innerText = `*Nama tidak boleh kosong!`;
      break;
    case !/^[a-zA-Z\s]+$/.test(name.value):
      nameErr.innerText = `*Nama hanya boleh berisi huruf dan spasi!`;
      break;
    case name.value.trim().length < 2:
      nameErr.innerText = `*Nama terlalu pendek!`;
      break;
    default:
      nameErr.innerText = ``;
  }
});

// validasi email
email.addEventListener(`input`, () => {
  switch (true) {
    case !email.value:
      emailErr.innerText = `*Email tidak boleh kosong!`;
      break;
    case !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value):
      emailErr.innerText = `*Format email tidak valid!`;
      break;
    default:
      emailErr.innerText = ``;
  }
});

// validasi phone
phone.addEventListener(`input`, () => {
  switch (true) {
    case !phone.value:
      phoneErr.innerText = `*Nomor telepon tidak boleh kosong!`;
      break;
    default:
      phoneErr.innerText = ``;
  }
});

// validasi subject
subject.addEventListener(`input`, () => {
  switch (true) {
    case !subject.value || subject.value === ``:
      subjectErr.innerText = `*Silakan pilih salah satu opsi!`;
      break;
    case ![`subA`, `subB`, `subC`].includes(subject.value):
      subjectErr.innerText = `*Opsi yang dipilih tidak valid!`;
      break;
    default:
      subjectErr.innerText = ``;
  }
});

// validasi notes
notes.addEventListener(`input`, () => {
  switch (true) {
    case notes.value.length === 0:
      notesErr.innerText = `*Pesan tidak boleh kosong.`;
      break;
    case notes.value.length < 10:
      notesErr.innerText = `*Pesan harus minimal 10 karakter.`;
      break;
    case notes.value.length > 200:
      notesErr.innerText = `*Pesan tidak boleh lebih dari 200 karakter.`;
      break;
    default:
      notesErr.innerText = ``;
      break;
  }
});

submit.addEventListener(`click`, (e) => {
  e.preventDefault();
});
