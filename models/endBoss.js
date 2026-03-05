class EndBoss extends MovableObject {
  height = 200;
  width = 200;
  x = 2400;
  y = 230;
  
  constructor() {
    super().loadImages(ImageHub.ENDBOSS.ALERT);

    this.animate();
  }

  animate() {
    IntervalHub.startInterval(
      () => this.playAnimation(ImageHub.ENDBOSS.ALERT),
      300,
    );
  }
}
