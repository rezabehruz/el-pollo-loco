class Coin extends DrawableObject {
  // #region Properties
  x;
  y = 200;
  width = 100;
  height = 100;

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

