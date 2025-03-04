import { TICK_RATE_BASE, TICK_RATE_MULTIPLIER } from "./config/constants.js";
import { shrinkWrapShape } from "./utils/utils.js";
export function hasCollision({ activeShape, matrix, stageWidth, stageHeight, }) {
    if (activeShape == null) {
        return false;
    }
    const shape = shrinkWrapShape(activeShape);
    const shapeLeft = shape.x;
    const shapeWidth = shape.matrix[0].length;
    const shapeRight = shapeLeft + shapeWidth;
    const shapeTop = shape.y;
    const shapeHeight = shape.matrix.length;
    const shapeBottom = shapeTop + shapeHeight;
    return (
    // stage left
    shapeLeft < 0 ||
        // stage right
        shapeRight > stageWidth ||
        // stage bottom
        shapeBottom > stageHeight ||
        // another shape
        shape.matrix.some((row, y) => {
            return row.some((cell, x) => {
                var _a;
                return cell && ((_a = matrix[shapeTop + y]) === null || _a === void 0 ? void 0 : _a[shapeLeft + x]);
            });
        }));
}
export function isGameOver({ isGameOver }) {
    return isGameOver;
}
export function isTopOut({ activeShape }) {
    return shrinkWrapShape(activeShape).y < 0;
}
export function tickRate({ score }) {
    return Math.floor(TICK_RATE_MULTIPLIER * score) + TICK_RATE_BASE;
}
