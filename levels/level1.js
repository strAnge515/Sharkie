class Level {
  enemies;
  coins;
  jellyfish;
  poisonBottles;
  finalEnemy;

  backgroundObjects;
  level_end_x = 6765;

  constructor(enemies, coins, jellyfish, poisonBottles, finalEnemy, backgroundObjects) {
    this.enemies = enemies;
    this.coins = coins;
    this.jellyfish = jellyfish;
    this.poisonBottles = poisonBottles;
    this.finalEnemy = finalEnemy;
    this.backgroundObjects = backgroundObjects;
  }
}

// Zone 1 (720-1450): nur Fische, Spieler lernt die Fisch-Gegner kennen
const fishEnemy1 = new Enemy('green');
fishEnemy1.x = 740;
fishEnemy1.y = 200;

const fishEnemy2 = new Enemy('orange');
fishEnemy2.x = 920;
fishEnemy2.y = 80;

const fishEnemy3 = new Enemy('blue');
fishEnemy3.x = 1100;
fishEnemy3.y = 320;

const fishEnemy4 = new Enemy('green');
fishEnemy4.x = 1300;
fishEnemy4.y = 150;

// Zone 2 (1450-2100): Fische und Jellyfish gemischt
const fishEnemy5 = new Enemy('orange');
fishEnemy5.x = 1500;
fishEnemy5.y = 250;

const fishEnemy6 = new Enemy('blue');
fishEnemy6.x = 1750;
fishEnemy6.y = 100;

const jelly1 = new Jellyfish(1600, 350);
const jelly2 = new Jellyfish(1900, 120);

// Zone 3 (2100-2649): Jellyfish-lastig, letzter Fisch, kurz vor der Bosszone
const fishEnemy7 = new Enemy('green');
fishEnemy7.x = 2150;
fishEnemy7.y = 180;

const jelly3 = new Jellyfish(2200, 300);
const jelly4 = new Jellyfish(2350, 90);
const jelly5 = new Jellyfish(2450, 250);
const jelly6 = new Jellyfish(2580, 150);

// Zone 4 (2649-3800): Verschnaufpause nach der Jellyfish-Zone, wieder Fische im Fokus
const fishEnemy8 = new Enemy('blue');
fishEnemy8.x = 2750;
fishEnemy8.y = 150;

const fishEnemy9 = new Enemy('orange');
fishEnemy9.x = 2950;
fishEnemy9.y = 300;

const fishEnemy10 = new Enemy('green');
fishEnemy10.x = 3200;
fishEnemy10.y = 90;

const jelly7 = new Jellyfish(3500, 250);

// Zone 5 (3800-4900): wieder Fische und Jellyfish gemischt
const fishEnemy11 = new Enemy('blue');
fishEnemy11.x = 3850;
fishEnemy11.y = 200;

const fishEnemy12 = new Enemy('orange');
fishEnemy12.x = 4150;
fishEnemy12.y = 100;

const fishEnemy13 = new Enemy('green');
fishEnemy13.x = 4450;
fishEnemy13.y = 320;

const fishEnemy18 = new Enemy('orange');
fishEnemy18.x = 4600;
fishEnemy18.y = 300;

const fishEnemy19 = new Enemy('blue');
fishEnemy19.x = 4850;
fishEnemy19.y = 100;

const fishEnemy21 = new Enemy('green');
fishEnemy21.x = 4000;
fishEnemy21.y = 80;

const fishEnemy22 = new Enemy('orange');
fishEnemy22.x = 4950;
fishEnemy22.y = 300;

const jelly8 = new Jellyfish(3950, 350);
const jelly9 = new Jellyfish(4300, 140);
const jelly10 = new Jellyfish(4700, 260);

// Zone 6 (4900-6045): Jellyfish-lastig, letzte Fische, kurz vor der Bosszone
const fishEnemy14 = new Enemy('blue');
fishEnemy14.x = 5000;
fishEnemy14.y = 180;

const fishEnemy15 = new Enemy('orange');
fishEnemy15.x = 5300;
fishEnemy15.y = 280;

const fishEnemy16 = new Enemy('green');
fishEnemy16.x = 5150;
fishEnemy16.y = 350;

const fishEnemy17 = new Enemy('blue');
fishEnemy17.x = 5600;
fishEnemy17.y = 100;

const fishEnemy20 = new Enemy('green');
fishEnemy20.x = 5480;
fishEnemy20.y = 380;

const fishEnemy23 = new Enemy('blue');
fishEnemy23.x = 5220;
fishEnemy23.y = 150;

