// @flow

import { setup as snakeSetup } from "./snake";
import type { State, Position, Snake, Food } from "./types";

function positionOnSnake(snake: Snake, position: Position): boolean {
  const { x, y } = position;
  if (!x || !y) {
    return true;
  }

  return (
    (snake.position.x === x && snake.position.y === y) ||
    snake.tail.filter(
      tailPosition => tailPosition.x === x && tailPosition.y === y
    ).length > 0
  );
}

function randomPositionFood(
  snake: Snake = snakeSetup,
  gameWidth: number,
  gameHeight: number
): Position {
  let x: ?number = null;
  let y: ?number = null;

  do {
    x = Math.floor(Math.random() * gameWidth);
    y = Math.floor(Math.random() * gameHeight);
  } while (positionOnSnake(snake, { x, y }));

  return { x, y };
}

function snakeTouchesFood(snake: Snake, food: Food): boolean {
  return snake.position.x === food.x && snake.position.y === food.y;
}

export function update(state: State): State {
  if (snakeTouchesFood(state.snake, state.food)) {
    return {
      ...state,
      food: randomPositionFood(state.snake, state.game.width, state.game.height)
    };
  }

  return state;
}

export function setup(
  currentState: State,
  width: number,
  height: number
): Food {
  return randomPositionFood(currentState.snake, width, height);
}
