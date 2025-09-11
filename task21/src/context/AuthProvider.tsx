import { useState, type ReactNode } from "react";
import { AuthContext } from "./AuthContext";
import { addCookie, getCookie } from "@/lib/cookie";

function AuthProvider({ children }: { children: ReactNode }) {
  const [token, setToken] = useState<string | null>(() => getCookie());

  function login(token: string) {
    addCookie(token);
    setToken(token);
  }

  function logout() {
    removeCookie();
    setToken(null);
  }

  return (
    <AuthContext.Provider value={{ token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;
function removeCookie() {
  throw new Error("Function not implemented.");
}
