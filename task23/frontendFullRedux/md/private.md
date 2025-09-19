### 🔄 Mengatasi Infinite Loop pada `PublicRoute`

Masalah utama pada `PublicRoute` adalah terjadinya _infinite loop_ saat token pengguna tidak valid atau telah kedaluwarsa. Berikut adalah rinciannya:

**1️⃣ Status & Alur Token 🚦**

- `idle`: Belum ada pengecekan token.
- `loading`: Sedang dalam proses mengecek token ke server.
- `succeeded`: Token terbukti valid. ✅
- `failed`: Token tidak valid atau kedaluwarsa. ❌

**2️⃣ Penyebab Loop Tak Berujung бесконечность**

Logika `useEffect` yang digunakan sebelumnya adalah sebagai berikut:

```javascript
if (!data && status !== "loading") {
  dispatch(verifyToken());
}
```

**Problemnya adalah:**

1.  Saat komponen pertama kali dimuat, `status` adalah `idle`, sehingga `verifyToken()` dijalankan.
2.  Server mengembalikan respons error (misalnya 401 Unauthorized), yang mengubah `status` menjadi `failed`.
3.  Karena `status` kini `failed` (dan bukan `"loading"`), kondisi di dalam `useEffect` kembali terpenuhi.
4.  `verifyToken()` dipanggil lagi, dan siklus ini terus berulang tanpa henti, menyebabkan _infinite loop_. 😱

**3️⃣ Solusi Anti-Loop yang Efektif 🛡️**

Solusinya adalah dengan memastikan `verifyToken()` hanya dipanggil **satu kali**, yaitu saat status komponen masih bersih (`idle`).

**Implementasi Baru yang Direkomendasikan:**

```javascript
useEffect(() => {
  if (!data && status === "idle") {
    dispatch(verifyToken());
  }
}, [dispatch, data, status]);

// ... (sisa logika komponen)

// Jika status 'failed', tampilkan halaman publik (login/register)
return <Outlet />;
```

**Mengapa Solusi Ini Berhasil?**

- `verifyToken()` hanya akan dieksekusi saat `status` awal adalah `idle`.
- Jika proses verifikasi gagal dan `status` berubah menjadi `failed`, kondisi `useEffect` tidak akan terpenuhi lagi, sehingga pemanggilan ulang dapat dihentikan.
- Komponen akan me-render `<Outlet />` (yang berisi halaman login atau register), memungkinkan pengguna untuk mengakses halaman publik tanpa terjebak dalam perulangan.

**Hasil Akhir:**

- Infinite loop berhasil dihilangkan! 🎉
- Pengguna dapat dengan lancar mengakses halaman publik (seperti login/register) meskipun token sebelumnya tidak valid.
- Proses pengecekan token menjadi lebih efisien dan hanya berjalan saat diperlukan. ✨
