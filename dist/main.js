import { GRID_SIZE } from "./config/index.js";
import { initGame } from "./view/index.js";
initGame({
    width: GRID_SIZE.width,
    height: GRID_SIZE.height,
    resolution: GRID_SIZE.unit,
});
