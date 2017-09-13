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

function scaledPosition(pos) {
  return pos * SCALE;
}

function createSnakePartDrawer(ctx) {
  return position => {
    ctx.fillRect(
      scaledPosition(position.x),
      scaledPosition(position.y),
      SCALE,
      SCALE
    );
  };
}

export function draw(state: State) {
  const ctx = canvas.getContext();
  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, state.game.width * SCALE, state.game.height * SCALE);
  ctx.fillStyle = "white";
  createSnakePartDrawer(ctx, SCALE)(state.snake.position);
  state.snake.tail.forEach(createSnakePartDrawer(ctx));
  ctx.fillStyle = "red";
  ctx.fillRect(
    scaledPosition(state.food.x),
    scaledPosition(state.food.y),
    SCALE,
    SCALE
  );
}
