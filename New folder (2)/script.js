// Global variables
let currentChallenge = 0;
let currentTab = 'html';
let currentDay = 1;
let progress = {
    completedDays: 0,
    completedChallenges: 0,
    hoursSpent: 0,
    achievements: 0
};

// Monaco Editor instances
let monacoEditor = null;
let monacoEditorMain = null;
let monacoEditorLesson = null;
let currentModalChallenge = null;

// Challenge data
const challenges = {
    html: [
        {
            title: "HTML Challenge 1: Basic Structure",
            description: "Create a basic HTML structure with a title, heading, and paragraph. Use proper HTML5 doctype and include a title tag.",
            difficulty: "Beginner",
            time: "5 min",
            template: `<!DOCTYPE html>
<html>
<head>
    <title>My First Page</title>
</head>
<body>
    <!-- Add your heading here -->
    
    <!-- Add your paragraph here -->
</body>
</html>`,
            solution: `<!DOCTYPE html>
<html>
<head>
    <title>My First Page</title>
</head>
<body>
    <h1>Welcome to My Website</h1>
    <p>This is my first HTML page!</p>
</body>
</html>`
        },
        {
            title: "HTML Challenge 2: Lists and Links",
            description: "Create an HTML page with ordered and unordered lists, and add some links to external websites.",
            difficulty: "Beginner",
            time: "8 min",
            template: `<!DOCTYPE html>
<html>
<head>
    <title>Lists and Links</title>
</head>
<body>
    <h1>My Favorite Things</h1>
    
    <!-- Create an ordered list of your top 3 favorite movies -->
    
    <h2>Useful Websites</h2>
    
    <!-- Create an unordered list with links to 3 websites -->
    
</body>
</html>`,
            solution: `<!DOCTYPE html>
<html>
<head>
    <title>Lists and Links</title>
</head>
<body>
    <h1>My Favorite Things</h1>
    
    <ol>
        <li>The Matrix</li>
        <li>Inception</li>
        <li>Interstellar</li>
    </ol>
    
    <h2>Useful Websites</h2>
    
    <ul>
        <li><a href="https://www.google.com">Google</a></li>
        <li><a href="https://www.github.com">GitHub</a></li>
        <li><a href="https://www.stackoverflow.com">Stack Overflow</a></li>
    </ul>
    
</body>
</html>`
        },
        {
            title: "HTML Challenge 3: Forms",
            description: "Create a contact form with different input types including text, email, textarea, and a submit button.",
            difficulty: "Intermediate",
            time: "10 min",
            template: `<!DOCTYPE html>
<html>
<head>
    <title>Contact Form</title>
</head>
<body>
    <h1>Contact Us</h1>
    
    <form>
        <!-- Add form fields here -->
        
    </form>
</body>
</html>`,
            solution: `<!DOCTYPE html>
<html>
<head>
    <title>Contact Form</title>
</head>
<body>
    <h1>Contact Us</h1>
    
    <form>
        <label for="name">Name:</label>
        <input type="text" id="name" name="name" required><br><br>
        
        <label for="email">Email:</label>
        <input type="email" id="email" name="email" required><br><br>
        
        <label for="message">Message:</label>
        <textarea id="message" name="message" rows="4" cols="50" required></textarea><br><br>
        
        <input type="submit" value="Send Message">
    </form>
</body>
</html>`
        }
    ],
    css: [
        {
            title: "CSS Challenge 1: Basic Styling",
            description: "Style the HTML elements with CSS. Add colors, fonts, and basic spacing.",
            difficulty: "Beginner",
            time: "8 min",
            template: `<!DOCTYPE html>
<html>
<head>
    <title>Styled Page</title>
    <style>
        /* Add your CSS here */
        
    </style>
</head>
<body>
    <h1>Welcome to My Styled Page</h1>
    <p>This paragraph should be styled with a different color and font.</p>
    <div class="container">
        <h2>This is a container</h2>
        <p>This content should be centered and have some padding.</p>
    </div>
</body>
</html>`,
            solution: `<!DOCTYPE html>
<html>
<head>
    <title>Styled Page</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f0f0f0;
            margin: 0;
            padding: 20px;
        }
        
        h1 {
            color: #333;
            text-align: center;
        }
        
        p {
            color: #666;
            line-height: 1.6;
        }
        
        .container {
            background-color: white;
            padding: 20px;
            border-radius: 8px;
            text-align: center;
            max-width: 600px;
            margin: 0 auto;
        }
    </style>
</head>
<body>
    <h1>Welcome to My Styled Page</h1>
    <p>This paragraph should be styled with a different color and font.</p>
    <div class="container">
        <h2>This is a container</h2>
        <p>This content should be centered and have some padding.</p>
    </div>
</body>
</html>`
        },
        {
            title: "CSS Challenge 2: Flexbox Layout",
            description: "Create a responsive layout using CSS Flexbox. Arrange items in a row and make them responsive.",
            difficulty: "Intermediate",
            time: "12 min",
            template: `<!DOCTYPE html>
<html>
<head>
    <title>Flexbox Layout</title>
    <style>
        /* Add your CSS here */
        
    </style>
</head>
<body>
    <div class="container">
        <div class="card">Card 1</div>
        <div class="card">Card 2</div>
        <div class="card">Card 3</div>
    </div>
</body>
</html>`,
            solution: `<!DOCTYPE html>
<html>
<head>
    <title>Flexbox Layout</title>
    <style>
        body {
            margin: 0;
            padding: 20px;
            font-family: Arial, sans-serif;
        }
        
        .container {
            display: flex;
            justify-content: space-between;
            gap: 20px;
            flex-wrap: wrap;
        }
        
        .card {
            background-color: #01D29B;
            color: white;
            padding: 30px;
            border-radius: 8px;
            flex: 1;
            min-width: 200px;
            text-align: center;
            box-shadow: 0 4px 8px rgba(0,0,0,0.1);
        }
        
        @media (max-width: 768px) {
            .container {
                flex-direction: column;
            }
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="card">Card 1</div>
        <div class="card">Card 2</div>
        <div class="card">Card 3</div>
    </div>
</body>
</html>`
        },
        {
            title: "CSS Challenge 3: CSS Grid",
            description: "Create a grid layout using CSS Grid. Make a responsive photo gallery.",
            difficulty: "Intermediate",
            time: "15 min",
            template: `<!DOCTYPE html>
<html>
<head>
    <title>CSS Grid Gallery</title>
    <style>
        /* Add your CSS here */
        
    </style>
</head>
<body>
    <div class="gallery">
        <div class="photo">Photo 1</div>
        <div class="photo">Photo 2</div>
        <div class="photo">Photo 3</div>
        <div class="photo">Photo 4</div>
        <div class="photo">Photo 5</div>
        <div class="photo">Photo 6</div>
    </div>
</body>
</html>`,
            solution: `<!DOCTYPE html>
<html>
<head>
    <title>CSS Grid Gallery</title>
    <style>
        body {
            margin: 0;
            padding: 20px;
            font-family: Arial, sans-serif;
        }
        
        .gallery {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
            gap: 20px;
            max-width: 1200px;
            margin: 0 auto;
        }
        
        .photo {
            background: linear-gradient(45deg, #01D29B, #00B894);
            color: white;
            padding: 60px 20px;
            border-radius: 8px;
            text-align: center;
            font-size: 1.2rem;
            font-weight: bold;
            box-shadow: 0 4px 8px rgba(0,0,0,0.1);
            transition: transform 0.3s ease;
        }
        
        .photo:hover {
            transform: translateY(-5px);
        }
    </style>
</head>
<body>
    <div class="gallery">
        <div class="photo">Photo 1</div>
        <div class="photo">Photo 2</div>
        <div class="photo">Photo 3</div>
        <div class="photo">Photo 4</div>
        <div class="photo">Photo 5</div>
        <div class="photo">Photo 6</div>
    </div>
</body>
</html>`
        }
    ],
    js: [
        {
            title: "JavaScript Challenge 1: Variables and Functions",
            description: "Create variables and functions to manipulate the DOM. Change text content and styles.",
            difficulty: "Beginner",
            time: "10 min",
            template: `<!DOCTYPE html>
<html>
<head>
    <title>JavaScript Basics</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            text-align: center;
            padding: 50px;
        }
        .container {
            max-width: 600px;
            margin: 0 auto;
        }
        button {
            background: #01D29B;
            color: white;
            border: none;
            padding: 10px 20px;
            border-radius: 5px;
            cursor: pointer;
            margin: 10px;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1 id="title">Welcome to JavaScript</h1>
        <p id="message">Click the buttons to see JavaScript in action!</p>
        <button onclick="changeTitle()">Change Title</button>
        <button onclick="changeMessage()">Change Message</button>
        <button onclick="changeColor()">Change Color</button>
    </div>

    <script>
        // Add your JavaScript here
        
    </script>
</body>
</html>`,
            solution: `<!DOCTYPE html>
<html>
<head>
    <title>JavaScript Basics</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            text-align: center;
            padding: 50px;
        }
        .container {
            max-width: 600px;
            margin: 0 auto;
        }
        button {
            background: #01D29B;
            color: white;
            border: none;
            padding: 10px 20px;
            border-radius: 5px;
            cursor: pointer;
            margin: 10px;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1 id="title">Welcome to JavaScript</h1>
        <p id="message">Click the buttons to see JavaScript in action!</p>
        <button onclick="changeTitle()">Change Title</button>
        <button onclick="changeMessage()">Change Message</button>
        <button onclick="changeColor()">Change Color</button>
    </div>

    <script>
        let clickCount = 0;
        
        function changeTitle() {
            const title = document.getElementById('title');
            title.textContent = 'JavaScript is Awesome!';
        }
        
        function changeMessage() {
            const message = document.getElementById('message');
            clickCount++;
            message.textContent = 'Button clicked ' + clickCount + ' times!';
        }
        
        function changeColor() {
            const colors = ['#01D29B', '#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4'];
            const randomColor = colors[Math.floor(Math.random() * colors.length)];
            document.body.style.backgroundColor = randomColor;
        }
    </script>
</body>
</html>`
        },
        {
            title: "JavaScript Challenge 2: Event Listeners",
            description: "Use event listeners to create interactive elements. Handle form submission and button clicks.",
            difficulty: "Intermediate",
            time: "12 min",
            template: `<!DOCTYPE html>
<html>
<head>
    <title>Event Listeners</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            max-width: 600px;
            margin: 50px auto;
            padding: 20px;
        }
        .form-group {
            margin-bottom: 15px;
        }
        label {
            display: block;
            margin-bottom: 5px;
        }
        input, textarea {
            width: 100%;
            padding: 8px;
            border: 1px solid #ddd;
            border-radius: 4px;
        }
        button {
            background: #01D29B;
            color: white;
            border: none;
            padding: 10px 20px;
            border-radius: 4px;
            cursor: pointer;
        }
        #output {
            margin-top: 20px;
            padding: 15px;
            background: #f5f5f5;
            border-radius: 4px;
            min-height: 50px;
        }
    </style>
</head>
<body>
    <h1>Event Listeners Challenge</h1>
    
    <form id="myForm">
        <div class="form-group">
            <label for="name">Name:</label>
            <input type="text" id="name" required>
        </div>
        <div class="form-group">
            <label for="email">Email:</label>
            <input type="email" id="email" required>
        </div>
        <div class="form-group">
            <label for="message">Message:</label>
            <textarea id="message" rows="4" required></textarea>
        </div>
        <button type="submit">Submit</button>
    </form>
    
    <div id="output"></div>

    <script>
        // Add your JavaScript here
        
    </script>
</body>
</html>`
        },
        {
            title: "JavaScript Challenge 3: DOM Manipulation",
            description: "Use JavaScript to manipulate the DOM. Change text content, styles, and add new elements.",
            difficulty: "Intermediate",
            time: "15 min",
            template: `<!DOCTYPE html>
<html>
<head>
    <title>DOM Manipulation</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            text-align: center;
            padding: 50px;
        }
        .container {
            max-width: 600px;
            margin: 0 auto;
        }
        button {
            background: #01D29B;
            color: white;
            border: none;
            padding: 10px 20px;
            border-radius: 5px;
            cursor: pointer;
            margin: 10px;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1 id="title">Welcome to DOM Manipulation</h1>
        <p id="message">Click the button to add a new paragraph!</p>
        <button onclick="addParagraph()">Add Paragraph</button>
    </div>

    <script>
        function addParagraph() {
            const messageElement = document.getElementById('message');
            const newParagraph = document.createElement('p');
            newParagraph.textContent = 'This paragraph was added by JavaScript!';
            messageElement.parentNode.insertBefore(newParagraph, messageElement.nextSibling);
        }
    </script>
</body>
</html>`
        }
    ]
};

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

