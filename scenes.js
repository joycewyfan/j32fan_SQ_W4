// ============================================================
// scenes.js: Drawing Functions (Example 2)
// ============================================================
// This file contains all drawing helper functions.
// It does not contain any game logic — that lives in game.js.
// Functions defined here are available in sketch.js because
// all files share the same global scope.
// ============================================================

// ------------------------------------------------------------
// drawBackground()
// A simple dark background drawn every frame in draw().
// Calling background() every frame clears the previous frame,
// which is what creates the illusion of animation.
// ------------------------------------------------------------
function drawBackground() {
  background(10);
}

// ------------------------------------------------------------
// drawBlob(x, y, r, col, t)
// Draws a noise blob at the given position and size.
// Called with different arguments for the player and NPC blobs.
//
// x, y — centre position of the blob
// r    — radius of the blob
// col  — p5 color object (e.g. color(0, 200, 180))
// t    — animation time; increases each frame to drive the wobble
// ------------------------------------------------------------
function drawBlob(x, y, r, col, t) {
  push();
  fill(col);
  noStroke();

  beginShape();
  let numPoints = 48; // more points = smoother shape
  for (let i = 0; i < numPoints; i++) {
    let angle = (TWO_PI / numPoints) * i;

    // noise() returns a smooth random value between 0 and 1.
    // We use it to push each vertex slightly in or out.
    let noiseVal = noise(cos(angle) * 0.8 + t, sin(angle) * 0.8 + t);

    // map() converts noise (0–1) to a radius offset (-8 to +8 pixels)
    let nr = r + map(noiseVal, 0, 1, -8, 8);

    // Convert polar coordinates (angle, radius) to x/y
    vertex(x + cos(angle) * nr, y + sin(angle) * nr);
  }
  endShape(CLOSE);

  // Eyes
  fill(10);
  ellipse(x - 9, y - 7, 8, 8);
  ellipse(x + 9, y - 7, 8, 8);

  pop();
}

// ------------------------------------------------------------
// drawButton(x, y, w, h, label, isHovered)
// Draws a rectangular button with a text label.
// isHovered changes the colour when the mouse is over it,
// giving visual feedback that the button is clickable.
//
// x, y        — centre position (uses rectMode(CENTER))
// w, h        — width and height of the button
// label       — text displayed inside the button
// isHovered   — true if the mouse is currently over the button
// ------------------------------------------------------------
function drawButton(x, y, w, h, label, isHovered) {
  push();
  rectMode(CENTER); // x, y are the centre of the rectangle

  // Button background — lighter colour when hovered
  fill(isHovered ? color(80, 80, 100) : color(40, 40, 60));
  stroke(isHovered ? color(180, 180, 220) : color(80, 80, 100));
  strokeWeight(2);
  rect(x, y, w, h, 8); // rounded corners

  // Button label — centred inside the button
  fill(255);
  noStroke();
  textAlign(CENTER, CENTER);
  textSize(18);
  text(label, x, y);

  pop();
}

// ------------------------------------------------------------
// isMouseOver(x, y, w, h)
// Returns true if the mouse cursor is currently inside the
// rectangle defined by centre (x, y) and dimensions (w, h).
// Used alongside drawButton() to detect clicks.
// ------------------------------------------------------------
function isMouseOver(x, y, w, h) {
  return (
    mouseX > x - w / 2 &&
    mouseX < x + w / 2 &&
    mouseY > y - h / 2 &&
    mouseY < y + h / 2
  );
}

// ------------------------------------------------------------
// drawStartScreen()
// Title screen shown before the game begins.
// Uses frameCount to animate the blobs even before the
// game starts. frameCount is a built-in p5.js variable
// that increases by 1 every frame.
// ------------------------------------------------------------
function drawStartScreen() {
  // Title 
  // Story text
  fill(255);
  textAlign(CENTER);
  textSize(48);
  text("Getting Over it Together", width / 2, 80);
  textAlign(LEFT);
  textSize(16);
  textLeading(22);
  let story =
    "You wake up at the base of Spectrum Peak, a giant mountain painted in shifting Wavelength-style neon gradients—pinks, blues, oranges, purples.\n\n" +
    "It’s the morning of the annual Wavelength Festival, where everyone communicates using giant colourful dials instead of words.\n\n" +
    "Your family already left without you because you overslept. You need to reach the festival to reunite with them.\n\n" +
    "A small cat with a scar over one eye hops toward you.\n\n" +
    "Unfortunately, your day is already going wrong. What do you do?";
  text(story, 80, 130, 340, 260);

  // Blobs — animated using frameCount since blobT isn't
  // available here (it lives in sketch.js)
  drawBlob(220, 325, 50, color(0, 200, 180), frameCount * 0.015);
  drawBlob(580, 300, 50, color(255, 150, 30), frameCount * 0.015 + 50);

  // Potty label for the orange blob
  fill(255, 220, 0);
  textSize(14);
  textAlign(CENTER);
  text("Potty", 580, 365);

  // Speech bubble for the NPC
  push();
  fill(245);
  stroke(200);
  strokeWeight(1);
  rectMode(CENTER);
  rect(560, 170, 320, 140, 18);
  fill(245);
  noStroke();
  triangle(540, 230, 560, 245, 580, 230);
  fill(30);
  textAlign(LEFT, TOP);
  textSize(14);
  textLeading(20);
  text(
    "\"Welcome, traveller! To climb Spectrum Peak, you must align your inner wavelength with others… and also get over your emotional baggage. No big deal.\"",
    568,
    175,
    300,
    110,
  );
  pop();

  // Start button
  drawButton(
    width / 2,
    390,
    200,
    52,
    "Start Adventure",
    isMouseOver(width / 2, 390, 200, 52),
  );
}

