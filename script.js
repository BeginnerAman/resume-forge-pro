// Reference Data (Sample Candidate)
const REFERENCE_DATA = {
    name: "SARAH JENKINS",
    tagline: "Aspiring SST & Geography Teacher | B.Ed. Graduate",
    mobile: "+91 98765 43210",
    email: "example@email.com",
    address: "Vill. Sihatikar, Post Bakhira, Tehsil Khalilabad, Dist. Sant Kabir Nagar, U.P. - 272199",
    photo: "profile_sarah.jpg",
    objective: "An enthusiastic and dedicated B.Ed. & M.A. graduate seeking a Social Studies (SST) & Geography teaching position. Passionate about student development, academic excellence, interactive map/globe teaching, and creating an engaging classroom environment.",
    education: [
        { qual: "Bachelor of Education (B.Ed.)", inst: "Pydah Degree College", year: "2023", marks: "8.2 CGPA" },
        { qual: "M.A (Geography)", inst: "St. Andrew's College", year: "2020", marks: "65%" },
        { qual: "B.A / B.Sc", inst: "Pydah Degree College", year: "2018", marks: "78%" },
        { qual: "Intermediate (12th Board)", inst: "Narayana Jr College", year: "2015", marks: "82%" },
        { qual: "10th Class (SSC Board)", inst: "Srividhya High School", year: "2013", marks: "85%" }
    ],
    skills: [
        "Strong Subject Knowledge (Geography & Social Studies)",
        "Strong Knowledge of Globe and Map Reading",
        "Lesson Planning & Curriculum Development",
        "Effective Classroom Management",
        "Excellent Communication and Interpersonal Skills"
    ],
    certifications: [
        "Certificate in Classroom Management (SWAYAM / NPTEL)",
        "Course on Computer Concepts (CCC) Certificate",
        "CTET & State TET Qualified"
    ],
    achievements: [
        "Consistently ranked as top academic performing student from school to college",
        "Won 1st prize in inter-college essay writing and presentation competitions"
    ],
    personal: {
        dob: "15 August 1998",
        gender: "Female",
        father: "Robert Jenkins",
        marital: "Unmarried",
        languages: "English, Hindi",
        hobbies: "Reading books, Map reading & Gardening"
    }
};

let currentData = JSON.parse(JSON.stringify(REFERENCE_DATA));
let currentTemplate = 'template-1';
let renderScheduled = false;

document.addEventListener('DOMContentLoaded', () => {
    initApp();
});

function initApp() {
    loadFormData(currentData);
    renderPreview();
    attachEventListeners();
}

function getGuardianDetails(data) {
    const gender = (data.personal?.gender || '').toLowerCase();
    const marital = (data.personal?.marital || '').toLowerCase();
    const isMarried = marital.includes('married') && !marital.includes('unmarried');

    let gType = data.personal?.guardianType;
    if (!gType) {
        if (gender === 'female' && isMarried) {
            gType = 'Husband';
        } else if (data.personal?.mother) {
            gType = 'Mother';
        } else {
            gType = 'Father';
        }
    }

    let guardianLabel = "Father's Name";
    if (gType === 'Husband') guardianLabel = "Husband's Name";
    else if (gType === 'Mother') guardianLabel = "Mother's Name";

    const guardianValue = data.personal?.husband || data.personal?.mother || data.personal?.father || '';
    return { guardianLabel, guardianValue };
}

function updateGuardianUI(userTriggered = false) {
    const maritalSelect = document.getElementById('inputMarital');
    const genderSelect = document.getElementById('inputGender');
    const relSelect = document.getElementById('inputGuardianRelation');
    const labelGuardian = document.getElementById('labelGuardian');
    const inputHusband = document.getElementById('inputHusband');
    if (!maritalSelect || !genderSelect || !relSelect || !labelGuardian || !inputHusband) return;

    const genderVal = (genderSelect.value || '').toLowerCase();
    const maritalVal = (maritalSelect.value || '').toLowerCase();
    const isMarried = maritalVal.includes('married') && !maritalVal.includes('unmarried');

    if (userTriggered) {
        if (genderVal === 'female' && isMarried) {
            relSelect.value = 'Husband';
        } else {
            relSelect.value = 'Father';
        }
    }

    const rel = relSelect.value;
    if (rel === 'Husband') {
        labelGuardian.textContent = "Husband's Name";
        inputHusband.placeholder = "Husband's Full Name";
    } else if (rel === 'Mother') {
        labelGuardian.textContent = "Mother's Name";
        inputHusband.placeholder = "Mother's Full Name";
    } else {
        labelGuardian.textContent = "Father's Name";
        inputHusband.placeholder = "Father's Full Name";
    }
}

function loadFormData(data) {
    document.getElementById('inputName').value = data.name || '';
    document.getElementById('inputTagline').value = data.tagline || '';
    document.getElementById('inputMobile').value = data.mobile || '';
    document.getElementById('inputEmail').value = data.email || '';
    document.getElementById('inputAddress').value = data.address || '';
    document.getElementById('inputObjective').value = data.objective || '';
    
    document.getElementById('inputSkills').value = (data.skills || []).join('\n');
    document.getElementById('inputCertifications').value = (data.certifications || []).join('\n');
    document.getElementById('inputAchievements').value = (data.achievements || []).join('\n');

    document.getElementById('inputDob').value = data.personal?.dob || '';
    const genderEl = document.getElementById('inputGender');
    if (genderEl) {
        genderEl.value = data.personal?.gender === 'Male' ? 'Male' : 'Female';
    }
    
    const maritalVal = (data.personal?.marital || '').toLowerCase();
    const isMarried = maritalVal.includes('married') && !maritalVal.includes('unmarried');
    const selectEl = document.getElementById('inputMarital');
    if (selectEl) {
        selectEl.value = isMarried ? 'Married' : 'Unmarried';
    }

    const relSelect = document.getElementById('inputGuardianRelation');
    if (relSelect) {
        const { guardianLabel } = getGuardianDetails(data);
        if (guardianLabel.includes('Husband')) relSelect.value = 'Husband';
        else if (guardianLabel.includes('Mother')) relSelect.value = 'Mother';
        else relSelect.value = 'Father';
    }

    updateGuardianUI(false);

    document.getElementById('inputHusband').value = data.personal?.husband || data.personal?.mother || data.personal?.father || '';
    document.getElementById('inputLanguages').value = data.personal?.languages || '';
    document.getElementById('inputHobbies').value = data.personal?.hobbies || '';

    renderEducationInputs(data.education || []);
}

function renderEducationInputs(eduArray) {
    const container = document.getElementById('educationFormList');
    container.innerHTML = '';

    eduArray.forEach((edu, index) => {
        const itemCard = document.createElement('div');
        itemCard.className = 'edu-item-card';
        itemCard.innerHTML = `
            <div style="display:flex; justify-content:space-between; margin-bottom: 0.4rem;">
                <strong style="font-size:0.8rem; color:#475569;">Row #${index + 1}</strong>
                <button type="button" class="btn-danger-sm" onclick="removeEduRow(${index})"><i class="fa-solid fa-trash"></i> Remove</button>
            </div>
            <div class="form-group">
                <input type="text" placeholder="Qualification" value="${escapeHtml(edu.qual)}" oninput="updateEduRow(${index}, 'qual', this.value)">
            </div>
            <div class="form-group">
                <input type="text" placeholder="Institution" value="${escapeHtml(edu.inst)}" oninput="updateEduRow(${index}, 'inst', this.value)">
            </div>
            <div class="form-row">
                <div class="form-group">
                    <input type="text" placeholder="Year" value="${escapeHtml(edu.year)}" oninput="updateEduRow(${index}, 'year', this.value)">
                </div>
                <div class="form-group">
                    <input type="text" placeholder="Marks / CGPA" value="${escapeHtml(edu.marks)}" oninput="updateEduRow(${index}, 'marks', this.value)">
                </div>
            </div>
        `;
        container.appendChild(itemCard);
    });
}

function addEduRow() {
    currentData.education.push({ qual: '', inst: '', year: '', marks: '' });
    renderEducationInputs(currentData.education);
    schedulePreviewRender();
}

function removeEduRow(index) {
    currentData.education.splice(index, 1);
    renderEducationInputs(currentData.education);
    schedulePreviewRender();
}

function updateEduRow(index, field, value) {
    if (currentData.education[index]) {
        currentData.education[index][field] = value;
        schedulePreviewRender();
    }
}

let renderTimer = null;
let autoFitTimer = null;

function schedulePreviewRender(immediate = false) {
    if (immediate) {
        if (renderTimer) clearTimeout(renderTimer);
        renderPreview();
        return;
    }
    if (renderTimer) clearTimeout(renderTimer);
    renderTimer = setTimeout(() => {
        renderPreview();
    }, 150);
}

function attachEventListeners() {
    const textInputs = [
        'inputName', 'inputTagline', 'inputMobile', 'inputEmail', 'inputAddress',
        'inputObjective', 'inputSkills', 'inputCertifications', 'inputAchievements',
        'inputDob', 'inputGender', 'inputHusband', 'inputMarital', 'inputLanguages', 'inputHobbies'
    ];

    textInputs.forEach(id => {
        const el = document.getElementById(id);
        if (el) {
            el.addEventListener('input', syncDataFromForm);
        }
    });

    const navSelect = document.getElementById('templateSelect');
    const editorSelect = document.getElementById('editorTemplateSelect');

    const switchTemplate = (val) => {
        currentTemplate = val;
        navSelect.value = val;
        editorSelect.value = val;
        const paper = document.getElementById('resumePaper');
        if (paper) paper.classList.remove('compact-tight', 'compact-super');
        renderPreview();
    };

    navSelect.addEventListener('change', (e) => switchTemplate(e.target.value));
    editorSelect.addEventListener('change', (e) => switchTemplate(e.target.value));

    document.getElementById('addEduBtn').addEventListener('click', addEduRow);

    document.getElementById('inputPhoto').addEventListener('change', function(e) {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function(evt) {
                currentData.photo = evt.target.result;
                schedulePreviewRender();
            };
            reader.readAsDataURL(file);
        }
    });

    const removePhotoBtn = document.getElementById('removePhotoBtn');
    if (removePhotoBtn) {
        removePhotoBtn.addEventListener('click', () => {
            currentData.photo = '';
            const pInput = document.getElementById('inputPhoto');
            if (pInput) pInput.value = '';
            schedulePreviewRender();
        });
    }

    document.getElementById('toggleEditBtn').addEventListener('click', () => {
        const sidebar = document.getElementById('editorSidebar');
        const btnText = document.getElementById('editBtnText');
        sidebar.classList.toggle('collapsed');
        btnText.textContent = sidebar.classList.contains('collapsed') ? 'Show Editor' : 'Hide Editor';
    });

    // Mobile View Tab Switcher (Edit Details vs View Resume vs Zoom)
    const mobileBtnEdit = document.getElementById('mobileBtnEdit');
    const mobileBtnPreview = document.getElementById('mobileBtnPreview');
    const mobileBtnZoom = document.getElementById('mobileBtnZoom');
    const zoomBtnText = document.getElementById('zoomBtnText');
    const editorSidebarEl = document.getElementById('editorSidebar');
    const previewAreaEl = document.querySelector('.preview-area');
    const paperEl = document.getElementById('resumePaper');

    let isZoomedIn = false;

    if (mobileBtnEdit && mobileBtnPreview) {
        mobileBtnEdit.addEventListener('click', () => {
            mobileBtnEdit.classList.add('active');
            mobileBtnPreview.classList.remove('active');
            if (mobileBtnZoom) mobileBtnZoom.style.display = 'none';
            if (editorSidebarEl) editorSidebarEl.classList.remove('mobile-hidden');
            if (previewAreaEl) previewAreaEl.classList.add('mobile-hidden');
        });

        mobileBtnPreview.addEventListener('click', () => {
            mobileBtnPreview.classList.add('active');
            mobileBtnEdit.classList.remove('active');
            if (mobileBtnZoom) mobileBtnZoom.style.display = 'inline-flex';
            if (editorSidebarEl) editorSidebarEl.classList.add('mobile-hidden');
            if (previewAreaEl) previewAreaEl.classList.remove('mobile-hidden');
            renderPreview();
        });

        if (mobileBtnZoom && paperEl) {
            mobileBtnZoom.addEventListener('click', () => {
                isZoomedIn = !isZoomedIn;
                if (isZoomedIn) {
                    paperEl.classList.add('mobile-zoomed');
                    mobileBtnZoom.classList.add('active');
                    if (zoomBtnText) zoomBtnText.textContent = 'Fit Page';
                    mobileBtnZoom.querySelector('i').className = 'fa-solid fa-compress';
                } else {
                    paperEl.classList.remove('mobile-zoomed');
                    mobileBtnZoom.classList.remove('active');
                    if (zoomBtnText) zoomBtnText.textContent = 'Zoom In';
                    mobileBtnZoom.querySelector('i').className = 'fa-solid fa-magnifying-glass-plus';
                }
            });
        }
    }

    document.getElementById('resetDataBtn').addEventListener('click', () => {
        if (confirm("Reset resume details to sample reference data?")) {
            currentData = JSON.parse(JSON.stringify(REFERENCE_DATA));
            const pInput = document.getElementById('inputPhoto');
            if (pInput) pInput.value = '';
            loadFormData(currentData);
            schedulePreviewRender();
        }
    });

    const clearFormBtn = document.getElementById('clearFormBtn');
    if (clearFormBtn) {
        clearFormBtn.addEventListener('click', () => {
            if (confirm("Clear all fields to start a brand new blank resume?")) {
                currentData = {
                    name: "", tagline: "", mobile: "", email: "", address: "", photo: "", objective: "",
                    education: [{ qual: "", inst: "", year: "", marks: "" }],
                    skills: [], certifications: [], achievements: [],
                    personal: { dob: "", gender: "Female", father: "", husband: "", mother: "", marital: "Unmarried", languages: "", hobbies: "" }
                };
                const pInput = document.getElementById('inputPhoto');
                if (pInput) pInput.value = '';
                loadFormData(currentData);
                schedulePreviewRender();
            }
        });
    }

    // Instant 4K PDF Export (Scale 4 = 384 DPI Ultra Sharp)
    document.getElementById('downloadPdfBtn').addEventListener('click', async () => {
        const btn = document.getElementById('downloadPdfBtn');
        const originalHtml = btn.innerHTML;
        btn.innerHTML = `<i class="fa-solid fa-spinner fa-spin"></i> Generating 4K PDF...`;
        btn.disabled = true;

        try {
            if (document.fonts && document.fonts.ready) {
                await document.fonts.ready;
            }

            const element = document.getElementById('resumePaper');
            const cleanName = (currentData.name || 'Resume').trim().replace(/[^a-zA-Z0-9]/g, '_');
            const filename = `${cleanName}_Resume.pdf`;

            const opt = {
                margin:       0,
                filename:     filename,
                image:        { type: 'jpeg', quality: 1.0 },
                html2canvas:  { 
                    scale: 4, // 384 DPI Ultra Sharp Render
                    useCORS: true, 
                    logging: false,
                    scrollY: 0
                },
                jsPDF:        { unit: 'mm', format: 'a4', orientation: 'portrait' },
                pagebreak:    { mode: ['avoid-all', 'css'] }
            };

            await html2pdf().set(opt).from(element).toPdf().get('pdf').then(function (pdf) {
                const totalPages = pdf.internal.getNumberOfPages();
                if (totalPages > 1) {
                    for (let i = totalPages; i > 1; i--) {
                        pdf.deletePage(i);
                    }
                }
            }).save();
        } catch (err) {
            console.error('PDF Export Error:', err);
            alert('Failed to export PDF.');
        } finally {
            btn.innerHTML = originalHtml;
            btn.disabled = false;
        }
    });

    ['inputGender', 'inputMarital'].forEach(id => {
        const el = document.getElementById(id);
        if (el) {
            el.addEventListener('change', () => {
                updateGuardianUI(true);
                syncDataFromForm();
            });
        }
    });

    const relEl = document.getElementById('inputGuardianRelation');
    if (relEl) {
        relEl.addEventListener('change', () => {
            updateGuardianUI(false);
            syncDataFromForm();
        });
    }

    // Native Vector PDF / Direct Print (Triggers browser print dialog)
    document.getElementById('printPdfBtn').addEventListener('click', () => {
        window.print();
    });

    // Keyboard Shortcuts (Ctrl+P = Print, Ctrl+Shift+S / Ctrl+Enter = Download 4K PDF)
    document.addEventListener('keydown', (e) => {
        if ((e.ctrlKey || e.metaKey) && (e.key === 'p' || e.key === 'P')) {
            e.preventDefault();
            window.print();
        }
        if ((e.ctrlKey || e.metaKey) && e.shiftKey && (e.key === 's' || e.key === 'S')) {
            e.preventDefault();
            document.getElementById('downloadPdfBtn').click();
        }
    });
}

