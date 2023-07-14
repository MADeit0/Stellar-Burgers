import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  orderModal: false,
};

export const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    isOpenedOrderModal(state, { payload }) {
      state.orderModal = payload;
    },
  },
});

export const { isOpenedOrderModal } = modalSlice.actions;

export default modalSlice.reducer;
