import { configureStore } from "@reduxjs/toolkit";

import burgerIngredientsReducer from "./burgerIngredients/burgerIngredientsSlice";
import modalReducer from "./modal/modalSlice";
import burgerConstructorReducer from "./burgerConstructor/burgerConstructorSlice";
import orderDetailsReducer from "./orderDetails/orderDetailsSlice";
import authReducer from "./auth/authSlice";
import wsFeedsReducer from "./wsFeeds/wsFeedsSlice";
import { feedsSocketMiddleware } from "./wsFeeds/wsFeedsMiddleware";
import { ordersSocketMiddleware } from "./wsOrders/wsOrdersMiddleware";
import wsOrdersReducer from "./wsOrders/wsOrdersSlice";


export const store = configureStore({
  reducer: {
    burgerIngredients: burgerIngredientsReducer,
    burgerConstructor: burgerConstructorReducer,
    orderDetails: orderDetailsReducer,
    modal: modalReducer,
    auth: authReducer,
    wsFeeds: wsFeedsReducer,
    wsOrders: wsOrdersReducer,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat([feedsSocketMiddleware, ordersSocketMiddleware])
  },
  devTools: true,
});
