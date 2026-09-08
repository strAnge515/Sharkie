class Bubble extends MoveableObject {
  width = 30;
  height = 30;
  speed = 5;

  constructor(x, y) {
    super();
    this.x = x;
    this.y = y;
    this.loadImage('graphics/1.Sharkie/4.Attack/Bubble trap/Bubble.png');

    this.moveInterval = setInterval(() => {
      this.moveRight();
    }, 1000 / 60);
  }

  remove() {
    clearInterval(this.moveInterval);
  }
}
