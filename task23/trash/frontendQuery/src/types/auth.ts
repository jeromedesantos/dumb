import type { TokenType } from "./token";

export interface AuthContextType {
  token: TokenType | null;
  setToken: (token: TokenType | null) => void;
  isPending: boolean;
}
