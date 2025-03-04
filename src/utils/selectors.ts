import { TICK_RATE_BASE, TICK_RATE_MULTIPLIER } from "../config/index";
import { CollisionParams } from "../models/index";
import { shrinkWrapShape } from "./matrixOperations";

export function hasCollision({
  activeTetromino,
  matrix,
  stageWidth,
  stageHeight,
}: CollisionParams) {
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

  return (
    shapeLeft < 0 ||
    shapeRight > stageWidth ||
    shapeBottom > stageHeight ||
    shape.matrix.some((row, y) => {
      return row.some((cell, x) => {
        return cell && matrix[shapeTop + y]?.[shapeLeft + x];
      });
    })
  );
}

export function isTopOut({ activeTetromino }: { activeTetromino: any }) {
  return shrinkWrapShape(activeTetromino).y < 0;
}

export function tickRate({ score }: { score: number }) {
  return Math.floor(TICK_RATE_MULTIPLIER * score) + TICK_RATE_BASE;
}
