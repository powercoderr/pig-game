'use strict';

//Global Variable for the game
const maxDice = 6;
const minDice = 1;
const maxScore = 100;
let dice = 0;
let currentScore = 0;
let playerScore = 0;

//DOM Objects
const newBtn = document.querySelector('.btn--new');
const rollDiceBtn = document.querySelector('.btn--roll');
const holdDiceBtn = document.querySelector('.btn--hold');
const diceImage = document.querySelector('.dice');
const firstPlayer = document.querySelector('.player--0');
const secondPlayer = document.querySelector('.player--1');

//Function to handle event
const gameReset = function () {
  playerScore = 0;
  currentScore = 0;

  //Set all player score & current-score to 0
  const allplayerScoreElement = document.querySelectorAll('.score');
  const allCurrentScoreElement = document.querySelectorAll('.current-score');

  allplayerScoreElement.forEach(playerScoreElement => {
    playerScoreElement.textContent = playerScore;
  });

  allCurrentScoreElement.forEach(currentScoreElement => {
    currentScoreElement.textContent = currentScore;
  });

  //Show holdDiceBtn & rollDiceBtn
  holdDiceBtn.style.display = 'inline-block';
  rollDiceBtn.style.display = 'inline-block';

  //Set first player as active player
  setPlayerActivation(firstPlayer, true);
  setPlayerActivation(secondPlayer, false);

  //Hide dice when reset the game
  const isDiceNotDisplayed = diceImage.classList.contains('display-none');
  if (!diceImage.classList.contains('display-none')) {
    diceImage.classList.add('display-none');
  }

  //Hide winner popup when reset the game (if exist)
  const winnerPopup = document.querySelector('.winner-popup');
  if (winnerPopup) {
    winnerPopup.remove();
  }
};

const rollDice = function () {
  //Display dice when starting the game
  if (diceImage.classList.contains('display-none')) {
    diceImage.classList.remove('display-none');
  }

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

const holdDice = function () {
  let player;

  if (isActivePlayer(firstPlayer)) {
    player = firstPlayer;
  } else {
    player = secondPlayer;
  }

  playerScore = getPlayerScore(player) + currentScore;
  setPlayerScore(player, playerScore);

  if (playerScore >= maxScore) {
    setTheWinner(player);
  } else {
    changeActivePlayer();
  }
};

const setTheWinner = function (player) {
  player.insertAdjacentHTML(
    'afterbegin',
    `<h2 class="winner-popup"> 🎉You are the winner!</h2>`
  );
  holdDiceBtn.style.display = 'none';
  rollDiceBtn.style.display = 'none';
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

const setPlayerScore = function (player, score) {
  player.querySelector('.score').textContent = score;
};

const getPlayerScore = function (player) {
  return Number(player.querySelector('.score').textContent);
};

//Events
newBtn.addEventListener('click', gameReset);
rollDiceBtn.addEventListener('click', rollDice);
holdDiceBtn.addEventListener('click', holdDice);
