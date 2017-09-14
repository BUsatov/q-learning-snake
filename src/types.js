// @flow
export type State = {
  input: "up" | "down" | "left" | "right",
  snake: Snake,
  game: {
    height: number,
    width: number
  },
  food: Position,
  tick: number,
  reward: number
};

export type Snake = {
  dir: Direction,
  position: Position,
  dead: boolean,
  tail: Array<Position>
};

export type Food = {
  x: number,
  y: number
};

export type Position = {
  x: number,
  y: number
};

export type Direction = {
  x: -1 | 0 | 1,
  y: -1 | 0 | 1
};
