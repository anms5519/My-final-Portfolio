window.GalleryContent = {
    getHTML: function () {
        return `
            <div class="container">
                <h2 class="gallery-title" data-aos="fade-up">
                    Lifestyle Gallery
                </h2>
                <div
                    class="gallery-subtitle"
                    data-aos="fade-up"
                    data-aos-delay="100"
                >
                    Glimpses into my life beyond the code
                </div>
                <div
                    class="gallery-controls"
                    data-aos="fade-up"
                    data-aos-delay="200"
                >
                    <div class="gallery-search">
                        <i class="fas fa-search"></i>
                        <input
                            type="text"
                            placeholder="Search gallery..."
                            id="gallery-search"
                        />
                    </div>
                    <div class="gallery-view-options">
                        <button class="view-option-btn active" data-view="grid">
                            <i class="fas fa-th"></i>
                        </button>
                        <button class="view-option-btn" data-view="masonry">
                            <i class="fas fa-th-large"></i>
                        </button>
                        <button class="view-option-btn" data-view="list">
                            <i class="fas fa-list"></i>
                        </button>
                    </div>
                </div>
                <div
                    class="gallery-filter"
                    data-aos="fade-up"
                    data-aos-delay="300"
                >
                    <div class="filter-tag active" data-filter="all">
                        <i class="fas fa-th-large"></i> All
                    </div>
                    <div class="filter-tag" data-filter="education">
                        <i class="fas fa-graduation-cap"></i> Education
                    </div>
                    <div class="filter-tag" data-filter="friends">
                        <i class="fas fa-users"></i> Friends
                    </div>
                    <div class="filter-tag" data-filter="events">
                        <i class="fas fa-calendar-alt"></i> Events
                    </div>
                    <div class="filter-tag" data-filter="presentations">
                        <i class="fas fa-chalkboard-teacher"></i> Presentations
                    </div>
                    <div class="filter-tag" data-filter="sports">
                        <i class="fas fa-running"></i> Sports
                    </div>
                    <div class="filter-tag" data-filter="travel">
                        <i class="fas fa-plane"></i> Travel
                    </div>
                </div>
                <div
                    class="gallery-grid"
                    data-aos="fade-up"
                    data-aos-delay="400"
                >
                </div>
                <div class="gallery-empty-state" style="display: none">
                    <i class="fas fa-search"></i>
                    <p>No items match your search criteria</p>
                    <button class="filter-tag active" data-filter="all">
                        <i class="fas fa-th-large"></i> Show All
                    </button>
                </div>
                <button
                    class="gallery-load-more"
                    data-aos="fade-up"
                    data-aos-delay="500"
                >
                    Load More
                    <i class="fas fa-arrow-down"></i>
                </button>
            </div>
            <div id="gallery-lightbox-modal" class="gallery-lightbox-modal">
                <div class="lightbox-wrapper">
                    <button
                        class="gallery-close"
                        aria-label="Close"
                        onclick="window.closeLightbox && window.closeLightbox()"
                    >
                        <i class="fas fa-times"></i>
                    </button>
                    <div class="gallery-modal-content">
                        <div class="lightbox-loading">
                            <div class="spinner-wrapper">
                                <div class="spinner"></div>
                            </div>
                        </div>
                        <div class="immersive-header">
                            <h3 id="gallery-caption-title">
                                Immersive Gallery Experience
                            </h3>
                        </div>
                        <div class="immersive-content">
                            <div class="immersive-image-container">
                                <img
                                    src="#"
                                    alt="Gallery image"
                                    id="gallery-modal-img"
                                    class="immersive-image"
                                />
                                <div class="image-controls">
                                    <button
                                        id="gallery-prev"
                                        class="image-control prev-image"
                                    >
                                        <i class="fas fa-chevron-left"></i>
                                    </button>
                                    <button
                                        id="gallery-next"
                                        class="image-control next-image"
                                    >
                                        <i class="fas fa-chevron-right"></i>
                                    </button>
                                </div>
                            </div>
                            <div class="immersive-info">
                                <p
                                    id="gallery-caption-description"
                                    class="immersive-description"
                                >
                                    Image description will appear here.
                                </p>
                                <div class="immersive-metadata">
                                    <div class="metadata-item">
                                        <i class="fas fa-calendar-alt"></i>
                                        <span class="metadata-value date-taken"
                                            >Date:
                                            <span id="image-date">-</span></span
                                        >
                                    </div>
                                    <div class="metadata-item">
                                        <i class="fas fa-camera"></i>
                                        <span class="metadata-value camera-info"
                                            >Category:
                                            <span id="image-category"
                                                >-</span
                                            ></span
                                        >
                                    </div>
                                    <div class="metadata-item">
                                        <i class="fas fa-image"></i>
                                        <span class="metadata-value"
                                            >Photo
                                            <span id="gallery-current">1</span>
                                            of
                                            <span id="gallery-total"
                                                >1</span
                                            ></span
                                        >
                                    </div>
                                </div>
                                <div class="immersive-ai-analysis">
                                    <h4>
                                        <i class="fas fa-robot"></i> AI Vision
                                        Analysis
                                    </h4>
                                    <div class="analysis-tags"></div>
                                    <div class="analysis-insights"></div>
                                </div>
                            </div>
                        </div>
                        <div class="immersive-thumbnails"></div>
                    </div>
                </div>
            </div>
                `;
    },
    init: function () {
        initUltraGallery();
        if (
            document.readyState === "interactive" ||
            document.readyState === "complete"
        ) {
            initUltraGallery();
        }
        function initUltraGallery() {
            const gallerySection = document.getElementById("gallery");
            if (!gallerySection) return;
            const galleryData = [
                {
                    id: 1,
                    title: "School Memories",
                    description: "Early education journey",
                    image: "images/gallery/school (3).jpg",
                    category: "education",
                    date: "2020-05-15",
                },
                {
                    id: 2,
                    title: "College Days",
                    description: "Learning and growing",
                    image: "images/gallery/jh.jpg",
                    category: "education",
                    date: "2021-03-20",
                },
                {
                    id: 3,
                    title: "University Life",
                    description: "Higher education",
                    image: "images/gallery/university (1).jpeg",
                    category: "education",
                    date: "2022-02-10",
                },
                {
                    id: 4,
                    title: "Public Speaking",
                    description: "Presenting with confidence",
                    image: "images/gallery/publicspeaking (1).jpg",
                    category: "presentations",
                    date: "2021-11-05",
                },
                {
                    id: 5,
                    title: "Sports Achievement",
                    description: "Athletic excellence",
                    image: "images/gallery/awards (5).jpg",
                    category: "sports",
                    date: "2020-08-18",
                },
                {
                    id: 6,
                    title: "Extracurricular Club",
                    description: "Beyond the classroom",
                    image: "images/gallery/extracurricular (5).jpg",
                    category: "education",
                    date: "2021-04-12",
                },
                {
                    id: 7,
                    title: "Tour Adventures",
                    description: "Exploring new places",
                    image: "images/gallery/lol (4).jpg",
                    category: "travel",
                    date: "2022-07-22",
                },
                {
                    id: 8,
                    title: "School Friends",
                    description: "Childhood companions",
                    image: "images/gallery/lol (5).jpg",
                    category: "friends",
                    date: "2019-09-10",
                },
                {
                    id: 9,
                    title: "Coding Competition",
                    description: "Academic excellence",
                    image: "images/gallery/mp.jpg",
                    category: "education",
                    date: "2021-12-01",
                },
                {
                    id: 10,
                    title: "University Presentation",
                    description: "Research showcase",
                    image: "images/gallery/IMG-20241105-WA0001.jpg",
                    category: "presentations",
                    date: "2023-03-15",
                },
                {
                    id: 11,
                    title: "Sports Tournament",
                    description: "Team championship",
                    image: "images/gallery/sport (2).jpg",
                    category: "sports",
                    date: "2022-06-10",
                },
                {
                    id: 12,
                    title: "Educational Tour",
                    description: "Learning excursion",
                    image: "images/gallery/college (2).jpg",
                    category: "education",
                    date: "2020-10-05",
                },
                {
                    id: 13,
                    title: "Debate Competition",
                    description: "Public speaking skills",
                    image: "images/gallery/publicspeaking (3).jpg",
                    category: "presentations",
                    date: "2021-05-20",
                },
                {
                    id: 14,
                    title: "Science Fair",
                    description: "Innovation display",
                    image: "images/gallery/training (3).jpg",
                    category: "education",
                    date: "2022-01-25",
                },
                {
                    id: 15,
                    title: "Cultural Program",
                    description: "Celebrating diversity",
                    image: "images/gallery/extracurricular (1).jpg",
                    category: "events",
                    date: "2021-09-30",
                },
                {
                    id: 16,
                    title: "College Graduation",
                    description: "Achievement milestone",
                    image: "images/gallery/fdf.jpg",
                    category: "education",
                    date: "2023-02-28",
                },
                {
                    id: 17,
                    title: "Sports Day",
                    description: "Athletic competitions",
                    image: "images/gallery/aportday.jpg",
                    category: "sports",
                    date: "2020-12-12",
                },
                {
                    id: 18,
                    title: "Field Trip",
                    description: "Outdoor learning",
                    image: "images/gallery/145.jpg",
                    category: "education",
                    date: "2021-08-14",
                },
                {
                    id: 19,
                    title: "University Friends",
                    description: "Academic companions",
                    image: "images/gallery/555.jpg",
                    category: "friends",
                    date: "2022-03-18",
                },
                {
                    id: 20,
                    title: "Speech Competition",
                    description: "Oratorical excellence",
                    image: "images/gallery/sp.jpg",
                    category: "presentations",
                    date: "2021-10-22",
                },
                {
                    id: 21,
                    title: "Academic Workshop",
                    description: "Specialized training",
                    image: "images/gallery/lol (2).jpg",
                    category: "education",
                    date: "2022-05-11",
                },
                {
                    id: 22,
                    title: "Adventure Tour",
                    description: "Exploring nature",
                    image: "images/gallery/place (8).jpg",
                    category: "travel",
                    date: "2023-01-19",
                },
                {
                    id: 23,
                    title: "Public speaking",
                    description: "Stage talent",
                    image: "images/gallery/lok.jpg",
                    category: "presentations",
                    date: "2021-07-07",
                },
                {
                    id: 24,
                    title: "College Festival",
                    description: "Campus celebration",
                    image: "images/gallery/IMG-20240623-WA0001.jpg",
                    category: "events",
                    date: "2022-11-03",
                },
                {
                    id: 25,
                    title: "University Conference",
                    description: "Academic discourse",
                    image: "images/gallery/conp.jpg",
                    category: "events",
                    date: "2023-04-09",
                },
                {
                    id: 26,
                    title: "Team Sports",
                    description: "Collaborative athletics",
                    image: "images/gallery/sport (2).jpg",
                    category: "sports",
                    date: "2021-06-16",
                },
                {
                    id: 27,
                    title: "Class Project",
                    description: "Collaborative learning",
                    image: "images/gallery/lol (8).jpg",
                    category: "education",
                    date: "2022-09-21",
                },
                {
                    id: 28,
                    title: "Historic Tour",
                    description: "Cultural exploration",
                    image: "images/gallery/place (7).jpg",
                    category: "travel",
                    date: "2021-03-29",
                },
                {
                    id: 29,
                    title: "Leadership Camp",
                    description: "Developing potential",
                    image: "images/gallery/df.jpg",
                    category: "events",
                    date: "2022-08-17",
                },
            ];
            initializeGallery(galleryData);
            setupGalleryControls();
            setupSearchFunctionality();
            setupFilterSystem();
            setupViewModes();
            setupSortingOptions();
            setupLazyLoading();
            setupLightbox(galleryData);
            setupFavoritesSystem();
        }
        function initializeGallery(data) {
            const galleryGrid = document.querySelector(".gallery-grid");
            if (!galleryGrid) return;
            addSortControls();
            galleryGrid.innerHTML = "";
            data.forEach((item, index) => {
                const itemElement = document.createElement("div");
                itemElement.className = "gallery-item";
                itemElement.dataset.category = item.category;
                itemElement.dataset.id = item.id;
                itemElement.style.animationDelay = `${index * 0.05}s`;
                const favorites = getFavorites();
                if (favorites.includes(item.id)) {
                    itemElement.classList.add("favorited");
                }
                itemElement.innerHTML = `
                    <img src="${item.image}" alt="${
                    item.title
                }" class="gallery-img" loading="lazy">
                    <div class="gallery-info">
                        <h3 class="gallery-title">${item.title}</h3>
                        <p class="gallery-description">${item.description}</p>
                        <div class="gallery-meta">
                            <span class="gallery-date">${formatDate(
                                item.date
                            )}</span>
                            <div class="gallery-actions">
                                <button class="gallery-action-btn like-btn ${
                                    favorites.includes(item.id) ? "liked" : ""
                                }" data-id="${item.id}">
                                    <i class="${
                                        favorites.includes(item.id)
                                            ? "fas"
                                            : "far"
                                    } fa-heart"></i>
                                </button>
                                <button class="gallery-action-btn share-btn" data-id="${
                                    item.id
                                }">
                                    <i class="fas fa-share-alt"></i>
                                </button>
                                <button class="gallery-action-btn download-btn" data-id="${
                                    item.id
                                }">
                                    <i class="fas fa-download"></i>
                                </button>
                            </div>
                        </div>
                    </div>
                `;
                galleryGrid.appendChild(itemElement);
                setTimeout(() => {
                    itemElement.classList.add("visible");
                }, 10);
            });
            updateFilterCounts(data);
        }
        function setupGalleryControls() {
            document.addEventListener("click", function (e) {
                if (e.target.closest(".like-btn")) {
                    const btn = e.target.closest(".like-btn");
                    btn.classList.toggle("liked");
                    const icon = btn.querySelector("i");
                    icon.classList.toggle("far");
                    icon.classList.toggle("fas");
                }
            });
            document.addEventListener("click", function (e) {
                if (e.target.closest(".share-btn")) {
                    const btn = e.target.closest(".share-btn");
                    const itemId = btn.dataset.id;
                    shareGalleryItem(itemId);
                }
            });
        }
        function setupSearchFunctionality() {
            const searchInput = document.querySelector(".gallery-search input");
            if (!searchInput) return;
            searchInput.addEventListener(
                "input",
                debounce(function (e) {
                    const searchTerm = e.target.value.toLowerCase();
                    filterGalleryItems(searchTerm);
                }, 300)
            );
        }
        function setupFilterSystem() {
            const filterTags = document.querySelectorAll(".filter-tag");
            filterTags.forEach((tag) => {
                tag.addEventListener("click", function () {
                    const category = this.dataset.filter;
                    filterGalleryItems("", category);
                    filterTags.forEach((t) => t.classList.remove("active"));
                    this.classList.add("active");
                });
            });
        }
        function setupViewModes() {
            const viewButtons = document.querySelectorAll(".view-option-btn");
            const galleryGrid = document.querySelector(".gallery-grid");
            if (!galleryGrid || !viewButtons.length) return;
            galleryGrid.classList.add("view-grid");
            viewButtons.forEach((btn) => {
                btn.addEventListener("click", function () {
                    const viewMode = this.dataset.view;
                    viewButtons.forEach((b) => b.classList.remove("active"));
                    this.classList.add("active");
                    galleryGrid.className = "gallery-grid";
                    galleryGrid.classList.add(`view-${viewMode}`);
                });
            });
        }
        function filterGalleryItems(searchTerm = "", category = "all") {
            const items = document.querySelectorAll(".gallery-item");
            let visibleCount = 0;
            items.forEach((item) => {
                const itemTitle = item
                    .querySelector(".gallery-title")
                    .textContent.toLowerCase();
                const itemDescription = item
                    .querySelector(".gallery-description")
                    .textContent.toLowerCase();
                const itemCategory = item.dataset.category;
                const matchesSearch =
                    searchTerm === "" ||
                    itemTitle.includes(searchTerm) ||
                    itemDescription.includes(searchTerm);
                const matchesCategory =
                    category === "all" || itemCategory === category;
                const matchesFavorites =
                    category === "favorites"
                        ? item.classList.contains("favorited")
                        : true;
                if (matchesSearch && matchesCategory && matchesFavorites) {
                    item.style.display = "";
                    visibleCount++;
                } else {
                    item.style.display = "none";
                }
            });
            const emptyState = document.querySelector(".gallery-empty-state");
            if (emptyState) {
                if (visibleCount === 0) {
                    emptyState.style.display = "flex";
                } else {
                    emptyState.style.display = "none";
                }
            }
        }
        function shareGalleryItem(itemId) {
            const item = document.querySelector(
                `.gallery-item[data-id="${itemId}"]`
            );
            if (!item) return;
            const title = item.querySelector(".gallery-title").textContent;
            const description = item.querySelector(".gallery-description")
                .textContent;
            const imageUrl = item.querySelector(".gallery-img").src;
            if (navigator.share) {
                navigator
                    .share({
                        title: title,
                        text: description,
                        url: imageUrl,
                    })
                    .catch(console.error);
            } else {
                const shareUrl = encodeURIComponent(imageUrl);
                const shareText = encodeURIComponent(
                    `${title} - ${description}`
                );
                window.open(
                    `https://twitter.com/intent/tweet?url=${shareUrl}&text=${shareText}`
                );
            }
        }
        function formatDate(dateString) {
            const options = { year: "numeric", month: "long", day: "numeric" };
            return new Date(dateString).toLocaleDateString(undefined, options);
        }
        function debounce(func, wait) {
            let timeout;
            return function executedFunction(...args) {
                const later = () => {
                    clearTimeout(timeout);
                    func(...args);
                };
                clearTimeout(timeout);
                timeout = setTimeout(later, wait);
            };
        }
        function enhanceGalleryUI() {
            const galleryContainer = document.querySelector(
                ".gallery-section .container"
            );
            const controlPanel = document.createElement("div");
            controlPanel.className = "gallery-control-panel";
            controlPanel.innerHTML = `
          <div class="panel-section">
            <h4>View Mode</h4>
            <div class="control-buttons">
              <button class="view-mode-btn active" data-mode="grid"><i class="fas fa-th"></i> Grid</button>
              <button class="view-mode-btn" data-mode="carousel"><i class="fas fa-film"></i> Carousel</button>
            </div>
          </div>
          <div class="panel-section">
            <h4>Effects</h4>
            <div class="effect-sliders">
              <div class="effect-control">
                <label>Depth <span>50%</span></label>
                <input type="range" min="0" max="100" value="50" class="effect-slider" data-effect="depth">
              </div>
              <div class="effect-control">
                <label>Glow <span>30%</span></label>
                <input type="range" min="0" max="100" value="30" class="effect-slider" data-effect="glow">
              </div>
              <div class="effect-control">
                <label>Motion <span>40%</span></label>
                <input type="range" min="0" max="100" value="40" class="effect-slider" data-effect="motion">
              </div>
            </div>
          </div>
          <div class="panel-section">
            <h4>AI Features</h4>
            <div class="ai-toggles">
              <div class="toggle-control">
                <label>Smart Sort</label>
                <label class="switch">
                  <input type="checkbox" checked class="ai-feature" data-feature="smart-sort">
                  <span class="slider round"></span>
                </label>
              </div>
              <div class="toggle-control">
                <label>Auto Enhance</label>
                <label class="switch">
                  <input type="checkbox" class="ai-feature" data-feature="auto-enhance">
                  <span class="slider round"></span>
                </label>
              </div>
              <div class="toggle-control">
                <label>Content Analysis</label>
                <label class="switch">
                  <input type="checkbox" class="ai-feature" data-feature="content-analysis">
                  <span class="slider round"></span>
                </label>
              </div>
            </div>
          </div>
        `;
            galleryContainer.insertBefore(
                controlPanel,
                galleryContainer.querySelector(".lifestyle-collage")
            );
            setupControlListeners(controlPanel);
        }
        function setupControlListeners(panel) {
            const viewButtons = panel.querySelectorAll(".view-mode-btn");
            viewButtons.forEach((btn) => {
                btn.addEventListener("click", function () {
                    viewButtons.forEach((b) => b.classList.remove("active"));
                    this.classList.add("active");
                    const mode = this.getAttribute("data-mode");
                    const galleryElement = document.querySelector(
                        ".lifestyle-collage"
                    );
                    galleryElement.classList.remove(
                        "mode-grid",
                        "mode-masonry",
                        "mode-carousel",
                        "mode-3d"
                    );
                    galleryElement.classList.add(`mode-${mode}`);
                    if (mode === "3d") {
                        setup3DGalleryMode(galleryElement);
                    }
                });
            });
            const effectSliders = panel.querySelectorAll(".effect-slider");
            effectSliders.forEach((slider) => {
                slider.addEventListener("input", function () {
                    const valueDisplay = this.parentElement.querySelector(
                        "span"
                    );
                    valueDisplay.textContent = `${this.value}%`;
                    const effect = this.getAttribute("data-effect");
                    const value = this.value;
                    applyGalleryEffect(effect, value);
                });
            });
            const aiToggles = panel.querySelectorAll(".ai-feature");
            aiToggles.forEach((toggle) => {
                toggle.addEventListener("change", function () {
                    const feature = this.getAttribute("data-feature");
                    const enabled = this.checked;
                    toggleAIFeature(feature, enabled);
                });
            });
        }
        function applyGalleryEffect(effect, value) {
            const galleryItems = document.querySelectorAll(".collage-item");
            galleryItems.forEach((item) => {
                switch (effect) {
                    case "depth":
                        item.style.setProperty(
                            "--item-depth",
                            `${(value / 100) * 50}px`
                        );
                        break;
                    case "glow":
                        item.style.setProperty(
                            "--item-glow",
                            `${(value / 100) * 20}px`
                        );
                        break;
                    case "motion":
                        item.style.setProperty(
                            "--item-motion",
                            `${(value / 100) * 2}`
                        );
                        break;
                }
            });
        }
        function toggleAIFeature(feature, enabled) {
            console.log(
                `AI feature ${feature} ${enabled ? "enabled" : "disabled"}`
            );
            const gallery = document.querySelector(".lifestyle-collage");
            switch (feature) {
                case "smart-sort":
                    if (enabled) {
                        gallery.classList.add("ai-smart-sort");
                        simulateAISort();
                    } else {
                        gallery.classList.remove("ai-smart-sort");
                    }
                    break;
                case "auto-enhance":
                    if (enabled) {
                        gallery.classList.add("ai-auto-enhance");
                        simulateImageEnhancement();
                    } else {
                        gallery.classList.remove("ai-auto-enhance");
                    }
                    break;
                case "content-analysis":
                    if (enabled) {
                        gallery.classList.add("ai-content-analysis");
                        simulateContentAnalysis();
                    } else {
                        gallery.classList.remove("ai-content-analysis");
                    }
                    break;
            }
        }
        function setupAIImageEnhancements() {
            const galleryItems = document.querySelectorAll(".collage-item");
            galleryItems.forEach((item) => {
                const overlay = item.querySelector(".collage-overlay");
                const aiPanel = document.createElement("div");
                aiPanel.className = "ai-analysis-panel";
                aiPanel.innerHTML = `
            <div class="ai-tag">AI Enhanced</div>
            <div class="ai-data hidden">
              <div class="ai-metric">
                <span class="metric-name">Subject</span>
                <span class="metric-value">Portrait</span>
              </div>
              <div class="ai-metric">
                <span class="metric-name">Composition</span>
                <span class="metric-value">Rule of Thirds</span>
              </div>
              <div class="ai-metric">
                <span class="metric-name">Color Mood</span>
                <span class="metric-value">Vibrant</span>
              </div>
            </div>
          `;
                if (overlay) {
                    overlay.appendChild(aiPanel);
                }
            });
        }
        function simulateAISort() {
            const gallery = document.querySelector(".lifestyle-collage");
            const items = Array.from(gallery.querySelectorAll(".collage-item"));
            items.forEach((item) => {
                item.style.transition =
                    "all 0.8s cubic-bezier(0.34, 1.56, 0.64, 1)";
            });
            setTimeout(() => {
                items
                    .sort(() => Math.random() - 0.5)
                    .forEach((item) => {
                        gallery.appendChild(item);
                    });
                const notification = document.createElement("div");
                notification.className = "ai-notification";
                notification.innerHTML = `
            <i class="fas fa-robot"></i>
            <span>AI has optimized gallery arrangement based on visual harmony</span>
          `;
                document.body.appendChild(notification);
                setTimeout(() => {
                    notification.classList.add("show");
                    setTimeout(() => {
                        notification.classList.remove("show");
                        setTimeout(() => {
                            notification.remove();
                        }, 500);
                    }, 3000);
                }, 100);
            }, 1000);
        }
        function simulateImageEnhancement() {
            const galleryItems = document.querySelectorAll(".collage-item");
            galleryItems.forEach((item, index) => {
                setTimeout(() => {
                    const img = item.querySelector("img");
                    if (!img) return;
                    const processingOverlay = document.createElement("div");
                    processingOverlay.className = "processing-overlay";
                    processingOverlay.innerHTML = `
              <div class="processing-spinner"></div>
              <div class="processing-text">AI Enhancing...</div>
            `;
                    item.appendChild(processingOverlay);
                    setTimeout(() => {
                        processingOverlay.remove();
                        img.style.filter =
                            "brightness(1.1) contrast(1.1) saturate(1.2)";
                        const enhancedBadge = document.createElement("div");
                        enhancedBadge.className = "enhanced-badge";
                        enhancedBadge.innerHTML =
                            '<i class="fas fa-magic"></i> Enhanced';
                        item.appendChild(enhancedBadge);
                        setTimeout(() => {
                            enhancedBadge.classList.add("show");
                            setTimeout(() => {
                                enhancedBadge.classList.add("fade");
                                setTimeout(() => {
                                    enhancedBadge.remove();
                                }, 1000);
                            }, 2000);
                        }, 100);
                    }, 1500 + Math.random() * 1000);
                }, index * 300);
            });
        }
        function simulateContentAnalysis() {
            const galleryItems = document.querySelectorAll(".collage-item");
            const possibleTags = [
                "People",
                "Group",
                "Portrait",
                "Landscape",
                "Indoor",
                "Outdoor",
                "Event",
                "Celebration",
                "Education",
                "Sports",
                "Formal",
                "Casual",
            ];
            const possibleScores = [
                "93%",
                "87%",
                "95%",
                "82%",
                "91%",
                "89%",
                "97%",
            ];
            galleryItems.forEach((item, index) => {
                setTimeout(() => {
                    const aiPanel = item.querySelector(".ai-analysis-panel");
                    if (!aiPanel) return;
                    const aiData = aiPanel.querySelector(".ai-data");
                    if (aiData) {
                        aiData.classList.remove("hidden");
                    }
                    const metrics = aiPanel.querySelectorAll(".ai-metric");
                    metrics.forEach((metric) => {
                        const valueElement = metric.querySelector(
                            ".metric-value"
                        );
                        if (valueElement) {
                            valueElement.style.opacity = "0";
                            setTimeout(() => {
                                if (
                                    metric
                                        .querySelector(".metric-name")
                                        .textContent.includes("Subject")
                                ) {
                                    valueElement.textContent =
                                        possibleTags[
                                            Math.floor(
                                                Math.random() *
                                                    possibleTags.length
                                            )
                                        ];
                                } else if (
                                    metric
                                        .querySelector(".metric-name")
                                        .textContent.includes("Composition")
                                ) {
                                    valueElement.textContent = [
                                        "Rule of Thirds",
                                        "Golden Ratio",
                                        "Centered",
                                        "Leading Lines",
                                    ][Math.floor(Math.random() * 4)];
                                } else {
                                    valueElement.textContent = [
                                        "Vibrant",
                                        "Monochrome",
                                        "Warm",
                                        "Cool",
                                        "Neutral",
                                    ][Math.floor(Math.random() * 5)];
                                }
                                valueElement.style.opacity = "1";
                            }, 300);
                        }
                    });
                    const confidenceScore = document.createElement("div");
                    confidenceScore.className = "ai-confidence-score";
                    confidenceScore.innerHTML = `
              <span class="score-label">AI Confidence</span>
              <div class="score-bar">
                <div class="score-fill" style="width: ${
                    possibleScores[
                        Math.floor(Math.random() * possibleScores.length)
                    ]
                }"></div>
              </div>
            `;
                    if (aiData) {
                        aiData.appendChild(confidenceScore);
                        setTimeout(() => {
                            const scoreFill = confidenceScore.querySelector(
                                ".score-fill"
                            );
                            if (scoreFill) {
                                scoreFill.style.transition =
                                    "width 1s cubic-bezier(0.19, 1, 0.22, 1)";
                            }
                        }, 100);
                    }
                }, index * 200);
            });
        }
        function setupMicroInteractions() {
            const galleryItems = document.querySelectorAll(".collage-item");
            galleryItems.forEach((item) => {
                const particlesContainer = document.createElement("div");
                particlesContainer.className = "micro-particles";
                item.appendChild(particlesContainer);
                item.addEventListener("mouseenter", function () {
                    generateParticles(particlesContainer, 15);
                    this.classList.add("pulse-effect");
                    setTimeout(() => {
                        this.classList.remove("pulse-effect");
                    }, 700);
                });
                item.addEventListener("touchstart", function (e) {
                    const rect = this.getBoundingClientRect();
                    const x = e.touches[0].clientX - rect.left;
                    const y = e.touches[0].clientY - rect.top;
                    createRippleEffect(this, x, y);
                });
                item.addEventListener("click", function (e) {
                    const rect = this.getBoundingClientRect();
                    const x = e.clientX - rect.left;
                    const y = e.clientY - rect.top;
                    createRippleEffect(this, x, y);
                });
            });
        }
        function generateParticles(container, count) {
            container.innerHTML = "";
            for (let i = 0; i < count; i++) {
                const particle = document.createElement("div");
                particle.className = "micro-particle";
                const x = Math.random() * 100;
                const y = Math.random() * 100;
                const size = Math.random() * 10 + 5;
                const colors = [
                    "var(--primary-color)",
                    "var(--accent-color)",
                    "var(--secondary-color)",
                ];
                const color = colors[Math.floor(Math.random() * colors.length)];
                const duration = Math.random() * 1 + 0.5;
                particle.style.left = `${x}%`;
                particle.style.top = `${y}%`;
                particle.style.width = `${size}px`;
                particle.style.height = `${size}px`;
                particle.style.backgroundColor = color;
                particle.style.animationDuration = `${duration}s`;
                container.appendChild(particle);
                setTimeout(() => {
                    particle.remove();
                }, duration * 1000);
            }
        }
        function createRippleEffect(element, x, y) {
            const ripple = document.createElement("div");
            ripple.className = "ripple-effect";
            ripple.style.left = x + "px";
            ripple.style.top = y + "px";
            element.appendChild(ripple);
            setTimeout(() => {
                ripple.remove();
            }, 600);
        }
        function initializeImmersiveView() {
            const gallerySection = document.getElementById("gallery");
            const immersiveBtn = document.createElement("button");
            immersiveBtn.className = "immersive-view-btn";
            immersiveBtn.innerHTML =
                '<i class="fas fa-expand"></i> Immersive View';
            gallerySection
                .querySelector(".container")
                .appendChild(immersiveBtn);
            const immersiveContainer = document.getElementById(
                "gallery-lightbox-modal"
            );
            if (!immersiveContainer) {
                console.error("Gallery lightbox modal not found in DOM");
                return;
            }
            immersiveContainer.innerHTML = `
          <div class="lightbox-wrapper">
            <button class="gallery-close" aria-label="Close">
              <i class="fas fa-times"></i>
            </button>
            <div class="gallery-modal-content">
              <div class="lightbox-loading">
                <div class="spinner-wrapper">
                  <div class="spinner"></div>
                </div>
              </div>
              <div class="immersive-header">
                <h3 id="gallery-caption-title">Immersive Gallery Experience</h3>
              </div>
              <div class="immersive-content">
                <div class="immersive-image-container">
                  <img src="" alt="Immersive view" id="gallery-modal-img" class="immersive-image">
                  <div class="image-controls">
                    <button id="gallery-prev" class="image-control prev-image"><i class="fas fa-chevron-left"></i></button>
                    <button id="gallery-next" class="image-control next-image"><i class="fas fa-chevron-right"></i></button>
                  </div>
                </div>
                <div class="immersive-info">
                  <p id="gallery-caption-description" class="immersive-description">Image description will appear here.</p>
                  <div class="immersive-metadata">
                    <div class="metadata-item">
                      <i class="fas fa-calendar-alt"></i>
                      <span class="metadata-value date-taken">Date: <span id="image-date">-</span></span>
                    </div>
                    <div class="metadata-item">
                      <i class="fas fa-camera"></i>
                      <span class="metadata-value camera-info">Category: <span id="image-category">-</span></span>
                    </div>
                    <div class="metadata-item">
                      <i class="fas fa-image"></i>
                      <span class="metadata-value">Photo <span id="gallery-current">1</span> of <span id="gallery-total">1</span></span>
                    </div>
                  </div>
                  <div class="immersive-ai-analysis">
                    <h4><i class="fas fa-robot"></i> AI Vision Analysis</h4>
                    <div class="analysis-tags"></div>
                    <div class="analysis-insights"></div>
                  </div>
                </div>
              </div>
              <div class="immersive-thumbnails"></div>
            </div>
          </div>
        `;
            immersiveBtn.addEventListener("click", function () {
                openImmersiveView();
            });
            const closeBtn = immersiveContainer.querySelector(".gallery-close");
            closeBtn.addEventListener("click", function () {
                closeImmersiveView();
            });
            window.closeLightbox = closeImmersiveView;
            document.addEventListener("keydown", function (e) {
                if (!immersiveContainer.classList.contains("active")) return;
                if (e.key === "Escape") {
                    closeImmersiveView();
                } else if (e.key === "ArrowLeft") {
                    changeImmersiveImage("prev");
                } else if (e.key === "ArrowRight") {
                    changeImmersiveImage("next");
                }
            });
            const prevButton = immersiveContainer.querySelector(
                "#gallery-prev"
            );
            const nextButton = immersiveContainer.querySelector(
                "#gallery-next"
            );
            prevButton.addEventListener("click", () =>
                changeImmersiveImage("prev")
            );
            nextButton.addEventListener("click", () =>
                changeImmersiveImage("next")
            );
            const collageItems = document.querySelectorAll(".collage-item");
            collageItems.forEach((item, index) => {
                item.addEventListener("click", function () {
                    currentImmersiveIndex = index;
                    openImmersiveView();
                });
            });
        }
        let currentImmersiveIndex = 0;
        let galleryImages = [];
        function openImmersiveView() {
            const immersiveContainer = document.getElementById(
                "gallery-lightbox-modal"
            );
            if (!immersiveContainer) return;
            const galleryItems = document.querySelectorAll(".collage-item");
            galleryImages = Array.from(galleryItems).map((item) => {
                const img = item.querySelector("img");
                const title =
                    item.querySelector(".collage-info h3")?.textContent ||
                    "Image";
                const description =
                    item.querySelector(".collage-info p")?.textContent ||
                    "No description available";
                const category = item.classList.contains("lifestyle-1")
                    ? "Education"
                    : item.classList.contains("lifestyle-2")
                    ? "Friends"
                    : item.classList.contains("lifestyle-3")
                    ? "Events"
                    : item.classList.contains("lifestyle-4")
                    ? "Presentations"
                    : item.classList.contains("lifestyle-5")
                    ? "Sports"
                    : item.classList.contains("lifestyle-6")
                    ? "Activities"
                    : item.classList.contains("lifestyle-7")
                    ? "Travel"
                    : "Memories";
                const currentYear = new Date().getFullYear();
                const year = currentYear - Math.floor(Math.random() * 5);
                const month = Math.floor(Math.random() * 12) + 1;
                const day = Math.floor(Math.random() * 28) + 1;
                const dateStr = `${day}/${month}/${year}`;
                return {
                    src: img?.src || "",
                    title: title,
                    description: description,
                    category: category,
                    date: dateStr,
                };
            });
            const totalCounter = document.getElementById("gallery-total");
            if (totalCounter) {
                totalCounter.textContent = galleryImages.length.toString();
            }
            immersiveContainer.classList.add("active");
            document.body.classList.add("immersive-mode");
            loadImmersiveImage(currentImmersiveIndex);
            createImmersiveThumbnails();
            setTimeout(() => {
                const modalContent = immersiveContainer.querySelector(
                    ".gallery-modal-content"
                );
                if (modalContent) {
                    modalContent.classList.add("active");
                }
            }, 10);
        }
        function closeImmersiveView() {
            const immersiveContainer = document.getElementById(
                "gallery-lightbox-modal"
            );
            if (!immersiveContainer) return;
            const modalContent = immersiveContainer.querySelector(
                ".gallery-modal-content"
            );
            if (modalContent) {
                modalContent.classList.remove("active");
            }
            setTimeout(() => {
                immersiveContainer.classList.remove("active");
                document.body.classList.remove("immersive-mode");
                const modalImg = document.getElementById("gallery-modal-img");
                if (modalImg) {
                    modalImg.src = "";
                }
            }, 300);
        }
        function loadImmersiveImage(index) {
            if (index < 0 || index >= galleryImages.length) return;
            const immersiveContainer = document.getElementById(
                "gallery-lightbox-modal"
            );
            if (!immersiveContainer) return;
            const imageData = galleryImages[index];
            const loadingIndicator = immersiveContainer.querySelector(
                ".lightbox-loading"
            );
            if (loadingIndicator) {
                loadingIndicator.classList.add("show");
            }
            const preloadImg = new Image();
            preloadImg.onload = function () {
                const imageElement = immersiveContainer.querySelector(
                    "#gallery-modal-img"
                );
                if (imageElement) {
                    imageElement.style.opacity = "0";
                    imageElement.style.transform = "scale(0.95)";
                    setTimeout(() => {
                        imageElement.src = imageData.src;
                        imageElement.style.opacity = "1";
                        imageElement.style.transform = "scale(1)";
                        if (loadingIndicator) {
                            loadingIndicator.classList.remove("show");
                        }
                    }, 200);
                }
                const titleElement = immersiveContainer.querySelector(
                    "#gallery-caption-title"
                );
                const descElement = immersiveContainer.querySelector(
                    "#gallery-caption-description"
                );
                if (titleElement) titleElement.textContent = imageData.title;
                if (descElement)
                    descElement.textContent = imageData.description;
                const dateElement = immersiveContainer.querySelector(
                    "#image-date"
                );
                const categoryElement = immersiveContainer.querySelector(
                    "#image-category"
                );
                const currentCounter = immersiveContainer.querySelector(
                    "#gallery-current"
                );
                if (dateElement) dateElement.textContent = imageData.date;
                if (categoryElement)
                    categoryElement.textContent = imageData.category;
                if (currentCounter)
                    currentCounter.textContent = (index + 1).toString();
                simulateImmersiveAIAnalysis(imageData);
                const thumbnails = immersiveContainer.querySelectorAll(
                    ".immersive-thumbnail"
                );
                thumbnails.forEach((thumb, i) => {
                    if (i === index) {
                        thumb.classList.add("active");
                        thumb.style.transform = "scale(1.1)";
                        setTimeout(() => {
                            thumb.style.transform = "scale(1)";
                        }, 300);
                    } else {
                        thumb.classList.remove("active");
                    }
                });
            };
            preloadImg.onerror = function () {
                console.error("Failed to load image:", imageData.src);
                if (loadingIndicator) {
                    loadingIndicator.classList.remove("show");
                }
            };
            preloadImg.src = imageData.src;
        }
        function createImmersiveThumbnails() {
            const thumbnailContainer = document.querySelector(
                ".immersive-thumbnails"
            );
            if (!thumbnailContainer) return;
            thumbnailContainer.innerHTML = "";
            galleryImages.forEach((image, index) => {
                const thumbnail = document.createElement("div");
                thumbnail.className = `immersive-thumbnail ${
                    index === currentImmersiveIndex ? "active" : ""
                }`;
                thumbnail.style.backgroundImage = `url(${image.src})`;
                thumbnail.style.animationDelay = `${index * 0.05}s`;
                thumbnail.addEventListener("mouseenter", function () {
                    this.style.transform = "scale(1.1)";
                });
                thumbnail.addEventListener("mouseleave", function () {
                    if (!this.classList.contains("active")) {
                        this.style.transform = "scale(1)";
                    }
                });
                thumbnail.addEventListener("click", function () {
                    const ripple = document.createElement("div");
                    ripple.className = "ripple-effect";
                    ripple.style.left = "50%";
                    ripple.style.top = "50%";
                    this.appendChild(ripple);
                    setTimeout(() => ripple.remove(), 600);
                    currentImmersiveIndex = index;
                    loadImmersiveImage(index);
                });
                thumbnailContainer.appendChild(thumbnail);
            });
            setTimeout(() => {
                const activeThumb = thumbnailContainer.querySelector(".active");
                if (activeThumb) {
                    thumbnailContainer.scrollLeft =
                        activeThumb.offsetLeft -
                        thumbnailContainer.clientWidth / 2 +
                        activeThumb.clientWidth / 2;
                }
            }, 100);
        }
        function changeImmersiveImage(direction) {
            const modal = document.getElementById("gallery-lightbox-modal");
            const img = modal?.querySelector("#gallery-modal-img");
            if (img) {
                if (direction === "next") {
                    img.style.transform = "translateX(20px)";
                    img.style.opacity = "0";
                } else {
                    img.style.transform = "translateX(-20px)";
                    img.style.opacity = "0";
                }
            }
            if (direction === "next") {
                currentImmersiveIndex =
                    (currentImmersiveIndex + 1) % galleryImages.length;
            } else {
                currentImmersiveIndex =
                    (currentImmersiveIndex - 1 + galleryImages.length) %
                    galleryImages.length;
            }
            setTimeout(() => {
                loadImmersiveImage(currentImmersiveIndex);
                const thumbnailContainer = document.querySelector(
                    ".immersive-thumbnails"
                );
                const activeThumb = thumbnailContainer?.querySelector(
                    ".active"
                );
                if (thumbnailContainer && activeThumb) {
                    thumbnailContainer.scrollLeft =
                        activeThumb.offsetLeft -
                        thumbnailContainer.clientWidth / 2 +
                        activeThumb.clientWidth / 2;
                }
            }, 200);
        }
        function simulateImmersiveAIAnalysis(imageData) {
            const tagsContainer = document.querySelector(".analysis-tags");
            const insightsContainer = document.querySelector(
                ".analysis-insights"
            );
            if (!tagsContainer || !insightsContainer) return;
            tagsContainer.style.opacity = "0";
            insightsContainer.style.opacity = "0";
            setTimeout(() => {
                tagsContainer.innerHTML = "";
                insightsContainer.innerHTML = "";
                const possibleTags = [
                    "People",
                    "Group",
                    "Portrait",
                    "Landscape",
                    "Indoor",
                    "Outdoor",
                    "Event",
                    "Celebration",
                    "Education",
                    "Sports",
                    "Formal",
                    "Casual",
                    "Historical",
                    "Modern",
                    "Nature",
                    "Urban",
                    "Architectural",
                    "Academic",
                    "Team",
                    "Presentation",
                    "Performance",
                    "Graduation",
                    "Conference",
                    "Workshop",
                    "Activity",
                    "Travel",
                    "Cultural",
                    "Friendship",
                ];
                const combinedText = (
                    imageData.title +
                    " " +
                    imageData.description +
                    " " +
                    imageData.category
                ).toLowerCase();
                let relevantTags = possibleTags.filter((tag) =>
                    combinedText.includes(tag.toLowerCase())
                );
                const categoryTags = {
                    Education: [
                        "Academic",
                        "Learning",
                        "Education",
                        "Classroom",
                        "School",
                    ],
                    Events: [
                        "Celebration",
                        "Gathering",
                        "Event",
                        "Ceremony",
                        "Occasion",
                    ],
                    Sports: [
                        "Athletic",
                        "Competition",
                        "Team",
                        "Physical",
                        "Activity",
                    ],
                    Presentations: [
                        "Speech",
                        "Conference",
                        "Presentation",
                        "Audience",
                        "Stage",
                    ],
                    Activities: [
                        "Engagement",
                        "Participation",
                        "Activity",
                        "Workshop",
                        "Interaction",
                    ],
                    Travel: [
                        "Journey",
                        "Exploration",
                        "Destination",
                        "Visit",
                        "Travel",
                    ],
                };
                if (categoryTags[imageData.category]) {
                    relevantTags = [
                        ...relevantTags,
                        ...categoryTags[imageData.category],
                    ];
                }
                const selectedTags = [...new Set(relevantTags)].slice(
                    0,
                    Math.min(
                        relevantTags.length,
                        5 + Math.floor(Math.random() * 3)
                    )
                );
                while (selectedTags.length < 5) {
                    const randomTag =
                        possibleTags[
                            Math.floor(Math.random() * possibleTags.length)
                        ];
                    if (!selectedTags.includes(randomTag)) {
                        selectedTags.push(randomTag);
                    }
                }
                selectedTags.forEach((tag, index) => {
                    let confidence = 0;
                    if (combinedText.includes(tag.toLowerCase())) {
                        confidence = 85 + Math.floor(Math.random() * 15);
                    } else if (
                        categoryTags[imageData.category] &&
                        categoryTags[imageData.category].includes(tag)
                    ) {
                        confidence = 78 + Math.floor(Math.random() * 17);
                    } else {
                        confidence = 65 + Math.floor(Math.random() * 20);
                    }
                    const tagElement = document.createElement("div");
                    tagElement.className = "analysis-tag";
                    tagElement.style.opacity = "0";
                    tagElement.style.transform = "translateY(10px)";
                    tagElement.style.transition = "all 0.3s ease";
                    tagElement.style.transitionDelay = `${index * 0.1}s`;
                    tagElement.innerHTML = `
              <span class="tag-name">${tag}</span>
              <span class="tag-confidence">${confidence}%</span>
            `;
                    tagsContainer.appendChild(tagElement);
                    setTimeout(() => {
                        tagElement.style.opacity = "1";
                        tagElement.style.transform = "translateY(0)";
                    }, 10);
                });
                let possibleInsights = [
                    "This image appears to be taken during daytime with good natural lighting.",
                    "The composition follows the rule of thirds for visual balance.",
                    "The color palette is primarily warm with high saturation.",
                    "Multiple subjects are present in this image, suggesting a group activity.",
                    "The background appears to be slightly blurred, creating depth of field.",
                    "The image has strong emotional content based on facial expressions.",
                    "This appears to be an indoor setting with artificial lighting.",
                    "This outdoor scene features natural landscape elements.",
                    "The image shows a formal setting based on attire and environment.",
                    "This image captures a casual moment with relaxed body language.",
                ];
                const categoryInsights = {
                    Education: [
                        "This image captures an educational environment with academic elements.",
                        "The setting appears to be focused on learning and knowledge sharing.",
                        "This composition documents an important academic milestone or achievement.",
                    ],
                    Events: [
                        "This appears to be a significant event with ceremonial elements.",
                        "The gathering suggests a planned celebration or important occasion.",
                        "This moment captures a special event with multiple participants.",
                    ],
                    Sports: [
                        "The image shows athletic activity with competitive elements.",
                        "This composition highlights physical activity and teamwork.",
                        "The scene depicts sports participation with active engagement.",
                    ],
                    Presentations: [
                        "This captures a formal presentation or speaking engagement.",
                        "The setup indicates a knowledge-sharing session or talk.",
                        "This appears to be a structured presentation with audience attendance.",
                    ],
                };
                if (categoryInsights[imageData.category]) {
                    possibleInsights = [
                        ...possibleInsights,
                        ...categoryInsights[imageData.category],
                    ];
                }
                let selectedInsights = [];
                if (categoryInsights[imageData.category]) {
                    selectedInsights.push(
                        categoryInsights[imageData.category][
                            Math.floor(
                                Math.random() *
                                    categoryInsights[imageData.category].length
                            )
                        ]
                    );
                }
                while (selectedInsights.length < 3) {
                    const randomInsight =
                        possibleInsights[
                            Math.floor(Math.random() * possibleInsights.length)
                        ];
                    if (!selectedInsights.includes(randomInsight)) {
                        selectedInsights.push(randomInsight);
                    }
                }
                selectedInsights.forEach((insight, index) => {
                    const insightElement = document.createElement("p");
                    insightElement.className = "analysis-insight";
                    insightElement.textContent = insight;
                    insightElement.style.opacity = "0";
                    insightElement.style.transform = "translateY(10px)";
                    insightElement.style.transition = "all 0.4s ease";
                    insightElement.style.transitionDelay = `${
                        index * 0.15 + 0.3
                    }s`;
                    insightsContainer.appendChild(insightElement);
                    setTimeout(() => {
                        insightElement.style.opacity = "1";
                        insightElement.style.transform = "translateY(0)";
                    }, 10);
                });
                tagsContainer.style.opacity = "1";
                insightsContainer.style.opacity = "1";
            }, 300);
        }
        function setupLightbox(galleryData) {
            const modal = document.getElementById("gallery-lightbox-modal");
            let currentIndex = 0;
            function preloadImages() {
                galleryData.forEach((item) => {
                    const img = new Image();
                    img.src = item.image;
                });
            }
            function initializeThumbnails() {
                const thumbnailContainer = modal.querySelector(
                    ".immersive-thumbnails"
                );
                if (!thumbnailContainer) return;
                thumbnailContainer.innerHTML = galleryData
                    .map(
                        (item, index) => `
                    <div class="thumbnail-item ${
                        index === currentIndex ? "active" : ""
                    }" data-index="${index}">
                        <img src="${item.image}" alt="${
                            item.title
                        }" loading="lazy">
                    </div>
                `
                    )
                    .join("");
                const activeThumb = thumbnailContainer.querySelector(
                    ".thumbnail-item.active"
                );
                if (activeThumb) {
                    activeThumb.scrollIntoView({
                        behavior: "smooth",
                        block: "nearest",
                        inline: "center",
                    });
                }
                thumbnailContainer
                    .querySelectorAll(".thumbnail-item")
                    .forEach((thumb) => {
                        thumb.addEventListener("click", () => {
                            const index = parseInt(thumb.dataset.index, 10);
                            openModal(index);
                        });
                    });
            }
            function generateAIAnalysis(item) {
                const tagsContainer = modal.querySelector(".analysis-tags");
                const insightsContainer = modal.querySelector(
                    ".analysis-insights"
                );
                if (!tagsContainer || !insightsContainer) return;
                tagsContainer.innerHTML = "";
                insightsContainer.innerHTML = "";
                tagsContainer.innerHTML =
                    '<div class="loading-analysis">Analyzing image...</div>';
                setTimeout(() => {
                    const category = item.category;
                    let tags = [];
                    switch (category) {
                        case "education":
                            tags = [
                                "learning",
                                "academic",
                                "knowledge",
                                "school",
                                "education",
                            ];
                            break;
                        case "sports":
                            tags = [
                                "athletic",
                                "competition",
                                "physical",
                                "team",
                                "achievement",
                            ];
                            break;
                        case "events":
                            tags = [
                                "celebration",
                                "gathering",
                                "social",
                                "community",
                                "occasion",
                            ];
                            break;
                        case "presentations":
                            tags = [
                                "public speaking",
                                "audience",
                                "communication",
                                "professional",
                                "confidence",
                            ];
                            break;
                        case "travel":
                            tags = [
                                "exploration",
                                "journey",
                                "adventure",
                                "destination",
                                "discovery",
                            ];
                            break;
                        case "friends":
                            tags = [
                                "friendship",
                                "social",
                                "peers",
                                "connection",
                                "relationship",
                            ];
                            break;
                        default:
                            tags = [
                                "memory",
                                "moment",
                                "experience",
                                "life",
                                "personal",
                            ];
                    }
                    const additionalTags = [
                        "people",
                        "indoor",
                        "outdoor",
                        "group",
                        "building",
                        "natural light",
                        "vibrant",
                        "formal",
                        "casual",
                        "professional",
                        "creative",
                    ];
                    for (let i = 0; i < 3; i++) {
                        const randomTag =
                            additionalTags[
                                Math.floor(
                                    Math.random() * additionalTags.length
                                )
                            ];
                        if (!tags.includes(randomTag)) {
                            tags.push(randomTag);
                        }
                    }
                    tags = tags.map((tag) => {
                        const confidence = Math.floor(Math.random() * 20) + 80;
                        return { tag, confidence };
                    });
                    tags.sort((a, b) => b.confidence - a.confidence);
                    tagsContainer.innerHTML = tags
                        .map(
                            (t) =>
                                `<div class="ai-tag"><span>${t.tag}</span><span class="confidence">${t.confidence}%</span></div>`
                        )
                        .join("");
                    let insight = "";
                    switch (category) {
                        case "education":
                            insight =
                                "This appears to be an educational setting with a focus on learning and academic achievement.";
                            break;
                        case "sports":
                            insight =
                                "This image showcases athletic activity and competitive sport engagement.";
                            break;
                        case "events":
                            insight =
                                "This is a social gathering or event with multiple participants engaged in a shared experience.";
                            break;
                        case "presentations":
                            insight =
                                "This shows a presentation or public speaking scenario with an audience present.";
                            break;
                        case "travel":
                            insight =
                                "This image captures exploration of a location, likely during travel or an excursion.";
                            break;
                        case "friends":
                            insight =
                                "This depicts social connections and friendship dynamics in a group setting.";
                            break;
                        default:
                            insight =
                                "This image contains personal memories and meaningful moments.";
                    }
                    insightsContainer.innerHTML = `
                        <p class="ai-insight">${insight}</p>
                        <p class="ai-detail">Image appears to be from a ${
                            item.category
                        } category taken around ${formatDate(item.date)}.</p>
                        <div class="ai-notice">AI analysis is simulated.</div>
                    `;
                }, 1000);
            }
            function openModal(index) {
                if (!modal) return;
                modal.classList.add("animating");
                currentIndex = index;
                const item = galleryData[index];
                if (!item) return;
                const img = modal.querySelector("#gallery-modal-img");
                const title = modal.querySelector("#gallery-caption-title");
                const desc = modal.querySelector(
                    "#gallery-caption-description"
                );
                const date = modal.querySelector("#image-date");
                const category = modal.querySelector("#image-category");
                const current = modal.querySelector("#gallery-current");
                const total = modal.querySelector("#gallery-total");
                if (img) {
                    const preloader = new Image();
                    preloader.onload = function () {
                        img.src = item.image;
                        // Fade in the image
                        img.style.opacity = 0;
                        setTimeout(() => {
                            img.style.opacity = 1;
                        }, 50);
                    };
                    preloader.src = item.image;
                }
                if (title) title.textContent = item.title;
                if (desc) desc.textContent = item.description;
                if (date) date.textContent = formatDate(item.date);
                if (category)
                    category.textContent =
                        item.category.charAt(0).toUpperCase() +
                        item.category.slice(1);
                if (current) current.textContent = (index + 1).toString();
                if (total) total.textContent = galleryData.length.toString();
                modal.classList.add("active");
                document.body.classList.add("immersive-mode");
                initializeThumbnails();
                generateAIAnalysis(item);
                setTimeout(() => {
                    modal.classList.remove("animating");
                }, 500);
            }
            function closeModal() {
                modal.classList.add("animating-out");
                setTimeout(() => {
                    modal.classList.remove("active");
                    modal.classList.remove("animating-out");
                    document.body.classList.remove("immersive-mode");
                }, 300);
            }
            function next() {
                const imgContainer = modal.querySelector(
                    ".immersive-image-container"
                );
                if (imgContainer) {
                    imgContainer.classList.add("sliding-next");
                    setTimeout(() => {
                        imgContainer.classList.remove("sliding-next");
                    }, 500);
                }
                openModal((currentIndex + 1) % galleryData.length);
            }
            function prev() {
                const imgContainer = modal.querySelector(
                    ".immersive-image-container"
                );
                if (imgContainer) {
                    imgContainer.classList.add("sliding-prev");
                    setTimeout(() => {
                        imgContainer.classList.remove("sliding-prev");
                    }, 500);
                }
                openModal(
                    (currentIndex - 1 + galleryData.length) % galleryData.length
                );
            }
            function setupDownloadButton() {
                const downloadBtn = document.createElement("button");
                downloadBtn.className = "image-action-btn download-btn";
                downloadBtn.innerHTML = '<i class="fas fa-download"></i>';
                downloadBtn.title = "Download image";
                const actionContainer = modal.querySelector(".image-controls");
                if (actionContainer) {
                    actionContainer.appendChild(downloadBtn);
                    downloadBtn.addEventListener("click", () => {
                        const item = galleryData[currentIndex];
                        if (!item) return;
                        const link = document.createElement("a");
                        link.href = item.image;
                        link.download = `${item.title
                            .replace(/\s+/g, "-")
                            .toLowerCase()}.jpg`;
                        document.body.appendChild(link);
                        link.click();
                        document.body.removeChild(link);
                    });
                }
            }
            if (modal) {
                modal
                    .querySelector("#gallery-next")
                    ?.addEventListener("click", next);
                modal
                    .querySelector("#gallery-prev")
                    ?.addEventListener("click", prev);
                modal
                    .querySelector(".gallery-close")
                    ?.addEventListener("click", closeModal);
                setupDownloadButton();
            }
            document.addEventListener("keydown", function (e) {
                if (!modal.classList.contains("active")) return;
                if (e.key === "Escape") closeModal();
                if (e.key === "ArrowLeft") prev();
                if (e.key === "ArrowRight") next();
            });
            document
                .querySelector(".gallery-grid")
                ?.addEventListener("click", function (e) {
                    const item = e.target.closest(".gallery-item");
                    if (!item) return;
                    const id = parseInt(item.dataset.id, 10);
                    const index = galleryData.findIndex((g) => g.id === id);
                    if (index !== -1) openModal(index);
                });
            preloadImages();
        }
        function setupSortingOptions() {
            addSortControls();
            const sortToggle = document.querySelector(".sort-toggle");
            if (sortToggle) {
                sortToggle.addEventListener("click", function () {
                    const sortMenu = document.querySelector(".sort-menu");
                    if (sortMenu) {
                        sortMenu.classList.toggle("active");
                    }
                });
            }
            document.addEventListener("click", function (e) {
                const sortOption = e.target.closest(".sort-option");
                if (!sortOption) {
                    if (!e.target.closest(".sort-dropdown")) {
                        const sortMenu = document.querySelector(".sort-menu");
                        if (sortMenu) {
                            sortMenu.classList.remove("active");
                        }
                    }
                    return;
                }
                document.querySelectorAll(".sort-option").forEach((option) => {
                    option.classList.remove("active");
                });
                sortOption.classList.add("active");
                const sortBy = sortOption.dataset.sort;
                sortGalleryItems(sortBy);
                const sortMenu = document.querySelector(".sort-menu");
                if (sortMenu) {
                    sortMenu.classList.remove("active");
                }
            });
        }
        function sortGalleryItems(sortBy) {
            const galleryGrid = document.querySelector(".gallery-grid");
            if (!galleryGrid) return;
            const items = Array.from(
                galleryGrid.querySelectorAll(".gallery-item")
            );
            items.sort((a, b) => {
                const aData = getItemData(a);
                const bData = getItemData(b);
                switch (sortBy) {
                    case "date-asc":
                        return new Date(aData.date) - new Date(bData.date);
                    case "date-desc":
                        return new Date(bData.date) - new Date(aData.date);
                    case "title-asc":
                        return aData.title.localeCompare(bData.title);
                    case "title-desc":
                        return bData.title.localeCompare(aData.title);
                    case "category":
                        return aData.category.localeCompare(bData.category);
                    default:
                        return 0;
                }
            });
            items.forEach((item) => item.remove());
            items.forEach((item, index) => {
                item.style.animationDelay = `${index * 0.05}s`;
                galleryGrid.appendChild(item);
            });
        }
        function getItemData(itemElement) {
            return {
                id: parseInt(itemElement.dataset.id),
                title: itemElement.querySelector(".gallery-title").textContent,
                date: itemElement.querySelector(".gallery-date").textContent,
                category: itemElement.dataset.category,
            };
        }
        function addSortControls() {
            const controlsContainer = document.querySelector(
                ".gallery-controls"
            );
            if (!controlsContainer) return;
            if (controlsContainer.querySelector(".gallery-sort")) return;
            const sortOptions = document.createElement("div");
            sortOptions.className = "gallery-sort";
            sortOptions.innerHTML = `
                <div class="sort-dropdown">
                    <button class="sort-toggle">
                        <i class="fas fa-sort"></i> Sort
                    </button>
                    <div class="sort-menu">
                        <div class="sort-option active" data-sort="date-desc">
                            <i class="fas fa-calendar-alt"></i> Newest First
                        </div>
                        <div class="sort-option" data-sort="date-asc">
                            <i class="fas fa-calendar-alt"></i> Oldest First
                        </div>
                        <div class="sort-option" data-sort="title-asc">
                            <i class="fas fa-sort-alpha-down"></i> Title (A-Z)
                        </div>
                        <div class="sort-option" data-sort="title-desc">
                            <i class="fas fa-sort-alpha-up"></i> Title (Z-A)
                        </div>
                        <div class="sort-option" data-sort="category">
                            <i class="fas fa-tags"></i> By Category
                        </div>
                    </div>
                </div>
            `;
            controlsContainer.appendChild(sortOptions);
        }
        function updateFilterCounts(data) {
            const filterTags = document.querySelectorAll(".filter-tag");
            filterTags.forEach((tag) => {
                const category = tag.dataset.filter;
                let count = 0;
                if (category === "all") {
                    count = data.length;
                } else {
                    count = data.filter((item) => item.category === category)
                        .length;
                }
                const countSpan =
                    tag.querySelector(".count") ||
                    document.createElement("span");
                countSpan.className = "count";
                countSpan.textContent = count;
                if (!tag.querySelector(".count")) {
                    tag.appendChild(countSpan);
                }
            });
        }
        function setupFavoritesSystem() {
            document.addEventListener("click", function (e) {
                const likeBtn = e.target.closest(".like-btn");
                if (!likeBtn) return;
                const id = parseInt(likeBtn.dataset.id, 10);
                const favorites = getFavorites();
                if (favorites.includes(id)) {
                    const index = favorites.indexOf(id);
                    favorites.splice(index, 1);
                    likeBtn.classList.remove("liked");
                    likeBtn
                        .closest(".gallery-item")
                        ?.classList.remove("favorited");
                    const icon = likeBtn.querySelector("i");
                    if (icon) {
                        icon.classList.remove("fas");
                        icon.classList.add("far");
                    }
                } else {
                    favorites.push(id);
                    likeBtn.classList.add("liked");
                    likeBtn
                        .closest(".gallery-item")
                        ?.classList.add("favorited");
                    const icon = likeBtn.querySelector("i");
                    if (icon) {
                        icon.classList.remove("far");
                        icon.classList.add("fas");
                    }
                    showFavoriteAnimation(likeBtn);
                }
                localStorage.setItem(
                    "gallery_favorites",
                    JSON.stringify(favorites)
                );
                const favoritesFilter = document.querySelector(
                    '.filter-tag[data-filter="favorites"]'
                );
                if (favoritesFilter) {
                    const count = favoritesFilter.querySelector(".count");
                    if (count) count.textContent = favorites.length;
                }
            });
            addFavoritesFilter();
            document.addEventListener("click", function (e) {
                const downloadBtn = e.target.closest(".download-btn");
                if (!downloadBtn) return;
                const id = parseInt(downloadBtn.dataset.id, 10);
                const galleryData = getGalleryData();
                const item = galleryData.find((item) => item.id === id);
                if (item) {
                    const link = document.createElement("a");
                    link.href = item.image;
                    link.download = `${item.title
                        .replace(/\s+/g, "-")
                        .toLowerCase()}.jpg`;
                    document.body.appendChild(link);
                    link.click();
                    document.body.removeChild(link);
                }
            });
        }
        function showFavoriteAnimation(likeBtn) {
            const heart = document.createElement("div");
            heart.className = "floating-heart";
            heart.innerHTML = '<i class="fas fa-heart"></i>';
            const rect = likeBtn.getBoundingClientRect();
            heart.style.left = `${rect.left + rect.width / 2}px`;
            heart.style.top = `${rect.top + rect.height / 2}px`;
            document.body.appendChild(heart);
            setTimeout(() => {
                heart.remove();
            }, 1000);
        }
        function addFavoritesFilter() {
            const filterContainer = document.querySelector(".gallery-filter");
            if (!filterContainer) return;
            if (filterContainer.querySelector('[data-filter="favorites"]'))
                return;
            const favorites = getFavorites();
            const favoritesTag = document.createElement("div");
            favoritesTag.className = "filter-tag";
            favoritesTag.dataset.filter = "favorites";
            favoritesTag.innerHTML = `
                <i class="fas fa-heart"></i> Favorites
                <span class="count">${favorites.length}</span>
            `;
            filterContainer.appendChild(favoritesTag);
            favoritesTag.addEventListener("click", function () {
                const favorites = getFavorites();
                const items = document.querySelectorAll(".gallery-item");
                document
                    .querySelectorAll(".filter-tag")
                    .forEach((t) => t.classList.remove("active"));
                this.classList.add("active");
                items.forEach((item) => {
                    const id = parseInt(item.dataset.id, 10);
                    if (favorites.includes(id)) {
                        item.style.display = "";
                    } else {
                        item.style.display = "none";
                    }
                });
            });
            const emptyStateButton = document.querySelector(
                ".gallery-empty-state button"
            );
            if (emptyStateButton) {
                emptyStateButton.addEventListener("click", function () {
                    document
                        .querySelectorAll(".filter-tag")
                        .forEach((t) => t.classList.remove("active"));
                    document
                        .querySelector('.filter-tag[data-filter="all"]')
                        .classList.add("active");
                    const searchInput = document.querySelector(
                        ".gallery-search input"
                    );
                    if (searchInput) searchInput.value = "";
                    filterGalleryItems();
                    document.querySelector(
                        ".gallery-empty-state"
                    ).style.display = "none";
                });
            }
        }
        function getFavorites() {
            const favoritesStr = localStorage.getItem("gallery_favorites");
            return favoritesStr ? JSON.parse(favoritesStr) : [];
        }
        function getGalleryData() {
             return [
                {
                    id: 1,
                    title: "School Memories",
                    description: "Early education journey",
                    image: "images/gallery/school (3).jpg",
                    category: "education",
                    date: "2020-05-15",
                },
                {
                    id: 2,
                    title: "College Days",
                    description: "Learning and growing",
                    image: "images/gallery/jh.jpg",
                    category: "education",
                    date: "2021-03-20",
                },
                {
                    id: 3,
                    title: "University Life",
                    description: "Higher education",
                    image: "images/gallery/university (1).jpeg",
                    category: "education",
                    date: "2022-02-10",
                },
                {
                    id: 4,
                    title: "Public Speaking",
                    description: "Presenting with confidence",
                    image: "images/gallery/publicspeaking (1).jpg",
                    category: "presentations",
                    date: "2021-11-05",
                },
                {
                    id: 5,
                    title: "Sports Achievement",
                    description: "Athletic excellence",
                    image: "images/gallery/awards (5).jpg",
                    category: "sports",
                    date: "2020-08-18",
                },
                {
                    id: 6,
                    title: "Extracurricular Club",
                    description: "Beyond the classroom",
                    image: "images/gallery/extracurricular (5).jpg",
                    category: "education",
                    date: "2021-04-12",
                },
                {
                    id: 7,
                    title: "Tour Adventures",
                    description: "Exploring new places",
                    image: "images/gallery/lol (4).jpg",
                    category: "travel",
                    date: "2022-07-22",
                },
                {
                    id: 8,
                    title: "School Friends",
                    description: "Childhood companions",
                    image: "images/gallery/lol (5).jpg",
                    category: "friends",
                    date: "2019-09-10",
                },
                {
                    id: 9,
                    title: "Coding Competition",
                    description: "Academic excellence",
                    image: "images/gallery/mp.jpg",
                    category: "education",
                    date: "2021-12-01",
                },
                {
                    id: 10,
                    title: "University Presentation",
                    description: "Research showcase",
                    image: "images/gallery/IMG-20241105-WA0001.jpg",
                    category: "presentations",
                    date: "2023-03-15",
                },
                {
                    id: 11,
                    title: "Sports Tournament",
                    description: "Team championship",
                    image: "images/gallery/sport (2).jpg",
                    category: "sports",
                    date: "2022-06-10",
                },
                {
                    id: 12,
                    title: "Educational Tour",
                    description: "Learning excursion",
                    image: "images/gallery/college (2).jpg",
                    category: "education",
                    date: "2020-10-05",
                },
                {
                    id: 13,
                    title: "Debate Competition",
                    description: "Public speaking skills",
                    image: "images/gallery/publicspeaking (3).jpg",
                    category: "presentations",
                    date: "2021-05-20",
                },
                {
                    id: 14,
                    title: "Science Fair",
                    description: "Innovation display",
                    image: "images/gallery/training (3).jpg",
                    category: "education",
                    date: "2022-01-25",
                },
                {
                    id: 15,
                    title: "Cultural Program",
                    description: "Celebrating diversity",
                    image: "images/gallery/extracurricular (1).jpg",
                    category: "events",
                    date: "2021-09-30",
                },
                {
                    id: 16,
                    title: "College Graduation",
                    description: "Achievement milestone",
                    image: "images/gallery/fdf.jpg",
                    category: "education",
                    date: "2023-02-28",
                },
                {
                    id: 17,
                    title: "Sports Day",
                    description: "Athletic competitions",
                    image: "images/gallery/aportday.jpg",
                    category: "sports",
                    date: "2020-12-12",
                },
                {
                    id: 18,
                    title: "Field Trip",
                    description: "Outdoor learning",
                    image: "images/gallery/145.jpg",
                    category: "education",
                    date: "2021-08-14",
                },
                {
                    id: 19,
                    title: "University Friends",
                    description: "Academic companions",
                    image: "images/gallery/555.jpg",
                    category: "friends",
                    date: "2022-03-18",
                },
                {
                    id: 20,
                    title: "Speech Competition",
                    description: "Oratorical excellence",
                    image: "images/gallery/sp.jpg",
                    category: "presentations",
                    date: "2021-10-22",
                },
                {
                    id: 21,
                    title: "Academic Workshop",
                    description: "Specialized training",
                    image: "images/gallery/lol (2).jpg",
                    category: "education",
                    date: "2022-05-11",
                },
                {
                    id: 22,
                    title: "Adventure Tour",
                    description: "Exploring nature",
                    image: "images/gallery/place (8).jpg",
                    category: "travel",
                    date: "2023-01-19",
                },
                {
                    id: 23,
                    title: "Public speaking",
                    description: "Stage talent",
                    image: "images/gallery/lok.jpg",
                    category: "presentations",
                    date: "2021-07-07",
                },
                {
                    id: 24,
                    title: "College Festival",
                    description: "Campus celebration",
                    image: "images/gallery/IMG-20240623-WA0001.jpg",
                    category: "events",
                    date: "2022-11-03",
                },
                {
                    id: 25,
                    title: "University Conference",
                    description: "Academic discourse",
                    image: "images/gallery/conp.jpg",
                    category: "events",
                    date: "2023-04-09",
                },
                {
                    id: 26,
                    title: "Team Sports",
                    description: "Collaborative athletics",
                    image: "images/gallery/sport (2).jpg",
                    category: "sports",
                    date: "2021-06-16",
                },
                {
                    id: 27,
                    title: "Class Project",
                    description: "Collaborative learning",
                    image: "images/gallery/lol (8).jpg",
                    category: "education",
                    date: "2022-09-21",
                },
                {
                    id: 28,
                    title: "Historic Tour",
                    description: "Cultural exploration",
                    image: "images/gallery/place (7).jpg",
                    category: "travel",
                    date: "2021-03-29",
                },
                {
                    id: 29,
                    title: "Leadership Camp",
                    description: "Developing potential",
                    image: "images/gallery/df.jpg",
                    category: "events",
                    date: "2022-08-17",
                },
            ];
        }
        function setupLazyLoading() {
            if ("IntersectionObserver" in window) {
                const imageObserver = new IntersectionObserver(
                    (entries, observer) => {
                        entries.forEach((entry) => {
                            if (entry.isIntersecting) {
                                const img = entry.target;
                                const src = img.getAttribute("data-src");
                                if (src) {
                                    img.src = src;
                                    img.removeAttribute("data-src");
                                    img.classList.add("loaded");
                                }
                                observer.unobserve(img);
                            }
                        });
                    }
                );
                document
                    .querySelectorAll(".gallery-img[data-src]")
                    .forEach((img) => {
                        imageObserver.observe(img);
                    });
            } else {
                document
                    .querySelectorAll(".gallery-img[data-src]")
                    .forEach((img) => {
                        img.src = img.getAttribute("data-src");
                        img.removeAttribute("data-src");
                    });
            }
        }
    },
};