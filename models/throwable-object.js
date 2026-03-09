import { MovableObject } from "./movable-object.js";
import { IntervalHub } from "./manager-models/interval-hub.js";

export class ThrowableObject extends MovableObject {
  // #region Properties
  width = 50;
  height = 60;
  speed = 8;
  // #endregion

  // #region Constructor
  constructor(x_, y_, otherDirection_) {
    super();
    this.x = x_;
    this.y = y_;
    this.otherDirection = otherDirection_;
    this.loadImage("./assets/img/6_salsa_bottle/salsa_bottle.png");
    this.throw();
  }

  // #endregion

  // #region Methods
  throw() {
    this.speedY = 30;
    this.applyGravity();

    if (this.otherDirection) {
      this.x -= 50;
    }

    IntervalHub.startInterval(() => {
      if (this.otherDirection) {
        this.moveLeft();
      } else this.moveRight();
    }, 25);
  }

  isAboveGround() {
    return true;
  }

  // #endregion
}
