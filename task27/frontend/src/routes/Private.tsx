import { type ReactNode, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { verifyToken } from "../redux/slices/token";
import type { AppDispatch } from "../redux/store";
import type { TokenStateType } from "../types/tokenState";
import { LayoutAuth } from "../components/template";
import { Pending } from "../components/atoms";

export default function Private({ children }: { children: ReactNode }) {
  const { status } = useSelector((state: TokenStateType) => state.token);
  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    if (status === "idle") {
      dispatch(verifyToken());
    }
  }, [dispatch, status]);

  if (status === "loading") {
    return (
      <LayoutAuth>
        <Pending>Auth checking...</Pending>
      </LayoutAuth>
    );
  }

  if (status === "failed") {
    window.location.href = "/login";
    return;
  }

  return <>{children}</>;
}
