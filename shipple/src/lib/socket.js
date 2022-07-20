import { stateReducer } from "./stores.js";

export const initialiseWebsocket = () => {
  const WS_URL = "ws://localhost:8080";

  const ws = new WebSocket(WS_URL);

  console.log("Hello, front-end has connected to WS");

  stateReducer.setWebsocket(ws);
};

export const sendEvent = (ws, event) => {
  ws.send(event);
};
