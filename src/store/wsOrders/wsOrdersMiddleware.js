import { token, wsUrl } from "../../utils/constants";
import { wsOrdersActions } from "./wsOrdersSlice";

export const ordersSocketMiddleware = (store) => {
  let socket = null;
  return (next) => (action) => {
    const isConnectionEstablished =
      socket && store.getState().wsOrders.isConnected;

    if (wsOrdersActions.startConnecting.match(action)) {
      const accessToken = localStorage
        .getItem(token.ACCESS_TOKEN)
        .replace("Bearer ", "");
      
      socket = new WebSocket(`${wsUrl}?token=${accessToken}`);
      socket.onopen = () => {
        store.dispatch(wsOrdersActions.open());
      };

      socket.onmessage = (event) => {
        const { data } = event;
        const parsedData = JSON.parse(data);
        store.dispatch(wsOrdersActions.message(parsedData));
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
