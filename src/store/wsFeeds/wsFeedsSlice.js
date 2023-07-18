import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isConnected: false,
  loading: "close",
  data: null,
  error: undefined,
};

export const wsFeedsSlice = createSlice({
  name: "wsFeeds",
  initialState,
  reducers: {
    startConnecting(state) {
      state.isConnected = true;
      state.loading = "connect";
    },
    open(state) {
      state.isConnected = true;
      state.loading = "open";
      state.error = undefined;
    },
    message(state, { payload }) {
      state.isConnected = true;
      state.loading = "open";
      state.data = payload;
      state.error = undefined;
    },
    sendMessage() {},
    close(state) {
      state.loading = "close";
      state.error = undefined;
    },
    error(state, { payload }) {
      state.loading = "close";
      state.error = payload;
    },
    disconnect(state) {
      state.isConnected = false;
      state.loading = "close";
      state.error = undefined;
    },
  },
});

export const wsFeedsActions = wsFeedsSlice.actions;

export default wsFeedsSlice.reducer;
