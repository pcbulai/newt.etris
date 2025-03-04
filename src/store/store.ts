import {
  IAction,
  IState,
  IStore,
  ISubscriber,
  ITetromino,
} from "../models/index.js";
import { createMatrix, TetrominoPool } from "../utils/index.js";
import { initialState, rootReducer } from "./reducers.js";

export class Store implements IStore {
  private state: IState;
  private subscribers: Set<ISubscriber> = new Set();
  private tilePool: TetrominoPool<ITetromino>;

  constructor(stageWidth: number, stageHeight: number) {
    this.state = {
      ...initialState,
      stageWidth,
      stageHeight,
      matrix: createMatrix(stageWidth, stageHeight),
    };

    this.tilePool = new TetrominoPool<ITetromino>(() => ({
      x: 0,
      y: 0,
      matrix: [],
      fill: "",
    }));
  }

  getState(): IState {
    return this.state;
  }

  dispatch(event: IAction): void {
    const newState = rootReducer(this.state, event, this.tilePool);
    if (newState !== this.state) {
      this.state = newState;
      this.subscribers.forEach((subscriber) => subscriber(this.state));
    }
  }

  subscribe(subscriber: ISubscriber): () => void {
    this.subscribers.add(subscriber);
    subscriber(this.state);
    return () => this.subscribers.delete(subscriber);
  }
}
