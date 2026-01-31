import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { storage } from "../utils/storage";
const api = axios.create({ baseURL: import.meta.env.VITE_API_URL });

export const loginUser = createAsyncThunk(
  "auth/login",
  async (data, { rejectWithValue }) => {
    try {
      const res = await api.post("/auth/login", data);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Ошибка входа");
    }
  },
);

export const registerUser = createAsyncThunk(
  "auth/reg",
  async (data, { rejectWithValue }) => {
    try {
      const res = await api.post("/users/register", data);
      return res.data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Ошибка регистрации",
      );
    }
  },
);

const authSlice = createSlice({
  name: "auth",
  initialState: {
    token: storage.getToken(),
    user: storage.getUser(),
    isLoading: false,
    error: null,
  },
  reducers: {
    logout: (state) => {
      state.token = null;
      state.user = null;
    },
  },
  extraReducers: (builder) => {
    const setAuth = (state, action) => {
      state.isLoading = false;
      state.token = action.payload.token;
      state.user = action.payload.user;
    };
    builder
      .addCase(loginUser.fulfilled, setAuth)
      .addCase(registerUser.fulfilled, setAuth)
      .addMatcher(
        (action) => action.type.endsWith("/pending"),
        (state) => {
          state.isLoading = true;
          state.error = null;
        },
      )
      .addMatcher(
        (action) => action.type.endsWith("/rejected"),
        (state, action) => {
          state.isLoading = false;
          state.error = action.payload;
        },
      );
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
