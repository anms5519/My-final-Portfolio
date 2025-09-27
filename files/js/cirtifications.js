window.CertificationsContent = {
    getHTML: function () {
        return `
            <div class="section-header">
                <h2>Certifications & Achievements</h2>
                <p>
                    Professional qualifications and digital badges showcasing my
                    expertise and continuous learning
                </p>
            </div>
            <div class="controls">
                <div class="filter-row">
                    <div class="search-container">
                        <i class="fas fa-search search-icon"></i>
                        <input
                            type="text"
                            id="cert-search"
                            placeholder="Search certificates..."
                        />
                    </div>
                    <div class="filter-container">
                        <select id="cert-filter">
                            <option value="all">All Types</option>
                        </select>
                    </div>
                    <div class="sort-container">
                        <select id="cert-sort">
                            <option value="date-new">Newest First</option>
                            <option value="date-old">Oldest First</option>
                            <option value="name-asc">Name (A-Z)</option>
                            <option value="name-desc">Name (Z-A)</option>
                            <option value="org">Organization</option>
                        </select>
                    </div>
                    <button id="reset-filters" class="reset-btn">
                        <i class="fas fa-sync-alt"></i> Reset
                    </button>
                </div>
                <div class="results-info">
                    <span id="cert-count">Showing all certificates</span>
                </div>
            </div>
            <div id="certificates-grid" class="certificates-grid">
            </div>
                    <div id="certLightbox" class="lightbox">
            <div class="lightbox-content">
                <span class="close-btn" id="lbClose"
                    ><i class="fas fa-times"></i
                ></span>
                <div class="lightbox-header">
                    <h3 id="lbTitle"></h3>
                    <p class="lb-meta" id="lbMeta"></p>
                </div>
                <div class="lightbox-body">
                    <div class="certificate-image-container">
                        <img
                            id="lbCertificateImage"
                            alt="Certificate"
                            draggable="false"
                        />
                        <div class="image-controls">
                            <button
                                id="zoomIn"
                                class="image-control-btn"
                                title="Zoom In"
                            >
                                <i class="fas fa-search-plus"></i>
                            </button>
                            <button
                                id="zoomOut"
                                class="image-control-btn"
                                title="Zoom Out"
                            >
                                <i class="fas fa-search-minus"></i>
                            </button>
                            <button
                                id="resetZoom"
                                class="image-control-btn"
                                title="Reset View"
                            >
                                <i class="fas fa-sync-alt"></i>
                            </button>
                            <button
                                id="lbDownloadImage"
                                class="image-control-btn"
                                title="Download Certificate Image"
                            >
                                <i class="fas fa-download"></i>
                            </button>
                        </div>
                    </div>
                    <div class="certificate-details">
                        <p id="lbCompletion"></p>
                        <p id="lbCertId"></p>
                        <p id="lbLearnings"></p>
                        <p id="lbAdditional"></p>
                        <div class="lb-buttons">
                            <a
                                href="#"
                                id="lbVerify"
                                class="lb-button"
                                target="_blank"
                            >
                                <i class="fas fa-check-circle"></i> Verify
                                Certificate
                            </a>
                            <a
                                href="#"
                                id="lbDownload"
                                class="lb-button"
                                download
                            >
                                <i class="fas fa-file-pdf"></i> Download PDF
                            </a>
                            <button id="shareBtn" class="lb-button">
                                <i class="fas fa-share-alt"></i> Share
                            </button>
                        </div>
                        <div id="shareOptionsPopup" class="share-options-popup">
                            <h4>Share Certificate</h4>
                            <button id="copyLinkBtn">
                                <i class="fas fa-link"></i> Copy Link
                            </button>
                            <a
                                id="shareTwitterBtn"
                                href="#"
                                target="_blank"
                                rel="noopener noreferrer"
                                ><i class="fab fa-twitter"></i> Twitter</a
                            >
                            <a
                                id="shareLinkedInBtn"
                                href="#"
                                target="_blank"
                                rel="noopener noreferrer"
                                ><i class="fab fa-linkedin"></i> LinkedIn</a
                            >
                            <button
                                id="closeSharePopupBtn"
                                aria-label="Close share options"
                            >
                                <i class="fas fa-times"></i>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
                `;
    },
    init: function () {
        const certificationsData = [
            {
                id: 1,
                title:
                    "Building Generative AI Applications Using Amazon Bedrock",
                issuingOrg: "AWS Training and Certification",
                type: "Certificate of Completion",
                completionDate: "2024-06-09",
                certificateId: "Not explicitly provided",
                verificationLink: "Not explicitly provided",
                downloadLink: "",
                certificateImage: "images/certificates/c (36).png",
                learnings:
                    "Gained knowledge on leveraging Amazon Bedrock to build and scale generative AI applications. Learned about foundation models (FMs), prompt engineering techniques, integrating Bedrock APIs, and applying generative AI to various use cases like text generation, summarization, and chatbots within the AWS ecosystem.",
                additionalDetails: "Completed via AWS Skill Builder platform.",
                category: "Cloud Computing",
                tags: [
                    "AWS",
                    "AI",
                    "Generative AI",
                    "Bedrock",
                    "Cloud",
                    "Machine Learning",
                ],
            },
            {
                id: 2,
                title: "Cybersecurity Analyst Job Simulation",
                issuingOrg: "Forage / TATA",
                type: "Certificate of Completion (Job Simulation)",
                completionDate: "2024-04-24",
                certificateId:
                    "Enrolment: sGHpLKwrsNAkSxpLR | User: wgXe5itZmXT5vaQAG",
                verificationLink:
                    "Issued by Forage (Verification likely platform-specific via codes)",
                downloadLink: "",
                certificateImage: "images/certificates/c (20).png",
                learnings:
                    "Completed practical tasks simulating the role of a Cybersecurity Analyst. Gained hands-on experience in IAM fundamentals, conducting IAM strategy assessments, crafting custom IAM solutions, and understanding platform integration challenges in a corporate environment.",
                additionalDetails: "Virtual work experience program.",
                category: "Cybersecurity",
                tags: [
                    "Cybersecurity",
                    "Security",
                    "IAM",
                    "Risk Assessment",
                    "Forage",
                    "TATA",
                    "Simulation",
                ],
            },
            {
                id: 3,
                title:
                    "Data Visualisation: Empowering Business with Effective Insights",
                issuingOrg: "Forage / TATA",
                type: "Certificate of Completion (Job Simulation)",
                completionDate: "2024-04-24",
                certificateId:
                    "Enrolment: Snt2jSfWmYbXprxAu | User: wgXe5itZmXT5vaQAG",
                verificationLink:
                    "Issued by Forage (Verification likely platform-specific via codes)",
                downloadLink: "",
                certificateImage: "images/certificates/c (21).png",
                learnings:
                    "Completed practical tasks focused on data visualization for business intelligence. Practiced framing business scenarios, selecting appropriate visualization types, creating clear and impactful visuals using data, and effectively communicating insights and analysis.",
                additionalDetails:
                    "Virtual work experience program focused on BI.",
                category: "Data Analysis",
                tags: [
                    "Data Visualization",
                    "Business Intelligence",
                    "BI",
                    "Analytics",
                    "Forage",
                    "TATA",
                    "Simulation",
                ],
            },
            {
                id: 4,
                title: "Introduction to Critical Infrastructure Protection",
                issuingOrg: "OPSWAT Academy",
                type: "Certificate of Completion / Graduate",
                completionDate: "2025-03-06",
                certificateId: "gDFCW-cl5A",
                verificationLink:
                    "https://learn.opswatacademy.com/certificate/gDFCW-cl5A",
                downloadLink: "",
                certificateImage: "images/certificates/c (30).png",
                learnings:
                    "Acquired foundational knowledge on protecting critical infrastructure sectors from cyber and physical threats. Understood risk management, security controls specific to OT/ICS, incident response, and the importance of CIP standards.",
                additionalDetails: "Expiration Date: March 6, 2026",
                category: "Cybersecurity",
                tags: [
                    "Cybersecurity",
                    "Critical Infrastructure",
                    "OT",
                    "ICS",
                    "Security",
                    "OPSWAT",
                ],
            },
            {
                id: 5,
                title:
                    "Agile Transformation A to Z | How To Make Any Company Agile",
                issuingOrg: "Udemy",
                type: "Certificate of Completion",
                completionDate: "2024-05-12",
                certificateId: "UC-56ec4a09-b4a6-4aa5-87fb-1297467078f7",
                verificationLink:
                    "https://ude.my/UC-56ec4a09-b4a6-4aa5-87fb-1297467078f7",
                downloadLink: "",
                certificateImage: "images/certificates/c (27).png",
                learnings:
                    "Gained a comprehensive understanding of Agile principles, methodologies (Scrum, Kanban), and practices. Learned strategies for implementing Agile transformations, fostering an Agile mindset, and scaling Agile frameworks.",
                additionalDetails:
                    "Length: 6.5 total hours, Instructor: Masha Ostroumova",
                category: "Project Management",
                tags: [
                    "Agile",
                    "Scrum",
                    "Kanban",
                    "Project Management",
                    "Transformation",
                    "Udemy",
                ],
            },
            {
                id: 6,
                title:
                    "Digital Marketing Strategist. Unlock your career growth",
                issuingOrg: "Udemy",
                type: "Certificate of Completion",
                completionDate: "2024-04-24",
                certificateId: "UC-16ec4f5b-acc7-4af3-aa64-37b66793443e",
                verificationLink:
                    "https://ude.my/UC-16ec4f5b-acc7-4af3-aa64-37b66793443e",
                downloadLink: "",
                certificateImage: "images/certificates/c (26).png",
                learnings:
                    "Developed strategic knowledge across various digital marketing domains including SEO, SEM, content marketing, social media, email marketing, and analytics. Learned to formulate, implement, and measure integrated digital strategies.",
                additionalDetails:
                    "Length: 26.5 total hours, Instructors: Anton Voroniuk, et al.",
                category: "Marketing",
                tags: [
                    "Digital Marketing",
                    "SEO",
                    "SEM",
                    "Content Marketing",
                    "Social Media",
                    "Analytics",
                    "Udemy",
                ],
            },
            {
                id: 7,
                title: "Make Simple Games with Python",
                issuingOrg: "Udemy",
                type: "Certificate of Completion",
                completionDate: "2024-04-24",
                certificateId: "UC-3ac24bfd-5bce-40b7-8be2-948bed9e6393",
                verificationLink:
                    "https://ude.my/UC-3ac24bfd-5bce-40b7-8be2-948bed9e6393",
                downloadLink: "",
                certificateImage: "images/certificates/c (25).png",
                learnings:
                    "Acquired introductory skills in game development using Python. Learned about game loops, handling user input, simple graphics/text output, and applying fundamental programming logic to create simple, playable games.",
                additionalDetails:
                    "Length: 1 total hour, Instructor: Frank Anemaet",
                category: "Programming",
                tags: ["Python", "Game Development", "Programming", "Udemy"],
            },
            {
                id: 8,
                title: "Build a free website with WordPress",
                issuingOrg: "Coursera Project Network",
                type: "Project Certificate (Non-credit)",
                completionDate: "2024-04-28",
                certificateId: "ACDZQDJYBT2L (Inferred from verification link)",
                verificationLink: "https://coursera.org/verify/ACDZQDJYBT2L",
                downloadLink: "",
                certificateImage: "images/certificates/c (15).png",
                learnings:
                    "Gained practical, hands-on experience in creating a functional website using WordPress. Learned to navigate the dashboard, customize themes, create pages and posts, and manage basic website operations.",
                additionalDetails:
                    "Instructor: Delphine Sangotokun, MPH, Ph.D.",
                category: "Web Development",
                tags: ["WordPress", "Website", "CMS", "Coursera", "Project"],
            },
            {
                id: 9,
                title: "Introduction to Microsoft Excel",
                issuingOrg: "Coursera Project Network",
                type: "Project Certificate (Non-credit)",
                completionDate: "2024-04-28",
                certificateId: "W8JFG6JN7E64 (Inferred from verification link)",
                verificationLink: "https://coursera.org/verify/W8JFG6JN7E64",
                downloadLink: "",
                certificateImage: "images/certificates/c (16).png",
                learnings:
                    "Mastered fundamental Microsoft Excel skills through a practical project. Learned data entry, formatting, basic formulas, creating charts, and navigating the Excel interface.",
                additionalDetails:
                    "Instructor: Summer Scaggs, Subject Matter Expert",
                category: "Data Analysis",
                tags: [
                    "Excel",
                    "Microsoft Excel",
                    "Spreadsheet",
                    "Data Analysis",
                    "Coursera",
                    "Project",
                ],
            },
            {
                id: 10,
                title: "CSS (Basic)",
                issuingOrg: "HackerRank",
                type: "Certificate of Accomplishment (Skill Certification)",
                completionDate: "2025-01-10",
                certificateId: "8BA95279CB39",
                verificationLink:
                    "Verification typically via HackerRank profile using ID",
                downloadLink: "",
                certificateImage: "images/certificates/c (19).png",
                learnings:
                    "Demonstrated proficiency in foundational CSS concepts including selectors, properties, the box model, basic layout techniques, and applying styles to HTML elements.",
                additionalDetails: "Skill assessment platform.",
                category: "Web Development",
                tags: [
                    "CSS",
                    "Web Development",
                    "Frontend",
                    "HackerRank",
                    "Skill",
                ],
            },
            {
                id: 11,
                title: "A2Z Of Finance: Finance Beginner Course",
                issuingOrg: "Elearnmarkets",
                type: "Certificate of Completion",
                completionDate: "2024-04-24",
                certificateId: "ELM-181639",
                verificationLink:
                    "https://elearnmarkets.com/verify-certificate",
                downloadLink: "",
                certificateImage: "images/certificates/c (11).png",
                learnings:
                    "Gained a foundational understanding of core finance concepts including financial terminology, market basics, accounting principles, and types of financial instruments.",
                additionalDetails: "",
                category: "Finance",
                tags: [
                    "Finance",
                    "Accounting",
                    "Markets",
                    "Beginner",
                    "Elearnmarkets",
                ],
            },
            {
                id: 12,
                title: "The SDG Primer",
                issuingOrg: "futurenation / UNDP Bangladesh",
                type: "Certificate of Completion",
                completionDate: "2024-09-07",
                certificateId: "Not explicitly provided",
                verificationLink: "Not explicitly provided",
                downloadLink: "",
                certificateImage: "images/certificates/c (24).png",
                learnings:
                    "Acquired foundational knowledge about the United Nations Sustainable Development Goals (SDGs). Understood the 17 goals, their targets, and their global significance.",
                additionalDetails:
                    "Initiative: Green Skills for SDGs, Instructor: A. Z. M. Saleh, UNDP Bangladesh",
                category: "Social Impact",
                tags: [
                    "SDG",
                    "Sustainable Development",
                    "UN",
                    "UNDP",
                    "Global Goals",
                    "Bangladesh",
                ],
            },
            {
                id: 13,
                title:
                    "CHAT- a toolkit to improve Community Engagement in emergencies",
                issuingOrg: "UNICEF (via Agora platform)",
                type: "Certificate of Completion",
                completionDate: "2025-01-09",
                certificateId: "KWmgQ752El",
                verificationLink:
                    "Issued via Agora platform (Verification may require login/be internal)",
                downloadLink: "",
                certificateImage: "images/certificates/c (28).png",
                learnings:
                    "Learned to utilize the CHAT framework to enhance community engagement during emergencies, focusing on effective communication, participation strategies, and trust-building.",
                additionalDetails: "Completed via Agora learning platform.",
                category: "Community Engagement",
                tags: [
                    "Community Engagement",
                    "Emergency Response",
                    "Communication",
                    "UNICEF",
                    "Agora",
                ],
            },
            {
                id: 14,
                title: "EF SET English Certificate (C1 Advanced)",
                issuingOrg: "EF SET",
                type: "Language Proficiency Certificate",
                completionDate: "2025-02-18",
                certificateId: "oHqLcS (Inferred from verification link)",
                verificationLink: "https://cert.efset.org/oHqLcS",
                downloadLink: "",
                certificateImage: "images/certificates/c (22).png",
                learnings:
                    "Demonstrated advanced English proficiency across reading, listening, writing, and speaking skills, corresponding to the C1 level (Overall Score: 68/100).",
                additionalDetails:
                    "Scores: Reading 83, Listening 54, Writing 86, Speaking 48. CEFR Level C1.",
                category: "Language Proficiency",
                tags: [
                    "English",
                    "Language",
                    "C1",
                    "Advanced",
                    "EF SET",
                    "CEFR",
                ],
            },
            {
                id: 15,
                title: "Advanced Cardiac Life Support (ACLS) Provider",
                issuingOrg: "SaveaLife Certifications™ by NHCPS",
                type: "Provider Certification",
                completionDate: "2025-04-02",
                certificateId: "QR Code for verification",
                verificationLink: "Scan QR Code",
                downloadLink: "",
                certificateImage: "images/certificates/c (8).png",
                learnings:
                    "Mastered advanced skills for managing adult cardiovascular emergencies including airway management, rhythm interpretation, defibrillation, medication administration, and effective team dynamics.",
                additionalDetails:
                    "Renew By: April 2, 2027, Standards: ILCOR, Joint Commission (JCAHO) compliant, Instructor: Karl F. Disque D.O. RPh",
                category: "Healthcare",
                tags: [
                    "ACLS",
                    "Healthcare",
                    "Medical",
                    "Emergency",
                    "Life Support",
                    "NHCPS",
                    "Certification",
                ],
            },
            {
                id: 16,
                title: "SaveaLife - ACLS Certification 2025 (CME)",
                issuingOrg: "Postgraduate Institute for Medicine (PIM)",
                type:
                    "Certificate of Continuing Medical Education (AAPA Credit)",
                completionDate: "2025-04-02",
                certificateId: "Not explicitly provided",
                verificationLink: "Not explicitly provided",
                downloadLink: "",
                certificateImage: "images/certificates/c (12).png",
                learnings:
                    "Fulfilled continuing education requirements by reviewing and demonstrating knowledge of current ACLS protocols and guidelines relevant for Physician Assistants.",
                additionalDetails:
                    "Credits: 8.00 AAPA Category 1 credit(s), Approval Valid Until: 12/31/2025",
                category: "Healthcare",
                tags: [
                    "CME",
                    "ACLS",
                    "Healthcare",
                    "Medical",
                    "Continuing Education",
                    "AAPA",
                    "PIM",
                ],
            },
            {
                id: 17,
                title: "Pediatric Advanced Life Support (PALS) Provider",
                issuingOrg: "SaveaLife Certifications™ by NHCPS",
                type: "Provider Certification",
                completionDate: "2025-04-03",
                certificateId: "QR Code for verification",
                verificationLink: "Scan QR Code",
                downloadLink: "",
                certificateImage: "images/certificates/c (23).png",
                learnings:
                    "Acquired advanced skills for assessing and managing critically ill infants and children, including pediatric assessment, management of respiratory emergencies, and resuscitation.",
                additionalDetails:
                    "Renew By: April 3, 2027, Standards: ILCOR, Joint Commission (JCAHO) compliant, Instructor: Karl F. Disque D.O. RPh",
                category: "Healthcare",
                tags: [
                    "PALS",
                    "Pediatric",
                    "Healthcare",
                    "Medical",
                    "Emergency",
                    "Life Support",
                    "NHCPS",
                    "Certification",
                ],
            },
            {
                id: 18,
                title: "SaveaLife - PALS Certification 2025 (CME)",
                issuingOrg: "Postgraduate Institute for Medicine (PIM)",
                type:
                    "Attendance Certificate of Continuing Medical Education (AMA PRA Credit)",
                completionDate: "2025-04-02",
                certificateId: "Not explicitly provided",
                verificationLink: "Not explicitly provided",
                downloadLink: "",
                certificateImage: "images/certificates/c (13).png",
                learnings:
                    "Fulfilled continuing education requirements by reviewing Pediatric Advanced Life Support protocols and guidelines.",
                additionalDetails:
                    "Credits: 8.00 AMA PRA Category 1 Credit(s)™",
                category: "Healthcare",
                tags: [
                    "CME",
                    "PALS",
                    "Healthcare",
                    "Medical",
                    "Continuing Education",
                    "AMA PRA",
                    "PIM",
                ],
            },
            {
                id: 19,
                title: "Basic Life Support (BLS) Provider",
                issuingOrg: "SaveaLife Certifications™ by NHCPS",
                type: "Provider Certification",
                completionDate: "2025-04-02",
                certificateId: "QR Code for verification",
                verificationLink: "Scan QR Code",
                downloadLink: "",
                certificateImage: "images/certificates/c (10).png",
                learnings:
                    "Mastered fundamental life support skills including recognition of cardiac arrest, high-quality chest compressions, rescue breathing, AED use, and choking relief.",
                additionalDetails:
                    "Renew By: April 2, 2027, Standards: ILCOR, Joint Commission (JCAHO) compliant, Instructor: Karl F. Disque D.O. RPh",
                category: "Healthcare",
                tags: [
                    "BLS",
                    "CPR",
                    "Healthcare",
                    "Medical",
                    "Emergency",
                    "Life Support",
                    "NHCPS",
                    "Certification",
                ],
            },
            {
                id: 20,
                title: "SaveaLife - BLS Certification 2025 (CME)",
                issuingOrg: "Postgraduate Institute for Medicine (PIM)",
                type:
                    "Attendance Certificate of Continuing Medical Education (AMA PRA Credit)",
                completionDate: "2025-04-02",
                certificateId: "Not explicitly provided",
                verificationLink: "Not explicitly provided",
                downloadLink: "",
                certificateImage: "images/certificates/c (14).png",
                learnings:
                    "Fulfilled continuing education requirements by reviewing current Basic Life Support protocols and guidelines.",
                additionalDetails:
                    "Credits: 4.00 AMA PRA Category 1 Credit(s)™",
                category: "Healthcare",
                tags: [
                    "CME",
                    "BLS",
                    "Healthcare",
                    "Medical",
                    "Continuing Education",
                    "AMA PRA",
                    "PIM",
                ],
            },
            {
                id: 21,
                title:
                    "CPR, AED & First Aid Provider (Infant, Child, and Adult)",
                issuingOrg: "SaveaLife Certifications™ by NHCPS",
                type: "Provider Certification",
                completionDate: "2025-03-11",
                certificateId: "QR Code for verification",
                verificationLink: "Scan QR Code",
                downloadLink: "",
                certificateImage: "images/certificates/c (17).png",
                learnings:
                    "Gained comprehensive skills in providing CPR, using AED, and administering First Aid for infants, children, and adults.",
                additionalDetails:
                    "Renew By: March 11, 2027, Standards: ILCOR, Joint Commission (JCAHO) compliant, Instructor: Karl F. Disque D.O. RPh",
                category: "Healthcare",
                tags: [
                    "CPR",
                    "AED",
                    "First Aid",
                    "Healthcare",
                    "Emergency",
                    "NHCPS",
                    "Certification",
                ],
            },
            {
                id: 22,
                title: "CPR, AED, and First Aid Certification Course (CME)",
                issuingOrg: "SaveaLife.com / NHCPS",
                type: "Continuing Education Certificate",
                completionDate: "2025-03-11",
                certificateId: "Not explicitly provided",
                verificationLink: "Not explicitly provided",
                downloadLink: "",
                certificateImage: "images/certificates/c (18).png",
                learnings:
                    "Fulfilled continuing education requirements by reviewing current CPR, AED, and First Aid protocols and guidelines.",
                additionalDetails:
                    "Credits: 6 Category 2 CME Credits, Instructor: Karl F. Disque D.O. RPh",
                category: "Healthcare",
                tags: [
                    "CME",
                    "CPR",
                    "AED",
                    "First Aid",
                    "Healthcare",
                    "Continuing Education",
                    "NHCPS",
                ],
            },
            {
                id: 23,
                title: "Bloodborne Pathogens Certification Course",
                issuingOrg: "SaveaLife.com / NHCPS",
                type: "Continuing Education Certificate",
                completionDate: "2025-04-02",
                certificateId: "Not explicitly provided",
                verificationLink: "Not explicitly provided",
                downloadLink: "",
                certificateImage: "images/certificates/c (9).png",
                learnings:
                    "Acquired essential knowledge regarding bloodborne pathogens, modes of transmission, prevention strategies, and exposure control procedures.",
                additionalDetails:
                    "Credits: 3 Category 2 CME Credits, Instructor: Karl F. Disque D.O. RPh",
                category: "Healthcare",
                tags: [
                    "Bloodborne Pathogens",
                    "Healthcare",
                    "Safety",
                    "CME",
                    "Continuing Education",
                    "NHCPS",
                ],
            },
            {
                id: 24,
                title: "HHP (Mobile) Service For Hardware and Software",
                issuingOrg:
                    "ST Institute of Mobile Technology (Authorised by NSDA, Bangladesh)",
                type:
                    "Certificate of Appreciation / Training Course Completion",
                completionDate: "2024-01-31",
                certificateId:
                    "NSDA Registration No: STP-DHA-000965; Batch: 42",
                verificationLink: "Not explicitly provided",
                downloadLink: "",
                certificateImage: "images/certificates/c (37).png",
                learnings:
                    "Acquired practical skills in mobile phone servicing covering hardware diagnostics, repair, replacement and software issues like flashing, unlocking, and troubleshooting OS problems.",
                additionalDetails:
                    "Training Period: Nov 1, 2023 - Jan 31, 2024, Location: Dhaka, Bangladesh",
                category: "Technical Skills",
                tags: [
                    "Mobile Repair",
                    "Hardware",
                    "Software",
                    "Technical Training",
                    "NSDA",
                    "Bangladesh",
                ],
            },
            {
                id: 25,
                title:
                    "Skill Development for Mobile Game & Application Project (Cross Platform)",
                issuingOrg:
                    "ICT Division, Government of Bangladesh & Flash IT (Under Digital Bangladesh Initiative)",
                type: "Participation Certificate / Training Completion",
                completionDate: "2022-02-27",
                certificateId:
                    "Batch ID: GV2-DHA-04 (Flash IT); Reg No: G20078",
                verificationLink: "Not explicitly provided",
                downloadLink: "",
                certificateImage: "images/certificates/c (39).png",
                learnings:
                    "Developed skills in mobile game and application development using cross-platform frameworks. Gained experience in designing, coding, testing, and deploying mobile applications for multiple operating systems.",
                additionalDetails:
                    "Duration: 200 hours of training, Part of Digital Bangladesh Initiative.",
                category: "Mobile Development",
                tags: [
                    "Mobile Development",
                    "App Development",
                    "Game Development",
                    "Cross-Platform",
                    "ICT Division",
                    "Bangladesh",
                    "Training",
                ],
            },
            {
                id: 26,
                title: "Workshop on Beginner's guide to Python 3 Programming",
                issuingOrg:
                    "Atish Dipankar University of Science and Technology (ADUST), Dept. of Computer Science and Engineering",
                type: "Certificate of Participation (Workshop)",
                completionDate: "2023-02-09",
                certificateId: "Not provided",
                verificationLink: "Not provided",
                downloadLink: "",
                certificateImage: "images/certificates/c (2).png",
                learnings:
                    "Gained foundational knowledge of Python 3 programming including syntax, data types, control flow, basic data structures, and writing simple programs.",
                additionalDetails:
                    "Recognized for active participation in university workshop.",
                category: "Programming",
                tags: [
                    "Python",
                    "Programming",
                    "Workshop",
                    "ADUST",
                    "University",
                ],
            },
            {
                id: 27,
                title:
                    "Workshop on Professional C Programming for Job Interview",
                issuingOrg:
                    "Atish Dipankar University of Science and Technology (ADUST), Dept. of Computer Science and Engineering",
                type: "Certificate of Participation (Workshop)",
                completionDate: "2023-06-03",
                certificateId: "Not provided",
                verificationLink: "Not provided",
                downloadLink: "",
                certificateImage: "images/certificates/c (7).png",
                learnings:
                    "Focused on enhancing C programming skills for technical job interviews. Covered pointers, memory management, data structures, algorithms, and common coding problems with an emphasis on problem-solving.",
                additionalDetails:
                    "Recognized for active participation in university workshop.",
                category: "Programming",
                tags: [
                    "C Programming",
                    "Programming",
                    "Workshop",
                    "Interview Prep",
                    "Data Structures",
                    "Algorithms",
                    "ADUST",
                    "University",
                ],
            },
            {
                id: 28,
                title: "Higher Secondary Certificate (HSC) Examination, 2020",
                issuingOrg:
                    "Board of Intermediate and Secondary Education, Dhaka, Bangladesh",
                type: "Academic Certificate",
                completionDate: "2020",
                certificateId:
                    "Serial: DBHC 20 0140839; Reg: 1510767316/2018-19; Roll: 11 65 31",
                verificationLink: "Official Board Verification",
                downloadLink: "",
                certificateImage: "images/certificates/c (6).png",
                learnings:
                    "Successfully completed higher secondary education in Science with the highest grade GPA of 5.00.",
                additionalDetails:
                    "Institution: Adamjee Cantonment College, Group: Science, Results Published: 2021-01-30",
                category: "Academic",
                tags: [
                    "HSC",
                    "Academic",
                    "High School",
                    "Science",
                    "Bangladesh",
                    "GPA 5.00",
                ],
            },
            {
                id: 29,
                title: "Secondary School Certificate (SSC) Examination, 2018",
                issuingOrg:
                    "Board of Intermediate and Secondary Education, Dhaka, Bangladesh",
                type: "Academic Certificate",
                completionDate: "2018",
                certificateId:
                    "Serial: DBSC 8300723; Reg: 1510767316/2016; Roll: 22 86 82",
                verificationLink: "Official Board Verification",
                downloadLink: "",
                certificateImage: "images/certificates/c (6).png",
                learnings:
                    "Successfully completed secondary education in Science with the highest grade GPA of 5.00.",
                additionalDetails:
                    "Institution: Civil Aviation High School, Tejgaon, Group: Science, Results Published: 2018-05-06",
                category: "Academic",
                tags: [
                    "SSC",
                    "Academic",
                    "Secondary School",
                    "Science",
                    "Bangladesh",
                    "GPA 5.00",
                ],
            },
            {
                id: 30,
                title: "Junior School Certificate (JSC) Examination - 2015",
                issuingOrg:
                    "Board of Intermediate and Secondary Education, Dhaka, Bangladesh",
                type: "Academic Certificate",
                completionDate: "2015",
                certificateId:
                    "Serial: DBJ 5409887; Reg: 1510767316/2015; Roll: 65 75 24",
                verificationLink: "Official Board Verification",
                downloadLink: "",
                certificateImage: "images/certificates/c (3).png",
                learnings:
                    "Successfully completed junior secondary education with a high level of academic achievement.",
                additionalDetails:
                    "Institution: Civil Aviation High School, Tejgaon, Results Published: 2015-12-31",
                category: "Academic",
                tags: ["JSC", "Academic", "Junior School", "Bangladesh"],
            },
            {
                id: 31,
                title: "Primary Education Completion Examination - 2012",
                issuingOrg: "Directorate of Primary Education, Bangladesh",
                type: "Academic Certificate",
                completionDate: "2012",
                certificateId: "Serial: 8767358",
                verificationLink: "Official Verification",
                downloadLink: "",
                certificateImage: "images/certificates/c (5).png",
                learnings:
                    "Successfully completed primary education with the highest possible academic grade GPA of 5.00.",
                additionalDetails: "Institution: Civil Aviation High School",
                category: "Academic",
                tags: [
                    "Primary Education",
                    "PEC",
                    "Academic",
                    "Bangladesh",
                    "GPA 5.00",
                ],
            },
            {
                id: 32,
                title:
                    "Participation in 38th Science & Technology Week - 2017 (District Level)",
                issuingOrg:
                    "District Administration, Dhaka & Ministry of Science and Technology, Bangladesh",
                type: "Certificate of Participation",
                completionDate: "2017-04-27",
                certificateId: "Roll: 89",
                verificationLink: "Not provided",
                downloadLink: "",
                certificateImage: "images/certificates/c (38).png",
                learnings:
                    "Gained experience in developing and presenting a science project at a district-level event, enhancing presentation and communication skills.",
                additionalDetails:
                    "Event Dates: April 25-27, 2017; Represented Civil Aviation High School (Class 10)",
                category: "Extracurricular",
                tags: [
                    "Science Fair",
                    "Competition",
                    "Participation",
                    "District Level",
                    "Bangladesh",
                    "STEM",
                ],
            },
            {
                id: 33,
                title: "Participation in 'Lakho Konthe Sonar Bangla'",
                issuingOrg:
                    "Ministry of Cultural Affairs, Bangladesh & Bangladesh Armed Forces",
                type: "Certificate of Participation / Appreciation",
                completionDate: "Not specified",
                certificateId: "Not provided",
                verificationLink: "Not provided",
                downloadLink: "",
                certificateImage: "images/certificates/c (4).png",
                learnings:
                    "Participated in a national event aimed at setting a world record for the most people singing a national anthem simultaneously.",
                additionalDetails: "Guinness World Record event.",
                category: "Extracurricular",
                tags: [
                    "National Event",
                    "Participation",
                    "World Record",
                    "Bangladesh",
                    "Culture",
                ],
            },
            {
                id: 34,
                title: "Multiple Indicator Cluster Survey (MICS) eLearning",
                issuingOrg: "UNICEF",
                type: "Certificate of Completion",
                completionDate: "2025-04-03",
                certificateId: "Not Provided",
                verificationLink: "Not Provided (Issued via Agora Platform)",
                downloadLink: "",
                certificateImage: "images/certificates/c (31).png",
                learnings:
                    "Gained understanding of the MICS methodology, survey design principles, data collection processes, and key indicators related to health, education, and child protection.",
                additionalDetails: "Platform: Agora",
                category: "Research",
                tags: [
                    "MICS",
                    "Survey",
                    "Data Collection",
                    "Child Health",
                    "Education",
                    "Protection",
                    "UNICEF",
                    "Agora",
                ],
            },
            {
                id: 35,
                title: "Cinematic Video Editing Mastery",
                issuingOrg: "GoEdu.ac (GoEdu)",
                type: "Certificate of Achievement (With Distinction)",
                completionDate: "2025-04-03",
                certificateId: "Not Provided",
                verificationLink: "QR Code provided on the certificate",
                downloadLink: "",
                certificateImage: "images/certificates/c (29).png",
                learnings:
                    "Mastered advanced video editing techniques focused on cinematic storytelling, color grading, sound design, pacing, and visual effects.",
                additionalDetails:
                    "Achieved with distinction, Instructor: Mr. Shah Fahad Hossain, in association with Skill Jobs & HRDI",
                category: "Creative Skills",
                tags: [
                    "Video Editing",
                    "Cinematic",
                    "Color Grading",
                    "Sound Design",
                    "Post Production",
                    "GoEdu",
                ],
            },
            {
                id: 36,
                title: "Customer Service Development",
                issuingOrg:
                    "BDskills (Supported by EDGE, BACCO, ICT Division, Bangladesh Computer Council)",
                type: "Certificate of Completion",
                completionDate: "2025-03-04",
                certificateId: "Not Provided",
                verificationLink: "QR Code provided on the certificate",
                downloadLink: "",
                certificateImage: "images/certificates/c (33).png",
                learnings:
                    "Developed core competencies in customer service excellence including effective communication, active listening, empathy, and problem-solving.",
                additionalDetails:
                    "Achieved Score: 87%, Part of Bangladesh Digital Skills initiative under the EDGE project, Endorsed by BACCO & BCC",
                category: "Professional Development",
                tags: [
                    "Customer Service",
                    "Communication",
                    "Soft Skills",
                    "BDskills",
                    "Bangladesh",
                    "BPO",
                ],
            },
            {
                id: 37,
                title: "Mobile Application Development using Android",
                issuingOrg:
                    "BDskills (Supported by EDGE, BITM, ICT Division, Bangladesh Computer Council)",
                type: "Certificate of Completion",
                completionDate: "2025-03-04",
                certificateId: "Not Provided",
                verificationLink: "QR Code provided on the certificate",
                downloadLink: "",
                certificateImage: "images/certificates/c (34).png",
                learnings:
                    "Gained foundational and practical skills in native Android application development including UI design, application lifecycle management, and core SDK usage.",
                additionalDetails:
                    "Achieved Score: 82%, Endorsed by BITM & BCC",
                category: "Mobile Development",
                tags: [
                    "Android",
                    "Mobile Development",
                    "App Development",
                    "Java",
                    "Kotlin",
                    "SDK",
                    "BDskills",
                    "Bangladesh",
                ],
            },
            {
                id: 38,
                title: "Web Application Development using PHP and Laravel",
                issuingOrg:
                    "BDskills (Supported by EDGE, BITM, ICT Division, Bangladesh Computer Council)",
                type: "Certificate of Completion",
                completionDate: "2025-03-04",
                certificateId: "Not Provided",
                verificationLink: "QR Code provided on the certificate",
                downloadLink: "",
                certificateImage: "images/certificates/c (35).png",
                learnings:
                    "Acquired proficiency in backend web development using PHP and the Laravel framework including MVC architecture, database management, routing, and RESTful API creation.",
                additionalDetails:
                    "Achieved Score: 80%, Endorsed by BITM & BCC",
                category: "Web Development",
                tags: [
                    "PHP",
                    "Laravel",
                    "Web Development",
                    "Backend",
                    "MVC",
                    "API",
                    "BDskills",
                    "Bangladesh",
                ],
            },
            {
                id: 39,
                title: "Professional Back Office Services",
                issuingOrg:
                    "BDskills (Supported by EDGE, BACCO, ICT Division, Bangladesh Computer Council)",
                type: "Certificate of Completion",
                completionDate: "2025-03-04",
                certificateId: "Not Provided",
                verificationLink: "QR Code provided on the certificate",
                downloadLink: "",
                certificateImage: "images/certificates/c (32).png",
                learnings:
                    "Developed essential skills for efficient back-office operations including data management, administrative support, report generation, and organizational communication.",
                additionalDetails:
                    "Achieved Score: 86%, Endorsed by BACCO & BCC",
                category: "Professional Development",
                tags: [
                    "Back Office",
                    "Administrative Support",
                    "Data Management",
                    "BPO",
                    "BDskills",
                    "Bangladesh",
                ],
            },
            {
                id: 40,
                title: "Cloud Skills Boost Badge",
                issuingOrg: "Credly / Google Cloud",
                type: "Digital Badge",
                completionDate: "Not Provided",
                certificateId: "646332c0-679d-43a0-ac31-242ebd2c2bf9",
                verificationLink:
                    "https://www.credly.com/badges/646332c0-679d-43a0-ac31-242ebd2c2bf9",
                downloadLink:
                    "https://www.credly.com/badges/646332c0-679d-43a0-ac31-242ebd2c2bf9",
                certificateImage: "images/certificates/opswat.png",
                learnings:
                    "Digital badge showcasing completion of specific Google Cloud learning paths or challenges via Cloud Skills Boost.",
                additionalDetails: "Verified digital credential.",
                category: "Cloud Computing",
                tags: [
                    "Cloud",
                    "Badge",
                    "Credly",
                    "Google Cloud",
                    "GCP",
                    "Cloud Skills Boost",
                ],
            },
            {
                id: 41,
                title: "Cloud Skills Boost Badge",
                issuingOrg: "Google Cloud",
                type: "Digital Badge",
                completionDate: "Not Provided",
                certificateId: "14624727",
                verificationLink:
                    "https://www.cloudskillsboost.google/public_profiles/d81586d4-bc86-436d-8fb9-ff5eaa221080/badges/14624727",
                downloadLink:
                    "https://www.cloudskillsboost.google/public_profiles/d81586d4-bc86-436d-8fb9-ff5eaa221080/badges/14624727",
                certificateImage: "images/certificates/251.png",
                learnings:
                    "Digital badge showcasing completion of specific Google Cloud learning paths or challenges.",
                additionalDetails:
                    "Verified via Google Cloud Skills Boost profile.",
                category: "Cloud Computing",
                tags: [
                    "Cloud",
                    "Badge",
                    "Google Cloud",
                    "GCP",
                    "Cloud Skills Boost",
                ],
            },
            {
                id: 42,
                title: "Cloud Skills Boost Badge",
                issuingOrg: "Google Cloud",
                type: "Digital Badge",
                completionDate: "Not Provided",
                certificateId: "14624721",
                verificationLink:
                    "https://www.cloudskillsboost.google/public_profiles/d81586d4-bc86-436d-8fb9-ff5eaa221080/badges/14624721",
                downloadLink:
                    "https://www.cloudskillsboost.google/public_profiles/d81586d4-bc86-436d-8fb9-ff5eaa221080/badges/14624721",
                certificateImage: "images/certificates/252.png",
                learnings:
                    "Digital badge showcasing completion of specific Google Cloud learning paths or challenges.",
                additionalDetails:
                    "Verified via Google Cloud Skills Boost profile.",
                category: "Cloud Computing",
                tags: [
                    "Cloud",
                    "Badge",
                    "Google Cloud",
                    "GCP",
                    "Cloud Skills Boost",
                ],
            },
            {
                id: 43,
                title: "Cloud Skills Boost Badge 3",
                issuingOrg: "Google Cloud",
                type: "Digital Badge",
                completionDate: "2025-04-03",
                certificateId: "14601970",
                verificationLink:
                    "https://www.cloudskillsboost.google/public_profiles/d81586d4-bc86-436d-8fb9-ff5eaa221080/badges/14601970",
                downloadLink:
                    "https://www.cloudskillsboost.google/public_profiles/d81586d4-bc86-436d-8fb9-ff5eaa221080/badges/14601970",
                certificateImage: "images/certificates/skillboo.png",
                learnings:
                    "Digital badge showcasing completion of specific Google Cloud learning paths or challenges, potentially indicating advanced skill mastery.",
                additionalDetails:
                    "Verified via Google Cloud Skills Boost profile.",
                category: "Cloud Computing",
                tags: [
                    "Cloud",
                    "Badge",
                    "Google Cloud",
                    "GCP",
                    "Cloud Skills Boost",
                ],
            },
            {
                id: 44,
                title: "Certificate of Participation",
                issuingOrg: "Innovate2Educate",
                type: "Digital Certificate",
                completionDate: "2025-09-15",
                certificateId: "P00001",
                verificationLink: "images/certificates/44.png",
                downloadLink: "images/certificates/44.png",
                certificateImage: "images/certificates/44.png",
                learnings:
                    "This certificate is presented to Kholipha Ahmad Al-Amin for their active participation in Innovate2Educate.",
                additionalDetails: "Verified via Innovate2Educate website.",
                category: "Handheld Device Design",
                tags: ["Innovate2Educate", "Design", "Challenge"],
            },
            {
                id: 45,
                title: "Cyber Hygiene - Training Completion Certificate",
                issuingOrg: "The Asia Foundation & SAJIDA Foundation",
                type: "Digital Certificate",
                completionDate: "2025-08-17",
                certificateId: "68864_copy_0",
                verificationLink: "images/certificates/45.png",
                downloadLink: "images/certificates/45.png",
                certificateImage: "images/certificates/45.png",
                learnings:
                    "This certificate is issued to Kholipha Ahmad Al-Amin by The Asia Foundation and SAJIDA Foundation, certifying successful completion of the Cyber Hygiene Training.",
                additionalDetails: "Verified via Google.org.",
                category: "Cyber Security",
                tags: [
                    "Cyber Hygiene",
                    "Training",
                    "Completion",
                    "The Asia Foundation",
                    "SAJIDA Foundation",
                ],
            },
            {
                id: 46,
                title: "National Skills Certificate",
                issuingOrg:
                    "Government of the People's Republic of Bangladesh National Skills Development Authority (NSDA)",
                type: "Digital Certificate",
                completionDate: "2025-09-15",
                certificateId: "NQF Level 14",
                verificationLink: "images/certificates/46.png",
                downloadLink: "images/certificates/46.png",
                certificateImage: "images/certificates/46.png",
                learnings:
                    "This certificate is awarded to Kholipha Ahmad Al-Amin under the National Skills Qualification Framework (NSQF) Level 14.",
                additionalDetails: "Verified via NSDA official portal.",
                category: "Web Design and Development",
                tags: [
                    "National Skills Certificate",
                    "NSDA",
                    "Skill Development",
                    "Web Design",
                    "Freelancing",
                    "Level 3",
                ],
            },
        ];
        const fallbackImages = [
            "images/certificates/c (1).png",
            "images/certificates/c (2).png",
            "images/certificates/c (3).png",
            "images/certificates/c (4).png",
            "images/certificates/c (5).png",
            "images/certificates/c (6).png",
            "images/certificates/c (7).png",
            "images/certificates/c (8).png",
            "images/certificates/c (9).png",
            "images/certificates/c (10).png",
            "images/certificates/c (11).png",
            "images/certificates/c (12).png",
            "images/certificates/c (13).png",
            "images/certificates/c (14).png",
            "images/certificates/c (15).png",
            "images/certificates/c (16).png",
            "images/certificates/c (17).png",
            "images/certificates/c (18).png",
            "images/certificates/c (19).png",
            "images/certificates/c (20).png",
            "images/certificates/c (21).png",
            "images/certificates/c (22).png",
            "images/certificates/c (23).png",
            "images/certificates/c (24).png",
            "images/certificates/c (25).png",
            "images/certificates/c (26).png",
            "images/certificates/c (27).png",
            "images/certificates/c (28).png",
            "images/certificates/c (29).png",
            "images/certificates/c (30).png",
            "images/certificates/c (31).png",
            "images/certificates/c (32).png",
            "images/certificates/c (33).png",
            "images/certificates/c (34).png",
            "images/certificates/c (35).png",
            "images/certificates/c (36).png",
            "images/certificates/c (37).png",
            "images/certificates/c (38).png",
            "images/certificates/c (39).png",
        ];
        const certificatesGrid = document.getElementById("certificates-grid");
        const lightbox = document.getElementById("certLightbox");
        const lightboxClose = document.getElementById("lbClose");
        const lbTitle = document.getElementById("lbTitle");
        const lbMeta = document.getElementById("lbMeta");
        const lbCompletion = document.getElementById("lbCompletion");
        const lbLearnings = document.getElementById("lbLearnings");
        const lbCertId = document.getElementById("lbCertId");
        const lbAdditional = document.getElementById("lbAdditional");
        const lbVerify = document.getElementById("lbVerify");
        const lbDownload = document.getElementById("lbDownload");
        const lbCertificateImage = document.getElementById(
            "lbCertificateImage"
        );
        const lbDownloadImage = document.getElementById("lbDownloadImage");
        const searchInput = document.getElementById("cert-search");
        const filterSelect = document.getElementById("cert-filter");
        const sortSelect = document.getElementById("cert-sort");
        const resetFiltersBtn = document.getElementById("reset-filters");
        const certCountEl = document.getElementById("cert-count");
        const shareBtn = document.getElementById("shareBtn");
        const shareOptionsPopup = document.getElementById("shareOptionsPopup");
        const copyLinkBtn = document.getElementById("copyLinkBtn");
        const shareTwitterBtn = document.getElementById("shareTwitterBtn");
        const shareLinkedInBtn = document.getElementById("shareLinkedInBtn");
        const closeSharePopupBtn = document.getElementById(
            "closeSharePopupBtn"
        );
        if (
            !certificatesGrid ||
            !lightbox ||
            !lbTitle ||
            !lbMeta ||
            !lbCompletion ||
            !lbLearnings ||
            !lbCertId ||
            !lbAdditional ||
            !lbVerify ||
            !lbDownload ||
            !lbCertificateImage ||
            !lbDownloadImage ||
            !searchInput ||
            !filterSelect ||
            !sortSelect ||
            !resetFiltersBtn ||
            !certCountEl ||
            !shareBtn ||
            !shareOptionsPopup ||
            !copyLinkBtn ||
            !shareTwitterBtn ||
            !shareLinkedInBtn ||
            !closeSharePopupBtn
        ) {
            console.error(
                "One or more essential DOM elements for the certificate section were not found. Functionality may be impaired."
            );
        }
        let currentlyDisplayedCerts = [...certificationsData]; 
        const debounce = (fn, delay = 300) => {
            let timer;
            return (...args) => {
                clearTimeout(timer);
                timer = setTimeout(() => fn(...args), delay);
            };
        };
        const getCategorizedCertificateType = (certTypeString) => {
            if (!certTypeString) return "Other";
            const typeLC = certTypeString.toLowerCase();
            if (typeLC.includes("academic")) return "Academic";
            if (typeLC.includes("simulation")) return "Simulation";
            if (typeLC.includes("provider")) return "Provider";
            if (typeLC.includes("proficiency")) return "Proficiency";
            if (typeLC.includes("badge")) return "Badge";
            if (
                typeLC.includes("completion") ||
                typeLC.includes("achievement") ||
                typeLC.includes("graduate")
            )
                return "Completion";
            if (typeLC.includes("workshop") || typeLC.includes("participation"))
                return "Workshop/Participation";
            if (typeLC.includes("project")) return "Project";
            return certTypeString.split("(")[0].trim() || "Other"; 
        };
        const populateFilterOptions = () => {
            if (!filterSelect) return;
            const types = new Set();
            certificationsData.forEach((cert) => {
                types.add(getCategorizedCertificateType(cert.type));
            });
            const sortedTypes = Array.from(types).sort();
            filterSelect.innerHTML = '<option value="all">All Types</option>'; 
            sortedTypes.forEach((type) => {
                const option = document.createElement("option");
                option.value = type.toLowerCase().replace(/\s|\//g, "-"); 
                option.textContent = type;
                filterSelect.appendChild(option);
            });
        };
        const createCertCard = (cert) => {
            const card = document.createElement("div");
            card.className = "cert-card";
            card.setAttribute("data-cert-id", cert.id);
            let iconClass = "fa-certificate";
            const categorizedType = getCategorizedCertificateType(cert.type);
            const iconMappings = {
                Completion: "fa-award",
                Academic: "fa-graduation-cap",
                Simulation: "fa-laptop-code",
                Provider: "fa-heartbeat", 
                Proficiency: "fa-check-double",
                Badge: "fa-id-badge",
                "Workshop/Participation": "fa-users",
                Project: "fa-code-branch",
            };
            iconClass = iconMappings[categorizedType] || "fa-certificate";
            card.innerHTML = `
              <div class="cert-icon">
                <i class="fas ${iconClass}"></i>
              </div>
              <div class="cert-content">
                <h3>${cert.title}</h3>
                <p class="cert-issuer">${cert.issuingOrg}</p>
                <p class="cert-date">Completed: ${
                    cert.completionDate === "Not Provided" ||
                    cert.completionDate === "Not specified"
                        ? "Date N/A"
                        : cert.completionDate
                }</p>
                <span class="cert-type">${cert.type}</span>
              </div>
              <div class="cert-hover">
                <p>${cert.learnings.substring(0, 100)}${
                cert.learnings.length > 100 ? "..." : ""
            }</p>
                <button class="view-cert-btn" aria-label="View details for ${
                    cert.title
                }">View Certificate</button>
              </div>
            `;
            const viewBtn = card.querySelector(".view-cert-btn");
            if (viewBtn) {
                viewBtn.addEventListener("click", (e) => {
                    e.stopPropagation(); 
                    openLightbox(cert.id);
                });
            }
            card.addEventListener("click", () => openLightbox(cert.id));
            return card;
        };
        const renderCertifications = (data) => {
            if (!certificatesGrid) return;
            certificatesGrid.innerHTML = "";
            currentlyDisplayedCerts = data; 
            if (data.length === 0) {
                const noResultsMessage = document.createElement("p");
                noResultsMessage.className = "no-results-message";
                noResultsMessage.textContent =
                    "No certificates match your current filters.";
                certificatesGrid.appendChild(noResultsMessage);
            } else {
                data.forEach((cert, index) => {
                    const cardElement = createCertCard(cert);
                    cardElement.style.setProperty(
                        "--animation-delay",
                        `${index * 7}ms`
                    );
                    certificatesGrid.appendChild(cardElement);
                    if (cardIntersectionObserver)
                        cardIntersectionObserver.observe(cardElement);
                });
            }
            if (certCountEl)
                certCountEl.textContent = `Showing ${data.length} of ${certificationsData.length} certificates`;
        };
        let currentX = 0,
            currentY = 0,
            scale = 1,
            isDragging = false,
            dragStartX,
            dragStartY;
        const resetImageView = () => {
            currentX = 0;
            currentY = 0;
            scale = 1;
            updateImagePosition();
        };
        const updateImagePosition = () => {
            if (lbCertificateImage)
                lbCertificateImage.style.transform = `translate(${currentX}px, ${currentY}px) scale(${scale})`;
        };
        const changeZoom = (delta) => {
            scale = Math.max(0.5, Math.min(3, scale + delta)); 
            updateImagePosition();
        };
        const initImageInteractions = () => {
            if (!lbCertificateImage) return;
            const imageContainer = lbCertificateImage.parentElement;
            if (!imageContainer) return;
            const handleMouseDown = (e) => {
                if (e.button !== 0 && e.type !== "touchstart") return; // Allow touchstart
                isDragging = true;
                const clientX =
                    e.type === "touchstart" ? e.touches[0].clientX : e.clientX;
                const clientY =
                    e.type === "touchstart" ? e.touches[0].clientY : e.clientY;
                dragStartX = clientX - currentX;
                dragStartY = clientY - currentY;
                if (lbCertificateImage)
                    lbCertificateImage.style.cursor = "grabbing";
                e.preventDefault(); 
            };
            const handleMouseMove = (e) => {
                if (!isDragging) return;
                const clientX =
                    e.type === "touchmove" ? e.touches[0].clientX : e.clientX;
                const clientY =
                    e.type === "touchmove" ? e.touches[0].clientY : e.clientY;
                currentX = clientX - dragStartX;
                currentY = clientY - dragStartY;
                updateImagePosition();
                e.preventDefault(); 
            };
            const handleMouseUp = () => {
                if (!isDragging) return;
                isDragging = false;
                if (lbCertificateImage)
                    lbCertificateImage.style.cursor = "grab";
            };
            lbCertificateImage.addEventListener("mousedown", handleMouseDown);
            window.addEventListener("mousemove", handleMouseMove);
            window.addEventListener("mouseup", handleMouseUp);
            window.addEventListener("mouseleave", handleMouseUp); 
            lbCertificateImage.addEventListener("touchstart", handleMouseDown, {
                passive: false,
            });
            window.addEventListener("touchmove", handleMouseMove, {
                passive: false,
            });
            window.addEventListener("touchend", handleMouseUp);
            window.addEventListener("touchcancel", handleMouseUp);
            imageContainer.addEventListener(
                "wheel",
                (e) => {
                    e.preventDefault();
                    changeZoom(e.deltaY > 0 ? -0.1 : 0.1);
                },
                { passive: false }
            );
            const zoomInBtn = document.getElementById("zoomIn");
            const zoomOutBtn = document.getElementById("zoomOut");
            const resetZoomBtn = document.getElementById("resetZoom");
            if (zoomInBtn)
                zoomInBtn.addEventListener("click", () => changeZoom(0.2)); 
            if (zoomOutBtn)
                zoomOutBtn.addEventListener("click", () => changeZoom(-0.2));
            if (resetZoomBtn)
                resetZoomBtn.addEventListener("click", resetImageView);
            if (lbDownloadImage) {
                lbDownloadImage.addEventListener("click", () => {
                    if (
                        lbCertificateImage &&
                        lbCertificateImage.src &&
                        !lbCertificateImage.src.startsWith("data:") &&
                        lbCertificateImage.src !== getPlaceholderImage()
                    ) {
                        const link = document.createElement("a");
                        link.href = lbCertificateImage.src;
                        const titleText = lbTitle
                            ? lbTitle.textContent
                            : "certificate";
                        link.download =
                            titleText
                                .replace(/[^a-z0-9]/gi, "_")
                                .toLowerCase() + "_certificate.png";
                        document.body.appendChild(link);
                        link.click();
                        document.body.removeChild(link);
                    } else {
                        alert(
                            "Cannot download this image, or image not fully loaded."
                        );
                    }
                });
            }
        };
        const getFallbackImage = (certId) =>
            fallbackImages[Math.abs(certId) % fallbackImages.length]; 
        const getPlaceholderImage = () =>
            "data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%22300%22%20height%3D%22200%22%20xmlns%3D%22http://www.w3.org/2000/svg%22%20viewBox%3D%220%200%20300%20200%22%20preserveAspectRatio%3D%22none%22%3E%3Crect%20width%3D%22300%22%20height%3D%22200%22%20fill%3D%22%23DDD%22/%3E%3Ctext%20x%3D%2250%25%22%20y%3D%2250%25%22%20fill%3D%22%23777%22%20font-family%3D%22sans-serif%22%20font-size%3D%2214pt%22%20dominant-baseline%3D%22middle%22%20text-anchor%3D%22middle%22%3EImage%20Preview%3C/text%3E%3C/svg%3E";
        const invalidLinkPlaceholders = [
            "not explicitly provided",
            "not provided",
            "scan qr code",
            "official board verification",
            "official verification",
        ];
        const isValidHttpLink = (link) =>
            link &&
            typeof link === "string" &&
            !invalidLinkPlaceholders.includes(link.toLowerCase()) &&
            link.startsWith("http");
        const openLightbox = (certId) => {
            const cert = certificationsData.find((c) => c.id === certId);
            if (
                !cert ||
                !lightbox ||
                !lbTitle ||
                !lbMeta ||
                !lbCompletion ||
                !lbLearnings ||
                !lbCertId ||
                !lbAdditional ||
                !lbCertificateImage
            )
                return;
            lightbox.setAttribute("data-current-cert-id", String(cert.id));
            lbTitle.textContent = cert.title;
            lbMeta.textContent = `${cert.issuingOrg} | ${cert.type}`;
            const completionText =
                cert.completionDate === "Not Provided" ||
                cert.completionDate === "Not specified"
                    ? "Date N/A"
                    : cert.completionDate;
            lbCompletion.innerHTML = `<strong>Completed:</strong> ${completionText}`;
            lbLearnings.innerHTML = `<strong>Learnings:</strong> ${
                cert.learnings || "N/A"
            }`;
            lbCertId.innerHTML = `<strong>Certificate ID:</strong> ${
                cert.certificateId || "N/A"
            }`;
            let additionalHtml = `<strong>Details:</strong> ${
                cert.additionalDetails || "No additional details available."
            }`;
            if (cert.tags && cert.tags.length > 0) {
                const tagsHtml = cert.tags
                    .map((tag) => `<span class="cert-tag">${tag}</span>`)
                    .join(" ");
                additionalHtml += `<div class="cert-tags-container"><strong>Tags:</strong> ${tagsHtml}</div>`;
            }
            lbAdditional.innerHTML = additionalHtml;
            const imageContainer = lbCertificateImage.parentElement; 
            if (imageContainer) imageContainer.classList.add("loading");
            lbCertificateImage.style.opacity = "0";
            lbCertificateImage.src = getPlaceholderImage(); 
            const finalImageSrc =
                cert.certificateImage || getFallbackImage(cert.id);
            const img = new Image();
            img.onload = function () {
                if (lbCertificateImage) {
                    lbCertificateImage.src = this.src;
                    lbCertificateImage.style.opacity = "1";
                }
                if (imageContainer) imageContainer.classList.remove("loading");
            };
            img.onerror = function () {
                console.error(
                    `Certificate image failed to load: ${finalImageSrc}. Using fallback or placeholder.`
                );
                if (lbCertificateImage) {
                    lbCertificateImage.src = cert.certificateImage
                        ? getFallbackImage(cert.id)
                        : getPlaceholderImage();
                    lbCertificateImage.style.opacity = "1";
                }
                if (imageContainer) imageContainer.classList.remove("loading");
            };
            img.src = finalImageSrc;
            if (lbVerify) {
                if (isValidHttpLink(cert.verificationLink)) {
                    lbVerify.href = cert.verificationLink;
                    lbVerify.style.display = "inline-flex";
                    lbVerify.setAttribute(
                        "aria-label",
                        `Verify certificate for ${cert.title} (opens in new tab)`
                    );
                } else {
                    lbVerify.style.display = "none";
                }
            }
            if (lbDownload) {
                if (isValidHttpLink(cert.downloadLink)) {
                    lbDownload.href = cert.downloadLink;
                    lbDownload.style.display = "inline-flex";
                    lbDownload.setAttribute(
                        "aria-label",
                        `Download certificate for ${cert.title} (opens in new tab)`
                    );
                } else {
                    lbDownload.style.display = "none";
                }
            }
            resetImageView();
            updateNavigationButtons(cert.id);
            lightbox.classList.add("show");
            document.body.style.overflow = "hidden";
        };
        const closeLightboxActions = () => {
            if (lightbox) lightbox.classList.remove("show");
            if (shareOptionsPopup) shareOptionsPopup.classList.remove("active");
            document.body.style.overflow = "";
            if (lbCertificateImage) {
                lbCertificateImage.src = getPlaceholderImage();
                lbCertificateImage.style.opacity = "0";
            }
        };
        const findNextCertId = (currentId) => {
            const visibleCertIds = currentlyDisplayedCerts.map((c) => c.id);
            if (visibleCertIds.length === 0) return currentId;
            const currentIndex = visibleCertIds.indexOf(currentId);
            return currentIndex === -1 ||
                currentIndex === visibleCertIds.length - 1
                ? currentId
                : visibleCertIds[currentIndex + 1];
        };
        const findPrevCertId = (currentId) => {
            const visibleCertIds = currentlyDisplayedCerts.map((c) => c.id);
            if (visibleCertIds.length === 0) return currentId;
            const currentIndex = visibleCertIds.indexOf(currentId);
            return currentIndex <= 0
                ? currentId
                : visibleCertIds[currentIndex - 1];
        };
        const updateNavigationButtons = (currentCertId) => {
            const prevBtn = document.querySelector(".lightbox-nav.prev-cert");
            const nextBtn = document.querySelector(".lightbox-nav.next-cert");
            if (!prevBtn || !nextBtn) return;
            const visibleCertIds = currentlyDisplayedCerts.map((c) => c.id);
            if (visibleCertIds.length <= 1) {
                prevBtn.style.opacity = "0";
                prevBtn.style.pointerEvents = "none";
                nextBtn.style.opacity = "0";
                nextBtn.style.pointerEvents = "none";
                return;
            }
            const currentIndex = visibleCertIds.indexOf(currentCertId);
            prevBtn.style.opacity = currentIndex <= 0 ? "0.3" : "1";
            prevBtn.style.pointerEvents = currentIndex <= 0 ? "none" : "auto";
            nextBtn.style.opacity =
                currentIndex >= visibleCertIds.length - 1 ? "0.3" : "1";
            nextBtn.style.pointerEvents =
                currentIndex >= visibleCertIds.length - 1 ? "none" : "auto";
        };
        const addLightboxNavigation = () => {
            if (!lightbox) return;
            const lightboxContent = lightbox.querySelector(".lightbox-content");
            if (
                !lightboxContent ||
                document.querySelector(".lightbox-nav.prev-cert")
            )
                return;
            const prevBtn = document.createElement("button");
            prevBtn.className = "lightbox-nav prev-cert";
            prevBtn.innerHTML = '<i class="fas fa-chevron-left"></i>';
            prevBtn.setAttribute("aria-label", "Previous certificate");
            prevBtn.addEventListener("click", (e) => {
                e.stopPropagation();
                const currentCertId = parseInt(
                    lightbox.getAttribute("data-current-cert-id") || "0",
                    10
                );
                const prevId = findPrevCertId(currentCertId);
                if (prevId !== currentCertId) openLightbox(prevId);
            });
            const nextBtn = document.createElement("button");
            nextBtn.className = "lightbox-nav next-cert";
            nextBtn.innerHTML = '<i class="fas fa-chevron-right"></i>';
            nextBtn.setAttribute("aria-label", "Next certificate");
            nextBtn.addEventListener("click", (e) => {
                e.stopPropagation();
                const currentCertId = parseInt(
                    lightbox.getAttribute("data-current-cert-id") || "0",
                    10
                );
                const nextId = findNextCertId(currentCertId);
                if (nextId !== currentCertId) openLightbox(nextId);
            });
            lightboxContent.appendChild(prevBtn);
            lightboxContent.appendChild(nextBtn);
        };
        const applyFilters = () => {
            if (!searchInput || !filterSelect || !sortSelect) return;
            const searchTerm = searchInput.value.trim().toLowerCase();
            const filterValue = filterSelect.value; 
            const sortValue = sortSelect.value;
            let filteredData = [...certificationsData];
            if (searchTerm) {
                filteredData = filteredData.filter(
                    (cert) =>
                        cert.title.toLowerCase().includes(searchTerm) ||
                        cert.issuingOrg.toLowerCase().includes(searchTerm) ||
                        (cert.learnings &&
                            cert.learnings
                                .toLowerCase()
                                .includes(searchTerm)) ||
                        (cert.tags &&
                            cert.tags.some((tag) =>
                                tag.toLowerCase().includes(searchTerm)
                            )) ||
                        (cert.category &&
                            cert.category.toLowerCase().includes(searchTerm))
                );
            }
            if (filterValue !== "all") {
                filteredData = filteredData.filter((cert) => {
                    return (
                        getCategorizedCertificateType(cert.type)
                            .toLowerCase()
                            .replace(/\s|\//g, "-") === filterValue
                    );
                });
            }
            if (sortValue === "date-new") {
                filteredData.sort((a, b) => {
                    const dateA =
                        a.completionDate === "Not Provided" ||
                        a.completionDate === "Not specified"
                            ? 0
                            : new Date(a.completionDate).getTime();
                    const dateB =
                        b.completionDate === "Not Provided" ||
                        b.completionDate === "Not specified"
                            ? 0
                            : new Date(b.completionDate).getTime();
                    return dateB - dateA;
                });
            } else if (sortValue === "date-old") {
                filteredData.sort((a, b) => {
                    const dateA =
                        a.completionDate === "Not Provided" ||
                        a.completionDate === "Not specified"
                            ? Infinity
                            : new Date(a.completionDate).getTime();
                    const dateB =
                        b.completionDate === "Not Provided" ||
                        b.completionDate === "Not specified"
                            ? Infinity
                            : new Date(b.completionDate).getTime();
                    return dateA - dateB;
                });
            } else if (sortValue === "name-asc") {
                filteredData.sort((a, b) => a.title.localeCompare(b.title));
            } else if (sortValue === "name-desc") {
                filteredData.sort((a, b) => b.title.localeCompare(a.title));
            } else if (sortValue === "org") {
                filteredData.sort((a, b) =>
                    a.issuingOrg.localeCompare(b.issuingOrg)
                );
            }
            renderCertifications(filteredData);
            if (lightbox && lightbox.classList.contains("show")) {
                const currentCertId = parseInt(
                    lightbox.getAttribute("data-current-cert-id") || "0",
                    10
                );
                if (
                    !currentlyDisplayedCerts.find((c) => c.id === currentCertId)
                ) {
                    closeLightboxActions();
                } else {
                    updateNavigationButtons(currentCertId);
                }
            }
        };
        const cardObserverOptions = {
            root: null,
            rootMargin: "0px",
            threshold: 0.1,
        };
        const cardIntersectionObserver = window.IntersectionObserver
            ? new IntersectionObserver((entries, observer) => {
                  entries.forEach((entry) => {
                      if (entry.isIntersecting) {
                          entry.target.classList.add("animate");
                          observer.unobserve(entry.target);
                      }
                  });
              }, cardObserverOptions)
            : null; 
        populateFilterOptions();
        renderCertifications(certificationsData); 
        addLightboxNavigation();
        initImageInteractions();
        if (lightboxClose) {
            lightboxClose.addEventListener("click", () => {
                closeLightboxActions();
            });
        }
        if (lightbox) {
            lightbox.addEventListener("click", (e) => {
                if (e.target === lightbox) {
                    closeLightboxActions();
                }
            });
        }
        if (searchInput)
            searchInput.addEventListener("input", debounce(applyFilters, 300));
        if (filterSelect) filterSelect.addEventListener("change", applyFilters);
        if (sortSelect) sortSelect.addEventListener("change", applyFilters);
        if (resetFiltersBtn) {
            resetFiltersBtn.addEventListener("click", () => {
                if (searchInput) searchInput.value = "";
                if (filterSelect) filterSelect.value = "all";
                if (sortSelect) sortSelect.value = "date-new"; 
                applyFilters();
            });
        }
        document.addEventListener("keydown", (e) => {
            if (!lightbox || !lightbox.classList.contains("show")) return;
            const currentCertId = parseInt(
                lightbox.getAttribute("data-current-cert-id") || "0",
                10
            );
            if (e.key === "ArrowRight") {
                e.preventDefault();
                const nextId = findNextCertId(currentCertId);
                if (nextId !== currentCertId) openLightbox(nextId);
            } else if (e.key === "ArrowLeft") {
                e.preventDefault();
                const prevId = findPrevCertId(currentCertId);
                if (prevId !== currentCertId) openLightbox(prevId);
            } else if (e.key === "Escape") {
                e.preventDefault();
                closeLightboxActions();
            }
        });
        if (shareBtn && shareOptionsPopup) {
            shareBtn.addEventListener("click", (e) => {
                e.stopPropagation();
                if (!lightbox) return;
                const currentCertId = parseInt(
                    lightbox.getAttribute("data-current-cert-id") || "0",
                    10
                );
                const cert = certificationsData.find(
                    (c) => c.id === currentCertId
                );
                if (!cert) return;
                shareOptionsPopup.classList.toggle("active");
                const pageUrl = window.location.href
                    .split("#")[0]
                    .split("?")[0];
                const certFragment = `#cert-${cert.id}`;
                const shareUrl = isValidHttpLink(cert.verificationLink)
                    ? cert.verificationLink
                    : pageUrl + certFragment;
                const shareText = `Check out this certification: ${cert.title} by ${cert.issuingOrg}`;
                if (copyLinkBtn) {
                    copyLinkBtn.onclick = () => {
                        navigator.clipboard
                            .writeText(shareUrl)
                            .then(() => {
                                const originalText = copyLinkBtn.innerHTML;
                                copyLinkBtn.innerHTML =
                                    '<i class="fas fa-check"></i> Copied!';
                                setTimeout(() => {
                                    if (copyLinkBtn)
                                        copyLinkBtn.innerHTML = originalText;
                                    if (shareOptionsPopup)
                                        shareOptionsPopup.classList.remove(
                                            "active"
                                        );
                                }, 1500);
                            })
                            .catch((err) => {
                                console.error("Failed to copy link: ", err);
                                alert(
                                    "Failed to copy link. Please copy manually:\n" +
                                        shareUrl
                                );
                                if (shareOptionsPopup)
                                    shareOptionsPopup.classList.remove(
                                        "active"
                                    );
                            });
                    };
                }
                if (shareTwitterBtn) {
                    shareTwitterBtn.href = `https://twitter.com/intent/tweet?url=${encodeURIComponent(
                        shareUrl
                    )}&text=${encodeURIComponent(shareText)}`;
                }
                if (shareLinkedInBtn) {
                    shareLinkedInBtn.href = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
                        shareUrl
                    )}`;
                }
            });
            if (closeSharePopupBtn) {
                closeSharePopupBtn.addEventListener("click", () => {
                    if (shareOptionsPopup)
                        shareOptionsPopup.classList.remove("active");
                });
            }
            document.addEventListener("click", (e) => {
                if (
                    shareOptionsPopup &&
                    shareOptionsPopup.classList.contains("active") &&
                    !shareOptionsPopup.contains(e.target) &&
                    e.target !== shareBtn &&
                    shareBtn &&
                    !shareBtn.contains(e.target)
                ) {
                    shareOptionsPopup.classList.remove("active");
                }
            });
        }
    },
};