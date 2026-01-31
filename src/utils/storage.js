export const storage = {
  getToken: () => localStorage.getItem("token") || null,

  getUser: () => {
    const user = localStorage.getItem("user");
    if (!user || user === "undefined") return null;
    try {
      return JSON.parse(user);
    } catch (e) {
      console.error("Ошибка парсинга пользователя из localStorage", e);
      return null;
    }
  },

  setAuth: (token, user) => {
    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(user));
  },

  clearAuth: () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  },
};
