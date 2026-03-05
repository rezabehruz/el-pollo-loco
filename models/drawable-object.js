class DrawableObject {
  x = 20;
  y = 240;
  width = 100;
  height = 300;

  img = new Image();
  imageCache = {};
  currentImg = 0;
  animationFlag = false;

  otherDirection = false;

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

  playAnimation(images) {
    let i = this.currentImg % images.length;
    this.img = this.imageCache[images[i]];
    this.currentImg++;
  }

  playDeadAnimation(images) {
    let i = this.currentImg % images.length;
    this.img = this.imageCache[images[i]];
    this.currentImg++;

    if (i == images.length - 1) return true;
    else return false;
  }
}