const fishEnemy24 = new Enemy('orange');
fishEnemy24.x = 5700;
fishEnemy24.y = 280;

const fishEnemy25 = new Enemy('green');
fishEnemy25.x = 5900;
fishEnemy25.y = 200;

const jelly11 = new Jellyfish(5100, 100);
const jelly12 = new Jellyfish(5450, 320);
const jelly13 = new Jellyfish(5750, 150);
const jelly14 = new Jellyfish(5950, 250);

const jellyfish = [
  jelly1, jelly2, jelly3, jelly4, jelly5, jelly6,
  jelly7, jelly8, jelly9, jelly10, jelly11, jelly12, jelly13, jelly14,
];

// ein paar Gift-Flaschen direkt platziert, damit Nachschub nicht nur vom Fisch-Kill abhängt
const poisonBottles = [
  new PoisonBottle(2050, 260), new PoisonBottle(2320, 140), new PoisonBottle(2600, 300),
  new PoisonBottle(5550, 200), new PoisonBottle(5850, 300),

  // Auffüll-Cluster kurz vor der Bosszone (ab x=6045), damit die Leiste vorm Kampf voll ist
  new PoisonBottle(5700, 320), new PoisonBottle(5820, 80), new PoisonBottle(5960, 380), new PoisonBottle(6030, 180),
];

const coins = [];
for (let i = 0; i < 10; i++) {
  let x = 720 + Math.random() * (6765 - 300 - 720);
  let y = 50 + Math.random() * 300;
  coins.push(new Coin(x, y));
}

const finalEnemy = new FinalEnemy(6765 - 350, 130);

const level1 = new Level(
  [
    fishEnemy1, fishEnemy2, fishEnemy3, fishEnemy4, fishEnemy5, fishEnemy6, fishEnemy7,
    fishEnemy8, fishEnemy9, fishEnemy10, fishEnemy11, fishEnemy12, fishEnemy13, fishEnemy14, fishEnemy15,
    fishEnemy16, fishEnemy17, fishEnemy18, fishEnemy19, fishEnemy20,
    fishEnemy21, fishEnemy22, fishEnemy23, fishEnemy24, fishEnemy25,
  ],
  coins,
  jellyfish,
  poisonBottles,
  finalEnemy,

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

    new BackgroundObject('graphics/3. Background/Layers/5. Water/D2.png', 4214, 0.3),
    new BackgroundObject('graphics/3. Background/Layers/4.Fondo 2/D2.png', 4214, 0.5),
    new BackgroundObject('graphics/3. Background/Layers/3.Fondo 1/D2.png', 4214, 0.8),
    new BackgroundObject('graphics/3. Background/Layers/1. Light/2.png', 4218, 1),
    new BackgroundObject('graphics/3. Background/Layers/2. Floor/D2.png', 4218, 1),

    new BackgroundObject('graphics/3. Background/Layers/5. Water/D1.png', 5063, 0.3),
    new BackgroundObject('graphics/3. Background/Layers/4.Fondo 2/D1.png', 5063, 0.5),
    new BackgroundObject('graphics/3. Background/Layers/3.Fondo 1/D1.png', 5063, 0.8),
    new BackgroundObject('graphics/3. Background/Layers/1. Light/1.png', 5067, 1),
    new BackgroundObject('graphics/3. Background/Layers/2. Floor/D1.png', 5067, 1),

    new BackgroundObject('graphics/3. Background/Layers/5. Water/D2.png', 5912, 0.3),
    new BackgroundObject('graphics/3. Background/Layers/4.Fondo 2/D2.png', 5912, 0.5),
    new BackgroundObject('graphics/3. Background/Layers/3.Fondo 1/D2.png', 5912, 0.8),
    new BackgroundObject('graphics/3. Background/Layers/1. Light/2.png', 5916, 1),
    new BackgroundObject('graphics/3. Background/Layers/2. Floor/D2.png', 5916, 1),

    new BackgroundObject('graphics/3. Background/Layers/5. Water/D1.png', 6761, 0.3),
    new BackgroundObject('graphics/3. Background/Layers/4.Fondo 2/D1.png', 6761, 0.5),
    new BackgroundObject('graphics/3. Background/Layers/3.Fondo 1/D1.png', 6761, 0.8),
    new BackgroundObject('graphics/3. Background/Layers/1. Light/1.png', 6765, 1),
    new BackgroundObject('graphics/3. Background/Layers/2. Floor/D1.png', 6765, 1),
  ],
);
