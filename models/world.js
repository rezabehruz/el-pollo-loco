import { level1 } from "../js/levels/level1.js";
import { Character } from "./character.js";
import { Chicken } from "./chicken.js";
import { EndBoss } from "./endBoss.js";
import { Coin } from "./coin.js";
import { Bottle } from "./bottle.js";
import { IntervalHub } from "./manager-models/interval-hub.js";
import { ThrowableObject } from "./throwable-object.js";
import { Keyboard } from "./manager-models/keyboard.js";
import { AudioHub } from "./manager-models/audio-hub.js";
import { SmallChicken } from "./small-chicken.js";

// FIXME Endscreen should beautifull showed and enemies come back, when x cordinate is end.

export class World {
  // #region Properties
  canvas;
  ctx;
  level;
  character = new Character();

  throwableObjects = [];
  camera_x = 0;

  // #region Flags
  OBJ_THROWED = false;
  // #endregion

  // #endregion

  // #region Constructor
  constructor(canvas_) {
    this.canvas = canvas_;
    this.ctx = canvas_.getContext("2d");
    this.level = level1();
    Keyboard.addEvents();
    Keyboard.addTouchEvents();
    AudioHub.playSound(AudioHub.START_GAME, false);
    this.draw();
    this.setWorld();
    this.run();
  }

  // #endregion

  // #region Methods
  run() {
    IntervalHub.startInterval(() => {
      this.checkThrowObjEnemyCollision();
      this.checkEnemyCollision();
      this.checkThrowObjects();
      this.checkCoinCollection();
      this.checkBottleCollection();
    }, 1000 / 60);
  }

  checkThrowObjEnemyCollision() {
    this.throwableObjects.forEach((obj, objIndex) => {
      this.level.enemies.forEach((enemy) => {
        if (obj.isColliding(enemy) && enemy.energy != 0 && !obj.IS_COLLIDE) {
          if (enemy instanceof EndBoss) enemy.hit();
          else enemy.killed();

          obj.IS_COLLIDE = true;
        }
      });

      if (!obj.isAboveGround()) {
        if (!obj.IS_COLLIDE)
          AudioHub.playSound(AudioHub.THROWABLE.broken, false);

        this.throwableObjects.splice(objIndex, 1);
      }
    });
  }

  checkBottleCollection() {
    this.level.bottles.forEach((bottle, index) => {
      if (this.character.isColliding(bottle)) {
        if (this.character.bottles < 100) {
          AudioHub.playSound(AudioHub.COLLECTIBLE.collectBottle, false);
          this.level.bottles.splice(index, 1);
          this.character.bottles += 20;
          this.level.bottleStatus.setPercentage(this.character.bottles);
        }
      }
    });
  }

  checkCoinCollection() {
    for (let i = 0; i < this.level.coins.length; i++) {
      if (this.character.isColliding(this.level.coins[i])) {
        AudioHub.playSound(AudioHub.COLLECTIBLE.collectCoin, false);
        this.level.coins.splice(i, 1);
        this.character.coins += 20;
        this.level.coinStatus.setPercentage(this.character.coins);
      }
    }
  }

  checkThrowObjects() {
    if (
      Keyboard.D == true &&
      this.character.bottles > 0 &&
      !World.OBJ_THROWED
    ) {
      World.OBJ_THROWED = true;
      let obj = new ThrowableObject(
        this.character.x + 50,
        this.character.y + 50,
        this.character.otherDirection,
      );
      this.throwableObjects.push(obj);
      this.character.bottles -= 20;
      this.level.bottleStatus.setPercentage(this.character.bottles);
    }
  }

  checkEnemyCollision() {
    this.level.enemies.forEach((enemy) => {
      if (this.character.isColliding(enemy)) {
        if (enemy.isDead()) return;
        else if (this.character.isKilling(enemy)) {
          if (enemy instanceof EndBoss) {
            enemy.hit();
          } else enemy.killed();
        } else {
          this.character.hit();
          this.level.healthStatus.setPercentage(this.character.energy);
        }
      }
    });
  }

  draw() {
    this.ctx.clearRect(0, 0, canvas.width, canvas.height);
    this.ctx.translate(this.camera_x, 0);
    this.addObjectToMap(this.level.backgrounds);
    this.addObjectToMap(this.level.clouds);
    this.addObjectToMap(this.level.enemies);
    this.addObjectToMap(this.throwableObjects);
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
    if (object.otherDirection && object.energy > 0) {
      this.flipImage(object);
    }

    object.draw(this.ctx);

    if (object.otherDirection && object.energy > 0) {
      this.flipImageBack(object);
    }

    if (
      object instanceof Character ||
      object instanceof Chicken ||
      object instanceof EndBoss ||
      object instanceof Coin ||
      object instanceof Bottle ||
      object instanceof ThrowableObject || object instanceof SmallChicken
    ) {
      object.getRealFrame();
      object.drawFrame(this.ctx);
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
