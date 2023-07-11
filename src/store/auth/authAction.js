import { authInstance, updateTokenInstance } from "../../utils/api/axiosClient";
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
          authorization: localStorage.getItem("accessToken"),
        },
      });
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

const getUser = async () => {
  try {
    const res = await updateTokenInstance.get("/user", {
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
    const res = await authInstance.post("/token", {
      token: localStorage.getItem(token.REFRESH_TOKEN),
    });
    localStorage.setItem(token.ACCESS_TOKEN, res.data.accessToken);
    localStorage.setItem(token.REFRESH_TOKEN, res.data.refreshToken);

    if (res.status === 200) {
      const uploadUser = await authInstance.get("/user", {
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
        dispatch(setUser(user.data.user));
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

updateTokenInstance.interceptors.response.use(
  (res) => res,
  async (error) => {
    const rejected = error.response.data;
    if (rejected.message === message.JWT_EXPIRED) {
      const refreshData = await refreshToken();
      return refreshData;
    }
    return Promise.reject(error);
  }
);
