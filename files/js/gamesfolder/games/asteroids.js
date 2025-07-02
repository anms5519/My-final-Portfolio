// js/games/asteroids.js
"use strict";
import { requestAnimFrame } from '../utils.js';

export function initAsteroidsGame(showcase, canvas) {
    if (!canvas) return null;
    const ctx = canvas.getContext("2d");
    let animationFrameId;
    const ship = { x: canvas.width / 2, y: canvas.height / 2, radius: 15, angle: 0, rotation: 0, thrusting: false, thrust: { x: 0, y: 0 }, lives: 3, invincible: false, invincibleTimer: 0 };
    const bullets = [];
    const asteroids = [];
    const debris = [];
    const shipTurnSpeed = 0.08;
    const shipThrust = 0.1;
    const friction = 0.99;
    const bulletSpeed = 5;
    const asteroidNum = 5;
    const asteroidSpeed = 1;
    const asteroidVertices = 10;
    const asteroidJag = 0.4;
    let score = 0;
    let gameOver = false;

    function createAsteroids(count, initialSize = 60) { /* ... as in original ... */ 
        for (let i = 0; i < count; i++) {
            let x, y;
            do {
                x = Math.random() * canvas.width;
                y = Math.random() * canvas.height;
            } while (distBetweenPoints(ship.x, ship.y, x, y) < initialSize * 2 + ship.radius);
            asteroids.push(newAsteroid(x, y, initialSize));
        }
    }
    function newAsteroid(x, y, radius) { /* ... as in original ... */ 
        const lvlMult = 1 + (0.1 * score) / 1000; // Difficulty scaling
        const angle = Math.random() * Math.PI * 2;
        const vert = Math.floor(Math.random() * (asteroidVertices + 1) + asteroidVertices / 2);
        const offs = [];
        for (let i = 0; i < vert; i++) {
            offs.push(Math.random() * asteroidJag * 2 + 1 - asteroidJag);
        }
        return {
            x: x, y: y, radius: radius, angle: Math.random() * Math.PI * 2,
            vel: {
                x: Math.random() * asteroidSpeed * lvlMult * (Math.random() < 0.5 ? 1 : -1),
                y: Math.random() * asteroidSpeed * lvlMult * (Math.random() < 0.5 ? 1 : -1)
            },
            vert: vert, offs: offs
        };
    }
    function distBetweenPoints(x1, y1, x2, y2) { /* ... as in original ... */ 
        return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
    }
    function drawShip() { /* ... as in original ... */ 
        if (ship.invincible && Math.floor(Date.now() / 150) % 2 === 0) {
            return; // Blinking effect
        }
        ctx.strokeStyle = "white";
        ctx.lineWidth = ship.radius / 15;
        ctx.beginPath();
        ctx.moveTo( // Nose of the ship
            ship.x + ship.radius * Math.cos(ship.angle),
            ship.y - ship.radius * Math.sin(ship.angle) // Y is inverted in canvas
        );
        ctx.lineTo( // Rear left
            ship.x - ship.radius * (Math.cos(ship.angle) + Math.sin(ship.angle)),
            ship.y + ship.radius * (Math.sin(ship.angle) - Math.cos(ship.angle))
        );
        ctx.lineTo( // Rear right
            ship.x - ship.radius * (Math.cos(ship.angle) - Math.sin(ship.angle)),
            ship.y + ship.radius * (Math.sin(ship.angle) + Math.cos(ship.angle))
        );
        ctx.closePath();
        ctx.stroke();

        // Draw thrust flame
        if (ship.thrusting && !gameOver) {
            ctx.fillStyle = "red";
            ctx.strokeStyle = "yellow";
            ctx.lineWidth = ship.radius / 20;
            ctx.beginPath();
            ctx.moveTo( // Rear center
                ship.x - ship.radius * (1.1 * Math.cos(ship.angle) + 0.0 * Math.sin(ship.angle)), // Adjusted for flame position
                ship.y + ship.radius * (1.1 * Math.sin(ship.angle) - 0.0 * Math.cos(ship.angle))
            );
            ctx.lineTo( // Flame tip
                ship.x - ship.radius * 1.8 * Math.cos(ship.angle),
                ship.y + ship.radius * 1.8 * Math.sin(ship.angle)
            );
            ctx.lineTo( // Rear center (other side of flame)
                ship.x - ship.radius * (1.1 * Math.cos(ship.angle) - 0.0 * Math.sin(ship.angle)), // Adjusted for flame position
                ship.y + ship.radius * (1.1 * Math.sin(ship.angle) + 0.0 * Math.cos(ship.angle))
            );
            ctx.closePath();
            ctx.fill();
            ctx.stroke();
        }
    }
    function drawBullets() { /* ... as in original ... */ 
        ctx.fillStyle = "lime";
        bullets.forEach(bullet => {
            ctx.beginPath();
            ctx.arc(bullet.x, bullet.y, ship.radius / 8, 0, Math.PI * 2);
            ctx.fill();
        });
    }
    function drawAsteroids() { /* ... as in original ... */ 
        ctx.strokeStyle = "slategrey";
        ctx.lineWidth = ship.radius / 15;
        asteroids.forEach(a => {
            ctx.beginPath();
            ctx.moveTo(
                a.x + a.radius * a.offs[0] * Math.cos(a.angle),
                a.y + a.radius * a.offs[0] * Math.sin(a.angle)
            );
            for (let i = 1; i < a.vert; i++) {
                ctx.lineTo(
                    a.x + a.radius * a.offs[i] * Math.cos(a.angle + i * Math.PI * 2 / a.vert),
                    a.y + a.radius * a.offs[i] * Math.sin(a.angle + i * Math.PI * 2 / a.vert)
                );
            }
            ctx.closePath();
            ctx.stroke();
        });
    }
    function drawDebris() { /* ... as in original ... */ 
        ctx.fillStyle = "darkgrey";
        debris.forEach(d => {
            ctx.fillRect(d.x - 1, d.y - 1, 3, 3);
        });
    }
    function drawUI() { /* ... as in original ... */ 
        ctx.fillStyle = "#fff";
        ctx.font = "1.8vh var(--font-main)";
        ctx.textAlign = "left";
        ctx.fillText(`Score: ${score}`, 10, 25);
        ctx.textAlign = "right";
        ctx.fillText(`Lives: ${ship.lives}`, canvas.width - 10, 25);

        if (gameOver) {
            ctx.fillStyle = "rgba(0, 0, 0, 0.7)";
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            ctx.font = "4vh var(--font-heading)"; ctx.fillStyle = "red"; ctx.textAlign = "center";
            ctx.fillText("GAME OVER", canvas.width / 2, canvas.height / 2 - 20);
            ctx.font = "2vh var(--font-main)"; ctx.fillStyle = "white";
            ctx.fillText(`Final Score: ${score}`, canvas.width / 2, canvas.height / 2 + 20);
            ctx.fillText("Click Restart", canvas.width / 2, canvas.height / 2 + 50);
        }
    }

    function explodeShip() {
        // ... (same as original, use showcase.soundManager)
        ship.lives--;
        showcase.soundManager.playSound("explosion");
        for (let i = 0; i < 20; i++) { // Create debris
            debris.push({
                x: ship.x, y: ship.y,
                vel: { x: Math.random() * 10 - 5, y: Math.random() * 10 - 5 },
                life: 60 // Frames
            });
        }
        if (ship.lives <= 0) {
            gameOver = true;
            showcase.soundManager.playSound("gameOver");
        } else {
            // Reset ship position and make invincible
            ship.x = canvas.width / 2;
            ship.y = canvas.height / 2;
            ship.thrust = { x: 0, y: 0 };
            ship.angle = 0;
            ship.invincible = true;
            ship.invincibleTimer = 180; // 3 seconds at 60fps
        }
    }

    function destroyAsteroid(index) {
        // ... (same as original, use showcase.soundManager and showcase.updateScore)
        const a = asteroids[index];
        showcase.soundManager.playSound("explosion");

        if (a.radius > 40) score += 20;
        else if (a.radius > 20) score += 50;
        else score += 100;
        showcase.updateScore(score);

        for (let i = 0; i < a.radius / 2; i++) { // Create debris
            debris.push({
                x: a.x, y: a.y,
                vel: { x: Math.random() * 4 - 2, y: Math.random() * 4 - 2 },
                life: 45
            });
        }

        if (a.radius > 15) { // Break into smaller asteroids
            asteroids.push(newAsteroid(a.x, a.y, a.radius / 2));
            asteroids.push(newAsteroid(a.x, a.y, a.radius / 2));
        }
        asteroids.splice(index, 1);

        if (asteroids.length === 0) {
            showcase.soundManager.playSound("win");
            createAsteroids(asteroidNum + Math.floor(score / 1000)); // Increase difficulty
        }
    }

    function update() {
        // ... (same as original)
        if (gameOver) return;

        // Invincibility timer
        if (ship.invincible) {
            ship.invincibleTimer--;
            if (ship.invincibleTimer <= 0) {
                ship.invincible = false;
            }
        }

        // Rotate ship
        ship.angle += ship.rotation;

        // Thrust ship
        if (ship.thrusting) {
            ship.thrust.x += shipThrust * Math.cos(ship.angle);
            ship.thrust.y -= shipThrust * Math.sin(ship.angle); // Y is inverted
        } else {
            ship.thrust.x *= friction;
            ship.thrust.y *= friction;
        }

        // Move ship
        ship.x += ship.thrust.x;
        ship.y += ship.thrust.y;

        // Handle edge of screen
        if (ship.x < 0 - ship.radius) ship.x = canvas.width + ship.radius;
        else if (ship.x > canvas.width + ship.radius) ship.x = 0 - ship.radius;
        if (ship.y < 0 - ship.radius) ship.y = canvas.height + ship.radius;
        else if (ship.y > canvas.height + ship.radius) ship.y = 0 - ship.radius;

        // Move bullets
        for (let i = bullets.length - 1; i >= 0; i--) {
            bullets[i].x += bullets[i].vel.x;
            bullets[i].y += bullets[i].vel.y;
            bullets[i].dist += Math.sqrt(Math.pow(bullets[i].vel.x, 2) + Math.pow(bullets[i].vel.y, 2));

            // Remove bullets that go off screen or travel too far
            if (bullets[i].dist > canvas.width * 0.7 || bullets[i].x < 0 || bullets[i].x > canvas.width || bullets[i].y < 0 || bullets[i].y > canvas.height) {
                bullets.splice(i, 1);
                continue;
            }

            // Bullet-asteroid collision
            for (let j = asteroids.length - 1; j >= 0; j--) {
                if (distBetweenPoints(bullets[i].x, bullets[i].y, asteroids[j].x, asteroids[j].y) < asteroids[j].radius) {
                    bullets.splice(i, 1);
                    destroyAsteroid(j);
                    break; // Important: break after destroying asteroid to avoid issues with array modification
                }
            }
        }

        // Move asteroids
        asteroids.forEach(a => {
            a.x += a.vel.x;
            a.y += a.vel.y;
            // Handle edge of screen for asteroids
            if (a.x < 0 - a.radius) a.x = canvas.width + a.radius;
            else if (a.x > canvas.width + a.radius) a.x = 0 - a.radius;
            if (a.y < 0 - a.radius) a.y = canvas.height + a.radius;
            else if (a.y > canvas.height + a.radius) a.y = 0 - a.radius;
        });
        
        // Move debris
        for (let i = debris.length - 1; i >= 0; i--) {
            debris[i].x += debris[i].vel.x;
            debris[i].y += debris[i].vel.y;
            debris[i].life--;
            if (debris[i].life <= 0) {
                debris.splice(i, 1);
            }
        }


        // Ship-asteroid collision
        if (!ship.invincible) {
            for (let i = asteroids.length - 1; i >= 0; i--) {
                if (distBetweenPoints(ship.x, ship.y, asteroids[i].x, asteroids[i].y) < ship.radius + asteroids[i].radius) {
                    explodeShip();
                    destroyAsteroid(i); // Destroy asteroid on collision
                    break; // Important
                }
            }
        }
    }

    function render() { /* ... as in original ... */ 
        ctx.fillStyle = "#111";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        drawAsteroids();
        drawDebris();
        drawBullets();
        if (!gameOver) drawShip(); // Don't draw ship if game over
        drawUI();
    }

    function gameLoop() {
        update();
        render();
        animationFrameId = requestAnimFrame(gameLoop);
    }

    const handleKeyDown = (e) => {
        if (gameOver) return;
        switch (e.key) {
            case "ArrowLeft": case "a": ship.rotation = -shipTurnSpeed; break;
            case "ArrowRight": case "d": ship.rotation = shipTurnSpeed; break;
            case "ArrowUp": case "w": ship.thrusting = true; break;
            case " ": // Spacebar
                if (bullets.length < 5) { // Limit bullets
                    bullets.push({
                        x: ship.x + ship.radius * Math.cos(ship.angle),
                        y: ship.y - ship.radius * Math.sin(ship.angle),
                        vel: {
                            x: bulletSpeed * Math.cos(ship.angle),
                            y: -bulletSpeed * Math.sin(ship.angle) // Y is inverted
                        },
                        dist: 0
                    });
                    showcase.soundManager.playSound("shoot");
                }
                break;
        }
    };
    const handleKeyUp = (e) => {
        if (gameOver) return;
        switch (e.key) {
            case "ArrowLeft": case "a": ship.rotation = 0; break;
            case "ArrowRight": case "d": ship.rotation = 0; break;
            case "ArrowUp": case "w": ship.thrusting = false; break;
        }
    };

    showcase.eventHandler.addManagedListener(document, "keydown", handleKeyDown, "asteroids");
    showcase.eventHandler.addManagedListener(document, "keyup", handleKeyUp, "asteroids");

    createAsteroids(asteroidNum);
    animationFrameId = requestAnimFrame(gameLoop);

    return {
        cleanup: () => {
            if (animationFrameId) cancelAnimationFrame(animationFrameId);
            animationFrameId = null;
        },
    };
}