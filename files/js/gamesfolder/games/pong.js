// js/games/pong.js
"use strict";
import { requestAnimFrame } from '../utils.js';

export function initPongGame(showcase, canvas) {
    if (!canvas) return null;
    const ctx = canvas.getContext("2d");
    let animationFrameId;
    const paddleWidth = 10, paddleHeight = 100, ballRadius = 8;
    const playerSpeed = 6, aiSpeed = 4;
    let ball = { x: canvas.width / 2, y: canvas.height / 2, dx: 5, dy: 3, radius: ballRadius };
    let player1 = { x: 10, y: (canvas.height - paddleHeight) / 2, width: paddleWidth, height: paddleHeight, score: 0, dy: 0 };
    let player2 = { x: canvas.width - paddleWidth - 10, y: (canvas.height - paddleHeight) / 2, width: paddleWidth, height: paddleHeight, score: 0, dy: 0 };
    let keys = {};

    function drawRect(x, y, w, h, color) { /* ... as in original ... */ 
        ctx.fillStyle = color;
        ctx.fillRect(x, y, w, h);
    }
    function drawCircle(x, y, r, color) { /* ... as in original ... */ 
        ctx.fillStyle = color;
        ctx.beginPath();
        ctx.arc(x, y, r, 0, Math.PI * 2, false);
        ctx.closePath();
        ctx.fill();
    }
    function drawNet() { /* ... as in original ... */ 
        for (let i = 0; i < canvas.height; i += 25) {
            drawRect(canvas.width / 2 - 1, i, 2, 15, "rgba(255, 255, 255, 0.5)");
        }
    }
    function drawScores() { /* ... as in original ... */ 
        ctx.fillStyle = "#fff";
        ctx.font = "4vh var(--font-heading)";
        ctx.textAlign = "center";
        ctx.fillText(player1.score, canvas.width * 0.25, 50);
        ctx.fillText(player2.score, canvas.width * 0.75, 50);
    }
    function resetBall() { /* ... as in original ... */ 
        ball.x = canvas.width / 2;
        ball.y = canvas.height / 2;
        ball.dx = 5 * (Math.random() > 0.5 ? 1 : -1);
        ball.dy = Math.random() * 6 - 3;
        if (Math.abs(ball.dy) < 1) ball.dy = ball.dy < 0 ? -1 : 1;
    }

    function update() {
        // ... (same as original, use showcase.soundManager)
        if (keys["w"] || keys["W"]) player1.y -= playerSpeed;
        if (keys["s"] || keys["S"]) player1.y += playerSpeed;
        
        // Simple AI for player 2 (right paddle)
        // const targetY = ball.y - player2.height / 2; // Original AI
        if (player2.y + player2.height / 2 < ball.y - 10) { // A bit of delay/error
            player2.y += aiSpeed;
        } else if (player2.y + player2.height / 2 > ball.y + 10) {
            player2.y -= aiSpeed;
        }

        player1.y = Math.max(0, Math.min(canvas.height - player1.height, player1.y));
        player2.y = Math.max(0, Math.min(canvas.height - player2.height, player2.y));

        ball.x += ball.dx;
        ball.y += ball.dy;

        if (ball.y - ball.radius < 0 || ball.y + ball.radius > canvas.height) {
            ball.dy = -ball.dy;
            showcase.soundManager.playSound("click");
        }

        let player = (ball.x < canvas.width / 2) ? player1 : player2;
        if (ball.x - ball.radius < player.x + player.width &&
            ball.x + ball.radius > player.x &&
            ball.y + ball.radius > player.y &&
            ball.y - ball.radius < player.y + player.height) {
            ball.dx = -ball.dx;
            let collidePoint = ball.y - (player.y + player.height / 2);
            collidePoint = collidePoint / (player.height / 2);
            let angleRad = collidePoint * (Math.PI / 4);
            let direction = (ball.x < canvas.width / 2) ? 1 : -1;
            let speed = Math.sqrt(ball.dx * ball.dx + ball.dy * ball.dy); // Maintain speed
            ball.dx = direction * speed * Math.cos(angleRad);
            ball.dy = speed * Math.sin(angleRad);
            showcase.soundManager.playSound("hit");
        }

        if (ball.x - ball.radius < 0) {
            player2.score++;
            showcase.soundManager.playSound("point");
            resetBall();
        } else if (ball.x + ball.radius > canvas.width) {
            player1.score++;
            showcase.soundManager.playSound("point");
            resetBall();
        }
    }

    function render() { /* ... as in original ... */ 
        drawRect(0, 0, canvas.width, canvas.height, "#1a1a2e");
        drawNet();
        drawRect(player1.x, player1.y, player1.width, player1.height, "var(--primary-color)");
        drawRect(player2.x, player2.y, player2.width, player2.height, "var(--accent-color)");
        drawCircle(ball.x, ball.y, ball.radius, "#fff");
        drawScores();
    }

    function gameLoop() {
        update();
        render();
        animationFrameId = requestAnimFrame(gameLoop);
    }

    const handleKeyDown = (e) => { keys[e.key] = true; };
    const handleKeyUp = (e) => { keys[e.key] = false; };

    showcase.eventHandler.addManagedListener(document, "keydown", handleKeyDown, "pong");
    showcase.eventHandler.addManagedListener(document, "keyup", handleKeyUp, "pong");

    resetBall();
    animationFrameId = requestAnimFrame(gameLoop);

    return {
        cleanup: () => {
            if (animationFrameId) cancelAnimationFrame(animationFrameId);
            animationFrameId = null;
        },
    };
}