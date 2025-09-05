import { type ReactNode } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";

export function PrivateRoute({ children }: { children: ReactNode }) {
  const { token } = useAuth(); // ambil token dari context
  const location = useLocation();

  if (!token) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  return <>{children}</>;
}

export function PublicRoute({ children }: { children: ReactNode }) {
  const { token } = useAuth();

  if (token) {
    return <Navigate to="/product" replace />;
  }
  return <>{children}</>;
}
