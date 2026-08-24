class Level {
  enemies;

  backgroundObjects;
  level_end_x = 2200;

  constructor(enemies, backgroundObjects) {
    this.enemies = enemies;
    this.backgroundObjects = backgroundObjects;
  }
}

const level1 = new Level(
  [],

  [
    new BackgroundObject('graphics/3. Background/Layers/5. Water/D.png', 0, 0.3),
    new BackgroundObject('graphics/3. Background/Layers/4.Fondo 2/D.png', 0, 0.5),
    new BackgroundObject('graphics/3. Background/Layers/3.Fondo 1/D.png', 0, 0.8),
    new BackgroundObject('graphics/3. Background/Layers/1. Light/1.png', 0, 1),
    new BackgroundObject('graphics/3. Background/Layers/2. Floor/D.png', 0, 1),
  ],
);
