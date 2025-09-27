document.addEventListener("DOMContentLoaded", function () {
    const sections = [
        { id: "preloader", module: "PreloaderContent" },
        { id: "header", module: "HeaderContent" },
        { id: "hero", module: "HeroContent" },
        { id: "about", module: "AboutContent" },
        { id: "education", module: "EducationContent" },
        { id: "certifications", module: "CertificationsContent" },
        { id: "skills", module: "SkillsContent" },
        { id: "work", module: "WorkContent" },
        { id: "projects", module: "ProjectsContent" },
        { id: "trainings", module: "TrainingsContent" },
        { id: "activities", module: "ActivitiesContent" },
        { id: "gallery", module: "GalleryContent" },
        { id: "interests", module: "InterestsContent" },
        { id: "legendary-languages", module: "LanguagesContent" },
        { id: "resume-access-vault", module: "ResumeContent" },
        { id: "contact", module: "ContactContent" },
        { id: "footer", module: "FooterContent" },
    ];
    sections.forEach((section) => {
        loadSectionContent(section.id, section.module);
    });
    function loadSectionContent(sectionId, moduleName) {
        const sectionElement = document.getElementById(sectionId);
        if (!sectionElement) {
            console.warn(`Section with ID ${sectionId} not found.`);
            return;
        }
        const contentModule = window[moduleName];
        try {
            if (contentModule && contentModule.getHTML) {
                sectionElement.innerHTML = contentModule.getHTML();
                if (contentModule.init) {
                    contentModule.init();
                }
                console.log(`Loaded content for section: ${sectionId}`);
            } else {
                console.warn(
                    `Content module ${moduleName} for section ${sectionId} not found or doesn't have a getHTML method`
                );
            }
        } catch (error) {
            console.error(
                `Error loading content for section ${sectionId}:`,
                error
            );
        }
    }
    initializeGlobalInteractions();
    function initializeGlobalInteractions() {
        const smallBGM = document.getElementById("smallBGM");
        const bigBGM = document.getElementById("bigBGM");
        if (typeof AOS !== "undefined") {
            AOS.init({
                duration: 800,
                once: true,
                offset: 100,
            });
        }
        const currentYearElement = document.getElementById("current-year");
        if (currentYearElement) {
            currentYearElement.textContent = new Date().getFullYear();
        }
        document.addEventListener("scroll", function () {
        });
        window.addEventListener("resize", function () {
            if (typeof AOS !== "undefined") {
                AOS.refresh();
            }
        });
    }
});