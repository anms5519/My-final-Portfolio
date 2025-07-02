"use strict";
import { $, $$ } from './utils.js';
import { showcaseStyles } from './styles.js';

export class UIManager {
    constructor(showcaseInstance) {
        this.showcase = showcaseInstance;
    }

    createContainer() {
        const container = document.createElement("div");
        container.className = "project-showcase";
        container.innerHTML = `
            <div class="showcase-header">
                <div class="showcase-title-area">
                    <div class="showcase-logo-wrapper">
                        <i class="fas fa-crown logo-icon"></i>
                    </div>
                    <h3>Legendary HTML5 Arcade</h3>
                </div>
                <div class="showcase-controls">
                    <button class="toggle-effects" title="Toggle Visual Effects"><i class="fas fa-bolt"></i></button>
                    <button class="toggle-achievements" title="View Achievements"><i class="fas fa-trophy"></i></button>
                    <button class="toggle-darkmode" title="Toggle Theme"><i class="fas fa-palette"></i></button>
                    <button class="showcase-fullscreen" title="Toggle Fullscreen"><i class="fas fa-expand-arrows-alt"></i></button>
                    <button class="showcase-minimize" title="Minimize"><i class="fas fa-window-minimize"></i></button>
                    <button class="showcase-close" title="Close"><i class="fas fa-times-circle"></i></button>
                </div>
            </div>
            <div class="showcase-content">
                <div class="showcase-sidebar">
                    <div class="search-container">
                        <i class="fas fa-search search-icon"></i>
                        <input type="text" class="project-search" placeholder="Search legendary games...">
                    </div>
                    <div class="category-filters">
                    </div>
                    <div class="game-tab-controls">
                        <button class="game-tab-btn active" data-tab="all"><i class="fas fa-th"></i> All Games</button>
                        <button class="game-tab-btn" data-tab="recent"><i class="fas fa-history"></i> Recently Played</button>
                        <button class="game-tab-btn" data-tab="favorites"><i class="fas fa-star"></i> Favorites</button>
                    </div>
                    <div class="project-list-wrapper">
                        <div class="project-list"></div>
                    </div>
                    <div class="showcase-sidebar-footer">
                        <div class="gamepad-status">
                            <i class="fas fa-gamepad"></i> <span class="gamepad-text">No gamepad detected</span>
                        </div>
                    </div>
                </div>
                <div class="showcase-main">
                    <div class="project-view">
                        <div class="project-preview-wrapper">
                            <div class="project-preview">
                                <div class="loading-indicator">
                                    <div class="loading-spinner"></div>
                                    <span>Loading Game...</span>
                                </div>
                            </div>
                            <div class="game-overlay">
                                <div class="game-pause-menu">
                                    <h4>Game Paused</h4>
                                    <div class="pause-menu-buttons">
                                        <button class="resume-btn"><i class="fas fa-play"></i> Resume</button>
                                        <button class="restart-btn"><i class="fas fa-redo"></i> Restart</button>
                                        <button class="exit-btn"><i class="fas fa-times"></i> Exit Game</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="project-info">
                            <h4 class="project-title">Select an Epic Game</h4>
                            <p class="project-description">Choose a game from our legendary list to begin your adventure.</p>
                            <div class="project-stats-display">
                                <div class="score-container">
                                    <span class="current-score">Score: 0</span> | <span class="high-score">High Score: 0</span>
                                </div>
                                <div class="play-count">Plays: 0</div>
                            </div>
                            <div class="project-controls">
                                <button class="game-fullscreen-btn" title="Game Fullscreen"><i class="fas fa-expand"></i></button>
                                <button class="game-restart-btn" title="Restart Game"><i class="fas fa-redo-alt"></i></button>
                                <button class="game-sound-btn" title="Toggle Sound"><i class="fas fa-volume-up"></i></button>
                                <button class="game-favorite-btn" title="Add to Favorites"><i class="far fa-star"></i></button>
                                <button class="game-share-btn" title="Share Game"><i class="fas fa-share-alt"></i></button>
                            </div>
                        </div>
                        <div class="game-instructions">
                            <h5><i class="fas fa-info-circle"></i> How to Play</h5>
                            <p class="instructions-text">Select a game to see instructions.</p>
                        </div>
                    </div>
                </div>
            </div>
            <div class="showcase-footer">
                <div class="project-stats">
                    <span class="games-count">0 Games</span>
                    <span class="footer-separator">|</span>
                    <span class="games-categories">Loading...</span>
                    <span class="footer-separator">|</span>
                    <span class="achievement-progress">Achievements: 0%</span>
                </div>
                <div class="project-actions">
                    <button class="random-game-btn"><i class="fas fa-dice"></i> Random Game</button>
                </div>
            </div>
            <canvas class="particle-canvas"></canvas>
        `;
        document.body.appendChild(container);
        return container;
    }

