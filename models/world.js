class World {
  character = new Character();
  enemies = [new Chicken(), new Chicken(), new Chicken()];
  clouds = [new Cloud()];
  backgrounds = [
    new BackgroundObject("../img/5_background/layers/3_third_layer/1.png", 0, 0, 300, 150),
    new BackgroundObject("../img/5_background/layers/2_second_layer/1.png", 0, 0, 300, 150),
    new BackgroundObject("../img/5_background/layers/1_first_layer/1.png", 0, 0, 300, 150)
  ];
  canvas;
  ctx;

  constructor(canvas_) {
    this.canvas = canvas_;
    this.ctx = canvas_.getContext("2d");
    this.draw();
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

  addObjectToMap(object) {
    object.forEach((obj) => {
      this.ctx.drawImage(
        obj.img,
        obj.x,
        obj.y,
        obj.width,
        obj.height,
      );
    });
  }

  addToMap(object) {
    this.ctx.drawImage(
      object.img,
      object.x,
      object.y,
      object.width,
      object.height,
    );
  }
}
