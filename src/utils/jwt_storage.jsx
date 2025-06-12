export const jwtStorage = {
  getToken: () => localStorage.getItem("jwt_token"),
  setToken: (token) => localStorage.setItem("jwt_token", token),
  clearToken: () => localStorage.removeItem("jwt_token"),
};
