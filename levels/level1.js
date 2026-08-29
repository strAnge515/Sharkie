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
