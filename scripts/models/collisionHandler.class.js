/**
 * Checks what touches what in the world: the shark against enemies, bubbles against enemies,
 * and the shark against coins and poison bottles.
 */
class CollisionHandler {
  world;

  checkIntervalMs = 100;
  removeDeadEnemyDelayMs = 2000;
  maxStatusPercentage = 100;
  percentagePerCoin = 20;
  percentagePerPoisonBottle = 20;

  /**
   * @param {World} world - The world whose objects are checked.
   */
  constructor(world) {
    this.world = world;
  }

  /**
   * Starts checking all collisions several times per second.
   */
  startChecking() {
    gameInterval(() => {
      this.checkEnemyCollisions();
      this.checkBubbleCollisions();
      this.checkCoinCollisions();
      this.checkPoisonBottleCollisions();
    }, this.checkIntervalMs);
  }

  /**
   * Checks the shark against all pufferfish, jellyfish and the boss.
   */
  checkEnemyCollisions() {
    let level = this.world.level;
    level.enemies.forEach((enemy) => this.checkEnemyCollision(enemy));
    level.jellyfish.forEach((jellyfish) => this.checkJellyfishCollision(jellyfish));
    this.checkFinalEnemyCollision();
  }

  /**
   * A pufferfish dies from the tail attack; otherwise it hurts the shark when they touch.
   * @param {Enemy} enemy - The pufferfish to check.
   */
  checkEnemyCollision(enemy) {
    let character = this.world.character;
    if (enemy.isDead) return;

    if (character.isAttacking) {
      if (this.isColliding(character.getAttackHitbox(), enemy.getHitbox())) this.killEnemy(enemy);
    } else if (this.isColliding(character.getBodyHitbox(), enemy.getHitbox())) {
      this.hurtCharacter('poison');
    }
  }

  /**
   * A jellyfish gives the shark an electric shock when they touch.
   * @param {Jellyfish} jellyfish - The jellyfish to check.
   */
  checkJellyfishCollision(jellyfish) {
    if (jellyfish.isDead) return;

    if (this.isColliding(this.world.character.getBodyHitbox(), jellyfish.getHitbox())) {
      this.hurtCharacter('electric');
    }
  }

  /**
   * The boss only hurts the shark while it is attacking.
   */
  checkFinalEnemyCollision() {
    let boss = this.world.level.finalEnemy;
    if (!boss.isVisible || boss.isDead || !boss.isAttacking) return;

    if (this.isColliding(this.world.character.getBodyHitbox(), boss.getHitbox())) {
      this.hurtCharacter('poison');
    }
  }

  /**
   * Damages the shark and updates the life bar if the hit really counted.
   * @param {string} damageType - 'poison' or 'electric'.
   */
  hurtCharacter(damageType) {
    let character = this.world.character;
    if (character.getHit(damageType)) {
      this.world.lifeStatusBar.setPercentage(character.health);
    }
  }

  /**
   * Checks every bubble against the jellyfish and the boss.
   */
  checkBubbleCollisions() {
    this.world.bubbles.forEach((bubble) => {
      this.checkBubbleHitsJellyfish(bubble);
      this.checkBubbleHitsBoss(bubble);
    });
  }

  /**
   * Any bubble kills a jellyfish and is used up by it.
   * @param {Bubble} bubble - The bubble to check.
   */
  checkBubbleHitsJellyfish(bubble) {
    this.world.level.jellyfish.forEach((jellyfish) => {
      if (jellyfish.isDead) return;

      if (this.isColliding(bubble.getHitbox(), jellyfish.getHitbox())) {
        this.killJellyfish(jellyfish);
        this.removeBubble(bubble);
      }
    });
  }

  /**
   * Only a poison bubble hurts the boss, and only while the boss is visible and alive.
   * @param {Bubble} bubble - The bubble to check.
   */
  checkBubbleHitsBoss(bubble) {
    let boss = this.world.level.finalEnemy;
    let canBossBeHit = bubble.type === 'poison' && boss.isVisible && !boss.isDead;

    if (canBossBeHit && this.isColliding(bubble.getHitbox(), boss.getHitbox())) {
      boss.hit();
      this.removeBubble(bubble);
    }
  }

