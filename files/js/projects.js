window.ProjectsContent = {
    getHTML: function () {
        return `
            <div class="container">
                <div class="projects-header-container">
                    <h2 class="section-title nova-title" data-aos="fade-right">
                        <span class="title-icon"><i class="fas fa-rocket"></i></span>
                        <span class="title-text">Legendary Projects</span>
                        <span class="title-decoration"></span>
                    </h2>
                    <p class="section-subtitle futuristic-text" data-aos="fade-up" data-aos-delay="100">
                        Exploring the boundaries of technology through innovative solutions
                    </p>
                    <div class="project-stats-bar" data-aos="fade-up" data-aos-delay="150">
                        <div class="stat-item">
                            <div class="stat-value">35+</div>
                            <div class="stat-label">Projects</div>
                            <div class="stat-bar"><span style="width:92%"></span></div>
                        </div>
                        <div class="stat-item">
                            <div class="stat-value">18</div>
                            <div class="stat-label">Technologies</div>
                            <div class="stat-bar"><span style="width:75%"></span></div>
                        </div>
                        <div class="stat-item">
                            <div class="stat-value">5+</div>
                            <div class="stat-label">Years</div>
                            <div class="stat-bar"><span style="width:60%"></span></div>
                        </div>
                    </div>
                </div>
                <div class="legendary-indicator pulse-glow"></div>
                <div class="projects-dashboard">
                    <div class="projects-nav quantum-panel" data-aos="fade-up" data-aos-delay="200">
                        <div class="project-view-toggle legendary-toggle floating-animation">
                            <button class="view-btn neo-btn active" data-view="grid" data-tooltip="Grid View">
                                <i class="fas fa-th"></i>
                                <span class="btn-label">Grid</span>
                                <span class="btn-glow"></span>
                            </button>
                            <button class="view-btn neo-btn" data-view="list" data-tooltip="List View">
                                <i class="fas fa-list"></i>
                                <span class="btn-label">List</span>
                                <span class="btn-glow"></span>
                            </button>
                            <button class="view-btn neo-btn" data-view="carousel" data-tooltip="Carousel View">
                                <i class="fas fa-images"></i>
                                <span class="btn-label">Carousel</span>
                                <span class="btn-glow"></span>
                            </button>
                            <button class="view-btn neo-btn" data-view="3d" data-tooltip="Immersive 3D View">
                                <i class="fas fa-cube"></i>
                                <span class="btn-label">3D Space</span>
                                <span class="btn-glow"></span>
                            </button>
                            <button class="view-btn neo-btn" data-view="timeline" data-tooltip="Project Timeline">
                                <i class="fas fa-clock"></i>
                                <span class="btn-label">Timeline</span>
                                <span class="btn-glow"></span>
                            </button>
                        </div>
                        <div class="project-filters premium-filters">
                            <button class="project-filter neo-filter active" data-filter="all">
                                <i class="fas fa-th-large"></i>
                                <span>All Projects</span>
                                <div class="filter-glow"></div>
                            </button>
                            <button class="project-filter neo-filter" data-filter="ai">
                                <i class="fas fa-brain"></i>
                                <span>AI/ML</span>
                                <div class="filter-glow"></div>
                            </button>
                            <button class="project-filter neo-filter" data-filter="web">
                                <i class="fas fa-globe"></i>
                                <span>Web Dev</span>
                                <div class="filter-glow"></div>
                            </button>
                            <button class="project-filter neo-filter" data-filter="mobile">
                                <i class="fas fa-mobile-alt"></i>
                                <span>Mobile</span>
                                <div class="filter-glow"></div>
                            </button>
                            <button class="project-filter neo-filter" data-filter="game">
                                <i class="fas fa-gamepad"></i>
                                <span>Games</span>
                                <div class="filter-glow"></div>
                            </button>
                            <button class="project-filter neo-filter" data-filter="blockchain">
                                <i class="fas fa-link"></i>
                                <span>Blockchain</span>
                                <div class="filter-glow"></div>
                            </button>
                            <button class="project-filter neo-filter" data-filter="data">
                                <i class="fas fa-database"></i>
                                <span>Data</span>
                                <div class="filter-glow"></div>
                            </button>
                            <button class="project-filter neo-filter" data-filter="tools">
                                <i class="fas fa-tools"></i>
                                <span>Tools</span>
                                <div class="filter-glow"></div>
                            </button>
                        </div>
                    </div>
                    <div class="project-filter-container quantum-glass">
                        <div class="search-filter-header">
                            <div class="filter-section-label">
                                <i class="fas fa-sliders-h"></i>
                                <span>Advanced Filters</span>
                            </div>
                            <div class="filter-controls-toggle">
                                <button class="toggle-filters-btn">
                                    <i class="fas fa-chevron-down"></i>
                                </button>
                            </div>
                        </div>
                        <div class="filter-controls">
                            <div class="search-bar quantum-search">
                                <i class="fas fa-search search-icon"></i>
                                <input type="text" id="project-search" placeholder="Search projects..." />
                                <button class="search-clear"><i class="fas fa-times"></i></button>
                                <div class="search-pulse"></div>
                            </div>
                            <div class="filter-options">
                                <div class="filter-group">
                                    <label for="tech-filter">Technology</label>
                                    <select id="tech-filter" class="quantum-select">
                                        <option value="all">All</option>
                                        <option value="javascript">JavaScript</option>
                                        <option value="python">Python</option>
                                        <option value="html">HTML</option>
                                        <option value="css">CSS</option>
                                        <option value="react">React</option>
                                        <option value="nodejs">Node.js</option>
                                        <option value="flask">Flask</option>
                                        <option value="tensorflow">TensorFlow</option>
                                    </select>
                                </div>
                                <div class="filter-group">
                                    <label for="type-filter">Type</label>
                                    <select id="type-filter" class="quantum-select">
                                        <option value="all">All</option>
                                        <option value="web">Web</option>
                                        <option value="mobile">Mobile</option>
                                        <option value="ai">AI/ML</option>
                                        <option value="game">Game</option>
                                        <option value="blockchain">Blockchain</option>
                                        <option value="data">Data Science</option>
                                        <option value="tools">Tools</option>
                                    </select>
                                </div>
                                <div class="filter-group">
                                    <label for="year-filter">Year</label>
                                    <select id="year-filter" class="quantum-select">
                                        <option value="all">All</option>
                                        <option value="2025">2025</option>
                                        <option value="2024">2024</option>
                                        <option value="2023">2023</option>
                                        <option value="2022">2022</option>
                                        <option value="2021">2021</option>
                                    </select>
                                </div>
                                <div class="filter-group">
                                    <label for="complexity-filter">Complexity</label>
                                    <select id="complexity-filter" class="quantum-select">
                                        <option value="all">All</option>
                                        <option value="simple">Simple</option>
                                        <option value="moderate">Moderate</option>
                                        <option value="complex">Complex</option>
                                    </select>
                                </div>
                            </div>
                            <div class="filter-actions">
                                <button class="reset-filters neo-btn-secondary">
                                    <i class="fas fa-sync-alt"></i> Reset Filters
                                </button>
                                <button class="save-filters neo-btn-secondary">
                                    <i class="fas fa-save"></i> Save Filter
                                </button>
                            </div>
                        </div>
                        <div class="active-filters" style="display: none"></div>
                        <div class="filter-results-info">
                            <span class="results-count">0 projects found</span>
                            <div class="no-results-message" style="display: none">
                                <i class="fas fa-search-minus"></i>
                                No projects match your current filters.
                            </div>
                            <div class="sort-controls">
                                <label for="sort-projects">Sort by:</label>
                                <select id="sort-projects" class="quantum-select">
                                    <option value="newest">Newest First</option>
                                    <option value="oldest">Oldest First</option>
                                    <option value="az">A-Z</option>
                                    <option value="za">Z-A</option>
                                    <option value="complexity">Complexity</option>
                                </select>
                            </div>
                        </div>
                        <div class="projects-grid-view">
                            <div class="projects-grid">
                            </div>
                        </div>
                        <div class="projects-list-view" style="display: none;">
                            <div class="projects-list">
                            </div>
                        </div>
                        <div class="projects-carousel-view" style="display: none;">
                            <div class="carousel-container">
                                <button class="carousel-arrow prev-arrow" disabled>
                                    <i class="fas fa-chevron-left"></i>
                                </button>
                                <div class="carousel-track">
                                </div>
                                <button class="carousel-arrow next-arrow">
                                    <i class="fas fa-chevron-right"></i>
                                </button>
                            </div>
                            <div class="carousel-indicators">
                            </div>
                        </div>
                        <div class="projects-timeline-view" style="display: none;">
                            <div class="timeline-container">
                                <div class="timeline-line"></div>
                                <div class="timeline-items">
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="project-modal1">
                    <div class="project-modal1-content quantum-glass">
                        <button class="close-modal-btn">
                            <i class="fas fa-times"></i>
                        </button>
                        <div class="modal-header">
                            <h3 id="modal-title"></h3>
                            <div class="modal-badges"></div>
                        </div>
                        <div class="modal-gallery">
                            <div class="modal-main-image"></div>
                            <div class="modal-thumbnails"></div>
                        </div>
                        <div class="modal-body">
                            <div class="modal-description"></div>
                            <div class="modal-features">
                                <h4>Key Features</h4>
                                <ul class="features-list"></ul>
                            </div>
                            <div class="modal-technologies">
                                <h4>Technologies Used</h4>
                                <div class="tech-badges"></div>
                            </div>
                        </div>
                        <div class="modal-footer">
                            <div class="modal-metrics">
                                <div class="metric">
                                    <i class="fas fa-code-branch"></i>
                                    <span class="metric-value repo-forks">12</span>
                                    <span class="metric-label">Forks</span>
                                </div>
                                <div class="metric">
                                    <i class="fas fa-star"></i>
                                    <span class="metric-value repo-stars">36</span>
                                    <span class="metric-label">Stars</span>
                                </div>
                                <div class="metric">
                                    <i class="fas fa-eye"></i>
                                    <span class="metric-value repo-watchers">18</span>
                                    <span class="metric-label">Watchers</span>
                                </div>
                            </div>
                            <div class="modal-actions">
                                <a href="#" class="modal-btn github-link" target="_blank">
                                    <i class="fab fa-github"></i> View Code
                                </a>
                                <a href="#" class="modal-btn live-link" target="_blank">
                                    <i class="fas fa-external-link-alt"></i> Live Demo
                                </a>
                                <button class="modal-btn share-btn">
                                    <i class="fas fa-share-alt"></i> Share
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="share-modal">
                    <div class="share-modal-content quantum-glass">
                        <button class="close-share-btn">
                            <i class="fas fa-times"></i>
                        </button>
                        <h3>Share This Project</h3>
                        <div class="share-project-info">
                            <div class="share-project-image"></div>
                            <div class="share-project-title"></div>
                        </div>
                        <div class="share-options">
                            <button class="share-option" data-platform="twitter">
                                <i class="fab fa-twitter"></i>
                                <span>Twitter</span>
                            </button>
                            <button class="share-option" data-platform="linkedin">
                                <i class="fab fa-linkedin"></i>
                                <span>LinkedIn</span>
                            </button>
                            <button class="share-option" data-platform="facebook">
                                <i class="fab fa-facebook"></i>
                                <span>Facebook</span>
                            </button>
                            <button class="share-option" data-platform="email">
                                <i class="fas fa-envelope"></i>
                                <span>Email</span>
                            </button>
                        </div>
                        <div class="share-link-container">
                            <input type="text" class="share-link" readonly />
                            <button class="copy-link-btn">
                                <i class="fas fa-copy"></i>
                                <span>Copy</span>
                            </button>
                        </div>
                        <div class="share-qr-code">
                            <div class="qr-container"></div>
                            <button class="download-qr-btn">
                                <i class="fas fa-download"></i> Download QR Code
                            </button>
                        </div>
                    </div>
                </div>
                <div class="section-background">
                    <div class="bg-particles"></div>
                    <div class="bg-grid"></div>
                </div>
            </div>
        `;
    },
    init: function () {
        this.setupProjects();
        this.setupViewToggle();
        this.setupFilterFunctionality();
        this.setupProjectModals();
        this.setupShareFunctionality();
        this.setupTimelineView();
        this.initializeParticles();
        this.init3DShowcase();
    },
    setupProjects: function () {
        const projectsGrid = document.querySelector(".projects-grid");
        const projectsList = document.querySelector(".projects-list");
        const projects = [
            {
                id: "project1",
                title: "TakaDenGoruNen.com",
                description:
                    "Specialized e-commerce platform for the livestock market",
                fullDescription:
                    "A specialized e-commerce platform dedicated to the cow selling market. This website seamlessly blends intuitive design with robust backend systems to provide a trustworthy and user-friendly marketplace. It not only facilitates smooth transactions but also builds a community for livestock trading, ensuring quality and reliability throughout the process.",
                image: "images/projects/takaden.png",
                category: "web",
                techs: ["html", "css", "javascript", "ecommerce", "community"],
                type: "web",
                year: "2022",
                complexity: "moderate",
                features: [
                    "E-commerce functionality",
                    "Web Development best practices",
                    "Community Platform integration",
                    "User-friendly marketplace",
                    "Secure transactions",
                ],
                links: [
                    {
                        type: "github",
                        url: "https://github.com/anms5519/TakaDenGoruNen.com",
                        label: "View Code",
                    },
                    {
                        type: "live",
                        url: "https://takadengorunen.netlify.app/",
                        label: "Live Demo",
                    },
                ],
                metrics: { stars: 0, forks: 0, watchers: 0 },
            },
            {
                id: "project2",
                title: "THETAEnhancer",
                description: "Next leap in AI image enhancement technology",
                fullDescription:
                    "THETAEnhancer+ represents the next leap in image enhancement technology, leveraging state-of-the-art artificial intelligence to not only restore degraded images but also dramatically increase their quality and detail.",
                image: "images/projects/ai-enhancer.jpg",
                category: "ai",
                techs: [
                    "deeplearning",
                    "computervision",
                    "imageprocessing",
                    "python",
                ],
                type: "ai",
                year: "2023",
                complexity: "complex",
                features: [
                    "Deep Learning for image processing",
                    "Computer Vision techniques",
                    "Restoration of degraded images",
                    "Increased image quality and detail",
                ],
                links: [
                    {
                        type: "github",
                        url: "https://github.com/anms5519/THETAEnhancer-",
                        label: "View Code",
                    },
                    {
                        type: "live",
                        url: "https://thetaenhancer.onrender.com",
                        label: "THETAEnhancer+",
                    },
                ],
                metrics: { stars: 0, forks: 0, watchers: 0 },
            },
            {
                id: "project3",
                title: "Interactive Coding Projects",
                description:
                    "Collection of HTML5 games and utility web applications",
                fullDescription:
                    "A collection of interactive web applications including HTML5 games, a CGPA calculator, and an academic report creator. These projects showcase front-end development skills with JavaScript, CSS, and modern web technologies.",
                image: "images/projects/html5.jpg",
                category: "web game",
                techs: ["html5", "javascript", "webapps", "css"],
                type: "game",
                year: "2023",
                complexity: "moderate",
                features: [
                    "HTML5 Games",
                    "JavaScript-based Web Apps",
                    "CGPA Calculator",
                    "Academic Report Creator",
                ],
                links: [
                    {
                        type: "live",
                        url: "projects/html5.html",
                        label: "View Projects",
                    },
                ],
                metrics: { stars: 0, forks: 0, watchers: 0 },
            },
            {
                id: "project4",
                title: "Breakout Arcade",
                description:
                    "Classic brick-breaker with modern physics and power-ups",
                fullDescription:
                    "A modern take on the classic brick-breaker game with realistic physics, special power-ups, and multiple levels of increasing difficulty.",
                image: "images/projects/break.jpg",
                category: "game",
                techs: ["javascript", "canvas", "physics"],
                type: "game",
                year: "2022",
                complexity: "moderate",
                features: [
                    "JavaScript game development",
                    "Canvas API for rendering",
                    "Physics-based interactions",
                    "Power-ups and multiple levels",
                ],
                links: [
                    {
                        type: "play",
                        url: "games/breakout.html",
                        label: "Play Game",
                    },
                ],
                metrics: { stars: 0, forks: 0, watchers: 0 },
            },
            {
                id: "project5",
                title: "RoboTheta",
                description:
                    "Next-generation firefighting robot with AI-driven decision making",
                fullDescription:
                    "A next-generation, AI-powered firefighting robot engineered to revolutionize emergency response. Equipped with advanced thermal imaging, gas detection, and motion sensors, RoboTheta autonomously navigates hazardous environments, detecting survivors and suppressing fires with precision. Its rugged, heat-resistant design and real-time communication system, fused with AI-driven decision-making, make it an indispensable ally for fire service professionals—ensuring maximum safety and efficiency during life-saving operations.",
                image: "images/projects/robotheta.jpg",
                category: "ai",
                techs: [
                    "ai",
                    "robotics",
                    "thermalimaging",
                    "python",
                    "sensors",
                ],
                type: "ai",
                year: "2023",
                complexity: "complex",
                features: [
                    "AI-Powered Robotics",
                    "Thermal Imaging for detection",
                    "Autonomous navigation",
                    "Emergency response optimization",
                ],
                links: [
                    {
                        type: "github",
                        url: "https://github.com/anms5519/RoboTheta",
                        label: "View Code",
                    },
                ],
                metrics: { stars: 0, forks: 0, watchers: 0 },
            },
            {
                id: "project6",
                title: "Interactive 3D Game",
                description:
                    "Immersive FPS experience with high-fidelity graphics",
                fullDescription:
                    "An immersive first-person shooter (FPS) game developed using Unreal Engine and Python, designed to captivate players with its high-fidelity graphics and dynamic gameplay. This project marries innovative storytelling with interactive mechanics, offering a gaming experience that is both visually stunning and deeply engaging.",
                image: "images/projects/3d.jpg",
                category: "game",
                techs: ["unrealengine", "python", "gamedev", "3d"],
                type: "game",
                year: "2022",
                complexity: "complex",
                features: [
                    "Unreal Engine game development",
                    "Python scripting for gameplay",
                    "High-fidelity 3D graphics",
                    "Immersive FPS experience",
                ],
                links: [
                    {
                        type: "github",
                        url: "https://github.com/anms5519/3d-fps-game",
                        label: "View Code",
                    },
                ],
                metrics: { stars: 0, forks: 0, watchers: 0 },
            },
            {
                id: "project7",
                title: "Dynamic Web Interfaces",
                description:
                    "Ultra-advanced CSS animations for engaging web experiences",
                fullDescription:
                    "A project focused on crafting ultra-advanced CSS styles and animations to deliver visually captivating and engaging web experiences. By pushing the limits of modern web design, these interfaces offer dynamic, responsive, and interactive experiences that not only please the eye but also enhance user engagement.",
                image: "images/projects/dynamic.jpg",
                category: "web",
                techs: ["css", "animation", "ux", "ui", "javascript"],
                type: "web",
                year: "2023",
                complexity: "moderate",
                features: [
                    "Advanced CSS animations",
                    "UX/UI focused design",
                    "Visually captivating interfaces",
                    "Enhanced user engagement",
                ],
                links: [
                    {
                        type: "github",
                        url:
                            "https://github.com/anms5519/Dynamic-Web-Interfaces",
                        label: "View Code",
                    },
                ],
                metrics: { stars: 0, forks: 0, watchers: 0 },
            },
            {
                id: "project8",
                title: "AI-Powered Data Visualizer",
                description:
                    "Interactive platform transforming complex data into intuitive graphics",
                fullDescription:
                    "An interactive data visualization platform infused with AI insights, turning complex datasets into intuitive, visually appealing graphics. This project empowers users to uncover hidden patterns and actionable intelligence effortlessly, making data analysis both engaging and insightful.",
                image: "images/projects/datavizu.jpg",
                category: "data",
                techs: [
                    "datavisualization",
                    "aianalytics",
                    "interactivedesign",
                    "python",
                    "javascript",
                ],
                type: "data",
                year: "2023",
                complexity: "complex",
                features: [
                    "Interactive Data Visualization",
                    "AI Analytics for insights",
                    "User-friendly graphical representation",
                    "Pattern discovery",
                ],
                links: [
                    {
                        type: "github",
                        url:
                            "https://github.com/anms5519/AI-Powered-Data-Visualizer",
                        label: "View Code",
                    },
                ],
                metrics: { stars: 0, forks: 0, watchers: 0 },
            },
            {
                id: "project9",
                title: "3D Virtual Tour",
                description:
                    "Immersive exploration of realistic 3D environments",
                fullDescription:
                    "A fully immersive virtual tour created with Three.js and WebGL, designed to transport users into realistic 3D environments. Whether for real estate, education, or cultural exploration, this project offers an engaging and interactive way to experience spaces remotely.",
                image: "images/projects/3d.jpg",
                category: "web",
                techs: ["threejs", "webgl", "3dmodeling", "javascript"],
                type: "web",
                year: "2023",
                complexity: "complex",
                features: [
                    "Three.js and WebGL rendering",
                    "3D Modeling for environments",
                    "Immersive virtual tours",
                    "Interactive 3D experiences",
                ],
                links: [
                    {
                        type: "github",
                        url: "https://github.com/anms5519/3d-tour",
                        label: "View Code",
                    },
                ],
                metrics: { stars: 0, forks: 0, watchers: 0 },
            },
            {
                id: "project10",
                title: "Real-Time Multiplayer Game",
                description:
                    "Online competitive gameplay with advanced animations",
                fullDescription:
                    "A sophisticated online game featuring advanced animations and responsive controls, crafted for real-time, competitive gameplay. This project promises smooth performance and immersive multiplayer experiences, ensuring every player feels fully engaged in the action.",
                image: "images/projects/multiplayer.jpg",
                category: "game",
                techs: [
                    "websockets",
                    "gamedev",
                    "realtime",
                    "javascript",
                    "nodejs",
                ],
                type: "game",
                year: "2022",
                complexity: "complex",
                features: [
                    "WebSockets for real-time communication",
                    "Multiplayer game development",
                    "Advanced animations and responsive controls",
                    "Node.js backend",
                ],
                links: [
                    {
                        type: "github",
                        url: "https://github.com/anms5519/multiplayer-game",
                        label: "View Code",
                    },
                ],
                metrics: { stars: 0, forks: 0, watchers: 0 },
            },
            {
                id: "project11",
                title: "Quantum Code Simulator",
                description:
                    "Visualizing quantum algorithms through interactive simulation",
                fullDescription:
                    "A real-time simulation tool for quantum computing algorithms, featuring visually compelling representations of quantum mechanics. This project demystifies the complexities of quantum computation, making it accessible and engaging for enthusiasts and professionals alike.",
                image: "images/projects/quantum.jpg",
                category: "ai",
                techs: [
                    "quantumcomputing",
                    "simulation",
                    "visualization",
                    "python",
                ],
                type: "ai",
                year: "2023",
                complexity: "complex",
                features: [
                    "Quantum Computing algorithm simulation",
                    "Interactive visualization of quantum mechanics",
                    "Python-based simulation tool",
                ],
                links: [
                    {
                        type: "github",
                        url:
                            "https://github.com/anms5519/Quantum-Code-Simulator",
                        label: "View Code",
                    },
                ],
                metrics: { stars: 0, forks: 0, watchers: 0 },
            },
            {
                id: "project12",
                title: "Handwritten Digit Recognizer",
                description: "Deep learning project for digit recognition",
                fullDescription:
                    "A deep learning project for recognizing handwritten digits",
                image: "images/projects/handwritten.jpg",
                category: "ai",
                techs: [
                    "python",
                    "deeplearning",
                    "neuralnetworks",
                    "tensorflow",
                    "keras",
                ],
                type: "ai",
                year: "2023",
                complexity: "complex",
                features: [
                    "Python for scripting",
                    "Deep Learning with Neural Networks",
                    "TensorFlow and Keras framework",
                    "Handwritten digit classification",
                ],
                links: [
                    {
                        type: "github",
                        url:
                            "https://github.com/anms5519/Handwritten-Digit-Recognizer",
                        label: "View Code",
                    },
                ],
                metrics: { stars: 0, forks: 0, watchers: 0 },
            },
            {
                id: "project13",
                title: "KNN Breast Cancer Diagnosis",
                description: "Machine learning model for cancer diagnosis",
                fullDescription:
                    "A machine learning project using KNN algorithm for breast cancer diagnosis",
                image: "images/projects/knn.jpg",
                category: "ai",
                techs: [
                    "python",
                    "machinelearning",
                    "knn",
                    "jupyter",
                    "scikitlearn",
                ],
                type: "ai",
                year: "2023",
                complexity: "complex",
                features: [
                    "Machine Learning for medical diagnosis",
                    "K-Nearest Neighbors (KNN) algorithm",
                    "Jupyter Notebook for development",
                    "Scikit-learn library usage",
                ],
                links: [
                    {
                        type: "github",
                        url:
                            "https://github.com/anms5519/KNN---Breast-Cancer-Diagnosis",
                        label: "View Code",
                    },
                ],
                metrics: { stars: 0, forks: 0, watchers: 0 },
            },
            {
                id: "project14", 
                title: "Handwritten Digit Recognizer",
                description: "Deep learning project for digit recognition",
                fullDescription:
                    "A deep learning project for recognizing handwritten digits",
                image: "images/projects/handwritten.jpg",
                category: "ai",
                techs: [
                    "python",
                    "deeplearning",
                    "neuralnetworks",
                    "tensorflow",
                    "keras",
                ],
                type: "ai",
                year: "2023",
                complexity: "complex",
                features: [
                    "Python for scripting",
                    "Deep Learning with Neural Networks",
                    "TensorFlow and Keras framework",
                    "Handwritten digit classification",
                ],
                links: [
                    {
                        type: "github",
                        url:
                            "https://github.com/anms5519/Handwritten-Digit-Recognizer",
                        label: "View Code",
                    },
                ],
                metrics: { stars: 0, forks: 0, watchers: 0 },
            },
            {
                id: "project15",
                title: "KNeighborsClassifier",
                description: "Implementation of KNN algorithm",
                fullDescription:
                    "A machine learning project implementing the KNN algorithm",
                image: "images/projects/knnclass.jpg",
                category: "ai",
                techs: [
                    "python",
                    "machinelearning",
                    "knn",
                    "classification",
                    "scikitlearn",
                ],
                type: "ai",
                year: "2023",
                complexity: "complex",
                features: [
                    "Python for Machine Learning",
                    "K-Nearest Neighbors (KNN) implementation",
                    "Classification tasks",
                    "Scikit-learn library",
                ],
                links: [
                    {
                        type: "github",
                        url: "https://github.com/anms5519/KNeighborsClassifier",
                        label: "View Code",
                    },
                ],
                metrics: { stars: 0, forks: 0, watchers: 0 },
            },
            {
                id: "project16",
                title: "Plant Disease Prediction",
                description: "AI-powered plant disease detection system",
                fullDescription:
                    "A machine learning project for predicting plant diseases from leaf images",
                image: "images/projects/plant.jpg",
                category: "ai",
                techs: [
                    "python",
                    "imageprocessing",
                    "agriculture",
                    "computervision",
                    "deeplearning",
                ],
                type: "ai",
                year: "2023",
                complexity: "complex",
                features: [
                    "Image Processing for agriculture",
                    "Computer Vision for leaf analysis",
                    "Deep Learning for disease prediction",
                    "AgriTech application",
                ],
                links: [
                    {
                        type: "github",
                        url:
                            "https://github.com/anms5519/Plant-Disease-Prediction-Using-Leaf",
                        label: "View Code",
                    },
                ],
                metrics: { stars: 0, forks: 0, watchers: 0 },
            },
            {
                id: "project17",
                title: "Decision Tree Classifier",
                description: "Implementation of Decision Tree algorithm",
                fullDescription:
                    "A machine learning project implementing the Decision Tree algorithm",
                image: "images/projects/decision.jpg",
                category: "ai",
                techs: [
                    "python",
                    "machinelearning",
                    "decisiontrees",
                    "scikitlearn",
                ],
                type: "ai",
                year: "2023",
                complexity: "complex",
                features: [
                    "Python for Machine Learning",
                    "Decision Trees algorithm implementation",
                    "Classification modeling",
                    "Scikit-learn usage",
                ],
                links: [
                    {
                        type: "github",
                        url:
                            "https://github.com/anms5519/Decision-Tree-Classifier",
                        label: "View Code",
                    },
                ],
                metrics: { stars: 0, forks: 0, watchers: 0 },
            },
            {
                id: "project18",
                title: "CSE Toolkit v4.2",
                description: "Advanced toolkit for CSE students",
                fullDescription: "Ultimate academic companion for CSE students",
                image: "images/projects/csetoolkit4.jpg",
                category: "tools",
                techs: ["python", "automation", "educational", "scripting"],
                type: "tools",
                year: "2023",
                complexity: "moderate",
                features: [
                    "Python scripting for automation",
                    "Educational tool for CSE students",
                    "Academic task assistance",
                ],
                links: [
                    {
                        type: "github",
                        url:
                            "https://github.com/anms5519/Ultra-Advanced-Legendary-CSE-Toolkit-v4.2",
                        label: "View Code",
                    },
                ],
                metrics: { stars: 0, forks: 0, watchers: 0 },
            },
            {
                id: "project19",
                title: "CSE Toolkit 5.0",
                description:
                    "Latest version of the ultimate academic companion",
                fullDescription:
                    "Ultimate Academic Companion - Latest version of the CSE toolkit",
                image: "images/projects/cse5.jpg",
                category: "tools",
                techs: ["python", "automation", "educational", "scripting"],
                type: "tools",
                year: "2023",
                complexity: "moderate",
                features: [
                    "Python-based automation scripts",
                    "Enhanced educational features",
                    "Updated academic toolkit",
                ],
                links: [
                    {
                        type: "github",
                        url: "https://github.com/anms5519/CSE-Toolkit-5.0-",
                        label: "View Code",
                    },
                ],
                metrics: { stars: 0, forks: 0, watchers: 0 },
            },
            {
                id: "project20",
                title: "Image Classifier",
                description: "Deep learning based image classifier",
                fullDescription: "A deep learning based image classifier",
                image: "images/projects/image.jpg",
                category: "ai",
                techs: [
                    "python",
                    "deeplearning",
                    "computervision",
                    "tensorflow",
                    "keras",
                ],
                type: "ai",
                year: "2023",
                complexity: "complex",
                features: [
                    "Deep Learning for image classification",
                    "Computer Vision application",
                    "TensorFlow and Keras implementation",
                ],
                links: [
                    {
                        type: "github",
                        url: "https://github.com/anms5519/Image-Classifier",
                        label: "View Code",
                    },
                ],
                metrics: { stars: 0, forks: 0, watchers: 0 },
            },
            {
                id: "project21",
                title: "Stroke Risk Assessment",
                description: "Deep learning model for medical risk assessment",
                fullDescription:
                    "A Deep Learning based project for stroke risk assessment",
                image: "images/projects/strock.jpg",
                category: "ai",
                techs: [
                    "python",
                    "deeplearning",
                    "healthcare",
                    "tensorflow",
                    "keras",
                ],
                type: "ai",
                year: "2023",
                complexity: "complex",
                features: [
                    "Deep Learning in Healthcare",
                    "Medical risk assessment model",
                    "TensorFlow/Keras for neural networks",
                ],
                links: [
                    {
                        type: "github",
                        url:
                            "https://github.com/anms5519/Stroke-Risk-Assessment",
                        label: "View Code",
                    },
                ],
                metrics: { stars: 0, forks: 0, watchers: 0 },
            },
            {
                id: "project22",
                title: "Portfolio Demo 1",
                description: "Portfolio website design demo",
                fullDescription: "A demo of portfolio design",
                image: "images/projects/portdem.jpg",
                category: "web",
                techs: ["html", "css", "webdesign"],
                type: "web",
                year: "2023",
                complexity: "moderate",
                features: [
                    "HTML and CSS for structure and styling",
                    "Web Design principles",
                    "Portfolio demonstration",
                ],
                links: [
                    {
                        type: "github",
                        url: "https://github.com/anms5519/portfolio-1",
                        label: "View Code",
                    },
                ],
                metrics: { stars: 0, forks: 0, watchers: 0 },
            },
            {
                id: "project23",
                title: "Premium Portfolio",
                description: "Premium portfolio web application",
                fullDescription: "A demo of premium portfolio webapp",
                image: "images/projects/premiumport.jpg",
                category: "web",
                techs: ["html", "css", "javascript", "webdesign"],
                type: "web",
                year: "2023",
                complexity: "moderate",
                features: [
                    "HTML, CSS, and JavaScript",
                    "Premium web design aesthetics",
                    "Interactive portfolio elements",
                ],
                links: [
                    {
                        type: "github",
                        url: "https://github.com/anms5519/portfolio-2",
                        label: "View Code",
                    },
                ],
                metrics: { stars: 0, forks: 0, watchers: 0 },
            },
            {
                id: "project24",
                title: "NeuralForge",
                description:
                    "Advanced neural architecture for language understanding",
                fullDescription:
                    "A revolutionary neural network architecture that combines transformer models with reinforcement learning for unprecedented accuracy in natural language understanding and generation. The system can learn from minimal examples while maintaining contextual awareness across diverse domains.",
                image: "images/projects/nural.jpg",
                category: "ai",
                techs: [
                    "neuralnetworks",
                    "naturallanguage",
                    "transformers",
                    "python",
                    "ai",
                    "reinforcementlearning",
                ],
                type: "ai",
                year: "future",
                complexity: "complex",
                features: [
                    "Advanced Neural Networks",
                    "Natural Language Processing (NLP)",
                    "Transformer models",
                    "Reinforcement Learning integration",
                ],
                links: [],
                metrics: { stars: 0, forks: 0, watchers: 0 },
            },
            {
                id: "project25",
                title: "TaskFlow AI",
                description:
                    "Intelligent task management app with AI-powered scheduling and prioritization for iOS & Android.",
                fullDescription:
                    "TaskFlow AI leverages machine learning to understand your work patterns, automatically suggesting task priorities, optimal work times, and potential scheduling conflicts. Built with React Native for cross-platform compatibility and Firebase for real-time sync.",
                image: "images/projects/taskflow.png",
                category: "mobile",
                techs: ["reactnative", "javascript", "firebase", "ai", "redux"],
                type: "mobile",
                year: "2024",
                complexity: "complex",
                features: [
                    "React Native cross-platform app",
                    "AI Assistant for task management",
                    "Productivity enhancement",
                    "Firebase real-time sync",
                    "Redux state management",
                ],
                links: [
                    {
                        type: "github",
                        url:
                            "https://github.com/anms5519/taskflow-ai-scheduler",
                        label: "View Code",
                    },
                    {
                        type: "appstore",
                        url: "#",
                        label: "View on App Store (iOS)",
                    },
                    {
                        type: "googleplay",
                        url: "#",
                        label: "View on Google Play",
                    },
                ],
                metrics: { stars: 0, forks: 0, watchers: 0 },
            },
            {
                id: "project26",
                title: "LocalVibe Connect",
                description:
                    "iOS app connecting users to local events, meetups, and community activities based on interests.",
                fullDescription:
                    "Discover hidden gems and happenings in your neighborhood. LocalVibe uses CoreML for personalized event recommendations and MapKit for seamless navigation. Features include event creation, RSVP tracking, and interest-based filtering. Native iOS development ensures optimal performance and integration.",
                image: "images/projects/localvibe.png",
                category: "mobile",
                techs: ["swift", "ios", "coreml", "mapkit", "uikit"],
                type: "mobile",
                year: "2023",
                complexity: "complex",
                features: [
                    "Swift for native iOS development",
                    "CoreML for personalized recommendations",
                    "MapKit for navigation",
                    "Social event discovery",
                ],
                links: [
                    {
                        type: "github",
                        url: "https://github.com/anms5519/local-pulse-gather",
                        label: "View Code",
                    },
                    {
                        type: "appstore",
                        url: "#",
                        label: "View on App Store (iOS)",
                    },
                ],
                metrics: { stars: 0, forks: 0, watchers: 0 },
            },
            {
                id: "project27",
                title: "FitForge Pro",
                description:
                    "Personalized fitness planner and tracker for Android and Wear OS with adaptive workout routines.",
                fullDescription:
                    "Achieve your fitness goals with FitForge Pro. Built using modern Android development practices with Kotlin and Jetpack Compose for a beautiful UI. Integrates with Health Connect for data sharing and offers a companion Wear OS app for tracking workouts on the go.",
                image: "images/projects/fitforge.png",
                category: "mobile",
                techs: [
                    "kotlin",
                    "android",
                    "jetpackcompose",
                    "healthkit",
                    "wearos",
                ],
                type: "mobile",
                year: "2023",
                complexity: "complex",
                features: [
                    "Kotlin for native Android development",
                    "Jetpack Compose for UI",
                    "Wear OS companion app",
                    "Health & Fitness tracking",
                ],
                links: [
                    {
                        type: "github",
                        url:
                            "https://github.com/anms5519/forge-adaptive-fitness",
                        label: "View Code",
                    },
                    {
                        type: "googleplay",
                        url: "#",
                        label: "View on Google Play",
                    },
                ],
                metrics: { stars: 0, forks: 0, watchers: 0 },
            },
            {
                id: "project28",
                title: "EcoThread Mobile",
                description:
                    "Cross-platform marketplace app connecting buyers with sustainable and ethical fashion brands.",
                fullDescription:
                    "Shop consciously with EcoThread. Built using Flutter for a single codebase targeting both iOS and Android. Features secure payments via Stripe integration, user reviews, brand filtering based on ethical certifications, and Firebase backend for product management.",
                image: "images/projects/ecothread.png",
                category: "mobile",
                techs: ["flutter", "dart", "ecommerce", "stripe", "firebase"],
                type: "mobile",
                year: "2022",
                complexity: "complex",
                features: [
                    "Flutter for cross-platform development",
                    "E-commerce for sustainable fashion",
                    "Stripe payment integration",
                    "Firebase backend",
                ],
                links: [
                    {
                        type: "github",
                        url: "https://github.com/anms5519/eco-thread-market",
                        label: "View Code",
                    },
                    {
                        type: "appstore",
                        url: "#",
                        label: "View on App Store (iOS)",
                    },
                    {
                        type: "googleplay",
                        url: "#",
                        label: "View on Google Play",
                    },
                ],
                metrics: { stars: 0, forks: 0, watchers: 0 },
            },
            {
                id: "project29",
                title: "StoryScape AR",
                description:
                    "Mobile app bringing children's stories to life through interactive augmented reality experiences.",
                fullDescription:
                    "Experience storytelling like never before. Point your device at designated markers or surfaces to watch characters and scenes emerge in AR. Built with Unity and C#, utilizing AR Foundation to support both ARKit (iOS) and ARCore (Android). Features interactive elements and engaging animations.",
                image: "images/projects/storyscape.png",
                category: "mobile",
                techs: [
                    "unity",
                    "csharp",
                    "arfoundation",
                    "arkit",
                    "arcore",
                    "storytelling",
                ],
                type: "mobile",
                year: "2024",
                complexity: "complex",
                features: [
                    "Unity and C# for AR development",
                    "Augmented Reality experiences",
                    "AR Foundation (ARKit/ARCore)",
                    "Interactive storytelling",
                ],
                links: [
                    {
                        type: "github",
                        url:
                            "https://github.com/anms5519/storyscape-ar-adventures",
                        label: "View Code",
                    },
                    {
                        type: "appstore",
                        url: "#",
                        label: "View on App Store (iOS)",
                    },
                    {
                        type: "googleplay",
                        url: "#",
                        label: "View on Google Play",
                    },
                ],
                metrics: { stars: 0, forks: 0, watchers: 0 },
            },
            {
                id: "project30",
                title: "VisionX",
                description:
                    "Advanced object detection in challenging environments",
                fullDescription:
                    "Next-generation computer vision framework that can identify and track objects with exceptional precision in challenging environments including low light, high motion, and partial occlusion. Designed for real-time applications in autonomous systems and surveillance.",
                image: "images/projects/visionx.jpg",
                category: "ai",
                techs: [
                    "computervision",
                    "objectdetection",
                    "realtime",
                    "python",
                    "ai",
                ],
                type: "ai",
                year: "future",
                complexity: "complex",
                features: [
                    "Advanced Computer Vision",
                    "Real-time Object Detection",
                    "Precision tracking in challenging conditions",
                    "Autonomous systems application",
                ],
                links: [],
                metrics: { stars: 0, forks: 0, watchers: 0 },
            },
            {
                id: "project31",
                title: "FluidUI Framework",
                description:
                    "Adaptive UI framework that learns from user behavior",
                fullDescription:
                    "A groundbreaking UI/UX framework that adapts not only to screen sizes but to user behavior and preferences. FluidUI learns from interactions to create truly personalized interfaces while maintaining accessibility and performance across all devices.",
                image: "images/projects/fuid.jpg",
                category: "web",
                techs: [
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
                complexity: "complex",
                features: [
                    "Adaptive UI/UX Framework",
                    "Responsive and personalized interfaces",
                    "Learns from user behavior",
                    "Cross-device performance",
                ],
                links: [],
                metrics: { stars: 0, forks: 0, watchers: 0 },
            },
            {
                id: "project32",
                title: "HoloWeb",
                description:
                    "Holographic-like 3D experiences for standard browsers",
                fullDescription:
                    "A revolutionary web platform that brings holographic-like 3D experiences to standard browsers without plugins. By leveraging WebGL, device sensors, and advanced rendering techniques, HoloWeb creates immersive spatial experiences for e-commerce, education, and entertainment.",
                image: "images/projects/holo.jpg",
                category: "web",
                techs: ["webgl", "3d", "immersive", "threejs", "javascript"],
                type: "web",
                year: "future",
                complexity: "complex",
                features: [
                    "WebGL for 3D rendering",
                    "Immersive holographic-like experiences",
                    "Three.js integration",
                    "No-plugin browser compatibility",
                ],
                links: [],
                metrics: { stars: 0, forks: 0, watchers: 0 },
            },
            {
                id: "project33",
                title: "PredictiveInsights",
                description: "Explainable predictive analytics platform",
                fullDescription:
                    "An advanced predictive analytics platform that combines multiple forecasting methods with explainable AI. The system provides not only predictions but comprehensive explanations of factors influencing outcomes, making complex data analysis accessible to non-technical stakeholders.",
                image: "images/projects/predictive.jpg",
                category: "data",
                techs: [
                    "predictiveanalytics",
                    "explainableai",
                    "forecasting",
                    "python",
                    "ai",
                ],
                type: "data",
                year: "future",
                complexity: "complex",
                features: [
                    "Predictive Analytics",
                    "Explainable AI (XAI)",
                    "Advanced forecasting methods",
                    "Accessible data analysis",
                ],
                links: [],
                metrics: { stars: 0, forks: 0, watchers: 0 },
            },
            {
                id: "project34",
                title: "DataNexus",
                description: "Intelligent data integration platform",
                fullDescription:
                    "A comprehensive data integration and transformation platform designed to unify disparate data sources into coherent, analysis-ready datasets. DataNexus handles structured and unstructured data, automatically detecting relationships and suggesting optimal schema designs.",
                image: "images/projects/datanexus.jpg",
                category: "data",
                techs: [
                    "dataintegration",
                    "etl",
                    "schemadesign",
                    "python",
                    "sql",
                ],
                type: "data",
                year: "future",
                complexity: "complex",
                features: [
                    "Data Integration and Transformation (ETL)",
                    "Automated schema design",
                    "Handles structured and unstructured data",
                    "Analysis-ready datasets",
                ],
                links: [],
                metrics: { stars: 0, forks: 0, watchers: 0 },
            },
            {
                id: "project35",
                title: "TrustChain",
                description:
                    "Blockchain-based supply chain verification platform",
                fullDescription:
                    "A next-generation blockchain protocol designed for enterprise supply chain verification and transparency. TrustChain provides tamper-proof documentation of product origins, manufacturing processes, and distribution while maintaining selective privacy for sensitive business information.",
                image: "images/projects/blogchai.jpg",
                category: "blockchain",
                techs: ["blockchain", "supplychain", "enterprise", "solidity"],
                type: "blockchain",
                year: "future",
                complexity: "complex",
                features: [
                    "Blockchain for Supply Chain",
                    "Enterprise-grade verification",
                    "Tamper-proof documentation",
                    "Solidity smart contracts",
                ],
                links: [],
                metrics: { stars: 0, forks: 0, watchers: 0 },
            },
            {
                id: "project36",
                title: "DecentralFinance",
                description:
                    "Advanced DeFi platform with cross-chain capabilities",
                fullDescription:
                    "An innovative decentralized finance platform that enables cross-chain asset transfers, automated portfolio management, and programmable financial instruments. The platform is designed to be accessible to non-technical users while providing advanced functionality for institutional investors.",
                image: "images/projects/dcfina.jpg",
                category: "blockchain",
                techs: [
                    "defi",
                    "crosschain",
                    "smartcontracts",
                    "solidity",
                    "blockchain",
                ],
                type: "blockchain",
                year: "future",
                complexity: "complex",
                features: [
                    "Decentralized Finance (DeFi)",
                    "Cross-chain asset transfers",
                    "Automated portfolio management",
                    "Programmable financial instruments",
                ],
                links: [],
                metrics: { stars: 0, forks: 0, watchers: 0 },
            },
            {
                id: "project37",
                title: "QuantumRealm",
                description: "VR game exploring quantum physics principles",
                fullDescription:
                    "A groundbreaking VR game that simulates quantum physics phenomena in an engaging narrative adventure. Players navigate microscopic worlds where quantum mechanics govern gameplay, solving puzzles that require understanding principles like superposition and entanglement.",
                image: "images/projects/quantum.jpg",
                category: "game",
                techs: [
                    "vr",
                    "physicssimulation",
                    "educational",
                    "unity",
                    "csharp",
                    "game",
                ],
                type: "game",
                year: "future",
                complexity: "complex",
                features: [
                    "Virtual Reality (VR) Game",
                    "Quantum Physics Simulation",
                    "Educational narrative adventure",
                    "Unity and C# development",
                ],
                links: [],
                metrics: { stars: 0, forks: 0, watchers: 0 },
            },
            {
                id: "project38",
                title: "EcoSphere",
                description: "Immersive ecological simulation game",
                fullDescription:
                    "An immersive ecological simulation game where players manage entire ecosystems with realistic biodiversity, climate, and resource dynamics. Player decisions have complex cascading effects throughout the environment, creating a deeply engaging system that reflects real-world ecological principles.",
                image: "images/projects/ecospe.jpg",
                category: "game",
                techs: [
                    "simulation",
                    "ecosystem",
                    "aibehavior",
                    "unity",
                    "csharp",
                    "game",
                ],
                type: "game",
                year: "future",
                complexity: "complex",
                features: [
                    "Ecological Simulation Game",
                    "Realistic ecosystem dynamics",
                    "AI-driven behavior",
                    "Unity game engine",
                ],
                links: [],
                metrics: { stars: 0, forks: 0, watchers: 0 },
            },
            {
                id: "project39",
                title: "DevForge",
                description: "AI-powered developer productivity suite",
                fullDescription:
                    "A comprehensive developer productivity suite that combines AI-assisted coding, automated testing, and intelligent project management. DevForge analyzes codebases to detect patterns, suggest improvements, and automate repetitive tasks while maintaining code quality.",
                image: "images/projects/devforge.jpg",
                category: "tools",
                techs: [
                    "developertools",
                    "aiassisted",
                    "automation",
                    "python",
                    "javascript",
                ],
                type: "tools",
                year: "future",
                complexity: "complex",
                features: [
                    "Developer Productivity Tools",
                    "AI-Assisted Coding",
                    "Automated testing and deployment",
                    "Intelligent project management",
                ],
                links: [],
                metrics: { stars: 0, forks: 0, watchers: 0 },
            },
            {
                id: "project40",
                title: "SecurityVault",
                description: "Comprehensive cybersecurity assessment toolkit",
                fullDescription:
                    "An advanced cybersecurity toolset for comprehensive security assessment and monitoring. SecurityVault combines penetration testing, vulnerability scanning, and real-time threat detection in a unified platform with intelligent risk prioritization and remediation suggestions.",
                image: "images/projects/securityvault.jpg",
                category: "tools",
                techs: [
                    "cybersecurity",
                    "penetrationtesting",
                    "threatdetection",
                    "python",
                    "bash",
                ],
                type: "tools",
                year: "future",
                complexity: "complex",
                features: [
                    "Cybersecurity Assessment",
                    "Penetration Testing tools",
                    "Real-time Threat Detection",
                    "Vulnerability scanning",
                ],
                links: [],
                metrics: { stars: 0, forks: 0, watchers: 0 },
            },
        ];
        projectsGrid.innerHTML = "";
        projectsList.innerHTML = "";
        projects.forEach((project) => {
            const gridCard = document.createElement("div");
            gridCard.className = "project-card quantum-card";
            gridCard.setAttribute("data-category", project.category);
            gridCard.setAttribute("data-techs", project.techs.join(","));
            gridCard.setAttribute("data-type", project.type);
            gridCard.setAttribute("data-year", project.year);
            gridCard.setAttribute("data-complexity", project.complexity);
            gridCard.setAttribute("data-aos", "fade-up");
            gridCard.setAttribute("data-project-id", project.id);
            gridCard.innerHTML = `
                <div class="card-image">
                    <img src="${project.image}" alt="${
                project.title
            }" loading="lazy" />
                    <div class="card-overlay">
                        <div class="card-tags">
                            ${project.techs
                                .slice(0, 3)
                                .map(
                                    (tech) =>
                                        `<span class="tech-tag">${tech}</span>`
                                )
                                .join("")}
                        </div>
                        <div class="card-quick-actions">
                            <button class="quick-action-btn view-details-btn" data-project-id="${
                                project.id
                            }">
                                <i class="fas fa-info-circle"></i>
                            </button>
                            ${project.links
                                .map(
                                    (link) => `
                                <a href="${
                                    link.url
                                }" target="_blank" class="quick-action-btn">
                                    <i class="fas ${
                                        link.type === "github"
                                            ? "fa-github"
                                            : "fa-external-link-alt"
                                    }"></i>
                                </a>
                            `
                                )
                                .join("")}
                        </div>
                    </div>
                    <div class="card-glow"></div>
                </div>
                <div class="card-content">
                    <h3 class="card-title">${project.title}</h3>
                    <p class="card-description">${project.description}</p>
                    <div class="card-meta">
                        <span class="meta-item"><i class="far fa-calendar-alt"></i> ${
                            project.year
                        }</span>
                        <span class="meta-item"><i class="fas fa-tag"></i> ${
                            project.type
                        }</span>
                    </div>
                    <div class="card-progress">
                        <div class="progress-bar">
                            <div class="progress-fill" style="width: 100%"></div>
                        </div>
                        <span class="progress-text">Completed</span>
                    </div>
                </div>
                <div class="card-shine"></div>
            `;
            projectsGrid.appendChild(gridCard);
            const listItem = document.createElement("div");
            listItem.className = "list-item";
            listItem.setAttribute("data-category", project.category);
            listItem.setAttribute("data-techs", project.techs.join(","));
            listItem.setAttribute("data-type", project.type);
            listItem.setAttribute("data-year", project.year);
            listItem.setAttribute("data-complexity", project.complexity);
            listItem.setAttribute("data-project-id", project.id);
            listItem.innerHTML = `
                <div class="list-item-image">
                    <img src="${project.image}" alt="${
                project.title
            }" loading="lazy" />
                </div>
                <div class="list-item-content">
                    <h3>${project.title}</h3>
                    <p>${project.description}</p>
                    <div class="list-item-tags">
                        ${project.techs
                            .slice(0, 5)
                            .map(
                                (tech) =>
                                    `<span class="list-tag">${tech}</span>`
                            )
                            .join("")}
                    </div>
                    <div class="list-item-meta">
                        <span class="list-meta-item"><i class="far fa-calendar-alt"></i> ${
                            project.year
                        }</span>
                        <span class="list-meta-item"><i class="fas fa-tag"></i> ${
                            project.type
                        }</span>
                        <span class="list-meta-item"><i class="fas fa-code-branch"></i> ${
                            project.metrics.forks
                        }</span>
                        <span class="list-meta-item"><i class="fas fa-star"></i> ${
                            project.metrics.stars
                        }</span>
                    </div>
                </div>
                <div class="list-item-actions">
                    <button class="list-action-btn view-details-btn" data-project-id="${
                        project.id
                    }">
                        <i class="fas fa-info-circle"></i>
                    </button>
                    ${project.links
                        .map(
                            (link) => `
                        <a href="${
                            link.url
                        }" target="_blank" class="list-action-btn">
                            <i class="fas ${
                                link.type === "github"
                                    ? "fa-github"
                                    : "fa-external-link-alt"
                            }"></i>
                        </a>
                    `
                        )
                        .join("")}
                </div>
            `;
            projectsList.appendChild(listItem);
        });
        this.setupCarouselView(projects);
    },
    setupViewToggle: function () {
        const viewButtons = document.querySelectorAll(".view-btn");
        const gridView = document.querySelector(".projects-grid-view");
        const listView = document.querySelector(".projects-list-view");
        const carouselView = document.querySelector(".projects-carousel-view");
        const timelineView = document.querySelector(".projects-timeline-view");
        viewButtons.forEach((btn) => {
            btn.addEventListener("click", () => {
                viewButtons.forEach((b) => b.classList.remove("active"));
                btn.classList.add("active");
                gridView.style.display = "none";
                listView.style.display = "none";
                carouselView.style.display = "none";
                if (timelineView) timelineView.style.display = "none";
                const viewType = btn.getAttribute("data-view");
                if (viewType === "grid") {
                    gridView.style.display = "block";
                } else if (viewType === "list") {
                    listView.style.display = "block";
                } else if (viewType === "carousel") {
                    carouselView.style.display = "block";
                } else if (viewType === "timeline" && timelineView) {
                    timelineView.style.display = "block";
                } else if (viewType === "3d") {
                    this.show3DView();
                }
            });
        });
    },
    setupFilterFunctionality: function () {
        const filterButtons = document.querySelectorAll(".project-filter");
        const searchInput = document.getElementById("project-search");
        const clearSearch = document.querySelector(".search-clear");
        const techFilter = document.getElementById("tech-filter");
        const typeFilter = document.getElementById("type-filter");
        const yearFilter = document.getElementById("year-filter");
        const complexityFilter = document.getElementById("complexity-filter");
        const resetFilters = document.querySelector(".reset-filters");
        const resultsCount = document.querySelector(".results-count");
        const noResultsMessage = document.querySelector(".no-results-message");
        const sortSelect = document.getElementById("sort-projects");
        const toggleFiltersBtn = document.querySelector(".toggle-filters-btn");
        const filterControls = document.querySelector(".filter-controls");
        const filterProjects = () => {
            const projects = document.querySelectorAll(
                ".project-card, .list-item"
            );
            const searchTerm = searchInput.value.toLowerCase();
            const selectedTech = techFilter.value;
            const selectedType = typeFilter.value;
            const selectedYear = yearFilter.value;
            const selectedComplexity = complexityFilter.value;
            let visibleCount = 0;
            projects.forEach((project) => {
                const title = project
                    .querySelector("h3")
                    .textContent.toLowerCase();
                const description = project
                    .querySelector("p")
                    .textContent.toLowerCase();
                const techs = project.getAttribute("data-techs").toLowerCase();
                const type = project.getAttribute("data-type").toLowerCase();
                const year = project.getAttribute("data-year");
                const complexity = project.getAttribute("data-complexity");
                const category = project.getAttribute("data-category");
                const matchesSearch =
                    title.includes(searchTerm) ||
                    description.includes(searchTerm);
                const matchesTech =
                    selectedTech === "all" || techs.includes(selectedTech);
                const matchesType =
                    selectedType === "all" || type === selectedType;
                const matchesYear =
                    selectedYear === "all" || year === selectedYear;
                const matchesComplexity =
                    selectedComplexity === "all" ||
                    complexity === selectedComplexity;
                const matchesCategory =
                    document
                        .querySelector(".project-filter.active")
                        .getAttribute("data-filter") === "all" ||
                    category ===
                        document
                            .querySelector(".project-filter.active")
                            .getAttribute("data-filter");
                if (
                    matchesSearch &&
                    matchesTech &&
                    matchesType &&
                    matchesYear &&
                    matchesComplexity &&
                    matchesCategory
                ) {
                    project.style.display = "";
                    visibleCount++;
                } else {
                    project.style.display = "none";
                }
            });
            const halfCount = Math.ceil(visibleCount / 2);
            resultsCount.textContent = `${halfCount} project${
                halfCount !== 1 ? "s" : ""
            } found`;
            noResultsMessage.style.display =
                visibleCount === 0 ? "block" : "none";
            this.updateCarouselWithVisible();
            return visibleCount;
        };
        filterButtons.forEach((btn) => {
            btn.addEventListener("click", () => {
                filterButtons.forEach((b) => b.classList.remove("active"));
                btn.classList.add("active");
                filterProjects();
            });
        });
        searchInput.addEventListener("input", filterProjects);
        clearSearch.addEventListener("click", () => {
            searchInput.value = "";
            filterProjects();
            searchInput.focus();
        });
        [techFilter, typeFilter, yearFilter, complexityFilter].forEach(
            (filter) => {
                filter.addEventListener("change", filterProjects);
            }
        );
        resetFilters.addEventListener("click", () => {
            searchInput.value = "";
            techFilter.value = "all";
            typeFilter.value = "all";
            yearFilter.value = "all";
            complexityFilter.value = "all";
            sortSelect.value = "newest";
            const allFilterBtn = document.querySelector(
                '.project-filter[data-filter="all"]'
            );
            filterButtons.forEach((btn) => btn.classList.remove("active"));
            allFilterBtn.classList.add("active");
            filterProjects();
            this.sortProjects("newest");
        });
        sortSelect.addEventListener("change", () => {
            this.sortProjects(sortSelect.value);
        });
        toggleFiltersBtn.addEventListener("click", () => {
            const isExpanded = filterControls.classList.contains("expanded");
            if (isExpanded) {
                filterControls.classList.remove("expanded");
                filterControls.style.height = "0";
                toggleFiltersBtn.innerHTML =
                    '<i class="fas fa-chevron-down"></i>';
            } else {
                filterControls.classList.add("expanded");
                filterControls.style.height =
                    filterControls.scrollHeight + "px";
                toggleFiltersBtn.innerHTML =
                    '<i class="fas fa-chevron-up"></i>';
            }
        });
        filterProjects();
    },
    setupCarouselView: function (projects) {
        if (!projects) {
            const projectCards = document.querySelectorAll(".project-card");
            projects = Array.from(projectCards).map((card) => {
                return {
                    id: card.getAttribute("data-project-id"),
                    title: card.querySelector(".card-title").textContent,
                    description: card.querySelector(".card-description")
                        .textContent,
                    image: card.querySelector(".card-image img").src,
                    links: Array.from(
                        card.querySelectorAll(".quick-action-btn")
                    ).map((btn) => {
                        if (btn.tagName === "A") {
                            return {
                                type: btn
                                    .querySelector("i")
                                    .classList.contains("fa-github")
                                    ? "github"
                                    : "live",
                                url: btn.href,
                                icon: btn.innerHTML,
                            };
                        } else {
                            return {
                                type: "details",
                                isDetails: true,
                                detailsTitle: "",
                                detailsDesc: "",
                                icon: btn.innerHTML,
                            };
                        }
                    }),
                };
            });
        }
        const carouselView = document.querySelector(".projects-carousel-view");
        const carouselTrack = carouselView.querySelector(".carousel-track");
        const carouselIndicators = carouselView.querySelector(
            ".carousel-indicators"
        );
        carouselTrack.innerHTML = "";
        carouselIndicators.innerHTML = "";
        projects.forEach((project, index) => {
            const carouselItem = document.createElement("div");
            carouselItem.className = "carousel-item";
            carouselItem.setAttribute("data-project-id", project.id);
            carouselItem.innerHTML = `
                <div class="carousel-item-inner quantum-glass">
                    <div class="carousel-image">
                        <img src="${project.image}" alt="${
                project.title
            }" loading="lazy">
                        <div class="image-shine"></div>
                    </div>
                    <div class="carousel-content">
                        <h3>${project.title}</h3>
                        <p>${project.description}</p>
                        <div class="carousel-actions">
                            <button class="carousel-action-btn view-details-btn" data-project-id="${
                                project.id
                            }">
                                <i class="fas fa-info-circle"></i>
                                <span>Details</span>
                            </button>
                            ${project.links
                                .filter((link) => link.type !== "details")
                                .map(
                                    (link) => `
                                <a href="${
                                    link.url
                                }" target="_blank" class="carousel-action-btn">
                                    <i class="fas ${
                                        link.type === "github"
                                            ? "fa-github"
                                            : "fa-external-link-alt"
                                    }"></i>
                                    <span>${
                                        link.type === "github" ? "Code" : "Demo"
                                    }</span>
                                </a>
                            `
                                )
                                .join("")}
                        </div>
                    </div>
                </div>
            `;
            carouselTrack.appendChild(carouselItem);
            const indicator = document.createElement("button");
            indicator.className = "carousel-indicator";
            indicator.setAttribute("data-index", index);
            if (index === 0) indicator.classList.add("active");
            carouselIndicators.appendChild(indicator);
        });
        this.setupCarouselControls();
    },
    setupCarouselControls: function () {
        const carouselTrack = document.querySelector(".carousel-track");
        const indicators = document.querySelectorAll(".carousel-indicator");
        const prevBtn = document.querySelector(".prev-arrow");
        const nextBtn = document.querySelector(".next-arrow");
        let currentIndex = 0;
        const updateCarousel = () => {
            carouselTrack.style.transform = `translateX(-${
                currentIndex * 100
            }%)`;
            indicators.forEach((indicator, index) => {
                indicator.classList.toggle("active", index === currentIndex);
            });
            prevBtn.disabled = currentIndex === 0;
            nextBtn.disabled = currentIndex === indicators.length - 1;
        };
        prevBtn.addEventListener("click", () => {
            if (currentIndex > 0) {
                currentIndex--;
                updateCarousel();
            }
        });
        nextBtn.addEventListener("click", () => {
            if (currentIndex < indicators.length - 1) {
                currentIndex++;
                updateCarousel();
            }
        });
        indicators.forEach((indicator, index) => {
            indicator.addEventListener("click", () => {
                currentIndex = index;
                updateCarousel();
            });
        });
        document.addEventListener("keydown", (e) => {
            if (
                document.querySelector(".projects-carousel-view").style
                    .display !== "none"
            ) {
                if (e.key === "ArrowLeft" && currentIndex > 0) {
                    currentIndex--;
                    updateCarousel();
                } else if (
                    e.key === "ArrowRight" &&
                    currentIndex < indicators.length - 1
                ) {
                    currentIndex++;
                    updateCarousel();
                }
            }
        });
        let touchStartX = 0;
        let touchEndX = 0;
        carouselTrack.addEventListener("touchstart", (e) => {
            touchStartX = e.changedTouches[0].screenX;
        });
        carouselTrack.addEventListener("touchend", (e) => {
            touchEndX = e.changedTouches[0].screenX;
            handleSwipe();
        });
        function handleSwipe() {
            const threshold = 50; 
            if (
                touchEndX < touchStartX - threshold &&
                currentIndex < indicators.length - 1
            ) {
                currentIndex++;
                updateCarousel();
            }
            if (touchEndX > touchStartX + threshold && currentIndex > 0) {
                currentIndex--;
                updateCarousel();
            }
        }
        updateCarousel();
    },
    updateCarouselWithVisible: function () {
        const visibleCards = Array.from(
            document.querySelectorAll(".project-card")
        ).filter((card) => card.style.display !== "none");
        this.setupCarouselView(
            visibleCards.map((card) => {
                return {
                    id: card.getAttribute("data-project-id"),
                    title: card.querySelector(".card-title").textContent,
                    description: card.querySelector(".card-description")
                        .textContent,
                    image: card.querySelector(".card-image img").src,
                    links: Array.from(
                        card.querySelectorAll(".quick-action-btn, a")
                    ).map((btn) => {
                        if (btn.tagName === "A") {
                            return {
                                type: btn
                                    .querySelector("i")
                                    .classList.contains("fa-github")
                                    ? "github"
                                    : "live",
                                url: btn.href,
                                icon: btn.innerHTML,
                            };
                        } else {
                            return {
                                type: "details",
                                isDetails: true,
                                detailsTitle: "",
                                detailsDesc: "",
                                icon: btn.innerHTML,
                            };
                        }
                    }),
                };
            })
        );
    },
    sortProjects: function (sortBy) {
        const projectsGrid = document.querySelector(".projects-grid");
        const projectsList = document.querySelector(".projects-list");
        const projects = Array.from(document.querySelectorAll(".project-card"));
        const listItems = Array.from(document.querySelectorAll(".list-item"));
        const sortProjects = (items) => {
            return items.sort((a, b) => {
                const titleA = a.querySelector("h3").textContent;
                const titleB = b.querySelector("h3").textContent;
                const yearA = a.getAttribute("data-year");
                const yearB = b.getAttribute("data-year");
                const complexityA = a.getAttribute("data-complexity");
                const complexityB = b.getAttribute("data-complexity");
                const complexityRank = { simple: 1, moderate: 2, complex: 3 };
                switch (sortBy) {
                    case "newest":
                        return yearB - yearA;
                    case "oldest":
                        return yearA - yearB;
                    case "az":
                        return titleA.localeCompare(titleB);
                    case "za":
                        return titleB.localeCompare(titleA);
                    case "complexity":
                        return (
                            complexityRank[complexityB] -
                            complexityRank[complexityA]
                        );
                    default:
                        return 0;
                }
            });
        };
        const sortedProjects = sortProjects(projects);
        const sortedListItems = sortProjects(listItems);
        projectsGrid.innerHTML = "";
        sortedProjects.forEach((project) => projectsGrid.appendChild(project));
        projectsList.innerHTML = "";
        sortedListItems.forEach((item) => projectsList.appendChild(item));
        this.updateCarouselWithVisible();
    },
    setupProjectModals: function () {
        const projectModal = document.querySelector(".project-modal1");
        const closeModalBtn = document.querySelector(".close-modal-btn");
        const modalTitle = document.querySelector("#modal-title");
        const modalDescription = document.querySelector(".modal-description");
        const modalFeatures = document.querySelector(".features-list");
        const modalTechBadges = document.querySelector(".tech-badges");
        const modalMainImage = document.querySelector(".modal-main-image");
        const modalGithubLink = document.querySelector(".github-link");
        const modalLiveLink = document.querySelector(".live-link");
        const modalBadges = document.querySelector(".modal-badges");
        const repoForks = document.querySelector(".repo-forks");
        const repoStars = document.querySelector(".repo-stars");
        const repoWatchers = document.querySelector(".repo-watchers");
        const openProjectModal = (projectId) => {
            const projectCard = document.querySelector(
                `.project-card[data-project-id="${projectId}"]`
            );
            if (!projectCard) return;
            const title = projectCard.querySelector(".card-title").textContent;
            const description = projectCard.querySelector(".card-description")
                .textContent;
            const image = projectCard.querySelector(".card-image img").src;
            const techs = projectCard.getAttribute("data-techs").split(",");
            const type = projectCard.getAttribute("data-type");
            const year = projectCard.getAttribute("data-year");
            modalTitle.textContent = title;
            modalDescription.innerHTML = `<p>${description}</p>`;
            modalFeatures.innerHTML = `
                <li><i class="fas fa-check"></i> Responsive design</li>
                <li><i class="fas fa-check"></i> User authentication</li>
                <li><i class="fas fa-check"></i> Data visualization</li>
                <li><i class="fas fa-check"></i> API integration</li>
                <li><i class="fas fa-check"></i> Performance optimization</li>
            `;
            modalTechBadges.innerHTML = techs
                .map(
                    (tech) => `
                <span class="tech-badge">${tech}</span>
            `
                )
                .join("");
            modalMainImage.innerHTML = `<img src="${image}" alt="${title}" />`;
            const githubLink = projectCard.querySelector('a[href*="github"]');
            const liveLink = projectCard.querySelector(
                'a:not([href*="github"])'
            );
            if (githubLink) {
                modalGithubLink.href = githubLink.href;
                modalGithubLink.style.display = "flex";
            } else {
                modalGithubLink.style.display = "none";
            }
            if (liveLink) {
                modalLiveLink.href = liveLink.href;
                modalLiveLink.style.display = "flex";
            } else {
                modalLiveLink.style.display = "none";
            }
            modalBadges.innerHTML = `
                <span class="modal-badge type-badge">${type}</span>
                <span class="modal-badge year-badge">${year}</span>
            `;
            repoForks.textContent = "12";
            repoStars.textContent = "36";
            repoWatchers.textContent = "18";
            projectModal.style.display = "flex";
            document.body.style.overflow = "hidden"; 
            projectModal.classList.add("modal-open");
        };
        const closeModal = () => {
            projectModal.classList.add("modal-closing");
            setTimeout(() => {
                projectModal.style.display = "none";
                document.body.style.overflow = "";
                projectModal.classList.remove("modal-open", "modal-closing");
            }, 300);
        };
        closeModalBtn.addEventListener("click", closeModal);
        projectModal.addEventListener("click", (e) => {
            if (e.target === projectModal) {
                closeModal();
            }
        });
        document.addEventListener("keydown", (e) => {
            if (e.key === "Escape" && projectModal.style.display === "flex") {
                closeModal();
            }
        });
        document.addEventListener("click", (e) => {
            if (e.target.closest(".view-details-btn")) {
                const btn = e.target.closest(".view-details-btn");
                const projectId = btn.getAttribute("data-project-id");
                openProjectModal(projectId);
            }
        });
    },
    setupShareFunctionality: function () {
        const shareModal = document.querySelector(".share-modal");
        const closeShareBtn = document.querySelector(".close-share-btn");
        const shareOptions = document.querySelectorAll(".share-option");
        const shareLink = document.querySelector(".share-link");
        const copyLinkBtn = document.querySelector(".copy-link-btn");
        const shareProjectImage = document.querySelector(
            ".share-project-image"
        );
        const shareProjectTitle = document.querySelector(
            ".share-project-title"
        );
        const qrContainer = document.querySelector(".qr-container");
        const downloadQrBtn = document.querySelector(".download-qr-btn");
        const shareProject = (projectId) => {
            const projectCard = document.querySelector(
                `.project-card[data-project-id="${projectId}"]`
            );
            if (!projectCard) return;
            const title = projectCard.querySelector(".card-title").textContent;
            const image = projectCard.querySelector(".card-image img").src;
            const shareUrl =
                window.location.href.split("#")[0] + "#projects-" + projectId;
            shareProjectImage.innerHTML = `<img src="${image}" alt="${title}" />`;
            shareProjectTitle.textContent = title;
            shareLink.value = shareUrl;
            qrContainer.innerHTML = `
                <div class="qr-placeholder">
                    <i class="fas fa-qrcode"></i>
                    <span>QR Code for this project</span>
                </div>
            `;
            shareModal.style.display = "flex";
            document.body.style.overflow = "hidden";
        };
        const closeShareModal = () => {
            shareModal.style.display = "none";
            document.body.style.overflow = "";
        };
        closeShareBtn.addEventListener("click", closeShareModal);
        shareModal.addEventListener("click", (e) => {
            if (e.target === shareModal) {
                closeShareModal();
            }
        });
        shareOptions.forEach((option) => {
            option.addEventListener("click", () => {
                const platform = option.getAttribute("data-platform");
                const url = shareLink.value;
                const title = shareProjectTitle.textContent;
                switch (platform) {
                    case "twitter":
                        window.open(
                            `https:
                                url
                            )}&text=${encodeURIComponent(
                                "Check out this amazing project: " + title
                            )}`,
                            "_blank"
                        );
                        break;
                    case "linkedin":
                        window.open(
                            `https:
                                url
                            )}`,
                            "_blank"
                        );
                        break;
                    case "facebook":
                        window.open(
                            `https:
                                url
                            )}`,
                            "_blank"
                        );
                        break;
                    case "email":
                        window.location.href = `mailto:?subject=${encodeURIComponent(
                            "Check out this project: " + title
                        )}&body=${encodeURIComponent(
                            "I thought you might be interested in this project: " +
                                title +
                                "\n\n" +
                                url
                        )}`;
                        break;
                }
            });
        });
        copyLinkBtn.addEventListener("click", () => {
            shareLink.select();
            document.execCommand("copy");
            const originalText = copyLinkBtn.innerHTML;
            copyLinkBtn.innerHTML =
                '<i class="fas fa-check"></i><span>Copied!</span>';
            setTimeout(() => {
                copyLinkBtn.innerHTML = originalText;
            }, 2000);
        });
        downloadQrBtn.addEventListener("click", () => {
            alert("QR Code download functionality would be implemented here.");
        });
        document.addEventListener("click", (e) => {
            if (e.target.closest(".share-btn")) {
                const projectCard = e.target.closest(".project-modal1-content");
                const projectId = projectCard.querySelector(
                    ".modal-main-image img"
                ).alt;
                shareProject(projectId);
            }
        });
    },
    setupTimelineView: function () {
        const timelineView = document.querySelector(".projects-timeline-view");
        const timelineItems = timelineView.querySelector(".timeline-items");
        const projectCards = document.querySelectorAll(".project-card");
        const projectsByYear = {};
        projectCards.forEach((card) => {
            const year = card.getAttribute("data-year");
            if (!projectsByYear[year]) {
                projectsByYear[year] = [];
            }
            projectsByYear[year].push({
                id: card.getAttribute("data-project-id"),
                title: card.querySelector(".card-title").textContent,
                description: card.querySelector(".card-description")
                    .textContent,
                image: card.querySelector(".card-image img").src,
                type: card.getAttribute("data-type"),
            });
        });
        const sortedYears = Object.keys(projectsByYear).sort((a, b) => b - a);
        timelineItems.innerHTML = "";
        sortedYears.forEach((year) => {
            const yearItem = document.createElement("div");
            yearItem.className = "timeline-year";
            yearItem.innerHTML = `
                <div class="year-marker">
                    <div class="year-circle"></div>
                    <div class="year-label">${year}</div>
                </div>
                <div class="year-projects">
                    ${projectsByYear[year]
                        .map(
                            (project) => `
                        <div class="timeline-project quantum-card" data-project-id="${project.id}">
                            <div class="timeline-project-image">
                                <img src="${project.image}" alt="${project.title}" loading="lazy" />
                            </div>
                            <div class="timeline-project-content">
                                <h4>${project.title}</h4>
                                <p>${project.description}</p>
                                <span class="timeline-project-type">${project.type}</span>
                                <button class="timeline-project-details view-details-btn" data-project-id="${project.id}">
                                    View Details
                                </button>
                            </div>
                        </div>
                    `
                        )
                        .join("")}
                </div>
            `;
            timelineItems.appendChild(yearItem);
        });
    },
    initializeParticles: function () {
        const particlesContainer = document.querySelector(".bg-particles");
        if (!particlesContainer) return;
        const particleCount = 30;
        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement("div");
            particle.className = "floating-particle";
            const size = Math.random() * 3 + 1;
            particle.style.width = size + "px";
            particle.style.height = size + "px";
            particle.style.left = Math.random() * 100 + "%";
            particle.style.top = Math.random() * 100 + "%";
            particle.style.animationDelay = Math.random() * 5 + "s";
            particle.style.animationDuration = Math.random() * 10 + 10 + "s";
            particlesContainer.appendChild(particle);
        }
    },
    show3DView: function () {
        console.log("Showing 3D view");
        let threeDView = document.getElementById("projects-3d-view");
        if (!threeDView) {
            this.init3DShowcase();
            threeDView = document.getElementById("projects-3d-view");
        }
        if (!threeDView) {
            console.error("3D view container could not be created");
            return;
        }
        document
            .querySelectorAll(
                ".projects-grid-view, .projects-list-view, .projects-carousel-view, .projects-timeline-view"
            )
            .forEach((view) => (view.style.display = "none"));
        threeDView.style.display = "block";
        setTimeout(() => {
            threeDView.scrollIntoView({ behavior: "smooth", block: "center" });
        }, 200);
        this.init3DViewer();
    },
    init3DShowcase: function () {
        if (!document.getElementById("projects-3d-view")) {
            const projectsSection = document.getElementById("projects");
            const threeDView = document.createElement("div");
            threeDView.id = "projects-3d-view";
            threeDView.className = "projects-3d-scene";
            threeDView.style.display = "none"; 
            const loadingHTML = `
                <div class="projects-3d-loading">
                    <div class="loading-spinner"></div>
                    <div class="loading-status">Initializing 3D view...</div>
                    <div class="progress-container">
                        <div class="progress-bar" style="width: 10%;"></div>
                    </div>
                </div>
                <div class="futuristic-scanline"></div>
                <div class="futuristic-grid-overlay"></div>
                <div class="project-stats-overlay">
                    <div class="stat-metric">
                        <div class="stat-value" id="projects-count">0</div>
                        <div class="stat-label">Projects</div>
                    </div>
                    <div class="stat-metric">
                        <div class="stat-value" id="fps-counter">60</div>
                        <div class="stat-label">FPS</div>
                    </div>
                    <div class="stat-metric">
                        <div class="stat-value" id="render-quality">High</div>
                        <div class="stat-label">Quality</div>
                    </div>
                </div>
            `;
            threeDView.innerHTML = loadingHTML;
            const decoration1 = document.createElement("div");
            decoration1.className = "quantum-decoration";
            decoration1.style.width = "300px";
            decoration1.style.height = "300px";
            decoration1.style.top = "50%";
            decoration1.style.left = "20%";
            decoration1.style.transform = "translate(-50%, -50%)";
            threeDView.appendChild(decoration1);
            const decoration2 = document.createElement("div");
            decoration2.className = "quantum-decoration";
            decoration2.style.width = "200px";
            decoration2.style.height = "200px";
            decoration2.style.top = "30%";
            decoration2.style.right = "15%";
            decoration2.style.transform = "translate(50%, -50%)";
            threeDView.appendChild(decoration2);
            projectsSection.appendChild(threeDView);
        }
        const viewButtons = document.querySelectorAll(".control-btn");
        viewButtons.forEach((btn) => {
            btn.addEventListener("click", () => {
                const viewType = btn.getAttribute("data-view");
                viewButtons.forEach((b) => b.classList.remove("active"));
                btn.classList.add("active");
                if (window.supremeProjectViewer) {
                    window.supremeProjectViewer.setView(viewType);
                }
            });
        });
        const actionButtons = document.querySelectorAll(".scene-action-btn");
        actionButtons.forEach((btn) => {
            btn.addEventListener("click", () => {
                const action = btn.getAttribute("data-action");
                if (window.supremeProjectViewer) {
                    switch (action) {
                        case "screenshot":
                            this.takeScreenshot();
                            break;
                        case "fullscreen":
                            this.toggleFullscreen();
                            break;
                        case "reset":
                            window.supremeProjectViewer.resetView();
                            break;
                    }
                }
            });
        });
    },
    takeScreenshot: function () {
        if (
            !window.supremeProjectViewer ||
            !window.supremeProjectViewer.renderer
        )
            return;
        const overlay = document.createElement("div");
        overlay.className = "screenshot-overlay";
        overlay.style.position = "absolute";
        overlay.style.top = "0";
        overlay.style.left = "0";
        overlay.style.width = "100%";
        overlay.style.height = "100%";
        overlay.style.backgroundColor = "white";
        overlay.style.opacity = "0";
        overlay.style.transition = "opacity 0.1s ease-in-out";
        overlay.style.pointerEvents = "none";
        overlay.style.zIndex = "9999";
        const container = document.getElementById("projects-3d-view");
        container.appendChild(overlay);
        setTimeout(() => {
            overlay.style.opacity = "0.8";
            const renderer = window.supremeProjectViewer.renderer;
            setTimeout(() => {
                try {
                    const link = document.createElement("a");
                    link.download =
                        "legendary-projects-3d-" + Date.now() + ".png";
                    link.href = renderer.domElement
                        .toDataURL("image/png")
                        .replace("image/png", "image/octet-stream");
                    link.click();
                    this.showNotification("Screenshot captured!", "success");
                } catch (e) {
                    console.error("Failed to capture screenshot:", e);
                    this.showNotification(
                        "Failed to capture screenshot",
                        "error"
                    );
                }
                overlay.style.opacity = "0";
                setTimeout(() => overlay.remove(), 300);
            }, 100);
        }, 10);
    },
    toggleFullscreen: function () {
        const container = document.getElementById("projects-3d-view");
        if (!container) return;
        const button = document.querySelector(
            '.scene-action-btn[data-action="fullscreen"] i'
        );
        if (!document.fullscreenElement) {
            if (container.requestFullscreen) {
                container.requestFullscreen();
            } else if (container.webkitRequestFullscreen) {
                container.webkitRequestFullscreen();
            } else if (container.msRequestFullscreen) {
                container.msRequestFullscreen();
            }
            if (button) {
                button.className = "fas fa-compress";
            }
            this.showNotification("Entered fullscreen mode", "info");
        } else {
            if (document.exitFullscreen) {
                document.exitFullscreen();
            } else if (document.webkitExitFullscreen) {
                document.webkitExitFullscreen();
            } else if (document.msExitFullscreen) {
                document.msExitFullscreen();
            }
            if (button) {
                button.className = "fas fa-expand";
            }
        }
        document.addEventListener("fullscreenchange", () => {
            if (!document.fullscreenElement && button) {
                button.className = "fas fa-expand";
            }
        });
    },
    showNotification: function (message, type = "info") {
        const notification = document.createElement("div");
        notification.className = `projects-notification ${type}`;
        notification.innerHTML = `
            <div class="notification-icon">
                <i class="fas ${
                    type === "success"
                        ? "fa-check-circle"
                        : type === "error"
                        ? "fa-exclamation-circle"
                        : "fa-info-circle"
                }"></i>
            </div>
            <div class="notification-message">${message}</div>
        `;
        Object.assign(notification.style, {
            position: "fixed",
            top: "20px",
            right: "20px",
            padding: "15px 20px",
            backgroundColor:
                type === "success"
                    ? "rgba(0, 200, 83, 0.95)"
                    : type === "error"
                    ? "rgba(255, 50, 50, 0.95)"
                    : "rgba(33, 150, 243, 0.95)",
            color: "white",
            borderRadius: "8px",
            boxShadow: "0 4px 15px rgba(0, 0, 0, 0.2)",
            zIndex: "10000",
            display: "flex",
            alignItems: "center",
            gap: "12px",
            transform: "translateY(-20px)",
            opacity: "0",
            transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
        });
        document.body.appendChild(notification);
        setTimeout(() => {
            notification.style.transform = "translateY(0)";
            notification.style.opacity = "1";
        }, 10);
        setTimeout(() => {
            notification.style.transform = "translateY(-20px)";
            notification.style.opacity = "0";
            setTimeout(() => notification.remove(), 300);
        }, 3000);
    },
    showProjects3D: function () {
        this.init3DShowcase();
        document.querySelector(".projects-grid-view").style.display = "none";
        document.querySelector(".projects-list-view").style.display = "none";
        document.querySelector(".projects-carousel-view").style.display =
            "none";
        document.querySelector(".projects-timeline-view").style.display =
            "none";
        const threeDView = document.getElementById("projects-3d-view");
        threeDView.style.display = "block";
        this.init3DViewer();
        const viewButtons = document.querySelectorAll(".view-btn");
        viewButtons.forEach((btn) => {
            btn.addEventListener("click", () => {
                const viewType = btn.getAttribute("data-view");
                document
                    .querySelectorAll(
                        ".projects-grid-view, .projects-list-view, .projects-carousel-view, .projects-timeline-view, .projects-3d-scene"
                    )
                    .forEach((view) => (view.style.display = "none"));
                viewButtons.forEach((b) => b.classList.remove("active"));
                if (viewType === "3d") {
                    let threeDView = document.getElementById(
                        "projects-3d-view"
                    );
                    if (!threeDView) {
                        this.init3DShowcase();
                        threeDView = document.getElementById(
                            "projects-3d-view"
                        );
                    }
                    threeDView.style.display = "block";
                    btn.classList.add("active");
                    this.init3DViewer();
                } else if (viewType === "timeline") {
                    document.querySelector(
                        ".projects-timeline-view"
                    ).style.display = "block";
                    btn.classList.add("active");
                } else if (viewType === "grid") {
                    document.querySelector(
                        ".projects-grid-view"
                    ).style.display = "block";
                    btn.classList.add("active");
                } else if (viewType === "list") {
                    document.querySelector(
                        ".projects-list-view"
                    ).style.display = "block";
                    btn.classList.add("active");
                } else if (viewType === "carousel") {
                    document.querySelector(
                        ".projects-carousel-view"
                    ).style.display = "block";
                    btn.classList.add("active");
                }
            });
        });
    },
    init3DViewer: function () {
        const updateLoadingStatus = (message, progress) => {
            const statusElement = document.querySelector(".loading-status");
            if (statusElement) {
                statusElement.textContent = message;
            }
            const progressBar = document.querySelector(".progress-bar");
            if (progressBar && progress !== undefined) {
                progressBar.style.width = progress + "%";
            }
        };
        updateLoadingStatus("Initializing 3D environment...", 10);
        if (!window.TWEEN) {
            const tweenScript = document.createElement("script");
            tweenScript.src =
                "https://cdnjs.cloudflare.com/ajax/libs/tween.js/18.6.4/tween.umd.min.js";
            document.head.appendChild(tweenScript);
        }
        if (!window.supremeProjectViewer) {
            updateLoadingStatus("Loading 3D showcase components...", 30);
            const script = document.createElement("script");
            script.src = "files/js/project-3d-showcase.js";
            script.onload = () => {
                updateLoadingStatus("Initializing 3D project showcase...", 80);
                if (window.supremeProjectViewer) {
                    try {
                        window.supremeProjectViewer.init();
                    } catch (error) {
                        console.error("Error initializing 3D showcase:", error);
                        this.showNotification(
                            "There was an issue loading the 3D view",
                            "error"
                        );
                        const loadingScreen = document.querySelector(
                            ".projects-3d-loading"
                        );
                        if (loadingScreen) {
                            loadingScreen.style.display = "none";
                        }
                    }
                } else {
                    console.error(
                        "supremeProjectViewer not defined after loading script"
                    );
                    updateLoadingStatus("Failed to initialize 3D view", 100);
                    setTimeout(() => {
                        const loadingScreen = document.querySelector(
                            ".projects-3d-loading"
                        );
                        if (loadingScreen) {
                            loadingScreen.style.display = "none";
                        }
                    }, 2000);
                }
            };
            script.onerror = () => {
                console.error("Failed to load project-3d-showcase.js");
                updateLoadingStatus("Failed to load 3D components", 100);
                this.showNotification("Failed to load 3D components", "error");
                const loadingScreen = document.querySelector(
                    ".projects-3d-loading"
                );
                if (loadingScreen) {
                    loadingScreen.style.display = "none";
                }
            };
            document.head.appendChild(script);
        } else {
            updateLoadingStatus("Initializing 3D project showcase...", 80);
            try {
                window.supremeProjectViewer.init();
            } catch (error) {
                console.error("Error initializing 3D showcase:", error);
                this.showNotification(
                    "There was an issue with the 3D view",
                    "error"
                );
                const loadingScreen = document.querySelector(
                    ".projects-3d-loading"
                );
                if (loadingScreen) {
                    loadingScreen.style.display = "none";
                }
            }
        }
    },
};