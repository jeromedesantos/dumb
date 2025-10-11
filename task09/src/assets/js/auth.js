const firstName = document.querySelector(`#firstName`);
const lastName = document.querySelector(`#lastName`);
const mail = document.querySelector(`#mail`);
const pass = document.querySelector(`#pass`);
const confirmPass = document.querySelector(`#confirmPass`);
const login = document.querySelector(`.login`);
const register = document.querySelector(`.register`);

const firstNameERR = document.querySelector(`.firstName span`);
const lastNameERR = document.querySelector(`.lastName span`);
const mailERR = document.querySelector(`.mail span`);
const passERR = document.querySelector(`.pass span`);
const confirmPassERR = document.querySelector(`.confirmPass span`);

firstName?.addEventListener(`input`, firstNameValid);
lastName?.addEventListener(`input`, lastNameValid);
mail?.addEventListener(`input`, mailValid);
pass?.addEventListener(`input`, passValid);
confirmPass?.addEventListener(`input`, confirmPassValid);

login?.addEventListener(`click`, (e) => handleLogin(e));
register?.addEventListener(`click`, (e) => handleRegister(e));

function firstNameValid() {
  switch (true) {
    case !firstName.value:
      firstNameERR.innerText = `*Nama Depan tidak boleh kosong!`;
      firstName.classList.add(`err`);
      return false;
    case !/^[a-zA-Z\s]+$/.test(firstName.value):
      firstNameERR.innerText = `*Nama Depan hanya boleh berisi huruf dan spasi!`;
      firstName.classList.add(`err`);
      return false;
    case firstName.value.trim().length < 2:
      firstNameERR.innerText = `*Nama Depan terlalu pendek!`;
      firstName.classList.add(`err`);
      return false;
    case firstName.value.trim().length > 50:
      firstNameERR.innerText = `*Nama Depan terlalu panjang!`;
      firstName.classList.add(`err`);
      return false;
    default:
      firstNameERR.innerText = ``;
      firstName.classList.remove(`err`);
      return true;
  }
}
function lastNameValid() {
  switch (true) {
    case !lastName.value:
      lastNameERR.innerText = `*Nama Belakang tidak boleh kosong!`;
      lastName.classList.add(`err`);
      return false;
    case !/^[a-zA-Z\s]+$/.test(lastName.value):
      lastNameERR.innerText = `*Nama Belakang hanya boleh berisi huruf dan spasi!`;
      lastName.classList.add(`err`);
      return false;
    case lastName.value.trim().length < 2:
      lastNameERR.innerText = `*Nama Belakang terlalu pendek!`;
      lastName.classList.add(`err`);
      return false;
    case lastName.value.trim().length > 50:
      lastNameERR.innerText = `*Nama Belakang terlalu panjang!`;
      lastName.classList.add(`err`);
      return false;
    default:
      lastNameERR.innerText = ``;
      lastName.classList.remove(`err`);
      return true;
  }
}

function mailValid() {
  switch (true) {
    case !mail.value:
      mailERR.innerText = `*Email tidak boleh kosong!`;
      mail.classList.add(`err`);
      return false;
    case !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(mail.value):
      mailERR.innerText = `*Format email tidak valid!`;
      mail.classList.add(`err`);
      return false;
    case mail.value.trim().length > 255:
      mailERR.innerText = `*Email terlalu panjang!`;
      mail.classList.add(`err`);
      return false;
    default:
      mailERR.innerText = ``;
      mail.classList.remove(`err`);
      return true;
  }
}

function passValid() {
  switch (true) {
    case !pass.value:
      passERR.innerText = `*Password tidak boleh kosong!`;
      pass.classList.add(`err`);
      return false;
    case pass.value.trim().length < 8:
      passERR.innerText = `*Password minimal 8 karakter!`;
      pass.classList.add(`err`);
      return false;
    case pass.value.trim().length > 255:
      passERR.innerText = `*Password terlalu panjang!`;
      pass.classList.add(`err`);
      return false;
    case !/(?=.*[A-Za-z])(?=.*\d)/.test(pass.value):
      passERR.innerText = `*Password harus mengandung huruf dan angka!`;
      pass.classList.add(`err`);
      return false;
    default:
      passERR.innerText = ``;
      pass.classList.remove(`err`);
      return true;
  }
}
function confirmPassValid() {
  switch (true) {
    case !confirmPass.value:
      confirmPassERR.innerText = `*Confirm Password tidak boleh kosong!`;
      confirmPass.classList.add(`err`);
      return false;
    case confirmPass.value.trim() !== pass.value.trim():
      confirmPassERR.innerText = `*Confirm Password tidak sama!`;
      confirmPass.classList.add(`err`);
      return false;
    default:
      confirmPassERR.innerText = ``;
      confirmPass.classList.remove(`err`);
      return true;
  }
}

function handleLogin(e) {
  const isMailValid = mailValid();
  const isPassValid = passValid();

  (!isMailValid || !isPassValid) && e.preventDefault();
}

function handleRegister(e) {
  const isFirstNameValid = firstNameValid();
  const isLastNameValid = lastNameValid();
  const isMailValid = mailValid();
  const isPassValid = passValid();
  const isConfirmPassValid = confirmPassValid();

  (!isFirstNameValid ||
    !isLastNameValid ||
    !isMailValid ||
    !isPassValid ||
    !isConfirmPassValid) &&
    e.preventDefault();
}
