# Perbandingan State Management untuk Autentikasi: React Context vs. Recoil

Dokumen ini menjelaskan dua pendekatan untuk mengelola state autentikasi di aplikasi React: menggunakan **React Context API** dan **Recoil**.

## 🧠 Alur 1: Menggunakan React Context + `AuthProvider`

Pendekatan ini menggunakan `useContext` bawaan React untuk menyediakan data autentikasi ke seluruh pohon komponen.

### 1. `createContext`

Pertama, kita membuat sebuah "wadah" Context yang akan menampung data autentikasi. Awalnya, wadah ini kosong.

```typescript
// contexts/AuthContext.ts
import { createContext, ReactNode } from "react";

export interface AuthContextType {
  token: string | null;
  login: (token: string) => void;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType | null>(null);
```

### 2. `AuthProvider`

Komponen ini bertugas untuk "mengisi" Context dengan nilai yang sebenarnya (state `token`, fungsi `login`, dan `logout`) dan menyediakannya untuk semua komponen anak (`children`).

```tsx
// providers/AuthProvider.tsx
import React, { useState, ReactNode } from "react";
import { AuthContext } from "@/contexts/AuthContext";

function AuthProvider({ children }: { children: ReactNode }) {
  const [token, setToken] = useState<string | null>(() =>
    localStorage.getItem("token")
  );

  function login(token: string) {
    localStorage.setItem("token", token);
    setToken(token);
  }

  function logout() {
    localStorage.removeItem("token");
    setToken(null);
  }

  return (
    <AuthContext.Provider value={{ token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
```

### 3. `useAuth()` Custom Hook

Hook ini adalah jalan pintas untuk mengakses data dari `AuthContext`. Ini juga memberikan pesan error yang jelas jika digunakan di luar `AuthProvider`.

```typescript
// hooks/useAuth.ts
import { useContext } from "react";
import { AuthContext } from "@/contexts/AuthContext";

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
```

### 4. `PrivateRoute` / `PublicRoute`

Komponen yang memerlukan data autentikasi (seperti `PrivateRoute`) dapat memanggil `useAuth()` untuk mendapatkan `token`.

```tsx
// components/PrivateRoute.tsx
import { useAuth } from "@/hooks/useAuth";

const PrivateRoute = () => {
  const { token } = useAuth();
  // ... logika untuk proteksi route
};
```

---

## 🔄 Alur 2: Migrasi ke Recoil

Jika Anda ingin beralih ke Recoil, Anda dapat mengganti `AuthProvider` dan `createContext` sepenuhnya.

### 1. Buat `authAtom.ts`

`atom` di Recoil adalah unit state. `authAtom` ini akan menyimpan `token` dan bisa diakses dari mana saja di dalam `<RecoilRoot>`.

```typescript
// atoms/authAtom.ts
import { atom } from "recoil";

export const authAtom = atom<string | null>({
  key: "authAtom",
  default: localStorage.getItem("token"),
});
```

### 2. Buat `useAuth.ts` (Versi Recoil)

Custom hook `useAuth` sekarang akan menggunakan `useRecoilState` untuk membaca dan menulis ke `authAtom`.

```typescript
// hooks/useAuth.ts (Recoil version)
import { useRecoilState } from "recoil";
import { authAtom } from "@/atoms/authAtom";

export function useAuth() {
  const [token, setToken] = useRecoilState(authAtom);

  const login = (newToken: string) => {
    localStorage.setItem("token", newToken);
    setToken(newToken);
  };

  const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
  };

  return { token, login, logout };
}
```

### 3. Ganti `<AuthProvider>` dengan `<RecoilRoot>` di `App.tsx`

Di file utama aplikasi Anda, ganti pembungkus `AuthProvider` dengan `RecoilRoot` dari Recoil.

---

## ⚔️ Perbandingan Struktur di `App.tsx`

| Fitur              | Pendekatan Context (`AuthProvider`) | Pendekatan Recoil (`RecoilRoot`) |
| :----------------- | :---------------------------------- | :------------------------------- |
| **Penyedia State** | `<AuthProvider>`                    | `<RecoilRoot>`                   |
| **Sumber State**   | `useState` di dalam `AuthProvider`  | `atom`                           |
| **Akses State**    | `useContext(AuthContext)`           | `useRecoilState(authAtom)`       |

### Struktur dengan Context

```tsx
<AuthProvider>
  <BrowserRouter>
    <Routes>{/* ... */}</Routes>
  </BrowserRouter>
</AuthProvider>
```

### Struktur dengan Recoil

```tsx
<RecoilRoot>
  <BrowserRouter>
    <Routes>{/* ... */}</Routes>
  </BrowserRouter>
</RecoilRoot>
```

---

## 🎥 Referensi

- **ReactJS - Menggunakan useContext: Panduan untuk Pemula**: Menjelaskan analogi dan alur `useContext` dengan sangat visual dan mudah dicerna.
- **useContext – React**: Dokumentasi resmi yang menjelaskan bagaimana context bekerja dan kapan harus digunakan.
- **How to manage user authentication With React JS**: Membahas alur login, context, dan session management secara lengkap.
- **Tutorial React Native Auth - #5 - Membuat Login Screen React Native**: Menjelaskan bagaimana `AuthProvider` membungkus seluruh aplikasi.
- **recoiljs - Integrating RecoilRoot in Next.js using Next.js 13**: Membahas bagaimana `RecoilRoot` digunakan untuk membungkus aplikasi.
- **reactjs - Setting state in React context provider with TypeScript**: Memberikan insight tentang bagaimana `AuthContext` dan `AuthProvider` bekerja secara teknis.
