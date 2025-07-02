window.TrainingsContent = {
  getHTML: function() {
      return `
          <div class="container">
              <h2 class="section-title" data-aos="fade-right">
                  <span class="title-icon"
                      ><i class="fas fa-graduation-cap"></i
                  ></span>
                  <span class="title-text"
                      >Trainings &
                      <span class="accent-text">Workshops</span></span
                  >
                  <div class="title-particles"></div>
              </h2>
              <div
                  class="trainings-intro"
                  data-aos="fade-up"
                  data-aos-delay="100"
              >
                  <p>
                      Professional development workshops and training programs
                      I've participated in to enhance my skills and knowledge.
                  </p>
              </div>
              <div class="legendary-indicator">
                  <span class="pulse-dot"></span>
                  <span class="indicator-text">Learning Path</span>
              </div>
              <div
                  class="trainings-filter floating-panel"
                  data-aos="fade-up"
                  data-aos-delay="200"
              >
                  <button class="filter-btn active" data-filter="all">
                      <i class="fas fa-th-large"></i>
                      <span>All</span>
                      <div class="btn-glow"></div>
                  </button>
                  <button class="filter-btn" data-filter="programming">
                      <i class="fas fa-code"></i>
                      <span>Programming</span>
                      <div class="btn-glow"></div>
                  </button>
                  <button class="filter-btn" data-filter="technology">
                      <i class="fas fa-microchip"></i>
                      <span>Technology</span>
                      <div class="btn-glow"></div>
                  </button>
                  <button class="filter-btn" data-filter="development">
                      <i class="fas fa-laptop-code"></i>
                      <span>Development</span>
                      <div class="btn-glow"></div>
                  </button>
              </div>
              <div class="training-timeline">
                  <div class="timeline-line"></div>
                  <div class="timeline-glow"></div>
              </div>
              <div
                  class="training-grid"
                  data-aos="fade-up"
                  data-aos-delay="300"
              >
                  <div
                      class="training-card"
                      data-category="programming"
                      data-aos="zoom-in"
                      data-aos-delay="100"
                  >
                      <div class="training-icon">
                          <i class="fas fa-code"></i>
                      </div>
                      <h3>Undergraduates Projects for CSE Students</h3>
                      <p>A Comprehensive Guideline</p>
                      <div class="training-details">
                          <span
                              ><i class="fas fa-calendar-alt"></i> 2023</span
                          >
                          <span><i class="fas fa-university"></i> ACC</span>
                      </div>
                  </div>
                  <div
                      class="training-card"
                      data-category="programming"
                      data-aos="zoom-in"
                      data-aos-delay="200"
                  >
                      <div class="training-icon">
                          <i class="fab fa-python"></i>
                      </div>
                      <h3>Beginner's Guide to Python 3 Programming</h3>
                      <p>Basic Python programming skills</p>
                      <div class="training-details">
                          <span
                              ><i class="fas fa-calendar-alt"></i> 2022</span
                          >
                          <span><i class="fas fa-university"></i> ADUST</span>
                      </div>
                  </div>
                  <div
                      class="training-card"
                      data-category="technology"
                      data-aos="zoom-in"
                      data-aos-delay="300"
                  >
                      <div class="training-icon">
                          <i class="fas fa-brain"></i>
                      </div>
                      <h3>Machine Learning and AI Workshop</h3>
                      <p>
                          Introduction to AI and Machine Learning techniques
                      </p>
                      <div class="training-details">
                          <span
                              ><i class="fas fa-calendar-alt"></i> 2023</span
                          >
                          <span><i class="fas fa-university"></i> ACC</span>
                      </div>
                  </div>
                  <div
                      class="training-card"
                      data-category="development"
                      data-aos="zoom-in"
                      data-aos-delay="400"
                  >
                      <div class="training-icon">
                          <i class="fas fa-laptop-code"></i>
                      </div>
                      <h3>Web Development Bootcamp</h3>
                      <p>Full-stack web development skills</p>
                      <div class="training-details">
                          <span
                              ><i class="fas fa-calendar-alt"></i> 2022</span
                          >
                          <span><i class="fas fa-university"></i> ADUST</span>
                      </div>
                  </div>
                  <div
                      class="training-card"
                      data-category="programming"
                      data-aos="zoom-in"
                      data-aos-delay="500"
                  >
                      <div class="training-icon">
                          <i class="fas fa-microchip"></i>
                      </div>
                      <h3>Arduino Programming and Applications</h3>
                      <p>Learning Arduino basics and applications</p>
                      <div class="training-details">
                          <span
                              ><i class="fas fa-calendar-alt"></i> 2021</span
                          >
                          <span><i class="fas fa-university"></i> ACC</span>
                      </div>
                  </div>
                  <div
                      class="training-card"
                      data-category="programming"
                      data-aos="zoom-in"
                      data-aos-delay="600"
                  >
                      <div class="training-icon">
                          <i class="fas fa-file-code"></i>
                      </div>
                      <h3>Professional C Programming for Job Interview</h3>
                      <p>Job-ready C programming skills</p>
                      <div class="training-details">
                          <span
                              ><i class="fas fa-calendar-alt"></i> 2022</span
                          >
                          <span><i class="fas fa-university"></i> ADUST</span>
                      </div>
                  </div>
                  <div
                      class="training-card"
                      data-category="technology"
                      data-aos="zoom-in"
                      data-aos-delay="700"
                  >
                      <div class="training-icon">
                          <i class="fas fa-vr-cardboard"></i>
                      </div>
                      <h3>AR/VR Workshop</h3>
                      <p>Introduction to Augmented and Virtual Reality</p>
                      <div class="training-details">
                          <span
                              ><i class="fas fa-calendar-alt"></i> 2022</span
                          >
                          <span><i class="fas fa-university"></i> ACC</span>
                      </div>
                  </div>
                  <div class="training-card" data-category="development">
                      <div class="training-icon">
                          <i class="fas fa-check-circle"></i>
                      </div>
                      <h3>Software Testing and Quality Assurance</h3>
                      <p>Understanding software testing and QA methods</p>
                      <div class="training-details">
                          <span
                              ><i class="fas fa-calendar-alt"></i> 2023</span
                          >
                          <span><i class="fas fa-university"></i> ADUST</span>
                      </div>
                  </div>
                  <div class="training-card" data-category="development">
                      <div class="training-icon">
                          <i class="fas fa-infinity"></i>
                      </div>
                      <h3>DevOps and CI/CD Conference</h3>
                      <p>
                          DevOps practices and Continuous
                          Integration/Continuous Deployment
                      </p>
                      <div class="training-details">
                          <span
                              ><i class="fas fa-calendar-alt"></i> 2023</span
                          >
                          <span><i class="fas fa-university"></i> ACC</span>
                      </div>
                  </div>
                  <div class="training-card" data-category="development">
                      <div class="training-icon">
                          <i class="fas fa-gamepad"></i>
                      </div>
                      <h3>Game Development Using Unity</h3>
                      <p>Unity-based game development techniques</p>
                      <div class="training-details">
                          <span
                              ><i class="fas fa-calendar-alt"></i> 2021</span
                          >
                          <span><i class="fas fa-university"></i> ADUST</span>
                      </div>
                  </div>
                  <div class="training-card" data-category="technology">
                      <div class="training-icon">
                          <i class="fas fa-shield-alt"></i>
                      </div>
                      <h3>Cybersecurity and Ethical Hacking</h3>
                      <p>
                          Learning cybersecurity and ethical hacking methods
                      </p>
                      <div class="training-details">
                          <span
                              ><i class="fas fa-calendar-alt"></i> 2022</span
                          >
                          <span><i class="fas fa-university"></i> ACC</span>
                      </div>
                  </div>
                  <div class="training-card" data-category="development">
                      <div class="training-icon">
                          <i class="fas fa-mobile-alt"></i>
                      </div>
                      <h3>Mobile App Development Seminar</h3>
                      <p>
                          Developing mobile applications for Android and iOS
                      </p>
                      <div class="training-details">
                          <span
                              ><i class="fas fa-calendar-alt"></i> 2022</span
                          >
                          <span><i class="fas fa-university"></i> ADUST</span>
                      </div>
                  </div>
                  <div class="training-card" data-category="technology">
                      <div class="training-icon">
                          <i class="fas fa-link"></i>
                      </div>
                      <h3>Blockchain and Cryptocurrency Workshop</h3>
                      <p>
                          Understanding blockchain technology and
                          cryptocurrencies
                      </p>
                      <div class="training-details">
                          <span
                              ><i class="fas fa-calendar-alt"></i> 2023</span
                          >
                          <span><i class="fas fa-university"></i> ACC</span>
                      </div>
                  </div>
                  <div class="training-card" data-category="technology">
                      <div class="training-icon">
                          <i class="fas fa-wifi"></i>
                      </div>
                      <h3>IoT Workshop</h3>
                      <p>Exploring Internet of Things (IoT) applications</p>
                      <div class="training-details">
                          <span
                              ><i class="fas fa-calendar-alt"></i> 2023</span
                          >
                          <span><i class="fas fa-university"></i> ADUST</span>
                      </div>
                  </div>
                  <div class="training-card" data-category="technology">
                      <div class="training-icon">
                          <i class="fas fa-chart-line"></i>
                      </div>
                      <h3>Data Science and Analytics Workshop</h3>
                      <p>Learn data science techniques and analytics tools</p>
                      <div class="training-details">
                          <span
                              ><i class="fas fa-calendar-alt"></i> 2022</span
                          >
                          <span><i class="fas fa-university"></i> ACC</span>
                      </div>
                  </div>
                  <div class="training-card" data-category="technology">
                      <div class="training-icon">
                          <i class="fas fa-cloud"></i>
                      </div>
                      <h3>Cloud Computing Workshop</h3>
                      <p>Introduction to cloud computing platforms</p>
                      <div class="training-details">
                          <span
                              ><i class="fas fa-calendar-alt"></i> 2023</span
                          >
                          <span><i class="fas fa-university"></i> ADUST</span>
                      </div>
                  </div>
                  <div class="training-card" data-category="programming">
                      <div class="training-icon">
                          <i class="fab fa-r-project"></i>
                      </div>
                      <h3>Dive Into R: A Hands-on Programming Workshop</h3>
                      <p>Practical R programming for data analysis</p>
                      <div class="training-details">
                          <span
                              ><i class="fas fa-calendar-alt"></i> 2023</span
                          >
                          <span><i class="fas fa-university"></i> ACC</span>
                      </div>
                  </div>
                  <div class="training-card" data-category="development">
                      <div class="training-icon">
                          <i class="fas fa-tasks"></i>
                      </div>
                      <h3>SQA Webinar</h3>
                      <p>Software Quality Assurance principles</p>
                      <div class="training-details">
                          <span
                              ><i class="fas fa-calendar-alt"></i> 2022</span
                          >
                          <span><i class="fas fa-university"></i> ADUST</span>
                      </div>
                  </div>
              </div>
              <div class="trainings-summary">
                  <div class="summary-stats">
                      <div class="stat-item">
                          <span class="stat-value">15+</span>
                          <span class="stat-label">Trainings</span>
                      </div>
                      <div class="stat-item">
                          <span class="stat-value">4</span>
                          <span class="stat-label">Categories</span>
                      </div>
                      <div class="stat-item">
                          <span class="stat-value">500+</span>
                          <span class="stat-label">Hours</span>
                      </div>
                  </div>
              </div>
          </div>
          <div class="section-background">
              <div class="bg-grid"></div>
              <div class="bg-particles"></div>
              <div class="bg-glow"></div>
          </div>
              `;
  },
  init: function() {
      initTrainingsSection();
      function initTrainingsSection() {
          const trainingsSection = document.getElementById("trainings");
          if (!trainingsSection) return;
          setupFilterButtons();
          setupTrainingCards();
          applyCardEffects();
        }
        function setupFilterButtons() {
          const filterButtons = document.querySelectorAll(".filter-btn");
          const trainingCards = document.querySelectorAll(".training-card");
          if (filterButtons.length > 0) {
              filterButtons.forEach((btn) => {
                  btn.addEventListener("click", function () {
                      filterButtons.forEach((b) => b.classList.remove("active"));
                      this.classList.add("active");
                      const filterValue = this.getAttribute("data-filter");
                      filterTrainingCards(filterValue);
                  });
              });
          }
          function filterTrainingCards(filterValue) {
              const trainingCards = document.querySelectorAll(".training-card");
              let visibleCount = 0;
              trainingCards.forEach((card, index) => {
                  const category = card.getAttribute("data-category");
                  if (filterValue === "all" || category === filterValue) {
                      card.style.display = "flex";
                      card.style.opacity = "0";
                      card.style.transform = "translateY(2vh)";
                      setTimeout(() => {
                          card.style.opacity = "1";
                          card.style.transform = "translateY(0)";
                      }, visibleCount * 50);
                      visibleCount++;
                  } else {
                      card.style.opacity = "0";
                      card.style.transform = "translateY(2vh)";
                      setTimeout(() => {
                          card.style.display = "none";
                      }, 300);
                  }
              });
          }
        }
        function setupTrainingCards() {
          const trainingCards = document.querySelectorAll(".training-card");
          trainingCards.forEach((card) => {
              card.addEventListener("click", function () {
                  const title = this.querySelector("h3").textContent;
                  const description = this.querySelector("p").textContent;
                  const icon = this.querySelector(".training-icon i").className;
                  const details = Array.from(
                      this.querySelectorAll(".training-details span")
                  ).map((span) => span.textContent);
                  createTrainingModal(title, description, details[0] || "2023", icon);
              });
          });
        }
        function createTrainingModal(title, description, date, iconClass) {
          const existingModal = document.querySelector(".training-modal");
          if (existingModal) {
              existingModal.remove();
          }
          const keywords = [
              "Concepts",
              "Techniques",
              "Applications",
              "Implementation",
              "Practices",
              "Optimization",
          ];
          const topics = [
              `Introduction to ${title} Concepts`,
              `Practical Applications in ${title}`,
              `Technical Implementation Strategies`,
              `Best Practices for ${title}`,
              `Advanced Techniques and Methods`,
              `Real-world Examples and Case Studies`,
          ];
          const skills = [
              "Problem Solving",
              "Technical Communication",
              "Analytical Thinking",
              "Project Management",
              "Critical Analysis",
              "Team Collaboration",
          ];
          const modal = document.createElement("div");
          modal.className = "training-modal";
          modal.innerHTML = `
        <div class="training-modal-content">
          <button class="modal-close-btn">&times;</button>
          <div class="training-modal-header">
            <h3>${title}</h3>
            <div class="training-modal-provider">
              <div class="modal-provider-logo">
                <i class="${iconClass}"></i>
              </div>
              <div class="modal-provider-info">
                <div class="modal-provider-name">Professional Training</div>
                <div class="modal-training-date">${date}</div>
              </div>
            </div>
            <div class="training-modal-details">
              <div class="modal-training-detail">
                <i class="fas fa-calendar-alt"></i>
                <span>${date}</span>
              </div>
              <div class="modal-training-detail">
                <i class="fas fa-clock"></i>
                <span>40 Hours</span>
              </div>
              <div class="modal-training-detail">
                <i class="fas fa-signal"></i>
                <span>Intermediate Level</span>
              </div>
            </div>
          </div>
          <div class="training-modal-body">
            <h4>About This Training</h4>
            <p>${description}</p>
            <p>This comprehensive training program combines theoretical knowledge with practical application, providing participants with the skills needed to excel in real-world scenarios.</p>
          </div>
          <div class="training-topics">
            <h4 class="topics-title">Topics Covered</h4>
            <div class="topics-list">
              ${topics
                  .map(
                      (topic) => `
                <div class="topic-card">
                  <h5>${topic}</h5>
                  <p>In-depth exploration with practical examples and guided exercises.</p>
                </div>
              `
                  )
                  .join("")}
            </div>
          </div>
          <div class="training-modal-skills">
            <h4 class="skills-title">Skills Gained</h4>
            <div class="modal-skills-list">
              ${skills
                  .map((skill) => `<span class="modal-skill">${skill}</span>`)
                  .join("")}
            </div>
          </div>
          <div class="training-modal-footer">
            <button class="training-action-btn">
              <i class="fas fa-certificate"></i>
              <span>View Certificate</span>
            </button>
            <div class="training-share">
              <span class="training-share-btn" aria-label="Share on LinkedIn"><i class="fab fa-linkedin"></i></span>
              <span class="training-share-btn" aria-label="Share on Twitter"><i class="fab fa-twitter"></i></span>
              <span class="training-share-btn" aria-label="Share via Email"><i class="far fa-envelope"></i></span>
            </div>
          </div>
        </div>
        `;
          document.body.appendChild(modal);
          setTimeout(() => {
              modal.classList.add("active");
          }, 10);
          const closeBtn = modal.querySelector(".modal-close-btn");
          closeBtn.addEventListener("click", () => {
              modal.classList.remove("active");
              setTimeout(() => {
                  modal.remove();
              }, 500);
          });
          modal.addEventListener("click", (e) => {
              if (e.target === modal) {
                  modal.classList.remove("active");
                  setTimeout(() => {
                      modal.remove();
                  }, 500);
              }
          });
          document.addEventListener("keydown", function (e) {
              if (e.key === "Escape") {
                  modal.classList.remove("active");
                  setTimeout(() => {
                      modal.remove();
                  }, 500);
              }
          });
        }
        function applyCardEffects() {
          const trainingCards = document.querySelectorAll(".training-card");
          trainingCards.forEach((card) => {
              card.addEventListener("mousemove", function (e) {
                  const cardRect = this.getBoundingClientRect();
                  const x = e.clientX - cardRect.left;
                  const y = e.clientY - cardRect.top;
                  const centerX = cardRect.width / 2;
                  const centerY = cardRect.height / 2;
                  const deltaX = (x - centerX) / centerX;
                  const deltaY = (y - centerY) / centerY;
                  this.style.transform = `perspective(100vh) rotateX(${
                      -deltaY * 10
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
              circle at ${(x / cardRect.width) * 100}% ${
                      (y / cardRect.height) * 100
                  }%, 
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
          });
        }
  }
};