function initializeApp() {
    setupNavigation();
    setupTabs();
    loadChallenge();
    setupDayCards();
    setupLessonModal();
    setupDynamicNavigation();
}

// Navigation functionality
function setupNavigation() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    hamburger.addEventListener('click', function() {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });
    
    // Smooth scrolling for navigation links
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            targetSection.scrollIntoView({ behavior: 'smooth' });
        });
    });
}

function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    section.scrollIntoView({ behavior: 'smooth' });
}

// Tab functionality
function setupTabs() {
    const tabButtons = document.querySelectorAll('.tab-button');
    
    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all tabs
            tabButtons.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked tab
            this.classList.add('active');
            
            // Update current tab and load challenges
            currentTab = this.getAttribute('data-tab');
            currentChallenge = 0;
            loadChallenge();
        });
    });
}

// Challenge functionality
function loadChallenge() {
    const challenge = challenges[currentTab][currentChallenge];
    if (!challenge) return;
    
    document.getElementById('challenge-title').textContent = challenge.title;
    document.getElementById('challenge-description').innerHTML = `<p>${challenge.description}</p>`;
    
    const difficultyElement = document.querySelector('.difficulty');
    const timeElement = document.querySelector('.time');
    
    difficultyElement.textContent = challenge.difficulty;
    timeElement.textContent = challenge.time;
    
    // Set code in the appropriate Monaco Editor instance
    if (monacoEditorMain) {
        monacoEditorMain.setValue(challenge.template);
    } else if (monacoEditorLesson) {
        monacoEditorLesson.setValue(challenge.template);
    }
    
    // Update navigation buttons
    updateChallengeNavigation();
}

function runCode() {
    let code = '';
    const outputFrame = document.getElementById('output-frame');
    
    // Get code from the appropriate Monaco Editor instance
    if (monacoEditorMain) {
        code = monacoEditorMain.getValue();
    } else if (monacoEditorLesson) {
        code = monacoEditorLesson.getValue();
    } else {
        outputFrame.innerHTML = '<div style="color: #ff6b6b;">Editor not initialized!</div>';
        return;
    }
    
    // Create a new document in the iframe
    const iframe = document.createElement('iframe');
    iframe.style.width = '100%';
    iframe.style.height = '100%';
    iframe.style.border = 'none';
    
    outputFrame.innerHTML = '';
    outputFrame.appendChild(iframe);
    
    const iframeDoc = iframe.contentDocument || iframe.contentWindow.document;
    iframeDoc.open();
    iframeDoc.write(code);
    iframeDoc.close();
    
    // Check if code is correct
    checkCode(code);
}

function resetCode() {
    const challenge = challenges[currentTab][currentChallenge];
    
    // Set code in the appropriate Monaco Editor instance
    if (monacoEditorMain) {
        monacoEditorMain.setValue(challenge.template);
    } else if (monacoEditorLesson) {
        monacoEditorLesson.setValue(challenge.template);
    }
    
    document.getElementById('output-frame').innerHTML = '';
}