function syncDataFromForm() {
    const husbandVal = document.getElementById('inputHusband').value;
    const maritalSelectVal = document.getElementById('inputMarital').value || 'Unmarried';
    const genderSelectVal = document.getElementById('inputGender').value || 'Female';
    const relSelectVal = document.getElementById('inputGuardianRelation').value || 'Father';

    const isMarried = maritalSelectVal.toLowerCase().includes('married') && !maritalSelectVal.toLowerCase().includes('unmarried');

    currentData.name = document.getElementById('inputName').value;
    currentData.tagline = document.getElementById('inputTagline').value;
    currentData.mobile = document.getElementById('inputMobile').value;
    currentData.email = document.getElementById('inputEmail').value;
    currentData.address = document.getElementById('inputAddress').value;
    currentData.objective = document.getElementById('inputObjective').value;

    currentData.skills = document.getElementById('inputSkills').value.split('\n');
    currentData.certifications = document.getElementById('inputCertifications').value.split('\n');
    currentData.achievements = document.getElementById('inputAchievements').value.split('\n');

    currentData.personal = {
        dob: document.getElementById('inputDob').value,
        gender: genderSelectVal,
        guardianType: relSelectVal,
        husband: relSelectVal === 'Husband' ? husbandVal : '',
        mother: relSelectVal === 'Mother' ? husbandVal : '',
        father: relSelectVal === 'Father' ? husbandVal : '',
        marital: isMarried ? 'Married' : 'Unmarried',
        languages: document.getElementById('inputLanguages').value,
        hobbies: document.getElementById('inputHobbies').value
    };

    schedulePreviewRender();
}

function autoFitResumePaper() {
    if (autoFitTimer) clearTimeout(autoFitTimer);
    autoFitTimer = setTimeout(() => {
        const paper = document.getElementById('resumePaper');
        if (!paper) return;

        const maxH = paper.clientHeight || 1115;
        const scrollH = paper.scrollHeight;

        if (scrollH > maxH + 15) {
            if (!paper.classList.contains('compact-tight')) {
                paper.classList.add('compact-tight');
            } else if (paper.scrollHeight > maxH + 15 && !paper.classList.contains('compact-super')) {
                paper.classList.add('compact-super');
            }
        }
    }, 400);
}

function renderPreview() {
    const paper = document.getElementById('resumePaper');
    if (!paper) return;

    const isTight = paper.classList.contains('compact-tight');
    const isSuper = paper.classList.contains('compact-super');

    paper.className = `resume-paper ${currentTemplate}` + 
                      (isTight ? ' compact-tight' : '') + 
                      (isSuper ? ' compact-super' : '');

    switch (currentTemplate) {
        case 'template-17':
            paper.innerHTML = renderTemplate17HTML(currentData);
            break;
        case 'template-18':
            paper.innerHTML = renderTemplate18HTML(currentData);
            break;
        case 'template-19':
            paper.innerHTML = renderTemplate19HTML(currentData);
            break;
        case 'template-20':
            paper.innerHTML = renderTemplate20HTML(currentData);
            break;
        case 'template-13':
            paper.innerHTML = renderTemplate13HTML(currentData);
            break;
        case 'template-14':
            paper.innerHTML = renderTemplate14HTML(currentData);
            break;
        case 'template-15':
            paper.innerHTML = renderTemplate15HTML(currentData);
            break;
        case 'template-16':
            paper.innerHTML = renderTemplate16HTML(currentData);
            break;
        case 'template-11':
            paper.innerHTML = renderTemplate11HTML(currentData);
            break;
        case 'template-12':
            paper.innerHTML = renderTemplate12HTML(currentData);
            break;
        case 'template-10':
            paper.innerHTML = renderTemplate10HTML(currentData);
            break;
        case 'template-2':
            paper.innerHTML = renderTemplate2HTML(currentData);
            break;
        case 'template-3':
            paper.innerHTML = renderTemplate3HTML(currentData);
            break;
        case 'template-4':
            paper.innerHTML = renderTemplate4HTML(currentData);
            break;
        case 'template-5':
            paper.innerHTML = renderTemplate5HTML(currentData);
            break;
        case 'template-6':
            paper.innerHTML = renderTemplate6HTML(currentData);
            break;
        case 'template-7':
            paper.innerHTML = renderTemplate7HTML(currentData);
            break;
        case 'template-8':
            paper.innerHTML = renderTemplate8HTML(currentData);
            break;
        case 'template-9':
            paper.innerHTML = renderTemplate9HTML(currentData);
            break;
        case 'template-1':
        default:
            paper.innerHTML = renderTemplate1HTML(currentData);
            break;
    }

    setTimeout(autoFitResumePaper, 50);
}

/* TEMPLATE 1: CLASSIC REFERENCE */
function renderTemplate1HTML(data) {
    const { guardianLabel, guardianValue } = getGuardianDetails(data);

    return `
        <header class="resume-header">
            <div class="header-info">
                <h1 class="user-name">${escapeHtml(data.name || 'YOUR NAME')}</h1>
                <div class="contact-block">
                    ${data.mobile ? `<p><span class="label">Mobile:</span> ${escapeHtml(data.mobile)}</p>` : ''}
                    ${data.email ? `<p><span class="label">Email:</span> ${escapeHtml(data.email)}</p>` : ''}
                    ${data.address ? `<p><span class="label">Address:</span> ${escapeHtml(data.address)}</p>` : ''}
                </div>
                ${data.tagline ? `
                    <div class="tagline-block">
                        <p class="tagline-text">${escapeHtml(data.tagline)}</p>
                    </div>
                ` : ''}
            </div>
            <div class="header-photo">
                <img src="${data.photo || 'profile.jpg'}" alt="Profile Picture" onerror="this.src='https://via.placeholder.com/100x120?text=Photo'">
            </div>
        </header>

        ${data.objective ? `
            <section class="resume-section">
                <div class="section-header-box">
                    <h2 class="section-heading">CAREER OBJECTIVE</h2>
                </div>
                <p class="objective-text">${escapeHtml(data.objective)}</p>
            </section>
        ` : ''}

        ${(data.education && data.education.length > 0) ? `
            <section class="resume-section">
                <div class="section-header-box">
                    <h2 class="section-heading">EDUCATION</h2>
                </div>
                <div class="table-responsive">
                    <table class="education-table">
                        <thead>
                            <tr>
                                <th>Qualification</th>
                                <th>Institution</th>
                                <th>Year</th>
                                <th>Marks</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${data.education.map(item => `
                                <tr>
                                    <td><strong>${escapeHtml(item.qual)}</strong></td>
                                    <td>${escapeHtml(item.inst)}</td>
                                    <td>${escapeHtml(item.year)}</td>
                                    <td>${escapeHtml(item.marks)}</td>
                                </tr>
                            `).join('')}
                        </tbody>
                    </table>
                </div>
            </section>
        ` : ''}

        ${(data.skills && data.skills.filter(s => s && s.trim()).length > 0) ? `
            <section class="resume-section">
                <div class="section-header-box">
                    <h2 class="section-heading">SKILLS</h2>
                </div>
                <ul class="bullet-list">
                    ${data.skills.filter(s => s && s.trim()).map(s => `<li>${escapeHtml(s)}</li>`).join('')}
                </ul>
            </section>
        ` : ''}

        ${(data.certifications && data.certifications.filter(c => c && c.trim()).length > 0) ? `
            <section class="resume-section">
                <div class="section-header-box">
                    <h2 class="section-heading">CERTIFICATIONS</h2>
                </div>
                <ul class="bullet-list">
                    ${data.certifications.filter(c => c && c.trim()).map(c => `<li>${escapeHtml(c)}</li>`).join('')}
                </ul>
            </section>
        ` : ''}

        ${(data.achievements && data.achievements.filter(a => a && a.trim()).length > 0) ? `
            <section class="resume-section">
                <div class="section-header-box">
                    <h2 class="section-heading">ACHIEVEMENTS</h2>
                </div>
                <ul class="bullet-list">
                    ${data.achievements.filter(a => a && a.trim()).map(a => `<li>${escapeHtml(a)}</li>`).join('')}
                </ul>
            </section>
        ` : ''}

        <section class="resume-section">
            <div class="section-header-box">
                <h2 class="section-heading">PERSONAL DETAILS</h2>
            </div>
            <div class="personal-grid">
                ${data.personal?.dob ? `<div class="personal-row"><span class="p-label">Date of Birth</span><span class="p-colon">:</span><span class="p-val">${escapeHtml(data.personal.dob)}</span></div>` : ''}
                ${data.personal?.gender ? `<div class="personal-row"><span class="p-label">Gender</span><span class="p-colon">:</span><span class="p-val">${escapeHtml(data.personal.gender)}</span></div>` : ''}
                ${guardianValue ? `<div class="personal-row"><span class="p-label">${guardianLabel}</span><span class="p-colon">:</span><span class="p-val">${escapeHtml(guardianValue)}</span></div>` : ''}
                ${data.personal?.marital ? `<div class="personal-row"><span class="p-label">Marital Status</span><span class="p-colon">:</span><span class="p-val">${escapeHtml(data.personal.marital)}</span></div>` : ''}
                ${data.personal?.languages ? `<div class="personal-row"><span class="p-label">Languages Known</span><span class="p-colon">:</span><span class="p-val">${escapeHtml(data.personal.languages)}</span></div>` : ''}
                ${data.personal?.hobbies ? `<div class="personal-row"><span class="p-label">Hobbies</span><span class="p-colon">:</span><span class="p-val">${escapeHtml(data.personal.hobbies)}</span></div>` : ''}
            </div>
        </section>
    `;
}

