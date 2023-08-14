import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import {
  registerUserThunk,
  loginUserThunk,
  logoutThunk,
  updateDataUserThunk,
  checkUserAuthThunk,
} from "./authAction";
import { token } from "../../utils/constants";
import { User } from "../../utils/types";

interface AuthState {
  isAuthChecked: boolean;
  user: User | null;
}

const initialState: AuthState = {
  isAuthChecked: false,
  user: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuthChecked: (state, { payload }: PayloadAction<boolean>) => {
      state.isAuthChecked = payload;
    },
    setUser: (state, { payload }: PayloadAction<User | null>) => {
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
      .addCase(
        updateDataUserThunk.fulfilled,
        (state, { payload }) => {
          state.user = payload.user;
        }
      )
      .addCase(checkUserAuthThunk.rejected, (state) => {
        state.user = null;
        state.isAuthChecked = true;
      })
      .addCase(
        checkUserAuthThunk.fulfilled,
        (state, { payload }) => {
          state.user = payload.user;
          state.isAuthChecked = true;
        }
      );
  },
});

export const { setAuthChecked, setUser } = authSlice.actions;

export default authSlice.reducer;
