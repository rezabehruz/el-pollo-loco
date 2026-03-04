class Level {
    backgrounds;
    clouds;
    enemies;
    level_end_x = 2267;

    constructor(backgrounds_, clouds_, enemies_, coins_){
        this.backgrounds = backgrounds_;
        this.clouds = clouds_;
        this.enemies = enemies_;
        this.coins = coins_;
    }
}