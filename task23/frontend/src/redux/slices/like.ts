import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { ThreadType } from "../../types/thread";

const likesSlice = createSlice({
  name: "likes",
  initialState: {
    data: null as ThreadType | null,
  },
  reducers: {
    addLikes: (state, action: PayloadAction<ThreadType>) => {
      state.data = action.payload;
    },
    removeLikes: (state) => {
      state.data = null;
    },
  },
});

export const { addLikes, removeLikes } = likesSlice.actions;
export default likesSlice.reducer;
