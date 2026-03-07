import { DrawableObject } from "./drawable-object.js";
import { IntervalHub } from "./manager-models/interval-hub.js";

export class MovableObject extends DrawableObject {

  // #region Properties
  speed = 0.15;
  speedY = 0;
  acceleration = 2;
  energy = 100;
  lastHit = 0;

  // #endregion


  // #region Methods
  hit() {
    this.energy -= 5;
    if (this.energy < 0) {
      this.energy = 0;
    } else this.lastHit = new Date().getTime();
  }

  isHurt() {
    let timepassed = new Date().getTime() - this.lastHit;
    timepassed = timepassed / 1000;
    return timepassed < 2;
  }

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

  isAboveGround() {
    // if (this instanceof ThrowableObject) {
    //   return true;
    // } else {
      return this.y < 240;
    // }
  }

  moveLeft() {
    this.x -= this.speed;
  }

  moveRight() {
    this.x += this.speed;
  }

  isColliding(obj) {
    return (
      this.x + this.width > obj.x &&
      this.y + this.height > obj.y &&
      this.x < obj.x + obj.width &&
      this.y < obj.y + obj.height
    );
  }

  jump() {
    this.speedY = 25;
  }

  // #endregion
}
