class Jellyfish extends MoveableObject {
  IMAGES_JELLYFISH = [
    'graphics/2.Enemy/2 Jelly fish/Regular damage/Lila 1.png',
    'graphics/2.Enemy/2 Jelly fish/Regular damage/Lila 2.png',
    'graphics/2.Enemy/2 Jelly fish/Regular damage/Lila 3.png',
    'graphics/2.Enemy/2 Jelly fish/Regular damage/Lila 4.png',
  ];

  IMAGES_DEAD = [
    'graphics/2.Enemy/2 Jelly fish/Dead/Lila/L1.png',
    'graphics/2.Enemy/2 Jelly fish/Dead/Lila/L2.png',
    'graphics/2.Enemy/2 Jelly fish/Dead/Lila/L3.png',
    'graphics/2.Enemy/2 Jelly fish/Dead/Lila/L4.png',
  ];

  width = 80;
  height = 80;
  isDead = false;

  constructor(x, y) {
    super();
    this.x = x;
    this.y = y;
    this.loadImages(this.IMAGES_JELLYFISH);
    this.loadImages(this.IMAGES_DEAD);
    this.loadImage(this.IMAGES_JELLYFISH[0]);
    this.animate();
  }

  animate() {
    setInterval(() => {
      if (this.isDead) {
        this.playAnimation(this.IMAGES_DEAD);
      } else {
        this.playAnimation(this.IMAGES_JELLYFISH);
      }
    }, 200);
  }

  die() {
    this.isDead = true;
    this.currentImage = 0;
  }

  getHitbox() {
    return {
      x: this.x + 10,
      y: this.y + 10,
      width: this.width - 20,
      height: this.height - 20,
    };
  }
}
