/**
 * A pufferfish enemy. It swims to the left, inflates and deflates from time to time and hurts the shark on contact.
 */
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
  deathType;
  images;

  movementIntervalMs = 1000 / 60;
  animationIntervalMs = 200;
  minStateDurationMs = 3000;
  extraRandomStateDurationMs = 5000;

  /**
   * Creates a pufferfish that swims to the left and inflates and deflates from time to time.
   * @param {string} color - 'green', 'orange' or 'blue'.
   */
  constructor(color) {
    super();
    this.images = this.IMAGES_PUFFERFISH[color];
    this.images.transitionOut = this.images.transition.slice().reverse();
    this.loadAllImages();
    this.loadImage(this.images.swim[0]);
    this.startMovementLoop();
    this.startAnimationLoop();
    this.startInflateTimer();
  }

  /**
   * Preloads all images of this fish so they can be shown without delay.
   */
  loadAllImages() {
    this.loadImages(this.images.swim);
    this.loadImages(this.images.transition);
    this.loadImages(this.images.bubbleSwim);
    this.loadImages(this.images.dead.ceiling);
    this.loadImages(this.images.dead.floor);
  }

  /**
   * @returns {number} A random time in milliseconds the fish stays in one state (swimming or inflated).
   */
  getRandomStateDuration() {
    return this.minStateDurationMs + Math.random() * this.extraRandomStateDurationMs;
  }

  /**
   * Switches to another state and restarts its animation.
   * @param {string} newState - 'swim', 'transition', 'bubbleSwim' or 'transitionOut'.
   */
  changeState(newState) {
    this.state = newState;
    this.currentImage = 0;
  }

  /**
   * After a random time the fish inflates (transition) and then stays inflated (bubbleSwim).
   */
  startInflateTimer() {
    let delayBeforeInflating = this.getRandomStateDuration();

    gameTimeout(() => {
      this.changeState('transition');

      gameTimeout(() => {
        this.changeState('bubbleSwim');
        this.startDeflateTimer();
      }, this.images.transition.length * this.animationIntervalMs);
    }, delayBeforeInflating);
  }

  /**
   * After a random time the inflated fish deflates (transitionOut) and swims normally again.
   */
  startDeflateTimer() {
    let delayBeforeDeflating = this.getRandomStateDuration();

    gameTimeout(() => {
      this.changeState('transitionOut');

      gameTimeout(() => {
        this.changeState('swim');
        this.startInflateTimer();
      }, this.images.transitionOut.length * this.animationIntervalMs);
    }, delayBeforeDeflating);
  }

  /**
   * @returns {{x: number, y: number, width: number, height: number}} The area where the fish can be hit.
   */
  getHitbox() {
    return {
      x: this.x + 15,
      y: this.y + 15 - 7,
      width: this.width - 30,
      height: this.height - 30,
    };
  }

  /**
   * Kills the fish: an inflated fish floats up to the ceiling, a normal fish sinks to the floor.
   */
  die() {
    this.isDead = true;
    this.currentImage = 0;
    this.deathType = this.state === 'bubbleSwim' ? 'ceiling' : 'floor';
  }

  /**
   * Moves the fish: to the left while alive, up or down after its death.
   */
  startMovementLoop() {
    gameInterval(() => {
      if (!this.isDead) this.moveLeft();
      else if (this.deathType === 'ceiling') this.moveUp();
      else this.moveDown();
    }, this.movementIntervalMs);
  }

  /**
   * Plays the animation that belongs to the current state (or the death animation).
   */
  startAnimationLoop() {
    gameInterval(() => {
      let currentImages = this.isDead ? this.images.dead[this.deathType] : this.images[this.state];
      this.playAnimation(currentImages);
    }, this.animationIntervalMs);
  }
}
