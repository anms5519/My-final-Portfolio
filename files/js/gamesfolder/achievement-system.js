"use strict";

export class AchievementSystem {
    constructor(showcase) {
        this.showcase = showcase;
        this.achievements = [
            // ... (achievement definitions as in original)
            {
                id: "first_play",
                name: "First Steps",
                description: "Play your first game",
                icon: "fa-gamepad",
                unlocked: false,
                secret: false,
            },
            {
                id: "play_all_categories",
                name: "Genre Explorer",
                description: "Play a game from each category",
                icon: "fa-th",
                unlocked: false,
                secret: false,
            },
            {
                id: "play_10_games",
                name: "Game Hopper",
                description: "Play 10 different games",
                icon: "fa-award",
                unlocked: false,
                secret: false,
            },
            {
                id: "score_1000",
                name: "Score Hunter",
                description: "Get 1000+ points in any game",
                icon: "fa-star",
                unlocked: false,
                secret: false,
            },
            {
                id: "night_owl",
                name: "Night Owl",
                description: "Play a game after midnight",
                icon: "fa-moon",
                unlocked: false,
                secret: true,
            },
            {
                id: "speed_demon",
                name: "Speed Demon",
                description: "Complete a game in under 30 seconds",
                icon: "fa-bolt",
                unlocked: false,
                secret: true,
            },
            {
                id: "perfectionist",
                name: "Perfectionist",
                description: "Get a perfect score in any puzzle game",
                icon: "fa-trophy",
                unlocked: false,
                secret: true,
            },
            {
                id: "marathon",
                name: "Gaming Marathon",
                description: "Play games for over an hour total",
                icon: "fa-stopwatch",
                unlocked: false,
                secret: true,
            },
            {
                id: "comeback_kid",
                name: "Comeback Kid",
                description: "Return to the arcade after 3+ days",
                icon: "fa-undo",
                unlocked: false,
                secret: true,
            },
            {
                id: "completionist",
                name: "Legendary Completionist",
                description: "Play all games at least once",
                icon: "fa-crown",
                unlocked: false,
                secret: false,
            },
        ];
        this.achievementsUnlocked = this.loadAchievements();
        this.totalPlayTime = 0; // This would need more logic to track accurately across sessions
        this.sessionStartTime = Date.now();
        this.lastSaveTime = this.loadLastVisit() || 0;

        this.achievementsUnlocked.forEach((id) => {
            const achievement = this.achievements.find((a) => a.id === id);
            if (achievement) achievement.unlocked = true;
        });
        this.checkTimeBasedAchievements();
    }

    loadAchievements() {
        try {
            return JSON.parse(localStorage.getItem("game-achievements") || "[]");
        } catch (e) {
            console.warn("Error loading achievements:", e);
            return [];
        }
    }

    loadLastVisit() {
        try {
            return JSON.parse(localStorage.getItem("game-last-visit") || "0");
        } catch (e) {
            return 0;
        }
    }

    saveAchievements() {
        try {
            localStorage.setItem("game-achievements", JSON.stringify(this.achievementsUnlocked));
            localStorage.setItem("game-last-visit", JSON.stringify(Date.now()));
        } catch (e) {
            console.warn("Error saving achievements:", e);
        }
    }

    checkForAchievements(trigger, data = {}) {
        let newUnlocks = [];
        // Simplified logic for brevity, actual implementation would be more detailed
        switch (trigger) {
            case "game_started":
                if (!this.isUnlocked("first_play")) {
                    if (this.unlockAchievement("first_play")) newUnlocks.push(this.getAchievement("first_play"));
                }
                // ... other checks based on game_started
                break;
            case "score_update":
                if (!this.isUnlocked("score_1000") && data.score >= 1000) {
                     if (this.unlockAchievement("score_1000")) newUnlocks.push(this.getAchievement("score_1000"));
                }
                // ... other checks
                break;
             // ... other cases
        }

        if (newUnlocks.length > 0) {
            this.displayAchievements(newUnlocks);
            this.showcase.uiManager.updateAchievementProgress(this.getProgress().percentage);
        }
        return newUnlocks.length > 0;
    }
    
    checkTimeBasedAchievements() {
        let newUnlocks = [];
        if (!this.isUnlocked("night_owl")) {
            const hours = new Date().getHours();
            if (hours >= 0 && hours <= 4) { // Example: 12 AM to 4 AM
                if(this.unlockAchievement("night_owl")) newUnlocks.push(this.getAchievement("night_owl"));
            }
        }
        if (!this.isUnlocked("comeback_kid") && this.lastSaveTime > 0) {
            const daysDifference = (Date.now() - this.lastSaveTime) / (1000 * 60 * 60 * 24);
            if (daysDifference >= 3) {
                if(this.unlockAchievement("comeback_kid")) newUnlocks.push(this.getAchievement("comeback_kid"));
            }
        }
        // ... other time-based checks

        if (newUnlocks.length > 0) {
            this.displayAchievements(newUnlocks);
            this.showcase.uiManager.updateAchievementProgress(this.getProgress().percentage);
        }
    }


