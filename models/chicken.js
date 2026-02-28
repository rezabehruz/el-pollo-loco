class Chicken extends MovableObject{
    y = 95;
    width = 50;
    height = 40;
    constructor(){
        super().loadImages(ImagHub.CHICKEN_WALKING);
        this.x = 90 + Math.random() * 150;

        this.animate();
    }

    animate(){
        setInterval(() => {
            let i = this.currentImg % ImagHub.CHICKEN_WALKING.length;
            this.img = this.imageCache[ImagHub.CHICKEN_WALKING[i]];
            this.currentImg++;
        }, 300);
    }

}