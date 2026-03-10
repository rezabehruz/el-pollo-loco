export class Keyboard {
  static RIGHT = false;
  static LEFT = false;
  static SPACE = false;
  static D = false;
  static F = false;

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
        Keyboard.RIGHT = false;
      }

      if (event.key == "ArrowLeft") {
        Keyboard.LEFT = false;
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
  }
}
