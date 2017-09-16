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
import { getAction, learn } from "./brain";

const updateTick = (state: State) => ({
  ...state,
  tick: (state.tick || 0) + 1
});
const updateReward = (reward: number, state: State) => ({
  ...state,
  reward: (state.reward || 0) + reward
});
const update = _.flow(updateSnake, updateFood, updateTick);

export const params = {
  fastLearn: false
};

const initialState = (fields: { reward?: number, tick?: number }): State => ({
  ...fields,
  snake: setupSnake,
  food: setupFood(GAME_WIDTH, GAME_HEIGHT),
  input: "right",
  game: {
    height: GAME_HEIGHT,
    width: GAME_WIDTH
  }
});

function tick(prevState: State) {
  const input = BRAIN_ACTIONS_MAPPING[getAction(prevState)];
  const nextState = update({ ...prevState, input });
  const reward = learn(prevState, nextState);
  const state = nextState.snake.dead
    ? initialState({ reward: nextState.reward + reward, tick: nextState.tick })
    : updateReward(reward, nextState);
  draw(state);
  if (params.fastLearn) {
    setTimeout(() => {
      tick(state);
    });
  } else {
    setTimeout(() => {
      window.requestAnimationFrame(() => tick(state));
    }, 1000 / FPS);
  }
}

export function start() {
  tick(initialState({}));
}
