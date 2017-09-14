// @flow

export const UP: string = "up";
export const DOWN: string = "down";
export const LEFT: string = "left";
export const RIGHT: string = "right";

export const UP_DIR = { x: 0, y: -1 };
export const DOWN_DIR = { x: 0, y: 1 };
export const LEFT_DIR = { x: -1, y: 0 };
export const RIGHT_DIR = { x: 1, y: 0 };

export const GAME_WIDTH = 5;
export const GAME_HEIGHT = 5;
export const FPS = 5;
export const SCALE = 90;

export const BRAIN_ACTIONS_MAPPING = {
  "0": UP,
  "1": RIGHT,
  "2": DOWN,
  "3": LEFT
};
