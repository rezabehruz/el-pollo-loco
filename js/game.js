import { World } from "../models/world.js";

let canvas;
let world;

function init() {
  canvas = document.getElementById("canvas");
  world = new World(canvas);
}

init();


