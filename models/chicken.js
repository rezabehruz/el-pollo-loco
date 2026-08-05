import { MovableObject } from "./movable-object.js";
import { ImageHub } from "./manager-models/image-hub.js";
import { IntervalHub } from "./manager-models/interval-hub.js";
import { AudioHub } from "./manager-models/audio-hub.js";

/**
 * Creates a new Chicken.
 * @class
 */
export class Chicken extends MovableObject {
  // #region Properties
  y = 340;
  width = 60;
  height = 80;
  speed = 0.5;

  offset = {
    top: 10,
    right: 10,
    bottom: 10,
    left: 10,
  };

  // #endregion

  // #region Constructor

  /**
   * Loads images.
   * Generate random x-coordinate and random speed
   * @constructor
   */
  constructor() {
    super();
    this.loadImages(ImageHub.CHICKEN.stop);
    this.loadImages(ImageHub.CHICKEN.dead);
    this.loadImages(ImageHub.CHICKEN.walking);
    this.x = 700 + Math.random() * 1800;
    this.speed = this.speed + Math.random() * 0.25;

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
      if (this.x > -720 && !this.otherDirection) {
        this.moveLeft();
      }

      if (this.x < -715 || this.otherDirection) {
        if (!this.otherDirection) this.otherDirection = true;
        if (this.x > 2800) this.otherDirection = false;
        this.moveRight();
      }

    }, 1000 / 60);
  }

  /**
   * Starts a new interval
   * Displays the Object based on Object Status
   */
  animateImage(){
    IntervalHub.startInterval(() => {
      if (this.isDead()) this.playAnimation(ImageHub.CHICKEN.dead);
      else if (this.speed == 0) this.playAnimation(ImageHub.CHICKEN.stop);
      else this.playAnimation(ImageHub.CHICKEN.walking);
    }, 300);
  }

  /**
   * 
   * Changes the speed and energy to Zero and Increase y-coordinate.
   */
  killed() {
    AudioHub.playSound(AudioHub.CHICKEN.dead, false);
    this.speed = 0;
    this.energy = 0;
    this.y = 350;
  }

  // #endregion
}
