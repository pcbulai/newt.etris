import { ActionsEnum, GRID_SIZE } from "../config/index";
import { IStore } from "../models/index";
import { initGame } from "../view/game";

export function bindGlobalEvents(canvas: HTMLCanvasElement, store: IStore) {
  const pauseButton = document.querySelector(".game-pause");
  const restartButton = document.querySelector(".game-restart");
  const rotateLeft = document.querySelector(".rotate-left");
  const rotateRight = document.querySelector(".rotate-right");

  canvas?.addEventListener("click", (event: MouseEvent) => {
    const rect = canvas.getBoundingClientRect();
    const x = Math.floor((event.clientX - rect.left) / GRID_SIZE.unit);
    const y = Math.floor((event.clientY - rect.top) / GRID_SIZE.unit);
    console.log(x, y);

    store.dispatch({
      type: ActionsEnum.BOOSTER_ENGAGED,
      payload: { x, y },
    });
  });

  pauseButton?.addEventListener("click", (event: Event) => {
    event.preventDefault();
    store.dispatch({ type: ActionsEnum.PLAY_PAUSE });
  });

  restartButton?.addEventListener("click", (event: Event) => {
    event.preventDefault();
    initGame({
      width: GRID_SIZE.width,
      height: GRID_SIZE.height,
      resolution: GRID_SIZE.unit,
    });
  });

  rotateLeft?.addEventListener("click", () => {
    store.dispatch({ type: ActionsEnum.ROTATE_LEFT });
  });

  rotateRight?.addEventListener("click", () => {
    store.dispatch({ type: ActionsEnum.ROTATE_RIGHT });
  });
}
