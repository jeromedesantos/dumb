import type { TokenType } from "./token";

export type AuthContextType = {
  token: TokenType | null;
  setToken: (token: TokenType | null) => void;
  isPending: boolean;
};
