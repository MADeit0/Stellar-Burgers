import axios from "axios";
import { baseUrl, message, token } from "../constants";
import { store } from "../../store/store";
import { setUser } from "../../store/auth/authSlice";

export const authInstance = axios.create({
  baseURL: `${baseUrl}/auth`,
  headers: {
    "Content-Type": "application/json",
  },
});

export const orderInstance = authInstance.create({
  baseURL: `${baseUrl}/orders`,
  headers: {
    authorization: localStorage.getItem(token.ACCESS_TOKEN),
  },
});

export const interceptorsAuth = async (error) => {
  const originalRequest = error.config;
  const rejected = error.response.data;

  if (rejected.message === message.JWT_EXPIRED) {
    try {
      const refreshData = await authInstance.post("/token", {
        token: localStorage.getItem(token.REFRESH_TOKEN),
      });
      localStorage.setItem(token.ACCESS_TOKEN, refreshData.data.accessToken);
      localStorage.setItem(token.REFRESH_TOKEN, refreshData.data.refreshToken);

      originalRequest.headers.Authorization = localStorage.getItem(
        token.ACCESS_TOKEN
      );
      return await axios(originalRequest);
    } catch (error) {
      Promise.reject(error);
    }
  }
  if (rejected.message === message.INVALID_TOKEN) {
    localStorage.removeItem(token.ACCESS_TOKEN);
    localStorage.removeItem(token.REFRESH_TOKEN);
    store.dispatch(setUser(null));
    throw new Error(console.error("invalid user data"));
  }
};
