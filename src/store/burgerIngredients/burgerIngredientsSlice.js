import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  ingredients: [],
  loading: null,
};

export const fetchIngredientsDetails = createAsyncThunk(
  "burgerIngredients/fetchIngredientsDetails",
  async () => {
    try {
      const res = await fetch(
        "https://norma.nomoreparties.space/api/ingredients"
      );
      return await res.json();
    } catch (err) {
      console.error(err);
    }
  }
);

export const burgerIngredientsSlice = createSlice({
  name: "burgerIngredients",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(fetchIngredientsDetails.pending, (state) => {
        state.loading = "pending";
      })
      .addCase(fetchIngredientsDetails.fulfilled, (state, actions) => {
        state.loading = "succeeded";
        state.ingredients = actions.payload.data;
      })
      .addCase(fetchIngredientsDetails.rejected, (state) => {
        state.loading = "failed";
      });
  },
});

export default burgerIngredientsSlice.reducer;
