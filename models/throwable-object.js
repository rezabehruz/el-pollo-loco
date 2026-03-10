import { MovableObject } from "./movable-object.js";
import { IntervalHub } from "./manager-models/interval-hub.js";
import { ImageHub } from "./manager-models/image-hub.js";

export class ThrowableObject extends MovableObject {
  // #region Properties
  width = 50;
  height = 60;
  speed = 10;
  isCollidiert = false;
  // #endregion

  // #region Constructor
  constructor(x_, y_, otherDirection_) {
    super();
    this.x = x_;
    this.y = y_;
    this.otherDirection = otherDirection_;
    this.loadImages(ImageHub.BOTTLE.onGround);
    this.loadImages(ImageHub.BOTTLE.rotation);
    this.loadImages(ImageHub.BOTTLE.splash);
    this.throw();
    this.animate();
  }

  // #endregion

  // #region Methods

  animate() {
    IntervalHub.startInterval(() => {
      if (this.isCollidiert) {
        let i = this.currentImg % ImageHub.BOTTLE.splash.length;
        this.img = this.imageCache[ImageHub.BOTTLE.splash[i]];
        this.currentImg++;
      }

      if (this.isAboveGround()) {
        let i = this.currentImg % ImageHub.BOTTLE.rotation.length;
        this.img = this.imageCache[ImageHub.BOTTLE.rotation[i]];
        this.currentImg++;
      }
    }, 100);
  }

  throw() {
    this.speedY = 20;
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
    return this.y < 380;
  }

  moveLeft() {
    if (this.isAboveGround()) this.x -= this.speed;
  }

  moveRight() {
    if (this.isAboveGround()) this.x += this.speed;
  }

  // #endregion
}
