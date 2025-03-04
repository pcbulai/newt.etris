import { ActionsEnum } from "../config/index.js";
import { IStore } from "../models/index.js";

export function bindKeyboardEvents(store: IStore) {
  document.addEventListener("keydown", (keyboardEvent: KeyboardEvent) => {
    switch (keyboardEvent.key) {
      case "s":
        store.dispatch({ type: ActionsEnum.MOVE_DOWN });
        break;
      case "d":
        store.dispatch({ type: ActionsEnum.MOVE_RIGHT });
        break;
      case "a":
        store.dispatch({ type: ActionsEnum.MOVE_LEFT });
        break;
      case "ArrowRight":
        store.dispatch({ type: ActionsEnum.ROTATE_RIGHT });
        break;
      case "ArrowLeft":
        store.dispatch({ type: ActionsEnum.ROTATE_LEFT });
        break;
    }
  });
}
