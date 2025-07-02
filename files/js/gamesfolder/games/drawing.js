// js/games/drawing.js
"use strict";

export function initDrawingGame(showcase, canvas) {
    if (!canvas) return { cleanup: () => {} };
    const ctx = canvas.getContext("2d");
    let isDrawing = false;
    let lastX = 0;
    let lastY = 0;

    // Set initial drawing style
    ctx.strokeStyle = "#e74c3c"; // Default color
    ctx.lineWidth = 5;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";

    // Clear canvas (it might have previous game content)
    ctx.fillStyle = "#fff"; // Set background color
    ctx.fillRect(0, 0, canvas.width, canvas.height);


    const startDrawing = (e) => {
        isDrawing = true;
        [lastX, lastY] = getMousePos(e);
    };

    const stopDrawing = () => {
        isDrawing = false;
    };

    const draw = (e) => {
        if (!isDrawing) return;
        const [x, y] = getMousePos(e);
        ctx.beginPath();
        ctx.moveTo(lastX, lastY);
        ctx.lineTo(x, y);
        ctx.stroke();
        [lastX, lastY] = [x, y];
    };

    const getMousePos = (e) => {
        const rect = canvas.getBoundingClientRect();
        const scaleX = canvas.width / rect.width;
        const scaleY = canvas.height / rect.height;
        const clientX = e.clientX || (e.touches && e.touches[0] ? e.touches[0].clientX : 0);
        const clientY = e.clientY || (e.touches && e.touches[0] ? e.touches[0].clientY : 0);
        return [(clientX - rect.left) * scaleX, (clientY - rect.top) * scaleY];
    };

    // Add event listeners using the showcase's event handler
    showcase.eventHandler.addManagedListener(canvas, "mousedown", startDrawing, "drawing");
    showcase.eventHandler.addManagedListener(canvas, "mouseup", stopDrawing, "drawing");
    showcase.eventHandler.addManagedListener(canvas, "mouseout", stopDrawing, "drawing"); // Stop if mouse leaves canvas
    showcase.eventHandler.addManagedListener(canvas, "mousemove", draw, "drawing");

    // Touch events
    showcase.eventHandler.addManagedListener(canvas, "touchstart", (e) => {
        e.preventDefault(); // Prevent scrolling/default touch actions
        startDrawing(e);
    }, { gameId: "drawing", passive: false });

    showcase.eventHandler.addManagedListener(canvas, "touchend", (e) => {
        e.preventDefault();
        stopDrawing();
    }, { gameId: "drawing", passive: false });

    showcase.eventHandler.addManagedListener(canvas, "touchmove", (e) => {
        e.preventDefault();
        draw(e);
    }, { gameId: "drawing", passive: false });


    // No ongoing animation loop needed for a simple drawing pad.
    // Cleanup will be handled by the showcase's eventHandler.
    return {
        cleanup: () => {
            // Specific cleanup if needed, e.g., removing dynamically added UI elements for color pickers etc.
            // For this basic version, event listeners are the main thing, handled by showcase.
        }
    };
}