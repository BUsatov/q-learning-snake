// @flow
import type { State, Position, Direction, Snake, Food } from "./types";
import { UP_DIR, DOWN_DIR, LEFT_DIR, RIGHT_DIR } from "./constants";

function isSamePosition(a, b) {
  return a.x === b.x && a.y === b.y;
}
export function snakeTouchesFood(snake: Snake, food: Food): boolean {
  return snake.position.x === food.x && snake.position.y === food.y;
}

function updatePosition(
  dir: Direction,
  currentPosition: Position,
  game: { height: number, width: number }
): Position {
  const nextPosition = {
    x: currentPosition.x + dir.x,
    y: currentPosition.y + dir.y
  };
  if (nextPosition.x < 0) nextPosition.x = game.width - 1;
  if (nextPosition.x >= game.width) nextPosition.x = 0;
  if (nextPosition.y < 0) nextPosition.y = game.height - 1;
  if (nextPosition.y >= game.height) nextPosition.y = 0;

  return nextPosition;
}

function collidesWithTail(position, tail): boolean {
  return (
    tail.filter(tailPosition => isSamePosition(position, tailPosition)).length >
    0
  );
}

function updateDirection(state: State): Direction {
  if (state.input === "up" && !isSamePosition(state.snake.dir, DOWN_DIR)) {
    return UP_DIR;
  } else if (
    state.input === "down" &&
    !isSamePosition(state.snake.dir, UP_DIR)
  ) {
    return DOWN_DIR;
  } else if (
    state.input === "left" &&
    !isSamePosition(state.snake.dir, RIGHT_DIR)
  ) {
    return LEFT_DIR;
  } else if (
    state.input === "right" &&
    !isSamePosition(state.snake.dir, LEFT_DIR)
  ) {
    return RIGHT_DIR;
  }
  return state.snake.dir;
}

export function update(state: State): State {
  const nextState: Snake = {
    ...state.snake,
    dir: updateDirection(state),
    position: updatePosition(state.snake.dir, state.snake.position, state.game)
  };

  // check if collides with walls or tail
  if (collidesWithTail(nextState.position, state.snake.tail)) {
    nextState.dead = true;
  }

  if (!nextState.dead) {
    // grow a tail
    if (snakeTouchesFood(nextState, state.food)) {
      nextState.tail = state.snake.tail.concat(state.snake.position);
    } else if (state.snake.tail.length > 0) {
      nextState.tail = state.snake.tail
        .slice(1, state.snake.tail.length)
        .concat(state.snake.position);
    }
  }

  return {
    ...state,
    snake: nextState
  };
}

export const setup: Snake = {
  dead: false,
  position: {
    x: 2,
    y: 1
  },
  tail: [{ x: 0, y: 1 }, { x: 1, y: 1 }],
  dir: RIGHT_DIR
};
