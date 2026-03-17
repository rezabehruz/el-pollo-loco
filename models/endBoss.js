import { MovableObject } from "./movable-object.js";
import { ImageHub } from "./manager-models/image-hub.js";
import { IntervalHub } from "./manager-models/interval-hub.js";
import { AudioHub } from "./manager-models/audio-hub.js";

// TODO statusbar for EndBoss

export class EndBoss extends MovableObject {
  // #region Properties
  height = 200;
  width = 200;
  x = 2400;
  y = 240;
  speed = 1.5;

  offset = {
    top: 50,
    right: 10,
    bottom: 50,
    left: 10,
  };

  // #endregion

  // #region Constructor
  constructor() {
    super().loadImages(ImageHub.ENDBOSS.walk);
    this.loadImages(ImageHub.ENDBOSS.hurt);
    this.loadImages(ImageHub.ENDBOSS.dead);

    this.animate();
  }

  // #endregion

  // #region Methods
  // FIXME Endboss animation should be beautifull
  animate() {
    IntervalHub.startInterval(() => {
      this.moveLeft();
    }, 1000 / 25);

    IntervalHub.startInterval(() => {
      if (this.isHurt()) this.playAnimation(ImageHub.ENDBOSS.hurt);
      else if (this.isDead()) {
        if (!this.DEAD_FLAG)
          this.DEAD_FLAG = this.playDeadAnimation(ImageHub.ENDBOSS.dead);
      } else this.playAnimation(ImageHub.ENDBOSS.walk);
    }, 300);
  }

  killed() {
    AudioHub.playSound(AudioHub.CHICKEN.dead, false);
    this.speed = 0;
    this.y = 300;
  }

  hit() {
    this.energy -= 25;
    
    if(this.energy == 0) this.killed();
        
    if (this.energy > 0) this.lastHit = new Date().getTime();
  }

  isHurt() {
    let timepassed = new Date().getTime() - this.lastHit;
    timepassed = timepassed / 1000;
    return timepassed < 1;
  }

  // #endregion
}
