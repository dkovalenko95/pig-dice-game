'use strict';

// Elements
const player0 = document.querySelector('.player--0');
const player1 = document.querySelector('.player--1');

const score0El = document.querySelector('#score--0');
const score1El = document.querySelector('#score--1');
const current0El = document.querySelector('#current--0');
const current1El = document.querySelector('#current--1');

const diceEl = document.querySelector('.dice');

const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

let generalScores, currentScore, activePlayer, playing;

// Starting conditions
const init = function() {
  diceEl.classList.add('hidden');

  generalScores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  playing = true;

  score0El.textContent = 0;
  score1El.textContent = 0;
  current0El.textContent = 0;
  current1El.textContent = 0;

  player0.classList.add('player--active');
  player0.classList.remove('player--winner');
  player1.classList.remove('player--active');
  player1.classList.remove('player--winner');
};

init();

// Switching player
const switchPlayer = function() {
  // Set current score back to 0
  document.querySelector(`#current--${activePlayer}`).textContent = 0;
  currentScore = 0;

  // Switch to next player
  activePlayer = activePlayer === 0 ? 1 : 0;

  // Bg switch between players
  player0.classList.toggle('player--active');
  player1.classList.toggle('player--active');
};

// Rolling dice functionallity
btnRoll.addEventListener('click', function() {
    if (playing) {
    // 1. Generate a random num
    const dice = Math.trunc(Math.random() * 6) + 1;

    // 2. Display dice
    diceEl.classList.remove('hidden');
    diceEl.src = `img/dice-${dice}.png`;

    // 3. Check for rolled "1"
    if (dice !== 1) {
      // Add dice to current score
      currentScore += dice; 

      // Selecting score element dynamically based on which player is 'active' 
      document.querySelector(`#current--${activePlayer}`).textContent = currentScore; 

    } else {
      switchPlayer();
    };
  };
});

// Hold functionallity
btnHold.addEventListener('click', function() {
  if (playing) {
    // 1. Add current score to active player's score;
    generalScores[activePlayer] += currentScore;

    // Display generalScore of active player
    document.querySelector(`#score--${activePlayer}`).textContent = generalScores[activePlayer];

    // 2. Check if player's score >= 100
    if (generalScores[activePlayer] >= 100) {
      // 'true' - finish the game
      playing = false;
      diceEl.classList.add('hidden');

      document.querySelector(`.player--${activePlayer}`).classList.add('player--winner');
      document.querySelector(`.player--${activePlayer}`).classList.remove('player--active');
    } else {
    // 3. 'false' - switch to the next player
    switchPlayer();
    };
  };
});

// Restart
btnNew.addEventListener('click', init);