/* TEMPLATE 2: MODERN EXECUTIVE */
function renderTemplate2HTML(data) {
    const { guardianLabel, guardianValue } = getGuardianDetails(data);

    return `
        <div class="tmpl2-layout">
            <div class="tmpl2-sidebar">
                <div class="tmpl2-photo">
                    <img src="${data.photo || 'profile.jpg'}" alt="Photo" onerror="this.src='https://via.placeholder.com/100x120?text=Photo'">
                </div>
                
                <div class="tmpl2-side-block">
                    <h3 class="tmpl2-side-title"><i class="fa-solid fa-address-book"></i> CONTACT</h3>
                    ${data.mobile ? `<p class="tmpl2-side-item"><i class="fa-solid fa-phone"></i> ${escapeHtml(data.mobile)}</p>` : ''}
                    ${data.email ? `<p class="tmpl2-side-item"><i class="fa-solid fa-envelope"></i> ${escapeHtml(data.email)}</p>` : ''}
                    ${data.address ? `<p class="tmpl2-side-item"><i class="fa-solid fa-location-dot"></i> ${escapeHtml(data.address)}</p>` : ''}
                </div>

                ${(data.skills && data.skills.length > 0) ? `
                    <div class="tmpl2-side-block">
                        <h3 class="tmpl2-side-title"><i class="fa-solid fa-gears"></i> SKILLS</h3>
                        <div class="tmpl2-skill-tags">
                            ${data.skills.map(s => `<span class="tmpl2-skill-pill">${escapeHtml(s)}</span>`).join('')}
                        </div>
                    </div>
                ` : ''}

                <div class="tmpl2-side-block">
                    <h3 class="tmpl2-side-title"><i class="fa-solid fa-user"></i> PERSONAL</h3>
                    <div class="tmpl2-personal-list">
                        ${data.personal?.dob ? `<div class="tmpl2-p-row"><span class="tmpl2-p-label">DOB</span><span class="tmpl2-p-val">${escapeHtml(data.personal.dob)}</span></div>` : ''}
                        ${data.personal?.gender ? `<div class="tmpl2-p-row"><span class="tmpl2-p-label">Gender</span><span class="tmpl2-p-val">${escapeHtml(data.personal.gender)}</span></div>` : ''}
                        ${guardianValue ? `<div class="tmpl2-p-row"><span class="tmpl2-p-label">${guardianLabel}</span><span class="tmpl2-p-val">${escapeHtml(guardianValue)}</span></div>` : ''}
                        ${data.personal?.marital ? `<div class="tmpl2-p-row"><span class="tmpl2-p-label">Status</span><span class="tmpl2-p-val">${escapeHtml(data.personal.marital)}</span></div>` : ''}
                        ${data.personal?.languages ? `<div class="tmpl2-p-row"><span class="tmpl2-p-label">Languages</span><span class="tmpl2-p-val">${escapeHtml(data.personal.languages)}</span></div>` : ''}
                        ${data.personal?.hobbies ? `<div class="tmpl2-p-row"><span class="tmpl2-p-label">Hobbies</span><span class="tmpl2-p-val">${escapeHtml(data.personal.hobbies)}</span></div>` : ''}
                    </div>
                </div>
            </div>

            <div class="tmpl2-main">
                <div class="tmpl2-header">
                    <h1 class="tmpl2-name">${escapeHtml(data.name || 'YOUR NAME')}</h1>
                    <p class="tmpl2-tagline">${escapeHtml(data.tagline || '')}</p>
                </div>

                ${data.objective ? `
                    <section class="tmpl2-section">
                        <h2 class="tmpl2-sec-title">PROFILE OBJECTIVE</h2>
                        <p class="tmpl2-text">${escapeHtml(data.objective)}</p>
                    </section>
                ` : ''}

                ${(data.education && data.education.length > 0) ? `
                    <section class="tmpl2-section">
                        <h2 class="tmpl2-sec-title">EDUCATION & ACADEMICS</h2>
                        <div class="tmpl2-edu-list">
                            ${data.education.map(item => `
                                <div class="tmpl2-edu-card">
                                    <div class="tmpl2-edu-header">
                                        <strong class="tmpl2-qual">${escapeHtml(item.qual)}</strong>
                                        <span class="tmpl2-year">${escapeHtml(item.year)}</span>
                                    </div>
                                    <div class="tmpl2-inst">${escapeHtml(item.inst)} | <strong>Marks:</strong> ${escapeHtml(item.marks)}</div>
                                </div>
                            `).join('')}
                        </div>
                    </section>
                ` : ''}

                ${(data.certifications && data.certifications.length > 0) ? `
                    <section class="tmpl2-section">
                        <h2 class="tmpl2-sec-title">CERTIFICATIONS</h2>
                        <ul class="tmpl2-list">
                            ${data.certifications.map(c => `<li>${escapeHtml(c)}</li>`).join('')}
                        </ul>
                    </section>
                ` : ''}

                ${(data.achievements && data.achievements.length > 0) ? `
                    <section class="tmpl2-section">
                        <h2 class="tmpl2-sec-title">KEY ACHIEVEMENTS</h2>
                        <ul class="tmpl2-list">
                            ${data.achievements.map(a => `<li>${escapeHtml(a)}</li>`).join('')}
                        </ul>
                    </section>
                ` : ''}
            </div>
        </div>
    `;
}

/* TEMPLATE 3: ELEGANT MINIMALIST */
function renderTemplate3HTML(data) {
    const { guardianLabel, guardianValue } = getGuardianDetails(data);

    return `
        <div class="tmpl3-container">
            <header class="tmpl3-header" style="display:flex; justify-content:space-between; align-items:center;">
                <div>
                    <h1 class="tmpl3-name">${escapeHtml(data.name || 'YOUR NAME')}</h1>
                    <p class="tmpl3-tagline">${escapeHtml(data.tagline || '')}</p>
                    <div class="tmpl3-contact">
                        ${data.mobile ? `<span>Mobile: ${escapeHtml(data.mobile)}</span>` : ''}
                        ${data.email ? `<span>• Email: ${escapeHtml(data.email)}</span>` : ''}
                        ${data.address ? `<span>• Address: ${escapeHtml(data.address)}</span>` : ''}
                    </div>
                </div>
                <div class="tmpl3-photo" style="width:85px; height:105px; border-radius:6px; overflow:hidden; flex-shrink:0; border:1px solid #cbd5e1; background:#f1f5f9;">
                    <img src="${data.photo || 'profile_sarah.jpg'}" alt="Photo" style="width:100%; height:100%; object-fit:cover;" onerror="this.src='https://via.placeholder.com/90x105?text=Photo'">
                </div>
            </header>
            <div class="tmpl3-divider"></div>

            ${data.objective ? `
                <section class="tmpl3-section">
                    <h2 class="tmpl3-title">Career Summary</h2>
                    <p class="tmpl3-text">${escapeHtml(data.objective)}</p>
                </section>
            ` : ''}

            ${(data.education && data.education.length > 0) ? `
                <section class="tmpl3-section">
                    <h2 class="tmpl3-title">Education Background</h2>
                    <div class="tmpl3-edu-grid">
                        ${data.education.map(item => `
                            <div class="tmpl3-edu-card">
                                <div class="tmpl3-edu-top">
                                    <span class="tmpl3-degree">${escapeHtml(item.qual)}</span>
                                    <span class="tmpl3-yr">${escapeHtml(item.year)}</span>
                                </div>
                                <div class="tmpl3-sub">${escapeHtml(item.inst)} • Score: ${escapeHtml(item.marks)}</div>
                            </div>
                        `).join('')}
                    </div>
                </section>
            ` : ''}

            ${(data.skills && data.skills.length > 0) ? `
                <section class="tmpl3-section">
                    <h2 class="tmpl3-title">Core Competencies</h2>
                    <ul class="tmpl3-bullets">
                        ${data.skills.map(s => `<li>${escapeHtml(s)}</li>`).join('')}
                    </ul>
                </section>
            ` : ''}

            ${(data.certifications && data.certifications.length > 0) ? `
                <section class="tmpl3-section">
                    <h2 class="tmpl3-title">Certifications & Training</h2>
                    <ul class="tmpl3-bullets">
                        ${data.certifications.map(c => `<li>${escapeHtml(c)}</li>`).join('')}
                    </ul>
                </section>
            ` : ''}

            ${(data.achievements && data.achievements.length > 0) ? `
                <section class="tmpl3-section">
                    <h2 class="tmpl3-title">Honors & Achievements</h2>
                    <ul class="tmpl3-bullets">
                        ${data.achievements.map(a => `<li>${escapeHtml(a)}</li>`).join('')}
                    </ul>
                </section>
            ` : ''}

            <section class="tmpl3-section">
                <h2 class="tmpl3-title">Personal Overview</h2>
                <div class="tmpl3-personal-inline">
                    ${data.personal?.dob ? `<span><strong>DOB:</strong> ${escapeHtml(data.personal.dob)}</span>` : ''}
                    ${data.personal?.gender ? `<span><strong>Gender:</strong> ${escapeHtml(data.personal.gender)}</span>` : ''}
                    ${guardianValue ? `<span><strong>${guardianLabel}:</strong> ${escapeHtml(guardianValue)}</span>` : ''}
                    ${data.personal?.marital ? `<span><strong>Status:</strong> ${escapeHtml(data.personal.marital)}</span>` : ''}
                    ${data.personal?.languages ? `<span><strong>Languages:</strong> ${escapeHtml(data.personal.languages)}</span>` : ''}
                    ${data.personal?.hobbies ? `<span><strong>Hobbies:</strong> ${escapeHtml(data.personal.hobbies)}</span>` : ''}
                </div>
            </section>
        </div>
    `;
}

/* TEMPLATE 4: TECH & CREATIVE */
function renderTemplate4HTML(data) {
    const { guardianLabel, guardianValue } = getGuardianDetails(data);

    return `
        <div class="tmpl4-container">
            <div class="tmpl4-banner">
                <div class="tmpl4-banner-info">
                    <h1 class="tmpl4-name">${escapeHtml(data.name || 'YOUR NAME')}</h1>
                    <p class="tmpl4-tagline">${escapeHtml(data.tagline || '')}</p>
                    <div class="tmpl4-pills">
                        ${data.mobile ? `<span class="tmpl4-pill"><i class="fa-solid fa-phone"></i> ${escapeHtml(data.mobile)}</span>` : ''}
                        ${data.email ? `<span class="tmpl4-pill"><i class="fa-solid fa-envelope"></i> ${escapeHtml(data.email)}</span>` : ''}
                        ${data.address ? `<span class="tmpl4-pill"><i class="fa-solid fa-location-dot"></i> ${escapeHtml(data.address)}</span>` : ''}
                    </div>
                </div>
                <div class="tmpl4-avatar">
                    <img src="${data.photo || 'profile.jpg'}" alt="Avatar" onerror="this.src='https://via.placeholder.com/100x120?text=Photo'">
                </div>
            </div>

            <div class="tmpl4-body">
                ${data.objective ? `
                    <section class="tmpl4-sec">
                        <h2 class="tmpl4-heading"><i class="fa-solid fa-bullseye"></i> Executive Summary</h2>
                        <p class="tmpl4-text">${escapeHtml(data.objective)}</p>
                    </section>
                ` : ''}

                ${(data.skills && data.skills.length > 0) ? `
                    <section class="tmpl4-sec">
                        <h2 class="tmpl4-heading"><i class="fa-solid fa-wand-magic-sparkles"></i> Technical & Professional Skills</h2>
                        <div class="tmpl4-skill-tags">
                            ${data.skills.map(s => `<span class="tmpl4-skill-badge">${escapeHtml(s)}</span>`).join('')}
                        </div>
                    </section>
                ` : ''}

                ${(data.education && data.education.length > 0) ? `
                    <section class="tmpl4-sec">
                        <h2 class="tmpl4-heading"><i class="fa-solid fa-graduation-cap"></i> Education Qualification</h2>
                        <table class="tmpl4-table">
                            <thead>
                                <tr>
                                    <th>Degree</th>
                                    <th>Institution</th>
                                    <th>Year</th>
                                    <th>Marks</th>
                                </tr>
                            </thead>
                            <tbody>
                                ${data.education.map(item => `
                                    <tr>
                                        <td><strong>${escapeHtml(item.qual)}</strong></td>
                                        <td>${escapeHtml(item.inst)}</td>
                                        <td>${escapeHtml(item.year)}</td>
                                        <td><span class="tmpl4-marks-badge">${escapeHtml(item.marks)}</span></td>
                                    </tr>
                                `).join('')}
                            </tbody>
                        </table>
                    </section>
                ` : ''}

                ${(data.certifications && data.certifications.length > 0) ? `
                    <section class="tmpl4-sec">
                        <h2 class="tmpl4-heading"><i class="fa-solid fa-award"></i> Certifications</h2>
                        <ul class="tmpl4-list">
                            ${data.certifications.map(c => `<li>${escapeHtml(c)}</li>`).join('')}
                        </ul>
                    </section>
                ` : ''}

                ${(data.achievements && data.achievements.length > 0) ? `
                    <section class="tmpl4-sec">
                        <h2 class="tmpl4-heading"><i class="fa-solid fa-trophy"></i> Key Achievements</h2>
                        <ul class="tmpl4-list">
                            ${data.achievements.map(a => `<li>${escapeHtml(a)}</li>`).join('')}
                        </ul>
                    </section>
                ` : ''}

                <section class="tmpl4-sec">
                    <h2 class="tmpl4-heading"><i class="fa-solid fa-address-card"></i> Personal Details</h2>
                    <div class="tmpl4-personal-grid">
                        ${data.personal?.dob ? `<div><strong>Date of Birth:</strong> ${escapeHtml(data.personal.dob)}</div>` : ''}
                        ${data.personal?.gender ? `<div><strong>Gender:</strong> ${escapeHtml(data.personal.gender)}</div>` : ''}
                        ${guardianValue ? `<div><strong>${guardianLabel}:</strong> ${escapeHtml(guardianValue)}</div>` : ''}
                        ${data.personal?.marital ? `<div><strong>Marital Status:</strong> ${escapeHtml(data.personal.marital)}</div>` : ''}
                        ${data.personal?.languages ? `<div><strong>Languages:</strong> ${escapeHtml(data.personal.languages)}</div>` : ''}
                        ${data.personal?.hobbies ? `<div><strong>Hobbies:</strong> ${escapeHtml(data.personal.hobbies)}</div>` : ''}
                    </div>
                </section>
            </div>
        </div>
    `;
}

