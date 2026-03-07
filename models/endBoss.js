import { MovableObject } from "./movable-object.js";
import { ImageHub } from "./manager-models/image-hub.js";
import { IntervalHub } from "./manager-models/interval-hub.js";


export class EndBoss extends MovableObject {
  // #region Properties
  height = 200;
  width = 200;
  x = 2400;
  y = 230;

  // #endregion

  // #region Constructor
  constructor() {
    super().loadImages(ImageHub.ENDBOSS.alert);

    this.animate();
  }

  // #endregion

  // #region Methods
  animate() {
    IntervalHub.startInterval(
      () => this.playAnimation(ImageHub.ENDBOSS.alert),
      300,
    );
  }

  // #endregion
}
