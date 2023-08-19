import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { baseUrl } from "../../utils/constants";
import axios, { AxiosError } from "axios";
import { Loading, ErrorResponseConfig, Tingredient } from "../../utils/types";



interface BurgerIngredientsStore {
  ingredientsDict: { [key: string]: Tingredient } | null;
  loading: Loading;
  error: string;
}

const initialState: BurgerIngredientsStore = {
  ingredientsDict: null,
  loading: "idle",
  error: "",
};

export const burgerIngredientsSlice = createSlice({
  name: "burgerIngredients",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchIngredientsDetails.pending, (state) => {
        state.loading = "pending";
        state.error = "";
      })
      .addCase(fetchIngredientsDetails.fulfilled, (state, { payload }) => {
        state.loading = "succeeded";
 
        const ingredientsDict = payload.data.reduce((acc: { [key: string]: Tingredient }, item) => {
          acc[item._id] = item;

          return acc;
        }, {});
        state.ingredientsDict = ingredientsDict;
      })
      .addCase(fetchIngredientsDetails.rejected, (state, { payload }) => {
        state.loading = "failed";
        state.error = payload!;
      });
  },
});

export default burgerIngredientsSlice.reducer;

export const fetchIngredientsDetails = createAsyncThunk<
  { data: Tingredient[] },
  undefined,
  { rejectValue: string }
>(
  "burgerIngredients/fetchIngredientsDetails",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axios.get(`${baseUrl}/ingredients`);
      return res.data;
    } catch (error) {
      const axiosError = error as AxiosError<ErrorResponseConfig>;
      if (axiosError.response) {
        return rejectWithValue(axiosError.response.data.message);
      } else {
        return rejectWithValue("An error occurred");
      }
    }
  }
);

