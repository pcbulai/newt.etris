import { ActionsEnum, GRID_SIZE } from "../config/index";
import { initGame } from "../view/game";
export function bindGlobalEvents(canvas, store) {
    const pauseButton = document.querySelector(".game-pause");
    const restartButton = document.querySelector(".game-restart");
    canvas === null || canvas === void 0 ? void 0 : canvas.addEventListener("click", (event) => {
        const rect = canvas.getBoundingClientRect();
        const x = Math.floor((event.clientX - rect.left) / GRID_SIZE.unit);
        const y = Math.floor((event.clientY - rect.top) / GRID_SIZE.unit);
        store.dispatch({
            type: ActionsEnum.BOOSTER_ENGAGED,
            payload: { x, y },
        });
    });
    pauseButton === null || pauseButton === void 0 ? void 0 : pauseButton.addEventListener("click", () => {
        store.dispatch({ type: ActionsEnum.PLAY_PAUSE });
    });
    restartButton === null || restartButton === void 0 ? void 0 : restartButton.addEventListener("click", () => {
        initGame({
            width: GRID_SIZE.width,
            height: GRID_SIZE.height,
            resolution: GRID_SIZE.unit,
        });
    });
}
