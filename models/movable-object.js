class MovableObject{

    x = 20;
    y = 70;
    width = 60;
    height = 60;

    img = new Image();
    imageCache = {};
    currentImg = 0;

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
        
    }

    moveRight(){
        console.log("Move to right!");
    }
}