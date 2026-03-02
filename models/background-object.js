class BackgroundObject extends MovableObject {
  y = 0;
  width = 720;
  height = 480;

  constructor(path, x_) {
    super().loadImage(path);
    this.x = x_;
  }
}
