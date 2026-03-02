class MovableObject {
  x = 20;
  y = 240;
  width = 100;
  height = 300;

  img = new Image();
  imageCache = {};
  currentImg = 0;

  speed = 0.15;
  otherDirection = false;

  speedY = 0;
  acceleration = 2;

  applyGravity() {
    IntervalHub.startInterval(() => {
      if (this.isAboveGround() || this.speedY > 0) {
        this.y -= this.speedY;
        this.speedY -= this.acceleration;
      }
    }, 1000/25);
  }

  isAboveGround() {
    return this.y < 240;
  }

  loadImage(path) {
    this.img.src = path;
  }

  loadImages(imgArr) {
    imgArr.forEach((imgPath) => {
      let img = new Image();
      img.src = imgPath;
      this.imageCache[imgPath] = img;
    });
  }

  moveLeft() {
    this.x -= this.speed;
  }

  moveRight() {
    this.x += this.speed;
  }

  playAnimation(images) {
    let i = this.currentImg % images.length;
    this.img = this.imageCache[images[i]];
    this.currentImg++;
  }
}
