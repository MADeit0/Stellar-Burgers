import { createAsyncThunk } from "@reduxjs/toolkit";
import { interceptorsAuth, orderInstance } from "../../utils/api/axiosClient";
import { token } from "../../utils/constants";
import { AxiosError } from "axios";
import { ErrorResponseConfig, Tingredient } from "../../utils/types";

type Owner = {
  name: string;
  email: string;
  createdAt: string;
  updatedAt: string;
};

type OrderData = {
  ingredients: Tingredient[];
  _id: string;
  owner: Owner;
  status: string;
  createdAt: string;
  updatedAt: string;
  number: number;
  price: number;
};

interface OrderResponseConfig {
  success: boolean;
  name: string;
  order: OrderData;
}

export const postConstructorData = createAsyncThunk<
  OrderResponseConfig,
  (Tingredient | null)[],
  { rejectValue: string }
>(
  "orderDetails/postConstructorData",
  async (ingredientsId, { rejectWithValue }) => {
    try {
      const getIdsFromIngredients = ingredientsId.map((item) =>
        item ? item._id : null
      );

      const res = await orderInstance.post(
        "",
        {
          ingredients: getIdsFromIngredients,
        },
        {
          headers: {
            authorization: localStorage.getItem(token.ACCESS_TOKEN),
          },
        }
      );
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

orderInstance.interceptors.response.use((res) => res, interceptorsAuth);
