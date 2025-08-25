## TASK 09:

- Gunakan Hashing dengan bcrypt untuk menyimpan password supplier
- Gunakan Encryption untuk mengenkripsi data sensitif
- Buat endpoint /suppliers/login dengan JWT Authentication
- Buat endpoint /suppliers/products yang hanya bisa diakses oleh supplier yang sudah login
- Buat endpoint /products/add dengan validasi input (misalnya harga tidak boleh negatif dan nama produk minimal 3 karakter)
- Implementasikan middleware Authorization agar hanya supplier tertentu yang bisa mengupdate produk tertentu
