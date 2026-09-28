/**
 * One layer of the background. Layers with a small parallax factor move slower than the camera.
 */
class BackgroundObject extends MoveableObject {
  width = 850;
  height = 480;
  parallaxFactor;

  /**
   * @param {string} imagePath - Path to the layer image.
   * @param {number} x - X position of the layer in the world.
   * @param {number} parallaxFactor - How fast the layer follows the camera (1 = same speed, smaller = slower).
   */
  constructor(imagePath, x, parallaxFactor) {
    super();
    this.loadImage(imagePath);
    this.x = x;
    this.parallaxFactor = parallaxFactor;
    this.y = 480 - this.height;
  }
}
