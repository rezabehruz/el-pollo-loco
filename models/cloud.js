class Cloud extends MovableObject {
    y = 10;
    width = 190;
    height = 110;
  constructor() {
    super().loadImage("../img/5_background/layers/4_clouds/1.png");

    this.x = Math.random() * 100;
    this.animate();
  }

  animate(){
    setInterval(() => {
      this.x -= 0.15;
    }, 1000 / 60);
  }
}
