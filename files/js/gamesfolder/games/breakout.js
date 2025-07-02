"use strict";
import { requestAnimFrame } from '../utils.js'; // Assuming utils.js is in parent dir

export function initBreakoutGame(showcase, canvas) {
    if (!canvas) return null;
    const ctx = canvas.getContext("2d");
    let animationFrameId;

    let score = 0;
    let lives = 3;
    const ball = { x: canvas.width / 2, y: canvas.height - 30, radius: 8, dx: 3, dy: -3, speed: 4 };
    const paddle = { x: (canvas.width - 80) / 2, y: canvas.height - 15, width: 80, height: 10, dx: 6 };
    const bricks = [];
    const brickInfo = { rows: 5, cols: 9, width: 55, height: 15, padding: 10, offsetTop: 40, offsetLeft: 30 };
    const colors = ["#e74c3c", "#e67e22", "#f1c40f", "#2ecc71", "#3498db"];
    let rightPressed = false;
    let leftPressed = false;

    function createBricks() {
        bricks.length = 0;
        for (let c = 0; c < brickInfo.cols; c++) {
            bricks[c] = [];
            for (let r = 0; r < brickInfo.rows; r++) {
                const brickX = c * (brickInfo.width + brickInfo.padding) + brickInfo.offsetLeft;
                const brickY = r * (brickInfo.height + brickInfo.padding) + brickInfo.offsetTop;
                bricks[c][r] = { x: brickX, y: brickY, status: 1, color: colors[r % colors.length] };
            }
        }
    }

    function drawBall() { /* ... as in original ... */ 
        ctx.beginPath();
        ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
        ctx.fillStyle = "#fff";
        ctx.fill();
        ctx.closePath();
    }
    function drawPaddle() { /* ... as in original ... */ 
        ctx.beginPath();
        ctx.rect(paddle.x, paddle.y, paddle.width, paddle.height);
        ctx.fillStyle = "var(--primary-color)";
        ctx.fill();
        ctx.closePath();
    }
    function drawBricks() { /* ... as in original ... */ 
        for (let c = 0; c < brickInfo.cols; c++) {
            for (let r = 0; r < brickInfo.rows; r++) {
                if (bricks[c][r].status === 1) {
                    const brick = bricks[c][r];
                    ctx.beginPath();
                    ctx.rect(brick.x, brick.y, brickInfo.width, brickInfo.height);
                    ctx.fillStyle = brick.color;
                    ctx.fill();
                    ctx.closePath();
                }
            }
        }
    }
    function drawScore() { /* ... as in original ... */ 
        ctx.font = "1.6vh var(--font-main)";
        ctx.fillStyle = "#fff";
        ctx.fillText(`Score: ${score}`, 8, 25);
    }
    function drawLives() { /* ... as in original ... */ 
        ctx.font = "1.6vh var(--font-main)";
        ctx.fillStyle = "#fff";
        ctx.fillText(`Lives: ${lives}`, canvas.width - 65, 25);
    }

    function collisionDetection() {
        for (let c = 0; c < brickInfo.cols; c++) {
            for (let r = 0; r < brickInfo.rows; r++) {
                const b = bricks[c][r];
                if (b.status === 1) {
                    if (ball.x > b.x && ball.x < b.x + brickInfo.width &&
                        ball.y > b.y && ball.y < b.y + brickInfo.height) {
                        ball.dy = -ball.dy;
                        b.status = 0;
                        score += 10;
                        showcase.updateScore(score); // Use showcase instance
                        showcase.soundManager.playSound("hit"); // Use showcase instance
                        if (score === brickInfo.rows * brickInfo.cols * 10) {
                            showcase.soundManager.playSound("win");
                            alert("YOU WIN! CONGRATULATIONS!");
                            cancelAnimationFrame(animationFrameId);
                            showcase.restartCurrentGame();
                        }
                        return;
                    }
                }
            }
        }
        if (ball.x + ball.dx > canvas.width - ball.radius || ball.x + ball.dx < ball.radius) {
            ball.dx = -ball.dx;
            showcase.soundManager.playSound("click");
        }
        if (ball.y + ball.dy < ball.radius) {
            ball.dy = -ball.dy;
            showcase.soundManager.playSound("click");
        } else if (ball.y + ball.dy > canvas.height - ball.radius - paddle.height + 5) {
            if (ball.x > paddle.x && ball.x < paddle.x + paddle.width) {
                ball.dy = -ball.dy;
                let deltaX = ball.x - (paddle.x + paddle.width / 2);
                ball.dx = deltaX * 0.15;
                ball.dx = Math.max(-ball.speed * 0.9, Math.min(ball.speed * 0.9, ball.dx));
                showcase.soundManager.playSound("click");
            } else if (ball.y + ball.dy > canvas.height - ball.radius) {
                lives--;
                showcase.soundManager.playSound("gameOver");
                if (!lives) {
                    alert("GAME OVER");
                    cancelAnimationFrame(animationFrameId);
                    showcase.restartCurrentGame();
                } else {
                    ball.x = canvas.width / 2;
                    ball.y = canvas.height - 30;
                    ball.dx = 3 * (Math.random() > 0.5 ? 1 : -1);
                    ball.dy = -3;
                    paddle.x = (canvas.width - paddle.width) / 2;
                }
            }
        }
    }

    function movePaddle() { /* ... as in original ... */ 
        if (rightPressed && paddle.x < canvas.width - paddle.width) {
            paddle.x += paddle.dx;
        } else if (leftPressed && paddle.x > 0) {
            paddle.x -= paddle.dx;
        }
    }
    function updateBallPosition() { /* ... as in original ... */ 
        ball.x += ball.dx;
        ball.y += ball.dy;
    }

    function gameLoop() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        drawBricks();
        drawBall();
        drawPaddle();
        drawScore();
        drawLives();
        collisionDetection();
        movePaddle();
        updateBallPosition();
        animationFrameId = requestAnimFrame(gameLoop);
    }

    const keyDownHandler = (e) => {
        if (e.key === "Right" || e.key === "ArrowRight") rightPressed = true;
        else if (e.key === "Left" || e.key === "ArrowLeft") leftPressed = true;
    };
    const keyUpHandler = (e) => {
        if (e.key === "Right" || e.key === "ArrowRight") rightPressed = false;
        else if (e.key === "Left" || e.key === "ArrowLeft") leftPressed = false;
    };
    const mouseMoveHandler = (e) => {
        const rect = canvas.getBoundingClientRect();
        const scaleX = canvas.width / rect.width;
        const relativeX = (e.clientX - rect.left) * scaleX;
        if (relativeX > 0 && relativeX < canvas.width) {
            paddle.x = relativeX - paddle.width / 2;
            paddle.x = Math.max(0, Math.min(canvas.width - paddle.width, paddle.x));
        }
    };

    showcase.eventHandler.addManagedListener(document, "keydown", keyDownHandler, "breakout");
    showcase.eventHandler.addManagedListener(document, "keyup", keyUpHandler, "breakout");
    showcase.eventHandler.addManagedListener(canvas, "mousemove", mouseMoveHandler, "breakout");

    createBricks();
    gameLoop();

    return {
        cleanup: () => {
            cancelAnimationFrame(animationFrameId);
            // Listeners are cleaned up by EventHandler based on gameId
        },
        // Optional: pause/resume if the game supports it
        // pause: () => { /* ... */ },
        // resume: () => { /* ... */ },
    };
}
