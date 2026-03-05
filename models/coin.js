class Coin extends DrawableObject {
  x;
  y = 200;
  width = 100;
  height = 100;

  constructor() {
    super();
    this.loadImages(ImageHub.COIN);
    this.x = 1000 + Math.random() * 1200;
    this.y = 100 + Math.random() * 200;

    this.animate();
  }

  animate(){
    IntervalHub.startInterval(()=> this.playAnimation(ImageHub.COIN) , 400)
  }
}
