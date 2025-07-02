"use strict";
import { $, $$ } from './utils.js';
import { AchievementSystem } from './achievement-system.js';
import { ParticleEffectsManager } from './particle-effects-manager.js';
import { GamepadManager } from './gamepad-manager.js';
import { SoundManager } from './sound-manager.js';
import { UIManager } from './ui-manager.js';
import { EventHandler } from './event-handler.js';
import { projectsData } from './project-data.js';
import { gameInitializers } from './game-initializers.js';

export class ProjectShowcase {
    constructor() {
        this.projects = [];
        this.currentProject = null;
        this.currentGameInstance = null;
        this.container = null;
        this.triggerButton = null;
        this.isDarkMode = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
        this.soundEnabled = true; // Global sound setting for the showcase
        this.gameStates = this.loadGameStates();
        // recentlyPlayed and lastPlayedTime will be managed within gameStates or similar
        this.recentlyPlayed = this.loadRecentlyPlayed(); 
        this.lastPlayedTime = this.loadLastPlayedTimes();

        // Instantiate managers
        this.uiManager = new UIManager(this);
        this.soundManager = new SoundManager(this);
        this.particleEffectsManager = new ParticleEffectsManager(this);
        this.gamepadManager = new GamepadManager(this);
        this.eventHandler = new EventHandler(this);
        this.achievementSystem = new AchievementSystem(this);
    }

    init() {
        this.triggerButton = this.uiManager.createTriggerButton();
        this.container = this.uiManager.createContainer();
        this.uiManager.injectStyles();
        
        this.particleEffectsManager.init();
        this.gamepadManager.init();
        this.eventHandler.addEventListeners(); // This will also set up global listeners

        this.loadProjects();
        this.uiManager.populateGameList(this.projects);
        this.uiManager.updateFooterStats();
        this.uiManager.applyInitialTheme();
        
        setTimeout(() => {
            this.container.classList.add("loaded");
            this.loadRandomProject();
        }, 500);
    }

    loadProjects() {
        this.projects = projectsData.map(proj => ({
            ...proj,
            init: gameInitializers[proj.initKey] // Map string key to actual function
        })).sort((a, b) => a.name.localeCompare(b.name));
    }

    loadGameStates() {
        try {
            const savedStates = localStorage.getItem("projectShowcaseGameStates");
            return savedStates ? JSON.parse(savedStates) : {};
        } catch (e) { return {}; }
    }

    saveGameStates() {
        try {
            localStorage.setItem("projectShowcaseGameStates", JSON.stringify(this.gameStates));
        } catch (e) { /* LocalStorage not available */ }
    }
    
    loadRecentlyPlayed() {
        try {
            return JSON.parse(localStorage.getItem("projectShowcaseRecentlyPlayed") || "[]");
        } catch (e) { return []; }
    }

    saveRecentlyPlayed() {
        try {
            localStorage.setItem("projectShowcaseRecentlyPlayed", JSON.stringify(this.recentlyPlayed));
        } catch (e) {}
    }

    loadLastPlayedTimes() {
         try {
            return JSON.parse(localStorage.getItem("projectShowcaseLastPlayedTimes") || "{}");
        } catch (e) { return {}; }
    }
    
    saveLastPlayedTimes() {
        try {
            localStorage.setItem("projectShowcaseLastPlayedTimes", JSON.stringify(this.lastPlayedTime));
        } catch (e) {}
    }


    show() {
        try {
            const storedMode = localStorage.getItem("projectShowcaseDarkMode");
            if (storedMode !== null) {
                this.isDarkMode = storedMode === "true";
                this.uiManager.applyInitialTheme();
            }
        } catch (e) { console.warn("Could not load dark mode preference."); }

        this.container.classList.add("active");
        if (this.triggerButton) {
            this.triggerButton.style.opacity = "0";
            this.triggerButton.style.pointerEvents = "none";
        }
        this.soundManager.playSound("open");
        this.particleEffectsManager.startAnimation(); // Ensure particles animate when shown
        this.achievementSystem.checkTimeBasedAchievements(); // Check on open
    }

