// preloader.js - Contains HTML content and logic for the preloader section
window.PreloaderContent = {
    getHTML: function() {
        return `
            <div class="preloader-grid-bg"></div>
            <div class="preloader-hologram"></div>
            <div class="preloader-particles"></div>
            <div class="preloader-inner">
                <div class="preloader-logo-container">
                    <div class="core-glow"></div>
                    <div class="ring outer-ring">
                        <div class="ring-segment"></div><div class="ring-segment"></div>
                        <div class="ring-segment"></div><div class="ring-segment"></div>
                        <div class="ring-segment"></div><div class="ring-segment"></div>
                    </div>
                    <div class="ring middle-ring">
                        <div class="ring-segment"></div><div class="ring-segment"></div>
                        <div class="ring-segment"></div><div class="ring-segment"></div>
                        <div class="ring-segment"></div><div class="ring-segment"></div>
                    </div>
                    <div class="ring inner-ring">
                        <div class="ring-segment"></div><div class="ring-segment"></div>
                        <div class="ring-segment"></div><div class="ring-segment"></div>
                        <div class="ring-segment"></div><div class="ring-segment"></div>
                    </div>
                    <div class="data-streamers">
                        <div class="streamer"></div><div class="streamer"></div>
                        <div class="streamer"></div><div class="streamer"></div>
                        <div class="streamer"></div><div class="streamer"></div>
                        <div class="streamer"></div><div class="streamer"></div>
                        <div class="streamer"></div><div class="streamer"></div>
                        <div class="streamer"></div><div class="streamer"></div>
                    </div>
                    <div class="core-crystal"></div>
                    <div class="crystal-reflections"></div>
                </div>
                <div class="floating-elements">
                    <div class="floating-element"></div>
                    <div class="floating-element"></div>
                    <div class="floating-element"></div>
                    <div class="floating-element"></div>
                    <div class="floating-element"></div>
                    <div class="floating-element"></div>
                </div>
                <div class="preloader-text-content">
                    <div class="text-glitch-container">
                        <p id="loading-status-text" class="cyber-text">INITIALIZING NEURAL INTERFACE</p>
                    </div>
                    <div class="progress-container">
                        <div class="progress-bar-container">
                            <div id="progress-bar-fill"></div>
                            <div class="progress-particles"></div>
                        </div>
                        <p id="loading-percentage-text" class="neo-text">0%</p>
                    </div>
                    <div class="loading-details">
                        <span class="detail-item">SYSTEM: <span class="detail-value">ONLINE</span></span>
                        <span class="detail-item">PROTOCOL: <span class="detail-value">ACTIVE</span></span>
                        <span class="detail-item">SECURITY: <span class="detail-value">ENABLED</span></span>
                    </div>
                </div>
            </div>
        `;
    },
    
    init: function() {
        // Initialize premium futuristic preloader functionality
        const preloader = document.getElementById('preloader');
        const progressBarFill = document.getElementById('progress-bar-fill');
        const loadingPercentageText = document.getElementById('loading-percentage-text');
        const loadingStatusText = document.getElementById('loading-status-text');
        const mainContent = document.getElementById('main-content'); // Example main content
        const detailValues = document.querySelectorAll('.detail-value');
        const floatingElements = document.querySelectorAll('.floating-element');

        // Set data-text attribute for glitch effect
        if (loadingStatusText) {
            loadingStatusText.setAttribute('data-text', loadingStatusText.textContent);
        }

        // Create floating 3D elements
        floatingElements.forEach((element, index) => {
            const size = 5 + Math.random() * 10; // Random size between 5-15vh
            const delay = Math.random() * 5;
            const duration = 10 + Math.random() * 20;
            const color = `rgba(var(--primary-glow-color-rgb), ${0.1 + Math.random() * 0.2})`;
            
            element.style.width = `${size}px`;
            element.style.height = `${size}px`;
            element.style.animationDelay = `${delay}s`;
            element.style.animationDuration = `${duration}s`;
            element.style.backgroundColor = color;
            element.style.transform = `rotate(${Math.random() * 360}deg)`;
        });

        // Enhanced ultra-futuristic status messages
        const statusMessages = [
            "INITIALIZING QUANTUM NEURAL INTERFACE",
            "CALIBRATING HOLOGRAPHIC SYSTEMS",
            "LOADING HYPER-DIMENSIONAL MODULES",
            "ESTABLISHING PRISMATIC WAVEFORM LINK",
            "DECOMPRESSING CRYSTALLINE MATRIX",
            "OPTIMIZING NANO-CYBERNETIC CORE",
            "RENDERING IMMERSIVE ENVIRONMENT",
            "SYNCHRONIZING TEMPORAL DATA STREAMS",
            "ACTIVATING NEURAL RECOGNITION PATHWAYS",
            "FINALIZING CRYSTALLINE NETWORK SEQUENCE",
            "AUTHENTICATING USER BIOMETRICS",
            "LAUNCHING PRISMATIC EXPERIENCE ENGINE"
        ];

        let currentPercentage = 0;
        let messageIndex = 0;
        let progressInterval;
        let messageInterval;
        let particlesInitialized = false;

        // Create holographic particles
        function initializeParticles() {
            if (particlesInitialized) return;
            particlesInitialized = true;
            
            const particlesContainer = document.querySelector('.preloader-particles');
            const progressParticles = document.querySelector('.progress-particles');
            
            // Main background particles
            for (let i = 0; i < 50; i++) {
                createParticle(particlesContainer);
            }
            
            // Progress bar particles
            for (let i = 0; i < 15; i++) {
                createParticle(progressParticles, 'progress');
            }
            
            // Create crystal reflections
            const reflections = document.querySelector('.crystal-reflections');
            for (let i = 0; i < 8; i++) {
                const reflection = document.createElement('div');
                reflection.className = 'crystal-reflection';
                reflection.style.transform = `rotate(${i * 45}deg) translateX(${10 + Math.random() * 5}px)`;
                reflection.style.animationDelay = `${Math.random() * 2}s`;
                reflections.appendChild(reflection);
            }
            
            // Create hologram effect
            const hologram = document.querySelector('.preloader-hologram');
            for (let i = 0; i < 3; i++) {
                const holoLayer = document.createElement('div');
                holoLayer.className = 'hologram-layer';
                holoLayer.style.animationDelay = `${i * 0.7}s`;
                hologram.appendChild(holoLayer);
            }
        }
        
        // Create individual particle
        function createParticle(container, type = 'background') {
            const particle = document.createElement('div');
            particle.className = 'preloader-particle';
            
            // Different properties based on particle type
            if (type === 'progress') {
                particle.style.width = `${2 + Math.random() * 3}px`;
                particle.style.height = particle.style.width;
                particle.style.background = `rgba(var(--accent-color-rgb), ${0.4 + Math.random() * 0.6})`;
                particle.style.left = `${Math.random() * 100}%`;
                particle.style.top = `${Math.random() * 100}%`;
                particle.style.animationDuration = `${1 + Math.random() * 2}s`;
            } else {
                particle.style.width = `${2 + Math.random() * 8}px`;
                particle.style.height = particle.style.width;
                particle.style.background = `rgba(var(--primary-glow-color-rgb), ${0.1 + Math.random() * 0.3})`;
                particle.style.left = `${Math.random() * 100}vw`;
                particle.style.top = `${Math.random() * 100}vh`;
                particle.style.animationDuration = `${5 + Math.random() * 15}s`;
                particle.style.opacity = Math.random() * 0.5;
            }
            
            container.appendChild(particle);
            return particle;
        }

        function updateDetailMessages() {
            const details = [
                ["SYSTEM", ["BOOTING", "SCANNING", "LOADING", "SYNCING", "ONLINE"]],
                ["PROTOCOL", ["INITIALIZING", "CONFIGURING", "VERIFYING", "ACTIVE"]],
                ["SECURITY", ["SCANNING", "ENCRYPTING", "ENABLED"]],
                ["NETWORK", ["CONNECTING", "HANDSHAKING", "SECURED"]],
                ["INTERFACE", ["LOADING", "OPTIMIZING", "READY"]]
            ];
            
            detailValues.forEach((element, index) => {
                if (index < details.length) {
                    // Randomly select a state based on the current loading percentage
                    const states = details[index][1];
                    let stateIndex;
                    
                    if (currentPercentage < 30) {
                        stateIndex = 0;
                    } else if (currentPercentage < 60) {
                        stateIndex = Math.floor(Math.random() * (states.length / 2));
                    } else if (currentPercentage < 90) {
                        stateIndex = Math.floor(Math.random() * (states.length - 1));
                    } else {
                        stateIndex = states.length - 1;
                    }
                    
                    element.textContent = states[Math.min(stateIndex, states.length - 1)];
                    
                    // Apply a glitch effect occasionally
                    if (Math.random() > 0.85) {
                        element.classList.add('glitching');
                        setTimeout(() => {
                            element.classList.remove('glitching');
                        }, 200 + Math.random() * 300);
                    }
                }
            });
        }

        function startLoadingSimulation() {
            // Initialize particles
            initializeParticles();
            
            // Set initial message
            loadingStatusText.textContent = statusMessages[messageIndex];
            loadingStatusText.setAttribute('data-text', statusMessages[messageIndex]);
            
            // Initial detail values update
            updateDetailMessages();

            progressInterval = setInterval(() => {
                // Dynamic progress increments for premium futuristic feel
                let increment;
                
                if (currentPercentage < 20) {
                    increment = Math.floor(Math.random() * 3) + 1; // 1-3% increments early
                } else if (currentPercentage < 50) {
                    increment = Math.floor(Math.random() * 2) + 1; // 1-2% increments
                } else if (currentPercentage < 80) {
                    // Create slight pauses to simulate complex processing
                    increment = (Math.random() > 0.2) ? 1 : 0;
                } else {
                    // Slow down dramatically near the end
                    increment = (Math.random() > 0.7) ? 1 : 0;
                }
                
                currentPercentage = Math.min(currentPercentage + increment, 100);

                // Update progress visuals with easing effect
                progressBarFill.style.width = `${currentPercentage}%`;
                loadingPercentageText.textContent = `${currentPercentage}%`;
                
                // Update detail status messages
                if (Math.random() > 0.7) { // Only update sometimes for a more realistic feel
                    updateDetailMessages();
                }

                if (currentPercentage >= 100) {
                    clearInterval(progressInterval);
                    clearInterval(messageInterval);

                    // Final state updates
                    loadingStatusText.textContent = "NEURAL INTERFACE ACTIVATED";
                    loadingStatusText.setAttribute('data-text', "NEURAL INTERFACE ACTIVATED");
                    loadingStatusText.classList.add('system-ready');
                    
                    // Update all detail values to their final state
                    detailValues.forEach(element => {
                        element.textContent = (element.textContent === "SCANNING" || 
                                              element.textContent === "LOADING" || 
                                              element.textContent === "INITIALIZING") 
                                              ? "READY" : element.textContent;
                        element.classList.add('system-ready');
                    });
                    
                    // Apply final animation sequence
                    preloader.classList.add('completing');
                    
                    // Wait for final effect to complete before exit
                    setTimeout(() => {
                        preloader.classList.add('loaded');
                        document.body.style.overflow = 'auto';
                        if (mainContent) mainContent.style.display = 'block';
                    }, 2500);
                }
            }, 100); // Fast updates for smooth progress

            messageInterval = setInterval(() => {
                if (currentPercentage < 95) {
                    messageIndex = (messageIndex + 1) % statusMessages.length;
                    
                    // Apply more advanced transition effects to status message
                    loadingStatusText.classList.add('message-changing');
                    
                    setTimeout(() => {
                        const newMessage = statusMessages[messageIndex];
                        loadingStatusText.textContent = newMessage;
                        loadingStatusText.setAttribute('data-text', newMessage);
                        
                        // Apply a glitch effect on text change
                        loadingStatusText.classList.add('glitching');
                        
                        setTimeout(() => {
                            loadingStatusText.classList.remove('glitching');
                            loadingStatusText.classList.remove('message-changing');
                        }, 200);
                    }, 300);
                }
            }, 3000); // Change message every 3 seconds for better readability
        }

        // Start the enhanced loading simulation
        startLoadingSimulation();

        // If you want to ensure it hides on window.load even if simulation is slow:
        window.addEventListener('load', () => {
            if (currentPercentage < 100) {
                // Force completion
                clearInterval(progressInterval);
                clearInterval(messageInterval);
                currentPercentage = 100;
                progressBarFill.style.width = `100%`;
                loadingPercentageText.textContent = `100%`;
                loadingStatusText.textContent = "NEURAL INTERFACE ACTIVATED";
                loadingStatusText.setAttribute('data-text', "NEURAL INTERFACE ACTIVATED");
                loadingStatusText.classList.add('system-ready');
                
                // Update all detail values to their final state
                detailValues.forEach(element => {
                    element.textContent = (element.textContent === "SCANNING" || 
                                          element.textContent === "LOADING" || 
                                          element.textContent === "INITIALIZING") 
                                          ? "READY" : element.textContent;
                    element.classList.add('system-ready');
                });
                
                // Apply final animation sequence
                preloader.classList.add('completing');
                
                setTimeout(() => {
                    preloader.classList.add('loaded');
                    document.body.style.overflow = 'auto';
                    if (mainContent) mainContent.style.display = 'block';
                }, 2000);
            }
        });
    }
};