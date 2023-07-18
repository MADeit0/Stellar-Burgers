import { configureStore } from "@reduxjs/toolkit";

import burgerIngredientsReducer from "./burgerIngredients/burgerIngredientsSlice";
import modalReducer from "./modal/modalSlice";
import burgerConstructorReducer from "./burgerConstructor/burgerConstructorSlice";
import orderDetailsReducer from "./orderDetails/orderDetailsSlice";
import authReducer from "./auth/authSlice";
import wsFeedsReducer from "./wsFeeds/wsFeedsSlice";
import { feedsSocketMiddleware } from "./wsFeeds/wsFeedsMiddleware";


export const store = configureStore({
  reducer: {
    burgerIngredients: burgerIngredientsReducer,
    burgerConstructor: burgerConstructorReducer,
    orderDetails: orderDetailsReducer,
    modal: modalReducer,
    auth: authReducer,
    wsFeeds: wsFeedsReducer,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat([feedsSocketMiddleware])
  },
  devTools: true,
});
