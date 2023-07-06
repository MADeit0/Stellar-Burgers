import { createSlice } from "@reduxjs/toolkit";
import { registerUserThunk, loginUserThunk} from "./authAction";

const initialState = {
  isAuthChecked: false,
  loading: null,
  errorForm: "",
  user: null,
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
  },
});

export const { setAuthChecked, setUser } = authSlice.actions;

export default authSlice.reducer;
