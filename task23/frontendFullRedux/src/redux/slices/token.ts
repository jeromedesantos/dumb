import {
  createAsyncThunk,
  createSlice,
  type PayloadAction,
} from "@reduxjs/toolkit";
import { getVerify } from "../../queries/users";
import type { TokenType } from "../../types/token";
import type { TokenSliceType } from "../../types/tokenSlice";

const initialState: TokenSliceType = {
  data: null,
  status: "idle",
};

export const verifyToken = createAsyncThunk("token/verifyToken", async () => {
  const response = await getVerify();
  return response;
});

const tokenSlice = createSlice({
  name: "token",
  initialState,
  reducers: {
    resetToken: () => initialState,
    setToken: (state, action: PayloadAction<TokenType>) => {
      state.data = action.payload;
    },
    clearToken: (state) => {
      state.data = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(verifyToken.pending, (state) => {
        state.status = "loading";
      })
      .addCase(
        verifyToken.fulfilled,
        (state, action: PayloadAction<TokenType>) => {
          state.status = "succeeded";
          state.data = action.payload;
        }
      )
      .addCase(verifyToken.rejected, (state) => {
        state.status = "failed";
        state.data = null;
      });
  },
});

export const { resetToken, setToken, clearToken } = tokenSlice.actions;
export default tokenSlice.reducer;
