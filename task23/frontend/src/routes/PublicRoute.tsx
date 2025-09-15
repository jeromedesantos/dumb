import { type ReactNode, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Navigate } from "react-router-dom";
import { type AppDispatch } from "@/redux/store";
import { verifyToken } from "@/redux/slices/token"; // Ganti dengan path slice Anda
import { Pending } from "../components/atoms";

// Definisikan tipe untuk root state Redux
interface RootState {
  token: {
    data: { id: string; username: string } | null;
    status: "idle" | "loading" | "succeeded" | "failed";
  };
}

export function PublicRoute({ children }: { children: ReactNode }) {
  // Ambil state dari Redux store dengan tipe yang benar
  const { status } = useSelector((state: RootState) => state.token);
  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    if (status === "idle") {
      dispatch(verifyToken()); // Cast to any to bypass type error temporarily
    }
  }, [dispatch, status]);

  if (status === "loading") {
    return <Pending>Auth checking...</Pending>;
  }

  if (status === "succeeded") {
    window.location.href = "/";
    return;
    // return <Navigate to="/" replace />;
  }

  return <>{children}</>;
}

export default PublicRoute;
