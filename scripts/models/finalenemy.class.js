class FinalEnemy extends MoveableObject {
  IMAGES_INTRODUCE = [
    'graphics/2.Enemy/3 Final Enemy/1.Introduce/1.png',
    'graphics/2.Enemy/3 Final Enemy/1.Introduce/2.png',
    'graphics/2.Enemy/3 Final Enemy/1.Introduce/3.png',
    'graphics/2.Enemy/3 Final Enemy/1.Introduce/4.png',
    'graphics/2.Enemy/3 Final Enemy/1.Introduce/5.png',
    'graphics/2.Enemy/3 Final Enemy/1.Introduce/6.png',
    'graphics/2.Enemy/3 Final Enemy/1.Introduce/7.png',
    'graphics/2.Enemy/3 Final Enemy/1.Introduce/8.png',
    'graphics/2.Enemy/3 Final Enemy/1.Introduce/9.png',
    'graphics/2.Enemy/3 Final Enemy/1.Introduce/10.png',
  ];

  IMAGES_FLOATING = [
    'graphics/2.Enemy/3 Final Enemy/2.floating/1.png',
    'graphics/2.Enemy/3 Final Enemy/2.floating/2.png',
    'graphics/2.Enemy/3 Final Enemy/2.floating/3.png',
    'graphics/2.Enemy/3 Final Enemy/2.floating/4.png',
    'graphics/2.Enemy/3 Final Enemy/2.floating/5.png',
    'graphics/2.Enemy/3 Final Enemy/2.floating/6.png',
    'graphics/2.Enemy/3 Final Enemy/2.floating/7.png',
    'graphics/2.Enemy/3 Final Enemy/2.floating/8.png',
    'graphics/2.Enemy/3 Final Enemy/2.floating/9.png',
    'graphics/2.Enemy/3 Final Enemy/2.floating/10.png',
    'graphics/2.Enemy/3 Final Enemy/2.floating/11.png',
    'graphics/2.Enemy/3 Final Enemy/2.floating/12.png',
    'graphics/2.Enemy/3 Final Enemy/2.floating/13.png',
  ];

  IMAGES_ATTACK = [
    'graphics/2.Enemy/3 Final Enemy/Attack/1.png',
    'graphics/2.Enemy/3 Final Enemy/Attack/2.png',
    'graphics/2.Enemy/3 Final Enemy/Attack/3.png',
    'graphics/2.Enemy/3 Final Enemy/Attack/4.png',
    'graphics/2.Enemy/3 Final Enemy/Attack/5.png',
    'graphics/2.Enemy/3 Final Enemy/Attack/6.png',
  ];

  IMAGES_HURT = [
    'graphics/2.Enemy/3 Final Enemy/Hurt/1.png',
    'graphics/2.Enemy/3 Final Enemy/Hurt/2.png',
    'graphics/2.Enemy/3 Final Enemy/Hurt/3.png',
    'graphics/2.Enemy/3 Final Enemy/Hurt/4.png',
  ];

  IMAGES_DEAD = [
    'graphics/2.Enemy/3 Final Enemy/Dead/Mesa de trabajo 2.png',
    'graphics/2.Enemy/3 Final Enemy/Dead/Mesa de trabajo 2 copia 6.png',
    'graphics/2.Enemy/3 Final Enemy/Dead/Mesa de trabajo 2 copia 7.png',
    'graphics/2.Enemy/3 Final Enemy/Dead/Mesa de trabajo 2 copia 8.png',
    'graphics/2.Enemy/3 Final Enemy/Dead/Mesa de trabajo 2 copia 9.png',
    'graphics/2.Enemy/3 Final Enemy/Dead/Mesa de trabajo 2 copia 10.png',
  ];

  width = 350;
  height = 330;
  health = 3;
  hasAppeared = false;
  isVisible = false;
  isIntroducing = false;
  isAttacking = false;
  isHit = false;
  isDead = false;

  constructor(x, y) {
    super();
    this.x = x;
    this.y = y;
    this.loadImages(this.IMAGES_INTRODUCE);
    this.loadImages(this.IMAGES_FLOATING);
    this.loadImages(this.IMAGES_ATTACK);
    this.loadImages(this.IMAGES_HURT);
    this.loadImages(this.IMAGES_DEAD);
    this.animate();
    this.startAttackTimer();
  }

  startAttackTimer() {
    let delay = 4000 + Math.random() * 4000;

    setTimeout(() => {
      if (this.isVisible && !this.isDead && !this.isHit && !this.isIntroducing) {
        this.currentImage = 0;
        this.isAttacking = true;
      }

      this.startAttackTimer();
    }, delay);
  }

  appear() {
    if (this.hasAppeared) return;
    this.hasAppeared = true;

    setTimeout(() => {
      this.currentImage = 0;
      this.isIntroducing = true;
      this.img = this.imageCache[this.IMAGES_INTRODUCE[0]];
      this.isVisible = true;
    }, 2500);
  }

  animate() {
    setInterval(() => {
      if (!this.isVisible) return;

      if (this.isDead) {
        if (this.currentImage < this.IMAGES_DEAD.length) {
          this.playAnimation(this.IMAGES_DEAD);
        }
      } else if (this.isHit) {
        this.playAnimation(this.IMAGES_HURT);

        if (this.currentImage >= this.IMAGES_HURT.length) {
          this.isHit = false;
          this.currentImage = 0;
        }
      } else if (this.isIntroducing) {
        this.playAnimation(this.IMAGES_INTRODUCE);

        if (this.currentImage >= this.IMAGES_INTRODUCE.length) {
          this.isIntroducing = false;
          this.currentImage = 0;
        }
      } else if (this.isAttacking) {
        this.playAnimation(this.IMAGES_ATTACK);

        if (this.currentImage >= this.IMAGES_ATTACK.length) {
          this.isAttacking = false;
          this.currentImage = 0;
        }
      } else {
        this.playAnimation(this.IMAGES_FLOATING);
      }
    }, 150);
  }

  hit() {
    if (!this.isVisible || this.isDead || this.isIntroducing) return;

    this.health--;
    this.currentImage = 0;

    if (this.health <= 0) {
      this.isDead = true;
    } else {
      this.isHit = true;
    }
  }

  getHitbox() {
    return {
      x: this.x + 40,
      y: this.y + 20,
      width: this.width - 80,
      height: this.height - 40,
    };
  }
}
