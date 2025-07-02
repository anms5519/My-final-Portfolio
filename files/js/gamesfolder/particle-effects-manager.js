"use strict";
import { $, requestAnimFrame } from './utils.js';

export class ParticleEffectsManager {
    constructor(showcaseInstance) {
        this.showcase = showcaseInstance;
        this.particleCanvas = null;
        this.particleCtx = null;
        this.particles = [];
        this.particleCount = 50;
        this.particleAnimationFrame = null;
        this.particleEffectsEnabled = true;
    }

    init() {
        this.particleCanvas = $(".particle-canvas", this.showcase.container);
        if (!this.particleCanvas) return;

        this.particleCtx = this.particleCanvas.getContext("2d");
        this.resize();

        try {
            this.particleEffectsEnabled = JSON.parse(localStorage.getItem("game-particles-enabled") || "true");
        } catch (e) {
            this.particleEffectsEnabled = true;
        }
        
        const effectsButton = $(".toggle-effects", this.showcase.container);
        if (effectsButton) {
            effectsButton.classList.toggle("active", this.particleEffectsEnabled);
        }

        for (let i = 0; i < this.particleCount; i++) {
            this.create();
        }

        if (this.particleEffectsEnabled) {
            this.startAnimation();
        }
        // The resize listener is handled by EventHandler now
    }

    create(x, y, usePremiumEffects = false) {
        if (!this.particleCanvas) return;
        const posX = x !== undefined ? x : Math.random() * this.particleCanvas.width;
        const posY = y !== undefined ? y : Math.random() * this.particleCanvas.height;
        const particle = {
            x: posX,
            y: posY,
            radius: Math.random() * 3 + 1,
            color: this.getRandomColor(),
            speedX: (Math.random() - 0.5) * 0.5,
            speedY: (Math.random() - 0.5) * 0.5,
            opacity: Math.random() * 0.5 + 0.2,
            life: 1,
            maxLife: usePremiumEffects ? 0.5 + Math.random() * 0.5 : 1,
        };
        if (usePremiumEffects) {
            particle.glow = true;
            particle.pulse = 0;
            particle.pulseSpeed = 0.02 + Math.random() * 0.03;
            particle.sparkle = Math.random() > 0.7;
        }
        this.particles.push(particle);
        return particle;
    }

    resize() {
        if (!this.particleCanvas || !this.showcase.container) return;
        this.particleCanvas.width = this.showcase.container.clientWidth;
        this.particleCanvas.height = this.showcase.container.clientHeight;
    }

    getRandomColor() {
        const colors = ["#fbcb5b", "#e67e22", "#f39c12", "#3498db", "#9b59b6"];
        return colors[Math.floor(Math.random() * colors.length)];
    }

    startAnimation() {
        if (this.particleAnimationFrame) {
            cancelAnimationFrame(this.particleAnimationFrame);
        }
        const animate = () => {
            if (!this.particleEffectsEnabled || !this.showcase.container.classList.contains("active")) {
                this.particleAnimationFrame = null;
                return;
            }
            if (!this.particleCtx || !this.particleCanvas) return;

            this.particleCtx.clearRect(0, 0, this.particleCanvas.width, this.particleCanvas.height);
            for (let i = 0; i < this.particles.length; i++) {
                const p = this.particles[i];
                p.x += p.speedX;
                p.y += p.speedY;

                if (p.x < 0) p.x = this.particleCanvas.width;
                if (p.x > this.particleCanvas.width) p.x = 0;
                if (p.y < 0) p.y = this.particleCanvas.height;
                if (p.y > this.particleCanvas.height) p.y = 0;

                this.particleCtx.beginPath();
                this.particleCtx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
                this.particleCtx.globalAlpha = p.opacity;
                this.particleCtx.fillStyle = p.color;
                this.particleCtx.fill();
            }

            this.particleCtx.globalAlpha = 0.2;
            this.particleCtx.strokeStyle = "#ffffff";
            this.particleCtx.lineWidth = 0.5;
            for (let i = 0; i < this.particles.length; i++) {
                for (let j = i + 1; j < this.particles.length; j++) {
                    const p1 = this.particles[i];
                    const p2 = this.particles[j];
                    const dx = p1.x - p2.x;
                    const dy = p1.y - p2.y;
                    const distance = Math.sqrt(dx * dx + dy * dy);
                    if (distance < 100) {
                        this.particleCtx.beginPath();
                        this.particleCtx.moveTo(p1.x, p1.y);
                        this.particleCtx.lineTo(p2.x, p2.y);
                        this.particleCtx.stroke();
                    }
                }
            }
            this.particleCtx.globalAlpha = 1;
            this.particleAnimationFrame = requestAnimFrame(animate);
        };
        this.particleAnimationFrame = requestAnimFrame(animate);
    }

    toggle() {
        this.particleEffectsEnabled = !this.particleEffectsEnabled;
        if (this.particleEffectsEnabled) {
            this.startAnimation();
            $(".toggle-effects", this.showcase.container).classList.add("active");
        } else {
            if (this.particleAnimationFrame) {
                cancelAnimationFrame(this.particleAnimationFrame);
                this.particleAnimationFrame = null;
            }
            $(".toggle-effects", this.showcase.container).classList.remove("active");
        }
        try {
            localStorage.setItem("game-particles-enabled", JSON.stringify(this.particleEffectsEnabled));
        } catch (e) { /* LocalStorage not available */ }
        
        this.showToggleEffect();
        this.showcase.soundManager.playSound("click");
    }

    showToggleEffect() {
        const effect = document.createElement("div");
        effect.className = "toggle-effects-animation";
        effect.style.position = "absolute";
        effect.style.top = "0";
        effect.style.left = "0";
        effect.style.width = "100%";
        effect.style.height = "100%";
        effect.style.pointerEvents = "none";
        effect.style.background = this.particleEffectsEnabled
            ? "radial-gradient(circle, rgba(251,203,91,0.15) 0%, rgba(0,0,0,0) 70%)"
            : "radial-gradient(circle, rgba(0,0,0,0.15) 0%, rgba(0,0,0,0) 70%)";
        effect.style.opacity = "0";
        effect.style.transition = "opacity 0.5s ease-out";
        effect.style.zIndex = "1000";
        this.showcase.container.appendChild(effect);
        setTimeout(() => {
            effect.style.opacity = "1";
            setTimeout(() => {
                effect.style.opacity = "0";
                setTimeout(() => effect.remove(), 500);
            }, 500);
        }, 10);
    }

    createItemHoverEffect(item) {
        if (!this.particleEffectsEnabled || !this.showcase.container) return;
        const rect = item.getBoundingClientRect();
        const containerRect = this.showcase.container.getBoundingClientRect();
        const x = rect.left - containerRect.left + rect.width / 2;
        const y = rect.top - containerRect.top + rect.height / 2;
        const particleCount = Math.floor(Math.random() * 5) + 5;

        for (let i = 0; i < particleCount; i++) {
            const size = Math.random() * 3 + 1;
            const speed = Math.random() * 2 + 1;
            const angle = Math.random() * Math.PI * 2;
            const opacity = Math.random() * 0.5 + 0.5;
            const color = item.dataset.color || this.getRandomColor();
            this.particles.push({
                x, y, radius: size, color,
                speedX: Math.cos(angle) * speed,
                speedY: Math.sin(angle) * speed,
                opacity,
                life: 30, // Short lifespan for hover particles
                maxLife: 30,
            });
        }
    }
}