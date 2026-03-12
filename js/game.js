import { IntervalHub } from "../models/manager-models/interval-hub.js";
import { World } from "../models/world.js";

// #region Variables

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const controllerRef = document.getElementById("controller");
const btnStartRef = document.getElementById("btn-start");

let world;


// #endregion


// #region Function

function init() {
  
  controllerRef.setAttribute("class","content-controller");
  
  btnStartRef.addEventListener("click", startGame);

}

init();

function startGame() {
  world = new World(canvas);
  controllerRef.setAttribute("class", "d-none");
}


// #endregion

