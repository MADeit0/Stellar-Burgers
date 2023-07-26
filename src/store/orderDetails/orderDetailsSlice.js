import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { baseUrl } from "../../utils/constants";
import axios from "axios";

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
      const res = await axios.post(
        `${baseUrl}/orders`,
        {
          ingredients: ingredientsId.map((item) => item._id),
        },
        {
          headers: {
            authorization: localStorage.getItem("accessToken"),
          },
        }
      );
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
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
