class World {
  canvas;
  ctx;
  level = level1;
  character = new Character();
  healthStatus = new StatusBar(40, 0, 100, ImageHub.STATUS_BAR.HEALTH);
  bottleStatus = new StatusBar(40, 40, 40, ImageHub.STATUS_BAR.BOTTLE);
  coinStatus = new StatusBar(40, 80, 40, ImageHub.STATUS_BAR.COIN);

  throwableObjects = [];

  camera_x = 0;

  constructor(canvas_) {
    this.canvas = canvas_;
    this.keyboard;
    this.ctx = canvas_.getContext("2d");
    this.draw();
    this.setWorld();
    this.run();
  }

  run() {
    IntervalHub.startInterval(() => {
      this.checkCollision();
      this.checkThrowObjects();
      this.checkCoinCollection();
    }, 200);
  }

  checkCoinCollection() {
    for (let i = 0; i < this.level.coins.length; i++) {
      if (this.character.isColliding(this.level.coins[i])) {
        this.level.coins.splice(i, 1);
        this.character.energy += 20;
        this.healthStatus.setPercentage(this.character.energy);
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
        this.healthStatus.setPercentage(this.character.energy);
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
    this.addToMap(this.character);

    this.ctx.translate(-this.camera_x, 0);
    // objects in fixed Position
    this.addToMap(this.healthStatus);
    this.addToMap(this.bottleStatus);
    this.addToMap(this.coinStatus);
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
    object.drawFrame(this.ctx);

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
}
