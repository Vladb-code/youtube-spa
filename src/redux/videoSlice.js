import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_KEY = import.meta.env.VITE_YOUTUBE_API_KEY;

export const searchVideos = createAsyncThunk(
  "videos/search",
  async (params, { rejectWithValue }) => {
    try {
      const isString = typeof params === "string";
      const query = isString ? params : params?.query;
      const maxResults = isString ? 12 : params?.maxResults || 12;
      const sortBy = isString ? "relevance" : params?.sortBy || "relevance";

      const res = await axios.get(
        "https://www.googleapis.com/youtube/v3/search",
        {
          params: {
            part: "snippet",
            q: query,
            type: "video",
            maxResults: maxResults,
            order: sortBy,
            key: API_KEY,
          },
        },
      );
      return res.data.items;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.error?.message || "Ошибка API",
      );
    }
  },
);

const videoSlice = createSlice({
  name: "videos",
  initialState: { list: [], isLoading: false, error: null },
  extraReducers: (builder) => {
    builder
      .addCase(searchVideos.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(searchVideos.fulfilled, (state, action) => {
        state.isLoading = false;
        state.list = action.payload;
      })
      .addCase(searchVideos.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export default videoSlice.reducer;