/* TEMPLATE 5: CORPORATE ELITE */
function renderTemplate5HTML(data) {
    const { guardianLabel, guardianValue } = getGuardianDetails(data);

    return `
        <div class="tmpl5-container">
            <header class="tmpl5-header">
                <div class="tmpl5-header-left">
                    <h1 class="tmpl5-name">${escapeHtml(data.name || 'YOUR NAME')}</h1>
                    <p class="tmpl5-subtitle">${escapeHtml(data.tagline || '')}</p>
                </div>
                <div class="tmpl5-photo-wrap">
                    <img src="${data.photo || 'profile.jpg'}" alt="Photo" onerror="this.src='https://via.placeholder.com/90x105?text=Photo'">
                </div>
            </header>

            <div class="tmpl5-contact-stripe">
                ${data.mobile ? `<span class="tmpl5-item"><i class="fa-solid fa-phone"></i> ${escapeHtml(data.mobile)}</span>` : ''}
                ${data.email ? `<span class="tmpl5-item"><i class="fa-solid fa-envelope"></i> ${escapeHtml(data.email)}</span>` : ''}
                ${data.address ? `<span class="tmpl5-addr"><i class="fa-solid fa-location-dot"></i> ${escapeHtml(data.address)}</span>` : ''}
            </div>

            <div class="tmpl5-body">
                ${data.objective ? `
                    <section class="tmpl5-sec">
                        <h2 class="tmpl5-sec-title">CAREER OBJECTIVE</h2>
                        <p class="tmpl5-text">${escapeHtml(data.objective)}</p>
                    </section>
                ` : ''}

                ${(data.education && data.education.length > 0) ? `
                    <section class="tmpl5-sec">
                        <h2 class="tmpl5-sec-title">EDUCATION & QUALIFICATIONS</h2>
                        <div class="tmpl5-edu-grid">
                            ${data.education.map(item => `
                                <div class="tmpl5-edu-card">
                                    <div class="tmpl5-degree">${escapeHtml(item.qual)}</div>
                                    <div class="tmpl5-inst">${escapeHtml(item.inst)}</div>
                                    <div class="tmpl5-meta"><span>Passout: <strong>${escapeHtml(item.year)}</strong></span> <span>Score: <strong>${escapeHtml(item.marks)}</strong></span></div>
                                </div>
                            `).join('')}
                        </div>
                    </section>
                ` : ''}

                <div class="tmpl5-row-2col">
                    ${(data.skills && data.skills.length > 0) ? `
                        <section class="tmpl5-sec">
                            <h2 class="tmpl5-sec-title">KEY SKILLS</h2>
                            <ul class="tmpl5-list">
                                ${data.skills.map(s => `<li>${escapeHtml(s)}</li>`).join('')}
                            </ul>
                        </section>
                    ` : ''}

                    ${(data.certifications && data.certifications.length > 0) ? `
                        <section class="tmpl5-sec">
                            <h2 class="tmpl5-sec-title">CERTIFICATIONS</h2>
                            <ul class="tmpl5-list">
                                ${data.certifications.map(c => `<li>${escapeHtml(c)}</li>`).join('')}
                            </ul>
                        </section>
                    ` : ''}
                </div>

                ${(data.achievements && data.achievements.length > 0) ? `
                    <section class="tmpl5-sec">
                        <h2 class="tmpl5-sec-title">KEY ACHIEVEMENTS</h2>
                        <ul class="tmpl5-list">
                            ${data.achievements.map(a => `<li>${escapeHtml(a)}</li>`).join('')}
                        </ul>
                    </section>
                ` : ''}

                <section class="tmpl5-sec">
                    <h2 class="tmpl5-sec-title">PERSONAL INFORMATION</h2>
                    <div class="tmpl5-personal-box">
                        ${data.personal?.dob ? `<div><span>DOB:</span> <strong>${escapeHtml(data.personal.dob)}</strong></div>` : ''}
                        ${data.personal?.gender ? `<div><span>Gender:</span> <strong>${escapeHtml(data.personal.gender)}</strong></div>` : ''}
                        ${guardianValue ? `<div><span>${guardianLabel}:</span> <strong>${escapeHtml(guardianValue)}</strong></div>` : ''}
                        ${data.personal?.marital ? `<div><span>Marital:</span> <strong>${escapeHtml(data.personal.marital)}</strong></div>` : ''}
                        ${data.personal?.languages ? `<div><span>Languages:</span> <strong>${escapeHtml(data.personal.languages)}</strong></div>` : ''}
                        ${data.personal?.hobbies ? `<div><span>Hobbies:</span> <strong>${escapeHtml(data.personal.hobbies)}</strong></div>` : ''}
                    </div>
                </section>
            </div>
        </div>
    `;
}

/* TEMPLATE 6: SPLIT MINIMAL MODERN */
function renderTemplate6HTML(data) {
    const { guardianLabel, guardianValue } = getGuardianDetails(data);

    return `
        <div class="tmpl6-container">
            <header class="tmpl6-header">
                <div class="tmpl6-photo">
                    <img src="${data.photo || 'profile.jpg'}" alt="Photo" onerror="this.src='https://via.placeholder.com/90x100?text=Photo'">
                </div>
                <div class="tmpl6-hinfo">
                    <h1 class="tmpl6-name">${escapeHtml(data.name || 'YOUR NAME')}</h1>
                    <p class="tmpl6-tagline">${escapeHtml(data.tagline || '')}</p>
                    <div class="tmpl6-contacts">
                        ${data.mobile ? `<span><i class="fa-solid fa-phone"></i> ${escapeHtml(data.mobile)}</span>` : ''}
                        ${data.email ? `<span><i class="fa-solid fa-envelope"></i> ${escapeHtml(data.email)}</span>` : ''}
                        ${data.address ? `<span><i class="fa-solid fa-location-dot"></i> ${escapeHtml(data.address)}</span>` : ''}
                    </div>
                </div>
            </header>

            <div class="tmpl6-body">
                ${data.objective ? `
                    <section class="tmpl6-sec">
                        <h2 class="tmpl6-heading">Career Objective</h2>
                        <p class="tmpl6-text">${escapeHtml(data.objective)}</p>
                    </section>
                ` : ''}

                ${(data.skills && data.skills.length > 0) ? `
                    <section class="tmpl6-sec">
                        <h2 class="tmpl6-heading">Skills & Expertise</h2>
                        <div class="tmpl6-pills">
                            ${data.skills.map(s => `<span class="tmpl6-pill">${escapeHtml(s)}</span>`).join('')}
                        </div>
                    </section>
                ` : ''}

                ${(data.education && data.education.length > 0) ? `
                    <section class="tmpl6-sec">
                        <h2 class="tmpl6-heading">Education</h2>
                        <div class="tmpl6-edu-timeline">
                            ${data.education.map(item => `
                                <div class="tmpl6-edu-item">
                                    <div class="tmpl6-edu-year">${escapeHtml(item.year)}</div>
                                    <div class="tmpl6-edu-content">
                                        <strong>${escapeHtml(item.qual)}</strong>
                                        <p>${escapeHtml(item.inst)} • Marks: <span>${escapeHtml(item.marks)}</span></p>
                                    </div>
                                </div>
                            `).join('')}
                        </div>
                    </section>
                ` : ''}

                ${(data.certifications && data.certifications.length > 0) ? `
                    <section class="tmpl6-sec">
                        <h2 class="tmpl6-heading">Certifications</h2>
                        <ul class="tmpl6-list">
                            ${data.certifications.map(c => `<li>${escapeHtml(c)}</li>`).join('')}
                        </ul>
                    </section>
                ` : ''}

                ${(data.achievements && data.achievements.length > 0) ? `
                    <section class="tmpl6-sec">
                        <h2 class="tmpl6-heading">Achievements</h2>
                        <ul class="tmpl6-list">
                            ${data.achievements.map(a => `<li>${escapeHtml(a)}</li>`).join('')}
                        </ul>
                    </section>
                ` : ''}

                <section class="tmpl6-sec">
                    <h2 class="tmpl6-heading">Personal Details</h2>
                    <div class="tmpl6-personal-grid">
                        ${data.personal?.dob ? `<div><strong>DOB:</strong> ${escapeHtml(data.personal.dob)}</div>` : ''}
                        ${data.personal?.gender ? `<div><strong>Gender:</strong> ${escapeHtml(data.personal.gender)}</div>` : ''}
                        ${guardianValue ? `<div><strong>${guardianLabel}:</strong> ${escapeHtml(guardianValue)}</div>` : ''}
                        ${data.personal?.marital ? `<div><strong>Status:</strong> ${escapeHtml(data.personal.marital)}</div>` : ''}
                        ${data.personal?.languages ? `<div><strong>Languages:</strong> ${escapeHtml(data.personal.languages)}</div>` : ''}
                        ${data.personal?.hobbies ? `<div><strong>Hobbies:</strong> ${escapeHtml(data.personal.hobbies)}</div>` : ''}
                    </div>
                </section>
            </div>
        </div>
    `;
}

/* TEMPLATE 7: IVY LEAGUE CLASSIC (Harvard / Wharton Format) */
function renderTemplate7HTML(data) {
    const { guardianLabel, guardianValue } = getGuardianDetails(data);

    return `
        <div class="tmpl7-container">
            <header class="tmpl7-header" style="display:flex; justify-content:space-between; align-items:center; text-align:left;">
                <div>
                    <h1 class="tmpl7-name">${escapeHtml(data.name || 'YOUR NAME')}</h1>
                    <p class="tmpl7-tagline">${escapeHtml(data.tagline || '')}</p>
                    <div class="tmpl7-contact">
                        ${data.mobile ? `<span class="tmpl7-contact-item"><strong>Mobile:</strong> ${escapeHtml(data.mobile)}</span>` : ''}
                        ${data.email ? `<span class="tmpl7-contact-item">${data.mobile ? '• ' : ''}<strong>Email:</strong> ${escapeHtml(data.email)}</span>` : ''}
                        ${data.address ? `<div class="tmpl7-contact-address"><strong>Address:</strong> ${escapeHtml(data.address)}</div>` : ''}
                    </div>
                </div>
                <div class="tmpl7-photo" style="width:85px; height:105px; border-radius:6px; overflow:hidden; flex-shrink:0; border:1px solid #cbd5e1; background:#f1f5f9;">
                    <img src="${data.photo || 'profile_sarah.jpg'}" alt="Photo" style="width:100%; height:100%; object-fit:cover;" onerror="this.src='https://via.placeholder.com/90x105?text=Photo'">
                </div>
            </header>

            ${data.objective ? `
                <section class="tmpl7-sec">
                    <h2 class="tmpl7-heading">Executive Summary</h2>
                    <p class="tmpl7-text">${escapeHtml(data.objective)}</p>
                </section>
            ` : ''}

            ${(data.education && data.education.length > 0) ? `
                <section class="tmpl7-sec">
                    <h2 class="tmpl7-heading">Academic Qualifications</h2>
                    <table class="tmpl7-table">
                        <thead>
                            <tr>
                                <th>Degree / Qualification</th>
                                <th>Institution</th>
                                <th>Year</th>
                                <th>Marks / Score</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${data.education.map(item => `
                                <tr>
                                    <td><strong>${escapeHtml(item.qual)}</strong></td>
                                    <td>${escapeHtml(item.inst)}</td>
                                    <td>${escapeHtml(item.year)}</td>
                                    <td>${escapeHtml(item.marks)}</td>
                                </tr>
                            `).join('')}
                        </tbody>
                    </table>
                </section>
            ` : ''}

            ${(data.skills && data.skills.length > 0) ? `
                <section class="tmpl7-sec">
                    <h2 class="tmpl7-heading">Core Skills & Competencies</h2>
                    <ul class="tmpl7-list">
                        ${data.skills.map(s => `<li>${escapeHtml(s)}</li>`).join('')}
                    </ul>
                </section>
            ` : ''}

            ${(data.certifications && data.certifications.length > 0) ? `
                <section class="tmpl7-sec">
                    <h2 class="tmpl7-heading">Professional Certifications</h2>
                    <ul class="tmpl7-list">
                        ${data.certifications.map(c => `<li>${escapeHtml(c)}</li>`).join('')}
                    </ul>
                </section>
            ` : ''}

            ${(data.achievements && data.achievements.length > 0) ? `
                <section class="tmpl7-sec">
                    <h2 class="tmpl7-heading">Key Honors & Achievements</h2>
                    <ul class="tmpl7-list">
                        ${data.achievements.map(a => `<li>${escapeHtml(a)}</li>`).join('')}
                    </ul>
                </section>
            ` : ''}

            <section class="tmpl7-sec">
                <h2 class="tmpl7-heading">Personal Overview</h2>
                <div class="tmpl7-personal-grid">
                    ${data.personal?.dob ? `<div><strong>DOB:</strong> ${escapeHtml(data.personal.dob)}</div>` : ''}
                    ${data.personal?.gender ? `<div><strong>Gender:</strong> ${escapeHtml(data.personal.gender)}</div>` : ''}
                    ${guardianValue ? `<div><strong>${guardianLabel}:</strong> ${escapeHtml(guardianValue)}</div>` : ''}
                    ${data.personal?.marital ? `<div><strong>Status:</strong> ${escapeHtml(data.personal.marital)}</div>` : ''}
                    ${data.personal?.languages ? `<div><strong>Languages:</strong> ${escapeHtml(data.personal.languages)}</div>` : ''}
                    ${data.personal?.hobbies ? `<div><strong>Hobbies:</strong> ${escapeHtml(data.personal.hobbies)}</div>` : ''}
                </div>
            </section>
        </div>
    `;
}

/* TEMPLATE 8: SLATE & CHARCOAL (Corporate Leader) */
function renderTemplate8HTML(data) {
    const { guardianLabel, guardianValue } = getGuardianDetails(data);

    return `
        <div class="tmpl8-container">
            <div class="tmpl8-banner">
                <div class="tmpl8-banner-info">
                    <h1 class="tmpl8-name">${escapeHtml(data.name || 'YOUR NAME')}</h1>
                    <p class="tmpl8-tagline">${escapeHtml(data.tagline || '')}</p>
                    <div class="tmpl8-pills">
                        ${data.mobile ? `<span class="tmpl8-pill"><i class="fa-solid fa-phone"></i> ${escapeHtml(data.mobile)}</span>` : ''}
                        ${data.email ? `<span class="tmpl8-pill"><i class="fa-solid fa-envelope"></i> ${escapeHtml(data.email)}</span>` : ''}
                        ${data.address ? `<span class="tmpl8-pill"><i class="fa-solid fa-location-dot"></i> ${escapeHtml(data.address)}</span>` : ''}
                    </div>
                </div>
                <div class="tmpl8-avatar">
                    <img src="${data.photo || 'profile.jpg'}" alt="Photo" onerror="this.src='https://via.placeholder.com/100x120?text=Photo'">
                </div>
            </div>

            <div class="tmpl8-body">
                ${data.objective ? `
                    <section class="tmpl8-sec">
                        <h2 class="tmpl8-heading">Profile Summary</h2>
                        <p class="tmpl8-text">${escapeHtml(data.objective)}</p>
                    </section>
                ` : ''}

                ${(data.skills && data.skills.length > 0) ? `
                    <section class="tmpl8-sec">
                        <h2 class="tmpl8-heading">Technical & Professional Competencies</h2>
                        <div class="tmpl8-skills">
                            ${data.skills.map(s => `<span class="tmpl8-skill-badge">${escapeHtml(s)}</span>`).join('')}
                        </div>
                    </section>
                ` : ''}

                ${(data.education && data.education.length > 0) ? `
                    <section class="tmpl8-sec">
                        <h2 class="tmpl8-heading">Education History</h2>
                        <div class="tmpl8-edu-grid">
                            ${data.education.map(item => `
                                <div class="tmpl8-edu-card">
                                    <div class="tmpl8-degree">${escapeHtml(item.qual)}</div>
                                    <div class="tmpl8-inst">${escapeHtml(item.inst)}</div>
                                    <div class="tmpl8-meta"><span>Year: <strong>${escapeHtml(item.year)}</strong></span> <span>Marks: <strong>${escapeHtml(item.marks)}</strong></span></div>
                                </div>
                            `).join('')}
                        </div>
                    </section>
                ` : ''}

                ${(data.certifications && data.certifications.length > 0) ? `
                    <section class="tmpl8-sec">
                        <h2 class="tmpl8-heading">Certifications</h2>
                        <ul class="tmpl8-list">
                            ${data.certifications.map(c => `<li>${escapeHtml(c)}</li>`).join('')}
                        </ul>
                    </section>
                ` : ''}

                ${(data.achievements && data.achievements.length > 0) ? `
                    <section class="tmpl8-sec">
                        <h2 class="tmpl8-heading">Key Achievements</h2>
                        <ul class="tmpl8-list">
                            ${data.achievements.map(a => `<li>${escapeHtml(a)}</li>`).join('')}
                        </ul>
                    </section>
                ` : ''}

                <section class="tmpl8-sec">
                    <h2 class="tmpl8-heading">Personal Details</h2>
                    <div class="tmpl8-personal-grid">
                        ${data.personal?.dob ? `<div><strong>DOB:</strong> ${escapeHtml(data.personal.dob)}</div>` : ''}
                        ${data.personal?.gender ? `<div><strong>Gender:</strong> ${escapeHtml(data.personal.gender)}</div>` : ''}
                        ${guardianValue ? `<div><strong>${guardianLabel}:</strong> ${escapeHtml(guardianValue)}</div>` : ''}
                        ${data.personal?.marital ? `<div><strong>Status:</strong> ${escapeHtml(data.personal.marital)}</div>` : ''}
                        ${data.personal?.languages ? `<div><strong>Languages:</strong> ${escapeHtml(data.personal.languages)}</div>` : ''}
                        ${data.personal?.hobbies ? `<div><strong>Hobbies:</strong> ${escapeHtml(data.personal.hobbies)}</div>` : ''}
                    </div>
                </section>
            </div>
        </div>
    `;
}

