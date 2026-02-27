class MovableObject{

    x = 10;
    y = 70;
    width = 70;
    height = 50;
    img = new Image();

    loadImage(path){
        this.img.src = path;
    }

    moveRight(){
        console.log("Move to right!");
    }
}