import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { baseUrl } from "../../utils/constants";

const initialState = {
  ingredients: [],
  loading: null,
  error: null,
};

export const fetchIngredientsDetails = createAsyncThunk(
  "burgerIngredients/fetchIngredientsDetails",
  async (_, { rejectWithValue }) => {
    try {
      const res = await fetch(`${baseUrl}/ingredients`);
      if (!res.ok) {
        throw new Error("Server Error!");
      }
      return await res.json();
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

export const burgerIngredientsSlice = createSlice({
  name: "burgerIngredients",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchIngredientsDetails.pending, (state) => {
        state.loading = "pending";
        state.error = null;
      })
      .addCase(fetchIngredientsDetails.fulfilled, (state, action) => {
        state.loading = "succeeded";
        state.ingredients = action.payload.data;
      })
      .addCase(fetchIngredientsDetails.rejected, (state, action) => {
        state.loading = "failed";
        state.error = action.payload;
      });
  },
});

export default burgerIngredientsSlice.reducer;