/* TEMPLATE 9: MINIMALIST TIMELINE (Contemporary Format) */
function renderTemplate9HTML(data) {
    const { guardianLabel, guardianValue } = getGuardianDetails(data);

    return `
        <div class="tmpl9-container">
            <header class="tmpl9-header">
                <div class="tmpl9-hinfo">
                    <h1 class="tmpl9-name">${escapeHtml(data.name || 'YOUR NAME')}</h1>
                    <p class="tmpl9-tagline">${escapeHtml(data.tagline || '')}</p>
                    <div class="tmpl9-contacts">
                        ${data.mobile ? `<span><i class="fa-solid fa-phone"></i> ${escapeHtml(data.mobile)}</span>` : ''}
                        ${data.email ? `<span><i class="fa-solid fa-envelope"></i> ${escapeHtml(data.email)}</span>` : ''}
                        ${data.address ? `<span><i class="fa-solid fa-location-dot"></i> ${escapeHtml(data.address)}</span>` : ''}
                    </div>
                </div>
                <div class="tmpl9-photo">
                    <img src="${data.photo || 'profile.jpg'}" alt="Photo" onerror="this.src='https://via.placeholder.com/90x100?text=Photo'">
                </div>
            </header>

            ${data.objective ? `
                <section class="tmpl9-sec">
                    <h2 class="tmpl9-heading">Career Objective</h2>
                    <p class="tmpl9-text">${escapeHtml(data.objective)}</p>
                </section>
            ` : ''}

            ${(data.skills && data.skills.length > 0) ? `
                <section class="tmpl9-sec">
                    <h2 class="tmpl9-heading">Core Skills</h2>
                    <div class="tmpl9-skills">
                        ${data.skills.map(s => `<span class="tmpl9-skill-badge">${escapeHtml(s)}</span>`).join('')}
                    </div>
                </section>
            ` : ''}

            ${(data.education && data.education.length > 0) ? `
                <section class="tmpl9-sec">
                    <h2 class="tmpl9-heading">Education Timeline</h2>
                    <div class="tmpl9-timeline">
                        ${data.education.map(item => `
                            <div class="tmpl9-timeline-item">
                                <div class="tmpl9-tl-top">
                                    <span>${escapeHtml(item.qual)}</span>
                                    <span class="tmpl9-tl-year">${escapeHtml(item.year)}</span>
                                </div>
                                <div class="tmpl9-tl-sub">${escapeHtml(item.inst)} • Marks: <strong>${escapeHtml(item.marks)}</strong></div>
                            </div>
                        `).join('')}
                    </div>
                </section>
            ` : ''}

            ${(data.certifications && data.certifications.length > 0) ? `
                <section class="tmpl9-sec">
                    <h2 class="tmpl9-heading">Certifications & Training</h2>
                    <ul class="tmpl9-list">
                        ${data.certifications.map(c => `<li>${escapeHtml(c)}</li>`).join('')}
                    </ul>
                </section>
            ` : ''}

            ${(data.achievements && data.achievements.length > 0) ? `
                <section class="tmpl9-sec">
                    <h2 class="tmpl9-heading">Achievements</h2>
                    <ul class="tmpl9-list">
                        ${data.achievements.map(a => `<li>${escapeHtml(a)}</li>`).join('')}
                    </ul>
                </section>
            ` : ''}

            <section class="tmpl9-sec">
                <h2 class="tmpl9-heading">Personal Details</h2>
                <div class="tmpl9-personal-box">
                    ${data.personal?.dob ? `<div><strong>DOB:</strong> ${escapeHtml(data.personal.dob)}</div>` : ''}
                    ${data.personal?.gender ? `<div><strong>Gender:</strong> ${escapeHtml(data.personal.gender)}</div>` : ''}
                    ${guardianValue ? `<div><strong>${guardianLabel}:</strong> ${escapeHtml(guardianValue)}</div>` : ''}
                    ${data.personal?.marital ? `<div><strong>Status:</strong> ${escapeHtml(data.personal.marital)}</div>` : ''}
                    ${data.personal?.languages ? `<div><strong>Languages:</strong> ${escapeHtml(data.personal.languages)}</div>` : ''}
                    ${data.personal?.hobbies ? `<div><strong>Hobbies:</strong> ${escapeHtml(data.personal.hobbies)}</div>` : ''}
                </div>
            </section>
        </div>
    `;
}

function escapeHtml(str) {
    if (!str) return '';
    return str.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#039;");
}

/* TEMPLATE 10: BESPOKE EDUCATOR & SCHOLAR (Oxford Academic Leader) */
function renderTemplate10HTML(data) {
    const { guardianLabel, guardianValue } = getGuardianDetails(data);

    return `
        <div class="tmpl10-container">
            <header class="tmpl10-header">
                <div>
                    <h1 class="tmpl10-name">${escapeHtml(data.name || 'YOUR NAME')}</h1>
                    ${data.tagline ? `<div class="tmpl10-tagline-badge">${escapeHtml(data.tagline)}</div>` : ''}
                    <div class="tmpl10-contacts">
                        ${data.mobile ? `<span><i class="fa-solid fa-phone"></i> ${escapeHtml(data.mobile)}</span>` : ''}
                        ${data.email ? `<span><i class="fa-solid fa-envelope"></i> ${escapeHtml(data.email)}</span>` : ''}
                        ${data.address ? `<span><i class="fa-solid fa-location-dot"></i> ${escapeHtml(data.address)}</span>` : ''}
                    </div>
                </div>
                <div class="tmpl10-photo-box">
                    <img src="${data.photo || 'profile.jpg'}" alt="Photo" onerror="this.src='https://via.placeholder.com/90x108?text=Photo'">
                </div>
            </header>

            ${data.objective ? `
                <section class="tmpl10-sec">
                    <div class="tmpl10-sec-head"><i class="fa-solid fa-graduation-cap"></i> Profile Summary & Teaching Philosophy</div>
                    <div class="tmpl10-summary-box">${escapeHtml(data.objective)}</div>
                </section>
            ` : ''}

            ${(data.education && data.education.length > 0) ? `
                <section class="tmpl10-sec">
                    <div class="tmpl10-sec-head"><i class="fa-solid fa-building-columns"></i> Academic Qualifications</div>
                    <table class="tmpl10-table">
                        <thead>
                            <tr>
                                <th>Qualification</th>
                                <th>Institution</th>
                                <th>Year</th>
                                <th>Marks / Score</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${data.education.map(item => `
                                <tr>
                                    <td><strong>${escapeHtml(item.qual)}</strong></td>
                                    <td>${escapeHtml(item.inst)}</td>
                                    <td>${escapeHtml(item.year)}</td>
                                    <td>${escapeHtml(item.marks)}</td>
                                </tr>
                            `).join('')}
                        </tbody>
                    </table>
                </section>
            ` : ''}

            ${(data.skills && data.skills.filter(s => s && s.trim()).length > 0) ? `
                <section class="tmpl10-sec">
                    <div class="tmpl10-sec-head"><i class="fa-solid fa-list-check"></i> Core Competencies & Skills</div>
                    <div class="tmpl10-skills-grid">
                        ${data.skills.filter(s => s && s.trim()).map(s => `<div class="tmpl10-skill-item"><i class="fa-solid fa-circle-check"></i> ${escapeHtml(s)}</div>`).join('')}
                    </div>
                </section>
            ` : ''}

            ${(data.certifications && data.certifications.filter(c => c && c.trim()).length > 0) ? `
                <section class="tmpl10-sec">
                    <div class="tmpl10-sec-head"><i class="fa-solid fa-award"></i> Professional Certifications</div>
                    ${data.certifications.filter(c => c && c.trim()).map(c => `
                        <div class="tmpl10-cert-card">
                            <i class="fa-solid fa-shield-halved"></i>
                            <span>${escapeHtml(c)}</span>
                        </div>
                    `).join('')}
                </section>
            ` : ''}

            ${(data.achievements && data.achievements.filter(a => a && a.trim()).length > 0) ? `
                <section class="tmpl10-sec">
                    <div class="tmpl10-sec-head"><i class="fa-solid fa-trophy"></i> Academic Honors & Achievements</div>
                    <ul class="tmpl10-list" style="margin-top:0.2rem;">
                        ${data.achievements.filter(a => a && a.trim()).map(a => `<li>${escapeHtml(a)}</li>`).join('')}
                    </ul>
                </section>
            ` : ''}

            <section class="tmpl10-sec">
                <div class="tmpl10-sec-head"><i class="fa-solid fa-id-card"></i> Personal Profile & Background</div>
                <div class="tmpl10-personal-grid">
                    ${data.personal?.dob ? `<div><strong>DOB:</strong> ${escapeHtml(data.personal.dob)}</div>` : ''}
                    ${data.personal?.gender ? `<div><strong>Gender:</strong> ${escapeHtml(data.personal.gender)}</div>` : ''}
                    ${guardianValue ? `<div><strong>${guardianLabel}:</strong> ${escapeHtml(guardianValue)}</div>` : ''}
                    ${data.personal?.marital ? `<div><strong>Status:</strong> ${escapeHtml(data.personal.marital)}</div>` : ''}
                    ${data.personal?.languages ? `<div><strong>Languages:</strong> ${escapeHtml(data.personal.languages)}</div>` : ''}
                    ${data.personal?.hobbies ? `<div><strong>Hobbies:</strong> ${escapeHtml(data.personal.hobbies)}</div>` : ''}
                </div>
            </section>
        </div>
    `;
}

/* TEMPLATE 11: STANFORD ACADEMIC (Minimalist Monochrome ATS) */
function renderTemplate11HTML(data) {
    const { guardianLabel, guardianValue } = getGuardianDetails(data);

    return `
        <div class="tmpl11-container">
            <header class="tmpl11-header">
                <h1 class="tmpl11-name">${escapeHtml(data.name || 'YOUR NAME')}</h1>
                <p class="tmpl11-tagline">${escapeHtml(data.tagline || '')}</p>
                <div class="tmpl11-contacts">
                    ${data.mobile ? `<span class="tmpl11-contact-item"><strong>Mobile:</strong> ${escapeHtml(data.mobile)}</span>` : ''}
                    ${data.email ? `<span class="tmpl11-contact-item">${data.mobile ? '• ' : ''}<strong>Email:</strong> ${escapeHtml(data.email)}</span>` : ''}
                    ${data.address ? `<div class="tmpl11-contact-address"><strong>Address:</strong> ${escapeHtml(data.address)}</div>` : ''}
                </div>
            </header>

            ${data.objective ? `
                <section>
                    <h2 class="tmpl11-sec-title">Academic & Professional Summary</h2>
                    <p class="tmpl11-text">${escapeHtml(data.objective)}</p>
                </section>
            ` : ''}

            ${(data.education && data.education.length > 0) ? `
                <section>
                    <h2 class="tmpl11-sec-title">Education & Qualifications</h2>
                    <table class="tmpl11-table">
                        <thead>
                            <tr>
                                <th>Qualification</th>
                                <th>Institution</th>
                                <th>Year</th>
                                <th>Marks / Score</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${data.education.map(item => `
                                <tr>
                                    <td><strong>${escapeHtml(item.qual)}</strong></td>
                                    <td>${escapeHtml(item.inst)}</td>
                                    <td>${escapeHtml(item.year)}</td>
                                    <td>${escapeHtml(item.marks)}</td>
                                </tr>
                            `).join('')}
                        </tbody>
                    </table>
                </section>
            ` : ''}

            ${(data.skills && data.skills.filter(s => s && s.trim()).length > 0) ? `
                <section>
                    <h2 class="tmpl11-sec-title">Core Competencies & Skills</h2>
                    <ul class="tmpl11-list">
                        ${data.skills.filter(s => s && s.trim()).map(s => `<li>${escapeHtml(s)}</li>`).join('')}
                    </ul>
                </section>
            ` : ''}

            ${(data.certifications && data.certifications.length > 0) ? `
                <section>
                    <h2 class="tmpl11-sec-title">Certifications & Honors</h2>
                    <ul class="tmpl11-list">
                        ${data.certifications.map(c => `<li>${escapeHtml(c)}</li>`).join('')}
                    </ul>
                </section>
            ` : ''}

            ${(data.achievements && data.achievements.length > 0) ? `
                <section>
                    <h2 class="tmpl11-sec-title">Key Academic Achievements</h2>
                    <ul class="tmpl11-list">
                        ${data.achievements.map(a => `<li>${escapeHtml(a)}</li>`).join('')}
                    </ul>
                </section>
            ` : ''}

            <section>
                <h2 class="tmpl11-sec-title">Personal Details</h2>
                <div class="tmpl11-personal-grid">
                    ${data.personal?.dob ? `<div><strong>DOB:</strong> ${escapeHtml(data.personal.dob)}</div>` : ''}
                    ${data.personal?.gender ? `<div><strong>Gender:</strong> ${escapeHtml(data.personal.gender)}</div>` : ''}
                    ${guardianValue ? `<div><strong>${guardianLabel}:</strong> ${escapeHtml(guardianValue)}</div>` : ''}
                    ${data.personal?.marital ? `<div><strong>Status:</strong> ${escapeHtml(data.personal.marital)}</div>` : ''}
                    ${data.personal?.languages ? `<div><strong>Languages:</strong> ${escapeHtml(data.personal.languages)}</div>` : ''}
                    ${data.personal?.hobbies ? `<div><strong>Hobbies:</strong> ${escapeHtml(data.personal.hobbies)}</div>` : ''}
                </div>
            </section>
        </div>
    `;
}

