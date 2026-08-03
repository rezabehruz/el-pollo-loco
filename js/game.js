import { AudioHub } from "../models/manager-models/audio-hub.js";
import { IntervalHub } from "../models/manager-models/interval-hub.js";
import { World } from "../models/world.js";

// #region Variables

const canvas = document.getElementById("canvas");
const imgStartRef = document.getElementById("img-start-game");
const imgWinRef = document.getElementById("img-win-game");
const imgLostRef = document.getElementById("img-lost-game");
const imgGameOverRef = document.getElementById("img-game-over");
const btnStartRef = document.getElementById("btn-start");
const btnRestartRef = document.getElementById("btn-restart");
const btnMuteSoundRef = document.getElementById("btn-mute");
const btnUnMuteSoundRef = document.getElementById("btn-unmute");
const contentActionRef = document.getElementById("content-action");

const btnHeaderLegalNotice = document.getElementById("btn-legal-notice");
const btnHeaderPlaying = document.getElementById("btn-start-playing");
const btnHeaderHelp = document.getElementById("btn-help");

const contentLegalNotice = document.getElementById("legal-notice");
const contentHelp = document.getElementById("help");
const contentCanvas = document.getElementById("content-canvas");

let world;
let currentTime;
let IS_MUTE = "mute";

// #region Flags
let LOST_FLAG = false;
let GAME_OVER_FLAG = false;
let WIN_FLAG = false;
let RESTART_FLAG = false;
let RECORD_TIME;

// #endregion

// #endregion

// #region Functions

btnStartRef.addEventListener("click", startGame);
btnRestartRef.addEventListener("click", startGame);
btnMuteSoundRef.addEventListener("click", unmute);
btnUnMuteSoundRef.addEventListener("click", mute);

btnHeaderLegalNotice.addEventListener("click", renderLegalNotice);
btnHeaderPlaying.addEventListener("click", renderPlaying);
btnHeaderHelp.addEventListener("click", renderHelp);

checkSound();

function checkSound() {
  let sound = window.localStorage.getItem("isMute");

  if (sound != null) {
    if (sound == "unmute") {
      btnMuteSoundRef.setAttribute("class", "d-none");
      btnUnMuteSoundRef.setAttribute("class", "btn-sound");
      AudioHub.MUTE_FLAG = false;
    }
  } else window.localStorage.setItem("isMute", IS_MUTE);
}

function mute() {
  btnUnMuteSoundRef.setAttribute("class", "d-none");
  btnMuteSoundRef.setAttribute("class", "btn-sound");
  window.localStorage.setItem("isMute", "mute");

  AudioHub.mute();
}

function unmute() {
  btnMuteSoundRef.setAttribute("class", "d-none");
  btnUnMuteSoundRef.setAttribute("class", "btn-sound");
  window.localStorage.setItem("isMute", "unmute");

  AudioHub.unMute();
}

function renderLegalNotice() {
  contentCanvas.setAttribute("class", "d-none");
  contentHelp.setAttribute("class", "d-none");
  contentLegalNotice.setAttribute("class", "content-2");
}

function renderHelp() {
  contentCanvas.setAttribute("class", "d-none");
  contentLegalNotice.setAttribute("class", "d-none");
  contentHelp.setAttribute("class", "content-3");
}

function renderPlaying() {
  contentCanvas.setAttribute("class", "content-1");
  contentLegalNotice.setAttribute("class", "d-none");
  contentHelp.setAttribute("class", "d-none");
}

function startGame() {
  world = new World(canvas);
  currentTime = 0;

  btnStartRef.setAttribute("class", "v-hidden");
  btnRestartRef.setAttribute("class", "v-hidden");
  imgStartRef.setAttribute("class", "d-none");
  contentActionRef.setAttribute("class", "content-action");

  run();
}

function run() {
  IntervalHub.startInterval(() => {
    if (world.character.DEAD_FLAG && !LOST_FLAG && !GAME_OVER_FLAG) youLost();

    if (world.level.enemies.every(checkDeadEnemy) && !RESTART_FLAG) {
      WIN_FLAG = true;
      if (currentTime == 0) currentTime = new Date().getTime();
    }

    if (LOST_FLAG || WIN_FLAG || RESTART_FLAG || GAME_OVER_FLAG) {
      RECORD_TIME = new Date().getTime() - currentTime;
      RECORD_TIME = RECORD_TIME / 1000;
    }

    if (RECORD_TIME > 2 && LOST_FLAG) gameOver();

    if (RECORD_TIME > 3 && GAME_OVER_FLAG) restartGame();
    if (RECORD_TIME > 1 && WIN_FLAG) youWin();
    if (RECORD_TIME > 3 && RESTART_FLAG) restartGame();
  }, 1000 / 60);
}

function checkDeadEnemy(enemy) {
  return enemy.energy == 0;
}

function restartGame() {
  imgWinRef.setAttribute("class", "d-none");
  imgGameOverRef.setAttribute("class", "d-none");
  imgStartRef.setAttribute("class", "img-control");
  btnStartRef.setAttribute("class", "d-none");
  btnRestartRef.setAttribute("class", "btn-start");
  RESTART_FLAG = false;
  LOST_FLAG = false;
  GAME_OVER_FLAG = false;
  IntervalHub.stopAllInterval();
}

function youWin() {
  WIN_FLAG = false;
  RESTART_FLAG = true;
  currentTime = new Date().getTime();
  imgWinRef.setAttribute("class", "img-control");
  contentActionRef.setAttribute("class", "d-none");

  world.character.GAME_OVER = true;
  world.character.speed = 0;
  world.character.speedY = 0;
}

function youLost() {
  LOST_FLAG = true;
  currentTime = new Date().getTime();
  imgLostRef.setAttribute("class", "img-control");
  contentActionRef.setAttribute("class", "d-none");

  world.level.enemies.forEach((enemy) => {
    enemy.speed = 0;
  });
}

function gameOver() {
  LOST_FLAG = false;
  GAME_OVER_FLAG = true;
  currentTime = new Date().getTime();
  imgLostRef.setAttribute("class", "d-none");
  imgGameOverRef.setAttribute("class", "img-control");
}

// #endregion
