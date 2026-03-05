class Chicken extends MovableObject {

  // #region Properties
  y = 340;
  width = 60;
  height = 80;

  // #endregion


  // #region Constructor
  constructor() {
    super().loadImages(ImageHub.CHICKEN.WALKING);
    this.x = 500 + Math.random() * 1800 ;
    this.speed = 0.15 + Math.random() * 0.25;

    this.animate();
  }

  // #endregion


// #region Methods
  animate() {
    IntervalHub.startInterval(() => this.moveLeft(), 1000 / 60);

    IntervalHub.startInterval(
      () => this.playAnimation(ImageHub.CHICKEN.WALKING),
      300,
    );
  }

  // #endregion
}
