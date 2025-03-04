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