function checkCode(code) {
    const challenge = challenges[currentTab][currentChallenge];
    const normalizedCode = code.replace(/\s+/g, ' ').trim();
    const normalizedSolution = challenge.solution.replace(/\s+/g, ' ').trim();
    
    if (normalizedCode.includes(normalizedSolution.substring(0, 100))) {
        showSuccessMessage();
        progress.completedChallenges++;
        updateProgress();
    }
}

function showSuccessMessage() {
    const outputFrame = document.getElementById('output-frame');
    const successDiv = document.createElement('div');
    successDiv.style.cssText = `
        position: absolute;
        top: 10px;
        right: 10px;
        background: #00D4AA;
        color: white;
        padding: 10px 15px;
        border-radius: 5px;
        font-weight: bold;
        z-index: 1000;
    `;
    successDiv.textContent = '✅ Challenge Completed!';
    outputFrame.appendChild(successDiv);
    
    setTimeout(() => {
        successDiv.remove();
    }, 3000);
}

function nextChallenge() {
    if (currentChallenge < challenges[currentTab].length - 1) {
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
    const prevButton = document.querySelector('.nav-button:first-child');
    const nextButton = document.querySelector('.nav-button:last-child');
    
    prevButton.disabled = currentChallenge === 0;
    nextButton.disabled = currentChallenge === challenges[currentTab].length - 1;
    
    if (prevButton.disabled) {
        prevButton.style.opacity = '0.5';
        prevButton.style.cursor = 'not-allowed';
    } else {
        prevButton.style.opacity = '1';
        prevButton.style.cursor = 'pointer';
    }
    
    if (nextButton.disabled) {
        nextButton.style.opacity = '0.5';
        nextButton.style.cursor = 'not-allowed';
    } else {
        nextButton.style.opacity = '1';
        nextButton.style.cursor = 'pointer';
    }
}

// Progress functionality
function updateProgress() {
    const percentage = Math.round((progress.completedChallenges / 10) * 100);
    
    // Update progress circle
    const progressPath = document.querySelector('.progress-circle path:last-child');
    if (progressPath) {
        progressPath.style.strokeDashoffset = 100 - percentage;
    }
    
    // Update percentage text
    const percentageElement = document.querySelector('.progress-percentage');
    if (percentageElement) {
        percentageElement.textContent = percentage + '%';
    }
    
    // Update stats
    document.querySelectorAll('.stat-number')[0].textContent = progress.completedChallenges;
    document.querySelectorAll('.stat-number')[1].textContent = progress.hoursSpent;
    document.querySelectorAll('.stat-number')[2].textContent = progress.achievements;
    
    // Update completed days text
    const completedDaysText = document.querySelector('.progress-card p');
    if (completedDaysText) {
        completedDaysText.textContent = `${progress.completedDays} of 10 days completed`;
    }
    
    // Check achievements
    checkAchievements();
}

function checkAchievements() {
    const achievements = document.querySelectorAll('.achievement');
    
    if (progress.completedChallenges >= 1) {
        achievements[0].setAttribute('data-achieved', 'true');
        progress.achievements = Math.max(progress.achievements, 1);
    }
    
    if (progress.completedChallenges >= 5) {
        achievements[1].setAttribute('data-achieved', 'true');
        progress.achievements = Math.max(progress.achievements, 2);
    }
    
    if (progress.completedChallenges >= 10) {
        achievements[2].setAttribute('data-achieved', 'true');
        progress.achievements = Math.max(progress.achievements, 3);
    }
    
    if (progress.completedDays >= 10) {
        achievements[3].setAttribute('data-achieved', 'true');
        progress.achievements = Math.max(progress.achievements, 4);
    }
}

// Day cards functionality
function setupDayCards() {
    const dayCards = document.querySelectorAll('.day-card');
    
    dayCards.forEach((card, index) => {
        card.addEventListener('click', function() {
            const dayNumber = index + 1;
            currentDay = dayNumber;
            
            // Unlock previous days and current day
            for (let i = 0; i <= index; i++) {
                const statusElement = dayCards[i].querySelector('.day-status');
                statusElement.setAttribute('data-status', 'completed');
                statusElement.innerHTML = '<i class="fas fa-check"></i>';
            }
            
            // Update progress
            progress.completedDays = Math.max(progress.completedDays, dayNumber);
            
            // Open lesson modal
            openDayLesson(dayNumber);
        });
    });
}

// Animation on scroll
function animateOnScroll() {
    const elements = document.querySelectorAll('.day-card, .resource-card, .stat-card');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in-up');
            }
        });
    }, { threshold: 0.1 });
    
    elements.forEach(element => {
        observer.observe(element);
    });
}

// Initialize animations
document.addEventListener('DOMContentLoaded', function() {
    animateOnScroll();
});

// Lesson Modal functionality
function setupLessonModal() {
    // Setup lesson tabs
    const lessonTabs = document.querySelectorAll('.lesson-tab');
    lessonTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            const tabName = this.getAttribute('data-tab');
            
            // Remove active class from all tabs and panels
            lessonTabs.forEach(t => t.classList.remove('active'));
            document.querySelectorAll('.lesson-panel').forEach(p => p.classList.remove('active'));
            
            // Add active class to clicked tab and corresponding panel
            this.classList.add('active');
            document.getElementById(tabName + '-content').classList.add('active');
        });
    });
}

function openDayLesson(dayNumber) {
    currentDay = dayNumber;
    const modal = document.getElementById('lessonModal');
    const lessonTitle = document.getElementById('lessonTitle');
    
    // Update modal title
    const dayTitles = {
        1: 'Day 1: HTML Fundamentals',
        2: 'Day 2: HTML Forms & Media',
        3: 'Day 3: CSS Basics',
        4: 'Day 4: CSS Layout',
        5: 'Day 5: CSS Advanced',
        6: 'Day 6: JavaScript Basics',
        7: 'Day 7: JavaScript Events',
        8: 'Day 8: JavaScript Arrays & Objects',
        9: 'Day 9: APIs & Fetch',
        10: 'Day 10: Final Project'
    };
    
    lessonTitle.textContent = dayTitles[dayNumber];
    
    // Load day-specific content
    loadDayContent(dayNumber);
    
    // Show modal
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
    
    // Initialize Monaco Editor for lesson modal after a short delay
    setTimeout(() => {
        if (!monacoEditorLesson) {
            initializeLessonMonacoEditor();
        }
    }, 200);
}

function closeLessonModal() {
    const modal = document.getElementById('lessonModal');
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
}

