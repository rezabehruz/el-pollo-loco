import { World } from "../world.js";
import { AudioHub } from "./audio-hub.js";

/**
 *
 * Utility class.
 * Contains only static properties and methods.
 */
export class Keyboard {
  static RIGHT = false;
  static LEFT = false;
  static SPACE = false;
  static D = false;
  static F = false;

  static BTN_MOVE_L = document.querySelectorAll(".btn-move-left");
  static BTN_MOVE_R = document.querySelectorAll(".btn-move-right");
  static BTN_MOVE_UP = document.querySelectorAll(".btn-move-up");
  static BTN_THROW = document.querySelectorAll(".btn-throw");

  /**
   *
   * Adds Touchstart event and switches Keyboard static Properties
   * @param {HTMLElement} el
   * @param {String} keyboard
   */
  static addTouchStartEvent(el, keyboard) {
    el.addEventListener("touchstart", (event) => {
      event.preventDefault();

      if (keyboard === "LEFT") Keyboard.LEFT = true;
      if (keyboard === "RIGHT") Keyboard.RIGHT = true;
      if (keyboard === "SPACE") Keyboard.SPACE = true;
      if (keyboard === "D") Keyboard.D = true;
    });
  }

  /**
   *
   * Adds Touchstart events
   */
  static addTouchStartEvents() {
    Keyboard.BTN_MOVE_L.forEach((el) => {
      Keyboard.addTouchStartEvent(el, "LEFT");
    });

    Keyboard.BTN_MOVE_R.forEach((el) => {
      Keyboard.addTouchStartEvent(el, "RIGHT");
    });

    Keyboard.BTN_MOVE_UP.forEach((el) => {
      Keyboard.addTouchStartEvent(el, "SPACE");
    });

    Keyboard.BTN_THROW.forEach((el) => {
      Keyboard.addTouchStartEvent(el, "D");
    });
  }

  /**
   *
   * Adds Touchend event and switches Keyboard static Properties
   * @param {HTMLElement} el
   * @param {String} keyboard
   */
  static addTouchEndEvent(el, keyboard) {
    el.addEventListener("touchend", (event) => {
      event.preventDefault();

      if (keyboard === "LEFT" || keyboard === "RIGHT") AudioHub.stopSound(AudioHub.CHARACTER.run);

      if (keyboard === "LEFT") Keyboard.LEFT = false;

      if (keyboard === "RIGHT") Keyboard.RIGHT = false;

      if (keyboard === "SPACE") Keyboard.SPACE = false;
      if (keyboard === "D") {
        World.OBJ_THROWED = false;
        Keyboard.D = false;
      }
    });
  }

  /**
   *
   * Adds Touchend events
   */
  static addTouchEndEvents() {
    Keyboard.BTN_MOVE_L.forEach((el) => Keyboard.addTouchEndEvent(el, "LEFT"));

    Keyboard.BTN_MOVE_R.forEach((el) => Keyboard.addTouchEndEvent(el, "RIGHT"));

    Keyboard.BTN_MOVE_UP.forEach((el) => Keyboard.addTouchEndEvent(el, "SPACE"));

    Keyboard.BTN_THROW.forEach((el) => Keyboard.addTouchEndEvent(el, "D"));
  }

  /**
   *
   * Shorthand for calling adding Touchevents methods
   */
  static addTouchEvents() {
    Keyboard.addTouchStartEvents();

    Keyboard.addTouchEndEvents();
  }

  /**
   * Adds Keydownevents
   * @param {Event} event
   */
  static handleKeydown(event) {
    if (event.key == "ArrowRight") Keyboard.RIGHT = true;

    if (event.key == "ArrowLeft") Keyboard.LEFT = true;

    if (event.key == " ") Keyboard.SPACE = true;

    if (event.key == "d") Keyboard.D = true;

    if (event.key == "f") Keyboard.F = true;
  }

  /**
   * Adds Keyupevents
   * @param {Event} event
   */
  static handleKeyup(event) {
    if (event.key == "ArrowRight" || event.key == "ArrowLeft") AudioHub.stopSound(AudioHub.CHARACTER.run);

    if (event.key == "ArrowRight") Keyboard.RIGHT = false;

    if (event.key == "ArrowLeft") Keyboard.LEFT = false;

    if (event.key == " ") Keyboard.SPACE = false;

    if (event.key == "d") {
      Keyboard.D = false;
      World.OBJ_THROWED = false;
    }

    if (event.key == "f") Keyboard.F = false;
  }

  /**
   *
   * Shorthand for calling adding events methods.
   */
  static addEvents() {
    window.addEventListener("keydown", Keyboard.handleKeydown);

    window.addEventListener("keyup", Keyboard.handleKeyup);
  }
}
