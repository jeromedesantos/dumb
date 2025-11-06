// SOAL PERTAMA
// 1. buatkan 1 komponen button dan 1 komponen text
// 2. yang mana konten ditampilkan berdasarkan value yang di definisikan ketika pemanggilan komponen tersebut (button),
// 3. sedangkan untuk komponen text untuk value yang ditampilkan atau konten yang ditampilkan itu berdasarkan ketika komponen tersebut dibuat

// SOAL KEDUA
// buatlah kondisi juka true tampilkan button dan text
// jika false tampilkan textnya saja

// SOAL KETIGA
// buat kondisi lagi sekarang menggunakan angka
// jika angka adalah 1 maka munculkan button
// jika angka adalah 3 maka munculkan text
// jika angka adalah 2 maka munculkan button dan text

import { useState } from "react";
import { Button } from "./components/ui/button";

export function App() {
  const [angka, setAngka] = useState(0);

  return (
    <>
      <h1 onClick={() => setAngka(1)}> angka 1</h1>
      <h1 onClick={() => setAngka(2)}> angka 2</h1>
      <h1 onClick={() => setAngka(3)}> angka 3</h1>

      {angka === 1 || angka === 2 ? <Button> Ini Tombol</Button> : null}
      {angka === 2 || angka === 3 ? <p>Text</p> : null}
    </>
  );
}

export default App;
