import { DrawableObject } from "./drawable-object.js";
import { ImageHub } from "./manager-models/image-hub.js";

export class Bottle extends DrawableObject {
  // #region Properties
  y = 350;
  width = 70;
  height = 70;
  static IMAGE_INDEX = 0;

  offset = {
    top: 10,
    right:15,
    bottom: 10,
    left: 15,
  };

  //   #endregion

  // #region Constructor
  constructor() {
    super();

    if (Bottle.IMAGE_INDEX == 1) {
      Bottle.IMAGE_INDEX = 0;
    } else {
      Bottle.IMAGE_INDEX = 1;
    }

    this.loadImage(ImageHub.BOTTLE.onGround[Bottle.IMAGE_INDEX]);
    this.x = 100 + Math.random() * 1200;
  }

  //   #endregion

  // region Methods

  // endregion
}
