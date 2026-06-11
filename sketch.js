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
const STATE_OPTION = "option";
const STATE_RAINBOW_PATH = "rainbow_path";
const STATE_SQUIRREL_SMILE = "squirrel_smile";
const STATE_SQUIRREL_WEAR = "squirrel_wear";
const STATE_FOREST_SHORTCUT = "forest_shortcut";
const STATE_SNAIL_WAIT = "snail_wait";
const STATE_SNAIL_RACE_ACCEPT = "snail_race_accept";
const STATE_EPILOGUE = "epilogue";
const STATE_PLAY  = "play";
const STATE_OVER  = "over";

let gameState = STATE_START;

// Ending display variables (used by the generic epilogue screen)
let endingTitle = "";
let endingBody = "";

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

// ------------------------------------------------------------
// IMAGE ASSETS
// Loaded in preload() before setup() runs.
// Available globally to all drawing functions.
// ------------------------------------------------------------
let startScreenImg;
let optionScreenImg;
let rainbowPathImg;
let forestShortcutImg;

// ============================================================
// preload()
// Runs before setup() to load images and other assets.
// ============================================================
function preload() {
  startScreenImg = loadImage("assets/images/startscreen.png");
  optionScreenImg = loadImage("assets/images/Opening_screen.png");
  rainbowPathImg = loadImage("assets/images/Rainbow Path.png");
  forestShortcutImg = loadImage("assets/images/Forest Shortcut.png");
}

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
  } else if (gameState === STATE_OPTION) {
    drawOptionScreen();
  } else if (gameState === STATE_RAINBOW_PATH) {
    drawRainbowPathScreen();
  } else if (gameState === STATE_SQUIRREL_SMILE) {
    drawSquirrelSmileScreen();
  } else if (gameState === STATE_SQUIRREL_WEAR) {
    drawSquirrelWearScreen();
  } else if (gameState === STATE_FOREST_SHORTCUT) {
    drawForestShortcutScreen();
  } else if (gameState === STATE_SNAIL_WAIT) {
    drawSnailWaitScreen();
  } else if (gameState === STATE_SNAIL_RACE_ACCEPT) {
    drawSnailRaceAcceptedScreen();
  } else if (gameState === STATE_EPILOGUE) {
    drawEpilogueScreen();
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
      gameState = STATE_OPTION;
    }
  }

  // --- Option screen ---
  else if (gameState === STATE_OPTION) {
    let buttonW = 340;
    let buttonH = 90;
    let buttonY = 360;

    if (isMouseOver(width * 0.25, buttonY, buttonW, buttonH)) {
      gameState = STATE_RAINBOW_PATH;
    }
    if (isMouseOver(width * 0.75, buttonY, buttonW, buttonH)) {
      gameState = STATE_FOREST_SHORTCUT;
    }
  }

  // --- Rainbow branch screen ---
  else if (gameState === STATE_RAINBOW_PATH) {
    // left: Tell the squirrel the hat is amazing
    // right: Offer to wear an acorn hat too
    let buttonW = 280;
    let buttonH = 70;
    let buttonY = 360;

    if (isMouseOver(width * 0.25, buttonY, buttonW, buttonH)) {
      gameState = STATE_SQUIRREL_SMILE;
    }
    if (isMouseOver(width * 0.75, buttonY, buttonW, buttonH)) {
      gameState = STATE_SQUIRREL_WEAR;
    }
  }

  // --- Forest branch screen ---
  else if (gameState === STATE_FOREST_SHORTCUT) {
    // left: Patiently wait your turn
    // right: Challenge the snail to a race
    let buttonW = 280;
    let buttonH = 70;
    let buttonY = 360;

    if (isMouseOver(width * 0.25, buttonY, buttonW, buttonH)) {
      gameState = STATE_SNAIL_WAIT;
    }
    if (isMouseOver(width * 0.75, buttonY, buttonW, buttonH)) {
      gameState = STATE_SNAIL_RACE_ACCEPT;
    }
  }

  // --- Squirrel smile screen ---
  else if (gameState === STATE_SQUIRREL_SMILE) {
    let buttonW = 280;
    let buttonH = 70;
    let buttonY = 360;

    if (isMouseOver(width * 0.25, buttonY, buttonW, buttonH)) {
      endingTitle = "The Confidence Boost";
      endingBody = "The squirrel beams. It turns out the squirrel is the festival's head designer.\n\nYou receive a limited-edition rainbow acorn trophy.\n\nSometimes people just need encouragement";
      gameState = STATE_EPILOGUE;
    }
    if (isMouseOver(width * 0.75, buttonY, buttonW, buttonH)) {
      endingTitle = "The Fashion Revolution";
      endingBody = "You put on an acorn hat. Everyone at the festival copies you.\n\nBy lunchtime, acorn hats are the hottest trend.\n\nEmpathy can mean joining someone rather than fixing their problem.";
      gameState = STATE_EPILOGUE;
    }
  }

  // --- Squirrel wear-together screen ---
  else if (gameState === STATE_SQUIRREL_WEAR) {
    let buttonW = 280;
    let buttonH = 70;
    let buttonY = 360;

    if (isMouseOver(width * 0.25, buttonY, buttonW, buttonH)) {
      endingTitle = "Chief Acorn Officer";
      endingBody = "You compliment the squirrel too enthusiastically. The squirrel hires you as Chief Acorn Officer. Your only job: rating acorns from 1 to 10.\n\nBe careful what you're good at.";
      gameState = STATE_EPILOGUE;
    }
    if (isMouseOver(width * 0.75, buttonY, buttonW, buttonH)) {
      endingTitle = "The Acorn Olympics";
      endingBody = "Your matching hat inspires chaos. You accidentally start the Acorn Olympics.\n\nNobody remembers why.\n\nSometimes chaos creates community.";
      gameState = STATE_EPILOGUE;
    }
  }

  // --- Snail wait screen ---
  else if (gameState === STATE_SNAIL_WAIT) {
    let buttonW = 280;
    let buttonH = 70;
    let buttonY = 360;

    if (isMouseOver(width * 0.25, buttonY, buttonW, buttonH)) {
      endingTitle = "The Patient Path";
      endingBody = "You wait behind the snail. Eventually, the snail reveals it was testing everyone's patience.\n\nYou win the Golden Chill Award.\n\nNot every obstacle needs to be fought.";
      gameState = STATE_EPILOGUE;
    }
    if (isMouseOver(width * 0.75, buttonY, buttonW, buttonH)) {
      endingTitle = "The Race";
      endingBody = "You challenge the snail. The race lasts three hours.\n\nThe snail wins. Nobody knows how.\n\nLife isn't always fair, and that's okay.";
      gameState = STATE_EPILOGUE;
    }
  }

  // --- Snail race accepted screen ---
  else if (gameState === STATE_SNAIL_RACE_ACCEPT) {
    let buttonW = 280;
    let buttonH = 70;
    let buttonY = 360;

    if (isMouseOver(width * 0.25, buttonY, buttonW, buttonH)) {
      endingTitle = "The Accidental Book Club";
      endingBody = "While waiting, everyone in line becomes friends.\n\nYou accidentally create the world's largest book club.\n\nGood things can happen while you're waiting.";
      gameState = STATE_EPILOGUE;
    }
    if (isMouseOver(width * 0.75, buttonY, buttonW, buttonH)) {
      endingTitle = "The Participation Parade";
      endingBody = "You lose the race so dramatically that the crowd throws you a participation parade.\n\nFailure can still bring people together.";
      gameState = STATE_EPILOGUE;
    }
  }

  // --- Epilogue / ending screen ---
  else if (gameState === STATE_EPILOGUE) {
    if (isMouseOver(width / 2, 390, 220, 52)) {
      // Restart at the title screen
      gameState = STATE_START;
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
