import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { ThreadType } from "../../types/thread";

const threadSlice = createSlice({
  name: "thread",
  initialState: null as ThreadType | null,
  reducers: {
    setThread: (_state, action: PayloadAction<ThreadType | null>) =>
      action.payload,
    clearThread: () => null,
  },
});

export const { setThread, clearThread } = threadSlice.actions;
export default threadSlice.reducer;
