import { SCALE } from "./constants";
import type { State } from "./types";

function createCanvasElement(width = 600, height = 600) {
  const element = document.createElement("canvas");

  element.setAttribute("width", width);
  element.setAttribute("height", height);

  document.body.appendChild(element);

  return element.getContext("2d");
}

function getContext() {
  return this.context;
}

function initialize(width = 600, height = 600) {
  const instance = {
    context: createCanvasElement(width, height),
    getContext
  };

  return instance;
}

const canvas = initialize();

function scaledPosition(pos, scale) {
  return pos * scale;
}

function createSnakePartDrawer(ctx, scale) {
  return position => {
    ctx.fillRect(
      scaledPosition(position.x, scale),
      scaledPosition(position.y, scale),
      scale,
      scale
    );
  };
}

export function draw(state: State) {
  const ctx = canvas.getContext();
  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, state.game.width * SCALE, state.game.height * SCALE);
  ctx.fillStyle = "white";
  createSnakePartDrawer(ctx, SCALE)(state.snake.position);
  state.snake.tail.forEach(createSnakePartDrawer(ctx, state.game.scale));
  ctx.fillStyle = "red";
  ctx.fillRect(
    scaledPosition(state.food.x, state.game.scale),
    scaledPosition(state.food.y, state.game.scale),
    SCALE,
    SCALE
  );
}
