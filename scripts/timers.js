let activeTimers = [];

/**
 * Works like setInterval, but remembers the timer so it can be stopped when the game ends or restarts.
 * @param {Function} callback - The function that is called again and again.
 * @param {number} delay - Time between the calls in milliseconds.
 * @returns {number} The id of the interval.
 */
function gameInterval(callback, delay) {
  let intervalId = setInterval(callback, delay);
  activeTimers.push(intervalId);
  return intervalId;
}

/**
 * Works like setTimeout, but remembers the timer so it can be stopped when the game ends or restarts.
 * @param {Function} callback - The function that is called once.
 * @param {number} delay - Waiting time in milliseconds.
 * @returns {number} The id of the timeout.
 */
function gameTimeout(callback, delay) {
  let timeoutId = setTimeout(callback, delay);
  activeTimers.push(timeoutId);
  return timeoutId;
}

/**
 * Stops all timers that were started with gameInterval or gameTimeout.
 */
function clearGameTimers() {
  activeTimers.forEach((timerId) => {
    clearInterval(timerId);
    clearTimeout(timerId);
  });
  activeTimers = [];
}
