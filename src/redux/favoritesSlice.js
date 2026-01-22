import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;
const PREFIX = "yt_query:";

const getAuthHeader = (thunkAPI) => ({
  headers: { Authorization: `Bearer ${thunkAPI.getState().auth.token}` },
});

export const fetchFavorites = createAsyncThunk(
  "favorites/fetchAll",
  async (_, thunkAPI) => {
    const res = await axios.get(`${API_URL}/todos`, getAuthHeader(thunkAPI));

    return res.data.filter((item) => item.title?.startsWith(PREFIX));
  },
);

export const saveFavorite = createAsyncThunk(
  "favorites/save",
  async (data, thunkAPI) => {
    const encodedTitle = `${PREFIX}${JSON.stringify({
      displayTitle: data.title,
      query: data.query,
      sortBy: data.sortBy,
      maxResults: data.maxResults,
    })}`;
    await axios.post(
      `${API_URL}/todos`,
      { title: encodedTitle },
      getAuthHeader(thunkAPI),
    );
    thunkAPI.dispatch(fetchFavorites());
  },
);

export const editFavorite = createAsyncThunk(
  "favorites/edit",
  async ({ id, data }, thunkAPI) => {
    const encodedTitle = `${PREFIX}${JSON.stringify({
      displayTitle: data.title,
      query: data.query,
      sortBy: data.sortBy,
      maxResults: data.maxResults,
    })}`;
    await axios.patch(
      `${API_URL}/todos/${id}`,
      { title: encodedTitle },
      getAuthHeader(thunkAPI),
    );
    thunkAPI.dispatch(fetchFavorites());
  },
);

export const deleteFavorite = createAsyncThunk(
  "favorites/delete",
  async (id, thunkAPI) => {
    await axios.delete(`${API_URL}/todos/${id}`, getAuthHeader(thunkAPI));
    return id;
  },
);

const favoritesSlice = createSlice({
  name: "favorites",
  initialState: { items: [], isLoading: false },
  extraReducers: (builder) => {
    builder
      .addCase(fetchFavorites.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchFavorites.fulfilled, (state, action) => {
        state.isLoading = false;
        state.items = action.payload
          .map((item) => {
            try {
              const parsed = JSON.parse(item.title.replace(PREFIX, ""));
              return { id: item.id, title: parsed.displayTitle, ...parsed };
            } catch {
              return null;
            }
          })
          .filter(Boolean);
      })
      .addCase(deleteFavorite.fulfilled, (state, action) => {
        state.items = state.items.filter((i) => i.id !== action.payload);
      });
  },
});
export default favoritesSlice.reducer;
