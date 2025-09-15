import {
  createAsyncThunk,
  createSlice,
  type PayloadAction,
} from "@reduxjs/toolkit";
import type { TokenType } from "@/types/token"; // Asumsikan ini adalah definisi tipe Anda

// Fungsi API untuk verifikasi token
// Ganti dengan implementasi API Anda yang sesungguhnya
import { getVerify } from "@/queries/users";

// Definisikan tipe untuk state slice
interface TokenState {
  data: TokenType | null;
  status: "idle" | "loading" | "succeeded" | "failed";
}

const initialState: TokenState = {
  data: null,
  status: "idle",
};

// Async Thunk untuk memanggil API
export const verifyToken = createAsyncThunk("token/verifyToken", async () => {
  const response = await getVerify();
  return response.data; // Mengembalikan data dari respons API
});

const tokenSlice = createSlice({
  name: "token",
  initialState,
  reducers: {
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

export const { setToken, clearToken } = tokenSlice.actions;
export default tokenSlice.reducer;
