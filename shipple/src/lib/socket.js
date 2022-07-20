import { stateReducer } from "./stores.js";

export const initialiseWebsocket = () => {
  const WS_URL = "ws://localhost:8080";

  const ws = new WebSocket(WS_URL);

  console.log("Hello, front-end has connected to WS");

  ws.onmessage = function (event) {
    const data = JSON.parse(event.data);

    console.log(data);
    console.log(stateReducer);

    if (data.Message === "winner") {
      stateReducer.declareWinner(data.PlayerId);
    }

    if (data.Message === "updateState") {
      stateReducer.handleUpdatedGameState(data.Gamestate);
    }
  };

  stateReducer.setWebsocket(ws);
};

export const sendEvent = (ws, event) => {
  ws.send(JSON.stringify(event));
};
