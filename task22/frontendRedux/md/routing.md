# Perbandingan BrowserRouter vs createBrowserRouter di React Router DOM

Rangkuman lengkap dan terstruktur tentang perbandingan `BrowserRouter` vs `createBrowserRouter` di React Router DOM—dari instalasi, fitur, hingga implementasi private route pakai Context. Cocok untuk arsitektur modular dan scalable.

---

## 🛠️ 1. Tahap Instalasi

Keduanya berasal dari library yang sama, jadi instalasinya identik:

```bash
npm install react-router-dom
```

Setelah instalasi:

- `BrowserRouter` → digunakan sebagai komponen wrapper.
- `createBrowserRouter` → digunakan sebagai fungsi untuk membuat dan mengkonfigurasi instance router.

---

## ⚙️ 2. Fitur & Struktur Routing

| Fitur                | `BrowserRouter`                            | `createBrowserRouter`                            |
| :------------------- | :----------------------------------------- | :----------------------------------------------- |
| **Deklarasi Route**  | Komponen JSX di dalam `<Routes>`           | Objek konfigurasi JavaScript                     |
| **Layout Bersarang** | Komponen layout manual dengan `<Outlet />` | Properti `children` dengan `<Outlet />` otomatis |
| **Data Loading**     | `useEffect` di dalam komponen              | Fungsi `loader` pada definisi route              |
| **Data Mutations**   | Handler manual (mis: `onSubmit`)           | Fungsi `action` pada definisi route              |
| **Error Handling**   | Error Boundaries manual                    | Properti `errorElement` pada definisi route      |
| **Akses Data**       | State management (mis: `useState`)         | `useLoaderData()`, `useActionData()`             |

### 🔍 Contoh Struktur

#### `BrowserRouter`

Menggunakan komponen JSX untuk mendefinisikan route.

```jsx
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Home";
import About from "./About";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </BrowserRouter>
  );
}
```

#### `createBrowserRouter`

Menggunakan objek JavaScript untuk konfigurasi yang lebih terpusat.

```jsx
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import Home, { homeLoader } from "./Home";
import About from "./About";
import Layout from "./Layout";
import ErrorPage from "./ErrorPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true, // atau path: ''
        element: <Home />,
        loader: homeLoader,
      },
      {
        path: "about",
        element: <About />,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}
```

---

## 🔐 3. Private Route dengan `useContext`

### ✅ `BrowserRouter` (via wrapper component)

Implementasi private route dilakukan dengan membuat komponen wrapper yang memeriksa kondisi otentikasi.

```jsx
import { useAuth } from "./AuthContext";
import { Navigate } from "react-router-dom";

function PrivateRoute({ children }) {
  const { token } = useAuth();
  return token ? children : <Navigate to="/login" />;
}

// Penggunaan di dalam Routes
<BrowserRouter>
  <Routes>
    <Route
      path="/dashboard"
      element={
        <PrivateRoute>
          <Dashboard />
        </PrivateRoute>
      }
    />
    <Route path="/login" element={<Login />} />
  </Routes>
</BrowserRouter>;
```

### ✅ `createBrowserRouter` (via loader guard)

Dengan `createBrowserRouter`, proteksi route bisa dilakukan di level konfigurasi menggunakan `loader`. Jika kondisi tidak terpenuhi, `loader` dapat melempar `redirect`.

**`requireAuth.js`**

```javascript
import { redirect } from "react-router-dom";

export async function requireAuth() {
  const token = localStorage.getItem("token");
  if (!token) {
    throw redirect("/login");
  }
  return null; // atau return data yang dibutuhkan
}
```

**`router.js`**

```javascript
import { createBrowserRouter } from "react-router-dom";
import { requireAuth } from "./requireAuth";
import Dashboard from "./Dashboard";

const router = createBrowserRouter([
  {
    path: "/dashboard",
    element: <Dashboard />,
    loader: requireAuth, // Terapkan loader sebagai guard
  },
  {
    path: "/login",
    element: <Login />,
  },
]);
```

### 🔄 Integrasi dengan Context

Untuk kedua pendekatan, `AuthProvider` dapat membungkus layout aplikasi untuk menyediakan data otentikasi ke seluruh komponen di bawahnya.

```jsx
import { AuthProvider } from "./AuthContext";
import { Outlet } from "react-router-dom";

function ContextLayout() {
  return (
    <AuthProvider>
      <Outlet />
    </AuthProvider>
  );
}
```

Kemudian, pasang `ContextLayout` sebagai root atau layout utama di konfigurasi router Anda.

```javascript
// Contoh untuk createBrowserRouter
const router = createBrowserRouter([
  {
    element: <ContextLayout />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/dashboard", element: <Dashboard />, loader: requireAuth },
      // ... route lainnya
    ],
  },
]);
```

---

## 🧠 Kesimpulan

| Aspek                | `BrowserRouter`                                                | `createBrowserRouter`                                |
| :------------------- | :------------------------------------------------------------- | :--------------------------------------------------- |
| **Gaya**             | Berbasis komponen, imperatif                                   | Berbasis konfigurasi, deklaratif                     |
| **Skalabilitas**     | Cukup untuk proyek kecil-menengah                              | **Sangat baik** untuk proyek besar & modular         |
| **Fitur Modern**     | Memerlukan implementasi manual (data fetching, error handling) | **Terintegrasi**: `loader`, `action`, `errorElement` |
| **Pemisahan Logika** | Logika (fetching, auth) sering tercampur di komponen           | Logika terpisah dari UI (di `loader` & `action`)     |
| **Rekomendasi**      | Proyek sederhana atau migrasi dari versi lama                  | **Proyek baru** dan aplikasi yang butuh skalabilitas |

`createBrowserRouter` adalah pilihan modern yang direkomendasikan untuk proyek baru karena menyediakan API yang lebih kuat dan terstruktur untuk menangani data, error, dan routing secara deklaratif, yang pada akhirnya menghasilkan kode yang lebih bersih dan mudah dikelola.
