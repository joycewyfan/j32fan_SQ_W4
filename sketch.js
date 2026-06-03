// ============================================================
// Week 4 Example 2: Full Rock Paper Scissors (Best of 3)
// ============================================================

// ------------------------------------------------------------
// ABOUT THIS FILE
// This project is split across three JavaScript files:
//
//   sketch.js — p5.js entry point: setup(), draw(), mousePressed()
//   game.js   — game logic: choices, scores, round tracking
//   scenes.js — drawing helpers: blobs, buttons, screens
//
// All three files are loaded in index.html in that order.
// Variables and functions defined in one file are available
// in all others because they share the same global scope.
// ------------------------------------------------------------

// ------------------------------------------------------------
// GAME STATES
// The game moves through these states in order.
// Storing states as constants prevents typos — if you mistype
// STATE_PLAY, JavaScript will throw an error instead of
// silently using the wrong string.
// ------------------------------------------------------------
const STATE_START = "start";
const STATE_PLAY  = "play";
const STATE_OVER  = "over";

let gameState = STATE_START;

// ------------------------------------------------------------
// BLOB ANIMATION TIMERS
// Increase each frame to drive the blob wobble animation.
// npcBlobT starts at 50 so the blobs wobble differently.
// ------------------------------------------------------------
let playerBlobT = 0;
let npcBlobT = 50;

// ------------------------------------------------------------
// BUTTON LAYOUT
// Shared constants for button positions and size.
// Defined once here so sketch.js and scenes.js stay in sync.
// ------------------------------------------------------------
const BTN_POSITIONS = [200, 400, 600];
const BTN_W = 150;
const BTN_H = 52;
const BTN_Y = 360;

// ============================================================
// setup()
// Runs once at the very start of the sketch.
// Sets up the canvas and font.
// ============================================================
function setup() {
  createCanvas(800, 450);
  textFont("monospace");
}

// ============================================================
// draw()
// Runs repeatedly in a loop after setup() finishes.
// Calls drawing functions from scenes.js and reads game
// state variables from game.js to decide what to show.
// ============================================================
function draw() {
  // drawBackground() is defined in scenes.js
  drawBackground();

  // Switch between screens based on the current game state
  if (gameState === STATE_START) {
    drawStartScreen();
  } else if (gameState === STATE_PLAY) {
    drawGameScreen(playerBlobT, npcBlobT);
  } else if (gameState === STATE_OVER) {
    drawGameOverScreen();
  }

  // Advance blob animations every frame regardless of state
  playerBlobT += 0.015;
  npcBlobT += 0.015;
}

// ============================================================
// mousePressed()
// A built-in p5.js event function.
// Automatically called once every time the mouse is clicked.
// Handles button clicks across all game states.
// ============================================================
function mousePressed() {
  // --- Start screen ---
  if (gameState === STATE_START) {
    if (isMouseOver(width / 2, 390, 200, 52)) {
      gameState = STATE_PLAY;
    }
  }

  // --- Play screen ---
  else if (gameState === STATE_PLAY) {
    if (playerChoice === null) {
      // Choice buttons — ROCK, PAPER, SCISSORS defined in game.js
      let choices = [ROCK, PAPER, SCISSORS];
      for (let i = 0; i < 3; i++) {
        if (isMouseOver(BTN_POSITIONS[i], BTN_Y, BTN_W, BTN_H)) {
          // playerChoose() is defined in game.js
          // It sets playerChoice, npcChoice, roundResult, and updates scores
          playerChoose(choices[i]);
        }
      }
    } else {
      // Next Round or See Result button
      if (isMouseOver(width / 2, 390, 200, 52)) {
        if (gameOver) {
          // gameOver is set in game.js when someone reaches 2 wins
          gameState = STATE_OVER;
        } else {
          // nextRound() advances the round counter and clears choices
          nextRound();
        }
      }
    }
  }

  // --- Game over screen ---
  else if (gameState === STATE_OVER) {
    if (isMouseOver(width / 2, 390, 220, 52)) {
      // resetGame() resets all scores and choices for a new game
      resetGame();
      gameState = STATE_PLAY;
    }
  }
}
