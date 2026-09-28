/**
 * Base class for everything that is drawn on the canvas: it has a position, a size and an image.
 */
class DrawableObject {
  img;
  x = 120;
  y = 120;
  width = 100;
  height = 100;

  /**
   * Loads a single image that is shown by this object.
   * @param {string} imagePath - Path to the image file.
   */
  loadImage(imagePath) {
    this.img = new Image();
    this.img.src = imagePath;
  }

  /**
   * Draws the current image of this object.
   * @param {CanvasRenderingContext2D} context - The drawing context of the canvas.
   * @param {number} drawX - The x position to draw at (defaults to the object's own x position).
   */
  draw(context, drawX = this.x) {
    context.drawImage(this.img, drawX, this.y, this.width, this.height);
  }
}
