// js/games/hangman.js
"use strict";

export function initHangmanGame(showcase, container) {
    if (!container) return null;
    container.innerHTML = "";
    container.style.display = "flex";
    container.style.flexDirection = "column";
    container.style.alignItems = "center";
    container.style.gap = "1.5vh";
    container.style.padding = "2vh";
    container.style.fontFamily = "var(--font-main)";
    container.style.color = "#fff";

    const words = ["JAVASCRIPT", "DEVELOPER", "LEGENDARY", "SHOWCASE", "INTERFACE", "FRAMEWORK", "COMPONENT", "ALGORITHM", "OPTIMIZATION", "ACCESSIBILITY"];
    let wordToGuess = "";
    let guessedLetters = new Set();
    let wrongGuesses = 0;
    const maxWrongGuesses = 6;
    let gameOver = false;

    const hangmanCanvas = document.createElement("canvas");
    hangmanCanvas.width = 200;
    hangmanCanvas.height = 250;
    const hctx = hangmanCanvas.getContext("2d");
    container.appendChild(hangmanCanvas);

    const wordDisplay = document.createElement("div");
    wordDisplay.style.fontSize = "2em";
    wordDisplay.style.letterSpacing = "0.2em";
    wordDisplay.style.margin = "1vh 0";
    container.appendChild(wordDisplay);

    const guessedDisplay = document.createElement("div");
    guessedDisplay.style.fontSize = "1em";
    guessedDisplay.style.color = "#aaa";
    guessedDisplay.textContent = "Guessed: ";
    container.appendChild(guessedDisplay);

    const keyboard = document.createElement("div");
    keyboard.style.display = "flex";
    keyboard.style.flexWrap = "wrap";
    keyboard.style.justifyContent = "center";
    keyboard.style.gap = ".5vh";
    keyboard.style.maxWidth = "40vh"; // Control keyboard width
    container.appendChild(keyboard);

    const statusMessage = document.createElement("div");
    statusMessage.style.fontSize = "1.2em";
    statusMessage.style.fontWeight = "bold";
    statusMessage.style.marginTop = "1vh";
    container.appendChild(statusMessage);

    function drawHangman() { /* ... as in original ... */ 
        hctx.clearRect(0, 0, hangmanCanvas.width, hangmanCanvas.height);
        hctx.strokeStyle = "#fff";
        hctx.lineWidth = 3;

        // Gallows
        hctx.beginPath();
        hctx.moveTo(10, 240); hctx.lineTo(190, 240); hctx.stroke(); // Base
        hctx.moveTo(50, 240); hctx.lineTo(50, 10); hctx.stroke();   // Post
        hctx.lineTo(150, 10); hctx.stroke();  // Beam
        hctx.lineTo(150, 40); hctx.stroke();  // Rope

        // Man parts
        if (wrongGuesses > 0) { // Head
            hctx.beginPath(); hctx.arc(150, 60, 20, 0, Math.PI * 2); hctx.stroke();
        }
        if (wrongGuesses > 1) { // Body
            hctx.beginPath(); hctx.moveTo(150, 80); hctx.lineTo(150, 150); hctx.stroke();
        }
        if (wrongGuesses > 2) { // Left Arm
            hctx.beginPath(); hctx.moveTo(150, 100); hctx.lineTo(110, 130); hctx.stroke();
        }
        if (wrongGuesses > 3) { // Right Arm
            hctx.beginPath(); hctx.moveTo(150, 100); hctx.lineTo(190, 130); hctx.stroke();
        }
        if (wrongGuesses > 4) { // Left Leg
            hctx.beginPath(); hctx.moveTo(150, 150); hctx.lineTo(120, 200); hctx.stroke();
        }
        if (wrongGuesses > 5) { // Right Leg
            hctx.beginPath(); hctx.moveTo(150, 150); hctx.lineTo(180, 200); hctx.stroke();
        }
    }

    function updateWordDisplay() {
        // ... (same as original)
        let display = "";
        let allGuessed = true;
        for (const letter of wordToGuess) {
            if (guessedLetters.has(letter)) {
                display += letter;
            } else {
                display += "_";
                allGuessed = false;
            }
            display += " "; // Add space between letters/underscores
        }
        wordDisplay.textContent = display.trim();
        return allGuessed;
    }

    function updateGuessedDisplay() { /* ... as in original ... */ 
        guessedDisplay.textContent = `Guessed: ${[...guessedLetters].sort().join(", ")}`;
    }

    function createKeyboard() {
        // ... (same as original)
        keyboard.innerHTML = ""; // Clear previous keyboard
        const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        for (const letter of alphabet) {
            const button = document.createElement("button");
            button.textContent = letter;
            button.dataset.letter = letter;
            button.style.width = "3vh";
            button.style.height = "3vh";
            button.style.fontSize = "1em";
            button.style.cursor = "pointer";
            button.style.backgroundColor = "#555";
            button.style.color = "#fff";
            button.style.border = ".1vh solid #888";
            button.addEventListener("click", handleGuess);
            keyboard.appendChild(button);
        }
    }

    function handleGuess(event) {
        // ... (same as original, use showcase.soundManager)
        if (gameOver) return;
        const guessedLetter = event.target.dataset.letter;
        if (!guessedLetter || guessedLetters.has(guessedLetter)) return;

        guessedLetters.add(guessedLetter);
        event.target.disabled = true;
        event.target.style.opacity = "0.5";
        event.target.style.cursor = "default";

        if (wordToGuess.includes(guessedLetter)) {
            showcase.soundManager.playSound("click");
            const allGuessed = updateWordDisplay();
            if (allGuessed) {
                endGame(true);
            }
        } else {
            wrongGuesses++;
            showcase.soundManager.playSound("hit");
            drawHangman();
            if (wrongGuesses >= maxWrongGuesses) {
                endGame(false);
            }
        }
        updateGuessedDisplay();
    }

    function endGame(won) {
        // ... (same as original, use showcase.soundManager)
        gameOver = true;
        keyboard.querySelectorAll("button").forEach(btn => {
            btn.disabled = true;
            btn.style.cursor = "default";
        });

        if (won) {
            statusMessage.textContent = "You Win!";
            statusMessage.style.color = "lime";
            showcase.soundManager.playSound("win");
            showcase.updateScore(100); // Example score for winning
        } else {
            statusMessage.textContent = `Game Over! Word was: ${wordToGuess}`;
            statusMessage.style.color = "red";
            showcase.soundManager.playSound("gameOver");
            wordDisplay.textContent = wordToGuess.split("").join(" "); // Reveal word
        }
    }

    function startGame() {
        wordToGuess = words[Math.floor(Math.random() * words.length)];
        guessedLetters.clear();
        wrongGuesses = 0;
        gameOver = false;
        statusMessage.textContent = "";
        drawHangman();
        updateWordDisplay();
        updateGuessedDisplay();
        createKeyboard(); // Recreate keyboard for new game
    }

    startGame();

    return {
        cleanup: () => {
            // Event listeners on keyboard buttons are removed when container.innerHTML is cleared
            // or if keyboard is explicitly cleared and rebuilt.
        },
    };
}