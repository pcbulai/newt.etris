import { TICK_RATE_BASE, TICK_RATE_MULTIPLIER } from "../config/index.js";
import { shrinkWrapShape } from "./matrixOperations.js";
export function hasCollision({ activeTetromino, matrix, stageWidth, stageHeight, }) {
    if (activeTetromino == null) {
        return false;
    }
    const shape = shrinkWrapShape(activeTetromino);
    const shapeLeft = shape.x;
    const shapeWidth = shape.matrix[0].length;
    const shapeRight = shapeLeft + shapeWidth;
    const shapeTop = shape.y;
    const shapeHeight = shape.matrix.length;
    const shapeBottom = shapeTop + shapeHeight;
    return (shapeLeft < 0 ||
        shapeRight > stageWidth ||
        shapeBottom > stageHeight ||
        shape.matrix.some((row, y) => {
            return row.some((cell, x) => {
                var _a;
                return cell && ((_a = matrix[shapeTop + y]) === null || _a === void 0 ? void 0 : _a[shapeLeft + x]);
            });
        }));
}
export function isTopOut({ activeTetromino }) {
    return shrinkWrapShape(activeTetromino).y < 0;
}
export function tickRate({ score }) {
    return Math.floor(TICK_RATE_MULTIPLIER * score) + TICK_RATE_BASE;
}
