import { Middleware, MiddlewareAPI } from "@reduxjs/toolkit";
import { wsUrl, token } from "../../utils/constants";
import { checkUserAuthThunk } from "../auth/authAction";
import { createWebSocketSlice } from "./wsSlice";
import { AppDispatch, RootState } from "../store";
import { WebSocketData } from "../../utils/types";

export const socketMiddleware = (reducer: string): Middleware => {
  const createWebSocketActions = createWebSocketSlice(reducer).actions;

  let socket: WebSocket | null = null;
  return (store: MiddlewareAPI<AppDispatch, RootState>) => (next) => (
    action
  ) => {
    if (createWebSocketActions.startConnecting.match(action)) {
      const url = action.payload;
      socket = new WebSocket(url);
      socket.onopen = () => {
        store.dispatch(createWebSocketActions.open());
      };
      socket.onmessage = (event) => {
        const { data } = event;
        const parsedData: WebSocketData = JSON.parse(data);
        store.dispatch(createWebSocketActions.message(parsedData));

        if (parsedData.message === "Invalid or missing token") {
          store
            .dispatch(checkUserAuthThunk())
            .unwrap()
            .then(() => {
              const accessToken = localStorage.getItem(token.ACCESS_TOKEN);

              if (accessToken) {
                store.dispatch(createWebSocketActions.disconnect());
                store.dispatch(
                  createWebSocketActions.startConnecting(
                    `${wsUrl}?token=${accessToken.replace("Bearer ", "")}`
                  )
                );
              }
            })
            .catch(() => {
              store.dispatch(createWebSocketActions.disconnect());
            });
        }
      };

      socket.onclose = () => {
        store.dispatch(createWebSocketActions.close());
      };

      socket.onerror = (event) => {
        store.dispatch(createWebSocketActions.error("Ошибка"));
      };

      if (createWebSocketActions.disconnect.match(action)) {
        socket.close();
        socket = null;
        store.dispatch(createWebSocketActions.disconnect());
      }
    }
    next(action);
  };
};
