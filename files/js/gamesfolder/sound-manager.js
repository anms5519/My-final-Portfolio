"use strict";

export class SoundManager {
    constructor(showcaseInstance) {
        this.showcase = showcaseInstance;
        this.audioContext = null;
        this.soundEnabled = true; // Default, can be changed by showcase
    }

    getAudioContext() {
        if (!this.audioContext) {
            try {
                this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
            } catch (e) {
                console.error("Web Audio API is not supported in this browser.");
                this.soundEnabled = false;
            }
        }
        return this.audioContext;
    }

    playSound(soundType) {
        if (!this.soundEnabled || !this.showcase.soundEnabled) return; // Check global showcase setting too
        const audioCtx = this.getAudioContext();
        if (!audioCtx) return;

        const sounds = {
            click: { type: "sine", freq: 880, duration: 0.05, vol: 0.3, decay: 0.04 },
            ui: { type: "triangle", freq: 660, duration: 0.06, vol: 0.25, decay: 0.05 },
            open: { type: "sine", freq: 523.25, duration: 0.15, vol: 0.4, decay: 0.1 },
            close: { type: "sine", freq: 440, duration: 0.15, vol: 0.4, decay: 0.1 },
            load: { type: "square", freq: 110, duration: 0.1, vol: 0.2, decay: 0.08 },
            restart: { type: "sawtooth", freq: [220, 440], duration: 0.15, vol: 0.3, decay: 0.1 },
            point: { type: "triangle", freq: 1046.50, duration: 0.08, vol: 0.35, decay: 0.07 },
            shoot: { type: "square", freq: 440, duration: 0.05, vol: 0.2, decay: 0.04 },
            explosion: { type: "noise", duration: 0.3, vol: 0.5, decay: 0.25 },
            jump: { type: "sine", freq: [660, 880], duration: 0.1, vol: 0.3, decay: 0.08 },
            hit: { type: "sawtooth", freq: 220, duration: 0.1, vol: 0.4, decay: 0.09 },
            powerup: { type: "sine", freq: [523, 659, 783], duration: 0.3, vol: 0.4, decay: 0.25 },
            win: { type: "sine", freq: [523, 783, 1046], duration: 0.5, vol: 0.5, decay: 0.4 },
            gameOver: { type: "sawtooth", freq: [220, 110], duration: 0.8, vol: 0.5, decay: 0.7 },
            navigate: { type: "square", freq: 330, duration: 0.04, vol: 0.15, decay: 0.03 },
            favorite: { type: "sine", freq: [783.99, 1046.50], duration: 0.2, vol: 0.3, decay: 0.15 },
            unfavorite: { type: "sine", freq: [1046.50, 783.99], duration: 0.2, vol: 0.3, decay: 0.15 },
            pause: { type: "triangle", freq: 440, duration: 0.1, vol: 0.2, decay: 0.08 },
            unpause: { type: "triangle", freq: 523.25, duration: 0.1, vol: 0.2, decay: 0.08 },
        };

        const sound = sounds[soundType];
        if (!sound) return;

        try {
            let oscillator;
            if (sound.type === "noise") {
                oscillator = audioCtx.createBufferSource();
                const bufferSize = audioCtx.sampleRate * sound.duration;
                const buffer = audioCtx.createBuffer(1, bufferSize, audioCtx.sampleRate);
                const output = buffer.getChannelData(0);
                for (let i = 0; i < bufferSize; i++) {
                    output[i] = Math.random() * 2 - 1;
                }
                oscillator.buffer = buffer;
            } else {
                oscillator = audioCtx.createOscillator();
                oscillator.type = sound.type || "sine";
                if (Array.isArray(sound.freq)) {
                    oscillator.frequency.setValueAtTime(sound.freq[0], audioCtx.currentTime);
                    for (let i = 1; i < sound.freq.length; i++) {
                        oscillator.frequency.linearRampToValueAtTime(
                            sound.freq[i],
                            audioCtx.currentTime + sound.duration * (i / sound.freq.length)
                        );
                    }
                } else {
                    oscillator.frequency.setValueAtTime(sound.freq, audioCtx.currentTime);
                }
            }

            const gainNode = audioCtx.createGain();
            gainNode.gain.setValueAtTime(sound.vol, audioCtx.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + sound.decay);

            oscillator.connect(gainNode);
            gainNode.connect(audioCtx.destination);
            oscillator.start(audioCtx.currentTime);
            oscillator.stop(audioCtx.currentTime + sound.duration);

        } catch (error) {
            console.error(`Error playing sound "${soundType}":`, error);
            if (audioCtx.state === "interrupted" || audioCtx.state === "closed") {
                this.audioContext = null; // Attempt to re-create context on next play
            }
        }
    }
}