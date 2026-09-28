let canvas;
let world;
let keyboard = new Keyboard();

/**
 * Runs when the page has loaded: finds the canvas, lets the controls dialog close on a click outside of it
 * and connects the touch buttons.
 */
function init() {
  canvas = document.getElementById('canvas');
  let controlsDialog = document.getElementById('controlsDialog');

  controlsDialog.addEventListener('click', (event) => {
    if (event.target === controlsDialog) closeControls();
  });
  registerTouchButtons();
  startMenuMusic();
}

/**
 * Starts the menu music. Browsers block sound until the first click or key press,
 * so the music is resumed on the first interaction.
 */
function startMenuMusic() {
  playMusic(SOUNDS.menuMusic);
  document.addEventListener('pointerdown', resumeMusic);
  document.addEventListener('keydown', resumeMusic);
}

/**
 * Connects every touch button with the game key stored in its data-key attribute.
 */
function registerTouchButtons() {
  document.querySelectorAll('.touch-button').forEach((button) => {
    let keyName = button.dataset.key;
    button.addEventListener('touchstart', (event) => handleTouch(event, keyName, true), { passive: false });
    button.addEventListener('touchend', (event) => handleTouch(event, keyName, false));
    button.addEventListener('touchcancel', (event) => handleTouch(event, keyName, false));
    button.addEventListener('contextmenu', (event) => event.preventDefault());
  });
}

/**
 * Presses or releases a game key through a touch button. preventDefault stops the browser from scrolling or zooming.
 * @param {TouchEvent} event - The touch event.
 * @param {string} keyName - The key this button stands for, for example 'ArrowLeft'.
 * @param {boolean} isPressed - True when the finger touches the button, false when it lets go.
 */
function handleTouch(event, keyName, isPressed) {
  event.preventDefault();
  setKeyState(keyName, isPressed);
}

/**
 * Shows or hides an element by switching its 'hidden' CSS class.
 * @param {string} elementId - The id of the element.
 * @param {boolean} hidden - True hides the element, false shows it.
 */
function setHidden(elementId, hidden) {
  document.getElementById(elementId).classList.toggle('hidden', hidden);
}

/**
 * Starts a new game (also used for restarting): stops the old game and builds a fresh level and world.
 */
function startGame() {
  if (world) world.stop();
  stopAllSounds();
  playSound(SOUNDS.click);
  playMusic(SOUNDS.levelMusic);
  setHidden('startScreen', true);
  setHidden('endScreen', true);
  keyboard = new Keyboard();
  world = new World(canvas, keyboard, createLevel1());
}

/**
 * Shows the end screen with the title that fits the result.
 * @param {boolean} hasWon - True after a win, false after game over.
 */
function showEndScreen(hasWon) {
  setHidden('gameOverTitle', hasWon);
  setHidden('winTitle', !hasWon);
  setHidden('endScreen', false);
}

/**
 * Stops the game and shows the start screen again.
 */
function backToMenu() {
  if (world) world.stop();
  world = null;
  stopAllSounds();
  playSound(SOUNDS.click);
  playMusic(SOUNDS.menuMusic);
  canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height);
  setHidden('endScreen', true);
  setHidden('startScreen', false);
}

/**
 * Opens the dialog that explains the keys.
 */
function openControls() {
  playSound(SOUNDS.click);
  document.getElementById('controlsDialog').showModal();
}

/**
 * Closes the dialog that explains the keys.
 */
function closeControls() {
  playSound(SOUNDS.click);
  document.getElementById('controlsDialog').close();
}

/**
 * Remembers a game key as pressed.
 * @param {KeyboardEvent} event - The keydown event.
 */
function handleKeyDown(event) {
  setKeyState(event.key, true);
}

/**
 * Remembers a game key as released.
 * @param {KeyboardEvent} event - The keyup event.
 */
function handleKeyUp(event) {
  setKeyState(event.key, false);
}

/**
 * Sets the state of the matching game key.
 * @param {string} keyName - The name of the key, for example 'ArrowLeft' or ' ' (space).
 * @param {boolean} isPressed - True while the key is held down.
 */
function setKeyState(keyName, isPressed) {
  if (keyName === 'ArrowLeft') keyboard.LEFT = isPressed;
  if (keyName === 'ArrowRight') keyboard.RIGHT = isPressed;
  if (keyName === 'ArrowUp') keyboard.UP = isPressed;
  if (keyName === 'ArrowDown') keyboard.DOWN = isPressed;
  if (keyName === ' ') keyboard.SPACE = isPressed;
  if (keyName === 'd') keyboard.D = isPressed;
}

window.addEventListener('keydown', handleKeyDown);
window.addEventListener('keyup', handleKeyUp);
