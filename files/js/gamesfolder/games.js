"use strict";
import { ProjectShowcase } from './html5game-showcase.js';

document.addEventListener("DOMContentLoaded", () => {
    // Preload Font Awesome if not already loaded by UIManager's injectStyles
    // This is more of a fallback or explicit step
    if (!document.querySelector('link[href*="fontawesome"]')) {
        const faPreload = document.createElement("link");
        faPreload.rel = "preload"; // or stylesheet if injectStyles doesn't handle it
        faPreload.href = "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css";
        faPreload.as = "style";
        document.head.appendChild(faPreload);
    }
    
    const showcase = new ProjectShowcase();
    showcase.init();
    window.projectShowcase = showcase; // Expose to global scope if needed for debugging or external calls
});