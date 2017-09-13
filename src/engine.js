// @flow

import _ from "lodash/fp";
import { GAME_WIDTH, GAME_HEIGHT, FPS } from "./constants";
import type { State } from "./types";
import { update as updateSnake, setup as setupSnake } from "./snake";
import { update as updateFood, setup as setupFood } from "./food";
import { draw } from "./renderer";

const update = _.flow(updateSnake, updateFood);

const initialState = () => ({
  snake: setupSnake,
  food: setupFood(GAME_WIDTH, GAME_HEIGHT),
  input: "right",
  game: {
    height: GAME_HEIGHT,
    width: GAME_WIDTH
  }
});

function tick(prevState: State) {
  const nextState = update(prevState);
  const state = nextState.snake.dead ? initialState() : nextState;
  draw(state);
  setTimeout(() => {
    window.requestAnimationFrame(() => tick(state));
  }, 1000 / FPS);
}

export function start() {
  tick(initialState());
}
