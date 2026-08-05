import { DrawableObject } from "./drawable-object.js";
import { IntervalHub } from "./manager-models/interval-hub.js";

/**
 * Creates a new MovableObject
 * @class
 */
export class MovableObject extends DrawableObject {
  // #region Properties
  speed;
  speedY = 0;
  acceleration = 2;
  energy = 100;
  lastHit = 0;

  // #endregion

  // #region Methods

  /**
   * Determines whether the object is dead.
   * @returns {boolean} - true or false
   */
  isDead() {
    return this.energy == 0;
  }

  /**
   * Starts a new interval. 
   * Applies gravity to the object
   */
  applyGravity() {
    IntervalHub.startInterval(() => {
      if (this.speedY > 0) {
        this.y -= this.speedY;
        this.speedY -= this.acceleration;
      }
    }, 1000 / 25);
  }

  /**
   * Changes the Object's x-coordinate.
   */
  moveLeft() {
    this.x -= this.speed;
  }

 /**
  * changes the Object's x-coordinate.
  */
  moveRight() {
    this.x += this.speed;
  }


  /**
   * Checks whether two objects are colliding based on their coordinates, width, and height.
   * @param {MovableObject} obj - obj for checking
   * @returns {boolean} - true or false
   */
  isColliding(obj) {
    return (
      this.rX + this.rWidth > obj.rX &&
      this.rY + this.rHeight > obj.rY &&
      this.rX < obj.rX + obj.rWidth &&
      this.rY < obj.rY + obj.rHeight
    );
  }

  /**
   * Checks wether obj is killing the other obj based on their coordinates, width, and height.
   * @param {MovableObject} obj - obj for checking
   * @returns {boolean} - true or false
   */
  isKilling(obj) {
    return obj.rY + obj.rHeight > this.rY + this.rHeight && this.speedY < 0;
  }

  /**
   * Changes the y-coordinate to initiate a jump.
   */
  jump() {
    this.speedY = 25;
  }

  // #endregion
}
