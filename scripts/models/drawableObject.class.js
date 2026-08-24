class DrawableObject {
  img;
  x = 120;
  y = 120;
  width = 100;
  height = 100;

  loadImage(path) {
    this.img = new Image();
    this.img.src = path;
  }

  draw(ctx, drawX = this.x) {
    ctx.drawImage(this.img, drawX, this.y, this.width, this.height);
  }
}
