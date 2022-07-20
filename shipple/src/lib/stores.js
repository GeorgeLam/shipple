import { writable } from "svelte/store";

// Game phases
export const PREGAME = "PREGAME";
export const READY_TO_PLAY = "READY_TO_PLAY";
export const GAME = "GAME";
export const WINNER = "WINNER";

const initialState = {
  gamePhase: PREGAME,
  battleshipCells: [],
  gameState: null,
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
  const { subscribe, set, update, websocket } = writable(initialState);

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
    startGame: () =>
      update((state) => {
        // TODO: initialise websocket
        return { ...state, gamePhase: WINNER };
      }),
    declareWinner: (isWinner) =>
      update((state) => {
        return { ...state, gamePhase: WINNER, isWinner };
      }),
    reset: () => set(initialState),
    websocket,
  };
};

export const stateReducer = createState();
