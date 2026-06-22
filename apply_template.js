const fs = require('fs');
const path = require('path');

const templatePath = path.join(__dirname, 'src', 'CV_TEMPLATE.html');
let html = fs.readFileSync(templatePath, 'utf8');

// Replace body HTML
const bodyRegex = /<div class="cv-multi-page-container">[\s\S]*?<\/div>\s*<\/div>\s*<\/div>\s*<script>/;
const newBody = `<div class="cv-multi-page-container">
        <!-- Pagina Unica Ibrida -->
        <div class="page">
            <!-- Header -->
            <header class="main-header">
                <div class="header-photo-container">
                    <img id="cv-photo" src="" alt="Foto profilo">
                </div>
                <div class="header-text">
                    <h1 id="cv-name"></h1>
                    <h2 id="cv-title"></h2>
                </div>
            </header>

            <!-- Hybrid Top -->
            <div class="resume-body">
                <aside class="sidebar">
                    <section class="contact-section">
                        <h3>Contatti</h3>
                        <ul id="contacts-list"></ul>
                    </section>
                    <section class="skills-section">
                        <h3>Competenze Tecniche</h3>
                        <div id="skills-container"></div>
                    </section>
                </aside>
                <main class="main-content">
                    <section class="profile-section">
                        <h3>Profilo Professionale</h3>
                        <div class="about-description" id="profile-text"></div>
                    </section>
                    <section class="experience-section">
                        <h3>Esperienza Professionale</h3>
                        <div id="experience-container-top"></div>
                    </section>
                </main>
            </div>

            <!-- Hybrid Bottom -->
            <div class="hybrid-bottom" style="margin-top: 10px;">
                <section class="experience-section">
                    <div id="experience-container-bottom"></div>
                </section>
                <section class="personal-projects-section" id="personal-projects-wrapper" style="display: none;">
                    <h3>Progetti Personali</h3>
                    <div id="personal-projects-container"></div>
                </section>
                <section class="education-section">
                    <h3>Formazione</h3>
                    <div id="education-container"></div>
                </section>
            </div>
        </div>
    </div>

    <script>`;
html = html.replace(bodyRegex, newBody);

// Replace JS for Experience & Projects
const jsRegex = /\/\/ Popola esperienza \(prima pagina - primi 3\)[\s\S]*?\/\/ Popola formazione/m;
const newJs = `// Popola esperienza (Top - prime 2)
                console.log('🏢 Popolo esperienza top...');
                const experienceContainerTop = document.getElementById('experience-container-top');
                const firstExperiences = data.experience.slice(0, 2);
                firstExperiences.forEach((exp) => {
                    experienceContainerTop.appendChild(createExperienceItem(exp));
                });

                // Popola esperienza (Bottom - resto)
                console.log('🏢 Popolo esperienza bottom...');
                const experienceContainerBottom = document.getElementById('experience-container-bottom');
                const remainingExperiences = data.experience.slice(2);
                remainingExperiences.forEach((exp) => {
                    experienceContainerBottom.appendChild(createExperienceItem(exp));
                });

                // Popola progetti personali
                console.log('🚀 Popolo progetti personali...');
                if (data.personal_projects && data.personal_projects.length > 0) {
                    document.getElementById('personal-projects-wrapper').style.display = 'block';
                    const projectsContainer = document.getElementById('personal-projects-container');
                    data.personal_projects.forEach((project) => {
                        projectsContainer.appendChild(createExperienceItem(project));
                    });
                }

                // Popola formazione`;
html = html.replace(jsRegex, newJs);

// Remove footer logic in JS
const footerJsRegex = /\/\/ Popola footer[\s\S]*?console\.log\('✅ Footer popolato'\);/m;
html = html.replace(footerJsRegex, `// Footer gestito nativamente da Puppeteer
                console.log('✅ Footer delegato a Puppeteer');`);

// Add CSS for hybrid bottom in print mode
if (!html.includes('.hybrid-bottom { display: block!important;')) {
    html = html.replace(/@media print\s*\{/, `@media print {
            .hybrid-bottom { display: block!important; width: 100%!important; margin-top: 15px!important; }`);
}

fs.writeFileSync(templatePath, html);
console.log('✅ CV_TEMPLATE.html aggiornato in ClearCvLovable');
