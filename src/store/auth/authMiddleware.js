import { authInstance } from "../../utils/api/axiosClient";
import { setAuthChecked, setUser } from "./authSlice";
import { message, token } from "../../utils/constants";
import { store } from "../store";
import axios from "axios";


export const checkUserAuth = () => async (dispatch) => {
  if (localStorage.getItem(token.ACCESS_TOKEN)) {
    try {
      const res = await authInstance.get("/user", {
        headers: {
          authorization: localStorage.getItem(token.ACCESS_TOKEN),
        },
      });
      dispatch(setUser(res.data.user));
      return res;
    } catch (error) {
      localStorage.removeItem(token.ACCESS_TOKEN);
      localStorage.removeItem(token.REFRESH_TOKEN);
      dispatch(setUser(null));
    } finally {
      dispatch(setAuthChecked(true));
    }
  } else {
    dispatch(setAuthChecked(true));
  }
};

authInstance.interceptors.response.use(
  (res) => res,
  async (error) => {
    const originalRequest = error.config;
    const rejected = error.response.data;

    if (rejected.message === message.JWT_EXPIRED) {
      try {
        const refreshData = await authInstance.post("/token", {
          token: localStorage.getItem(token.REFRESH_TOKEN),
        });
        localStorage.setItem(token.ACCESS_TOKEN, refreshData.data.accessToken);
        localStorage.setItem(
          token.REFRESH_TOKEN,
          refreshData.data.refreshToken
        );

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
  }
);
