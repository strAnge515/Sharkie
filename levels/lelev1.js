

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
    new BackgroundObject('graphics/3. Background/Layers/5. Water/D.png', 0, 80),
    new BackgroundObject('graphics/3. Background/Layers/4.Fondo 2/D.png', 0, 80),
    new BackgroundObject('graphics/3. Background/Layers/3.Fondo 1/D.png', 0, 80),
    new BackgroundObject('graphics/3. Background/Layers/2. Floor/D.png', 0, 80),
  ],
);