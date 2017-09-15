import { agent } from "./brain";
import { params } from "./engine";

function onReaderLoad(event) {
  var obj = JSON.parse(event.target.result);
  agent.fromJSON(obj);
}

function download(text, name, type) {
  var a = document.createElement("a");
  var file = new Blob([text], { type: type });
  a.href = URL.createObjectURL(file);
  a.download = name;
  a.click();
}

function onUploadBrain(event) {
  const reader = new FileReader();
  reader.onload = onReaderLoad;
  reader.readAsText(event.target.files[0]);
}

function onSaveBrain() {
  download(JSON.stringify(agent.toJSON()), "snake-brains.json", "text/plain");
}

function onFastLearn() {
  params.fastLearn = !params.fastLearn;
}

export function initializeButtons() {
  document
    .getElementById("uploadBrain")
    .addEventListener("change", onUploadBrain);
  document.getElementById("saveBrain").addEventListener("click", onSaveBrain);
  document.getElementById("fastLearn").addEventListener("click", onFastLearn);
}

$("#slider-eps").slider({
  min: 0,
  max: 1,
  value: agent.epsilon,
  step: 0.01,
  slide: function(event, ui) {
    agent.epsilon = ui.value;
    $("#eps").html(ui.value.toFixed(2));
  }
});

$("#slider-alpha").slider({
  min: 0,
  max: 0.1,
  value: agent.alpha,
  step: 0.001,
  slide: function(event, ui) {
    agent.alpha = ui.value;
    $("#alpha").html(ui.value.toFixed(3));
  }
});
