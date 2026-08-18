import { MovableObject } from "./movable-object.js";
import { ImageHub } from "./manager-models/image-hub.js";
import { IntervalHub } from "./manager-models/interval-hub.js";

/**
 * Creates a new Cloud
 */
export class Cloud extends MovableObject {
  // #region Properties
  y = 10;
  width = 190;
  height = 110;
  speed = 0.15;

  // #endregion

  /**
   * Loads images.
   * Generate random x-coordinate
   * @constructor
   */
  constructor() {
    super().loadImage(ImageHub.CLOUDS[0]);

    this.x = Math.random() * 500;
    this.animate();
  }

  // #region Methods
  /**
   * Starts a new interval
   * Updates the x-coordinate
   */
  animate() {
    IntervalHub.startInterval(() => this.moveLeft(), 1000 / 60);
  }

  // #endregion
}
