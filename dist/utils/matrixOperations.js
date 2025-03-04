import { cryptoRandomInt } from "./rng.js";
export function createMatrix(width, height) {
    return new Array(height).fill(null).map(() => {
        return new Array(width).fill(null);
    });
}
export function getMatrixBounds(matrix) {
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
            }
            else if (x > xMax) {
                xMax = x;
            }
            if (y < yMin) {
                yMin = y;
            }
            else if (y > yMax) {
                yMax = y;
            }
        });
    });
    return [
        [xMin, yMin],
        [xMax, yMax],
    ];
}
export function nextFrame(hz) {
    return new Promise((resolve) => setTimeout(resolve, 1000 / hz));
}
export function pipe(arg, ...fns) {
    return fns.reduce((v, f) => f(v), arg);
}
export function getRandomTetromino(array) {
    return array[cryptoRandomInt(array.length)];
}
export function setTetrominoRotation(matrix) {
    return pipe(matrix, ...new Array(Math.floor(cryptoRandomInt(3))).fill(rotateTetrominoRight));
}
export function rotateTetrominoRight(matrix) {
    return matrix[0].map((_col, colIndex) => matrix.map((row) => row[colIndex]).reverse());
}
export function rotateTetrominoLeft(matrix) {
    return matrix[0]
        .map((_col, colIndex) => matrix.map((row) => row[colIndex]))
        .reverse();
}
export function shrinkWrapShape(shape) {
    const [[xMin, yMin], [xMax, yMax]] = getMatrixBounds(shape.matrix);
    return Object.assign(Object.assign({}, shape), { x: shape.x + xMin, y: shape.y + yMin, matrix: shape.matrix.slice(yMin, yMax + 1).map((row) => {
            return row.slice(xMin, xMax + 1);
        }) });
}
export function clearConnectedCells(matrix, x, y) {
    var _a;
    const color = (_a = matrix[y]) === null || _a === void 0 ? void 0 : _a[x];
    if (!color || !matrix) {
        return matrix;
    }
    const stack = [[x, y]];
    const visited = new Set();
    while (stack.length > 0) {
        const [cx, cy] = stack.pop();
        const key = `${cx},${cy}`;
        if (visited.has(key))
            continue;
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
export function shiftTetrominoesDown(matrix) {
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
