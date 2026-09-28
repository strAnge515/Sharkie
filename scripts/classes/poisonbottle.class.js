/**
 * A poison bottle the shark can collect to fill its poison bar.
 */
class PoisonBottle extends MoveableObject {
  IMAGES_POISON_BOTTLE = [
    'graphics/4. Marcadores/Posión/Animada/1.png',
    'graphics/4. Marcadores/Posión/Animada/2.png',
    'graphics/4. Marcadores/Posión/Animada/3.png',
    'graphics/4. Marcadores/Posión/Animada/4.png',
    'graphics/4. Marcadores/Posión/Animada/5.png',
    'graphics/4. Marcadores/Posión/Animada/6.png',
    'graphics/4. Marcadores/Posión/Animada/7.png',
    'graphics/4. Marcadores/Posión/Animada/8.png',
  ];

  width = 60;
  height = 60;
  animationIntervalMs = 200;

  /**
   * @param {number} x - X position of the bottle.
   * @param {number} y - Y position of the bottle.
   */
  constructor(x, y) {
    super();
    this.x = x;
    this.y = y;
    this.loadImages(this.IMAGES_POISON_BOTTLE);
    this.loadImage(this.IMAGES_POISON_BOTTLE[0]);
    this.startAnimationLoop();
  }

  /**
   * Plays the bubbling animation of the bottle.
   */
  startAnimationLoop() {
    gameInterval(() => {
      this.playAnimation(this.IMAGES_POISON_BOTTLE);
    }, this.animationIntervalMs);
  }

  /**
   * @returns {{x: number, y: number, width: number, height: number}} The area where the bottle can be collected.
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
