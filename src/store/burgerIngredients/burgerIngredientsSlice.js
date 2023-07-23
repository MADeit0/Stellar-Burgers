import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { baseUrl } from "../../utils/constants";
import axios from "axios";

const initialState = {
  ingredients: null,
  ingredientsDict: null,
  loading: null,
  error: null,
};

export const fetchIngredientsDetails = createAsyncThunk(
  "burgerIngredients/fetchIngredientsDetails",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axios.get(`${baseUrl}/ingredients`);
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
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

        const ingredientsDict = state.ingredients.reduce((acc, item) => {
          acc[item._id] = item;

          return acc;
        }, {});
        state.ingredientsDict = ingredientsDict;
      })
      .addCase(fetchIngredientsDetails.rejected, (state, action) => {
        state.loading = "failed";
        state.error = action.payload;
      });
  },
});

export default burgerIngredientsSlice.reducer;
