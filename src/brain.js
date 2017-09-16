import type { State } from "./types";
import { GAME_WIDTH, GAME_HEIGHT } from "./constants";

let spec = {};
// spec.update = 'qlearn'; // qlearn | sarsa
// spec.gamma = 0.5; // discount factor, [0, 1)
spec.epsilon = 0.2; // initial epsilon for epsilon-greedy policy, [0, 1)
spec.alpha = 0.01; // value function learning rate
// spec.experience_add_every = 50; // number of time steps before we add another experience to replay memory
// spec.experience_size = 10000; // size of experience replay memory
// spec.learning_steps_per_iteration = 1;
// spec.tderror_clamp = 1.0; // for robustness
// spec.num_hidden_units = 50 // number of neurons in hidden layer
const FOOD_REWARD: number = 5;
const DEATH_REWARD: number = -10;
const SILENCE_REWARD: number = -1;

function getNumStates(): number {
  return GAME_WIDTH * GAME_HEIGHT;
}

const env = {
  getNumStates,
  getMaxNumActions: () => 4
};

export const agent = new RL.DQNAgent(env, spec);

function calculateCellNumber(cell: Position): number {
  return cell.y * GAME_WIDTH + cell.x;
}

function getState(state: State): Array<number> {
  const { snake, food } = state;
  const zerosArray = new Array(getNumStates()).fill(0);
  zerosArray[calculateCellNumber(food)] = 2;
  zerosArray[calculateCellNumber(snake.position)] = 1;
  snake.tail.forEach(cell => (zerosArray[calculateCellNumber(cell)] = -1));
  return zerosArray;
}

export function getAction(state: State): number {
  return agent.act(getState(state));
}

export function learn(prevState: State, nextState: State): number {
  if (prevState.snake.tail.length < nextState.snake.tail.length) {
    agent.learn(FOOD_REWARD);
    return FOOD_REWARD;
  } else if (nextState.snake.dead) {
    agent.learn(DEATH_REWARD);
    return DEATH_REWARD;
  }
  agent.learn(SILENCE_REWARD);
  return SILENCE_REWARD;
}
