const LEVEL_1_END_X = 6765;
const LEVEL_1_COIN_COUNT = 10;
const LEVEL_1_FIRST_COIN_X = 720;
const LEVEL_1_COIN_END_MARGIN = 300;
const LEVEL_1_BOSS_OFFSET_FROM_END = 350;
const LEVEL_1_BOSS_Y = 130;

/**
 * Pufferfish placements in the order they are added to the level (zone = part of the level).
 * Zone 1 (720-1450): only fish, the player learns the fish enemies.
 * Zone 2 (1450-2100): fish and jellyfish mixed.
 * Zone 3 (2100-2649): mostly jellyfish, one last fish before the boss zone.
 * Zone 4 (2649-3800): breather after the jellyfish zone, fish in focus again.
 * Zone 5 (3800-4900): fish and jellyfish mixed again.
 * Zone 6 (4900-6045): mostly jellyfish, last fish right before the boss zone.
 */
const LEVEL_1_FISH_PLACEMENTS = [
  { color: 'green', x: 740, y: 200 }, // zone 1
  { color: 'orange', x: 920, y: 80 }, // zone 1
  { color: 'blue', x: 1100, y: 320 }, // zone 1
  { color: 'green', x: 1300, y: 150 }, // zone 1
  { color: 'orange', x: 1500, y: 250 }, // zone 2
  { color: 'blue', x: 1750, y: 100 }, // zone 2
  { color: 'green', x: 2150, y: 180 }, // zone 3
  { color: 'blue', x: 2750, y: 150 }, // zone 4
  { color: 'orange', x: 2950, y: 300 }, // zone 4
  { color: 'green', x: 3200, y: 90 }, // zone 4
  { color: 'blue', x: 3850, y: 200 }, // zone 5
  { color: 'orange', x: 4150, y: 100 }, // zone 5
  { color: 'green', x: 4450, y: 320 }, // zone 5
  { color: 'blue', x: 5000, y: 180 }, // zone 6
  { color: 'orange', x: 5300, y: 280 }, // zone 6
  { color: 'green', x: 5150, y: 350 }, // zone 6
  { color: 'blue', x: 5600, y: 100 }, // zone 6
  { color: 'orange', x: 4600, y: 300 }, // zone 5
  { color: 'blue', x: 4850, y: 100 }, // zone 5
  { color: 'green', x: 5480, y: 380 }, // zone 6
  { color: 'green', x: 4000, y: 80 }, // zone 5
  { color: 'green', x: 5900, y: 200 }, // zone 6
];

/** Jellyfish placements, ordered by zone (see LEVEL_1_FISH_PLACEMENTS). */
const LEVEL_1_JELLYFISH_PLACEMENTS = [
  { x: 1600, y: 350 },
  { x: 1900, y: 120 },
  { x: 2200, y: 300 },
  { x: 2350, y: 90 },
  { x: 2450, y: 250 },
  { x: 2580, y: 150 },
  { x: 3500, y: 250 },
  { x: 3950, y: 350 },
  { x: 4300, y: 140 },
  { x: 4700, y: 260 },
  { x: 5100, y: 100 },
  { x: 5450, y: 320 },
  { x: 5750, y: 150 },
  { x: 5950, y: 250 },
];

/**
 * Poison bottles placed by hand, so supplies do not only depend on killing fish.
 * The last four form a refill cluster shortly before the boss zone (from x = 6045),
 * so the poison bar is full before the boss fight.
 */
const LEVEL_1_POISON_BOTTLE_PLACEMENTS = [
  { x: 2050, y: 260 },
  { x: 2320, y: 140 },
  { x: 2600, y: 300 },
  { x: 5550, y: 200 },
  { x: 5850, y: 300 },
  { x: 5700, y: 320 },
  { x: 5820, y: 80 },
  { x: 5960, y: 380 },
  { x: 6030, y: 180 },
];

/**
 * Background segments from left to right, each using image variant 1 or 2.
 * The far layers (water and the two background layers) start at farLayersX, the light and
 * floor layers at nearLayersX. The small differences between both values are tuned so that
 * no gaps are visible between the segments.
 */
