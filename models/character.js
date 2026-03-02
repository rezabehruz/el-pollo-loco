class Character extends MovableObject {
  world;
  speed = 3;
  height = 180;
  width = 100;


  constructor() {
    super().loadImage("../img/2_character_pepe/2_walk/W-21.png");
    this.loadImages(ImagHub.CHARACTER_WALKING);

    this.animate();
  }

  animate() {

    setInterval(() => {
      if (this.world.keyboard.RIGHT) {
        this.x += this.speed;
        this.otherDirection = false;
      }

      if(this.world.keyboard.LEFT){
        this.x -= this.speed;
        this.otherDirection = true;
      }
    }, 1000 / 60);

    setInterval(() => {
      if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) {
        let i = this.currentImg % ImagHub.CHARACTER_WALKING.length;
        this.img = this.imageCache[ImagHub.CHARACTER_WALKING[i]];
        this.currentImg++;
      }
    }, 50);
  }

  jump() {}
}
