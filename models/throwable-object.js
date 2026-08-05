import { MovableObject } from "./movable-object.js";
import { IntervalHub } from "./manager-models/interval-hub.js";
import { ImageHub } from "./manager-models/image-hub.js";

/**
 * 
 * Creates a new ThrowableObject
 * @class
 */
export class ThrowableObject extends MovableObject {
  // #region Properties
  width = 50;
  height = 60;
  speed = 6;
  collide_spdY = -8;

  offset = {
    top: 10,
    right: 10,
    bottom: 10,
    left: 10,
  };

  // #region Flags
  IS_COLLIDE = false;

  // #endregion

  // #endregion

  // #region Constructor

  /**
   * Loads Images and calls throw() and animate() methods.
   * 
   * @param {number} x_ 
   * @param {number} y_ 
   * @param {boolean} otherDirection_ 
   * 
   * @constructor
   */
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

  /**
   * Starts a new interval
   * Displays the Object based on Object Status
   */
  animate() {
    IntervalHub.startInterval(() => {
      if (this.IS_COLLIDE) {
        let i = this.currentImg % ImageHub.BOTTLE.splash.length;
        this.img = this.imageCache[ImageHub.BOTTLE.splash[i]];
        this.currentImg++;
      } else {
        let i = this.currentImg % ImageHub.BOTTLE.rotation.length;
        this.img = this.imageCache[ImageHub.BOTTLE.rotation[i]];
        this.currentImg++;
      }
    }, 1000 / 60);
  }

  /**
   * 
   * Throws the Object and Applies gravity. 
   * Starts a new interval based on Object status and Direction.
   */
  throw() {
    this.speedY = 20;
    this.applyGravity();

    if (this.otherDirection) {
      this.x -= 50;
    }

    IntervalHub.startInterval(() => {
      if (this.IS_COLLIDE) this.speedY = this.collide_spdY;

      if (this.otherDirection && !this.IS_COLLIDE) this.moveLeft();

      if (!this.otherDirection && !this.IS_COLLIDE) this.moveRight();
    }, 1000 / 60);
  }

  /**
   * 
   * Checks wether the Object is above ground.
   * @returns {boolean} true or false
   */
  isAboveGround() {
    return this.y < 380;
  }

  // #endregion
}
