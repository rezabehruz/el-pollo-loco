class MovableObject{

    x = 20;
    y = 70;
    width = 60;
    height = 60;
    img = new Image();

    loadImage(path){
        this.img.src = path;
    }

    moveRight(){
        console.log("Move to right!");
    }
}