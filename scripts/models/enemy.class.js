class Enemy extends MoveableObject {
  IMAGES_PUFFERFISH = {
    green: {
      swim: [
        'graphics/2.Enemy/1.Puffer fish (3 color options)/1.Swim/1.swim1.png',
        'graphics/2.Enemy/1.Puffer fish (3 color options)/1.Swim/1.swim2.png',
        'graphics/2.Enemy/1.Puffer fish (3 color options)/1.Swim/1.swim3.png',
        'graphics/2.Enemy/1.Puffer fish (3 color options)/1.Swim/1.swim4.png',
        'graphics/2.Enemy/1.Puffer fish (3 color options)/1.Swim/1.swim5.png',
      ],
      transition: [
        'graphics/2.Enemy/1.Puffer fish (3 color options)/2.transition/1.transition1.png',
        'graphics/2.Enemy/1.Puffer fish (3 color options)/2.transition/1.transition2.png',
        'graphics/2.Enemy/1.Puffer fish (3 color options)/2.transition/1.transition3.png',
        'graphics/2.Enemy/1.Puffer fish (3 color options)/2.transition/1.transition4.png',
        'graphics/2.Enemy/1.Puffer fish (3 color options)/2.transition/1.transition5.png',
      ],
      bubbleSwim: [
        'graphics/2.Enemy/1.Puffer fish (3 color options)/3.Bubbleeswim/1.bubbleswim1.png',
        'graphics/2.Enemy/1.Puffer fish (3 color options)/3.Bubbleeswim/1.bubbleswim2.png',
        'graphics/2.Enemy/1.Puffer fish (3 color options)/3.Bubbleeswim/1.bubbleswim3.png',
        'graphics/2.Enemy/1.Puffer fish (3 color options)/3.Bubbleeswim/1.bubbleswim4.png',
        'graphics/2.Enemy/1.Puffer fish (3 color options)/3.Bubbleeswim/1.bubbleswim5.png',
      ],
      dead: {
        ceiling: ['graphics/2.Enemy/1.Puffer fish (3 color options)/4.DIE/1.Dead 1 (can animate by going up).png'],
        floor: [
          'graphics/2.Enemy/1.Puffer fish (3 color options)/4.DIE/1.Dead 2 (can animate by going down to the floor after the Fin Slap attack).png',
          'graphics/2.Enemy/1.Puffer fish (3 color options)/4.DIE/1.Dead 3 (can animate by going down to the floor after the Fin Slap attack).png',
        ],
      },
    },
    orange: {
      swim: [
        'graphics/2.Enemy/1.Puffer fish (3 color options)/1.Swim/2.swim1.png',
        'graphics/2.Enemy/1.Puffer fish (3 color options)/1.Swim/2.swim2.png',
        'graphics/2.Enemy/1.Puffer fish (3 color options)/1.Swim/2.swim3.png',
        'graphics/2.Enemy/1.Puffer fish (3 color options)/1.Swim/2.swim4.png',
        'graphics/2.Enemy/1.Puffer fish (3 color options)/1.Swim/2.swim5.png',
      ],
      transition: [
        'graphics/2.Enemy/1.Puffer fish (3 color options)/2.transition/2.transition1.png',
        'graphics/2.Enemy/1.Puffer fish (3 color options)/2.transition/2.transition2.png',
        'graphics/2.Enemy/1.Puffer fish (3 color options)/2.transition/2.transition3.png',
        'graphics/2.Enemy/1.Puffer fish (3 color options)/2.transition/2.transition4.png',
        'graphics/2.Enemy/1.Puffer fish (3 color options)/2.transition/2.transition5.png',
      ],
      bubbleSwim: [
        'graphics/2.Enemy/1.Puffer fish (3 color options)/3.Bubbleeswim/2.bubbleswim1.png',
        'graphics/2.Enemy/1.Puffer fish (3 color options)/3.Bubbleeswim/2.bubbleswim2.png',
        'graphics/2.Enemy/1.Puffer fish (3 color options)/3.Bubbleeswim/2.bubbleswim3.png',
        'graphics/2.Enemy/1.Puffer fish (3 color options)/3.Bubbleeswim/2.bubbleswim4.png',
        'graphics/2.Enemy/1.Puffer fish (3 color options)/3.Bubbleeswim/2.bubbleswim5.png',
      ],
      dead: {
        ceiling: ['graphics/2.Enemy/1.Puffer fish (3 color options)/4.DIE/2.png'],
        floor: [
          'graphics/2.Enemy/1.Puffer fish (3 color options)/4.DIE/2.2.png',
          'graphics/2.Enemy/1.Puffer fish (3 color options)/4.DIE/2.3.png',
        ],
      },
    },
    blue: {
      swim: [
        'graphics/2.Enemy/1.Puffer fish (3 color options)/1.Swim/3.swim1.png',
        'graphics/2.Enemy/1.Puffer fish (3 color options)/1.Swim/3.swim2.png',
        'graphics/2.Enemy/1.Puffer fish (3 color options)/1.Swim/3.swim3.png',
        'graphics/2.Enemy/1.Puffer fish (3 color options)/1.Swim/3.swim4.png',
        'graphics/2.Enemy/1.Puffer fish (3 color options)/1.Swim/3.swim5.png',
      ],
      transition: [
        'graphics/2.Enemy/1.Puffer fish (3 color options)/2.transition/3.transition1.png',
        'graphics/2.Enemy/1.Puffer fish (3 color options)/2.transition/3.transition2.png',
        'graphics/2.Enemy/1.Puffer fish (3 color options)/2.transition/3.transition3.png',
        'graphics/2.Enemy/1.Puffer fish (3 color options)/2.transition/3.transition4.png',
        'graphics/2.Enemy/1.Puffer fish (3 color options)/2.transition/3.transition5.png',
      ],
      bubbleSwim: [
        'graphics/2.Enemy/1.Puffer fish (3 color options)/3.Bubbleeswim/3.bubbleswim1.png',
        'graphics/2.Enemy/1.Puffer fish (3 color options)/3.Bubbleeswim/3.bubbleswim2.png',
        'graphics/2.Enemy/1.Puffer fish (3 color options)/3.Bubbleeswim/3.bubbleswim3.png',
        'graphics/2.Enemy/1.Puffer fish (3 color options)/3.Bubbleeswim/3.bubbleswim4.png',
        'graphics/2.Enemy/1.Puffer fish (3 color options)/3.Bubbleeswim/3.bubbleswim5.png',
      ],
      dead: {
        ceiling: ['graphics/2.Enemy/1.Puffer fish (3 color options)/4.DIE/3.png'],
        floor: [
          'graphics/2.Enemy/1.Puffer fish (3 color options)/4.DIE/3.2.png',
          'graphics/2.Enemy/1.Puffer fish (3 color options)/4.DIE/3.3.png',
        ],
      },
    },
  };

  x = 400 + Math.random() * 500;
 y = 50 + Math.random() * 300;
  width = 100;
  height = 80;
  speed = 0.3 + Math.random() * 0.3;
  state = 'swim';
  isDead = false;

  constructor(color) {
    super();
    this.images = this.IMAGES_PUFFERFISH[color];

    this.loadImages(this.images.swim);
    this.loadImages(this.images.transition);
    this.loadImages(this.images.bubbleSwim);
    this.loadImages(this.images.dead.ceiling);
    this.loadImages(this.images.dead.floor);

    this.loadImage(this.images.swim[0]);

    this.animate();
    this.startInflateTimer();
  }

  startInflateTimer() {
    let delay = 3000 + Math.random() * 5000;

    setTimeout(() => {
      this.state = 'transition';
      this.currentImage = 0;

      setTimeout(() => {
        this.state = 'bubbleSwim';
        this.currentImage = 0;
      }, this.images.transition.length * 200);
    }, delay);
  }

  getHitbox() {
    return {
      x: this.x + 15,
      y: this.y + 15 - 7,
      width: this.width - 30,
      height: this.height - 30,
    };
  }

  die() {
    this.isDead = true;
    this.currentImage = 0;
    this.deathType = this.state === 'bubbleSwim' ? 'ceiling' : 'floor';
  }

  animate() {
  setInterval(() => {
    if (this.isDead) {
      if (this.deathType === 'ceiling') {
        this.moveUp();
      } else {
        this.moveDown();
      }
    } else {
      this.moveLeft();
    }
  }, 1000 / 60);

  setInterval(() => {
    if (this.isDead) {
      this.playAnimation(this.images.dead[this.deathType]);
    } else {
      this.playAnimation(this.images[this.state]);
    }
  }, 200);
}
}
