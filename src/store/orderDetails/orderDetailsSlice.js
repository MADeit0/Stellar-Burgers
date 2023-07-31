import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { interceptorsAuth, orderInstance } from "../../utils/api/axiosClient";

const initialState = {
  name: null,
  number: null,
  loading: null,
  error: null,
};

export const postConstructorData = createAsyncThunk(
  "orderDetails/postConstructorData",
  async (ingredientsId, { rejectWithValue }) => {
    try {
      const res = await orderInstance.post("", {
        ingredients: ingredientsId.map((item) => item._id),
      });
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

orderInstance.interceptors.response.use((res) => res, interceptorsAuth);

export const orderDetailsSlice = createSlice({
  name: "orderDetails",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(postConstructorData.pending, (state) => {
        state.loading = "pending";
        state.error = null;
        state.name = null;
        state.number = null;
      })
      .addCase(postConstructorData.fulfilled, (state, action) => {
        state.loading = "succeeded";
        state.name = action.payload.name;
        state.number = action.payload.order.number;
      })
      .addCase(postConstructorData.rejected, (state, action) => {
        state.loading = "failed";
        state.error = action.payload;
        state.name = null;
        state.number = null;
      });
  },
});

export default orderDetailsSlice.reducer;
