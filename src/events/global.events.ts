import { ActionsEnum, GRID_SIZE } from "../config/index.js";
import { IStore } from "../models/index.js";
import { initGame } from "../view/game.js";

export function bindGlobalEvents(canvas: HTMLCanvasElement, store: IStore) {
  const pauseButton = document.querySelector(".game-pause");
  const restartButton = document.querySelector(".game-restart");

  canvas?.addEventListener("click", (event: MouseEvent) => {
    const rect = canvas.getBoundingClientRect();
    const x = Math.floor((event.clientX - rect.left) / GRID_SIZE.unit);
    const y = Math.floor((event.clientY - rect.top) / GRID_SIZE.unit);

    store.dispatch({
      type: ActionsEnum.BOOSTER_ENGAGED,
      payload: { x, y },
    });
  });

  pauseButton?.addEventListener("click", () => {
    store.dispatch({ type: ActionsEnum.PLAY_PAUSE });
  });

  restartButton?.addEventListener("click", () => {
    initGame({
      width: GRID_SIZE.width,
      height: GRID_SIZE.height,
      resolution: GRID_SIZE.unit,
    });
  });
}
