import type { TokenType } from "./token";

export interface TokenStateType {
  token: {
    data: TokenType | null;
    status: "idle" | "loading" | "succeeded" | "failed";
  };
}
