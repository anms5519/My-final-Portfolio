// js/games/arkanoid.js
"use strict";
import { initBreakoutGame } from './breakout.js'; // Re-use breakout logic

export function initArkanoidGame(showcase, canvas) {
    console.warn("Arkanoid Lite using Breakout logic for now.");
    // For a true Arkanoid, you'd implement its specific features here (moving bricks, different power-ups)
    // For now, we just call the breakout initializer.
    return initBreakoutGame(showcase, canvas);
}