class BackgroundObject extends MovableObject{

    x = 0;
    // y = 20;

 constructor(path, x_, y_, width_, height_) {
    super().loadImage(path);

    this.x = x_;
    this.y = y_;
    this.width = width_;
    this.height = height_;

    }
}