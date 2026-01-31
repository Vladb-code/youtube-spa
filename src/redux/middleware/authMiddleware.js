import { storage } from "../../utils/storage.js";

export const authMiddleware = (store) => (next) => (action) => {
  if (
    action.type === "auth/login/fulfilled" ||
    action.type === "auth/reg/fulfilled"
  ) {
    storage.setAuth(action.payload.token, action.payload.user);
  }

  if (action.type === "auth/logout") {
    storage.clearAuth();
  }

  return next(action);
};
