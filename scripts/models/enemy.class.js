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
        ceiling: [],
        floor: [],
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
        'graphics/2.Enemy/1.Puffer fish (3 color options)/3.Bubbleeswim/1.bubbleswim1.png',
        'graphics/2.Enemy/1.Puffer fish (3 color options)/3.Bubbleeswim/2.bubbleswim2.png',
        'graphics/2.Enemy/1.Puffer fish (3 color options)/3.Bubbleeswim/2.bubbleswim3.png',
        'graphics/2.Enemy/1.Puffer fish (3 color options)/3.Bubbleeswim/2.bubbleswim4.png',
        'graphics/2.Enemy/1.Puffer fish (3 color options)/3.Bubbleeswim/2.bubbleswim5.png',
      ],
      dead: {
        ceiling: [],
        floor: [],
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
        ceiling: [],
        floor: [],
      },
    },
  };

  x = 400 + Math.random() * 500;
 y = 50 + Math.random() * 300;
  width = 100;
  height = 80;
  speed = 0.3 + Math.random() * 0.3;

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
  }

  animate() {
  setInterval(() => {
    this.moveLeft();
  }, 1000 / 60);

  setInterval(() => {
    this.playAnimation(this.images.swim);
  }, 200);
}
}
