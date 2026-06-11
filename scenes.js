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
  textSize(12);
  textWrap(WORD);
  textLeading(22);
  text(label, x, y, w - 24, h - 16);

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
function drawStartScreen() {  // Background image
  if (startScreenImg) {
    image(startScreenImg, 0, 0, width, height);
    filter(BLUR, 3);
    noStroke();
    fill(0, 80);
    rect(0, 0, width, height);
  }
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
  text(story, 80, 100, 340, 260);

  // Blobs — animated using frameCount since blobT isn't
  // available here (it lives in sketch.js)
  drawBlob(480, 300, 50, color(0, 200, 180), frameCount * 0.015);
  drawBlob(600, 300, 50, color(255, 150, 30), frameCount * 0.015 + 50);

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
// drawOptionScreen()
// The screen shown after the start button is pressed.
// It offers two story path choices before the main game.
// ------------------------------------------------------------
function drawOptionScreen() {
  if (optionScreenImg) {
    image(optionScreenImg, 0, 0, width, height);
    noStroke();
    fill(0, 100);
    rect(0, 0, width, height);
  }

  fill(255);
  textAlign(CENTER);
  textSize(42);
  text("What do you do?", width / 2, 90);

  fill(190);
  textSize(12);
  textLeading(22);
  text(
    "Before you climb Spectrum Peak, choose how you want to reach the festival on the peak.",
    width / 2,
    120,
  );

  let option1 =
    "Follow a mysterious rainbow-coloured path leading to the festival on the peak.";
  let option2 =
    "Take a shortcut through the Forest of Minor Inconveniences.";

  let buttonW = 340;
  let buttonH = 90;
  let buttonY = 360;

  drawButton(
    width * 0.25,
    buttonY,
    buttonW,
    buttonH,
    option1,
    isMouseOver(width * 0.25, buttonY, buttonW, buttonH),
  );
  drawButton(
    width * 0.75,
    buttonY,
    buttonW,
    buttonH,
    option2,
    isMouseOver(width * 0.75, buttonY, buttonW, buttonH),
  );
}

// ------------------------------------------------------------
// drawRainbowPathScreen()
// Shows the story after choosing the rainbow path.
// ------------------------------------------------------------
function drawRainbowPathScreen() {
  if (rainbowPathImg) {
    image(rainbowPathImg, 0, 0, width, height);
    noStroke();
    fill(0, 100);
    rect(0, 0, width, height);
  }

  fill(255);
  textAlign(CENTER);
  textSize(42);
  text("Rainbow Path", width / 2, 60);

  fill(200);
  textSize(12);
  textLeading(10);
  textAlign(CENTER, TOP);
  text(
    "You follow the rainbow path.\n\n" +
      "Halfway up the mountain, you find a giant squirrel crying \n\n" +
      "beside a glowing dial stuck on \"Embarrassed ↔ Furious.\"\n\n" +
      "Someone at the festival told the squirrel its handmade acorn hat looked \"weird.\"",
    width / 2,
    110,
  );

  let option1 = "Tell the squirrel the hat is amazing.";
  let option2 = "Offer to wear an acorn hat too.";
  let buttonW = 280;
  let buttonH = 70;
  let buttonY = 360;

  drawButton(
    width * 0.25,
    buttonY,
    buttonW,
    buttonH,
    option1,
    isMouseOver(width * 0.25, buttonY, buttonW, buttonH),
  );
  drawButton(
    width * 0.75,
    buttonY,
    buttonW,
    buttonH,
    option2,
    isMouseOver(width * 0.75, buttonY, buttonW, buttonH),
  );
}

// ------------------------------------------------------------
// drawSquirrelSmileScreen()
// Shown after choosing to tell the squirrel the hat is amazing.
// ------------------------------------------------------------
function drawSquirrelSmileScreen() {
  fill(255);
  textAlign(CENTER);
  textSize(36);
  text("The squirrel smiles", width / 2, 70);

  fill(200);
  textSize(14);
  textLeading(20);
  textAlign(CENTER, TOP);
  text(
    "The squirrel smiles and wipes away its tears.",
    width / 2,
    110,
    700,
  );

  let option1 = "The Confidence Boost";
  let option2 = "The Fashion Revolution";
  let buttonW = 280;
  let buttonH = 70;
  let buttonY = 360;

  drawButton(
    width * 0.25,
    buttonY,
    buttonW,
    buttonH,
    option1,
    isMouseOver(width * 0.25, buttonY, buttonW, buttonH),
  );
  drawButton(
    width * 0.75,
    buttonY,
    buttonW,
    buttonH,
    option2,
    isMouseOver(width * 0.75, buttonY, buttonW, buttonH),
  );
}

// ------------------------------------------------------------
// drawSquirrelWearScreen()
// Shown after choosing to offer to wear an acorn hat too.
// ------------------------------------------------------------
function drawSquirrelWearScreen() {
  fill(255);
  textAlign(CENTER);
  textSize(36);
  text("Together", width / 2, 70);

  fill(200);
  textSize(14);
  textLeading(20);
  textAlign(CENTER, TOP);
  text(
    "The squirrel gasps. Questioning if you really wanted to wear one with it.\n\nTogether you walk toward the festival.",
    width / 2,
    110,
    700,
  );

  let option1 = "Chief Acorn Officer";
  let option2 = "The Acorn Olympics";
  let buttonW = 280;
  let buttonH = 70;
  let buttonY = 360;

  drawButton(
    width * 0.25,
    buttonY,
    buttonW,
    buttonH,
    option1,
    isMouseOver(width * 0.25, buttonY, buttonW, buttonH),
  );
  drawButton(
    width * 0.75,
    buttonY,
    buttonW,
    buttonH,
    option2,
    isMouseOver(width * 0.75, buttonY, buttonW, buttonH),
  );
}

// ------------------------------------------------------------
// drawSnailWaitScreen()
// Shown after choosing to patiently wait your turn.
// ------------------------------------------------------------
function drawSnailWaitScreen() {
  fill(255);
  textAlign(CENTER);
  textSize(36);
  text("Hours pass.", width / 2, 70);

  fill(200);
  textSize(14);
  textLeading(20);
  textAlign(CENTER, TOP);
  text(
    "Hours pass.\n\nThe snail inches forward while everyone in line starts chatting.",
    width / 2,
    110,
    700,
  );

  let option1 = "The Patient Path";
  let option2 = "The Race";
  let buttonW = 280;
  let buttonH = 70;
  let buttonY = 360;

  drawButton(
    width * 0.25,
    buttonY,
    buttonW,
    buttonH,
    option1,
    isMouseOver(width * 0.25, buttonY, buttonW, buttonH),
  );
  drawButton(
    width * 0.75,
    buttonY,
    buttonW,
    buttonH,
    option2,
    isMouseOver(width * 0.75, buttonY, buttonW, buttonH),
  );
}

// ------------------------------------------------------------
// drawSnailRaceAcceptedScreen()
// Shown after choosing to challenge the snail to a race.
// ------------------------------------------------------------
function drawSnailRaceAcceptedScreen() {
  fill(255);
  textAlign(CENTER);
  textSize(36);
  text("Race Accepted", width / 2, 70);

  fill(200);
  textSize(14);
  textLeading(20);
  textAlign(CENTER, TOP);
  text(
    "The crowd gathers around as the snail accepts.\n\nPotty becomes the referee.",
    width / 2,
    110,
    700,
  );

  let option1 = "The Accidental Book Club";
  let option2 = "The Participation Parade";
  let buttonW = 280;
  let buttonH = 70;
  let buttonY = 360;

  drawButton(
    width * 0.25,
    buttonY,
    buttonW,
    buttonH,
    option1,
    isMouseOver(width * 0.25, buttonY, buttonW, buttonH),
  );
  drawButton(
    width * 0.75,
    buttonY,
    buttonW,
    buttonH,
    option2,
    isMouseOver(width * 0.75, buttonY, buttonW, buttonH),
  );
}

// ------------------------------------------------------------
// drawEpilogueScreen()
// Shows the selected ending stored in `endingTitle`/`endingBody`.
// ------------------------------------------------------------
function drawEpilogueScreen() {
  fill(255);
  textAlign(CENTER);
  textSize(42);
  text(endingTitle, width / 2, 90);

  fill(200);
  textSize(16);
  textLeading(22);
  textAlign(CENTER, TOP);
  text(endingBody, width / 2, 130, 700);

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

// ------------------------------------------------------------
// drawForestShortcutScreen()
// Shows the story after choosing the forest shortcut.
// ------------------------------------------------------------
function drawForestShortcutScreen() {
  if (forestShortcutImg) {
    image(forestShortcutImg, 0, 0, width, height);
    noStroke();
    fill(0, 100);
    rect(0, 0, width, height);
  }

  fill(255);
  textAlign(CENTER);
  textSize(42);
  text("Forest Shortcut", width / 2, 60);

  fill(200);
  textSize(12);
  textLeading(10);
  text(
    "The shortcut is blocked by a snail directing traffic. The snail moves at the speed of existential dread. \n\n" + 
    "A huge line has formed behind it. Everyone looks mildly annoyed but too polite to complain.",
    width / 2,
    90
  );

  let option1 = "Patiently wait your turn.";
  let option2 = "Challenge the snail to a race.";
  let buttonW = 280;
  let buttonH = 70;
  let buttonY = 360;

  drawButton(
    width * 0.25,
    buttonY,
    buttonW,
    buttonH,
    option1,
    isMouseOver(width * 0.25, buttonY, buttonW, buttonH),
  );
  drawButton(
    width * 0.75,
    buttonY,
    buttonW,
    buttonH,
    option2,
    isMouseOver(width * 0.75, buttonY, buttonW, buttonH),
  );
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