/* TEMPLATE 12: EMERALD SENIOR FACULTY (Executive Leader) */
function renderTemplate12HTML(data) {
    const { guardianLabel, guardianValue } = getGuardianDetails(data);

    return `
        <div class="tmpl12-container">
            <header class="tmpl12-header">
                <div>
                    <h1 class="tmpl12-name">${escapeHtml(data.name || 'YOUR NAME')}</h1>
                    <div class="tmpl12-tagline">${escapeHtml(data.tagline || '')}</div>
                    <div class="tmpl12-contacts">
                        ${data.mobile ? `<span><i class="fa-solid fa-phone"></i> ${escapeHtml(data.mobile)}</span>` : ''}
                        ${data.email ? `<span><i class="fa-solid fa-envelope"></i> ${escapeHtml(data.email)}</span>` : ''}
                        ${data.address ? `<span><i class="fa-solid fa-location-dot"></i> ${escapeHtml(data.address)}</span>` : ''}
                    </div>
                </div>
                <div class="tmpl12-photo">
                    <img src="${data.photo || 'profile.jpg'}" alt="Photo" onerror="this.src='https://via.placeholder.com/90x105?text=Photo'">
                </div>
            </header>

            ${data.objective ? `
                <section>
                    <h2 class="tmpl12-sec-head">Career Objective / Profile Summary</h2>
                    <p class="tmpl12-text">${escapeHtml(data.objective)}</p>
                </section>
            ` : ''}

            ${(data.education && data.education.length > 0) ? `
                <section>
                    <h2 class="tmpl12-sec-head">Academic Qualifications</h2>
                    <table class="tmpl12-table">
                        <thead>
                            <tr>
                                <th>Qualification</th>
                                <th>Institution</th>
                                <th>Year</th>
                                <th>Marks / Score</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${data.education.map(item => `
                                <tr>
                                    <td><strong>${escapeHtml(item.qual)}</strong></td>
                                    <td>${escapeHtml(item.inst)}</td>
                                    <td>${escapeHtml(item.year)}</td>
                                    <td>${escapeHtml(item.marks)}</td>
                                </tr>
                            `).join('')}
                        </tbody>
                    </table>
                </section>
            ` : ''}

            ${(data.skills && data.skills.length > 0) ? `
                <section>
                    <h2 class="tmpl12-sec-head">Skills & Competencies</h2>
                    <div class="tmpl12-skills-grid">
                        ${data.skills.map(s => `<span class="tmpl12-skill-badge">${escapeHtml(s)}</span>`).join('')}
                    </div>
                </section>
            ` : ''}

            ${(data.certifications && data.certifications.length > 0) ? `
                <section>
                    <h2 class="tmpl12-sec-head">Certifications & Honors</h2>
                    ${data.certifications.map(c => `
                        <div class="tmpl12-cert-card">
                            <i class="fa-solid fa-medal"></i>
                            <span>${escapeHtml(c)}</span>
                        </div>
                    `).join('')}
                </section>
            ` : ''}

            ${(data.achievements && data.achievements.filter(a => a && a.trim()).length > 0) ? `
                <section>
                    <h2 class="tmpl12-sec-head">Key Achievements</h2>
                    <ul class="tmpl12-list" style="margin-top:0.2rem;">
                        ${data.achievements.filter(a => a && a.trim()).map(a => `<li>${escapeHtml(a)}</li>`).join('')}
                    </ul>
                </section>
            ` : ''}

            <section>
                <h2 class="tmpl12-sec-head">Personal Details</h2>
                <div class="tmpl12-personal-grid">
                    ${data.personal?.dob ? `<div><strong>DOB:</strong> ${escapeHtml(data.personal.dob)}</div>` : ''}
                    ${data.personal?.gender ? `<div><strong>Gender:</strong> ${escapeHtml(data.personal.gender)}</div>` : ''}
                    ${guardianValue ? `<div><strong>${guardianLabel}:</strong> ${escapeHtml(guardianValue)}</div>` : ''}
                    ${data.personal?.marital ? `<div><strong>Status:</strong> ${escapeHtml(data.personal.marital)}</div>` : ''}
                    ${data.personal?.languages ? `<div><strong>Languages:</strong> ${escapeHtml(data.personal.languages)}</div>` : ''}
                    ${data.personal?.hobbies ? `<div><strong>Hobbies:</strong> ${escapeHtml(data.personal.hobbies)}</div>` : ''}
                </div>
            </section>
        </div>
    `;
}

/* TEMPLATE 13: CAMBRIDGE EXECUTIVE ATS (Navy Minimalist) */
function renderTemplate13HTML(data) {
    const { guardianLabel, guardianValue } = getGuardianDetails(data);

    return `
        <div class="tmpl13-container">
            <header class="tmpl13-header">
                <div class="tmpl13-hinfo">
                    <h1 class="tmpl13-name">${escapeHtml(data.name || 'YOUR NAME')}</h1>
                    <p class="tmpl13-tagline">${escapeHtml(data.tagline || '')}</p>
                    <div class="tmpl13-contacts">
                        ${data.mobile ? `<span><i class="fa-solid fa-phone"></i> ${escapeHtml(data.mobile)}</span>` : ''}
                        ${data.email ? `<span><i class="fa-solid fa-envelope"></i> ${escapeHtml(data.email)}</span>` : ''}
                        ${data.address ? `<span><i class="fa-solid fa-location-dot"></i> ${escapeHtml(data.address)}</span>` : ''}
                    </div>
                </div>
                <div class="tmpl13-photo">
                    <img src="${data.photo || 'profile_sarah.jpg'}" alt="Photo" onerror="this.src='https://via.placeholder.com/90x105?text=Photo'">
                </div>
            </header>
            <div class="tmpl13-stripe"></div>

            ${data.objective ? `
                <section class="tmpl13-sec">
                    <h2 class="tmpl13-sec-title"><i class="fa-solid fa-user-check"></i> Executive Summary</h2>
                    <p class="tmpl13-text">${escapeHtml(data.objective)}</p>
                </section>
            ` : ''}

            ${(data.education && data.education.length > 0) ? `
                <section class="tmpl13-sec">
                    <h2 class="tmpl13-sec-title"><i class="fa-solid fa-graduation-cap"></i> Academic Qualifications</h2>
                    <table class="tmpl13-table">
                        <thead>
                            <tr>
                                <th>Qualification</th>
                                <th>Institution</th>
                                <th>Year</th>
                                <th>Score / Marks</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${data.education.map(item => `
                                <tr>
                                    <td><strong>${escapeHtml(item.qual)}</strong></td>
                                    <td>${escapeHtml(item.inst)}</td>
                                    <td>${escapeHtml(item.year)}</td>
                                    <td><span class="tmpl13-badge">${escapeHtml(item.marks)}</span></td>
                                </tr>
                            `).join('')}
                        </tbody>
                    </table>
                </section>
            ` : ''}

            ${(data.skills && data.skills.filter(s => s && s.trim()).length > 0) ? `
                <section class="tmpl13-sec">
                    <h2 class="tmpl13-sec-title"><i class="fa-solid fa-sliders"></i> Core Competencies & Skills</h2>
                    <div class="tmpl13-pills">
                        ${data.skills.filter(s => s && s.trim()).map(s => `<span class="tmpl13-pill">${escapeHtml(s)}</span>`).join('')}
                    </div>
                </section>
            ` : ''}

            ${(data.certifications && data.certifications.filter(c => c && c.trim()).length > 0) ? `
                <section class="tmpl13-sec">
                    <h2 class="tmpl13-sec-title"><i class="fa-solid fa-certificate"></i> Professional Certifications</h2>
                    <ul class="tmpl13-list">
                        ${data.certifications.filter(c => c && c.trim()).map(c => `<li>${escapeHtml(c)}</li>`).join('')}
                    </ul>
                </section>
            ` : ''}

            ${(data.achievements && data.achievements.filter(a => a && a.trim()).length > 0) ? `
                <section class="tmpl13-sec">
                    <h2 class="tmpl13-sec-title"><i class="fa-solid fa-trophy"></i> Key Honors & Achievements</h2>
                    <ul class="tmpl13-list">
                        ${data.achievements.filter(a => a && a.trim()).map(a => `<li>${escapeHtml(a)}</li>`).join('')}
                    </ul>
                </section>
            ` : ''}

            <section class="tmpl13-sec">
                <h2 class="tmpl13-sec-title"><i class="fa-solid fa-address-card"></i> Personal Details</h2>
                <div class="tmpl13-personal-grid">
                    ${data.personal?.dob ? `<div><strong>DOB:</strong> ${escapeHtml(data.personal.dob)}</div>` : ''}
                    ${data.personal?.gender ? `<div><strong>Gender:</strong> ${escapeHtml(data.personal.gender)}</div>` : ''}
                    ${guardianValue ? `<div><strong>${guardianLabel}:</strong> ${escapeHtml(guardianValue)}</div>` : ''}
                    ${data.personal?.marital ? `<div><strong>Status:</strong> ${escapeHtml(data.personal.marital)}</div>` : ''}
                    ${data.personal?.languages ? `<div><strong>Languages:</strong> ${escapeHtml(data.personal.languages)}</div>` : ''}
                    ${data.personal?.hobbies ? `<div><strong>Hobbies:</strong> ${escapeHtml(data.personal.hobbies)}</div>` : ''}
                </div>
            </section>
        </div>
    `;
}

/* TEMPLATE 14: SILICON VALLEY TECH LEAD (Teal & Mint) */
function renderTemplate14HTML(data) {
    const { guardianLabel, guardianValue } = getGuardianDetails(data);

    return `
        <div class="tmpl14-container">
            <header class="tmpl14-header">
                <div class="tmpl14-avatar">
                    <img src="${data.photo || 'profile_sarah.jpg'}" alt="Avatar" onerror="this.src='https://via.placeholder.com/95x110?text=Photo'">
                </div>
                <div class="tmpl14-hinfo">
                    <h1 class="tmpl14-name">${escapeHtml(data.name || 'YOUR NAME')}</h1>
                    <div class="tmpl14-role-badge">${escapeHtml(data.tagline || '')}</div>
                    <div class="tmpl14-contacts">
                        ${data.mobile ? `<span><i class="fa-solid fa-mobile-screen"></i> ${escapeHtml(data.mobile)}</span>` : ''}
                        ${data.email ? `<span><i class="fa-solid fa-envelope"></i> ${escapeHtml(data.email)}</span>` : ''}
                        ${data.address ? `<span><i class="fa-solid fa-map-location-dot"></i> ${escapeHtml(data.address)}</span>` : ''}
                    </div>
                </div>
            </header>

            <div class="tmpl14-body">
                ${data.objective ? `
                    <section class="tmpl14-sec">
                        <h2 class="tmpl14-heading">Professional Overview</h2>
                        <p class="tmpl14-text">${escapeHtml(data.objective)}</p>
                    </section>
                ` : ''}

                ${(data.skills && data.skills.filter(s => s && s.trim()).length > 0) ? `
                    <section class="tmpl14-sec">
                        <h2 class="tmpl14-heading">Skills & Technical Competencies</h2>
                        <div class="tmpl14-skills-grid">
                            ${data.skills.filter(s => s && s.trim()).map(s => `<span class="tmpl14-skill-tag"><i class="fa-solid fa-check"></i> ${escapeHtml(s)}</span>`).join('')}
                        </div>
                    </section>
                ` : ''}

                ${(data.education && data.education.length > 0) ? `
                    <section class="tmpl14-sec">
                        <h2 class="tmpl14-heading">Education History</h2>
                        <div class="tmpl14-edu-cards">
                            ${data.education.map(item => `
                                <div class="tmpl14-edu-card">
                                    <div class="tmpl14-edu-head">
                                        <strong>${escapeHtml(item.qual)}</strong>
                                        <span class="tmpl14-year">${escapeHtml(item.year)}</span>
                                    </div>
                                    <div class="tmpl14-inst">${escapeHtml(item.inst)} • Marks: <strong>${escapeHtml(item.marks)}</strong></div>
                                </div>
                            `).join('')}
                        </div>
                    </section>
                ` : ''}

                ${(data.certifications && data.certifications.filter(c => c && c.trim()).length > 0) ? `
                    <section class="tmpl14-sec">
                        <h2 class="tmpl14-heading">Certifications</h2>
                        <ul class="tmpl14-list">
                            ${data.certifications.filter(c => c && c.trim()).map(c => `<li>${escapeHtml(c)}</li>`).join('')}
                        </ul>
                    </section>
                ` : ''}

                ${(data.achievements && data.achievements.filter(a => a && a.trim()).length > 0) ? `
                    <section class="tmpl14-sec">
                        <h2 class="tmpl14-heading">Key Achievements</h2>
                        <ul class="tmpl14-list">
                            ${data.achievements.filter(a => a && a.trim()).map(a => `<li>${escapeHtml(a)}</li>`).join('')}
                        </ul>
                    </section>
                ` : ''}

                <section class="tmpl14-sec">
                    <h2 class="tmpl14-heading">Personal Details</h2>
                    <div class="tmpl14-personal-grid">
                        ${data.personal?.dob ? `<div><strong>DOB:</strong> ${escapeHtml(data.personal.dob)}</div>` : ''}
                        ${data.personal?.gender ? `<div><strong>Gender:</strong> ${escapeHtml(data.personal.gender)}</div>` : ''}
                        ${guardianValue ? `<div><strong>${guardianLabel}:</strong> ${escapeHtml(guardianValue)}</div>` : ''}
                        ${data.personal?.marital ? `<div><strong>Status:</strong> ${escapeHtml(data.personal.marital)}</div>` : ''}
                        ${data.personal?.languages ? `<div><strong>Languages:</strong> ${escapeHtml(data.personal.languages)}</div>` : ''}
                        ${data.personal?.hobbies ? `<div><strong>Hobbies:</strong> ${escapeHtml(data.personal.hobbies)}</div>` : ''}
                    </div>
                </section>
            </div>
        </div>
    `;
}

