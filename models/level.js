class Level {
  // #region Properties
  backgrounds;
  clouds;
  enemies;
  coins;
  bottles_;
  level_end_x = 2267;

  // #endregion

  // #region Constructor
  constructor(
    backgrounds_,
    clouds_,
    enemies_,
    coins_,
    bottles_,
    healthStatus_,
    bottleStatus_,
    coinStatus_,
  ) {
    this.backgrounds = backgrounds_;
    this.clouds = clouds_;
    this.enemies = enemies_;
    this.coins = coins_;
    this.bottles = bottles_;
    this.healthStatus = healthStatus_;
    this.bottleStatus = bottleStatus_;
    this.coinStatus = coinStatus_;
  }

  // #endregion

  // #region Methods
  // #endregion
}
