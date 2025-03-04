import { IState } from "./store.types";

export type Matrix = Array<Array<string | null>>;

export interface canvasCell {
  (x: number, y: number, fill: string): void;
}

export interface CollisionParams
  extends Omit<IState, "score" | "booster" | "isGamePaused" | "isGameOver"> {}

export interface ITetromino extends ICoordinates {
  fill: string;
  matrix: Matrix;
}

export interface ICoordinates {
  x: number;
  y: number;
}
