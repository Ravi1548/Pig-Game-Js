//Selecting elements
const player0El = document.querySelector(".player--0");
const player1El = document.querySelector(".player--1");
const score0El = document.querySelector("#score--0");
const score1El = document.getElementById("score--1");
const current0El = document.getElementById("current--0");
const current1El = document.getElementById("current--1");
const diceEl = document.querySelector(".dice");
const btnNew = document.querySelector(".btn--new");
const btnRoll = document.querySelector(".btn--roll");
const btnHold = document.querySelector(".btn--hold");
const player1 = document.querySelector("#name--0");
const player2 = document.querySelector("#name--1");
const modal = document.querySelector(".modal");
const overlay = document.querySelector(".overlay");

//starting conditions
let scores = [0, 0];
let currentScore = 0;
let activePlayer = 0;
let playing = true;
score0El.textContent = 0;
score1El.textContent = 0;
current0El.textContent = 0;
current1El.textContent = 0;

alert(`Rules--
 1. First player to score 50 points will win.🥳
 2. Use hold button before you get the number 0 to increase your score.😜
 3. if you get 0 then you will lost all your current scores and Your turn too.. 😂😂
 4.  Best of Luck!😎  (click Ok  to continue..)`);

// Taking user input (Player's name)
const player1Name = prompt("Enter 1st Player's name");
player1Name
  ? (player1.textContent = player1Name)
  : (player1.textContent = "Guest 1");
const player2Name = prompt(
  "Enter 2nd Player's name (Leave empty if You are Single😂😂)"
);
player2Name
  ? (player2.textContent = player2Name)
  : (player2.textContent = "Guest 2");

//function for switching player
const switchPlayer = function () {
  //switch to next player
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;

  //focusing on the active player (toggle will add class if it was not there and remove if it is present)
  player0El.classList.toggle("player--active");
  player1El.classList.toggle("player--active");
};

// function for opening congratulations
const openModal = function () {
  modal.classList.remove("hidden");
  overlay.classList.remove("hidden");
};

//function for closing congratulations
const closedModal = function () {
  modal.classList.add("hidden");
  overlay.classList.add("hidden");
};

//function to reset the game
const resetGame = function () {
  //starting conditions
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  playing = true;
  score0El.textContent = 0;
  score1El.textContent = 0;
  current0El.textContent = 0;
  current1El.textContent = 0;

  diceEl.classList.add("hidden");
  player0El.classList.remove("player--winner");
  player1El.classList.remove("player--winner");
  player0El.classList.add("player--active");
  player1El.classList.remove("player--active");
};
//calling the function so that previous method use it when page reloads
resetGame();

//Rolling dice
btnRoll.addEventListener("click", function () {
  //Generating a random dice roll
  if (playing) {
    const dice = Math.trunc(Math.random() * 6) + 1;
    // console.log(dice);

    //Display dice
    diceEl.classList.remove("hidden");
    diceEl.src = `dice-${dice}.png`;

    //check for rolled 1
    if (dice !== 1) {
      //Add dice to current score
      currentScore += dice;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      switchPlayer();
    }
  }
});

btnHold.addEventListener("click", function () {
  if (playing) {
    //Add current  score t active player's score
    scores[activePlayer] += currentScore;
    //    console.log( scores[activePlayer]);
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];
    // check if player's score >=100
    if (scores[activePlayer] >= 50) {
      playing = false;
      diceEl.classList.add("hidden");
      openModal();
      // finish the game
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add("player--winner");
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove("player--active");
    } else {
      //switch to the next player
      switchPlayer();
    }
  }
});

//adding eventlistener to close the modal
overlay.addEventListener("click", closedModal);

//adding eventlistener to reset the game
btnNew.addEventListener("click", resetGame);
