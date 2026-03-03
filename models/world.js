class World {
  character = new Character();
  level = level1;
  canvas;
  ctx;
  keyboard;

  camera_x = 0;

  constructor(canvas_, keyboard_) {
    this.canvas = canvas_;
    this.keyboard = keyboard_;
    this.ctx = canvas_.getContext("2d");
    this.draw();
    this.setWorld();
    this.checkCollision();
  }

  checkCollision() {
    IntervalHub.startInterval(() => {
      this.level.enemies.forEach((enemy) => {
        if (this.character.isColliding(enemy))
          console.log(`Character is colliding with - ${enemy}`);
      });
    }, 1000);
  }

  draw() {
    this.ctx.clearRect(0, 0, canvas.width, canvas.height);
    this.ctx.translate(this.camera_x, 0);

    this.addObjectToMap(this.level.backgrounds);
    this.addObjectToMap(this.level.clouds);
    this.addObjectToMap(this.level.enemies);
    this.addToMap(this.character);

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
