import { PayloadAction, createSlice, nanoid } from "@reduxjs/toolkit";
import { postConstructorData } from "../orderDetails/orderDetailsAction";
import update from "immutability-helper";
import { Tingredient } from "../../utils/types";

type Drag = {
  dragIndex: number;
  hoverIndex: number;
};

interface burgerConstructorState {
  bunUp: Tingredient | null;
  otherStuffings: Tingredient[];
  bunDown: Tingredient | null;
  isBun: boolean;
}

const initialState: burgerConstructorState = {
  bunUp: null,
  otherStuffings: [],
  bunDown: null,
  isBun: false,
};

export const burgerConstructorSlice = createSlice({
  name: "burgerConstructor",
  initialState,
  reducers: {
    addIngredient(state, { payload }: PayloadAction<Tingredient>) {
      if (state.isBun) {
        const fakeId = nanoid();
        state.otherStuffings.push({ ...payload, fakeId });
      }
    },
    addBun(state, { payload }: PayloadAction<Tingredient>) {
      state.bunUp = { ...payload };
      state.bunDown = { ...payload };
      state.isBun = true;
    },
    deleteIngredient(
      state,
      { payload }: PayloadAction<Pick<Tingredient, "fakeId">>
    ) {
      state.otherStuffings = state.otherStuffings.filter(
        (item) => item.fakeId !== payload.fakeId
      );
    },
    moveCard(state, { payload }: PayloadAction<Drag>) {
      const { dragIndex, hoverIndex } = payload;
      const Stuffings = state.otherStuffings;

      const sortedIngredients = update(Stuffings, {
        $splice: [
          [dragIndex, 1],
          [hoverIndex, 0, Stuffings[dragIndex]],
        ],
      });
      state.otherStuffings = sortedIngredients;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(postConstructorData.fulfilled, (state) => {
      state.bunUp = null;
      state.otherStuffings = [];
      state.bunDown = null;
      state.isBun = false;
    });
  },
});

export const {
  addIngredient,
  addBun,
  deleteIngredient,
  moveCard,
} = burgerConstructorSlice.actions;

export default burgerConstructorSlice.reducer;
