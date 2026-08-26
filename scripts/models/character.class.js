class Character extends MoveableObject {
  IMAGES_SWIMMING = [
    'graphics/1.Sharkie/3.Swim/1.png',
    'graphics/1.Sharkie/3.Swim/2.png',
    'graphics/1.Sharkie/3.Swim/3.png',
    'graphics/1.Sharkie/3.Swim/4.png',
    'graphics/1.Sharkie/3.Swim/5.png',
    'graphics/1.Sharkie/3.Swim/6.png',
  ];
  IMAGES_STALL = [
    'graphics/1.Sharkie/1.IDLE/1.png',
    'graphics/1.Sharkie/1.IDLE/2.png',
    'graphics/1.Sharkie/1.IDLE/3.png',
    'graphics/1.Sharkie/1.IDLE/4.png',
    'graphics/1.Sharkie/1.IDLE/5.png',
    'graphics/1.Sharkie/1.IDLE/6.png',
    'graphics/1.Sharkie/1.IDLE/7.png',
    'graphics/1.Sharkie/1.IDLE/8.png',
    'graphics/1.Sharkie/1.IDLE/9.png',
    'graphics/1.Sharkie/1.IDLE/10.png',
    'graphics/1.Sharkie/1.IDLE/11.png',
    'graphics/1.Sharkie/1.IDLE/12.png',
    'graphics/1.Sharkie/1.IDLE/13.png',
    'graphics/1.Sharkie/1.IDLE/14.png',
    'graphics/1.Sharkie/1.IDLE/15.png',
    'graphics/1.Sharkie/1.IDLE/16.png',
    'graphics/1.Sharkie/1.IDLE/17.png',
    'graphics/1.Sharkie/1.IDLE/18.png',
  ];
  IMAGES_STALL_LONG = [
    'graphics/1.Sharkie/2.Long_IDLE/i1.png',
    'graphics/1.Sharkie/2.Long_IDLE/i2.png',
    'graphics/1.Sharkie/2.Long_IDLE/i3.png',
    'graphics/1.Sharkie/2.Long_IDLE/i4.png',
    'graphics/1.Sharkie/2.Long_IDLE/i5.png',
    'graphics/1.Sharkie/2.Long_IDLE/i6.png',
    'graphics/1.Sharkie/2.Long_IDLE/i7.png',
    'graphics/1.Sharkie/2.Long_IDLE/i8.png',
    'graphics/1.Sharkie/2.Long_IDLE/i9.png',
    'graphics/1.Sharkie/2.Long_IDLE/i10.png',
    'graphics/1.Sharkie/2.Long_IDLE/i11.png',
    'graphics/1.Sharkie/2.Long_IDLE/i12.png',
    'graphics/1.Sharkie/2.Long_IDLE/i13.png',
    'graphics/1.Sharkie/2.Long_IDLE/i14.png',
    'graphics/1.Sharkie/2.Long_IDLE/i11.png',
    'graphics/1.Sharkie/2.Long_IDLE/i12.png',
    'graphics/1.Sharkie/2.Long_IDLE/i13.png',
    'graphics/1.Sharkie/2.Long_IDLE/i11.png',
    'graphics/1.Sharkie/2.Long_IDLE/i12.png',
    'graphics/1.Sharkie/2.Long_IDLE/i13.png',
    'graphics/1.Sharkie/2.Long_IDLE/i11.png',
    'graphics/1.Sharkie/2.Long_IDLE/i12.png',
    'graphics/1.Sharkie/2.Long_IDLE/i13.png',
    'graphics/1.Sharkie/2.Long_IDLE/i11.png',
    'graphics/1.Sharkie/2.Long_IDLE/i12.png',
    'graphics/1.Sharkie/2.Long_IDLE/i13.png',
    'graphics/1.Sharkie/2.Long_IDLE/i11.png',
    'graphics/1.Sharkie/2.Long_IDLE/i12.png',
    'graphics/1.Sharkie/2.Long_IDLE/i13.png',
    'graphics/1.Sharkie/2.Long_IDLE/i11.png',
    'graphics/1.Sharkie/2.Long_IDLE/i12.png',
    'graphics/1.Sharkie/2.Long_IDLE/i13.png',
    'graphics/1.Sharkie/2.Long_IDLE/i11.png',
    'graphics/1.Sharkie/2.Long_IDLE/i12.png',
    'graphics/1.Sharkie/2.Long_IDLE/i13.png',
  ];

  x = 100;
  y = 100;
  height = 300;
  width = 200;
  speed = 2.6;
  world;
  lastMoveTime = new Date().getTime();
  cameraOffset = 100;

  constructor() {
    super();
    this.loadImage('graphics/1.Sharkie/1.IDLE/1.png');
    this.loadImages(this.IMAGES_SWIMMING);
    this.loadImages(this.IMAGES_STALL);
    this.loadImages(this.IMAGES_STALL_LONG);
    this.animate();
  }

  animate() {
    setInterval(() => {
      let boundary = (this.world.canvas.width / 4) * 2;

      if (this.world.keyboard.RIGHT && this.x + this.world.camera_x < boundary) {
        this.moveRight();
        this.lastMoveTime = new Date().getTime();
        this.otherDirection = false;
      }
      if (this.world.keyboard.RIGHT && this.x + this.world.camera_x >= boundary) {
        this.world.camera_x -= this.speed;
      }
      if (this.world.keyboard.LEFT && this.x > -this.world.camera_x) {
        this.moveLeft();
        this.lastMoveTime = new Date().getTime();
        this.otherDirection = true;
      }
      if (this.world.keyboard.UP) {
        this.moveUp();
        this.lastMoveTime = new Date().getTime();
      }
      if (this.world.keyboard.DOWN) {
        this.moveDown();
        this.lastMoveTime = new Date().getTime();
      }
    }, 1000 / 60);

    setInterval(() => {
      if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT || this.world.keyboard.UP || this.world.keyboard.DOWN) {
        this.playAnimation(this.IMAGES_SWIMMING);
      }
    }, 1000 / 10);

    setInterval(() => {
      if (!this.world.keyboard.RIGHT && !this.world.keyboard.LEFT) {
        let timePassed = (new Date().getTime() - this.lastMoveTime) / 1000;

        if (timePassed > 30) {
          this.playAnimation(this.IMAGES_STALL_LONG);
        } else {
          this.playAnimation(this.IMAGES_STALL);
        }
      }
    }, 170);
  }
}