    hide() {
        this.container.classList.remove("active");
         if (this.triggerButton) {
            this.triggerButton.style.opacity = "1";
            this.triggerButton.style.pointerEvents = "all";
        }
        this.soundManager.playSound("close");
        this.cleanupCurrentGame();
        this.currentProject = null;
        this.uiManager.updateProjectInfo(null);
    }

    toggleMinimize() {
        this.container.classList.toggle("minimized");
        this.soundManager.playSound("ui");
    }

    toggleFullscreen() {
        this.container.classList.toggle("fullscreen");
        this.uiManager.updateShowcaseFullscreenIcon(this.container.classList.contains("fullscreen"));
        this.soundManager.playSound("ui");
        this.dispatchResizeEvent();
    }

    toggleDarkMode() {
        this.isDarkMode = !this.isDarkMode;
        this.container.classList.toggle("light", !this.isDarkMode);
        this.uiManager.updateDarkModeButton();
        this.soundManager.playSound("ui");
        try {
            localStorage.setItem("projectShowcaseDarkMode", this.isDarkMode);
        } catch (e) { console.warn("Could not save dark mode preference."); }
    }
    
    loadProject(projectId) {
        if (!projectId || (this.currentProject && this.currentProject.id === projectId)) {
             if (!projectId && this.currentProject) { // If called with null, unload current game
                this.cleanupCurrentGame();
                this.currentProject = null;
                this.uiManager.updateProjectInfo(null);
                this.uiManager.clearProjectPreview();
                // Add placeholder or default view to project-preview
                const preview = $(".project-preview", this.container);
                if(preview) preview.innerHTML = `<div class="loading-indicator"><span>Select a game</span></div>`;
             }
            return;
        }

        const project = this.projects.find(p => p.id === projectId);
        if (!project) return;

        this.uiManager.showLoadingIndicator();
        this.cleanupCurrentGame();
        this.currentProject = project;

        this.uiManager.updateProjectInfo(project);
        this.uiManager.clearProjectPreview();
        this.uiManager.insertProjectPreviewHTML(project.preview);
        this.uiManager.highlightProjectItem(projectId);

        const gameElement = this.uiManager.getGameElementFromPreview();
        if (gameElement) {
            if (gameElement.tagName === "CANVAS") {
                gameElement.style.width = "100%";
                gameElement.style.height = "100%";
                gameElement.style.display = "block";
                gameElement.style.objectFit = "contain";
            }
            gameElement.classList.add("game-canvas");
        }
        
        this.uiManager.displayStartGameOverlay(project, () => {
            this.uiManager.showLoadingIndicator();
            if (project.init && typeof project.init === 'function') {
                try {
                    // Pass `this` (showcase instance) to the game's init function
                    this.currentGameInstance = project.init.call(null, this, gameElement);
                    this.soundManager.playSound("load");
                } catch (error) {
                    console.error(`Error initializing game "${projectId}":`, error);
                    this.uiManager.drawPlaceholder(gameElement, project.name, "Failed to Load");
                }
            } else {
                console.warn(`No init function found for project: ${projectId}`);
                this.uiManager.drawPlaceholder(gameElement, project.name, "Initialization Error");
            }
            this.uiManager.hideLoadingIndicator();
        });
        this.uiManager.hideLoadingIndicator(); // Hide initial loading for overlay

        if (!this.gameStates[projectId]) {
            this.gameStates[projectId] = { score: 0, highScore: 0, plays: 0, lastPlayed: new Date() };
        } else {
            this.gameStates[projectId].lastPlayed = new Date();
            this.gameStates[projectId].plays = (this.gameStates[projectId].plays || 0) + 1;
        }
        this.saveGameStates();
        this.updateRecentlyPlayed(projectId);
        this.achievementSystem.checkForAchievements("game_started", { project });
    }

