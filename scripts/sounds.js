const MUTE_STORAGE_KEY = 'sharkieMuted';

let isMuted = localStorage.getItem(MUTE_STORAGE_KEY) === 'true';
let currentMusic = null;

const SOUNDS = {
  menuMusic: createSound('audio/mainmenu-theme.mp3', 0.3, true),
  levelMusic: createSound('audio/background-music.mp3', 0.25, true),
  bossMusic: createSound('audio/endboss-music.mp3', 0.3, true),
  snore: createSound('audio/snore.mp3', 0.5, true),
  click: createSound('audio/click-for-menu.mp3', 0.5),
  bubble: createSound('audio/bubble-shoot.mp3', 0.5),
  tailSlaps: [1, 2, 3, 4, 5].map((number) => createSound(`audio/tailslap${number}.mp3`, 0.5)),
  fishHit: createSound('audio/fish-get-hit.mp3', 0.5),
  jellyfishHit: createSound('audio/jellyfish-get-hit-from-bubble.mp3', 0.5),
  bossHit: createSound('audio/endboss-get-hit.mp3', 0.6),
  hurtPoison: createSound('audio/get-hurt-from-fish.mp3', 0.6),
  hurtElectric: createSound('audio/get-electric-hit-from-jellyfish.mp3', 0.6),
  coin: createSound('audio/get-coin.mp3', 0.4),
  poisonBottle: createSound('audio/get-poison-pot.mp3', 0.5),
  gameOver: createSound('audio/game-over.mp3', 0.5),
  victory: createSound('audio/victory.mp3', 0.5),
};


/**
 * Creates one sound.
 * @param {string} src - Path to the audio file.
 * @param {number} volume - Volume between 0 and 1.
 * @param {boolean} [loop=false] - True if the sound should repeat endlessly (music, snoring).
 * @returns {HTMLAudioElement} The ready-to-play sound.
 */
function createSound(src, volume, loop = false) {
  let sound = new Audio(src);
  sound.volume = volume;
  sound.loop = loop;
  return sound;
}


/**
 * Plays a sound from the beginning, unless the game is muted.
 * The empty catch prevents a console error when the browser blocks the sound.
 * @param {HTMLAudioElement} sound - The sound to play.
 */
function playSound(sound) {
  if (isMuted) return;
  sound.currentTime = 0;
  sound.play().catch(() => {});
}


/**
 * Plays one random sound out of a list, so repeated actions do not always sound the same.
 * @param {HTMLAudioElement[]} sounds - The sounds to choose from.
 */
function playRandomSound(sounds) {
  let randomIndex = Math.floor(Math.random() * sounds.length);
  playSound(sounds[randomIndex]);
}


/**
 * Switches to another music track. Only one track plays at a time.
 * @param {HTMLAudioElement} music - The music to play.
 */
function playMusic(music) {
  if (currentMusic === music) return;
  stopMusic();
  currentMusic = music;
  playSound(music);
}


/**
 * Stops the music that is currently playing.
 */
function stopMusic() {
  if (!currentMusic) return;
  currentMusic.pause();
  currentMusic = null;
}


/**
 * Continues the current music if it is paused, e.g. when the browser blocked it before the first click.
 */
function resumeMusic() {
  if (isMuted || !currentMusic || !currentMusic.paused) return;
  currentMusic.play().catch(() => {});
}


/**
 * Starts a looping sound (like snoring) only if it is not already playing.
 * @param {HTMLAudioElement} sound - The looping sound.
 */
function startLoopSound(sound) {
  if (isMuted || !sound.paused) return;
  sound.play().catch(() => {});
}


/**
 * Stops a looping sound and rewinds it.
 * @param {HTMLAudioElement} sound - The looping sound.
 */
function stopLoopSound(sound) {
  sound.pause();
  sound.currentTime = 0;
}


/**
 * @returns {HTMLAudioElement[]} Every sound of the game in one flat list.
 */
function getAllSounds() {
  return Object.values(SOUNDS).flat();
}


/**
 * Pauses every sound but remembers the current music, so it can continue after unmuting.
 */
function pauseAllSounds() {
  getAllSounds().forEach((sound) => sound.pause());
}


/**
 * Stops every sound, including the music.
 */
function stopAllSounds() {
  pauseAllSounds();
  currentMusic = null;
}


/**
 * Switches all sounds on or off and saves the choice in the localStorage.
 */
function toggleMute() {
  isMuted = !isMuted;
  localStorage.setItem(MUTE_STORAGE_KEY, isMuted);
  if (isMuted) pauseAllSounds();
  else resumeMusic();
}
