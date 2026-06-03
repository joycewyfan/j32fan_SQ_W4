// ============================================================
// game.js: Game Logic (Example 2)
// ============================================================
// This file contains all game logic for Rock Paper Scissors
// Best of 3. It does not draw anything — drawing is handled
// by scenes.js. Variables defined here are available in
// sketch.js and scenes.js because all files share the same
// global scope.
// ============================================================

// ------------------------------------------------------------
// CHOICES
// We define the three choices as constants so we never have
// to type the strings "rock", "paper", "scissors" manually
// and risk a typo causing a bug.
// CHOICES is an array used to pick a random NPC move.
// ------------------------------------------------------------
const ROCK     = "rock";
const PAPER    = "paper";
const SCISSORS = "scissors";

const CHOICES = [ROCK, PAPER, SCISSORS];

// ------------------------------------------------------------
// ROUND STATE
// Tracks the current choices and result for this round.
// Reset to null at the start of each new round.
// ------------------------------------------------------------
let playerChoice = null; // set when player clicks a button
let npcChoice    = null; // set randomly when player chooses
let roundResult  = null; // "win", "lose", or "draw"

// ------------------------------------------------------------
// SCORE AND ROUND TRACKING
// playerScore and npcScore count wins across rounds.
// currentRound tracks which round we are on (1, 2, or 3).
// MAX_ROUNDS is a constant — the game ends after 3 rounds.
// ------------------------------------------------------------
let playerScore  = 0;
let npcScore     = 0;
let currentRound = 1;
const MAX_ROUNDS = 3;

// ------------------------------------------------------------
// GAME OVER STATE
// gameOver becomes true when someone reaches 2 wins or all
// 3 rounds are played.
// overallWinner stores "player", "npc", or "draw".
// ------------------------------------------------------------
let gameOver       = false;
let overallWinner  = null;

// ------------------------------------------------------------
// getNPCChoice()
// Picks a random choice for the NPC each round.
// random(array) returns a random element from the array.
// ------------------------------------------------------------
function getNPCChoice() {
  return random(CHOICES);
}

// ------------------------------------------------------------
// getResult(player, npc)
// Works out who wins given the two choices.
// Returns "win", "lose", or "draw".
//
// Win conditions are written out explicitly — no clever maths,
// just clear readable comparisons that are easy to follow.
// ------------------------------------------------------------
function getResult(player, npc) {
  if (player === npc) return "draw";

  if (
    (player === ROCK     && npc === SCISSORS) ||
    (player === PAPER    && npc === ROCK)     ||
    (player === SCISSORS && npc === PAPER)
  ) {
    return "win";
  }

  return "lose";
}

// ------------------------------------------------------------
// playerChoose(choice)
// Called from sketch.js when the player clicks a button.
// Sets choices and result, then updates scores.
// Checks whether the game is over after each round.
// A player wins as soon as they reach 2 wins, even if
// all 3 rounds haven't been played yet.
// ------------------------------------------------------------
function playerChoose(choice) {
  playerChoice = choice;
  npcChoice    = getNPCChoice();
  roundResult  = getResult(playerChoice, npcChoice);

  // Update scores based on this round's result
  if (roundResult === "win")  playerScore++;
  if (roundResult === "lose") npcScore++;

  // Check if the game is over
  if (playerScore === 2 || npcScore === 2 || currentRound === MAX_ROUNDS) {
    gameOver = true;

    // Determine the overall winner
    if (playerScore > npcScore)      overallWinner = "player";
    else if (npcScore > playerScore) overallWinner = "npc";
    else                             overallWinner = "draw";
  }
}

// ------------------------------------------------------------
// nextRound()
// Called from sketch.js when the Next Round button is clicked.
// Clears the current choices but keeps the scores intact.
// ------------------------------------------------------------
function nextRound() {
  playerChoice = null;
  npcChoice    = null;
  roundResult  = null;
  currentRound++;
}

// ------------------------------------------------------------
// resetGame()
// Called from sketch.js when Play Again is clicked.
// Fully resets all scores, choices, and round tracking
// so a brand new game can begin.
// ------------------------------------------------------------
function resetGame() {
  playerChoice  = null;
  npcChoice     = null;
  roundResult   = null;
  playerScore   = 0;
  npcScore      = 0;
  currentRound  = 1;
  gameOver      = false;
  overallWinner = null;
}
