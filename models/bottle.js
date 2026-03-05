class Bottle extends DrawableObject {
  // #region Properties
  y = 350;
  width = 70;
  height = 70;
  static IMAGE_INDEX = 0;

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
    this.x = 1000 + Math.random() * 1200;
  }

  //   #endregion

  // region Methods

  // endregion
}
