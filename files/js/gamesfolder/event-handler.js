"use strict";
import { $, $$, debounce } from './utils.js';

export class EventHandler {
    constructor(showcaseInstance) {
        this.showcase = showcaseInstance;
        this.activeListeners = [];
    }

    addEventListeners() {
        const s = this.showcase; // Shorthand for showcaseInstance
        const c = s.container;   // Shorthand for showcase.container

        // Showcase Controls
        this.addManagedListener($(".showcase-close", c), "click", () => s.hide());
        this.addManagedListener($(".showcase-minimize", c), "click", () => s.toggleMinimize());
        this.addManagedListener($(".showcase-fullscreen", c), "click", () => s.toggleFullscreen());
        this.addManagedListener($(".toggle-darkmode", c), "click", () => s.toggleDarkMode());
        this.addManagedListener($(".toggle-effects", c), "click", () => s.particleEffectsManager.toggle());
        this.addManagedListener($(".toggle-achievements", c), "click", () => s.achievementSystem.showAllAchievements());

        // Search and Tabs
        const searchInput = $(".project-search", c);
        if (searchInput) {
            this.addManagedListener(searchInput, "input", debounce((e) => s.filterProjects(e.target.value), 300));
        }
        this.addManagedListener($(".random-game-btn", c), "click", () => s.loadRandomProject());
        
        const tabContainer = $(".game-tab-controls", c);
        if (tabContainer) {
            this.addManagedListener(tabContainer, "click", (e) => {
                const btn = e.target.closest(".game-tab-btn");
                if (btn) {
                    $$(".game-tab-btn", c).forEach(b => b.classList.remove("active"));
                    btn.classList.add("active");
                    const tab = btn.dataset.tab;
                    switch (tab) {
                        case "all": s.filterProjects(""); break;
                        case "recent": s.uiManager.showRecentlyPlayed(s.recentlyPlayed); break;
                        case "favorites": s.uiManager.showFavorites(s.getFavorites()); break;
                    }
                    s.soundManager.playSound("click");
                }
            });
        }
        
        // Game Controls (in project-info)
        this.addManagedListener($(".game-fullscreen-btn", c), "click", () => s.toggleGameFullscreen());
        this.addManagedListener($(".game-restart-btn", c), "click", () => s.restartCurrentGame());
        this.addManagedListener($(".game-sound-btn", c), "click", () => s.toggleGameSound());
        this.addManagedListener($(".game-favorite-btn", c), "click", () => s.toggleFavorite());
        this.addManagedListener($(".game-share-btn", c), "click", () => s.shareGame());

        // Pause Menu
        this.addManagedListener($(".resume-btn", c), "click", () => s.resumeGame());
        this.addManagedListener($(".restart-btn", c), "click", () => { s.resumeGame(); s.restartCurrentGame(); });
        this.addManagedListener($(".exit-btn", c), "click", () => { s.resumeGame(); s.loadProject(null); });

        // Category Filters
        const categoryFiltersEl = $(".category-filters", c);
        if (categoryFiltersEl) {
            this.addManagedListener(categoryFiltersEl, "click", (e) => {
                if (e.target.classList.contains("category-btn")) {
                    $$(".category-btn", c).forEach(b => b.classList.remove("active"));
                    e.target.classList.add("active");
                    s.filterProjectsByCategory(e.target.dataset.category);
                    s.soundManager.playSound("click");
                }
            });
        }

        // Project List
        const projectListEl = $(".project-list", c);
        if (projectListEl) {
            this.addManagedListener(projectListEl, "click", (e) => {
                const item = e.target.closest(".project-item");
                if (item) {
                    $$(".project-item.selected", c).forEach(i => i.classList.remove("selected"));
                    item.classList.add("selected");
                    s.loadProject(item.dataset.id);
                }
            });
            this.addManagedListener(projectListEl, "mouseover", (e) => {
                const item = e.target.closest(".project-item");
                if (item && s.particleEffectsManager.particleEffectsEnabled) {
                    s.particleEffectsManager.createItemHoverEffect(item);
                }
            });
        }
        
        // Global Listeners
        this.addManagedListener(document, "keydown", (e) => this.handleGlobalKeyDown(e));
        this.addManagedListener(window, "resize", () => s.particleEffectsManager.resize());
        this.addManagedListener(window, "gamepadconnected", (e) => s.gamepadManager.handleConnected(e.gamepad));
        this.addManagedListener(window, "gamepaddisconnected", (e) => s.gamepadManager.handleDisconnected(e.gamepad));

        // Trigger button listener (if it's managed by showcase after creation)
        if (s.triggerButton) {
            this.addManagedListener(s.triggerButton, "click", () => s.show());
        }
    }

