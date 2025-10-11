function detailProject(e) {
  let detailHTML = ``;

  const index = e.currentTarget.dataset.index;
  const key = `projectData-${index}`;
  const savedProject = localStorage.getItem(key);

  let project;
  try {
    project = JSON.parse(savedProject);
  } catch (err) {
    console.error(`💥 Gagal parsing ${key}:`, err.message);
    return;
  }

  const { nameIN, descIN, imgDataIN, startDateIN, endDateIN, techIN } =
    getData(project);

  function formatDate(date) {
    const [year, month, day] = date.toISOString().split("T")[0].split(`-`);
    const monthNames = [
      `Jan`,
      `Feb`,
      `Mar`,
      `Apr`,
      `May`,
      `Jun`,
      `Jul`,
      `Aug`,
      `Sept`,
      `Oct`,
      `Nov`,
      `Dec`,
    ];

    return `${day} ${monthNames[parseInt(month) - 1]} ${year}`;
  }

  const monthsIN =
    (endDateIN.getFullYear() - startDateIN.getFullYear()) * 12 +
    (endDateIN.getMonth() - startDateIN.getMonth());

  const techSpan = techIN
    .map((tech) => {
      const [name, icon] = dataTech[tech.toLowerCase()] || [tech, ``];
      return `<span>${icon}<p>${name}</p></span>`;
    })
    .join(``);

  detailHTML += `
      <div class="pages">
        <div class="page">
          <h1>${nameIN}</h1>
          <section>
            <div class="cover" style="background-image: url(${imgDataIN});"></div>
            <div class="info">
              
              <aside>
              <h2>Duration</h2>
                <span
                  ><i class="bi bi-calendar-week"></i>
                  <p>${formatDate(startDateIN)} - ${formatDate(endDateIN)}</p>
                  </span>
                <span
                  ><i class="bi bi-clock-history"></i>
                  <p>${monthsIN} bulan</p></span
                >
              </aside>
              
              <aside>
              <h2>Technologies</h2>
              ${techSpan}
              </aside>
            </div>
          </section>
          <p>${descIN}</p>
        </div>
      </div>
      <div onclick="closeProject()" class="close bi bi-x"></div>
  `;
  detail.classList.add(`active`);
  detail.innerHTML = detailHTML;
}

// event dari onclick -> tombol x
function closeProject() {
  detail.classList.remove(`active`);
}

function deleteProject(e) {
  e.stopPropagation();

  const index = e.currentTarget.dataset.index;
  const key = `projectData-${index}`;

  const confirmDelete = confirm(`Yakin mau hapus Project?`);
  if (!confirmDelete) return;

  localStorage.removeItem(key); // hapus dari localStorage
  load(dropDown); // refresh
}

function editProject(e) {
  e.stopPropagation();

  const index = e.currentTarget.dataset.index;
  const key = `projectData-${index}`;

  const savedProject = localStorage.getItem(key);

  let project;
  try {
    project = JSON.parse(savedProject);
  } catch (err) {
    console.error(`💥 Gagal parsing ${key}:`, err.message);
    return;
  }

  const { nameIN, descIN, imgDataIN, startDateIN, endDateIN, techIN } =
    getData(project);

  name.value = nameIN;
  desc.value = descIN;
  preview.src = imgDataIN;
  preview.classList.add(`active`);
  startDate.value = startDateIN.toISOString().split("T")[0];
  endDate.value = endDateIN.toISOString().split("T")[0];
  tech.value = tech.forEach((tc) => (tc.checked = techIN.includes(tc.value)));

  title.textContent = `EDIT PROJECT ${index}`;
  submit.textContent = `update`;
  scrollToSection(header);
  editForm.checked = true;
  editForm.value = index;
}
