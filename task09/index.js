// import package
import express from "express";
import session from "express-session";
import flash from "express-flash";
import multer from "multer";
import bcrypt from "bcrypt";
import hbs from "hbs";
import fs from "fs/promises";
import path from "path";
import { Pool } from "pg";
import { extension } from "mime-types";
import { fileURLToPath } from "url";

// inisiasi db
const db = new Pool({
  user: `jeremy`,
  password: `123`,
  host: `localhost`,
  port: 5432,
  database: `dumb`,
  max: 1,
});

// inisialisasi express
const app = express();
const port = 3000;

// inisialisasi fileURLToPath
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// inisialisasi multer
const storage = multer.diskStorage({
  destination: (req, file, cb) =>
    cb(null, path.join(__dirname, `src`, `assets`, `uploads`)),
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + `-` + Math.round(Math.random() * 1e9);
    const ext = extension(file.mimetype);
    cb(null, file.fieldname + `-` + uniqueSuffix + `.` + ext);
  },
});
const upload = multer({ storage });

// inisialisasi logika hbs
hbs.registerHelper(`json`, (context) => JSON.stringify(context, null, 2));
//  <pre>{{{json this.no}}}</pre>
hbs.registerHelper(`not`, (value) => !value);
hbs.registerHelper(
  `includes`,
  (arr, val) => Array.isArray(arr) && arr.includes(val)
);
hbs.registerHelper(`isEmpty`, (val) => {
  if (Array.isArray(val)) return val.length === 0;
  if (typeof val === `string`) return val.trim() === ``;
  if (val == null) return true;
  if (typeof val === `object`) return Object.keys(val).length === 0;
  return false;
});

// inisialisasi hbs
app.set(`view engine`, `hbs`); // pakai Handlebars engine
app.set(`views`, path.join(__dirname, `src`, `views`)); // lokasi folder views
app.use(`/assets`, express.static(path.join(__dirname, `src`, `assets`))); // path untuk file statis
app.use(express.urlencoded({ extended: false })); // baca data dari form POST
app.use(flash()); // alert dari backend
app.use(
  session({
    secret: `secretKey`,
    resave: false,
    saveUninitialized: true,
  })
);

// route render
app.get(`/`, home);
app.get(`/login`, authLog, login);
app.get(`/register`, authLog, register);
app.get(`/edit/:id`, auth, edit);
app.get(`/detail/:id`, detail);
app.get(`*catchall`, none); // path -> about, foo/bar

// route handle data
app.post(`/`, auth, upload.single(`img`), handleHome);
app.post(`/login`, authLog, handleLogin);
app.post(`/logout`, auth, handleLogout);
app.post(`/register`, authLog, handleRegister);
app.post(`/edit/:id`, auth, upload.single(`img`), handleEdit);
app.post(`/delete/:id`, auth, handleDelete);

// jalanin server
app.listen(port, () =>
  console.log(`Server is running on http://localhost:${port}`)
);

function auth(req, res, next) {
  if (!req.session.user) return res.redirect(`/login`);
  next();
}

function authLog(req, res, next) {
  if (req.session.user) return res.redirect(`/`);
  next();
}

function none(req, res) {
  const userData = req.session?.user?.name;
  res.render(`none`, { userData });
}

function login(req, res) {
  res.render(`login`, { message: req.flash(`error`) });
}

function register(req, res) {
  res.render(`register`, { message: req.flash(`error`) });
}

async function home(req, res) {
  try {
    const userData = req.session?.user?.name;
    const techSpan = {
      js: {
        name: `JavaScript`,
        icon: `fa-square-js`,
      },
      react: {
        name: `React JS`,
        icon: `fa-react`,
      },
      php: {
        name: `PHP`,
        icon: `fa-php`,
      },
      laravel: {
        name: `Laravel`,
        icon: `fa-laravel`,
      },
    };
    const { rows } = await db.query(
      `SELECT no, name_project, date_start, date_end, description, technologies, image_filename FROM public.project ORDER BY no ASC`
    );
    const updRows = rows.map((row) => {
      const {
        no,
        name_project,
        date_start,
        date_end,
        description,
        technologies,
        image_filename,
      } = row;
      const month =
        (date_end.getFullYear() - date_start.getFullYear()) * 12 +
        (date_end.getMonth() - date_start.getMonth());
      const techUpd = technologies
        .split(`,`)
        .map((t) => techSpan[t.toLowerCase()].icon);

      return {
        no,
        name_project,
        date_start,
        date_end,
        month,
        description,
        techUpd,
        image_filename,
      };
    });
    if (rows.length === 0)
      await db.query(`ALTER SEQUENCE project_no_seq RESTART WITH 1;`);

    res.render(`index`, { updRows, userData });
  } catch (err) {
    console.log(`ErrorGET_home: ${err}`);
  }
}

async function edit(req, res) {
  try {
    const userData = req.session?.user?.name;
    const id = parseInt(req.params.id, 10);
    if (isNaN(id)) return res.render(`none`);

    const { rows } = await db.query(
      `SELECT name_project, date_start, date_end, description, technologies, image_filename FROM project WHERE no = $1;`,
      [id]
    );
    ``;

    if (!rows[0]) return res.render(`none`);
    const row = {
      id: id,
      name_project: rows[0].name_project,
      start: new Date(rows[0].date_start).toISOString().split(`T`)[0],
      end: new Date(rows[0].date_end).toISOString().split(`T`)[0],
      description: rows[0].description,
      tech: rows[0].technologies.split(`,`).map((t) => t.trim()),
      image_filename: rows[0].image_filename,
    };
    res.render(`index`, { row, userData });
  } catch (err) {
    console.log(`ErrorGET_edit: ${err}`);
  }
}

