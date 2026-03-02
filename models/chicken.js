class Chicken extends MovableObject {
  y = 340;
  width = 60;
  height = 80;
  constructor() {
    super().loadImages(ImagHub.CHICKEN_WALKING);
    this.x = 90 + Math.random() * 150;
    this.speed = 0.15 + Math.random() * 0.25;

    this.animate();
  }

  animate() {
    this.moveLeft();
    IntervalHub.startInterval(()=> this.playAnimation(ImagHub.CHICKEN_WALKING), 300);
  }
}
