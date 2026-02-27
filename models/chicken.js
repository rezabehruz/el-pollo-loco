class Chicken extends MovableObject{
    y = 95;
    width = 50;
    height = 40;
    constructor(){
        super().loadImage("../img/3_enemies_chicken/chicken_normal/1_walk/1_w.png");

        this.x = 90 + Math.random() * 150;
    }

}