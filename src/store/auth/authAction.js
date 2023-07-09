import { authFetch, updateTokenFetch } from "../../utils/api/axiosClient";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { setAuthChecked, setUser } from "./authSlice";
import { message, token } from "../../utils/constants";

export const registerUserThunk = createAsyncThunk(
  "user/registerUserThunk",
  async (dataUser, { rejectWithValue }) => {
    try {
      const res = await authFetch.post("/register", dataUser);
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
      const res = await authFetch.post("/login", dataUser);
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
      const res = await authFetch.post("/logout", {
        token: localStorage.getItem(token.REFRESH_TOKEN),
      });
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

const getUser = async () => {
  try {
    const res = await updateTokenFetch.get("/user", {
      headers: {
        authorization: localStorage.getItem("accessToken"),
      },
    });
    return res;
  } catch (error) {
    return Promise.reject(error);
  }
};

const refreshToken = async () => {
  try {
    const res = await authFetch.post("/token", {
      token: localStorage.getItem(token.REFRESH_TOKEN),
    });
    localStorage.setItem(token.ACCESS_TOKEN, res.data.accessToken);
    localStorage.setItem(token.REFRESH_TOKEN, res.data.refreshToken);

    if (res.status === 200) {
      const uploadUser = await authFetch.get("/user", {
        headers: {
          authorization: localStorage.getItem(token.ACCESS_TOKEN),
        },
      });
      return uploadUser;
    }

    return res;
  } catch (error) {
    return Promise.reject(error);
  }
};

export const checkUserAuth = () => (dispatch) => {
  if (localStorage.getItem(token.ACCESS_TOKEN)) {
    getUser()
      .then((user) => {
        dispatch(setUser(user.data));
      })
      .catch(() => {
        localStorage.removeItem(token.ACCESS_TOKEN);
        localStorage.removeItem(token.REFRESH_TOKEN);
        dispatch(setUser({}));
      })
      .finally(() => dispatch(setAuthChecked(true)));
  } else {
    dispatch(setAuthChecked(true));
  }
};

updateTokenFetch.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const rejected = error.response.data;
    if (rejected.message === message.JWT_EXPIRED) {
      const refreshData = await refreshToken();
      return refreshData;
    }
    return Promise.reject(error);
  }
);
