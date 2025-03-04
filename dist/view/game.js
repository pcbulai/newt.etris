var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { ActionsEnum } from "../config/index";
import { Store } from "../store/index";
import { nextFrame, tickRate } from "../utils/index";
import { viewInit } from "./view";
export function initGame({ width, height, resolution, }) {
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
function startLoop(store) {
    return __awaiter(this, void 0, void 0, function* () {
        function gameLoop() {
            return __awaiter(this, void 0, void 0, function* () {
                if (store.getState().isGameOver) {
                    return;
                }
                if (!store.getState().isGamePaused) {
                    store.dispatch({ type: ActionsEnum.TICK });
                }
                yield nextFrame(tickRate(store.getState()));
                requestAnimationFrame(gameLoop);
            });
        }
        requestAnimationFrame(gameLoop);
    });
}
