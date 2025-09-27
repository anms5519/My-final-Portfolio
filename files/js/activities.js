window.ActivitiesContent = {
    getHTML: function () {
        return `
            <div class="container">
                <h2 class="section-title" data-aos="fade-right">
                    <span class="title-icon"><i class="fas fa-users"></i></span>
                    <span class="title-text"
                        >Extracurricular
                        <span class="accent-text">Activities</span></span
                    >
                    <div class="title-particles"></div>
                </h2>
                <div
                    class="activities-intro"
                    data-aos="fade-up"
                    data-aos-delay="100"
                >
                    <p>
                        Leadership roles, volunteering experiences, and
                        extracurricular involvement that have shaped my personal
                        and professional growth.
                    </p>
                </div>
                <div class="legendary-indicator">
                    <span class="pulse-dot"></span>
                    <span class="indicator-text">Legendary Engagements</span>
                </div>
                <div
                    class="activities-search-bar floating-panel"
                    data-aos="fade-up"
                    data-aos-delay="150"
                >
                    <div class="search-container">
                        <input
                            type="text"
                            id="activity-search"
                            placeholder="Search activities..."
                        />
                        <i class="fas fa-search"></i>
                        <div class="search-glow"></div>
                    </div>
                    <div class="filter-container">
                        <select id="activity-filter">
                            <option value="all">All Activities</option>
                            <option value="leadership">Leadership</option>
                            <option value="design">Design</option>
                            <option value="coordination">Coordination</option>
                            <option value="member">Membership</option>
                        </select>
                        <div class="select-arrow">
                            <i class="fas fa-chevron-down"></i>
                        </div>
                    </div>
                </div>
                <div
                    class="activities-tabs"
                    data-aos="fade-up"
                    data-aos-delay="200"
                >
                    <button class="tab-btn active" data-tab="leadership">
                        <i class="fas fa-crown"></i>
                        <span>Leadership & Volunteering</span>
                        <div class="btn-glow"></div>
                    </button>
                    <button class="tab-btn" data-tab="tech">
                        <i class="fas fa-laptop-code"></i>
                        <span>Tech & Creative</span>
                        <div class="btn-glow"></div>
                    </button>
                    <button class="tab-btn" data-tab="sports">
                        <i class="fas fa-running"></i>
                        <span>Sports & Athletics</span>
                        <div class="btn-glow"></div>
                    </button>
                </div>
                <div class="activities-content">
                    <div
                        class="tab-content active"
                        id="leadership"
                        data-aos="fade-up"
                        data-aos-delay="300"
                    >
                        <div class="activities-grid">
                            <div
                                class="activity-card"
                                data-aos="fade-right"
                                data-aos-delay="100"
                                data-activity-type="leadership"
                                data-activity-search="adamjee eco amica club aeac president environmental awareness eco-friendly sustainability"
                            >
                                <div class="activity-header">
                                    <div class="activity-icon">
                                        <i class="fas fa-leaf"></i>
                                    </div>
                                    <div class="activity-meta">
                                        <h3>Adamjee Eco Amica Club (AEAC)</h3>
                                        <span class="activity-role"
                                            >President</span
                                        >
                                        <span class="activity-duration"
                                            ><i class="far fa-calendar-alt"></i>
                                            2019-2020</span
                                        >
                                    </div>
                                </div>
                                <div class="activity-body">
                                    <p>
                                        Led environmental awareness initiatives,
                                        coordinated eco-friendly projects, and
                                        organized events to promote
                                        sustainability.
                                    </p>
                                </div>
                            </div>
                            <div
                                class="activity-card"
                                data-aos="fade-right"
                                data-aos-delay="200"
                                data-activity-type="design"
                                data-activity-search="leo club dhaka mega city graphics designer promotional materials events initiatives posters banners digital content"
                            >
                                <div class="activity-header">
                                    <div class="activity-icon">
                                        <i class="fas fa-palette"></i>
                                    </div>
                                    <div class="activity-meta">
                                        <h3>Leo Club of Dhaka Mega City</h3>
                                        <span class="activity-role"
                                            >Graphics Designer</span
                                        >
                                        <span class="activity-duration"
                                            ><i class="far fa-calendar-alt"></i>
                                            2022-2023</span
                                        >
                                    </div>
                                </div>
                                <div class="activity-body">
                                    <p>
                                        Designed promotional materials for the
                                        club's events and initiatives, including
                                        posters, banners, and digital content.
                                    </p>
                                </div>
                            </div>
                            <div
                                class="activity-card"
                                data-aos="fade-right"
                                data-aos-delay="300"
                                data-activity-type="leadership"
                                data-activity-search="vantage it limited uttara treasurer finances budget planning funds club activities events"
                            >
                                <div class="activity-header">
                                    <div class="activity-icon">
                                        <i class="fas fa-coins"></i>
                                    </div>
                                    <div class="activity-meta">
                                        <h3>Vantage IT Limited, Uttara</h3>
                                        <span class="activity-role"
                                            >Treasurer</span
                                        >
                                        <span class="activity-duration"
                                            ><i class="far fa-calendar-alt"></i>
                                            2022-2023</span
                                        >
                                    </div>
                                </div>
                                <div class="activity-body">
                                    <p>
                                        Managed club finances, handled budget
                                        planning, and ensured the allocation of
                                        funds for various club activities and
                                        events.
                                    </p>
                                </div>
                            </div>
                            <div class="activity-card">
                                <div class="activity-header">
                                    <div class="activity-icon">
                                        <i class="fas fa-broom"></i>
                                    </div>
                                    <div class="activity-meta">
                                        <h3>BD Clean, Dhaka</h3>
                                        <span class="activity-role"
                                            >Event Coordinator</span
                                        >
                                        <span class="activity-duration"
                                            ><i class="far fa-calendar-alt"></i>
                                            2021-2022</span
                                        >
                                    </div>
                                </div>
                                <div class="activity-body">
                                    <p>
                                        Organized community clean-up events,
                                        awareness campaigns on waste management,
                                        and environmental education programs.
                                    </p>
                                </div>
                            </div>
                            <div class="activity-card">
                                <div class="activity-header">
                                    <div class="activity-icon">
                                        <i class="fas fa-pencil-alt"></i>
                                    </div>
                                    <div class="activity-meta">
                                        <h3>ADUST Prothom Alo Bandhu Sabha</h3>
                                        <span class="activity-role"
                                            >Graphics Designer</span
                                        >
                                        <span class="activity-duration"
                                            ><i class="far fa-calendar-alt"></i>
                                            2023-2024</span
                                        >
                                    </div>
                                </div>
                                <div class="activity-body">
                                    <p>
                                        Designed marketing materials for the
                                        club's publications and events,
                                        including flyers, brochures, and social
                                        media posts.
                                    </p>
                                </div>
                            </div>
                            <div class="activity-card">
                                <div class="activity-header">
                                    <div class="activity-icon">
                                        <i class="fas fa-users"></i>
                                    </div>
                                    <div class="activity-meta">
                                        <h3>ADUST Shomokal Shuhud</h3>
                                        <span class="activity-role"
                                            >Member</span
                                        >
                                        <span class="activity-duration"
                                            ><i class="far fa-calendar-alt"></i>
                                            2024-2025</span
                                        >
                                    </div>
                                </div>
                                <div class="activity-body">
                                    <p>
                                        Participated in discussions, cultural
                                        activities, and initiatives to support
                                        the development of student welfare and
                                        communication.
                                    </p>
                                </div>
                            </div>
                            <div class="activity-card">
                                <div class="activity-header">
                                    <div class="activity-icon">
                                        <i
                                            class="fas fa-hand-holding-heart"
                                        ></i>
                                    </div>
                                    <div class="activity-meta">
                                        <h3>
                                            Social Environment and Human Rights
                                            Implementation Agency
                                        </h3>
                                        <span class="activity-role"
                                            >General Secretary</span
                                        >
                                        <span class="activity-duration"
                                            ><i class="far fa-calendar-alt"></i>
                                            2023-2024</span
                                        >
                                    </div>
                                </div>
                                <div class="activity-body">
                                    <p>
                                        Coordinated activities for human rights
                                        advocacy, managing events and helping to
                                        create awareness programs on social
                                        issues.
                                    </p>
                                </div>
                            </div>
                            <div class="activity-card">
                                <div class="activity-header">
                                    <div class="activity-icon">
                                        <i class="fas fa-landmark"></i>
                                    </div>
                                    <div class="activity-meta">
                                        <h3>Bangabandhu Parishad, Tejgaon</h3>
                                        <span class="activity-role"
                                            >Member</span
                                        >
                                        <span class="activity-duration"
                                            ><i class="far fa-calendar-alt"></i>
                                            Ongoing</span
                                        >
                                    </div>
                                </div>
                                <div class="activity-body">
                                    <p>
                                        Contributed to initiatives that promote
                                        Bangabandhu's legacy and engage in
                                        activities related to national
                                        development and history.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div
                        class="tab-content"
                        id="tech"
                        data-aos="fade-up"
                        data-aos-delay="300"
                    >
                        <div class="activities-grid">
                            <div
                                class="activity-card"
                                data-aos="fade-right"
                                data-aos-delay="100"
                            >
                                <div class="activity-header">
                                    <div class="activity-icon">
                                        <i class="fas fa-laptop-code"></i>
                                    </div>
                                    <div class="activity-meta">
                                        <h3>ACC Coding Club</h3>
                                        <span class="activity-role"
                                            >Organizer</span
                                        >
                                    </div>
                                </div>
                                <div class="activity-body">
                                    <p>
                                        Organized weekly coding competitions and
                                        hackathons, facilitating learning
                                        sessions for coding enthusiasts and
                                        beginners.
                                    </p>
                                </div>
                            </div>
                            <div
                                class="activity-card"
                                data-aos="fade-right"
                                data-aos-delay="200"
                            >
                                <div class="activity-header">
                                    <div class="activity-icon">
                                        <i class="fas fa-code"></i>
                                    </div>
                                    <div class="activity-meta">
                                        <h3>ADUST Programming Club</h3>
                                        <span class="activity-role"
                                            >Member</span
                                        >
                                    </div>
                                </div>
                                <div class="activity-body">
                                    <p>
                                        Led coding workshops and hackathons to
                                        help students enhance their programming
                                        skills and prepare for technical
                                        challenges.
                                    </p>
                                </div>
                            </div>
                            <div class="activity-card">
                                <div class="activity-header">
                                    <div class="activity-icon">
                                        <i class="fas fa-camera"></i>
                                    </div>
                                    <div class="activity-meta">
                                        <h3>ACC Photography Club</h3>
                                        <span class="activity-role"
                                            >Member</span
                                        >
                                    </div>
                                </div>
                                <div class="activity-body">
                                    <p>
                                        Captured moments during campus events,
                                        organized exhibitions, and contributed
                                        to the club's online content and
                                        gallery.
                                    </p>
                                </div>
                            </div>
                            <div class="activity-card">
                                <div class="activity-header">
                                    <div class="activity-icon">
                                        <i class="fas fa-music"></i>
                                    </div>
                                    <div class="activity-meta">
                                        <h3>ACC Cultural Club</h3>
                                        <span class="activity-role"
                                            >Member</span
                                        >
                                    </div>
                                </div>
                                <div class="activity-body">
                                    <p>
                                        Participated in cultural events,
                                        performing arts, and events that
                                        celebrate local and international
                                        cultural diversity.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div
                        class="tab-content"
                        id="sports"
                        data-aos="fade-up"
                        data-aos-delay="300"
                    >
                        <div class="activities-grid">
                            <div
                                class="activity-card"
                                data-aos="fade-right"
                                data-aos-delay="100"
                            >
                                <div class="activity-header">
                                    <div class="activity-icon">
                                        <i class="fas fa-futbol"></i>
                                    </div>
                                    <div class="activity-meta">
                                        <h3>ADUST Football Club</h3>
                                        <span class="activity-role"
                                            >Sporting Director</span
                                        >
                                    </div>
                                </div>
                                <div class="activity-body">
                                    <p>
                                        Managed team strategies, coordinated
                                        practice sessions, and handled logistics
                                        for matches and tournaments.
                                    </p>
                                </div>
                            </div>
                            <div
                                class="activity-card"
                                data-aos="fade-right"
                                data-aos-delay="200"
                            >
                                <div class="activity-header">
                                    <div class="activity-icon">
                                        <i class="fas fa-table-tennis"></i>
                                    </div>
                                    <div class="activity-meta">
                                        <h3>Badminton Team</h3>
                                        <span class="activity-role"
                                            >Active Member</span
                                        >
                                    </div>
                                </div>
                                <div class="activity-body">
                                    <p>
                                        Participated in local badminton
                                        tournaments and intramural matches,
                                        contributing to team victories and
                                        fostering team spirit.
                                    </p>
                                </div>
                            </div>
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
    init: function () {
        initializeActivitiesSection();
        enrichActivityCards();
        function initializeActivitiesSection() {
            const activityTabs = document.querySelectorAll(".tab-btn");
            const tabContents = document.querySelectorAll(".tab-content");
            if (activityTabs.length > 0) {
                activityTabs.forEach((tab) => {
                    tab.addEventListener("click", function () {
                        activityTabs.forEach((t) =>
                            t.classList.remove("active")
                        );
                        this.classList.add("active");
                        const tabId = this.getAttribute("data-tab");
                        tabContents.forEach((content) => {
                            content.classList.remove("active");
                        });
                        const targetContent = document.getElementById(tabId);
                        if (targetContent) {
                            targetContent.classList.add("active");
                        }
                    });
                });
            }
            const activityFilter = document.getElementById("activity-filter");
            const activityCards = document.querySelectorAll(".activity-card");
            if (activityFilter) {
                activityFilter.addEventListener("change", function () {
                    const filterValue = this.value;
                    activityCards.forEach((card) => {
                        if (
                            filterValue === "all" ||
                            card.getAttribute("data-activity-type") ===
                                filterValue
                        ) {
                            card.style.display = "block";
                        } else {
                            card.style.display = "none";
                        }
                    });
                });
            }
            const searchInput = document.getElementById("activity-search");
            if (searchInput) {
                searchInput.addEventListener("input", function () {
                    const searchValue = this.value.toLowerCase();
                    if (searchValue.length === 0) {
                        const currentFilter = activityFilter
                            ? activityFilter.value
                            : "all";
                        activityCards.forEach((card) => {
                            if (
                                currentFilter === "all" ||
                                card.getAttribute("data-activity-type") ===
                                    currentFilter
                            ) {
                                card.style.display = "block";
                            } else {
                                card.style.display = "none";
                            }
                        });
                    } else {
                        activityCards.forEach((card) => {
                            const activityText =
                                card.getAttribute("data-activity-search") ||
                                card.textContent.toLowerCase();
                            if (activityText.includes(searchValue)) {
                                card.style.display = "block";
                            } else {
                                card.style.display = "none";
                            }
                        });
                    }
                });
            }
            const animateCards = () => {
                activityCards.forEach((card, index) => {
                    setTimeout(() => {
                        card.classList.add("animated");
                    }, index * 100);
                });
            };
            const activitiesSection = document.querySelector(
                ".activities-section"
            );
            if (activitiesSection) {
                const observer = new IntersectionObserver(
                    (entries) => {
                        entries.forEach((entry) => {
                            if (entry.isIntersecting) {
                                animateCards();
                                observer.unobserve(entry.target);
                            }
                        });
                    },
                    { threshold: 0.1 }
                );
                observer.observe(activitiesSection);
            }
        }
        function enrichActivityCards() {
            const activityCards = document.querySelectorAll(
                ".activity-card:not([data-activity-search])"
            );
            activityCards.forEach((card) => {
                const title = card.querySelector("h3")?.textContent || "";
                const role =
                    card.querySelector(".activity-role")?.textContent || "";
                const description =
                    card.querySelector(".activity-body p")?.textContent || "";
                const searchText = `${title} ${role} ${description}`.toLowerCase();
                card.setAttribute("data-activity-search", searchText);
            });
        }
    },
};