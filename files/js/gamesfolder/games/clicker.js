// js/games/clicker.js
"use strict";

export function initClickerGame(showcase, container) {
    if (!container) return null;
    container.innerHTML = "";
    container.style.display = "flex";
    container.style.flexDirection = "column";
    container.style.alignItems = "center";
    container.style.justifyContent = "center";
    container.style.gap = "1.5vh";
    container.style.color = "#fff"; // Assuming dark theme

    let score = 0;
    let scorePerClick = 1;
    let autoClickRate = 0;
    let autoClickInterval;

    const scoreDisplay = document.createElement("h2");
    scoreDisplay.textContent = `Score: ${score}`;
    scoreDisplay.style.fontSize = "2em";
    scoreDisplay.style.fontFamily = "var(--font-heading)";
    container.appendChild(scoreDisplay);

    const clickButton = document.createElement("button");
    clickButton.innerHTML = '<i class="fas fa-hand-pointer"></i> Click Me!';
    clickButton.style.padding = "2vh 4vh";
    clickButton.style.fontSize = "1.5em";
    clickButton.style.backgroundColor = "var(--primary-color)";
    clickButton.style.color = "#111";
    clickButton.style.border = "none";
    clickButton.style.borderRadius = "1vh";
    clickButton.style.cursor = "pointer";
    clickButton.style.transition = "transform 0.1s ease";
    clickButton.addEventListener("mousedown", () => clickButton.style.transform = "scale(0.95)");
    clickButton.addEventListener("mouseup", () => clickButton.style.transform = "scale(1)");
    clickButton.addEventListener("click", () => {
        score += scorePerClick;
        updateDisplay();
        showcase.soundManager.playSound("click");
        showClickFeedback(clickButton);
    });
    container.appendChild(clickButton);

    const statsDisplay = document.createElement("div");
    statsDisplay.style.fontSize = "1em";
    statsDisplay.innerHTML = `Per Click: ${scorePerClick} | Auto/sec: ${autoClickRate}`;
    container.appendChild(statsDisplay);

    const upgradesContainer = document.createElement("div");
    upgradesContainer.style.display = "flex";
    upgradesContainer.style.gap = "1vh";
    container.appendChild(upgradesContainer);

    const upgradeClickButton = createUpgradeButton(
        "Upgrade Click (Cost: 10)", 10,
        () => {
            scorePerClick++;
            return Math.floor(10 * Math.pow(1.15, scorePerClick));
        },
        (cost) => `Upgrade Click (Cost: ${cost})`
    );
    upgradesContainer.appendChild(upgradeClickButton);

    const upgradeAutoButton = createUpgradeButton(
        "Buy Auto Clicker (Cost: 50)", 50,
        () => {
            autoClickRate++;
            startAutoClicker();
            return Math.floor(50 * Math.pow(1.2, autoClickRate));
        },
        (cost) => `Buy Auto Clicker (Cost: ${cost})`
    );
    upgradesContainer.appendChild(upgradeAutoButton);

    function createUpgradeButton(initialText, initialCost, action, updateTextFn) {
        const button = document.createElement("button");
        let currentCost = initialCost;
        button.textContent = initialText;
        button.style.padding = ".8vh 1.5vh";
        button.style.fontSize = "0.9em";
        button.style.backgroundColor = "var(--accent-color)";
        button.style.color = "#fff";
        button.style.border = "none";
        button.style.borderRadius = ".5vh";
        button.style.cursor = "pointer";
        button.disabled = true; // Initially disabled
        button.addEventListener("click", () => {
            if (score >= currentCost) {
                score -= currentCost;
                currentCost = action();
                button.textContent = updateTextFn(currentCost);
                updateDisplay();
                showcase.soundManager.playSound("point");
            }
        });
        // Method to update button's disabled state and appearance
        button.updateAvailability = () => {
            button.disabled = score < currentCost;
            button.style.opacity = button.disabled ? 0.6 : 1;
        };
        button.updateAvailability(); // Initial check
        return button;
    }

    function updateDisplay() {
        scoreDisplay.textContent = `Score: ${Math.floor(score)}`; // Show whole numbers for score
        statsDisplay.innerHTML = `Per Click: ${scorePerClick} | Auto/sec: ${autoClickRate}`;
        showcase.updateScore(Math.floor(score)); // Update showcase score
        upgradeClickButton.updateAvailability();
        upgradeAutoButton.updateAvailability();
    }

    function startAutoClicker() {
        if (autoClickInterval) clearInterval(autoClickInterval);
        if (autoClickRate > 0) {
            autoClickInterval = setInterval(() => {
                score += autoClickRate / 10; // Add fraction of rate every 100ms
                updateDisplay();
            }, 100);
        }
    }
    
    function showClickFeedback(button) {
        const feedback = document.createElement("div");
        feedback.textContent = `+${scorePerClick}`;
        feedback.style.position = "absolute";
        const rect = button.getBoundingClientRect();
        const containerRect = container.getBoundingClientRect(); // Get container's rect
        
        // Position relative to the container, not the viewport
        feedback.style.left = `${rect.left - containerRect.left + rect.width / 2 + (Math.random() * 40 - 20)}px`;
        feedback.style.top = `${rect.top - containerRect.top - 20 + (Math.random() * 10 - 5)}px`;
        
        feedback.style.color = "var(--primary-color)";
        feedback.style.fontSize = "1.2em";
        feedback.style.fontWeight = "bold";
        feedback.style.pointerEvents = "none";
        feedback.style.transition = "opacity 0.5s ease-out, transform 0.5s ease-out";
        feedback.style.opacity = "1";
        feedback.style.transform = "translateY(0)";
        container.appendChild(feedback);

        setTimeout(() => {
            feedback.style.opacity = "0";
            feedback.style.transform = "translateY(-3vh)";
            setTimeout(() => { if (container.contains(feedback)) container.removeChild(feedback); }, 500);
        }, 100);
    }


    updateDisplay(); // Initial display update

    return {
        cleanup: () => {
            if (autoClickInterval) clearInterval(autoClickInterval);
            // Event listeners on buttons will be removed when container.innerHTML is cleared by showcase
        },
    };
}