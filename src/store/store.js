import { configureStore } from "@reduxjs/toolkit";

import burgerIngredientsReducer from "./burgerIngredients/burgerIngredientsSlice";
import modalReducer from "./modal/modalSlice";
import burgerConstructorReducer from "./burgerConstructor/burgerConstructorSlice";
import orderDetailsReducer from "./orderDetails/orderDetailsSlice";
import authReducer from "./auth/authSlice";

export const store = configureStore({
  reducer: {
    burgerIngredients: burgerIngredientsReducer,
    burgerConstructor: burgerConstructorReducer,
    orderDetails: orderDetailsReducer,
    modal: modalReducer,
    auth: authReducer,
  },
  devTools: true,
});