    createTriggerButton() {
        const button = document.createElement("button");
        button.className = "showcase-trigger";
        button.innerHTML = '<i class="fas fa-gamepad-alt"></i> Open Arcade';
        document.body.appendChild(button);
        return button;
    }

    injectStyles() {
        const styleEl = document.createElement("style");
        styleEl.textContent = showcaseStyles;
        document.head.appendChild(styleEl);

        const fontLink = document.createElement("link");
        fontLink.href = "https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700&family=Poppins:wght@400;500;600;700&display=swap";
        fontLink.rel = "stylesheet";
        document.head.appendChild(fontLink);

        if (!document.querySelector('link[href*="fontawesome"]')) {
            const faLink = document.createElement("link");
            faLink.rel = "stylesheet";
            faLink.href = "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css";
            document.head.appendChild(faLink);
        }
    }

    applyInitialTheme() {
        this.showcase.container.classList.toggle("light", !this.showcase.isDarkMode);
        this.updateDarkModeButton();
    }

    updateDarkModeButton() {
        const icon = $(".toggle-darkmode i", this.showcase.container);
        if (!icon) return;
        icon.className = this.showcase.isDarkMode ? "fas fa-sun" : "fas fa-moon";
        const button = $(".toggle-darkmode", this.showcase.container);
        if (button) {
            button.title = this.showcase.isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode";
        }
    }
    
    populateGameList(projects) {
        const projectList = $(".project-list", this.showcase.container);
        if (!projectList) return;
        projectList.innerHTML = "";
        const categories = new Set();

        projects.forEach(project => {
            const projectItem = document.createElement("div");
            projectItem.className = "project-item";
            projectItem.dataset.id = project.id;
            projectItem.dataset.category = project.category;
            projectItem.innerHTML = `
                <div class="project-item-icon" style="background-color: ${project.iconColor || '#888'};">
                    <i class="fas ${project.icon || 'fa-gamepad'}"></i>
                </div>
                <div class="project-item-text">
                    <div class="project-item-name">${project.name}</div>
                    <div class="project-item-category">${project.category}</div>
                </div>
            `;
            projectList.appendChild(projectItem);
            categories.add(project.category);
        });

        const categoryFilters = $(".category-filters", this.showcase.container);
        if (!categoryFilters) return;
        categoryFilters.innerHTML = `<button class="category-btn active" data-category="all">All (${projects.length})</button>`;
        const sortedCategories = [...categories].sort();
        sortedCategories.forEach(cat => {
            const count = projects.filter(p => p.category === cat).length;
            const btn = document.createElement("button");
            btn.className = "category-btn";
            btn.dataset.category = cat;
            btn.textContent = `${cat.charAt(0).toUpperCase() + cat.slice(1)} (${count})`;
            categoryFilters.appendChild(btn);
        });
    }

    updateFooterStats() {
        const gamesCount = $(".games-count", this.showcase.container);
        const gamesCategories = $(".games-categories", this.showcase.container);
        if (!gamesCount || !gamesCategories) return;

        const uniqueCategories = [...new Set(this.showcase.projects.map(p => p.category))].sort();
        gamesCount.textContent = `${this.showcase.projects.length} Legendary Games`;
        gamesCategories.textContent = uniqueCategories.map(c => c.charAt(0).toUpperCase() + c.slice(1)).join(", ");
        this.updateAchievementProgress(this.showcase.achievementSystem.getProgress().percentage);
    }

    updateAchievementProgress(percentage) {
        const progressEl = $(".achievement-progress", this.showcase.container);
        if (progressEl) progressEl.textContent = `Achievements: ${percentage}%`;
    }

