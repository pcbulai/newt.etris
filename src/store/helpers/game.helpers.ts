import { COLORS, tetrominoes } from "../../config/index";
import { IState, ITetromino } from "../../models/index";
import {
  createMatrix,
  getMatrixBounds,
  getRandomTetromino,
  setTetrominoRotation,
  TetrominoPool,
} from "../../utils/index";

export function spawn(
  state: IState,
  tilePool: TetrominoPool<ITetromino>
): IState {
  const {
    activeTetromino: prevActiveTetromino,
    matrix,
    stageWidth,
    stageHeight,
  } = state;
  const tetromino = getRandomTetromino(tetrominoes);
  const activeTetrominoMatrix = setTetrominoRotation(tetromino.matrix);
  const [[xMin], [xMax, yMax]] = getMatrixBounds(activeTetrominoMatrix);
  const width = xMax - xMin + 1;
  const activeTetromino = tilePool.acquire();

  activeTetromino.x = Math.floor(stageWidth / 2 - width / 2) - xMin;
  activeTetromino.y = -yMax - 1;
  activeTetromino.fill = COLORS[tetromino.color as keyof typeof COLORS];
  activeTetromino.matrix = activeTetrominoMatrix;

  if (prevActiveTetromino) {
    tilePool.release(prevActiveTetromino);
  }

  return {
    ...state,
    activeTetromino,
    matrix:
      prevActiveTetromino == null
        ? matrix
        : createMatrix(stageWidth, stageHeight).map((row, y) =>
            row.map((_cell, x) => {
              const localX = x - prevActiveTetromino.x;
              const localY = y - prevActiveTetromino.y;
              return prevActiveTetromino.matrix[localY]?.[localX]
                ? prevActiveTetromino.fill
                : matrix[y][x] ?? null;
            })
          ),
  };
}

export function clearFullRows(state: IState): IState {
  const { matrix, stageWidth, stageHeight } = state;
  const clearedMatrix = matrix.filter((row) => !row.every(Boolean)).reverse();
  const clearedRows = matrix.length - clearedMatrix.length;
  const score = state.score + clearedRows;

  return {
    ...state,
    score,
    matrix: createMatrix(stageWidth, stageHeight)
      .map((row, y) => row.map((_cell, x) => clearedMatrix[y]?.[x] ?? null))
      .reverse(),
  };
}

export function endGame(state: IState): IState {
  return { ...state, isGameOver: true };
}
