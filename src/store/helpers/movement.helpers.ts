import { IState } from "../../models/index.js";

export function moveDown(state: IState): IState {
  return state.activeTetromino == null
    ? state
    : {
        ...state,
        activeTetromino: {
          ...state.activeTetromino,
          y: state.activeTetromino.y + 1,
        },
      };
}

export function moveRight(state: IState): IState {
  return state.activeTetromino == null
    ? state
    : {
        ...state,
        activeTetromino: {
          ...state.activeTetromino,
          x: state.activeTetromino.x + 1,
        },
      };
}

export function moveLeft(state: IState): IState {
  return state.activeTetromino == null
    ? state
    : {
        ...state,
        activeTetromino: {
          ...state.activeTetromino,
          x: state.activeTetromino.x - 1,
        },
      };
}