function loadDayContent(dayNumber) {
    // Load documentation content based on day
    const documentationContent = document.querySelector('.lesson-documentation');
    
    const dayContent = {
        1: {
            title: 'Introduction to HTML',
            content: `
                <h3>Introduction to HTML</h3>
                <p>HTML (HyperText Markup Language) is the standard markup language for creating web pages. It describes the structure of a web page semantically and originally included cues for the appearance of the document.</p>
                
                <h4>Basic HTML Structure</h4>
                <div class="code-example">
                    <div class="code-header">
                        <span>Basic HTML Template</span>
                        <button class="copy-btn" onclick="copyCode(this)">
                            <i class="fas fa-copy"></i>
                        </button>
                    </div>
                    <pre><code>&lt;!DOCTYPE html&gt;
&lt;html&gt;
&lt;head&gt;
    &lt;title&gt;Page Title&lt;/title&gt;
&lt;/head&gt;
&lt;body&gt;
    &lt;h1&gt;This is a heading&lt;/h1&gt;
    &lt;p&gt;This is a paragraph.&lt;/p&gt;
&lt;/body&gt;
&lt;/html&gt;</code></pre>
                </div>
                
                <h4>Key Concepts</h4>
                <ul>
                    <li><strong>DOCTYPE Declaration:</strong> Tells the browser this is an HTML5 document</li>
                    <li><strong>&lt;html&gt;:</strong> The root element of an HTML page</li>
                    <li><strong>&lt;head&gt;:</strong> Contains meta information about the document</li>
                    <li><strong>&lt;title&gt;:</strong> Specifies a title for the document</li>
                    <li><strong>&lt;body&gt;:</strong> Contains the visible page content</li>
                </ul>
                
                <h4>Common HTML Elements</h4>
                <div class="elements-grid">
                    <div class="element-card">
                        <h5>Headings</h5>
                        <p>&lt;h1&gt; to &lt;h6&gt;</p>
                        <small>Used for titles and subtitles</small>
                    </div>
                    <div class="element-card">
                        <h5>Paragraphs</h5>
                        <p>&lt;p&gt;</p>
                        <small>Used for text content</small>
                    </div>
                    <div class="element-card">
                        <h5>Links</h5>
                        <p>&lt;a&gt;</p>
                        <small>Creates hyperlinks</small>
                    </div>
                    <div class="element-card">
                        <h5>Images</h5>
                        <p>&lt;img&gt;</p>
                        <small>Displays images</small>
                    </div>
                </div>
            `
        },
        2: {
            title: 'HTML Forms & Media',
            content: `
                <h3>HTML Forms & Media</h3>
                <p>Forms allow users to input data, while media elements let you embed images, videos, and audio into your web pages.</p>
                
                <h4>HTML Forms</h4>
                <p>Forms are used to collect user input. The &lt;form&gt; element contains form elements.</p>
                
                <div class="code-example">
                    <div class="code-header">
                        <span>Basic Form Example</span>
                        <button class="copy-btn" onclick="copyCode(this)">
                            <i class="fas fa-copy"></i>
                        </button>
                    </div>
                    <pre><code>&lt;form&gt;
    &lt;label for="name"&gt;Name:&lt;/label&gt;
    &lt;input type="text" id="name" name="name"&gt;
    
    &lt;label for="email"&gt;Email:&lt;/label&gt;
    &lt;input type="email" id="email" name="email"&gt;
    
    &lt;button type="submit"&gt;Submit&lt;/button&gt;
&lt;/form&gt;</code></pre>
                </div>
                
                <h4>Common Input Types</h4>
                <div class="elements-grid">
                    <div class="element-card">
                        <h5>Text</h5>
                        <p>type="text"</p>
                        <small>Single line text input</small>
                    </div>
                    <div class="element-card">
                        <h5>Email</h5>
                        <p>type="email"</p>
                        <small>Email address input</small>
                    </div>
                    <div class="element-card">
                        <h5>Password</h5>
                        <p>type="password"</p>
                        <small>Hidden text input</small>
                    </div>
                    <div class="element-card">
                        <h5>Number</h5>
                        <p>type="number"</p>
                        <small>Numeric input</small>
                    </div>
                </div>
                
                <h4>Media Elements</h4>
                <p>HTML provides elements for embedding media content.</p>
                
                <div class="code-example">
                    <div class="code-header">
                        <span>Media Elements</span>
                        <button class="copy-btn" onclick="copyCode(this)">
                            <i class="fas fa-copy"></i>
                        </button>
                    </div>
                    <pre><code>&lt;!-- Image --&gt;
&lt;img src="image.jpg" alt="Description"&gt;

&lt;!-- Video --&gt;
&lt;video controls&gt;
    &lt;source src="video.mp4" type="video/mp4"&gt;
&lt;/video&gt;

&lt;!-- Audio --&gt;
&lt;audio controls&gt;
    &lt;source src="audio.mp3" type="audio/mpeg"&gt;
&lt;/audio&gt;</code></pre>
                </div>
            `
        }
        // Add more days as needed
    };
    
    if (dayContent[dayNumber]) {
        documentationContent.innerHTML = dayContent[dayNumber].content;
    } else {
        documentationContent.innerHTML = `
            <h3>Day ${dayNumber} Content</h3>
            <p>Content for Day ${dayNumber} will be added here.</p>
        `;
    }
    
    // Load challenge for this day
    loadDayChallenge(dayNumber);
}

function loadDayChallenge(dayNumber) {
    // Map days to challenge types
    const dayToChallengeType = {
        1: 'html',
        2: 'html',
        3: 'css',
        4: 'css',
        5: 'css',
        6: 'js',
        7: 'js',
        8: 'js',
        9: 'js',
        10: 'js'
    };
    
    const challengeType = dayToChallengeType[dayNumber];
    if (challengeType && challenges[challengeType] && challenges[challengeType][0]) {
        const challenge = challenges[challengeType][0];
        
        document.getElementById('challenge-title').textContent = challenge.title;
        document.getElementById('challenge-description').innerHTML = `<p>${challenge.description}</p>`;
        document.getElementById('code-input').value = challenge.template;
    }
}

function startChallenge() {
    // Switch to challenge tab
    document.querySelector('.lesson-tab[data-tab="challenge"]').click();
}

function previousLesson() {
    if (currentDay > 1) {
        openDayLesson(currentDay - 1);
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
    button.style.color = '#00D4AA';
    
    setTimeout(() => {
        button.innerHTML = originalText;
        button.style.color = '';
    }, 2000);
}

// Close modal when clicking outside
window.addEventListener('click', function(event) {
    const modal = document.getElementById('lessonModal');
    if (event.target === modal) {
        closeLessonModal();
    }
});

// Close modal with Escape key
document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        closeLessonModal();
    }
});

