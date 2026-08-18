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
import { DrawableObject } from "./drawable-object.js";

/**
 *
 * Creates a new World Object
 * @class
 */
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
  ENDBOSS_ENTRANCE = false;
  // #endregion

  // #endregion

  /**
   * Initialises the Properties
   * Adds Events to the Keyboard and Touchevents
   * Draws the objects on the canvas
   *
   * @param {Canvas} canvas_
   */
  constructor(canvas_) {
    this.canvas = canvas_;
    this.ctx = canvas_.getContext("2d");
    this.level = level1();
    Keyboard.addEvents();
    Keyboard.addTouchEvents();
    AudioHub.playSound(AudioHub.START_GAME, false);
    AudioHub.playSound(AudioHub.GAME_BACKGROUND, false);
    this.draw();
    this.setWorld();
    this.run();
  }

  // #region Methods

  /**
   * Starts a new interval
   * Calls the methods
   */
  run() {
    IntervalHub.startInterval(() => {
      this.checkThrowObjEnemiesCollision();
      this.checkEnemyCollision();
      this.checkEndBossEntrance();
      this.checkThrowObjects();
      this.checkCoinCollection();
      this.checkBottleCollection();
    }, 1000 / 60);
  }

  /**
   *
   * Checks for Collision between Enemies and ThrowableObj
   */
  checkThrowObjEnemiesCollision() {
    this.throwableObjects.forEach((obj, objIndex) => {
      this.level.enemies.forEach((enemy) => {
        this.checkThrowObjEnemyCollision(obj, enemy);
      });

      if (!obj.isAboveGround()) {
        if (!obj.IS_COLLIDE) AudioHub.playSound(AudioHub.THROWABLE.broken, false);

        this.throwableObjects.splice(objIndex, 1);
      }
    });
  }

  /**
   *
   * Checks for Collision between Enemy and ThrowableObj
   */
  checkThrowObjEnemyCollision(obj, enemy) {
    if (obj.isColliding(enemy) && enemy.energy != 0 && !obj.IS_COLLIDE) {
      if (enemy instanceof EndBoss) {
        enemy.hit();
        this.level.endBossHealthStatus.setPercentage(enemy.energy);
      } else enemy.killed();

      obj.IS_COLLIDE = true;
    }
  }

  /**
   *
   * Checks for Endboss Entrance
   */
  checkEndBossEntrance() {
    let x = this.character.x + 500;
    this.level.enemies.forEach((enemy) => {
      if (!this.ENDBOSS_ENTRANCE) {
        if (enemy instanceof EndBoss && x > enemy.x) this.ENDBOSS_ENTRANCE = true;
      }
    });
  }

  /**
   *
   * Checks the Bottle to collect
   */
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

  /**
   *
   * Checks the Coin to collect
   */
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

  /**
   *
   * Checks wether the Object should be thrown
   */
  checkThrowObjects() {
    if (Keyboard.D == true && this.character.bottles > 0 && !World.OBJ_THROWED) {
      World.OBJ_THROWED = true;
      let obj = new ThrowableObject(this.character.x + 50, this.character.y + 50, this.character.otherDirection);
      this.throwableObjects.push(obj);
      this.character.bottles -= 20;
      this.level.bottleStatus.setPercentage(this.character.bottles);
    }
  }

  /**
   *
   * Checks for collision between Character and Enemies
   */
  checkEnemyCollision() {
    this.level.enemies.forEach((enemy) => {
      if (this.character.isColliding(enemy)) {
        if (enemy.isDead()) return;
        else if (this.character.isKilling(enemy)) {
          if (enemy instanceof EndBoss) {
            enemy.hit();
            this.level.endBossHealthStatus.setPercentage(enemy.energy);
          } else enemy.killed();
        } else {
          this.character.hit();
          this.level.healthStatus.setPercentage(this.character.energy);
        }
      }
    });
  }

  /**
   *
   * Draws the objects on the canvas
   */
  draw() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.ctx.translate(this.camera_x, 0);
    this.addObjectToMap(this.level.backgrounds);
    this.addObjectToMap(this.level.clouds);
    this.addObjectToMap(this.level.enemies);
    this.addObjectToMap(this.throwableObjects);
    this.addObjectToMap(this.level.coins);
    this.addObjectToMap(this.level.bottles);
    this.addToMap(this.character);

    this.drawFixedObjects();

    requestAnimationFrame(() => this.draw());
  }

  /**
   *
   * Draws the fixed objects on the canvas
   */
  drawFixedObjects() {
    this.ctx.translate(-this.camera_x, 0);
    // objects in fixed Position
    if (this.ENDBOSS_ENTRANCE) this.addToMap(this.level.endBossHealthStatus);
    this.addToMap(this.level.healthStatus);
    this.addToMap(this.level.bottleStatus);
    this.addToMap(this.level.coinStatus);
  }

  /**
   *
   * Sets the world property of Character
   */
  setWorld() {
    this.character.world = this;
  }

  /**
   *
   * Draws objects on the canvas
   * @param {DrawableObject[]} objectArr
   */
  addObjectToMap(objectArr) {
    objectArr.forEach((obj) => {
      this.addToMap(obj);
    });
  }

  /**
   *
   * Draws object on the canvas
   * @param {DrawableObject} object
   */
  addToMap(object) {
    if (object.otherDirection && object.energy > 0) this.flipImage(object);

    object.draw(this.ctx);
    if (object.otherDirection && object.energy > 0) this.flipImageBack(object);
    if (
      object instanceof Chicken ||
      object instanceof EndBoss ||
      object instanceof Coin ||
      object instanceof Bottle ||
      object instanceof ThrowableObject ||
      object instanceof SmallChicken
    )
      object.getRealFrame();

    if (object instanceof Character) object.getRealFrameInDirection(object);
  }

  /**
   *
   * Saves the context
   * Changes the x-axis coordinate
   * Changes the x-axis to negative
   * @param {DrawableObject} object
   */
  flipImage(object) {
    this.ctx.save();
    this.ctx.translate(object.width, 0);
    this.ctx.scale(-1, 1);
    object.x = object.x * -1;
  }

  /**
   *
   * Changes the x-axis to positive
   * Restores the context
   * @param {DrawableObject} object
   */
  flipImageBack(object) {
    object.x = object.x * -1;
    this.ctx.restore();
  }

  // #endregion
}
