document.addEventListener("DOMContentLoaded", () => {
    class LegendarySearch {
        constructor(options) {
            this.options = Object.assign(
                {
                    searchSystemId: "legendarySearchSystem",
                    searchInputId: "legendarySearchInput",
                    clearButtonId: "legendarySearchClear",
                    categoryFilterContainerId: "lsearchCategoryFilterContainer",
                    resultsPanelId: "legendarySearchResultsPanel",
                    resultsListId: "legendarySearchResultsList",
                    resultsCountId: "legendarySearchResultsCount",
                    categories: [
                        "all",
                        "skills",
                        "projects",
                        "experiences",
                        "education",
                        "contact",
                    ],
                    searchableElementsQuery:
                        "h1, h2, h3, h4, h5, h6, p, li, .skill-item, .project-card, .experience-item, .education-item, [data-searchable]",
                    debounceTime: 300,
                    maxResultsInPanel: 10,
                },
                options
            );
            this.elements = {
                system: document.getElementById(this.options.searchSystemId),
                input: document.getElementById(this.options.searchInputId),
                clearButton: document.getElementById(
                    this.options.clearButtonId
                ),
                categoryFilterContainer: document.getElementById(
                    this.options.categoryFilterContainerId
                ),
                resultsPanel: document.getElementById(
                    this.options.resultsPanelId
                ),
                resultsList: document.getElementById(
                    this.options.resultsListId
                ),
                resultsCount: document.getElementById(
                    this.options.resultsCountId
                ),
                searchBar: document.querySelector(".lsearch-bar"), 
            };
            if (!this.elements.input || !this.elements.resultsPanel) {
                console.warn(
                    "Legendary Search: Essential elements not found. Aborting initialization."
                );
                return;
            }
            this.allContent = [];
            this.searchCache = new Map();
            this.currentCategory = this.options.categories[0] || "all";
            this.currentResults = []; 
            this.onPageHighlights = []; 
            this.currentOnPageHighlightIndex = -1;
            this.currentSelectedResultIndex = -1; 
            this.init();
        }
        init() {
            this.indexContent();
            this.createCategoryFilter();
            this.attachEventListeners();
            this.createFloatingNavigation();
            this.elements.system.classList.add("legendary-search-initialized");
        }
        attachEventListeners() {
            this.elements.input.addEventListener(
                "input",
                this.debounce(
                    this.onInput.bind(this),
                    this.options.debounceTime
                )
            );
            this.elements.input.addEventListener(
                "keydown",
                this.onKeyDown.bind(this)
            );
            this.elements.input.addEventListener("focus", () =>
                this.elements.resultsPanel.classList.add("active")
            );
            this.elements.clearButton.addEventListener(
                "click",
                this.clearSearch.bind(this)
            );
            document.addEventListener("click", (event) => {
                if (!this.elements.system.contains(event.target)) {
                    this.elements.resultsPanel.classList.remove("active");
                    if (this.elements.searchBar)
                        this.elements.searchBar.classList.remove("active");
                } else {
                    if (this.elements.searchBar)
                        this.elements.searchBar.classList.add("active");
                }
            });
        }
        debounce(func, delay) {
            let timeout;
            return (...args) => {
                clearTimeout(timeout);
                timeout = setTimeout(() => func.apply(this, args), delay);
            };
        }
        indexContent() {
            const elements = document.querySelectorAll(
                this.options.searchableElementsQuery
            );
            elements.forEach((el) => {
                if (this.elements.system.contains(el)) return;
                const text = (
                    el.dataset.searchText ||
                    el.textContent ||
                    ""
                ).trim();
                if (text.length > 2) {
                    let category = el.dataset.searchCategory || "general";
                    if (category === "general") {
                        if (
                            el.closest("#skills") ||
                            el.classList.contains("skill-item")
                        )
                            category = "skills";
                        else if (
                            el.closest("#projects") ||
                            el.classList.contains("project-card")
                        )
                            category = "projects";
                        else if (
                            el.closest("#experience") ||
                            el.classList.contains("experience-item")
                        )
                            category = "experiences";
                        else if (
                            el.closest("#education") ||
                            el.classList.contains("education-item")
                        )
                            category = "education";
                        else if (el.closest("#contact")) category = "contact";
                    }
                    this.allContent.push({
                        element: el,
                        originalContent: el.innerHTML, 
                        text: text,
                        textLower: text.toLowerCase(),
                        category: category,
                    });
                }
            });
        }
        createCategoryFilter() {
            if (
                !this.elements.categoryFilterContainer ||
                this.options.categories.length === 0
            )
                return;
            const select = document.createElement("select");
            select.id = "legendarySearchCategorySelect";
            select.className = "lsearch-category-select";
            select.setAttribute("aria-label", "Filter search by category");
            this.options.categories.forEach((cat) => {
                const option = document.createElement("option");
                option.value = cat;
                option.textContent = cat.charAt(0).toUpperCase() + cat.slice(1);
                select.appendChild(option);
            });
            select.addEventListener("change", (e) => {
                this.currentCategory = e.target.value;
                this.performSearch(this.elements.input.value.trim());
            });
            this.elements.categoryFilterContainer.appendChild(select);
        }
        onInput() {
            const searchTerm = this.elements.input.value.trim();
            if (this.elements.searchBar)
                this.elements.searchBar.classList.toggle(
                    "searching",
                    searchTerm.length > 0
                );
            if (searchTerm.length > 0) {
                this.elements.clearButton.style.display = "flex";
                this.elements.resultsPanel.classList.add("active");
                this.performSearch(searchTerm);
            } else {
                this.clearSearch();
            }
        }
        onKeyDown(e) {
            const items = this.elements.resultsList.querySelectorAll(
                ".lsearch-result-item"
            );
            if (!items.length && e.key !== "Escape") return;
            switch (e.key) {
                case "ArrowDown":
                    e.preventDefault();
                    this.navigateResultsPanel(1);
                    break;
                case "ArrowUp":
                    e.preventDefault();
                    this.navigateResultsPanel(-1);
                    break;
                case "Enter":
                    e.preventDefault();
                    if (
                        this.currentSelectedResultIndex !== -1 &&
                        items[this.currentSelectedResultIndex]
                    ) {
                        items[this.currentSelectedResultIndex].click();
                    } else if (this.onPageHighlights.length > 0) {
                        this.scrollToHighlight(this.onPageHighlights[0]);
                        this.elements.resultsPanel.classList.remove("active");
                    }
                    break;
                case "Escape":
                    this.elements.resultsPanel.classList.remove("active");
                    if (this.elements.searchBar)
                        this.elements.searchBar.classList.remove("active");
                    this.elements.input.blur();
                    break;
            }
        }
        navigateResultsPanel(direction) {
            const items = Array.from(
                this.elements.resultsList.querySelectorAll(
                    ".lsearch-result-item"
                )
            );
            if (!items.length) return;
            if (this.currentSelectedResultIndex !== -1) {
                items[this.currentSelectedResultIndex].classList.remove(
                    "selected"
                );
            }
            this.currentSelectedResultIndex += direction;
            if (this.currentSelectedResultIndex < 0) {
                this.currentSelectedResultIndex = items.length - 1;
            } else if (this.currentSelectedResultIndex >= items.length) {
                this.currentSelectedResultIndex = 0;
            }
            items[this.currentSelectedResultIndex].classList.add("selected");
            items[this.currentSelectedResultIndex].scrollIntoView({
                block: "nearest",
            });
        }
        performSearch(rawSearchTerm) {
            const searchTerm = rawSearchTerm.toLowerCase();
            if (!searchTerm) {
                this.renderResults([]);
                this.clearPageHighlights();
                return;
            }
            const cacheKey = `${searchTerm}-${this.currentCategory}`;
            if (this.searchCache.has(cacheKey)) {
                this.currentResults = this.searchCache.get(cacheKey);
                this.renderResults(this.currentResults);
                this.applyPageHighlights(this.currentResults);
                return;
            }
            const searchTerms = searchTerm
                .split(/\s+/)
                .filter((term) => term.length > 0);
            if (searchTerms.length === 0) {
                this.renderResults([]);
                this.clearPageHighlights();
                return;
            }
            let matchedContent = [];
            this.allContent.forEach((item) => {
                if (
                    this.currentCategory !== "all" &&
                    item.category !== this.currentCategory
                ) {
                    return;
                }
                let score = 0;
                let matchesInText = []; 
                searchTerms.forEach((term) => {
                    if (item.textLower.includes(term)) {
                        score += 10;
                        let startIndex = 0;
                        while (
                            (startIndex = item.textLower.indexOf(
                                term,
                                startIndex
                            )) !== -1
                        ) {
                            matchesInText.push({
                                index: startIndex,
                                length: term.length,
                                term: term,
                            });
                            startIndex += term.length;
                        }
                    }
                    const itemTokens = item.textLower.split(/\s+/);
                    itemTokens.forEach((token) => {
                        if (
                            this.levenshteinDistance(token, term) <=
                            Math.max(1, Math.floor(term.length * 0.3))
                        ) {
                            score += 5;
                        }
                    });
                });
                if (score > 0) {
                    matchesInText.sort((a, b) => a.index - b.index);
                    let consolidatedMatches = [];
                    if (matchesInText.length > 0) {
                        consolidatedMatches.push(matchesInText[0]);
                        for (let i = 1; i < matchesInText.length; i++) {
                            let lastMatch =
                                consolidatedMatches[
                                    consolidatedMatches.length - 1
                                ];
                            let currentMatch = matchesInText[i];
                            if (
                                currentMatch.index <
                                lastMatch.index + lastMatch.length
                            ) {
                                lastMatch.length = Math.max(
                                    lastMatch.length,
                                    currentMatch.index +
                                        currentMatch.length -
                                        lastMatch.index
                                );
                            } else {
                                consolidatedMatches.push(currentMatch);
                            }
                        }
                    }
                    matchedContent.push({
                        ...item,
                        score,
                        matchesInText: consolidatedMatches,
                    });
                }
            });
            matchedContent.sort((a, b) => b.score - a.score);
            this.currentResults = matchedContent;
            this.searchCache.set(cacheKey, matchedContent); 
            this.renderResults(this.currentResults);
            this.applyPageHighlights(this.currentResults);
        }
        levenshteinDistance(a, b) {
            if (a.length === 0) return b.length;
            if (b.length === 0) return a.length;
            const matrix = [];
            for (let i = 0; i <= b.length; i++) matrix[i] = [i];
            for (let j = 0; j <= a.length; j++) matrix[0][j] = j;
            for (let i = 1; i <= b.length; i++) {
                for (let j = 1; j <= a.length; j++) {
                    const cost = a[j - 1] === b[i - 1] ? 0 : 1;
                    matrix[i][j] = Math.min(
                        matrix[i - 1][j] + 1,
                        matrix[i][j - 1] + 1,
                        matrix[i - 1][j - 1] + cost
                    );
                }
            }
            return matrix[b.length][a.length];
        }
        getHighlightedHTML(text, matches) {
            if (!matches || matches.length === 0) return this.escapeHTML(text);
            let resultHTML = "";
            let lastIndex = 0;
            matches.forEach((match) => {
                resultHTML += this.escapeHTML(
                    text.substring(lastIndex, match.index)
                );
                resultHTML += `<mark>${this.escapeHTML(
                    text.substring(match.index, match.index + match.length)
                )}</mark>`;
                lastIndex = match.index + match.length;
            });
            resultHTML += this.escapeHTML(text.substring(lastIndex));
            return resultHTML;
        }
        escapeHTML(str) {
            return str.replace(/[&<>"']/g, function (match) {
                return {
                    "&": "&",
                    "<": "<",
                    ">": ">",
                    '"': '"',
                    "'": "'",
                }[match];
            });
        }
        renderResults(results) {
            this.elements.resultsList.innerHTML = ""; 
            this.currentSelectedResultIndex = -1; 
            if (
                results.length === 0 &&
                this.elements.input.value.trim().length > 0
            ) {
                this.elements.resultsCount.innerHTML = "No results";
                const noResultsLi = document.createElement("li");
                noResultsLi.className = "lsearch-no-results";
                noResultsLi.innerHTML = `
                    <i class="fas fa-ghost"></i>
                    <p>No treasures found for "<span>${this.escapeHTML(
                        this.elements.input.value.trim()
                    )}</span>".</p>
                    <p>Try a different spell or explore all categories.</p>`;
                this.elements.resultsList.appendChild(noResultsLi);
                return;
            }
            this.elements.resultsCount.innerHTML = `<span class="count-number">${
                results.length
            }</span> ${results.length === 1 ? "result" : "results"} found`;
            const resultsToDisplay = results.slice(
                0,
                this.options.maxResultsInPanel
            );
            resultsToDisplay.forEach((item, index) => {
                const li = document.createElement("li");
                li.className = "lsearch-result-item";
                li.dataset.resultIndex = index; 
                let iconClass = "fa-file-alt"; 
                if (item.category === "skills") iconClass = "fa-cogs";
                else if (item.category === "projects")
                    iconClass = "fa-project-diagram";
                else if (item.category === "experiences")
                    iconClass = "fa-briefcase";
                else if (item.category === "education")
                    iconClass = "fa-graduation-cap";
                else if (item.category === "contact")
                    iconClass = "fa-address-card";
                else if (item.element.tagName.startsWith("H"))
                    iconClass = "fa-heading";
                const snippetMaxLength = 150;
                let snippetText = item.text;
                let snippetHTML = "";
                if (item.matchesInText && item.matchesInText.length > 0) {
                    const firstMatch = item.matchesInText[0];
                    const contextRadius = Math.floor(
                        (snippetMaxLength - firstMatch.length) / 2
                    );
                    let snippetStart = Math.max(
                        0,
                        firstMatch.index - contextRadius
                    );
                    let snippetEnd = Math.min(
                        item.text.length,
                        firstMatch.index + firstMatch.length + contextRadius
                    );
                    snippetText =
                        (snippetStart > 0 ? "…" : "") +
                        item.text.substring(snippetStart, snippetEnd) +
                        (snippetEnd < item.text.length ? "…" : "");
                    let adjustedMatches = item.matchesInText
                        .map((m) => ({
                            index:
                                m.index -
                                snippetStart +
                                (snippetStart > 0 ? 1 : 0), 
                            length: m.length,
                        }))
                        .filter(
                            (m) => m.index >= 0 && m.index < snippetText.length
                        );
                    snippetHTML = this.getHighlightedHTML(
                        snippetText,
                        adjustedMatches
                    );
                } else {
                    snippetHTML = this.escapeHTML(
                        snippetText.substring(0, snippetMaxLength) +
                            (snippetText.length > snippetMaxLength ? "…" : "")
                    );
                }
                li.innerHTML = `
                    <i class="fas ${iconClass} result-icon"></i>
                    <div class="result-content-wrapper">
                        <h4 class="result-title">${this.getHighlightedHTML(
                            item.element.dataset.searchTitle ||
                                item.element.textContent.substring(0, 60),
                            item.matchesInText
                        )}</h4>
                        <p class="result-snippet">${snippetHTML}</p>
                    </div>
                    <span class="result-category-tag">${
                        item.category.charAt(0).toUpperCase() +
                        item.category.slice(1)
                    }</span>
                `;
                li.addEventListener("click", () => {
                    this.makeContentVisible(item.element);
                    this.scrollToHighlight(item.element);
                    this.elements.resultsPanel.classList.remove("active");
                    if (this.elements.searchBar)
                        this.elements.searchBar.classList.remove("active");
                    this.clearPageHighlights(); 
                    item.element.innerHTML = this.getHighlightedHTML(
                        item.originalContent,
                        item.matchesInText
                    );
                    this.onPageHighlights = Array.from(
                        item.element.querySelectorAll("mark")
                    );
                    this.onPageHighlights.forEach((mark) =>
                        mark.classList.add("search-term-highlight")
                    );
                    if (this.onPageHighlights.length > 0) {
                        this.currentOnPageHighlightIndex = 0;
                        this.onPageHighlights[0].classList.add(
                            "current-match-onpage"
                        );
                        this.updateFloatingNavStatus();
                    }
                    this.showFloatingNav();
                });
                this.elements.resultsList.appendChild(li);
            });
        }
        applyPageHighlights(results) {
            this.clearPageHighlights(); 
            let allMarksOnPage = [];
            results.forEach((item) => {
                item.element.innerHTML = this.getHighlightedHTML(
                    item.originalContent,
                    item.matchesInText
                );
                const marksInElement = Array.from(
                    item.element.querySelectorAll("mark")
                );
                marksInElement.forEach((mark) => {
                    mark.classList.add("search-term-highlight");
                    allMarksOnPage.push(mark);
                });
            });
            this.onPageHighlights = allMarksOnPage;
            this.currentOnPageHighlightIndex = -1;
            if (this.onPageHighlights.length > 0) {
                this.currentOnPageHighlightIndex = 0;
                this.onPageHighlights[0].classList.add("current-match-onpage");
                this.showFloatingNav();
            } else {
                this.hideFloatingNav();
            }
            this.updateFloatingNavStatus();
        }
        clearPageHighlights() {
            this.allContent.forEach((item) => {
                if (item.element.innerHTML !== item.originalContent) {
                    item.element.innerHTML = item.originalContent;
                }
            });
            this.onPageHighlights = [];
            this.currentOnPageHighlightIndex = -1;
            this.hideFloatingNav();
        }
        makeContentVisible(element) {
            const collapsedSection = element.closest(
                '.collapsed, .section-collapsed, [aria-expanded="false"]'
            );
            if (collapsedSection) {
                const expandButton = collapsedSection.querySelector(
                    ".expand-btn, .toggle-btn, [aria-controls]"
                );
                if (expandButton) expandButton.click();
                else {
                    collapsedSection.classList.remove(
                        "collapsed",
                        "section-collapsed"
                    );
                    collapsedSection.setAttribute("aria-expanded", "true");
                }
            }
            const tabContent = element.closest(".tab-content, .tab-pane");
            if (tabContent && !tabContent.classList.contains("active")) {
                const tabId = tabContent.id;
                if (tabId) {
                    const tabButton = document.querySelector(
                        `[data-tab="${tabId}"], [aria-controls="${tabId}"], [href="#${tabId}"]`
                    );
                    if (tabButton) tabButton.click();
                }
                tabContent.classList.add("active", "show"); 
            }
        }
        scrollToHighlight(elementOrMark) {
            if (!elementOrMark) return;
            this.makeContentVisible(elementOrMark); 
            elementOrMark.scrollIntoView({
                behavior: "smooth",
                block: "center",
            });
            if (elementOrMark.classList.contains("search-term-highlight")) {
            } else {
                elementOrMark.style.transition = "none"; 
                elementOrMark.style.transform = "scale(1.02)";
                elementOrMark.style.boxShadow =
                    "0 0 15px rgba(var(--lsearch-primary-rgb), 0.5)";
                setTimeout(() => {
                    elementOrMark.style.transition =
                        "transform 0.3s ease, box-shadow 0.3s ease";
                    elementOrMark.style.transform = "scale(1)";
                    elementOrMark.style.boxShadow = "";
                }, 300);
            }
        }
        clearSearch() {
            this.elements.input.value = "";
            this.elements.clearButton.style.display = "none";
            this.elements.resultsPanel.classList.remove("active");
            if (this.elements.searchBar) {
                this.elements.searchBar.classList.remove("searching");
                this.elements.searchBar.classList.remove("active");
            }
            this.elements.resultsList.innerHTML = "";
            this.elements.resultsCount.textContent = "";
            this.clearPageHighlights();
            this.currentResults = [];
            this.currentSelectedResultIndex = -1;
        }
        createFloatingNavigation() {
            this.floatingNav = document.createElement("div");
            this.floatingNav.className = "lsearch-floating-nav";
            this.floatingNav.id = "legendarySearchFloatingNav";
            this.floatingNav.innerHTML = `
                <div class="lsearch-nav-info">
                    <span class="lsearch-current-index">0</span>/<span class="lsearch-total-count">0</span>
                </div>
                <div class="lsearch-nav-buttons">
                    <button class="lsearch-nav-prev" aria-label="Previous match"><i class="fas fa-arrow-up"></i></button>
                    <button class="lsearch-nav-next" aria-label="Next match"><i class="fas fa-arrow-down"></i></button>
                    <button class="lsearch-nav-close" aria-label="Close search navigation"><i class="fas fa-times"></i></button>
                </div>`;
            document.body.appendChild(this.floatingNav);
            this.floatingNav
                .querySelector(".lsearch-nav-prev")
                .addEventListener("click", () =>
                    this.navigateOnPageHighlights(-1)
                );
            this.floatingNav
                .querySelector(".lsearch-nav-next")
                .addEventListener("click", () =>
                    this.navigateOnPageHighlights(1)
                );
            this.floatingNav
                .querySelector(".lsearch-nav-close")
                .addEventListener("click", () => {
                    this.clearPageHighlights(); 
                });
        }
        showFloatingNav() {
            if (this.onPageHighlights.length > 0 && this.floatingNav) {
                this.floatingNav.classList.add("visible");
            }
        }
        hideFloatingNav() {
            if (this.floatingNav) {
                this.floatingNav.classList.remove("visible");
            }
        }
        updateFloatingNavStatus() {
            if (!this.floatingNav || this.onPageHighlights.length === 0) return;
            const currentIndexEl = this.floatingNav.querySelector(
                ".lsearch-current-index"
            );
            const totalCountEl = this.floatingNav.querySelector(
                ".lsearch-total-count"
            );
            currentIndexEl.textContent = this.currentOnPageHighlightIndex + 1;
            totalCountEl.textContent = this.onPageHighlights.length;
            this.floatingNav.querySelector(".lsearch-nav-prev").disabled =
                this.onPageHighlights.length <= 1;
            this.floatingNav.querySelector(".lsearch-nav-next").disabled =
                this.onPageHighlights.length <= 1;
        }
        navigateOnPageHighlights(direction) {
            if (this.onPageHighlights.length === 0) return;
            if (this.currentOnPageHighlightIndex !== -1) {
                this.onPageHighlights[
                    this.currentOnPageHighlightIndex
                ].classList.remove("current-match-onpage");
            }
            this.currentOnPageHighlightIndex =
                (this.currentOnPageHighlightIndex +
                    direction +
                    this.onPageHighlights.length) %
                this.onPageHighlights.length;
            const currentMark = this.onPageHighlights[
                this.currentOnPageHighlightIndex
            ];
            currentMark.classList.add("current-match-onpage");
            this.scrollToHighlight(currentMark);
            this.updateFloatingNavStatus();
        }
    }
    new LegendarySearch({
    });
});