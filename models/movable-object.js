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
  energy = 100;
  lastHit = 0;

  hit() {
    this.energy -= 5;
    if (this.energy < 0) this.energy = 0;
    else this.lastHit = new Date().getTime();
  }

  isHurt() {
    let timepassed = new Date().getTime() - this.lastHit;
    timepassed = timepassed / 1000;
    return timepassed < 2;
  }

  isDead() {
    return this.energy == 0;
  }

  applyGravity() {
    IntervalHub.startInterval(() => {
      if (this.isAboveGround() || this.speedY > 0) {
        this.y -= this.speedY;
        this.speedY -= this.acceleration;
      }
    }, 1000 / 25);
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

  draw(ctx) {
    ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
  }

  drawFrame(ctx) {
    if (this instanceof Character || this instanceof Chicken) {
      ctx.beginPath();
      ctx.lineWidth = "5";
      ctx.strokeStyle = "blue";
      ctx.rect(this.x, this.y, this.width, this.height);
      ctx.stroke();
    }
  }

  isColliding(obj) {
    return (
      this.x + this.width > obj.x &&
      this.y + this.height > obj.y &&
      this.x < obj.x + obj.width &&
      this.y < obj.y + obj.height
    );
  }
}
