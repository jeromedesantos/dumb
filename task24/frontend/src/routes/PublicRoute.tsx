import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Pending } from "../components/atoms";
import { Navigate, Outlet } from "react-router-dom";
import { verifyToken } from "../redux/slices/token";
import type { AppDispatch } from "../redux/store";
import type { TokenStateType } from "../types/tokenState";

export function PublicRoute() {
  const { status, data } = useSelector((state: TokenStateType) => state.token);
  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    if (!data && status !== "idle") dispatch(verifyToken());
  }, [dispatch, data, status]);

  if (status === "loading") return <Pending>Auth checking...</Pending>;
  if (status === "succeeded") return <Navigate to="/" replace />;
  return <Outlet />;
}
