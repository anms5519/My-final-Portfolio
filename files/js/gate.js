
document.addEventListener("DOMContentLoaded", () => {
    const gate = document.getElementById("gate");
    const enterButton = document.getElementById("enterButton");
    const smallBGM = document.getElementById("smallBGM");
    const bigBGM = document.getElementById("bigBGM");
    const savedSmallTime = localStorage.getItem("smallBGMTime");
    const savedBigTime = localStorage.getItem("bigBGMTime");
    
    if (savedSmallTime && smallBGM) {
        smallBGM.currentTime = parseFloat(savedSmallTime);
    }
    if (savedBigTime && bigBGM) {
        bigBGM.currentTime = parseFloat(savedBigTime);
    }
    
    function playAudio() {
        if (!localStorage.getItem("smallBGMPlayed") && smallBGM) {
            smallBGM
                .play()
                .catch((err) =>
                    console.error("Small BGM playback error:", err)
                );
            smallBGM.addEventListener("ended", () => {
                localStorage.setItem("smallBGMPlayed", "true");
            });
        }
        if (bigBGM) {
            bigBGM
                .play()
                .catch((err) => console.error("Big BGM playback error:", err));
        }
    }
    
    window.addEventListener("beforeunload", () => {
        if (smallBGM)
            localStorage.setItem("smallBGMTime", smallBGM.currentTime);
        if (bigBGM) localStorage.setItem("bigBGMTime", bigBGM.currentTime);
    });
    
    // Create 3D particles
    createParticles();
    
    // Create holographic interface elements
    createHolographicElements();
    
    // Initialize the 3D scene
    initThreeJsScene();
    
    // Add futuristic ripple effect
    document.addEventListener("mousemove", (e) => {
        createRipple(e.clientX, e.clientY);
    });
    
    enterButton.addEventListener("click", () => {
        playAudio();
        
        // Add special animation effects on click
        triggerEnterAnimation();
        
        gate.classList.add("open");
        setTimeout(() => {
            if (gate.parentNode) {
                gate.parentNode.removeChild(gate);
            }
            document.body.style.overflow = "auto";
        }, 2500); // Extended animation time
    });
});

// Create dynamic 3D particles
function createParticles() {
    const particlesContainer = document.querySelector(".particles-container");
    if (!particlesContainer) return;
    
    // Clear existing particles
    particlesContainer.innerHTML = "";
    
    // Add different types of particles
    for (let i = 0; i < 60; i++) {
        createParticle(particlesContainer, i % 5); // 5 different types
    }
    
    // Add nebula clouds
    for (let i = 0; i < 4; i++) {
        const nebula = document.createElement("div");
        nebula.className = "nebula";
        nebula.style.left = `${Math.random() * 100}%`;
        nebula.style.top = `${Math.random() * 100}%`;
        nebula.style.animationDelay = `${Math.random() * 10}s`;
        nebula.style.transform = `scale(${0.5 + Math.random() * 1.5})`;
        particlesContainer.appendChild(nebula);
    }
}

function createParticle(container, type) {
    const particle = document.createElement("div");
    particle.className = "particle";
    
    // Apply different styles based on particle type
    switch(type) {
        case 0: // Standard blue particle
            particle.classList.add("particle-glow");
            particle.style.backgroundColor = "var(--neon-blue)";
            particle.style.width = `${0.3 + Math.random() * 0.5}vh`;
            particle.style.height = particle.style.width;
            break;
        case 1: // Pink particle
            particle.classList.add("particle-pulse");
            particle.style.backgroundColor = "var(--neon-pink)";
            particle.style.width = `${0.2 + Math.random() * 0.4}vh`;
            particle.style.height = particle.style.width;
            break;
        case 2: // Star shaped
            particle.classList.add("particle-star");
            particle.style.width = `${0.5 + Math.random() * 0.7}vh`;
            particle.style.height = particle.style.width;
            break;
        case 3: // Digital data stream
            particle.classList.add("data-stream");
            particle.style.width = `${0.2}vh`;
            particle.style.height = `${1 + Math.random() * 3}vh`;
            particle.style.backgroundColor = "var(--neon-green)";
            break;
        case 4: // Energy orb
            particle.classList.add("energy-orb");
            particle.style.width = `${0.8 + Math.random() * 1.2}vh`;
            particle.style.height = particle.style.width;
            break;
    }
    
    // Random position
    particle.style.left = `${Math.random() * 100}%`;
    particle.style.top = `${Math.random() * 100}%`;
    
    // Random animation delay
    particle.style.animationDelay = `${Math.random() * 15}s`;
    particle.style.animationDuration = `${10 + Math.random() * 15}s`;
    
    container.appendChild(particle);
}

