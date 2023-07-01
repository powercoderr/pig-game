'use strict';

//Global Variable for the game
const maxDice = 6;
const minDice = 1;
let dice = 0;
let currentScore = 0;
let playerScore = 0;

//DOM Objects
const newBtn = document.querySelector('.btn--new');
const rollDiceBtn = document.querySelector('.btn--roll');
const diceImage = document.querySelector('.dice');
const firstPlayer = document.querySelector('.player--0');
const secondPlayer = document.querySelector('.player--1');

//Function to handle event
const gameReset = function () {
  playerScore = 0;
  currentScore = 0;

  //Set score & current-score to 0
  document.querySelectorAll('.score').forEach(element => {
    element.textContent = playerScore;
  });

  document.querySelectorAll('.current-score').forEach(element => {
    element.textContent = currentScore;
  });

  //Set player--0 as active player

  if (!firstPlayer.classList.contains('player--active')) {
    firstPlayer.classList.add('player--active');
  }

  if (secondPlayer.contains('player--active')) {
    secondPlayer.classList.remove('player--active');
  }
};

const rollDice = function () {
  dice = Math.floor(Math.random() * maxDice) + minDice;
  diceImage.src = `dice-${dice}.png`;

  if (dice === 1) {
    changeActivePlayer();
  } else {
    currentScore += dice;
    if (isActivePlayer(firstPlayer)) {
      setCurrentScore(firstPlayer, currentScore);
    } else {
      setCurrentScore(secondPlayer, currentScore);
    }
  }
};

const isActivePlayer = function (player) {
  return player.classList.contains('player--active');
};

const changeActivePlayer = function () {
  if (isActivePlayer(firstPlayer)) {
    setPlayerActivation(firstPlayer, false);
    setPlayerActivation(secondPlayer, true);
  } else {
    setPlayerActivation(firstPlayer, true);
    setPlayerActivation(secondPlayer, false);
  }

  currentScore = 0;
  setCurrentScore(firstPlayer, currentScore);
  setCurrentScore(secondPlayer, currentScore);
};

const setPlayerActivation = function (player, active) {
  if (active) {
    player.classList.add('player--active');
  } else {
    player.classList.remove('player--active');
  }
};

const setCurrentScore = function (player, score) {
  player.querySelector('.current-score').textContent = score;
};

//Events
newBtn.addEventListener('click', gameReset);
rollDiceBtn.addEventListener('click', rollDice);
