import { wsUrl, token } from "../../utils/constants";
import { checkUserAuth } from "../auth/authMiddleware";

export const socketMiddleware = (actions, reducer) => {
  let socket = null;
  return (store) => (next) => (action) => {
    const isConnectionEstablished =
      socket && store.getState()[reducer].isConnected;

    if (actions.startConnecting.match(action)) {
      const url = action.payload;
      socket = new WebSocket(url);

      socket.onopen = () => {
        store.dispatch(actions.open());
      };

      socket.onmessage = (event) => {
        const { data } = event;
        const parsedData = JSON.parse(data);
        store.dispatch(actions.message(parsedData));

        if (parsedData.message === "Invalid or missing token") {
          store.dispatch(checkUserAuth()).then((res) => {

            const accessToken = localStorage
            .getItem(token.ACCESS_TOKEN)
            .replace("Bearer ", "");

            store.dispatch(actions.disconnect());
            store.dispatch(actions.startConnecting(`${wsUrl}?token=${accessToken}`));
          });
        }
      };

      socket.onclose = () => {
        store.dispatch(actions.close());
      };

      socket.onerror = (event) => {
        store.dispatch(actions.error(event));
      };

      if (actions.sendMessage.match(action) && isConnectionEstablished) {
        socket.send(JSON.stringify(action.payload));
      }

      if (actions.disconnect.match(action)) {
        socket.close();
        socket = null;
        store.dispatch(actions.disconnect());
      }
    }
    next(action);
  };
};
