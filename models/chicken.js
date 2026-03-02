class Chicken extends MovableObject {
  y = 340;
  width = 60;
  height = 80;
  constructor() {
    super().loadImages(ImagHub.CHICKEN_WALKING);
    this.x = 300 + Math.random() * 150;
    this.speed = 0.15 + Math.random() * 0.25;

    this.animate();
  }

  animate() {
    IntervalHub.startInterval(() => this.moveLeft(), 1000 / 60);

    IntervalHub.startInterval(
      () => this.playAnimation(ImagHub.CHICKEN_WALKING),
      300,
    );
  }
}
