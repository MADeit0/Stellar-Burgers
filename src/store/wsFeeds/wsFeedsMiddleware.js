import { wsUrl } from "../../utils/constants";
import { wsFeedsActions } from "./wsFeedsSlice";

export const feedsSocketMiddleware = (store) => {
  let socket = null;
  return (next) => (action) => {
    const isConnectionEstablished =
      socket && store.getState().wsFeeds.isConnected;

    if (wsFeedsActions.startConnecting.match(action)) {
      socket = new WebSocket(`${wsUrl}/all`);

      socket.onopen = () => {
        store.dispatch(wsFeedsActions.open());
      };

      socket.onmessage = (event) => {
        const { data } = event;
        const parsedData = JSON.parse(data);
        store.dispatch(wsFeedsActions.message(parsedData));
      };

      socket.onclose = () => {
        store.dispatch(wsFeedsActions.close());
      };

      socket.onerror = (event) => {
        store.dispatch(wsFeedsActions.error(event));
      };

      if (wsFeedsActions.sendMessage.match(action) && isConnectionEstablished) {
        socket.send(JSON.stringify(action.payload));
      }

      if (wsFeedsActions.disconnect.match(action)) {
        socket.close();
        socket = null;
        store.dispatch(wsFeedsActions.disconnect());
      }
    }
    next(action);
  };
};
