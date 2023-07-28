import { token, wsUrl } from "../../utils/constants";
import { checkUserAuth } from "../auth/authMiddleware";
import { wsOrdersActions } from "./wsOrdersSlice";

export const ordersSocketMiddleware = (store) => {
  let socket = null;
  return (next) => (action) => {
    const isConnectionEstablished =
      socket && store.getState().wsOrders.isConnected;

    const openSocket = () => {
      const accessToken = localStorage
        .getItem(token.ACCESS_TOKEN)
        .replace("Bearer ", "");

      socket = new WebSocket(`${wsUrl}?token=${accessToken}`);
      socket.onopen = () => {
        store.dispatch(wsOrdersActions.open());
      };
    };

    if (wsOrdersActions.startConnecting.match(action)) {
      
      openSocket();

      socket.onmessage = (event) => {
        const { data } = event;
        const parsedData = JSON.parse(data);
        store.dispatch(wsOrdersActions.message(parsedData));

        if (parsedData.message === "Invalid or missing token") {
          store.dispatch(checkUserAuth()).then((res) => {
            store.dispatch(wsOrdersActions.disconnect())
            store.dispatch(wsOrdersActions.startConnecting())
          });
        }
      };

      socket.onclose = () => {
        store.dispatch(wsOrdersActions.close());
      };

      socket.onerror = (event) => {
        store.dispatch(wsOrdersActions.error(event));
      };

      if (
        wsOrdersActions.sendMessage.match(action) &&
        isConnectionEstablished
      ) {
        socket.send(JSON.stringify(action.payload));
      }

      if (wsOrdersActions.disconnect.match(action)) {
        socket.close();
        socket = null;
        store.dispatch(wsOrdersActions.disconnect());
      }
    }
    next(action);
  };
};
