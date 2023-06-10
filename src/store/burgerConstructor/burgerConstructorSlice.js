import { createSlice, nanoid } from "@reduxjs/toolkit";
import { postConstructorData } from "../orderDetails/orderDetailsSlice";

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

export const { addIngredient, addBun, deleteIngredient } =
  burgerConstructorSlice.actions;

export default burgerConstructorSlice.reducer;