/* TEMPLATE 15: OXFORD SCHOLAR CLASSIC (Serif Double Rule) */
function renderTemplate15HTML(data) {
    const { guardianLabel, guardianValue } = getGuardianDetails(data);

    return `
        <div class="tmpl15-container">
            <header class="tmpl15-header">
                <div class="tmpl15-rule-top"></div>
                <div class="tmpl15-hflex">
                    <div class="tmpl15-hinfo">
                        <h1 class="tmpl15-name">${escapeHtml(data.name || 'YOUR NAME')}</h1>
                        <p class="tmpl15-tagline">${escapeHtml(data.tagline || '')}</p>
                        <div class="tmpl15-contacts">
                            ${data.mobile ? `<span>Mobile: ${escapeHtml(data.mobile)}</span>` : ''}
                            ${data.email ? `<span>• Email: ${escapeHtml(data.email)}</span>` : ''}
                            ${data.address ? `<span>• Address: ${escapeHtml(data.address)}</span>` : ''}
                        </div>
                    </div>
                    <div class="tmpl15-photo">
                        <img src="${data.photo || 'profile_sarah.jpg'}" alt="Photo" onerror="this.src='https://via.placeholder.com/90x105?text=Photo'">
                    </div>
                </div>
                <div class="tmpl15-rule-bot"></div>
            </header>

            ${data.objective ? `
                <section class="tmpl15-sec">
                    <h2 class="tmpl15-sec-head">Executive Summary</h2>
                    <p class="tmpl15-text">${escapeHtml(data.objective)}</p>
                </section>
            ` : ''}

            ${(data.education && data.education.length > 0) ? `
                <section class="tmpl15-sec">
                    <h2 class="tmpl15-sec-head">Academic Qualifications</h2>
                    <table class="tmpl15-table">
                        <thead>
                            <tr>
                                <th>Qualification</th>
                                <th>Board / Institution</th>
                                <th>Year</th>
                                <th>Score</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${data.education.map(item => `
                                <tr>
                                    <td><strong>${escapeHtml(item.qual)}</strong></td>
                                    <td>${escapeHtml(item.inst)}</td>
                                    <td>${escapeHtml(item.year)}</td>
                                    <td>${escapeHtml(item.marks)}</td>
                                </tr>
                            `).join('')}
                        </tbody>
                    </table>
                </section>
            ` : ''}

            ${(data.skills && data.skills.filter(s => s && s.trim()).length > 0) ? `
                <section class="tmpl15-sec">
                    <h2 class="tmpl15-sec-head">Core Skills & Expertise</h2>
                    <ul class="tmpl15-list">
                        ${data.skills.filter(s => s && s.trim()).map(s => `<li>${escapeHtml(s)}</li>`).join('')}
                    </ul>
                </section>
            ` : ''}

            ${(data.certifications && data.certifications.filter(c => c && c.trim()).length > 0) ? `
                <section class="tmpl15-sec">
                    <h2 class="tmpl15-sec-head">Certifications</h2>
                    <ul class="tmpl15-list">
                        ${data.certifications.filter(c => c && c.trim()).map(c => `<li>${escapeHtml(c)}</li>`).join('')}
                    </ul>
                </section>
            ` : ''}

            ${(data.achievements && data.achievements.filter(a => a && a.trim()).length > 0) ? `
                <section class="tmpl15-sec">
                    <h2 class="tmpl15-sec-head">Key Honors & Achievements</h2>
                    <ul class="tmpl15-list">
                        ${data.achievements.filter(a => a && a.trim()).map(a => `<li>${escapeHtml(a)}</li>`).join('')}
                    </ul>
                </section>
            ` : ''}

            <section class="tmpl15-sec">
                <h2 class="tmpl15-sec-head">Personal Details</h2>
                <div class="tmpl15-personal-grid">
                    ${data.personal?.dob ? `<div><strong>DOB:</strong> ${escapeHtml(data.personal.dob)}</div>` : ''}
                    ${data.personal?.gender ? `<div><strong>Gender:</strong> ${escapeHtml(data.personal.gender)}</div>` : ''}
                    ${guardianValue ? `<div><strong>${guardianLabel}:</strong> ${escapeHtml(guardianValue)}</div>` : ''}
                    ${data.personal?.marital ? `<div><strong>Status:</strong> ${escapeHtml(data.personal.marital)}</div>` : ''}
                    ${data.personal?.languages ? `<div><strong>Languages:</strong> ${escapeHtml(data.personal.languages)}</div>` : ''}
                    ${data.personal?.hobbies ? `<div><strong>Hobbies:</strong> ${escapeHtml(data.personal.hobbies)}</div>` : ''}
                </div>
            </section>
        </div>
    `;
}

/* TEMPLATE 16: TOKYO CONTEMPORARY (Obsidian & Slate) */
function renderTemplate16HTML(data) {
    const { guardianLabel, guardianValue } = getGuardianDetails(data);

    return `
        <div class="tmpl16-container">
            <header class="tmpl16-header">
                <div class="tmpl16-hleft">
                    <h1 class="tmpl16-name">${escapeHtml(data.name || 'YOUR NAME')}</h1>
                    <div class="tmpl16-tagline-pill">${escapeHtml(data.tagline || '')}</div>
                    <div class="tmpl16-contacts">
                        ${data.mobile ? `<span><i class="fa-solid fa-phone"></i> ${escapeHtml(data.mobile)}</span>` : ''}
                        ${data.email ? `<span><i class="fa-solid fa-envelope"></i> ${escapeHtml(data.email)}</span>` : ''}
                        ${data.address ? `<span><i class="fa-solid fa-location-dot"></i> ${escapeHtml(data.address)}</span>` : ''}
                    </div>
                </div>
                <div class="tmpl16-photo">
                    <img src="${data.photo || 'profile_sarah.jpg'}" alt="Photo" onerror="this.src='https://via.placeholder.com/90x105?text=Photo'">
                </div>
            </header>

            ${data.objective ? `
                <section class="tmpl16-sec">
                    <h2 class="tmpl16-sec-title">Profile Summary</h2>
                    <p class="tmpl16-text">${escapeHtml(data.objective)}</p>
                </section>
            ` : ''}

            ${(data.education && data.education.length > 0) ? `
                <section class="tmpl16-sec">
                    <h2 class="tmpl16-sec-title">Academic Qualifications</h2>
                    <div class="tmpl16-edu-grid">
                        ${data.education.map(item => `
                            <div class="tmpl16-edu-item">
                                <div class="tmpl16-edu-qual">${escapeHtml(item.qual)}</div>
                                <div class="tmpl16-edu-inst">${escapeHtml(item.inst)}</div>
                                <div class="tmpl16-edu-meta"><span>Year: ${escapeHtml(item.year)}</span> <span>Score: <strong>${escapeHtml(item.marks)}</strong></span></div>
                            </div>
                        `).join('')}
                    </div>
                </section>
            ` : ''}

            ${(data.skills && data.skills.filter(s => s && s.trim()).length > 0) ? `
                <section class="tmpl16-sec">
                    <h2 class="tmpl16-sec-title">Skills & Expertise</h2>
                    <div class="tmpl16-skills">
                        ${data.skills.filter(s => s && s.trim()).map(s => `<span class="tmpl16-skill-badge">${escapeHtml(s)}</span>`).join('')}
                    </div>
                </section>
            ` : ''}

            ${(data.certifications && data.certifications.filter(c => c && c.trim()).length > 0) ? `
                <section class="tmpl16-sec">
                    <h2 class="tmpl16-sec-title">Certifications</h2>
                    <ul class="tmpl16-list">
                        ${data.certifications.filter(c => c && c.trim()).map(c => `<li>${escapeHtml(c)}</li>`).join('')}
                    </ul>
                </section>
            ` : ''}

            ${(data.achievements && data.achievements.filter(a => a && a.trim()).length > 0) ? `
                <section class="tmpl16-sec">
                    <h2 class="tmpl16-sec-title">Key Achievements</h2>
                    <ul class="tmpl16-list">
                        ${data.achievements.filter(a => a && a.trim()).map(a => `<li>${escapeHtml(a)}</li>`).join('')}
                    </ul>
                </section>
            ` : ''}

            <section class="tmpl16-sec">
                <h2 class="tmpl16-sec-title">Personal Details</h2>
                <div class="tmpl16-personal-grid">
                    ${data.personal?.dob ? `<div><strong>DOB:</strong> ${escapeHtml(data.personal.dob)}</div>` : ''}
                    ${data.personal?.gender ? `<div><strong>Gender:</strong> ${escapeHtml(data.personal.gender)}</div>` : ''}
                    ${guardianValue ? `<div><strong>${guardianLabel}:</strong> ${escapeHtml(guardianValue)}</div>` : ''}
                    ${data.personal?.marital ? `<div><strong>Status:</strong> ${escapeHtml(data.personal.marital)}</div>` : ''}
                    ${data.personal?.languages ? `<div><strong>Languages:</strong> ${escapeHtml(data.personal.languages)}</div>` : ''}
                    ${data.personal?.hobbies ? `<div><strong>Hobbies:</strong> ${escapeHtml(data.personal.hobbies)}</div>` : ''}
                </div>
            </section>
        </div>
    `;
}

/* TEMPLATE 17: IMPERIAL EXECUTIVE (Indigo & Gold Accent) */
function renderTemplate17HTML(data) {
    const { guardianLabel, guardianValue } = getGuardianDetails(data);

    return `
        <div class="tmpl17-container">
            <header class="tmpl17-header">
                <div class="tmpl17-hleft">
                    <h1 class="tmpl17-name">${escapeHtml(data.name || 'YOUR NAME')}</h1>
                    <p class="tmpl17-tagline">${escapeHtml(data.tagline || '')}</p>
                    <div class="tmpl17-contacts">
                        ${data.mobile ? `<span><i class="fa-solid fa-phone"></i> ${escapeHtml(data.mobile)}</span>` : ''}
                        ${data.email ? `<span><i class="fa-solid fa-envelope"></i> ${escapeHtml(data.email)}</span>` : ''}
                        ${data.address ? `<span><i class="fa-solid fa-location-dot"></i> ${escapeHtml(data.address)}</span>` : ''}
                    </div>
                </div>
                <div class="tmpl17-photo">
                    <img src="${data.photo || 'profile_sarah.jpg'}" alt="Photo" onerror="this.src='https://via.placeholder.com/90x105?text=Photo'">
                </div>
            </header>

            ${data.objective ? `
                <section class="tmpl17-sec">
                    <h2 class="tmpl17-title"><i class="fa-solid fa-briefcase"></i> Executive Profile</h2>
                    <p class="tmpl17-text">${escapeHtml(data.objective)}</p>
                </section>
            ` : ''}

            ${(data.education && data.education.length > 0) ? `
                <section class="tmpl17-sec">
                    <h2 class="tmpl17-title"><i class="fa-solid fa-graduation-cap"></i> Education & Academic Background</h2>
                    <table class="tmpl17-table">
                        <thead>
                            <tr>
                                <th>Qualification / Degree</th>
                                <th>Board / Institution</th>
                                <th>Passing Year</th>
                                <th>Score / Grade</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${data.education.map(item => `
                                <tr>
                                    <td><strong>${escapeHtml(item.qual)}</strong></td>
                                    <td>${escapeHtml(item.inst)}</td>
                                    <td>${escapeHtml(item.year)}</td>
                                    <td><span class="tmpl17-badge">${escapeHtml(item.marks)}</span></td>
                                </tr>
                            `).join('')}
                        </tbody>
                    </table>
                </section>
            ` : ''}

            ${(data.skills && data.skills.filter(s => s && s.trim()).length > 0) ? `
                <section class="tmpl17-sec">
                    <h2 class="tmpl17-title"><i class="fa-solid fa-star"></i> Core Competencies & Skills</h2>
                    <div class="tmpl17-skills-grid">
                        ${data.skills.filter(s => s && s.trim()).map(s => `<span class="tmpl17-skill-card"><i class="fa-solid fa-check-double"></i> ${escapeHtml(s)}</span>`).join('')}
                    </div>
                </section>
            ` : ''}

            ${(data.certifications && data.certifications.filter(c => c && c.trim()).length > 0) ? `
                <section class="tmpl17-sec">
                    <h2 class="tmpl17-title"><i class="fa-solid fa-certificate"></i> Professional Certifications</h2>
                    <ul class="tmpl17-list">
                        ${data.certifications.filter(c => c && c.trim()).map(c => `<li>${escapeHtml(c)}</li>`).join('')}
                    </ul>
                </section>
            ` : ''}

            ${(data.achievements && data.achievements.filter(a => a && a.trim()).length > 0) ? `
                <section class="tmpl17-sec">
                    <h2 class="tmpl17-title"><i class="fa-solid fa-award"></i> Key Achievements & Awards</h2>
                    <ul class="tmpl17-list">
                        ${data.achievements.filter(a => a && a.trim()).map(a => `<li>${escapeHtml(a)}</li>`).join('')}
                    </ul>
                </section>
            ` : ''}

            <section class="tmpl17-sec">
                <h2 class="tmpl17-title"><i class="fa-solid fa-user"></i> Personal Details</h2>
                <div class="tmpl17-personal-grid">
                    ${data.personal?.dob ? `<div><strong>DOB:</strong> ${escapeHtml(data.personal.dob)}</div>` : ''}
                    ${data.personal?.gender ? `<div><strong>Gender:</strong> ${escapeHtml(data.personal.gender)}</div>` : ''}
                    ${guardianValue ? `<div><strong>${guardianLabel}:</strong> ${escapeHtml(guardianValue)}</div>` : ''}
                    ${data.personal?.marital ? `<div><strong>Status:</strong> ${escapeHtml(data.personal.marital)}</div>` : ''}
                    ${data.personal?.languages ? `<div><strong>Languages:</strong> ${escapeHtml(data.personal.languages)}</div>` : ''}
                    ${data.personal?.hobbies ? `<div><strong>Hobbies:</strong> ${escapeHtml(data.personal.hobbies)}</div>` : ''}
                </div>
            </section>
        </div>
    `;
}

