import { MovableObject } from "./movable-object.js";
import { ImageHub } from "./manager-models/image-hub.js";
import { IntervalHub } from "./manager-models/interval-hub.js";
import { AudioHub } from "./manager-models/audio-hub.js";

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
  constructor() {
    super();
    this.loadImages(ImageHub.CHICKEN.dead);
    this.loadImages(ImageHub.CHICKEN.walking);
    this.x = 700 + Math.random() * 1800;
    this.speed = this.speed + Math.random() * 0.25;

    this.animate();
  }

  // #endregion

  // #region Methods
  animate() {
    IntervalHub.startInterval(() => this.moveLeft(), 1000 / 60);

    IntervalHub.startInterval(() => {
      if (this.isDead()) this.playAnimation(ImageHub.CHICKEN.dead);
      else this.playAnimation(ImageHub.CHICKEN.walking);
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
