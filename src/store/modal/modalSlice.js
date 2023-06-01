import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  orderModal: false,
  ingredientDetailsModal: false,
};

export const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    openOrderModal(state) {
      state.orderModal = true;
    },
    closeOrderModal(state) {
      state.orderModal = false;
    },
    openIngredientDetailsModal(state) {
      state.ingredientDetailsModal = true;
    },
    closeIngredientDetailsModal(state) {
      state.ingredientDetailsModal = false;
    },
  },
});

export const {
  openOrderModal,
  closeOrderModal,
  openIngredientDetailsModal,
  closeIngredientDetailsModal,
} = modalSlice.actions;

export default modalSlice.reducer;
