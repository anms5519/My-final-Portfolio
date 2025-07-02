"use strict";

export const showcaseStyles = `
    .project-showcase {
        position: fixed;
        bottom: 2vh;
        left: 2vh;
        width: clamp(60vh, 75vw, 120vh); 
        height: clamp(50vh, 80vh, 90vh); 
        background: var(--bg-gradient);
        border-radius: 2vh;
        box-shadow: 0 2vh 5vh var(--shadow-color);
        display: flex;
        flex-direction: column;
        overflow: hidden;
        transition: all 0.5s cubic-bezier(0.25, 1, 0.5, 1); 
        z-index: 10000;
        opacity: 0;
        transform: translateY(5vh) scale(0.95);
        pointer-events: none;
        color: var(--text-color);
        --background-dark-1: #151923;
        --background-dark-2: #1d212d;
        --background-light-1: #f5f5f7;
        --background-light-2: #e9eaec;
        --primary-color: #fbcb5b;
        --secondary-color: #e67e22;
        --accent-color: #f39c12;
        --success-color: #2ecc71;
        --warning-color: #f39c12;
        --danger-color: #e74c3c;
        --info-color: #3498db;
        --text-light: #333;
        --text-dark: #f5f5f7;
        --border-light: rgba(0, 0, 0, 0.1);
        --border-dark: rgba(255, 255, 255, 0.1);
        --shadow-color: rgba(0, 0, 0, 0.5);
        --shadow-color-light: rgba(0, 0, 0, 0.1);
        --font-heading: 'Montserrat', 'Arial', sans-serif;
        --bg-gradient: linear-gradient(135deg, var(--background-dark-1), var(--background-dark-2));
        --text-color: var(--text-dark);
        --border-color: var(--border-dark);
        --input-bg: rgba(255, 255, 255, 0.1);
        --sidebar-bg: rgba(15, 18, 25, 0.6);
        --main-bg: rgba(29, 33, 45, 0.8);
        --header-bg: rgba(15, 18, 25, 0.9);
        --footer-bg: rgba(15, 18, 25, 0.9);
        --button-bg: rgba(255, 255, 255, 0.1);
        --button-hover-bg: var(--primary-color);
        --button-hover-text: #333;
        --item-hover-bg: rgba(255, 255, 255, 0.05);
        --active-item-bg: rgba(251, 197, 49, 0.2);
        --scrollbar-thumb: var(--primary-color);
        --scrollbar-track: rgba(255, 255, 255, 0.05);
        --animation-speed: 0.3s;
    }
    .project-showcase.loaded { 
         transform: translateY(2vh) scale(1); 
    }
    .project-showcase.active {
        opacity: 1;
        transform: translateY(0) scale(1);
        pointer-events: all;
    }
    .project-showcase.minimized {
        height: 5.5vh;
        width: 30vh;
        overflow: hidden;
    }
     .project-showcase.minimized .showcase-content,
     .project-showcase.minimized .showcase-footer {
        display: none;
     }
    .project-showcase.fullscreen {
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
        bottom: 0;
        border-radius: 0;
    }
    .project-showcase.light {
        --bg-gradient: linear-gradient(135deg, var(--background-light-1), var(--background-light-2));
        --text-color: var(--text-light);
        --border-color: var(--border-light);
        --input-bg: rgba(0, 0, 0, 0.05);
        --sidebar-bg: rgba(255, 255, 255, 0.6);
        --main-bg: rgba(255, 255, 255, 0.8);
        --header-bg: rgba(255, 255, 255, 0.9);
        --footer-bg: rgba(255, 255, 255, 0.9);
        --button-bg: rgba(0, 0, 0, 0.08);
        --button-hover-bg: var(--primary-color);
        --button-hover-text: #fff;
        --item-hover-bg: rgba(0, 0, 0, 0.03);
        --active-item-bg: rgba(251, 197, 49, 0.2);
        --scrollbar-thumb: var(--secondary-color);
        --scrollbar-track: rgba(0, 0, 0, 0.1);
        color: var(--text-color);
    }
     .project-showcase.light .project-search::placeholder { color: #888; }
     .project-showcase.light .project-item-category { color: #555; }
     .project-showcase.light .project-description { color: #444; }
     .project-showcase.light .instructions-text { color: #444; }
     .project-showcase.light .project-stats { color: #555; }
     .project-showcase.light .showcase-controls button { color: #555; }
     .project-showcase.light .showcase-controls button:hover { color: var(--primary-color); }
     .project-showcase.light .category-btn { background: rgba(0,0,0,0.06); color: #333; }
     .project-showcase.light .category-btn.active, .project-showcase.light .category-btn:hover { background: var(--primary-color); color: #fff; }
     .project-showcase.light .random-game-btn { background: var(--primary-color); color: #fff; }
     .project-showcase.light .random-game-btn:hover { background: var(--secondary-color); }
     .project-showcase.light .project-item-icon { color: #fff; } 
     .project-showcase.light .loading-indicator { color: var(--text-light); }
    .showcase-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 1.2vh 2.4vh;
        background: var(--header-bg);
        border-bottom: .1vh solid var(--border-color);
        backdrop-filter: blur(1vh);
        flex-shrink: 0;
    }
    .showcase-header h3 {
        margin: 0;
        font-family: var(--font-heading);
        font-size: 1.6rem; 
        font-weight: 700;
        text-transform: uppercase;
        letter-spacing: 1..5vh;
        display: flex;
        align-items: center;
        gap: 1.2vh;
        color: var(--primary-color); 
    }
    .showcase-header h3 i {
         font-size: 1.8rem; 
    }
    .showcase-controls button {
        background: none;
        border: none;
        color: var(--text-color);
        font-size: 1.3rem; 
        margin-left: 1.5vh;
        cursor: pointer;
        transition: transform 0.2s ease, color 0.2s ease;
        padding: .5vh;
    }
    .showcase-controls button:hover {
        transform: scale(1.25) rotate(5deg);
        color: var(--primary-color);
    }
    .showcase-content {
        display: flex;
        flex: 1;
        overflow: hidden; 
    }
    .showcase-sidebar {
        width: 30vh; 
        background: var(--sidebar-bg);
        border-right: .1vh solid var(--border-color);
        display: flex;
        flex-direction: column;
        padding: 0; 
        flex-shrink: 0;
        transition: background 0.3s ease;
    }
    .search-container {
        padding: 2vh 2vh 1.5vh 2vh;
        border-bottom: .1vh solid var(--border-color);
        position: relative;
    }
    .search-icon {
        position: absolute;
        left: 3.5vh;
        top: 50%;
        transform: translateY(-35%); 
        color: #aaa;
        font-size: 0.9rem;
    }
    .project-search {
        width: 100%;
        padding: 1.2vh 1.5vh 1.2vh 4vh; 
        border: none;
        border-radius: 3vh;
        font-size: 1rem;
        font-family: var(--font-main);
        outline: none;
        background: var(--input-bg);
        color: var(--text-color);
        transition: background 0.3s ease, box-shadow 0.3s ease;
    }
    .project-search:focus {
        background: rgba(255, 255, 255, 0.15);
        box-shadow: 0 0 0 .2vh var(--primary-color);
    }
    .project-search::placeholder {
        color: #aaa;
        font-style: italic;
    }
    .category-filters {
        padding: 1.5vh 2vh;
        display: flex;
        flex-wrap: wrap;
        gap: .8vh;
        border-bottom: .1vh solid var(--border-color);
    }
    .category-btn {
        background: var(--button-bg);
        border: .1vh solid transparent;
        border-radius: 2vh;
        padding: .6vh 1.4vh;
        font-size: 0.85rem;
        font-weight: 500;
        color: var(--text-color);
        cursor: pointer;
        transition: all 0.2s ease;
    }
    .category-btn.active, .category-btn:hover {
        background: var(--primary-color);
        color: var(--button-hover-text);
        transform: translateY(-.2vh);
        box-shadow: 0 .4vh .8vh rgba(0,0,0,0.2);
        border-color: var(--primary-color);
    }
    .project-list-wrapper {
        flex: 1;
        overflow: hidden; 
        position: relative;
    }
    .project-list {
        height: 100%;
        overflow-y: auto;
        padding: 1vh 0;
        scrollbar-width: thin;
        scrollbar-color: var(--scrollbar-thumb) var(--scrollbar-track);
    }
    .project-list::-webkit-scrollbar { width: .8vh; }
    .project-list::-webkit-scrollbar-track { background: var(--scrollbar-track); border-radius: .4vh; }
    .project-list::-webkit-scrollbar-thumb { background-color: var(--scrollbar-thumb); border-radius: .4vh; border: .2vh solid var(--scrollbar-track); }
    .project-item {
        padding: 1.2vh 2vh;
        border-bottom: .1vh solid var(--border-color);
        cursor: pointer;
        display: flex;
        align-items: center;
        transition: background 0.2s ease, border-left-color 0.3s ease;
        border-left: .4vh solid transparent;
        gap: 1.5vh;
    }
    .project-item:last-child {
        border-bottom: none;
    }
    .project-item:hover {
        background: var(--item-hover-bg);
        border-left-color: var(--accent-color);
    }
    .project-item.active {
        background: var(--active-item-bg);
        border-left-color: var(--primary-color);
        font-weight: 600;
    }
    .project-item-icon {
        width: 4.5vh;
        height: 4.5vh;
        border-radius: 1vh;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-shrink: 0;
        font-size: 1.5rem;
        color: #fff; 
        transition: transform 0.3s ease;
    }
    .project-item:hover .project-item-icon {
        transform: scale(1.1) rotate(-5deg);
    }
    .project-item-text {
        flex: 1;
        overflow: hidden; 
    }
    .project-item-name {
        font-weight: 600;
        font-size: 1.05rem;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }
    .project-item-category {
        font-size: 0.8rem;
        color: #bbb;
        text-transform: capitalize;
    }
    .showcase-main {
        flex: 1;
        display: flex;
        flex-direction: column;
        padding: 2.4vh;
        background: var(--main-bg);
        overflow: hidden; 
        transition: background 0.3s ease;
    }
    .project-view {
        flex: 1;
        display: flex;
        flex-direction: column;
        overflow: hidden; 
        gap: 1.6vh; 
    }
    .project-preview-wrapper {
        flex: 1; 
        min-height: 20vh; 
        display: flex; 
        align-items: center;
        justify-content: center;
        position: relative; 
    }
    .project-preview {
        width: 100%;
        height: 100%;
        background: #000;
        border-radius: 1.2vh;
        display: flex;
        align-items: center;
        justify-content: center;
        box-shadow: 0 1vh 3vh rgba(0,0,0,0.3);
        overflow: hidden; 
        position: relative; 
    }
    .project-preview canvas {
        display: block;
        max-width: 100%;
        max-height: 100%;
        object-fit: contain; 
        border-radius: 1vh; 
        transition: opacity 0.3s ease;
        opacity: 1;
    }
     .project-preview canvas.loading {
        opacity: 0.5;
     }
    .loading-indicator {
        position: absolute;
        top: 0; left: 0; right: 0; bottom: 0;
        background: rgba(0, 0, 0, 0.7);
        color: var(--primary-color);
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        font-size: 1.2rem;
        border-radius: 1.2vh;
        z-index: 10;
        opacity: 0;
        transition: opacity 0.3s ease;
        pointer-events: none; 
    }
    .loading-indicator.visible {
        opacity: 1;
        pointer-events: all;
    }
    .loading-indicator i {
        font-size: 2.5rem;
        margin-bottom: 1.5vh;
    }
    .project-info {
        padding: 1.6vh;
        background: rgba(0,0,0,0.2);
        border-radius: 1vh;
        display: grid; 
        grid-template-columns: 1fr auto; 
        grid-template-rows: auto auto auto; 
        gap: .8vh 1.6vh; 
        align-items: center;
    }
    .project-info h4 { 
        grid-column: 1 / 2;
        grid-row: 1 / 2;
        margin: 0;
        font-family: var(--font-heading);
        font-size: 1.5rem;
        font-weight: 600;
        color: var(--primary-color);
    }
    .project-description { 
        grid-column: 1 / 3; 
        grid-row: 2 / 3;
        margin: 0;
        font-size: 0.95rem;
        color: #ccc;
        line-height: 1.5;
    }
    .project-stats-display { 
        grid-column: 1 / 2;
        grid-row: 3 / 4;
        font-size: 0.9rem;
        color: #bbb;
        font-weight: 500;
    }
    .project-controls { 
        grid-column: 2 / 3;
        grid-row: 1 / 4; 
        display: flex;
        gap: 1.2vh;
        justify-content: flex-end;
        align-items: center;
    }
    .project-controls button {
        background: var(--button-bg);
        border: none;
        border-radius: 50%;
        width: 4.2vh;
        height: 4.2vh;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 1.2rem;
        color: var(--text-color);
        cursor: pointer;
        transition: all 0.2s ease;
    }
    .project-controls button:hover {
        transform: scale(1.15);
        background: var(--button-hover-bg);
        color: var(--button-hover-text);
        box-shadow: 0 .5vh 1vh rgba(0,0,0,0.3);
    }
    .game-instructions {
        padding: 1.6vh;
        background: rgba(0, 0, 0, 0.2);
        border-radius: 1vh;
        margin-top: 0; 
    }
    .game-instructions h5 {
        margin: 0 0 1vh;
        font-size: 1.1rem;
        font-weight: 600;
        color: var(--accent-color); 
        display: flex;
        align-items: center;
        gap: .8vh;
    }
    .game-instructions p {
        margin: 0;
        font-size: 0.9rem;
        color: #ccc;
        line-height: 1.6;
    }
    .achievement-notifications {
        position: fixed;
        top: 2vh;
        right: 2vh;
        width: 30vh;
        max-width: 80vw;
        z-index: 10001;
        pointer-events: none;
    }
    .achievement-notification {
        display: flex;
        background: linear-gradient(135deg, rgba(30, 30, 40, 0.9), rgba(20, 20, 30, 0.95));
        border-radius: 1.2vh;
        padding: 1.5vh;
        margin-bottom: 1vh;
        box-shadow: 0 1vh 2.5vh rgba(0, 0, 0, 0.6), 0 0 1.5vh rgba(251, 203, 91, 0.3);
        border: .1vh solid rgba(251, 203, 91, 0.5);
        transform: translateX(100%) scale(0.8);
        opacity: 0;
        transition: transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275), 
                    opacity 0.4s ease;
        overflow: hidden;
    }
    .achievement-notification::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        width: .5vh;
        height: 100%;
        background: linear-gradient(to bottom, var(--primary-color), var(--secondary-color));
    }
    .achievement-notification.show {
        transform: translateX(0) scale(1);
        opacity: 1;
    }
    .achievement-icon {
        width: 5vh;
        height: 5vh;
        background: linear-gradient(135deg, var(--primary-color), var(--secondary-color));
        border-radius: 1vh;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 2.4vh;
        color: #fff;
        margin-right: 1.5vh;
        flex-shrink: 0;
        box-shadow: 0 .5vh 1vh rgba(0, 0, 0, 0.3);
        position: relative;
        overflow: hidden;
    }
    .achievement-icon::after {
        content: '';
        position: absolute;
        top: -50%;
        left: -50%;
        width: 200%;
        height: 200%;
        background: linear-gradient(transparent, rgba(255, 255, 255, 0.2), transparent);
        transform: rotate(45deg);
        animation: shine 2s ease-in-out infinite;
    }
    .achievement-content {
        flex: 1;
    }
    .achievement-header {
        margin-bottom: .5vh;
    }
    .achievement-unlocked {
        display: block;
        font-size: 0.75rem;
        color: var(--primary-color);
        font-weight: bold;
        text-transform: uppercase;
        letter-spacing: .1vh;
        margin-bottom: .2vh;
    }
    .achievement-name {
        display: block;
        font-size: 1.1rem;
        color: #fff;
        font-weight: bold;
        margin-bottom: .5vh;
    }
    .achievement-description {
        font-size: 0.85rem;
        color: #bbb;
    }
    @keyframes shine {
        0% { transform: translateX(-100%) rotate(45deg); }
        100% { transform: translateX(100%) rotate(45deg); }
    }
    .achievement-list-modal {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.8);
        z-index: 10100;
        display: flex;
        align-items: center;
        justify-content: center;
        opacity: 0;
        transition: opacity 0.3s ease;
        backdrop-filter: blur(.5vh);
    }
    .achievement-list-modal.show {
        opacity: 1;
    }
    .achievement-modal-content {
        width: 60vh;
        max-width: 90vw;
        max-height: 80vh;
        background: linear-gradient(135deg, var(--background-dark-1), var(--background-dark-2));
        border-radius: 1.5vh;
        box-shadow: 0 2vh 5vh rgba(0, 0, 0, 0.5);
        display: flex;
        flex-direction: column;
        overflow: hidden;
        border: .1vh solid var(--border-color);
    }
    .achievement-modal-header {
        padding: 2vh;
        background: rgba(0, 0, 0, 0.3);
        border-bottom: .1vh solid var(--border-color);
        display: flex;
        flex-direction: column;
        gap: 1.5vh;
        position: relative;
    }
    .achievement-modal-header h3 {
        margin: 0;
        color: var(--primary-color);
        font-size: 1.5rem;
        display: flex;
        align-items: center;
        gap: 1vh;
    }
    .achievement-modal-header h3::before {
        content: '🏆';
        font-size: 1.5rem;
    }
    .achievement-close-btn {
        position: absolute;
        top: 1.5vh;
        right: 1.5vh;
        width: 3vh;
        height: 3vh;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.1);
        border: none;
        color: #fff;
        font-size: 1.4vh;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        transition: all 0.2s ease;
    }
    .achievement-close-btn:hover {
        background: rgba(255, 255, 255, 0.2);
        transform: scale(1.1);
    }
    .achievement-progress {
        display: flex;
        flex-direction: column;
        gap: .5vh;
    }
    .achievement-progress-bar {
        height: 1vh;
        background: rgba(0, 0, 0, 0.2);
        border-radius: .5vh;
        overflow: hidden;
    }
    .achievement-progress-fill {
        height: 100%;
        background: linear-gradient(to right, var(--primary-color), var(--secondary-color));
        border-radius: .5vh;
        transition: width 0.5s ease;
    }
    .achievement-progress-text {
        font-size: 0.8rem;
        color: #bbb;
        text-align: right;
    }
    .achievement-modal-body {
        flex: 1;
        overflow-y: auto;
        padding: 2vh;
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(25vh, 1fr));
        gap: 1.5vh;
    }
    .achievement-item {
        background: rgba(255, 255, 255, 0.05);
        border-radius: 1vh;
        padding: 1.5vh;
        display: flex;
        align-items: center;
        gap: 1.5vh;
        transition: all 0.2s ease;
        position: relative;
        overflow: hidden;
    }
    .achievement-item:hover {
        transform: translateY(-.3vh);
        box-shadow: 0 1vh 2vh rgba(0, 0, 0, 0.2);
    }
    .achievement-item.unlocked {
        background: linear-gradient(135deg, rgba(251, 203, 91, 0.1), rgba(230, 126, 34, 0.1));
        border: .1vh solid rgba(251, 203, 91, 0.3);
    }
    .achievement-item.secret {
        background: rgba(0, 0, 0, 0.2);
        border: .1vh dashed rgba(255, 255, 255, 0.1);
    }
    .achievement-item-icon {
        width: 4vh;
        height: 4vh;
        background: rgba(0, 0, 0, 0.2);
        border-radius: .8vh;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 1.8vh;
        color: #aaa;
        flex-shrink: 0;
    }
    .achievement-item.unlocked .achievement-item-icon {
        background: linear-gradient(135deg, var(--primary-color), var(--secondary-color));
        color: #fff;
    }
    .achievement-item-content {
        flex: 1;
    }
    .achievement-item-name {
        font-size: 1rem;
        color: #fff;
        font-weight: bold;
        margin-bottom: .5vh;
    }
    .achievement-item-description {
        font-size: 0.8rem;
        color: #bbb;
    }
    .achievement-unlocked-badge {
        position: absolute;
        top: 1vh;
        right: 1vh;
        width: 2vh;
        height: 2vh;
        background: var(--success-color);
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 1vh;
        color: #fff;
    }
    .star-burst-container {
        z-index: 10000;
    }
    .burst-star {
        position: absolute;
        color: var(--primary-color);
        animation: burstStar 1.5s forwards;
        opacity: 0;
    }
    @keyframes burstStar {
        0% {
            transform: translate(-50%, -50%) rotate(0deg) scale(0.5);
            opacity: 1;
        }
        100% {
            transform: 
                translate(
                    calc(-50% + (cos(var(--angle)) * var(--distance))), 
                    calc(-50% + (sin(var(--angle)) * var(--distance)))
                )
                rotate(360deg) 
                scale(0);
            opacity: 0;
        }
    }
    .game-overlay {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.7);
        display: flex;
        align-items: center;
        justify-content: center;
        opacity: 0;
        pointer-events: none;
        transition: opacity 0.3s ease;
        backdrop-filter: blur(.5vh);
        z-index: 1000;
    }
    .game-overlay.visible {
        opacity: 1;
        pointer-events: all;
    }
    .game-pause-menu {
        background: linear-gradient(135deg, var(--background-dark-1), var(--background-dark-2));
        border-radius: 1.5vh;
        padding: 3vh;
        width: 30vh;
        max-width: 80%;
        box-shadow: 0 2vh 5vh rgba(0, 0, 0, 0.5);
        text-align: center;
        border: .1vh solid var(--border-color);
        transform: scale(0.9);
        transition: transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    }
    .game-overlay.visible .game-pause-menu {
        transform: scale(1);
    }
    .game-pause-menu h4 {
        margin: 0 0 2vh 0;
        color: var(--primary-color);
        font-size: 1.5rem;
    }
    .pause-menu-buttons {
        display: flex;
        flex-direction: column;
        gap: 1vh;
    }
    .pause-menu-buttons button {
        background: rgba(255, 255, 255, 0.1);
        border: none;
        border-radius: 3vh;
        padding: 1.2vh 2vh;
        color: #fff;
        font-size: 1rem;
        cursor: pointer;
        transition: all 0.2s ease;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 1vh;
    }
    .pause-menu-buttons button:hover {
        background: var(--primary-color);
        transform: translateY(-.2vh);
    }
    .pause-menu-buttons .resume-btn {
        background: var(--primary-color);
    }
    .pause-menu-buttons .resume-btn:hover {
        background: var(--secondary-color);
    }
    .pause-menu-buttons .exit-btn {
        background: rgba(244, 67, 54, 0.2);
    }
    .pause-menu-buttons .exit-btn:hover {
        background: var(--danger-color);
    }
    .game-tab-controls {
        display: flex;
        padding: 1vh 1.5vh;
        gap: .5vh;
        border-bottom: .1vh solid var(--border-color);
        background: rgba(0, 0, 0, 0.2);
    }
    .game-tab-btn {
        flex: 1;
        background: rgba(255, 255, 255, 0.05);
        border: none;
        padding: .8vh 1vh;
        border-radius: .5vh;
        color: #bbb;
        font-size: 0.85rem;
        cursor: pointer;
        transition: all 0.2s ease;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: .5vh;
    }
    .game-tab-btn:hover {
        background: rgba(255, 255, 255, 0.1);
        color: #fff;
    }
    .game-tab-btn.active {
        background: var(--primary-color);
        color: var(--button-hover-text);
    }
    .no-items-message {
        padding: 3vh;
        text-align: center;
        color: #aaa;
        font-size: 0.9rem;
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 1.5vh;
    }
    .no-items-message i {
        font-size: 2rem;
        color: var(--primary-color);
        opacity: 0.5;
    }
    .showcase-sidebar-footer {
        padding: 1vh 1.5vh;
        border-top: .1vh solid var(--border-color);
        background: rgba(0, 0, 0, 0.2);
    }
    .gamepad-status {
        display: flex;
        align-items: center;
        gap: .8vh;
        color: #777;
        font-size: 0.8rem;
        transition: all 0.2s ease;
    }
    .gamepad-status.connected {
        color: var(--success-color);
    }
    .gamepad-text {
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }
    .loading-spinner {
        width: 4vh;
        height: 4vh;
        border: .4vh solid rgba(255, 255, 255, 0.1);
        border-radius: 50%;
        border-top-color: var(--primary-color);
        animation: spin 1s ease-in-out infinite;
        margin-bottom: 1vh;
    }
    @keyframes spin {
        to { transform: rotate(360deg); }
    }
    .particle-canvas {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: 1;
    }
    .showcase-footer {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 1.2vh 2.4vh;
        background: var(--footer-bg);
        border-top: .1vh solid var(--border-color);
        backdrop-filter: blur(1vh);
        flex-shrink: 0;
    }
    .project-stats {
        font-size: 0.85rem;
        color: #bbb;
    }
    .footer-separator {
        margin: 0 1vh;
        opacity: 0.5;
    }
    .random-game-btn {
        background: var(--primary-color);
        color: var(--button-hover-text);
        border: none;
        border-radius: 3vh;
        padding: 1vh 2vh;
        font-size: 0.95rem;
        font-weight: 600;
        cursor: pointer;
        transition: transform 0.2s ease, box-shadow 0.2s ease, background-color 0.2s ease;
        display: flex;
        align-items: center;
        gap: .8vh;
    }
    .random-game-btn:hover {
        transform: translateY(-.3vh) scale(1.03);
        box-shadow: 0 .8vh 1.5vh rgba(0,0,0,0.3);
        background-color: var(--secondary-color); 
    }
    .showcase-trigger {
        position: fixed;
        bottom: 3vh;
        left: 3vh;
        background: linear-gradient(135deg, var(--primary-color), var(--secondary-color));
        color: #fff;
        border: none;
        border-radius: 5vh;
        padding: 1.6vh 3.2vh;
        font-size: 1.1rem;
        font-weight: 600;
        font-family: var(--font-heading);
        box-shadow: 0 1vh 2.5vh rgba(0,0,0,0.3);
        cursor: pointer;
        transition: transform 0.2s ease, box-shadow 0.2s ease;
        z-index: 9999; 
        display: flex;
        align-items: center;
        gap: 1vh;
    }
    .showcase-trigger:hover {
        transform: translateY(-.5vh) scale(1.05);
        box-shadow: 0 1.2vh 3vh rgba(0,0,0,0.4);
    }
    .showcase-trigger i {
        font-size: 1.3rem;
    }
     .project-preview:-webkit-full-screen { 
        background-color: #000;
        width: 100%;
        height: 100%;
     }
     .project-preview:-moz-full-screen {
        background-color: #000;
        width: 100%;
        height: 100%;
     }
     .project-preview:-ms-fullscreen {
        background-color: #000;
        width: 100%;
        height: 100%;
     }
     .project-preview:fullscreen {
        background-color: #000; 
        width: 100%;
        height: 100%;
        padding: 0; 
        border-radius: 0; 
        display: flex;
        align-items: center;
        justify-content: center;
     }
     .project-preview:fullscreen canvas {
        max-width: 100vw;
        max-height: 100vh;
        object-fit: contain;
        border-radius: 0;
     }
    .hidden { display: none !important; }
    .fas { font-family: 'Font Awesome 5 Free' !important; font-weight: 900; }
`;