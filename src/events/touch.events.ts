import { ActionsEnum } from "../config/index";
import { IStore } from "../models/index";

export function bindTouchEvents(store: IStore) {
  let touchStartX = 0;
  let touchStartY = 0;
  let touchEndX = 0;
  let touchEndY = 0;
  const rotateLeft = document.querySelector(".rotate-left");
  const rotateRight = document.querySelector(".rotate-right");

  const handleSwipes = () => {
    const deltaX = touchEndX - touchStartX;
    const deltaY = touchEndY - touchStartY;

    if (Math.abs(deltaX) > Math.abs(deltaY)) {
      store.dispatch({
        type: deltaX > 0 ? ActionsEnum.MOVE_RIGHT : ActionsEnum.MOVE_LEFT,
      });
    } else if (deltaY > 0) {
      store.dispatch({ type: ActionsEnum.MOVE_DOWN });
    }
  };

  document?.addEventListener("touchstart", (event: TouchEvent) => {
    touchStartX = event.changedTouches[0].screenX;
    touchStartY = event.changedTouches[0].screenY;
  });

  document?.addEventListener("touchend", (event: TouchEvent) => {
    touchEndX = event.changedTouches[0].screenX;
    touchEndY = event.changedTouches[0].screenY;
    handleSwipes();
  });

  rotateLeft?.addEventListener("click", () => {
    store.dispatch({ type: ActionsEnum.ROTATE_LEFT });
  });

  rotateRight?.addEventListener("click", () => {
    store.dispatch({ type: ActionsEnum.ROTATE_RIGHT });
  });
}
