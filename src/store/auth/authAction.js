import { authInstance } from "../../utils/api/axiosClient";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { token } from "../../utils/constants";

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
