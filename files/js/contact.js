window.ContactContent = {
    getHTML: function() {
        return `
            <div class="container">
                <div
                    class="contact-content"
                    data-aos="fade-up"
                    data-aos-delay="200"
                >
                    <div class="contact-grid">
                        <div class="contact-info">
                            <div class="contact-info-header">
                                <h3 class="cosmic-text">Let's Connect</h3>
                                <p class="contact-tagline">
                                    Ready to collaborate or have questions?
                                    Reach out to me through any of these
                                    channels, or send a direct message.
                                </p>
                            </div>
                            <div class="contact-card-wrapper">
                                <div
                                    class="contact-card"
                                    data-aos="flip-left"
                                    data-aos-delay="100"
                                >
                                    <div class="card-icon">
                                        <i class="fas fa-envelope pulse"></i>
                                    </div>
                                    <div class="card-content">
                                        <h3>Email</h3>
                                        <p>
                                            <a
                                                href="mailto:kholifaahmadalamin@google.com"
                                                >kholifaahmadalamin@google.com</a
                                            >
                                        </p>
                                        <p class="response-time">
                                            Response time: ~24 hours
                                        </p>
                                    </div>
                                    <div class="card-decoration"></div>
                                </div>
                                <div
                                    class="contact-card"
                                    data-aos="flip-left"
                                    data-aos-delay="200"
                                >
                                    <div class="card-icon">
                                        <i class="fas fa-phone-alt pulse"></i>
                                    </div>
                                    <div class="card-content">
                                        <h3>Phone</h3>
                                        <p>
                                            <a href="tel:+8801320389539"
                                                >+880 1320-389539</a
                                            >
                                        </p>
                                        <p class="response-time">
                                            Available 9AM-5PM (EST)
                                        </p>
                                    </div>
                                    <div class="card-decoration"></div>
                                </div>
                                <div
                                    class="contact-card"
                                    data-aos="flip-left"
                                    data-aos-delay="300"
                                >
                                    <div class="card-icon">
                                        <i
                                            class="fas fa-map-marker-alt pulse"
                                        ></i>
                                    </div>
                                    <div class="card-content">
                                        <h3>Location</h3>
                                        <p>Dhaka, Bangladesh</p>
                                        <p class="time-zone">GMT+6</p>
                                    </div>
                                    <div class="card-decoration"></div>
                                </div>
                            </div>
                        </div>
                        <div class="contact-form-container">
                            <form id="contact-form">
                                <div class="form-header">
                                    <h3 class="cosmic-text">
                                        Send Me a Message
                                    </h3>
                                    <p class="form-tagline">
                                        I'll get back to you as soon as
                                        possible!
                                    </p>
                                </div>
                                <div class="form-body">
                                    <div class="form-group form-floating">
                                        <input
                                            type="text"
                                            id="from_name"
                                            name="from_name"
                                            placeholder="Your Name"
                                            required
                                        />
                                        <label for="from_name">Name</label>
                                        <div class="focus-border"><i></i></div>
                                    </div>
                                    <div class="form-group form-floating">
                                        <input
                                            type="email"
                                            id="from_email"
                                            name="from_email"
                                            placeholder="Your Email"
                                            required
                                        />
                                        <label for="from_email">Email</label>
                                        <div class="focus-border"><i></i></div>
                                    </div>
                                    <div class="form-group form-floating">
                                        <input
                                            type="text"
                                            id="subject"
                                            name="subject"
                                            placeholder="Subject"
                                            required
                                        />
                                        <label for="subject">Subject</label>
                                        <div class="focus-border"><i></i></div>
                                    </div>
                                    <div class="form-group form-floating">
                                        <input
                                            type="text"
                                            id="phone"
                                            name="phone"
                                            placeholder="Phone (Optional)"
                                        />
                                        <label for="phone"
                                            >Phone (Optional)</label
                                        >
                                        <div class="focus-border"><i></i></div>
                                    </div>
                                    <div
                                        class="form-group form-floating message-group"
                                    >
                                        <textarea
                                            id="message"
                                            name="message"
                                            placeholder="Your Message"
                                            rows="5"
                                            required
                                        ></textarea>
                                        <label for="message">Message</label>
                                        <div class="focus-border"><i></i></div>
                                    </div>
                                    <button
                                        type="submit"
                                        class="btn cosmic-btn submit-btn"
                                    >
                                        <div class="cosmic-btn-bg"></div>
                                        <span class="btn-text"
                                            >Send Message</span
                                        >
                                        <span class="btn-icon"
                                            ><i class="fas fa-paper-plane"></i
                                        ></span>
                                    </button>
                                </div>
                            </form>
                            <div class="form-status">
                                <div
                                    id="form-success"
                                    class="status-message hidden"
                                >
                                    <div class="status-icon success-icon">
                                        <i class="fas fa-check-circle"></i>
                                    </div>
                                    <div class="status-content">
                                        <h4>Success!</h4>
                                        <p>
                                            Message sent successfully! I'll get
                                            back to you soon.
                                        </p>
                                    </div>
                                </div>
                                <div
                                    id="form-error"
                                    class="status-message hidden"
                                >
                                    <div class="status-icon error-icon">
                                        <i
                                            class="fas fa-exclamation-circle"
                                        ></i>
                                    </div>
                                    <div class="status-content">
                                        <h4>Error!</h4>
                                        <p>
                                            Failed to send message. Please try
                                            again later.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="contact-shapes">
                <div class="shape shape-1"></div>
                <div class="shape shape-2"></div>
                <div class="shape shape-3"></div>
            </div>
                `;
    },
    init: function() {
        function initContactSection() {
            const contactForm = document.getElementById("contact-form");
            if (!contactForm) return;
            contactForm.addEventListener("submit", function (e) {
                e.preventDefault();
                const from_name = document.getElementById("from_name").value;
                const from_email = document.getElementById("from_email").value;
                const subject = document.getElementById("subject").value;
                const phone = document.getElementById("phone").value;
                const message = document.getElementById("message").value;
                const templateParams = {
                    from_name,
                    from_email,
                    subject,
                    phone,
                    message,
                };
                emailjs
                    .send(
                        "service_0ietc2e",
                        "template_jihmbkn",
                        templateParams,
                        "QCLwAOKe38NGkZrCE"
                    )
                    .then(
                        function (response) {
                            console.log("SUCCESS!", response.status, response.text);
                            document
                                .getElementById("form-success")
                                .classList.remove("hidden");
                            document
                                .getElementById("form-error")
                                .classList.add("hidden");
                            contactForm.reset();
                        },
                        function (error) {
                            console.error("FAILED...", error);
                            document
                                .getElementById("form-error")
                                .classList.remove("hidden");
                            document
                                .getElementById("form-success")
                                .classList.add("hidden");
                        }
                    );
            });
            const contactParticles = document.querySelector(".contact-particles");
            if (contactParticles) {
                for (let i = 0; i < 30; i++) {
                    const particle = document.createElement("div");
                    particle.classList.add("particle");
                    const size = Math.random() * 6 + 2;
                    const posX = Math.random() * 100;
                    const posY = Math.random() * 100;
                    const duration = Math.random() * 20 + 10;
                    const delay = Math.random() * 5;
                    particle.style.width = `${size}px`;
                    particle.style.height = `${size}px`;
                    particle.style.left = `${posX}%`;
                    particle.style.top = `${posY}%`;
                    particle.style.animationDuration = `${duration}s`;
                    particle.style.animationDelay = `${delay}s`;
                    const hue = Math.random() * 60 - 30 + 210;
                    particle.style.backgroundColor = `hsla(${hue}, 80%, 60%, ${
                        Math.random() * 0.3 + 0.2
                    })`;
                    contactParticles.appendChild(particle);
                }
            }
            contactForm
                .querySelectorAll(".form-floating input, .form-floating textarea")
                .forEach((input) => {
                    if (input.value) {
                        input.classList.add("has-value");
                    }
                    input.addEventListener("focus", () => {
                        input.classList.add("focused");
                    });
                    input.addEventListener("blur", () => {
                        input.classList.remove("focused");
                        if (input.value) {
                            input.classList.add("has-value");
                        } else {
                            input.classList.remove("has-value");
                        }
                    });
                });
        }
        initContactSection();
    }
};
