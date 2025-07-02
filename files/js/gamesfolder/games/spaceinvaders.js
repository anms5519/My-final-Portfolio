// js/games/spaceinvaders.js
"use strict";
import { requestAnimFrame } from '../utils.js';

export function initSpaceInvadersGame(showcase, canvas) {
    if (!canvas) return null;
    const ctx = canvas.getContext("2d");
    let animationFrameId;
    const player = { x: canvas.width / 2 - 25, y: canvas.height - 60, width: 50, height: 30, speed: 5, color: "#2ecc71", lives: 3 };
    const bullets = [];
    const invaders = [];
    const invaderBullets = [];
    const invaderInfo = { rows: 4, cols: 8, width: 30, height: 20, padding: 15, speed: 0.5, drop: 20, fireRate: 0.01 };
    let invaderDirection = 1;
    let score = 0;
    let gameOver = false;
    let gameWon = false;

    function createInvaders() { /* ... as in original ... */ 
        invaders.length = 0;
        const startX = (canvas.width - (invaderInfo.cols * (invaderInfo.width + invaderInfo.padding) - invaderInfo.padding)) / 2;
        const startY = 50;
        const colors = ["#e74c3c", "#e74c3c", "#f1c40f", "#f1c40f"];
        for (let r = 0; r < invaderInfo.rows; r++) {
            for (let c = 0; c < invaderInfo.cols; c++) {
                invaders.push({
                    x: startX + c * (invaderInfo.width + invaderInfo.padding),
                    y: startY + r * (invaderInfo.height + invaderInfo.padding + 5),
                    width: invaderInfo.width, height: invaderInfo.height,
                    color: colors[r % colors.length], alive: true
                });
            }
        }
    }
    function drawPlayer() { /* ... as in original ... */ 
        ctx.fillStyle = player.color;
        ctx.beginPath();
        ctx.moveTo(player.x + player.width / 2, player.y);
        ctx.lineTo(player.x, player.y + player.height);
        ctx.lineTo(player.x + player.width, player.y + player.height);
        ctx.closePath();
        ctx.fill();
    }
    function drawBullets() { /* ... as in original ... */ 
        ctx.fillStyle = "#00ffff";
        bullets.forEach(bullet => { ctx.fillRect(bullet.x - 2, bullet.y, 4, 10); });
        ctx.fillStyle = "#ff4757";
        invaderBullets.forEach(bullet => { ctx.fillRect(bullet.x - 2, bullet.y, 4, 8); });
    }
    function drawInvaders() { /* ... as in original ... */ 
        invaders.forEach(invader => {
            if (invader.alive) {
                ctx.fillStyle = invader.color;
                ctx.fillRect(invader.x, invader.y, invader.width, invader.height);
                ctx.fillStyle = "black"; // Eyes
                ctx.fillRect(invader.x + invader.width * 0.2, invader.y + invader.height * 0.3, 4, 4);
                ctx.fillRect(invader.x + invader.width * 0.6, invader.y + invader.height * 0.3, 4, 4);
            }
        });
    }
    function drawUI() { /* ... as in original ... */ 
        ctx.fillStyle = "#fff";
        ctx.font = "1.6vh var(--font-main)";
        ctx.textAlign = "left";
        ctx.fillText(`Score: ${score}`, 10, 25);
        ctx.textAlign = "right";
        ctx.fillText(`Lives: ${player.lives}`, canvas.width - 10, 25);

        if (gameOver) {
            ctx.fillStyle = "rgba(0, 0, 0, 0.7)";
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            ctx.font = "4vh var(--font-heading)"; ctx.fillStyle = "red"; ctx.textAlign = "center";
            ctx.fillText("GAME OVER", canvas.width / 2, canvas.height / 2 - 20);
            ctx.font = "2vh var(--font-main)"; ctx.fillStyle = "white";
            ctx.fillText(`Final Score: ${score}`, canvas.width / 2, canvas.height / 2 + 20);
            ctx.fillText("Click Restart", canvas.width / 2, canvas.height / 2 + 50);
        } else if (gameWon) {
            ctx.fillStyle = "rgba(0, 0, 0, 0.7)";
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            ctx.font = "4vh var(--font-heading)"; ctx.fillStyle = "lime"; ctx.textAlign = "center";
            ctx.fillText("YOU WIN!", canvas.width / 2, canvas.height / 2 - 20);
            ctx.font = "2vh var(--font-main)"; ctx.fillStyle = "white";
            ctx.fillText(`Final Score: ${score}`, canvas.width / 2, canvas.height / 2 + 20);
            ctx.fillText("Click Restart", canvas.width / 2, canvas.height / 2 + 50);
        }
    }
    function movePlayer(dx) { /* ... as in original ... */ 
        player.x += dx;
        player.x = Math.max(0, Math.min(canvas.width - player.width, player.x));
    }
    function shoot() { /* ... as in original, use showcase.soundManager ... */ 
        if (bullets.length < 3) { // Limit bullets on screen
            bullets.push({ x: player.x + player.width / 2, y: player.y, speed: 7 });
            showcase.soundManager.playSound("shoot");
        }
    }

    function updateBullets() {
        // ... (same as original, use showcase.soundManager and showcase.updateScore)
        for (let i = bullets.length - 1; i >= 0; i--) {
            bullets[i].y -= bullets[i].speed;
            if (bullets[i].y < 0) {
                bullets.splice(i, 1);
            } else {
                for (let j = invaders.length - 1; j >= 0; j--) {
                    const invader = invaders[j];
                    if (invader.alive &&
                        bullets[i].x > invader.x && bullets[i].x < invader.x + invader.width &&
                        bullets[i].y > invader.y && bullets[i].y < invader.y + invader.height) {
                        invader.alive = false;
                        bullets.splice(i, 1);
                        score += 100;
                        showcase.updateScore(score);
                        showcase.soundManager.playSound("explosion");
                        if (invaders.every(inv => !inv.alive)) {
                            gameWon = true;
                            showcase.soundManager.playSound("win");
                        }
                        break; 
                    }
                }
            }
        }
        for (let i = invaderBullets.length - 1; i >= 0; i--) {
            invaderBullets[i].y += invaderBullets[i].speed;
            if (invaderBullets[i].y > canvas.height) {
                invaderBullets.splice(i, 1);
            } else {
                if (invaderBullets[i].x > player.x && invaderBullets[i].x < player.x + player.width &&
                    invaderBullets[i].y > player.y && invaderBullets[i].y < player.y + player.height) {
                    invaderBullets.splice(i, 1);
                    player.lives--;
                    showcase.soundManager.playSound("hit");
                    if (player.lives <= 0) {
                        gameOver = true;
                        showcase.soundManager.playSound("gameOver");
                    }
                    break;
                }
            }
        }
    }

    function updateInvaders() {
        // ... (same as original, use showcase.soundManager)
        let moveDown = false;
        let furthestLeft = canvas.width;
        let furthestRight = 0;

        invaders.forEach(invader => {
            if (invader.alive) {
                invader.x += invaderInfo.speed * invaderDirection;
                furthestLeft = Math.min(furthestLeft, invader.x);
                furthestRight = Math.max(furthestRight, invader.x + invader.width);

                if (invader.y + invader.height >= player.y) { // Invaders reached player
                    gameOver = true;
                    showcase.soundManager.playSound("gameOver");
                }
                // Invader firing logic
                if (Math.random() < invaderInfo.fireRate / invaders.filter(inv => inv.alive).length) { // Fire rate depends on remaining invaders
                    invaderBullets.push({ x: invader.x + invader.width / 2, y: invader.y + invader.height, speed: 4 });
                }
            }
        });

        if (furthestRight > canvas.width || furthestLeft < 0) {
            invaderDirection *= -1;
            moveDown = true;
            invaderInfo.speed *= 1.05; // Increase speed slightly
        }

        if (moveDown) {
            invaders.forEach(invader => {
                if (invader.alive) {
                    invader.y += invaderInfo.drop;
                }
            });
        }
    }

    let leftPressed = false;
    let rightPressed = false;

    function gameLoop() {
        if (gameOver || gameWon) {
            drawUI(); // Keep drawing UI if game ended
            return;
        }
        if (leftPressed) movePlayer(-player.speed);
        if (rightPressed) movePlayer(player.speed);

        updateInvaders();
        updateBullets();

        ctx.fillStyle = "#111";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        drawPlayer();
        drawInvaders();
        drawBullets();
        drawUI();
        animationFrameId = requestAnimFrame(gameLoop);
    }

    const handleKeyDown = (e) => {
        if (e.key === "ArrowLeft" || e.key.toLowerCase() === "a") leftPressed = true;
        if (e.key === "ArrowRight" || e.key.toLowerCase() === "d") rightPressed = true;
        if (e.key === " " || e.key === "ArrowUp" || e.key.toLowerCase() === "w") shoot();
    };
    const handleKeyUp = (e) => {
        if (e.key === "ArrowLeft" || e.key.toLowerCase() === "a") leftPressed = false;
        if (e.key === "ArrowRight" || e.key.toLowerCase() === "d") rightPressed = false;
    };

    showcase.eventHandler.addManagedListener(document, "keydown", handleKeyDown, "spaceinvaders");
    showcase.eventHandler.addManagedListener(document, "keyup", handleKeyUp, "spaceinvaders");

    createInvaders();
    animationFrameId = requestAnimFrame(gameLoop);

    return {
        cleanup: () => {
            if (animationFrameId) cancelAnimationFrame(animationFrameId);
            animationFrameId = null;
        },
    };
}