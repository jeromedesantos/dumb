import { useRecoilState } from "recoil";
import { authAtom } from "@/atoms/authAtom";
import { addCookie, deleteCookie } from "@/lib/cookie";

export const useAuth = () => {
  const [token, setToken] = useRecoilState<string | null>(authAtom);

  const login = (newToken: string) => {
    addCookie(newToken);
    setToken(newToken);
  };

  const logout = () => {
    deleteCookie();
    setToken(null);
  };

  return { token, login, logout };
};
