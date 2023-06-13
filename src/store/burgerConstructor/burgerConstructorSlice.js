import { createSlice, nanoid } from "@reduxjs/toolkit";
import { postConstructorData } from "../orderDetails/orderDetailsSlice";
import update from "immutability-helper";

const initialState = {
  bunUp: [],
  otherStuffings: [],
  bunDown: [],
  isBun: false,
};

export const burgerConstructorSlice = createSlice({
  name: "burgerConstructor",
  initialState,
  reducers: {
    addIngredient(state, action) {
      if (state.isBun) {
        const fakeId = nanoid();
        state.otherStuffings.push({ ...action.payload, fakeId });
      }
    },
    addBun(state, action) {
      state.bunUp = { ...action.payload };
      state.bunDown = { ...action.payload };
      state.isBun = true;
    },
    deleteIngredient(state, action) {
      state.otherStuffings = state.otherStuffings.filter(
        (item) => item.fakeId !== action.payload
      );
    },
    moveCard(state, action) {
      const { dragIndex, hoverIndex } = action.payload;
      const Stuffings = state.otherStuffings;

      const sortedIngredients = update(
        Stuffings,
        {
          $splice: [
            [dragIndex, 1],
            [hoverIndex, 0, Stuffings[dragIndex]],
          ],
        },
        [Stuffings]
      );
      state.otherStuffings = sortedIngredients;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(postConstructorData.fulfilled, (state) => {
      state.bunUp = [];
      state.otherStuffings = [];
      state.bunDown = [];
      state.isBun = false;
    });
  },
});

export const { addIngredient, addBun, deleteIngredient, moveCard } =
  burgerConstructorSlice.actions;

export default burgerConstructorSlice.reducer;
