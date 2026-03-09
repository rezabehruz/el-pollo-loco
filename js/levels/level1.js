import { BackgroundObject } from "../../models/background-object.js";
import { Cloud } from "../../models/cloud.js";
import { Chicken } from "../../models/chicken.js";
import { EndBoss } from "../../models/endBoss.js";
import { Level } from "../../models/level.js";
import { ImageHub } from "../../models/manager-models/image-hub.js";
import { Coin } from "../../models/coin.js";
import { Bottle } from "../../models/bottle.js";
import {StatusBar} from "../../models/status-bar.js";

export const level1 = new Level(
  [
    new BackgroundObject(ImageHub.BACKGROUND.air, -719),
    new BackgroundObject(ImageHub.BACKGROUND.thirdLayer[0], -719),
    new BackgroundObject(ImageHub.BACKGROUND.secondLayer[0], -719),
    new BackgroundObject(ImageHub.BACKGROUND.firstLayer[0], -719),

    new BackgroundObject(ImageHub.BACKGROUND.air, 0),
    new BackgroundObject(ImageHub.BACKGROUND.thirdLayer[1], 0),
    new BackgroundObject(ImageHub.BACKGROUND.secondLayer[1], 0),
    new BackgroundObject(ImageHub.BACKGROUND.firstLayer[1], 0),

    new BackgroundObject(ImageHub.BACKGROUND.air, 719),
    new BackgroundObject(ImageHub.BACKGROUND.thirdLayer[0], 719),
    new BackgroundObject(ImageHub.BACKGROUND.secondLayer[0], 719),
    new BackgroundObject(ImageHub.BACKGROUND.firstLayer[0], 719),

    new BackgroundObject(ImageHub.BACKGROUND.air, 719 * 2),
    new BackgroundObject(ImageHub.BACKGROUND.thirdLayer[1], 719 * 2),
    new BackgroundObject(ImageHub.BACKGROUND.secondLayer[1], 719 * 2),
    new BackgroundObject(ImageHub.BACKGROUND.firstLayer[1], 719 * 2),

    new BackgroundObject(ImageHub.BACKGROUND.air, 719 * 3),
    new BackgroundObject(ImageHub.BACKGROUND.thirdLayer[0], 719 * 3),
    new BackgroundObject(ImageHub.BACKGROUND.secondLayer[0], 719 * 3),
    new BackgroundObject(ImageHub.BACKGROUND.firstLayer[0], 719 * 3),
  ],
  [new Cloud()],
  [new Chicken(), new Chicken(), new Chicken(), new EndBoss()],
  [new Coin(), new Coin(), new Coin(), new Coin(), new Coin()],
  [new Bottle(), new Bottle(), new Bottle(), new Bottle(), new Bottle(),new Bottle(), new Bottle(), new Bottle()],
  new StatusBar(40, 0, 100, ImageHub.STATUS_BAR.health),
  new StatusBar(40, 40, 0, ImageHub.STATUS_BAR.bottle),
  new StatusBar(40, 80, 0, ImageHub.STATUS_BAR.coin),
  2267
);
