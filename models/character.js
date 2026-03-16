import { MovableObject } from "./movable-object.js";
import { ImageHub } from "./manager-models/image-hub.js";
import { IntervalHub } from "./manager-models/interval-hub.js";
import { Keyboard } from "./manager-models/keyboard.js";
import { AudioHub } from "./manager-models/audio-hub.js";

export class Character extends MovableObject {
  // #region Properties
  x = 20;
  y = 130;
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

  // #endregion

  // #region Constructor
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

  // #endregion

  // #region Methods
  animateMoving() {
    IntervalHub.startInterval(() => {
      if (Keyboard.RIGHT && this.x < this.world.level.level_end_x) {
        this.moveRight();
        this.otherDirection = false;
      }

      if (Keyboard.LEFT && this.x > 0) {
        this.moveLeft();
        this.otherDirection = true;
      }

      if (Keyboard.SPACE) {
        if (!this.isAboveGround() && this.energy > 0) {
          AudioHub.playSound(AudioHub.CHARACTER.jump, false);
          this.jump();
        }
      }

      this.world.camera_x = -this.x + 100;
    }, 1000 / 60);
  }

  animateImage() {
    IntervalHub.startInterval(() => {
      if (this.isHurt()) {
        AudioHub.playSound(AudioHub.CHARACTER.damage);
        this.playAnimation(ImageHub.CHARACTER.hurt);
      } else if (this.isDead()) {
        if (this.DEAD_FLAG == false) {
          AudioHub.playSound(AudioHub.CHARACTER.dead);
          this.DEAD_FLAG = this.playDeadAnimation(ImageHub.CHARACTER.dead);
        }
      } else if (this.isAboveGround()) {
        this.playAnimation(ImageHub.CHARACTER.jumping);
        AudioHub.stopSound(AudioHub.CHARACTER.run, true);
      } else if (Keyboard.RIGHT || Keyboard.LEFT) {
        this.speed = 4;
        AudioHub.playSound(AudioHub.CHARACTER.run, true);
        this.playAnimation(ImageHub.CHARACTER.walking);
      } else {
        this.playAnimation(ImageHub.CHARACTER.idle);
      }
    }, 120);
  }

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

  isHurt() {
    let timepassed = new Date().getTime() - this.lastHit;
    timepassed = timepassed / 1000;
    return timepassed < 2;
  }

  isAboveGround() {
    if (this.y < 235) {
      this.speed = 2;
      return true;
    } else return false;
  }

  // #endregion
}
