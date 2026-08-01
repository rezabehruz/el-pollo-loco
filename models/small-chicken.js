import { MovableObject } from "./movable-object.js";
import { ImageHub } from "./manager-models/image-hub.js";
import { IntervalHub } from "./manager-models/interval-hub.js";
import { AudioHub } from "./manager-models/audio-hub.js";

export class SmallChicken extends MovableObject {
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
  constructor() {
    super();
    this.loadImages(ImageHub.SMALL_CHICKEN.idle);
    this.loadImages(ImageHub.SMALL_CHICKEN.walking);
    this.loadImages(ImageHub.SMALL_CHICKEN.dead);
    this.x = 700 + Math.random() * 1800;
    this.speed = this.speed + Math.random() * 0.25;

    this.animate();
  }

  // #endregion

  // #region Methods
  animate() {
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

    IntervalHub.startInterval(() => {
      if (this.isDead()) this.playAnimation(ImageHub.SMALL_CHICKEN.dead);
      else if (this.speed == 0) this.playAnimation(ImageHub.SMALL_CHICKEN.idle);
      else this.playAnimation(ImageHub.SMALL_CHICKEN.walking);
    }, 300);
  }

  killed() {
    AudioHub.playSound(AudioHub.CHICKEN.dead, false);
    this.speed = 0;
    this.energy = 0;
    this.y = 350;
  }

  // #endregion
}
