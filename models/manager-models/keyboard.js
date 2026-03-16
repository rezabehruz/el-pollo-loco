import { World } from "../world.js";
import { AudioHub } from "./audio-hub.js";

export class Keyboard {
  static RIGHT = false;
  static LEFT = false;
  static SPACE = false;
  static D = false;
  static F = false;

  static BTN_MOVE_L = document.getElementById("btn-move-left");
  static BTN_MOVE_R = document.getElementById("btn-move-right");
  static BTN_MOVE_UP = document.getElementById("btn-move-up");
  static BTN_THROW = document.getElementById("btn-throw");

  static addTouchEvents() {
    Keyboard.BTN_MOVE_L.addEventListener("touchstart", (event) => {
      event.preventDefault();

      Keyboard.LEFT = true;
    });

    Keyboard.BTN_MOVE_R.addEventListener("touchstart", (event) => {
      event.preventDefault();

      Keyboard.RIGHT = true;
    });

    Keyboard.BTN_MOVE_UP.addEventListener("touchstart", (event) => {
      event.preventDefault();

      Keyboard.SPACE = true;
    });

    Keyboard.BTN_THROW.addEventListener("touchstart", (event) => {
      event.preventDefault();

      Keyboard.D = true;
    });

    Keyboard.BTN_MOVE_L.addEventListener("touchend", (event) => {
      event.preventDefault();

      AudioHub.stopSound(AudioHub.CHARACTER.run);
      Keyboard.LEFT = false;
    });

    Keyboard.BTN_MOVE_R.addEventListener("touchend", (event) => {
      event.preventDefault();
      AudioHub.stopSound(AudioHub.CHARACTER.run);
      Keyboard.RIGHT = false;
    });

    Keyboard.BTN_MOVE_UP.addEventListener("touchend", (event) => {
      event.preventDefault();

      Keyboard.SPACE = false;
    });

    Keyboard.BTN_THROW.addEventListener("touchend", (event) => {
      event.preventDefault();
      World.OBJ_THROWED = false;
      Keyboard.D = false;
    });
  }

  static addEvents() {
    window.addEventListener("keydown", (event) => {
      if (event.key == "ArrowRight") {
        Keyboard.RIGHT = true;
      }

      if (event.key == "ArrowLeft") {
        Keyboard.LEFT = true;
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
        AudioHub.stopSound(AudioHub.CHARACTER.run);
        Keyboard.RIGHT = false;
      }

      if (event.key == "ArrowLeft") {
        AudioHub.stopSound(AudioHub.CHARACTER.run);
        Keyboard.LEFT = false;
      }

      if (event.key == " ") {
        Keyboard.SPACE = false;
      }

      if (event.key == "d") {
        Keyboard.D = false;
        World.OBJ_THROWED = false;
      }

      if (event.key == "f") {
        Keyboard.F = false;
      }
    });
  }
}