async function detail(req, res) {
  try {
    const userData = req.session?.user?.name;
    const id = parseInt(req.params.id, 10);
    if (isNaN(id)) return res.render(`none`);

    function formatDate(date) {
      const [year, month, day] = date.toISOString().split(`T`)[0].split(`-`);
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
    const techSpan = {
      js: {
        name: `JavaScript`,
        icon: `fa-square-js`,
      },
      react: {
        name: `React JS`,
        icon: `fa-react`,
      },
      php: {
        name: `PHP`,
        icon: `fa-php`,
      },
      laravel: {
        name: `Laravel`,
        icon: `fa-laravel`,
      },
    };
    const { rows } = await db.query(
      `SELECT name_project, date_start, date_end, description, technologies, image_filename FROM project WHERE no = $1;`,
      [id]
    );

    if (!rows[0]) return res.render(`none`);
    const row = {
      id: rows[0].id,
      name_project: rows[0].name_project,
      start: formatDate(rows[0].date_start),
      end: formatDate(rows[0].date_end),
      month:
        (rows[0].date_end.getFullYear() - rows[0].date_start.getFullYear()) *
          12 +
        (rows[0].date_end.getMonth() - rows[0].date_start.getMonth()),
      description: rows[0].description,
      image_filename: rows[0].image_filename,
      tech: rows[0].technologies
        .split(`,`)
        .map((t) => techSpan[t.trim().toLowerCase()])
        .filter(Boolean),
    };
    res.render(`detail`, { row, userData });
  } catch (err) {
    console.log(`ErrorGET_detail: ${err}`);
  }
}

async function handleHome(req, res) {
  try {
    const { filename } = req.file;
    const { name, start, end, desc, tech } = req.body;
    const checkedTechs = Array.isArray(tech) ? tech.join() : tech || ``;

    await db.query(
      `INSERT INTO public.project (name_project, date_start, date_end, description, technologies, image_filename) VALUES ($1, $2, $3, $4, $5, $6 );`,
      [name.trim(), start, end, desc.trim(), checkedTechs, filename]
    );
    await db.query(
      `SELECT setval('project_no_seq', (SELECT MAX(no) FROM project));`
    );
  } catch (err) {
    console.log(`ErrorPOST_home: ${err}`);
  }
  res.redirect(`/`);
}

async function handleEdit(req, res) {
  try {
    const id = parseInt(req.params.id, 10);
    if (isNaN(id)) return res.render(`none`);

    const { name, start, end, desc, tech } = req.body;
    const checkedTechs = Array.isArray(tech) ? tech.join() : tech || ``;
    const { rows } = await db.query(
      `SELECT image_filename FROM public.project WHERE no = $1`,
      [id]
    );
    const filename =
      req.file?.filename ?? rows[0]?.image_filename ?? `default.jpg`;

    await db.query(
      `UPDATE public.project SET name_project = $1, date_start = $2, date_end = $3, description = $4, technologies = $5, image_filename = $6 WHERE no = $7;`,
      [name.trim(), start, end, desc.trim(), checkedTechs, filename, id]
    );
  } catch (err) {
    console.log(`ErrorPOST_edit: ${err}`);
  }
  res.redirect(`/`);
}

async function handleDelete(req, res) {
  try {
    const id = parseInt(req.params.id, 10);
    if (isNaN(id)) return res.render(`none`);

    const { rows } = await db.query(
      `SELECT image_filename FROM public.project WHERE no = $1`,
      [id]
    );

    await db.query(`DELETE FROM public.project WHERE no = $1;`, [id]);
    await fs.unlink(
      path.join(__dirname, `src`, `assets`, `uploads`, rows[0].image_filename)
    );
  } catch (err) {
    console.log(`ErrorPOST_delete: ${err}`);
  }
  res.redirect(`/`);
}

async function handleLogin(req, res) {
  try {
    const { mail, pass } = req.body;
    const { rows } = await db.query(
      `SELECT name, email, password FROM public.account WHERE email = $1`,
      [mail.trim()]
    );

    if (!rows[0] || !(await bcrypt.compare(pass, rows[0].password))) {
      req.flash(`error`, `Email/password salah`);
      return res.redirect(`/login`);
    }

    req.session.user = { name: rows[0].name.split(` `)[0] };
    res.redirect(`/`);
  } catch (err) {
    console.log(`ErrorPOST_login: ${err}`);
  }
}

async function handleLogout(req, res) {
  try {
    await req.session.destroy();
    res.redirect(`/login`);
  } catch (err) {
    console.log(`ErrorPOST_logout: ${err}`);
  }
}

async function handleRegister(req, res) {
  try {
    const { firstName, lastName, mail, pass } = req.body;
    const name = `${firstName.trim()} ${lastName.trim()}`;
    const hashedPass = await bcrypt.hash(pass, 10);
    const { rows } = await db.query(
      `SELECT email FROM public.account WHERE email = $1`,
      [mail]
    );

    if (rows[0]) {
      req.flash(`error`, `Email sudah terdaftar`);
      return res.redirect(`/register`);
    }
    await db.query(
      `INSERT INTO public.account (name, email, password) VALUES ($1, $2, $3);`,
      [name, mail.trim(), hashedPass]
    );
    await db.query(
      `SELECT setval('project_no_seq', (SELECT MAX(no) FROM project));`
    );
    res.redirect(`/login`);
  } catch (err) {
    console.log(`ErrorPOST_register: ${err}`);
  }
}
