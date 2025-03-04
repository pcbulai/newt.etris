# Tetris Game

This is a Tetris game implemented in TypeScript. The game is designed to be responsive and works on devices from iPhone 5 and up. The game logic, rendering, and event handling are organized in a modular architecture to ensure maintainability and scalability.

## Table of Contents

- [Architecture](#architecture)
- [Store Pattern](#store-pattern)
- [Game Loop](#game-loop)
- [Tetris Algorithm](#tetris-algorithm)
- [Installation](#installation)
- [Usage](#usage)
- [License](#license)

## Architecture

The game is organized into several modules, each responsible for a specific aspect of the game:

- **config**: Contains configuration constants and enums.
- **events**: Handles user input events such as keyboard and touch events.
- **models**: Defines TypeScript types and interfaces used throughout the game.
- **store**: Manages the game state using a Redux-like pattern.
- **utils**: Contains utility functions for matrix operations and random number generation.
- **view**: Handles rendering and updating the game view.

### Reasons for the Architecture

- **Modularity**: The game is divided into modules to keep the code organized and maintainable.
- **Separation of Concerns**: Each module has a specific responsibility, making it easier to understand and modify the code.
- **Scalability**: The architecture allows for easy addition of new features and enhancements.

## Store Pattern

The store pattern is used to manage the game state in a centralized manner. This pattern is similar to the Redux pattern, where the state is immutable and updated through actions and reducers.

### Store Implementation

The store is implemented as a class that holds the game state and provides methods to get the state, dispatch actions, and subscribe to state changes.

```typescript
export class Store implements IStore {
  private state: IState;
  private subscribers: Set<ISubscriber> = new Set();
  private tilePool: TetrominoPool<ITetromino>;

  constructor(stageWidth: number, stageHeight: number) {
    this.state = {
      ...initialState,
      stageWidth,
      stageHeight,
      matrix: createMatrix(stageWidth, stageHeight),
    };

    this.tilePool = new TetrominoPool<ITetromino>(() => ({
      x: 0,
      y: 0,
      matrix: [],
      fill: "",
    }));
  }

  getState(): IState {
    return this.state;
  }

  dispatch(event: IAction): void {
    const newState = rootReducer(this.state, event, this.tilePool);
    if (newState !== this.state) {
      this.state = newState;
      this.subscribers.forEach((subscriber) => subscriber(this.state));
    }
  }

  subscribe(subscriber: ISubscriber): () => void {
    this.subscribers.add(subscriber);
    subscriber(this.state);
    return () => this.subscribers.delete(subscriber);
  }
}
```

### Actions and Reducers

Actions are dispatched to update the state. Reducers handle these actions and return a new state based on the action type.

```typescript
export const rootReducer = (
  state = initialState,
  action: IAction,
  tilePool: TetrominoPool<ITetromino>
): IState => {
  switch (action.type) {
    case ActionsEnum.TICK:
    case ActionsEnum.MOVE_DOWN:
      return state.activeTetromino == null
        ? spawn(state, tilePool)
        : (() => {
            const newState = moveDown(state);
            return hasCollision(newState)
              ? isTopOut(newState)
                ? endGame(newState)
                : spawn(newState, tilePool)
              : clearFullRows(newState);
          })();

    // ...other cases...

    default:
      return state;
  }
};
```

## Game Loop

The game loop is the core of the game, responsible for updating the game state and rendering the game at a consistent frame rate. The game loop uses `requestAnimationFrame` for smooth animations and `nextFrame` to control the tick rate.

### Game Loop Implementation

```typescript
async function startLoop(store: Store) {
  async function gameLoop() {
    if (store.getState().isGameOver) {
      return;
    }

    if (!store.getState().isGamePaused) {
      store.dispatch({ type: ActionsEnum.TICK });
    }

    await nextFrame(tickRate(store.getState()));
    requestAnimationFrame(gameLoop);
  }

  requestAnimationFrame(gameLoop);
}
```

## Tetris Algorithm

The Tetris algorithm involves several key operations, including spawning new tetrominoes, moving them, rotating them, and clearing completed lines.

### Spawning Tetrominoes

Tetrominoes are spawned at the top of the game board and fall down. The `spawn` function handles this logic.

```typescript
export function spawn(
  state: IState,
  tilePool: TetrominoPool<ITetromino>
): IState {
  const tetromino = getRandomTetromino(tetrominoes);
  const activeTetrominoMatrix = setTetrominoRotation(tetromino.matrix);
  const [[xMin], [xMax, yMax]] = getMatrixBounds(activeTetrominoMatrix);
  const width = xMax - xMin + 1;
  const activeTetromino = tilePool.acquire();

  activeTetromino.x = Math.floor(state.stageWidth / 2 - width / 2) - xMin;
  activeTetromino.y = -yMax - 1;
  activeTetromino.fill = COLORS[tetromino.color as keyof typeof COLORS];
  activeTetromino.matrix = activeTetrominoMatrix;

  return {
    ...state,
    activeTetromino,
    matrix: state.matrix,
  };
}
```

### Moving and Rotating Tetrominoes

Tetrominoes can be moved left, right, and down, and can also be rotated. The following functions handle these operations:

```typescript
export function moveDown(state: IState): IState {
  return state.activeTetromino == null
    ? state
    : {
        ...state,
        activeTetromino: {
          ...state.activeTetromino,
          y: state.activeTetromino.y + 1,
        },
      };
}

export function moveRight(state: IState): IState {
  return state.activeTetromino == null
    ? state
    : {
        ...state,
        activeTetromino: {
          ...state.activeTetromino,
          x: state.activeTetromino.x + 1,
        },
      };
}

export function moveLeft(state: IState): IState {
  return state.activeTetromino == null
    ? state
    : {
        ...state,
        activeTetromino: {
          ...state.activeTetromino,
          x: state.activeTetromino.x - 1,
        },
      };
}

export function rotateRight(state: IState): IState {
  return state.activeTetromino == null
    ? state
    : {
        ...state,
        activeTetromino: {
          ...state.activeTetromino,
          matrix: rotateTetrominoRight(state.activeTetromino.matrix),
        },
      };
}

export function rotateLeft(state: IState): IState {
  return state.activeTetromino == null
    ? state
    : {
        ...state,
        activeTetromino: {
          ...state.activeTetromino,
          matrix: rotateTetrominoLeft(state.activeTetromino.matrix),
        },
      };
}
```

### Clearing Completed Lines

When a line is fully completed, it is cleared, and the cells above it are shifted down. The `clearFullRows` function handles this logic.

```typescript
export function clearFullRows(state: IState): IState {
  const { matrix, stageWidth, stageHeight } = state;
  const clearedMatrix = matrix.filter((row) => !row.every(Boolean)).reverse();
  const clearedRows = matrix.length - clearedMatrix.length;
  const score = state.score + clearedRows;

  // Update the matrix to shift cells down after clearing
  const updatedMatrix = shiftTetrominoesDown(
    clearedMatrix.reduce(
      (acc, row, y) => clearConnectedCells(acc, 0, y),
      createMatrix(stageWidth, stageHeight)
    )
  );

  return {
    ...state,
    score,
    matrix: updatedMatrix.reverse(),
  };
}
```

## Installation

To install the game, clone the repository and install the dependencies using npm:

```bash
git clone https://github.com/yourusername/tetris-game.git
cd tetris-game
npm install
```

## Usage

To start the game, run the following command:

```bash
npm start
```

Open your browser and navigate to `http://localhost:3000` to play the game.

## License

This project is licensed under the MIT License.