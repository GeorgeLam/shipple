import { writable } from "svelte/store";
import short from "short-uuid";

import { sendEvent } from "./socket.js";

// Game phases
export const PREGAME = "PREGAME";
export const READY_TO_PLAY = "READY_TO_PLAY";
export const GAME = "GAME";
export const WINNER = "WINNER";

const initialGameState = {
  player1: {
    1: {
      1: { hit: false, ship: false },
      2: { hit: false, ship: false },
      3: { hit: false, ship: false },
      4: { hit: false, ship: false },
    },
    2: {
      1: { hit: false, ship: false },
      2: { hit: false, ship: false },
      3: { hit: false, ship: false },
      4: { hit: false, ship: false },
    },
    3: {
      1: { hit: false, ship: false },
      2: { hit: false, ship: false },
      3: { hit: false, ship: false },
      4: { hit: false, ship: false },
    },
    4: {
      1: { hit: false, ship: false },
      2: { hit: false, ship: false },
      3: { hit: false, ship: false },
      4: { hit: false, ship: false },
    },
  },
  player2: {
    1: {
      1: { hit: false, ship: false },
      2: { hit: false, ship: false },
      3: { hit: false, ship: false },
      4: { hit: false, ship: false },
    },
    2: {
      1: { hit: false, ship: false },
      2: { hit: false, ship: false },
      3: { hit: false, ship: false },
      4: { hit: false, ship: false },
    },
    3: {
      1: { hit: false, ship: false },
      2: { hit: false, ship: false },
      3: { hit: false, ship: false },
      4: { hit: false, ship: false },
    },
    4: {
      1: { hit: false, ship: false },
      2: { hit: false, ship: false },
      3: { hit: false, ship: false },
      4: { hit: false, ship: false },
    },
  },
};

const initialState = {
  gamePhase: PREGAME,
  battleshipCells: [],
  gameState: initialGameState,
  isWinner: true,
  websocket: null,
};

const isAdjacent = (first, second) => {
  const [x1, y1] = first;
  const [x2, y2] = second;

  return (
    (x1 === x2 && Math.abs(y1 - y2) === 1) ||
    (y1 === y2 && Math.abs(x1 - x2) === 1)
  );
};

const createState = () => {
  const { subscribe, set, update } = writable(initialState);

  return {
    subscribe,
    placeShip: (coord) =>
      update((state) => {
        if (state.battleshipCells[0] === undefined) {
          return { ...state, battleshipCells: [coord] };
        } else {
          const firstSelected = state.battleshipCells[0];
          if (isAdjacent(firstSelected, coord)) {
            return {
              ...state,
              gamePhase: READY_TO_PLAY,
              battleshipCells: [firstSelected, coord],
            };
          }
          return state;
        }
      }),
    handleUpdatedGameState: (gameState) =>
      update((state) => {
        return { ...state, gameState };
      }),
    startGame: () =>
      update((state) => {
        const playerUUID = short().new();
        const event = ["start", playerUUID, [state.battleshipCells]];
        sendEvent(state.websocket, event);
        return { ...state, gamePhase: GAME };
      }),
    declareWinner: (isWinner) =>
      update((state) => {
        return { ...state, gamePhase: WINNER, isWinner };
      }),
    reset: () => set(initialState),
    setWebsocket: (websocket) => update((state) => ({ ...state, websocket })),
  };
};

export const stateReducer = createState();