// ------------------------------------------------------------
// drawHUD()
// HUD = Heads Up Display.
// Shows the current round number and scores at the top.
// Reads currentRound, MAX_ROUNDS, playerScore, and npcScore
// from game.js via shared global scope.
// ------------------------------------------------------------
function drawHUD() {
  noStroke();

  // Round indicator — centred at the top
  fill(160);
  textSize(14);
  textAlign(CENTER);
  text("Round " + currentRound + " of " + MAX_ROUNDS, width / 2, 30);

  // Player score (left side)
  fill(0, 200, 180);
  textSize(28);
  textAlign(LEFT);
  text(playerScore, 60, 35);

  fill(160);
  textSize(13);
  text("You", 60, 52);

  // NPC score (right side)
  fill(255, 150, 30);
  textSize(28);
  textAlign(RIGHT);
  text(npcScore, width - 60, 35);

  fill(160);
  textSize(13);
  text("NPC", width - 60, 52);

  // Dividing line under the HUD
  stroke(40);
  strokeWeight(1);
  line(0, 60, width, 60);
}

// ------------------------------------------------------------
// drawGameScreen(playerBlobT, npcBlobT)
// The main gameplay screen shown during STATE_PLAY.
// Shows the HUD, blobs, choice buttons, and round result.
// playerBlobT and npcBlobT are passed in from sketch.js
// so the blobs animate continuously across all screens.
// ------------------------------------------------------------
function drawGameScreen(playerBlobT, npcBlobT) {
  drawHUD();

  // Blobs
  drawBlob(220, 190, 50, color(0, 200, 180), playerBlobT);
  drawBlob(580, 190, 50, color(255, 150, 30), npcBlobT);

  fill(180);
  noStroke();
  textAlign(CENTER);
  textSize(14);
  text("You", 220, 265);
  text("NPC", 580, 265);

  // playerChoice is null before the player picks — set in game.js
  if (playerChoice !== null) {
    // Show what each side chose
    fill(200);
    textSize(18);
    textAlign(CENTER);
    text(playerChoice.toUpperCase(), 220, 300);
    text(npcChoice.toUpperCase(), 580, 300);

    // Show the round result
    drawRoundResult();

    // Button label changes depending on whether the game is over
    let btnLabel =
      currentRound < MAX_ROUNDS && !gameOver ? "Next Round" : "See Result";
    drawButton(
      width / 2,
      390,
      200,
      52,
      btnLabel,
      isMouseOver(width / 2, 390, 200, 52),
    );
  } else {
    // Show choice buttons before the player has picked
    fill(160);
    textSize(14);
    textAlign(CENTER);
    text("Make your choice", width / 2, 295);

    let labels = ["ROCK", "PAPER", "SCISSORS"];
    for (let i = 0; i < 3; i++) {
      drawButton(
        BTN_POSITIONS[i],
        BTN_Y,
        BTN_W,
        BTN_H,
        labels[i],
        isMouseOver(BTN_POSITIONS[i], BTN_Y, BTN_W, BTN_H),
      );
    }
  }
}

// ------------------------------------------------------------
// drawRoundResult()
// Shows the win/lose/draw result for the current round.
// roundResult is set in game.js after the player picks.
// ------------------------------------------------------------
function drawRoundResult() {
  push();
  textAlign(CENTER);
  noStroke();

  if (roundResult === "win") {
    fill(0, 220, 180);
    textSize(36);
    text("You Win This Round!", width / 2, 345);
  } else if (roundResult === "lose") {
    fill(255, 120, 30);
    textSize(36);
    text("NPC Wins This Round!", width / 2, 345);
  } else {
    fill(220);
    textSize(36);
    text("Draw!", width / 2, 345);
  }

  pop();
}

// ------------------------------------------------------------
// drawGameOverScreen()
// Final screen shown during STATE_OVER.
// Displays the overall winner and final scores.
// overallWinner and scores are read from game.js.
// ------------------------------------------------------------
function drawGameOverScreen() {
  // Blobs still animating on the end screen
  drawBlob(220, 220, 55, color(0, 200, 180), frameCount * 0.015);
  drawBlob(580, 220, 55, color(255, 150, 30), frameCount * 0.015 + 50);

  textAlign(CENTER);
  noStroke();

  // Overall result — shown in the winner's colour
  if (overallWinner === "player") {
    fill(0, 220, 180);
    textSize(52);
    text("You Win!", width / 2, 130);
  } else if (overallWinner === "npc") {
    fill(255, 120, 30);
    textSize(52);
    text("NPC Wins!", width / 2, 130);
  } else {
    fill(220);
    textSize(52);
    text("It's a Draw!", width / 2, 130);
  }

  // Final scores
  fill(160);
  textSize(18);
  text("You " + playerScore + "  —  " + npcScore + " NPC", width / 2, 175);

  // Play Again button
  drawButton(
    width / 2,
    390,
    220,
    52,
    "Play Again",
    isMouseOver(width / 2, 390, 220, 52),
  );
}
