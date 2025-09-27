window.HeaderContent = {
    getHTML: function () {
        return `
            <button id="nav-toggle" class="nav-toggle" aria-label="Toggle menu" aria-expanded="false">
                <div class="toggler-icon"></div>
            </button>
            <div class="header-tools">
                <button id="theme-toggle" class="theme-toggle header-tool-btn" aria-label="Toggle theme">
                    <i class="fas fa-sun theme-icon-sun"></i>
                    <i class="fas fa-moon theme-icon-moon"></i>
                    <span class="header-tool-tooltip">Toggle Theme</span>
                </button>
                            <div class="legendary-search-system" id="legendarySearchSystem">
                <div class="lsearch-bar-wrapper">
                    <div class="lsearch-bar">
                        <i class="fas fa-search lsearch-bar-icon"></i>
                        <input
                            type="text"
                            id="legendarySearchInput"
                            class="lsearch-input"
                            placeholder="Explore my journey"
                            aria-label="Search portfolio content"
                        />
                        <div
                            class="lsearch-category-filter-container"
                            id="lsearchCategoryFilterContainer"
                        >
                        </div>
                        <button
                            class="lsearch-clear-btn"
                            id="legendarySearchClear"
                            aria-label="Clear search query"
                            style="display: none"
                        >
                            <i class="fas fa-times"></i>
                        </button>
                    </div>
                </div>
                <div
                    class="lsearch-results-panel"
                    id="legendarySearchResultsPanel"
                >
                    <div class="lsearch-results-header">
                        <span
                            id="legendarySearchResultsCount"
                            class="lsearch-results-count"
                        ></span>
                        <span class="lsearch-results-info"
                            >Press <kbd>Esc</kbd> to close, <kbd>↑</kbd
                            ><kbd>↓</kbd> to navigate.</span
                        >
                    </div>
                    <ul
                        class="lsearch-results-list"
                        id="legendarySearchResultsList"
                    >
                    </ul>
                </div>
            </div>     
            </div>
        <nav id="slide-menu" class="nav-links">
            <ul>
                <li><a href="#about" class="active" aria-current="page"><i class="fas fa-user-astronaut nav-icon"></i>Summary</a></li>
                <li><a href="#education"><i class="fas fa-graduation-cap nav-icon"></i>Education</a></li>
                <li><a href="#certifications"><i class="fas fa-certificate nav-icon"></i>Certifications</a></li>
                <li><a href="#skills"><i class="fas fa-cogs nav-icon"></i>Skills</a></li>
                <li><a href="#work"><i class="fas fa-briefcase nav-icon"></i>Work Experience</a></li>
                <li><a href="#projects"><i class="fas fa-rocket nav-icon"></i>Projects & Research</a></li>
                <li><a href="#trainings"><i class="fas fa-chalkboard-teacher nav-icon"></i>Trainings</a></li>
                <li><a href="#activities"><i class="fas fa-universal-access nav-icon"></i>Activities</a></li>
                <li><a href="#gallery"><i class="fas fa-images nav-icon"></i>Gallery</a></li>
                <li><a href="#interests"><i class="fas fa-gamepad nav-icon"></i>Interests</a></li>
                <li><a href="#legendary-languages"><i class="fas fa-language nav-icon"></i>Languages</a></li>
                <li><a href="#resume-access-vault"><i class="fas fa-file-alt nav-icon"></i>Resume</a></li>
                <li><a href="#contact"><i class="fas fa-envelope nav-icon"></i> Contact</a></li>
                <li><a href="#footer"><i class="fas fa-link nav-icon"></i> Connect</a></li>                
            </ul>
        </nav>
        `;
    },
    init: function () {
        const themeToggle = document.getElementById("theme-toggle");
        if (themeToggle) {
            const themeInfoPopup = document.createElement("div");
            themeInfoPopup.className = "theme-info-popup";
            themeInfoPopup.innerHTML = `
                <div class="theme-info-header">
                    <span class="current-theme-label">Current Theme: <strong id="current-theme-name">Loading...</strong></span>
                    <span class="theme-info-close"><i class="fas fa-times"></i></span>
                </div>
                <div class="theme-info-body">
                    <p class="theme-mode-info">Themes change automatically based on time of day</p>
                    <div class="theme-selector" id="themeSelector"></div>
                    <button id="resetToAutoTheme" class="theme-reset-btn">
                        <i class="fas fa-clock"></i> Reset to Time-based
                    </button>
                </div>
            `;
            document.body.appendChild(themeInfoPopup);
            themeToggle.innerHTML = `
                <i class="fas fa-palette"></i>
                <span class="header-tool-tooltip">Theme Options</span>
            `;
            themeToggle.addEventListener("click", (e) => {
                e.stopPropagation();
                themeInfoPopup.classList.toggle("active");
                if (themeInfoPopup.classList.contains("active")) {
                    const themeSelector = document.getElementById(
                        "themeSelector"
                    );
                    if (themeSelector) {
                        themeSelector.innerHTML = "";
                        const themes = window.ThemeManager.getThemeList();
                        themes.forEach((theme) => {
                            const themeOption = document.createElement("div");
                            themeOption.className = "theme-option";
                            themeOption.dataset.themeKey = theme.key;
                            if (
                                theme.key === window.ThemeManager.currentTheme
                            ) {
                                themeOption.classList.add("active");
                            }
                            themeOption.innerHTML = `
                                <div class="theme-preview" style="background: linear-gradient(135deg, var(--${theme.key}-primary), var(--${theme.key}-secondary))"></div>
                                <span class="theme-name">${theme.name}</span>
                            `;
                            themeOption.addEventListener("click", () => {
                                window.ThemeManager.setTheme(theme.key);
                                document
                                    .querySelectorAll(".theme-option")
                                    .forEach((opt) => {
                                        opt.classList.remove("active");
                                    });
                                themeOption.classList.add("active");
                                document.getElementById(
                                    "current-theme-name"
                                ).textContent = theme.name;
                            });
                            themeSelector.appendChild(themeOption);
                        });
                    }
                    const currentThemeName =
                        window.ThemeManager.themes[
                            window.ThemeManager.currentTheme
                        ].name;
                    document.getElementById(
                        "current-theme-name"
                    ).textContent = currentThemeName;
                }
            });
            document.addEventListener("click", (e) => {
                if (
                    themeInfoPopup.classList.contains("active") &&
                    !themeInfoPopup.contains(e.target) &&
                    e.target !== themeToggle
                ) {
                    themeInfoPopup.classList.remove("active");
                }
            });
            const closeBtn = themeInfoPopup.querySelector(".theme-info-close");
            if (closeBtn) {
                closeBtn.addEventListener("click", () => {
                    themeInfoPopup.classList.remove("active");
                });
            }
            const resetBtn = document.getElementById("resetToAutoTheme");
            if (resetBtn) {
                resetBtn.addEventListener("click", () => {
                    window.ThemeManager.resetToAutoTheme();
                    const currentThemeName =
                        window.ThemeManager.themes[
                            window.ThemeManager.currentTheme
                        ].name;
                    document.getElementById(
                        "current-theme-name"
                    ).textContent = currentThemeName;
                    document
                        .querySelectorAll(".theme-option")
                        .forEach((opt) => {
                            opt.classList.toggle(
                                "active",
                                opt.dataset.themeKey ===
                                    window.ThemeManager.currentTheme
                            );
                        });
                });
            }
        }
        document.addEventListener("themechange", (e) => {
            if (themeToggle) {
                themeToggle.setAttribute(
                    "aria-label",
                    `Current theme: ${e.detail.themeName}`
                );
                themeToggle.setAttribute(
                    "title",
                    `Current theme: ${e.detail.themeName}. Click to change.`
                );
            }
            const currentThemeNameEl = document.getElementById(
                "current-theme-name"
            );
            if (currentThemeNameEl) {
                currentThemeNameEl.textContent = e.detail.themeName;
            }
        });
        const navToggle = document.getElementById("nav-toggle");
        const slideMenu = document.getElementById("slide-menu");
        if (navToggle && slideMenu) {
            navToggle.addEventListener("click", () => {
                const isMenuOpen = navToggle.classList.contains("menu-open");
                if (isMenuOpen) {
                    navToggle.classList.remove("menu-open");
                    slideMenu.classList.remove("open");
                    navToggle.setAttribute("aria-expanded", "false");
                    navToggle.setAttribute("aria-label", "Open menu");
                } else {
                    navToggle.classList.add("menu-open");
                    slideMenu.classList.add("open");
                    navToggle.setAttribute("aria-expanded", "true");
                    navToggle.setAttribute("aria-label", "Close menu");
                }
            });
            document.addEventListener("click", (event) => {
                const isClickInsideMenu = slideMenu.contains(event.target);
                const isClickOnToggle = navToggle.contains(event.target);
                if (
                    slideMenu.classList.contains("open") &&
                    !isClickInsideMenu &&
                    !isClickOnToggle
                ) {
                    navToggle.classList.remove("menu-open");
                    slideMenu.classList.remove("open");
                    navToggle.setAttribute("aria-expanded", "false");
                    navToggle.setAttribute("aria-label", "Open menu");
                }
            });
            document.addEventListener("keydown", (event) => {
                if (
                    event.key === "Escape" &&
                    slideMenu.classList.contains("open")
                ) {
                    navToggle.classList.remove("menu-open");
                    slideMenu.classList.remove("open");
                    navToggle.setAttribute("aria-expanded", "false");
                    navToggle.setAttribute("aria-label", "Open menu");
                    navToggle.focus(); 
                }
            });
        }
        const header = document.getElementById("header");
        let lastScrollTop = 0;
        const siteHeader = document.getElementById("header"); 
        if (siteHeader) {
            window.addEventListener(
                "scroll",
                function () {
                    let currentScroll =
                        window.pageYOffset ||
                        document.documentElement.scrollTop;
                    if (
                        currentScroll > lastScrollTop &&
                        currentScroll > siteHeader.offsetHeight
                    ) {
                        siteHeader.classList.remove("header-visible");
                        siteHeader.classList.add("header-hidden");
                    } else {
                        siteHeader.classList.remove("header-hidden");
                        siteHeader.classList.add("header-visible");
                    }
                    lastScrollTop = currentScroll <= 0 ? 0 : currentScroll;
                },
                false
            );
        }
    },
};