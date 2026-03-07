import { level1 } from "../js/levels/level1.js";
import { Character } from "./character.js";
import { Chicken } from "./chicken.js";
import { IntervalHub } from "./manager-models/interval-hub.js";

export class World {
  // #region Properties
  canvas;
  ctx;
  level = level1;
  character = new Character();

  throwableObjects = [];
  camera_x = 0;

  // #endregion

  // #region Constructor
  constructor(canvas_) {
    this.canvas = canvas_;
    this.ctx = canvas_.getContext("2d");
    this.draw();
    this.setWorld();
    this.run();
  }

  // #endregion

  // #region Methods
  run() {
    IntervalHub.startInterval(() => {
      this.checkCollision();
      this.checkThrowObjects();
      this.checkCoinCollection();
      this.checkBottleCollection();
    }, 200);
  }

  checkBottleCollection() {}

  checkCoinCollection() {
    for (let i = 0; i < this.level.coins.length; i++) {
      if (this.character.isColliding(this.level.coins[i])) {
        this.level.coins.splice(i, 1);
        this.character.energy += 20;
        this.level.healthStatus.setPercentage(this.character.energy);
      }
    }
  }

  checkThrowObjects() {
    if (Keyboard.D == true) {
      let bottle = new ThrowableObject(
        this.character.x + 50,
        this.character.y + 50,
      );
      this.throwableObjects.push(bottle);
    }
  }

  checkCollision() {
    this.level.enemies.forEach((enemy) => {
      if (this.character.isColliding(enemy)) {
        this.character.hit();
        this.level.healthStatus.setPercentage(this.character.energy);
      }
    });
  }

  draw() {
    this.ctx.clearRect(0, 0, canvas.width, canvas.height);
    this.ctx.translate(this.camera_x, 0);
    this.addObjectToMap(this.level.backgrounds);
    this.addObjectToMap(this.level.clouds);
    this.addObjectToMap(this.level.enemies);
    // this.addObjectToMap(this.throwableObjects);
    this.addObjectToMap(this.level.coins);
    this.addObjectToMap(this.level.bottles);
    this.addToMap(this.character);

    this.ctx.translate(-this.camera_x, 0);
    // objects in fixed Position
    this.addToMap(this.level.healthStatus);
    this.addToMap(this.level.bottleStatus);
    this.addToMap(this.level.coinStatus);
    this.ctx.translate(+this.camera_x, 0);

    this.ctx.translate(-this.camera_x, 0);

    requestAnimationFrame(() => this.draw());
  }

  setWorld() {
    this.character.world = this;
  }

  addObjectToMap(objectArr) {
    objectArr.forEach((obj) => {
      this.addToMap(obj);
    });
  }

  addToMap(object) {
    if (object.otherDirection) {
      this.flipImage(object);
    }

    object.draw(this.ctx);

    if (object instanceof Character || object instanceof Chicken) {
      object.drawFrame(this.ctx);
    }

    if (object.otherDirection) {
      this.flipImageBack(object);
    }
  }

  flipImage(object) {
    this.ctx.save();
    this.ctx.translate(object.width, 0);
    this.ctx.scale(-1, 1);
    object.x = object.x * -1;
  }

  flipImageBack(object) {
    object.x = object.x * -1;
    this.ctx.restore();
  }

  // #endregion
}
