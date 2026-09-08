class Coin extends MoveableObject {
  IMAGES_COIN = [
    'graphics/4. Marcadores/1. Coins/1.png',
    'graphics/4. Marcadores/1. Coins/2.png',
    'graphics/4. Marcadores/1. Coins/3.png',
    'graphics/4. Marcadores/1. Coins/4.png',
  ];

  width = 60;
  height = 60;

  constructor(x, y) {
    super();
    this.x = x;
    this.y = y;
    this.loadImages(this.IMAGES_COIN);
    this.loadImage(this.IMAGES_COIN[0]);
    this.animate();
  }

  animate() {
    setInterval(() => {
      this.playAnimation(this.IMAGES_COIN);
    }, 200);
  }

  getHitbox() {
    return {
      x: this.x + 5,
      y: this.y + 5,
      width: this.width - 10,
      height: this.height - 10,
    };
  }
}
