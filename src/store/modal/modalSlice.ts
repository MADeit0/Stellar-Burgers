import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface modalState {
  orderModal: boolean;
}

const initialState: modalState = {
  orderModal: false,
};

export const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    isOpenedOrderModal(state, { payload }: PayloadAction<boolean>) {
      state.orderModal = payload;
    },
  },
});

export const { isOpenedOrderModal } = modalSlice.actions;

export default modalSlice.reducer;
