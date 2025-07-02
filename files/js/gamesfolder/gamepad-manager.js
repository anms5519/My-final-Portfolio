"use strict";
import { $, $$, requestAnimFrame } from './utils.js';

export class GamepadManager {
    constructor(showcaseInstance) {
        this.showcase = showcaseInstance;
        this.gamepadSupportEnabled = false;
        this.activeGamepad = null;
        this.gamepadLoopRunning = false;
        this.lastButtonState = {};
    }

    init() {
        this.gamepadSupportEnabled = "getGamepads" in navigator;
        if (!this.gamepadSupportEnabled) {
            const gamepadText = $(".gamepad-text", this.showcase.container);
            if (gamepadText) gamepadText.textContent = "Gamepad API not supported";
            return;
        }

        const gamepadText = $(".gamepad-text", this.showcase.container);
        if (gamepadText) gamepadText.textContent = "Waiting for gamepad...";

        // Event listeners for gamepad connection/disconnection are added by EventHandler
        this.pollGamepads();
    }

    pollGamepads() {
        if (!this.gamepadSupportEnabled) return;
        const gamepads = navigator.getGamepads ? navigator.getGamepads() : [];
        for (let i = 0; i < gamepads.length; i++) {
            if (gamepads[i]) {
                this.handleConnected(gamepads[i]);
                break; // Connect to the first available gamepad
            }
        }
        // Keep polling if no gamepad is active, or rely on events if supported
        if (this.activeGamepad === null) {
             setTimeout(() => this.pollGamepads(), 5000);
        }
    }

    handleConnected(gamepad) {
        if (!this.showcase.container) return;
        const gamepadText = $(".gamepad-text", this.showcase.container);
        if (gamepadText) {
            gamepadText.textContent = `${gamepad.id.split("(")[0]} Connected`;
            const statusEl = $(".gamepad-status", this.showcase.container);
            if (statusEl) statusEl.classList.add("connected");
        }
        this.activeGamepad = gamepad.index;
        if (!this.gamepadLoopRunning) {
            this.gamepadLoopRunning = true;
            this.loop();
        }
    }

    handleDisconnected(gamepad) {
        if (!this.showcase.container) return;
        const gamepadText = $(".gamepad-text", this.showcase.container);
        if (gamepadText) {
            gamepadText.textContent = "No gamepad detected";
             const statusEl = $(".gamepad-status", this.showcase.container);
            if (statusEl) statusEl.classList.remove("connected");
        }
        if (this.activeGamepad === gamepad.index) {
            this.activeGamepad = null;
            this.gamepadLoopRunning = false;
        }
    }

    loop() {
        if (this.activeGamepad === null || !this.gamepadLoopRunning) {
            this.gamepadLoopRunning = false;
            return;
        }

        const gamepads = navigator.getGamepads ? navigator.getGamepads() : [];
        const gamepad = gamepads[this.activeGamepad];

        if (!gamepad) {
            this.gamepadLoopRunning = false;
            return;
        }

        // A (Cross/Bottom face button)
        if (gamepad.buttons[0].pressed && !this.lastButtonState?.a) {
            const selectedItem = $(".project-item.selected", this.showcase.container);
            if (selectedItem) {
                this.showcase.loadProject(selectedItem.dataset.id);
            }
        }
        // B (Circle/Right face button)
        if (gamepad.buttons[1].pressed && !this.lastButtonState?.b) {
            if (this.showcase.currentProject) {
                this.showcase.loadProject(null); // Exit current game view
            } else {
                this.showcase.hide();
            }
        }

        const dpadUpPressed = gamepad.buttons[12].pressed && !this.lastButtonState?.dpadUp;
        const dpadDownPressed = gamepad.buttons[13].pressed && !this.lastButtonState?.dpadDown;
        const dpadLeftPressed = gamepad.buttons[14].pressed && !this.lastButtonState?.dpadLeft;
        const dpadRightPressed = gamepad.buttons[15].pressed && !this.lastButtonState?.dpadRight;

        if (dpadUpPressed || dpadDownPressed || dpadLeftPressed || dpadRightPressed) {
            this.navigateGameList(dpadUpPressed, dpadDownPressed, dpadLeftPressed, dpadRightPressed);
        }

        this.lastButtonState = {
            a: gamepad.buttons[0].pressed,
            b: gamepad.buttons[1].pressed,
            dpadUp: gamepad.buttons[12].pressed,
            dpadDown: gamepad.buttons[13].pressed,
            dpadLeft: gamepad.buttons[14].pressed,
            dpadRight: gamepad.buttons[15].pressed,
        };

        requestAnimFrame(() => this.loop());
    }

    navigateGameList(up, down, left, right) {
        if (!this.showcase.container) return;
        const gameItems = $$(".project-item:not(.hidden)", this.showcase.container);
        if (!gameItems.length) return;

        let selectedItem = $(".project-item.selected", this.showcase.container);
        let currentIndex = selectedItem ? Array.from(gameItems).indexOf(selectedItem) : -1;
        let newIndex = currentIndex === -1 ? 0 : currentIndex;


        if (up) newIndex = Math.max(0, currentIndex - 1);
        else if (down) newIndex = Math.min(gameItems.length - 1, currentIndex + 1);
        // Example: Treat left/right as page up/down for simplicity or implement column navigation
        else if (right) newIndex = Math.min(gameItems.length - 1, currentIndex + 3); 
        else if (left) newIndex = Math.max(0, currentIndex - 3);
        
        if (currentIndex !== -1) gameItems[currentIndex].classList.remove("selected");
        gameItems[newIndex].classList.add("selected");
        gameItems[newIndex].scrollIntoView({ behavior: "smooth", block: "nearest" });
        this.showcase.soundManager.playSound("navigate");
    }
}