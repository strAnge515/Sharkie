/**
 * A bar on the screen (life, coins or poison) that shows a value from 0 to 100 percent.
 */
class StatusBar extends DrawableObject {
  imageCache = {};
  images;
  percentage = 100;
  width = 200;
  height = 60;

  /**
   * @param {Object<number, string>} images - Image path for every percentage step (0, 20, 40, ...).
   * @param {number} x - X position of the bar on the screen.
   * @param {number} y - Y position of the bar on the screen.
   * @param {number} startPercentage - How full the bar is at the start.
   */
  constructor(images, x, y, startPercentage = 100) {
    super();
    this.images = images;
    this.x = x;
    this.y = y;
    this.preloadImages();
    this.setPercentage(startPercentage);
  }

  /**
   * Preloads the image of every percentage step.
   */
  preloadImages() {
    Object.values(this.images).forEach((imagePath) => {
      let image = new Image();
      image.src = imagePath;
      this.imageCache[imagePath] = image;
    });
  }

  /**
   * Shows the image that belongs to the given percentage.
   * @param {number} percentage - A value from 0 to 100 in steps of 20.
   */
  setPercentage(percentage) {
    this.percentage = percentage;
    let imagePath = this.images[this.percentage];
    this.img = this.imageCache[imagePath];
  }
}
