import { GAME_WIDTH, GAME_HEIGHT } from './constants';

let spec = {}
// spec.update = 'qlearn'; // qlearn | sarsa
// spec.gamma = 0.5; // discount factor, [0, 1)
spec.epsilon = 0.2; // initial epsilon for epsilon-greedy policy, [0, 1)
spec.alpha = 0.01; // value function learning rate
// spec.experience_add_every = 50; // number of time steps before we add another experience to replay memory
// spec.experience_size = 10000; // size of experience replay memory
// spec.learning_steps_per_iteration = 1;
// spec.tderror_clamp = 1.0; // for robustness
// spec.num_hidden_units = 50 // number of neurons in hidden layer

function getNumStates() {
  return GAME_WIDTH * GAME_HEIGHT
}

const env = {
  getNumStates,
  getMaxNumActions: () => 4,
}

export const agent = new RL.DQNAgent(env, spec);

function calculateCellNumber({x, y}) {
  return y * GAME_WIDTH + x;
}

function getState(state) {
  const { snake, food } = state;
  const zerosArray = new Array(getNumStates()).fill(0);
  zerosArray[calculateCellNumber(food)] = 2;
  zerosArray[calculateCellNumber(snake.position)] = 2;
  snake.tail.forEach(cell => zerosArray[calculateCellNumber(cell)] = -1)
  return zerosArray;
}

export function getAction(state) {
  return agent.act(getState(state));
}
