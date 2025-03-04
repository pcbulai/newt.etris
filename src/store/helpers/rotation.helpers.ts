import { IState } from "../../models/index.js";
import {
  rotateTetrominoLeft,
  rotateTetrominoRight,
} from "../../utils/index.js";

export function rotateRight(state: IState): IState {
  return state.activeTetromino == null
    ? state
    : {
        ...state,
        activeTetromino: {
          ...state.activeTetromino,
          matrix: rotateTetrominoRight(state.activeTetromino.matrix),
        },
      };
}

export function rotateLeft(state: IState): IState {
  return state.activeTetromino == null
    ? state
    : {
        ...state,
        activeTetromino: {
          ...state.activeTetromino,
          matrix: rotateTetrominoLeft(state.activeTetromino.matrix),
        },
      };
}
