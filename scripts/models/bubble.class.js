/**
 * A bubble the shark shoots to the right. A poison bubble can hurt the boss.
 */
class Bubble extends MoveableObject {
  width = 30;
  height = 30;
  speed = 5;
  moveIntervalMs = 1000 / 60;
  moveInterval;

  /**
   * @param {number} x - Start x position of the bubble.
   * @param {number} y - Start y position of the bubble.
   * @param {string} type - 'normal' or 'poison'.
   */
  constructor(x, y, type = 'normal') {
    super();
    this.x = x;
    this.y = y;
    this.type = type;
    this.loadImage(this.getImagePath());
    this.startMoving();
  }

  /**
   * @returns {string} The image path that fits the bubble type.
   */
  getImagePath() {
    if (this.type === 'poison') {
      return 'graphics/1.Sharkie/4.Attack/Bubble trap/Poisoned Bubble (for whale).png';
    }
    return 'graphics/1.Sharkie/4.Attack/Bubble trap/Bubble.png';
  }

  /**
   * Lets the bubble fly to the right.
   */
  startMoving() {
    this.moveInterval = gameInterval(() => {
      this.moveRight();
    }, this.moveIntervalMs);
  }

  /**
   * Stops the movement of the bubble.
   */
  remove() {
    clearInterval(this.moveInterval);
  }

  /**
   * @returns {{x: number, y: number, width: number, height: number}} The area where the bubble can hit something.
   */
  getHitbox() {
    return {
      x: this.x + 5,
      y: this.y + 5,
      width: this.width - 10,
      height: this.height - 10,
    };
  }
}
