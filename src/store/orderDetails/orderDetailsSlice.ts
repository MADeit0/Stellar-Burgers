import { createSlice } from "@reduxjs/toolkit";
import { Loading } from "../../utils/types";
import { postConstructorData } from "./orderDetailsAction";

interface OrderDetailsState {
  name: string;
  number: number | null;
  loading: Loading;
  error: string;
}

const initialState: OrderDetailsState = {
  name: "",
  number: null,
  loading: "idle",
  error: "",
};

export const orderDetailsSlice = createSlice({
  name: "orderDetails",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(postConstructorData.pending, (state) => {
        state.loading = "pending";
        state.error = "";
        state.name = "";
        state.number = null;
      })
      .addCase(postConstructorData.fulfilled, (state, {payload}) => {
        state.loading = "succeeded";
        state.name = payload.name;
        state.number = payload.order.number;
      })
      .addCase(postConstructorData.rejected, (state, { payload }) => {
        state.loading = "failed";
        state.error = payload!;
        state.name = "";
        state.number = null;
      });
  },
});

export default orderDetailsSlice.reducer;
