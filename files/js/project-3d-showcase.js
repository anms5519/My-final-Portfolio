/**
 * Supreme Project 3D Showcase
 * A premium, futuristic visualization system for project showcase in 3D space
 * Advanced visual effects and interactivity
 */

window.supremeProjectViewer = {
    // Configuration
    config: {
        carouselRadius: 15,     // Radius of the carousel layout
        carouselHeight: 0,      // Height of carousel items
        viewMode: 'carousel',   // Initial view mode: carousel, orbit, or focus
        rotationSpeed: 0.005,   // Speed of carousel rotation
        autoRotate: true,       // Whether to auto-rotate the carousel
        backgroundColor: 0x060616, // Scene background color
        floorSize: 40,          // Size of the floor grid
        floorSpacing: 1,        // Spacing between floor grid lines
        floorColor1: 0x0a1a3a,  // Floor grid primary color
        floorColor2: 0x162040,  // Floor grid secondary color
        cardScale: 1,           // Scale factor for cards
        initialCameraPosition: { x: 0, y: 8, z: 20 }, // Initial camera position
        orbitMinDistance: 10,   // Minimum distance for orbit controls
        orbitMaxDistance: 40,   // Maximum distance for orbit controls
        bloomStrength: 0.8,     // Strength of the bloom effect
        bloomRadius: 0.5,       // Radius of the bloom effect
        bloomThreshold: 0.2     // Threshold of the bloom effect
    },
    
    // Initialization
    init: function() {
        console.log('Initializing Supreme Project 3D Showcase');
        
        // References
        this.container = null;
        this.scene = null;
        this.camera = null;
        this.renderer = null;
        this.controls = null;
        this.composer = null;
        this.clock = new THREE.Clock();
        this.mouse = new THREE.Vector2();
        this.raycaster = new THREE.Raycaster();
        this.projects = [];
        this.selectedProject = null;
        this.isAnimating = false;
        this.isInitialized = false;
        
        // Initialize the showcase
        this.loadDependencies(() => {
            this.setupContainer();
            this.loadProjectData(); // This will now use only hardcoded data
            this.setupScene();
            this.setupCamera();
            this.setupRenderer();
            this.setupLighting();
            this.setupControls();
            this.setupPostProcessing();
            this.setupEventListeners();
            
            // Create visual elements
            this.createGrid();
            this.createLightBeams();
            this.createProjectCards();
            
            // Initial update for selected view mode
            this.updateCardPositions();
            
            // Start animation loop
            this.isInitialized = true;
            this.animate();
            
            // Hide loading screen
            const loadingScreen = document.querySelector('.projects-3d-loading');
            if (loadingScreen) {
                loadingScreen.style.display = 'none';
                
                // Show tutorial/hint if it's first time
                this.showHint('Use the view modes above for different perspectives<br>Click on projects to view details');
            }
            
            console.log('3D showcase initialized successfully');
        });
    },
    
    // Load required dependencies with fallbacks
    loadDependencies: function(callback) {
        // Create necessary fallbacks for missing THREE components
        if (window.THREE && !window.THREE.OrbitControls) {
            console.log('Creating fallback for OrbitControls');
            
            window.THREE.OrbitControls = function(camera, domElement) {
                this.object = camera;
                this.domElement = domElement;
                
                // Default properties
                this.enableDamping = false;
                this.dampingFactor = 0.05;
                this.enableZoom = true;
                this.autoRotate = false;
                this.autoRotateSpeed = 2.0;
                this.minDistance = 0;
                this.maxDistance = Infinity;
                this.minPolarAngle = 0;
                this.maxPolarAngle = Math.PI;
                
                // Simple update method for autorotation
                this.update = function() {
                    if (this.autoRotate) {
                        const rotationSpeed = 0.002 * this.autoRotateSpeed;
                        const x = camera.position.x;
                        const z = camera.position.z;
                        
                        camera.position.x = x * Math.cos(rotationSpeed) - z * Math.sin(rotationSpeed);
                        camera.position.z = z * Math.cos(rotationSpeed) + x * Math.sin(rotationSpeed);
                        camera.lookAt(0, 0, 0);
                    }
                    return true;
                };
                
                // Add simple mouse control
                let isMouseDown = false;
                let lastMousePosition = { x: 0, y: 0 };
                
                domElement.addEventListener('mousedown', (e) => {
                    isMouseDown = true;
                    lastMousePosition = { x: e.clientX, y: e.clientY };
                });
                
                domElement.addEventListener('mousemove', (e) => {
                    if (!isMouseDown) return;
                    
                    const dx = e.clientX - lastMousePosition.x;
                    const dy = e.clientY - lastMousePosition.y;
                    
                    const radius = Math.sqrt(camera.position.x * camera.position.x + 
                                           camera.position.z * camera.position.z);
                    
                    let theta = Math.atan2(camera.position.x, camera.position.z);
                    theta -= dx * 0.01;
                    
                    let phi = Math.atan2(Math.sqrt(camera.position.x * camera.position.x + 
                                                 camera.position.z * camera.position.z), 
                                       camera.position.y);
                    phi -= dy * 0.01;
                    
                    // Limit phi to avoid gimbal lock
                    phi = Math.max(0.1, Math.min(Math.PI - 0.1, phi));
                    
                    camera.position.x = radius * Math.sin(phi) * Math.sin(theta);
                    camera.position.y = radius * Math.cos(phi);
                    camera.position.z = radius * Math.sin(phi) * Math.cos(theta);
                    
                    camera.lookAt(0, 0, 0);
                    lastMousePosition = { x: e.clientX, y: e.clientY };
                });
                
                domElement.addEventListener('mouseup', () => {
                    isMouseDown = false;
                });
                
                domElement.addEventListener('wheel', (e) => {
                    if (!this.enableZoom) return;
                    
                    const delta = -Math.sign(e.deltaY);
                    const factor = 1.1;
                    const zoom = delta > 0 ? 1 / factor : factor;
                    
                    const distance = camera.position.length();
                    if ((distance * zoom > this.minDistance) && 
                        (distance * zoom < this.maxDistance)) {
                        camera.position.multiplyScalar(zoom);
                    }
                    
                    camera.lookAt(0, 0, 0);
                    e.preventDefault();
                });
                
                // Stubs for unused methods
                this.addEventListener = function() {};
                this.removeEventListener = function() {};
                this.dispose = function() {};
                
                // Initialize
                this.target = new THREE.Vector3(0, 0, 0);
            };
        }
        
        // Create fallbacks for post-processing if needed
        if (window.THREE && !window.THREE.EffectComposer) {
            console.log('Creating fallbacks for post-processing effects');
            
            // Simple EffectComposer fallback that just renders the scene
            window.THREE.EffectComposer = function(renderer) {
                this.renderer = renderer;
                this.addPass = function() {};
                this.render = function() {
                    if (this.renderer && supremeProjectViewer.scene && supremeProjectViewer.camera) {
                        this.renderer.render(supremeProjectViewer.scene, supremeProjectViewer.camera);
                    }
                };
            };
            
            // Empty implementations for other required classes
            window.THREE.RenderPass = function() {};
            window.THREE.UnrealBloomPass = function() {};
        }
        
        // All dependencies handled, proceed with initialization
        callback();
    },

    // Set up container for the 3D viewer
    setupContainer: function() {
        this.container = document.getElementById('projects-3d-view');
        
        if (!this.container) {
            console.error('Container element #projects-3d-view not found');
            return;
        }
        
        // Clear any existing content
        while (this.container.firstChild) {
            this.container.removeChild(this.container.firstChild);
        }
        
        // Add UI overlay for controls
        const controlsOverlay = document.createElement('div');
        controlsOverlay.className = 'projects-3d-controls';
        controlsOverlay.innerHTML = `
            <div class="view-mode-controls">
                <button class="view-control-btn" data-mode="carousel" title="Carousel View">
                    <i class="fas fa-sync-alt"></i> Carousel
                </button>
                <button class="view-control-btn" data-mode="orbit" title="Free Orbit View">
                    <i class="fas fa-globe"></i> Orbit
                </button>
                <button class="view-control-btn" data-mode="focus" title="Focus View">
                    <i class="fas fa-search"></i> Focus
                </button>
                <button class="view-control-btn" data-mode="sphere" title="Sphere View">
                    <i class="fas fa-circle"></i> Sphere
                </button>
                <button class="view-control-btn" data-mode="helix" title="Helix View">
                    <i class="fas fa-dna"></i> Helix
                </button>
                <button class="view-control-btn" data-mode="grid" title="Grid View">
                    <i class="fas fa-th"></i> Grid
                </button>
            </div>
            <div class="projects-3d-tools">
                <button class="tool-btn" id="screenshot-btn" title="Take Screenshot">
                    <i class="fas fa-camera"></i>
                </button>
                <button class="tool-btn" id="fullscreen-btn" title="Toggle Fullscreen">
                    <i class="fas fa-expand"></i>
                </button>
                <button class="tool-btn" id="reset-view-btn" title="Reset View">
                    <i class="fas fa-undo"></i>
                </button>
                <button class="tool-btn" id="theme-toggle-btn" title="Toggle Theme">
                    <i class="fas fa-adjust"></i>
                </button>
                <button class="tool-btn" id="rotate-toggle-btn" title="Toggle Auto-Rotation">
                    <i class="fas fa-redo-alt"></i>
                </button>
            </div>
            <div class="projects-3d-info-panel">
                <h3 class="info-title">Select a project</h3>
                <p class="info-description">Click on a project card to view details</p>
                <div class="info-meta">
                    <div class="info-meta-item">
                        <i class="fas fa-calendar-alt"></i>
                        <span class="info-year">Year</span>
                    </div>
                    <div class="info-meta-item">
                        <i class="fas fa-code-branch"></i>
                        <span class="info-type">Type</span>
                    </div>
                </div>
                <div class="info-tags"></div>
                <div class="info-links">
                    <button class="info-link-btn view-details-btn">
                        <i class="fas fa-info-circle"></i> Details
                    </button>
                    <button class="info-link-btn view-demo-btn">
                        <i class="fas fa-external-link-alt"></i> Demo
                    </button>
                </div>
            </div>
            <div class="quantum-particles"></div>
        `;
        
        this.container.appendChild(controlsOverlay);
        
        // Add event listeners to controls
        const viewButtons = controlsOverlay.querySelectorAll('.view-control-btn');
        viewButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                // Update active button
                viewButtons.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                
                // Set view mode
                this.setViewMode(btn.getAttribute('data-mode'));
            });
        });
        
        // Set default active button
        const defaultButton = controlsOverlay.querySelector(`.view-control-btn[data-mode="${this.config.viewMode}"]`);
        if (defaultButton) defaultButton.classList.add('active');
        
        // Add screenshot functionality
        const screenshotBtn = controlsOverlay.querySelector('#screenshot-btn');
        if (screenshotBtn) {
            screenshotBtn.addEventListener('click', () => this.takeScreenshot());
        }
        
        // Add fullscreen functionality
        const fullscreenBtn = controlsOverlay.querySelector('#fullscreen-btn');
        if (fullscreenBtn) {
            fullscreenBtn.addEventListener('click', () => this.toggleFullscreen());
        }
        
        // Add reset view functionality
        const resetViewBtn = controlsOverlay.querySelector('#reset-view-btn');
        if (resetViewBtn) {
            resetViewBtn.addEventListener('click', () => this.resetView());
        }
        
        // Add theme toggle functionality
        const themeToggleBtn = controlsOverlay.querySelector('#theme-toggle-btn');
        if (themeToggleBtn) {
            themeToggleBtn.addEventListener('click', () => this.toggleTheme());
        }
        
        // Add rotation toggle functionality
        const rotateToggleBtn = controlsOverlay.querySelector('#rotate-toggle-btn');
        if (rotateToggleBtn) {
            rotateToggleBtn.addEventListener('click', () => this.toggleAutoRotation());
            
            // Set initial state class
            if (this.config.autoRotate) {
                rotateToggleBtn.classList.add('active');
            }
        }
        
        // Add quantum particles to container
        this.createQuantumParticles();
    },
    
    // Load project data (ONLY HARDCODED)
    loadProjectData: function() {
        this.projects = [
            {
                id: 'project-1',
                title: 'TakaDenGoruNen.com',
                description: 'Specialized e-commerce platform for the livestock market',
                image: 'images/projects/takaden.png',
                techTags: ['html', 'css', 'javascript', 'ecommerce', 'community'],
                type: 'web',
                year: '2022',
                demoUrl: 'https://takadengorunen.netlify.app/'
            },
            {
                id: 'project-2',
                title: 'THETAEnhancer',
                description: 'Next leap in AI image enhancement technology',
                image: 'images/projects/ai-enhancer.jpg',
                techTags: ['deeplearning', 'computervision', 'imageprocessing', 'python'],
                type: 'ai',
                year: '2023',
                demoUrl: 'https://thetaenhancer.onrender.com'
            },
            {
                id: 'project-3',
                title: 'Interactive Coding Projects',
                description: 'Collection of HTML5 games and utility web applications',
                image: 'images/projects/html5.jpg',
                techTags: ['html5', 'javascript', 'webapps', 'css'],
                type: 'game',
                year: '2023',
                demoUrl: 'projects/html5.html'
            },
            {
                id: 'project-4',
                title: 'Breakout Arcade',
                description: 'Classic brick-breaker with modern physics and power-ups',
                image: 'images/projects/break.jpg',
                techTags: ['javascript', 'canvas', 'physics'],
                type: 'game',
                year: '2022',
                demoUrl: 'games/breakout.html'
            },
            {
                id: 'project-5',
                title: 'RoboTheta',
                description: 'Next-generation firefighting robot with AI-driven decision making',
                image: 'images/projects/robotheta.jpg',
                techTags: ['ai', 'robotics', 'thermalimaging', 'python', 'sensors'],
                type: 'ai',
                year: '2023',
                demoUrl: null
            },
            {
                id: 'project-6',
                title: 'Interactive 3D Game',
                description: 'Immersive FPS experience with high-fidelity graphics',
                image: 'images/projects/3d.jpg',
                techTags: ['unrealengine', 'python', 'gamedev', '3d'],
                type: 'game',
                year: '2022',
                demoUrl: null
            },
            {
                id: 'project-7',
                title: 'Dynamic Web Interfaces',
                description: 'Ultra-advanced CSS animations for engaging web experiences',
                image: 'images/projects/dynamic.jpg',
                techTags: ['css', 'animation', 'ux', 'ui', 'javascript'],
                type: 'web',
                year: '2023',
                demoUrl: null
            },
            {
                id: 'project-8',
                title: 'AI-Powered Data Visualizer',
                description: 'Interactive platform transforming complex data into intuitive graphics',
                image: 'images/projects/datavizu.jpg',
                techTags: ['datavisualization', 'aianalytics', 'interactivedesign', 'python', 'javascript'],
                type: 'data',
                year: '2023',
                demoUrl: null
            },
            {
                id: 'project-9',
                title: '3D Virtual Tour',
                description: 'Immersive exploration of realistic 3D environments',
                image: 'images/projects/3d.jpg',
                techTags: ['threejs', 'webgl', '3dmodeling', 'javascript'],
                type: 'web',
                year: '2023',
                demoUrl: null
            },
            {
                id: 'project-10',
                title: 'Real-Time Multiplayer Game',
                description: 'Online competitive gameplay with advanced animations',
                image: 'images/projects/multiplayer.jpg',
                techTags: ['websockets', 'gamedev', 'realtime', 'javascript', 'nodejs'],
                type: 'game',
                year: '2022',
                demoUrl: null
            },
            {
                id: 'project-11',
                title: 'Quantum Code Simulator',
                description: 'Visualizing quantum algorithms through interactive simulation',
                image: 'images/projects/quantum.jpg',
                techTags: ['quantumcomputing', 'simulation', 'visualization', 'python'],
                type: 'ai',
                year: '2023',
                demoUrl: null
            },
            {
                id: 'project-12',
                title: 'Handwritten Digit Recognizer',
                description: 'Deep learning project for digit recognition',
                image: 'images/projects/handwritten.jpg',
                techTags: ['python', 'deeplearning', 'neuralnetworks', 'tensorflow', 'keras'],
                type: 'ai',
                year: '2023',
                demoUrl: null
            },
            {
                id: 'project-13',
                title: 'KNN Breast Cancer Diagnosis',
                description: 'Machine learning model for cancer diagnosis',
                image: 'images/projects/knn.jpg',
                techTags: ['python', 'machinelearning', 'knn', 'jupyter', 'scikitlearn'],
                type: 'ai',
                year: '2023',
                demoUrl: null
            },
            {
                id: 'project-14',
                title: 'Handwritten Digit Recognizer',
                description: 'Deep learning project for digit recognition',
                image: 'images/projects/handwritten.jpg',
                techTags: ['python', 'deeplearning', 'neuralnetworks', 'tensorflow', 'keras'],
                type: 'ai',
                year: '2023',
                demoUrl: null
            },
            {
                id: 'project-15',
                title: 'KNeighborsClassifier',
                description: 'Implementation of KNN algorithm',
                image: 'images/projects/knnclass.jpg',
                techTags: ['python', 'machinelearning', 'knn', 'classification', 'scikitlearn'],
                type: 'ai',
                year: '2023',
                demoUrl: null
            },
            {
                id: 'project-16',
                title: 'Plant Disease Prediction',
                description: 'AI-powered plant disease detection system',
                image: 'images/projects/plant.jpg',
                techTags: ['python', 'imageprocessing', 'agriculture', 'computervision', 'deeplearning'],
                type: 'ai',
                year: '2023',
                demoUrl: null
            },
            {
                id: 'project-17',
                title: 'Decision Tree Classifier',
                description: 'Implementation of Decision Tree algorithm',
                image: 'images/projects/decision.jpg',
                techTags: ['python', 'machinelearning', 'decisiontrees', 'scikitlearn'],
                type: 'ai',
                year: '2023',
                demoUrl: null
            },
            {
                id: 'project-18',
                title: 'CSE Toolkit v4.2',
                description: 'Advanced toolkit for CSE students',
                image: 'images/projects/csetoolkit4.jpg',
                techTags: ['python', 'automation', 'educational', 'scripting'],
                type: 'tools',
                year: '2023',
                demoUrl: null
            },
            {
                id: 'project-19',
                title: 'CSE Toolkit 5.0',
                description: 'Latest version of the ultimate academic companion',
                image: 'images/projects/cse5.jpg',
                techTags: ['python', 'automation', 'educational', 'scripting'],
                type: 'tools',
                year: '2023',
                demoUrl: null
            },
            {
                id: 'project-20',
                title: 'Image Classifier',
                description: 'Deep learning based image classifier',
                image: 'images/projects/image.jpg',
                techTags: ['python', 'deeplearning', 'computervision', 'tensorflow', 'keras'],
                type: 'ai',
                year: '2023',
                demoUrl: null
            },
            {
                id: 'project-21',
                title: 'Stroke Risk Assessment',
                description: 'Deep learning model for medical risk assessment',
                image: 'images/projects/strock.jpg',
                techTags: ['python', 'deeplearning', 'healthcare', 'tensorflow', 'keras'],
                type: 'ai',
                year: '2023',
                demoUrl: null
            },
            {
                id: 'project-22',
                title: 'Portfolio Demo 1',
                description: 'Portfolio website design demo',
                image: 'images/projects/portdem.jpg',
                techTags: ['html', 'css', 'webdesign'],
                type: 'web',
                year: '2023',
                demoUrl: null
            },
            {
                id: 'project-23',
                title: 'Premium Portfolio',
                description: 'Premium portfolio web application',
                image: 'images/projects/premiumport.jpg',
                techTags: ['html', 'css', 'javascript', 'webdesign'],
                type: 'web',
                year: '2023',
                demoUrl: null
            },
            {
                id: 'project-24',
                title: 'NeuralForge',
                description: 'Advanced neural architecture for language understanding',
                image: 'images/projects/nural.jpg',
                techTags: ['neuralnetworks', 'naturallanguage', 'transformers', 'python', 'ai', 'reinforcementlearning'],
                type: 'ai',
                year: 'future',
                demoUrl: null
            },
            {
                id: 'project-25',
                title: 'TaskFlow AI',
                description: 'Intelligent task management app with AI-powered scheduling and prioritization for iOS & Android.',
                image: 'images/projects/taskflow.png',
                techTags: ['reactnative', 'javascript', 'firebase', 'ai', 'redux'],
                type: 'mobile',
                year: '2024',
                demoUrl: null
            },
            {
                id: 'project-26',
                title: 'LocalVibe Connect',
                description: 'iOS app connecting users to local events, meetups, and community activities based on interests.',
                image: 'images/projects/localvibe.png',
                techTags: ['swift', 'ios', 'coreml', 'mapkit', 'uikit'],
                type: 'mobile',
                year: '2023',
                demoUrl: null
            },
            {
                id: 'project-27',
                title: 'FitForge Pro',
                description: 'Personalized fitness planner and tracker for Android and Wear OS with adaptive workout routines.',
                image: 'images/projects/fitforge.png',
                techTags: ['kotlin', 'android', 'jetpackcompose', 'healthkit', 'wearos'],
                type: 'mobile',
                year: '2023',
                demoUrl: null
            },
            {
                id: 'project-28',
                title: 'EcoThread Mobile',
                description: 'Cross-platform marketplace app connecting buyers with sustainable and ethical fashion brands.',
                image: 'images/projects/ecothread.png',
                techTags: ['flutter', 'dart', 'ecommerce', 'stripe', 'firebase'],
                type: 'mobile',
                year: '2022',
                demoUrl: null
            },
            {
                id: 'project-29',
                title: 'StoryScape AR',
                description: 'Mobile app bringing children\'s stories to life through interactive augmented reality experiences.',
                image: 'images/projects/storyscape.png',
                techTags: ['unity', 'csharp', 'arfoundation', 'arkit', 'arcore', 'storytelling'],
                type: 'mobile',
                year: '2024',
                demoUrl: null
            },
            {
                id: 'project-30',
                title: 'VisionX',
                description: 'Advanced object detection in challenging environments',
                image: 'images/projects/visionx.jpg',
                techTags: ['computervision', 'objectdetection', 'realtime', 'python', 'ai'],
                type: 'ai',
                year: 'future',
                demoUrl: null
            },
            {
                id: 'project-31',
                title: 'FluidUI Framework',
                description: 'Adaptive UI framework that learns from user behavior',
                image: 'images/projects/fuid.jpg',
                techTags: ['ui', 'ux', 'responsive', 'adaptive', 'javascript', 'css', 'framework'],
                type: 'web',
                year: 'future',
                demoUrl: null
            },
            {
                id: 'project-32',
                title: 'HoloWeb',
                description: 'Holographic-like 3D experiences for standard browsers',
                image: 'images/projects/holo.jpg',
                techTags: ['webgl', '3d', 'immersive', 'threejs', 'javascript'],
                type: 'web',
                year: 'future',
                demoUrl: null
            },
            {
                id: 'project-33',
                title: 'PredictiveInsights',
                description: 'Explainable predictive analytics platform',
                image: 'images/projects/predictive.jpg',
                techTags: ['predictiveanalytics', 'explainableai', 'forecasting', 'python', 'ai'],
                type: 'data',
                year: 'future',
                demoUrl: null
            },
            {
                id: 'project-34',
                title: 'DataNexus',
                description: 'Intelligent data integration platform',
                image: 'images/projects/datanexus.jpg',
                techTags: ['dataintegration', 'etl', 'schemadesign', 'python', 'sql'],
                type: 'data',
                year: 'future',
                demoUrl: null
            },
            {
                id: 'project-35',
                title: 'TrustChain',
                description: 'Blockchain-based supply chain verification platform',
                image: 'images/projects/blogchai.jpg',
                techTags: ['blockchain', 'supplychain', 'enterprise', 'solidity'],
                type: 'blockchain',
                year: 'future',
                demoUrl: null
            },
            {
                id: 'project-36',
                title: 'DecentralFinance',
                description: 'Advanced DeFi platform with cross-chain capabilities',
                image: 'images/projects/dcfina.jpg',
                techTags: ['defi', 'crosschain', 'smartcontracts', 'solidity', 'blockchain'],
                type: 'blockchain',
                year: 'future',
                demoUrl: null
            },
            {
                id: 'project-37',
                title: 'QuantumRealm',
                description: 'VR game exploring quantum physics principles',
                image: 'images/projects/quantum.jpg',
                techTags: ['vr', 'physicssimulation', 'educational', 'unity', 'csharp', 'game'],
                type: 'game',
                year: 'future',
                demoUrl: null
            },
            {
                id: 'project-38',
                title: 'EcoSphere',
                description: 'Immersive ecological simulation game',
                image: 'images/projects/ecospe.jpg',
                techTags: ['simulation', 'ecosystem', 'aibehavior', 'unity', 'csharp', 'game'],
                type: 'game',
                year: 'future',
                demoUrl: null
            },
            {
                id: 'project-39',
                title: 'DevForge',
                description: 'AI-powered developer productivity suite',
                image: 'images/projects/devforge.jpg',
                techTags: ['developertools', 'aiassisted', 'automation', 'python', 'javascript'],
                type: 'tools',
                year: 'future',
                demoUrl: null
            },
            {
                id: 'project-40',
                title: 'SecurityVault',
                description: 'Comprehensive cybersecurity assessment toolkit',
                image: 'images/projects/securityvault.jpg',
                techTags: ['cybersecurity', 'penetrationtesting', 'threatdetection', 'python', 'bash'],
                type: 'tools',
                year: 'future',
                demoUrl: null
            }
        ];
        
        // Generate positions for each project
        this.projects.forEach((project, index) => {
            // Position for carousel mode (circular arrangement)
            const angle = (index / this.projects.length) * Math.PI * 2;
            project.carouselPosition = new THREE.Vector3(
                Math.cos(angle) * this.config.carouselRadius,
                this.config.carouselHeight,
                Math.sin(angle) * this.config.carouselRadius
            );
            
            // Random position for orbit mode
            project.orbitPosition = new THREE.Vector3(
                (Math.random() - 0.5) * 30,
                (Math.random() - 0.5) * 15,
                (Math.random() - 0.5) * 30
            );
            
            // Focus position (will be set when focusing)
            project.focusPosition = new THREE.Vector3(0, 0, 0);
            
            // Current rotation value for animation
            project.rotation = 0;
            
            // Reference to the 3D object (will be set later)
            project.object = null;
        });
        
        console.log(`Loaded ${this.projects.length} projects for 3D visualization (hardcoded)`);
    },
    
    // Set up Three.js scene
    setupScene: function() {
        this.scene = new THREE.Scene();
        this.scene.background = new THREE.Color(this.config.backgroundColor);
        
        // Add subtle fog for depth
        this.scene.fog = new THREE.FogExp2(this.config.backgroundColor, 0.02);
    },
    
    // Set up camera
    setupCamera: function() {
        const { width, height } = this.container.getBoundingClientRect();
        const aspect = width / height;
        
        this.camera = new THREE.PerspectiveCamera(45, aspect, 0.1, 1000);
        this.camera.position.set(
            this.config.initialCameraPosition.x,
            this.config.initialCameraPosition.y,
            this.config.initialCameraPosition.z
        );
        this.camera.lookAt(0, 0, 0);
    },
    
    // Set up WebGL renderer
    setupRenderer: function() {
        const { width, height } = this.container.getBoundingClientRect();
        
        this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
        this.renderer.setSize(width, height);
        this.renderer.setPixelRatio(window.devicePixelRatio);
        this.renderer.shadowMap.enabled = true;
        this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
        
        this.container.appendChild(this.renderer.domElement);
    },
    
    // Set up lighting
    setupLighting: function() {
        // Ambient light for general illumination
        const ambientLight = new THREE.AmbientLight(0x333344, 0.5);
        this.scene.add(ambientLight);
        
        // Main directional light with shadows
        const mainLight = new THREE.DirectionalLight(0xaaccff, 1);
        mainLight.position.set(10, 20, 15);
        mainLight.castShadow = true;
        
        // Configure shadow properties
        mainLight.shadow.mapSize.width = 2048;
        mainLight.shadow.mapSize.height = 2048;
        mainLight.shadow.camera.near = 0.5;
        mainLight.shadow.camera.far = 50;
        mainLight.shadow.camera.left = -20;
        mainLight.shadow.camera.right = 20;
        mainLight.shadow.camera.top = 20;
        mainLight.shadow.camera.bottom = -20;
        
        this.scene.add(mainLight);
        
        // Add rim light from opposite side
        const rimLight = new THREE.DirectionalLight(0x6699cc, 0.7);
        rimLight.position.set(-15, 10, -15);
        this.scene.add(rimLight);
        
        // Add colored accent lights
        const blueLight = new THREE.PointLight(0x3366ff, 2, 20);
        blueLight.position.set(-10, 2, -12);
        this.scene.add(blueLight);
        
        const purpleLight = new THREE.PointLight(0x9933ff, 2, 20);
        purpleLight.position.set(10, 2, -12);
        this.scene.add(purpleLight);
    },
    
    // Set up camera controls
    setupControls: function() {
        if (typeof THREE.OrbitControls === 'function') {
            this.controls = new THREE.OrbitControls(this.camera, this.renderer.domElement);
            this.controls.enableDamping = true;
            this.controls.dampingFactor = 0.05;
            this.controls.minDistance = this.config.orbitMinDistance;
            this.controls.maxDistance = this.config.orbitMaxDistance;
            this.controls.autoRotate = false;
            this.controls.autoRotateSpeed = 1.0;
        } else {
            console.warn('OrbitControls not available, using fallback controls');
        }
    },
    
    // Set up post-processing effects
    setupPostProcessing: function() {
        // Skip if EffectComposer is not available
        if (typeof THREE.EffectComposer !== 'function') {
            console.warn('EffectComposer not available, skipping post-processing setup');
            return;
        }

        try {
            // Create composer
            this.composer = new THREE.EffectComposer(this.renderer);
            
            // Add render pass
            if (typeof THREE.RenderPass === 'function') {
                const renderPass = new THREE.RenderPass(this.scene, this.camera);
                this.composer.addPass(renderPass);
            }
            
            // Add bloom pass for glow effects
            if (typeof THREE.UnrealBloomPass === 'function') {
                const bloomPass = new THREE.UnrealBloomPass(
                    new THREE.Vector2(window.innerWidth, window.innerHeight),
                    this.config.bloomStrength,
                    this.config.bloomRadius,
                    this.config.bloomThreshold
                );
                this.composer.addPass(bloomPass);
            }
        } catch (error) {
            console.error('Error setting up post-processing:', error);
            this.composer = null;
        }
    },
    
    // Set up event listeners
    setupEventListeners: function() {
        // Window resize
        window.addEventListener('resize', () => this.handleResize());
        
        // Mouse movement for interaction
        this.renderer.domElement.addEventListener('mousemove', (event) => this.handleMouseMove(event));
        
        // Mouse click for selection
        this.renderer.domElement.addEventListener('click', (event) => this.handleClick(event));
        
        // Key press for navigation
        window.addEventListener('keydown', (event) => this.handleKeyDown(event));
    },
    
    // Create floor grid for reference
    createGrid: function() {
        // Create floor grid
        const gridSize = this.config.floorSize;
        const gridDivisions = gridSize / this.config.floorSpacing;
        
        const gridHelper = new THREE.GridHelper(
            gridSize, 
            gridDivisions,
            this.config.floorColor1,
            this.config.floorColor2
        );
        
        gridHelper.position.y = -5;
        this.scene.add(gridHelper);
        
        // Create circular platform
        const platformGeometry = new THREE.CircleGeometry(gridSize * 0.4, 32);
        const platformMaterial = new THREE.MeshStandardMaterial({
            color: 0x1a2a4a,
            metalness: 0.8,
            roughness: 0.4,
            emissive: 0x112233,
            emissiveIntensity: 0.2
        });
        
        const platform = new THREE.Mesh(platformGeometry, platformMaterial);
        platform.rotation.x = -Math.PI / 2;
        platform.position.y = -4.99;
        platform.receiveShadow = true;
        this.scene.add(platform);
        
        // Add glowing ring around platform
        const ringGeometry = new THREE.RingGeometry(gridSize * 0.4, gridSize * 0.42, 64);
        const ringMaterial = new THREE.MeshBasicMaterial({
            color: 0x3366cc,
            side: THREE.DoubleSide,
            transparent: true,
            opacity: 0.7
        });
        
        const ring = new THREE.Mesh(ringGeometry, ringMaterial);
        ring.rotation.x = -Math.PI / 2;
        ring.position.y = -4.98;
        this.scene.add(ring);
        
        // Animate the ring
        this.animateRing(ring, 0x3366cc, 0x33ccff);
    },
    
    // Animate a ring with customized behavior
    animateRing: function(ring, color1, color2) {
        let phase = 0;
        
        const animate = () => {
            if (!this.isInitialized) return;
            
            phase += 0.01;
            const opacity = 0.3 + Math.sin(phase) * 0.2;
            
            if (ring.material) {
                // Pulse opacity
                ring.material.opacity = opacity;
                
                // Cycle colors
                const r = (Math.sin(phase * 0.5) * 0.5 + 0.5);
                ring.material.color.setRGB(
                    r * ((color1 >> 16) & 0xff) / 255 + (1 - r) * ((color2 >> 16) & 0xff) / 255,
                    r * ((color1 >> 8) & 0xff) / 255 + (1 - r) * ((color2 >> 8) & 0xff) / 255,
                    r * (color1 & 0xff) / 255 + (1 - r) * (color2 & 0xff) / 255
                );
            }
            
            requestAnimationFrame(animate);
        };
        
        animate();
    },
    
    // Create animated light beams in the scene
    createLightBeams: function() {
        // Add vertical light beams at the edges
        const beamPositions = [
            { x: -this.config.floorSize * 0.35, z: -this.config.floorSize * 0.35 },
            { x: -this.config.floorSize * 0.35, z: this.config.floorSize * 0.35 },
            { x: this.config.floorSize * 0.35, z: -this.config.floorSize * 0.35 },
            { x: this.config.floorSize * 0.35, z: this.config.floorSize * 0.35 }
        ];
        
        beamPositions.forEach((pos, index) => {
            this.createLightBeam(
                pos.x, 
                pos.z, 
                0x3366cc, 
                0x6699ff, 
                0.2 + index * 0.1
            );
        });
    },
    
    // Create a single animated light beam
    createLightBeam: function(x, z, color, emissive, phase = 0) {
        const height = 30;
        const radius = 0.2;
        
        // Create geometry and material
        const geometry = new THREE.CylinderGeometry(radius, radius, height, 16, 10, true);
        const material = new THREE.MeshStandardMaterial({
            color: color,
            emissive: emissive,
            emissiveIntensity: 0.5,
            transparent: true,
            opacity: 0.3,
            side: THREE.DoubleSide
        });
        
        // Create the beam and position it
        const beam = new THREE.Mesh(geometry, material);
        beam.position.set(x, height / 2 - 5, z);
        this.scene.add(beam);
        
        // Add glow
        const glowGeometry = new THREE.CylinderGeometry(radius * 1.5, radius * 1.5, height, 16, 10, true);
        const glowMaterial = new THREE.MeshBasicMaterial({
            color: color,
            transparent: true,
            opacity: 0.15,
            side: THREE.DoubleSide
        });
        
        const glow = new THREE.Mesh(glowGeometry, glowMaterial);
        beam.add(glow);
        
        // Animate the beam
        let currentPhase = phase || 0;
        
        const animateBeam = () => {
            if (!this.isInitialized) return;
            
            currentPhase += 0.02;
            
            // Pulse opacity
            const opacity = 0.2 + Math.sin(currentPhase) * 0.1;
            material.opacity = opacity;
            glowMaterial.opacity = opacity * 0.5;
            
            // Pulse emissive intensity
            material.emissiveIntensity = 0.5 + Math.sin(currentPhase * 0.5) * 0.3;
            
            requestAnimationFrame(animateBeam);
        };
        
        animateBeam();
        
        return beam;
    },
    
    // Create animated particles
    createParticles: function() {
        const particleCount = 500;
        const geometry = new THREE.BufferGeometry();
        const positions = new Float32Array(particleCount * 3);
        const velocities = new Float32Array(particleCount * 3);
        const colors = new Float32Array(particleCount * 3);
        const sizes = new Float32Array(particleCount);
        
        const colorOptions = [
            new THREE.Color(0x3366ff),
            new THREE.Color(0x6699ff),
            new THREE.Color(0x99ccff)
        ];
        
        for (let i = 0; i < particleCount; i++) {
            // Random position within a sphere
            const radius = 20 + Math.random() * 20;
            const theta = Math.random() * Math.PI * 2;
            const phi = Math.acos(2 * Math.random() - 1);
            
            positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
            positions[i * 3 + 1] = (Math.random() - 0.5) * 20;
            positions[i * 3 + 2] = radius * Math.sin(phi) * Math.sin(theta);
            
            // Random velocity
            velocities[i * 3] = (Math.random() - 0.5) * 0.05;
            velocities[i * 3 + 1] = (Math.random() - 0.5) * 0.05;
            velocities[i * 3 + 2] = (Math.random() - 0.5) * 0.05;
            
            // Random color from options
            const color = colorOptions[Math.floor(Math.random() * colorOptions.length)];
            colors[i * 3] = color.r;
            colors[i * 3 + 1] = color.g;
            colors[i * 3 + 2] = color.b;
            
            // Random size
            sizes[i] = Math.random() * 0.5 + 0.1;
        }
        
        geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
        geometry.setAttribute('velocity', new THREE.BufferAttribute(velocities, 3));
        geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
        geometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1));
        
        // Create material for particles
        const material = new THREE.PointsMaterial({
            size: 0.5,
            vertexColors: true,
            transparent: true,
            opacity: 0.6,
            blending: THREE.AdditiveBlending
        });
        
        // Create point cloud
        const particles = new THREE.Points(geometry, material);
        this.scene.add(particles);
        
        // Animate particles
        const animateParticles = () => {
            if (!this.isInitialized) return;
            
            const positions = particles.geometry.attributes.position.array;
            const velocities = particles.geometry.attributes.velocity.array;
            
            // Update each particle position
            for (let i = 0; i < particleCount; i++) {
                positions[i * 3] += velocities[i * 3];
                positions[i * 3 + 1] += velocities[i * 3 + 1];
                positions[i * 3 + 2] += velocities[i * 3 + 2];
                
                // Bounds checking to keep particles within range
                const distance = Math.sqrt(
                    positions[i * 3] * positions[i * 3] + 
                    positions[i * 3 + 2] * positions[i * 3 + 2]
                );
                
                if (distance > 40 || distance < 5 || 
                    Math.abs(positions[i * 3 + 1]) > 20) {
                    // Reset particle to a new position
                    const radius = 20 + Math.random() * 20;
                    const theta = Math.random() * Math.PI * 2;
                    const phi = Math.acos(2 * Math.random() - 1);
                    
                    positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
                    positions[i * 3 + 1] = (Math.random() - 0.5) * 20;
                    positions[i * 3 + 2] = radius * Math.sin(phi) * Math.sin(theta);
                }
            }
            
            particles.geometry.attributes.position.needsUpdate = true;
            requestAnimationFrame(animateParticles);
        };
        
        animateParticles();
        
        return particles;
    },
    
    // Create project cards in 3D space
    createProjectCards: function() {
        // Create texture loader
        const textureLoader = new THREE.TextureLoader();
        textureLoader.crossOrigin = 'anonymous';
        
        // Loop through projects and create 3D cards
        this.projects.forEach((project, index) => {
            // Card dimensions
            const width = 4;
            const height = 3;
            const depth = 0.1;
            
            // Create a group for the project card and extras
            const cardGroup = new THREE.Group();
            
            // Create box for the card base
            const cardGeometry = new THREE.BoxGeometry(width, height, depth);
            
            // Material for the front (will attempt to load image)
            const frontMaterial = new THREE.MeshStandardMaterial({
                color: 0x0a0a3a,
                metalness: 0.7,
                roughness: 0.3,
                emissive: 0x0a0a3a,
                emissiveIntensity: 0.2,
            });
            
            // Material for other sides
            const sideMaterial = new THREE.MeshStandardMaterial({
                color: 0x0a0a3a,
                metalness: 0.7,
                roughness: 0.3,
                emissive: 0x0a0a3a,
                emissiveIntensity: 0.1,
            });
            
            // Create array of materials for the box sides
            const materials = [
                sideMaterial,   // right
                sideMaterial,   // left
                sideMaterial,   // top
                sideMaterial,   // bottom
                frontMaterial,  // front - will be replaced with image if available
                sideMaterial    // back
            ];
            
            // Create the card mesh with materials
            const cardMesh = new THREE.Mesh(cardGeometry, materials);
            cardMesh.castShadow = true;
            cardMesh.receiveShadow = true;
            cardGroup.add(cardMesh);
            
            // Load project image if available
            if (project.image && project.image !== '') {
                try {
                    textureLoader.load(
                        project.image,
                        (texture) => {
                            // Create material with loaded texture
                            const imageMaterial = new THREE.MeshStandardMaterial({
                                map: texture,
                                metalness: 0.3,
                                roughness: 0.7,
                                emissive: new THREE.Color(0x222233),
                                emissiveIntensity: 0.2
                            });
                            
                            // Replace front face material
                            if (cardMesh.material && Array.isArray(cardMesh.material)) {
                                cardMesh.material[4] = imageMaterial;
                            }
                        },
                        undefined,
                        (error) => {
                            console.error('Error loading texture:', error);
                            this.createFallbackFace(cardMesh, project);
                        }
                    );
                } catch (error) {
                    console.error('Error in texture loader:', error);
                    this.createFallbackFace(cardMesh, project);
                }
            } else {
                this.createFallbackFace(cardMesh, project);
            }
            
            // Add holographic effect overlay
            this.addHolographicEffect(cardMesh, width, height, depth);
            
            // Add title for the project
            const titleMesh = this.createProjectTitle(project);
            titleMesh.position.z = depth / 2 + 0.01;
            titleMesh.position.y = -height * 0.35;
            cardGroup.add(titleMesh);
            
            // Add tech tags at the bottom
            if (project.techTags && project.techTags.length > 0) {
                const tagsMesh = this.createProjectTags(project);
                tagsMesh.position.z = depth / 2 + 0.01;
                tagsMesh.position.y = -height * 0.15;
                cardGroup.add(tagsMesh);
            }
            
            // Add type badge at top right
            const typeMesh = this.createTypeBadge(project);
            typeMesh.position.z = depth / 2 + 0.01;
            typeMesh.position.x = width * 0.35;
            typeMesh.position.y = height * 0.35;
            cardGroup.add(typeMesh);
            
            // Add year badge at top left if available
            if (project.year) {
                const yearMesh = this.createYearBadge(project);
                yearMesh.position.z = depth / 2 + 0.01;
                yearMesh.position.x = -width * 0.35;
                yearMesh.position.y = height * 0.35;
                cardGroup.add(yearMesh);
            }
            
            // Store the project ID in userData for raycasting
            cardGroup.userData = { projectId: project.id };
            
            // Set initial position based on view mode
            cardGroup.position.copy(
                this.config.viewMode === 'carousel' 
                    ? project.carouselPosition 
                    : project.orbitPosition
            );
            
            // For carousel mode, make cards face the center
            if (this.config.viewMode === 'carousel') {
                cardGroup.lookAt(0, cardGroup.position.y, 0);
            }
            
            // Add connection line to the floor
            this.createConnectionLine(project);
            
            // Store reference in project data and add to scene
            project.object = cardGroup;
            this.scene.add(cardGroup);
        });
    },
    
    // Create a fallback face for cards without valid images
    createFallbackFace: function(cardMesh, project) {
        // Create a canvas for the fallback
        const canvas = document.createElement('canvas');
        canvas.width = 512;
        canvas.height = 384;
        const ctx = canvas.getContext('2d');
        
        // Fill background
        ctx.fillStyle = 'rgba(20, 30, 50, 0.8)';
        ctx.fillRect(0, 0, 512, 384);
        
        // Add grid pattern
        ctx.strokeStyle = 'rgba(100, 150, 255, 0.3)';
        ctx.lineWidth = 1;
        
        // Horizontal grid lines
        for (let i = 0; i <= 384; i += 32) {
            ctx.beginPath();
            ctx.moveTo(0, i);
            ctx.lineTo(512, i);
            ctx.stroke();
        }
        
        // Vertical grid lines
        for (let i = 0; i <= 512; i += 32) {
            ctx.beginPath();
            ctx.moveTo(i, 0);
            ctx.lineTo(i, 384);
            ctx.stroke();
        }
        
        // Add project type icon
        ctx.fillStyle = 'rgba(120, 180, 255, 0.8)';
        ctx.font = 'bold 60px Arial, sans-serif';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        
        // Choose icon based on project type
        let icon = '💻';
        if (project.type === 'mobile') icon = '📱';
        else if (project.type === 'ai') icon = '🧠';
        else if (project.type === 'game') icon = '🎮';
        else if (project.type === 'data') icon = '📊';
        else if (project.type === 'blockchain') icon = '🔗';
        
        ctx.fillText(icon, 256, 140);
        
        // Add project name
        ctx.font = '28px Arial, sans-serif';
        ctx.fillText(project.title, 256, 220);
        
        // Create texture from canvas
        const texture = new THREE.CanvasTexture(canvas);
        const material = new THREE.MeshStandardMaterial({
            map: texture,
            metalness: 0.5,
            roughness: 0.6,
            emissive: new THREE.Color(0x223344),
            emissiveIntensity: 0.3
        });
        
        // Replace front face material
        if (cardMesh.material && Array.isArray(cardMesh.material)) {
            cardMesh.material[4] = material;
        }
    },
    
    // Add holographic effect to a card
    addHolographicEffect: function(card, width, height, depth) {
        // Create a holographic overlay
        const holoGeometry = new THREE.PlaneGeometry(width * 0.98, height * 0.98);
        
        // Create canvas for holographic texture
        const canvas = document.createElement('canvas');
        canvas.width = 256;
        canvas.height = 192;
        const ctx = canvas.getContext('2d');
        
        // Draw grid pattern
        ctx.fillStyle = 'rgba(10, 20, 40, 0)';
        ctx.fillRect(0, 0, 256, 192);
        
        ctx.strokeStyle = 'rgba(100, 180, 255, 0.15)';
        ctx.lineWidth = 1;
        
        // Horizontal grid lines
        for (let i = 0; i < 192; i += 8) {
            ctx.beginPath();
            ctx.moveTo(0, i);
            ctx.lineTo(256, i);
            ctx.stroke();
        }
        
        // Vertical grid lines
        for (let i = 0; i < 256; i += 8) {
            ctx.beginPath();
            ctx.moveTo(i, 0);
            ctx.lineTo(i, 192);
            ctx.stroke();
        }
        
        // Add scanlines effect
        for (let i = 0; i < 192; i += 2) {
            ctx.fillStyle = `rgba(100, 180, 255, ${i % 4 === 0 ? 0.05 : 0.02})`;
            ctx.fillRect(0, i, 256, 1);
        }
        
        // Create texture
        const texture = new THREE.CanvasTexture(canvas);
        texture.wrapS = THREE.RepeatWrapping;
        texture.wrapT = THREE.RepeatWrapping;
        texture.repeat.set(3, 3);
        
        // Create material with the texture
        const material = new THREE.MeshBasicMaterial({
            map: texture,
            transparent: true,
            opacity: 0.4,
            blending: THREE.AdditiveBlending
        });
        
        // Create mesh and position it slightly in front of the card
        const holoMesh = new THREE.Mesh(holoGeometry, material);
        holoMesh.position.z = depth / 2 + 0.01;
        
        // Add animation
        let phase = Math.random() * Math.PI;
        
        const animateHologram = () => {
            if (!this.isInitialized) return;
            
            phase += 0.01;
            if (holoMesh.material) {
                holoMesh.material.opacity = 0.3 + Math.sin(phase) * 0.1;
            }
            
            requestAnimationFrame(animateHologram);
        };
        
        animateHologram();
        
        // Add to card
        if (card.add) {
            card.add(holoMesh);
        }
        
        return holoMesh;
    },
    
    // Create title element for a project
    createProjectTitle: function(project) {
        const geometry = new THREE.PlaneGeometry(3.8, 0.6);
        const canvas = document.createElement('canvas');
        canvas.width = 512;
        canvas.height = 96;
        const ctx = canvas.getContext('2d');
        
        // Draw background
        ctx.fillStyle = 'rgba(10, 30, 60, 0.9)';
        ctx.fillRect(0, 0, 512, 96);
        
        // Add gradient border
        const gradient = ctx.createLinearGradient(0, 0, 512, 0);
        gradient.addColorStop(0, '#3366cc');
        gradient.addColorStop(0.5, '#66ccff');
        gradient.addColorStop(1, '#3366cc');
        
        ctx.strokeStyle = gradient;
        ctx.lineWidth = 2;
        ctx.strokeRect(2, 2, 508, 92);
        
        // Draw title text
        ctx.font = 'bold 28px Arial, sans-serif';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillStyle = '#ffffff';
        ctx.fillText(project.title, 256, 48);
        
        // Create texture from canvas
        const texture = new THREE.CanvasTexture(canvas);
        const material = new THREE.MeshBasicMaterial({
            map: texture,
            transparent: true,
            opacity: 0.95
        });
        
        return new THREE.Mesh(geometry, material);
    },
    
    // Create tags element for a project
    createProjectTags: function(project) {
        const geometry = new THREE.PlaneGeometry(3.8, 0.4);
        const canvas = document.createElement('canvas');
        canvas.width = 512;
        canvas.height = 64;
        const ctx = canvas.getContext('2d');
        
        // Draw background
        ctx.fillStyle = 'rgba(10, 30, 60, 0.7)';
        ctx.fillRect(0, 0, 512, 64);
        
        // Draw tags
        const tags = project.techTags.slice(0, 4); // Limit to 4 tags
        const tagWidth = 512 / tags.length;
        
        tags.forEach((tag, index) => {
            const x = index * tagWidth;
            
            // Tag background
            ctx.fillStyle = 'rgba(40, 100, 200, 0.5)';
            ctx.roundRect(x + 4, 8, tagWidth - 8, 48, 5);
            ctx.fill();
            
            // Tag text
            ctx.font = '16px Arial, sans-serif';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillStyle = '#ffffff';
            ctx.fillText(tag, x + tagWidth / 2, 32);
        });
        
        // Create texture from canvas
        const texture = new THREE.CanvasTexture(canvas);
        const material = new THREE.MeshBasicMaterial({
            map: texture,
            transparent: true,
            opacity: 0.95
        });
        
        return new THREE.Mesh(geometry, material);
    },
    
    // Create type badge for a project
    createTypeBadge: function(project) {
        const geometry = new THREE.PlaneGeometry(0.8, 0.4);
        const canvas = document.createElement('canvas');
        canvas.width = 128;
        canvas.height = 64;
        const ctx = canvas.getContext('2d');
        
        // Set background color based on type
        let color = '#3366aa';
        let icon = '💻';
        
        switch (project.type) {
            case 'web':
                color = '#3366aa';
                icon = '🌐';
                break;
            case 'mobile':
                color = '#33aa66';
                icon = '📱';
                break;
            case 'ai':
                color = '#aa3399';
                icon = '🧠';
                break;
            case 'game':
                color = '#aaaa33';
                icon = '🎮';
                break;
            case 'blockchain':
                color = '#33aaaa';
                icon = '🔗';
                break;
        }
        
        // Draw background
        ctx.fillStyle = color;
        ctx.roundRect(0, 0, 128, 64, 10);
        ctx.fill();
        
        // Draw text and icon
        ctx.font = '16px Arial, sans-serif';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillStyle = '#ffffff';
        ctx.fillText(`${icon} ${project.type}`, 64, 32);
        
        // Create texture from canvas
        const texture = new THREE.CanvasTexture(canvas);
        const material = new THREE.MeshBasicMaterial({
            map: texture,
            transparent: true,
            opacity: 0.95
        });
        
        return new THREE.Mesh(geometry, material);
    },
    
    // Create year badge for a project
    createYearBadge: function(project) {
        const geometry = new THREE.PlaneGeometry(0.6, 0.4);
        const canvas = document.createElement('canvas');
        canvas.width = 96;
        canvas.height = 64;
        const ctx = canvas.getContext('2d');
        
        // Draw background
        ctx.fillStyle = 'rgba(20, 50, 100, 0.8)';
        ctx.roundRect(0, 0, 96, 64, 10);
        ctx.fill();
        
        // Draw text
        ctx.font = 'bold 24px Arial, sans-serif';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillStyle = '#ffffff';
        ctx.fillText(project.year, 48, 32);
        
        // Create texture from canvas
        const texture = new THREE.CanvasTexture(canvas);
        const material = new THREE.MeshBasicMaterial({
            map: texture,
            transparent: true,
            opacity: 0.95
        });
        
        return new THREE.Mesh(geometry, material);
    },
    
    // Create a connection line from project card to floor
    createConnectionLine: function(project) {
        if (!project.object) return;
        
        // Get the position of the project card
        const position = project.object.position.clone();
        
        // Create a line from the card to the floor
        const points = [
            position,
            new THREE.Vector3(position.x, -5, position.z)
        ];
        
        const geometry = new THREE.BufferGeometry().setFromPoints(points);
        
        // Create gradient material
        const material = new THREE.LineBasicMaterial({
            color: 0x3399ff,
            transparent: true,
            opacity: 0.6
        });
        
        const line = new THREE.Line(geometry, material);
        this.scene.add(line);
        
        // Store reference to the line in the project for updating
        project.connectionLine = line;
        
        // Add pulsing effect
        const pulseOpacity = () => {
            if (!this.isInitialized) return;
            
            const time = Date.now() * 0.001;
            if (line.material) {
                line.material.opacity = 0.3 + Math.sin(time * 2) * 0.3;
            }
            
            requestAnimationFrame(pulseOpacity);
        };
        
        pulseOpacity();
        
        return line;
    },
    
    // Create quantum particles animation
    createQuantumParticles: function() {
        const particlesContainer = document.querySelector('.quantum-particles');
        if (!particlesContainer) return;
        
        // Create multiple particles
        for (let i = 0; i < 20; i++) {
            const particle = document.createElement('div');
            particle.className = 'quantum-particle';
            
            // Random size
            const size = Math.random() * 4 + 2;
            particle.style.width = `${size}px`;
            particle.style.height = `${size}px`;
            
            // Random position
            particle.style.left = `${Math.random() * 100}%`;
            particle.style.bottom = '0';
            
            // Random animation duration and delay
            const duration = Math.random() * 10 + 10;
            const delay = Math.random() * 5;
            particle.style.animationDuration = `${duration}s`;
            particle.style.animationDelay = `${delay}s`;
            
            // Random color tint
            const hue = 200 + Math.random() * 40;
            const saturation = 70 + Math.random() * 30;
            const lightness = 60 + Math.random() * 20;
            particle.style.backgroundColor = `hsla(${hue}, ${saturation}%, ${lightness}%, 0.7)`;
            
            particlesContainer.appendChild(particle);
        }
    },
    
    // Toggle between light and dark theme
    toggleTheme: function() {
        const themeToggleBtn = document.querySelector('#theme-toggle-btn');
        const isDarkTheme = this.scene.background.r < 0.1;
        
        if (isDarkTheme) {
            // Switch to light theme
            this.scene.background = new THREE.Color(0x151530);
            this.scene.fog = new THREE.FogExp2(0x151530, 0.015);
            if (themeToggleBtn) themeToggleBtn.classList.add('active');
            this.showHint('Switched to light theme');
        } else {
            // Switch to dark theme
            this.scene.background = new THREE.Color(0x060616);
            this.scene.fog = new THREE.FogExp2(0x060616, 0.02);
            if (themeToggleBtn) themeToggleBtn.classList.remove('active');
            this.showHint('Switched to dark theme');
        }
    },
    
    // Toggle auto rotation
    toggleAutoRotation: function() {
        const rotateToggleBtn = document.querySelector('#rotate-toggle-btn');
        
        this.config.autoRotate = !this.config.autoRotate;
        
        if (this.controls) {
            this.controls.autoRotate = this.config.autoRotate && 
                (this.config.viewMode === 'carousel' || this.config.viewMode === 'sphere');
        }
        
        if (rotateToggleBtn) {
            rotateToggleBtn.classList.toggle('active', this.config.autoRotate);
        }
        
        this.showHint(this.config.autoRotate ? 'Auto-rotation enabled' : 'Auto-rotation disabled');
    },
    
    // Update project card positions based on view mode
    updateCardPositions: function() {
        this.projects.forEach((project, index) => {
            if (!project.object) return;
            
            let targetPosition;
            let lookAtTarget;
            
            switch (this.config.viewMode) {
                case 'carousel':
                    // Position in a circle around the center
                    targetPosition = project.carouselPosition.clone();
                    
                    // Make cards face the center
                    lookAtTarget = new THREE.Vector3(0, targetPosition.y, 0);
                    break;
                    
                case 'orbit':
                    // Random positions in 3D space
                    targetPosition = project.orbitPosition.clone();
                    
                    // No specific orientation
                    lookAtTarget = null;
                    break;
                    
                case 'focus':
                    // If this is the selected project, position in the center
                    if (project.id === this.selectedProject?.id) {
                        targetPosition = new THREE.Vector3(0, 0, 0);
                    } else {
                        // Position other projects far away
                        const angle = (index / this.projects.length) * Math.PI * 2;
                        targetPosition = new THREE.Vector3(
                            Math.cos(angle) * 40,
                            Math.sin(angle) * 10,
                            Math.sin(angle) * 40
                        );
                    }
                    
                    // Make the selected card face the camera
                    lookAtTarget = project.id === this.selectedProject?.id 
                        ? this.camera.position 
                        : null;
                    break;
                    
                case 'sphere':
                    // Position in a sphere formation
                    const phi = Math.acos(-1 + (2 * index) / this.projects.length);
                    const theta = Math.sqrt(this.projects.length * Math.PI) * phi;
                    
                    targetPosition = new THREE.Vector3(
                        15 * Math.cos(theta) * Math.sin(phi),
                        15 * Math.sin(theta) * Math.sin(phi),
                        15 * Math.cos(phi)
                    );
                    
                    // Make cards face outward
                    lookAtTarget = targetPosition.clone().multiplyScalar(2);
                    break;
                
                case 'helix':
                    // Position in a helix formation
                    const u = index / this.projects.length;
                    const v = 10 * u;
                    
                    targetPosition = new THREE.Vector3(
                        12 * Math.sin(v * 3),
                        10 * (u - 0.5),
                        12 * Math.cos(v * 3)
                    );
                    
                    // Make cards face outward
                    lookAtTarget = new THREE.Vector3(0, targetPosition.y, 0);
                    break;
                    
                case 'grid':
                    // Position in a grid formation
                    const perRow = Math.ceil(Math.sqrt(this.projects.length));
                    const row = Math.floor(index / perRow);
                    const col = index % perRow;
                    
                    targetPosition = new THREE.Vector3(
                        (col - perRow / 2 + 0.5) * 5,
                        0,
                        (row - Math.ceil(this.projects.length / perRow) / 2 + 0.5) * 6
                    );
                    
                    // Make cards face forward
                    lookAtTarget = new THREE.Vector3(0, 0, 1).add(targetPosition);
                    break;
                    
                default:
                    return;
            }
            
            // Update object position and orientation
            if (targetPosition) {
                // Animate to new position
                if (window.TWEEN) {
                    new TWEEN.Tween(project.object.position)
                        .to({
                            x: targetPosition.x,
                            y: targetPosition.y,
                            z: targetPosition.z
                        }, 1000)
                        .easing(TWEEN.Easing.Quadratic.InOut)
                        .start();
                } else {
                    // Fallback if TWEEN is not available
                    project.object.position.copy(targetPosition);
                }
            }
            
            // Set orientation
            if (lookAtTarget) {
                project.object.lookAt(lookAtTarget);
            }
            
            // Update connection line if it exists
            if (project.connectionLine) {
                const points = [
                    project.object.position.clone(),
                    new THREE.Vector3(project.object.position.x, -5, project.object.position.z)
                ];
                
                project.connectionLine.geometry.setFromPoints(points);
            }
        });
        
        // Update camera based on view mode
        switch (this.config.viewMode) {
            case 'carousel':
                // Position camera above and looking down at the carousel
                this.moveCamera(
                    new THREE.Vector3(0, 12, 20),
                    new THREE.Vector3(0, 0, 0)
                );
                
                // Enable auto-rotation if using OrbitControls
                if (this.controls && this.config.autoRotate) {
                    this.controls.autoRotate = true;
                }
                break;
                
            case 'orbit':
                // Position camera at a distance for free orbiting
                this.moveCamera(
                    new THREE.Vector3(15, 10, 15),
                    new THREE.Vector3(0, 0, 0)
                );
                
                // Disable auto-rotation
                if (this.controls) {
                    this.controls.autoRotate = false;
                }
                break;
                
            case 'focus':
                if (this.selectedProject) {
                    // Focus on the selected project
                    const focusPosition = new THREE.Vector3(0, 0, 6);
                    this.moveCamera(focusPosition, new THREE.Vector3(0, 0, 0));
                } else {
                    // If no project is selected, use default position
                    this.moveCamera(
                        new THREE.Vector3(0, 5, 15),
                        new THREE.Vector3(0, 0, 0)
                    );
                }
                
                // Disable auto-rotation
                if (this.controls) {
                    this.controls.autoRotate = false;
                }
                break;
        }
    },
    
    // Handle window resize
    handleResize: function() {
        if (!this.container || !this.camera || !this.renderer) return;
        
        const { width, height } = this.container.getBoundingClientRect();
        
        // Update camera aspect ratio
        this.camera.aspect = width / height;
        this.camera.updateProjectionMatrix();
        
        // Update renderer size
        this.renderer.setSize(width, height);
        
        // Update composer size
        if (this.composer) {
            this.composer.setSize(width, height);
        }
    },
    
    // Handle mouse movement for interaction
    handleMouseMove: function(event) {
        if (!this.container) return;
        
        // Calculate mouse position in normalized device coordinates
        const rect = this.container.getBoundingClientRect();
        this.mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
        this.mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
        
        // Perform raycasting to detect hoverable objects
        this.raycaster.setFromCamera(this.mouse, this.camera);
        
        // Get objects that intersect with the ray
        const intersects = this.raycaster.intersectObjects(this.scene.children, true);
        
        // Check for project cards
        let hovered = false;
        
        for (let i = 0; i < intersects.length; i++) {
            const object = this.getProjectCardFromIntersect(intersects[i].object);
            
            if (object) {
                // Found a project card
                hovered = true;
                
                // Change cursor to pointer
                this.container.style.cursor = 'pointer';
                
                // Scale up the card slightly (if it's not already the selected project)
                const project = this.getProjectFromObject(object);
                if (project && project.id !== this.selectedProject?.id) {
                    this.highlightCard(project.object);
                }
                
                break;
            }
        }
        
        // Reset cursor if not hovering over a card
        if (!hovered) {
            this.container.style.cursor = 'default';
            
            // Reset any highlighted cards (except the selected one)
            this.projects.forEach(project => {
                if (project.object && project.id !== this.selectedProject?.id) {
                    this.unhighlightCard(project.object);
                }
            });
        }
    },
    
    // Handle mouse click for selecting projects
    handleClick: function(event) {
        if (!this.container) return;
        
        // Calculate mouse position in normalized device coordinates
        const rect = this.container.getBoundingClientRect();
        this.mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
        this.mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
        
        // Perform raycasting to detect clickable objects
        this.raycaster.setFromCamera(this.mouse, this.camera);
        
        // Get objects that intersect with the ray
        const intersects = this.raycaster.intersectObjects(this.scene.children, true);
        
        // Check for project cards
        for (let i = 0; i < intersects.length; i++) {
            const object = this.getProjectCardFromIntersect(intersects[i].object);
            
            if (object) {
                // Found a project card
                const project = this.getProjectFromObject(object);
                
                if (project) {
                    // If we're already in focus mode with this project selected
                    if (this.config.viewMode === 'focus' && this.selectedProject?.id === project.id) {
                        // Deselect the project
                        this.deselectProject();
                        
                        // Switch to carousel mode
                        this.setViewMode('carousel');
                    } else {
                        // Select the project
                        this.selectProject(project);
                        
                        // Switch to focus mode
                        this.setViewMode('focus');
                    }
                }
                
                break;
            }
        }
    },
    
    // Handle keyboard navigation
    handleKeyDown: function(event) {
        switch (event.key) {
            case 'ArrowLeft':
                // Previous project in focus mode
                if (this.config.viewMode === 'focus' && this.selectedProject) {
                    const index = this.projects.findIndex(p => p.id === this.selectedProject.id);
                    if (index > 0) {
                        this.selectProject(this.projects[index - 1]);
                        this.updateCardPositions();
                    } else {
                        // Wrap around to the last project
                        this.selectProject(this.projects[this.projects.length - 1]);
                        this.updateCardPositions();
                    }
                }
                break;
                
            case 'ArrowRight':
                // Next project in focus mode
                if (this.config.viewMode === 'focus' && this.selectedProject) {
                    const index = this.projects.findIndex(p => p.id === this.selectedProject.id);
                    if (index < this.projects.length - 1) {
                        this.selectProject(this.projects[index + 1]);
                        this.updateCardPositions();
                    } else {
                        // Wrap around to the first project
                        this.selectProject(this.projects[0]);
                        this.updateCardPositions();
                    }
                }
                break;
                
            case 'Escape':
                // Exit focus mode
                if (this.config.viewMode === 'focus') {
                    this.deselectProject();
                    this.setViewMode('carousel');
                }
                break;
                
            case '1':
                // Carousel mode
                this.setViewMode('carousel');
                break;
                
            case '2':
                // Orbit mode
                this.setViewMode('orbit');
                break;
                
            case '3':
                // Focus mode
                if (this.selectedProject) {
                    this.setViewMode('focus');
                } else if (this.projects.length > 0) {
                    this.selectProject(this.projects[0]);
                    this.setViewMode('focus');
                }
                break;
        }
    },
    
    // Get the parent project card from a clicked mesh
    getProjectCardFromIntersect: function(object) {
        // Traverse up the object hierarchy to find a parent with projectId in userData
        let current = object;
        
        while (current) {
            if (current.userData && current.userData.projectId) {
                return current;
            }
            
            current = current.parent;
        }
        
        return null;
    },
    
    // Get project data from a 3D object
    getProjectFromObject: function(object) {
        if (!object || !object.userData || !object.userData.projectId) return null;
        
        return this.projects.find(project => project.id === object.userData.projectId);
    },
    
    // Highlight a card on hover
    highlightCard: function(card) {
        if (!card) return;
        
        // Scale up slightly
        if (window.TWEEN) {
            new TWEEN.Tween(card.scale)
                .to({ x: 1.05, y: 1.05, z: 1.05 }, 200)
                .easing(TWEEN.Easing.Quadratic.Out)
                .start();
        } else {
            card.scale.set(1.05, 1.05, 1.05);
        }
    },
    
    // Unhighlight a card
    unhighlightCard: function(card) {
        if (!card) return;
        
        // Scale back to normal
        if (window.TWEEN) {
            new TWEEN.Tween(card.scale)
                .to({ x: 1, y: 1, z: 1 }, 200)
                .easing(TWEEN.Easing.Quadratic.Out)
                .start();
        } else {
            card.scale.set(1, 1, 1);
        }
    },
    
    // Select a project and focus on it
    selectProject: function(project) {
        if (!project) return;
        
        // Deselect the currently selected project if any
        if (this.selectedProject) {
            this.deselectProject();
        }
        
        // Set as selected project
        this.selectedProject = project;
        
        // Highlight the card
        if (project.object) {
            this.highlightCard(project.object);
            this.addPulsingEffect(project.object);
        }
        
        // Update the info panel
        this.updateInfoPanel(project);
    },
    
    // Add pulsing effect to selected card
    addPulsingEffect: function(card) {
        if (!card) return;
        
        // Add subtle glowing animation
        const pulse = () => {
            if (!this.isInitialized || this.selectedProject?.object !== card) return;
            
            const time = Date.now() * 0.001;
            
            // Pulse the scale slightly
            const scale = 1.05 + Math.sin(time * 2) * 0.02;
            card.scale.set(scale, scale, scale);
            
            requestAnimationFrame(pulse);
        };
        
        pulse();
    },
    
    // Deselect the currently selected project
    deselectProject: function() {
        if (!this.selectedProject) return;
        
        // Reset the card to normal
        if (this.selectedProject.object) {
            this.unhighlightCard(this.selectedProject.object);
        }
        
        // Reset the info panel
        this.resetInfoPanel();
        
        // Clear selected project
        this.selectedProject = null;
    },
    
    // Focus camera on a specific position and target
    moveCamera: function(position, target) {
        if (!this.camera) return;
        
        // Use TWEEN if available for smooth animation
        if (window.TWEEN) {
            // Animate camera position
            new TWEEN.Tween(this.camera.position)
                .to({
                    x: position.x,
                    y: position.y,
                    z: position.z
                }, 1000)
                .easing(TWEEN.Easing.Quadratic.InOut)
                .start();
            
            // Set the controls target if available
            if (this.controls) {
                new TWEEN.Tween(this.controls.target)
                    .to({
                        x: target.x,
                        y: target.y,
                        z: target.z
                    }, 1000)
                    .easing(TWEEN.Easing.Quadratic.InOut)
                    .start();
            }
        } else {
            // Fallback if TWEEN is not available
            this.camera.position.copy(position);
            this.camera.lookAt(target);
            
            // Update controls target if available
            if (this.controls && this.controls.target) {
                this.controls.target.copy(target);
            }
        }
    },
    
    // Update the info panel with project details
    updateInfoPanel: function(project) {
        const panel = document.querySelector('.projects-3d-info-panel');
        if (!panel) return;
        
        // Update title
        const title = panel.querySelector('.info-title');
        if (title) title.textContent = project.title;
        
        // Update description
        const description = panel.querySelector('.info-description');
        if (description) description.textContent = project.description || 'No description available';
        
        // Update year
        const yearElement = panel.querySelector('.info-year');
        if (yearElement) yearElement.textContent = project.year || 'N/A';
        
        // Update type
        const typeElement = panel.querySelector('.info-type');
        if (typeElement) typeElement.textContent = this.formatProjectType(project.type);
        
        // Update tags
        const tags = panel.querySelector('.info-tags');
        if (tags) {
            tags.innerHTML = '';
            
            if (project.techTags && project.techTags.length > 0) {
                project.techTags.forEach(tag => {
                    const tagElement = document.createElement('span');
                    tagElement.className = 'info-tag';
                    tagElement.textContent = tag;
                    tags.appendChild(tagElement);
                });
            } else {
                tags.innerHTML = '<span class="info-tag empty">No tags</span>';
            }
        }
        
        // Update link buttons
        const viewDetailsBtn = panel.querySelector('.view-details-btn');
        if (viewDetailsBtn) {
            viewDetailsBtn.onclick = () => {
                this.showProjectDetails(project);
            };
        }
        
        const viewDemoBtn = panel.querySelector('.view-demo-btn');
        if (viewDemoBtn) {
            // If project has a demo link, enable the button
            viewDemoBtn.disabled = !project.demoUrl; // Check for demoUrl property
            viewDemoBtn.style.opacity = project.demoUrl ? '1' : '0.5';
            viewDemoBtn.style.cursor = project.demoUrl ? 'pointer' : 'not-allowed';
            
            if (project.demoUrl) {
                viewDemoBtn.onclick = () => {
                    window.open(project.demoUrl, '_blank');
                };
            } else {
                viewDemoBtn.onclick = null; // Remove listener if no demoUrl
            }
        }
        
        // Show the panel with animation
        panel.classList.add('visible');
        
        // Add a subtle entrance animation for tags
        const tagElements = panel.querySelectorAll('.info-tag');
        tagElements.forEach((tag, index) => {
            tag.style.animationDelay = `${0.1 + index * 0.05}s`;
        });
    },
    
    // Format project type to be more readable
    formatProjectType: function(type) {
        if (!type) return 'Other';
        
        // Capitalize first letter
        return type.charAt(0).toUpperCase() + type.slice(1);
    },
    
    // Show detailed project information
    showProjectDetails: function(project) {
        // Create modal for project details
        const modal = document.createElement('div');
        modal.className = 'project-modal';
        modal.innerHTML = `
            <div class="project-modal-content">
                <button class="modal-close-btn">×</button>
                <h2 class="modal-title">${project.title}</h2>
                <div class="modal-details">
                    <p class="modal-description">${project.description || 'No description available'}</p>
                    <div class="modal-meta">
                        <span class="modal-year"><i class="fas fa-calendar-alt"></i> Year: ${project.year || 'N/A'}</span>
                        <span class="modal-type"><i class="fas fa-code-branch"></i> Type: ${this.formatProjectType(project.type)}</span>
                    </div>
                    <div class="modal-tags">
                        <h4>Technologies</h4>
                        <div class="tags-container">
                            ${project.techTags && project.techTags.length > 0 
                                ? project.techTags.map(tag => `<span class="info-tag">${tag}</span>`).join('')
                                : '<span class="info-tag empty">No tags</span>'}
                        </div>
                    </div>
                    ${project.demoUrl ? `<a href="${project.demoUrl}" target="_blank" class="modal-demo-link">View Demo</a>` : ''}
                </div>
            </div>
        `;
        
        // Add modal to container
        this.container.appendChild(modal);
        
        // Add close functionality
        const closeBtn = modal.querySelector('.modal-close-btn');
        if (closeBtn) {
            closeBtn.addEventListener('click', () => {
                modal.classList.add('fade-out');
                setTimeout(() => {
                    modal.remove();
                }, 300);
            });
        }
        
        // Show modal with animation
        setTimeout(() => {
            modal.classList.add('show');
        }, 10);
    },
    
    // Reset the info panel to default state
    resetInfoPanel: function() {
        const panel = document.querySelector('.projects-3d-info-panel');
        if (!panel) return;
        
        // Reset to default values
        const title = panel.querySelector('.info-title');
        if (title) title.textContent = 'Select a project';
        
        const description = panel.querySelector('.info-description');
        if (description) description.textContent = 'Click on a project card to view details';
        
        const yearElement = panel.querySelector('.info-year');
        if (yearElement) yearElement.textContent = 'Year';
        
        const typeElement = panel.querySelector('.info-type');
        if (typeElement) typeElement.textContent = 'Type';
        
        const tags = panel.querySelector('.info-tags');
        if (tags) tags.innerHTML = '';
        
        // Hide the panel
        panel.classList.remove('visible');
    },
    
    // Set the view mode (carousel, orbit, or focus)
    setViewMode: function(mode) {
        if (this.config.viewMode === mode) return;
        
        this.config.viewMode = mode;
        
        // Update UI
        const buttons = document.querySelectorAll('.view-control-btn');
        buttons.forEach(btn => {
            btn.classList.toggle('active', btn.getAttribute('data-mode') === mode);
        });
        
        // Update camera and controls based on mode
        switch (mode) {
            case 'carousel':
                // Update auto-rotation
                if (this.controls) {
                    this.controls.autoRotate = this.config.autoRotate;
                }
                break;
                
            case 'orbit':
                // Disable auto-rotation for orbit mode
                if (this.controls) {
                    this.controls.autoRotate = false;
                }
                break;
                
            case 'focus':
                // If no project is selected, select the first one
                if (!this.selectedProject && this.projects.length > 0) {
                    this.selectProject(this.projects[0]);
                }
                
                // Disable auto-rotation for focus mode
                if (this.controls) {
                    this.controls.autoRotate = false;
                }
                break;
        }
        
        // Update card positions for new mode
        this.updateCardPositions();
    },
    
    // Reset view to initial state
    resetView: function() {
        // Reset camera to default position
        this.moveCamera(
            new THREE.Vector3(
                this.config.initialCameraPosition.x,
                this.config.initialCameraPosition.y,
                this.config.initialCameraPosition.z
            ),
            new THREE.Vector3(0, 0, 0)
        );
        
        // Reset controls if available
        if (this.controls) {
            this.controls.reset();
        }
    },
    
    // Take a screenshot of the current view
    takeScreenshot: function() {
        // Render the scene
        if (this.composer) {
            this.composer.render();
        } else if (this.renderer) {
            this.renderer.render(this.scene, this.camera);
        }
        
        // Get the render target canvas
        const canvas = this.renderer.domElement;
        
        try {
            // Create a download link
            const link = document.createElement('a');
            link.download = `project-showcase-${Date.now()}.png`;
            link.href = canvas.toDataURL('image/png');
            
            // Trigger click to download
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            
            // Show success notification
            this.showHint('Screenshot saved!');
        } catch (error) {
            console.error('Error taking screenshot:', error);
            this.showHint('Failed to save screenshot');
        }
    },
    
    // Toggle fullscreen mode
    toggleFullscreen: function() {
        if (!this.container) return;
        
        try {
            if (!document.fullscreenElement) {
                // Enter fullscreen
                if (this.container.requestFullscreen) {
                    this.container.requestFullscreen();
                } else if (this.container.mozRequestFullScreen) {
                    this.container.mozRequestFullScreen();
                } else if (this.container.webkitRequestFullscreen) {
                    this.container.webkitRequestFullscreen();
                } else if (this.container.msRequestFullscreen) {
                    this.container.msRequestFullscreen();
                }
            } else {
                // Exit fullscreen
                if (document.exitFullscreen) {
                    document.exitFullscreen();
                } else if (document.mozCancelFullScreen) {
                    document.mozCancelFullScreen();
                } else if (document.webkitExitFullscreen) {
                    document.webkitExitFullscreen();
                } else if (document.msExitFullscreen) {
                    document.msExitFullscreen();
                }
            }
            
            // Update button icon
            const fullscreenBtn = document.getElementById('fullscreen-btn');
            if (fullscreenBtn) {
                const icon = fullscreenBtn.querySelector('i');
                if (icon) {
                    if (document.fullscreenElement) {
                        icon.classList.remove('fa-expand');
                        icon.classList.add('fa-compress');
                    } else {
                        icon.classList.remove('fa-compress');
                        icon.classList.add('fa-expand');
                    }
                }
            }
        } catch (error) {
            console.error('Error toggling fullscreen:', error);
            this.showHint('Fullscreen not supported');
        }
    },
    
    // Show a temporary hint message
    showHint: function(message) {
        // Create hint element if not exists
        let hint = document.querySelector('.projects-3d-hint');
        
        if (!hint) {
            hint = document.createElement('div');
            hint.className = 'projects-3d-hint';
            this.container.appendChild(hint);
        }
        
        // Update message and show
        hint.innerHTML = message;
        hint.classList.add('visible');
        
        // Hide after a delay
        setTimeout(() => {
            hint.classList.remove('visible');
        }, 3000);
    },
    
    // Animation loop
    animate: function() {
        if (!this.isInitialized) return;
        
        requestAnimationFrame(() => this.animate());
        
        // Update TWEEN animations if available
        if (window.TWEEN) {
            TWEEN.update();
        }
        
        // Update controls if available
        if (this.controls) {
            this.controls.update();
        }
        
        // Auto rotate the carousel in carousel mode
        if (this.config.viewMode === 'carousel' && this.config.autoRotate) {
            this.projects.forEach(project => {
                if (project.object) {
                    // Get the current angle of the project
                    const x = project.object.position.x;
                    const z = project.object.position.z;
                    
                    // Calculate the current angle
                    let angle = Math.atan2(z, x);
                    
                    // Increment angle slightly
                    angle += this.config.rotationSpeed;
                    
                    // Calculate new position
                    const radius = Math.sqrt(x * x + z * z);
                    project.object.position.x = Math.cos(angle) * radius;
                    project.object.position.z = Math.sin(angle) * radius;
                    
                    // Make the card face the center
                    project.object.lookAt(new THREE.Vector3(0, project.object.position.y, 0));
                    
                    // Update connection line if it exists
                    if (project.connectionLine) {
                        const points = [
                            project.object.position.clone(),
                            new THREE.Vector3(project.object.position.x, -5, project.object.position.z)
                        ];
                        
                        project.connectionLine.geometry.setFromPoints(points);
                    }
                }
            });
        }
        
        // Render the scene
        if (this.composer) {
            this.composer.render();
        } else if (this.renderer && this.scene && this.camera) {
            this.renderer.render(this.scene, this.camera);
        }
    },
    
    // Clean up resources
    dispose: function() {
        // Stop animation loop
        this.isInitialized = false;
        
        // Remove event listeners
        window.removeEventListener('resize', this.handleResize);
        
        if (this.renderer && this.renderer.domElement) {
            this.renderer.domElement.removeEventListener('mousemove', this.handleMouseMove);
            this.renderer.domElement.removeEventListener('click', this.handleClick);
        }
        
        window.removeEventListener('keydown', this.handleKeyDown);
        
        // Dispose controls
        if (this.controls && this.controls.dispose) {
            this.controls.dispose();
        }
        
        // Recursively dispose of scene objects
        if (this.scene) {
            this.disposeSceneObjects(this.scene);
        }
        
        // Dispose composer
        if (this.composer) {
            this.composer.renderTarget1.dispose();
            this.composer.renderTarget2.dispose();
        }
        
        // Dispose renderer
        if (this.renderer) {
            this.renderer.dispose();
            this.renderer.forceContextLoss();
            this.renderer.domElement = null;
        }
        
        // Clear references
        this.container = null;
        this.scene = null;
        this.camera = null;
        this.renderer = null;
        this.controls = null;
        this.composer = null;
        this.projects = [];
        this.selectedProject = null;
        
        console.log('3D showcase disposed');
    },
    
    // Recursively dispose of scene objects
    disposeSceneObjects: function(obj) {
        if (!obj) return;
        
        // Handle children first
        if (obj.children) {
            // Create a copy of the children array to avoid modification while iterating
            const children = [...obj.children];
            
            for (let i = 0; i < children.length; i++) {
                this.disposeSceneObjects(children[i]);
            }
        }
        
        // Dispose of geometries and materials
        if (obj.geometry) {
            obj.geometry.dispose();
        }
        
        if (obj.material) {
            if (Array.isArray(obj.material)) {
                obj.material.forEach(material => {
                    this.disposeMaterial(material);
                });
            } else {
                this.disposeMaterial(obj.material);
            }
        }
        
        // Remove from parent
        if (obj.parent) {
            obj.parent.remove(obj);
        }
    },
    
    // Dispose of a material and its textures
    disposeMaterial: function(material) {
        if (!material) return;
        
        // Dispose textures
        Object.keys(material).forEach(key => {
            if (material[key] && material[key].isTexture) {
                material[key].dispose();
            }
        });
        
        material.dispose();
    }
};

// Example of how to initialize (make sure this runs after the DOM is ready if you were loading from DOM)
// For hardcoded data, it can run as soon as the script is loaded.
// document.addEventListener('DOMContentLoaded', function() { // Not strictly necessary if only using hardcoded data
//     if (window.supremeProjectViewer) {
//         window.supremeProjectViewer.init();
//     }
// });