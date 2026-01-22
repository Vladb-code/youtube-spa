import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import videoReducer from "./videoSlice";
import favoritesReducer from "./favoritesSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    videos: videoReducer,
    favorites: favoritesReducer,
  },
});

export default store;
