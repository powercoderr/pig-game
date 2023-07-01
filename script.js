'use strict';

//DOM Objects
const newBtn = document.querySelector('.btn--new');

//Function to handle event
const gameReset = function () {
  //Set score & current-score to 0
  document.querySelectorAll('.score').forEach(element => {
    element.textContent = 0;
  });

  document.querySelectorAll('.current-score').forEach(element => {
    element.textContent = 0;
  });

  //Set player--0 as active player
  const firstPlayer = document.querySelector('.player--0').classList;
  const secondPlayer = document.querySelector('.player--1').classList;
  if (!firstPlayer.contains('player--active')) {
    firstPlayer.add('player--active');
  }

  if (secondPlayer.contains('player--active')) {
    secondPlayer.remove('player--active');
  }
};

//Events
newBtn.addEventListener('click', gameReset);
