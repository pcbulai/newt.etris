import { ActionsEnum } from "../config/index";
import { clearConnectedCells, hasCollision, isTopOut, pipe, } from "../utils/index";
import { clearFullRows, endGame, moveDown, moveLeft, moveRight, rotateLeft, rotateRight, spawn, } from "./helpers/index";
export const initialState = {
    stageWidth: 0,
    stageHeight: 0,
    activeTetromino: null,
    matrix: [],
    score: 0,
    booster: 1,
    isGamePaused: false,
    isGameOver: false,
    clickCoords: null,
};
export const rootReducer = (state = initialState, action, tilePool) => {
    switch (action.type) {
        case ActionsEnum.TICK:
        case ActionsEnum.MOVE_DOWN:
            return state.activeTetromino == null
                ? spawn(state, tilePool)
                : (() => {
                    const newState = moveDown(state);
                    return hasCollision(newState)
                        ? isTopOut(state)
                            ? endGame(state)
                            : spawn(state, tilePool)
                        : clearFullRows(newState);
                })();
        case ActionsEnum.MOVE_RIGHT:
            return hasCollision(pipe(state, moveRight)) ? state : moveRight(state);
        case ActionsEnum.MOVE_LEFT:
            return hasCollision(pipe(state, moveLeft)) ? state : moveLeft(state);
        case ActionsEnum.ROTATE_RIGHT:
            return hasCollision(pipe(state, rotateRight))
                ? state
                : rotateRight(state);
        case ActionsEnum.ROTATE_LEFT:
            return hasCollision(pipe(state, rotateLeft)) ? state : rotateLeft(state);
        case ActionsEnum.PLAY_PAUSE:
            return Object.assign(Object.assign({}, state), { isGamePaused: !state.isGamePaused });
        case ActionsEnum.BOOSTER_ENGAGED:
            const { matrix, booster } = state;
            if (!action.payload || booster === 0) {
                return state;
            }
            const { x, y } = action.payload;
            const updatedMatrix = clearConnectedCells(matrix, x, y);
            return Object.assign(Object.assign({}, state), { matrix: updatedMatrix, booster: booster - 1 });
        default:
            return state;
    }
};
