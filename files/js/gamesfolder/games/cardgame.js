// js/games/cardgame.js
"use strict";

export function initCardGame(showcase, container) {
    if (!container) return { cleanup: () => {} };
    container.innerHTML = ""; // Clear previous content

    const gameContainer = document.createElement("div");
    gameContainer.className = "card-game-container";
    gameContainer.style.display = "flex";
    gameContainer.style.flexDirection = "column";
    gameContainer.style.alignItems = "center";
    gameContainer.style.justifyContent = "center";
    gameContainer.style.width = "100%";
    gameContainer.style.height = "100%";
    gameContainer.style.padding = "2vh";
    gameContainer.style.boxSizing = "border-box";
    gameContainer.style.fontFamily = "var(--font-main)";
    gameContainer.style.color = "#fff";
    gameContainer.style.background = "radial-gradient(circle at center, #0a3f2a, #0c2432)"; // Dark green/blue casino feel
    gameContainer.style.borderRadius = ".8vh";
    gameContainer.style.position = "relative"; // For absolute positioned elements like floating cards

    const title = document.createElement("h2");
    title.textContent = "Card Predictor";
    title.style.margin = "0 0 2vh 0";
    title.style.color = "var(--primary-color)";
    title.style.textShadow = "0 0 1vh rgba(255,255,255,0.2)";
    gameContainer.appendChild(title);

    const gameArea = document.createElement("div");
    gameArea.className = "card-game-area";
    gameArea.style.display = "flex";
    gameArea.style.flexDirection = "column";
    gameArea.style.alignItems = "center";
    gameArea.style.width = "100%";
    gameArea.style.maxWidth = "45vh"; // Control max width for better layout
    gameArea.style.flex = "1"; // Allow it to take available space
    gameContainer.appendChild(gameArea);

    const cardArea = document.createElement("div");
    cardArea.className = "card-area";
    cardArea.style.display = "flex";
    cardArea.style.justifyContent = "center";
    cardArea.style.alignItems = "center";
    cardArea.style.gap = "2vh";
    cardArea.style.minHeight = "18vh"; // Ensure space for cards
    cardArea.style.width = "100%";
    cardArea.style.margin = "1vh 0 3vh";
    gameArea.appendChild(cardArea);

    const currentCardContainer = document.createElement("div");
    currentCardContainer.className = "card-container current";
    currentCardContainer.style.position = "relative";
    currentCardContainer.style.perspective = "100vh"; // For 3D flip effect
    const currentCardElement = document.createElement("div");
    currentCardElement.className = "card current-card";
    styleCard(currentCardElement); // Apply base card styling
    currentCardContainer.appendChild(currentCardElement);
    cardArea.appendChild(currentCardContainer);

    const nextCardContainer = document.createElement("div");
    nextCardContainer.className = "card-container next";
    nextCardContainer.style.position = "relative";
    nextCardContainer.style.perspective = "100vh";
    const nextCardElement = document.createElement("div");
    nextCardElement.className = "card next-card";
    styleCard(nextCardElement, true); // Style as card back initially
    nextCardContainer.appendChild(nextCardElement);
    cardArea.appendChild(nextCardContainer);

    const controlsArea = document.createElement("div");
    controlsArea.className = "controls-area";
    controlsArea.style.display = "flex";
    controlsArea.style.flexDirection = "column";
    controlsArea.style.alignItems = "center";
    controlsArea.style.gap = "1.5vh";
    controlsArea.style.width = "100%";
    gameArea.appendChild(controlsArea);

    const resultDisplay = document.createElement("div");
    resultDisplay.className = "result-display";
    resultDisplay.textContent = "Predict if the next card will be higher or lower!";
    resultDisplay.style.fontSize = "1.8vh";
    resultDisplay.style.textAlign = "center";
    resultDisplay.style.marginBottom = "1.5vh";
    resultDisplay.style.minHeight = "5.4vh"; // To prevent layout shifts
    resultDisplay.style.color = "#fff";
    resultDisplay.style.fontWeight = "bold";
    resultDisplay.style.textShadow = "0 0 .5vh rgba(0,0,0,0.5)";
    controlsArea.appendChild(resultDisplay);

    const buttonRow = document.createElement("div");
    buttonRow.className = "button-row";
    buttonRow.style.display = "flex";
    buttonRow.style.gap = "1.5vh";
    buttonRow.style.marginBottom = "2vh";
    const higherBtn = document.createElement("button");
    higherBtn.textContent = "HIGHER";
    higherBtn.className = "prediction-btn higher";
    styleActionButton(higherBtn, "#2ecc71");
    const lowerBtn = document.createElement("button");
    lowerBtn.textContent = "LOWER";
    lowerBtn.className = "prediction-btn lower";
    styleActionButton(lowerBtn, "#e74c3c");
    buttonRow.appendChild(higherBtn);
    buttonRow.appendChild(lowerBtn);
    controlsArea.appendChild(buttonRow);

    const newGameBtn = document.createElement("button");
    newGameBtn.textContent = "NEW GAME";
    newGameBtn.className = "new-game-btn";
    styleActionButton(newGameBtn, "#3498db", true); // Larger button
    newGameBtn.style.display = "none"; // Initially hidden
    controlsArea.appendChild(newGameBtn);

    const statsDisplay = document.createElement("div");
    statsDisplay.className = "stats-display";
    statsDisplay.style.display = "flex";
    statsDisplay.style.justifyContent = "space-between";
    statsDisplay.style.width = "100%";
    statsDisplay.style.marginTop = "1.5vh";
    statsDisplay.style.padding = "1vh";
    statsDisplay.style.borderRadius = ".5vh";
    statsDisplay.style.background = "rgba(0,0,0,0.3)";
    const streakDisplay = document.createElement("div");
    streakDisplay.textContent = "Streak: 0";
    streakDisplay.className = "streak";
    const scoreDisplay = document.createElement("div");
    scoreDisplay.textContent = "Score: 0";
    scoreDisplay.className = "score";
    const cardsLeftDisplay = document.createElement("div");
    cardsLeftDisplay.textContent = "Cards: 52";
    cardsLeftDisplay.className = "cards-left";
    statsDisplay.appendChild(streakDisplay);
    statsDisplay.appendChild(scoreDisplay);
    statsDisplay.appendChild(cardsLeftDisplay);
    controlsArea.appendChild(statsDisplay);

    addFloatingCards(gameContainer); // Add decorative floating cards

    container.appendChild(gameContainer);

    let deck = [];
    let currentCardValue = null;
    let nextCardValue = null;
    let score = 0;
    let streak = 0;
    let cardsLeft = 52;
    let gameOver = false;
    let predictionInProgress = false;

    function initializeDeck() {
        deck = [];
        const suits = ["hearts", "diamonds", "clubs", "spades"];
        const values = ["2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K", "A"];
        for (let suit of suits) {
            for (let i = 0; i < values.length; i++) {
                deck.push({
                    suit: suit,
                    value: values[i],
                    numericValue: i + 2, // 2 is 2, Ace is 14
                    color: (suit === "hearts" || suit === "diamonds") ? "red" : "black"
                });
            }
        }
        shuffleDeck();
        cardsLeft = deck.length;
        updateStats();
    }

    function shuffleDeck() {
        for (let i = deck.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [deck[i], deck[j]] = [deck[j], deck[i]];
        }
    }

    function dealInitialCard() {
        if (deck.length === 0) {
            endGame();
            return;
        }
        currentCardValue = deck.pop();
        cardsLeft = deck.length;
        displayCard(currentCardElement, currentCardValue, false);
        updateStats();
        resultDisplay.textContent = "Will the next card be higher or lower?";
        resultDisplay.style.color = "#fff";
    }

    function displayCard(cardEl, cardData, isCardBack = false) {
        if (isCardBack) {
            cardEl.innerHTML = "";
            cardEl.style.background = "#2c3e50";
            cardEl.style.backgroundImage = "repeating-linear-gradient(45deg, #34495e, #34495e 1vh, #2c3e50 1vh, #2c3e50 2vh)";
            const innerCircle = document.createElement("div");
            innerCircle.style.position = "absolute";
            innerCircle.style.top = "50%"; innerCircle.style.left = "50%";
            innerCircle.style.transform = "translate(-50%, -50%)";
            innerCircle.style.width = "6vh"; innerCircle.style.height = "6vh";
            innerCircle.style.borderRadius = "50%";
            innerCircle.style.background = "var(--primary-color)";
            innerCircle.style.display = "flex"; innerCircle.style.justifyContent = "center"; innerCircle.style.alignItems = "center";
            innerCircle.style.boxShadow = "0 0 1.5vh rgba(0,0,0,0.3)";
            const cardIcon = document.createElement("i");
            cardIcon.className = "fas fa-crown";
            cardIcon.style.fontSize = "2.4vh"; cardIcon.style.color = "#fff";
            innerCircle.appendChild(cardIcon);
            cardEl.appendChild(innerCircle);
            return;
        }

        cardEl.innerHTML = "";
        cardEl.style.background = "#fff";
        cardEl.style.color = cardData.color;

        const valueTop = document.createElement("div");
        valueTop.className = "card-value top"; valueTop.textContent = cardData.value;
        valueTop.style.position = "absolute"; valueTop.style.top = ".8vh"; valueTop.style.left = ".8vh";
        valueTop.style.fontSize = "2.8vh"; valueTop.style.fontWeight = "bold";

        const valueBottom = document.createElement("div");
        valueBottom.className = "card-value bottom"; valueBottom.textContent = cardData.value;
        valueBottom.style.position = "absolute"; valueBottom.style.bottom = ".8vh"; valueBottom.style.right = ".8vh";
        valueBottom.style.fontSize = "2.8vh"; valueBottom.style.fontWeight = "bold";
        valueBottom.style.transform = "rotate(180deg)";

        const suitTop = document.createElement("div"); suitTop.className = "card-suit top";
        suitTop.style.position = "absolute"; suitTop.style.top = "3.8vh"; suitTop.style.left = ".8vh"; suitTop.style.fontSize = "2vh";
        const suitBottom = document.createElement("div"); suitBottom.className = "card-suit bottom";
        suitBottom.style.position = "absolute"; suitBottom.style.bottom = "3.8vh"; suitBottom.style.right = ".8vh"; suitBottom.style.fontSize = "2vh";
        suitBottom.style.transform = "rotate(180deg)";

        let suitIcon;
        switch (cardData.suit) {
            case "hearts": suitIcon = "♥"; break;
            case "diamonds": suitIcon = "♦"; break;
            case "clubs": suitIcon = "♣"; break;
            case "spades": suitIcon = "♠"; break;
        }
        suitTop.textContent = suitIcon;
        suitBottom.textContent = suitIcon;

        const centerDesign = document.createElement("div");
        centerDesign.className = "card-center";
        centerDesign.style.position = "absolute"; centerDesign.style.top = "50%"; centerDesign.style.left = "50%";
        centerDesign.style.transform = "translate(-50%, -50%)";
        centerDesign.style.fontSize = "6vh"; centerDesign.style.fontWeight = "bold"; centerDesign.style.opacity = "0.8";
        centerDesign.textContent = suitIcon;

        cardEl.appendChild(valueTop); cardEl.appendChild(valueBottom);
        cardEl.appendChild(suitTop); cardEl.appendChild(suitBottom);
        cardEl.appendChild(centerDesign);
    }

    function makeGuess(prediction) {
        if (gameOver || predictionInProgress) return;
        predictionInProgress = true;
        higherBtn.disabled = true;
        lowerBtn.disabled = true;

        if (deck.length === 0) {
            endGame();
            return;
        }
        nextCardValue = deck.pop();
        cardsLeft = deck.length;

        flipCard(nextCardElement, () => {
            displayCard(nextCardElement, nextCardValue, false);
            const isHigher = nextCardValue.numericValue > currentCardValue.numericValue;
            const isLower = nextCardValue.numericValue < currentCardValue.numericValue;
            const isSame = nextCardValue.numericValue === currentCardValue.numericValue;
            let correct = false;

            if (prediction === "higher" && isHigher) correct = true;
            else if (prediction === "lower" && isLower) correct = true;

            if (isSame) {
                resultDisplay.textContent = "Same value! No points awarded.";
                resultDisplay.style.color = "#f1c40f";
                streak = 0;
            } else if (correct) {
                streak++;
                score += 10 * streak;
                showcase.updateScore(score);
                resultDisplay.textContent = `Correct! +${10 * streak} points`;
                resultDisplay.style.color = "#2ecc71";
                showcase.soundManager.playSound("point");
                addFloatingPoints(controlsArea, 10 * streak);
            } else {
                streak = 0;
                resultDisplay.textContent = "Wrong! Try again.";
                resultDisplay.style.color = "#e74c3c";
                showcase.soundManager.playSound("hit");
            }
            updateStats();

            setTimeout(() => {
                currentCardElement.style.transition = "transform 0.5s ease, opacity 0.5s ease";
                nextCardElement.style.transition = "transform 0.5s ease, opacity 0.5s ease";

                currentCardElement.style.transform = "translateX(-120%) scale(0.8)";
                currentCardElement.style.opacity = "0";
                nextCardElement.style.transform = "translateX(-100%)"; // Move next card to current card's position

                setTimeout(() => {
                    currentCardValue = nextCardValue;
                    displayCard(currentCardElement, currentCardValue, false);
                    currentCardElement.style.transition = "none"; // Reset transition for instant snap
                    nextCardElement.style.transition = "none";
                    currentCardElement.style.transform = "translateX(0) scale(1)";
                    currentCardElement.style.opacity = "1";

                    displayCard(nextCardElement, null, true); // Reset next card to back
                    nextCardElement.style.transform = "translateX(0)"; // Move it back to its original spot

                    higherBtn.disabled = false;
                    lowerBtn.disabled = false;
                    predictionInProgress = false;

                    if (deck.length === 0) {
                        resultDisplay.textContent = "No more cards! Game over.";
                        displayGameOver();
                    }
                }, 500);
            }, 1500); // Time to see the result
        });
    }

    function flipCard(cardEl, callback) {
        cardEl.style.transition = "transform 0.3s ease";
        cardEl.style.transform = "rotateY(90deg)";
        showcase.soundManager.playSound("ui"); // Generic UI sound for flip
        setTimeout(() => {
            if (callback) callback();
            setTimeout(() => {
                cardEl.style.transform = "rotateY(0deg)";
            }, 50); // Small delay to ensure content is updated before flipping back
        }, 300); // Halfway through flip
    }

    function updateStats() {
        streakDisplay.textContent = `Streak: ${streak}`;
        scoreDisplay.textContent = `Score: ${score}`;
        cardsLeftDisplay.textContent = `Cards: ${cardsLeft}`;
        if (streak >= 3) {
            streakDisplay.style.color = "#f39c12"; // Gold for high streak
            streakDisplay.style.fontWeight = "bold";
        } else {
            streakDisplay.style.color = "#fff";
            streakDisplay.style.fontWeight = "normal";
        }
        if (streak >= 5) { // Add a visual cue for very high streak
            gameContainer.style.boxShadow = "0 0 2vh var(--primary-color)";
        } else {
            gameContainer.style.boxShadow = "none";
        }
    }

    function startNewGame() {
        score = 0;
        streak = 0;
        gameOver = false;
        resultDisplay.textContent = "Will the next card be higher or lower?";
        resultDisplay.style.color = "#fff";
        newGameBtn.style.display = "none";
        higherBtn.style.display = "block"; // Or flex if using flexbox for buttonRow
        lowerBtn.style.display = "block";
        initializeDeck();
        dealInitialCard();
        displayCard(nextCardElement, null, true); // Reset next card display
        higherBtn.disabled = false;
        lowerBtn.disabled = false;
        showcase.soundManager.playSound("restart");
    }

    function endGame() {
        gameOver = true;
        displayGameOver();
    }

    function displayGameOver() {
        resultDisplay.textContent = `Game Over! Final Score: ${score}`;
        higherBtn.style.display = "none";
        lowerBtn.style.display = "none";
        newGameBtn.style.display = "block";
        showcase.soundManager.playSound("gameOver");
        showcase.updateScore(score); // Final score update for achievements/stats
    }

    function addFloatingPoints(pointsContainer, pointsValue) {
        const pointsElement = document.createElement("div");
        pointsElement.textContent = `+${pointsValue}`;
        pointsElement.style.position = "absolute";
        pointsElement.style.top = "50%";
        pointsElement.style.left = "50%";
        pointsElement.style.transform = "translate(-50%, -50%)";
        pointsElement.style.color = "#2ecc71";
        pointsElement.style.fontWeight = "bold";
        pointsElement.style.fontSize = "3.2vh";
        pointsElement.style.pointerEvents = "none";
        pointsElement.style.zIndex = "100";
        pointsElement.style.opacity = "0"; // Start invisible
        pointsElement.style.animation = "floatPoints 1.5s ease-out forwards";
        pointsContainer.appendChild(pointsElement);

        // Ensure keyframes are defined (could be in a global style or added dynamically)
        const styleId = "floatPointsKeyframes";
        if (!document.getElementById(styleId)) {
            const style = document.createElement("style");
            style.id = styleId;
            style.textContent = `
                @keyframes floatPoints {
                    0% { opacity: 0; transform: translate(-50%, -50%) scale(0.5); }
                    20% { opacity: 1; transform: translate(-50%, -50%) scale(1.5); }
                    100% { opacity: 0; transform: translate(-50%, -200%) scale(1); }
                }
            `;
            document.head.appendChild(style);
        }
        setTimeout(() => {
            pointsElement.remove();
        }, 1500);
    }

    function addFloatingCards(bgContainer) {
        const numCards = 5;
        const floatingCards = [];
        const styleId = "floatingCardKeyframes";
        if (!document.getElementById(styleId)) {
            const style = document.createElement("style");
            style.id = styleId;
            style.textContent = `
                @keyframes floatingCard {
                    0% { transform: translate(0, 0) rotate(0deg); }
                    50% { transform: translate(1vh, -1vh) rotate(5deg); }
                    100% { transform: translate(0, 0) rotate(0deg); }
                }
            `;
            document.head.appendChild(style);
        }

        for (let i = 0; i < numCards; i++) {
            const card = document.createElement("div");
            card.className = "floating-card";
            styleCard(card, true, 40, 60); // Smaller decorative cards
            card.style.position = "absolute";
            card.style.zIndex = "1"; // Behind main content
            card.style.opacity = "0.2";

            // Position them in corners or randomly
            const corner = i % 4;
            switch(corner) {
                case 0: card.style.top = "5%"; card.style.left = "5%"; break;
                case 1: card.style.top = "10%"; card.style.right = "5%"; break;
                case 2: card.style.bottom = "10%"; card.style.right = "5%"; break;
                case 3: card.style.bottom = "5%"; card.style.left = "10%"; break;
            }
            card.style.transform = `rotate(${Math.random() * 40 - 20}deg)`;
            card.style.animation = `floatingCard ${3 + Math.random() * 2}s ease-in-out infinite`;
            card.style.animationDelay = `${Math.random() * 2}s`;

            bgContainer.appendChild(card);
            floatingCards.push(card);
        }
        // Return a cleanup function for these decorative elements if needed
        return () => {
            floatingCards.forEach(card => card.remove());
            const keyframeStyle = document.getElementById(styleId);
            if (keyframeStyle) keyframeStyle.remove();
        };
    }

    function styleCard(cardEl, isCardBack = false, width = 120, height = 180) {
        cardEl.style.width = `${width}px`;
        cardEl.style.height = `${height}px`;
        cardEl.style.borderRadius = "1vh";
        cardEl.style.boxShadow = "0 .4vh .8vh rgba(0,0,0,0.3)";
        cardEl.style.position = "relative"; // For inner content positioning
        cardEl.style.overflow = "hidden";
        cardEl.style.transition = "transform 0.3s ease, box-shadow 0.3s ease";
        if (isCardBack) {
            cardEl.style.background = "#2c3e50";
            cardEl.style.backgroundImage = "repeating-linear-gradient(45deg, #34495e, #34495e 1vh, #2c3e50 1vh, #2c3e50 2vh)";
        } else {
            cardEl.style.background = "#fff";
        }
        cardEl.style.border = ".1vh solid rgba(0,0,0,0.3)"; // Subtle border
    }

    function styleActionButton(button, color, isLarge = false) {
        button.style.background = color;
        button.style.color = "#fff";
        button.style.fontWeight = "bold";
        button.style.border = "none";
        button.style.borderRadius = ".6vh";
        button.style.padding = isLarge ? "1.2vh 2.4vh" : "1vh 2vh";
        button.style.fontSize = isLarge ? "1.8vh" : "1.6vh";
        button.style.cursor = "pointer";
        button.style.boxShadow = "0 .4vh .6vh rgba(0,0,0,0.1)";
        button.style.transition = "all 0.2s ease";

        button.addEventListener("mouseenter", () => {
            button.style.transform = "translateY(-.2vh)";
            button.style.boxShadow = "0 .6vh 1.2vh rgba(0,0,0,0.15)";
        });
        button.addEventListener("mouseleave", () => {
            button.style.transform = "translateY(0)";
            button.style.boxShadow = "0 .4vh .6vh rgba(0,0,0,0.1)";
        });
        button.addEventListener("mousedown", () => {
            button.style.transform = "translateY(.1vh)";
            button.style.boxShadow = "0 .2vh .3vh rgba(0,0,0,0.1)";
        });
        button.addEventListener("mouseup", () => { // Restore hover effect on mouseup
            button.style.transform = "translateY(-.2vh)";
            button.style.boxShadow = "0 .6vh 1.2vh rgba(0,0,0,0.15)";
        });
        return button;
    }

    initializeDeck();
    dealInitialCard();

    return {
        cleanup: () => {
            // Event listeners are on buttons created here, so they'll be removed with container.innerHTML = ""
            // If any global listeners were added for this game, clean them up via showcase.eventHandler
        },
    };
}