class World {
  canvas;
  ctx;
  character = new Character();
  keyboard;

  constructor(canvas, keyboard) {
    this.ctx = canvas.getContext('2d');
    this.canvas = canvas;
    this.keyboard = keyboard;
    this.setWorld();

    

    this.draw();
  }

  setWorld() {
     this.character.world = this;

  }

  draw() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    this.character.draw(this.ctx);

    let self = this;
    requestAnimationFrame(function () {
      self.draw();
    });
  }
}
