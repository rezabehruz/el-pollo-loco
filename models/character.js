import { MovableObject } from "./movable-object.js";
import { ImageHub } from "./manager-models/image-hub.js";
import { IntervalHub } from "./manager-models/interval-hub.js";
import { Keyboard } from "./manager-models/keyboard.js";
import { AudioHub } from "./manager-models/audio-hub.js";

/**
 * Creates a new Character
 * @class
 */
export class Character extends MovableObject {
  // #region Properties
  x = 20;
  y = 220;
  height = 180;
  width = 100;

  offset = {
    top: 80,
    right: 30,
    bottom: 10,
    left: 20,
  };

  coins = 0;
  bottles = 0;

  GAME_OVER = false;

  // #endregion

  /**
   * @constructor
   */
  constructor() {
    super().loadImage("./assets/img/2_character_pepe/2_walk/W-21.png");
    this.loadImages(ImageHub.CHARACTER.hurt);
    this.loadImages(ImageHub.CHARACTER.dead);
    this.loadImages(ImageHub.CHARACTER.jumping);
    this.loadImages(ImageHub.CHARACTER.walking);
    this.loadImages(ImageHub.CHARACTER.idle);

    this.applyGravity();
    this.animateMoving();
    this.animateImage();
  }

  // #region Methods

  /**
   * Starts a new interval
   * Updates the Object x- and y-coordinate based on Keyboard reactions, Game status and level_end_x coordinate
   */
  animateMoving() {
    IntervalHub.startInterval(() => {
      if (Keyboard.RIGHT && this.x < this.world.level.level_end_x && !this.GAME_OVER) {
        this.moveRight();
        this.otherDirection = false;
      }

      if (Keyboard.LEFT && this.x > -615 && !this.GAME_OVER) {
        this.moveLeft();
        this.otherDirection = true;
      }

      if (Keyboard.SPACE) {
        if (!this.isAboveGround() && this.energy > 0 && !this.GAME_OVER) {
          AudioHub.playSound(AudioHub.CHARACTER.jump, false);
          this.jump();
        }
      }

      this.world.camera_x = -this.x + 100;
    }, 1000 / 60);
  }

  /**
   * Starts a new interval
   * Displays the Object based on Character Status, x- and y-coordinates, and Game status
   */
  animateImage() {
    IntervalHub.startInterval(() => {
      if (this.isHurt()) {
        AudioHub.playSound(AudioHub.CHARACTER.damage);
        this.playAnimation(ImageHub.CHARACTER.hurt);
      } else if (this.isDead()) this.handleIfNotDead();
      else if (this.isAboveGround()) {
        this.playAnimation(ImageHub.CHARACTER.jumping);
        AudioHub.stopSound(AudioHub.CHARACTER.run, true);
      } else if (Keyboard.RIGHT || Keyboard.LEFT) this.handleKeyboardEvent();
      else {
        this.playAnimation(ImageHub.CHARACTER.idle);
      }
    }, 120);
  }

    /**
   *
   * Gets Character's Real Frame
   * @param {Character} object
   */
  getRealFrameInDirection() {
    if (this.otherDirection) {
      this.offset.right = 20;
      this.offset.left = 30;
    } else {
      this.offset.right = 30;
      this.offset.left = 20;
    }
    this.getRealFrame();
  }

  /**
   * 
   * Displays the animation and plays the sound
   */
  handleIfNotDead() {
    if (this.DEAD_FLAG == false) {
      AudioHub.playSound(AudioHub.CHARACTER.dead);
      this.DEAD_FLAG = this.playDeadAnimation(ImageHub.CHARACTER.dead);
    }
  }

  /**
   *
   * Displays the animation and plays the sound
   */
  handleKeyboardEvent() {
    if (!this.GAME_OVER) {
      this.speed = 4;
      AudioHub.playSound(AudioHub.CHARACTER.run, true);
      this.playAnimation(ImageHub.CHARACTER.walking);
    } else this.speed = 0;
  }

  /**
   *
   * Checks whether the object's energy should decrease based on lastHit property.
   */
  hit() {
    let timepassed = new Date().getTime() - this.lastHit;
    timepassed = timepassed / 1000;

    if (timepassed > 0.2) {
      this.energy -= 5;
      if (this.energy <= 0) {
        this.speed = 0;
        this.energy = 0;
      } else this.lastHit = new Date().getTime();
    }
  }

  /**
   * Checks whether the object has taken damage.
   * @returns {boolean} true or false
   */
  isHurt() {
    let timepassed = new Date().getTime() - this.lastHit;
    timepassed = timepassed / 1000;
    return timepassed < 0.2;
  }

  /**
   *
   * Checks whether the object is above the Ground.
   * @returns {boolean} true or false
   */
  isAboveGround() {
    if (this.y < 235) {
      this.speed = 2;
      return true;
    } else return false;
  }

  // #endregion
}
