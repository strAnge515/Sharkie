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
   * Draws the current image of this object. Images that are still loading or failed to load are skipped,
   * so a single missing file cannot crash the whole draw loop.
   * @param {CanvasRenderingContext2D} context - The drawing context of the canvas.
   * @param {number} drawX - The x position to draw at (defaults to the object's own x position).
   */
  draw(context, drawX = this.x) {
    if (!this.isImageReady()) return;
    context.drawImage(this.img, drawX, this.y, this.width, this.height);
  }

  /**
   * Checks whether the current image is fully loaded and not broken.
   * @returns {boolean} True if the image can be drawn.
   */
  isImageReady() {
    return this.img && this.img.complete && this.img.naturalWidth > 0;
  }
}
