class Character extends MovableObject {
  // #region Properties
  speed = 3;
  x = 20;
  y = 140;
  height = 180;
  width = 100;

  // #endregion

  // #region Constructor
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

  // #endregion

  // #region Methods
  animate() {
    IntervalHub.startInterval(() => {
      if (Keyboard.RIGHT && this.x < this.world.level.level_end_x) {
        this.moveRight();
        this.otherDirection = false;
      }

      if (Keyboard.LEFT && this.x > 0) {
        this.moveLeft();
        this.otherDirection = true;
      }

      if (Keyboard.SPACE) {
        if (!this.isAboveGround()) this.jump();
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
      else if (Keyboard.RIGHT || Keyboard.LEFT)
        this.playAnimation(ImageHub.CHARACTER.WALKING);
      else this.playAnimation(ImageHub.CHARACTER.IDLE);
    }, 120);
  }

  // #endregion
}
