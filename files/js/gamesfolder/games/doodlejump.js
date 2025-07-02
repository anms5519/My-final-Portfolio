// js/games/doodlejump.js
"use strict";
import { requestAnimFrame } from '../utils.js';

export function initDoodleJumpGame(showcase, canvas) {
    if (!canvas) return null;
    const ctx = canvas.getContext("2d");
    let animationFrameId;
    const player = { x: canvas.width / 2, y: canvas.height - 50, width: 40, height: 40, dx: 0, dy: 0, gravity: 0.3, lift: -8, speed: 4 };
    const platforms = [];
    const platformWidth = 70;
    const platformHeight = 15;
    const numPlatforms = 8; // Number of platforms visible at a time (approx)
    let score = 0;
    let highestY = player.y; // Track highest point reached by player's feet
    let cameraY = 0; // Camera offset to follow player

    function createPlatforms() {
        platforms.length = 0;
        // Initial platform for the player to start on
        platforms.push({ x: canvas.width / 2 - platformWidth / 2, y: canvas.height - 30, width: platformWidth, height: platformHeight });
        // Generate other platforms above
        for (let i = 1; i < numPlatforms * 3; i++) { // Generate more platforms initially to fill screen
            platforms.push({
                x: Math.random() * (canvas.width - platformWidth),
                y: canvas.height - i * (canvas.height / numPlatforms) - Math.random() * 30, // Randomize y slightly
                width: platformWidth,
                height: platformHeight
            });
        }
    }

    function drawPlayer() { /* ... as in original ... */ 
        ctx.fillStyle = "#2ecc71"; // Player color
        ctx.fillRect(player.x - player.width / 2, player.y - player.height / 2 - cameraY, player.width, player.height);
    }
    function drawPlatforms() { /* ... as in original ... */ 
        ctx.fillStyle = "#8c5a30"; // Platform color
        platforms.forEach(p => {
            ctx.fillRect(p.x, p.y - cameraY, p.width, p.height);
        });
    }
    function drawScore() { /* ... as in original ... */ 
        ctx.fillStyle = "#fff";
        ctx.font = "2vh var(--font-main)";
        ctx.textAlign = "left";
        ctx.fillText(`Score: ${score}`, 10, 30);
    }

    function updatePlayer() {
        // ... (same as original)
        player.x += player.dx;
        // Wrap around screen
        if (player.x > canvas.width + player.width / 2) player.x = -player.width / 2;
        else if (player.x < -player.width / 2) player.x = canvas.width + player.width / 2;

        player.dy += player.gravity;
        player.y += player.dy;

        // Update score based on highest point reached
        if (player.y < highestY) {
            score += Math.floor(highestY - player.y);
            highestY = player.y;
            showcase.updateScore(score);
        }
        
        // Camera follow
        if (player.y - cameraY < canvas.height * 0.3) { // If player is in top 30% of screen
            cameraY = player.y - canvas.height * 0.3;
        }

        // Game over if falls off bottom
        if (player.y - cameraY > canvas.height) {
            gameOver();
        }
    }

    function checkPlatformCollisions() {
        // ... (same as original, use showcase.soundManager)
        if (player.dy > 0) { // Only check for collision if falling
            platforms.forEach(p => {
                if (player.y + player.height / 2 > p.y && // Player's feet are below platform top
                    player.y + player.height / 2 < p.y + platformHeight + 10 && // And not too far below (10 is tolerance)
                    player.x + player.width / 2 > p.x && // Player is horizontally aligned with platform
                    player.x - player.width / 2 < p.x + p.width) {
                    player.dy = player.lift; // Bounce
                    showcase.soundManager.playSound("jump");
                }
            });
        }
    }

    function managePlatforms() {
        // ... (same as original)
        // Remove platforms that are off-screen below
        for (let i = platforms.length - 1; i >= 0; i--) {
            if (platforms[i].y - cameraY > canvas.height + 50) { // 50px buffer
                platforms.splice(i, 1);
            }
        }
        // Add new platforms at the top if needed
        if (platforms.length < numPlatforms * 2) { // Keep a buffer of platforms
            let highestPlatformY = canvas.height; // Start assuming highest is bottom of screen
            platforms.forEach(p => {
                highestPlatformY = Math.min(highestPlatformY, p.y);
            });
            platforms.push({
                x: Math.random() * (canvas.width - platformWidth),
                y: highestPlatformY - (canvas.height / numPlatforms) * (0.8 + Math.random() * 0.4), // Spawn above highest
                width: platformWidth,
                height: platformHeight
            });
        }
    }

    function gameOver() {
        // ... (same as original, use showcase.soundManager)
        if (animationFrameId === null) return; // Already over
        cancelAnimationFrame(animationFrameId);
        animationFrameId = null;
        showcase.soundManager.playSound("gameOver");
        ctx.fillStyle = "rgba(0, 0, 0, 0.7)";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.font = "4vh var(--font-heading)"; ctx.fillStyle = "red"; ctx.textAlign = "center";
        ctx.fillText("GAME OVER", canvas.width / 2, canvas.height / 2 - 20);
        ctx.font = "2vh var(--font-main)"; ctx.fillStyle = "white";
        ctx.fillText(`Final Score: ${score}`, canvas.width / 2, canvas.height / 2 + 20);
        ctx.fillText("Click Restart", canvas.width / 2, canvas.height / 2 + 50);
    }

    function gameLoop() {
        updatePlayer();
        checkPlatformCollisions();
        managePlatforms();

        ctx.fillStyle = "#87CEEB"; // Sky color
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        drawPlatforms();
        drawPlayer();
        drawScore();
        animationFrameId = requestAnimFrame(gameLoop);
    }

    const handleKeyDown = (e) => {
        if (animationFrameId === null) return; // Game over
        if (e.key === "ArrowLeft" || e.key.toLowerCase() === "a") player.dx = -player.speed;
        if (e.key === "ArrowRight" || e.key.toLowerCase() === "d") player.dx = player.speed;
    };
    const handleKeyUp = (e) => {
        if (animationFrameId === null) return;
        if ((e.key === "ArrowLeft" || e.key.toLowerCase() === "a") && player.dx < 0) player.dx = 0;
        if ((e.key === "ArrowRight" || e.key.toLowerCase() === "d") && player.dx > 0) player.dx = 0;
    };

    showcase.eventHandler.addManagedListener(document, "keydown", handleKeyDown, "doodlejump");
    showcase.eventHandler.addManagedListener(document, "keyup", handleKeyUp, "doodlejump");

    createPlatforms();
    animationFrameId = requestAnimFrame(gameLoop);

    return {
        cleanup: () => {
            if (animationFrameId) cancelAnimationFrame(animationFrameId);
            animationFrameId = null;
        },
    };
}