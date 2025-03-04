import { COLORS, tetrominoes } from "../config/index.js";
import { createMatrix, getMatrixBounds, getRandomTetromino, rotateTetrominoLeft, rotateTetrominoRight, setTetrominoRotation, } from "../utils/index.js";
export function spawn(state, tilePool) {
    const { activeTetromino: prevActiveTetromino, matrix, stageWidth, stageHeight, } = state;
    const tetromino = getRandomTetromino(tetrominoes);
    const activeTetrominoMatrix = setTetrominoRotation(tetromino.matrix);
    const [[xMin], [xMax, yMax]] = getMatrixBounds(activeTetrominoMatrix);
    const width = xMax - xMin + 1;
    const activeTetromino = tilePool.acquire();
    activeTetromino.x = Math.floor(stageWidth / 2 - width / 2) - xMin;
    activeTetromino.y = -yMax - 1;
    activeTetromino.fill = COLORS[tetromino.color];
    activeTetromino.matrix = activeTetrominoMatrix;
    if (prevActiveTetromino) {
        tilePool.release(prevActiveTetromino);
    }
    return Object.assign(Object.assign({}, state), { activeTetromino, matrix: prevActiveTetromino == null
            ? matrix
            : createMatrix(stageWidth, stageHeight).map((row, y) => row.map((_cell, x) => {
                var _a, _b;
                const localX = x - prevActiveTetromino.x;
                const localY = y - prevActiveTetromino.y;
                return ((_a = prevActiveTetromino.matrix[localY]) === null || _a === void 0 ? void 0 : _a[localX])
                    ? prevActiveTetromino.fill
                    : (_b = matrix[y][x]) !== null && _b !== void 0 ? _b : null;
            })) });
}
export function clearFullRows(state) {
    const { matrix, stageWidth, stageHeight } = state;
    const clearedMatrix = matrix.filter((row) => !row.every(Boolean)).reverse();
    const clearedRows = matrix.length - clearedMatrix.length;
    const score = state.score + clearedRows;
    return Object.assign(Object.assign({}, state), { score, matrix: createMatrix(stageWidth, stageHeight)
            .map((row, y) => row.map((_cell, x) => { var _a, _b; return (_b = (_a = clearedMatrix[y]) === null || _a === void 0 ? void 0 : _a[x]) !== null && _b !== void 0 ? _b : null; }))
            .reverse() });
}
export function moveDown(state) {
    return state.activeTetromino == null
        ? state
        : Object.assign(Object.assign({}, state), { activeTetromino: Object.assign(Object.assign({}, state.activeTetromino), { y: state.activeTetromino.y + 1 }) });
}
export function moveRight(state) {
    return state.activeTetromino == null
        ? state
        : Object.assign(Object.assign({}, state), { activeTetromino: Object.assign(Object.assign({}, state.activeTetromino), { x: state.activeTetromino.x + 1 }) });
}
export function moveLeft(state) {
    return state.activeTetromino == null
        ? state
        : Object.assign(Object.assign({}, state), { activeTetromino: Object.assign(Object.assign({}, state.activeTetromino), { x: state.activeTetromino.x - 1 }) });
}
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
export function endGame(state) {
    return Object.assign(Object.assign({}, state), { isGameOver: true });
}
