import { ActionsEnum } from "../config/enums";
import { ICoordinates, ITetromino, Matrix } from "./matrix.types";

export interface IStore {
  getState(): IState;
  dispatch(action: IAction): void;
  subscribe(subscriber: ISubscriber): void;
}

export interface IAction {
  type: ActionsEnum;
  payload?: Partial<IState> | ITetromino | ICoordinates | null;
}

export interface IState {
  stageWidth: number;
  stageHeight: number;
  activeTetromino: ITetromino | null;
  matrix: Matrix;
  score: number;
  booster: number;
  isGamePaused: boolean;
  isGameOver: boolean;
  clickCoords: { x: number; y: number } | null;
}

export interface ISubscriber {
  (state: IState): void;
}
