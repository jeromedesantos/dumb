import type { TokenType } from "./token";

export interface TokenSliceType {
  data: TokenType | null;
  status: "idle" | "loading" | "succeeded" | "failed";
}