// Challenge Modal functionality
const challengeData = {
    1: {
        title: "HTML Structure Builder",
        mission: "Create a complete HTML document structure with all essential tags.",
        requirements: [
            "Add <code>&lt;!DOCTYPE html&gt;</code> declaration",
            "Include <code>&lt;html&gt;</code> with lang attribute",
            "Add <code>&lt;head&gt;</code> section with title",
            "Include <code>&lt;body&gt;</code> section",
            "Add a heading and paragraph in the body"
        ],
        hint: "Remember: HTML is like building a house - you need a foundation (DOCTYPE), walls (html), a roof (head), and rooms (body)!",
        editorTitle: "Your Code",
        validationChecks: [
            { check: '<!DOCTYPE html>', description: 'DOCTYPE declaration' },
            { check: '<html', description: 'HTML element' },
            { check: '<head>', description: 'Head section' },
            { check: '<title>', description: 'Title element' },
            { check: '<body>', description: 'Body section' },
            { check: '<h', description: 'Heading element' },
            { check: '<p>', description: 'Paragraph element' }
        ]
    },
    2: {
        title: "Text Formatting Adventure",
        mission: "Write a short blog post about your favorite hobby using various HTML text elements.",
        requirements: [
            "Use <code>&lt;h1&gt;</code> for the main title",
            "Add <code>&lt;h2&gt;</code> for a subtitle",
            "Include at least 2 <code>&lt;p&gt;</code> paragraphs",
            "Use <code>&lt;strong&gt;</code> for important words",
            "Add <code>&lt;em&gt;</code> for emphasis",
            "Include a <code>&lt;br&gt;</code> tag for line break"
        ],
        hint: "Think about what makes your hobby special! Use <strong>bold</strong> for key points and <em>italic</em> for exciting details.",
        editorTitle: "Your Blog Post",
        validationChecks: [
            { check: '<h1>', description: 'H1 heading' },
            { check: '<h2>', description: 'H2 heading' },
            { check: '<p>', description: 'Paragraph elements' },
            { check: '<strong>', description: 'Strong/bold text' },
            { check: '<em>', description: 'Emphasized text' },
            { check: '<br>', description: 'Line break' }
        ]
    },
    3: {
        title: "Interactive Web Page Creator",
        mission: "Create a personal profile page that showcases your interests with links and images.",
        requirements: [
            "Add a profile image using <code>&lt;img&gt;</code>",
            "Create a navigation menu with <code>&lt;nav&gt;</code> and links",
            "Include an ordered list of your top 3 skills",
            "Add an unordered list of your hobbies",
            "Include at least 2 external links",
            "Add proper alt text to your image"
        ],
        hint: "Use placeholder images like <code>https://via.placeholder.com/200x200</code> and link to websites you like!",
        editorTitle: "Your Profile Page",
        validationChecks: [
            { check: '<img', description: 'Image element' },
            { check: '<nav>', description: 'Navigation element' },
            { check: '<a href', description: 'Link elements' },
            { check: '<ol>', description: 'Ordered list' },
            { check: '<ul>', description: 'Unordered list' },
            { check: 'alt=', description: 'Alt text for image' }
        ]
    },
    4: {
        title: "Div vs Span Mastery",
        mission: "Create a structured layout using divs and spans to understand their semantic differences.",
        requirements: [
            "Use <code>&lt;div&gt;</code> elements to create layout sections",
            "Include at least 2 <code>&lt;span&gt;</code> elements for text styling",
            "Create a form structure with <code>&lt;div&gt;</code> containers",
            "Add labels and inputs wrapped in <code>&lt;div&gt;</code> elements",
            "Use <code>&lt;span&gt;</code> to highlight important text",
            "Include proper form structure with <code>&lt;form&gt;</code> tag"
        ],
        hint: "Remember: <code>&lt;div&gt;</code> is for layout blocks, <code>&lt;span&gt;</code> is for inline text styling. Use divs to group form fields!",
        editorTitle: "Your Form Layout",
        validationChecks: [
            { check: '<div', description: 'Div elements for layout' },
            { check: '<span', description: 'Span elements for text styling' },
            { check: '<form', description: 'Form element' },
            { check: '<label', description: 'Label elements' },
            { check: '<input', description: 'Input elements' },
            { check: 'class=', description: 'CSS classes for styling' }
        ]
    },
    5: {
        title: "Contact Form Creator",
        mission: "Build a professional contact form with name, email, and message fields using proper form structure.",
        requirements: [
            "Create a <code>&lt;form&gt;</code> element with action and method",
            "Add a text input for name with proper label",
            "Include an email input with validation",
            "Add a textarea for message content",
            "Include a submit button",
            "Use <code>&lt;div&gt;</code> elements to structure form groups"
        ],
        hint: "Use <code>type=\"email\"</code> for email validation and <code>required</code> attribute for mandatory fields!",
        editorTitle: "Your Contact Form",
        validationChecks: [
            { check: '<form', description: 'Form element' },
            { check: 'type="text"', description: 'Text input' },
            { check: 'type="email"', description: 'Email input' },
            { check: '<textarea', description: 'Textarea element' },
            { check: 'type="submit"', description: 'Submit button' },
            { check: '<label', description: 'Label elements' }
        ]
    },
    6: {
        title: "Interactive Survey Form",
        mission: "Create a survey with radio buttons, checkboxes, and a dropdown menu for comprehensive data collection.",
        requirements: [
            "Add radio buttons for gender selection (same name attribute)",
            "Include checkboxes for multiple interests",
            "Create a dropdown menu with <code>&lt;select&gt;</code> and <code>&lt;option&gt;</code>",
            "Use proper labels for all form elements",
            "Structure form with <code>&lt;div&gt;</code> containers",
            "Include a submit button"
        ],
        hint: "Radio buttons need the same <code>name</code> attribute to work as a group. Checkboxes can have different names!",
        editorTitle: "Your Survey Form",
        validationChecks: [
            { check: 'type="radio"', description: 'Radio buttons' },
            { check: 'type="checkbox"', description: 'Checkboxes' },
            { check: '<select', description: 'Select dropdown' },
            { check: '<option', description: 'Option elements' },
            { check: 'name=', description: 'Name attributes' },
            { check: '<label', description: 'Label elements' }
        ]
    },
    8: {
        title: "Basic API Call",
        mission: "Make your first API request using the Fetch API to get data from a public API and display it on the page.",
        requirements: [
            "Use <code>fetch()</code> to make an API request",
            "Handle the response with <code>.then()</code> or <code>async/await</code>",
            "Parse the JSON response using <code>.json()</code>",
            "Display the data on the page",
            "Add basic error handling",
            "Use a public API like JSONPlaceholder"
        ],
        hint: "Start with a simple GET request to <code>https://jsonplaceholder.typicode.com/posts/1</code> and display the title and body!",
        editorTitle: "Your API Call",
        validationChecks: [
            { check: 'fetch(', description: 'Fetch API call' },
            { check: '.then(', description: 'Promise handling' },
            { check: '.json()', description: 'JSON parsing' },
            { check: 'catch(', description: 'Error handling' },
            { check: 'document.', description: 'DOM manipulation' },
            { check: 'https://', description: 'API URL' }
        ]
    },
    9: {
        title: "Async/Await Mastery",
        mission: "Convert Promise-based code to async/await and handle multiple API calls efficiently.",
        requirements: [
            "Create an <code>async function</code>",
            "Use <code>await</code> to handle API responses",
            "Make multiple API calls in sequence",
            "Use <code>try/catch</code> for error handling",
            "Display results from multiple API calls",
            "Show loading states during API calls"
        ],
        hint: "Use <code>async function</code> and <code>await</code> to make your code cleaner. Fetch multiple posts and display them in a list!",
        editorTitle: "Your Async Code",
        validationChecks: [
            { check: 'async function', description: 'Async function declaration' },
            { check: 'await fetch', description: 'Await with fetch' },
            { check: 'try {', description: 'Try block' },
            { check: 'catch (', description: 'Catch block' },
            { check: 'for (', description: 'Loop for multiple calls' },
            { check: 'Promise.all', description: 'Parallel API calls' }
        ]
    },
    10: {
        title: "Error Handling Pro",
        mission: "Build a robust API client with comprehensive error handling and user feedback.",
        requirements: [
            "Check <code>response.ok</code> for HTTP errors",
            "Handle network errors with try/catch",
            "Display user-friendly error messages",
            "Add loading indicators",
            "Implement retry logic for failed requests",
            "Show different error types (network, HTTP, JSON parsing)"
        ],
        hint: "Use <code>response.ok</code> to check HTTP status and provide specific error messages for different failure scenarios!",
        editorTitle: "Your Error Handling",
        validationChecks: [
            { check: 'response.ok', description: 'HTTP status check' },
            { check: 'throw new Error', description: 'Error throwing' },
            { check: 'catch (error)', description: 'Error catching' },
            { check: 'console.error', description: 'Error logging' },
            { check: 'innerHTML', description: 'Error display' },
            { check: 'setTimeout', description: 'Retry logic' }
        ]
    },
    11: {
        title: "Basic Styling",
        mission: "Apply colors, fonts, and basic styling to HTML elements using CSS properties.",
        requirements: [
            "Use <code>color</code> property to change text color",
            "Apply <code>background-color</code> to elements",
            "Set <code>font-family</code> for typography",
            "Use <code>font-size</code> to control text size",
            "Add <code>border</code> with color and style",
            "Apply <code>padding</code> and <code>margin</code> for spacing"
        ],
        hint: "Start with basic properties like <code>color: blue;</code> and <code>background-color: #f0f0f0;</code>. Use named colors or hex values!",
        editorTitle: "Your CSS Styling",
        validationChecks: [
            { check: 'color:', description: 'Text color property' },
            { check: 'background-color:', description: 'Background color property' },
            { check: 'font-family:', description: 'Font family property' },
            { check: 'font-size:', description: 'Font size property' },
            { check: 'border:', description: 'Border property' },
            { check: 'padding:', description: 'Padding property' }
        ]
    },
    12: {
        title: "Selectors Mastery",
        mission: "Practice using different CSS selectors (tag, class, ID) to target specific elements.",
        requirements: [
            "Use tag selectors (e.g., <code>p {}</code>) to style all paragraphs",
            "Create class selectors (e.g., <code>.highlight {}</code>) for reusable styles",
            "Use ID selectors (e.g., <code>#header {}</code>) for unique elements",
            "Apply different styles to each selector type",
            "Demonstrate selector specificity",
            "Use at least 3 different selector types"
        ],
        hint: "Remember: classes are reusable (multiple elements), IDs are unique (one element per page). Use <code>.classname</code> for classes and <code>#idname</code> for IDs!",
        editorTitle: "Your CSS Selectors",
        validationChecks: [
            { check: 'p {', description: 'Tag selector' },
            { check: '.', description: 'Class selector' },
            { check: '#', description: 'ID selector' },
            { check: 'color:', description: 'Color property' },
            { check: 'background-color:', description: 'Background property' },
            { check: 'font-size:', description: 'Font size property' }
        ]
    },
    13: {
        title: "Class vs ID Challenge",
        mission: "Create a styled form using both classes and IDs, understanding when to use each selector type.",
        requirements: [
            "Create a form with multiple input fields",
            "Use <code>#form-container</code> ID for the main form wrapper",
            "Apply <code>.form-field</code> class to all input containers",
            "Use <code>#submit-btn</code> ID for the submit button",
            "Style classes for reusable elements (fields, labels)",
            "Style IDs for unique elements (container, submit button)"
        ],
        hint: "Use IDs for unique elements like the form container and submit button. Use classes for elements that appear multiple times like form fields and labels!",
        editorTitle: "Your Form Styling",
        validationChecks: [
            { check: '#form-container', description: 'Form container ID' },
            { check: '.form-field', description: 'Form field class' },
            { check: '#submit-btn', description: 'Submit button ID' },
            { check: 'border:', description: 'Border styling' },
            { check: 'padding:', description: 'Padding property' },
            { check: 'background-color:', description: 'Background color' }
        ]
    },
    14: {
        title: "Basic Flexbox",
        mission: "Create a simple layout using Flexbox properties to understand the basics of flex containers and items.",
        requirements: [
            "Use <code>display: flex</code> on a container",
            "Create at least 3 flex items",
            "Apply <code>justify-content</code> to control horizontal alignment",
            "Use <code>align-items</code> to control vertical alignment",
            "Add background colors to see the layout clearly",
            "Experiment with different justify-content values"
        ],
        hint: "Start with <code>display: flex</code> and try different values for <code>justify-content</code> like <code>center</code>, <code>space-between</code>, or <code>space-around</code>!",
        editorTitle: "Your Flexbox Layout",
        validationChecks: [
            { check: 'display: flex', description: 'Flex container' },
            { check: 'justify-content:', description: 'Horizontal alignment' },
            { check: 'align-items:', description: 'Vertical alignment' },
            { check: 'background-color:', description: 'Background styling' },
            { check: 'padding:', description: 'Container spacing' },
            { check: 'margin:', description: 'Item spacing' }
        ]
    },
    15: {
        title: "Flexbox Navigation",
        mission: "Build a responsive navigation bar using Flexbox properties for proper alignment and spacing.",
        requirements: [
            "Create a navigation container with <code>display: flex</code>",
            "Add at least 4 navigation links",
            "Use <code>justify-content: space-between</code> for logo and menu",
            "Apply <code>align-items: center</code> for vertical centering",
            "Style the navigation with background color and padding",
            "Make links look like proper navigation items"
        ],
        hint: "Use <code>justify-content: space-between</code> to put logo on the left and navigation links on the right. Use <code>align-items: center</code> to vertically center everything!",
        editorTitle: "Your Navigation Bar",
        validationChecks: [
            { check: 'display: flex', description: 'Flex container' },
            { check: 'justify-content: space-between', description: 'Space distribution' },
            { check: 'align-items: center', description: 'Vertical centering' },
            { check: 'background-color:', description: 'Navigation background' },
            { check: 'padding:', description: 'Navigation spacing' },
            { check: 'text-decoration:', description: 'Link styling' }
        ]
    },
    16: {
        title: "Responsive Card Layout",
        mission: "Create a responsive card grid that adapts to different screen sizes using Flexbox properties.",
        requirements: [
            "Create a card container with <code>display: flex</code>",
            "Add at least 3 cards with different content",
            "Use <code>flex-wrap: wrap</code> for responsive behavior",
            "Apply <code>justify-content: space-around</code> for even spacing",
            "Style cards with borders, padding, and background colors",
            "Make cards have equal width and proper spacing"
        ],
        hint: "Use <code>flex-wrap: wrap</code> to make cards wrap to new lines on smaller screens. Use <code>justify-content: space-around</code> for even distribution of space!",
        editorTitle: "Your Card Layout",
        validationChecks: [
            { check: 'display: flex', description: 'Flex container' },
            { check: 'flex-wrap: wrap', description: 'Responsive wrapping' },
            { check: 'justify-content: space-around', description: 'Even spacing' },
            { check: 'border:', description: 'Card borders' },
            { check: 'padding:', description: 'Card spacing' },
            { check: 'background-color:', description: 'Card background' }
        ]
    },
    17: {
        title: "Box Model Mastery",
        mission: "Create a card with proper spacing using the CSS box model - content, padding, border, and margin.",
        requirements: [
            "Create a card with <code>width: 300px</code>",
            "Add <code>padding: 20px</code> for internal spacing",
            "Include <code>border: 2px solid #3498db</code>",
            "Apply <code>margin: 15px</code> for external spacing",
            "Add <code>background-color: #f8f9fa</code>",
            "Include content inside the card (heading and paragraph)"
        ],
        hint: "Remember the box model order: content → padding → border → margin. Use <code>padding</code> for space inside the border, <code>margin</code> for space outside!",
        editorTitle: "Your Box Model Card",
        validationChecks: [
            { check: 'width: 300px', description: 'Card width' },
            { check: 'padding: 20px', description: 'Internal padding' },
            { check: 'border: 2px solid', description: 'Border styling' },
            { check: 'margin: 15px', description: 'External margin' },
            { check: 'background-color:', description: 'Background color' },
            { check: '<h', description: 'Heading element' }
        ]
    },
    18: {
        title: "Background Styling",
        mission: "Style a banner section with background color and gradient effects for an attractive design.",
        requirements: [
            "Create a banner div with <code>background-color: #2c3e50</code>",
            "Add <code>background: linear-gradient</code> for gradient effect",
            "Include <code>padding: 40px 20px</code> for spacing",
            "Set <code>color: white</code> for text",
            "Add <code>text-align: center</code> for centering",
            "Include a heading and paragraph in the banner"
        ],
        hint: "Use <code>linear-gradient(135deg, #667eea 0%, #764ba2 100%)</code> for a beautiful gradient. Combine with <code>background-color</code> as fallback!",
        editorTitle: "Your Styled Banner",
        validationChecks: [
            { check: 'background-color:', description: 'Background color' },
            { check: 'linear-gradient', description: 'Gradient background' },
            { check: 'padding:', description: 'Banner padding' },
            { check: 'color: white', description: 'Text color' },
            { check: 'text-align: center', description: 'Text alignment' },
            { check: '<h', description: 'Banner heading' }
        ]
    },
    19: {
        title: "Hover Effects",
        mission: "Create interactive buttons with smooth hover transitions and visual effects.",
        requirements: [
            "Create a button with <code>padding: 12px 24px</code>",
            "Add <code>background-color: #3498db</code> and <code>color: white</code>",
            "Include <code>transition: all 0.3s ease</code> for smooth animation",
            "Add <code>:hover</code> pseudo-class with color change",
            "Include <code>transform: translateY(-2px)</code> on hover",
            "Add <code>box-shadow</code> effect on hover"
        ],
        hint: "Use <code>:hover</code> to change button appearance when mouse hovers. Combine <code>transform</code> and <code>box-shadow</code> for a lift effect!",
        editorTitle: "Your Interactive Button",
        validationChecks: [
            { check: 'padding: 12px 24px', description: 'Button padding' },
            { check: 'background-color:', description: 'Button background' },
            { check: 'transition:', description: 'Smooth transitions' },
            { check: ':hover', description: 'Hover pseudo-class' },
            { check: 'transform:', description: 'Transform effect' },
            { check: 'box-shadow:', description: 'Shadow effect' }
        ]
    },
    20: {
        title: "Responsive Layout",
        mission: "Build a responsive card layout that adapts to different screen sizes using flexible units.",
        requirements: [
            "Create a container with <code>display: flex</code> and <code>flex-wrap: wrap</code>",
            "Add cards with <code>flex: 1</code> and <code>min-width: 300px</code>",
            "Use <code>max-width: 400px</code> to prevent cards from getting too wide",
            "Include <code>padding: 20px</code> and <code>border: 1px solid #ddd</code>",
            "Add <code>@media (max-width: 768px)</code> query",
            "Make cards <code>min-width: 100%</code> on mobile"
        ],
        hint: "Use <code>flex: 1</code> for equal width cards, <code>min-width</code> for minimum size, and <code>max-width</code> for maximum size. Media queries handle mobile layout!",
        editorTitle: "Your Responsive Layout",
        validationChecks: [
            { check: 'display: flex', description: 'Flex container' },
            { check: 'flex-wrap: wrap', description: 'Responsive wrapping' },
            { check: 'flex: 1', description: 'Flexible items' },
            { check: 'min-width:', description: 'Minimum width' },
            { check: '@media', description: 'Media query' },
            { check: 'max-width:', description: 'Maximum width' }
        ]
    }
};

// Monaco Editor initialization for challenge modals
function initializeMonacoEditor() {
    console.log('initializeMonacoEditor called');
    console.log('Monaco object available:', typeof monaco !== 'undefined');
    
    if (typeof monaco === 'undefined') {
        console.log('Monaco Editor not loaded yet, retrying...');
        setTimeout(initializeMonacoEditor, 100);
        return;
    }
    
    const container = document.getElementById('monaco-editor-container');
    if (!container) {
        console.error('Monaco editor container not found');
        return;
    }
    
    console.log('Container found, creating Monaco Editor instance...');
    
    // Create Monaco Editor instance
    monacoEditor = monaco.editor.create(container, {
        value: '',
        language: 'html',
        theme: 'vs-dark',
        automaticLayout: true,
        minimap: { enabled: false },
        scrollBeyondLastLine: false,
        fontSize: 14,
        fontFamily: 'Consolas, "Courier New", monospace',
        lineNumbers: 'on',
        roundedSelection: false,
        scrollbar: {
            vertical: 'visible',
            horizontal: 'visible'
        },
        overviewRulerLanes: 0,
        overviewRulerBorder: false,
        hideCursorInOverviewRuler: true,
        renderLineHighlight: 'all',
        selectOnLineNumbers: true,
        glyphMargin: true,
        folding: true,
        lineDecorationsWidth: 20,
        lineNumbersMinChars: 3,
        wordWrap: 'on',
        wrappingIndent: 'indent',
        wordWrapColumn: 80,
        wordWrapMinified: true,
        wrappingStrategy: 'advanced',
        suggest: {
            showKeywords: true,
            showSnippets: true,
            showClasses: true,
            showFunctions: true,
            showVariables: true,
            showModules: true,
            showProperties: true,
            showEvents: true,
            showOperators: true,
            showUnits: true,
            showValues: true,
            showConstants: true,
            showEnums: true,
            showEnumMembers: true,
            showColors: true,
            showFiles: true,
            showReferences: true,
            showFolders: true,
            showTypeParameters: true,
            showWords: true,
            showUsers: true,
            showIssues: true
        }
    });
    
    console.log('Monaco Editor instance created successfully');
    
    // Set custom theme colors
    monaco.editor.defineTheme('custom-dark', {
        base: 'vs-dark',
        inherit: true,
        rules: [
            { token: 'comment', foreground: '6A9955' },
            { token: 'keyword', foreground: '569CD6' },
            { token: 'string', foreground: 'CE9178' },
            { token: 'number', foreground: 'B5CEA8' },
            { token: 'tag', foreground: '569CD6' },
            { token: 'attribute.name', foreground: '9CDCFE' },
            { token: 'attribute.value', foreground: 'CE9178' }
        ],
        colors: {
            'editor.background': '#1e1e1e',
            'editor.foreground': '#d4d4d4',
            'editor.lineHighlightBackground': 'rgba(1, 210, 155, 0.1)',
            'editor.lineHighlightBorder': 'rgba(1, 210, 155, 0.2)',
            'editorCursor.foreground': '#01D29B',
            'editorWhitespace.foreground': '#3e3e3e',
            'editorIndentGuide.background': '#3e3e3e',
            'editor.selectionBackground': 'rgba(1, 210, 155, 0.3)',
            'editor.inactiveSelectionBackground': 'rgba(1, 210, 155, 0.1)'
        }
    });
    
    monacoEditor.updateOptions({ theme: 'custom-dark' });
    
    console.log('Monaco Editor initialized successfully');
}

// Monaco Editor initialization for main page
function initializeMainMonacoEditor() {
    if (typeof monaco === 'undefined') {
        console.log('Monaco Editor not loaded yet, retrying...');
        setTimeout(initializeMainMonacoEditor, 100);
        return;
    }
    
    const container = document.getElementById('monaco-editor-main');
    if (!container) {
        console.error('Main Monaco editor container not found');
        return;
    }
    
    // Create Monaco Editor instance for main page
    monacoEditorMain = monaco.editor.create(container, {
        value: '',
        language: 'html',
        theme: 'custom-dark',
        automaticLayout: true,
        minimap: { enabled: false },
        scrollBeyondLastLine: false,
        fontSize: 14,
        fontFamily: 'Consolas, "Courier New", monospace',
        lineNumbers: 'on',
        roundedSelection: false,
        scrollbar: {
            vertical: 'visible',
            horizontal: 'visible'
        },
        overviewRulerLanes: 0,
        overviewRulerBorder: false,
        hideCursorInOverviewRuler: true,
        renderLineHighlight: 'all',
        selectOnLineNumbers: true,
        glyphMargin: true,
        folding: true,
        lineDecorationsWidth: 20,
        lineNumbersMinChars: 3,
        wordWrap: 'on',
        wrappingIndent: 'indent',
        wordWrapColumn: 80,
        wordWrapMinified: true,
        wrappingStrategy: 'advanced'
    });
    
    console.log('Main Monaco Editor initialized successfully');
}

// Monaco Editor initialization for lesson modal
function initializeLessonMonacoEditor() {
    if (typeof monaco === 'undefined') {
        console.log('Monaco Editor not loaded yet, retrying...');
        setTimeout(initializeLessonMonacoEditor, 100);
        return;
    }
    
    const container = document.getElementById('monaco-editor-lesson');
    if (!container) {
        console.error('Lesson Monaco editor container not found');
        return;
    }
    
    // Create Monaco Editor instance for lesson modal
    monacoEditorLesson = monaco.editor.create(container, {
        value: '',
        language: 'html',
        theme: 'custom-dark',
        automaticLayout: true,
        minimap: { enabled: false },
        scrollBeyondLastLine: false,
        fontSize: 14,
        fontFamily: 'Consolas, "Courier New", monospace',
        lineNumbers: 'on',
        roundedSelection: false,
        scrollbar: {
            vertical: 'visible',
            horizontal: 'visible'
        },
        overviewRulerLanes: 0,
        overviewRulerBorder: false,
        hideCursorInOverviewRuler: true,
        renderLineHighlight: 'all',
        selectOnLineNumbers: true,
        glyphMargin: true,
        folding: true,
        lineDecorationsWidth: 20,
        lineNumbersMinChars: 3,
        wordWrap: 'on',
        wrappingIndent: 'indent',
        wordWrapColumn: 80,
        wordWrapMinified: true,
        wrappingStrategy: 'advanced'
    });
    
    console.log('Lesson Monaco Editor initialized successfully');
}

function openChallengeModal(challengeNumber) {
    console.log('Opening challenge modal for challenge:', challengeNumber);
    currentModalChallenge = challengeNumber;
    const challenge = challengeData[challengeNumber];
    
    if (!challenge) {
        console.error('Challenge not found for number:', challengeNumber);
        alert('Challenge not found!');
        return;
    }
    
    console.log('Challenge found:', challenge.title);
    
    // Update modal content
    document.getElementById('modalChallengeTitle').textContent = challenge.title;
    
    // Create challenge content
    let challengeContent = `
        <div class="challenge-objective">
            <h4>🎯 Mission:</h4>
            <p>${challenge.mission}</p>
        </div>
        
        <div class="challenge-requirements">
            <h4>✅ Requirements:</h4>
            <ul>
                ${challenge.requirements.map(req => `<li>${req}</li>`).join('')}
            </ul>
        </div>
        
        <div class="challenge-hint">
            <h4>💡 Hint:</h4>
            <p>${challenge.hint}</p>
        </div>
        
        <div class="challenge-code-editor">
            <div class="editor-header">
                <span>${challenge.editorTitle}</span>
                <button class="run-btn" onclick="runChallengeModal()">
                    <i class="fas fa-play"></i> Run & Check
                </button>
            </div>
            <div id="monaco-editor-container" class="monaco-editor-container"></div>
            <div id="challengeModalOutput" class="challenge-output"></div>
        </div>
    `;
    
    document.getElementById('modalChallengeContent').innerHTML = challengeContent;
    
    // Show modal
    document.getElementById('challengeModal').classList.add('active');
    
    console.log('Modal shown, initializing Monaco Editor...');
    
    // Initialize Monaco Editor if not already done
    if (!monacoEditor) {
        console.log('Monaco Editor not initialized, calling initializeMonacoEditor...');
        initializeMonacoEditor();
    } else {
        console.log('Monaco Editor already initialized, clearing content...');
        // Clear the editor content
        monacoEditor.setValue('');
    }
}

function closeChallengeModal() {
    document.getElementById('challengeModal').classList.remove('active');
    currentModalChallenge = null;
    
    // Dispose Monaco Editor to free memory
    if (monacoEditor) {
        monacoEditor.dispose();
        monacoEditor = null;
    }
}

function runChallengeModal() {
    if (!currentModalChallenge || !monacoEditor) return;
    
    const code = monacoEditor.getValue();
    const output = document.getElementById('challengeModalOutput');
    const challenge = challengeData[currentModalChallenge];
    
    // Clear previous output
    output.innerHTML = '';
    
    if (!code.trim()) {
        output.innerHTML = '<div style="color: #ff6b6b;">Please write some code first!</div>';
        return;
    }
    
    try {
        // Create a new iframe to render the HTML
        const iframe = document.createElement('iframe');
        iframe.style.width = '100%';
        iframe.style.height = '300px';
        iframe.style.border = 'none';
        iframe.style.borderRadius = '8px';
        iframe.style.background = 'white';
        
        output.appendChild(iframe);
        
        // Write the HTML to the iframe
        const iframeDoc = iframe.contentDocument || iframe.contentWindow.document;
        iframeDoc.open();
        iframeDoc.write(code);
        iframeDoc.close();
        
        // Add validation feedback
        validateChallengeModal(challenge, code, output);
        
    } catch (error) {
        output.innerHTML = `<div style="color: #ff6b6b;">Error: ${error.message}</div>`;
    }
}

function validateChallengeModal(challenge, code, output) {
    let feedback = '<div style="margin-top: 15px; padding: 15px; background: rgba(1, 210, 155, 0.1); border-radius: 8px; border: 1px solid rgba(1, 210, 155, 0.3);">';
    feedback += '<h4 style="color: #01D29B; margin: 0 0 15px 0; font-size: 16px;">🎯 Validation Results:</h4>';
    
    let passed = 0;
    
    challenge.validationChecks.forEach(req => {
        if (code.includes(req.check)) {
            feedback += `<div style="color: #01D29B; margin: 8px 0; font-size: 14px;">✓ ${req.description}</div>`;
            passed++;
        } else {
            feedback += `<div style="color: #ff6b6b; margin: 8px 0; font-size: 14px;">✗ ${req.description}</div>`;
        }
    });
    
    const percentage = Math.round((passed / challenge.validationChecks.length) * 100);
    feedback += `<div style="margin-top: 15px; padding: 12px; background: ${percentage >= 80 ? 'rgba(1, 210, 155, 0.2)' : percentage >= 50 ? 'rgba(255, 167, 38, 0.2)' : 'rgba(255, 107, 107, 0.2)'}; border-radius: 8px; border: 1px solid ${percentage >= 80 ? 'rgba(1, 210, 155, 0.4)' : percentage >= 50 ? 'rgba(255, 167, 38, 0.4)' : 'rgba(255, 107, 107, 0.4)'};">`;
    feedback += `<strong style="font-size: 16px;">Progress: ${passed}/${challenge.validationChecks.length} (${percentage}%)</strong>`;
    
    if (percentage >= 80) {
        feedback += '<div style="color: #01D29B; margin-top: 8px; font-size: 14px;">🎉 Excellent! You\'ve mastered this challenge!</div>';
    } else if (percentage >= 50) {
        feedback += '<div style="color: #ffa726; margin-top: 8px; font-size: 14px;">💪 Great progress! Keep working on the remaining requirements!</div>';
    } else {
        feedback += '<div style="color: #ff6b6b; margin-top: 8px; font-size: 14px;">📚 Review the requirements and try again. You can do it!</div>';
    }
    
    feedback += '</div></div>';
    output.innerHTML += feedback;
}

function completeChallenge() {
    if (!currentModalChallenge || !monacoEditor) return;
    
    const code = monacoEditor.getValue();
    const challenge = challengeData[currentModalChallenge];
    
    if (!code.trim()) {
        alert('Please write some code before completing the challenge!');
        return;
    }
    
    // Check if all requirements are met
    let passed = 0;
    challenge.validationChecks.forEach(req => {
        if (code.includes(req.check)) {
            passed++;
        }
    });
    
    const percentage = Math.round((passed / challenge.validationChecks.length) * 100);
    
    if (percentage >= 80) {
        alert(`🎉 Congratulations! You've completed Challenge ${currentModalChallenge} with ${percentage}% success!`);
        closeChallengeModal();
    } else {
        alert(`Keep working! You're at ${percentage}%. Try to reach at least 80% to complete the challenge.`);
    }
}

// Dynamic Navigation functionality
function setupDynamicNavigation() {
    // Handle scroll effect on navbar
    window.addEventListener('scroll', function() {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Handle active navigation links based on current page
    const currentPage = getCurrentPage();
    updateActiveNavigation(currentPage);

    // Handle navigation link clicks
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', function(e) {
            const targetPage = this.getAttribute('data-page');
            
            // Remove active class from all links
            document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
            
            // Add active class to clicked link
            this.classList.add('active');
            
            // Handle navigation based on current page
            handleNavigation(targetPage);
        });
    });
}

function getCurrentPage() {
    const path = window.location.pathname;
    const hash = window.location.hash;
    
    if (path.includes('day')) {
        return 'day';
    } else if (hash === '#curriculum') {
        return 'curriculum';
    } else if (hash === '#challenges') {
        return 'challenges';
    } else if (hash === '#resources') {
        return 'resources';
    } else {
        return 'home';
    }
}

function updateActiveNavigation(currentPage) {
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        const linkPage = link.getAttribute('data-page');
        
        if (linkPage === currentPage) {
            link.classList.add('active');
        }
    });
}

function handleNavigation(targetPage) {
    const currentPath = window.location.pathname;
    
    if (currentPath.includes('day')) {
        // We're on a day page, navigate to home page with target section
        if (targetPage === 'home') {
            window.location.href = 'index.html';
        } else {
            window.location.href = `index.html#${targetPage}`;
        }
    } else {
        // We're on the home page, scroll to section
        if (targetPage === 'home') {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        } else {
            const targetSection = document.getElementById(targetPage);
            if (targetSection) {
                targetSection.scrollIntoView({ behavior: 'smooth' });
            }
        }
    }
}

// Close modal when clicking outside
document.addEventListener('DOMContentLoaded', function() {
    const modal = document.getElementById('challengeModal');
    if (modal) {
        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                closeChallengeModal();
            }
        });
    }
    
    // Close modal with Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modal && modal.classList.contains('active')) {
            closeChallengeModal();
        }
    });
}); 