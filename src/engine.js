// @flow

import _ from "lodash/fp";
import {
  GAME_WIDTH,
  GAME_HEIGHT,
  FPS,
  BRAIN_ACTIONS_MAPPING
} from "./constants";
import type { State } from "./types";
import { update as updateSnake, setup as setupSnake } from "./snake";
import { update as updateFood, setup as setupFood } from "./food";
import { draw } from "./renderer";
import { getAction } from "./brain";

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
  nextState.input = BRAIN_ACTIONS_MAPPING[getAction(nextState)];
  const state = nextState.snake.dead ? initialState() : nextState;
  draw(state);
  setTimeout(() => {
    window.requestAnimationFrame(() => tick(state));
  }, 1000 / FPS);
}

export function start() {
  tick(initialState());
}
