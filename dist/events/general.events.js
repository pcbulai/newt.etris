import { bindKeyboardControls } from "./keyboard.events.js";
import { bindTouchControls } from "./touch.events.js";
export function setEvents(canvas, store) {
    bindKeyboardControls(store);
    bindTouchControls(canvas, store);
}
