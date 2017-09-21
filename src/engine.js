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
import { drawGame, drawChart } from "./renderer";
import { getAction, learn } from "./brain";

const updateTick = (state: State) => ({
  ...state,
  tick: (state.tick || 0) + 1
});
const updateReward = (reward: number, state: State) => ({
  ...state,
  reward: state.reward + reward
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
  },
  reward: 0,
});

function tick(prevState: State) {
  const input = BRAIN_ACTIONS_MAPPING[getAction(prevState)];
  const nextState = update({ ...prevState, input });
  const reward = learn(prevState, nextState);
  drawChart(nextState.reward + reward, nextState.snake.dead);
  const state = nextState.snake.dead
    ? initialState({ tick: nextState.tick })
    : updateReward(reward, nextState);
  drawGame(state, nextState.snake.dead);
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