function createHolographicElements() {
    const container = document.querySelector(".inner-container");
    if (!container) return;
    
    // Add floating holograms
    const hologramContainer = document.createElement("div");
    hologramContainer.className = "hologram-container";
    
    // Add rotating tech rings
    const techRings = document.createElement("div");
    techRings.className = "tech-rings";
    hologramContainer.appendChild(techRings);
    
    for (let i = 0; i < 3; i++) {
        const ring = document.createElement("div");
        ring.className = "tech-ring";
        ring.style.width = `${20 + i * 10}vh`;
        ring.style.height = `${20 + i * 10}vh`;
        ring.style.animationDelay = `${i * 0.5}s`;
        ring.style.animationDuration = `${15 + i * 5}s`;
        
        // Add tech symbols to rings
        for (let j = 0; j < 6 + i * 2; j++) {
            const symbol = document.createElement("div");
            symbol.className = "tech-symbol";
            symbol.style.transform = `rotate(${j * (360 / (6 + i * 2))}deg) translateX(${10 + i * 5}vh)`;
            ring.appendChild(symbol);
        }
        
        techRings.appendChild(ring);
    }
    
    // Add floating data elements
    const dataElements = document.createElement("div");
    dataElements.className = "data-elements";
    
    for (let i = 0; i < 8; i++) {
        const dataEl = document.createElement("div");
        dataEl.className = "data-element";
        dataEl.style.top = `${10 + Math.random() * 80}%`;
        dataEl.style.left = `${Math.random() * 100}%`;
        dataEl.style.animationDelay = `${Math.random() * 5}s`;
        dataElements.appendChild(dataEl);
    }
    
    hologramContainer.appendChild(dataElements);
    
    // Add scanning effect
    const scanEffect = document.createElement("div");
    scanEffect.className = "scan-effect";
    hologramContainer.appendChild(scanEffect);
    
    // Add to container before the profile section
    const profileSection = container.querySelector(".profile-section");
    if (profileSection) {
        container.insertBefore(hologramContainer, profileSection);
    } else {
        container.appendChild(hologramContainer);
    }
    
    // Update the enter button with futuristic design
    updateEnterButton();
}

function updateEnterButton() {
    const enterButton = document.getElementById("enterButton");
    if (!enterButton) return;
    
    enterButton.innerHTML = `
        <span class="btn-glow"></span>
        <span class="btn-inner">
            <i class="fas fa-door-open"></i>
            <span class="btn-text">Enter Portfolio</span>
        </span>
        <span class="btn-particles"></span>
    `;
    
    // Add particles to button
    const btnParticles = enterButton.querySelector(".btn-particles");
    for (let i = 0; i < 10; i++) {
        const particle = document.createElement("span");
        particle.className = "btn-particle";
        btnParticles.appendChild(particle);
    }
}

// Create water-like ripple effect
function createRipple(x, y) {
    const gate = document.getElementById("gate");
    if (!gate) return;
    
    if (Math.random() > 0.92) { // Only create ripples occasionally
        const ripple = document.createElement("div");
        ripple.className = "ripple-effect";
        
        ripple.style.left = `${x}px`;
        ripple.style.top = `${y}px`;
        
        gate.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 2000);
    }
}

