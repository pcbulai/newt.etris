import { ActionsEnum } from "../config/index";
import { Store } from "../store/index";
import { nextFrame, tickRate } from "../utils/index";
import { viewInit } from "./view";

export function initGame({
  width,
  height,
  resolution,
}: {
  width: number;
  height: number;
  resolution: number;
}) {
  const stageWidth = Math.max(4, Math.ceil(width));
  const stageHeight = Math.max(4, Math.ceil(height));
  const unit = Math.ceil(resolution);

  const bufferWidth = stageWidth * unit;
  const bufferHeight = stageHeight * unit;

  const store = new Store(stageWidth, stageHeight);
  const render = viewInit({
    bufferWidth,
    bufferHeight,
    unit,
    store,
  });

  if (render) {
    store.subscribe(render);
  }

  startLoop(store);
}

async function startLoop(store: Store) {
  async function gameLoop() {
    if (store.getState().isGameOver) {
      return;
    }

    if (!store.getState().isGamePaused) {
      store.dispatch({ type: ActionsEnum.TICK });
    }

    await nextFrame(tickRate(store.getState()));
    requestAnimationFrame(gameLoop);
  }

  requestAnimationFrame(gameLoop);
}
