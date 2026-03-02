class EndBoss extends MovableObject {
  height = 200;
  width = 200;
  x = 500;
  y = 230;
  constructor() {
    super().loadImages(ImagHub.ENDBOSS.ALERT);

    this.animate();
  }

  animate() {
    IntervalHub.startInterval(
      () => this.playAnimation(ImagHub.ENDBOSS.ALERT),
      300,
    );
  }
}
