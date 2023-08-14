import { configureStore } from "@reduxjs/toolkit";

import burgerIngredientsReducer from "./burgerIngredients/burgerIngredientsSlice";
import modalReducer from "./modal/modalSlice";
import burgerConstructorReducer from "./burgerConstructor/burgerConstructorSlice";
import orderDetailsReducer from "./orderDetails/orderDetailsSlice";
import authReducer from "./auth/authSlice";
import { socketMiddleware } from "./ws/wsMiddleware";
import { wsOrdersActions, wsFeedsActions } from "./ws/wsSlice";

export const store = configureStore({
  reducer: {
    burgerIngredients: burgerIngredientsReducer,
    burgerConstructor: burgerConstructorReducer,
    orderDetails: orderDetailsReducer,
    modal: modalReducer,
    auth: authReducer,
    wsFeeds: wsFeedsActions.reducer,
    wsOrders: wsOrdersActions.reducer,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat([
      socketMiddleware(wsFeedsActions.actions, "wsFeeds"),
      socketMiddleware(wsOrdersActions.actions, "wsOrders"),
    ]);
  },
  devTools: true,
});

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch