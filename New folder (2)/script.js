// Global variables
let currentChallenge = 0;
let currentTab = 'html';
let currentDay = 1;

// Monaco Editor instances
let monacoEditor = null;
let monacoEditorMain = null;
let monacoEditorLesson = null;
let currentModalChallenge = null;

// LocalStorage Functions
function saveToLocalStorage(key, data) {
    try {
        localStorage.setItem(key, JSON.stringify(data));
    } catch (error) {
        console.error('Error saving to localStorage:', error);
    }
}

function getFromLocalStorage(key, defaultValue = null) {
    try {
        const item = localStorage.getItem(key);
        return item ? JSON.parse(item) : defaultValue;
    } catch (error) {
        console.error('Error reading from localStorage:', error);
        return defaultValue;
    }
}

// Navigation and UI Functions
function setupNavigation() {
    // Mobile menu toggle
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
    }
    
    // Close mobile menu when clicking on a link
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (hamburger && navMenu) {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            }
        });
    });
    
    // Smooth scrolling for navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // Active navigation highlighting
    window.addEventListener('scroll', () => {
        const sections = document.querySelectorAll('section[id]');
        const scrollPos = window.scrollY + 100;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            const navLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);
            
            if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                navLinks.forEach(link => link.classList.remove('active'));
                if (navLink) navLink.classList.add('active');
            }
        });
    });
}

function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}

function setupTabs() {
    const tabButtons = document.querySelectorAll('.tab-button');
    const tabPanels = document.querySelectorAll('.challenge-panel');
    
    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            const targetTab = button.getAttribute('data-tab');
            
            // Remove active class from all buttons and panels
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabPanels.forEach(panel => panel.classList.remove('active'));
            
            // Add active class to clicked button and corresponding panel
            button.classList.add('active');
            const targetPanel = document.querySelector(`.challenge-panel[data-tab="${targetTab}"]`);
            if (targetPanel) {
                targetPanel.classList.add('active');
            }
        });
    });
}

function loadChallenge() {
    const challenges = window.challenges || [];
    if (challenges.length === 0) return;
    
    const challenge = challenges[currentChallenge];
    if (!challenge) return;
    
    // Update challenge content
    const titleElement = document.getElementById('challenge-title');
    const descriptionElement = document.getElementById('challenge-description');
    
    if (titleElement) titleElement.textContent = challenge.title;
    if (descriptionElement) descriptionElement.textContent = challenge.description;
    
    // Update code editor
    if (monacoEditor) {
        monacoEditor.setValue(challenge.initialCode || '');
    }
    
    updateChallengeNavigation();
}

function runCode() {
    const code = monacoEditor ? monacoEditor.getValue() : '';
    const outputFrame = document.getElementById('output-frame');
    
    if (outputFrame) {
        const htmlContent = `
            <!DOCTYPE html>
            <html>
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Code Output</title>
                <style>
                    body { margin: 0; padding: 20px; font-family: Arial, sans-serif; }
                </style>
            </head>
            <body>
                ${code}
            </body>
            </html>
        `;
        
        outputFrame.srcdoc = htmlContent;
    }
}

function resetCode() {
    const challenges = window.challenges || [];
    if (challenges[currentChallenge]) {
        const initialCode = challenges[currentChallenge].initialCode || '';
        if (monacoEditor) {
            monacoEditor.setValue(initialCode);
        }
    }
}

function checkCode(code) {
    const challenges = window.challenges || [];
    const challenge = challenges[currentChallenge];
    
    if (!challenge || !challenge.validation) return true;
    
    return challenge.validation(code);
}

function showSuccessMessage() {
    const outputFrame = document.getElementById('output-frame');
    if (outputFrame) {
        outputFrame.innerHTML = `
            <div style="display: flex; align-items: center; justify-content: center; height: 100%; background: #00D4AA; color: white; font-size: 1.2rem; font-weight: bold;">
                <i class="fas fa-check-circle" style="margin-right: 10px; font-size: 2rem;"></i>
                Challenge Completed Successfully!
            </div>
        `;
    }
}

function nextChallenge() {
    const challenges = window.challenges || [];
    if (currentChallenge < challenges.length - 1) {
        currentChallenge++;
        loadChallenge();
    }
}

function previousChallenge() {
    if (currentChallenge > 0) {
        currentChallenge--;
        loadChallenge();
    }
}

function updateChallengeNavigation() {
    const challenges = window.challenges || [];
    const prevButton = document.querySelector('.nav-button:first-child');
    const nextButton = document.querySelector('.nav-button:last-child');
    
    if (prevButton) {
        prevButton.disabled = currentChallenge === 0;
    }
    
    if (nextButton) {
        nextButton.disabled = currentChallenge === challenges.length - 1;
    }
}

function updateProgress() {
    // Update progress display if needed
    const progressElements = document.querySelectorAll('.progress-indicator');
    progressElements.forEach(element => {
        const challenges = window.challenges || [];
        const progress = challenges.length > 0 ? ((currentChallenge + 1) / challenges.length) * 100 : 0;
        element.style.width = `${progress}%`;
    });
}

function checkAchievements() {
    // Check for achievements based on progress
    const challenges = window.challenges || [];
    const completedChallenges = currentChallenge + 1;
    
    if (completedChallenges === challenges.length) {
        console.log('🎉 All challenges completed!');
    }
}

function setupDayCards() {
    const dayCards = document.querySelectorAll('.day-card');
    
    dayCards.forEach((card, index) => {
        card.addEventListener('click', () => {
            currentDay = index + 1;
            // Handle day card click - could open lesson modal or navigate to day page
            console.log(`Day ${currentDay} selected`);
        });
    });
}

function animateOnScroll() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    const animatedElements = document.querySelectorAll('.day-card, .resource-card, .game-card');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
}

function setupLessonModal() {
    const lessonModal = document.getElementById('lessonModal');
    const closeButton = lessonModal?.querySelector('.close-modal');
    
    if (closeButton) {
        closeButton.addEventListener('click', closeLessonModal);
    }
    
    // Close modal when clicking outside
    if (lessonModal) {
        lessonModal.addEventListener('click', (e) => {
            if (e.target === lessonModal) {
                closeLessonModal();
            }
        });
    }
    
    // Setup lesson tabs
    const lessonTabs = document.querySelectorAll('.lesson-tab');
    const lessonPanels = document.querySelectorAll('.lesson-panel');
    
    lessonTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const targetTab = tab.getAttribute('data-tab');
            
            // Remove active class from all tabs and panels
            lessonTabs.forEach(t => t.classList.remove('active'));
            lessonPanels.forEach(p => p.classList.remove('active'));
            
            // Add active class to clicked tab and corresponding panel
            tab.classList.add('active');
            const targetPanel = document.getElementById(`${targetTab}-content`);
            if (targetPanel) {
                targetPanel.classList.add('active');
            }
        });
    });
}

function openDayLesson(dayNumber) {
    const lessonModal = document.getElementById('lessonModal');
    const lessonTitle = document.getElementById('lessonTitle');
    
    if (lessonModal && lessonTitle) {
        lessonTitle.textContent = `Day ${dayNumber}: ${getDayTitle(dayNumber)}`;
        lessonModal.classList.add('active');
        
        // Load day content
        loadDayContent(dayNumber);
        
        // Initialize Monaco editor for lesson
        setTimeout(() => {
            if (monacoEditorLesson) {
                monacoEditorLesson.layout();
            }
        }, 100);
    }
}

function closeLessonModal() {
    const lessonModal = document.getElementById('lessonModal');
    if (lessonModal) {
        lessonModal.classList.remove('active');
    }
}

function getDayTitle(dayNumber) {
    const dayTitles = {
        1: 'HTML Fundamentals',
        2: 'HTML Forms & Media',
        3: 'CSS Basics',
        4: 'CSS Layout',
        5: 'Box Model & Styling',
        6: 'JavaScript Basics',
        7: 'Conditions, Logic & Functions',
        8: 'Arrays & Loops',
        'final': 'Final Project'
    };
    
    return dayTitles[dayNumber] || 'Web Development';
}

function loadDayContent(dayNumber) {
    // Load day-specific content
    const documentationContent = document.getElementById('documentation-content');
    if (documentationContent) {
        documentationContent.innerHTML = `
            <div class="lesson-documentation">
                <h3>Day ${dayNumber} Content</h3>
                <p>This is the content for Day ${dayNumber}. Click on the Challenge tab to start coding!</p>
                
                <h4>Learning Objectives</h4>
                <ul>
                    <li>Understand the fundamentals</li>
                    <li>Practice with hands-on exercises</li>
                    <li>Complete the day's challenges</li>
                </ul>
                
                <div class="lesson-navigation">
                    <button class="nav-btn" onclick="previousLesson()">
                        <i class="fas fa-chevron-left"></i> Previous
                    </button>
                    <button class="nav-btn primary" onclick="startChallenge()">
                        Start Challenge <i class="fas fa-chevron-right"></i>
                    </button>
                </div>
            </div>
        `;
    }
}

function loadDayChallenge(dayNumber) {
    // Load day-specific challenge
    const challengeContent = document.getElementById('challenge-content');
    if (challengeContent) {
        challengeContent.innerHTML = `
            <div class="lesson-challenge">
                <div class="challenge-header">
                    <h3>Day ${dayNumber} Challenge</h3>
                    <div class="challenge-meta">
                        <span class="difficulty">Beginner</span>
                        <span class="time">10 min</span>
                    </div>
                </div>
                <div class="challenge-description">
                    <p>Complete the challenge for Day ${dayNumber}.</p>
                </div>
                <div class="code-editor">
                    <div class="editor-header">
                        <span>Code Editor</span>
                        <button class="run-button" onclick="runCode()">
                            <i class="fas fa-play"></i> Run Code
                        </button>
                    </div>
                    <div id="monaco-editor-lesson" class="monaco-editor-container"></div>
                </div>
                <div class="output-panel">
                    <div class="output-header">
                        <span>Output</span>
                        <button class="reset-button" onclick="resetCode()">
                            <i class="fas fa-undo"></i> Reset
                        </button>
                    </div>
                    <div id="output-frame"></div>
                </div>
            </div>
        `;
        
        // Initialize Monaco editor for challenge
        setTimeout(() => {
            initializeLessonMonacoEditor();
        }, 100);
    }
}

function startChallenge() {
    // Switch to challenge tab
    const challengeTab = document.querySelector('.lesson-tab[data-tab="challenge"]');
    if (challengeTab) {
        challengeTab.click();
    }
}

function completeDay(dayNumber) {
    console.log(`Day ${dayNumber} completed!`);
    // Handle day completion
}

function previousLesson() {
    if (currentDay > 1) {
        currentDay--;
        loadDayContent(currentDay);
    }
}

function copyCode(button) {
    const codeBlock = button.closest('.code-example').querySelector('code');
    const textArea = document.createElement('textarea');
    textArea.value = codeBlock.textContent;
    document.body.appendChild(textArea);
    textArea.select();
    document.execCommand('copy');
    document.body.removeChild(textArea);
    
    // Show feedback
    const originalText = button.innerHTML;
    button.innerHTML = '<i class="fas fa-check"></i>';
    button.style.background = '#00D4AA';
    
    setTimeout(() => {
        button.innerHTML = originalText;
        button.style.background = '';
    }, 2000);
}

function getLanguageForChallenge(challengeType) {
    const languageMap = {
        'html': 'html',
        'css': 'css',
        'javascript': 'javascript',
        'js': 'javascript'
    };
    
    return languageMap[challengeType] || 'html';
}

// Monaco Editor Functions
function initializeMonacoEditor() {
    if (typeof monaco === 'undefined') {
        console.warn('Monaco Editor not loaded');
        return;
    }
    
    const editorContainer = document.getElementById('monaco-editor');
    if (!editorContainer) return;
    
    monacoEditor = monaco.editor.create(editorContainer, {
        value: '',
        language: 'html',
        theme: 'vs-dark',
        automaticLayout: true,
        minimap: { enabled: false },
        scrollBeyondLastLine: false,
        fontSize: 14,
        lineNumbers: 'on',
        roundedSelection: false,
        scrollbar: {
            vertical: 'visible',
            horizontal: 'visible'
        }
    });
    
    // Load initial challenge
    loadChallenge();
}

function initializeMainMonacoEditor() {
    if (typeof monaco === 'undefined') {
        console.warn('Monaco Editor not loaded');
        return;
    }
    
    const editorContainer = document.getElementById('monaco-editor-main');
    if (!editorContainer) return;
    
    monacoEditorMain = monaco.editor.create(editorContainer, {
        value: '',
        language: 'html',
        theme: 'vs-dark',
        automaticLayout: true,
        minimap: { enabled: false },
        scrollBeyondLastLine: false,
        fontSize: 14,
        lineNumbers: 'on',
        roundedSelection: false,
        scrollbar: {
            vertical: 'visible',
            horizontal: 'visible'
        }
    });
}

function initializeLessonMonacoEditor() {
    if (typeof monaco === 'undefined') {
        console.warn('Monaco Editor not loaded');
        return;
    }
    
    const editorContainer = document.getElementById('monaco-editor-lesson');
    if (!editorContainer) return;
    
    // Destroy existing editor if it exists
    if (monacoEditorLesson) {
        monacoEditorLesson.dispose();
    }
    
    monacoEditorLesson = monaco.editor.create(editorContainer, {
        value: '<!DOCTYPE html>\n<html>\n<head>\n    <title>My Page</title>\n</head>\n<body>\n    <h1>Hello World!</h1>\n</body>\n</html>',
        language: 'html',
        theme: 'vs-dark',
        automaticLayout: true,
        minimap: { enabled: false },
        scrollBeyondLastLine: false,
        fontSize: 14,
        lineNumbers: 'on',
        roundedSelection: false,
        scrollbar: {
            vertical: 'visible',
            horizontal: 'visible'
        }
    });
}

// Challenge Modal Functions
function openChallengeModal(challengeNumber) {
    const challengeModal = document.getElementById('challengeModal');
    if (!challengeModal) return;
    
    currentModalChallenge = challengeNumber;
    
    // Load challenge content
    const challengeTitle = challengeModal.querySelector('.challenge-modal-header h2');
    if (challengeTitle) {
        challengeTitle.textContent = `Challenge ${challengeNumber}`;
    }
    
    // Show modal
    challengeModal.classList.add('active');
    
    // Initialize Monaco editor for modal
    setTimeout(() => {
        const modalEditorContainer = challengeModal.querySelector('.monaco-editor-container');
        if (modalEditorContainer && typeof monaco !== 'undefined') {
            // Initialize editor for modal
            const modalEditor = monaco.editor.create(modalEditorContainer, {
                value: '<!DOCTYPE html>\n<html>\n<head>\n    <title>Challenge</title>\n</head>\n<body>\n    <h1>Complete the challenge!</h1>\n</body>\n</html>',
                language: 'html',
                theme: 'vs-dark',
                automaticLayout: true,
                minimap: { enabled: false },
                scrollBeyondLastLine: false,
                fontSize: 14,
                lineNumbers: 'on',
                roundedSelection: false
            });
        }
    }, 100);
}

function closeChallengeModal() {
    const challengeModal = document.getElementById('challengeModal');
    if (challengeModal) {
        challengeModal.classList.remove('active');
    }
    currentModalChallenge = null;
}

function runChallengeModal() {
    const challengeModal = document.getElementById('challengeModal');
    if (!challengeModal) return;
    
    const editor = challengeModal.querySelector('.monaco-editor-container .monaco-editor');
    const outputContainer = challengeModal.querySelector('.challenge-output');
    
    if (editor && outputContainer) {
        const code = editor.getValue();
        outputContainer.innerHTML = code;
    }
}

function validateChallengeModal(challenge, code, output) {
    // Basic validation - can be expanded
    return code.includes('<html>') && code.includes('</html>');
}

function completeChallenge() {
    if (currentModalChallenge) {
        console.log(`Challenge ${currentModalChallenge} completed!`);
        closeChallengeModal();
        
        // Show success message
        const notification = document.createElement('div');
        notification.className = 'notification notification-success show';
        notification.innerHTML = `
            <div class="notification-content">
                <i class="fas fa-check-circle"></i>
                <span>Challenge completed successfully!</span>
            </div>
        `;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.remove();
        }, 3000);
    }
}

// Navigation Functions
function setupDynamicNavigation() {
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            
            // Remove active class from all links
            navLinks.forEach(l => l.classList.remove('active'));
            
            // Add active class to clicked link
            link.classList.add('active');
            
            // Handle navigation
            const targetPage = link.getAttribute('data-page');
            handleNavigation(targetPage);
        });
    });
}

function getCurrentPage() {
    const activeLink = document.querySelector('.nav-link.active');
    return activeLink ? activeLink.getAttribute('data-page') : 'home';
}

function updateActiveNavigation(currentPage) {
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('data-page') === currentPage) {
            link.classList.add('active');
        }
    });
}

function handleNavigation(targetPage) {
    // Handle page navigation
    console.log(`Navigating to: ${targetPage}`);
    
    // Update active navigation
    updateActiveNavigation(targetPage);
    
    // Scroll to section if it exists
    const targetSection = document.getElementById(targetPage);
    if (targetSection) {
        targetSection.scrollIntoView({ behavior: 'smooth' });
    }
}

// Initialize app when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    console.log('WebDev LMS initialized');
    
    // Setup navigation
    setupNavigation();
    setupDynamicNavigation();
    
    // Setup tabs
    setupTabs();
    
    // Setup lesson modal
    setupLessonModal();
    
    // Setup day cards
    setupDayCards();
    
    // Setup animations
    animateOnScroll();
    
    // Initialize Monaco Editor if available
    if (typeof monaco !== 'undefined') {
        initializeMonacoEditor();
        initializeMainMonacoEditor();
    }
    
    // Handle window resize for Monaco Editor
    window.addEventListener('resize', () => {
        if (monacoEditor) monacoEditor.layout();
        if (monacoEditorMain) monacoEditorMain.layout();
        if (monacoEditorLesson) monacoEditorLesson.layout();
    });
});

// Export functions for global access
window.scrollToSection = scrollToSection;
window.openDayLesson = openDayLesson;
window.closeLessonModal = closeLessonModal;
window.startChallenge = startChallenge;
window.previousLesson = previousLesson;
window.copyCode = copyCode;
window.runCode = runCode;
window.resetCode = resetCode;
window.nextChallenge = nextChallenge;
window.previousChallenge = previousChallenge;
window.openChallengeModal = openChallengeModal;
window.closeChallengeModal = closeChallengeModal;
window.runChallengeModal = runChallengeModal;
window.completeChallenge = completeChallenge; 