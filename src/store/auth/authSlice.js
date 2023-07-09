import { createSlice } from "@reduxjs/toolkit";
import { registerUserThunk, loginUserThunk, logoutThunk } from "./authAction";

const initialState = {
  isAuthChecked: false,
  loading: null,
  errorForm: "",
  user: null,
  isForgotPassword: false,
  formMessage: null,
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
    forgotPasswordPending: (state) => {
      state.errorForm = null;
    },
    forgotPasswordSuccess: (state, { payload }) => {
      state.isForgotPassword = payload.success;
    },
    forgotPasswordRejected: (state, { payload }) => {
      state.errorForm = payload;
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
      .addCase(registerUserThunk.rejected, (state, { payload }) => {
        state.errorForm = payload;
      })
      .addCase(loginUserThunk.pending, (state) => {
        state.errorForm = null;
      })
      .addCase(loginUserThunk.fulfilled, (state, { payload }) => {
        state.user = payload.user;
        localStorage.setItem("accessToken", payload.accessToken);
        localStorage.setItem("refreshToken", payload.refreshToken);
      })
      .addCase(loginUserThunk.rejected, (state, { payload }) => {
        state.errorForm = payload;
      })
      .addCase(logoutThunk.fulfilled, (state) => {
        state.user = null;
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
      });
  },
});

export const {
  setAuthChecked,
  setUser,
  togglePasswordRoute,
  forgotPasswordPending,
  forgotPasswordSuccess,
  forgotPasswordRejected,
} = authSlice.actions;

export default authSlice.reducer;
