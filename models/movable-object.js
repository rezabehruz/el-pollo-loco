class MovableObject{

    x = 20;
    y = 240;
    width = 100;
    height = 300;

    img = new Image();
    imageCache = {};
    currentImg = 0;

    speed = 0.15;
    otherDirection = false;

    loadImage(path){
        this.img.src = path;
    }

    loadImages(imgArr){
        imgArr.forEach( imgPath => {
            let img = new Image();
            img.src = imgPath;
            this.imageCache[imgPath] = img;
        });
    }

    moveLeft(){
            setInterval(() => {
      this.x -= this.speed;
    }, 1000 / 60);
    }

    moveRight(){
        console.log("Move to right!");
    }
}