    updateProjectInfo(project) {
        const title = $(".project-title", this.showcase.container);
        const description = $(".project-description", this.showcase.container);
        const instructions = $(".instructions-text", this.showcase.container);

        if (project) {
            if (title) title.textContent = project.name;
            if (description) description.textContent = project.description;
            if (instructions) instructions.textContent = project.instructions || "No instructions available.";
            this.updateScoreDisplay();
            this.updateGameFavoriteButton(this.showcase.isFavorite(project.id));
        } else {
            if (title) title.textContent = "Select an Epic Game";
            if (description) description.textContent = "Choose a game from our legendary list to begin your adventure.";
            if (instructions) instructions.textContent = "Select a game to see instructions.";
            this.updateScoreDisplay(); // Clears score for no project
        }
    }

    updateScoreDisplay() {
        const scoreDisplay = $(".current-score", this.showcase.container);
        const highScoreDisplay = $(".high-score", this.showcase.container);
        const playCountDisplay = $(".play-count", this.showcase.container);

        if (!scoreDisplay || !highScoreDisplay || !playCountDisplay) return;

        if (this.showcase.currentProject) {
            const state = this.showcase.gameStates[this.showcase.currentProject.id] || { score: 0, highScore: 0, plays: 0 };
            scoreDisplay.textContent = `Score: ${state.score}`;
            highScoreDisplay.textContent = `High Score: ${state.highScore}`;
            playCountDisplay.textContent = `Plays: ${state.plays || 0}`;
        } else {
            scoreDisplay.textContent = "Score: -";
            highScoreDisplay.textContent = "High Score: -";
            playCountDisplay.textContent = "Plays: -";
        }
    }
    
