class World {
  canvas;
  ctx;
  testObject = new MoveableObject();
  keyboard;

  constructor(canvas, keyboard) {
    this.ctx = canvas.getContext('2d');
    this.canvas = canvas;
    this.keyboard = keyboard;

    

    this.draw();
  }

  draw() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

   

    let self = this;
    requestAnimationFrame(function () {
      self.draw();
    });
  }
}
