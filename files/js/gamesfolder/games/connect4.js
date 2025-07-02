// js/games/connect4.js
"use strict";
import { requestAnimFrame } from '../utils.js';

export function initConnect4Game(showcase, canvas) {
    if (!canvas) return null;
    const ctx = canvas.getContext("2d");
    const rows = 6;
    const cols = 7;
    const pieceRadius = (canvas.width / cols) * 0.4;
    const cellWidth = canvas.width / cols;
    const cellHeight = canvas.height / rows;
    let board = Array(rows).fill(null).map(() => Array(cols).fill(0));
    let currentPlayer = 1;
    let gameOver = false;
    let winner = 0;
    let dropColumn = -1;
    let dropY = 0;
    let dropTargetY = 0;
    let dropPlayer = 0;
    let isDropping = false;
    let animationFrameId;

    function drawBoard() { /* ... as in original ... */ 
        ctx.fillStyle = "#0033cc"; // Board color
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        for (let r = 0; r < rows; r++) {
            for (let c = 0; c < cols; c++) {
                ctx.beginPath();
                ctx.arc(c * cellWidth + cellWidth / 2, r * cellHeight + cellHeight / 2, pieceRadius, 0, Math.PI * 2);
                if (board[r][c] === 1) {
                    ctx.fillStyle = "#ff4757"; // Player 1 color
                } else if (board[r][c] === 2) {
                    ctx.fillStyle = "#f1c40f"; // Player 2 (AI) color
                } else {
                    ctx.fillStyle = "#1a1a2e"; // Empty cell color
                }
                ctx.fill();
            }
        }
    }
    function drawDroppingPiece() { /* ... as in original ... */ 
        if (!isDropping) return;
        ctx.beginPath();
        ctx.arc(dropColumn * cellWidth + cellWidth / 2, dropY, pieceRadius, 0, Math.PI * 2);
        ctx.fillStyle = (dropPlayer === 1) ? "#ff4757" : "#f1c40f";
        ctx.fill();
    }
    function drawUI() { /* ... as in original ... */ 
        if (gameOver) {
            ctx.fillStyle = "rgba(0, 0, 0, 0.7)";
            ctx.fillRect(0, canvas.height / 2 - 30, canvas.width, 60);
            ctx.font = "2.4vh var(--font-heading)";
            ctx.textAlign = "center";
            if (winner === 1) {
                ctx.fillStyle = "lime";
                ctx.fillText("YOU WIN!", canvas.width / 2, canvas.height / 2);
            } else if (winner === 2) {
                ctx.fillStyle = "red";
                ctx.fillText("AI WINS!", canvas.width / 2, canvas.height / 2);
            } else {
                ctx.fillStyle = "orange";
                ctx.fillText("IT'S A DRAW!", canvas.width / 2, canvas.height / 2);
            }
        } else {
            ctx.fillStyle = (currentPlayer === 1) ? "#ff4757" : "#f1c40f";
            ctx.font = "1.6vh var(--font-main)";
            ctx.textAlign = "center";
            ctx.fillText(`${(currentPlayer === 1) ? "Your" : "AI"} Turn`, canvas.width / 2, 20);
        }
    }
    function findEmptyRow(col) { /* ... as in original ... */ 
        for (let r = rows - 1; r >= 0; r--) {
            if (board[r][col] === 0) {
                return r;
            }
        }
        return -1;
    }

    function dropPiece(col, player) {
        // ... (same as original, use showcase.soundManager)
        const row = findEmptyRow(col);
        if (row !== -1 && !isDropping) {
            isDropping = true;
            dropColumn = col;
            dropPlayer = player;
            dropY = -pieceRadius; // Start above the board
            dropTargetY = row * cellHeight + cellHeight / 2;
            showcase.soundManager.playSound("click");
            return true; // Successfully started drop
        }
        return false; // Column full or already dropping
    }

    function checkWin(player) { /* ... as in original ... */ 
        // Horizontal
        for (let r = 0; r < rows; r++) {
            for (let c = 0; c <= cols - 4; c++) {
                if (board[r][c] === player && board[r][c+1] === player && board[r][c+2] === player && board[r][c+3] === player) return true;
            }
        }
        // Vertical
        for (let c = 0; c < cols; c++) {
            for (let r = 0; r <= rows - 4; r++) {
                if (board[r][c] === player && board[r+1][c] === player && board[r+2][c] === player && board[r+3][c] === player) return true;
            }
        }
        // Diagonal (down-right)
        for (let r = 0; r <= rows - 4; r++) {
            for (let c = 0; c <= cols - 4; c++) {
                if (board[r][c] === player && board[r+1][c+1] === player && board[r+2][c+2] === player && board[r+3][c+3] === player) return true;
            }
        }
        // Diagonal (up-right)
        for (let r = 3; r < rows; r++) {
            for (let c = 0; c <= cols - 4; c++) {
                if (board[r][c] === player && board[r-1][c+1] === player && board[r-2][c+2] === player && board[r-3][c+3] === player) return true;
            }
        }
        return false;
    }
    function checkDraw() { /* ... as in original ... */ 
        for (let c = 0; c < cols; c++) {
            if (board[0][c] === 0) return false; // If top row has empty cell, not a draw
        }
        return true;
    }

    function aiMove() {
        // ... (same as original)
        let validCols = [];
        for (let c = 0; c < cols; c++) {
            if (findEmptyRow(c) !== -1) {
                validCols.push(c);
            }
        }
        if (validCols.length > 0) {
            const randomCol = validCols[Math.floor(Math.random() * validCols.length)];
            dropPiece(randomCol, 2);
        }
    }

    function updateDropAnimation() {
        // ... (same as original, use showcase.soundManager)
        if (!isDropping) return;
        const dropSpeed = 15; // Adjust for desired speed
        dropY += dropSpeed;

        if (dropY >= dropTargetY) {
            dropY = dropTargetY; // Snap to final position
            const row = findEmptyRow(dropColumn); // Should be the target row
            if (row !== -1) { // Double check, though it should be valid
                 board[row][dropColumn] = dropPlayer;
            }
            isDropping = false;

            if (checkWin(dropPlayer)) {
                gameOver = true;
                winner = dropPlayer;
                showcase.soundManager.playSound(winner === 1 ? "win" : "gameOver");
            } else if (checkDraw()) {
                gameOver = true;
                winner = 0; // Draw
                showcase.soundManager.playSound("gameOver"); // Or a draw sound
            } else {
                currentPlayer = (dropPlayer === 1) ? 2 : 1;
                if (currentPlayer === 2) {
                    setTimeout(aiMove, 500); // AI moves after a short delay
                }
            }
        }
    }

    function gameLoop() {
        ctx.fillStyle = "#1a1a2e"; // Background
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        drawBoard();
        updateDropAnimation();
        drawDroppingPiece();
        drawUI();
        if (!gameOver) {
            animationFrameId = requestAnimFrame(gameLoop);
        }
    }

    const handleCanvasClick = (event) => {
        if (gameOver || currentPlayer !== 1 || isDropping) return;
        const rect = canvas.getBoundingClientRect();
        const scaleX = canvas.width / rect.width;
        const clickX = (event.clientX - rect.left) * scaleX;
        const col = Math.floor(clickX / cellWidth);

        if (col >= 0 && col < cols) {
            dropPiece(col, 1);
        }
    };

    showcase.eventHandler.addManagedListener(canvas, "click", handleCanvasClick, "connect4");
    animationFrameId = requestAnimFrame(gameLoop);

    return {
        cleanup: () => {
            if (animationFrameId) cancelAnimationFrame(animationFrameId);
            animationFrameId = null;
        },
    };
}