/* TEMPLATE 18: ZURICH MINIMALIST (Clean Swiss Monochrome) */
function renderTemplate18HTML(data) {
    const { guardianLabel, guardianValue } = getGuardianDetails(data);

    return `
        <div class="tmpl18-container">
            <header class="tmpl18-header">
                <div class="tmpl18-hleft">
                    <h1 class="tmpl18-name">${escapeHtml(data.name || 'YOUR NAME')}</h1>
                    <p class="tmpl18-tagline">${escapeHtml(data.tagline || '')}</p>
                    <div class="tmpl18-contacts">
                        ${data.mobile ? `<span>Mobile: ${escapeHtml(data.mobile)}</span>` : ''}
                        ${data.email ? `<span>• Email: ${escapeHtml(data.email)}</span>` : ''}
                        ${data.address ? `<span>• Address: ${escapeHtml(data.address)}</span>` : ''}
                    </div>
                </div>
                <div class="tmpl18-photo">
                    <img src="${data.photo || 'profile_sarah.jpg'}" alt="Photo" onerror="this.src='https://via.placeholder.com/90x105?text=Photo'">
                </div>
            </header>

            ${data.objective ? `
                <section class="tmpl18-sec">
                    <h2 class="tmpl18-title">SUMMARY</h2>
                    <p class="tmpl18-text">${escapeHtml(data.objective)}</p>
                </section>
            ` : ''}

            ${(data.education && data.education.length > 0) ? `
                <section class="tmpl18-sec">
                    <h2 class="tmpl18-title">EDUCATION</h2>
                    <div class="tmpl18-edu-list">
                        ${data.education.map(item => `
                            <div class="tmpl18-edu-row">
                                <div class="tmpl18-edu-left">
                                    <strong>${escapeHtml(item.qual)}</strong>
                                    <div class="tmpl18-inst">${escapeHtml(item.inst)}</div>
                                </div>
                                <div class="tmpl18-edu-right">
                                    <span>${escapeHtml(item.year)}</span>
                                    <span class="tmpl18-score">${escapeHtml(item.marks)}</span>
                                </div>
                            </div>
                        `).join('')}
                    </div>
                </section>
            ` : ''}

            ${(data.skills && data.skills.filter(s => s && s.trim()).length > 0) ? `
                <section class="tmpl18-sec">
                    <h2 class="tmpl18-title">SKILLS & EXPERTISE</h2>
                    <div class="tmpl18-skills">
                        ${data.skills.filter(s => s && s.trim()).map(s => `<span class="tmpl18-skill-tag">${escapeHtml(s)}</span>`).join('')}
                    </div>
                </section>
            ` : ''}

            ${(data.certifications && data.certifications.filter(c => c && c.trim()).length > 0) ? `
                <section class="tmpl18-sec">
                    <h2 class="tmpl18-title">CERTIFICATIONS</h2>
                    <ul class="tmpl18-list">
                        ${data.certifications.filter(c => c && c.trim()).map(c => `<li>${escapeHtml(c)}</li>`).join('')}
                    </ul>
                </section>
            ` : ''}

            ${(data.achievements && data.achievements.filter(a => a && a.trim()).length > 0) ? `
                <section class="tmpl18-sec">
                    <h2 class="tmpl18-title">KEY ACHIEVEMENTS</h2>
                    <ul class="tmpl18-list">
                        ${data.achievements.filter(a => a && a.trim()).map(a => `<li>${escapeHtml(a)}</li>`).join('')}
                    </ul>
                </section>
            ` : ''}

            <section class="tmpl18-sec">
                <h2 class="tmpl18-title">PERSONAL DETAILS</h2>
                <div class="tmpl18-personal-grid">
                    ${data.personal?.dob ? `<div><strong>DOB:</strong> ${escapeHtml(data.personal.dob)}</div>` : ''}
                    ${data.personal?.gender ? `<div><strong>Gender:</strong> ${escapeHtml(data.personal.gender)}</div>` : ''}
                    ${guardianValue ? `<div><strong>${guardianLabel}:</strong> ${escapeHtml(guardianValue)}</div>` : ''}
                    ${data.personal?.marital ? `<div><strong>Status:</strong> ${escapeHtml(data.personal.marital)}</div>` : ''}
                    ${data.personal?.languages ? `<div><strong>Languages:</strong> ${escapeHtml(data.personal.languages)}</div>` : ''}
                    ${data.personal?.hobbies ? `<div><strong>Hobbies:</strong> ${escapeHtml(data.personal.hobbies)}</div>` : ''}
                </div>
            </section>
        </div>
    `;
}

/* TEMPLATE 19: PACIFIC FACULTY (Cobalt Senior Dean) */
function renderTemplate19HTML(data) {
    const { guardianLabel, guardianValue } = getGuardianDetails(data);

    return `
        <div class="tmpl19-container">
            <header class="tmpl19-header">
                <div class="tmpl19-hleft">
                    <h1 class="tmpl19-name">${escapeHtml(data.name || 'YOUR NAME')}</h1>
                    <div class="tmpl19-role">${escapeHtml(data.tagline || '')}</div>
                    <div class="tmpl19-contacts">
                        ${data.mobile ? `<span><i class="fa-solid fa-phone"></i> ${escapeHtml(data.mobile)}</span>` : ''}
                        ${data.email ? `<span><i class="fa-solid fa-envelope"></i> ${escapeHtml(data.email)}</span>` : ''}
                        ${data.address ? `<span><i class="fa-solid fa-location-dot"></i> ${escapeHtml(data.address)}</span>` : ''}
                    </div>
                </div>
                <div class="tmpl19-photo">
                    <img src="${data.photo || 'profile_sarah.jpg'}" alt="Photo" onerror="this.src='https://via.placeholder.com/90x105?text=Photo'">
                </div>
            </header>

            ${data.objective ? `
                <section class="tmpl19-sec">
                    <h2 class="tmpl19-sec-title">Faculty & Research Profile</h2>
                    <p class="tmpl19-text">${escapeHtml(data.objective)}</p>
                </section>
            ` : ''}

            ${(data.education && data.education.length > 0) ? `
                <section class="tmpl19-sec">
                    <h2 class="tmpl19-sec-title">Academic Qualifications</h2>
                    <table class="tmpl19-table">
                        <thead>
                            <tr>
                                <th>Degree / Diploma</th>
                                <th>University / Board</th>
                                <th>Year</th>
                                <th>Result / Marks</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${data.education.map(item => `
                                <tr>
                                    <td><strong>${escapeHtml(item.qual)}</strong></td>
                                    <td>${escapeHtml(item.inst)}</td>
                                    <td>${escapeHtml(item.year)}</td>
                                    <td><span class="tmpl19-badge">${escapeHtml(item.marks)}</span></td>
                                </tr>
                            `).join('')}
                        </tbody>
                    </table>
                </section>
            ` : ''}

            ${(data.skills && data.skills.filter(s => s && s.trim()).length > 0) ? `
                <section class="tmpl19-sec">
                    <h2 class="tmpl19-sec-title">Teaching & Domain Expertise</h2>
                    <div class="tmpl19-skills">
                        ${data.skills.filter(s => s && s.trim()).map(s => `<span class="tmpl19-skill-badge">${escapeHtml(s)}</span>`).join('')}
                    </div>
                </section>
            ` : ''}

            ${(data.certifications && data.certifications.filter(c => c && c.trim()).length > 0) ? `
                <section class="tmpl19-sec">
                    <h2 class="tmpl19-sec-title">Certifications</h2>
                    <ul class="tmpl19-list">
                        ${data.certifications.filter(c => c && c.trim()).map(c => `<li>${escapeHtml(c)}</li>`).join('')}
                    </ul>
                </section>
            ` : ''}

            ${(data.achievements && data.achievements.filter(a => a && a.trim()).length > 0) ? `
                <section class="tmpl19-sec">
                    <h2 class="tmpl19-sec-title">Honors & Academic Achievements</h2>
                    <ul class="tmpl19-list">
                        ${data.achievements.filter(a => a && a.trim()).map(a => `<li>${escapeHtml(a)}</li>`).join('')}
                    </ul>
                </section>
            ` : ''}

            <section class="tmpl19-sec">
                <h2 class="tmpl19-sec-title">Personal Overview</h2>
                <div class="tmpl19-personal-grid">
                    ${data.personal?.dob ? `<div><strong>DOB:</strong> ${escapeHtml(data.personal.dob)}</div>` : ''}
                    ${data.personal?.gender ? `<div><strong>Gender:</strong> ${escapeHtml(data.personal.gender)}</div>` : ''}
                    ${guardianValue ? `<div><strong>${guardianLabel}:</strong> ${escapeHtml(guardianValue)}</div>` : ''}
                    ${data.personal?.marital ? `<div><strong>Status:</strong> ${escapeHtml(data.personal.marital)}</div>` : ''}
                    ${data.personal?.languages ? `<div><strong>Languages:</strong> ${escapeHtml(data.personal.languages)}</div>` : ''}
                    ${data.personal?.hobbies ? `<div><strong>Hobbies:</strong> ${escapeHtml(data.personal.hobbies)}</div>` : ''}
                </div>
            </section>
        </div>
    `;
}

/* TEMPLATE 20: MONACO MODERN (Charcoal & Rose Gold) */
function renderTemplate20HTML(data) {
    const { guardianLabel, guardianValue } = getGuardianDetails(data);

    return `
        <div class="tmpl20-container">
            <header class="tmpl20-header">
                <div class="tmpl20-hleft">
                    <h1 class="tmpl20-name">${escapeHtml(data.name || 'YOUR NAME')}</h1>
                    <div class="tmpl20-role-tag">${escapeHtml(data.tagline || '')}</div>
                    <div class="tmpl20-contacts">
                        ${data.mobile ? `<span><i class="fa-solid fa-mobile-screen"></i> ${escapeHtml(data.mobile)}</span>` : ''}
                        ${data.email ? `<span><i class="fa-solid fa-envelope"></i> ${escapeHtml(data.email)}</span>` : ''}
                        ${data.address ? `<span><i class="fa-solid fa-location-dot"></i> ${escapeHtml(data.address)}</span>` : ''}
                    </div>
                </div>
                <div class="tmpl20-photo">
                    <img src="${data.photo || 'profile_sarah.jpg'}" alt="Photo" onerror="this.src='https://via.placeholder.com/90x105?text=Photo'">
                </div>
            </header>

            ${data.objective ? `
                <section class="tmpl20-sec">
                    <h2 class="tmpl20-sec-title">Career Summary</h2>
                    <p class="tmpl20-text">${escapeHtml(data.objective)}</p>
                </section>
            ` : ''}

            ${(data.education && data.education.length > 0) ? `
                <section class="tmpl20-sec">
                    <h2 class="tmpl20-sec-title">Education & Qualifications</h2>
                    <div class="tmpl20-edu-grid">
                        ${data.education.map(item => `
                            <div class="tmpl20-edu-card">
                                <div class="tmpl20-edu-qual">${escapeHtml(item.qual)}</div>
                                <div class="tmpl20-edu-inst">${escapeHtml(item.inst)}</div>
                                <div class="tmpl20-edu-meta"><span>${escapeHtml(item.year)}</span> <span class="tmpl20-score">Score: ${escapeHtml(item.marks)}</span></div>
                            </div>
                        `).join('')}
                    </div>
                </section>
            ` : ''}

            ${(data.skills && data.skills.filter(s => s && s.trim()).length > 0) ? `
                <section class="tmpl20-sec">
                    <h2 class="tmpl20-sec-title">Key Competencies</h2>
                    <div class="tmpl20-skills">
                        ${data.skills.filter(s => s && s.trim()).map(s => `<span class="tmpl20-skill-pill">${escapeHtml(s)}</span>`).join('')}
                    </div>
                </section>
            ` : ''}

            ${(data.certifications && data.certifications.filter(c => c && c.trim()).length > 0) ? `
                <section class="tmpl20-sec">
                    <h2 class="tmpl20-sec-title">Certifications</h2>
                    <ul class="tmpl20-list">
                        ${data.certifications.filter(c => c && c.trim()).map(c => `<li>${escapeHtml(c)}</li>`).join('')}
                    </ul>
                </section>
            ` : ''}

            ${(data.achievements && data.achievements.filter(a => a && a.trim()).length > 0) ? `
                <section class="tmpl20-sec">
                    <h2 class="tmpl20-sec-title">Key Achievements</h2>
                    <ul class="tmpl20-list">
                        ${data.achievements.filter(a => a && a.trim()).map(a => `<li>${escapeHtml(a)}</li>`).join('')}
                    </ul>
                </section>
            ` : ''}

            <section class="tmpl20-sec">
                <h2 class="tmpl20-sec-title">Personal Details</h2>
                <div class="tmpl20-personal-grid">
                    ${data.personal?.dob ? `<div><strong>DOB:</strong> ${escapeHtml(data.personal.dob)}</div>` : ''}
                    ${data.personal?.gender ? `<div><strong>Gender:</strong> ${escapeHtml(data.personal.gender)}</div>` : ''}
                    ${guardianValue ? `<div><strong>${guardianLabel}:</strong> ${escapeHtml(guardianValue)}</div>` : ''}
                    ${data.personal?.marital ? `<div><strong>Status:</strong> ${escapeHtml(data.personal.marital)}</div>` : ''}
                    ${data.personal?.languages ? `<div><strong>Languages:</strong> ${escapeHtml(data.personal.languages)}</div>` : ''}
                    ${data.personal?.hobbies ? `<div><strong>Hobbies:</strong> ${escapeHtml(data.personal.hobbies)}</div>` : ''}
                </div>
            </section>
        </div>
    `;
}
