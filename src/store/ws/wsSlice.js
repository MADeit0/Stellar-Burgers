import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isConnected: false,
  loading: "close",
  data: null,
  error: undefined,
};

const createWebSocketSlice = (name) => {
  const slice = createSlice({
    name,
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
        state.data = null;
      },
    },
  });
  return slice;
};

export const wsFeedsActions = createWebSocketSlice("wsFeeds");
export const wsOrdersActions = createWebSocketSlice("wsOrders");
