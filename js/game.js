import { World } from "../models/world.js";

let canvas;
let world;

function init() {
  canvas = document.getElementById("canvas");
  world = new World(canvas);
}

init();

window.addEventListener("keydown", (event) => {
  if (event.key == "ArrowRight") {
    Keyboard.RIGHT = true;
  }

  if (event.key == "ArrowLeft") {
    Keyboard.LEFT = true;
  }

  if (event.key == "ArrowUp") {
    Keyboard.UP = true;
  }

  if (event.key == "ArrowDown") {
    Keyboard.DOWN = true;
  }

  if (event.key == " ") {
    Keyboard.SPACE = true;
  }

  if (event.key == "d") {
    Keyboard.D = true;
  }

  if (event.key == "f") {
    Keyboard.F = true;
  }
});

window.addEventListener("keyup", (event) => {
  if (event.key == "ArrowRight") {
    Keyboard.RIGHT = false;
  }

  if (event.key == "ArrowLeft") {
    Keyboard.LEFT = false;
  }

  if (event.key == "ArrowUp") {
    Keyboard.UP = false;
  }

  if (event.key == "ArrowDown") {
    Keyboard.DOWN = false;
  }

  if (event.key == " ") {
    Keyboard.SPACE = false;
  }

  if (event.key == "d") {
    Keyboard.D = false;
  }

  if (event.key == "f") {
    Keyboard.F = false;
  }
});
