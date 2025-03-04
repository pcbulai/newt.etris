import { GRID_SIZE } from "./config/index";
import { initGame } from "./view/index";

initGame({
  width: GRID_SIZE.width,
  height: GRID_SIZE.height,
  resolution: GRID_SIZE.unit,
});
