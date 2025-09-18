import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import { Pending } from "../components/atoms";
import { verifyToken } from "../redux/slices/token";
import type { AppDispatch } from "../redux/store";
import type { TokenStateType } from "../types/tokenState";

export function PrivateRoute() {
  const { status, data } = useSelector((state: TokenStateType) => state.token);
  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    if (!data && status !== "loading") dispatch(verifyToken());
  }, [dispatch, data, status]);

  if (status === "loading") return <Pending>Auth checking...</Pending>;
  if (status === "failed") return <Navigate to="/login" replace />;
  return <Outlet />;
}
