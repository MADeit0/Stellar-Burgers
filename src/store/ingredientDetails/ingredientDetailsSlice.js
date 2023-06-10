import { createSlice } from "@reduxjs/toolkit";

import { closeIngredientDetailsModal } from "../modal/modalSlice";

const initialState = {
  details: [],
};

export const ingredientDetailsSlice = createSlice({
  name: "ingredientDetails",
  initialState,
  reducers: {
    getDetailsIngredient(state, actions) {
      state.details = actions.payload;
    },
    clearDetailsIngredient(state) {
      state.details = [];
    },
  },
  extraReducers: (builder) => {
    builder.addCase(closeIngredientDetailsModal, (state) => {
      state.details = [];
    });
  },
});

export const { getDetailsIngredient, clearDetailsIngredient } =
  ingredientDetailsSlice.actions;

export default ingredientDetailsSlice.reducer;
