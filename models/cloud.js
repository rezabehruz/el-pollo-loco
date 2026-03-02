class Cloud extends MovableObject {
  y = 10;
  width = 190;
  height = 110;
  speed = 0.15;

  constructor() {
    super().loadImage(ImagHub.BACKGROUND.CLOUDS[0]);

    this.x = Math.random() * 100;
    this.animate();
  }

  animate() {
    this.moveLeft();
  }
}
