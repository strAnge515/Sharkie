class World {
  canvas;
  ctx;
  character = new Character();
  keyboard;
  level = level1;
  camera_x = 0;

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
    this.drawBackground(this.level.backgroundObjects);
   this.drawWithFlip(this.character);

    let self = this;
    requestAnimationFrame(function () {
      self.draw();
    });
  }

  drawBackground(arr) {
    arr.forEach((backgroundObject) => {
      let drawX = backgroundObject.x + this.camera_x * backgroundObject.parallaxFactor;
      backgroundObject.draw(this.ctx, drawX);
    });
  }

  flipImage(moveableObject) {
    this.ctx.save();
    this.ctx.translate(moveableObject.width, 0);
   this.ctx.scale(-1, 1);
   moveableObject.x = moveableObject.x * -1; 
  }

  flipImageBack(moveableObject) {
    moveableObject.x = moveableObject.x * -1;
    this.ctx.restore();
  }

   drawWithFlip(moveableObject) {   
    if (moveableObject.otherDirection) {
      this.flipImage(moveableObject);
    }
    moveableObject.draw(this.ctx);
    if (moveableObject.otherDirection) {
      this.flipImageBack(moveableObject);
    }
  }
}
