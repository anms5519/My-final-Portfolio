// js/games/snake.js
"use strict";
// No requestAnimFrame needed here as it uses setInterval

export function initSnakeGame(showcase, canvas) {
    if (!canvas) return null;
    const ctx = canvas.getContext("2d");
    const box = 20;
    const canvasSize = canvas.width;
    const boxesCount = canvasSize / box;
    let score = 0;
    let snake;
    let food;
    let direction;
    let changingDirection;
    let gameInterval;
    let gameSpeed = 120;

    function initGame() {
        snake = [{ x: Math.floor(boxesCount / 2) * box, y: Math.floor(boxesCount / 2) * box }];
        createFood();
        score = 0;
        showcase.updateScore(score);
        direction = undefined;
        changingDirection = false;
    }

    function createFood() {
        let foodX, foodY;
        do {
            foodX = Math.floor(Math.random() * boxesCount) * box;
            foodY = Math.floor(Math.random() * boxesCount) * box;
        } while (snake.some(segment => segment.x === foodX && segment.y === foodY));
        food = { x: foodX, y: foodY };
    }

    function drawSnakePart(snakePart, index) {
        ctx.fillStyle = index === 0 ? "#32ff7e" : "#2ecc71";
        ctx.strokeStyle = "#1b1b1b";
        ctx.fillRect(snakePart.x, snakePart.y, box, box);
        ctx.strokeRect(snakePart.x, snakePart.y, box, box);
    }

    function drawSnake() {
        snake.forEach(drawSnakePart);
    }

    function drawFood() {
        ctx.fillStyle = "#ff4757";
        ctx.strokeStyle = "#darkred";
        ctx.fillRect(food.x, food.y, box, box);
        ctx.strokeRect(food.x, food.y, box, box);
    }

    function drawScore() {
        ctx.fillStyle = "#fff";
        ctx.font = "1.8vh var(--font-main)";
        ctx.textAlign = "left";
        ctx.fillText("Score: " + score, box, box);
    }

    function moveSnake() {
        if (!direction) return;
        let headX = snake[0].x;
        let headY = snake[0].y;
        if (direction === "LEFT") headX -= box;
        if (direction === "UP") headY -= box;
        if (direction === "RIGHT") headX += box;
        if (direction === "DOWN") headY += box;
        const newHead = { x: headX, y: headY };

        if (headX < 0 || headX >= canvasSize || headY < 0 || headY >= canvasSize || didCollide(newHead)) {
            gameOver();
            return;
        }
        snake.unshift(newHead);
        if (headX === food.x && headY === food.y) {
            score += 10;
            showcase.updateScore(score);
            showcase.soundManager.playSound("point");
            createFood();
        } else {
            snake.pop();
        }
        changingDirection = false;
    }

    function didCollide(head) {
        for (let i = 1; i < snake.length; i++) {
            if (head.x === snake[i].x && head.y === snake[i].y) {
                return true;
            }
        }
        return false;
    }

    function changeDirection(event) {
        if (changingDirection) return;
        const keyPressed = event.key;
        const goingUp = direction === "UP";
        const goingDown = direction === "DOWN";
        const goingRight = direction === "RIGHT";
        const goingLeft = direction === "LEFT";

        if ((keyPressed === "ArrowLeft" || keyPressed.toLowerCase() === "a") && !goingRight) {
            direction = "LEFT"; changingDirection = true;
        }
        if ((keyPressed === "ArrowUp" || keyPressed.toLowerCase() === "w") && !goingDown) {
            direction = "UP"; changingDirection = true;
        }
        if ((keyPressed === "ArrowRight" || keyPressed.toLowerCase() === "d") && !goingLeft) {
            direction = "RIGHT"; changingDirection = true;
        }
        if ((keyPressed === "ArrowDown" || keyPressed.toLowerCase() === "s") && !goingUp) {
            direction = "DOWN"; changingDirection = true;
        }
    }

    function gameOver() {
        clearInterval(gameInterval);
        gameInterval = null;
        showcase.soundManager.playSound("gameOver");
        ctx.fillStyle = "rgba(0, 0, 0, 0.7)";
        ctx.fillRect(0, 0, canvasSize, canvasSize);
        ctx.font = "4vh var(--font-heading)";
        ctx.fillStyle = "red";
        ctx.textAlign = "center";
        ctx.fillText("GAME OVER", canvasSize / 2, canvasSize / 2 - 20);
        ctx.font = "2vh var(--font-main)";
        ctx.fillStyle = "white";
        ctx.fillText(`Final Score: ${score}`, canvasSize / 2, canvasSize / 2 + 20);
        ctx.fillText("Click Restart to Play Again", canvasSize / 2, canvasSize / 2 + 50);
    }

    function gameLoop() {
        ctx.fillStyle = "#1a1a2e";
        ctx.fillRect(0, 0, canvasSize, canvasSize);
        moveSnake();
        if (gameInterval) { // Check if game is still running
            drawFood();
            drawSnake();
            drawScore();
        }
    }

    showcase.eventHandler.addManagedListener(document, "keydown", changeDirection, "snake");
    initGame();
    gameInterval = setInterval(gameLoop, gameSpeed);

    return {
        cleanup: () => {
            if (gameInterval) clearInterval(gameInterval);
            gameInterval = null;
        },
    };
}