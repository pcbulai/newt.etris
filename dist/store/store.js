import { createMatrix, TetrominoPool } from "../utils/index.js";
import { initialState, rootReducer } from "./reducers.js";
export class Store {
    constructor(stageWidth, stageHeight) {
        this.subscribers = new Set();
        this.state = Object.assign(Object.assign({}, initialState), { stageWidth,
            stageHeight, matrix: createMatrix(stageWidth, stageHeight) });
        this.tilePool = new TetrominoPool(() => ({
            x: 0,
            y: 0,
            matrix: [],
            fill: "",
        }));
    }
    getState() {
        return this.state;
    }
    dispatch(event) {
        const newState = rootReducer(this.state, event, this.tilePool);
        if (newState !== this.state) {
            this.state = newState;
            this.subscribers.forEach((subscriber) => subscriber(this.state));
        }
    }
    subscribe(subscriber) {
        this.subscribers.add(subscriber);
        subscriber(this.state);
        return () => this.subscribers.delete(subscriber);
    }
}
