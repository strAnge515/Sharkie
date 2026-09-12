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

  constructor(x, y) {
    super();
    this.x = x;
    this.y = y;
    this.loadImages(this.IMAGES_POISON_BOTTLE);
    this.loadImage(this.IMAGES_POISON_BOTTLE[0]);
    this.animate();
  }

  animate() {
    setInterval(() => {
      this.playAnimation(this.IMAGES_POISON_BOTTLE);
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
