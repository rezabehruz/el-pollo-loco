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

  addObjectToMap(object) {
    object.forEach((obj) => {
      this.ctx.drawImage(obj.img, obj.x, obj.y, obj.width, obj.height);
    });
  }

  addToMap(object) {
    if (object.otherDirection) {
      this.ctx.save();
      this.ctx.translate(object.width, 0);
      this.ctx.scale(-1, 1);
      object.x = object.x * -1;
    }
    this.ctx.drawImage(
      object.img,
      object.x,
      object.y,
      object.width,
      object.height,
    );

    if (object.otherDirection) {
      object.x = object.x * -1;
      this.ctx.restore();
    }
  }
}
