class Bubble extends MoveableObject {
  width = 30;
  height = 30;
  speed = 5;

  constructor(x, y, type = 'normal') {
    super();
    this.x = x;
    this.y = y;
    this.type = type;

    let path =
      type === 'poison'
        ? 'graphics/1.Sharkie/4.Attack/Bubble trap/Poisoned Bubble (for whale).png'
        : 'graphics/1.Sharkie/4.Attack/Bubble trap/Bubble.png';
    this.loadImage(path);

    this.moveInterval = setInterval(() => {
      this.moveRight();
    }, 1000 / 60);
  }

  remove() {
    clearInterval(this.moveInterval);
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
