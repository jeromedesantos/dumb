## TASK 10:

#### 🗂 Judul:

Mini Online Store API (Tema nya bebas)

#### 🕒 Durasi:

3 hari pengerjaan mini project

#### Fitur:

1. Register & Login -> task09 (DONE)

   - Hashing password (bcrypt)
   - Auth menggunakan JWT
   - Role-based authorization (admin / user)

2. Produk -> task05 (DONE)

   - Admin bisa Create, Read dan Update Produk
   - User dapat melihat semua Produk
   - Filtering, Sorting, Pagination

3. Order -> task05 (DONE)

   - User bisa order produk
   - User melihat order miliknya
   - Admin bisa melihat semua order
   - Group order by user ID
   - Filtering, Sorting, Pagination

4. Transfer Antar Point Pengguna -> task07 (DONE)

   - how to get point: transaksi Rp 10.000 -> 10 (conversi 1 point = Rp 1.000)
   - Validasi saldo poin
   - Menggunakan Prisma transaction
   - Validasi error handling

5. Upload Foto -> task10 (DONE)

   - Upload gambar profil menggunakan multer
   - Upload gambar produk menggunakan multer

6. Soft Delete Produk (DONE)

   - Tambahkan field deletedAt (nullable DateTime) / status(nullable boolean) di tabel Product (pilih salah satu)
   - Saat produk dihapus, ubah deletedAt jadi waktu sekarang
   - Tambahkan endpoint untuk restore produk (PATCH /products/:id/restore)

7. Dokumentasi API

   - Save semua endpoint projeck ini pada postman
   - export collection/folder tersebut lalu taruh di GitHub bareng dengan projek nya

#### Penjelasan Fitur

1. Update Stock [Update Stock](updStock.md).
2. Update Point [Update Point](updPoint.md).
