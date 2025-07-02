// js/games/frogger.js
"use strict";
import { requestAnimFrame } from '../utils.js';

export function initFroggerGame(showcase, canvas) {
    if (!canvas) return null;
    const ctx = canvas.getContext("2d");
    let animationFrameId;
    const scale = 40;
    const cols = canvas.width / scale;
    const rows = canvas.height / scale;
    let player = { x: cols / 2, y: rows - 1, width: scale * 0.8, height: scale * 0.8 };
    let score = 0;
    let lives = 3; // Not fully implemented in original UI, but good to have
    let homes = [false, false, false, false, false];
    let gameWon = false; // For current level
    let gameOver = false;
    const obstacles = [];
    const rowDefs = [ /* ... (rowDefs as in original) ... */ 
        { y: rows - 2, type: "car", speed: 1.5, dir: 1, len: 2, space: 4, color: "#e74c3c" },
        { y: rows - 3, type: "car", speed: 2, dir: -1, len: 1, space: 3, color: "#f1c40f" },
        { y: rows - 4, type: "car", speed: 1, dir: 1, len: 3, space: 5, color: "#3498db" },
        { y: rows - 5, type: "car", speed: 2.5, dir: -1, len: 1, space: 4, color: "#9b59b6" },
        // Water section
        { y: rows - 7, type: "log", speed: 1, dir: -1, len: 4, space: 6, color: "#8c5a30" },
        { y: rows - 8, type: "log", speed: 1.8, dir: 1, len: 3, space: 5, color: "#8c5a30" },
        { y: rows - 9, type: "log", speed: 1.2, dir: -1, len: 5, space: 7, color: "#8c5a30" },
        { y: rows - 10, type: "log", speed: 2.2, dir: 1, len: 2, space: 4, color: "#8c5a30" },
    ];

    function createObstacles() { /* ... as in original ... */ 
        obstacles.length = 0;
        rowDefs.forEach(def => {
            let currentX = (def.dir === 1) ? -def.len * scale : canvas.width;
            while ((def.dir === 1 && currentX < canvas.width * 1.5) || (def.dir === -1 && currentX > -canvas.width * 0.5)) {
                obstacles.push({
                    x: currentX, y: def.y * scale + (scale - scale * 0.8) / 2, // Center vertically
                    width: def.len * scale, height: scale * 0.8,
                    speed: def.speed * def.dir, type: def.type, color: def.color,
                    rowY: def.y // Store original row index for easier collision check
                });
                currentX += (def.len + def.space) * scale * def.dir;
            }
        });
    }
    function drawPlayer() { /* ... as in original ... */ 
        ctx.fillStyle = "#2ecc71"; // Frog color
        ctx.fillRect(
            player.x * scale + (scale - player.width) / 2,
            player.y * scale + (scale - player.height) / 2,
            player.width, player.height
        );
    }
    function drawObstacles() { /* ... as in original ... */ 
        obstacles.forEach(obs => {
            ctx.fillStyle = obs.color;
            ctx.fillRect(obs.x, obs.y, obs.width, obs.height);
        });
    }
    function drawBackground() { /* ... as in original ... */ 
        // Road
        ctx.fillStyle = "#333";
        ctx.fillRect(0, (rows / 2) * scale, canvas.width, (rows / 2 - 1) * scale);
        // Water
        ctx.fillStyle = "#3498db";
        ctx.fillRect(0, 1 * scale, canvas.width, (rows / 2 - 2) * scale);
        // Sidewalks/Goal area
        ctx.fillStyle = "#555";
        ctx.fillRect(0, (rows - 1) * scale, canvas.width, scale); // Start
        ctx.fillRect(0, (rows / 2 - 1) * scale, canvas.width, scale); // Middle
        ctx.fillRect(0, 0, canvas.width, scale); // Goal top

        // Homes
        ctx.fillStyle = "#2ecc71"; // Lily pad color
        const homeWidth = scale * 1.5;
        const homeSpacing = (canvas.width - homes.length * homeWidth) / (homes.length + 1);
        for (let i = 0; i < homes.length; i++) {
            const homeX = homeSpacing + i * (homeWidth + homeSpacing);
            if (homes[i]) { // If frog is in home
                ctx.fillRect(
                    homeX + (homeWidth - player.width) / 2,
                    (scale - player.height) / 2,
                    player.width, player.height
                );
            } else { // Empty home
                ctx.fillStyle = "#444"; // Darker color for empty home slot
                ctx.fillRect(homeX, 0, homeWidth, scale);
            }
        }
    }
    function drawUI() { /* ... as in original ... */ 
        ctx.fillStyle = "#fff";
        ctx.font = "1.6vh var(--font-main)";
        ctx.textAlign = "left";
        ctx.fillText(`Score: ${score}`, 10, canvas.height - 10);
        // Could add lives display here
    }

    function movePlayer(dx, dy) {
        // ... (same as original, use showcase.soundManager and showcase.updateScore)
        const nextX = player.x + dx;
        const nextY = player.y + dy;
        if (nextX >= 0 && nextX < cols && nextY >= 0 && nextY < rows) {
            player.x = nextX;
            player.y = nextY;
            showcase.soundManager.playSound("jump");
            if (dy < 0) { // Moved forward
                score += 10;
                showcase.updateScore(score);
            }
            if (player.y === 0) { // Reached goal row
                checkHome();
            }
        }
    }

    function checkHome() {
        // ... (same as original, use showcase.soundManager and showcase.updateScore)
        const homeWidth = scale * 1.5;
        const homeSpacing = (canvas.width - homes.length * homeWidth) / (homes.length + 1);
        const playerCenterX = player.x * scale + scale / 2;
        let landedHome = false;

        for (let i = 0; i < homes.length; i++) {
            const homeXStart = homeSpacing + i * (homeWidth + homeSpacing);
            const homeXEnd = homeXStart + homeWidth;
            if (playerCenterX > homeXStart && playerCenterX < homeXEnd) {
                if (!homes[i]) {
                    homes[i] = true;
                    score += 100; // Bonus for reaching home
                    showcase.updateScore(score);
                    showcase.soundManager.playSound("point");
                    landedHome = true;
                    resetPlayer();
                    if (homes.every(h => h)) {
                        gameWon = true; // Level cleared
                        showcase.soundManager.playSound("win");
                        alert("Level Cleared!"); // Simple win condition
                        homes.fill(false); // Reset homes for next level (if implemented)
                        createObstacles(); // Could regenerate for new level
                    }
                } else {
                    resetPlayer(true); // Died by landing in occupied home
                }
                break;
            }
        }
        if (!landedHome) {
            resetPlayer(true); // Died by missing a home
        }
    }

    function updateObstacles() { /* ... as in original ... */ 
        obstacles.forEach(obs => {
            obs.x += obs.speed;
            if (obs.speed > 0 && obs.x > canvas.width) {
                obs.x = -obs.width;
            } else if (obs.speed < 0 && obs.x < -obs.width) {
                obs.x = canvas.width;
            }
        });
    }

    function checkCollisions() {
        // ... (same as original, use showcase.soundManager)
        const playerRect = {
            x: player.x * scale + (scale - player.width) / 2,
            y: player.y * scale + (scale - player.height) / 2,
            width: player.width,
            height: player.height
        };

        let onLog = false;
        let logSpeed = 0;

        // Water section (logs)
        if (player.y > 0 && player.y < rows / 2 - 1) { // Assuming water is roughly in this area
            obstacles.forEach(obs => {
                if (obs.type === "log" && obs.rowY === player.y) {
                    if (playerRect.x < obs.x + obs.width &&
                        playerRect.x + playerRect.width > obs.x &&
                        playerRect.y < obs.y + obs.height &&
                        playerRect.y + playerRect.height > obs.y) {
                        onLog = true;
                        logSpeed = obs.speed;
                    }
                }
            });
            if (!onLog) {
                resetPlayer(true); // Drowned
                return;
            } else {
                player.x += logSpeed / scale; // Move with the log
                // Check if carried off screen
                if (player.x * scale < -player.width || player.x * scale > canvas.width) {
                    resetPlayer(true);
                    return;
                }
            }
        }

        // Road section (cars)
        if (player.y >= rows / 2 && player.y < rows - 1) { // Assuming road is roughly here
            obstacles.forEach(obs => {
                if (obs.type === "car" && obs.rowY === player.y) {
                    if (playerRect.x < obs.x + obs.width &&
                        playerRect.x + playerRect.width > obs.x &&
                        playerRect.y < obs.y + obs.height &&
                        playerRect.y + playerRect.height > obs.y) {
                        resetPlayer(true); // Hit by car
                    }
                }
            });
        }
    }

    function resetPlayer(isDead = false) {
        // ... (same as original, use showcase.soundManager)
        player.x = cols / 2;
        player.y = rows - 1;
        if (isDead) {
            showcase.soundManager.playSound("hit"); // Or a specific death sound
            lives--;
            if (lives <= 0) {
                gameOver = true;
                showcase.soundManager.playSound("gameOver");
                alert("GAME OVER! Final Score: " + score);
                // Could call showcase.restartCurrentGame() or similar
            }
        }
    }

    function gameLoop() {
        if (gameOver || gameWon) { // If gameWon is for level, might need different handling
            if (gameWon && !gameOver) { // If level won, but game not over
                // Potentially reset for next level or show a message
                // For now, just stop if all homes are filled
                if (homes.every(h => h)) {
                     // This logic is now in checkHome, gameWon might be redundant here
                } else {
                    gameWon = false; // Allow continuing if not all homes filled
                }
            }
            if (gameOver) {
                // Draw game over screen or message
                return;
            }
        }

        updateObstacles();
        checkCollisions();

        ctx.fillStyle = "#000";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        drawBackground();
        drawObstacles();
        drawPlayer();
        drawUI();
        animationFrameId = requestAnimFrame(gameLoop);
    }

    const handleKeyDown = (e) => {
        if (gameOver || gameWon) return;
        if (["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].includes(e.key)) {
            e.preventDefault();
        }
        switch (e.key) {
            case "ArrowUp": case "w": movePlayer(0, -1); break;
            case "ArrowDown": case "s": movePlayer(0, 1); break;
            case "ArrowLeft": case "a": movePlayer(-1, 0); break;
            case "ArrowRight": case "d": movePlayer(1, 0); break;
        }
    };

    showcase.eventHandler.addManagedListener(document, "keydown", handleKeyDown, "frogger");
    createObstacles();
    resetPlayer();
    animationFrameId = requestAnimFrame(gameLoop);

    return {
        cleanup: () => {
            if (animationFrameId) cancelAnimationFrame(animationFrameId);
            animationFrameId = null;
        },
    };
}