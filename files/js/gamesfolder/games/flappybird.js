// js/games/flappybird.js
"use strict";
import { requestAnimFrame } from '../utils.js';

export function initFlappyBirdGame(showcase, canvas) {
    if (!canvas) return null;
    const ctx = canvas.getContext("2d");
    let animationFrameId;
    const bird = { x: 50, y: canvas.height / 2, radius: 15, velocity: 0, gravity: 0.4, lift: -7 };
    const pipes = [];
    const pipeWidth = 60;
    const pipeGap = 120;
    const pipeFrequency = 90; // Frames
    let frameCount = 0;
    let score = 0;
    let gameOver = false;

    function drawBird() { /* ... as in original ... */ 
        ctx.fillStyle = "#f1c40f"; // Bird color
        ctx.beginPath();
        ctx.arc(bird.x, bird.y, bird.radius, 0, Math.PI * 2);
        ctx.fill();
    }
    function drawPipes() { /* ... as in original ... */ 
        ctx.fillStyle = "#2ecc71"; // Pipe color
        pipes.forEach(pipe => {
            ctx.fillRect(pipe.x, 0, pipeWidth, pipe.topHeight); // Top pipe
            ctx.fillRect(pipe.x, canvas.height - pipe.bottomHeight, pipeWidth, pipe.bottomHeight); // Bottom pipe
        });
    }
    function drawScore() { /* ... as in original ... */ 
        ctx.fillStyle = "#fff";
        ctx.font = "3vh var(--font-heading)";
        ctx.textAlign = "center";
        ctx.fillText(score, canvas.width / 2, 50);
    }
    function drawGameOver() { /* ... as in original ... */ 
        ctx.fillStyle = "rgba(0, 0, 0, 0.7)";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.font = "4vh var(--font-heading)"; ctx.fillStyle = "red"; ctx.textAlign = "center";
        ctx.fillText("GAME OVER", canvas.width / 2, canvas.height / 2 - 20);
        ctx.font = "2vh var(--font-main)"; ctx.fillStyle = "white";
        ctx.fillText(`Score: ${score}`, canvas.width / 2, canvas.height / 2 + 20);
        ctx.fillText("Click Restart", canvas.width / 2, canvas.height / 2 + 50);
    }

    function updateBird() {
        // ... (same as original)
        bird.velocity += bird.gravity;
        bird.velocity *= 0.95; // Some air resistance
        bird.y += bird.velocity;

        if (bird.y + bird.radius > canvas.height || bird.y - bird.radius < 0) {
            endGame();
        }
    }

    function updatePipes() {
        // ... (same as original, use showcase.soundManager and showcase.updateScore)
        if (frameCount % pipeFrequency === 0) {
            const minHeight = 40;
            const maxHeight = canvas.height - pipeGap - minHeight;
            const topHeight = Math.random() * (maxHeight - minHeight) + minHeight;
            const bottomHeight = canvas.height - topHeight - pipeGap;
            pipes.push({ x: canvas.width, topHeight: topHeight, bottomHeight: bottomHeight, scored: false });
        }

        for (let i = pipes.length - 1; i >= 0; i--) {
            pipes[i].x -= 3; // Pipe speed

            // Collision detection
            if (bird.x + bird.radius > pipes[i].x && bird.x - bird.radius < pipes[i].x + pipeWidth) {
                if (bird.y - bird.radius < pipes[i].topHeight || bird.y + bird.radius > canvas.height - pipes[i].bottomHeight) {
                    endGame();
                }
            }

            // Score
            if (!pipes[i].scored && pipes[i].x + pipeWidth < bird.x) {
                score++;
                pipes[i].scored = true;
                showcase.updateScore(score);
                showcase.soundManager.playSound("point");
            }

            // Remove off-screen pipes
            if (pipes[i].x + pipeWidth < 0) {
                pipes.splice(i, 1);
            }
        }
    }

    function flap() {
        // ... (same as original, use showcase.soundManager)
        bird.velocity = bird.lift;
        showcase.soundManager.playSound("jump");
    }

    function endGame() {
        // ... (same as original, use showcase.soundManager)
        if (gameOver) return; // Prevent multiple calls
        gameOver = true;
        showcase.soundManager.playSound("gameOver");
        if (animationFrameId) cancelAnimationFrame(animationFrameId);
        animationFrameId = null;
        drawGameOver(); // Draw game over screen immediately
    }

    function gameLoop() {
        if (gameOver) return;
        ctx.fillStyle = "#87CEEB"; // Sky color
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        updateBird();
        updatePipes();
        drawPipes();
        drawBird();
        drawScore();
        frameCount++;
        animationFrameId = requestAnimFrame(gameLoop);
    }

    const handleInput = (e) => {
        if (gameOver) return;
        if (e.type === "keydown" && e.key !== " ") return; // Only spacebar for keydown
        if (e.type === "keydown") e.preventDefault(); // Prevent page scroll on space
        flap();
    };

    showcase.eventHandler.addManagedListener(document, "keydown", handleInput, "flappybird");
    showcase.eventHandler.addManagedListener(canvas, "mousedown", handleInput, "flappybird");
    showcase.eventHandler.addManagedListener(canvas, "touchstart", handleInput, { gameId: "flappybird", passive: true });


    animationFrameId = requestAnimFrame(gameLoop);

    return {
        cleanup: () => {
            if (animationFrameId) cancelAnimationFrame(animationFrameId);
            animationFrameId = null;
        },
    };
}