import { DrawableObject } from "./drawable-object.js";
import { AudioHub } from "./manager-models/audio-hub.js";
import { IntervalHub } from "./manager-models/interval-hub.js";

export class MovableObject extends DrawableObject {
  // #region Properties
  speed;
  speedY = 0;
  acceleration = 2;
  energy = 100;
  lastHit = 0;

  // #endregion

  // #region Methods

  isDead() {
    return this.energy == 0;
  }

  applyGravity() {
    IntervalHub.startInterval(() => {
      if (this.isAboveGround() || this.speedY > 0) {
        this.y -= this.speedY;
        this.speedY -= this.acceleration;
      }
    }, 1000 / 25);
  }

  isAboveGround() {}

  moveLeft() {
    this.x -= this.speed;
  }

  moveRight() {
    this.x += this.speed;
  }

  isColliding(obj) {
    return (
      this.rX + this.rWidth > obj.rX &&
      this.rY + this.rHeight > obj.rY &&
      this.rX < obj.rX + obj.rWidth &&
      this.rY < obj.rY + obj.rHeight
    );
  }

  isKilling(obj) {
    return obj.rY + obj.rHeight > this.rY + this.rHeight;
  }

  jump() {
    this.speedY = 25;
  }

  // #endregion
}
