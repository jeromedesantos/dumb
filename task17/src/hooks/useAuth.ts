import { AuthContext } from "@/context/AuthContext";
import { useContext } from "react";

export function useAuth() {
  const context = useContext(AuthContext); // validasiin context dulu
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