    highlightProjectItem(projectId) {
        $$(".project-item", this.showcase.container).forEach(item => {
            item.classList.toggle("active", item.dataset.id === projectId);
            if (item.dataset.id === projectId) {
                item.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "start" });
            }
        });
    }

    showLoadingIndicator() {
        const indicator = $(".loading-indicator", this.showcase.container);
        const canvas = $("canvas.game-canvas", this.showcase.container); // Target specific game canvas
        if (indicator) indicator.classList.add("visible");
        if (canvas) canvas.classList.add("loading");
    }

    hideLoadingIndicator() {
        const indicator = $(".loading-indicator", this.showcase.container);
        const canvas = $("canvas.game-canvas", this.showcase.container);
        if (indicator) indicator.classList.remove("visible");
        if (canvas) canvas.classList.remove("loading");
    }
    
    clearProjectPreview() {
        const preview = $(".project-preview", this.showcase.container);
        if (preview) preview.innerHTML = `<div class="loading-indicator"><div class="loading-spinner"></div><span>Loading Game...</span></div>`; // Keep loading indicator structure
    }

    insertProjectPreviewHTML(html) {
        const preview = $(".project-preview", this.showcase.container);
        if (preview) {
            // Preserve loading indicator if it exists, insert HTML before/after or replace content carefully
            const loadingIndicatorHTML = preview.querySelector('.loading-indicator')?.outerHTML || '';
            preview.innerHTML = html + loadingIndicatorHTML;
        }
    }
    
    getGameElementFromPreview() {
        const preview = $(".project-preview", this.showcase.container);
        // Return the first child that is not the loading indicator
        return preview ? Array.from(preview.children).find(child => !child.classList.contains('loading-indicator')) : null;
    }

    updateGamePauseMenuVisibility(visible) {
        const overlay = $(".game-overlay", this.showcase.container);
        if (overlay) overlay.classList.toggle("visible", visible);
    }

    updateGameFavoriteButton(isFavorite) {
        const favBtnIcon = $(".game-favorite-btn i", this.showcase.container);
        if (favBtnIcon) favBtnIcon.className = isFavorite ? "fas fa-star" : "far fa-star";
    }

    updateGameSoundButton(soundEnabled) {
        const soundBtnIcon = $(".game-sound-btn i", this.showcase.container);
        if (soundBtnIcon) soundBtnIcon.className = soundEnabled ? "fas fa-volume-up" : "fas fa-volume-mute";
    }
    
    updateShowcaseFullscreenIcon(isFullscreen) {
        const icon = $(".showcase-fullscreen i", this.showcase.container);
        if (icon) icon.className = isFullscreen ? "fas fa-compress-arrows-alt" : "fas fa-expand-arrows-alt";
    }

    showStarBurstEffect() {
        const btn = $(".game-favorite-btn", this.showcase.container);
        if (!btn || !this.showcase.container) return;

        const container = document.createElement("div");
        container.className = "star-burst-container";
        // ... (rest of the star burst effect logic from original)
        container.style.position = "absolute";
        container.style.pointerEvents = "none";
        const rect = btn.getBoundingClientRect();
        const parentRect = this.showcase.container.getBoundingClientRect();
        container.style.left = rect.left - parentRect.left + rect.width / 2 + "px";
        container.style.top = rect.top - parentRect.top + rect.height / 2 + "px";

        for (let i = 0; i < 12; i++) {
            const star = document.createElement("div");
            star.className = "burst-star";
            star.innerHTML = '<i class="fas fa-star"></i>';
            const angle = (i / 12) * Math.PI * 2;
            const distance = 60;
            const delay = i * 50;
            star.style.transform = `translate(-50%, -50%)`;
            star.style.setProperty("--angle", angle + "rad");
            star.style.setProperty("--distance", distance + "px");
            star.style.setProperty("--delay", delay + "ms");
            container.appendChild(star);
        }
        this.showcase.container.appendChild(container);
        setTimeout(() => {
            container.remove();
        }, 1500);
    }

    // ... other UI update methods like showRecentlyPlayed, showFavorites, drawPlaceholder
    // These will need access to showcase.container and potentially other showcase state
    // For example:
    showRecentlyPlayed(recentlyPlayedIds) {
        const projectItems = $$(".project-item", this.showcase.container);
        projectItems.forEach(item => item.classList.remove("hidden")); // Show all first

        const projectList = $(".project-list", this.showcase.container);
        const existingMessage = $(".no-items-message", projectList);
        if (existingMessage) existingMessage.remove();

        if (recentlyPlayedIds.length > 0) {
            projectItems.forEach(item => {
                if (!recentlyPlayedIds.includes(item.dataset.id)) {
                    item.classList.add("hidden");
                }
            });
        } else {
            projectItems.forEach(item => item.classList.add("hidden"));
            const message = document.createElement("div");
            message.className = "no-items-message";
            message.innerHTML = '<i class="fas fa-info-circle"></i> No recently played games. Start playing to build your history!';
            projectList.appendChild(message);
        }
    }

    showFavorites(favoriteIds) {
        const projectItems = $$(".project-item", this.showcase.container);
        projectItems.forEach(item => item.classList.remove("hidden"));

        const projectList = $(".project-list", this.showcase.container);
        const existingMessage = $(".no-items-message", projectList);
        if (existingMessage) existingMessage.remove();
        
        if (favoriteIds.length > 0) {
            projectItems.forEach(item => {
                if (!favoriteIds.includes(item.dataset.id)) {
                    item.classList.add("hidden");
                }
            });
        } else {
            projectItems.forEach(item => item.classList.add("hidden"));
            const message = document.createElement("div");
            message.className = "no-items-message";
            message.innerHTML = '<i class="fas fa-info-circle"></i> No favorite games yet. Click the star icon when playing a game to add it to favorites!';
            projectList.appendChild(message);
        }
    }

    drawPlaceholder(gameElement, gameName, message) {
        if (!gameElement) return;
        if (gameElement.tagName === "CANVAS") {
            const ctx = gameElement.getContext("2d");
            const canvas = gameElement;
            ctx.fillStyle = "#111";
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            ctx.font = "bold 2.4vh var(--font-heading)";
            ctx.fillStyle = "var(--primary-color)";
            ctx.textAlign = "center";
            ctx.fillText(gameName, canvas.width / 2, canvas.height / 2 - 30);
            ctx.font = "1.6vh var(--font-main)";
            ctx.fillStyle = "#ccc";
            ctx.fillText(message || "Coming Soon!", canvas.width / 2, canvas.height / 2 + 10);
            ctx.fillText("Select another game or try restarting.", canvas.width / 2, canvas.height / 2 + 40);
        } else if (gameElement.tagName === "DIV") {
            gameElement.style.display = "flex";
            gameElement.style.flexDirection = "column";
            gameElement.style.alignItems = "center";
            gameElement.style.justifyContent = "center";
            gameElement.style.background = "#111";
            gameElement.style.color = "#ccc";
            gameElement.style.textAlign = "center";
            gameElement.style.height = "100%";
            gameElement.style.padding = "2vh";
            gameElement.innerHTML = `
                <h3 style="color: var(--primary-color); font-family: var(--font-heading); margin-bottom: 1.5vh;">${gameName}</h3>
                <p>${message || "Coming Soon!"}</p>
                <p style="font-size: 0.9em; margin-top: 1vh;">Select another game or try restarting.</p>
            `;
        }
        this.hideLoadingIndicator();
    }

    // Start/Restart Game Overlay Logic (Simplified)
    _createGameOverlayCard(titleText, buttonText, buttonIconClass, badgeText, badgeColor) {
        // This is a helper for the two overlay functions below
        // Returns a DOM element for the card
        const gameCard = document.createElement("div");
        // ... (styling and structure from original loadProject/restartCurrentGame)
        // Example:
        gameCard.style.background = "linear-gradient(135deg, rgba(40, 50, 80, 0.8) 0%, rgba(20, 30, 55, 0.9) 100%)";
        gameCard.style.padding = "3vh 4vh";
        gameCard.style.borderRadius = "1.2vh";
        // ... more styles

        const gameTitle = document.createElement("div");
        gameTitle.textContent = titleText.toUpperCase();
        // ... title styles

        const startButton = document.createElement("button");
        startButton.innerHTML = `<span>${buttonText}</span><i class="fas ${buttonIconClass}" style="margin-left: 1vh; font-size: 0.8em;"></i>`;
        // ... button styles

        if (badgeText) {
            const gameBadge = document.createElement("div");
            gameBadge.textContent = badgeText;
            gameBadge.style.backgroundColor = badgeColor;
            // ... badge styles
            gameCard.appendChild(gameBadge); // Or header.appendChild(gameBadge)
        }
        
        gameCard.appendChild(gameTitle);
        // ... append description if needed
        gameCard.appendChild(startButton);
        // ... append instructions note if needed
        
        return { gameCard, startButton };
    }

    displayStartGameOverlay(project, onStartCallback) {
        const { gameCard, startButton } = this._createGameOverlayCard(
            project.name, 
            "START GAME", 
            "fa-play",
            "PREMIUM", // Example badge
            "rgba(102, 252, 241, 0.9)" // Example badge color
        );
        // ... (Add description, particles, etc. to gameCard as in original)
        
        const startGameOverlay = document.createElement("div");
        // ... (styling for startGameOverlay from original)
        startGameOverlay.className = "start-game-overlay";
        // ... more styles
        startGameOverlay.appendChild(gameCard);

        const previewWrapperEl = $(".project-preview-wrapper", this.showcase.container);
        previewWrapperEl.style.position = "relative";
        previewWrapperEl.appendChild(startGameOverlay);

        const initializeGame = () => {
            startGameOverlay.style.opacity = "0";
            setTimeout(() => {
                if (startGameOverlay.parentNode) {
                    startGameOverlay.parentNode.removeChild(startGameOverlay);
                }
                onStartCallback();
            }, 300);
        };
        startButton.addEventListener("click", initializeGame);
        startGameOverlay.addEventListener("click", (e) => {
            if (e.target === startGameOverlay) initializeGame();
        });
    }

    displayRestartGameOverlay(project, onRestartCallback) {
         const { gameCard, startButton } = this._createGameOverlayCard(
            project.name, 
            "RESTART GAME", 
            "fa-redo-alt",
            "RESTART", // Example badge
            "rgba(255, 184, 48, 0.9)" // Example badge color
        );
        // ... (Add particles, etc. to gameCard as in original)

        const restartOverlay = document.createElement("div");
        // ... (styling for restartOverlay, similar to startGameOverlay)
        restartOverlay.className = "start-game-overlay"; // Can reuse class
        // ... more styles
        restartOverlay.appendChild(gameCard);

        const previewWrapperEl = $(".project-preview-wrapper", this.showcase.container);
        previewWrapperEl.style.position = "relative";
        previewWrapperEl.appendChild(restartOverlay);

        const initializeRestartedGame = () => {
            restartOverlay.style.opacity = "0";
            setTimeout(() => {
                if (restartOverlay.parentNode) {
                    restartOverlay.parentNode.removeChild(restartOverlay);
                }
                onRestartCallback();
            }, 300);
        };
        startButton.addEventListener("click", initializeRestartedGame);
        restartOverlay.addEventListener("click", (e) => {
            if (e.target === restartOverlay) initializeRestartedGame();
        });
    }
}