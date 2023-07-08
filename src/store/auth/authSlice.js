import { createSlice } from "@reduxjs/toolkit";
import {
  registerUserThunk,
  loginUserThunk,
  logoutThunk,
} from "./authAction";

const initialState = {
  isAuthChecked: false,
  loading: null,
  errorForm: "",
  user: null,
  isForgotPassword: false,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuthChecked: (state, action) => {
      state.isAuthChecked = action.payload;
    },
    setUser: (state, action) => {
      state.user = action.payload;
    },
    forgotPasswordPending: (state) => {
      state.errorForm = null;
    },
    forgotPasswordSuccess: (state, { payload }) => {
      state.isForgotPassword = payload.success;
    },
    forgotPasswordRejected: (state, action) => {
      state.errorForm = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUserThunk.pending, (state) => {
        state.errorForm = null;
      })
      .addCase(registerUserThunk.fulfilled, (state, { payload }) => {
        state.user = payload.user;
        localStorage.setItem("accessToken", payload.accessToken);
        localStorage.setItem("refreshToken", payload.refreshToken);
      })
      .addCase(registerUserThunk.rejected, (state, action) => {
        state.errorForm = action.payload;
      })
      .addCase(loginUserThunk.pending, (state) => {
        state.errorForm = null;
      })
      .addCase(loginUserThunk.fulfilled, (state, { payload }) => {
        state.user = payload.user;
        localStorage.setItem("accessToken", payload.accessToken);
        localStorage.setItem("refreshToken", payload.refreshToken);
      })
      .addCase(loginUserThunk.rejected, (state, action) => {
        state.errorForm = action.payload;
      })
      .addCase(logoutThunk.fulfilled, (state) => {
        state.user = null;
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
      });
  },
});

export const { setAuthChecked, setUser, forgotPasswordPending,forgotPasswordSuccess,forgotPasswordRejected } = authSlice.actions;

export default authSlice.reducer;
