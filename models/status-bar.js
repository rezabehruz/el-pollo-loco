class StatusBar extends DrawableObject {
  width = 200;
  height = 60;
  percentage;
  images;

  constructor(x_, y_, percentage_, images_) {
    super();
    this.x = x_;
    this.y = y_;
    this.percentage = percentage_;
    this.images = images_;
    this.loadImages(images_);
    this.setPercentage(percentage_);
  }

  setPercentage(percentage) {
    this.percentage = percentage;
    let path = this.images[this.resolveImageIndex()];
    this.img = this.imageCache[path];
  }

  resolveImageIndex() {
    if (this.percentage > 80) return 5;
    else if (this.percentage > 60) return 4;
    else if (this.percentage > 40) return 3;
    else if (this.percentage > 20) return 2;
    else if (this.percentage > 0) return 1;
    else return 0;
  }
}
