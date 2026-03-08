import { MovableObject } from "./movable-object.js";
import { ImageHub } from "./manager-models/image-hub.js";
import { IntervalHub } from "./manager-models/interval-hub.js";

export class Character extends MovableObject {
  // #region Properties
  speed = 3;
  x = 20;
  y = 140;
  height = 180;
  width = 100;

  offset = {
    top: 80,
    right: 30,
    bottom: 10,
    left: 20,
  };

  coins = 0;
  bottles = 0;

  // #endregion

  // #region Constructor
  constructor() {
    super().loadImage("./img/2_character_pepe/2_walk/W-21.png");
    this.loadImages(ImageHub.CHARACTER.hurt);
    this.loadImages(ImageHub.CHARACTER.dead);
    this.loadImages(ImageHub.CHARACTER.jumping);
    this.loadImages(ImageHub.CHARACTER.walking);
    this.loadImages(ImageHub.CHARACTER.idle);

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
      if (this.isHurt()) this.playAnimation(ImageHub.CHARACTER.hurt);
      else if (this.isDead()) {
        if (this.animationFlag == false) {
          this.animationFlag = this.playDeadAnimation(ImageHub.CHARACTER.dead);
        }
      } else if (this.isAboveGround())
        this.playAnimation(ImageHub.CHARACTER.jumping);
      else if (Keyboard.RIGHT || Keyboard.LEFT)
        this.playAnimation(ImageHub.CHARACTER.walking);
      else this.playAnimation(ImageHub.CHARACTER.idle);
    }, 120);
  }

  // #endregion
}
