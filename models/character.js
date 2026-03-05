class Character extends MovableObject {
  speed = 5;
  x = 20;
  y = 140;
  height = 180;
  width = 100;

  constructor() {
    super().loadImage("../img/2_character_pepe/2_walk/W-21.png");
    this.loadImages(ImageHub.CHARACTER.HURT);
    this.loadImages(ImageHub.CHARACTER.DEAD);
    this.loadImages(ImageHub.CHARACTER.JUMPING);
    this.loadImages(ImageHub.CHARACTER.WALKING);
    this.loadImages(ImageHub.CHARACTER.IDLE);

    this.applyGravity();

    this.animate();
  }

  animate() {
    IntervalHub.startInterval(() => {
      if (this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x) {
        this.moveRight();
        this.otherDirection = false;
      }

      if (this.world.keyboard.LEFT && this.x > 0) {
        this.moveLeft();
        this.otherDirection = true;
      }

      if (this.world.keyboard.UP) {
        this.jump();
      }

      this.world.camera_x = -this.x + 100;
    }, 1000 / 60);

    IntervalHub.startInterval(() => {
      if (this.isHurt()) this.playAnimation(ImageHub.CHARACTER.HURT);
      else if (this.isDead()) {
        if (this.animationFlag == false) {
          this.animationFlag = this.playDeadAnimation(ImageHub.CHARACTER.DEAD);
        }
      } else if (this.isAboveGround())
        this.playAnimation(ImageHub.CHARACTER.JUMPING);
      else if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT)
        this.playAnimation(ImageHub.CHARACTER.WALKING);
      else this.playAnimation(ImageHub.CHARACTER.IDLE);
    }, 1000 / 25);
  }
}
