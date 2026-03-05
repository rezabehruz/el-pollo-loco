const level1 = new Level(
  [
    new BackgroundObject(ImageHub.BACKGROUND.AIR, -719),
    new BackgroundObject(ImageHub.BACKGROUND.THIRD_LAYER[0], -719),
    new BackgroundObject(ImageHub.BACKGROUND.SECOND_LAYER[0], -719),
    new BackgroundObject(ImageHub.BACKGROUND.FIRST_LAYER[0], -719),

    new BackgroundObject(ImageHub.BACKGROUND.AIR, 0),
    new BackgroundObject(ImageHub.BACKGROUND.THIRD_LAYER[1], 0),
    new BackgroundObject(ImageHub.BACKGROUND.SECOND_LAYER[1], 0),
    new BackgroundObject(ImageHub.BACKGROUND.FIRST_LAYER[1], 0),

    new BackgroundObject(ImageHub.BACKGROUND.AIR, 719),
    new BackgroundObject(ImageHub.BACKGROUND.THIRD_LAYER[0], 719),
    new BackgroundObject(ImageHub.BACKGROUND.SECOND_LAYER[0], 719),
    new BackgroundObject(ImageHub.BACKGROUND.FIRST_LAYER[0], 719),

    new BackgroundObject(ImageHub.BACKGROUND.AIR, 719 * 2),
    new BackgroundObject(ImageHub.BACKGROUND.THIRD_LAYER[1], 719 * 2),
    new BackgroundObject(ImageHub.BACKGROUND.SECOND_LAYER[1], 719 * 2),
    new BackgroundObject(ImageHub.BACKGROUND.FIRST_LAYER[1], 719 * 2),

    new BackgroundObject(ImageHub.BACKGROUND.AIR, 719 * 3),
    new BackgroundObject(ImageHub.BACKGROUND.THIRD_LAYER[0], 719 * 3),
    new BackgroundObject(ImageHub.BACKGROUND.SECOND_LAYER[0], 719 * 3),
    new BackgroundObject(ImageHub.BACKGROUND.FIRST_LAYER[0], 719 * 3),
  ],
  [new Cloud()],
  [new Chicken(), new Chicken(), new Chicken(), new EndBoss()],
  [new Coin(), new Coin(), new Coin()],
  [new Bottle(), new Bottle(), new Bottle()],
  new StatusBar(40, 0, 100, ImageHub.STATUS_BAR.health),
  new StatusBar(40, 40, 0, ImageHub.STATUS_BAR.bottle),
  new StatusBar(40, 80, 0, ImageHub.STATUS_BAR.coin),
);
