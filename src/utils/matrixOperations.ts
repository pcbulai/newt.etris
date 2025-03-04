import { ITetromino, Matrix } from "../models/index";
import { cryptoRandomInt } from "./rng";

export function createMatrix(width: number, height: number): Matrix {
  return new Array(height).fill(null).map(() => {
    return new Array(width).fill(null);
  });
}

export function getMatrixBounds(
  matrix: Matrix
): [[number, number], [number, number]] {
  let xMin = matrix[0].length;
  let xMax = 0;
  let yMin = matrix.length;
  let yMax = 0;

  matrix.forEach((row, y) => {
    row.forEach((cell, x) => {
      if (!cell) {
        return;
      }
      if (x < xMin) {
        xMin = x;
      } else if (x > xMax) {
        xMax = x;
      }
      if (y < yMin) {
        yMin = y;
      } else if (y > yMax) {
        yMax = y;
      }
    });
  });

  return [
    [xMin, yMin],
    [xMax, yMax],
  ];
}

export function nextFrame(hz: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, 1000 / hz));
}

export function pipe<T>(arg: T, ...fns: Array<(arg: T) => T>): T {
  return fns.reduce((v, f) => f(v), arg);
}

export function getRandomTetromino<T>(array: T[]): T {
  return array[cryptoRandomInt(array.length)];
}

export function setTetrominoRotation(matrix: Matrix): Matrix {
  return pipe(
    matrix,
    ...new Array(Math.floor(cryptoRandomInt(3))).fill(rotateTetrominoRight)
  );
}

export function rotateTetrominoRight(matrix: Matrix): Matrix {
  return matrix[0].map((_col, colIndex) =>
    matrix.map((row) => row[colIndex]).reverse()
  );
}

export function rotateTetrominoLeft(matrix: Matrix): Matrix {
  return matrix[0]
    .map((_col, colIndex) => matrix.map((row) => row[colIndex]))
    .reverse();
}

export function shrinkWrapShape(shape: ITetromino): ITetromino {
  const [[xMin, yMin], [xMax, yMax]] = getMatrixBounds(shape.matrix);

  return {
    ...shape,
    x: shape.x + xMin,
    y: shape.y + yMin,
    matrix: shape.matrix.slice(yMin, yMax + 1).map((row: any[]) => {
      return row.slice(xMin, xMax + 1);
    }),
  };
}

export function clearConnectedCells(
  matrix: Matrix,
  x: number,
  y: number
): Matrix {
  const color = matrix[y]?.[x];

  if (!color || !matrix) {
    return matrix;
  }

  const stack = [[x, y]];
  const visited = new Set();

  while (stack.length > 0) {
    const [cx, cy] = stack.pop()!;
    const key = `${cx},${cy}`;

    if (visited.has(key)) continue;
    visited.add(key);

    if (matrix[cy] && matrix[cy][cx] === color) {
      matrix[cy][cx] = null;

      stack.push([cx + 1, cy]);
      stack.push([cx - 1, cy]);
      stack.push([cx, cy + 1]);
      stack.push([cx, cy - 1]);
    }
  }

  return shiftTetrominoesDown(matrix);
}

export function shiftTetrominoesDown(matrix: Matrix): Matrix {
  const width = matrix[0].length;
  const height = matrix.length;

  for (let x = 0; x < width; x++) {
    for (let y = height - 1; y >= 0; y--) {
      if (matrix[y][x] === null) {
        let k = y - 1;
        while (k >= 0 && matrix[k][x] === null) {
          k--;
        }
        if (k >= 0) {
          matrix[y][x] = matrix[k][x];
          matrix[k][x] = null;
        }
      }
    }
  }

  return matrix;
}
