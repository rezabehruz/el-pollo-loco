import { DrawableObject } from "./drawable-object.js";
import { ImageHub } from "./manager-models/image-hub.js";
import { IntervalHub } from "./manager-models/interval-hub.js";

export class Coin extends DrawableObject {
  // #region Properties
  width = 100;
  height = 100;

    offset = {
    top: 30,
    right: 30,
    bottom: 30,
    left: 30,
  };

  // #endregion

  // #region Constructor
  constructor() {
    super();
    this.loadImages(ImageHub.COIN);
    this.x = 1000 + Math.random() * 1200;
    this.y = 100 + Math.random() * 200;

    this.animate();
  }

  // #endregion

  // #region Methods
  animate() {
    IntervalHub.startInterval(() => this.playAnimation(ImageHub.COIN), 400);
  }

  // #endregion
}

