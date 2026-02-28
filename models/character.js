class Character extends MovableObject{


   
    constructor(){
        // super().loadImage("../img/2_character_pepe/2_walk/W-21.png");
        super().loadImages(ImagHub.CHARACTER_WALKING);

        this.animate();
    }

    animate(){
        setInterval(() => {
            let i = this.currentImg % ImagHub.CHARACTER_WALKING.length;
            this.img = this.imageCache[ImagHub.CHARACTER_WALKING[i]];
            this.currentImg++;
        }, 300);
    }

    jump(){

    }
}

