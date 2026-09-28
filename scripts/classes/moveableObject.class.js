/**
 * Base class for everything that moves or is animated. It keeps the preloaded images
 * and plays animations by switching through them frame by frame.
 */
class MoveableObject extends DrawableObject {
  speed = 0.15;
  imageCache = {};
  currentImage = 0;
  otherDirection = false;

  /**
   * Preloads images so they can be shown later without delay.
   * @param {string[]} imagePaths - Paths of the images to load.
   */
  loadImages(imagePaths) {
    imagePaths.forEach((imagePath) => {
      let image = new Image();
      image.src = imagePath;
      this.imageCache[imagePath] = image;
    });
  }

  /**
   * Shows the next frame of an animation. After the last frame it starts again from the first one.
   * @param {string[]} imagePaths - Paths of the animation frames (must be preloaded).
   */
  playAnimation(imagePaths) {
    let frameIndex = this.currentImage % imagePaths.length;
    let framePath = imagePaths[frameIndex];
    this.img = this.imageCache[framePath];
    this.currentImage++;
  }

  /**
   * Moves the object to the right by its speed.
   */
  moveRight() {
    this.x += this.speed;
  }

  /**
   * Moves the object to the left by its speed.
   */
  moveLeft() {
    this.x -= this.speed;
  }

  /**
   * Moves the object up by its speed.
   */
  moveUp() {
    this.y -= this.speed;
  }

  /**
   * Moves the object down by its speed.
   */
  moveDown() {
    this.y += this.speed;
  }
}
