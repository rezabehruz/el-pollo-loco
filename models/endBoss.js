import { MovableObject } from "./movable-object.js";
import { ImageHub } from "./manager-models/image-hub.js";
import { IntervalHub } from "./manager-models/interval-hub.js";
import { AudioHub } from "./manager-models/audio-hub.js";

/**
 * Creates a new EndBoss
 * @class
 */
export class EndBoss extends MovableObject {
  // #region Properties
  height = 200;
  width = 200;
  x = 2400;
  y = 240;
  speed = 1.5;

  offset = {
    top: 50,
    right: 10,
    bottom: 50,
    left: 10,
  };

  // #endregion

  // #region Constructor

  /**
   *
   * Loads Images.
   * @constructor
   */
  constructor() {
    super().loadImages(ImageHub.ENDBOSS.idle);
    this.loadImages(ImageHub.ENDBOSS.walk);
    this.loadImages(ImageHub.ENDBOSS.hurt);
    this.loadImages(ImageHub.ENDBOSS.dead);

    this.animateMoving();
    this.animateImage();
  }

  // #endregion

  // #region Methods

  /**
   * Starts a new interval
   * Updates the Object x- and y-coordinate based on x-coordinate and direction.
   */
  animateMoving() {
    IntervalHub.startInterval(() => {
      if (this.x > -710 && !this.otherDirection) {
        this.moveLeft();
      }

      if (this.x < -700 || this.otherDirection) {
        if (!this.otherDirection) this.otherDirection = true;
        if (this.x > 2780) this.otherDirection = false;
        this.moveRight();
      }
    }, 1000 / 25);
  }

  /**
   * Starts a new interval
   * Displays the Object based on Object Status
   */
  animateImage() {
    IntervalHub.startInterval(() => {
      if (this.isHurt()) this.playAnimation(ImageHub.ENDBOSS.hurt);
      else if (this.isDead()) {
        if (!this.DEAD_FLAG) this.DEAD_FLAG = this.playDeadAnimation(ImageHub.ENDBOSS.dead);
      } else if (this.speed == 0) this.playAnimation(ImageHub.ENDBOSS.idle);
      else this.playAnimation(ImageHub.ENDBOSS.walk);
    }, 300);
  }

  /**
   * 
   * Changes the speed to Zero and Increase y-coordinate.
   */
  killed() {
    AudioHub.playSound(AudioHub.CHICKEN.dead, false);
    this.speed = 0;
    this.y = 300;
  }

  /**
   * 
   * Decreases the Object's energy.
   */
  hit() {
    this.energy -= 20;
    if (this.energy == 0) this.killed();
    if (this.energy > 0) this.lastHit = new Date().getTime();
  }

  /**
   * Checks whether the object has taken damage.
   * @returns {boolean} true or false
   */
  isHurt() {
    let timepassed = new Date().getTime() - this.lastHit;
    timepassed = timepassed / 1000;
    return timepassed < 1;
  }

  // #endregion
}
