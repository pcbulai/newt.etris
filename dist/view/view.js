import { bindGlobalEvents, bindKeyboardEvents, bindTouchEvents, } from "../events/index.js";
import { canvasInit } from "./canvas.js";
export function viewInit({ bufferWidth, bufferHeight, unit, store, }) {
    const canvas = document.querySelector(".game canvas");
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
    const gameScore = document.querySelector(".game-score span");
    const gameBooster = document.querySelector(".game-booster span");
    const gameOver = document.querySelector(".game-over");
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
        }
        else {
            gameOver.classList.add("hidden");
            gameOver.classList.remove("visible");
        }
    });
    bindGlobalEvents(ctx.canvas, store);
    if (isMobile) {
        bindTouchEvents(store);
    }
    else {
        bindKeyboardEvents(store);
    }
    return game;
}
