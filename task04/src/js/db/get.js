// dictionary icon teknologi
const dataTech = {
  js: [`JavaScript`, `<i class="fa-brands fa-square-js"></i>`],
  reactjs: [`ReactJS`, `<i class="fa-brands fa-react"></i>`],
  php: [`PHP`, `<i class="fa-brands fa-php"></i>`],
  laravel: [`Laravel`, `<i class="fa-brands fa-laravel"></i>`],
};

// ambil data dari local project
function getData(project) {
  // simpan masing-masing value ke variable
  const nameIN = project.name;
  const descIN = project.desc;
  const techIN = project.tech;
  const imgDataIN = project.imgData;
  const startDateIN = new Date(project.startDate);
  const endDateIN = new Date(project.endDate);

  return { nameIN, descIN, imgDataIN, startDateIN, endDateIN, techIN };
}