    handleGlobalKeyDown(e) {
        const s = this.showcase;
        if (!s.container.classList.contains("active")) return;

        if (e.key === "Escape") {
            if (s.currentProject && !$(".game-overlay", s.container).classList.contains("visible")) {
                s.pauseGame();
                e.preventDefault(); return;
            } else if (s.currentProject && $(".game-overlay", s.container).classList.contains("visible")) {
                s.resumeGame();
                e.preventDefault(); return;
            } else if (!s.container.classList.contains("fullscreen")) {
                s.hide();
                e.preventDefault(); return;
            }
        }
        if (e.key === "f") {
            if (s.currentProject) s.toggleGameFullscreen();
            else s.toggleFullscreen();
            e.preventDefault(); return;
        }
        if (!s.currentProject) { // Navigation in game list
            switch (e.key) {
                case "ArrowUp": case "ArrowDown": case "ArrowLeft": case "ArrowRight":
                    this.navigateGameListWithKeyboard(e.key);
                    e.preventDefault(); break;
                case "Enter":
                    const selectedItem = $(".project-item.selected", s.container);
                    if (selectedItem) {
                        s.loadProject(selectedItem.dataset.id);
                        e.preventDefault();
                    }
                    break;
            }
        }
    }
    
    navigateGameListWithKeyboard(key) {
        const s = this.showcase;
        const gameItems = $$(".project-item:not(.hidden)", s.container);
        if (!gameItems.length) return;

        let selectedItem = $(".project-item.selected", s.container);
        let currentIndex = selectedItem ? Array.from(gameItems).indexOf(selectedItem) : -1;
        let newIndex = currentIndex;

        switch (key) {
            case "ArrowUp": newIndex = currentIndex > 0 ? currentIndex - 1 : gameItems.length - 1; break;
            case "ArrowDown": newIndex = currentIndex < gameItems.length - 1 ? currentIndex + 1 : 0; break;
            case "ArrowLeft": newIndex = currentIndex > 0 ? currentIndex - 1 : gameItems.length - 1; break; // Simple, could be improved for grid
            case "ArrowRight": newIndex = currentIndex < gameItems.length - 1 ? currentIndex + 1 : 0; break; // Simple
        }
        
        if (currentIndex !== -1) gameItems[currentIndex].classList.remove("selected");
        gameItems[newIndex].classList.add("selected");
        gameItems[newIndex].scrollIntoView({ behavior: "smooth", block: "nearest" });
        s.soundManager.playSound("navigate");
    }

    addManagedListener(element, type, listener, optionsOrGameId) {
        let options = optionsOrGameId;
        if (typeof optionsOrGameId === 'string') { // It's a gameId
            options = { gameId: optionsOrGameId };
        }
        element.addEventListener(type, listener, options);
        this.activeListeners.push({ element, type, listener, options });
    }

    cleanupListeners(filterFn = () => true) {
        const listenersToRemove = this.activeListeners.filter(filterFn);
        const listenersToKeep = this.activeListeners.filter(l => !filterFn(l));

        listenersToRemove.forEach(({ element, type, listener, options }) => {
            element.removeEventListener(type, listener, options);
        });
        this.activeListeners = listenersToKeep;
    }
}