import { type ReactNode, useCallback } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { AuthContext } from "./AuthContext";
import { getVerify } from "../queries/users";
import type { TokenType } from "../types/token";

export function AuthProvider({ children }: { children: ReactNode }) {
  const queryClient = useQueryClient();
  const { data, isPending } = useQuery({
    queryKey: ["verify"],
    queryFn: getVerify,
    retry: false,
  });
  const setToken = useCallback(
    (token: TokenType | null) => {
      if (token) {
        queryClient.setQueryData(["verify"], { data: token });
      } else {
        queryClient.removeQueries({ queryKey: ["verify"] });
      }
    },
    [queryClient]
  );
  const token = data?.data ?? null;

  return (
    <AuthContext.Provider value={{ token, setToken, isPending }}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;
