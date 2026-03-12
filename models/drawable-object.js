export class DrawableObject {
  // #region Properties
  x;
  y;
  width;
  height;

  rX;
  rY;
  rWidth;
  rHeight;

  img = new Image();
  imageCache = {};
  currentImg = 0;
  DEAD_FLAG = false;

  otherDirection = false;

  offset = {
    top: "",
    right: "",
    bottom: "",
    left: "",
  };

  // #endregion

  // #region Methods
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

  getRealFrame() {
    this.rX = this.x + this.offset.left;
    this.rY = this.y + this.offset.top;
    this.rWidth = this.width - this.offset.left - this.offset.right;
    this.rHeight = this.height - this.offset.top - this.offset.bottom;
  }

  drawFrame(ctx) {
    ctx.beginPath();
    ctx.lineWidth = "5";
    ctx.strokeStyle = "blue";
    ctx.rect(this.rX, this.rY, this.rWidth, this.rHeight);
    ctx.stroke();
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

  // #endregion
}
