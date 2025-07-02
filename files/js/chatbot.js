(() => {
    "use strict";
    document.addEventListener("DOMContentLoaded", () => {
        const chatbotContainer = document.getElementById("chatbot-container");
        const chatbotTrigger = document.getElementById("chatbot-trigger");
        const chatbotClose = document.getElementById("chatbot-close");
        const chatbotMinimize = document.getElementById("chatbot-minimize");
        const chatbotMessages = document.getElementById("chatbot-messages");
        const chatbotInput = document.getElementById("chatbot-input");
        const chatbotSend = document.getElementById("chatbot-send");
        const suggestionChips = document.getElementById(
            "chatbot-suggestion-chips"
        );
        let chatHistory = [];
        let isTyping = false;
        let botMessageQueue = [];
        let lastContext = null;
        let messageSearchIndex = {};
        let voiceEnabled = false;
        let cachedResponses = {};
        let continuousListeningMode = false; 
        let analyticsData = {
            questionTopics: {},
            sessionsCount: 0,
            interactionsPerSession: [],
            currentSession: {
                startTime: null,
                interactions: 0,
                topics: [],
                duration: 0,
                lastInteraction: null
            },
        }; 
        // Try to load analytics data from localStorage on initialization
        try {
            const savedAnalytics = localStorage.getItem("chatbotAnalytics");
            if (savedAnalytics) {
                const parsedData = JSON.parse(savedAnalytics);
                analyticsData = {
                    ...parsedData,
                    currentSession: {
                        startTime: null,
                        interactions: 0,
                        topics: [],
                        duration: 0,
                        lastInteraction: null
                    }
                };
                console.log("Analytics data loaded from storage");
            }
        } catch (error) {
            console.error("Error loading analytics data:", error);
        }
        const logoPath = "files/logo.png";
        const socialMediaProfiles = {
            credly: "https://www.credly.com/users/kholipha-ahmmad-al-amin",
            upwork: "https://www.upwork.com/freelancers/~012aa2f79584cb8722",
            upworkAlt:
                "https://www.upwork.com/freelancers/~012aa2f79584cb8722?viewMode=1",
            tumblr: "https://www.tumblr.com/blog/kholifaalamin",
            reddit: "https://www.reddit.com/user/Far_Welder_848/",
            x: "https://x.com/al_amin5519",
            youtube: "https://www.youtube.com/@kholifaahmadal-amin5743",
            facebook: "https://www.facebook.com/kholipha.ahmmad.al.amin",
            pinterest: "https://www.pinterest.com/kholifaahmad/",
            tiktok: "https://www.tiktok.com/@anms.alamin",
            threads: "https://www.threads.net/@kholipha_ahmmad_alamin",
            linkedin:
                "https://www.linkedin.com/in/kholipha-ahmmad-al-amin-3856b1305",
            github: "https://github.com/anms5519",
            gitlab: "https://gitlab.com/kholifaahmadalamin",
            dribbble: "https://dribbble.com/anms551911",
            behance: "https://www.behance.net/kholifaal-amin",
            figma: "https://www.figma.com/@kholiphaahmmada",
            braintrust: "https://app.usebraintrust.com/talent/1545461/",
            skool:
                "https://www.skool.com/@kholipha-ahmmad-al-amin-6660?t=posts",
            twitch: "https://www.twitch.tv/anms5519",
            messenger: "https://www.messenger.com/t/100025617583861",
            instagram: "https://www.instagram.com/kholipha_ahmmad_alamin/",
            medium: "https://medium.com/@kholifaahmadalamin",
            codepen: "https://codepen.io/Kholipha-Ahmmad-Al-Amin",
            devto: "https://dev.to/kholipha_ahmmadalamin_0",
            quora: "https://bn.quora.com/profile/Kholifa-Ahmad-Al-Amin",
            bluesky: "https://bsky.app/profile/anms5519.bsky.social",
            mastodon: "https://mastodon.social/@anms5519",
            telegram: "https://t.me/@anms5519",
            whatsapp: "https://wa.me/+8801320389539",
            imo: "https://s.imoim.net/c7a7iC",
            skype: "https://join.skype.com/invite/xPNEo3sIInoC",
            discord: "https://discord.com/users/1303375435559866428",
            huggingface: "https://huggingface.co/ANMS5519",
            replit: "https://replit.com/@kholifaahmadala",
            webflow: "https://webflow.com/@anms5519use",
            kaggle: "https://www.kaggle.com/kholiphaahmmadalamin",
            gdev: "https://g.dev/kholipha",
            googlecloud:
                "https://www.cloudskillsboost.google/public_profiles/d81586d4-bc86-436d-8fb9-ff5eaa221080",
            twine: "https://www.twine.net/kholifaahmadalamin94",
            hackerrank: "https://www.hackerrank.com/profile/kholifaahmadala1",
            leetcode: "https://leetcode.com/u/Kholipha/",
            producthunt: "https://www.producthunt.com/@kholipha_ahmmad_al_amin",
            wellfound: "https://wellfound.com/u/kholipha-ahmmad-al-amin",
            fiverr: "https://www.fiverr.com/kholifaalamin/",
            researchgate:
                "https://www.researchgate.net/profile/Kholipha-Ahmmad-Al-Amin",
            coursera:
                "https://www.coursera.org/user/12144246cee28c6b4d227edf7eeeb03f",
            udemy: "https://www.udemy.com/user/kholipha-ahmmad-al-amin/",
            deviantart: "https://www.deviantart.com/anms5519",
            artstation: "https://www.artstation.com/anms_al-amin6",
            codesandbox: "https://codesandbox.io/u/anms5519",
            jsfiddle: "https://jsfiddle.net/u/anms/",
            glitch: "https://glitch.com/@kholifaahmadalamin",
        };
        const personalInfo = {
            name: "KHOLIPHA AHMMAD AL-AMIN",
            nickname: "Kholifa",
            alias: "Anms",
            username: "ANMS5519",
            fullName: "KHOLIPHA AHMMAD AL-AMIN",
            givenName: "KHOLIPHA AHMMAD",
            surname: "AL-AMIN",
            dateOfBirth: new Date("2002-07-26T04:00:00+06:00"),
            gender: "MALE",
            placeOfBirth: "DHAKA, BANGLADESH",
            nationality: "BANGLADESHI",
            religion: "ISLAM",
            maritalStatus: "SINGLE",
            profession: "STUDENT",
            citizenshipType: "BY BIRTH",
            contact: {
                mobile: "+8801320389539",
                alternateMobile: "+8801749103303",
                email: "kholifaahmadalamin@gmail.com",
            },
            addresses: {
                permanent:
                    "1676 Boro Keshabpur, Kadirpur, Shibchar, Munshi Kadirpur - 7930, Madaripur, BANGLADESH",
                present:
                    "176 West Arjatpara, Tejgaon, Tejgaon - 1215, DHAKA, BANGLADESH",
            },
            passport: {
                type: "P (Ordinary)",
                countryCode: "BGD",
                number: "A08677968",
                pages: "48 pages",
                duration: "10 Years",
                issueDate: new Date("2024-10-20"),
                expiryDate: new Date("2034-10-19"),
                issuingAuthority: "DIP/DHAKA",
                passportOffice: "AGARGAON",
                deliveryType: "REGULAR",
                onlineRegID: "OID1023918907",
            },
            parents: {
                father: {
                    name: "MD AKMAN HOSSAIN",
                    nationalID: "1014311318",
                    profession: "PHARMACIST",
                    nationality: "BANGLADESHI",
                },
                mother: {
                    name: "ROHANA AKTER RANI",
                    nationalID: "8228625219",
                    profession: "PHARMACIST",
                    nationality: "BANGLADESHI",
                },
            },
            emergency: {
                name: "ROHANA AKTER RANI",
                relationship: "MOTHER",
                address:
                    "176 West Arjatpara, Tejgaon, Tejgaon - 1215, DHAKA, BANGLADESH",
                telephone: "+8801749103303",
            },
        };
        const createChatToolbar = () => {
            if (document.querySelector(".chatbot-toolbar")) return;
            const toolbar = document.createElement("div");
            toolbar.className = "chatbot-toolbar";
            const searchBtn = document.createElement("button");
            searchBtn.innerHTML = '<i class="fas fa-search"></i>';
            searchBtn.title = "Search conversation";
            searchBtn.className = "toolbar-btn";
            searchBtn.addEventListener("click", toggleSearchBox);
            const voiceBtn = document.createElement("button");
            voiceBtn.innerHTML = '<i class="fas fa-microphone"></i>';
            voiceBtn.title = "Voice interaction";
            voiceBtn.className = "toolbar-btn";
            voiceBtn.addEventListener("click", toggleVoiceInteraction);
            const continuousVoiceBtn = document.createElement("button");
            continuousVoiceBtn.innerHTML =
                '<i class="fas fa-microphone-alt"></i>';
            continuousVoiceBtn.title = "Continuous voice mode";
            continuousVoiceBtn.className = "toolbar-btn";
            continuousVoiceBtn.addEventListener("click", toggleContinuousVoice);
            const analyticsBtn = document.createElement("button");
            analyticsBtn.innerHTML = '<i class="fas fa-chart-bar"></i>';
            analyticsBtn.title = "View conversation analytics";
            analyticsBtn.className = "toolbar-btn";
            analyticsBtn.addEventListener("click", showAnalyticsView);
            const exportBtn = document.createElement("button");
            exportBtn.innerHTML = '<i class="fas fa-download"></i>';
            exportBtn.title = "Export conversation";
            exportBtn.className = "toolbar-btn";
            exportBtn.addEventListener("click", exportConversation);
            const clearBtn = document.createElement("button");
            clearBtn.innerHTML = '<i class="fas fa-trash-alt"></i>';
            clearBtn.title = "Clear conversation";
            clearBtn.className = "toolbar-btn";
            clearBtn.addEventListener("click", confirmClearConversation);
            toolbar.appendChild(searchBtn);
            toolbar.appendChild(voiceBtn);
            toolbar.appendChild(continuousVoiceBtn);
            toolbar.appendChild(analyticsBtn);
            toolbar.appendChild(exportBtn);
            toolbar.appendChild(clearBtn);
            const header = document.getElementById("chatbot-header");
            if (header && header.nextSibling) {
                chatbotContainer.insertBefore(toolbar, header.nextSibling);
            } else if (chatbotMessages) {
                chatbotContainer.insertBefore(toolbar, chatbotMessages);
            }
            const searchBox = document.createElement("div");
            searchBox.className = "chatbot-search-box hidden";
            searchBox.innerHTML = `
                <input type="text" placeholder="Search conversation..." id="chatbot-search-input">
                <div class="search-controls">
                    <button id="search-prev"><i class="fas fa-arrow-up"></i></button>
                    <span id="search-results-count">0/0</span>
                    <button id="search-next"><i class="fas fa-arrow-down"></i></button>
                    <button id="search-close"><i class="fas fa-times"></i></button>
                </div>
            `;
            chatbotContainer.insertBefore(searchBox, toolbar.nextSibling);
            initSearchFunctionality();
            const style = document.createElement("style");
            style.textContent = `
                .chatbot-toolbar {
                    display: flex;
                    justify-content: flex-end;
                    padding: 0.8vh 1.5vh;
                    background: rgba(30, 30, 50, 0.6);
                    border-bottom: 0.1vh solid rgba(100, 100, 255, 0.2);
                    gap: 1vh;
                }
                .toolbar-btn {
                    background: rgba(60, 60, 100, 0.4);
                    border: none;
                    color: rgba(255, 255, 255, 0.8);
                    width: 3vh;
                    height: 3vh;
                    border-radius: 50%;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    cursor: pointer;
                    transition: all 0.2s ease;
                    font-size: 1.4vh;
                }
                .toolbar-btn:hover {
                    background: rgba(80, 80, 150, 0.6);
                    transform: scale(1.1);
                    color: white;
                }
                .chatbot-search-box {
                    display: flex;
                    padding: 1vh;
                    background: rgba(20, 20, 40, 0.95);
                    border-bottom: 0.1vh solid rgba(100, 100, 255, 0.2);
                    transition: all 0.3s ease;
                    overflow: hidden;
                    max-height: 5vh;
                }
                .chatbot-search-box.hidden {
                    max-height: 0;
                    padding: 0 1vh;
                    opacity: 0;
                }
                .chatbot-search-box input {
                    flex: 1;
                    background: rgba(255, 255, 255, 0.1);
                    border: 0.1vh solid rgba(255, 255, 255, 0.2);
                    padding: 0.8vh 1.2vh;
                    border-radius: 2vh;
                    color: white;
                    font-size: 1.4vh;
                }
                .search-controls {
                    display: flex;
                    align-items: center;
                    margin-left: 1vh;
                    gap: 0.5vh;
                }
                .search-controls button {
                    background: rgba(60, 60, 100, 0.4);
                    border: none;
                    color: rgba(255, 255, 255, 0.8);
                    width: 2.8vh;
                    height: 2.8vh;
                    border-radius: 50%;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    cursor: pointer;
                    transition: all 0.2s ease;
                    font-size: 1.2vh;
                }
                .search-controls button:hover {
                    background: rgba(80, 80, 150, 0.6);
                }
                #search-results-count {
                    font-size: 1.2vh;
                    color: rgba(255, 255, 255, 0.7);
                    margin: 0 0.5vh;
                }
                .bot-message.expanded-message {
                    max-height: none;
                }
                .message-content.long-response {
                    max-height: 50vh;
                    overflow-y: auto;
                    position: relative;
                    padding-right: 1vh;
                }
                .message-controls {
                    display: flex;
                    justify-content: flex-end;
                    margin-top: 1vh;
                    gap: 0.8vh;
                }
                .message-control-btn {
                    background: rgba(80, 80, 150, 0.3);
                    border: none;
                    color: rgba(255, 255, 255, 0.8);
                    padding: 0.5vh 1vh;
                    border-radius: 1.5vh;
                    font-size: 1.2vh;
                    cursor: pointer;
                    transition: all 0.2s ease;
                    display: flex;
                    align-items: center;
                    gap: 0.5vh;
                }
                .message-control-btn:hover {
                    background: rgba(100, 100, 200, 0.5);
                }
                .message-control-btn i {
                    font-size: 1.1vh;
                }
                pre {
                    background: rgba(30, 30, 50, 0.5);
                    border-radius: 0.8vh;
                    padding: 1.2vh;
                    overflow-x: auto;
                    margin: 1vh 0;
                    border-left: 0.3vh solid rgba(102, 0, 255, 0.5);
                }
                code {
                    font-family: 'Fira Code', monospace;
                    font-size: 1.2vh;
                    color: rgba(255, 255, 255, 0.9);
                }
                .search-highlight {
                    background-color: rgba(255, 255, 0, 0.3);
                    border-radius: 0.3vh;
                }
                .search-highlight.current {
                    background-color: rgba(255, 165, 0, 0.5);
                    border-radius: 0.3vh;
                }
                .voice-recording {
                    animation: pulse 1.5s infinite;
                    background: rgba(255, 50, 50, 0.5) !important;
                }
                @keyframes pulse {
                    0% {
                        transform: scale(1);
                        box-shadow: 0 0 0 0 rgba(255, 50, 50, 0.7);
                    }
                    70% {
                        transform: scale(1.1);
                        box-shadow: 0 0 0 0.8vh rgba(255, 50, 50, 0);
                    }
                    100% {
                        transform: scale(1);
                        box-shadow: 0 0 0 0 rgba(255, 50, 50, 0);
                    }
                }
                @keyframes shimmer {
                    0% {
                        background-position: -100% 0;
                    }
                    100% {
                        background-position: 100% 0;
                    }
                }
                .message-loading {
                    position: relative;
                    overflow: hidden;
                }
                .message-loading::before {
                    content: '';
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    background: linear-gradient(to right, transparent 0%, rgba(255, 255, 255, 0.2) 50%, transparent 100%);
                    background-size: 200% 100%;
                    animation: shimmer 2s infinite;
                }
                .helpful-buttons {
                    display: flex;
                    flex-wrap: wrap;
                    gap: 0.8vh;
                    margin-top: 1vh;
                    justify-content: flex-end;
                }
                .helpful-btn {
                    background: rgba(60, 30, 120, 0.3);
                    border: 0.1vh solid rgba(102, 0, 255, 0.2);
                    padding: 0.5vh 1vh;
                    border-radius: 2vh;
                    color: rgba(255, 255, 255, 0.9);
                    font-size: 1vh;
                    cursor: pointer;
                    transition: all 0.3s ease;
                }
                .helpful-btn:hover {
                    background: rgba(102, 0, 255, 0.3);
                    transform: translateY(-0.2vh);
                }
                .chatbot-modal {
                    position: absolute;
                    top: 50%;
                    left: 50%;
                    transform: translate(-50%, -50%);
                    background: rgba(20, 20, 40, 0.98);
                    border-radius: 1.5vh;
                    padding: 2vh;
                    z-index: 1001;
                    box-shadow: 0 0.5vh 2vh rgba(0, 0, 0, 0.3);
                    border: 0.1vh solid rgba(102, 0, 255, 0.3);
                    width: 80%;
                    max-width: 30vh;
                    text-align: center;
                    backdrop-filter: blur(1vh);
                }
                .chatbot-modal-title {
                    color: white;
                    margin: 0 0 1.5vh 0;
                    font-size: 1.4vh;
                    font-weight: 500;
                }
                .chatbot-modal-content {
                    color: rgba(255, 255, 255, 0.8);
                    margin-bottom: 1.5vh;
                    font-size: 1.2vh;
                    line-height: 1.6;
                }
                .chatbot-modal-buttons {
                    display: flex;
                    justify-content: center;
                    gap: 1.5vh;
                }
                .chatbot-modal-btn {
                    padding: 0.8vh 1.5vh;
                    border-radius: 2vh;
                    font-size: 1.1vh;
                    cursor: pointer;
                    transition: all 0.3s ease;
                    border: none;
                }
                .chatbot-modal-btn.confirm {
                    background: rgba(255, 50, 50, 0.8);
                    color: white;
                }
                .chatbot-modal-btn.cancel {
                    background: rgba(60, 60, 100, 0.4);
                    color: white;
                }
                .chatbot-modal-btn:hover {
                    transform: translateY(-0.2vh);
                    opacity: 0.9;
                }
                .chatbot-overlay {
                    position: absolute;
                    top: 0;
                    left: 0;
                    right: 0;
                    bottom: 0;
                    background: rgba(0, 0, 0, 0.5);
                    z-index: 1000;
                    backdrop-filter: blur(0.3vh);
                }
            `;
            document.head.appendChild(style);
        };
        const calculatePreciseAge = () => {
            const now = new Date();
            const dob = personalInfo.dateOfBirth;
            let years = now.getFullYear() - dob.getFullYear();
            let months = now.getMonth() - dob.getMonth();
            let days = now.getDate() - dob.getDate();
            let hours = now.getHours() - dob.getHours();
            let minutes = now.getMinutes() - dob.getMinutes();
            let seconds = now.getSeconds() - dob.getSeconds();
            if (seconds < 0) {
                seconds += 60;
                minutes--;
            }
            if (minutes < 0) {
                minutes += 60;
                hours--;
            }
            if (hours < 0) {
                hours += 24;
                days--;
            }
            if (days < 0) {
                const lastMonth = new Date(
                    now.getFullYear(),
                    now.getMonth(),
                    0
                ).getDate();
                days += lastMonth;
                months--;
            }
            if (months < 0) {
                months += 12;
                years--;
            }
            return `${years} years, ${months} months, ${days} days, ${hours} hours, ${minutes} minutes, and ${seconds} seconds`;
        };
        const toggleSearchBox = () => {
            const searchBox = document.querySelector(".chatbot-search-box");
            searchBox.classList.toggle("hidden");
            if (!searchBox.classList.contains("hidden")) {
                const searchInput = document.getElementById(
                    "chatbot-search-input"
                );
                searchInput.focus();
            } else {
                removeAllHighlights();
            }
        };
        const initSearchFunctionality = () => {
            const searchInput = document.getElementById("chatbot-search-input");
            const prevBtn = document.getElementById("search-prev");
            const nextBtn = document.getElementById("search-next");
            const closeBtn = document.getElementById("search-close");
            const resultsCount = document.getElementById(
                "search-results-count"
            );
            let currentHighlightIndex = 0;
            let highlights = [];
            searchInput.addEventListener("input", () => {
                performSearch(searchInput.value);
            });
            prevBtn.addEventListener("click", () => {
                navigateSearchResults("prev");
            });
            nextBtn.addEventListener("click", () => {
                navigateSearchResults("next");
            });
            closeBtn.addEventListener("click", () => {
                toggleSearchBox();
            });
            searchInput.addEventListener("keydown", (e) => {
                if (e.key === "Enter") {
                    navigateSearchResults("next");
                } else if (e.key === "Escape") {
                    toggleSearchBox();
                }
            });
            const performSearch = (query) => {
                removeAllHighlights();
                if (!query) {
                    resultsCount.textContent = "0/0";
                    return;
                }
                const messageElements = chatbotMessages.querySelectorAll(
                    ".message-content"
                );
                let highlightIndex = 0;
                let matchCount = 0;
                messageElements.forEach((element) => {
                    const content = element.textContent;
                    const regex = new RegExp(query, "gi");
                    let match;
                    if (!element.hasAttribute("data-original")) {
                        element.setAttribute(
                            "data-original",
                            element.innerHTML
                        );
                    }
                    let html = element.getAttribute("data-original");
                    let lastIndex = 0;
                    let newHtml = "";
                    while ((match = regex.exec(content)) !== null) {
                        matchCount++;
                        const matchText = match[0];
                        const matchIndex = match.index;
                        newHtml += html.substring(
                            lastIndex,
                            html.indexOf(matchText, lastIndex)
                        );
                        newHtml += `<span class="search-highlight" data-highlight-index="${highlightIndex}">${matchText}</span>`;
                        lastIndex =
                            html.indexOf(matchText, lastIndex) +
                            matchText.length;
                        highlightIndex++;
                    }
                    newHtml += html.substring(lastIndex);
                    element.innerHTML = newHtml;
                });
                highlights = document.querySelectorAll(".search-highlight");
                currentHighlightIndex = highlights.length > 0 ? 0 : -1;
                if (highlights.length > 0) {
                    highlights[0].classList.add("current");
                    scrollToHighlight(highlights[0]);
                }
                resultsCount.textContent =
                    highlights.length > 0
                        ? `${currentHighlightIndex + 1}/${highlights.length}`
                        : "0/0";
            };
            const navigateSearchResults = (direction) => {
                if (highlights.length === 0) return;
                highlights[currentHighlightIndex].classList.remove("current");
                if (direction === "next") {
                    currentHighlightIndex =
                        (currentHighlightIndex + 1) % highlights.length;
                } else {
                    currentHighlightIndex =
                        (currentHighlightIndex - 1 + highlights.length) %
                        highlights.length;
                }
                highlights[currentHighlightIndex].classList.add("current");
                scrollToHighlight(highlights[currentHighlightIndex]);
                resultsCount.textContent = `${currentHighlightIndex + 1}/${
                    highlights.length
                }`;
            };
            const scrollToHighlight = (element) => {
                const messageElement = element.closest(".message-content");
                if (messageElement) {
                    const parentMessage = messageElement.closest(
                        ".bot-message, .user-message"
                    );
                    if (parentMessage) {
                        parentMessage.scrollIntoView({
                            behavior: "smooth",
                            block: "center",
                        });
                        if (
                            messageElement.classList.contains("long-response")
                        ) {
                            messageElement.scrollTop =
                                element.offsetTop -
                                messageElement.offsetTop -
                                messageElement.clientHeight / 2;
                        }
                    }
                }
            };
            const removeAllHighlights = () => {
                const messageElements = chatbotMessages.querySelectorAll(
                    ".message-content[data-original]"
                );
                messageElements.forEach((element) => {
                    element.innerHTML = element.getAttribute("data-original");
                });
                highlights = [];
                currentHighlightIndex = -1;
            };
        };
        const toggleVoiceInteraction = () => {
            if (
                !("webkitSpeechRecognition" in window) &&
                !("SpeechRecognition" in window)
            ) {
                showMessage(
                    "Voice recognition is not supported in your browser."
                );
                return;
            }
            const voiceBtn = document.querySelector(
                ".toolbar-btn:nth-child(2)"
            );
            if (voiceEnabled) {
                voiceEnabled = false;
                voiceBtn.classList.remove("voice-recording");
                if (window.recognition) {
                    window.recognition.stop();
                }
            } else {
                voiceEnabled = true;
                voiceBtn.classList.add("voice-recording");
                const SpeechRecognition =
                    window.SpeechRecognition || window.webkitSpeechRecognition;
                window.recognition = new SpeechRecognition();
                window.recognition.continuous = continuousListeningMode;
                window.recognition.interimResults = false;
                window.recognition.onresult = (event) => {
                    const transcript =
                        event.results[event.results.length - 1][0].transcript;
                    chatbotInput.value = transcript;
                    chatbotInput.focus();
                    if (!continuousListeningMode) {
                        setTimeout(() => {
                            processInput();
                        }, 500);
                    } else {
                        if (
                            transcript.toLowerCase().endsWith("send") ||
                            transcript.toLowerCase().endsWith("process") ||
                            transcript.toLowerCase().includes("question") ||
                            transcript.toLowerCase().includes("ask")
                        ) {
                            chatbotInput.value = chatbotInput.value.replace(
                                /\s+(send|process|question|ask)$/i,
                                ""
                            );
                            setTimeout(() => {
                                processInput();
                            }, 300);
                        }
                    }
                };
                window.recognition.onend = () => {
                    if (continuousListeningMode && voiceEnabled) {
                        window.recognition.start();
                    } else {
                        voiceEnabled = false;
                        voiceBtn.classList.remove("voice-recording");
                    }
                };
                window.recognition.onerror = (event) => {
                    console.error("Speech recognition error:", event.error);
                    if (!continuousListeningMode) {
                        voiceEnabled = false;
                        voiceBtn.classList.remove("voice-recording");
                    }
                    if (event.error === "no-speech") {
                        showMessage("No speech detected. Please try again.");
                    } else if (event.error === "network") {
                        showMessage(
                            "Network error. Please check your connection."
                        );
                    } else {
                        showMessage(`Error: ${event.error}. Please try again.`);
                    }
                    if (continuousListeningMode && voiceEnabled) {
                        setTimeout(() => {
                            try {
                                window.recognition.start();
                            } catch (e) {
                                console.error(
                                    "Could not restart recognition:",
                                    e
                                );
                            }
                        }, 1000);
                    }
                };
                window.recognition.start();
            }
        };
        const exportConversation = () => {
            if (chatHistory.length === 0) {
                showMessage("No conversation to export.");
                return;
            }
            showModal({
                title: "Export Conversation",
                content: "Choose a format to export your conversation:",
                buttons: [
                    {
                        text: "Text (.txt)",
                        onClick: exportAsTxt,
                    },
                    {
                        text: "JSON (.json)",
                        onClick: exportAsJson,
                    },
                    {
                        text: "Cancel",
                        onClick: closeModal,
                    },
                ],
            });
        };
        const showModal = ({ title, content, buttons, customClass }) => {
            closeModal();
            const overlay = document.createElement("div");
            overlay.className = "chatbot-overlay";
            const modal = document.createElement("div");
            modal.className = "chatbot-modal" + (customClass ? ` ${customClass}` : '');
            const titleElement = document.createElement("h3");
            titleElement.className = "chatbot-modal-title";
            titleElement.textContent = title;
            modal.appendChild(titleElement);
            const contentElement = document.createElement("div");
            contentElement.className = "chatbot-modal-content";
            
            // Support for HTML content
            if (content.includes('<')) {
                contentElement.innerHTML = content;
            } else {
                contentElement.textContent = content;
            }
            
            modal.appendChild(contentElement);
            
            // Only add buttons container if buttons are provided
            if (buttons && buttons.length > 0) {
                const buttonsContainer = document.createElement("div");
                buttonsContainer.className = "chatbot-modal-buttons";
                buttons.forEach((button) => {
                    const btn = document.createElement("button");
                    btn.className = `chatbot-modal-btn ${button.class || ""}`;
                    btn.textContent = button.text;
                    btn.addEventListener("click", button.onClick);
                    buttonsContainer.appendChild(btn);
                });
                modal.appendChild(buttonsContainer);
            }
            
            chatbotContainer.appendChild(overlay);
            chatbotContainer.appendChild(modal);
        };
        const closeModal = () => {
            const overlay = chatbotContainer.querySelector(".chatbot-overlay");
            const modal = chatbotContainer.querySelector(".chatbot-modal");
            if (overlay) overlay.remove();
            if (modal) modal.remove();
        };
        const exportAsTxt = () => {
            closeModal();
            let text = "Conversation with Kholipha Ahmmad Al-Amin\n";
            text += "==============================================\n\n";
            chatHistory.forEach((message) => {
                const timestamp = new Date(message.timestamp).toLocaleString();
                const role = message.role === "user" ? "You" : "Kholipha";
                text += `[${timestamp}] ${role}: ${message.content}\n\n`;
            });
            const blob = new Blob([text], { type: "text/plain" });
            const url = URL.createObjectURL(blob);
            const a = document.createElement("a");
            a.href = url;
            a.download = `conversation-${new Date()
                .toISOString()
                .slice(0, 10)}.txt`;
            a.click();
            URL.revokeObjectURL(url);
        };
        const exportAsJson = () => {
            closeModal();
            const data = {
                title: "Conversation with Kholipha Ahmmad Al-Amin",
                timestamp: new Date().toISOString(),
                messages: chatHistory,
            };
            const blob = new Blob([JSON.stringify(data, null, 2)], {
                type: "application/json",
            });
            const url = URL.createObjectURL(blob);
            const a = document.createElement("a");
            a.href = url;
            a.download = `conversation-${new Date()
                .toISOString()
                .slice(0, 10)}.json`;
            a.click();
            URL.revokeObjectURL(url);
        };
        const confirmClearConversation = () => {
            if (chatHistory.length === 0) {
                showMessage("No conversation to clear.");
                return;
            }
            showModal({
                title: "Clear Conversation",
                content:
                    "Are you sure you want to clear the entire conversation? This cannot be undone.",
                buttons: [
                    {
                        text: "Yes, Clear",
                        class: "confirm",
                        onClick: clearConversation,
                    },
                    {
                        text: "Cancel",
                        class: "cancel",
                        onClick: closeModal,
                    },
                ],
            });
        };
        const clearConversation = () => {
            closeModal();
            chatHistory = [];
            chatbotMessages.innerHTML = "";
            setTimeout(() => {
                showWelcomeMessage();
            }, 300);
            showTemporaryMessage("Conversation cleared.");
        };
        const showTemporaryMessage = (text) => {
            const message = document.createElement("div");
            message.className = "temporary-message";
            message.textContent = text;
            message.style.cssText = `
                position: absolute;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                background: rgba(0, 0, 0, 0.7);
                color: white;
                padding: 1vh 2vh;
                border-radius: 2vh;
                z-index: 1000;
                font-size: 1.3vh;
                opacity: 0;
                transition: opacity 0.3s ease;
            `;
            chatbotContainer.appendChild(message);
            setTimeout(() => {
                message.style.opacity = "1";
            }, 10);
            setTimeout(() => {
                message.style.opacity = "0";
                setTimeout(() => {
                    message.remove();
                }, 300);
            }, 2000);
        };
        const showMessage = (text) => {
            const messageElement = document.createElement("div");
            messageElement.className = "status-message";
            messageElement.textContent = text;
            messageElement.style.cssText = `
                text-align: center;
                padding: 1vh;
                margin: 1vh 2vh;
                background: rgba(255, 255, 255, 0.1);
                border-radius: 1vh;
                font-size: 1.2vh;
                color: rgba(255, 255, 255, 0.7);
            `;
            chatbotMessages.appendChild(messageElement);
            chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
            setTimeout(() => {
                messageElement.style.opacity = "0";
                setTimeout(() => {
                    if (messageElement.parentNode === chatbotMessages) {
                        chatbotMessages.removeChild(messageElement);
                    }
                }, 300);
            }, 3000);
        };
        const chatbotKnowledge = {
            skills: {
                technical: [
                    "Python, C++, Java, JavaScript, C#, SQL, HTML5, CSS3, PHP, Swift, Kotlin, Dart, Go, Machine Learning, Deep Learning (PyTorch), Generative AI (Amazon Bedrock), Computer Vision, Image Processing, Data Visualization, Full-Stack Development, Node.js, React, Angular, Vue.js, Laravel, WordPress, REST APIs, UI/UX Design, SEO, WebGL, Firebase, Unreal Engine, Unity, Game Design Principles, 3D Modeling (Basic), Python Scripting for Games, Git, Docker, Google Cloud Platform (GCP), AWS (Bedrock), PostgreSQL, MySQL, MariaDB, MongoDB, Agile Methodologies, Data Structures, Algorithms, Object-Oriented Programming, Cybersecurity Fundamentals, Blockchain Principles",
                ],
                design: [
                    "UI/UX Design, Adobe Photoshop, Adobe Illustrator, Adobe Creative Suite, Figma, Web Design, Logo Design, Branding, Wireframing, Prototyping, Visual Design, User Experience Research, Digital Art & Animation, CSS Animation, Graphic Design, 3D Modeling (Basic), Color Theory, Typography, Layout Design, Brand Identity, Responsive Design, Mobile-First Design, Digital Painting, Sketching",
                ],
                soft: [
                    "Communication, Problem-solving, Team leadership, Project management, Time management, Critical thinking, Adaptability, Creativity, Collaboration, Mentoring, Emotional Intelligence, Conflict Resolution, Multicultural Communication, Technical Communication, Team Collaboration, Public Speaking, Client Interaction, Customer Service",
                ],
            },
            projects: [
                {
                    name: "Intelligent Healthcare Assistant",
                    description:
                        "AI-powered healthcare assistant that helps diagnose common ailments using deep learning algorithms",
                    technologies: [
                        "Python",
                        "TensorFlow",
                        "Flask",
                        "React",
                        "MongoDB",
                    ],
                },
                {
                    name: "Crypto Market Analyzer",
                    description:
                        "Real-time cryptocurrency market analysis tool with predictive algorithms and custom alerts",
                    technologies: [
                        "JavaScript",
                        "Node.js",
                        "Express",
                        "WebSockets",
                        "Chart.js",
                        "Blockchain APIs",
                    ],
                },
                {
                    name: "Smart Home Automation System",
                    description:
                        "IoT-based home automation system with voice control and AI-powered energy optimization",
                    technologies: [
                        "Python",
                        "Raspberry Pi",
                        "MQTT",
                        "React",
                        "Node.js",
                        "TensorFlow",
                    ],
                },
                {
                    name: "3D Game Engine",
                    description:
                        "Custom game engine with physics simulation and realistic rendering capabilities",
                    technologies: [
                        "C++",
                        "OpenGL",
                        "GLSL",
                        "ImGui",
                        "Bullet Physics",
                    ],
                },
                {
                    name: "Augmented Reality Portfolio",
                    description:
                        "Interactive AR portfolio showcasing projects through immersive 3D experiences",
                    technologies: [
                        "Unity",
                        "ARKit",
                        "ARCore",
                        "C#",
                        "3D Modeling",
                    ],
                },
                {
                    name: "THETAEnhancer+",
                    description:
                        "Advanced AI-driven image restoration and enhancement model for superior image quality",
                    technologies: ["Python", "Deep Learning", "AI Algorithms"],
                },
                {
                    name: "Interactive 3D/FPS Game",
                    description:
                        "Immersive 3D/FPS game developed using Unreal Engine and Python",
                    technologies: ["Unreal Engine", "Python", "Game Design"],
                },
                {
                    name: "Dynamic Web Interfaces",
                    description:
                        "Ultra-advanced CSS styles and animations creating engaging web experiences",
                    technologies: [
                        "HTML",
                        "CSS",
                        "JavaScript",
                        "Advanced CSS Animations",
                    ],
                },
                {
                    name: "AI-Powered Data Visualizer",
                    description:
                        "Interactive platform for data visualization enriched with AI insights",
                    technologies: ["Python", "Power BI", "Data Analytics"],
                },
                {
                    name: "3D Virtual Tour",
                    description:
                        "Fully immersive virtual tour built with Three.js and WebGL for an engaging experience",
                    technologies: ["Three.js", "WebGL", "3D Modeling"],
                },
                {
                    name: "Real-Time Multiplayer Game",
                    description:
                        "Online game featuring advanced animations, responsive controls, and real-time interactivity",
                    technologies: [
                        "JavaScript",
                        "WebSockets",
                        "Game Development",
                    ],
                },
                {
                    name: "Quantum Code Simulator",
                    description:
                        "Real-time simulation and visualization of quantum computing algorithms",
                    technologies: ["JavaScript", "Visualization Libraries"],
                },
                {
                    name: "Blockchain Secure Voting",
                    description:
                        "Decentralized voting system ensuring security via blockchain technology",
                    technologies: ["Blockchain", "Smart Contracts"],
                },
                {
                    name: "AI-Powered Cyber Defense",
                    description:
                        "Real-time threat detection and prevention system using machine learning techniques",
                    technologies: [
                        "Python",
                        "Machine Learning",
                        "Cybersecurity",
                    ],
                },
            ],
            education: [
                {
                    degree:
                        "Bachelor of Science in Computer Science & Engineering",
                    school:
                        "Atish Dipankar University of Science & Technology, Dhaka",
                    period: "Jan 2022 – Aug 2026",
                    additional: "Current CGPA: 3.56/4.00",
                },
                {
                    degree: "Higher Secondary School Certificate",
                    school: "Adamjee Cantonment College, Dhaka",
                    period: "2020",
                    additional: "GPA: 5.00/5.00, Faculty: Science",
                },
                {
                    degree: "Secondary School Certificate",
                    school: "Civil Aviation School & College, Dhaka",
                    period: "2018",
                    additional: "GPA: 5.00/5.00, Faculty: Science",
                },
            ],
            certifications: [
                "HHP (Mobile) Service For Hardware and Software (2024-01)",
                "Mobile Game Development (Cross Platform) (2022-02)",
                "Beginner's Guide to Python 3 Programming (2023-02)",
                "Professional C Programming for Job Interview (2023-06)",
                "EF SET Certificate (2025-02)",
                "CSS (Basic) Certificate (2025-01)",
                "CHAT — Toolkit to Improve Community Engagement in Emergencies (2025-01)",
                "Cybersecurity Analyst Job Simulation (2024-04)",
                "Data Visualization: Empowering Business with Effective Insights (2024-04)",
                "A2Z Of Finance: Finance Beginner Course (2024-04)",
                "Building Generative AI Applications Using Amazon Bedrock (June 9, 2024)",
                "SDG Primer Certificate (Monitoring & Evaluation Analyst at UNDP Bangladesh, 7th September 2024)",
                "Google Cloud Professional Machine Learning Engineer (2022)",
                "AWS Certified Solutions Architect (2021)",
                "TensorFlow Developer Certificate (2020)",
            ],
            experience: [
                {
                    role: "WordPress Design & Developer Intern",
                    company: "Akbor Skills Development Limited, Dhaka",
                    period: "Mar 2024 – Present",
                    responsibilities: [
                        "Developed 5 responsive WordPress websites, reducing page load time by 40% through custom theme optimization, achieving a 95% client satisfaction rate",
                        "Implemented modern UI/UX principles to enhance user engagement and usability",
                        "Customized themes and developed plugins to extend WordPress functionality",
                        "Performed website performance optimization and basic SEO implementation",
                    ],
                    technologies: [
                        "WordPress",
                        "PHP",
                        "HTML",
                        "CSS",
                        "JavaScript",
                        "Web Design Tools",
                    ],
                },
                {
                    role: "Freelance Commercial Designer",
                    company: "Fiverr Platform, Remote",
                    period: "Jan 2020 – Present",
                    responsibilities: [
                        "Delivered 200+ branding projects for clients across 15 countries, achieving a 4.9/5.0 average rating and maintaining an 80% client retention rate",
                        "Created 150+ unique brand assets (logos, brochures, social media kits) using Adobe Creative Suite, contributing to an average 25% increase in client conversion rates",
                        "Developed compelling UI/UX mockups for web and mobile applications, reducing client revision requests by 40%",
                        "Consistently received 5-star feedback for communication, creativity, and timely delivery",
                    ],
                    technologies: [
                        "Adobe Creative Suite",
                        "Photoshop",
                        "Illustrator",
                        "UI/UX Design",
                        "Brand Design",
                        "Logo Design",
                    ],
                },
                {
                    role: "Data Visualization Specialist (Job Simulation)",
                    company: "Tata Consultancy Services (via Forage), Remote",
                    period: "Jun 2024 – Jul 2024",
                    responsibilities: [
                        "Developed 3 interactive Power BI dashboards analyzing 50,000+ customer records, reducing report generation time by 75% and improving data accessibility across 5 departments",
                        "Employed Python (Pandas) and Excel for data cleaning, transformation, and preparation",
                        "Applied statistical analysis and data storytelling techniques to present actionable insights",
                    ],
                    technologies: [
                        "Power BI",
                        "Python",
                        "Excel",
                        "Data Visualization",
                        "Data Analysis",
                    ],
                },
                {
                    role: "Cybersecurity Analyst (Job Simulation)",
                    company:
                        "Commonwealth Bank of Australia (via Forage), Remote",
                    period: "Apr 2024 – May 2024",
                    responsibilities: [
                        "Conducted threat analysis and developed incident response strategies for simulated cyber attacks",
                        "Applied security principles to identify and mitigate potential system vulnerabilities",
                        "Created and delivered security awareness educational materials to team members",
                    ],
                    technologies: [
                        "Cybersecurity Frameworks",
                        "Threat Analysis",
                        "Security Tools",
                        "Incident Response",
                    ],
                },
            ],
        };
        const addMessage = (text, isUser = false, keywords = []) => {
            if (isTyping && !isUser) return;
            const messageContainer = document.createElement("div");
            messageContainer.className = isUser
                ? "user-message"
                : "bot-message";
            const timestamp = document.createElement("div");
            timestamp.className = "message-timestamp";
            const now = new Date();
            timestamp.textContent = `${now
                .getHours()
                .toString()
                .padStart(2, "0")}:${now
                .getMinutes()
                .toString()
                .padStart(2, "0")}`;
            const avatar = document.createElement("div");
            avatar.className = "message-avatar";
            if (isUser) {
                avatar.innerHTML = '<i class="fas fa-user"></i>';
            } else {
                const img = document.createElement("img");
                img.src = logoPath;
                img.alt = "Kholipha";
                avatar.appendChild(img);
            }
            const contentWrapper = document.createElement("div");
            contentWrapper.className = "message-content-wrapper";
            const content = document.createElement("div");
            content.className = "message-content";
            if (text.length > 5000 && !isUser) {
                content.classList.add("long-response");
                messageContainer.classList.add("expanded-message");
            }
            if (isUser) {
                content.textContent = text;
            } else {
                content.innerHTML = "";
            }
            contentWrapper.appendChild(content);
            messageContainer.appendChild(avatar);
            messageContainer.appendChild(contentWrapper);
            messageContainer.appendChild(timestamp);
            chatbotMessages.appendChild(messageContainer);
            chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
            if (!isUser) {
              
            }
            return { messageContainer, contentContainer: content };
        };
        const typeEffect = (element, text, speed) => {
            isTyping = true;
            let formattedText = formatMarkdown(text);
            element.innerHTML = "";
            if (formattedText.length > 10000) {
                return new Promise((resolve) => {
                    element.classList.add("message-loading");
                    setTimeout(() => {
                        element.innerHTML = formattedText;
                        element.classList.remove("message-loading");
                        isTyping = false;
                        resolve();
                    }, 500);
                });
            }
            if (formattedText.length > 1000) {
                return new Promise((resolve) => {
                    const chunkSize = 500;
                    let currentIndex = 0;
                    element.classList.add("message-loading");
                    const renderNextChunk = () => {
                        if (currentIndex >= formattedText.length) {
                            element.classList.remove("message-loading");
                            isTyping = false;
                            resolve();
                            return;
                        }
                        const chunk = formattedText.substring(
                            currentIndex,
                            currentIndex + chunkSize
                        );
                        element.innerHTML += chunk;
                        currentIndex += chunkSize;
                        chatbotMessages.scrollTop =
                            chatbotMessages.scrollHeight;
                        setTimeout(renderNextChunk, 50);
                    };
                    renderNextChunk();
                });
            }
            return new Promise((resolve) => {
                let i = 0;
                let htmlContent = "";
                let tagStack = [];
                let isInTag = false;
                let isInEntity = false;
                let entityContent = "";
                function type() {
                    if (i < formattedText.length) {
                        const char = formattedText[i];
                        if (char === "<") {
                            isInTag = true;
                            htmlContent += char;
                        } else if (char === ">" && isInTag) {
                            isInTag = false;
                            htmlContent += char;
                        } else if (isInTag) {
                            htmlContent += char;
                        } else if (char === "&") {
                            isInEntity = true;
                            entityContent = char;
                        } else if (char === ";" && isInEntity) {
                            isInEntity = false;
                            entityContent += char;
                            htmlContent += entityContent;
                        } else if (isInEntity) {
                            entityContent += char;
                        } else {
                            htmlContent += char;
                            element.innerHTML = htmlContent;
                            chatbotMessages.scrollTop =
                                chatbotMessages.scrollHeight;
                        }
                        i++;
                        const adjustedSpeed = Math.max(
                            10,
                            speed - formattedText.length / 100
                        );
                        setTimeout(type, adjustedSpeed);
                    } else {
                        isTyping = false;
                        resolve();
                    }
                }
                setTimeout(type, 100);
            });
        };
        const generateResponse = (input) => {
            const conversationContext = createConversationContext();
            if (input.toLowerCase().includes("test long message")) {
                detectedKeywords = ["test", "long message"];
                const longResponse = window.chatbotTest
                    ? window.chatbotTest.generateLongTestMessage(20000)
                    : "This is a test of a very long message. ".repeat(1000);
                return {
                    response: `Here's a demonstration of handling very long content:\n\n${longResponse}`,
                    keywords: detectedKeywords,
                };
            }
            const normalizedInput = input.toLowerCase();
            let detectedKeywords = [];
            let multiResponses = [];

            // Check for social media profiles in the input
            for (const [platform, url] of Object.entries(socialMediaProfiles)) {
                const platformVariations = [
                    platform,
                    platform.toLowerCase(),
                    platform.toUpperCase(),
                    platform.charAt(0).toUpperCase() + platform.slice(1),
                ];
                if (
                    platformVariations.some((variation) =>
                        normalizedInput.includes(variation)
                    )
                ) {
                    detectedKeywords.push(platform);
                    let response;
                    const platformName =
                        platform.charAt(0).toUpperCase() + platform.slice(1);
                    switch (platform) {
                        case "linkedin":
                            response = `You can view my professional profile on LinkedIn at [${url}](${url}).`;
                            break;
                        case "github":
                            response = `I share my code on GitHub at [${url}](${url}).`;
                            break;
                        case "dribbble":
                            response = `You can view my design work on Dribbble at [${url}](${url}).`;
                            break;
                        case "behance":
                            response = `Check out my creative portfolio on Behance at [${url}](${url}).`;
                            break;
                        case "instagram":
                            response = `Follow my visual journey on Instagram at [${url}](${url}).`;
                            break;
                        case "facebook":
                            response = `Connect with me on Facebook at [${url}](${url}).`;
                            break;
                        case "twitter":
                        case "x":
                            response = `I'm active on X at [${url}](${url}).`;
                            break;
                        case "youtube":
                            response = `Watch my video content on YouTube at [${url}](${url}).`;
                            break;
                        case "medium":
                            response = `Read my articles on Medium at [${url}](${url}).`;
                            break;
                        default:
                            response = `You can find me on ${platformName} at [${url}](${url}).`;
                    }
                    multiResponses.push({
                        category: platform,
                        response: response,
                        priority: 5,
                    });
                }
            }
            
            // Check for personal information fields
            const flattenObject = (obj, prefix = '') => {
                return Object.keys(obj).reduce((acc, key) => {
                    const pre = prefix.length ? prefix + '.' : '';
                    if (typeof obj[key] === 'object' && obj[key] !== null && !(obj[key] instanceof Date)) {
                        Object.assign(acc, flattenObject(obj[key], pre + key));
                    } else {
                        acc[pre + key] = obj[key];
                    }
                    return acc;
                }, {});
            };
            
            const flattenedPersonalInfo = flattenObject(personalInfo);
            
            // Direct field matching for personal information
            for (const [key, value] of Object.entries(personalInfo)) {
                if (typeof value !== 'object' || value instanceof Date) {
                    // For direct properties like fullName, gender, etc.
                    if (normalizedInput.includes(key.toLowerCase())) {
                        detectedKeywords.push(key);
                        let formattedValue = value;
                        
                        if (value instanceof Date) {
                            formattedValue = value.toLocaleDateString('en-US', {
                                year: 'numeric', 
                                month: 'long', 
                                day: 'numeric'
                            });
                        }
                        
                        const response = `My ${key} is ${formattedValue}.`;
                        multiResponses.push({
                            category: key,
                            response: response,
                            priority: 7
                        });
                    }
                }
            }
            
            // Special case handling for name variations

            
            // Special case for contact information
            if (normalizedInput.includes("email") || 
                normalizedInput.includes("mail") || 
                normalizedInput.includes("contact email")) {
                detectedKeywords.push("email");
                multiResponses.push({
                    category: "email",
                    response: `My email address is ${personalInfo.contact.email}.`,
                    priority: 7
                });
            }
            
            if (normalizedInput.includes("mobile") || 
                normalizedInput.includes("phone") || 
                normalizedInput.includes("call") ||
                normalizedInput.includes("number")) {
                detectedKeywords.push("phone");
                multiResponses.push({
                    category: "phone",
                    response: `My mobile number is ${personalInfo.contact.mobile}. I also have an alternate number: ${personalInfo.contact.alternateMobile}.`,
                    priority: 7
                });
            }
            
            // Address handling
            if (normalizedInput.includes("address") || 
                normalizedInput.includes("where do you live") ||
                normalizedInput.includes("where you live") ||
                normalizedInput.includes("home")) {
                if (normalizedInput.includes("permanent") || normalizedInput.includes("original")) {
                    detectedKeywords.push("permanent_address");
                    multiResponses.push({
                        category: "permanent_address",
                        response: `My permanent address is: ${personalInfo.addresses.permanent}`,
                        priority: 7
                    });
                } else if (normalizedInput.includes("present") || normalizedInput.includes("current")) {
                    detectedKeywords.push("present_address");
                    multiResponses.push({
                        category: "present_address",
                        response: `My present address is: ${personalInfo.addresses.present}`,
                        priority: 7
                    });
                } else {
                    detectedKeywords.push("addresses");
                    multiResponses.push({
                        category: "addresses",
                        response: `My present address is: ${personalInfo.addresses.present}\nMy permanent address is: ${personalInfo.addresses.permanent}`,
                        priority: 7
                    });
                }
            }
            
            // Parents information
            if (normalizedInput.includes("father") || 
                normalizedInput.includes("dad") || 
                normalizedInput.includes("papa")) {
                detectedKeywords.push("father");
                multiResponses.push({
                    category: "father",
                    response: `My father's name is ${personalInfo.parents.father.name}. He is a ${personalInfo.parents.father.profession.toLowerCase()} by profession. His national ID number is ${personalInfo.parents.father.nationalID}.`,
                    priority: 7
                });
            }
            
            if (normalizedInput.includes("mother") || 
                normalizedInput.includes("mom") || 
                normalizedInput.includes("mum")) {
                detectedKeywords.push("mother");
                multiResponses.push({
                    category: "mother",
                    response: `My mother's name is ${personalInfo.parents.mother.name}. She is a ${personalInfo.parents.mother.profession.toLowerCase()} by profession. Her national ID number is ${personalInfo.parents.mother.nationalID}.`,
                    priority: 7
                });
            }
            
            // Emergency contact
            if (normalizedInput.includes("emergency") || 
                normalizedInput.includes("emergency contact") || 
                normalizedInput.includes("emergency number")) {
                detectedKeywords.push("emergency");
                multiResponses.push({
                    category: "emergency",
                    response: `My emergency contact is ${personalInfo.emergency.name} (${personalInfo.emergency.relationship}). Contact number: ${personalInfo.emergency.telephone}. Address: ${personalInfo.emergency.address}`,
                    priority: 7
                });
            }
            
            // Passport details
            if (normalizedInput.includes("passport") || 
                normalizedInput.includes("travel document") || 
                normalizedInput.includes("passport number")) {
                if (normalizedInput.includes("number")) {
                    detectedKeywords.push("passport_number");
                    multiResponses.push({
                        category: "passport_number",
                        response: `My passport number is ${personalInfo.passport.number}.`,
                        priority: 7
                    });
                } else if (normalizedInput.includes("expiry") || normalizedInput.includes("expiration")) {
                    detectedKeywords.push("passport_expiry");
                    multiResponses.push({
                        category: "passport_expiry",
                        response: `My passport expires on ${personalInfo.passport.expiryDate.toLocaleDateString('en-US', {year: 'numeric', month: 'long', day: 'numeric'})}.`,
                        priority: 7
                    });
                } else {
                    detectedKeywords.push("passport_details");
                    const issueDate = personalInfo.passport.issueDate.toLocaleDateString('en-US', {
                        year: 'numeric', month: 'long', day: 'numeric'
                    });
                    const expiryDate = personalInfo.passport.expiryDate.toLocaleDateString('en-US', {
                        year: 'numeric', month: 'long', day: 'numeric'
                    });
                    
                    multiResponses.push({
                        category: "passport_details",
                        response: `My passport details:\n- Number: ${personalInfo.passport.number}\n- Type: ${personalInfo.passport.type}\n- Country Code: ${personalInfo.passport.countryCode}\n- Issue Date: ${issueDate}\n- Expiry Date: ${expiryDate}\n- Issuing Authority: ${personalInfo.passport.issuingAuthority}`,
                        priority: 7
                    });
                }
            }
            
            // Add more specific checks for other nested properties in personalInfo as needed
            
            if (
                normalizedInput.includes("that") ||
                normalizedInput.includes("you mentioned") ||
                normalizedInput.includes("earlier") ||
                normalizedInput.includes("before") ||
                normalizedInput.includes("you said")
            ) {
                if (conversationContext.recentTopics.length > 0) {
                    const referencedTopic = conversationContext.recentTopics[0];
                    detectedKeywords.push("reference_to_previous");
                    detectedKeywords.push(referencedTopic);
                    if (normalizedInput.includes("tell me more")) {
                        multiResponses.push({
                            category: "previous_reference",
                            response: `You'd like to know more about ${referencedTopic}. Let me expand on that.`,
                            priority: 10,
                        });
                    }
                }
            }
            const currentHour = new Date().getHours();
            const timeOfDay =
                currentHour >= 4 && currentHour < 6
                    ? "pre-dawn"
                    : currentHour >= 6 && currentHour < 8
                    ? "early morning"
                    : currentHour >= 8 && currentHour < 10
                    ? "mid-morning"
                    : currentHour >= 10 && currentHour < 12
                    ? "late morning"
                    : currentHour >= 12 && currentHour < 14
                    ? "noon"
                    : currentHour >= 14 && currentHour < 16
                    ? "early afternoon"
                    : currentHour >= 16 && currentHour < 18
                    ? "late afternoon"
                    : currentHour >= 18 && currentHour < 20
                    ? "early evening"
                    : currentHour >= 20 && currentHour < 22
                    ? "evening"
                    : "night";
            const cacheKey = normalizedInput.trim();
            if (cachedResponses[cacheKey]) {
                return cachedResponses[cacheKey];
            }
            const hasRecentContext = chatHistory.length > 0;
            const lastUserMessage = hasRecentContext
                ? chatHistory
                      .filter((msg) => msg.role === "user")
                      .pop()
                      ?.content.toLowerCase()
                : "";
            const lastBotMessage = hasRecentContext
                ? chatHistory
                      .filter((msg) => msg.role === "assistant")
                      .pop()
                      ?.content.toLowerCase()
                : "";
            const keywordSets = [
                {
                    keywords: [
                        "hi",
                        "hello",
                        "hey",
                        "greetings",
                        "howdy",
                        "good morning",
                        "good afternoon",
                        "good evening",
                        "hola",
                    ],
                    category: "greeting",
                    priority: 10,
                },
                {
                    keywords: [
                        "how are you",
                        "how you doing",
                        "how's it going",
                        "how is it going",
                        "what's up",
                        "whats up",
                        "how do you feel",
                        "are you ok",
                        "are you okay",
                        "feeling",
                    ],
                    category: "well-being",
                    priority: 9,
                },
                {
                    keywords: [
                        "who are you",
                        "what's your name",
                        "call you",
                        "chatbot name",
                        "who am i talking to",
                        "who is this",
                        "about yourself",
                        "identity",
                    ],
                    category: "identity",
                    priority: 9,
                },
                {
                    keywords: [
                        "thanks",
                        "thank you",
                        "appreciate",
                        "grateful",
                        "helped me",
                        "helpful",
                    ],
                    category: "gratitude",
                    priority: 8,
                },
                {
                    keywords: [
                        "bye",
                        "goodbye",
                        "see you",
                        "farewell",
                        "talk later",
                        "leaving",
                        "exit",
                    ],
                    category: "farewell",
                    priority: 8,
                },
                {
                    keywords: [
                        "joke",
                        "funny",
                        "laugh",
                        "humor",
                        "comedy",
                        "tell me a joke",
                        "make me laugh",
                    ],
                    category: "humor",
                    priority: 7,
                },
                {
                    keywords: [
                        "age",
                        "how old",
                        "birth",
                        "born",
                        "birthday",
                        "year of birth",
                        "date of birth",
                    ],
                    category: "age",
                    priority: 6,
                },
                {
                    keywords: [
                        "contact",
                        "reach you",
                        "get in touch",
                    ],
                    category: "contact",
                    priority: 6,
                },
                {
                    keywords: [
                        "education",
                        "study",
                        "degree",
                        "university",
                        "college",
                        "school",
                        "class",
                        "academic",
                        "What's your background?",
                        "student",
                    ],
                    category: "education",
                    priority: 5,
                },
                {
                    keywords: [
                        "skill",
                        "abilities",
                        "expertise",
                        "technologies",
                        "what can you do",
                        "What are your skills?",
                        "tech stack",
                        "programming",
                        "languages",
                        "framework",
                    ],
                    category: "skills",
                    priority: 5,
                },
                {
                    keywords: [
                        "technical",
                        "programming",
                        "coding",
                        "development",
                        "software",
                        "computer",
                        "algorithm",
                        "data structure",
                    ],
                    category: "technical_skills",
                    priority: 5,
                },
                {
                    keywords: [
                        "design",
                        "creative",
                        "visual",
                        "ui/ux",
                        "ui",
                        "ux",
                        "graphic",
                        "art",
                        "drawing",
                        "illustration",
                        "color",
                    ],
                    category: "design_skills",
                    priority: 5,
                },
                {
                    keywords: [
                        "soft",
                        "interpersonal",
                        "communication",
                        "people",
                        "teamwork",
                        "leadership",
                        "management",
                    ],
                    category: "soft_skills",
                    priority: 5,
                },
                {
                    keywords: [
                        "project",
                        "portfolio",
                        "work",
                        "showcase",
                        "what have you built",
                        "what did you build",
                        "Tell me about your projects",
                        "application",
                        "app",
                        "website",
                    ],
                    category: "projects",
                    priority: 5,
                },
                {
                    keywords: [
                        "experience",
                        "work history",
                        "job",
                        "career",
                        "profession",
                        "employment",
                        "resume",
                        "cv",
                    ],
                    category: "experience",
                    priority: 5,
                },
                {
                    keywords: [
                        "certification",
                        "certificate",
                        "credential",
                        "qualify",
                        "qualified",
                        "training",
                        "course",
                    ],
                    category: "certifications",
                    priority: 5,
                },
                {
                    keywords: [
                        "location",
                        "where",
                        "country",
                        "city",
                        "live",
                        "based",
                        "from",
                        "hometown",
                        "current city",
                        "address",
                    ],
                    category: "location",
                    priority: 4,
                },
                {
                    keywords: [
                        "family",
                        "parents",
                    ],
                    category: "family",
                    priority: 4,
                },
                {
                    keywords: [
                        "hobby",
                        "interest",
                        "pastime",
                        "free time",
                        "leisure",
                        "for fun",
                        "enjoy doing",
                        "like to do",
                    ],
                    category: "hobbies",
                    priority: 4,
                },
                {
                    keywords: [
                        "favorite",
                        "best",
                        "like most",
                        "prefer",
                        "love",
                    ],
                    category: "preferences",
                    priority: 3,
                },
                {
                    keywords: [
                        "goal",
                        "plan",
                        "future",
                        "aspiration",
                        "ambition",
                        "dream",
                        "aim",
                        "objective",
                        "target",
                    ],
                    category: "goals",
                    priority: 3,
                },
                {
                    keywords: [
                        "passport",
                        "travel document",
                        "identification",
                        "id card",
                        "identity card",
                        "visa",
                        "citizenship",
                    ],
                    category: "passport",
                    priority: 2,
                },
                {
                    keywords: [
                        "help",
                        "assist",
                        "support",
                        "what can you tell",
                        "how to",
                        "how do i",
                        "guide",
                        "tutorial",
                    ],
                    category: "help",
                    priority: 1,
                },
            ];
            keywordSets.forEach((set) => {
                const matchedKeyword = set.keywords.find(
                    (keyword) =>
                        normalizedInput.includes(keyword) ||
                        normalizedInput.match(
                            new RegExp(`\\b${keyword}\\b`, "i")
                        )
                );
                if (matchedKeyword) {
                    detectedKeywords.push(set.category);
                    let response = "";
                    switch (set.category) {
                        case "greeting":
                            const greetingResponses = [
                                `Good ${timeOfDay}! How can I assist you today?`,
                                `Happy ${timeOfDay}! Ready for some coding magic?`,
                                `Lovely ${timeOfDay} to you! How can I make your day better?`,
                                `Top of the ${timeOfDay}! What's on your mind?`,
                                `Wishing you a brilliant ${timeOfDay}! Need some help?`,
                                `Hello and good ${timeOfDay}! What shall we explore?`,
                                `Hey there—it's a beautiful ${timeOfDay}. How can I support you?`,
                                `Salutations this ${timeOfDay}! What can I do for you?`,
                                `I hope your ${timeOfDay} is going great! How may I assist?`,
                                `What's up this ${timeOfDay}? Ready to dive into some code?`,
                            ];
                            response =
                                greetingResponses[
                                    Math.floor(
                                        Math.random() * greetingResponses.length
                                    )
                                ];
                            break;
                        case "well-being":
                            const wellBeingResponses = [
                                "I'm doing great, thanks for asking! It's nice to connect with you. What would you like to know about me or my projects?",
                                "I'm wonderful! Just finished working on some exciting projects. What brings you here today?",
                                "Thanks for checking! I'm having a productive day working on my skills and projects. What about you?",
                                "I'm excellent! Always excited to chat with people interested in tech and design. What would you like to discuss?",
                            ];
                            response =
                                wellBeingResponses[
                                    Math.floor(
                                        Math.random() *
                                            wellBeingResponses.length
                                    )
                                ];
                            break;
                        case "identity":
                            const identityResponses = [
                                "I'm Kholipha Ahmmad Al-Amin, a Bangladeshi Computer Science & Engineering student at Atish Dipankar University obsessed with AI‑driven image enhancement and immersive game design.",
                                "My name is Kholipha Ahmmad Al‑Amin, currently pursuing a B.Sc. in CSE with a passion for developing deep learning models and dynamic web applications.",
                                "I'm a WordPress Design & Developer intern at Akbor Skills Development Limited, building responsive websites and optimizing performance by 40%.",
                                "By background, I'm a freelance designer on Fiverr, delivering 200+ branding projects across 15 countries with a 4.9/5.0 average rating.",
                                "I'm the mind behind THETAEnhancer+, an AI image restoration project that boosts resolution by 4× while maintaining over 36 dB PSNR.",
                                "I built a prototype FPS game in Unreal Engine 5, crafting core mechanics, shooting systems, and enemy AI behavior trees.",
                                "I'm a tech‑savvy student proficient in Python, C++, JavaScript, and well‑versed in frameworks like React, Laravel, and Unity.",
                                "I hail from Dhaka, Bangladesh, blending my local roots with global insights in machine learning, blockchain, and cloud computing.",
                                "I'm a lifelong learner with certifications in Amazon Bedrock generative AI, cybersecurity analysis, and advanced Excel (EF SET C1).",
                                "I'm passionate about merging art and technology through UI/UX design, digital art, and basic 3D modeling with Blender.",
                                "As a Data Visualization Specialist, I've crafted Power BI dashboards that cut report generation time by 75% and surface actionable insights.",
                                "I'm Kholipha, student by day and AI image enhancer developer by night—constantly refining SRGAN architectures in PyTorch.",
                                "I thrive under Agile methodologies, delivering secure blockchain e‑voting systems and interactive AI‑powered data visualizers.",
                                "I'm an organized leader—president of AEAC, graphics designer for Leo Club, and event coordinator for BD Clean, driving community impact.",
                                "My goal is to fuse computer vision, game development, and modern web solutions to empower digital transformation and measurable results.",
                            ];
                            response =
                                identityResponses[
                                    Math.floor(
                                        Math.random() * identityResponses.length
                                    )
                                ];
                            break;
                        case "gratitude":
                            const gratitudeResponses = [
                                "You're welcome! It's always nice connecting with people interested in my work. Anything else you'd like to know?",
                                "My pleasure! I enjoy sharing my journey and experiences. What else would you like to discuss?",
                                "Happy to share! I'm always enthusiastic about discussing my projects and skills. Any other questions?",
                                "Anytime! It's great to connect with you. What else are you curious about?",
                            ];
                            response =
                                gratitudeResponses[
                                    Math.floor(
                                        Math.random() *
                                            gratitudeResponses.length
                                    )
                                ];
                            break;
                        case "farewell":
                            const farewellResponses = [
                                "Goodbye! It was really nice chatting with you. Feel free to come back anytime!",
                                "Take care! I've enjoyed our conversation. Drop by again if you want to chat more about my projects or interests.",
                                "Have a great day! Thanks for taking the time to chat with me. Hope to connect again soon!",
                                "Farewell! It's been a pleasure sharing my experiences with you. See you next time!",
                            ];
                            response =
                                farewellResponses[
                                    Math.floor(
                                        Math.random() * farewellResponses.length
                                    )
                                ];
                            break;
                        case "humor":
                            const jokes = [
                                "Why do I prefer dark mode? Because light attracts bugs!",
                                "How many programmers does it take to change a light bulb? None, that's a hardware problem!",
                                "Why did I almost go broke? Because I used up all my cache!",
                                "Why did the function go to therapy? It had too many issues to resolve by itself!",
                                "What's my favorite snack while coding? Cookies, but only if they're not blocked!",
                                "Why do I budget carefully? Because as a web developer, I could spend all my money on domains!",
                            ];
                            response =
                                jokes[
                                    Math.floor(Math.random() * jokes.length)
                                ] +
                                "\n\nHaha! Hope that made you smile! What would you like to know about me?";
                            break;
                        case "age":
                            const preciseAge = calculatePreciseAge();
                            response = `I am currently ${preciseAge} old. I was born on July 26, 2002 in Dhaka, Bangladesh.`;
                            break;
                        case "contact":
                            const contact = personalInfo.contact;
                            response = `You can reach me through:
- Email: ${contact.email}
- Mobile: ${contact.mobile}
- Alternative Mobile: ${contact.alternateMobile}
- Current Address: ${personalInfo.addresses.present}
I'm also active on various social platforms. Feel free to ask about connecting on LinkedIn, GitHub, or other platforms!`;
                            break;
                        case "education":
                            response = `My educational journey includes:
1. **Bachelor of Science in Computer Science & Engineering**
   Atish Dipankar University of Science & Technology, Dhaka
   January 2022 – August 2026 (Expected)
   Current CGPA: 3.56/4.00
2. **Higher Secondary School Certificate (HSC)**
   Adamjee Cantonment College, Dhaka
   2020
   GPA: 5.00/5.00, Faculty: Science
3. **Secondary School Certificate (SSC)**
   Civil Aviation School & College, Dhaka
   2018
   GPA: 5.00/5.00, Faculty: Science
My coursework includes Data Structures, Algorithms, AI, Machine Learning, Web Development, and Game Design. I particularly enjoy the hands-on project work in my programming classes!`;
                            break;
                        case "skills":
                            response = `I've developed a diverse skill set across several domains:
**Technical Skills**: 
I'm proficient in Python, C++, Java, JavaScript, and more. I especially enjoy working with AI/ML, Web Development, Game Development, and Cloud platforms.
**Design Skills**: 
I have a strong passion for UI/UX Design and work with Adobe Creative Suite, Figma, Web Design, Branding, and Visual Design tools.
**Soft Skills**: 
I pride myself on strong communication, problem-solving abilities, team leadership, project management, and positive client interactions.
Feel free to ask about any specific skill category you'd like to know more about!`;
                            break;
                        case "technical_skills":
                            const techSkills = chatbotKnowledge.skills.technical
                                .map((skill) => `• ${skill}`)
                                .join("\n");
                            response = `Kholipha's technical skills include:\n\n${techSkills}`;
                            break;
                        case "design_skills":
                            const designSkills = chatbotKnowledge.skills.design
                                .map((skill) => `• ${skill}`)
                                .join("\n");
                            response = `Kholipha's design skills include:\n\n${designSkills}`;
                            break;
                        case "soft_skills":
                            const softSkills = chatbotKnowledge.skills.soft
                                .map((skill) => `• ${skill}`)
                                .join("\n");
                            response = `Kholipha's soft skills include:\n\n${softSkills}`;
                            break;
                        case "projects":
                            const projectKeywords = chatbotKnowledge.projects.map(
                                (p) => p.name.toLowerCase()
                            );
                            const matchedProject = chatbotKnowledge.projects.find(
                                (p) =>
                                    normalizedInput.includes(
                                        p.name.toLowerCase()
                                    )
                            );
                            if (matchedProject) {
                                const technologies = matchedProject.technologies
                                    .map((tech) => `• ${tech}`)
                                    .join("\n");
                                response = `**${matchedProject.name}**
${matchedProject.description}
**Technologies Used**:
${technologies}
Would you like to know about other projects?`;
                            } else {
                                const featuredProjects = chatbotKnowledge.projects
                                    .slice(0, 5)
                                    .map(
                                        (p) =>
                                            `• **${p.name}**: ${p.description}`
                                    )
                                    .join("\n");
                                response = `Here are some of Kholipha's notable projects:\n\n${featuredProjects}\n\nHe has many more projects! Ask about specific technologies or project names to learn more.`;
                            }
                            break;
                        case "experience":
                            const experiences = chatbotKnowledge.experience
                                .map((exp) => {
                                    const responsibilities = exp.responsibilities
                                        .map((r) => `   • ${r}`)
                                        .join("\n");
                                    return `• **${exp.role}** at ${exp.company} (${exp.period})\n${responsibilities}`;
                                })
                                .join("\n\n");
                            response = `Kholipha's professional experience includes:\n\n${experiences}`;
                            break;
                        case "certifications":
                            const certifications = chatbotKnowledge.certifications
                                .map((cert) => `• ${cert}`)
                                .join("\n");
                            response = `Kholipha's certifications include:\n\n${certifications}\n\nYou can view his credentials on Credly at [${socialMediaProfiles.credly}](${socialMediaProfiles.credly}).`;
                            break;
                        case "location":
                            response = `I'm originally from Bangladesh. I currently live in Dhaka (${personalInfo.addresses.present}), though my family's permanent home is in Madaripur (${personalInfo.addresses.permanent}). I love the energy and opportunities Dhaka offers for tech enthusiasts like myself!`;
                            break;
                        case "family":
                            response = `My family includes:
- Father: ${personalInfo.parents.father.name} (${personalInfo.parents.father.profession})
- Mother: ${personalInfo.parents.mother.name} (${personalInfo.parents.mother.profession})
Both my parents are ${personalInfo.parents.father.nationality} citizens. They've always been very supportive of my interest in technology and education.`;
                            break;
                        case "hobbies":
                            response = `In my free time, I enjoy several activities:
- Programming and developing new projects (I'm always coding something!)
- Graphic design and digital art creation
- Learning about new technologies and AI advancements
- Gaming, particularly strategy and role-playing games
- Reading technical books and articles
- Participating in hackathons and coding competitions
- Contributing to open-source projects
- Exploring UI/UX design principles
What about you? Do you share any of these interests?`;
                            break;
                        case "preferences":
                            if (
                                normalizedInput.includes("color") ||
                                normalizedInput.includes("colour")
                            ) {
                                response =
                                    "My favorite colors are purple and blue, which you can see reflected in many of my projects and designs. I find these colors both calming and inspiring.";
                            } else if (
                                normalizedInput.includes("food") ||
                                normalizedInput.includes("dish") ||
                                normalizedInput.includes("meal")
                            ) {
                                response =
                                    "I enjoy traditional Bangladeshi cuisine, particularly dishes like Biryani. I also love exploring various international foods when I have the chance. Do you have any favorite cuisines?";
                            } else if (
                                normalizedInput.includes("music") ||
                                normalizedInput.includes("song") ||
                                normalizedInput.includes("artist")
                            ) {
                                response =
                                    "I enjoy listening to a mix of modern pop, electronic music, and sometimes instrumental tracks while coding. Music really helps me focus when I'm working on complex projects. What kind of music do you listen to?";
                            } else if (
                                normalizedInput.includes("book") ||
                                normalizedInput.includes("author") ||
                                normalizedInput.includes("read")
                            ) {
                                response =
                                    "I love reading technical books about programming, artificial intelligence, and design principles. For leisure, I occasionally dive into science fiction novels that explore futuristic technologies. Any book recommendations?";
                            } else if (
                                normalizedInput.includes("movie") ||
                                normalizedInput.includes("film") ||
                                normalizedInput.includes("show")
                            ) {
                                response =
                                    "I'm a big fan of sci-fi and tech-themed movies and shows, particularly those that explore futuristic concepts and technologies. I find they inspire my own creative thinking for projects.";
                            } else if (
                                normalizedInput.includes("game") ||
                                normalizedInput.includes("gaming")
                            ) {
                                response =
                                    "I enjoy strategy games and RPGs when I have free time. Gaming actually helped spark my interest in programming and development! I've even participated in game development projects myself.";
                            } else if (
                                normalizedInput.includes("language") ||
                                normalizedInput.includes("programming")
                            ) {
                                response =
                                    "My preferred programming languages include Python and JavaScript for their versatility and widespread application. I find Python perfect for AI/ML work, while JavaScript is amazing for creating interactive web experiences.";
                            } else {
                                response =
                                    "I have diverse preferences and interests! My passion for technology and design influences many of my choices. Is there something specific you'd like to know about my preferences?";
                            }
                            break;
                        case "goals":
                            response = `My professional goals include:
- Completing my Bachelor's degree in Computer Science & Engineering with excellence
- Advancing my skills in AI and machine learning technologies (I'm particularly excited about deep learning applications)
- Building a diverse portfolio of innovative projects that solve real-world problems
- Contributing to significant open-source initiatives to give back to the tech community
- Eventually pursuing a career that combines my technical expertise with creative design
- Potentially pursuing advanced degrees or specialized certifications in emerging technologies
I believe the technology landscape is always evolving, so I'm committed to continuous learning. What about you - what are some of your goals?`;
                            break;
                        case "passport":
                            const passport = personalInfo.passport;
                            response = `My passport details are:
- Passport Number: ${passport.number}
- Type: ${passport.type}
- Country Code: ${passport.countryCode}
- Pages: ${passport.pages}
- Validity: ${passport.duration}
- Issue Date: ${passport.issueDate.toLocaleDateString()}
- Expiry Date: ${passport.expiryDate.toLocaleDateString()}
- Issuing Authority: ${passport.issuingAuthority}
- Passport Office: ${passport.passportOffice}
- Delivery Type: ${passport.deliveryType}
- Online Registration ID: ${passport.onlineRegID}
I keep my passport updated as I'm occasionally interested in traveling for tech conferences and educational opportunities.`;
                            break;
                        case "help":
                            response = `I'm happy to chat about my background and experiences in these areas:
• **Background**: My education, age, location
• **Skills**: My technical skills, design abilities, soft skills
• **Projects**: My portfolio work, technology experience
• **Experience**: My work history, internships, roles
• **Certifications**: My professional credentials
• **Social Media**: Links to all my platforms
• **Personal**: My hobbies, preferences, family, goals
You can ask me natural questions like:
- "Tell me about your education"
- "What technical skills do you have?"
- "Where are you from?"
- "How can I contact you?"
- "What are your favorite programming languages?"
I'm here to have a real conversation - what would you like to know about me?`;
                            break;
                    }
                    if (response) {
                        multiResponses.push({
                            category: set.category,
                            response: response,
                            priority: set.priority,
                        });
                    }
                }
            });
            const techKeywords = Array.from(
                new Set(
                    chatbotKnowledge.projects.flatMap((p) => p.technologies)
                )
            ).map((tech) => tech.toLowerCase());
            const matchedTech = techKeywords.find((tech) =>
                normalizedInput.includes(tech.toLowerCase())
            );
            if (matchedTech && normalizedInput.includes("project")) {
                detectedKeywords.push(matchedTech);
                const matchedProjects = chatbotKnowledge.projects.filter((p) =>
                    p.technologies.some(
                        (tech) => tech.toLowerCase() === matchedTech
                    )
                );
                if (matchedProjects.length > 0) {
                    const projectsList = matchedProjects
                        .map((p) => `• **${p.name}**: ${p.description}`)
                        .join("\n");
                    const response = `Here are my projects involving ${matchedTech}:\n\n${projectsList}\n\nI really enjoyed working with ${matchedTech} on these projects. Would you like to know more about any of them?`;
                    multiResponses.push({
                        category: "tech_projects",
                        response: response,
                        priority: 5,
                    });
                }
            }
            if (multiResponses.length > 1) {
                multiResponses.sort((a, b) => b.priority - a.priority);
                const topResponses = multiResponses.slice(0, 3);
                let combinedResponse = `I noticed you asked about several topics. Let me address each one:\n\n`;
                topResponses.forEach((item, index) => {
                    combinedResponse += `**${
                        index + 1
                    }. Regarding ${item.category.replace("_", " ")}**:\n${
                        item.response
                    }\n\n`;
                });
                combinedResponse += `Is there anything specific from these topics you'd like me to expand on?`;
                cachedResponses[cacheKey] = {
                    response: combinedResponse,
                    keywords: detectedKeywords,
                };
                return {
                    response: combinedResponse,
                    keywords: detectedKeywords,
                };
            } else if (multiResponses.length === 1) {
                const singleResponse = multiResponses[0].response;
                cachedResponses[cacheKey] = {
                    response: singleResponse,
                    keywords: detectedKeywords,
                };
                return {
                    response: singleResponse,
                    keywords: detectedKeywords,
                };
            }
            detectedKeywords.push("unknown");
            const fallbackResponses = [
                `I'm not sure I understood that fully. You can ask me about my skills, projects, education, experience, or personal interests. What would you like to know?`,
                `Hmm, I don't have specific information on that topic. Would you like to know about my technical skills, design work, or educational background instead?`,
                `I might need more context to answer your question effectively. Feel free to ask me about specific aspects of my background or expertise.`,
                `Sorry, I didn't quite catch that! Could you rephrase your question? I'd be happy to share information about my journey, projects, or interests.`,
            ];
            const response =
                fallbackResponses[
                    Math.floor(Math.random() * fallbackResponses.length)
                ];
            return { response, keywords: detectedKeywords };
        };
        const formatMarkdown = (text) => {
            text = text.replace(
                /\[([^\]]+)\]\(([^)]+)\)/g,
                '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>'
            );
            text = text.replace(/^# (.+)$/gm, "<h1>$1</h1>");
            text = text.replace(/^## (.+)$/gm, "<h2>$1</h2>");
            text = text.replace(/^### (.+)$/gm, "<h3>$1</h3>");
            text = text.replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>");
            text = text.replace(/\*([^*]+)\*/g, "<em>$1</em>");
            text = text.replace(/^• (.+)$/gm, "<li>$1</li>");
            text = text.replace(/^- (.+)$/gm, "<li>$1</li>");
            text = text.replace(/^(\d+)\. (.+)$/gm, "<li>$2</li>");
            text = text.replace(/(<li>.+<\/li>)(\s*<li>)/g, "$1</ul>\n<ul>$2");
            text = text.replace(
                /(<li>.+<\/li>)(?!\s*<li>|\s*<\/ul>)/g,
                "$1</ul>"
            );
            text = text.replace(/(?<!\s*<ul>)(<li>)/g, "<ul>$1");
            text = text.replace(/<\/ul>\s*<ul>/g, "");
            text = text.replace(/```([^`]+)```/g, "<pre><code>$1</code></pre>");
            text = text.replace(/`([^`]+)`/g, "<code>$1</code>");
            text = text.replace(/\n\n/g, "</p><p>");
            if (
                !text.startsWith("<h1>") &&
                !text.startsWith("<h2>") &&
                !text.startsWith("<h3>") &&
                !text.startsWith("<ul>") &&
                !text.startsWith("<pre>")
            ) {
                text = "<p>" + text;
            }
            if (
                !text.endsWith("</p>") &&
                !text.endsWith("</h1>") &&
                !text.endsWith("</h2>") &&
                !text.endsWith("</h3>") &&
                !text.endsWith("</ul>") &&
                !text.endsWith("</pre>")
            ) {
                text = text + "</p>";
            }
            return text;
        };
        const typeResponse = (response, keywords, typingTime) => {
            const { messageContainer, contentContainer } = addMessage(
                response,
                false,
                keywords
            );
            if (!contentContainer) {
                console.error("Content container not found for typing effect");
                return;
            }
            const isVeryLongResponse = response.length > 5000;
            if (isVeryLongResponse) {
                contentContainer.classList.add("long-response");
                messageContainer.classList.add("expanded-message");
                const controlsContainer = document.createElement("div");
                controlsContainer.className = "message-controls";
                const copyButton = document.createElement("button");
                copyButton.innerHTML = '<i class="fas fa-copy"></i> Copy';
                copyButton.className = "message-control-btn copy-btn";
                copyButton.addEventListener("click", () => {
                    navigator.clipboard
                        .writeText(response)
                        .then(() => {
                            copyButton.innerHTML =
                                '<i class="fas fa-check"></i> Copied!';
                            setTimeout(() => {
                                copyButton.innerHTML =
                                    '<i class="fas fa-copy"></i> Copy';
                            }, 2000);
                        })
                        .catch((err) => {
                            console.error("Failed to copy text: ", err);
                        });
                });
                const downloadButton = document.createElement("button");
                downloadButton.innerHTML =
                    '<i class="fas fa-download"></i> Download';
                downloadButton.className = "message-control-btn download-btn";
                downloadButton.addEventListener("click", () => {
                    const blob = new Blob([response], { type: "text/plain" });
                    const url = URL.createObjectURL(blob);
                    const a = document.createElement("a");
                    a.href = url;
                    a.download = `response-${new Date()
                        .toISOString()
                        .slice(0, 10)}.txt`;
                    a.click();
                    URL.revokeObjectURL(url);
                });
                controlsContainer.appendChild(copyButton);
                controlsContainer.appendChild(downloadButton);
                const helpfulButtons = document.createElement("div");
                helpfulButtons.className = "helpful-buttons";
                if (
                    response.toLowerCase().includes("linkedin") ||
                    response.toLowerCase().includes("github") ||
                    response.toLowerCase().includes("social")
                ) {
                    const socialButton = document.createElement("button");
                    socialButton.className = "helpful-btn";
                    socialButton.textContent = "All Social Links";
                    socialButton.addEventListener("click", () => {
                        chatbotInput.value =
                            "Show me all your social media profiles";
                        processInput();
                    });
                    helpfulButtons.appendChild(socialButton);
                }
                if (
                    response.toLowerCase().includes("project") ||
                    response.toLowerCase().includes("work") ||
                    response.toLowerCase().includes("portfolio")
                ) {
                    const projectsButton = document.createElement("button");
                    projectsButton.className = "helpful-btn";
                    projectsButton.textContent = "More Projects";
                    projectsButton.addEventListener("click", () => {
                        chatbotInput.value =
                            "Tell me about your other projects";
                        processInput();
                    });
                    helpfulButtons.appendChild(projectsButton);
                }
                if (
                    response.toLowerCase().includes("skill") ||
                    response.toLowerCase().includes("expertise") ||
                    response.toLowerCase().includes("abilities")
                ) {
                    const skillsButton = document.createElement("button");
                    skillsButton.className = "helpful-btn";
                    skillsButton.textContent = "Technical Skills";
                    skillsButton.addEventListener("click", () => {
                        chatbotInput.value = "What are your technical skills?";
                        processInput();
                    });
                    helpfulButtons.appendChild(skillsButton);
                }
                if (helpfulButtons.children.length > 0) {
                    messageContainer.appendChild(helpfulButtons);
                }
                messageContainer.appendChild(controlsContainer);
                return typeEffect(contentContainer, response, 1);
            }
            return typeEffect(contentContainer, response, 30);
        };
        const analyzeMessageComplexity = (message) => {
            const wordCount = message.split(/\s+/).length;
            const sentenceCount = message.split(/[.!?]+/).length;
            const characterCount = message.length;
            let complexityScore = 0;
            complexityScore += Math.min(50, wordCount / 2);
            const wordPerSentence = wordCount / Math.max(1, sentenceCount);
            complexityScore += Math.min(30, wordPerSentence * 2);
            complexityScore += Math.min(20, characterCount / 20);
            return Math.min(100, Math.floor(complexityScore));
        };
        const calculateResponseTime = (message, complexity) => {
            const baseTime = 1000;
            const complexityFactor = complexity / 100;
            const lengthFactor = Math.min(1, message.length / 100);
            const totalDelay =
                baseTime + complexityFactor * 2000 + lengthFactor * 1000;
            const randomness = 0.8 + Math.random() * 0.4;
            return Math.floor(totalDelay * randomness);
        };
        const showTypingIndicator = () => {
            const typingIndicator = document.createElement("div");
            typingIndicator.className = "typing-indicator";
            typingIndicator.innerHTML = `
                <div class="typing-dots">
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
            `;
            chatbotMessages.appendChild(typingIndicator);
            chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
        };
        const hideTypingIndicator = () => {
            const typingIndicator = chatbotMessages.querySelector(
                ".typing-indicator"
            );
            if (typingIndicator) {
                typingIndicator.remove();
            }
        };
        const showWelcomeMessage = () => {
            const now = new Date();
            const currentHour = now.getHours();
            const currentMinute = now.getMinutes();
            const timeString = now.toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
            });
            const greetings = {
                lateNight: [
                    `Burning the midnight oil, huh? It's ${timeString}. I'm Kholipha, ready to dive into code at this witching hour.`,
                    `Psst… I see it's ${timeString} late at night. Kholipha here, let's make these quiet hours count!`,
                    `Wow, ${timeString} already? Night owl alert! I'm Kholipha, caffeinated and coding.`,
                    `It's ${timeString} and the world's asleep. Perfect time for secrets, and for me to share mine with you.`,
                    `Under the pale moonlight at ${timeString}, I'm Kholipha, ready to craft some digital magic.`,
                ],
                earlyMorning: [
                    `Good early morning! It's ${timeString}, and I'm Kholipha, bright‑eyed and ready to help you seize the day.`,
                    `The dawn chorus is just starting at ${timeString}. I'm Kholipha, shall we embark on today's adventure?`,
                    `Sun's nearly up at ${timeString}. I'm your guide, Kholipha, to all things tech this crisp morning.`,
                    `At ${timeString}, the world feels fresh. Kholipha here, what inspiration can I spark for you today?`,
                    `It's ${timeString} and the horizon's glowing. I'm Kholipha, let's light up your ideas together.`,
                ],
                morning: [
                    `Good morning! It's ${timeString}. I'm Kholipha, your AI & web‑dev confidante, here to power up your projects.`,
                    `Morning vibes at ${timeString}! I'm Kholipha, deep into CSE studies, what shall we build today?`,
                    `Bright morning at ${timeString}! Kholipha here, ready to optimize, code, and caffeinate.`,
                    `Sun's high at ${timeString}. I'm Kholipha, champion of fast page loads and elegant UI, how can I assist?`,
                    `It's ${timeString} in the A.M.! I'm Kholipha, your go‑to for AI image enhancers and WordPress wizardry.`,
                ],
                afternoon: [
                    `Good afternoon! It's ${timeString}. I'm Kholipha, let's turbocharge your deep learning and web apps.`,
                    `Afternoon hustle at ${timeString}. Kholipha here, shall we fine‑tune that SRGAN or tweak your React UI?`,
                    `It's ${timeString}! I'm Kholipha, balancing caffeine and code, what's on your agenda?`,
                    `The clock strikes ${timeString}. Kholipha at your service, ready to debug, design, or deploy.`,
                    `Pleasant afternoon! At ${timeString}, I'm Kholipha, how can I elevate your digital projects?`,
                ],
                evening: [
                    `Good evening! It's ${timeString}. I'm Kholipha, time to wind down with some creative coding?`,
                    `Twilight at ${timeString}. Kholipha here, shall we polish that game prototype or spin up a new API?`,
                    `Evening glow at ${timeString}. I'm Kholipha, ready to share insights on machine learning or web security.`,
                    `It's ${timeString} this evening. Kholipha speaking, let's wrap up your tasks with flair.`,
                    `Starlight at ${timeString}. I'm Kholipha, how about a quick dive into your next big project?`,
                ],
                night: [
                    `Good night! It's ${timeString}. I'm Kholipha, perfect moment for a final code check before bed.`,
                    `Quiet night at ${timeString}. Kholipha here, any last tweaks before the day ends?`,
                    `It's ${timeString} late evening. I'm Kholipha, ready to assist even after hours.`,
                    `Moonlit at ${timeString}. Kholipha speaking, shall we debug that script under the stars?`,
                    `Nightfall at ${timeString}. I'm Kholipha, let's conclude with a triumph in your code.`,
                ],
            };
            let pool;
            if (currentHour < 1 || currentHour >= 23) {
                pool = greetings.lateNight;
            } else if (currentHour >= 1 && currentHour < 5) {
                pool = greetings.lateNight;
            } else if (currentHour >= 5 && currentHour < 8) {
                pool = greetings.earlyMorning;
            } else if (currentHour >= 8 && currentHour < 12) {
                pool = greetings.morning;
            } else if (currentHour >= 12 && currentHour < 17) {
                pool = greetings.afternoon;
            } else if (currentHour >= 17 && currentHour < 20) {
                pool = greetings.evening;
            } else {
                pool = greetings.night;
            }
            const greeting = pool[Math.floor(Math.random() * pool.length)];
            const welcomeMessage = `${greeting}
I'd love to tell you more about my skills, projects, and experiences . what are you curious about right now?`;
            setTimeout(() => {
                const { response, keywords } = {
                    response: welcomeMessage,
                    keywords: ["greeting", "identity"],
                };
                typeResponse(response, keywords, 30);
                setTimeout(updateSuggestionChips, 2000);
            }, 500);
        };
        const updateSuggestionChips = () => {
            suggestionChips.innerHTML = "";
            let suggestions = [
                "What are your skills?",
                "Tell me about your projects",
                "What's your background?",
                "How can I contact you?",
            ];
            if (chatHistory.length > 0) {
                const lastUserMessage = chatHistory
                    .filter((msg) => msg.role === "user")
                    .pop();
                const lastBotMessage = chatHistory
                    .filter((msg) => msg.role === "assistant")
                    .pop();
                if (lastUserMessage && lastBotMessage) {
                    const userInput = lastUserMessage.content.toLowerCase();
                    const botResponse = lastBotMessage.content.toLowerCase();
                    if (
                        userInput.includes("skill") ||
                        userInput.includes("abilities")
                    ) {
                        suggestions = [
                            "What are your technical skills?",
                            "Tell me about your design skills",
                            "What soft skills do you have?",
                            "Show me your projects",
                        ];
                    } else if (
                        userInput.includes("project") ||
                        userInput.includes("portfolio")
                    ) {
                        suggestions = [
                            "Tell me about THETAEnhancer+",
                            "What technologies do you use?",
                            "Show me your GitHub",
                            "What skills do you have?",
                        ];
                    } else if (
                        userInput.includes("contact") ||
                        userInput.includes("social") ||
                        userInput.includes("reach") ||
                        botResponse.includes("contact")
                    ) {
                        suggestions = [
                            "LinkedIn profile",
                            "GitHub account",
                            "Show me your portfolio",
                            "Tell me about your experience",
                        ];
                    } else if (
                        userInput.includes("education") ||
                        userInput.includes("university") ||
                        userInput.includes("study") ||
                        userInput.includes("degree")
                    ) {
                        suggestions = [
                            "What certifications do you have?",
                            "Tell me about your work experience",
                            "What projects did you work on?",
                            "What technical skills do you have?",
                        ];
                    }
                }
            }
            suggestions.forEach((suggestion) => {
                const chip = document.createElement("button");
                chip.className = "suggestion-chip";
                chip.textContent = suggestion;
                chip.addEventListener("click", () => {
                    chatbotInput.value = suggestion;
                    processInput();
                    suggestionChips.innerHTML = "";
                });
                suggestionChips.appendChild(chip);
                if (window.gsap) {
                    window.gsap.fromTo(
                        chip,
                        { scale: 0.8, opacity: 0 },
                        {
                            scale: 1,
                            opacity: 1,
                            duration: 0.3,
                            ease: "back.out(1.7)",
                            delay: Math.random() * 0.3,
                        }
                    );
                }
            });
        };
        const processInput = () => {
            const userInput = chatbotInput.value.trim();
            if (userInput === "") return;
            const messageTimestamp = new Date();
            addMessage(userInput, true);
            chatHistory.push({
                role: "user",
                content: userInput,
                timestamp: messageTimestamp,
            });
            chatbotInput.value = "";
            chatbotInput.disabled = true;
            chatbotSend.disabled = true;
            showTypingIndicator();
            const messageComplexity = analyzeMessageComplexity(userInput);
            const responseTime = calculateResponseTime(
                userInput,
                messageComplexity
            );
            setTimeout(() => {
                const { response, keywords } = generateResponse(userInput);
                hideTypingIndicator();
                trackInteraction(userInput, response);
                const isVeryLongResponse = response.length > 5000;
                if (isVeryLongResponse) {
                    typeResponse(response, keywords, 1);
                } else {
                    const typingSpeed = Math.max(5, 30 - response.length / 100);
                    typeResponse(response, keywords, typingSpeed);
                }
                chatHistory.push({
                    role: "assistant",
                    content: response,
                    timestamp: new Date(),
                });
                setTimeout(() => {
                    chatbotInput.disabled = false;
                    chatbotSend.disabled = false;
                    chatbotInput.focus();
                    if (chatbotMessages.children.length < 15) {
                        setTimeout(updateSuggestionChips, 1000);
                    }
                }, 500);
            }, responseTime);
        };
        const createConversationContext = () => {
            const recentMessages = chatHistory.slice(-10);
            const userMessages = recentMessages
                .filter((msg) => msg.role === "user")
                .map((msg) => msg.content);
            const botMessages = recentMessages
                .filter((msg) => msg.role === "assistant")
                .map((msg) => msg.content);
            const topicRegex = /about|your|you|tell me about|what is|how to|can you|explain/gi;
            const keywordRegex = /skill|project|education|contact|experience|background|family|age|location|certification|goal|hobby/gi;
            let extractedTopics = [];
            userMessages.forEach((message) => {
                const match = message.match(keywordRegex);
                if (match) {
                    extractedTopics = extractedTopics.concat(match);
                }
            });
            const topicFrequency = {};
            extractedTopics.forEach((topic) => {
                const normalizedTopic = topic.toLowerCase();
                topicFrequency[normalizedTopic] =
                    (topicFrequency[normalizedTopic] || 0) + 1;
            });
            const sortedTopics = Object.entries(topicFrequency)
                .sort((a, b) => b[1] - a[1])
                .map((entry) => entry[0]);
            return {
                recentTopics: sortedTopics.slice(0, 3),
                messageCount: chatHistory.length,
                allTopics: sortedTopics,
                lastTopic: sortedTopics[0] || null,
            };
        };
        const trackInteraction = (userInput, response) => {
            if (!analyticsData.currentSession.startTime) {
                analyticsData.currentSession.startTime = new Date().toISOString();
                analyticsData.sessionsCount++;
            }
            
            const now = new Date();
            
            // Calculate session duration if there was a previous interaction
            if (analyticsData.currentSession.lastInteraction) {
                const lastTime = new Date(analyticsData.currentSession.lastInteraction);
                const timeDiff = now - lastTime; // in milliseconds
                analyticsData.currentSession.duration += timeDiff;
            }
            
            // Update last interaction time
            analyticsData.currentSession.lastInteraction = now.toISOString();
            analyticsData.currentSession.interactions++;
            
            const topicKeywords = [
                "skill",
                "project",
                "education",
                "contact",
                "experience",
                "background",
                "family",
                "age",
                "location",
                "certification",
                "goal",
                "hobby",
                "technical",
                "design",
                "work",
            ];
            const matchedTopics = topicKeywords.filter((keyword) =>
                userInput.toLowerCase().includes(keyword)
            );
            if (matchedTopics.length > 0) {
                matchedTopics.forEach((topic) => {
                    if (!analyticsData.currentSession.topics.includes(topic)) {
                        analyticsData.currentSession.topics.push(topic);
                    }
                    analyticsData.questionTopics[topic] =
                        (analyticsData.questionTopics[topic] || 0) + 1;
                });
            }
            try {
                localStorage.setItem(
                    "chatbotAnalytics",
                    JSON.stringify(analyticsData)
                );
            } catch (e) {
                console.error("Could not save analytics:", e);
            }
        };
        const loadAnalytics = () => {
            try {
                const storedAnalytics = localStorage.getItem(
                    "chatbotAnalytics"
                );
                if (storedAnalytics) {
                    analyticsData = JSON.parse(storedAnalytics);
                    analyticsData.currentSession = {
                        startTime: null,
                        interactions: 0,
                        topics: [],
                        duration: 0,
                        lastInteraction: null
                    };
                }
            } catch (e) {
                console.error("Could not load analytics:", e);
            }
        };
        const endAnalyticsSession = () => {
            if (analyticsData.currentSession.interactions > 0) {
                analyticsData.interactionsPerSession.push(
                    analyticsData.currentSession.interactions
                );
                if (analyticsData.interactionsPerSession.length > 50) {
                    analyticsData.interactionsPerSession = analyticsData.interactionsPerSession.slice(
                        -50
                    );
                }
                analyticsData.currentSession = {
                    startTime: null,
                    interactions: 0,
                    topics: [],
                    duration: 0,
                    lastInteraction: null
                };
                try {
                    localStorage.setItem(
                        "chatbotAnalytics",
                        JSON.stringify(analyticsData)
                    );
                } catch (e) {
                    console.error("Could not save analytics:", e);
                }
            }
        };
        const showAnalyticsView = () => {
            // Calculate total duration in a human-readable format
            const formatDuration = (ms) => {
                const seconds = Math.floor((ms / 1000) % 60);
                const minutes = Math.floor((ms / (1000 * 60)) % 60);
                const hours = Math.floor(ms / (1000 * 60 * 60));
                
                return hours > 0 
                    ? `${hours}h ${minutes}m ${seconds}s`
                    : minutes > 0 
                        ? `${minutes}m ${seconds}s` 
                        : `${seconds}s`;
            };
            
            // Current session duration
            let currentDuration = analyticsData.currentSession.duration;
            if (analyticsData.currentSession.lastInteraction) {
                const lastTime = new Date(analyticsData.currentSession.lastInteraction);
                const now = new Date();
                currentDuration += (now - lastTime);
            }
            
            // Generate top topics
            const topTopics = Object.entries(analyticsData.questionTopics)
                .sort((a, b) => b[1] - a[1])
                .slice(0, 5)
                .map(([topic, count]) => `${topic}: ${count} questions`);
                
            const topicsHTML = topTopics.length > 0
                ? `<ul>${topTopics.map(topic => `<li>${topic}</li>`).join('')}</ul>`
                : '<p>No topics recorded yet</p>';
                
            const avgInteractions = analyticsData.interactionsPerSession.length > 0
                ? (analyticsData.interactionsPerSession.reduce((sum, val) => sum + val, 0) / 
                   analyticsData.interactionsPerSession.length).toFixed(1)
                : 'N/A';
            
            const analyticsHTML = `
                <div class="analytics-container">
                    <h3>Conversation Analytics</h3>
                    
                    <div class="analytics-section">
                        <h4>Current Session</h4>
                        <p>Duration: ${formatDuration(currentDuration)}</p>
                        <p>Interactions: ${analyticsData.currentSession.interactions}</p>
                        <p>Topics: ${analyticsData.currentSession.topics.join(', ') || 'None'}</p>
                    </div>
                    
                    <div class="analytics-section">
                        <h4>Overall Stats</h4>
                        <p>Total Sessions: ${analyticsData.sessionsCount}</p>
                        <p>Average Interactions per Session: ${avgInteractions}</p>
                    </div>
                    
                    <div class="analytics-section">
                        <h4>Popular Topics</h4>
                        ${topicsHTML}
                    </div>
                    
                    <div class="analytics-actions">
                        <button id="export-analytics" class="analytics-btn">Export Data</button>
                        <button id="close-analytics" class="analytics-btn">Close</button>
                    </div>
                </div>
            `;
            
            showModal({
                title: "Conversation Analytics",
                content: analyticsHTML,
                customClass: "analytics-modal",
                buttons: []
            });
            
            // Add styles for the analytics view
            if (!document.getElementById('analytics-styles')) {
                const styles = document.createElement('style');
                styles.id = 'analytics-styles';
                styles.textContent = `
                    .analytics-modal {
                        width: 90% !important;
                        max-width: 50vh !important;
                    }
                    .analytics-container {
                        color: rgba(255, 255, 255, 0.9);
                        text-align: left;
                    }
                    .analytics-section {
                        margin-bottom: 2vh;
                        background: rgba(60, 60, 100, 0.2);
                        padding: 1.5vh;
                        border-radius: 1vh;
                    }
                    .analytics-section h4 {
                        margin: 0 0 1vh 0;
                        font-size: 1.3vh;
                        color: rgba(120, 120, 255, 0.9);
                    }
                    .analytics-section p {
                        margin: 0.5vh 0;
                        font-size: 1.2vh;
                    }
                    .analytics-section ul {
                        margin: 0.5vh 0;
                        padding-left: 2vh;
                    }
                    .analytics-section li {
                        font-size: 1.2vh;
                        margin-bottom: 0.5vh;
                    }
                    .analytics-actions {
                        display: flex;
                        justify-content: center;
                        gap: 1vh;
                        margin-top: 2vh;
                    }
                    .analytics-btn {
                        background: rgba(80, 80, 150, 0.6);
                        border: none;
                        padding: 1vh 2vh;
                        border-radius: 2vh;
                        color: white;
                        cursor: pointer;
                        font-size: 1.2vh;
                        transition: all 0.3s ease;
                    }
                    .analytics-btn:hover {
                        background: rgba(100, 100, 200, 0.8);
                    }
                `;
                document.head.appendChild(styles);
            }
            
            // Set up button event listeners
            setTimeout(() => {
                const exportBtn = document.getElementById('export-analytics');
                const closeBtn = document.getElementById('close-analytics');
                
                if (exportBtn) {
                    exportBtn.addEventListener('click', exportAnalytics);
                }
                
                if (closeBtn) {
                    closeBtn.addEventListener('click', closeModal);
                }
            }, 100);
        };
        
        const exportAnalytics = () => {
            const dataStr = JSON.stringify(analyticsData, null, 2);
            const blob = new Blob([dataStr], { type: 'application/json' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `chatbot-analytics-${new Date().toISOString().slice(0, 10)}.json`;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(url);
        };
        if (chatbotTrigger) {
            chatbotTrigger.addEventListener("click", () => {
                chatbotContainer.classList.remove("chatbot-closed");
                setTimeout(() => {
                    chatbotInput.focus();
                    if (chatHistory.length === 0) {
                        showWelcomeMessage();
                    }
                    createChatToolbar();
                    loadAnalytics();
                }, 300);
            });
        }
        if (chatbotClose) {
            chatbotClose.addEventListener("click", () => {
                chatbotContainer.classList.add("chatbot-closed");
                if (chatbotContainer.classList.contains("chatbot-minimized")) {
                    chatbotContainer.classList.remove("chatbot-minimized");
                }
                endAnalyticsSession();
            });
        }
        if (chatbotMinimize) {
            chatbotMinimize.addEventListener("click", () => {
                chatbotContainer.classList.toggle("chatbot-minimized");
            });
        }
        if (chatbotInput) {
            chatbotInput.addEventListener("keydown", (e) => {
                if (e.key === "Enter" && !isTyping) {
                    processInput();
                }
            });
        }
        if (chatbotSend) {
            chatbotSend.addEventListener("click", () => {
                if (!isTyping) {
                    processInput();
                }
            });
        }
        if (chatbotTrigger && chatbotContainer && chatbotMessages) {
            console.log(
                "Voice support initialized:",
                "webkitSpeechRecognition" in window ||
                    "SpeechRecognition" in window
            );
        }
        const toggleContinuousVoice = () => {
            if (
                !("webkitSpeechRecognition" in window) &&
                !("SpeechRecognition" in window)
            ) {
                showMessage(
                    "Voice recognition is not supported in your browser."
                );
                return;
            }
            continuousListeningMode = !continuousListeningMode;
            const continuousVoiceBtn = document.querySelector(
                ".toolbar-btn:nth-child(3)"
            );
            if (continuousListeningMode) {
                continuousVoiceBtn.classList.add("voice-active");
                continuousVoiceBtn.style.background =
                    "rgba(100, 200, 100, 0.5)";
                showMessage(
                    "Continuous voice mode activated. I'll keep listening until you deactivate."
                );
                if (!voiceEnabled) {
                    toggleVoiceInteraction();
                } else if (window.recognition) {
                    window.recognition.stop();
                    setTimeout(() => {
                        toggleVoiceInteraction();
                    }, 300);
                }
            } else {
                continuousVoiceBtn.classList.remove("voice-active");
                continuousVoiceBtn.style.background = "";
                showMessage("Continuous voice mode deactivated.");
                if (voiceEnabled) {
                    window.recognition.stop();
                    setTimeout(() => {
                        toggleVoiceInteraction();
                    }, 300);
                }
            }
        };
    });
})();