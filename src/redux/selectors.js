export const selectIsAuth = (state) => !!state.auth.token;
export const selectAuthToken = (state) => state.auth.token;
export const selectAuthLoading = (state) => state.auth.isLoading;
export const selectAuthError = (state) => state.auth.error;

export const selectVideos = (state) => state.videos.list;
export const selectVideosLoading = (state) => state.videos.isLoading;
export const selectVideosError = (state) => state.videos.error;

export const selectFavorites = (state) => state.favorites.items;
export const selectFavoritesLoading = (state) => state.favorites.isLoading;
