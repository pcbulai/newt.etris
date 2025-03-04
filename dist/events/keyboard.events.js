import { ActionsEnum } from "../config/index";
export function bindKeyboardEvents(store) {
    document.addEventListener("keydown", (keyboardEvent) => {
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
