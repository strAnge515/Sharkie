class StatusBar extends DrawableObject {
  imageCache = {};
  images;
  percentage = 100;
  width = 200;
  height = 60;

  constructor(images, x, y, startPercentage = 100) {
    super();
    this.images = images;
    this.x = x;
    this.y = y;

    Object.values(this.images).forEach((path) => {
      let img = new Image();
      img.src = path;
      this.imageCache[path] = img;
    });

    this.setPercentage(startPercentage);
  }

  setPercentage(percentage) {
    this.percentage = percentage;
    let path = this.images[this.percentage];
    this.img = this.imageCache[path];
  }
}
