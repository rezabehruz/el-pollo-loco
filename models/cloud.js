class Cloud extends MovableObject {
  // #region Properties
  y = 10;
  width = 190;
  height = 110;
  speed = 0.15;

  // #endregion

  // #region Constructor
  constructor() {
    super().loadImage(ImageHub.CLOUDS[0]);

    this.x = Math.random() * 500;
    this.animate();
  }

  // #endregion

  // #region Methods
  animate() {
    IntervalHub.startInterval(() => this.moveLeft(), 1000 / 60);
  }

  // #endregion
}
