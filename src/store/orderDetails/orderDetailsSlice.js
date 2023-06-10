import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  name: "",
  number: null,
  loading: null,
};

export const postConstructorData = createAsyncThunk(
  "orderDetails/postConstructorData",
  async (ingredientsId) => {
    try {
      const res = await fetch("https://norma.nomoreparties.space/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ingredients: ingredientsId.map((item) => item._id),
        }),
      });
      return await res.json();
    } catch (err) {
      console.error(err);
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
      })
      .addCase(postConstructorData.fulfilled, (state, actions) => {
        state.loading = "succeeded";
        state.name = actions.payload.name;
        state.number = actions.payload.order.number;
      })
      .addCase(postConstructorData.rejected, (state) => {
        state.loading = "failed";
      });
  },
});

export default orderDetailsSlice.reducer;
