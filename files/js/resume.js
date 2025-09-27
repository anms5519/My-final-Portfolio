window.ResumeContent = {
    getHTML: function () {
        return `
            <div class="vault-background-elements">
                <div class="grid-overlay"></div>
                <div class="particle-field">
                    <div class="particle"></div><div class="particle"></div><div class="particle"></div>
                    <div class="particle"></div><div class="particle"></div><div class="particle"></div>
                    <div class="particle"></div><div class="particle"></div><div class="particle"></div>
                    <div class="particle"></div><div class="particle"></div><div class="particle"></div>
                    <div class="particle"></div><div class="particle"></div><div class="particle"></div>
                </div>
            </div>
            <div class="vault-container">
                <div class="vault-interface">
                    <div class="vault-lock-mechanism" id="vaultLockMechanism">
                        <div class="lock-core-assembly">
                            <div class="lock-ring ring-outer"></div>
                            <div class="lock-ring ring-middle"></div>
                            <div class="lock-ring ring-inner"></div>
                            <div class="core-crystal" id="coreCrystal">
                                <i class="fas fa-fingerprint"></i>
                            </div>
                        </div>
                        <div class="lock-status-display" id="lockStatusDisplay">
                            <p class="status-text" data-default="Initiate Access Protocol For Access Resume" data-authenticating="Authenticating..." data-verifying="Access Granted" data-granted="Unlocking...">Initiate Access Protocol For Access Resume</p>
                            <div class="status-progress-bar"><div class="progress-fill" id="progressFill"></div></div>
                        </div>
                        <div class="scanline-effect"></div>
                    </div>
                    <div class="vault-content-chamber" id="vaultContentChamber">
                        <div class="chamber-header">
                            <h2 class="chamber-title">Chronos Protocol <span class="highlight">Active</span></h2>
                            <p class="chamber-subtitle">Secure Data Packet Retrieved. Your Access is Authorized.</p>
                        </div>
                        <div class="chamber-actions">
                            <a href="resume.pdf" class="vault-action-btn btn-primary-vault" download data-aos="fade-up" data-aos-delay="100">
                                <i class="fas fa-file-download"></i> Download My Resume (PDF)
                            </a>
                            <a href="www.linkedin.com/in/kholipha-ahmmad-al-amin-3856b1305" target="_blank" rel="noopener noreferrer" class="vault-action-btn btn-secondary-vault" data-aos="fade-up" data-aos-delay="200">
                                <i class="fab fa-linkedin"></i> View LinkedIn Profile
                            </a>
                            <a href="#contact" class="vault-action-btn btn-tertiary-vault" data-aos="fade-up" data-aos-delay="300">
                                <i class="fas fa-headset"></i> Establish connections
                            </a>
                        </div>
                        <div class="chamber-footer-accent"></div>
                    </div>
                </div>
            </div>
        `;
    },
    init: function () {
        const vaultLockMechanism = document.getElementById(
            "vaultLockMechanism"
        );
        const vaultContentChamber = document.getElementById(
            "vaultContentChamber"
        );
        const coreCrystal = document.getElementById("coreCrystal");
        const lockStatusDisplay = document.getElementById("lockStatusDisplay");
        const statusTextElement = lockStatusDisplay.querySelector(
            ".status-text"
        );
        const progressFill = document.getElementById("progressFill");
        let isUnlocking = false;
        if (vaultLockMechanism) {
            vaultLockMechanism.addEventListener("click", () => {
                if (
                    isUnlocking ||
                    vaultLockMechanism.classList.contains("unlocked")
                )
                    return;
                isUnlocking = true;
                vaultLockMechanism.classList.add("activating");
                coreCrystal.classList.add("pulsing");
                statusTextElement.textContent =
                    statusTextElement.dataset.authenticating;
                progressFill.style.width = "0%";
                setTimeout(() => {
                    progressFill.style.width = "33%";
                    statusTextElement.textContent =
                        statusTextElement.dataset.verifying;
                }, 800);
                setTimeout(() => {
                    progressFill.style.width = "75%";
                }, 1600);
                setTimeout(() => {
                    progressFill.style.width = "100%";
                    statusTextElement.textContent =
                        statusTextElement.dataset.granted;
                    vaultLockMechanism.classList.remove("activating");
                    vaultLockMechanism.classList.add("unlocked");
                    coreCrystal.classList.remove("pulsing");
                    coreCrystal.classList.add("accessed");
                    vaultContentChamber.classList.add("revealed");
                    if (typeof AOS !== "undefined") {
                        AOS.refreshHard(); 
                    }
                }, 2500); 
            });
        }
    },
};