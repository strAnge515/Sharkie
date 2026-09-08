class Level {
  enemies;
  coins;

  backgroundObjects;
  level_end_x = 3369;

  constructor(enemies, coins, backgroundObjects) {
    this.enemies = enemies;
    this.coins = coins;
    this.backgroundObjects = backgroundObjects;
  }
}

const startEnemy1 = new Enemy('green');
startEnemy1.x = 740;
startEnemy1.y = 60;

const startEnemy2 = new Enemy('orange');
startEnemy2.x = 790;
startEnemy2.y = 220;

const startEnemy3 = new Enemy('blue');
startEnemy3.x = 850;
startEnemy3.y = 340;

const startEnemy4 = new Enemy('green');
startEnemy4.x = 900;
startEnemy4.y = 130;

const coins = [];
for (let i = 0; i < 10; i++) {
  let x = Math.random() * 3369;
  let y = 50 + Math.random() * 300;
  coins.push(new Coin(x, y));
}

const level1 = new Level(
  [startEnemy1, startEnemy2, startEnemy3, startEnemy4],
  coins,

  [
    new BackgroundObject('graphics/3. Background/Layers/5. Water/D1.png', 0, 0.3),
    new BackgroundObject('graphics/3. Background/Layers/4.Fondo 2/D1.png', 0, 0.5),
    new BackgroundObject('graphics/3. Background/Layers/3.Fondo 1/D1.png', 0, 0.8),
    new BackgroundObject('graphics/3. Background/Layers/1. Light/1.png', 0, 1),
    new BackgroundObject('graphics/3. Background/Layers/2. Floor/D1.png', 0, 1),

    new BackgroundObject('graphics/3. Background/Layers/5. Water/D2.png', 849, 0.3),
    new BackgroundObject('graphics/3. Background/Layers/4.Fondo 2/D2.png', 849, 0.5),
    new BackgroundObject('graphics/3. Background/Layers/3.Fondo 1/D2.png', 849, 0.8),
    new BackgroundObject('graphics/3. Background/Layers/1. Light/2.png', 849, 1),
    new BackgroundObject('graphics/3. Background/Layers/2. Floor/D2.png', 849, 1),

    new BackgroundObject('graphics/3. Background/Layers/5. Water/D1.png', 1689, 0.3),
    new BackgroundObject('graphics/3. Background/Layers/4.Fondo 2/D1.png', 1689, 0.5),
    new BackgroundObject('graphics/3. Background/Layers/3.Fondo 1/D1.png', 1689, 0.8),
    new BackgroundObject('graphics/3. Background/Layers/1. Light/1.png', 1698, 1),
    new BackgroundObject('graphics/3. Background/Layers/2. Floor/D1.png', 1698, 1),

    new BackgroundObject('graphics/3. Background/Layers/5. Water/D2.png', 2516, 0.3),
    new BackgroundObject('graphics/3. Background/Layers/4.Fondo 2/D2.png', 2516, 0.5),
    new BackgroundObject('graphics/3. Background/Layers/3.Fondo 1/D2.png', 2516, 0.8),
    new BackgroundObject('graphics/3. Background/Layers/1. Light/2.png', 2547, 1),
    new BackgroundObject('graphics/3. Background/Layers/2. Floor/D2.png', 2547, 1),

    new BackgroundObject('graphics/3. Background/Layers/5. Water/D1.png', 3365, 0.3),
    new BackgroundObject('graphics/3. Background/Layers/4.Fondo 2/D1.png', 3365, 0.5),
    new BackgroundObject('graphics/3. Background/Layers/3.Fondo 1/D1.png', 3365, 0.8),
    new BackgroundObject('graphics/3. Background/Layers/1. Light/1.png', 3369, 1),
    new BackgroundObject('graphics/3. Background/Layers/2. Floor/D1.png', 3369, 1),
  ],
);
