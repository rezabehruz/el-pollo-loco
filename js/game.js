import { IntervalHub } from "../models/manager-models/interval-hub.js";
import { World } from "../models/world.js";

// #region Variables

const canvas = document.getElementById("canvas");
const controllerRef = document.getElementById("controller");
const imgStartRef = document.getElementById("img-start-game");
const imgWinRef = document.getElementById("img-win-game");
const imgLostRef = document.getElementById("img-lost-game");
const imgGameOverRef = document.getElementById("img-game-over");
const btnStartRef = document.getElementById("btn-start");

let world;

// #region Flags
let LOST_FLAG = false;
let WIN_FLAG = false;
let RECORD_TIME;
// #endregion

// #endregion

// #region Function

function init() {
  controllerRef.setAttribute("class", "content-controller");

  btnStartRef.addEventListener("click", startGame);
}

init();

function startGame() {
  world = new World(canvas);
  controllerRef.setAttribute("class", "d-none");
  btnStartRef.setAttribute("class", "d-none");
  imgStartRef.setAttribute("class", "d-none");

  let currentTime = 0;

  IntervalHub.startInterval(() => {
    if (world.character.DEAD_FLAG && !LOST_FLAG) {
      youLost();
      LOST_FLAG = true;
      currentTime = new Date().getTime();
    }

    if (world.level.enemies.every(checkDeadEnemy)) {
      WIN_FLAG = true;
      if (currentTime == 0) currentTime = new Date().getTime();
    }

    if (LOST_FLAG || WIN_FLAG) {
      RECORD_TIME = new Date().getTime() - currentTime;
      RECORD_TIME = RECORD_TIME / 1000;
    }

    if (RECORD_TIME > 2 && LOST_FLAG) gameOver();
    if (RECORD_TIME > 2 && WIN_FLAG) youWin();
  }, 1000 / 60);
}

function checkDeadEnemy(enemy) {
  return enemy.energy == 0;
}

function youWin() {
  controllerRef.setAttribute("class", "content-controller");
  imgWinRef.setAttribute("class", "img-control");
  IntervalHub.stopAllInterval();
}

function youLost() {
  controllerRef.setAttribute("class", "content-controller");
  imgLostRef.setAttribute("class", "img-control");
}

function gameOver() {
  imgLostRef.setAttribute("class", "d-none");
  imgGameOverRef.setAttribute("class", "img-control");
  IntervalHub.stopAllInterval();
}

// #endregion
