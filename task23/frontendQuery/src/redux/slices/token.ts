import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { TokenType } from "../../types/token";

const tokenSlice = createSlice({
  name: "token",
  initialState: null as TokenType | null,
  reducers: {
    setToken: (_state, action: PayloadAction<TokenType | null>) =>
      action.payload,
    clearToken: () => null,
  },
});

export const { setToken, clearToken } = tokenSlice.actions;
export default tokenSlice.reducer;
