// js/games/minesweeper.js
"use strict";

export function initMinesweeperGame(showcase, container) {
    if (!container) return null;
    container.innerHTML = "";
    container.style.display = "flex";
    container.style.flexDirection = "column";
    container.style.alignItems = "center";
    container.style.fontFamily = "var(--font-main)";

    const gridWidth = 16;
    const gridHeight = 16;
    const numMines = 40;
    let board = [];
    let minesLeft = numMines;
    let tilesRevealed = 0;
    let firstClick = true;
    let gameOver = false;
    let gameWon = false;

    const header = document.createElement("div");
    // ... (header styling as in original)
    header.style.display = "flex";
    header.style.justifyContent = "space-around";
    header.style.width = "30vh"; // Adjust as needed
    header.style.marginBottom = "1vh";
    header.style.fontSize = "1.2em";
    header.style.color = "#fff";

    const minesDisplay = document.createElement("span");
    minesDisplay.textContent = `Mines: ${minesLeft}`;
    const statusDisplay = document.createElement("span");
    statusDisplay.textContent = "🙂"; // Smiley face
    header.appendChild(minesDisplay);
    header.appendChild(statusDisplay);
    container.appendChild(header);

    const gridElement = document.createElement("div");
    // ... (gridElement styling as in original)
    gridElement.style.display = "grid";
    gridElement.style.gridTemplateColumns = `repeat(${gridWidth}, 2.5vh)`;
    gridElement.style.gridTemplateRows = `repeat(${gridHeight}, 2.5vh)`;
    gridElement.style.gap = ".1vh";
    gridElement.style.backgroundColor = "#555";
    gridElement.style.border = ".2vh solid #888";
    container.appendChild(gridElement);

    function createBoard() { /* ... as in original ... */ 
        board = [];
        gridElement.innerHTML = ""; // Clear previous grid if any
        for (let r = 0; r < gridHeight; r++) {
            board[r] = [];
            for (let c = 0; c < gridWidth; c++) {
                board[r][c] = { mine: false, revealed: false, flagged: false, adjacentMines: 0 };
                const tile = document.createElement("div");
                tile.dataset.row = r;
                tile.dataset.col = c;
                tile.style.backgroundColor = "#bbb";
                tile.style.border = ".1vh solid #999";
                tile.style.display = "flex";
                tile.style.alignItems = "center";
                tile.style.justifyContent = "center";
                tile.style.fontSize = "1.4vh";
                tile.style.fontWeight = "bold";
                tile.style.cursor = "pointer";
                tile.addEventListener("click", handleTileClick);
                tile.addEventListener("contextmenu", handleTileRightClick);
                gridElement.appendChild(tile);
            }
        }
    }
    function placeMines(startRow, startCol) { /* ... as in original ... */ 
        let minesPlaced = 0;
        while (minesPlaced < numMines) {
            const r = Math.floor(Math.random() * gridHeight);
            const c = Math.floor(Math.random() * gridWidth);
            if (!board[r][c].mine && !(Math.abs(r - startRow) <= 1 && Math.abs(c - startCol) <= 1)) { // Ensure first click area is safe
                board[r][c].mine = true;
                minesPlaced++;
            }
        }
        calculateAdjacentMines();
    }
    function calculateAdjacentMines() { /* ... as in original ... */ 
        for (let r = 0; r < gridHeight; r++) {
            for (let c = 0; c < gridWidth; c++) {
                if (board[r][c].mine) continue;
                let count = 0;
                for (let dr = -1; dr <= 1; dr++) {
                    for (let dc = -1; dc <= 1; dc++) {
                        if (dr === 0 && dc === 0) continue;
                        const nr = r + dr;
                        const nc = c + dc;
                        if (nr >= 0 && nr < gridHeight && nc >= 0 && nc < gridWidth && board[nr][nc].mine) {
                            count++;
                        }
                    }
                }
                board[r][c].adjacentMines = count;
            }
        }
    }

    function revealTile(r, c) {
        // ... (same as original, use showcase.soundManager)
        if (r < 0 || r >= gridHeight || c < 0 || c >= gridWidth || board[r][c].revealed || board[r][c].flagged) {
            return;
        }
        board[r][c].revealed = true;
        tilesRevealed++;
        const tileElement = gridElement.children[r * gridWidth + c];
        tileElement.style.backgroundColor = "#ddd";
        tileElement.style.border = ".1vh solid #ccc";
        tileElement.style.cursor = "default";

        if (board[r][c].mine) {
            tileElement.innerHTML = '<i class="fas fa-bomb" style="color: red;"></i>';
            endGame(false);
        } else if (board[r][c].adjacentMines > 0) {
            const colors = ["", "blue", "green", "red", "purple", "maroon", "turquoise", "black", "gray"];
            tileElement.textContent = board[r][c].adjacentMines;
            tileElement.style.color = colors[board[r][c].adjacentMines];
        } else { // Empty tile, reveal neighbors
            for (let dr = -1; dr <= 1; dr++) {
                for (let dc = -1; dc <= 1; dc++) {
                    if (dr === 0 && dc === 0) continue;
                    revealTile(r + dr, c + dc);
                }
            }
        }
        if (!gameOver && tilesRevealed === gridWidth * gridHeight - numMines) {
            endGame(true);
        }
    }

    function toggleFlag(r, c) {
        // ... (same as original, use showcase.soundManager)
        if (gameOver || board[r][c].revealed) return;
        const tileElement = gridElement.children[r * gridWidth + c];
        if (board[r][c].flagged) {
            board[r][c].flagged = false;
            tileElement.innerHTML = "";
            minesLeft++;
            showcase.soundManager.playSound("click");
        } else {
            if (minesLeft > 0) {
                board[r][c].flagged = true;
                tileElement.innerHTML = '<i class="fas fa-flag" style="color: orange;"></i>';
                minesLeft--;
                showcase.soundManager.playSound("ui");
            }
        }
        minesDisplay.textContent = `Mines: ${minesLeft}`;
    }

    function handleTileClick(event) {
        // ... (same as original, use showcase.soundManager)
        if (gameOver || gameWon) return;
        const tile = event.target.closest("div[data-row]");
        if (!tile) return;
        const r = parseInt(tile.dataset.row);
        const c = parseInt(tile.dataset.col);

        if (board[r][c].flagged) return;

        if (firstClick) {
            placeMines(r, c);
            firstClick = false;
        }
        if (board[r][c].mine) {
            revealTile(r, c); // Will trigger endGame
        } else {
            revealTile(r, c);
            showcase.soundManager.playSound("click");
        }
    }

    function handleTileRightClick(event) {
        event.preventDefault();
        if (gameOver || gameWon) return;
        const tile = event.target.closest("div[data-row]");
        if (!tile) return;
        const r = parseInt(tile.dataset.row);
        const c = parseInt(tile.dataset.col);
        toggleFlag(r, c);
    }

    function endGame(won) {
        // ... (same as original, use showcase.soundManager)
        gameOver = true;
        gameWon = won;
        statusDisplay.textContent = won ? "😎 Win!" : "😭 Boom!";
        showcase.soundManager.playSound(won ? "win" : "gameOver");

        for (let r = 0; r < gridHeight; r++) {
            for (let c = 0; c < gridWidth; c++) {
                const tileElement = gridElement.children[r * gridWidth + c];
                tileElement.style.cursor = "default";
                if (board[r][c].mine && !board[r][c].revealed) {
                    if (!board[r][c].flagged) { // Show unflagged mines
                        tileElement.innerHTML = '<i class="fas fa-bomb" style="color: #555;"></i>';
                        tileElement.style.backgroundColor = "#ddd";
                    }
                } else if (!board[r][c].mine && board[r][c].flagged) { // Incorrectly flagged
                    tileElement.innerHTML = '<i class="fas fa-times" style="color: red;"></i>';
                }
            }
        }
    }

    createBoard();

    return {
        cleanup: () => {
            Array.from(gridElement.children).forEach(tile => {
                tile.removeEventListener("click", handleTileClick);
                tile.removeEventListener("contextmenu", handleTileRightClick);
            });
            container.innerHTML = "";
        },
    };
}