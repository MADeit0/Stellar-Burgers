import { configureStore } from "@reduxjs/toolkit";

import burgerIngredientsReducer from "./burgerIngredients/burgerIngredientsSlice";
import modalReducer from "./modal/modalSlice";
import ingredientDetailsReducer from "./ingredientDetails/ingredientDetailsSlice";
import burgerConstructorReducer from "./burgerConstructor/burgerConstructorSlice";
import orderDetailsReducer from "./orderDetails/orderDetailsSlice";

export const store = configureStore({
  reducer: {
    burgerIngredients: burgerIngredientsReducer,
    ingredientDetails: ingredientDetailsReducer,
    burgerConstructor: burgerConstructorReducer,
    orderDetails: orderDetailsReducer,
    modal: modalReducer,
  },
  devTools: true,
});
