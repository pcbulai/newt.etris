import { ActionsEnum, KeyBindingsEnum } from "../config/index";
import { IStore } from "../models/index";

export function bindKeyboardEvents(store: IStore) {
  document.addEventListener("keydown", (keyboardEvent: KeyboardEvent) => {
    switch (keyboardEvent.key) {
      case KeyBindingsEnum.MOVE_DOWN:
        store.dispatch({ type: ActionsEnum.MOVE_DOWN });
        break;
      case KeyBindingsEnum.MOVE_RIGHT:
        store.dispatch({ type: ActionsEnum.MOVE_RIGHT });
        break;
      case KeyBindingsEnum.MOVE_LEFT:
        store.dispatch({ type: ActionsEnum.MOVE_LEFT });
        break;
      case KeyBindingsEnum.ROTATE_RIGHT:
        store.dispatch({ type: ActionsEnum.ROTATE_RIGHT });
        break;
      case KeyBindingsEnum.ROTATE_LEFT:
        store.dispatch({ type: ActionsEnum.ROTATE_LEFT });
        break;
      case KeyBindingsEnum.PLAY_PAUSE:
        store.dispatch({ type: ActionsEnum.PLAY_PAUSE });
        break;
    }
  });
}
