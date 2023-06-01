import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  details: [],
};



export const burgerConstructorSlice = createSlice({
  name: "burgerConstructor",
  initialState,
  reducers: {},
});

export const { q } = burgerConstructorSlice.actions;

export default burgerConstructorSlice.reducer;