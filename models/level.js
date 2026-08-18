import { BackgroundObject } from "./background-object.js";
import { Bottle } from "./bottle.js";
import { Cloud } from "./cloud.js";
import { Coin } from "./coin.js";
import { EndBoss } from "./endBoss.js";
import { SmallChicken } from "./small-chicken.js";
import { StatusBar } from "./status-bar.js";

/**
 * 
 * Creates a new Level
 * @class
 */
export class Level {
  // #region Properties
  backgrounds;
  clouds;
  enemies;
  coins;
  bottles_;
  level_end_x;

  // #endregion

  /**
   * Initialises the properties
   * 
   * @param {BackgroundObject} backgrounds_ 
   * @param {Cloud} clouds_ 
   * @param {Chicken|SmallChicken|EndBoss} enemies_ 
   * @param {healthStatus} endBossHealthStatus_ 
   * @param {Coin} coins_ 
   * @param {Bottle} bottles_ 
   * @param {StatusBar} healthStatus_ 
   * @param {StatusBar} bottleStatus_ 
   * @param {StatusBar} coinStatus_ 
   * @param {number} levelEndX_ 
   */
  constructor(
    backgrounds_,
    clouds_,
    enemies_,
    endBossHealthStatus_,
    coins_,
    bottles_,
    healthStatus_,
    bottleStatus_,
    coinStatus_,
    levelEndX_
  ) {
    this.backgrounds = backgrounds_;
    this.clouds = clouds_;
    this.enemies = enemies_;
    this.endBossHealthStatus = endBossHealthStatus_;
    this.coins = coins_;
    this.bottles = bottles_;
    this.healthStatus = healthStatus_;
    this.bottleStatus = bottleStatus_;
    this.coinStatus = coinStatus_;
    this.level_end_x = levelEndX_;
  }

}
