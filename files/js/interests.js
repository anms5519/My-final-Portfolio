window.InterestsContent = {
    getHTML: function() {
        return `
            <div class="container">
                <div class="section-title-container" data-aos="fade-up">
                    <h2 class="section-title">
                        <span class="title-icon"
                            ><i class="fas fa-star"></i
                        ></span>
                        <span class="title-text"
                            >Interests &
                            <span class="accent-text">Hobbies</span></span
                        >
                        <div class="title-particles"></div>
                    </h2>
                    <p class="section-subtitle">
                        What I'm passionate about beyond coding
                    </p>
                </div>
                <div class="legendary-indicator">
                    <span class="pulse-dot"></span>
                    <span class="indicator-text">Legendary Passions</span>
                </div>
                <div
                    class="interests-intro"
                    data-aos="fade-up"
                    data-aos-delay="100"
                >
                    <p>
                        Life is about more than just code. My diverse interests
                        and hobbies help me maintain creativity, balance, and
                        perspective. Here's a glimpse into what I enjoy in my
                        free time.
                    </p>
                </div>
                <div class="interests-showcase-visual">
                    <div class="visual-container">
                        <div class="floating-elements">
                            <div class="float-element" data-depth="0.2">
                                <i class="fas fa-code"></i>
                            </div>
                            <div class="float-element" data-depth="0.4">
                                <i class="fas fa-gamepad"></i>
                            </div>
                            <div class="float-element" data-depth="0.6">
                                <i class="fas fa-camera"></i>
                            </div>
                            <div class="float-element" data-depth="0.3">
                                <i class="fas fa-paint-brush"></i>
                            </div>
                            <div class="float-element" data-depth="0.5">
                                <i class="fas fa-book"></i>
                            </div>
                            <div class="float-element" data-depth="0.7">
                                <i class="fas fa-hiking"></i>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="interests-particle-bg"></div>
                <div
                    class="interests-tabs-container"
                    data-aos="fade-up"
                    data-aos-delay="200"
                >
                    <div class="interests-tabs">
                        <button class="interest-tab active" data-tab="tech">
                            <div class="tab-aura"></div>
                            <i class="fas fa-laptop-code"></i>
                            <span>Technology & Computing</span>
                            <div class="tab-highlight"></div>
                        </button>
                        <button class="interest-tab" data-tab="creative">
                            <div class="tab-aura"></div>
                            <i class="fas fa-palette"></i>
                            <span>Creative & Artistic</span>
                            <div class="tab-highlight"></div>
                        </button>
                        <button class="interest-tab" data-tab="personal">
                            <div class="tab-aura"></div>
                            <i class="fas fa-heart"></i>
                            <span>Personal Hobbies</span>
                            <div class="tab-highlight"></div>
                        </button>
                    </div>
                    <div class="tabs-content">
                        <div class="tab-content active" id="tech-content">
                            <div class="interests-grid">
                                <div
                                    class="interest-card"
                                    data-aos="flip-left"
                                    data-aos-delay="100"
                                    data-tilt
                                    data-tilt-max="15"
                                    data-tilt-speed="400"
                                    data-tilt-glare
                                    data-tilt-max-glare="0.3"
                                >
                                    <div class="card-bg"></div>
                                    <div class="interest-icon">
                                        <i class="fas fa-code"></i>
                                        <div class="icon-particles"></div>
                                    </div>
                                    <h3>Programming</h3>
                                    <p>
                                        Exploring new programming languages and
                                        paradigms to tackle complex problems.
                                    </p>
                                    <div class="interest-card-glow"></div>
                                    <div class="card-shine"></div>
                                </div>
                                <div
                                    class="interest-card"
                                    data-aos="flip-left"
                                    data-aos-delay="150"
                                    data-tilt
                                    data-tilt-max="15"
                                    data-tilt-speed="400"
                                    data-tilt-glare
                                    data-tilt-max-glare="0.3"
                                >
                                    <div class="card-bg"></div>
                                    <div class="interest-icon">
                                        <i class="fas fa-robot"></i>
                                        <div class="icon-particles"></div>
                                    </div>
                                    <h3>Artificial Intelligence</h3>
                                    <p>
                                        Exploring machine learning algorithms
                                        and neural networks for solving complex
                                        problems.
                                    </p>
                                    <div class="interest-card-glow"></div>
                                    <div class="card-shine"></div>
                                </div>
                                <div
                                    class="interest-card"
                                    data-aos="flip-left"
                                    data-aos-delay="200"
                                    data-tilt
                                    data-tilt-max="15"
                                    data-tilt-speed="400"
                                    data-tilt-glare
                                    data-tilt-max-glare="0.3"
                                >
                                    <div class="card-bg"></div>
                                    <div class="interest-icon">
                                        <i class="fas fa-globe"></i>
                                        <div class="icon-particles"></div>
                                    </div>
                                    <h3>Web Development</h3>
                                    <p>
                                        Building responsive and dynamic websites
                                        with modern frameworks and technologies.
                                    </p>
                                    <div class="interest-card-glow"></div>
                                    <div class="card-shine"></div>
                                </div>
                                <div
                                    class="interest-card"
                                    data-aos="flip-left"
                                    data-aos-delay="250"
                                    data-tilt
                                    data-tilt-max="15"
                                    data-tilt-speed="400"
                                    data-tilt-glare
                                    data-tilt-max-glare="0.3"
                                >
                                    <div class="card-bg"></div>
                                    <div class="interest-icon">
                                        <i class="fas fa-shield-alt"></i>
                                        <div class="icon-particles"></div>
                                    </div>
                                    <h3>Cybersecurity</h3>
                                    <p>
                                        Studying ethical hacking techniques and
                                        security protocols to protect digital
                                        assets.
                                    </p>
                                    <div class="interest-card-glow"></div>
                                    <div class="card-shine"></div>
                                </div>
                                <div
                                    class="interest-card"
                                    data-aos="flip-left"
                                    data-aos-delay="300"
                                    data-tilt
                                    data-tilt-max="15"
                                    data-tilt-speed="400"
                                    data-tilt-glare
                                    data-tilt-max-glare="0.3"
                                >
                                    <div class="card-bg"></div>
                                    <div class="interest-icon">
                                        <i class="fas fa-database"></i>
                                        <div class="icon-particles"></div>
                                    </div>
                                    <h3>Data Science</h3>
                                    <p>
                                        Analyzing big data and creating
                                        visualization solutions to derive
                                        meaningful insights.
                                    </p>
                                    <div class="interest-card-glow"></div>
                                    <div class="card-shine"></div>
                                </div>
                                <div
                                    class="interest-card"
                                    data-aos="flip-left"
                                    data-aos-delay="350"
                                    data-tilt
                                    data-tilt-max="15"
                                    data-tilt-speed="400"
                                    data-tilt-glare
                                    data-tilt-max-glare="0.3"
                                >
                                    <div class="card-bg"></div>
                                    <div class="interest-icon">
                                        <i class="fas fa-cloud"></i>
                                        <div class="icon-particles"></div>
                                    </div>
                                    <h3>Cloud Computing</h3>
                                    <p>
                                        Working with cloud platforms and DevOps
                                        tools to build scalable infrastructure.
                                    </p>
                                    <div class="interest-card-glow"></div>
                                    <div class="card-shine"></div>
                                </div>
                                <div
                                    class="interest-card"
                                    data-aos="flip-left"
                                    data-aos-delay="400"
                                    data-tilt
                                    data-tilt-max="15"
                                    data-tilt-speed="400"
                                    data-tilt-glare
                                    data-tilt-max-glare="0.3"
                                >
                                    <div class="card-bg"></div>
                                    <div class="interest-icon">
                                        <i class="fas fa-gamepad"></i>
                                        <div class="icon-particles"></div>
                                    </div>
                                    <h3>Game Development</h3>
                                    <p>
                                        Creating immersive gaming experiences
                                        with Unreal Engine, Unity, and Python.
                                    </p>
                                    <div class="interest-card-glow"></div>
                                    <div class="card-shine"></div>
                                </div>
                                <div
                                    class="interest-card"
                                    data-aos="flip-left"
                                    data-aos-delay="450"
                                    data-tilt
                                    data-tilt-max="15"
                                    data-tilt-speed="400"
                                    data-tilt-glare
                                    data-tilt-max-glare="0.3"
                                >
                                    <div class="card-bg"></div>
                                    <div class="interest-icon">
                                        <i class="fas fa-microchip"></i>
                                        <div class="icon-particles"></div>
                                    </div>
                                    <h3>IoT & Robotics</h3>
                                    <p>
                                        Exploring embedded systems, Internet of
                                        Things, and automation technologies.
                                    </p>
                                    <div class="interest-card-glow"></div>
                                    <div class="card-shine"></div>
                                </div>
                                <div
                                    class="interest-card"
                                    data-aos="flip-left"
                                    data-aos-delay="500"
                                    data-tilt
                                    data-tilt-max="15"
                                    data-tilt-speed="400"
                                    data-tilt-glare
                                    data-tilt-max-glare="0.3"
                                >
                                    <div class="card-bg"></div>
                                    <div class="interest-icon">
                                        <i class="fas fa-link"></i>
                                        <div class="icon-particles"></div>
                                    </div>
                                    <h3>Blockchain</h3>
                                    <p>
                                        Studying distributed ledger technologies
                                        and smart contract development.
                                    </p>
                                    <div class="interest-card-glow"></div>
                                    <div class="card-shine"></div>
                                </div>
                                <div
                                    class="interest-card"
                                    data-aos="flip-left"
                                    data-aos-delay="550"
                                    data-tilt
                                    data-tilt-max="15"
                                    data-tilt-speed="400"
                                    data-tilt-glare
                                    data-tilt-max-glare="0.3"
                                >
                                    <div class="card-bg"></div>
                                    <div class="interest-icon">
                                        <i class="fas fa-atom"></i>
                                        <div class="icon-particles"></div>
                                    </div>
                                    <h3>Quantum Computing</h3>
                                    <p>
                                        Learning about quantum algorithms and
                                        their potential applications in
                                        computing.
                                    </p>
                                    <div class="interest-card-glow"></div>
                                    <div class="card-shine"></div>
                                </div>
                                <div
                                    class="interest-card"
                                    data-aos="flip-left"
                                    data-aos-delay="600"
                                    data-tilt
                                    data-tilt-max="15"
                                    data-tilt-speed="400"
                                    data-tilt-glare
                                    data-tilt-max-glare="0.3"
                                >
                                    <div class="card-bg"></div>
                                    <div class="interest-icon">
                                        <i class="fas fa-mobile-alt"></i>
                                        <div class="icon-particles"></div>
                                    </div>
                                    <h3>Mobile Development</h3>
                                    <p>
                                        Building cross-platform applications for
                                        Android and iOS devices.
                                    </p>
                                    <div class="interest-card-glow"></div>
                                    <div class="card-shine"></div>
                                </div>
                                <div
                                    class="interest-card"
                                    data-aos="flip-left"
                                    data-aos-delay="650"
                                    data-tilt
                                    data-tilt-max="15"
                                    data-tilt-speed="400"
                                    data-tilt-glare
                                    data-tilt-max-glare="0.3"
                                >
                                    <div class="card-bg"></div>
                                    <div class="interest-icon">
                                        <i class="fas fa-vr-cardboard"></i>
                                        <div class="icon-particles"></div>
                                    </div>
                                    <h3>AR/VR Development</h3>
                                    <p>
                                        Creating immersive augmented and virtual
                                        reality experiences for various
                                        platforms.
                                    </p>
                                    <div class="interest-card-glow"></div>
                                    <div class="card-shine"></div>
                                </div>
                            </div>
                        </div>
                        <div class="tab-content" id="creative-content">
                            <div class="interests-grid">
                                <div
                                    class="interest-card"
                                    data-aos="flip-left"
                                    data-aos-delay="100"
                                    data-tilt
                                    data-tilt-max="15"
                                    data-tilt-speed="400"
                                    data-tilt-glare
                                    data-tilt-max-glare="0.3"
                                >
                                    <div class="card-bg"></div>
                                    <div class="interest-icon">
                                        <i class="fas fa-user-astronaut"></i>
                                        <div class="icon-particles"></div>
                                    </div>
                                    <h3>Character Design</h3>
                                    <p>
                                        Creating unique character concepts for
                                        games, animations, and illustrations.
                                    </p>
                                    <div class="interest-card-glow"></div>
                                    <div class="card-shine"></div>
                                </div>
                                <div
                                    class="interest-card"
                                    data-aos="flip-left"
                                    data-aos-delay="150"
                                    data-tilt
                                    data-tilt-max="15"
                                    data-tilt-speed="400"
                                    data-tilt-glare
                                    data-tilt-max-glare="0.3"
                                >
                                    <div class="card-bg"></div>
                                    <div class="interest-icon">
                                        <i class="fas fa-cube"></i>
                                        <div class="icon-particles"></div>
                                    </div>
                                    <h3>3D Modeling & Animation</h3>
                                    <p>
                                        Building and animating 3D models for
                                        games, simulations, and digital art.
                                    </p>
                                    <div class="interest-card-glow"></div>
                                    <div class="card-shine"></div>
                                </div>
                                <div
                                    class="interest-card"
                                    data-aos="flip-left"
                                    data-aos-delay="200"
                                    data-tilt
                                    data-tilt-max="15"
                                    data-tilt-speed="400"
                                    data-tilt-glare
                                    data-tilt-max-glare="0.3"
                                >
                                    <div class="card-bg"></div>
                                    <div class="interest-icon">
                                        <i class="fas fa-film"></i>
                                        <div class="icon-particles"></div>
                                    </div>
                                    <h3>Motion Graphics</h3>
                                    <p>
                                        Designing animated visual elements for
                                        videos, presentations, and digital
                                        media.
                                    </p>
                                    <div class="interest-card-glow"></div>
                                    <div class="card-shine"></div>
                                </div>
                                <div
                                    class="interest-card"
                                    data-aos="flip-left"
                                    data-aos-delay="250"
                                    data-tilt
                                    data-tilt-max="15"
                                    data-tilt-speed="400"
                                    data-tilt-glare
                                    data-tilt-max-glare="0.3"
                                >
                                    <div class="card-bg"></div>
                                    <div class="interest-icon">
                                        <i class="fas fa-paint-brush"></i>
                                        <div class="icon-particles"></div>
                                    </div>
                                    <h3>Digital Painting</h3>
                                    <p>
                                        Creating digital artwork that blends
                                        traditional techniques with digital
                                        tools.
                                    </p>
                                    <div class="interest-card-glow"></div>
                                    <div class="card-shine"></div>
                                </div>
                                <div
                                    class="interest-card"
                                    data-aos="flip-left"
                                    data-aos-delay="300"
                                    data-tilt
                                    data-tilt-max="15"
                                    data-tilt-speed="400"
                                    data-tilt-glare
                                    data-tilt-max-glare="0.3"
                                >
                                    <div class="card-bg"></div>
                                    <div class="interest-icon">
                                        <i class="fas fa-pencil-alt"></i>
                                        <div class="icon-particles"></div>
                                    </div>
                                    <h3>Sketching & Illustration</h3>
                                    <p>
                                        Drawing detailed sketches and
                                        illustrations for both personal and
                                        professional projects.
                                    </p>
                                    <div class="interest-card-glow"></div>
                                    <div class="card-shine"></div>
                                </div>
                                <div
                                    class="interest-card"
                                    data-aos="flip-left"
                                    data-aos-delay="350"
                                    data-tilt
                                    data-tilt-max="15"
                                    data-tilt-speed="400"
                                    data-tilt-glare
                                    data-tilt-max-glare="0.3"
                                >
                                    <div class="card-bg"></div>
                                    <div class="interest-icon">
                                        <i class="fas fa-object-group"></i>
                                        <div class="icon-particles"></div>
                                    </div>
                                    <h3>Graphic Design</h3>
                                    <p>
                                        Creating visual content for print and
                                        digital media, including logos and
                                        branding.
                                    </p>
                                    <div class="interest-card-glow"></div>
                                    <div class="card-shine"></div>
                                </div>
                                <div
                                    class="interest-card"
                                    data-aos="flip-left"
                                    data-aos-delay="400"
                                    data-tilt
                                    data-tilt-max="15"
                                    data-tilt-speed="400"
                                    data-tilt-glare
                                    data-tilt-max-glare="0.3"
                                >
                                    <div class="card-bg"></div>
                                    <div class="interest-icon">
                                        <i class="fas fa-camera"></i>
                                        <div class="icon-particles"></div>
                                    </div>
                                    <h3>Photography</h3>
                                    <p>
                                        Capturing and editing photos with a
                                        focus on composition and visual
                                        storytelling.
                                    </p>
                                    <div class="interest-card-glow"></div>
                                    <div class="card-shine"></div>
                                </div>
                                <div
                                    class="interest-card"
                                    data-aos="flip-left"
                                    data-aos-delay="450"
                                    data-tilt
                                    data-tilt-max="15"
                                    data-tilt-speed="400"
                                    data-tilt-glare
                                    data-tilt-max-glare="0.3"
                                >
                                    <div class="card-bg"></div>
                                    <div class="interest-icon">
                                        <i class="fas fa-video"></i>
                                        <div class="icon-particles"></div>
                                    </div>
                                    <h3>Video Editing</h3>
                                    <p>
                                        Editing and producing video content with
                                        a focus on narrative and technical
                                        quality.
                                    </p>
                                    <div class="interest-card-glow"></div>
                                    <div class="card-shine"></div>
                                </div>
                                <div
                                    class="interest-card"
                                    data-aos="flip-left"
                                    data-aos-delay="500"
                                    data-tilt
                                    data-tilt-max="15"
                                    data-tilt-speed="400"
                                    data-tilt-glare
                                    data-tilt-max-glare="0.3"
                                >
                                    <div class="card-bg"></div>
                                    <div class="interest-icon">
                                        <i class="fas fa-magic"></i>
                                        <div class="icon-particles"></div>
                                    </div>
                                    <h3>VFX & CGI</h3>
                                    <p>
                                        Creating visual effects and
                                        computer-generated imagery for digital
                                        media projects.
                                    </p>
                                    <div class="interest-card-glow"></div>
                                    <div class="card-shine"></div>
                                </div>
                                <div
                                    class="interest-card"
                                    data-aos="flip-left"
                                    data-aos-delay="550"
                                    data-tilt
                                    data-tilt-max="15"
                                    data-tilt-speed="400"
                                    data-tilt-glare
                                    data-tilt-max-glare="0.3"
                                >
                                    <div class="card-bg"></div>
                                    <div class="interest-icon">
                                        <i class="fas fa-pen-fancy"></i>
                                        <div class="icon-particles"></div>
                                    </div>
                                    <h3>Calligraphy</h3>
                                    <p>
                                        Practicing the art of beautiful
                                        handwriting and decorative lettering.
                                    </p>
                                    <div class="interest-card-glow"></div>
                                    <div class="card-shine"></div>
                                </div>
                                <div
                                    class="interest-card"
                                    data-aos="flip-left"
                                    data-aos-delay="600"
                                    data-tilt
                                    data-tilt-max="15"
                                    data-tilt-speed="400"
                                    data-tilt-glare
                                    data-tilt-max-glare="0.3"
                                >
                                    <div class="card-bg"></div>
                                    <div class="interest-icon">
                                        <i class="fas fa-building"></i>
                                        <div class="icon-particles"></div>
                                    </div>
                                    <h3>Architectural Visualization</h3>
                                    <p>
                                        Creating realistic 3D renderings and
                                        visualizations of architectural spaces.
                                    </p>
                                    <div class="interest-card-glow"></div>
                                    <div class="card-shine"></div>
                                </div>
                            </div>
                        </div>
                        <div class="tab-content" id="personal-content">
                            <div class="interests-grid">
                                <div class="interest-card">
                                    <div class="interest-icon">
                                        <i class="fas fa-book"></i>
                                    </div>
                                    <h3>Reading</h3>
                                    <p>
                                        Exploring diverse genres from science
                                        fiction to philosophy to expand my
                                        knowledge and perspective.
                                    </p>
                                </div>
                                <div class="interest-card">
                                    <div class="interest-icon">
                                        <i class="fas fa-hiking"></i>
                                    </div>
                                    <h3>Hiking</h3>
                                    <p>
                                        Discovering beautiful trails and
                                        connecting with nature to recharge and
                                        find inspiration.
                                    </p>
                                </div>
                                <div class="interest-card">
                                    <div class="interest-icon">
                                        <i class="fas fa-chess"></i>
                                    </div>
                                    <h3>Strategy Games</h3>
                                    <p>
                                        Enhancing critical thinking and
                                        strategic planning through chess and
                                        other mind games.
                                    </p>
                                </div>
                                <div class="interest-card">
                                    <div class="interest-icon">
                                        <i class="fas fa-plane"></i>
                                    </div>
                                    <h3>Travel</h3>
                                    <p>
                                        Experiencing diverse cultures and places
                                        to gain new perspectives and creative
                                        inspiration.
                                    </p>
                                </div>
                                <div class="interest-card">
                                    <div class="interest-icon">
                                        <i class="fas fa-utensils"></i>
                                    </div>
                                    <h3>Cooking</h3>
                                    <p>
                                        Experimenting with international
                                        cuisines and techniques to create
                                        delicious meals.
                                    </p>
                                </div>
                                <div class="interest-card">
                                    <div class="interest-icon">
                                        <i class="fas fa-guitar"></i>
                                    </div>
                                    <h3>Music Appreciation</h3>
                                    <p>
                                        Exploring diverse musical genres and
                                        artists to appreciate the art of sound.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="interests-quote">
                    <blockquote>
                        <p>
                            "The more that you read, the more things you will
                            know. The more that you learn, the more places
                            you'll go."
                        </p>
                        <cite>― Dr. Seuss</cite>
                    </blockquote>
                </div>
            </div>
                `;
    },
    init: function() {
        initializeInterestsSection();
        function initializeInterestsSection() {
            const interestTabs = document.querySelectorAll(".interest-tab");
            const tabContents = document.querySelectorAll(".tab-content");
            if (interestTabs.length > 0) {
                interestTabs.forEach((tab) => {
                    tab.addEventListener("click", function () {
                        interestTabs.forEach((t) => t.classList.remove("active"));
                        this.classList.add("active");
                        const tabId = this.getAttribute("data-tab");
                        tabContents.forEach((content) => {
                            content.classList.remove("active");
                        });
                        const targetContent = document.getElementById(
                            tabId + "-content"
                        );
                        if (targetContent) {
                            targetContent.classList.add("active");
                        }
                    });
                });
            }
            applyInterestCardEffects();
        }
        function applyInterestCardEffects() {
            const interestCards = document.querySelectorAll(".interest-card");
            interestCards.forEach((card) => {
                card.addEventListener("mousemove", function (e) {
                    if (window.innerWidth < 768) return;
                    const rect = this.getBoundingClientRect();
                    const x = e.clientX - rect.left;
                    const y = e.clientY - rect.top;
                    const centerX = rect.width / 2;
                    const centerY = rect.height / 2;
                    const deltaX = (x - centerX) / centerX;
                    const deltaY = (y - centerY) / centerY;
                    this.style.transform = `perspective(100vh) rotateX(${
                        -deltaY * la
                    }deg) rotateY(${deltaX * 10}deg) translateZ(1vh)`;
                    const shine =
                        this.querySelector(".card-shine") ||
                        document.createElement("div");
                    if (!this.querySelector(".card-shine")) {
                        shine.classList.add("card-shine");
                        this.appendChild(shine);
                    }
                    shine.style.backgroundImage = `
              radial-gradient(
                circle at ${(x / rect.width) * 100}% ${(y / rect.height) * 100}%, 
                rgba(255, 255, 255, 0.4), 
                transparent
              )
            `;
                });
                card.addEventListener("mouseleave", function () {
                    this.style.transform =
                        "perspective(100vh) rotateX(0) rotateY(0) translateZ(0)";
                    const shine = this.querySelector(".card-shine");
                    if (shine) {
                        shine.style.backgroundImage = "none";
                    }
                });
                const cardInner = card.querySelector(".interest-card-inner");
                if (cardInner) {
                    card.addEventListener("click", function () {
                        if (cardInner.style.transform === "rotateY(180deg)") {
                            cardInner.style.transform = "rotateY(0deg)";
                        } else {
                            cardInner.style.transform = "rotateY(180deg)";
                        }
                    });
                }
            });
        }        
    }
};