function triggerEnterAnimation() {
    const gate = document.getElementById("gate");
    if (!gate) return;
    
    // Add a flash effect
    const flash = document.createElement("div");
    flash.className = "gate-flash";
    gate.appendChild(flash);
    
    // Add energy beams
    for (let i = 0; i < 10; i++) {
        setTimeout(() => {
            const beam = document.createElement("div");
            beam.className = "energy-beam";
            beam.style.left = `${Math.random() * 100}%`;
            beam.style.width = `${0.2 + Math.random() * 0.5}vh`;
            beam.style.height = `${Math.random() * 100}%`;
            beam.style.animationDuration = `${0.5 + Math.random()}s`;
            gate.appendChild(beam);
            
            setTimeout(() => {
                beam.remove();
            }, 1500);
        }, i * 100);
    }
    
    // Add digital transition effect
    const digitize = document.createElement("div");
    digitize.className = "digitize-effect";
    gate.appendChild(digitize);
    
    // Update door handles with energy effect
    const handles = gate.querySelectorAll(".door-handle");
    handles.forEach(handle => {
        handle.classList.add("energized");
    });
}

function initThreeJsScene() {
    // Check if THREE is already available
    if (typeof THREE !== 'undefined') {
        setupThreeJsScene();
        return;
    }
    
    // Otherwise load it
    const script = document.createElement('script');
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js';
    script.onload = setupThreeJsScene;
    document.head.appendChild(script);
}

function setupThreeJsScene() {
    const gate = document.getElementById("gate");
    if (!gate) return;
    
    // Create canvas container
    const canvasContainer = document.createElement("div");
    canvasContainer.className = "gate-3d-canvas";
    gate.appendChild(canvasContainer);
    
    // Set up Three.js scene
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    
    const renderer = new THREE.WebGLRenderer({ alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x000000, 0);
    canvasContainer.appendChild(renderer.domElement);
    
    // Add light
    const ambientLight = new THREE.AmbientLight(0x404040);
    scene.add(ambientLight);
    
    const pointLight = new THREE.PointLight(0x6688ff, 1, 100);
    pointLight.position.set(10, 10, 10);
    scene.add(pointLight);
    
    // Create floating 3D objects
    const geometries = [
        new THREE.TorusGeometry(5, 1, 16, 100),
        new THREE.OctahedronGeometry(3, 0),
        new THREE.TetrahedronGeometry(3, 0)
    ];
    
    const materials = [
        new THREE.MeshPhongMaterial({ 
            color: 0x66fcf1, 
            wireframe: true,
            transparent: true,
            opacity: 0.5
        }),
        new THREE.MeshPhongMaterial({
            color: 0xf72585,
            wireframe: true,
            transparent: true,
            opacity: 0.4
        }),
        new THREE.MeshPhongMaterial({
            color: 0x9d4edd,
            wireframe: true,
            transparent: true,
            opacity: 0.3
        })
    ];
    
    const objects = [];
    
    // Create objects and add to scene
    for (let i = 0; i < 3; i++) {
        const mesh = new THREE.Mesh(geometries[i], materials[i]);
        mesh.position.set(
            (Math.random() - 0.5) * 20,
            (Math.random() - 0.5) * 20,
            (Math.random() - 0.5) * 10 - 20
        );
        scene.add(mesh);
        objects.push({
            mesh,
            rotX: (Math.random() - 0.5) * 0.01,
            rotY: (Math.random() - 0.5) * 0.01
        });
    }
    
    // Position camera
    camera.position.z = 30;
    
    // Handle window resize
    window.addEventListener('resize', () => {
        const width = window.innerWidth;
        const height = window.innerHeight;
        renderer.setSize(width, height);
        camera.aspect = width / height;
        camera.updateProjectionMatrix();
    });
    
    // Animation loop
    function animate() {
        const animationId = requestAnimationFrame(animate);
        
        // Check if gate was removed
        if (!document.getElementById("gate")) {
            cancelAnimationFrame(animationId);
            return;
        }
        
        // Rotate objects
        objects.forEach(obj => {
            obj.mesh.rotation.x += obj.rotX;
            obj.mesh.rotation.y += obj.rotY;
        });
        
        // Slowly rotate camera
        camera.position.x = Math.sin(Date.now() * 0.0002) * 5;
        camera.position.y = Math.cos(Date.now() * 0.0002) * 5;
        camera.lookAt(0, 0, 0);
        
        renderer.render(scene, camera);
    }
    
    animate();
}
