// import package
import express from "express";
import { Pool } from "pg";

// inisiasi db
const db = new Pool({
  user: `jeremy`,
  password: `123`,
  host: `localhost`,
  port: 5432,
  database: `postgres`,
  max: 20,
});

// inisialisasi express
const app = express();
const port = 3000;

// inisialisasi hbs
app.set("view engine", "hbs"); // pakai Handlebars engine
app.set("views", "./src/views"); // lokasi folder views
app.use("/assets", express.static("./src/assets")); // path untuk file statis
app.use(express.urlencoded({ extended: false })); // baca data dari form POST

// buat routes
app.get(`/`, home); // render
app.post(`/`, handleHome); // handle submit data

// jalanin server
app.listen(port, () =>
  console.log(`Server is running on http://localhost:${port}`)
);

// get (async)
async function home(req, res) {
  const { rows } = await db.query(`SELECT * FROM public.accounts`); // nunggu proses berjalan
  res.render(`index`, { rows });
}

// post (async)
async function handleHome(req, res) {
  const { name, password, action } = req.body;

  // // kondisi kita punya 2 tombol
  switch (true) {
    case action === `submit`:
      await db.query(
        `INSERT INTO public.accounts (name, password) VALUES ('${name}', '${password}')`
      ); // nunggu proses berjalan // simpan input ke dalam accounts
      break;
    case action === `delete`:
      await db.query(
        // `DELETE FROM accounts WHERE no = (SELECT MAX(no) FROM accounts);`
        `DELETE FROM accounts WHERE ctid IN (SELECT ctid FROM accounts ORDER BY no DESC LIMIT 1);`
      ); // buang data dari belakang
      break;
  }

  // refresh halaman
  res.redirect(`/`);
}
