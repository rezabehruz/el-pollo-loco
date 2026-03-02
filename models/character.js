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
    IntervalHub.startInterval(() => {
      if (this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x) {
        this.x += this.speed;
        this.otherDirection = false;
      }

      if (this.world.keyboard.LEFT && this.x > 0) {
        this.x -= this.speed;
        this.otherDirection = true;
      }

      this.world.camera_x = -this.x + 100;
    }, 1000 / 60);

    IntervalHub.startInterval(() => {
      if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT)
        this.playAnimation(ImagHub.CHARACTER_WALKING);
    }, 50);
  }

  jump() {}
}
