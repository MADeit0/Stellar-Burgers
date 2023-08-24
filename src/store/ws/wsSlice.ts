import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { StatusWs } from "../../utils/types";

export type Orders = {
  _id: string;
  ingredients: string[];
  status: StatusWs;
  name: string;
  createdAt: string;
  updatedAt: string;
  number: number;
};

export type FeedsWs = {
  orders: Orders[];
  success: boolean;
  total: number;
  totalToday: number;
};

export type WebSocketData = FeedsWs & { message: string;}

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
