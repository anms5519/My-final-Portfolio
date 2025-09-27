window.HeroContent = {
    getHTML: function () {
        return `
            <div class="hero-content">
                <img
                    src="files/logo.png"
                    alt="Logo"
                    width="150"
                    height="150"
                    loading="eager"
                    id="hero-logo"
                />
                <h1 data-i18n="welcome_title">WELCOME !</h1>
                <h2 data-i18n="welcome_subtitle">
                    TO THE REALM OF KHOLIPHA'S CREATION<br />Where Art Meets
                    Technology<br />Dreams Are Coded Into Existence
                </h2>
                <div class="cosmic-bubbles">
                    <a
                        href="#about"
                        class="cosmic-bubble"
                        data-section="About"
                        aria-label="About Section"
                        ><i class="fas fa-user"></i
                    ></a>
                    <a
                        href="#education"
                        class="cosmic-bubble"
                        data-section="Education"
                        aria-label="Education Section"
                        ><i class="fas fa-graduation-cap"></i
                    ></a>
                    <a
                        href="#skills"
                        class="cosmic-bubble"
                        data-section="Skills"
                        aria-label="Skills Section"
                        ><i class="fas fa-code"></i
                    ></a>
                    <a
                        href="#projects"
                        class="cosmic-bubble"
                        data-section="Projects"
                        aria-label="Projects Section"
                        ><i class="fas fa-laptop-code"></i
                    ></a>
                    <a
                        href="#certifications"
                        class="cosmic-bubble"
                        data-section="Certs"
                        aria-label="Certifications Section"
                        ><i class="fas fa-certificate"></i
                    ></a>
                    <a
                        href="#contact"
                        class="cosmic-bubble"
                        data-section="Contact"
                        aria-label="Contact Section"
                        ><i class="fas fa-envelope"></i
                    ></a>
                </div>
                <div class="social-links-hero">
                    <a
                        href="https://www.linkedin.com/in/kholipha-ahmmad-al-amin-3856b1305/"
                        target="_blank"
                        rel="noopener noreferrer"
                        class="social-icon-hero"
                        aria-label="LinkedIn Profile"
                        ><i class="fab fa-linkedin-in"></i
                    ></a>
                    <a
                        href="https://github.com/anms5519"
                        target="_blank"
                        rel="noopener noreferrer"
                        class="social-icon-hero"
                        aria-label="GitHub Profile"
                        ><i class="fab fa-github"></i
                    ></a>
                    <a
                        href="https://www.instagram.com/kholipha_ahmmad_alamin/"
                        target="_blank"
                        rel="noopener noreferrer"
                        class="social-icon-hero"
                        aria-label="Instagram Profile"
                        ><i class="fab fa-instagram"></i
                    ></a>
                    <a
                        href="https://x.com/al_amin5519"
                        target="_blank"
                        rel="noopener noreferrer"
                        class="social-icon-hero"
                        aria-label="X (Twitter) Profile"
                        ><i class="fab fa-x-twitter">X</i>
                    </a>
                    <a
                        href="https://www.facebook.com/kholipha.ahmmad.al.amin"
                        target="_blank"
                        rel="noopener noreferrer"
                        class="social-icon-hero"
                        aria-label="Facebook Profile"
                        ><i class="fab fa-facebook-f"></i
                    ></a>
                    <a
                        href="https://www.youtube.com/@kholifaahmadal-amin5743"
                        target="_blank"
                        rel="noopener noreferrer"
                        class="social-icon-hero"
                        aria-label="YouTube Channel"
                        ><i class="fab fa-youtube"></i
                    ></a>
                </div>
                <a
                    href="#about"
                    class="btn pulse-btn"
                    data-i18n="explore_button"
                >
                    Explore <i class="fas fa-arrow-alt-circle-down"></i>
                </a>
            </div>
        `;
    },
    init: function () {
        const heroLogo = document.getElementById("hero-logo");
        if (heroLogo) {
            heroLogo.addEventListener("click", function () {
                this.classList.add("pulse");
                setTimeout(() => {
                    this.classList.remove("pulse");
                }, 1000);
            });
        }
        const cosmicBubbles = document.querySelectorAll(".cosmic-bubble");
        cosmicBubbles.forEach((bubble) => {
            bubble.addEventListener("mouseenter", function () {
                const section = this.getAttribute("data-section");
            });
        });
    },
};