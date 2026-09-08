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

  IMAGES_TAILATTACK = [
    'graphics/1.Sharkie/4.Attack/Fin slap/1.png',
    'graphics/1.Sharkie/4.Attack/Fin slap/2.png',
    'graphics/1.Sharkie/4.Attack/Fin slap/3.png',
    'graphics/1.Sharkie/4.Attack/Fin slap/4.png',
    'graphics/1.Sharkie/4.Attack/Fin slap/5.png',
    'graphics/1.Sharkie/4.Attack/Fin slap/6.png',
    'graphics/1.Sharkie/4.Attack/Fin slap/7.png',
    'graphics/1.Sharkie/4.Attack/Fin slap/8.png',
  ];

  IMAGES_BUBBLE = [
    'graphics/1.Sharkie/4.Attack/Bubble trap/op1 (with bubble formation)/1.png',
    'graphics/1.Sharkie/4.Attack/Bubble trap/op1 (with bubble formation)/2.png',
    'graphics/1.Sharkie/4.Attack/Bubble trap/op1 (with bubble formation)/3.png',
    'graphics/1.Sharkie/4.Attack/Bubble trap/op1 (with bubble formation)/4.png',
    'graphics/1.Sharkie/4.Attack/Bubble trap/op1 (with bubble formation)/5.png',
    'graphics/1.Sharkie/4.Attack/Bubble trap/op1 (with bubble formation)/6.png',
    'graphics/1.Sharkie/4.Attack/Bubble trap/op1 (with bubble formation)/7.png',
    'graphics/1.Sharkie/4.Attack/Bubble trap/op1 (with bubble formation)/8.png',
  ];

  IMAGES_HURT = [
    'graphics/1.Sharkie/5.Hurt/1.Poisoned/1.png',
    'graphics/1.Sharkie/5.Hurt/1.Poisoned/2.png',
    'graphics/1.Sharkie/5.Hurt/1.Poisoned/3.png',
    'graphics/1.Sharkie/5.Hurt/1.Poisoned/4.png',
    'graphics/1.Sharkie/5.Hurt/1.Poisoned/5.png',
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
    this.loadImages(this.IMAGES_TAILATTACK);
    this.loadImages(this.IMAGES_BUBBLE);
    this.loadImages(this.IMAGES_HURT);
    this.animate();
    this.attack();
    this.bubbleShoot();
    this.hurtAnimation();
  }

  animate() {
    setInterval(() => {
      let boundary = (this.world.canvas.width / 4) * 2;
      let atLevelEnd = -this.world.camera_x >= this.world.level.level_end_x - this.world.canvas.width;

      if (this.world.keyboard.RIGHT && this.x + this.world.camera_x < boundary && !this.isAttacking && !this.isShootingBubble) {
        this.moveRight();
        this.lastMoveTime = new Date().getTime();
        this.otherDirection = false;
      }
      if (this.world.keyboard.RIGHT && this.x + this.world.camera_x >= boundary && !atLevelEnd && !this.isAttacking && !this.isShootingBubble) {
        this.world.camera_x -= this.speed;
      }
      if (this.world.keyboard.LEFT && this.x > -this.world.camera_x && !this.isAttacking && !this.isShootingBubble) {
        this.moveLeft();
        this.lastMoveTime = new Date().getTime();
        this.otherDirection = true;
      }
      if (this.world.keyboard.UP && !this.isAttacking && !this.isShootingBubble) {
        this.moveUp();
        this.lastMoveTime = new Date().getTime();
      }
      if (this.world.keyboard.DOWN && !this.isAttacking && !this.isShootingBubble) {
        this.moveDown();
        this.lastMoveTime = new Date().getTime();
      }
    }, 1000 / 60);

    setInterval(() => {
      if ((this.world.keyboard.RIGHT || this.world.keyboard.LEFT || this.world.keyboard.UP || this.world.keyboard.DOWN) && !this.isAttacking && !this.isShootingBubble && !this.isHit) {
        this.playAnimation(this.IMAGES_SWIMMING);
      }
    }, 1000 / 10);

    setInterval(() => {
      if (!this.world.keyboard.RIGHT && !this.world.keyboard.LEFT && !this.isAttacking && !this.isShootingBubble && !this.isHit) {
        let timePassed = (new Date().getTime() - this.lastMoveTime) / 1000;

        if (timePassed > 30) {
          this.playAnimation(this.IMAGES_STALL_LONG);
        } else {
          this.playAnimation(this.IMAGES_STALL);
        }
      }
    }, 170);
  }

  attack() {
    this.isAttacking = false;

    setInterval(() => {
      if (this.world.keyboard.D && !this.isAttacking && !this.isShootingBubble) {
        this.currentImage = 0;
        this.isAttacking = true;
      }

      if (this.isAttacking) {
        this.playAnimation(this.IMAGES_TAILATTACK);

        if (this.currentImage >= this.IMAGES_TAILATTACK.length) {
          this.isAttacking = false;
        }
      }
    }, 70);
  }

  bubbleShoot() {
    this.isShootingBubble = false;

    setInterval(() => {
      if (this.world.keyboard.SPACE && !this.isShootingBubble && !this.isAttacking) {
        this.currentImage = 0;
        this.isShootingBubble = true;
      }

      if (this.isShootingBubble) {
        this.playAnimation(this.IMAGES_BUBBLE);

        if (this.currentImage >= this.IMAGES_BUBBLE.length) {
          this.isShootingBubble = false;

          setTimeout(() => {
            this.world.spawnBubble(this.x + this.width, this.y + this.height / 2 + 27);
          });
        }
      }
    }, 70);
  }

  getBodyHitbox() {
    let topInset = this.height * (2 / 3);
    let sideInset = 40;

    return {
      x: this.x + sideInset / 2,
      y: this.y + topInset - 60,
      width: this.width - sideInset,
      height: this.height - topInset,
    };
  }

  getAttackHitbox() {
    let bodyHitbox = this.getBodyHitbox();

    return {
      x: bodyHitbox.x + bodyHitbox.width,
      y: bodyHitbox.y,
      width: 15,
      height: bodyHitbox.height,
    };
  }

  getHit() {
    if (this.isHit) return;

    let now = new Date().getTime();
    if (this.lastHitTime && now - this.lastHitTime < 3000) return;

    this.isHit = true;
    this.currentImage = 0;
    this.lastHitTime = now;
    this.lastMoveTime = now;
  }

  hurtAnimation() {
    this.isHit = false;

    setInterval(() => {
      if (this.isHit) {
        this.playAnimation(this.IMAGES_HURT);

        if (this.currentImage >= this.IMAGES_HURT.length) {
          this.isHit = false;
        }
      }
    }, 170);
  }
}
