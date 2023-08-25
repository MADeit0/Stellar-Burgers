import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { WebSocketData } from "../../utils/types";


export interface CreateWebSocketState {
  isConnected: boolean;
  wsLoading: "connect" | "open" | "close";
  data: WebSocketData | null;
  error: string;
}

const initialState: CreateWebSocketState = {
  isConnected: false,
  wsLoading: "close",
  data: null,
  error: "",
};


export const createWebSocketSlice = (name: string) => {
  const slice = createSlice({
    name,
    initialState,
    reducers: {
      startConnecting(state, { payload }: PayloadAction<string>) {
        state.isConnected = true;
        state.wsLoading = "connect";
      },
      open(state) {
        state.isConnected = true;
        state.error = "";
        state.wsLoading = "open";
      },
      message(state, { payload }: PayloadAction<WebSocketData>) {
        state.isConnected = true;
        state.data = payload;
        state.error = "";
        state.wsLoading = "open";
      },
      close(state) {
        state.error = "";
        state.wsLoading = "close";
      },
      error(state, { payload }: PayloadAction<string>) {
        state.error = payload;
        state.wsLoading = "close";
      },
      disconnect(state) {
        state.isConnected = false;
        state.error = "";
        state.wsLoading = "close";
        state.data = null;
      },
    },
  });
  return slice;
};

export const wsFeedsSlice = createWebSocketSlice("wsFeeds");
export const wsOrdersSlice = createWebSocketSlice("wsOrders");
