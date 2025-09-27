window.AboutContent = {
    getHTML: function () {
        return `
            <div class="container">
                <h2
                    class="section-title"
                    data-aos="fade-right"
                    data-aos-delay="100"
                >
                    <span>ABOUT</span> ME
                </h2>
                <div class="about-content-wrapper">
                    <div class="about-grid">
                        <div
                            class="about-image-column"
                            data-aos="fade-up"
                            data-aos-delay="200"
                        >
                            <div class="about-image-card">
                                <div class="image-tilt-container">
                                    <img
                                        src="files/profile.jpg"
                                        alt="Kholipha Ahmmad Al-Amin"
                                        class="profile-image"
                                    />
                                    <div class="image-glow-orb"></div>
                                    <canvas
                                        id="image-particles-canvas"
                                    ></canvas>
                                </div>
                                <div class="profile-intro">
                                    <h3 class="profile-greeting">
                                        Hello! I'm
                                        <span class="gradient-text dynamic-name"
                                            >Kholipha Ahmmad Al-Amin</span
                                        >
                                    </h3>
                                </div>
                            </div>
                            <div class="experience-stats">
                                <div
                                    class="stat-item"
                                    data-aos="fade-up"
                                    data-aos-delay="300"
                                >
                                    <i class="fas fa-briefcase stat-icon"></i>
                                    <span class="stat-number" data-count="4"
                                        >0</span
                                    >
                                    <span class="stat-label"
                                        >Years Experience</span
                                    >
                                </div>
                                <div
                                    class="stat-item"
                                    data-aos="fade-up"
                                    data-aos-delay="400"
                                >
                                    <i class="fas fa-tasks stat-icon"></i>
                                    <span class="stat-number" data-count="35"
                                        >0</span
                                    >
                                    <span class="stat-label"
                                        >Projects Completed</span
                                    >
                                </div>
                                <div
                                    class="stat-item"
                                    data-aos="fade-up"
                                    data-aos-delay="500"
                                >
                                    <i class="fas fa-award stat-icon"></i>
                                    <span class="stat-number" data-count="12"
                                        >0</span
                                    >
                                    <span class="stat-label"
                                        >Certifications</span
                                    >
                                </div>
                            </div>
                        </div>
                        <div
                            class="about-text-column"
                            data-aos="fade-left"
                            data-aos-delay="300"
                        >
                            <div class="dynamic-typing-container">
                                <span class="typed-text-output"></span>
                                <span class="typing-cursor"> </span>
                            </div>
                            <div class="about-narrative">
                                <p>
                                    A passionate IT Professional, I specialize
                                    in harnessing artificial intelligence to
                                    redefine image quality and pioneer machine
                                    learning advancements. My core interests lie
                                    in AI-driven image enhancement, crafting
                                    immersive 3D/FPS experiences with Unreal
                                    Engine & Python, and developing cutting-edge
                                    web solutions that boast ultra-advanced CSS
                                    and intuitive UI/UX design.
                                </p>
                                <p>
                                    My journey involves continuous exploration
                                    of premium presentations, innovative startup
                                    concepts, and technology-driven business
                                    strategies. I'm also deeply invested in
                                    academic research, utilizing LaTeX for
                                    documentation and VBA for insightful data
                                    visualization. Known for being organized and
                                    dependable, I excel at managing multiple
                                    priorities, backed by robust problem-solving
                                    and interpersonal skills.
                                </p>
                            </div>
                            <div
                                class="about-philosophy"
                                data-aos="fade-up"
                                data-aos-delay="400"
                            >
                                <h4>My Approach:</h4>
                                <p>
                                    "Driven by curiosity and a relentless
                                    pursuit of excellence, I believe in
                                    transforming complex challenges into elegant
                                    solutions. Technology, for me, is a canvas
                                    for innovation and impact."
                                </p>
                            </div>
                            <div
                                class="about-cta-buttons"
                                data-aos="fade-up"
                                data-aos-delay="800"
                            >
                                <a href="#resume-access-vault" class="btn btn-primary-glow"
                                    ><i class="fas fa-file-alt"></i> VIEW
                                    RESUME</a
                                >
                                <a
                                    href="#contact"
                                    class="btn btn-secondary-outline"
                                    ><i class="fas fa-paper-plane"></i> CONTACT
                                    ME</a
                                >
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="section-background-pattern"></div>
                `;
    },
    init: function () {
        const counters = document.querySelectorAll(".stat-number");
        const speed = 200; 
        const animateCounter = (counter) => {
            const target = +counter.getAttribute("data-count");
            const increment = target / speed;
            const updateCount = () => {
                const current = +counter.innerText;
                if (current < target) {
                    counter.innerText = Math.ceil(current + increment);
                    setTimeout(updateCount, 15); 
                } else {
                    counter.innerText = target; 
                }
            };
            updateCount();
        };
        const observerOptions = {
            root: null,
            threshold: 0.1, 
        };
        const counterObserver = new IntersectionObserver(
            (entries, observer) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        animateCounter(entry.target);
                        observer.unobserve(entry.target); 
                    }
                });
            },
            observerOptions
        );
        counters.forEach((counter) => {
            counterObserver.observe(counter);
        });
        const typedTextOutput = document.querySelector(".typed-text-output");
        const typingCursor = document.querySelector(".typing-cursor");
        if (typedTextOutput) {
            const phrases = [
                "AI-Powered Image Enhancement",
                "Unreal Engine Game Developer",
                "Full-Stack Web Artisan",
                "Passionate Tech Innovator",
            ];
            let phraseIndex = 0;
            let charIndex = 0;
            let isDeleting = false;
            const typingSpeed = 100;
            const deletingSpeed = 50;
            const delayBetweenPhrases = 1500;
            function type() {
                const currentPhrase = phrases[phraseIndex];
                if (isDeleting) {
                    typedTextOutput.textContent = currentPhrase.substring(
                        0,
                        charIndex - 1
                    );
                    charIndex--;
                } else {
                    typedTextOutput.textContent = currentPhrase.substring(
                        0,
                        charIndex + 1
                    );
                    charIndex++;
                }
                if (!isDeleting && charIndex === currentPhrase.length) {
                    isDeleting = true;
                    setTimeout(type, delayBetweenPhrases);
                } else if (isDeleting && charIndex === 0) {
                    isDeleting = false;
                    phraseIndex = (phraseIndex + 1) % phrases.length;
                    setTimeout(type, typingSpeed);
                } else {
                    setTimeout(type, isDeleting ? deletingSpeed : typingSpeed);
                }
            }
            setTimeout(type, 500); 
        }
        const tiltContainer = document.querySelector(".image-tilt-container");
        if (tiltContainer) {
            tiltContainer.addEventListener("mousemove", (e) => {
                const {
                    left,
                    top,
                    width,
                    height,
                } = tiltContainer.getBoundingClientRect();
                const x = (e.clientX - left - width / 2) / (width / 2);
                const y = (e.clientY - top - height / 2) / (height / 2);
                const tiltAmount = 10; 
                tiltContainer.style.transform = `perspective(1000px) rotateY(${
                    x * tiltAmount
                }deg) rotateX(${-y * tiltAmount}deg) scale3d(1.05, 1.05, 1.05)`;
            });
            tiltContainer.addEventListener("mouseleave", () => {
                tiltContainer.style.transform =
                    "perspective(1000px) rotateY(0deg) rotateX(0deg) scale3d(1,1,1)";
            });
        }
        const particleCanvas = document.getElementById(
            "image-particles-canvas"
        );
        if (particleCanvas) {
            const ctx = particleCanvas.getContext("2d");
            let particles = [];
            const numParticles = 30;
            function resizeCanvas() {
                particleCanvas.width = particleCanvas.offsetWidth;
                particleCanvas.height = particleCanvas.offsetHeight;
            }
            resizeCanvas();
            window.addEventListener("resize", resizeCanvas);
            class Particle {
                constructor() {
                    this.x = Math.random() * particleCanvas.width;
                    this.y = Math.random() * particleCanvas.height;
                    this.size = Math.random() * 3 + 1;
                    this.speedX = Math.random() * 1 - 0.5;
                    this.speedY = Math.random() * 1 - 0.5;
                    this.color =
                        getComputedStyle(document.documentElement)
                            .getPropertyValue("--primary-color")
                            .trim() || "rgba(0,170,255,0.5)";
                }
                update() {
                    this.x += this.speedX;
                    this.y += this.speedY;
                    if (this.size > 0.1) this.size -= 0.02;
                }
                draw() {
                    ctx.fillStyle = this.color
                        .replace(")", `,${Math.max(0, this.size / 3)})`)
                        .replace("rgb(", "rgba("); 
                    ctx.beginPath();
                    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                    ctx.fill();
                }
            }
            function initParticles() {
                particles = [];
                for (let i = 0; i < numParticles; i++) {
                    particles.push(new Particle());
                }
            }
            initParticles();
            function animateParticles() {
                ctx.clearRect(
                    0,
                    0,
                    particleCanvas.width,
                    particleCanvas.height
                );
                for (let i = 0; i < particles.length; i++) {
                    particles[i].update();
                    particles[i].draw();
                    if (particles[i].size <= 0.1) {
                        particles.splice(i, 1);
                        particles.push(new Particle()); 
                        i--;
                    }
                }
                requestAnimationFrame(animateParticles);
            }
            const imageWrapper = document.querySelector(
                ".about-image-card .image-tilt-container"
            );
            let animationFrameId;
            if (imageWrapper) {
                imageWrapper.addEventListener("mouseenter", () => {
                    if (!animationFrameId) {
                        initParticles(); 
                        animateParticles();
                    }
                });
                imageWrapper.addEventListener("mouseleave", () => {
                    cancelAnimationFrame(animationFrameId);
                    animationFrameId = null;
                    ctx.clearRect(
                        0,
                        0,
                        particleCanvas.width,
                        particleCanvas.height
                    );
                });
            }
            animateParticles();
        }
        if (typeof AOS !== "undefined") {
            AOS.init({
                duration: 800,
                easing: "ease-in-out-quad",
                once: true, 
            });
        }
    },
};