    cleanupCurrentGame() {
        if (this.currentGameInstance) {
            if (typeof this.currentGameInstance.cleanup === "function") {
                try {
                    this.currentGameInstance.cleanup();
                } catch (error) { console.error("Error during game cleanup:", error); }
            }
            // Cleanup listeners specific to this game
            if (this.currentProject) {
                this.eventHandler.cleanupListeners(listener => listener.options && listener.options.gameId === this.currentProject.id);
            }
        }
        this.uiManager.clearProjectPreview();
        this.currentGameInstance = null;
    }

    restartCurrentGame() {
        if (!this.currentProject || !this.currentProject.init) return;
        
        this.uiManager.showLoadingIndicator();
        this.cleanupCurrentGame();
        
        this.uiManager.insertProjectPreviewHTML(this.currentProject.preview);
        const gameElement = this.uiManager.getGameElementFromPreview();
         if (gameElement) {
            if (gameElement.tagName === "CANVAS") {
                gameElement.style.width = "100%";
                gameElement.style.height = "100%";
                gameElement.style.display = "block";
                gameElement.style.objectFit = "contain";
            }
            gameElement.classList.add("game-canvas");
        }

        if (this.gameStates[this.currentProject.id]) {
            this.gameStates[this.currentProject.id].score = 0;
        }
        this.uiManager.updateScoreDisplay();

        this.uiManager.displayRestartGameOverlay(this.currentProject, () => {
            this.uiManager.showLoadingIndicator();
            try {
                this.currentGameInstance = this.currentProject.init.call(null, this, gameElement);
                this.soundManager.playSound("restart");
            } catch (error) {
                console.error(`Error restarting game "${this.currentProject.id}":`, error);
                this.uiManager.drawPlaceholder(gameElement, this.currentProject.name, "Failed to Restart");
            }
            this.uiManager.hideLoadingIndicator();
        });
        this.uiManager.hideLoadingIndicator();
    }
    
    updateRecentlyPlayed(projectId) {
        this.recentlyPlayed = this.recentlyPlayed.filter(id => id !== projectId);
        this.recentlyPlayed.unshift(projectId);
        if (this.recentlyPlayed.length > 10) { // Keep last 10
            this.recentlyPlayed.pop();
        }
        this.saveRecentlyPlayed();
        this.lastPlayedTime[projectId] = Date.now();
        this.saveLastPlayedTimes();
    }

    getFavorites() {
        try {
            return JSON.parse(localStorage.getItem("game-favorites") || "[]");
        } catch (e) { return []; }
    }

    isFavorite(projectId) {
        return this.getFavorites().includes(projectId);
    }

    toggleFavorite() {
        if (!this.currentProject) return;
        const projectId = this.currentProject.id;
        let favorites = this.getFavorites();
        const isFav = favorites.includes(projectId);

        if (isFav) {
            favorites = favorites.filter(id => id !== projectId);
        } else {
            favorites.push(projectId);
            this.uiManager.showStarBurstEffect();
        }
        try {
            localStorage.setItem("game-favorites", JSON.stringify(favorites));
        } catch (e) {}
        
        this.uiManager.updateGameFavoriteButton(!isFav);
        this.soundManager.playSound(isFav ? "unfavorite" : "favorite");
    }
    
    shareGame() {
        if (!this.currentProject) return;
        this.soundManager.playSound("click");
        alert(
            `Share ${this.currentProject.name}:\n\n` +
            `Try out this awesome HTML5 game: ${this.currentProject.name} in the Legendary HTML5 Arcade!\n\n` +
            `Category: ${this.currentProject.category}\n` +
            `My High Score: ${this.getHighScore()}`
        );
    }

    pauseGame() {
        if (!this.currentProject) return;
        this.uiManager.updateGamePauseMenuVisibility(true);
        if (this.currentGameInstance && typeof this.currentGameInstance.pause === "function") {
            this.currentGameInstance.pause();
        }
        this.soundManager.playSound("pause");
    }

    resumeGame() {
        this.uiManager.updateGamePauseMenuVisibility(false);
        if (this.currentGameInstance && typeof this.currentGameInstance.resume === "function") {
            this.currentGameInstance.resume();
        }
        this.soundManager.playSound("unpause");
    }
    
