# Tetris Game

This is a Tetris game implemented in TypeScript. The game is designed to be responsive and works on devices from iPhone 5 and up. The game logic, rendering, and event handling are organized in a modular architecture to ensure maintainability and scalability.

## Table of Contents

- [Architecture](#architecture)
- [Game Loop](#game-loop)
- [Random Number Generation](#random-number-generation)
- [Event Handling](#event-handling)
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