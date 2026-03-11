import { MovableObject } from "./movable-object.js";
import { ImageHub } from "./manager-models/image-hub.js";
import { IntervalHub } from "./manager-models/interval-hub.js";

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
    super().loadImages(ImageHub.CHICKEN.walking);
    this.x = 700 + Math.random() * 1800 ;
    this.speed = this.speed + Math.random() * 0.25;

    this.animate();
  }

  // #endregion


// #region Methods
  animate() {
    IntervalHub.startInterval(() => this.moveLeft(), 1000 / 60);

    IntervalHub.startInterval(
      () => this.playAnimation(ImageHub.CHICKEN.walking),
      300,
    );
  }

  // #endregion
}
