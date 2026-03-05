class BackgroundObject extends DrawableObject {

  // #region Properties
  y = 0;
  width = 720;
  height = 480;

  // #endregion


  // #region Constructor
  constructor(path, x_) {
    super().loadImage(path);
    this.x = x_;
  }

  // #endregion


  // #region Methods

  // #endregion
}
