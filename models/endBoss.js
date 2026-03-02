class EndBoss extends MovableObject{
    height= 200;
    width= 200;
    x = 500;
    y = 230;
   constructor() {
    super().loadImages(ImagHub.ENDBOSS.ALERT);

    this.animate();
  }

  animate() {

    IntervalHub.startInterval(() => {
      let i = this.currentImg % ImagHub.ENDBOSS.ALERT.length;
      this.img = this.imageCache[ImagHub.ENDBOSS.ALERT[i]];
      this.currentImg++;
    }, 300);
    
  }
}