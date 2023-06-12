import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { baseUrl } from "../../utils/constants";

const initialState = {
  name: "",
  number: null,
  loading: null,
  error: null,
};

export const postConstructorData = createAsyncThunk(
  "orderDetails/postConstructorData",
  async (ingredientsId, { rejectWithValue }) => {
    try {
      const res = await fetch(`${baseUrl}/orders`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ingredients: ingredientsId.map((item) => item._id),
        }),
      });
      if (!res.ok) {
        throw new Error("Sending data failed!");
      }
      return await res.json();
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

export const orderDetailsSlice = createSlice({
  name: "orderDetails",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(postConstructorData.pending, (state) => {
        state.loading = "pending";
        state.error = null;
      })
      .addCase(postConstructorData.fulfilled, (state, action) => {
        state.loading = "succeeded";
        state.name = action.payload.name;
        state.number = action.payload.order.number;
      })
      .addCase(postConstructorData.rejected, (state, action) => {
        state.loading = "failed";
        state.error = action.payload;
      });
  },
});

export default orderDetailsSlice.reducer;
