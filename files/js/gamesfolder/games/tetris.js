// js/games/tetris.js
"use strict";
import { requestAnimFrame } from '../utils.js';

export function initTetrisGame(showcase, canvas) {
    if (!canvas) return null;
    const ctx = canvas.getContext("2d");
    const scale = 30;
    const rows = canvas.height / scale;
    const cols = canvas.width / scale;
    const colors = [null, "#FF0D72", "#0DC2FF", "#0DFF72", "#F538FF", "#FF8E0D", "#FFE138", "#3877FF"];
    const pieces = "TJLOSZI";
    let board;
    let player;
    let dropCounter;
    let dropInterval;
    let lastTime;
    let score;
    let level;
    let linesCleared;
    let animationFrameId;
    let paused = false;

    function createMatrix(w, h) {
        const matrix = [];
        while (h--) {
            matrix.push(new Array(w).fill(0));
        }
        return matrix;
    }

    function createPiece(type) {
        // ... (same as original)
        switch (type) {
            case "T": return [[0, 1, 0], [1, 1, 1], [0, 0, 0]];
            case "J": return [[2, 0, 0], [2, 2, 2], [0, 0, 0]];
            case "L": return [[0, 0, 3], [3, 3, 3], [0, 0, 0]];
            case "O": return [[4, 4], [4, 4]];
            case "S": return [[0, 5, 5], [5, 5, 0], [0, 0, 0]];
            case "Z": return [[6, 6, 0], [0, 6, 6], [0, 0, 0]];
            case "I": return [[0, 0, 0, 0], [7, 7, 7, 7], [0, 0, 0, 0], [0, 0, 0, 0]];
        }
    }

    function drawMatrix(matrix, offset) {
        // ... (same as original)
        matrix.forEach((row, y) => {
            row.forEach((value, x) => {
                if (value !== 0) {
                    ctx.fillStyle = colors[value];
                    ctx.fillRect((x + offset.x) * scale, (y + offset.y) * scale, scale, scale);
                    ctx.strokeStyle = "rgba(0,0,0,0.3)";
                    ctx.strokeRect((x + offset.x) * scale, (y + offset.y) * scale, scale, scale);
                }
            });
        });
    }
    
    function drawGhostPiece() {
        const ghost = { ...player };
        ghost.matrix = player.matrix;
        ghost.pos = { x: player.pos.x, y: player.pos.y };
        while (!collide(board, ghost)) {
            ghost.pos.y++;
        }
        ghost.pos.y--;
        ctx.globalAlpha = 0.2;
        drawMatrix(ghost.matrix, ghost.pos);
        ctx.globalAlpha = 1.0;
    }


    function draw() {
        // ... (same as original, but add drawGhostPiece)
        ctx.fillStyle = "#111";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        drawMatrix(board, { x: 0, y: 0 });
        drawMatrix(player.matrix, player.pos);
        drawGhostPiece(); // Added
        ctx.fillStyle = "#fff";
        ctx.font = "1.6vh var(--font-main)";
        ctx.textAlign = "left";
        ctx.fillText(`Score: ${score}`, 10, 25);
        ctx.fillText(`Level: ${level}`, 10, 50);
        ctx.fillText(`Lines: ${linesCleared}`, 10, 75);
        if (paused) {
            ctx.fillStyle = "rgba(0, 0, 0, 0.75)";
            ctx.fillRect(0, canvas.height / 2 - 30, canvas.width, 60);
            ctx.font = "2.4vh var(--font-heading)";
            ctx.fillStyle = "var(--primary-color)";
            ctx.textAlign = "center";
            ctx.fillText("PAUSED", canvas.width / 2, canvas.height / 2);
        }
    }

    function merge(board, player) { /* ... as in original ... */ 
        player.matrix.forEach((row, y) => {
            row.forEach((value, x) => {
                if (value !== 0) {
                    if (y + player.pos.y >= 0 && y + player.pos.y < board.length &&
                        x + player.pos.x >= 0 && x + player.pos.x < board[0].length) {
                        board[y + player.pos.y][x + player.pos.x] = value;
                    }
                }
            });
        });
    }
    function rotate(matrix, dir) { /* ... as in original ... */ 
        for (let y = 0; y < matrix.length; ++y) {
            for (let x = 0; x < y; ++x) {
                [matrix[x][y], matrix[y][x]] = [matrix[y][x], matrix[x][y]];
            }
        }
        if (dir > 0) {
            matrix.forEach(row => row.reverse());
        } else {
            matrix.reverse();
        }
    }
    function playerRotate(dir) { /* ... as in original, use showcase.soundManager ... */ 
        const pos = player.pos.x;
        let offset = 1;
        rotate(player.matrix, dir);
        while (collide(board, player)) {
            player.pos.x += offset;
            offset = -(offset + (offset > 0 ? 1 : -1));
            if (offset > player.matrix[0].length + 1) {
                rotate(player.matrix, -dir);
                player.pos.x = pos;
                return;
            }
        }
        showcase.soundManager.playSound("click");
    }
    function playerMove(offset) { /* ... as in original ... */ 
        player.pos.x += offset;
        if (collide(board, player)) {
            player.pos.x -= offset;
        }
    }
    function playerDrop() { /* ... as in original, use showcase.soundManager ... */ 
        player.pos.y++;
        if (collide(board, player)) {
            player.pos.y--;
            merge(board, player);
            showcase.soundManager.playSound("hit");
            playerReset();
            arenaSweep();
            updateGameStats();
        }
        dropCounter = 0;
    }
    function playerHardDrop() { /* ... as in original, use showcase.soundManager ... */ 
        while (!collide(board, player)) {
            player.pos.y++;
        }
        player.pos.y--;
        merge(board, player);
        showcase.soundManager.playSound("hit");
        playerReset();
        arenaSweep();
        updateGameStats();
        dropCounter = 0;
    }
    function collide(board, player) { /* ... as in original ... */ 
        const [m, o] = [player.matrix, player.pos];
        for (let y = 0; y < m.length; ++y) {
            for (let x = 0; x < m[y].length; ++x) {
                if (m[y][x] !== 0) {
                    let boardY = y + o.y;
                    let boardX = x + o.x;
                    if (boardX < 0 || boardX >= cols || boardY >= rows ||
                        (boardY >= 0 && board[boardY] && board[boardY][boardX] !== 0)) {
                        return true;
                    }
                }
            }
        }
        return false;
    }
    function playerReset() { /* ... as in original ... */ 
        const type = pieces[Math.floor(Math.random() * pieces.length)];
        player.matrix = createPiece(type);
        player.pos.y = 0;
        player.pos.x = Math.floor(cols / 2) - Math.floor(player.matrix[0].length / 2);
        if (collide(board, player)) {
            gameOver();
        }
    }
    function arenaSweep() { /* ... as in original, use showcase.soundManager ... */ 
        let rowsClearedThisTurn = 0;
        outer: for (let y = board.length - 1; y >= 0; --y) {
            for (let x = 0; x < board[y].length; ++x) {
                if (board[y][x] === 0) {
                    continue outer;
                }
            }
            const row = board.splice(y, 1)[0].fill(0);
            board.unshift(row);
            ++y;
            rowsClearedThisTurn++;
        }
        if (rowsClearedThisTurn > 0) {
            const lineScores = [0, 100, 300, 500, 800];
            score += lineScores[rowsClearedThisTurn] * level;
            linesCleared += rowsClearedThisTurn;
            showcase.soundManager.playSound(rowsClearedThisTurn >= 4 ? "win" : "point");
            level = Math.floor(linesCleared / 10) + 1;
            dropInterval = Math.max(100, 1000 - (level - 1) * 75);
        }
    }
    function updateGameStats() { /* ... as in original, use showcase.updateScore ... */ 
        showcase.updateScore(score);
    }
    function gameOver() { /* ... as in original, use showcase.soundManager ... */ 
        cancelAnimationFrame(animationFrameId);
        animationFrameId = null;
        showcase.soundManager.playSound("gameOver");
        ctx.fillStyle = "rgba(0, 0, 0, 0.8)";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.font = "3vh var(--font-heading)";
        ctx.fillStyle = "red";
        ctx.textAlign = "center";
        ctx.fillText("GAME OVER", canvas.width / 2, canvas.height / 2 - 20);
        ctx.font = "1.8vh var(--font-main)";
        ctx.fillStyle = "white";
        ctx.fillText(`Final Score: ${score}`, canvas.width / 2, canvas.height / 2 + 20);
        ctx.fillText("Click Restart", canvas.width / 2, canvas.height / 2 + 50);
    }

    function update(time = 0) {
        if (paused || !animationFrameId) return;
        const deltaTime = time - lastTime;
        lastTime = time;
        dropCounter += deltaTime;
        if (dropCounter > dropInterval) {
            playerDrop();
        }
        draw();
        animationFrameId = requestAnimFrame(update);
    }

    function handleKeyDown(event) {
        if (!animationFrameId) return;
        if (event.key === "p" || event.key === "P") {
            paused = !paused;
            if (!paused) {
                lastTime = performance.now();
                update();
            }
            showcase.soundManager.playSound("ui");
            draw();
            return;
        }
        if (paused) return;
        switch (event.key) {
            case "ArrowLeft": case "a": playerMove(-1); break;
            case "ArrowRight": case "d": playerMove(1); break;
            case "ArrowDown": case "s": playerDrop(); break;
            case "ArrowUp": case "w": case "x": playerRotate(1); break;
            case "z": playerRotate(-1); break;
            case " ": playerHardDrop(); break;
        }
    }

    function startGame() {
        board = createMatrix(cols, rows);
        player = { pos: { x: 0, y: 0 }, matrix: null };
        score = 0;
        level = 1;
        linesCleared = 0;
        dropInterval = 1000;
        dropCounter = 0;
        lastTime = 0;
        paused = false;
        showcase.updateScore(score);
        playerReset();
        if (animationFrameId) cancelAnimationFrame(animationFrameId);
        animationFrameId = requestAnimFrame(update);
    }

    showcase.eventHandler.addManagedListener(document, "keydown", handleKeyDown, "tetris");
    startGame();

    return {
        cleanup: () => {
            if (animationFrameId) cancelAnimationFrame(animationFrameId);
            animationFrameId = null;
        },
        pause: () => { paused = true; showcase.soundManager.playSound("pause"); draw(); },
        resume: () => { paused = false; lastTime = performance.now(); update(); showcase.soundManager.playSound("unpause"); }
    };
}