  /**
   * Stops a bubble and removes it from the world.
   * @param {Bubble} bubble - The bubble to remove.
   */
  removeBubble(bubble) {
    let bubbleIndex = this.world.bubbles.indexOf(bubble);
    if (bubbleIndex === -1) return;

    bubble.remove();
    this.world.bubbles.splice(bubbleIndex, 1);
  }

  /**
   * Lets the shark collect every coin it touches.
   */
  checkCoinCollisions() {
    this.world.level.coins.forEach((coin) => {
      if (this.isColliding(this.world.character.getBodyHitbox(), coin.getHitbox())) {
        this.collectCoin(coin);
      }
    });
  }

  /**
   * Removes a coin from the level and fills the coin bar.
   * @param {Coin} coin - The collected coin.
   */
  collectCoin(coin) {
    let coinIndex = this.world.level.coins.indexOf(coin);
    if (coinIndex === -1) return;

    this.world.level.coins.splice(coinIndex, 1);
    this.world.coinsCollected++;

    let coinPercentage = this.world.coinsCollected * this.percentagePerCoin;
    this.world.coinStatusBar.setPercentage(Math.min(this.maxStatusPercentage, coinPercentage));
  }

  /**
   * Lets the shark collect every poison bottle it touches.
   */
  checkPoisonBottleCollisions() {
    this.world.poisonBottles.forEach((poisonBottle) => {
      if (this.isColliding(this.world.character.getBodyHitbox(), poisonBottle.getHitbox())) {
        this.collectPoisonBottle(poisonBottle);
      }
    });
  }

  /**
   * Removes a poison bottle from the world and fills the poison bar.
   * @param {PoisonBottle} poisonBottle - The collected bottle.
   */
  collectPoisonBottle(poisonBottle) {
    let bottleIndex = this.world.poisonBottles.indexOf(poisonBottle);
    if (bottleIndex === -1) return;

    this.world.poisonBottles.splice(bottleIndex, 1);
    let poisonPercentage = this.world.poisonCollected + this.percentagePerPoisonBottle;
    this.world.poisonCollected = Math.min(this.maxStatusPercentage, poisonPercentage);
    this.world.poisonStatusBar.setPercentage(this.world.poisonCollected);
  }

  /**
   * Kills a pufferfish, lets it drop a poison bottle and removes its body a little later.
   * @param {Enemy} enemy - The pufferfish that was hit.
   */
  killEnemy(enemy) {
    enemy.die();

    let enemyHitbox = enemy.getHitbox();
    this.world.spawnPoisonBottle(enemyHitbox.x + enemyHitbox.width, enemyHitbox.y);
    this.removeLater(this.world.level.enemies, enemy);
  }

  /**
   * Kills a jellyfish and removes its body a little later.
   * @param {Jellyfish} jellyfish - The jellyfish that was hit.
   */
  killJellyfish(jellyfish) {
    jellyfish.die();
    this.removeLater(this.world.level.jellyfish, jellyfish);
  }

  /**
   * Removes an object from a list after the death animation had time to play.
   * @param {Object[]} objects - The list that contains the object.
   * @param {Object} deadObject - The object to remove.
   */
  removeLater(objects, deadObject) {
    gameTimeout(() => {
      let objectIndex = objects.indexOf(deadObject);
      if (objectIndex !== -1) objects.splice(objectIndex, 1);
    }, this.removeDeadEnemyDelayMs);
  }

  /**
   * Checks whether two rectangles overlap.
   * @param {{x: number, y: number, width: number, height: number}} hitboxA - The first rectangle.
   * @param {{x: number, y: number, width: number, height: number}} hitboxB - The second rectangle.
   * @returns {boolean} True if the rectangles overlap.
   */
  isColliding(hitboxA, hitboxB) {
    return (
      hitboxA.x + hitboxA.width > hitboxB.x &&
      hitboxA.x < hitboxB.x + hitboxB.width &&
      hitboxA.y + hitboxA.height > hitboxB.y &&
      hitboxA.y < hitboxB.y + hitboxB.height
    );
  }
}
