import { createSlice } from "@reduxjs/toolkit";
import {
  registerUserThunk,
  loginUserThunk,
  logoutThunk,
  updateDataUserThunk,
} from "./authAction";
import { token } from "../../utils/constants";

const initialState = {
  isAuthChecked: false,
  user: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuthChecked: (state, { payload }) => {
      state.isAuthChecked = payload;
    },
    setUser: (state, { payload }) => {
      state.user = payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUserThunk.fulfilled, (state, { payload }) => {
        state.user = payload.user;
        localStorage.setItem(token.ACCESS_TOKEN, payload.accessToken);
        localStorage.setItem(token.REFRESH_TOKEN, payload.refreshToken);
      })
      .addCase(loginUserThunk.fulfilled, (state, { payload }) => {
        state.user = payload.user;
        localStorage.setItem(token.ACCESS_TOKEN, payload.accessToken);
        localStorage.setItem(token.REFRESH_TOKEN, payload.refreshToken);
      })
      .addCase(logoutThunk.fulfilled, (state) => {
        state.user = null;
        localStorage.removeItem(token.ACCESS_TOKEN);
        localStorage.removeItem(token.REFRESH_TOKEN);
      })
      .addCase(updateDataUserThunk.fulfilled, (state, { payload }) => {
        state.user = payload.user;
      })
  },
});

export const { setAuthChecked, setUser, togglePasswordRoute } =
  authSlice.actions;

export default authSlice.reducer;
