import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { YOUTUBE_CONFIG } from "../utils/constants";
const API_KEY = import.meta.env.VITE_YOUTUBE_API_KEY;

export const searchVideos = createAsyncThunk(
  "videos/search",
  async (params, { rejectWithValue }) => {
    try {
      const isString = typeof params === "string";
      const query = isString ? params : params?.query;
      const maxResults = isString
        ? YOUTUBE_CONFIG.DEFAULT_MAX_RESULTS
        : params?.maxResults || YOUTUBE_CONFIG.DEFAULT_MAX_RESULTS;

      const sortBy = isString
        ? YOUTUBE_CONFIG.DEFAULT_SORT_BY
        : params?.sortBy || YOUTUBE_CONFIG.DEFAULT_SORT_BY;

      const res = await axios.get(
        `${YOUTUBE_CONFIG.BASE_URL}/youtube/v3/search`,
        {
          params: {
            part: "snippet",
            q: query,
            type: "video",
            maxResults,
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
