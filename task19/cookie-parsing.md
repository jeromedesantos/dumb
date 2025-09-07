# ⚔️ Perbandingan Teknik Pengambilan Token dari Cookie

Ada dua cara umum untuk mengambil nilai token dari `document.cookie`. Masing-masing memiliki kelebihan dan kekurangan.

## 🧪 1. Cara `split().find().split()`

Metode ini memecah string cookie secara manual.

```javascript
const token = document.cookie
  .split("; ")
  .find((row) => row.startsWith("token="))
  ?.split("=")[1];
```

**✅ Kelebihan:**

- Ringkas dan mudah dibaca untuk kasus sederhana.
- Cocok untuk format cookie yang sangat predictable.

**⚠️ Kekurangan:**

- **Rentan error:** Mudah gagal jika format cookie tidak konsisten.
- Gagal jika ada spasi ekstra (misalnya `;token=` tanpa spasi setelah titik koma).
- Gagal jika ada cookie dengan nama mirip (misalnya `tokenized=...`).
- Gagal jika nilai cookie mengandung karakter `=` (seperti pada token JWT).

## 🧪 2. Cara `regex.match()` (Direkomendasikan)

Metode ini menggunakan _Regular Expression_ untuk pencarian yang lebih tangguh.

```javascript
function getTokenFromCookie(): string | null {
  const match = document.cookie.match(/(^|;) ?token=([^;]*)(;|$)/);
  return match ? match[2] : null;
}
```

**✅ Kelebihan:**

- **Lebih Tahan Banting:** Tahan terhadap format cookie yang tidak konsisten (spasi, posisi token).
- **Aman:** Bisa menangani nilai yang mengandung `=` atau karakter khusus lainnya.
- **Fleksibel:** Regex bisa disesuaikan untuk kasus yang lebih kompleks.

**⚠️ Kekurangan:**

- Sedikit lebih verbose.
- Butuh pemahaman regex (tapi sekali paham, sangat powerful).

---

## 🧠 Penjelasan Regex untuk `getTokenFromCookie()`

Fungsi `getTokenFromCookie()` menggunakan regex untuk mengekstrak nilai cookie bernama `token` dari `document.cookie` secara aman.

### Fungsi Lengkap

```typescript
function getTokenFromCookie(): string | null {
  // Cari cookie dengan nama "token"
  const match = document.cookie.match(/(^|;) ?token=([^;]*)(;|$)/);
  // Jika ditemukan, kembalikan grup kedua (nilainya). Jika tidak, kembalikan null.
  return match ? match[2] : null;
}
```

### Penjelasan Langkah per Langkah

1.  **`document.cookie`**
    Ini adalah sebuah string yang berisi semua cookie yang disimpan di browser untuk domain saat ini, contohnya:
    `"theme=dark; token=abc123; sessionId=xyz789"`

2.  **`.match(/(^|;) ?token=([^;]*)(;|$)/)`**
    Ini adalah inti dari fungsi ini, yaitu mencari pola cookie `token`.

    **🔎 Bedah Regex:**

| Regex     | Arti                                                                                                                                                          | Contoh Cocok                   |
| :-------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------ | :----------------------------- |
| `(^\|;)`  | Cocokkan **awal string** (`^`) ATAU (`\|`) karakter **titik koma** (`;`). Ini memastikan kita menemukan awal dari sebuah cookie.                              | `^token=...` atau `;token=...` |
| ` ?`      | Cocokkan **spasi** (` `) sebanyak nol atau satu kali (`?`). Ini menangani `token=...` dan `; token=...`.                                                      | `; token=...`                  |
| `token=`  | Cocokkan string `token=` secara literal.                                                                                                                      | `token=`                       |
| `([^;]*)` | **Grup Penangkapan #2:** Cocokkan karakter apa pun (`[^;]`) selain titik koma (`;`) sebanyak nol atau lebih kali (`*`). Ini adalah nilai dari cookie `token`. | `abc123`                       |
| `(;\|$)`  | Cocokkan **titik koma** (`;`) ATAU (`\|`) **akhir string** (`$`). Ini memastikan kita mengambil nilai sampai akhir cookie.                                    | `;` atau akhir string          |

3.  **`match ? match[2] : null`**
    - Jika regex berhasil menemukan kecocokan, `match` akan menjadi sebuah array. `match[2]` berisi teks yang ditangkap oleh grup kedua `([^;]*)`, yaitu nilai dari token.
    - Jika tidak ada yang cocok, `.match()` akan mengembalikan `null`, dan fungsi ini juga akan mengembalikan `null`.

### Contoh Hasil

```javascript
document.cookie = "theme=dark; token=abc123; sessionId=xyz789";
getTokenFromCookie(); // Hasilnya: "abc123"
```

---

### 📌 Kesimpulan

| Metode               | Kelebihan                    | Kekurangan                                | Kapan Digunakan                                                                         |
| :------------------- | :--------------------------- | :---------------------------------------- | :-------------------------------------------------------------------------------------- |
| **`split().find()`** | Ringkas, mudah dibaca.       | Rapuh, tidak aman untuk nilai dengan `=`. | Proyek kecil, prototipe cepat, format cookie sangat terkontrol.                         |
| **`regex.match()`**  | **Robust**, aman, fleksibel. | Sedikit lebih kompleks.                   | **Direkomendasikan untuk produksi**, menangani JWT, dan format cookie yang tidak pasti. |

### 📺 Referensi Pendukung

- **Get cookie value with regular expression**: Menjelaskan bagaimana regex bisa menangani cookie yang kompleks dan tidak konsisten.
- **How to parse multiple cookies values from Set-Cookie**: Membahas tantangan parsing cookie dengan format rumit dan kenapa regex lebih cocok.
- **Menguasai Postman: Autentikasi Cookie dan Token**: Memberikan insight tentang bagaimana cookie digunakan dalam autentikasi.
