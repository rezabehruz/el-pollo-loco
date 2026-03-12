import { ImageHub } from "../models/manager-models/image-hub.js";
import { World } from "../models/world.js";

let world;

let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");
let imgStartScreen = new Image();

let btnStartRef;

function init() {
  imgStartScreen.onload = drawImageWhenLoaded;
  imgStartScreen.src = ImageHub.START_SCREEN[0];

  btnStartRef = document.getElementById("btn-start");
  btnStartRef.addEventListener("click", startGame);
}

init();

function startGame() {
  world = new World(canvas);
  btnStartRef.setAttribute("class", "d-none");
}

function drawImageWhenLoaded() {
  ctx.drawImage(imgStartScreen, 0, 0, canvas.width, canvas.height);
}
