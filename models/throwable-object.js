class ThrowableObject extends MovableObject {
  // #region Properties
  x;
  y;
  width = 50;
  height = 60;
  speedY;

  // #endregion

  // #region Constructor
  constructor(x_, y_) {
    super();
    this.x = x_;
    this.y = y_;
    this.loadImage("img/6_salsa_bottle/salsa_bottle.png");
    this.trow();
  }

  // #endregion

  // #region Methods
  trow() {
    this.speedY = 30;
    this.applyGravity();

    IntervalHub.startInterval(() => (this.x += 8), 25);
  }

  // #endregion
}
