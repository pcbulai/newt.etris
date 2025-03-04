import { ActionsEnum, GRID_SIZE } from "../config/index";
import { initGame } from "../view/game";
export function bindGlobalEvents(canvas, store) {
    const pauseButton = document.querySelector(".game-pause");
    const restartButton = document.querySelector(".game-restart");
    const rotateLeft = document.querySelector(".rotate-left");
    const rotateRight = document.querySelector(".rotate-right");
    canvas === null || canvas === void 0 ? void 0 : canvas.addEventListener("click", (event) => {
        event.preventDefault();
        const rect = canvas.getBoundingClientRect();
        const x = Math.floor((event.clientX - rect.left) / GRID_SIZE.unit);
        const y = Math.floor((event.clientY - rect.top) / GRID_SIZE.unit);
        store.dispatch({
            type: ActionsEnum.BOOSTER_ENGAGED,
            payload: { x, y },
        });
    });
    pauseButton === null || pauseButton === void 0 ? void 0 : pauseButton.addEventListener("click", (event) => {
        event.preventDefault();
        store.dispatch({ type: ActionsEnum.PLAY_PAUSE });
    });
    restartButton === null || restartButton === void 0 ? void 0 : restartButton.addEventListener("click", (event) => {
        event.preventDefault();
        initGame({
            width: GRID_SIZE.width,
            height: GRID_SIZE.height,
            resolution: GRID_SIZE.unit,
        });
    });
    rotateLeft === null || rotateLeft === void 0 ? void 0 : rotateLeft.addEventListener("click", (event) => {
        // event.preventDefault();
        store.dispatch({ type: ActionsEnum.ROTATE_LEFT });
    });
    rotateRight === null || rotateRight === void 0 ? void 0 : rotateRight.addEventListener("click", (event) => {
        // event.preventDefault();
        store.dispatch({ type: ActionsEnum.ROTATE_RIGHT });
    });
}
