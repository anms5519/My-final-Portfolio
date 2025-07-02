// js/games/pacman.js
"use strict";
import { requestAnimFrame } from '../utils.js';

export function initPacmanGame(showcase, canvas) {
    if (!canvas) return null;
    const ctx = canvas.getContext("2d");
    let animationFrameId;
    const scale = 16;
    const map = [ /* ... (map data as in original) ... */ 
        "1111111111111111111111111111",
        "1222222222222112222222222221",
        "1211112111112112111112111121",
        "1311112111112112111112111131",
        "1211112111112112111112111121",
        "1222222222222222222222222221",
        "1211112112111111121121111121",
        "1211112112111111121121111121",
        "1222222112222112222112222221",
        "1111112111110110111112111111",
        "0000012111110110111112100000",
        "0000012110000440000112100000",
        "0000012110111441110112100000",
        "1111112110100000010112111111",
        "0000002000100000010002000000", 
        "1111112110111111110112111111",
        "0000012110100000010112100000",
        "0000012110111111110112100000",
        "0000012110000000000112100000",
        "1111112110111111110112111111",
        "1222222222222112222222222221",
        "1211112111112112111112111121",
        "1211112111112112111112111121",
        "132211222222200222222112231", 
        "111211211211111112112112111",
        "111211211211111112112112111",
        "1222222112222112222112222221",
        "1211111111112112111111111121",
        "1211111111112112111111111121",
        "1222222222222222222222222221",
        "1111111111111111111111111111",
    ];
    const cols = map[0].length;
    const rows = map.length;
    canvas.width = cols * scale;
    canvas.height = rows * scale;
    let player = { x: 14, y: 23, dx: 0, dy: 0, nextDx: 0, nextDy: 0, radius: scale * 0.4, speed: 2, mouthOpen: 0 };
    let ghosts = [];
    let score = 0;
    let dotsLeft = 0;
    let frightenedTimer = 0;
    let gameOver = false;
    let gameWon = false;
    let level = 1; // Not used in original, but good for extension

    function getTile(x, y) { /* ... as in original ... */ 
        const col = Math.floor(x / scale);
        const row = Math.floor(y / scale);
        if (row >= 0 && row < rows && col >= 0 && col < cols) {
            return map[row][col];
        }
        return "1"; // Treat out of bounds as wall
    }
    // function getTileCoords(col, row) { /* ... as in original ... */ } // Not strictly needed if getTile is used
    function isWall(x, y) { /* ... as in original ... */ 
        return getTile(x, y) === "1";
    }

    function initLevel() {
        // ... (same as original)
        dotsLeft = 0;
        map.forEach((rowStr, r) => {
            for (let c = 0; c < rowStr.length; c++) {
                if (rowStr[c] === "2" || rowStr[c] === "3") {
                    dotsLeft++;
                }
            }
        });
        player.x = 14 * scale + scale / 2;
        player.y = 23 * scale + scale / 2;
        player.dx = 0; player.dy = 0; player.nextDx = 0; player.nextDy = 0;
        ghosts = [
            { x: 13.5 * scale, y: 11.5 * scale, dx: 1, dy: 0, color: "red", state: "scatter", id: 0 },
            { x: 14.5 * scale, y: 13.5 * scale, dx: -1, dy: 0, color: "pink", state: "scatter", id: 1 },
            { x: 12.5 * scale, y: 13.5 * scale, dx: 1, dy: 0, color: "cyan", state: "scatter", id: 2 },
            { x: 15.5 * scale, y: 13.5 * scale, dx: -1, dy: 0, color: "orange", state: "scatter", id: 3 },
        ];
        frightenedTimer = 0;
        gameOver = false;
        gameWon = false;
    }

    function drawMap() { /* ... as in original ... */ 
        for (let r = 0; r < rows; r++) {
            for (let c = 0; c < cols; c++) {
                const tile = map[r][c];
                const x = c * scale;
                const y = r * scale;
                if (tile === "1") {
                    ctx.fillStyle = "#0033cc"; // Wall color
                    ctx.fillRect(x, y, scale, scale);
                } else if (tile === "2") { // Dot
                    ctx.fillStyle = "yellow";
                    ctx.fillRect(x + scale * 0.4, y + scale * 0.4, scale * 0.2, scale * 0.2);
                } else if (tile === "3") { // Power pellet
                    ctx.fillStyle = "orange";
                    ctx.beginPath();
                    ctx.arc(x + scale / 2, y + scale / 2, scale * 0.3, 0, Math.PI * 2);
                    ctx.fill();
                }
            }
        }
    }
    function drawPlayer() { /* ... as in original ... */ 
        ctx.fillStyle = "yellow";
        ctx.beginPath();
        let angleOffset = 0;
        if (player.dx > 0) angleOffset = 0;
        else if (player.dx < 0) angleOffset = Math.PI;
        else if (player.dy > 0) angleOffset = Math.PI / 2;
        else if (player.dy < 0) angleOffset = -Math.PI / 2;

        const mouthAngle = (Math.sin(player.mouthOpen * Math.PI / 10) + 1) * 0.2 * Math.PI; // Animate mouth
        ctx.arc(player.x, player.y, player.radius, angleOffset + mouthAngle / 2, angleOffset - mouthAngle / 2 + Math.PI * 2);
        ctx.lineTo(player.x, player.y); // Close the arc to form a Pac-Man shape
        ctx.fill();
        player.mouthOpen = (player.mouthOpen + 1) % 20; // Cycle mouth animation
    }
    function drawGhosts() { /* ... as in original ... */ 
        ghosts.forEach(ghost => {
            ctx.fillStyle = ghost.state === "frightened" ? "#aaa" : ghost.color;
            ctx.beginPath();
            ctx.arc(ghost.x, ghost.y, scale * 0.45, Math.PI, 0); // Semi-circle top
            ctx.lineTo(ghost.x + scale * 0.45, ghost.y + scale * 0.4); // Bottom right
            ctx.lineTo(ghost.x + scale * 0.15, ghost.y + scale * 0.3); // Jagged bottom
            ctx.lineTo(ghost.x - scale * 0.15, ghost.y + scale * 0.4); // Jagged bottom
            ctx.lineTo(ghost.x - scale * 0.45, ghost.y + scale * 0.3); // Bottom left
            ctx.closePath();
            ctx.fill();

            // Eyes
            ctx.fillStyle = "white";
            ctx.beginPath();
            ctx.arc(ghost.x - scale * 0.15, ghost.y - scale * 0.1, scale * 0.1, 0, Math.PI * 2); // Left eye
            ctx.arc(ghost.x + scale * 0.15, ghost.y - scale * 0.1, scale * 0.1, 0, Math.PI * 2); // Right eye
            ctx.fill();
        });
    }
    function drawUI() { /* ... as in original ... */ 
        ctx.fillStyle = "#fff";
        ctx.font = "1.6vh var(--font-main)";
        ctx.textAlign = "left";
        ctx.fillText(`Score: ${score}`, 10, scale - 4); // Adjusted for canvas size
        ctx.textAlign = "right";
        // ctx.fillText(`Lives: ${player.lives}`, canvas.width - 10, scale - 4); // If lives are implemented

        if (gameOver) {
            ctx.fillStyle = "rgba(0, 0, 0, 0.7)";
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            ctx.font = "3vh var(--font-heading)"; ctx.fillStyle = "red"; ctx.textAlign = "center";
            ctx.fillText("GAME OVER", canvas.width / 2, canvas.height / 2 - 20);
            ctx.font = "1.8vh var(--font-main)"; ctx.fillStyle = "white";
            ctx.fillText(`Final Score: ${score}`, canvas.width / 2, canvas.height / 2 + 20);
            ctx.fillText("Click Restart", canvas.width / 2, canvas.height / 2 + 50);
        } else if (gameWon) {
            ctx.fillStyle = "rgba(0, 0, 0, 0.7)";
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            ctx.font = "3vh var(--font-heading)"; ctx.fillStyle = "lime"; ctx.textAlign = "center";
            ctx.fillText("YOU WIN!", canvas.width / 2, canvas.height / 2 - 20);
            ctx.font = "1.8vh var(--font-main)"; ctx.fillStyle = "white";
            ctx.fillText(`Final Score: ${score}`, canvas.width / 2, canvas.height / 2 + 20);
            ctx.fillText("Click Restart", canvas.width / 2, canvas.height / 2 + 50);
        }
    }

    function updatePlayer() {
        // ... (same as original, use showcase.soundManager and showcase.updateScore)
        const currentTileCol = Math.floor(player.x / scale);
        const currentTileRow = Math.floor(player.y / scale);
        const xOffset = player.x % scale;
        const yOffset = player.y % scale;
        const tolerance = player.speed * 1.1; // Allow turning slightly before center

        // Check if ready to turn
        const canTurn = (xOffset > scale / 2 - tolerance && xOffset < scale / 2 + tolerance &&
                         yOffset > scale / 2 - tolerance && yOffset < scale / 2 + tolerance);

        if (canTurn && (player.nextDx !== 0 || player.nextDy !== 0)) {
            const nextTileX = player.x + player.nextDx * scale;
            const nextTileY = player.y + player.nextDy * scale;
            if (!isWall(nextTileX, nextTileY)) {
                player.dx = player.nextDx;
                player.dy = player.nextDy;
                player.nextDx = 0;
                player.nextDy = 0;
                // Snap to grid center for smoother turns
                player.x = currentTileCol * scale + scale / 2;
                player.y = currentTileRow * scale + scale / 2;
            }
        }

        const nextX = player.x + player.dx * player.speed;
        const nextY = player.y + player.dy * player.speed;
        const nextTileCol = Math.floor(nextX / scale);
        const nextTileRow = Math.floor(nextY / scale);

        // Wall collision
        if (isWall(nextX + Math.sign(player.dx) * player.radius, nextY + Math.sign(player.dy) * player.radius)) {
            player.dx = 0;
            player.dy = 0;
            // Adjust position to be just outside the wall if stuck
            if (player.dx > 0) player.x = nextTileCol * scale - player.radius;
            else if (player.dx < 0) player.x = (currentTileCol + 1) * scale + player.radius;
            if (player.dy > 0) player.y = nextTileRow * scale - player.radius;
            else if (player.dy < 0) player.y = (currentTileRow + 1) * scale + player.radius;
        } else {
            player.x = nextX;
            player.y = nextY;
        }

        // Tunneling
        if (player.x < -player.radius) player.x = canvas.width + player.radius;
        else if (player.x > canvas.width + player.radius) player.x = -player.radius;

        // Eating dots/pellets
        const playerCol = Math.floor(player.x / scale);
        const playerRow = Math.floor(player.y / scale);
        if (playerCol >= 0 && playerCol < cols && playerRow >= 0 && playerRow < rows) {
            const tileChar = map[playerRow][playerCol];
            if (tileChar === '2') { // Dot
                map[playerRow] = map[playerRow].substring(0, playerCol) + "0" + map[playerRow].substring(playerCol + 1);
                score += 10;
                dotsLeft--;
                showcase.updateScore(score);
                showcase.soundManager.playSound("click"); // Simple sound for dot
            } else if (tileChar === '3') { // Power pellet
                map[playerRow] = map[playerRow].substring(0, playerCol) + "0" + map[playerRow].substring(playerCol + 1);
                score += 50;
                dotsLeft--;
                showcase.updateScore(score);
                showcase.soundManager.playSound("powerup");
                frightenedTimer = 360; // 6 seconds at 60fps
                ghosts.forEach(g => { if (g.state !== "eaten") g.state = "frightened"; });
            }
        }

        if (dotsLeft <= 0) {
            gameWon = true;
            showcase.soundManager.playSound("win");
        }
    }

    function updateGhosts() {
        // ... (same as original, use showcase.soundManager)
        if (frightenedTimer > 0) {
            frightenedTimer--;
            if (frightenedTimer === 0) {
                ghosts.forEach(g => { if (g.state === "frightened") g.state = "scatter"; }); // Or chase
            }
        }

        ghosts.forEach(ghost => {
            const currentTileCol = Math.floor(ghost.x / scale);
            const currentTileRow = Math.floor(ghost.y / scale);
            const xOffset = ghost.x % scale;
            const yOffset = ghost.y % scale;
            const tolerance = 1.5; // Ghost speed
            const atIntersection = (xOffset > scale / 2 - tolerance && xOffset < scale / 2 + tolerance &&
                                    yOffset > scale / 2 - tolerance && yOffset < scale / 2 + tolerance);

            let possibleMoves = [];
            if (atIntersection) {
                // Check available moves (not reversing direction unless at dead end)
                if (!isWall(ghost.x, ghost.y - scale) && ghost.dy <= 0) possibleMoves.push({ dx: 0, dy: -1 }); // Up
                if (!isWall(ghost.x, ghost.y + scale) && ghost.dy >= 0) possibleMoves.push({ dx: 0, dy: 1 }); // Down
                if (!isWall(ghost.x - scale, ghost.y) && ghost.dx <= 0) possibleMoves.push({ dx: -1, dy: 0 }); // Left
                if (!isWall(ghost.x + scale, ghost.y) && ghost.dx >= 0) possibleMoves.push({ dx: 1, dy: 0 }); // Right
                
                if (possibleMoves.length > 0) {
                    // Basic random movement for now, can be improved with AI
                    const move = possibleMoves[Math.floor(Math.random() * possibleMoves.length)];
                    ghost.dx = move.dx;
                    ghost.dy = move.dy;
                    // Snap to grid
                    ghost.x = currentTileCol * scale + scale / 2;
                    ghost.y = currentTileRow * scale + scale / 2;
                } else { // Dead end, reverse
                    ghost.dx *= -1;
                    ghost.dy *= -1;
                }
            }

            const ghostSpeed = ghost.state === "frightened" ? 0.8 : 1.2; // Slower when frightened
            const nextX = ghost.x + ghost.dx * ghostSpeed;
            const nextY = ghost.y + ghost.dy * ghostSpeed;

            // Wall collision for ghosts
            if (isWall(nextX + Math.sign(ghost.dx) * scale * 0.4, nextY + Math.sign(ghost.dy) * scale * 0.4)) {
                if (!atIntersection) { // If not at intersection, just stop
                    ghost.x = nextX; // Allow sliding along wall
                    ghost.y = nextY;
                } else { // If at intersection and hit wall, reverse (should be handled by new move choice)
                    ghost.dx *= -1;
                    ghost.dy *= -1;
                }
            } else {
                ghost.x = nextX;
                ghost.y = nextY;
            }

            // Tunneling for ghosts
            if (ghost.x < -scale / 2) ghost.x = canvas.width + scale / 2;
            else if (ghost.x > canvas.width + scale / 2) ghost.x = -scale / 2;

            // Collision with Pac-Man
            const dx = player.x - ghost.x;
            const dy = player.y - ghost.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            if (distance < player.radius + scale * 0.45) { // Collision radius
                if (ghost.state === "frightened") {
                    score += 200; // Points for eating ghost
                    showcase.updateScore(score);
                    showcase.soundManager.playSound("explosion"); // Or a specific eat ghost sound
                    ghost.state = "eaten"; // Ghost returns to base (simplified: reset position)
                    ghost.x = 13.5 * scale; ghost.y = 11.5 * scale; // Ghost house
                    setTimeout(() => { if (ghost.state === "eaten") ghost.state = "scatter"; }, 3000); // Respawn time
                } else if (ghost.state !== "eaten") {
                    gameOver = true;
                    showcase.soundManager.playSound("gameOver");
                }
            }
        });
    }

    function gameLoop() {
        if (gameOver || gameWon) {
            drawUI(); // Keep drawing UI if game ended
            return;
        }
        updatePlayer();
        updateGhosts();

        ctx.fillStyle = "#000";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        drawMap();
        drawGhosts();
        drawPlayer();
        drawUI();
        animationFrameId = requestAnimFrame(gameLoop);
    }

    const handleKeyDown = (e) => {
        if (gameOver || gameWon) return;
        switch (e.key) {
            case "ArrowUp": case "w": player.nextDx = 0; player.nextDy = -1; break;
            case "ArrowDown": case "s": player.nextDx = 0; player.nextDy = 1; break;
            case "ArrowLeft": case "a": player.nextDx = -1; player.nextDy = 0; break;
            case "ArrowRight": case "d": player.nextDx = 1; player.nextDy = 0; break;
        }
    };

    showcase.eventHandler.addManagedListener(document, "keydown", handleKeyDown, "pacman");
    initLevel();
    animationFrameId = requestAnimFrame(gameLoop);

    return {
        cleanup: () => {
            if (animationFrameId) cancelAnimationFrame(animationFrameId);
            animationFrameId = null;
        },
    };
}