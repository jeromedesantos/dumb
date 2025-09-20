import { type ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { Pending } from "../components/atoms";

export function PrivateRoute({ children }: { children: ReactNode }) {
  const { token, isPending } = useAuth();

  if (isPending) {
    return <Pending>Loading Auth..</Pending>;
  }

  if (!token) {
    console.log(token);
    return <Navigate to="/login" replace />;
  }
  return <>{children}</>;
}

export default PrivateRoute;
