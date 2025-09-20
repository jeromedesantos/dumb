import {
  createAsyncThunk,
  createSlice,
  type PayloadAction,
} from "@reduxjs/toolkit";
import { isAxiosError } from "axios";
import { getThreadById } from "../../queries/thread";
import type { ThreadType } from "../../types/thread";

export const fetchThreadById = createAsyncThunk(
  "Thread/fetchThreadById",
  async (id: string, { rejectWithValue }) => {
    try {
      return await getThreadById(id);
    } catch (err) {
      if (isAxiosError(err) && err.response) {
        return rejectWithValue(err.response.data.message);
      }
      throw err;
    }
  }
);

const threadByIdSlice = createSlice({
  name: "threadById",
  initialState: {
    data: null as ThreadType | null,
    status: "idle",
    error: null as string | null,
  },
  reducers: {
    removeThread: (state) => {
      state.data = null;
    },
    incrementRepliesCount: (state) => {
      if (state.data) {
        state.data.number_of_replies += 1;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchThreadById.pending, (state) => {
        state.status = "loading";
        state.data = null;
        state.error = null;
      })
      .addCase(
        fetchThreadById.fulfilled,
        (state, action: PayloadAction<ThreadType>) => {
          state.data = action.payload;
          state.status = "succeeded";
        }
      )
      .addCase(fetchThreadById.rejected, (state, action) => {
        state.status = "failed";
        state.error =
          (action.payload as string) || (action.error.message as string);
      });
  },
});

export const { removeThread, incrementRepliesCount } = threadByIdSlice.actions;
export default threadByIdSlice.reducer;
