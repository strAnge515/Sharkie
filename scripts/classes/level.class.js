/**
 * Holds everything that belongs to one level: enemies, collectibles, the end boss and the background.
 */
class Level {
  enemies;
  coins;
  jellyfish;
  poisonBottles;
  finalEnemy;
  backgroundObjects;
  levelEndX;

  /**
   * @param {Enemy[]} enemies - The pufferfish of the level.
   * @param {Coin[]} coins - The coins the player can collect.
   * @param {Jellyfish[]} jellyfish - The jellyfish of the level.
   * @param {PoisonBottle[]} poisonBottles - The poison bottles lying around in the level.
   * @param {FinalEnemy} finalEnemy - The end boss at the end of the level.
   * @param {BackgroundObject[]} backgroundObjects - The background layers of the level.
   * @param {number} levelEndX - The x position where the level ends.
   */
  constructor(enemies, coins, jellyfish, poisonBottles, finalEnemy, backgroundObjects, levelEndX) {
    this.enemies = enemies;
    this.coins = coins;
    this.jellyfish = jellyfish;
    this.poisonBottles = poisonBottles;
    this.finalEnemy = finalEnemy;
    this.backgroundObjects = backgroundObjects;
    this.levelEndX = levelEndX;
  }
}
