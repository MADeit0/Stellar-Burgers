import { authInstance } from "../../utils/api/axiosClient";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { setAuthChecked, setUser } from "./authSlice";
import { message, token } from "../../utils/constants";

export const registerUserThunk = createAsyncThunk(
  "user/registerUserThunk",
  async (dataUser, { rejectWithValue }) => {
    try {
      const res = await authInstance.post("/register", dataUser);
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const loginUserThunk = createAsyncThunk(
  "user/loginUserThunk",
  async (dataUser, { rejectWithValue }) => {
    try {
      const res = await authInstance.post("/login", dataUser);
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const logoutThunk = createAsyncThunk(
  "user/logoutThunk",
  async (_, { rejectWithValue }) => {
    try {
      const res = await authInstance.post("/logout", {
        token: localStorage.getItem(token.REFRESH_TOKEN),
      });
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const updateDataUserThunk = createAsyncThunk(
  "user/updateDataUserThunk",
  async (dataUser, { rejectWithValue }) => {
    try {
      const res = await authInstance.patch("/user", dataUser, {
        headers: {
          authorization: localStorage.getItem(token.ACCESS_TOKEN),
        },
      });
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

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
      dispatch(setUser({}));
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
        return await authInstance(originalRequest);
      } catch (error) {
        Promise.reject(error);
      }
    }
  }
);
