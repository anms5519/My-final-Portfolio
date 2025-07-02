// main.js - Coordinates loading of all section content
document.addEventListener('DOMContentLoaded', function() {
    // Initialize array of sections to load
    const sections = [
        { id: 'preloader', module: 'PreloaderContent' },
        { id: 'header', module: 'HeaderContent' },
        { id: 'hero', module: 'HeroContent' },
        { id: 'about', module: 'AboutContent' },
        { id: 'education', module: 'EducationContent' },
        { id: 'certifications', module: 'CertificationsContent' },
        { id: 'skills', module: 'SkillsContent' },
        { id: 'work', module: 'WorkContent' },
        { id: 'projects', module: 'ProjectsContent' },
        { id: 'trainings', module: 'TrainingsContent' },
        { id: 'activities', module: 'ActivitiesContent' },
        { id: 'gallery', module: 'GalleryContent' },
        { id: 'interests', module: 'InterestsContent' },
        { id: 'legendary-languages', module: 'LanguagesContent' },
        { id: 'resume-access-vault', module: 'ResumeContent' },
        { id: 'contact', module: 'ContactContent' },
        { id: 'footer', module: 'FooterContent' }
    ];

    // Load the content for each section
    sections.forEach(section => {
        loadSectionContent(section.id, section.module);
    });

    // Function to load section content from corresponding JS module
    function loadSectionContent(sectionId, moduleName) {
        const sectionElement = document.getElementById(sectionId);
        if (!sectionElement) {
            console.warn(`Section with ID ${sectionId} not found.`);
            return;
        }
        
        // Get the section content from the corresponding module
        const contentModule = window[moduleName];
        
        try {
            if (contentModule && contentModule.getHTML) {
                // Insert the HTML content into the section
                sectionElement.innerHTML = contentModule.getHTML();
                
                // If there's an init function in the module, call it after inserting the HTML
                if (contentModule.init) {
                    contentModule.init();
                }
                console.log(`Loaded content for section: ${sectionId}`);
            } else {
                console.warn(`Content module ${moduleName} for section ${sectionId} not found or doesn't have a getHTML method`);
            }
        } catch (error) {
            console.error(`Error loading content for section ${sectionId}:`, error);
        }
    }
    
    // Initialize any global interactive elements
    initializeGlobalInteractions();
    
    function initializeGlobalInteractions() {
        // Set up audio elements
        const smallBGM = document.getElementById('smallBGM');
        const bigBGM = document.getElementById('bigBGM');
        
        // Initialize AOS (Animate On Scroll)
        if (typeof AOS !== 'undefined') {
            AOS.init({
                duration: 800,
                once: true,
                offset: 100
            });
        }
        
        // Update current year in footer
        const currentYearElement = document.getElementById('current-year');
        if (currentYearElement) {
            currentYearElement.textContent = new Date().getFullYear();
        }
        
        // Global event listeners and other initializations
        document.addEventListener('scroll', function() {
            // Potential scroll-based animations or effects
        });
        
        // Handle any resize events
        window.addEventListener('resize', function() {
            // Adjust layouts or elements based on window size
            if (typeof AOS !== 'undefined') {
                AOS.refresh();
            }
        });
    }
});