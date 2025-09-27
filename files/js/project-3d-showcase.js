window.supremeProjectViewer = {
    config: {
        carouselRadius: 15, 
        carouselHeight: 0, 
        viewMode: "carousel", 
        rotationSpeed: 0.005, 
        autoRotate: true, 
        backgroundColor: 0x060616, 
        floorSize: 40, 
        floorSpacing: 1, 
        floorColor1: 0x0a1a3a, 
        floorColor2: 0x162040, 
        cardScale: 1, 
        initialCameraPosition: { x: 0, y: 8, z: 20 }, 
        orbitMinDistance: 10, 
        orbitMaxDistance: 40, 
        bloomStrength: 0.8, 
        bloomRadius: 0.5, 
        bloomThreshold: 0.2, 
    },
    init: function () {
        console.log("Initializing Supreme Project 3D Showcase");
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
        this.loadDependencies(() => {
            this.setupContainer();
            this.loadProjectData(); 
            this.setupScene();
            this.setupCamera();
            this.setupRenderer();
            this.setupLighting();
            this.setupControls();
            this.setupPostProcessing();
            this.setupEventListeners();
            this.createGrid();
            this.createLightBeams();
            this.createProjectCards();
            this.updateCardPositions();
            this.isInitialized = true;
            this.animate();
            const loadingScreen = document.querySelector(
                ".projects-3d-loading"
            );
            if (loadingScreen) {
                loadingScreen.style.display = "none";
                this.showHint(
                    "Use the view modes above for different perspectives<br>Click on projects to view details"
                );
            }
            console.log("3D showcase initialized successfully");
        });
    },
    loadDependencies: function (callback) {
        if (window.THREE && !window.THREE.OrbitControls) {
            console.log("Creating fallback for OrbitControls");
            window.THREE.OrbitControls = function (camera, domElement) {
                this.object = camera;
                this.domElement = domElement;
                this.enableDamping = false;
                this.dampingFactor = 0.05;
                this.enableZoom = true;
                this.autoRotate = false;
                this.autoRotateSpeed = 2.0;
                this.minDistance = 0;
                this.maxDistance = Infinity;
                this.minPolarAngle = 0;
                this.maxPolarAngle = Math.PI;
                this.update = function () {
                    if (this.autoRotate) {
                        const rotationSpeed = 0.002 * this.autoRotateSpeed;
                        const x = camera.position.x;
                        const z = camera.position.z;
                        camera.position.x =
                            x * Math.cos(rotationSpeed) -
                            z * Math.sin(rotationSpeed);
                        camera.position.z =
                            z * Math.cos(rotationSpeed) +
                            x * Math.sin(rotationSpeed);
                        camera.lookAt(0, 0, 0);
                    }
                    return true;
                };
                let isMouseDown = false;
                let lastMousePosition = { x: 0, y: 0 };
                domElement.addEventListener("mousedown", (e) => {
                    isMouseDown = true;
                    lastMousePosition = { x: e.clientX, y: e.clientY };
                });
                domElement.addEventListener("mousemove", (e) => {
                    if (!isMouseDown) return;
                    const dx = e.clientX - lastMousePosition.x;
                    const dy = e.clientY - lastMousePosition.y;
                    const radius = Math.sqrt(
                        camera.position.x * camera.position.x +
                            camera.position.z * camera.position.z
                    );
                    let theta = Math.atan2(
                        camera.position.x,
                        camera.position.z
                    );
                    theta -= dx * 0.01;
                    let phi = Math.atan2(
                        Math.sqrt(
                            camera.position.x * camera.position.x +
                                camera.position.z * camera.position.z
                        ),
                        camera.position.y
                    );
                    phi -= dy * 0.01;
                    phi = Math.max(0.1, Math.min(Math.PI - 0.1, phi));
                    camera.position.x =
                        radius * Math.sin(phi) * Math.sin(theta);
                    camera.position.y = radius * Math.cos(phi);
                    camera.position.z =
                        radius * Math.sin(phi) * Math.cos(theta);
                    camera.lookAt(0, 0, 0);
                    lastMousePosition = { x: e.clientX, y: e.clientY };
                });
                domElement.addEventListener("mouseup", () => {
                    isMouseDown = false;
                });
                domElement.addEventListener("wheel", (e) => {
                    if (!this.enableZoom) return;
                    const delta = -Math.sign(e.deltaY);
                    const factor = 1.1;
                    const zoom = delta > 0 ? 1 / factor : factor;
                    const distance = camera.position.length();
                    if (
                        distance * zoom > this.minDistance &&
                        distance * zoom < this.maxDistance
                    ) {
                        camera.position.multiplyScalar(zoom);
                    }
                    camera.lookAt(0, 0, 0);
                    e.preventDefault();
                });
                this.addEventListener = function () {};
                this.removeEventListener = function () {};
                this.dispose = function () {};
                this.target = new THREE.Vector3(0, 0, 0);
            };
        }
        if (window.THREE && !window.THREE.EffectComposer) {
            console.log("Creating fallbacks for post-processing effects");
            window.THREE.EffectComposer = function (renderer) {
                this.renderer = renderer;
                this.addPass = function () {};
                this.render = function () {
                    if (
                        this.renderer &&
                        supremeProjectViewer.scene &&
                        supremeProjectViewer.camera
                    ) {
                        this.renderer.render(
                            supremeProjectViewer.scene,
                            supremeProjectViewer.camera
                        );
                    }
                };
            };
            window.THREE.RenderPass = function () {};
            window.THREE.UnrealBloomPass = function () {};
        }
        callback();
    },
    setupContainer: function () {
        this.container = document.getElementById("projects-3d-view");
        if (!this.container) {
            console.error("Container element #projects-3d-view not found");
            return;
        }
        while (this.container.firstChild) {
            this.container.removeChild(this.container.firstChild);
        }
        const controlsOverlay = document.createElement("div");
        controlsOverlay.className = "projects-3d-controls";
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
        const viewButtons = controlsOverlay.querySelectorAll(
            ".view-control-btn"
        );
        viewButtons.forEach((btn) => {
            btn.addEventListener("click", () => {
                viewButtons.forEach((b) => b.classList.remove("active"));
                btn.classList.add("active");
                this.setViewMode(btn.getAttribute("data-mode"));
            });
        });
        const defaultButton = controlsOverlay.querySelector(
            `.view-control-btn[data-mode="${this.config.viewMode}"]`
        );
        if (defaultButton) defaultButton.classList.add("active");
        const screenshotBtn = controlsOverlay.querySelector("#screenshot-btn");
        if (screenshotBtn) {
            screenshotBtn.addEventListener("click", () =>
                this.takeScreenshot()
            );
        }
        const fullscreenBtn = controlsOverlay.querySelector("#fullscreen-btn");
        if (fullscreenBtn) {
            fullscreenBtn.addEventListener("click", () =>
                this.toggleFullscreen()
            );
        }
        const resetViewBtn = controlsOverlay.querySelector("#reset-view-btn");
        if (resetViewBtn) {
            resetViewBtn.addEventListener("click", () => this.resetView());
        }
        const themeToggleBtn = controlsOverlay.querySelector(
            "#theme-toggle-btn"
        );
        if (themeToggleBtn) {
            themeToggleBtn.addEventListener("click", () => this.toggleTheme());
        }
        const rotateToggleBtn = controlsOverlay.querySelector(
            "#rotate-toggle-btn"
        );
        if (rotateToggleBtn) {
            rotateToggleBtn.addEventListener("click", () =>
                this.toggleAutoRotation()
            );
            if (this.config.autoRotate) {
                rotateToggleBtn.classList.add("active");
            }
        }
        this.createQuantumParticles();
    },
    loadProjectData: function () {
        this.projects = [
            {
                id: "project-1",
                title: "TakaDenGoruNen.com",
                description:
                    "Specialized e-commerce platform for the livestock market",
                image: "images/projects/takaden.png",
                techTags: [
                    "html",
                    "css",
                    "javascript",
                    "ecommerce",
                    "community",
                ],
                type: "web",
                year: "2022",
                demoUrl: "https://takadengorunen.netlify.app/",
            },
            {
                id: "project-2",
                title: "THETAEnhancer",
                description: "Next leap in AI image enhancement technology",
                image: "images/projects/ai-enhancer.jpg",
                techTags: [
                    "deeplearning",
                    "computervision",
                    "imageprocessing",
                    "python",
                ],
                type: "ai",
                year: "2023",
                demoUrl: "https://thetaenhancer.onrender.com",
            },
            {
                id: "project-3",
                title: "Interactive Coding Projects",
                description:
                    "Collection of HTML5 games and utility web applications",
                image: "images/projects/html5.jpg",
                techTags: ["html5", "javascript", "webapps", "css"],
                type: "game",
                year: "2023",
                demoUrl: "projects/html5.html",
            },
            {
                id: "project-4",
                title: "Breakout Arcade",
                description:
                    "Classic brick-breaker with modern physics and power-ups",
                image: "images/projects/break.jpg",
                techTags: ["javascript", "canvas", "physics"],
                type: "game",
                year: "2022",
                demoUrl: "games/breakout.html",
            },
            {
                id: "project-5",
                title: "RoboTheta",
                description:
                    "Next-generation firefighting robot with AI-driven decision making",
                image: "images/projects/robotheta.jpg",
                techTags: [
                    "ai",
                    "robotics",
                    "thermalimaging",
                    "python",
                    "sensors",
                ],
                type: "ai",
                year: "2023",
                demoUrl: null,
            },
            {
                id: "project-6",
                title: "Interactive 3D Game",
                description:
                    "Immersive FPS experience with high-fidelity graphics",
                image: "images/projects/3d.jpg",
                techTags: ["unrealengine", "python", "gamedev", "3d"],
                type: "game",
                year: "2022",
                demoUrl: null,
            },
            {
                id: "project-7",
                title: "Dynamic Web Interfaces",
                description:
                    "Ultra-advanced CSS animations for engaging web experiences",
                image: "images/projects/dynamic.jpg",
                techTags: ["css", "animation", "ux", "ui", "javascript"],
                type: "web",
                year: "2023",
                demoUrl: null,
            },
            {
                id: "project-8",
                title: "AI-Powered Data Visualizer",
                description:
                    "Interactive platform transforming complex data into intuitive graphics",
                image: "images/projects/datavizu.jpg",
                techTags: [
                    "datavisualization",
                    "aianalytics",
                    "interactivedesign",
                    "python",
                    "javascript",
                ],
                type: "data",
                year: "2023",
                demoUrl: null,
            },
            {
                id: "project-9",
                title: "3D Virtual Tour",
                description:
                    "Immersive exploration of realistic 3D environments",
                image: "images/projects/3d.jpg",
                techTags: ["threejs", "webgl", "3dmodeling", "javascript"],
                type: "web",
                year: "2023",
                demoUrl: null,
            },
            {
                id: "project-10",
                title: "Real-Time Multiplayer Game",
                description:
                    "Online competitive gameplay with advanced animations",
                image: "images/projects/multiplayer.jpg",
                techTags: [
                    "websockets",
                    "gamedev",
                    "realtime",
                    "javascript",
                    "nodejs",
                ],
                type: "game",
                year: "2022",
                demoUrl: null,
            },
            {
                id: "project-11",
                title: "Quantum Code Simulator",
                description:
                    "Visualizing quantum algorithms through interactive simulation",
                image: "images/projects/quantum.jpg",
                techTags: [
                    "quantumcomputing",
                    "simulation",
                    "visualization",
                    "python",
                ],
                type: "ai",
                year: "2023",
                demoUrl: null,
            },
            {
                id: "project-12",
                title: "Handwritten Digit Recognizer",
                description: "Deep learning project for digit recognition",
                image: "images/projects/handwritten.jpg",
                techTags: [
                    "python",
                    "deeplearning",
                    "neuralnetworks",
                    "tensorflow",
                    "keras",
                ],
                type: "ai",
                year: "2023",
                demoUrl: null,
            },
            {
                id: "project-13",
                title: "KNN Breast Cancer Diagnosis",
                description: "Machine learning model for cancer diagnosis",
                image: "images/projects/knn.jpg",
                techTags: [
                    "python",
                    "machinelearning",
                    "knn",
                    "jupyter",
                    "scikitlearn",
                ],
                type: "ai",
                year: "2023",
                demoUrl: null,
            },
            {
                id: "project-14",
                title: "Handwritten Digit Recognizer",
                description: "Deep learning project for digit recognition",
                image: "images/projects/handwritten.jpg",
                techTags: [
                    "python",
                    "deeplearning",
                    "neuralnetworks",
                    "tensorflow",
                    "keras",
                ],
                type: "ai",
                year: "2023",
                demoUrl: null,
            },
            {
                id: "project-15",
                title: "KNeighborsClassifier",
                description: "Implementation of KNN algorithm",
                image: "images/projects/knnclass.jpg",
                techTags: [
                    "python",
                    "machinelearning",
                    "knn",
                    "classification",
                    "scikitlearn",
                ],
                type: "ai",
                year: "2023",
                demoUrl: null,
            },
            {
                id: "project-16",
                title: "Plant Disease Prediction",
                description: "AI-powered plant disease detection system",
                image: "images/projects/plant.jpg",
                techTags: [
                    "python",
                    "imageprocessing",
                    "agriculture",
                    "computervision",
                    "deeplearning",
                ],
                type: "ai",
                year: "2023",
                demoUrl: null,
            },
            {
                id: "project-17",
                title: "Decision Tree Classifier",
                description: "Implementation of Decision Tree algorithm",
                image: "images/projects/decision.jpg",
                techTags: [
                    "python",
                    "machinelearning",
                    "decisiontrees",
                    "scikitlearn",
                ],
                type: "ai",
                year: "2023",
                demoUrl: null,
            },
            {
                id: "project-18",
                title: "CSE Toolkit v4.2",
                description: "Advanced toolkit for CSE students",
                image: "images/projects/csetoolkit4.jpg",
                techTags: ["python", "automation", "educational", "scripting"],
                type: "tools",
                year: "2023",
                demoUrl: null,
            },
            {
                id: "project-19",
                title: "CSE Toolkit 5.0",
                description:
                    "Latest version of the ultimate academic companion",
                image: "images/projects/cse5.jpg",
                techTags: ["python", "automation", "educational", "scripting"],
                type: "tools",
                year: "2023",
                demoUrl: null,
            },
            {
                id: "project-20",
                title: "Image Classifier",
                description: "Deep learning based image classifier",
                image: "images/projects/image.jpg",
                techTags: [
                    "python",
                    "deeplearning",
                    "computervision",
                    "tensorflow",
                    "keras",
                ],
                type: "ai",
                year: "2023",
                demoUrl: null,
            },
            {
                id: "project-21",
                title: "Stroke Risk Assessment",
                description: "Deep learning model for medical risk assessment",
                image: "images/projects/strock.jpg",
                techTags: [
                    "python",
                    "deeplearning",
                    "healthcare",
                    "tensorflow",
                    "keras",
                ],
                type: "ai",
                year: "2023",
                demoUrl: null,
            },
            {
                id: "project-22",
                title: "Portfolio Demo 1",
                description: "Portfolio website design demo",
                image: "images/projects/portdem.jpg",
                techTags: ["html", "css", "webdesign"],
                type: "web",
                year: "2023",
                demoUrl: null,
            },
            {
                id: "project-23",
                title: "Premium Portfolio",
                description: "Premium portfolio web application",
                image: "images/projects/premiumport.jpg",
                techTags: ["html", "css", "javascript", "webdesign"],
                type: "web",
                year: "2023",
                demoUrl: null,
            },
            {
                id: "project-24",
                title: "NeuralForge",
                description:
                    "Advanced neural architecture for language understanding",
                image: "images/projects/nural.jpg",
                techTags: [
                    "neuralnetworks",
                    "naturallanguage",
                    "transformers",
                    "python",
                    "ai",
                    "reinforcementlearning",
                ],
                type: "ai",
                year: "future",
                demoUrl: null,
            },
            {
                id: "project-25",
                title: "TaskFlow AI",
                description:
                    "Intelligent task management app with AI-powered scheduling and prioritization for iOS & Android.",
                image: "images/projects/taskflow.png",
                techTags: [
                    "reactnative",
                    "javascript",
                    "firebase",
                    "ai",
                    "redux",
                ],
                type: "mobile",
                year: "2024",
                demoUrl: null,
            },
            {
                id: "project-26",
                title: "LocalVibe Connect",
                description:
                    "iOS app connecting users to local events, meetups, and community activities based on interests.",
                image: "images/projects/localvibe.png",
                techTags: ["swift", "ios", "coreml", "mapkit", "uikit"],
                type: "mobile",
                year: "2023",
                demoUrl: null,
            },
            {
                id: "project-27",
                title: "FitForge Pro",
                description:
                    "Personalized fitness planner and tracker for Android and Wear OS with adaptive workout routines.",
                image: "images/projects/fitforge.png",
                techTags: [
                    "kotlin",
                    "android",
                    "jetpackcompose",
                    "healthkit",
                    "wearos",
                ],
                type: "mobile",
                year: "2023",
                demoUrl: null,
            },
            {
                id: "project-28",
                title: "EcoThread Mobile",
                description:
                    "Cross-platform marketplace app connecting buyers with sustainable and ethical fashion brands.",
                image: "images/projects/ecothread.png",
                techTags: [
                    "flutter",
                    "dart",
                    "ecommerce",
                    "stripe",
                    "firebase",
                ],
                type: "mobile",
                year: "2022",
                demoUrl: null,
            },
            {
                id: "project-29",
                title: "StoryScape AR",
                description:
                    "Mobile app bringing children's stories to life through interactive augmented reality experiences.",
                image: "images/projects/storyscape.png",
                techTags: [
                    "unity",
                    "csharp",
                    "arfoundation",
                    "arkit",
                    "arcore",
                    "storytelling",
                ],
                type: "mobile",
                year: "2024",
                demoUrl: null,
            },
            {
                id: "project-30",
                title: "VisionX",
                description:
                    "Advanced object detection in challenging environments",
                image: "images/projects/visionx.jpg",
                techTags: [
                    "computervision",
                    "objectdetection",
                    "realtime",
                    "python",
                    "ai",
                ],
                type: "ai",
                year: "future",
                demoUrl: null,
            },
            {
                id: "project-31",
                title: "FluidUI Framework",
                description:
                    "Adaptive UI framework that learns from user behavior",
                image: "images/projects/fuid.jpg",
                techTags: [
                    "ui",
                    "ux",
                    "responsive",
                    "adaptive",
                    "javascript",
                    "css",
                    "framework",
                ],
                type: "web",
                year: "future",
                demoUrl: null,
            },
            {
                id: "project-32",
                title: "HoloWeb",
                description:
                    "Holographic-like 3D experiences for standard browsers",
                image: "images/projects/holo.jpg",
                techTags: ["webgl", "3d", "immersive", "threejs", "javascript"],
                type: "web",
                year: "future",
                demoUrl: null,
            },
            {
                id: "project-33",
                title: "PredictiveInsights",
                description: "Explainable predictive analytics platform",
                image: "images/projects/predictive.jpg",
                techTags: [
                    "predictiveanalytics",
                    "explainableai",
                    "forecasting",
                    "python",
                    "ai",
                ],
                type: "data",
                year: "future",
                demoUrl: null,
            },
            {
                id: "project-34",
                title: "DataNexus",
                description: "Intelligent data integration platform",
                image: "images/projects/datanexus.jpg",
                techTags: [
                    "dataintegration",
                    "etl",
                    "schemadesign",
                    "python",
                    "sql",
                ],
                type: "data",
                year: "future",
                demoUrl: null,
            },
            {
                id: "project-35",
                title: "TrustChain",
                description:
                    "Blockchain-based supply chain verification platform",
                image: "images/projects/blogchai.jpg",
                techTags: [
                    "blockchain",
                    "supplychain",
                    "enterprise",
                    "solidity",
                ],
                type: "blockchain",
                year: "future",
                demoUrl: null,
            },
            {
                id: "project-36",
                title: "DecentralFinance",
                description:
                    "Advanced DeFi platform with cross-chain capabilities",
                image: "images/projects/dcfina.jpg",
                techTags: [
                    "defi",
                    "crosschain",
                    "smartcontracts",
                    "solidity",
                    "blockchain",
                ],
                type: "blockchain",
                year: "future",
                demoUrl: null,
            },
            {
                id: "project-37",
                title: "QuantumRealm",
                description: "VR game exploring quantum physics principles",
                image: "images/projects/quantum.jpg",
                techTags: [
                    "vr",
                    "physicssimulation",
                    "educational",
                    "unity",
                    "csharp",
                    "game",
                ],
                type: "game",
                year: "future",
                demoUrl: null,
            },
            {
                id: "project-38",
                title: "EcoSphere",
                description: "Immersive ecological simulation game",
                image: "images/projects/ecospe.jpg",
                techTags: [
                    "simulation",
                    "ecosystem",
                    "aibehavior",
                    "unity",
                    "csharp",
                    "game",
                ],
                type: "game",
                year: "future",
                demoUrl: null,
            },
            {
                id: "project-39",
                title: "DevForge",
                description: "AI-powered developer productivity suite",
                image: "images/projects/devforge.jpg",
                techTags: [
                    "developertools",
                    "aiassisted",
                    "automation",
                    "python",
                    "javascript",
                ],
                type: "tools",
                year: "future",
                demoUrl: null,
            },
            {
                id: "project-40",
                title: "SecurityVault",
                description: "Comprehensive cybersecurity assessment toolkit",
                image: "images/projects/securityvault.jpg",
                techTags: [
                    "cybersecurity",
                    "penetrationtesting",
                    "threatdetection",
                    "python",
                    "bash",
                ],
                type: "tools",
                year: "future",
                demoUrl: null,
            },
        ];
        this.projects.forEach((project, index) => {
            const angle = (index / this.projects.length) * Math.PI * 2;
            project.carouselPosition = new THREE.Vector3(
                Math.cos(angle) * this.config.carouselRadius,
                this.config.carouselHeight,
                Math.sin(angle) * this.config.carouselRadius
            );
            project.orbitPosition = new THREE.Vector3(
                (Math.random() - 0.5) * 30,
                (Math.random() - 0.5) * 15,
                (Math.random() - 0.5) * 30
            );
            project.focusPosition = new THREE.Vector3(0, 0, 0);
            project.rotation = 0;
            project.object = null;
        });
        console.log(
            `Loaded ${this.projects.length} projects for 3D visualization (hardcoded)`
        );
    },
    setupScene: function () {
        this.scene = new THREE.Scene();
        this.scene.background = new THREE.Color(this.config.backgroundColor);
        this.scene.fog = new THREE.FogExp2(this.config.backgroundColor, 0.02);
    },
    setupCamera: function () {
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
    setupRenderer: function () {
        const { width, height } = this.container.getBoundingClientRect();
        this.renderer = new THREE.WebGLRenderer({
            antialias: true,
            alpha: true,
        });
        this.renderer.setSize(width, height);
        this.renderer.setPixelRatio(window.devicePixelRatio);
        this.renderer.shadowMap.enabled = true;
        this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
        this.container.appendChild(this.renderer.domElement);
    },
    setupLighting: function () {
        const ambientLight = new THREE.AmbientLight(0x333344, 0.5);
        this.scene.add(ambientLight);
        const mainLight = new THREE.DirectionalLight(0xaaccff, 1);
        mainLight.position.set(10, 20, 15);
        mainLight.castShadow = true;
        mainLight.shadow.mapSize.width = 2048;
        mainLight.shadow.mapSize.height = 2048;
        mainLight.shadow.camera.near = 0.5;
        mainLight.shadow.camera.far = 50;
        mainLight.shadow.camera.left = -20;
        mainLight.shadow.camera.right = 20;
        mainLight.shadow.camera.top = 20;
        mainLight.shadow.camera.bottom = -20;
        this.scene.add(mainLight);
        const rimLight = new THREE.DirectionalLight(0x6699cc, 0.7);
        rimLight.position.set(-15, 10, -15);
        this.scene.add(rimLight);
        const blueLight = new THREE.PointLight(0x3366ff, 2, 20);
        blueLight.position.set(-10, 2, -12);
        this.scene.add(blueLight);
        const purpleLight = new THREE.PointLight(0x9933ff, 2, 20);
        purpleLight.position.set(10, 2, -12);
        this.scene.add(purpleLight);
    },
    setupControls: function () {
        if (typeof THREE.OrbitControls === "function") {
            this.controls = new THREE.OrbitControls(
                this.camera,
                this.renderer.domElement
            );
            this.controls.enableDamping = true;
            this.controls.dampingFactor = 0.05;
            this.controls.minDistance = this.config.orbitMinDistance;
            this.controls.maxDistance = this.config.orbitMaxDistance;
            this.controls.autoRotate = false;
            this.controls.autoRotateSpeed = 1.0;
        } else {
            console.warn(
                "OrbitControls not available, using fallback controls"
            );
        }
    },
    setupPostProcessing: function () {
        if (typeof THREE.EffectComposer !== "function") {
            console.warn(
                "EffectComposer not available, skipping post-processing setup"
            );
            return;
        }
        try {
            this.composer = new THREE.EffectComposer(this.renderer);
            if (typeof THREE.RenderPass === "function") {
                const renderPass = new THREE.RenderPass(
                    this.scene,
                    this.camera
                );
                this.composer.addPass(renderPass);
            }
            if (typeof THREE.UnrealBloomPass === "function") {
                const bloomPass = new THREE.UnrealBloomPass(
                    new THREE.Vector2(window.innerWidth, window.innerHeight),
                    this.config.bloomStrength,
                    this.config.bloomRadius,
                    this.config.bloomThreshold
                );
                this.composer.addPass(bloomPass);
            }
        } catch (error) {
            console.error("Error setting up post-processing:", error);
            this.composer = null;
        }
    },
    setupEventListeners: function () {
        window.addEventListener("resize", () => this.handleResize());
        this.renderer.domElement.addEventListener("mousemove", (event) =>
            this.handleMouseMove(event)
        );
        this.renderer.domElement.addEventListener("click", (event) =>
            this.handleClick(event)
        );
        window.addEventListener("keydown", (event) =>
            this.handleKeyDown(event)
        );
    },
    createGrid: function () {
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
        const platformGeometry = new THREE.CircleGeometry(gridSize * 0.4, 32);
        const platformMaterial = new THREE.MeshStandardMaterial({
            color: 0x1a2a4a,
            metalness: 0.8,
            roughness: 0.4,
            emissive: 0x112233,
            emissiveIntensity: 0.2,
        });
        const platform = new THREE.Mesh(platformGeometry, platformMaterial);
        platform.rotation.x = -Math.PI / 2;
        platform.position.y = -4.99;
        platform.receiveShadow = true;
        this.scene.add(platform);
        const ringGeometry = new THREE.RingGeometry(
            gridSize * 0.4,
            gridSize * 0.42,
            64
        );
        const ringMaterial = new THREE.MeshBasicMaterial({
            color: 0x3366cc,
            side: THREE.DoubleSide,
            transparent: true,
            opacity: 0.7,
        });
        const ring = new THREE.Mesh(ringGeometry, ringMaterial);
        ring.rotation.x = -Math.PI / 2;
        ring.position.y = -4.98;
        this.scene.add(ring);
        this.animateRing(ring, 0x3366cc, 0x33ccff);
    },
    animateRing: function (ring, color1, color2) {
        let phase = 0;
        const animate = () => {
            if (!this.isInitialized) return;
            phase += 0.01;
            const opacity = 0.3 + Math.sin(phase) * 0.2;
            if (ring.material) {
                ring.material.opacity = opacity;
                const r = Math.sin(phase * 0.5) * 0.5 + 0.5;
                ring.material.color.setRGB(
                    (r * ((color1 >> 16) & 0xff)) / 255 +
                        ((1 - r) * ((color2 >> 16) & 0xff)) / 255,
                    (r * ((color1 >> 8) & 0xff)) / 255 +
                        ((1 - r) * ((color2 >> 8) & 0xff)) / 255,
                    (r * (color1 & 0xff)) / 255 +
                        ((1 - r) * (color2 & 0xff)) / 255
                );
            }
            requestAnimationFrame(animate);
        };
        animate();
    },
    createLightBeams: function () {
        const beamPositions = [
            {
                x: -this.config.floorSize * 0.35,
                z: -this.config.floorSize * 0.35,
            },
            {
                x: -this.config.floorSize * 0.35,
                z: this.config.floorSize * 0.35,
            },
            {
                x: this.config.floorSize * 0.35,
                z: -this.config.floorSize * 0.35,
            },
            {
                x: this.config.floorSize * 0.35,
                z: this.config.floorSize * 0.35,
            },
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
    createLightBeam: function (x, z, color, emissive, phase = 0) {
        const height = 30;
        const radius = 0.2;
        const geometry = new THREE.CylinderGeometry(
            radius,
            radius,
            height,
            16,
            10,
            true
        );
        const material = new THREE.MeshStandardMaterial({
            color: color,
            emissive: emissive,
            emissiveIntensity: 0.5,
            transparent: true,
            opacity: 0.3,
            side: THREE.DoubleSide,
        });
        const beam = new THREE.Mesh(geometry, material);
        beam.position.set(x, height / 2 - 5, z);
        this.scene.add(beam);
        const glowGeometry = new THREE.CylinderGeometry(
            radius * 1.5,
            radius * 1.5,
            height,
            16,
            10,
            true
        );
        const glowMaterial = new THREE.MeshBasicMaterial({
            color: color,
            transparent: true,
            opacity: 0.15,
            side: THREE.DoubleSide,
        });
        const glow = new THREE.Mesh(glowGeometry, glowMaterial);
        beam.add(glow);
        let currentPhase = phase || 0;
        const animateBeam = () => {
            if (!this.isInitialized) return;
            currentPhase += 0.02;
            const opacity = 0.2 + Math.sin(currentPhase) * 0.1;
            material.opacity = opacity;
            glowMaterial.opacity = opacity * 0.5;
            material.emissiveIntensity =
                0.5 + Math.sin(currentPhase * 0.5) * 0.3;
            requestAnimationFrame(animateBeam);
        };
        animateBeam();
        return beam;
    },
    createParticles: function () {
        const particleCount = 500;
        const geometry = new THREE.BufferGeometry();
        const positions = new Float32Array(particleCount * 3);
        const velocities = new Float32Array(particleCount * 3);
        const colors = new Float32Array(particleCount * 3);
        const sizes = new Float32Array(particleCount);
        const colorOptions = [
            new THREE.Color(0x3366ff),
            new THREE.Color(0x6699ff),
            new THREE.Color(0x99ccff),
        ];
        for (let i = 0; i < particleCount; i++) {
            const radius = 20 + Math.random() * 20;
            const theta = Math.random() * Math.PI * 2;
            const phi = Math.acos(2 * Math.random() - 1);
            positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
            positions[i * 3 + 1] = (Math.random() - 0.5) * 20;
            positions[i * 3 + 2] = radius * Math.sin(phi) * Math.sin(theta);
            velocities[i * 3] = (Math.random() - 0.5) * 0.05;
            velocities[i * 3 + 1] = (Math.random() - 0.5) * 0.05;
            velocities[i * 3 + 2] = (Math.random() - 0.5) * 0.05;
            const color =
                colorOptions[Math.floor(Math.random() * colorOptions.length)];
            colors[i * 3] = color.r;
            colors[i * 3 + 1] = color.g;
            colors[i * 3 + 2] = color.b;
            sizes[i] = Math.random() * 0.5 + 0.1;
        }
        geometry.setAttribute(
            "position",
            new THREE.BufferAttribute(positions, 3)
        );
        geometry.setAttribute(
            "velocity",
            new THREE.BufferAttribute(velocities, 3)
        );
        geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));
        geometry.setAttribute("size", new THREE.BufferAttribute(sizes, 1));
        const material = new THREE.PointsMaterial({
            size: 0.5,
            vertexColors: true,
            transparent: true,
            opacity: 0.6,
            blending: THREE.AdditiveBlending,
        });
        const particles = new THREE.Points(geometry, material);
        this.scene.add(particles);
        const animateParticles = () => {
            if (!this.isInitialized) return;
            const positions = particles.geometry.attributes.position.array;
            const velocities = particles.geometry.attributes.velocity.array;
            for (let i = 0; i < particleCount; i++) {
                positions[i * 3] += velocities[i * 3];
                positions[i * 3 + 1] += velocities[i * 3 + 1];
                positions[i * 3 + 2] += velocities[i * 3 + 2];
                const distance = Math.sqrt(
                    positions[i * 3] * positions[i * 3] +
                        positions[i * 3 + 2] * positions[i * 3 + 2]
                );
                if (
                    distance > 40 ||
                    distance < 5 ||
                    Math.abs(positions[i * 3 + 1]) > 20
                ) {
                    const radius = 20 + Math.random() * 20;
                    const theta = Math.random() * Math.PI * 2;
                    const phi = Math.acos(2 * Math.random() - 1);
                    positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
                    positions[i * 3 + 1] = (Math.random() - 0.5) * 20;
                    positions[i * 3 + 2] =
                        radius * Math.sin(phi) * Math.sin(theta);
                }
            }
            particles.geometry.attributes.position.needsUpdate = true;
            requestAnimationFrame(animateParticles);
        };
        animateParticles();
        return particles;
    },
    createProjectCards: function () {
        const textureLoader = new THREE.TextureLoader();
        textureLoader.crossOrigin = "anonymous";
        this.projects.forEach((project, index) => {
            const width = 4;
            const height = 3;
            const depth = 0.1;
            const cardGroup = new THREE.Group();
            const cardGeometry = new THREE.BoxGeometry(width, height, depth);
            const frontMaterial = new THREE.MeshStandardMaterial({
                color: 0x0a0a3a,
                metalness: 0.7,
                roughness: 0.3,
                emissive: 0x0a0a3a,
                emissiveIntensity: 0.2,
            });
            const sideMaterial = new THREE.MeshStandardMaterial({
                color: 0x0a0a3a,
                metalness: 0.7,
                roughness: 0.3,
                emissive: 0x0a0a3a,
                emissiveIntensity: 0.1,
            });
            const materials = [
                sideMaterial, 
                sideMaterial, 
                sideMaterial, 
                sideMaterial, 
                frontMaterial, 
                sideMaterial, 
            ];
            const cardMesh = new THREE.Mesh(cardGeometry, materials);
            cardMesh.castShadow = true;
            cardMesh.receiveShadow = true;
            cardGroup.add(cardMesh);
            if (project.image && project.image !== "") {
                try {
                    textureLoader.load(
                        project.image,
                        (texture) => {
                            const imageMaterial = new THREE.MeshStandardMaterial(
                                {
                                    map: texture,
                                    metalness: 0.3,
                                    roughness: 0.7,
                                    emissive: new THREE.Color(0x222233),
                                    emissiveIntensity: 0.2,
                                }
                            );
                            if (
                                cardMesh.material &&
                                Array.isArray(cardMesh.material)
                            ) {
                                cardMesh.material[4] = imageMaterial;
                            }
                        },
                        undefined,
                        (error) => {
                            console.error("Error loading texture:", error);
                            this.createFallbackFace(cardMesh, project);
                        }
                    );
                } catch (error) {
                    console.error("Error in texture loader:", error);
                    this.createFallbackFace(cardMesh, project);
                }
            } else {
                this.createFallbackFace(cardMesh, project);
            }
            this.addHolographicEffect(cardMesh, width, height, depth);
            const titleMesh = this.createProjectTitle(project);
            titleMesh.position.z = depth / 2 + 0.01;
            titleMesh.position.y = -height * 0.35;
            cardGroup.add(titleMesh);
            if (project.techTags && project.techTags.length > 0) {
                const tagsMesh = this.createProjectTags(project);
                tagsMesh.position.z = depth / 2 + 0.01;
                tagsMesh.position.y = -height * 0.15;
                cardGroup.add(tagsMesh);
            }
            const typeMesh = this.createTypeBadge(project);
            typeMesh.position.z = depth / 2 + 0.01;
            typeMesh.position.x = width * 0.35;
            typeMesh.position.y = height * 0.35;
            cardGroup.add(typeMesh);
            if (project.year) {
                const yearMesh = this.createYearBadge(project);
                yearMesh.position.z = depth / 2 + 0.01;
                yearMesh.position.x = -width * 0.35;
                yearMesh.position.y = height * 0.35;
                cardGroup.add(yearMesh);
            }
            cardGroup.userData = { projectId: project.id };
            cardGroup.position.copy(
                this.config.viewMode === "carousel"
                    ? project.carouselPosition
                    : project.orbitPosition
            );
            if (this.config.viewMode === "carousel") {
                cardGroup.lookAt(0, cardGroup.position.y, 0);
            }
            this.createConnectionLine(project);
            project.object = cardGroup;
            this.scene.add(cardGroup);
        });
    },
    createFallbackFace: function (cardMesh, project) {
        const canvas = document.createElement("canvas");
        canvas.width = 512;
        canvas.height = 384;
        const ctx = canvas.getContext("2d");
        ctx.fillStyle = "rgba(20, 30, 50, 0.8)";
        ctx.fillRect(0, 0, 512, 384);
        ctx.strokeStyle = "rgba(100, 150, 255, 0.3)";
        ctx.lineWidth = 1;
        for (let i = 0; i <= 384; i += 32) {
            ctx.beginPath();
            ctx.moveTo(0, i);
            ctx.lineTo(512, i);
            ctx.stroke();
        }
        for (let i = 0; i <= 512; i += 32) {
            ctx.beginPath();
            ctx.moveTo(i, 0);
            ctx.lineTo(i, 384);
            ctx.stroke();
        }
        ctx.fillStyle = "rgba(120, 180, 255, 0.8)";
        ctx.font = "bold 60px Arial, sans-serif";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        let icon = "💻";
        if (project.type === "mobile") icon = "📱";
        else if (project.type === "ai") icon = "🧠";
        else if (project.type === "game") icon = "🎮";
        else if (project.type === "data") icon = "📊";
        else if (project.type === "blockchain") icon = "🔗";
        ctx.fillText(icon, 256, 140);
        ctx.font = "28px Arial, sans-serif";
        ctx.fillText(project.title, 256, 220);
        const texture = new THREE.CanvasTexture(canvas);
        const material = new THREE.MeshStandardMaterial({
            map: texture,
            metalness: 0.5,
            roughness: 0.6,
            emissive: new THREE.Color(0x223344),
            emissiveIntensity: 0.3,
        });
        if (cardMesh.material && Array.isArray(cardMesh.material)) {
            cardMesh.material[4] = material;
        }
    },
    addHolographicEffect: function (card, width, height, depth) {
        const holoGeometry = new THREE.PlaneGeometry(
            width * 0.98,
            height * 0.98
        );
        const canvas = document.createElement("canvas");
        canvas.width = 256;
        canvas.height = 192;
        const ctx = canvas.getContext("2d");
        ctx.fillStyle = "rgba(10, 20, 40, 0)";
        ctx.fillRect(0, 0, 256, 192);
        ctx.strokeStyle = "rgba(100, 180, 255, 0.15)";
        ctx.lineWidth = 1;
        for (let i = 0; i < 192; i += 8) {
            ctx.beginPath();
            ctx.moveTo(0, i);
            ctx.lineTo(256, i);
            ctx.stroke();
        }
        for (let i = 0; i < 256; i += 8) {
            ctx.beginPath();
            ctx.moveTo(i, 0);
            ctx.lineTo(i, 192);
            ctx.stroke();
        }
        for (let i = 0; i < 192; i += 2) {
            ctx.fillStyle = `rgba(100, 180, 255, ${i % 4 === 0 ? 0.05 : 0.02})`;
            ctx.fillRect(0, i, 256, 1);
        }
        const texture = new THREE.CanvasTexture(canvas);
        texture.wrapS = THREE.RepeatWrapping;
        texture.wrapT = THREE.RepeatWrapping;
        texture.repeat.set(3, 3);
        const material = new THREE.MeshBasicMaterial({
            map: texture,
            transparent: true,
            opacity: 0.4,
            blending: THREE.AdditiveBlending,
        });
        const holoMesh = new THREE.Mesh(holoGeometry, material);
        holoMesh.position.z = depth / 2 + 0.01;
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
        if (card.add) {
            card.add(holoMesh);
        }
        return holoMesh;
    },
    createProjectTitle: function (project) {
        const geometry = new THREE.PlaneGeometry(3.8, 0.6);
        const canvas = document.createElement("canvas");
        canvas.width = 512;
        canvas.height = 96;
        const ctx = canvas.getContext("2d");
        ctx.fillStyle = "rgba(10, 30, 60, 0.9)";
        ctx.fillRect(0, 0, 512, 96);
        const gradient = ctx.createLinearGradient(0, 0, 512, 0);
        gradient.addColorStop(0, "#3366cc");
        gradient.addColorStop(0.5, "#66ccff");
        gradient.addColorStop(1, "#3366cc");
        ctx.strokeStyle = gradient;
        ctx.lineWidth = 2;
        ctx.strokeRect(2, 2, 508, 92);
        ctx.font = "bold 28px Arial, sans-serif";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillStyle = "#ffffff";
        ctx.fillText(project.title, 256, 48);
        const texture = new THREE.CanvasTexture(canvas);
        const material = new THREE.MeshBasicMaterial({
            map: texture,
            transparent: true,
            opacity: 0.95,
        });
        return new THREE.Mesh(geometry, material);
    },
    createProjectTags: function (project) {
        const geometry = new THREE.PlaneGeometry(3.8, 0.4);
        const canvas = document.createElement("canvas");
        canvas.width = 512;
        canvas.height = 64;
        const ctx = canvas.getContext("2d");
        ctx.fillStyle = "rgba(10, 30, 60, 0.7)";
        ctx.fillRect(0, 0, 512, 64);
        const tags = project.techTags.slice(0, 4); 
        const tagWidth = 512 / tags.length;
        tags.forEach((tag, index) => {
            const x = index * tagWidth;
            ctx.fillStyle = "rgba(40, 100, 200, 0.5)";
            ctx.roundRect(x + 4, 8, tagWidth - 8, 48, 5);
            ctx.fill();
            ctx.font = "16px Arial, sans-serif";
            ctx.textAlign = "center";
            ctx.textBaseline = "middle";
            ctx.fillStyle = "#ffffff";
            ctx.fillText(tag, x + tagWidth / 2, 32);
        });
        const texture = new THREE.CanvasTexture(canvas);
        const material = new THREE.MeshBasicMaterial({
            map: texture,
            transparent: true,
            opacity: 0.95,
        });
        return new THREE.Mesh(geometry, material);
    },
    createTypeBadge: function (project) {
        const geometry = new THREE.PlaneGeometry(0.8, 0.4);
        const canvas = document.createElement("canvas");
        canvas.width = 128;
        canvas.height = 64;
        const ctx = canvas.getContext("2d");
        let color = "#3366aa";
        let icon = "💻";
        switch (project.type) {
            case "web":
                color = "#3366aa";
                icon = "🌐";
                break;
            case "mobile":
                color = "#33aa66";
                icon = "📱";
                break;
            case "ai":
                color = "#aa3399";
                icon = "🧠";
                break;
            case "game":
                color = "#aaaa33";
                icon = "🎮";
                break;
            case "blockchain":
                color = "#33aaaa";
                icon = "🔗";
                break;
        }
        ctx.fillStyle = color;
        ctx.roundRect(0, 0, 128, 64, 10);
        ctx.fill();
        ctx.font = "16px Arial, sans-serif";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillStyle = "#ffffff";
        ctx.fillText(`${icon} ${project.type}`, 64, 32);
        const texture = new THREE.CanvasTexture(canvas);
        const material = new THREE.MeshBasicMaterial({
            map: texture,
            transparent: true,
            opacity: 0.95,
        });
        return new THREE.Mesh(geometry, material);
    },
    createYearBadge: function (project) {
        const geometry = new THREE.PlaneGeometry(0.6, 0.4);
        const canvas = document.createElement("canvas");
        canvas.width = 96;
        canvas.height = 64;
        const ctx = canvas.getContext("2d");
        ctx.fillStyle = "rgba(20, 50, 100, 0.8)";
        ctx.roundRect(0, 0, 96, 64, 10);
        ctx.fill();
        ctx.font = "bold 24px Arial, sans-serif";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillStyle = "#ffffff";
        ctx.fillText(project.year, 48, 32);
        const texture = new THREE.CanvasTexture(canvas);
        const material = new THREE.MeshBasicMaterial({
            map: texture,
            transparent: true,
            opacity: 0.95,
        });
        return new THREE.Mesh(geometry, material);
    },
    createConnectionLine: function (project) {
        if (!project.object) return;
        const position = project.object.position.clone();
        const points = [
            position,
            new THREE.Vector3(position.x, -5, position.z),
        ];
        const geometry = new THREE.BufferGeometry().setFromPoints(points);
        const material = new THREE.LineBasicMaterial({
            color: 0x3399ff,
            transparent: true,
            opacity: 0.6,
        });
        const line = new THREE.Line(geometry, material);
        this.scene.add(line);
        project.connectionLine = line;
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
    createQuantumParticles: function () {
        const particlesContainer = document.querySelector(".quantum-particles");
        if (!particlesContainer) return;
        for (let i = 0; i < 20; i++) {
            const particle = document.createElement("div");
            particle.className = "quantum-particle";
            const size = Math.random() * 4 + 2;
            particle.style.width = `${size}px`;
            particle.style.height = `${size}px`;
            particle.style.left = `${Math.random() * 100}%`;
            particle.style.bottom = "0";
            const duration = Math.random() * 10 + 10;
            const delay = Math.random() * 5;
            particle.style.animationDuration = `${duration}s`;
            particle.style.animationDelay = `${delay}s`;
            const hue = 200 + Math.random() * 40;
            const saturation = 70 + Math.random() * 30;
            const lightness = 60 + Math.random() * 20;
            particle.style.backgroundColor = `hsla(${hue}, ${saturation}%, ${lightness}%, 0.7)`;
            particlesContainer.appendChild(particle);
        }
    },
    toggleTheme: function () {
        const themeToggleBtn = document.querySelector("#theme-toggle-btn");
        const isDarkTheme = this.scene.background.r < 0.1;
        if (isDarkTheme) {
            this.scene.background = new THREE.Color(0x151530);
            this.scene.fog = new THREE.FogExp2(0x151530, 0.015);
            if (themeToggleBtn) themeToggleBtn.classList.add("active");
            this.showHint("Switched to light theme");
        } else {
            this.scene.background = new THREE.Color(0x060616);
            this.scene.fog = new THREE.FogExp2(0x060616, 0.02);
            if (themeToggleBtn) themeToggleBtn.classList.remove("active");
            this.showHint("Switched to dark theme");
        }
    },
    toggleAutoRotation: function () {
        const rotateToggleBtn = document.querySelector("#rotate-toggle-btn");
        this.config.autoRotate = !this.config.autoRotate;
        if (this.controls) {
            this.controls.autoRotate =
                this.config.autoRotate &&
                (this.config.viewMode === "carousel" ||
                    this.config.viewMode === "sphere");
        }
        if (rotateToggleBtn) {
            rotateToggleBtn.classList.toggle("active", this.config.autoRotate);
        }
        this.showHint(
            this.config.autoRotate
                ? "Auto-rotation enabled"
                : "Auto-rotation disabled"
        );
    },
    updateCardPositions: function () {
        this.projects.forEach((project, index) => {
            if (!project.object) return;
            let targetPosition;
            let lookAtTarget;
            switch (this.config.viewMode) {
                case "carousel":
                    targetPosition = project.carouselPosition.clone();
                    lookAtTarget = new THREE.Vector3(0, targetPosition.y, 0);
                    break;
                case "orbit":
                    targetPosition = project.orbitPosition.clone();
                    lookAtTarget = null;
                    break;
                case "focus":
                    if (project.id === this.selectedProject?.id) {
                        targetPosition = new THREE.Vector3(0, 0, 0);
                    } else {
                        const angle =
                            (index / this.projects.length) * Math.PI * 2;
                        targetPosition = new THREE.Vector3(
                            Math.cos(angle) * 40,
                            Math.sin(angle) * 10,
                            Math.sin(angle) * 40
                        );
                    }
                    lookAtTarget =
                        project.id === this.selectedProject?.id
                            ? this.camera.position
                            : null;
                    break;
                case "sphere":
                    const phi = Math.acos(
                        -1 + (2 * index) / this.projects.length
                    );
                    const theta =
                        Math.sqrt(this.projects.length * Math.PI) * phi;
                    targetPosition = new THREE.Vector3(
                        15 * Math.cos(theta) * Math.sin(phi),
                        15 * Math.sin(theta) * Math.sin(phi),
                        15 * Math.cos(phi)
                    );
                    lookAtTarget = targetPosition.clone().multiplyScalar(2);
                    break;
                case "helix":
                    const u = index / this.projects.length;
                    const v = 10 * u;
                    targetPosition = new THREE.Vector3(
                        12 * Math.sin(v * 3),
                        10 * (u - 0.5),
                        12 * Math.cos(v * 3)
                    );
                    lookAtTarget = new THREE.Vector3(0, targetPosition.y, 0);
                    break;
                case "grid":
                    const perRow = Math.ceil(Math.sqrt(this.projects.length));
                    const row = Math.floor(index / perRow);
                    const col = index % perRow;
                    targetPosition = new THREE.Vector3(
                        (col - perRow / 2 + 0.5) * 5,
                        0,
                        (row -
                            Math.ceil(this.projects.length / perRow) / 2 +
                            0.5) *
                            6
                    );
                    lookAtTarget = new THREE.Vector3(0, 0, 1).add(
                        targetPosition
                    );
                    break;
                default:
                    return;
            }
            if (targetPosition) {
                if (window.TWEEN) {
                    new TWEEN.Tween(project.object.position)
                        .to(
                            {
                                x: targetPosition.x,
                                y: targetPosition.y,
                                z: targetPosition.z,
                            },
                            1000
                        )
                        .easing(TWEEN.Easing.Quadratic.InOut)
                        .start();
                } else {
                    project.object.position.copy(targetPosition);
                }
            }
            if (lookAtTarget) {
                project.object.lookAt(lookAtTarget);
            }
            if (project.connectionLine) {
                const points = [
                    project.object.position.clone(),
                    new THREE.Vector3(
                        project.object.position.x,
                        -5,
                        project.object.position.z
                    ),
                ];
                project.connectionLine.geometry.setFromPoints(points);
            }
        });
        switch (this.config.viewMode) {
            case "carousel":
                this.moveCamera(
                    new THREE.Vector3(0, 12, 20),
                    new THREE.Vector3(0, 0, 0)
                );
                if (this.controls && this.config.autoRotate) {
                    this.controls.autoRotate = true;
                }
                break;
            case "orbit":
                this.moveCamera(
                    new THREE.Vector3(15, 10, 15),
                    new THREE.Vector3(0, 0, 0)
                );
                if (this.controls) {
                    this.controls.autoRotate = false;
                }
                break;
            case "focus":
                if (this.selectedProject) {
                    const focusPosition = new THREE.Vector3(0, 0, 6);
                    this.moveCamera(focusPosition, new THREE.Vector3(0, 0, 0));
                } else {
                    this.moveCamera(
                        new THREE.Vector3(0, 5, 15),
                        new THREE.Vector3(0, 0, 0)
                    );
                }
                if (this.controls) {
                    this.controls.autoRotate = false;
                }
                break;
        }
    },
    handleResize: function () {
        if (!this.container || !this.camera || !this.renderer) return;
        const { width, height } = this.container.getBoundingClientRect();
        this.camera.aspect = width / height;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(width, height);
        if (this.composer) {
            this.composer.setSize(width, height);
        }
    },
    handleMouseMove: function (event) {
        if (!this.container) return;
        const rect = this.container.getBoundingClientRect();
        this.mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
        this.mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
        this.raycaster.setFromCamera(this.mouse, this.camera);
        const intersects = this.raycaster.intersectObjects(
            this.scene.children,
            true
        );
        let hovered = false;
        for (let i = 0; i < intersects.length; i++) {
            const object = this.getProjectCardFromIntersect(
                intersects[i].object
            );
            if (object) {
                hovered = true;
                this.container.style.cursor = "pointer";
                const project = this.getProjectFromObject(object);
                if (project && project.id !== this.selectedProject?.id) {
                    this.highlightCard(project.object);
                }
                break;
            }
        }
        if (!hovered) {
            this.container.style.cursor = "default";
            this.projects.forEach((project) => {
                if (project.object && project.id !== this.selectedProject?.id) {
                    this.unhighlightCard(project.object);
                }
            });
        }
    },
    handleClick: function (event) {
        if (!this.container) return;
        const rect = this.container.getBoundingClientRect();
        this.mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
        this.mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
        this.raycaster.setFromCamera(this.mouse, this.camera);
        const intersects = this.raycaster.intersectObjects(
            this.scene.children,
            true
        );
        for (let i = 0; i < intersects.length; i++) {
            const object = this.getProjectCardFromIntersect(
                intersects[i].object
            );
            if (object) {
                const project = this.getProjectFromObject(object);
                if (project) {
                    if (
                        this.config.viewMode === "focus" &&
                        this.selectedProject?.id === project.id
                    ) {
                        this.deselectProject();
                        this.setViewMode("carousel");
                    } else {
                        this.selectProject(project);
                        this.setViewMode("focus");
                    }
                }
                break;
            }
        }
    },
    handleKeyDown: function (event) {
        switch (event.key) {
            case "ArrowLeft":
                if (this.config.viewMode === "focus" && this.selectedProject) {
                    const index = this.projects.findIndex(
                        (p) => p.id === this.selectedProject.id
                    );
                    if (index > 0) {
                        this.selectProject(this.projects[index - 1]);
                        this.updateCardPositions();
                    } else {
                        this.selectProject(
                            this.projects[this.projects.length - 1]
                        );
                        this.updateCardPositions();
                    }
                }
                break;
            case "ArrowRight":
                if (this.config.viewMode === "focus" && this.selectedProject) {
                    const index = this.projects.findIndex(
                        (p) => p.id === this.selectedProject.id
                    );
                    if (index < this.projects.length - 1) {
                        this.selectProject(this.projects[index + 1]);
                        this.updateCardPositions();
                    } else {
                        this.selectProject(this.projects[0]);
                        this.updateCardPositions();
                    }
                }
                break;
            case "Escape":
                if (this.config.viewMode === "focus") {
                    this.deselectProject();
                    this.setViewMode("carousel");
                }
                break;
            case "1":
                this.setViewMode("carousel");
                break;
            case "2":
                this.setViewMode("orbit");
                break;
            case "3":
                if (this.selectedProject) {
                    this.setViewMode("focus");
                } else if (this.projects.length > 0) {
                    this.selectProject(this.projects[0]);
                    this.setViewMode("focus");
                }
                break;
        }
    },
    getProjectCardFromIntersect: function (object) {
        let current = object;
        while (current) {
            if (current.userData && current.userData.projectId) {
                return current;
            }
            current = current.parent;
        }
        return null;
    },
    getProjectFromObject: function (object) {
        if (!object || !object.userData || !object.userData.projectId)
            return null;
        return this.projects.find(
            (project) => project.id === object.userData.projectId
        );
    },
    highlightCard: function (card) {
        if (!card) return;
        if (window.TWEEN) {
            new TWEEN.Tween(card.scale)
                .to({ x: 1.05, y: 1.05, z: 1.05 }, 200)
                .easing(TWEEN.Easing.Quadratic.Out)
                .start();
        } else {
            card.scale.set(1.05, 1.05, 1.05);
        }
    },
    unhighlightCard: function (card) {
        if (!card) return;
        if (window.TWEEN) {
            new TWEEN.Tween(card.scale)
                .to({ x: 1, y: 1, z: 1 }, 200)
                .easing(TWEEN.Easing.Quadratic.Out)
                .start();
        } else {
            card.scale.set(1, 1, 1);
        }
    },
    selectProject: function (project) {
        if (!project) return;
        if (this.selectedProject) {
            this.deselectProject();
        }
        this.selectedProject = project;
        if (project.object) {
            this.highlightCard(project.object);
            this.addPulsingEffect(project.object);
        }
        this.updateInfoPanel(project);
    },
    addPulsingEffect: function (card) {
        if (!card) return;
        const pulse = () => {
            if (!this.isInitialized || this.selectedProject?.object !== card)
                return;
            const time = Date.now() * 0.001;
            const scale = 1.05 + Math.sin(time * 2) * 0.02;
            card.scale.set(scale, scale, scale);
            requestAnimationFrame(pulse);
        };
        pulse();
    },
    deselectProject: function () {
        if (!this.selectedProject) return;
        if (this.selectedProject.object) {
            this.unhighlightCard(this.selectedProject.object);
        }
        this.resetInfoPanel();
        this.selectedProject = null;
    },
    moveCamera: function (position, target) {
        if (!this.camera) return;
        if (window.TWEEN) {
            new TWEEN.Tween(this.camera.position)
                .to(
                    {
                        x: position.x,
                        y: position.y,
                        z: position.z,
                    },
                    1000
                )
                .easing(TWEEN.Easing.Quadratic.InOut)
                .start();
            if (this.controls) {
                new TWEEN.Tween(this.controls.target)
                    .to(
                        {
                            x: target.x,
                            y: target.y,
                            z: target.z,
                        },
                        1000
                    )
                    .easing(TWEEN.Easing.Quadratic.InOut)
                    .start();
            }
        } else {
            this.camera.position.copy(position);
            this.camera.lookAt(target);
            if (this.controls && this.controls.target) {
                this.controls.target.copy(target);
            }
        }
    },
    updateInfoPanel: function (project) {
        const panel = document.querySelector(".projects-3d-info-panel");
        if (!panel) return;
        const title = panel.querySelector(".info-title");
        if (title) title.textContent = project.title;
        const description = panel.querySelector(".info-description");
        if (description)
            description.textContent =
                project.description || "No description available";
        const yearElement = panel.querySelector(".info-year");
        if (yearElement) yearElement.textContent = project.year || "N/A";
        const typeElement = panel.querySelector(".info-type");
        if (typeElement)
            typeElement.textContent = this.formatProjectType(project.type);
        const tags = panel.querySelector(".info-tags");
        if (tags) {
            tags.innerHTML = "";
            if (project.techTags && project.techTags.length > 0) {
                project.techTags.forEach((tag) => {
                    const tagElement = document.createElement("span");
                    tagElement.className = "info-tag";
                    tagElement.textContent = tag;
                    tags.appendChild(tagElement);
                });
            } else {
                tags.innerHTML = '<span class="info-tag empty">No tags</span>';
            }
        }
        const viewDetailsBtn = panel.querySelector(".view-details-btn");
        if (viewDetailsBtn) {
            viewDetailsBtn.onclick = () => {
                this.showProjectDetails(project);
            };
        }
        const viewDemoBtn = panel.querySelector(".view-demo-btn");
        if (viewDemoBtn) {
            viewDemoBtn.disabled = !project.demoUrl; 
            viewDemoBtn.style.opacity = project.demoUrl ? "1" : "0.5";
            viewDemoBtn.style.cursor = project.demoUrl
                ? "pointer"
                : "not-allowed";
            if (project.demoUrl) {
                viewDemoBtn.onclick = () => {
                    window.open(project.demoUrl, "_blank");
                };
            } else {
                viewDemoBtn.onclick = null; 
            }
        }
        panel.classList.add("visible");
        const tagElements = panel.querySelectorAll(".info-tag");
        tagElements.forEach((tag, index) => {
            tag.style.animationDelay = `${0.1 + index * 0.05}s`;
        });
    },
    formatProjectType: function (type) {
        if (!type) return "Other";
        return type.charAt(0).toUpperCase() + type.slice(1);
    },
    showProjectDetails: function (project) {
        const modal = document.createElement("div");
        modal.className = "project-modal";
        modal.innerHTML = `
            <div class="project-modal-content">
                <button class="modal-close-btn">×</button>
                <h2 class="modal-title">${project.title}</h2>
                <div class="modal-details">
                    <p class="modal-description">${
                        project.description || "No description available"
                    }</p>
                    <div class="modal-meta">
                        <span class="modal-year"><i class="fas fa-calendar-alt"></i> Year: ${
                            project.year || "N/A"
                        }</span>
                        <span class="modal-type"><i class="fas fa-code-branch"></i> Type: ${this.formatProjectType(
                            project.type
                        )}</span>
                    </div>
                    <div class="modal-tags">
                        <h4>Technologies</h4>
                        <div class="tags-container">
                            ${
                                project.techTags && project.techTags.length > 0
                                    ? project.techTags
                                          .map(
                                              (tag) =>
                                                  `<span class="info-tag">${tag}</span>`
                                          )
                                          .join("")
                                    : '<span class="info-tag empty">No tags</span>'
                            }
                        </div>
                    </div>
                    ${
                        project.demoUrl
                            ? `<a href="${project.demoUrl}" target="_blank" class="modal-demo-link">View Demo</a>`
                            : ""
                    }
                </div>
            </div>
        `;
        this.container.appendChild(modal);
        const closeBtn = modal.querySelector(".modal-close-btn");
        if (closeBtn) {
            closeBtn.addEventListener("click", () => {
                modal.classList.add("fade-out");
                setTimeout(() => {
                    modal.remove();
                }, 300);
            });
        }
        setTimeout(() => {
            modal.classList.add("show");
        }, 10);
    },
    resetInfoPanel: function () {
        const panel = document.querySelector(".projects-3d-info-panel");
        if (!panel) return;
        const title = panel.querySelector(".info-title");
        if (title) title.textContent = "Select a project";
        const description = panel.querySelector(".info-description");
        if (description)
            description.textContent = "Click on a project card to view details";
        const yearElement = panel.querySelector(".info-year");
        if (yearElement) yearElement.textContent = "Year";
        const typeElement = panel.querySelector(".info-type");
        if (typeElement) typeElement.textContent = "Type";
        const tags = panel.querySelector(".info-tags");
        if (tags) tags.innerHTML = "";
        panel.classList.remove("visible");
    },
    setViewMode: function (mode) {
        if (this.config.viewMode === mode) return;
        this.config.viewMode = mode;
        const buttons = document.querySelectorAll(".view-control-btn");
        buttons.forEach((btn) => {
            btn.classList.toggle(
                "active",
                btn.getAttribute("data-mode") === mode
            );
        });
        switch (mode) {
            case "carousel":
                if (this.controls) {
                    this.controls.autoRotate = this.config.autoRotate;
                }
                break;
            case "orbit":
                if (this.controls) {
                    this.controls.autoRotate = false;
                }
                break;
            case "focus":
                if (!this.selectedProject && this.projects.length > 0) {
                    this.selectProject(this.projects[0]);
                }
                if (this.controls) {
                    this.controls.autoRotate = false;
                }
                break;
        }
        this.updateCardPositions();
    },
    resetView: function () {
        this.moveCamera(
            new THREE.Vector3(
                this.config.initialCameraPosition.x,
                this.config.initialCameraPosition.y,
                this.config.initialCameraPosition.z
            ),
            new THREE.Vector3(0, 0, 0)
        );
        if (this.controls) {
            this.controls.reset();
        }
    },
    takeScreenshot: function () {
        if (this.composer) {
            this.composer.render();
        } else if (this.renderer) {
            this.renderer.render(this.scene, this.camera);
        }
        const canvas = this.renderer.domElement;
        try {
            const link = document.createElement("a");
            link.download = `project-showcase-${Date.now()}.png`;
            link.href = canvas.toDataURL("image/png");
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            this.showHint("Screenshot saved!");
        } catch (error) {
            console.error("Error taking screenshot:", error);
            this.showHint("Failed to save screenshot");
        }
    },
    toggleFullscreen: function () {
        if (!this.container) return;
        try {
            if (!document.fullscreenElement) {
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
            const fullscreenBtn = document.getElementById("fullscreen-btn");
            if (fullscreenBtn) {
                const icon = fullscreenBtn.querySelector("i");
                if (icon) {
                    if (document.fullscreenElement) {
                        icon.classList.remove("fa-expand");
                        icon.classList.add("fa-compress");
                    } else {
                        icon.classList.remove("fa-compress");
                        icon.classList.add("fa-expand");
                    }
                }
            }
        } catch (error) {
            console.error("Error toggling fullscreen:", error);
            this.showHint("Fullscreen not supported");
        }
    },
    showHint: function (message) {
        let hint = document.querySelector(".projects-3d-hint");
        if (!hint) {
            hint = document.createElement("div");
            hint.className = "projects-3d-hint";
            this.container.appendChild(hint);
        }
        hint.innerHTML = message;
        hint.classList.add("visible");
        setTimeout(() => {
            hint.classList.remove("visible");
        }, 3000);
    },
    animate: function () {
        if (!this.isInitialized) return;
        requestAnimationFrame(() => this.animate());
        if (window.TWEEN) {
            TWEEN.update();
        }
        if (this.controls) {
            this.controls.update();
        }
        if (this.config.viewMode === "carousel" && this.config.autoRotate) {
            this.projects.forEach((project) => {
                if (project.object) {
                    const x = project.object.position.x;
                    const z = project.object.position.z;
                    let angle = Math.atan2(z, x);
                    angle += this.config.rotationSpeed;
                    const radius = Math.sqrt(x * x + z * z);
                    project.object.position.x = Math.cos(angle) * radius;
                    project.object.position.z = Math.sin(angle) * radius;
                    project.object.lookAt(
                        new THREE.Vector3(0, project.object.position.y, 0)
                    );
                    if (project.connectionLine) {
                        const points = [
                            project.object.position.clone(),
                            new THREE.Vector3(
                                project.object.position.x,
                                -5,
                                project.object.position.z
                            ),
                        ];
                        project.connectionLine.geometry.setFromPoints(points);
                    }
                }
            });
        }
        if (this.composer) {
            this.composer.render();
        } else if (this.renderer && this.scene && this.camera) {
            this.renderer.render(this.scene, this.camera);
        }
    },
    dispose: function () {
        this.isInitialized = false;
        window.removeEventListener("resize", this.handleResize);
        if (this.renderer && this.renderer.domElement) {
            this.renderer.domElement.removeEventListener(
                "mousemove",
                this.handleMouseMove
            );
            this.renderer.domElement.removeEventListener(
                "click",
                this.handleClick
            );
        }
        window.removeEventListener("keydown", this.handleKeyDown);
        if (this.controls && this.controls.dispose) {
            this.controls.dispose();
        }
        if (this.scene) {
            this.disposeSceneObjects(this.scene);
        }
        if (this.composer) {
            this.composer.renderTarget1.dispose();
            this.composer.renderTarget2.dispose();
        }
        if (this.renderer) {
            this.renderer.dispose();
            this.renderer.forceContextLoss();
            this.renderer.domElement = null;
        }
        this.container = null;
        this.scene = null;
        this.camera = null;
        this.renderer = null;
        this.controls = null;
        this.composer = null;
        this.projects = [];
        this.selectedProject = null;
        console.log("3D showcase disposed");
    },
    disposeSceneObjects: function (obj) {
        if (!obj) return;
        if (obj.children) {
            const children = [...obj.children];
            for (let i = 0; i < children.length; i++) {
                this.disposeSceneObjects(children[i]);
            }
        }
        if (obj.geometry) {
            obj.geometry.dispose();
        }
        if (obj.material) {
            if (Array.isArray(obj.material)) {
                obj.material.forEach((material) => {
                    this.disposeMaterial(material);
                });
            } else {
                this.disposeMaterial(obj.material);
            }
        }
        if (obj.parent) {
            obj.parent.remove(obj);
        }
    },
    disposeMaterial: function (material) {
        if (!material) return;
        Object.keys(material).forEach((key) => {
            if (material[key] && material[key].isTexture) {
                material[key].dispose();
            }
        });
        material.dispose();
    },
};
document.addEventListener("DOMContentLoaded", function () {
    if (window.supremeProjectViewer) {
        window.supremeProjectViewer.init();
    }
});