class Cloud extends MovableObject {
  y = 10;
  width = 190;
  height = 110;
  speed = 0.15;

  constructor() {
    super().loadImage(ImagHub.BACKGROUND.CLOUDS[0]);

    this.x = Math.random() * 500;
    this.animate();
  }

  animate() {
    IntervalHub.startInterval(()=> this.moveLeft() , 1000/60)
    
  }
}
