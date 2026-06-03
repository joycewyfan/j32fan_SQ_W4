# Week 4 Example 2: Rock Paper Scissors Best of 3

## What This Example Demonstrates

> **Note for students:** This section is included in example files only to help you study. Do not include it in your Side Quest submissions.

This example builds on Example 1 by adding score tracking, multiple rounds, game states, and a full start and end screen to create a complete Best of 3 Rock Paper Scissors game.

- **Game states** — the game moves through `STATE_START`, `STATE_PLAY`, and `STATE_OVER`; each state controls what gets drawn and what responds to clicks; stored as constants to prevent typos
- **Score tracking** — `playerScore` and `npcScore` persist across rounds; only choices and results are reset between rounds using `nextRound()`
- **Early win detection** — `playerChoose()` checks after each round whether someone has reached 2 wins; the game ends immediately rather than waiting for all 3 rounds
- **`nextRound()` vs `resetGame()`** — `nextRound()` clears only the current choices while keeping scores; `resetGame()` resets everything for a brand new game
- **Dynamic button labels** — the Next Round button changes its label to "See Result" when the game is over, using a ternary expression to pick the label based on game state
- **`frameCount`** — a built-in p5.js variable that increases by 1 every frame; used in `drawStartScreen()` and `drawGameOverScreen()` to animate blobs where the blob timers from sketch.js aren't available
- **Passing arguments to scene functions** — `drawGameScreen()` receives `playerBlobT` and `npcBlobT` as arguments so the blobs animate continuously across all screens
- **Shared global scope across files** — `drawHUD()` in scenes.js reads `currentRound`, `MAX_ROUNDS`, `playerScore`, and `npcScore` directly from game.js without any extra wiring, because all files share the same global scope

## Setup and Interaction Instructions

To run the sketch locally, open `index.html` in Google Chrome using Live Server.

Click **Start Game** to begin. Click **Rock**, **Paper**, or **Scissors** each round. First to win 2 rounds wins the game. Click **Play Again** to rematch.

**Opening the Chrome Console**

- **Windows:** Press `F12` or `Ctrl + Shift + J`, then click the **Console** tab
- **Mac:** Press `Cmd + Option + J`

The console will show any errors in your sketch.

## Assets

No external assets used. All visuals are generated with p5.js.

## References

N/A