const LEVEL_1_BACKGROUND_SEGMENTS = [
  { imageVariant: 1, farLayersX: 0, nearLayersX: 0 },
  { imageVariant: 2, farLayersX: 849, nearLayersX: 849 },
  { imageVariant: 1, farLayersX: 1689, nearLayersX: 1698 },
  { imageVariant: 2, farLayersX: 2516, nearLayersX: 2547 },
  { imageVariant: 1, farLayersX: 3365, nearLayersX: 3369 },
  { imageVariant: 2, farLayersX: 4214, nearLayersX: 4218 },
  { imageVariant: 1, farLayersX: 5063, nearLayersX: 5067 },
  { imageVariant: 2, farLayersX: 5912, nearLayersX: 5916 },
  { imageVariant: 1, farLayersX: 6761, nearLayersX: 6765 },
];

/**
 * Builds a fresh level 1 with new enemies, coins and bottles.
 * @returns {Level} The new level.
 */
function createLevel1() {
  return new Level(
    createFishEnemies(LEVEL_1_FISH_PLACEMENTS),
    createRandomCoins(LEVEL_1_COIN_COUNT, LEVEL_1_END_X),
    createJellyfish(LEVEL_1_JELLYFISH_PLACEMENTS),
    createPoisonBottles(LEVEL_1_POISON_BOTTLE_PLACEMENTS),
    new FinalEnemy(LEVEL_1_END_X - LEVEL_1_BOSS_OFFSET_FROM_END, LEVEL_1_BOSS_Y),
    createBackgroundObjects(LEVEL_1_BACKGROUND_SEGMENTS),
    LEVEL_1_END_X,
  );
}

/**
 * @param {{color: string, x: number, y: number}[]} placements - Color and start position of every fish.
 * @returns {Enemy[]} The pufferfish at their start positions.
 */
function createFishEnemies(placements) {
  return placements.map((placement) => {
    let fish = new Enemy(placement.color);
    fish.x = placement.x;
    fish.y = placement.y;
    return fish;
  });
}

/**
 * @param {{x: number, y: number}[]} placements - Position of every jellyfish.
 * @returns {Jellyfish[]} The jellyfish at their positions.
 */
function createJellyfish(placements) {
  return placements.map((placement) => new Jellyfish(placement.x, placement.y));
}

/**
 * @param {{x: number, y: number}[]} placements - Position of every poison bottle.
 * @returns {PoisonBottle[]} The poison bottles at their positions.
 */
function createPoisonBottles(placements) {
  return placements.map((placement) => new PoisonBottle(placement.x, placement.y));
}

/**
 * Creates coins at random positions between the first screen and shortly before the level end.
 * @param {number} coinCount - How many coins to create.
 * @param {number} levelEndX - The x position where the level ends.
 * @returns {Coin[]} The coins.
 */
function createRandomCoins(coinCount, levelEndX) {
  let coins = [];
  let coinAreaWidth = levelEndX - LEVEL_1_COIN_END_MARGIN - LEVEL_1_FIRST_COIN_X;

  for (let coinNumber = 0; coinNumber < coinCount; coinNumber++) {
    let coinX = LEVEL_1_FIRST_COIN_X + Math.random() * coinAreaWidth;
    let coinY = 50 + Math.random() * 300;
    coins.push(new Coin(coinX, coinY));
  }
  return coins;
}

/**
 * @param {{imageVariant: number, farLayersX: number, nearLayersX: number}[]} segments - The background segments.
 * @returns {BackgroundObject[]} All background layers of all segments, from left to right.
 */
function createBackgroundObjects(segments) {
  return segments.flatMap(createBackgroundSegment);
}

/**
 * Creates the five layers of one background segment (water, two far layers, light and floor).
 * The last number is the parallax factor: layers with a small number move slower than the camera.
 * @param {{imageVariant: number, farLayersX: number, nearLayersX: number}} segment - The segment to create.
 * @returns {BackgroundObject[]} The five layers of the segment.
 */
function createBackgroundSegment(segment) {
  let layersFolder = 'graphics/3. Background/Layers/';
  let variant = segment.imageVariant;

  return [
    new BackgroundObject(`${layersFolder}5. Water/D${variant}.png`, segment.farLayersX, 0.3),
    new BackgroundObject(`${layersFolder}4.Fondo 2/D${variant}.png`, segment.farLayersX, 0.5),
    new BackgroundObject(`${layersFolder}3.Fondo 1/D${variant}.png`, segment.farLayersX, 0.8),
    new BackgroundObject(`${layersFolder}1. Light/${variant}.png`, segment.nearLayersX, 1),
    new BackgroundObject(`${layersFolder}2. Floor/D${variant}.png`, segment.nearLayersX, 1),
  ];
}
