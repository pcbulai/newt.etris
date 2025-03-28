import {
  bindGlobalEvents,
  bindKeyboardEvents,
  bindTouchEvents,
} from "../events/index";
import { IStore } from "../models/index";
import { canvasInit } from "./canvas";

export function viewInit({
  bufferWidth,
  bufferHeight,
  unit,
  store,
}: {
  bufferWidth: number;
  bufferHeight: number;
  unit: number;
  store: IStore;
}) {
  const canvas = document.querySelector<HTMLCanvasElement>(".game canvas");
  if (!canvas) {
    console.error("Canvas element not found");
    return;
  }
  canvas.width = bufferWidth;
  canvas.height = bufferHeight;

  const ctx = canvas.getContext("2d");

  if (!ctx) {
    console.error("Failed to get 2D context");
    return;
  }
  const game = canvasInit({ ctx, bufferWidth, bufferHeight, unit });

  const gameScore = document.querySelector<HTMLDivElement>(".game-score span");
  const gameBooster =
    document.querySelector<HTMLDivElement>(".game-booster span");
  const gameOver = document.querySelector<HTMLDivElement>(".game-over");
  const rotateLeft = document.querySelector(".rotate-left");
  const rotateRight = document.querySelector(".rotate-right");

  const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

  store.subscribe((state) => {
    const { score, booster, isGameOver } = state;
    if (!gameScore || !gameBooster || !gameOver) {
      return;
    }

    gameScore.textContent = `${score}`;
    gameBooster.textContent = `${booster}`;
    if (isGameOver) {
      gameOver.classList.add("visible");
      gameOver.classList.remove("hidden");
    } else {
      gameOver.classList.add("hidden");
      gameOver.classList.remove("visible");
    }
  });

  bindGlobalEvents(ctx.canvas, store);
  if (isMobile) {
    bindTouchEvents(store);
    rotateLeft?.classList.remove("hidden");
    rotateRight?.classList.remove("hidden");
  } else {
    bindKeyboardEvents(store);
  }
  return game;
}
