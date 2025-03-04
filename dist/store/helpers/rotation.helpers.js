import { rotateTetrominoLeft, rotateTetrominoRight } from "../../utils/index";
export function rotateRight(state) {
    return state.activeTetromino == null
        ? state
        : Object.assign(Object.assign({}, state), { activeTetromino: Object.assign(Object.assign({}, state.activeTetromino), { matrix: rotateTetrominoRight(state.activeTetromino.matrix) }) });
}
export function rotateLeft(state) {
    return state.activeTetromino == null
        ? state
        : Object.assign(Object.assign({}, state), { activeTetromino: Object.assign(Object.assign({}, state.activeTetromino), { matrix: rotateTetrominoLeft(state.activeTetromino.matrix) }) });
}
