// js/games/adventure.js
"use strict";

export function initAdventureGame(showcase, container) {
    // This was a placeholder in the original.
    // A real text adventure would require significant logic for parsing commands,
    // managing game state (rooms, items, player inventory), and displaying text.

    // For now, let's just display the placeholder message.
    if (container) {
        container.innerHTML = `
            <div style="padding: 2vh; height: 100%; overflow-y: auto; background: #000; color: #0f0; font-family: monospace; box-sizing: border-box;">
                <p>> Welcome to the Text Adventure Snippet!</p>
                <p>> This is a very basic example.</p>
                <p>> Try typing 'look' or 'help'. (Not implemented yet)</p>
                <p>> The full game logic would go here.</p>
            </div>
        `;
    }
    
    // No ongoing animation loop or complex event listeners for this basic version.
    return {
        cleanup: () => {
            // If any specific cleanup was needed for a more complex version.
            if (container) container.innerHTML = "";
        },
        // Optional:
        // handleCommand: (command) => { /* ... process command ... */ }
    };
}