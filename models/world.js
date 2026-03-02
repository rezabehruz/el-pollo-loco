class World {
  character = new Character();
  enemies = [new Chicken(), new Chicken(), new Chicken()];
  clouds = [new Cloud()];
  backgrounds = [
    new BackgroundObject("../img/5_background/layers/air.png", 0, 0, 720, 480),
    new BackgroundObject(
      "../img/5_background/layers/3_third_layer/1.png",
      0,
      0,
      720, 480
    ),
    new BackgroundObject(
      "../img/5_background/layers/2_second_layer/1.png",
      0,
      0,
      720, 480
    ),
    new BackgroundObject(
      "../img/5_background/layers/1_first_layer/1.png",
      0,
      0,
      720, 480
    ),
  ];
  canvas;
  ctx;
  keyboard;

  constructor(canvas_, keyboard_) {
    this.canvas = canvas_;
    this.keyboard = keyboard_;
    this.ctx = canvas_.getContext("2d");
    this.draw();
    this.setWorld();
  }

  draw() {
    this.ctx.clearRect(0, 0, canvas.width, canvas.height);

    this.addObjectToMap(this.backgrounds);
    this.addObjectToMap(this.clouds);
    this.addObjectToMap(this.enemies);
    this.addToMap(this.character);

    let self = this;
    requestAnimationFrame(function () {
      self.draw();
    });
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
