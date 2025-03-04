import { ActionsEnum } from "../config/index";
export function bindTouchEvents(store) {
    let touchStartX = 0;
    let touchStartY = 0;
    let touchEndX = 0;
    let touchEndY = 0;
    const handleSwipes = () => {
        const deltaX = touchEndX - touchStartX;
        const deltaY = touchEndY - touchStartY;
        if (Math.abs(deltaX) > Math.abs(deltaY)) {
            store.dispatch({
                type: deltaX > 0 ? ActionsEnum.MOVE_RIGHT : ActionsEnum.MOVE_LEFT,
            });
        }
        else if (deltaY > 0) {
            store.dispatch({ type: ActionsEnum.MOVE_DOWN });
        }
    };
    document === null || document === void 0 ? void 0 : document.addEventListener("touchstart", (event) => {
        touchStartX = event.changedTouches[0].screenX;
        touchStartY = event.changedTouches[0].screenY;
    });
    document === null || document === void 0 ? void 0 : document.addEventListener("touchend", (event) => {
        touchEndX = event.changedTouches[0].screenX;
        touchEndY = event.changedTouches[0].screenY;
        handleSwipes();
    });
}