    toggleGameFullscreen() {
        if (!this.currentProject) return;
        const preview = $(".project-preview", this.container);
        if (!document.fullscreenElement) {
            preview.requestFullscreen?.({ navigationUI: "hide" })
                .catch(err => console.error("Fullscreen request failed:", err));
        } else {
            document.exitFullscreen?.();
        }
        this.soundManager.playSound("ui");
    }

    toggleGameSound() {
        this.soundEnabled = !this.soundEnabled; // This is the showcase global sound
        this.uiManager.updateGameSoundButton(this.soundEnabled);
        if (this.soundEnabled) {
            this.soundManager.playSound("ui");
        }
        // Propagate to current game instance if it supports it
        if (this.currentGameInstance && typeof this.currentGameInstance.setSoundEnabled === "function") {
            this.currentGameInstance.setSoundEnabled(this.soundEnabled);
        }
    }

    loadRandomProject() {
        const availableProjects = this.projects.filter(p => !this.currentProject || p.id !== this.currentProject.id);
        if (availableProjects.length === 0) return;
        const randomIndex = Math.floor(Math.random() * availableProjects.length);
        this.loadProject(availableProjects[randomIndex].id);
    }

    filterProjects(searchTerm) {
        const term = searchTerm.toLowerCase().trim();
        const items = $$(".project-item", this.container);
        const activeCategory = $(".category-btn.active", this.container)?.dataset.category || "all";
        
        items.forEach(item => {
            const project = this.projects.find(p => p.id === item.dataset.id);
            if (!project) return;

            const nameMatch = project.name.toLowerCase().includes(term);
            const descMatch = project.description.toLowerCase().includes(term);
            const categoryMatch = project.category.toLowerCase().includes(term);
            
            const isInActiveCategory = activeCategory === "all" || project.category === activeCategory;
            const isVisible = isInActiveCategory && (term === "" || nameMatch || descMatch || categoryMatch);
            item.classList.toggle("hidden", !isVisible);
        });
    }

    filterProjectsByCategory(category) {
        const items = $$(".project-item", this.container);
        const currentSearchTerm = $(".project-search", this.container).value;
        
        items.forEach(item => {
            const project = this.projects.find(p => p.id === item.dataset.id);
            if (!project) return;

            const term = currentSearchTerm.toLowerCase().trim();
            const nameMatch = project.name.toLowerCase().includes(term);
            const descMatch = project.description.toLowerCase().includes(term);
            const categoryMatch = project.category.toLowerCase().includes(term);

            const isInSelectedCategory = category === "all" || item.dataset.category === category;
            const matchesSearch = (term === "" || nameMatch || descMatch || categoryMatch);
            const isVisible = isInSelectedCategory && matchesSearch;
            item.classList.toggle("hidden", !isVisible);
        });
    }
    
    updateScore(score) {
        if (!this.currentProject) return false;
        const projectId = this.currentProject.id;
        if (!this.gameStates[projectId]) {
            this.gameStates[projectId] = { score: 0, highScore: 0, plays: 1, lastPlayed: new Date() };
        }
        const state = this.gameStates[projectId];
        state.score = score;
        let newHighScore = false;
        if (score > state.highScore) {
            state.highScore = score;
            newHighScore = true;
        }
        this.uiManager.updateScoreDisplay();
        this.saveGameStates();
        this.achievementSystem.checkForAchievements("score_update", { score, project: this.currentProject });
        return newHighScore;
    }

    getScore() {
        if (!this.currentProject) return 0;
        return this.gameStates[this.currentProject.id]?.score || 0;
    }

    getHighScore() {
        if (!this.currentProject) return 0;
        return this.gameStates[this.currentProject.id]?.highScore || 0;
    }

    dispatchResizeEvent() {
        window.dispatchEvent(new Event("resize"));
        if (this.currentGameInstance && typeof this.currentGameInstance.resize === "function") {
            this.currentGameInstance.resize();
        }
    }
}