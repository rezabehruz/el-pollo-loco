/**
 * creates a new DrawableObject. 
 * @class
 */
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

  /**
   * sets the image paths.
   * @param {string} path - the image path. 
   */
  loadImage(path) {
    this.img.src = path;
  }

  /**
   * Creates Images and saves it to imageCache with a key.
   * @param {Array} imgArr Array containing image paths
   */
  loadImages(imgArr) {
    imgArr.forEach((imgPath) => {
      let img = new Image();
      img.src = imgPath;
      this.imageCache[imgPath] = img;
    });
  }

  /**
   * Draw the image on the Canvas.
   * @param {contextOfCanvas} cts - the context of the Canvas 
   */
  draw(ctx) {
    ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
  }

  /**
   * Sets the real Frame of Object
   */
  getRealFrame() {
    this.rX = this.x + this.offset.left;
    this.rY = this.y + this.offset.top;
    this.rWidth = this.width - this.offset.left - this.offset.right;
    this.rHeight = this.height - this.offset.top - this.offset.bottom;
  }

  /**
   * Draws the real Frame of Object
   * @param {contextOfCanvas} ctx - the context of Canvas 
   */
  drawFrame(ctx) {
    ctx.beginPath();
    ctx.lineWidth = "5";
    ctx.strokeStyle = "blue";
    ctx.rect(this.rX, this.rY, this.rWidth, this.rHeight);
    ctx.stroke();
  }

  /**
   * Changes the images one by one.
   * @param {Array} images - Array of images
   */
  playAnimation(images) {
    let i = this.currentImg % images.length;
    this.img = this.imageCache[images[i]];
    this.currentImg++;
  }


  /**
   * Ensure that every image is displayed only once.
   * @param {Array} images - Array of images
   * @returns {boolean} - true or false
   */
  playDeadAnimation(images) {
    let i = this.currentImg % images.length;
    this.img = this.imageCache[images[i]];
    this.currentImg++;

    if (i == images.length - 1){
      this.img = new Image();
      this.img.src = '';
      return true;
    } 
    else return false;
  }

  // #endregion
}
