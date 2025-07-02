// education.js - Contains HTML content and functionality for the education section
window.EducationContent = {
    getHTML: function() {
        return `
            <div class="container">
                <h2 class="section-title" data-aos="fade-right">Education</h2>
                <div
                    class="education-intro"
                    data-aos="fade-up"
                    data-aos-delay="100"
                >
                    <p>
                        My academic journey has provided me with a strong
                        foundation in computer science and engineering.
                    </p>
                </div>
                <div
                    class="education-progress"
                    data-aos="fade-up"
                    data-aos-delay="200"
                >
                    <div class="progress-step completed">
                        <i class="fas fa-check"></i>
                        <div class="progress-tooltip">Secondary School</div>
                    </div>
                    <div class="progress-step completed">
                        <i class="fas fa-check"></i>
                        <div class="progress-tooltip">Higher Secondary</div>
                    </div>
                    <div class="progress-step current">
                        <i class="fas fa-university"></i>
                        <div class="progress-tooltip">
                            Bachelor's Degree (In Progress)
                        </div>
                    </div>
                    <div class="progress-step">
                        <i class="fas fa-graduation-cap"></i>
                        <div class="progress-tooltip">Master's Degree</div>
                    </div>
                    <div class="progress-step">
                        <i class="fas fa-brain"></i>
                        <div class="progress-tooltip">Ph.D</div>
                    </div>
                </div>
                <div
                    class="education-table-container"
                    data-aos="fade-up"
                    data-aos-delay="300"
                >
                    <table id="table1" class="education-table">
                        <thead>
                            <tr>
                                <th>Degree</th>
                                <th>Institution</th>
                                <th>GPA</th>
                                <th>Year</th>
                                <th>Additional Information</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>
                                    Bachelor of Science in Computer Science &
                                    Engineering
                                </td>
                                <td>
                                    Atish Dipankar University of Science &
                                    Technology, Dhaka
                                </td>
                                <td>3.56</td>
                                <td>Jan 2022 – Expected Aug 2026</td>
                                <td>
                                    <strong>Thesis:</strong> THETAEnhancer+ —
                                    AI-Driven Image Restoration Model
                                </td>
                            </tr>
                            <tr>
                                <td>Higher Secondary School</td>
                                <td>Adamjee Cantonment College, Dhaka</td>
                                <td>5.00/5.00</td>
                                <td>2020</td>
                                <td>Science Faculty</td>
                            </tr>
                            <tr>
                                <td>Secondary School</td>
                                <td>Civil Aviation School & College, Dhaka</td>
                                <td>5.00/5.00</td>
                                <td>2018</td>
                                <td>Science Faculty</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div class="education-cards">
                    <div
                        class="education-card"
                        data-aos="fade-up"
                        data-aos-delay="100"
                    >
                        <h3>
                            Bachelor of Science in Computer Science &
                            Engineering
                        </h3>
                        <div class="school">
                            Atish Dipankar University of Science & Technology,
                            Dhaka
                        </div>
                        <div class="edu-details">
                            <span
                                ><i class="fas fa-graduation-cap"></i> GPA:
                                3.56</span
                            >
                            <span
                                ><i class="far fa-calendar-alt"></i> Jan 2022 –
                                Expected Aug 2026</span
                            >
                        </div>
                        <div class="additional">
                            <strong>Thesis:</strong> THETAEnhancer+ — AI-Driven
                            Image Restoration Model
                        </div>
                    </div>
                    <div
                        class="education-card"
                        data-aos="fade-up"
                        data-aos-delay="200"
                    >
                        <h3>Higher Secondary School</h3>
                        <div class="school">
                            Adamjee Cantonment College, Dhaka
                        </div>
                        <div class="edu-details">
                            <span
                                ><i class="fas fa-graduation-cap"></i> GPA:
                                5.00/5.00</span
                            >
                            <span
                                ><i class="far fa-calendar-alt"></i> 2020</span
                            >
                        </div>
                        <div class="additional">Science Faculty</div>
                    </div>
                    <div
                        class="education-card"
                        data-aos="fade-up"
                        data-aos-delay="300"
                    >
                        <h3>Secondary School</h3>
                        <div class="school">
                            Civil Aviation School & College, Dhaka
                        </div>
                        <div class="edu-details">
                            <span
                                ><i class="fas fa-graduation-cap"></i> GPA:
                                5.00/5.00</span
                            >
                            <span
                                ><i class="far fa-calendar-alt"></i> 2018</span
                            >
                        </div>
                        <div class="additional">Science Faculty</div>
                    </div>
                </div>
                <div class="education-particles"></div>
            </div>
        `;
    },
    
    init: function() {
        // Initialize education-specific functionality here if needed
        // This function will be called after the HTML has been inserted
        
        // Example: Add interactive elements to the education cards
        const educationCards = document.querySelectorAll('.education-card');
        if (educationCards.length > 0) {
            educationCards.forEach(card => {
                card.addEventListener('click', function() {
                    // Toggle a class for interactive elements or animations
                    this.classList.toggle('expanded');
                });
            });
        }
        
        // Initialize AOS animations if they're not automatically initialized elsewhere
        if (typeof AOS !== 'undefined') {
            AOS.refresh();
        }
    }
};