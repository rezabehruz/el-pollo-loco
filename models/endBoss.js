class EndBoss extends MovableObject {
  // #region Properties
  height = 200;
  width = 200;
  x = 2400;
  y = 230;

  // #endregion

  // #region Constructor
  constructor() {
    super().loadImages(ImageHub.ENDBOSS.ALERT);

    this.animate();
  }

  // #endregion

  // #region Methods
  animate() {
    IntervalHub.startInterval(
      () => this.playAnimation(ImageHub.ENDBOSS.ALERT),
      300,
    );
  }

  // #endregion
}
