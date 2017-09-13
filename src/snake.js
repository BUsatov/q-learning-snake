// @flow
import type { State, Position, Direction, Snake } from "./types";
import { UP_DIR, DOWN_DIR, LEFT_DIR, RIGHT_DIR } from "./constants";

function isSamePosition(a, b) {}
function snakeTouchesFood(a, b) {}

function updatePosition(dir: Direction, currentPosition: Position): Position {
  return {
    x: currentPosition.x + dir.x,
    y: currentPosition.y + dir.y
  };
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
    position: updatePosition(state.snake.dir, state.snake.position)
  };

  // check if collides with walls or tail
  if (
    nextState.position.x < 0 ||
    nextState.position.x >= state.game.width ||
    (nextState.position.y < 0 || nextState.position.y >= state.game.height) ||
    collidesWithTail(nextState.position, state.snake.tail)
  ) {
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
    x: 1,
    y: 1
  },
  tail: [{ x: 0, y: 1 }],
  dir: RIGHT_DIR
};
