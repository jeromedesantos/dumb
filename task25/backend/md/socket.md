# 🚀 Implementasi WebSocket di Proyek Sosmed 🚀

Dokumen ini menjelaskan konsep, kegunaan, dan langkah-langkah implementasi WebSocket pada proyek ini.

---

### Apa itu WebSocket? 🤔

Bayangkan komunikasi web standar (HTTP) itu seperti mengirim surat. Kamu mengirim permintaan (surat), lalu menunggu balasan. Gak bisa real-time kan?

Nah, **WebSocket** itu seperti telepon 📞! Sekali koneksi terhubung, kamu dan server bisa saling "bicara" (kirim data) secara langsung, dua arah, dan terus-menerus tanpa harus membuat permintaan baru setiap saat.

Secara teknis, WebSocket adalah protokol komunikasi yang menyediakan kanal komunikasi **full-duplex** (dua arah) melalui satu koneksi TCP yang berjalan lama.

---

### Kegunaannya Apa Aja Sih? 💡

Dengan kemampuannya yang real-time, WebSocket sangat cocok untuk fitur-fitur interaktif. Untuk proyek sosmed kita, kegunaannya bisa untuk:

-   **Notifikasi Real-Time** 🔔: Memberi tahu user secara langsung saat ada like, komentar, atau follower baru tanpa perlu me-refresh halaman.
-   **Live Chat/Messaging** 💬: Membangun fitur obrolan yang cepat dan responsif.
-   **Fitur "User is Typing..."** ✍️: Menampilkan indikator saat user lain sedang mengetik balasan komentar atau pesan.
-   **Update Feed Otomatis** 🔄: Menampilkan postingan baru di feed teman secara real-time.

---

### Instalasi & Konfigurasi 🛠️

Berikut cara instalasi dan konfigurasi `socket.io` (library populer untuk WebSocket) di proyek kita.

#### 1. Backend (Express.js)

**a. Instalasi**

Buka terminal di direktori `backend/` dan jalankan:

```bash
# Jika menggunakan npm
npm install socket.io

# Jika menggunakan bun
bun add socket.io
```

**b. Konfigurasi**

Kita perlu mengubah `backend/src/app.ts` untuk mengintegrasikan `socket.io` dengan server Express.

```typescript
// d:\Job Desk\Web Programming\clone\sosmed\backend\src\app.ts

import express, { Express } from "express";
import cors from "cors";
// Impor modul http dan Server dari socket.io
import http from "http";
import { Server } from "socket.io";

import router from "./routes/error";
import { corsOptions } from "./utils/cors";
import { rateLimit } from "./utils/rate-limit";

const app: Express = express();
const port: number = 3000;

// Buat server HTTP dari aplikasi Express
const server = http.createServer(app);

// Inisialisasi socket.io dengan server HTTP
const io = new Server(server, {
  cors: corsOptions, // Gunakan cors options yang sama
});

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(rateLimit);

app.use("/api/v1", router);

// Logika koneksi WebSocket
io.on("connection", (socket) => {
  console.log("✅ User terhubung dengan socket id:", socket.id);

  socket.on("disconnect", () => {
    console.log("❌ User terputus dari socket");
  });

  // Tambahkan event listener lainnya di sini
  // contoh: socket.on('new_thread', (data) => { ... })
});

// Gunakan `server.listen` bukan `app.listen`
server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

```

#### 2. Frontend (React)

**a. Instalasi**

Buka terminal di direktori `frontend/` dan jalankan:

```bash
# Jika menggunakan npm
npm install socket.io-client

# Jika menggunakan bun
bun add socket.io-client
```

**b. Konfigurasi**

Buat file baru untuk mengelola koneksi socket agar bisa digunakan di berbagai komponen.

```typescript
// d:\Job Desk\Web Programming\clone\sosmed\frontend\src\lib\socket.ts

import { io } from "socket.io-client";

// URL backend kita
const URL = "http://localhost:3000";

export const socket = io(URL, {
  autoConnect: false, // Nonaktifkan koneksi otomatis agar bisa dikontrol
});
```

Kamu bisa mengaktifkan koneksi di komponen utama aplikasi, misalnya di `App.tsx` menggunakan `useEffect`.

---

### Alur Programnya Gimana? 🌊

Mari kita simulasikan alur untuk notifikasi "like" baru.

1.  **Koneksi Awal**:
    -   User membuka aplikasi React.
    -   `socket.connect()` dijalankan di frontend.
    -   Backend di `io.on("connection", ...)` menerima koneksi baru dan mencatat `socket.id` user tersebut.

2.  **User A Memberi Like**:
    -   User A menekan tombol "like" pada sebuah postingan.
    -   Fungsi `handleLike()` di frontend dipanggil.
    -   Selain mengirim request `POST` ke API untuk menyimpan data like, kita juga mengirim event WebSocket.
    -   `socket.emit("new_like", { postId: 123, user: "User A" });`

3.  **Server Menerima & Memproses**:
    -   Backend memiliki listener untuk event `new_like`.
    -   `socket.on("new_like", (data) => { ... })`
    -   Server kemudian menyiarkan (broadcast) event ini ke semua user lain (atau hanya ke user pemilik postingan).
    -   `socket.broadcast.emit("like_notification", { message: "User A menyukai postingan Anda!" });`

4.  **User B Menerima Notifikasi**:
    -   Di frontend semua user (termasuk User B), ada listener yang selalu "mendengar".
    -   `socket.on("like_notification", (data) => { ... })`
    -   Ketika event ini diterima, frontend akan menampilkan notifikasi (misalnya, popup kecil atau mengubah angka di ikon lonceng).

Selesai! Notifikasi terkirim secara real-time tanpa perlu refresh.

Selamat mencoba! 🎉
