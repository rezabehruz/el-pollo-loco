const level1 = new Level(
  [
    new BackgroundObject(ImagHub.BACKGROUND.AIR, -719),
    new BackgroundObject(ImagHub.BACKGROUND.THIRD_LAYER[0], -719),
    new BackgroundObject(ImagHub.BACKGROUND.SECOND_LAYER[0], -719),
    new BackgroundObject(ImagHub.BACKGROUND.FIRST_LAYER[0], -719),

    new BackgroundObject(ImagHub.BACKGROUND.AIR, 0),
    new BackgroundObject(ImagHub.BACKGROUND.THIRD_LAYER[1], 0),
    new BackgroundObject(ImagHub.BACKGROUND.SECOND_LAYER[1], 0),
    new BackgroundObject(ImagHub.BACKGROUND.FIRST_LAYER[1], 0),

    new BackgroundObject(ImagHub.BACKGROUND.AIR, 719),
    new BackgroundObject(ImagHub.BACKGROUND.THIRD_LAYER[0], 719),
    new BackgroundObject(ImagHub.BACKGROUND.SECOND_LAYER[0], 719),
    new BackgroundObject(ImagHub.BACKGROUND.FIRST_LAYER[0], 719),

    new BackgroundObject(ImagHub.BACKGROUND.AIR, 719 * 2),
    new BackgroundObject(ImagHub.BACKGROUND.THIRD_LAYER[1], 719 * 2),
    new BackgroundObject(ImagHub.BACKGROUND.SECOND_LAYER[1], 719 * 2),
    new BackgroundObject(ImagHub.BACKGROUND.FIRST_LAYER[1], 719 * 2),

    new BackgroundObject(ImagHub.BACKGROUND.AIR, -719 * 3),
    new BackgroundObject(ImagHub.BACKGROUND.THIRD_LAYER[0], -719 * 3),
    new BackgroundObject(ImagHub.BACKGROUND.SECOND_LAYER[0], -719 * 3),
    new BackgroundObject(ImagHub.BACKGROUND.FIRST_LAYER[0], -719 * 3),
  ],
  [new Cloud()],
  [new Chicken(), new Chicken(), new Chicken(), new EndBoss()],
);
