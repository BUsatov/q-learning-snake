import { SCALE } from "./constants";
import type { State, Position } from "./types";
import Chart from "chart.js";

// Init
var config = {
  type: "line",
  data: {
    labels: new Array(20).fill(0).map((_, index) => "" + index * 100),
    datasets: [
      {
        label: "Reward",
        backgroundColor: "#26A69A",
        borderColor: "#26A69A",
        data: new Array(20).fill(0),
        fill: false
      }
    ]
  },
  options: {
    title: {
      display: true,
      text: "Reward Chart"
    },
    tooltips: {
      mode: "index",
      intersect: false
    },
    hover: {
      mode: "nearest",
      intersect: true
    },
    scales: {
      xAxes: [
        {
          display: true,
          scaleLabel: {
            display: true,
            labelString: "Ticks"
          }
        }
      ],
      yAxes: [
        {
          display: true,
          scaleLabel: {
            display: true,
            labelString: "Reward"
          },
          ticks: {
            // min: 0,
            // max: 100,
            // forces step size to be 5 units
            // stepSize: 10
          }
        }
      ]
    }
  }
};

const gameCtx = document.getElementById("canvas").getContext("2d");
const chartCtx = document.getElementById("myChart").getContext("2d");
const chart = new Chart(chartCtx, config);

function scaledPosition(pos: number): number {
  return pos * SCALE;
}

function createSnakePartDrawer(ctx): (position: Position) => void {
  return position => {
    ctx.fillRect(
      scaledPosition(position.x),
      scaledPosition(position.y),
      SCALE,
      SCALE
    );
  };
}

export function drawGame(state: State, updateChart: bool) {
  gameCtx.fillStyle = "#212121";
  gameCtx.fillRect(0, 0, state.game.width * SCALE, state.game.height * SCALE);
  gameCtx.fillStyle = "#26A69A";
  createSnakePartDrawer(gameCtx, SCALE)(state.snake.position);
  state.snake.tail.forEach(createSnakePartDrawer(gameCtx));
  gameCtx.fillStyle = "#00897B";
  gameCtx.fillRect(
    scaledPosition(state.snake.position.x),
    scaledPosition(state.snake.position.y),
    SCALE,
    SCALE
  );
  gameCtx.fillStyle = "#F44336";
  gameCtx.fillRect(
    scaledPosition(state.food.x),
    scaledPosition(state.food.y),
    SCALE,
    SCALE
  );
}
export function drawChart(reward: number, updateChart: bool) {
  const prevRew = config.data.datasets[0].data[0];
  if (updateChart) {
    config.data.datasets[0].data.unshift(reward);
    config.data.datasets[0].data.splice(-1);
    chart.update();
  }
}

// CHARTS
