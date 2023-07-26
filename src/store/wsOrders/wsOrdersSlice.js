import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isConnected: false,
  loading: "close",
  data: null,
  error: undefined,
};

export const wsOrdersSlice = createSlice({
  name: "wsOrders",
  initialState,
  reducers: {
    startConnecting(state) {
      state.isConnected = true;
      state.loading = "connect";
    },
    open(state) {
      state.isConnected = true;
      state.error = undefined;
      state.loading = "open";
    },
    message(state, { payload }) {
      state.isConnected = true;
      state.data = payload;
      state.error = undefined;
      state.loading = "open";
    },
    sendMessage() {},
    close(state) {
      state.error = undefined;
      state.loading = "close";
    },
    error(state, { payload }) {
      state.error = payload;
      state.loading = "close";
    },
    disconnect(state) {
      state.isConnected = false;
      state.error = undefined;
      state.loading = "close";
    },
  },
});

export const wsOrdersActions = wsOrdersSlice.actions;

export default wsOrdersSlice.reducer;
