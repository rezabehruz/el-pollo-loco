import { DrawableObject } from "./drawable-object.js";

/**
 * Creates a new BackgroundObject
 * @class
 */
export class BackgroundObject extends DrawableObject {
  // #region Properties
  y = 0;
  width = 720;
  height = 480;

  // #endregion

  /**
   * @constructor
   * @param {string} path - source of Image 
   * @param {number} x_ - x-coordinate
   */
  constructor(path, x_) {
    super();
    this.loadImage(path);
    this.x = x_;
  }

}