    unlockAchievement(id) {
        const achievement = this.achievements.find((a) => a.id === id);
        if (achievement && !achievement.unlocked) {
            achievement.unlocked = true;
            if (!this.achievementsUnlocked.includes(id)) {
                this.achievementsUnlocked.push(id);
            }
            this.saveAchievements();
            return true; // Indicates a new unlock
        }
        return false; // Already unlocked or not found
    }

    isUnlocked(id) {
        return this.achievementsUnlocked.includes(id);
    }
    
    getAchievement(id) {
        return this.achievements.find(a => a.id === id);
    }

    displayAchievements(achievements) {
        // ... (implementation as in original)
        if (!Array.isArray(achievements) || achievements.length === 0) return;

        let container = document.querySelector(".achievement-notifications");
        if (!container) {
            container = document.createElement("div");
            container.className = "achievement-notifications";
            document.body.appendChild(container);
        }

        achievements.forEach((achievement, index) => {
            if (!achievement) return; // Guard against undefined achievement
            setTimeout(() => {
                const notification = document.createElement("div");
                notification.className = "achievement-notification";
                notification.innerHTML = `
                    <div class="achievement-icon">
                        <i class="fas ${achievement.icon || 'fa-star'}"></i>
                    </div>
                    <div class="achievement-content">
                        <div class="achievement-header">
                            <span class="achievement-unlocked">Achievement Unlocked!</span>
                            <span class="achievement-name">${achievement.name}</span>
                        </div>
                        <div class="achievement-description">${achievement.description}</div>
                    </div>
                `;
                container.appendChild(notification);
                setTimeout(() => notification.classList.add("show"), 50); // Trigger animation

                setTimeout(() => {
                    notification.classList.remove("show");
                    setTimeout(() => notification.remove(), 500);
                }, 5000); // Auto-hide after 5 seconds
            }, index * 2000); // Stagger notifications
        });
    }

    getProgress() {
        const unlockedCount = this.achievementsUnlocked.length;
        const totalAchievements = this.achievements.length;
        return {
            unlocked: unlockedCount,
            total: totalAchievements,
            percentage: totalAchievements > 0 ? Math.round((unlockedCount / totalAchievements) * 100) : 0,
        };
    }

    showAllAchievements() {
        // ... (implementation as in original)
        const existingModal = document.querySelector(".achievement-list-modal");
        if (existingModal) existingModal.remove();

        const achievementList = document.createElement("div");
        achievementList.className = "achievement-list-modal";
        const progress = this.getProgress();

        achievementList.innerHTML = `
            <div class="achievement-modal-content">
                <div class="achievement-modal-header">
                    <h3>Legendary Achievements</h3>
                    <div class="achievement-progress">
                        <div class="achievement-progress-bar">
                            <div class="achievement-progress-fill" style="width: ${progress.percentage}%"></div>
                        </div>
                        <div class="achievement-progress-text">${progress.unlocked}/${progress.total} (${progress.percentage}%)</div>
                    </div>
                    <button class="achievement-close-btn"><i class="fas fa-times"></i></button>
                </div>
                <div class="achievement-modal-body">
                    ${this.achievements.map(a => `
                        <div class="achievement-item ${a.unlocked ? "unlocked" : "locked"} ${a.secret && !a.unlocked ? "secret" : ""}">
                            <div class="achievement-item-icon">
                                <i class="fas ${a.unlocked ? (a.icon || 'fa-star') : 'fa-lock'}"></i>
                            </div>
                            <div class="achievement-item-content">
                                <div class="achievement-item-name">
                                    ${(a.unlocked || !a.secret) ? a.name : "Secret Achievement"}
                                </div>
                                <div class="achievement-item-description">
                                    ${(a.unlocked || !a.secret) ? a.description : "Keep playing to discover this achievement!"}
                                </div>
                            </div>
                            ${a.unlocked ? '<div class="achievement-unlocked-badge"><i class="fas fa-check"></i></div>' : ""}
                        </div>
                    `).join("")}
                </div>
            </div>
        `;
        document.body.appendChild(achievementList);
        setTimeout(() => achievementList.classList.add("show"), 50);

        const closeModal = () => {
            achievementList.classList.remove("show");
            setTimeout(() => achievementList.remove(), 300);
        };

        achievementList.querySelector(".achievement-close-btn").addEventListener("click", closeModal);
        achievementList.addEventListener("click", (e) => {
            if (e.target === achievementList) {
                closeModal();
            }
        });
    }
}