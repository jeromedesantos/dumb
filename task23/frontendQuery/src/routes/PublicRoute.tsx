import { useDispatch } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { Loading } from "../components/atoms";
import { getVerify, usersKeys } from "../queries/users";
import { setToken } from "../redux/slices/token";
import type { AppDispatch } from "../redux/store";
import { useEffect } from "react";

export function PublicRoute() {
  const { data: verify, isPending } = useQuery({
    queryKey: usersKeys.all,
    queryFn: getVerify,
    retry: false,
  });

  const dispatch: AppDispatch = useDispatch();
  // dispatch(setToken(verify));

  useEffect(() => {
    if (verify) dispatch(setToken(verify));
  }, [dispatch, verify]);

  if (isPending) return <Loading>Auth checking...</Loading>;
  if (verify) return <Navigate to="/" replace />;
  return <Outlet />;
}
