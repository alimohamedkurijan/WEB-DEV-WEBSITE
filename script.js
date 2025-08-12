// Global variables
let currentChallenge = 0;
let currentTab = 'html';
let currentDay = 1;

// Monaco Editor instances
let monacoEditor = null;
let monacoEditorMain = null;
let monacoEditorLesson = null;
let currentModalChallenge = null;
let currentModalEditor = null;

// Challenge data for all days
window.challengeData = {
    1: { // HTML Fundamentals
        title: "HTML Fundamentals",
        challenges: [
            {
                id: 1,
                title: "Basic HTML Structure",
                description: "Create a complete HTML document with proper DOCTYPE, html, head, and body tags. Include a title and a main heading.",
                starterCode: `<!DOCTYPE html>
<html>
<head>
    <title>My First Webpage</title>
</head>
<body>
    <!-- Add your content here -->
    
</body>
</html>`,
                solution: `<!DOCTYPE html>
<html>
<head>
    <title>My First Webpage</title>
</head>
<body>
    <h1>Welcome to My Website</h1>
    
</body>
</html>`,
                validation: (code) => {
                    return code.includes('<!DOCTYPE html>') && 
                           code.includes('<html>') && 
                           code.includes('<head>') && 
                           code.includes('<title>') && 
                           code.includes('<body>') && 
                           code.includes('<h1>');
                },
                elementChecks: [
                    { element: '<!DOCTYPE html>', description: 'DOCTYPE declaration' },
                    { element: '<html>', description: 'HTML root element' },
                    { element: '<head>', description: 'Head section' },
                    { element: '<title>', description: 'Page title' },
                    { element: '<body>', description: 'Body section' },
                    { element: '<h1>', description: 'Main heading' }
                ],
                hints: [
                    "Make sure to include the DOCTYPE declaration",
                    "Add a title inside the head section",
                    "Include at least one h1 heading in the body"
                ]
            },
            {
                id: 2,
                title: "Text Elements",
                description: "Create a webpage with different text elements: headings, paragraphs, and emphasis tags.",
                starterCode: `<!DOCTYPE html>
<html>
<head>
    <title>Text Elements</title>
</head>
<body>
    <!-- Add headings, paragraphs, and emphasis here -->
    
</body>
</html>`,
                solution: `<!DOCTYPE html>
<html>
<head>
    <title>Text Elements</title>
</head>
<body>
    <h1>Main Heading</h1>
    <h2>Sub Heading</h2>
    <p>This is a paragraph with <strong>bold text</strong> and <em>italic text</em>.</p>
    <p>Another paragraph with <mark>highlighted text</mark>.</p>
</body>
</html>`,
                validation: (code) => {
                    return code.includes('<h1>') && 
                           code.includes('<h2>') && 
                           code.includes('<p>') && 
                           (code.includes('<strong>') || code.includes('<em>'));
                },
                elementChecks: [
                    { element: '<h1>', description: 'Main heading (h1)' },
                    { element: '<h2>', description: 'Sub heading (h2)' },
                    { element: '<p>', description: 'Paragraph element' },
                    { element: '<strong>', description: 'Bold/strong text' },
                    { element: '<em>', description: 'Italic/emphasis text' }
                ],
                hints: [
                    "Use h1 for main heading",
                    "Use h2 for sub heading", 
                    "Add paragraphs with p tags",
                    "Use strong for bold and em for italic"
                ]
            },
            {
                id: 3,
                title: "Links and Images",
                description: "Create a webpage with links and images. Include both internal and external links.",
                starterCode: `<!DOCTYPE html>
<html>
<head>
    <title>Links and Images</title>
</head>
<body>
    <!-- Add links and images here -->
    
</body>
</html>`,
                solution: `<!DOCTYPE html>
<html>
<head>
    <title>Links and Images</title>
</head>
<body>
    <h1>My Website</h1>
    
    <p>Visit <a href="https://www.google.com">Google</a> for search.</p>
    
    <p>Here's an image:</p>
    <img src="https://via.placeholder.com/300x200" alt="Placeholder image">
    
    <p><a href="#top">Back to top</a></p>
</body>
</html>`,
                validation: (code) => {
                    return code.includes('<a href=') && 
                           code.includes('<img') && 
                           code.includes('alt=');
                },
                elementChecks: [
                    { element: '<a href=', description: 'Link with href attribute' },
                    { element: '<img', description: 'Image element' },
                    { element: 'alt=', description: 'Alt attribute for accessibility' }
                ],
                hints: [
                    "Use a tags for links with href attribute",
                    "Use img tags with src and alt attributes",
                    "Include both external and internal links"
                ]
            },
            {
                id: 4,
                title: "Lists and Structure",
                description: "Create a webpage with ordered and unordered lists, demonstrating proper HTML structure.",
                starterCode: `<!DOCTYPE html>
<html>
<head>
    <title>Lists and Structure</title>
</head>
<body>
    <!-- Add lists and structured content here -->
    
</body>
</html>`,
                solution: `<!DOCTYPE html>
<html>
<head>
    <title>Lists and Structure</title>
</head>
<body>
    <h1>My Favorite Things</h1>
    
    <h2>Programming Languages (Ordered)</h2>
    <ol>
        <li>HTML</li>
        <li>CSS</li>
        <li>JavaScript</li>
    </ol>
    
    <h2>Web Technologies (Unordered)</h2>
    <ul>
        <li>React</li>
        <li>Vue.js</li>
        <li>Node.js</li>
    </ul>
</body>
</html>`,
                validation: (code) => {
                    return code.includes('<ol>') && 
                           code.includes('<ul>') && 
                           code.includes('<li>');
                },
                elementChecks: [
                    { element: '<ol>', description: 'Ordered list (ol)' },
                    { element: '<ul>', description: 'Unordered list (ul)' },
                    { element: '<li>', description: 'List items (li)' }
                ],
                hints: [
                    "Use ol for ordered lists",
                    "Use ul for unordered lists",
                    "Each list item should be wrapped in li tags"
                ]
            }
        ]
    },
    2: { // HTML Forms
        title: "HTML Forms & Media",
        challenges: [
            {
                id: 1,
                title: "Basic Form Structure",
                description: "Create a contact form with proper form structure and input fields.",
                starterCode: `<!DOCTYPE html>
<html>
<head>
    <title>Contact Form</title>
</head>
<body>
    <!-- Create a contact form here -->
    
</body>
</html>`,
                solution: `<!DOCTYPE html>
<html>
<head>
    <title>Contact Form</title>
</head>
<body>
    <h1>Contact Us</h1>
    
    <form action="/submit" method="post">
        <label for="name">Name:</label>
        <input type="text" id="name" name="name" required>
        
        <label for="email">Email:</label>
        <input type="email" id="email" name="email" required>
        
        <label for="message">Message:</label>
        <textarea id="message" name="message" rows="4" required></textarea>
        
        <button type="submit">Send Message</button>
    </form>
</body>
</html>`,
                validation: (code) => {
                    return code.includes('<form') && 
                           code.includes('<input') && 
                           code.includes('<label') && 
                           code.includes('<textarea');
                },
                elementChecks: [
                    { element: '<form', description: 'Form container' },
                    { element: '<input', description: 'Input field' },
                    { element: '<label', description: 'Label for input' },
                    { element: '<textarea', description: 'Text area for longer text' }
                ],
                hints: [
                    "Use form tag with action and method attributes",
                    "Include label and input pairs",
                    "Use textarea for longer text input",
                    "Add a submit button"
                ]
            },
            {
                id: 2,
                title: "Different Input Types",
                description: "Create a form with various input types: text, email, password, checkbox, radio, and select.",
                starterCode: `<!DOCTYPE html>
<html>
<head>
    <title>Input Types</title>
</head>
<body>
    <!-- Create a form with different input types -->
    
</body>
</html>`,
                solution: `<!DOCTYPE html>
<html>
<head>
    <title>Input Types</title>
</head>
<body>
    <h1>Registration Form</h1>
    
    <form>
        <label for="username">Username:</label>
        <input type="text" id="username" name="username" required>
        
        <label for="email">Email:</label>
        <input type="email" id="email" name="email" required>
        
        <label for="password">Password:</label>
        <input type="password" id="password" name="password" required>
        
        <label for="age">Age:</label>
        <input type="number" id="age" name="age" min="18" max="100">
        
        <label>Gender:</label>
        <input type="radio" id="male" name="gender" value="male">
        <label for="male">Male</label>
        <input type="radio" id="female" name="gender" value="female">
        <label for="female">Female</label>
        
        <label for="newsletter">Subscribe to newsletter:</label>
        <input type="checkbox" id="newsletter" name="newsletter">
        
        <label for="country">Country:</label>
        <select id="country" name="country">
            <option value="">Select a country</option>
            <option value="us">United States</option>
            <option value="uk">United Kingdom</option>
            <option value="ca">Canada</option>
        </select>
        
        <button type="submit">Register</button>
    </form>
</body>
</html>`,
                validation: (code) => {
                    return code.includes('type="text"') && 
                           code.includes('type="email"') && 
                           code.includes('type="password"') && 
                           code.includes('type="radio"') && 
                           code.includes('type="checkbox"') && 
                           code.includes('<select>');
                },
                elementChecks: [
                    { element: 'type="text"', description: 'Text input field' },
                    { element: 'type="email"', description: 'Email input field' },
                    { element: 'type="password"', description: 'Password input field' },
                    { element: 'type="radio"', description: 'Radio button input' },
                    { element: 'type="checkbox"', description: 'Checkbox input' },
                    { element: '<select>', description: 'Select dropdown menu' }
                ],
                hints: [
                    "Use different type attributes for inputs",
                    "Include radio buttons for single choice",
                    "Use checkboxes for multiple choice",
                    "Add a select dropdown"
                ]
            },
            {
                id: 3,
                title: "Media Elements",
                description: "Create a webpage with audio and video elements, demonstrating multimedia integration.",
                starterCode: `<!DOCTYPE html>
<html>
<head>
    <title>Media Elements</title>
</head>
<body>
    <!-- Add audio and video elements here -->
    
</body>
</html>`,
                solution: `<!DOCTYPE html>
<html>
<head>
    <title>Media Elements</title>
</head>
<body>
    <h1>Multimedia Content</h1>
    
    <h2>Audio Player</h2>
    <audio controls>
        <source src="https://www.soundjay.com/misc/sounds/bell-ringing-05.wav" type="audio/wav">
        Your browser does not support the audio element.
    </audio>
    
    <h2>Video Player</h2>
    <video width="320" height="240" controls>
        <source src="https://www.w3schools.com/html/mov_bbb.mp4" type="video/mp4">
        Your browser does not support the video element.
    </video>
    
    <h2>Embedded Content</h2>
    <iframe width="560" height="315" 
            src="https://www.youtube.com/embed/dQw4w9WgXcQ" 
            frameborder="0" 
            allowfullscreen>
    </iframe>
</body>
</html>`,
                validation: (code) => {
                    return code.includes('<audio') && 
                           code.includes('<video') && 
                           code.includes('<iframe');
                },
                elementChecks: [
                    { element: '<audio', description: 'Audio element' },
                    { element: '<video', description: 'Video element' },
                    { element: '<iframe', description: 'Iframe for embedded content' },
                    { element: 'controls', description: 'Controls attribute for media' }
                ],
                hints: [
                    "Use audio tag with controls attribute",
                    "Use video tag with width, height, and controls",
                    "Include iframe for embedded content",
                    "Add fallback text for unsupported browsers"
                ]
            },
            {
                id: 4,
                title: "Form Validation",
                description: "Create a form with HTML5 validation attributes and proper error handling.",
                starterCode: `<!DOCTYPE html>
<html>
<head>
    <title>Form Validation</title>
</head>
<body>
    <!-- Create a form with validation attributes -->
    
</body>
</html>`,
                solution: `<!DOCTYPE html>
<html>
<head>
    <title>Form Validation</title>
</head>
<body>
    <h1>Validated Form</h1>
    
    <form>
        <label for="name">Full Name:</label>
        <input type="text" id="name" name="name" required minlength="2" maxlength="50" 
               pattern="[A-Za-z ]+" title="Only letters and spaces allowed">
        
        <label for="email">Email:</label>
        <input type="email" id="email" name="email" required>
        
        <label for="phone">Phone:</label>
        <input type="tel" id="phone" name="phone" pattern="[0-9]{10}" 
               title="Please enter a 10-digit phone number">
        
        <label for="age">Age:</label>
        <input type="number" id="age" name="age" min="18" max="120" required>
        
        <label for="website">Website:</label>
        <input type="url" id="website" name="website" 
               placeholder="https://example.com">
        
        <label for="password">Password:</label>
        <input type="password" id="password" name="password" 
               required minlength="8" 
               pattern="(?=.*\\d)(?=.*[a-z])(?=.*[A-Z]).{8,}" 
               title="Must contain at least one number, one uppercase and lowercase letter, and at least 8 characters">
        
        <button type="submit">Submit</button>
    </form>
</body>
</html>`,
                validation: (code) => {
                    return code.includes('required') && 
                           code.includes('pattern=') && 
                           code.includes('minlength=') && 
                           code.includes('type="email"') && 
                           code.includes('type="tel"');
                },
                elementChecks: [
                    { element: 'required', description: 'Required validation attribute' },
                    { element: 'pattern=', description: 'Pattern validation attribute' },
                    { element: 'minlength=', description: 'Minimum length validation' },
                    { element: 'type="email"', description: 'Email input type' },
                    { element: 'type="tel"', description: 'Telephone input type' }
                ],
                hints: [
                    "Use required attribute for mandatory fields",
                    "Add pattern attribute for custom validation",
                    "Use minlength and maxlength for text length",
                    "Include appropriate input types (email, tel, url)"
                ]
            }
        ]
    },
    3: { // CSS Basics
        title: "CSS Basics",
        challenges: [
            {
                id: 1,
                title: "Basic CSS Styling",
                description: "Create a webpage with basic CSS styling including colors, fonts, and text alignment.",
                starterCode: `<!DOCTYPE html>
<html>
<head>
    <title>CSS Basics</title>
    <style>
        /* Add your CSS styles here */
        
    </style>
</head>
<body>
    <h1>Welcome to CSS</h1>
    <p>This is a paragraph with some text.</p>
    <div class="highlight">This is a highlighted section.</div>
</body>
</html>`,
                solution: `<!DOCTYPE html>
<html>
<head>
    <title>CSS Basics</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f0f0f0;
            margin: 20px;
        }
        
        h1 {
            color: #333;
            text-align: center;
            font-size: 2.5em;
        }
        
        p {
            color: var(--text-primary);
            line-height: 1.6;
            font-size: 16px;
        }
        
        .highlight {
            background-color: #ffeb3b;
            padding: 10px;
            border-radius: 5px;
            font-weight: bold;
        }
    </style>
</head>
<body>
    <h1>Welcome to CSS</h1>
    <p>This is a paragraph with some text.</p>
    <div class="highlight">This is a highlighted section.</div>
</body>
</html>`,
                validation: (code) => {
                    return code.includes('font-family') && 
                           code.includes('color') && 
                           code.includes('background-color') && 
                           code.includes('.highlight');
                },
                elementChecks: [
                    { element: 'font-family', description: 'Font family property' },
                    { element: 'color', description: 'Text color property' },
                    { element: 'background-color', description: 'Background color property' },
                    { element: '.highlight', description: 'Class selector for highlight' }
                ],
                hints: [
                    "Use font-family to set the font",
                    "Use color for text color",
                    "Use background-color for background",
                    "Create a class selector for the highlight div"
                ]
            },
            {
                id: 2,
                title: "CSS Selectors",
                description: "Practice using different CSS selectors: element, class, and ID selectors.",
                starterCode: `<!DOCTYPE html>
<html>
<head>
    <title>CSS Selectors</title>
    <style>
        /* Style the elements using different selectors */
        
    </style>
</head>
<body>
    <h1>CSS Selectors</h1>
    <p class="intro">This is an introductory paragraph.</p>
    <p>This is a regular paragraph.</p>
    <div id="main-content">
        <h2>Main Content</h2>
        <p class="special">This is a special paragraph.</p>
    </div>
    <ul>
        <li>List item 1</li>
        <li class="highlight">List item 2</li>
        <li>List item 3</li>
    </ul>
</body>
</html>`,
                solution: `<!DOCTYPE html>
<html>
<head>
    <title>CSS Selectors</title>
    <style>
        /* Element selector */
        h1 {
            color: #2c3e50;
            text-align: center;
        }
        
        /* Class selector */
        .intro {
            font-size: 18px;
            color: #3498db;
            font-weight: bold;
        }
        
        /* ID selector */
        #main-content {
            background-color: #ecf0f1;
            padding: 20px;
            border-radius: 8px;
            margin: 20px 0;
        }
        
        /* Descendant selector */
        #main-content h2 {
            color: #e74c3c;
        }
        
        /* Class selector */
        .special {
            background-color: #f39c12;
            color: white;
            padding: 10px;
            border-radius: 5px;
        }
        
        /* Multiple selectors */
        li.highlight {
            background-color: #2ecc71;
            color: white;
            padding: 5px 10px;
            border-radius: 3px;
        }
    </style>
</head>
<body>
    <h1>CSS Selectors</h1>
    <p class="intro">This is an introductory paragraph.</p>
    <p>This is a regular paragraph.</p>
    <div id="main-content">
        <h2>Main Content</h2>
        <p class="special">This is a special paragraph.</p>
    </div>
    <ul>
        <li>List item 1</li>
        <li class="highlight">List item 2</li>
        <li>List item 3</li>
    </ul>
</body>
</html>`,
                validation: (code) => {
                    return code.includes('.intro') && 
                           code.includes('#main-content') && 
                           code.includes('h1 {') && 
                           code.includes('.special');
                },
                elementChecks: [
                    { element: '.intro', description: 'Class selector (.intro)' },
                    { element: '#main-content', description: 'ID selector (#main-content)' },
                    { element: 'h1 {', description: 'Element selector (h1)' },
                    { element: '.special', description: 'Class selector (.special)' }
                ],
                hints: [
                    "Use element selectors (h1, p) for basic styling",
                    "Use class selectors (.intro, .special) for specific elements",
                    "Use ID selectors (#main-content) for unique elements",
                    "Combine selectors for more specific targeting"
                ]
            },
            {
                id: 3,
                title: "CSS Box Model",
                description: "Practice using margin, padding, border, and width/height properties.",
                starterCode: `<!DOCTYPE html>
<html>
<head>
    <title>CSS Box Model</title>
    <style>
        /* Apply box model properties to the boxes */
        
    </style>
</head>
<body>
    <div class="box box1">Box 1</div>
    <div class="box box2">Box 2</div>
    <div class="box box3">Box 3</div>
</body>
</html>`,
                solution: `<!DOCTYPE html>
<html>
<head>
    <title>CSS Box Model</title>
    <style>
        .box {
            width: 200px;
            height: 100px;
            margin: 20px;
            padding: 15px;
            border: 3px solid #333;
            text-align: center;
            line-height: 70px;
            font-weight: bold;
        }
        
        .box1 {
            background-color: #e74c3c;
            color: white;
            border-radius: 10px;
        }
        
        .box2 {
            background-color: #3498db;
            color: white;
            border-radius: 0;
            border-style: dashed;
        }
        
        .box3 {
            background-color: #2ecc71;
            color: white;
            border-radius: 50px;
            border-width: 5px;
        }
    </style>
</head>
<body>
    <div class="box box1">Box 1</div>
    <div class="box box2">Box 2</div>
    <div class="box box3">Box 3</div>
</body>
</html>`,
                validation: (code) => {
                    return code.includes('margin') && 
                           code.includes('padding') && 
                           code.includes('border') && 
                           code.includes('width') && 
                           code.includes('height');
                },
                elementChecks: [
                    { element: 'margin', description: 'Margin property for outer spacing' },
                    { element: 'padding', description: 'Padding property for inner spacing' },
                    { element: 'border', description: 'Border property for element borders' },
                    { element: 'width', description: 'Width property for element width' },
                    { element: 'height', description: 'Height property for element height' }
                ],
                hints: [
                    "Use margin for spacing between elements",
                    "Use padding for internal spacing",
                    "Use border for element borders",
                    "Set width and height for element dimensions"
                ]
            },
            {
                id: 4,
                title: "CSS Colors and Typography",
                description: "Practice using different color formats and typography properties.",
                starterCode: `<!DOCTYPE html>
<html>
<head>
    <title>Colors and Typography</title>
    <style>
        /* Apply colors and typography styles */
        
    </style>
</head>
<body>
    <h1>Typography and Colors</h1>
    <p class="text1">This text uses different color formats.</p>
    <p class="text2">This text has custom typography.</p>
    <p class="text3">This text combines both colors and typography.</p>
</body>
</html>`,
                solution: `<!DOCTYPE html>
<html>
<head>
    <title>Colors and Typography</title>
    <style>
        body {
            font-family: 'Georgia', serif;
            line-height: 1.6;
            margin: 40px;
        }
        
        h1 {
            color: #ff6b6b;
            font-size: 2.5em;
            text-align: center;
            text-shadow: 2px 2px 4px rgba(0,0,0,0.3);
        }
        
        .text1 {
            color: rgb(52, 152, 219);
            font-size: 18px;
            font-weight: 600;
        }
        
        .text2 {
            color: hsl(120, 70%, 50%);
            font-family: 'Arial', sans-serif;
            font-style: italic;
            letter-spacing: 2px;
            text-transform: uppercase;
        }
        
        .text3 {
            color: #9b59b6;
            font-family: 'Courier New', monospace;
            font-size: 16px;
            text-decoration: underline;
            word-spacing: 5px;
        }
    </style>
</head>
<body>
    <h1>Typography and Colors</h1>
    <p class="text1">This text uses different color formats.</p>
    <p class="text2">This text has custom typography.</p>
    <p class="text3">This text combines both colors and typography.</p>
</body>
</html>`,
                validation: (code) => {
                    return code.includes('color:') && 
                           code.includes('font-family') && 
                           code.includes('font-size') && 
                           (code.includes('rgb(') || code.includes('hsl(') || code.includes('#'));
                },
                elementChecks: [
                    { element: 'color:', description: 'Color property for text color' },
                    { element: 'font-family', description: 'Font family property' },
                    { element: 'font-size', description: 'Font size property' },
                    { element: '#', description: 'Hex color format' },
                    { element: 'rgb(', description: 'RGB color format' }
                ],
                hints: [
                    "Use different color formats: hex, rgb, hsl",
                    "Apply font-family for different typefaces",
                    "Use font-size for text sizing",
                    "Add text effects like text-shadow and text-transform"
                ]
            },
            {
                id: 5,
                title: "CSS Pseudo-classes",
                description: "Practice using pseudo-classes like :hover, :focus, and :nth-child.",
                starterCode: `<!DOCTYPE html>
<html>
<head>
    <title>CSS Pseudo-classes</title>
    <style>
        /* Add styles with pseudo-classes */
        
    </style>
</head>
<body>
    <h1>Interactive Elements</h1>
    <button class="btn">Hover over me</button>
    <input type="text" placeholder="Focus on me" class="input-field">
    <ul>
        <li>First item</li>
        <li>Second item</li>
        <li>Third item</li>
        <li>Fourth item</li>
        <li>Fifth item</li>
    </ul>
</body>
</html>`,
                solution: `<!DOCTYPE html>
<html>
<head>
    <title>CSS Pseudo-classes</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            margin: 40px;
        }
        
        .btn {
            padding: 10px 20px;
            background-color: #3498db;
            color: white;
            border: none;
            border-radius: 5px;
            cursor: pointer;
            font-size: 16px;
            transition: all 0.3s ease;
        }
        
        .btn:hover {
            background-color: #2980b9;
            transform: scale(1.05);
        }
        
        .btn:active {
            transform: scale(0.95);
        }
        
        .input-field {
            padding: 10px;
            border: 2px solid #ddd;
            border-radius: 5px;
            font-size: 16px;
            margin: 10px 0;
            width: 200px;
        }
        
        .input-field:focus {
            outline: none;
            border-color: #3498db;
            box-shadow: 0 0 5px rgba(52, 152, 219, 0.5);
        }
        
        li:nth-child(odd) {
            background-color: #f8f9fa;
            padding: 5px 10px;
            margin: 2px 0;
        }
        
        li:nth-child(even) {
            background-color: #e9ecef;
            padding: 5px 10px;
            margin: 2px 0;
        }
        
        li:hover {
            background-color: #007bff;
            color: white;
            cursor: pointer;
        }
    </style>
</head>
<body>
    <h1>Interactive Elements</h1>
    <button class="btn">Hover over me</button>
    <input type="text" placeholder="Focus on me" class="input-field">
    <ul>
        <li>First item</li>
        <li>Second item</li>
        <li>Third item</li>
        <li>Fourth item</li>
        <li>Fifth item</li>
    </ul>
</body>
</html>`,
                validation: (code) => {
                    return code.includes(':hover') && 
                           code.includes(':focus') && 
                           code.includes(':nth-child') && 
                           code.includes('transition');
                },
                hints: [
                    "Use :hover for mouse interaction effects",
                    "Use :focus for input field styling",
                    "Use :nth-child for alternating list styles",
                    "Add transition for smooth animations"
                ]
            }
        ]
    },
    4: { // CSS Layout
        title: "CSS Layout",
        challenges: [
            {
                id: 1,
                title: "Flexbox Basics",
                description: "Create a layout using CSS Flexbox to arrange elements horizontally and vertically.",
                starterCode: `<!DOCTYPE html>
<html>
<head>
    <title>Flexbox Basics</title>
    <style>
        /* Use flexbox to arrange the boxes */
        
    </style>
</head>
<body>
    <div class="container">
        <div class="box">Box 1</div>
        <div class="box">Box 2</div>
        <div class="box">Box 3</div>
    </div>
</body>
</html>`,
                solution: `<!DOCTYPE html>
<html>
<head>
    <title>Flexbox Basics</title>
    <style>
        body {
            margin: 0;
            padding: 20px;
            font-family: Arial, sans-serif;
        }
        
        .container {
            display: flex;
            justify-content: space-between;
            align-items: center;
            background-color: #f8f9fa;
            padding: 20px;
            border-radius: 10px;
            min-height: 200px;
        }
        
        .box {
            background-color: #007bff;
            color: white;
            padding: 20px;
            border-radius: 5px;
            text-align: center;
            flex: 1;
            margin: 0 10px;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="box">Box 1</div>
        <div class="box">Box 2</div>
        <div class="box">Box 3</div>
    </div>
</body>
</html>`,
                validation: (code) => {
                    return code.includes('display: flex') && 
                           code.includes('justify-content') && 
                           code.includes('align-items');
                },
                hints: [
                    "Use display: flex on the container",
                    "Use justify-content for horizontal alignment",
                    "Use align-items for vertical alignment",
                    "Use flex: 1 for equal width distribution"
                ]
            },
            {
                id: 2,
                title: "Flexbox Direction and Wrap",
                description: "Practice using flex-direction and flex-wrap properties to control layout flow.",
                starterCode: `<!DOCTYPE html>
<html>
<head>
    <title>Flexbox Direction and Wrap</title>
    <style>
        /* Create different flex layouts */
        
    </style>
</head>
<body>
    <h2>Horizontal Layout</h2>
    <div class="container horizontal">
        <div class="item">Item 1</div>
        <div class="item">Item 2</div>
        <div class="item">Item 3</div>
        <div class="item">Item 4</div>
        <div class="item">Item 5</div>
        <div class="item">Item 6</div>
    </div>
    
    <h2>Vertical Layout</h2>
    <div class="container vertical">
        <div class="item">Item 1</div>
        <div class="item">Item 2</div>
        <div class="item">Item 3</div>
    </div>
    
    <h2>Wrapped Layout</h2>
    <div class="container wrapped">
        <div class="item">Item 1</div>
        <div class="item">Item 2</div>
        <div class="item">Item 3</div>
        <div class="item">Item 4</div>
        <div class="item">Item 5</div>
        <div class="item">Item 6</div>
        <div class="item">Item 7</div>
        <div class="item">Item 8</div>
    </div>
</body>
</html>`,
                solution: `<!DOCTYPE html>
<html>
<head>
    <title>Flexbox Direction and Wrap</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            margin: 20px;
        }
        
        .container {
            display: flex;
            background-color: #f8f9fa;
            padding: 15px;
            margin: 20px 0;
            border-radius: 8px;
            min-height: 100px;
        }
        
        .horizontal {
            flex-direction: row;
            justify-content: space-around;
        }
        
        .vertical {
            flex-direction: column;
            align-items: center;
        }
        
        .wrapped {
            flex-wrap: wrap;
            justify-content: flex-start;
        }
        
        .item {
            background-color: #28a745;
            color: white;
            padding: 15px;
            margin: 5px;
            border-radius: 5px;
            text-align: center;
            min-width: 80px;
        }
        
        .wrapped .item {
            flex: 0 0 calc(25% - 10px);
        }
    </style>
</head>
<body>
    <h2>Horizontal Layout</h2>
    <div class="container horizontal">
        <div class="item">Item 1</div>
        <div class="item">Item 2</div>
        <div class="item">Item 3</div>
        <div class="item">Item 4</div>
        <div class="item">Item 5</div>
        <div class="item">Item 6</div>
    </div>
    
    <h2>Vertical Layout</h2>
    <div class="container vertical">
        <div class="item">Item 1</div>
        <div class="item">Item 2</div>
        <div class="item">Item 3</div>
    </div>
    
    <h2>Wrapped Layout</h2>
    <div class="container wrapped">
        <div class="item">Item 1</div>
        <div class="item">Item 2</div>
        <div class="item">Item 3</div>
        <div class="item">Item 4</div>
        <div class="item">Item 5</div>
        <div class="item">Item 6</div>
        <div class="item">Item 7</div>
        <div class="item">Item 8</div>
    </div>
</body>
</html>`,
                validation: (code) => {
                    return code.includes('flex-direction') && 
                           code.includes('flex-wrap') && 
                           code.includes('display: flex');
                },
                hints: [
                    "Use flex-direction: row for horizontal layout",
                    "Use flex-direction: column for vertical layout",
                    "Use flex-wrap: wrap for wrapping items",
                    "Set flex-basis for wrapped items"
                ]
            },
            {
                id: 3,
                title: "CSS Grid Basics",
                description: "Create a layout using CSS Grid with rows and columns.",
                starterCode: `<!DOCTYPE html>
<html>
<head>
    <title>CSS Grid Basics</title>
    <style>
        /* Create a grid layout */
        
    </style>
</head>
<body>
    <div class="grid-container">
        <div class="grid-item header">Header</div>
        <div class="grid-item sidebar">Sidebar</div>
        <div class="grid-item main">Main Content</div>
        <div class="grid-item footer">Footer</div>
    </div>
</body>
</html>`,
                solution: `<!DOCTYPE html>
<html>
<head>
    <title>CSS Grid Basics</title>
    <style>
        body {
            margin: 0;
            padding: 20px;
            font-family: Arial, sans-serif;
        }
        
        .grid-container {
            display: grid;
            grid-template-columns: 1fr 3fr;
            grid-template-rows: 80px 1fr 80px;
            grid-template-areas: 
                "header header"
                "sidebar main"
                "footer footer";
            gap: 10px;
            height: 400px;
        }
        
        .grid-item {
            padding: 20px;
            border-radius: 8px;
            text-align: center;
            font-weight: bold;
            color: white;
        }
        
        .header {
            background-color: #007bff;
            grid-area: header;
        }
        
        .sidebar {
            background-color: #6c757d;
            grid-area: sidebar;
        }
        
        .main {
            background-color: #28a745;
            grid-area: main;
        }
        
        .footer {
            background-color: #dc3545;
            grid-area: footer;
        }
    </style>
</head>
<body>
    <div class="grid-container">
        <div class="grid-item header">Header</div>
        <div class="grid-item sidebar">Sidebar</div>
        <div class="grid-item main">Main Content</div>
        <div class="grid-item footer">Footer</div>
    </div>
</body>
</html>`,
                validation: (code) => {
                    return code.includes('display: grid') && 
                           code.includes('grid-template-columns') && 
                           code.includes('grid-template-areas') && 
                           code.includes('grid-area');
                },
                hints: [
                    "Use display: grid on the container",
                    "Define grid-template-columns for column layout",
                    "Use grid-template-areas for named areas",
                    "Assign grid-area to each item"
                ]
            },
            {
                id: 4,
                title: "Responsive Grid Layout",
                description: "Create a responsive grid layout that adapts to different screen sizes.",
                starterCode: `<!DOCTYPE html>
<html>
<head>
    <title>Responsive Grid</title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <style>
        /* Create a responsive grid layout */
        
    </style>
</head>
<body>
    <div class="responsive-grid">
        <div class="card">Card 1</div>
        <div class="card">Card 2</div>
        <div class="card">Card 3</div>
        <div class="card">Card 4</div>
        <div class="card">Card 5</div>
        <div class="card">Card 6</div>
    </div>
</body>
</html>`,
                solution: `<!DOCTYPE html>
<html>
<head>
    <title>Responsive Grid</title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <style>
        body {
            margin: 0;
            padding: 20px;
            font-family: Arial, sans-serif;
        }
        
        .responsive-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
            gap: 20px;
            max-width: 1200px;
            margin: 0 auto;
        }
        
        .card {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            padding: 30px;
            border-radius: 10px;
            text-align: center;
            font-size: 18px;
            font-weight: bold;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
            transition: transform 0.3s ease;
        }
        
        .card:hover {
            transform: translateY(-5px);
        }
        
        /* Mobile-first responsive design */
        @media (max-width: 768px) {
            .responsive-grid {
                grid-template-columns: 1fr;
                gap: 15px;
            }
            
            .card {
                padding: 20px;
                font-size: 16px;
            }
        }
        
        @media (min-width: 769px) and (max-width: 1024px) {
            .responsive-grid {
                grid-template-columns: repeat(2, 1fr);
            }
        }
    </style>
</head>
<body>
    <div class="responsive-grid">
        <div class="card">Card 1</div>
        <div class="card">Card 2</div>
        <div class="card">Card 3</div>
        <div class="card">Card 4</div>
        <div class="card">Card 5</div>
        <div class="card">Card 6</div>
    </div>
</body>
</html>`,
                validation: (code) => {
                    return code.includes('display: grid') && 
                           code.includes('grid-template-columns') && 
                           code.includes('@media') && 
                           code.includes('minmax(');
                },
                hints: [
                    "Use grid-template-columns with auto-fit and minmax",
                    "Add media queries for different screen sizes",
                    "Use responsive units like fr and minmax",
                    "Include viewport meta tag for mobile"
                ]
            },
            {
                id: 5,
                title: "Flexbox vs Grid Layout",
                description: "Create a layout that combines both Flexbox and Grid for optimal results.",
                starterCode: `<!DOCTYPE html>
<html>
<head>
    <title>Flexbox vs Grid</title>
    <style>
        /* Combine flexbox and grid for the layout */
        
    </style>
</head>
<body>
    <div class="page-layout">
        <header class="header">
            <h1>Website Title</h1>
            <nav class="nav">
                <a href="#">Home</a>
                <a href="#">About</a>
                <a href="#">Contact</a>
            </nav>
        </header>
        
        <main class="main-content">
            <aside class="sidebar">
                <h3>Sidebar</h3>
                <ul>
                    <li>Link 1</li>
                    <li>Link 2</li>
                    <li>Link 3</li>
                </ul>
            </aside>
            
            <section class="content">
                <article class="card">
                    <h2>Article 1</h2>
                    <p>Content here...</p>
                </article>
                <article class="card">
                    <h2>Article 2</h2>
                    <p>Content here...</p>
                </article>
            </section>
        </main>
        
        <footer class="footer">
            <p>&copy; 2024 Website</p>
        </footer>
    </div>
</body>
</html>`,
                solution: `<!DOCTYPE html>
<html>
<head>
    <title>Flexbox vs Grid</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        
        body {
            font-family: Arial, sans-serif;
            line-height: 1.6;
        }
        
        .page-layout {
            display: grid;
            grid-template-rows: auto 1fr auto;
            min-height: 100vh;
        }
        
        .header {
            background-color: #2c3e50;
            color: white;
            padding: 1rem;
            display: flex;
            justify-content: space-between;
            align-items: center;
        }
        
        .nav {
            display: flex;
            gap: 20px;
        }
        
        .nav a {
            color: white;
            text-decoration: none;
            padding: 5px 10px;
            border-radius: 3px;
            transition: background-color 0.3s;
        }
        
        .nav a:hover {
            background-color: #34495e;
        }
        
        .main-content {
            display: grid;
            grid-template-columns: 250px 1fr;
            gap: 20px;
            padding: 20px;
        }
        
        .sidebar {
            background-color: #ecf0f1;
            padding: 20px;
            border-radius: 8px;
        }
        
        .sidebar ul {
            list-style: none;
            margin-top: 10px;
        }
        
        .sidebar li {
            padding: 8px 0;
            border-bottom: 1px solid #bdc3c7;
        }
        
        .content {
            display: flex;
            flex-direction: column;
            gap: 20px;
        }
        
        .card {
            background-color: white;
            padding: 20px;
            border-radius: 8px;
            box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }
        
        .footer {
            background-color: #34495e;
            color: white;
            text-align: center;
            padding: 1rem;
        }
        
        @media (max-width: 768px) {
            .main-content {
                grid-template-columns: 1fr;
            }
            
            .header {
                flex-direction: column;
                gap: 10px;
            }
            
            .nav {
                flex-wrap: wrap;
                justify-content: center;
            }
        }
    </style>
</head>
<body>
    <div class="page-layout">
        <header class="header">
            <h1>Website Title</h1>
            <nav class="nav">
                <a href="#">Home</a>
                <a href="#">About</a>
                <a href="#">Contact</a>
            </nav>
        </header>
        
        <main class="main-content">
            <aside class="sidebar">
                <h3>Sidebar</h3>
                <ul>
                    <li>Link 1</li>
                    <li>Link 2</li>
                    <li>Link 3</li>
                </ul>
            </aside>
            
            <section class="content">
                <article class="card">
                    <h2>Article 1</h2>
                    <p>Content here...</p>
                </article>
                <article class="card">
                    <h2>Article 2</h2>
                    <p>Content here...</p>
                </article>
            </section>
        </main>
        
        <footer class="footer">
            <p>&copy; 2024 Website</p>
        </footer>
    </div>
</body>
</html>`,
                validation: (code) => {
                    return code.includes('display: grid') && 
                           code.includes('display: flex') && 
                           code.includes('grid-template-columns') && 
                           code.includes('justify-content');
                },
                hints: [
                    "Use Grid for overall page layout",
                    "Use Flexbox for navigation and content alignment",
                    "Combine both for optimal layout control",
                    "Add responsive design with media queries"
                ]
            },
            {
                id: 6,
                title: "Advanced Grid Layout",
                description: "Create a complex grid layout with overlapping elements and advanced positioning.",
                starterCode: `<!DOCTYPE html>
<html>
<head>
    <title>Advanced Grid</title>
    <style>
        /* Create an advanced grid layout */
        
    </style>
</head>
<body>
    <div class="advanced-grid">
        <div class="item item1">Hero</div>
        <div class="item item2">Feature 1</div>
        <div class="item item3">Feature 2</div>
        <div class="item item4">Feature 3</div>
        <div class="item item5">Sidebar</div>
        <div class="item item6">Content</div>
        <div class="item item7">Footer</div>
    </div>
</body>
</html>`,
                solution: `<!DOCTYPE html>
<html>
<head>
    <title>Advanced Grid</title>
    <style>
        body {
            margin: 0;
            padding: 20px;
            font-family: Arial, sans-serif;
        }
        
        .advanced-grid {
            display: grid;
            grid-template-columns: repeat(4, 1fr);
            grid-template-rows: 200px 150px 150px 100px;
            grid-template-areas: 
                "hero hero hero sidebar"
                "feature1 feature2 feature3 sidebar"
                "content content content sidebar"
                "footer footer footer footer";
            gap: 15px;
            max-width: 1200px;
            margin: 0 auto;
        }
        
        .item {
            padding: 20px;
            border-radius: 8px;
            color: white;
            font-weight: bold;
            text-align: center;
            display: flex;
            align-items: center;
            justify-content: center;
        }
        
        .item1 {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            grid-area: hero;
            font-size: 24px;
        }
        
        .item2 {
            background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
            grid-area: feature1;
        }
        
        .item3 {
            background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);
            grid-area: feature2;
        }
        
        .item4 {
            background: linear-gradient(135deg, #43e97b 0%, #38f9d7 100%);
            grid-area: feature3;
        }
        
        .item5 {
            background: linear-gradient(135deg, #fa709a 0%, #fee140 100%);
            grid-area: sidebar;
            writing-mode: vertical-rl;
            text-orientation: mixed;
        }
        
        .item6 {
            background: linear-gradient(135deg, #a8edea 0%, #fed6e3 100%);
            grid-area: content;
            color: #333;
        }
        
        .item7 {
            background: linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%);
            grid-area: footer;
            color: #333;
        }
        
        @media (max-width: 768px) {
            .advanced-grid {
                grid-template-columns: 1fr;
                grid-template-rows: auto;
                grid-template-areas: 
                    "hero"
                    "feature1"
                    "feature2"
                    "feature3"
                    "sidebar"
                    "content"
                    "footer";
            }
            
            .item5 {
                writing-mode: horizontal-tb;
            }
        }
    </style>
</head>
<body>
    <div class="advanced-grid">
        <div class="item item1">Hero</div>
        <div class="item item2">Feature 1</div>
        <div class="item item3">Feature 2</div>
        <div class="item item4">Feature 3</div>
        <div class="item item5">Sidebar</div>
        <div class="item item6">Content</div>
        <div class="item item7">Footer</div>
    </div>
</body>
</html>`,
                validation: (code) => {
                    return code.includes('grid-template-areas') && 
                           code.includes('grid-area') && 
                           code.includes('repeat(') && 
                           code.includes('@media');
                },
                hints: [
                    "Use grid-template-areas for complex layouts",
                    "Define named areas for each grid item",
                    "Use repeat() for consistent column sizing",
                    "Add responsive breakpoints for mobile"
                ]
            }
        ]
    },
    5: { // CSS Advanced
        title: "Box Model & Styling",
        challenges: [
            {
                id: 1,
                title: "Box Model Mastery",
                description: "Practice using margin, padding, border, and box-sizing properties to understand the CSS box model.",
                starterCode: `<!DOCTYPE html>
<html>
<head>
    <title>Box Model</title>
    <style>
        /* Apply box model properties */
        
    </style>
</head>
<body>
    <div class="box box1">Box 1</div>
    <div class="box box2">Box 2</div>
    <div class="box box3">Box 3</div>
</body>
</html>`,
                solution: `<!DOCTYPE html>
<html>
<head>
    <title>Box Model</title>
    <style>
        * {
            box-sizing: border-box;
        }
        
        body {
            font-family: Arial, sans-serif;
            margin: 20px;
        }
        
        .box {
            width: 200px;
            height: 100px;
            margin: 20px;
            padding: 15px;
            border: 3px solid #333;
            text-align: center;
            line-height: 70px;
            font-weight: bold;
        }
        
        .box1 {
            background-color: #e74c3c;
            color: white;
            border-radius: 10px;
            box-shadow: 0 4px 8px rgba(0,0,0,0.3);
        }
        
        .box2 {
            background-color: #3498db;
            color: white;
            border-style: dashed;
            border-width: 5px;
            border-color: #2980b9;
            outline: 2px solid #f39c12;
            outline-offset: 5px;
        }
        
        .box3 {
            background-color: #2ecc71;
            color: white;
            border-radius: 50px;
            box-shadow: inset 0 0 10px rgba(0,0,0,0.3);
        }
    </style>
</head>
<body>
    <div class="box box1">Box 1</div>
    <div class="box box2">Box 2</div>
    <div class="box box3">Box 3</div>
</body>
</html>`,
                validation: (code) => {
                    return code.includes('box-sizing') && 
                           code.includes('margin') && 
                           code.includes('padding') && 
                           code.includes('border') && 
                           code.includes('box-shadow');
                },
                hints: [
                    "Use box-sizing: border-box for predictable sizing",
                    "Apply margin for external spacing",
                    "Use padding for internal spacing",
                    "Add borders with different styles and colors"
                ]
            },
            {
                id: 2,
                title: "Background Styling",
                description: "Practice using background properties including colors, images, gradients, and positioning.",
                starterCode: `<!DOCTYPE html>
<html>
<head>
    <title>Background Styling</title>
    <style>
        /* Apply background styles */
        
    </style>
</head>
<body>
    <div class="bg-section bg1">Gradient Background</div>
    <div class="bg-section bg2">Image Background</div>
    <div class="bg-section bg3">Pattern Background</div>
</body>
</html>`,
                solution: `<!DOCTYPE html>
<html>
<head>
    <title>Background Styling</title>
    <style>
        body {
            margin: 0;
            font-family: Arial, sans-serif;
        }
        
        .bg-section {
            height: 200px;
            margin: 20px;
            border-radius: 10px;
            display: flex;
            align-items: center;
            justify-content: center;
            color: white;
            font-size: 24px;
            font-weight: bold;
            text-shadow: 2px 2px 4px rgba(0,0,0,0.5);
        }
        
        .bg1 {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            background-size: 200% 200%;
            animation: gradientShift 3s ease infinite;
        }
        
        .bg2 {
            background-image: url('https://via.placeholder.com/400x200/3498db/ffffff?text=Background+Image');
            background-size: cover;
            background-position: center;
            background-repeat: no-repeat;
        }
        
        .bg3 {
            background-color: #f8f9fa;
            background-image: 
                radial-gradient(circle at 25% 25%, #007bff 2px, transparent 2px),
                radial-gradient(circle at 75% 75%, #28a745 2px, transparent 2px);
            background-size: 30px 30px;
        }
        
        @keyframes gradientShift {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
        }
    </style>
</head>
<body>
    <div class="bg-section bg1">Gradient Background</div>
    <div class="bg-section bg2">Image Background</div>
    <div class="bg-section bg3">Pattern Background</div>
</body>
</html>`,
                validation: (code) => {
                    return code.includes('background') && 
                           (code.includes('linear-gradient') || code.includes('radial-gradient')) && 
                           code.includes('background-size') && 
                           code.includes('@keyframes');
                },
                hints: [
                    "Use linear-gradient for smooth color transitions",
                    "Apply background-size: cover for image backgrounds",
                    "Use radial-gradient for pattern backgrounds",
                    "Add animations with @keyframes"
                ]
            },
            {
                id: 3,
                title: "Hover Effects and Transitions",
                description: "Create interactive elements with hover effects, transitions, and transforms.",
                starterCode: `<!DOCTYPE html>
<html>
<head>
    <title>Hover Effects</title>
    <style>
        /* Add hover effects and transitions */
        
    </style>
</head>
<body>
    <div class="container">
        <button class="btn btn1">Hover Me 1</button>
        <button class="btn btn2">Hover Me 2</button>
        <button class="btn btn3">Hover Me 3</button>
        <div class="card">Card with Hover Effect</div>
    </div>
</body>
</html>`,
                solution: `<!DOCTYPE html>
<html>
<head>
    <title>Hover Effects</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            margin: 40px;
            background-color: #f8f9fa;
        }
        
        .container {
            display: flex;
            flex-wrap: wrap;
            gap: 20px;
            justify-content: center;
        }
        
        .btn {
            padding: 15px 30px;
            border: none;
            border-radius: 8px;
            font-size: 16px;
            font-weight: bold;
            cursor: pointer;
            transition: all 0.3s ease;
            position: relative;
            overflow: hidden;
        }
        
        .btn1 {
            background: linear-gradient(45deg, #ff6b6b, #ee5a24);
            color: white;
        }
        
        .btn1:hover {
            transform: translateY(-3px);
            box-shadow: 0 10px 20px rgba(255, 107, 107, 0.3);
        }
        
        .btn2 {
            background: linear-gradient(45deg, #4ecdc4, #44a08d);
            color: white;
        }
        
        .btn2:hover {
            transform: scale(1.1);
            box-shadow: 0 8px 16px rgba(78, 205, 196, 0.3);
        }
        
        .btn3 {
            background: linear-gradient(45deg, #a8edea, #fed6e3);
            color: #333;
        }
        
        .btn3:hover {
            transform: rotate(5deg);
            box-shadow: 0 6px 12px rgba(168, 237, 234, 0.3);
        }
        
        .card {
            width: 200px;
            height: 150px;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            display: flex;
            align-items: center;
            justify-content: center;
            border-radius: 15px;
            font-weight: bold;
            transition: all 0.4s ease;
            cursor: pointer;
        }
        
        .card:hover {
            transform: perspective(1000px) rotateY(15deg);
            box-shadow: -10px 10px 20px rgba(0,0,0,0.3);
        }
    </style>
</head>
<body>
    <div class="container">
        <button class="btn btn1">Hover Me 1</button>
        <button class="btn btn2">Hover Me 2</button>
        <button class="btn btn3">Hover Me 3</button>
        <div class="card">Card with Hover Effect</div>
    </div>
</body>
</html>`,
                validation: (code) => {
                    return code.includes(':hover') && 
                           code.includes('transition') && 
                           code.includes('transform') && 
                           code.includes('box-shadow');
                },
                hints: [
                    "Use :hover pseudo-class for mouse interactions",
                    "Add transition for smooth animations",
                    "Use transform for movement and scaling",
                    "Apply box-shadow for depth effects"
                ]
            },
            {
                id: 4,
                title: "Responsive Design",
                description: "Create a responsive design that adapts to different screen sizes using media queries.",
                starterCode: `<!DOCTYPE html>
<html>
<head>
    <title>Responsive Design</title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <style>
        /* Create a responsive layout */
        
    </style>
</head>
<body>
    <header class="header">
        <h1>Responsive Website</h1>
        <nav class="nav">
            <a href="#">Home</a>
            <a href="#">About</a>
            <a href="#">Services</a>
            <a href="#">Contact</a>
        </nav>
    </header>
    
    <main class="main">
        <section class="hero">
            <h2>Welcome to Our Site</h2>
            <p>This is a responsive website that adapts to different screen sizes.</p>
        </section>
        
        <section class="features">
            <div class="feature">Feature 1</div>
            <div class="feature">Feature 2</div>
            <div class="feature">Feature 3</div>
        </section>
    </main>
</body>
</html>`,
                solution: `<!DOCTYPE html>
<html>
<head>
    <title>Responsive Design</title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        
        body {
            font-family: Arial, sans-serif;
            line-height: 1.6;
        }
        
        .header {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            padding: 1rem;
            display: flex;
            justify-content: space-between;
            align-items: center;
            flex-wrap: wrap;
        }
        
        .nav {
            display: flex;
            gap: 20px;
        }
        
        .nav a {
            color: white;
            text-decoration: none;
            padding: 8px 16px;
            border-radius: 5px;
            transition: background-color 0.3s;
        }
        
        .nav a:hover {
            background-color: rgba(255,255,255,0.2);
        }
        
        .main {
            max-width: 1200px;
            margin: 0 auto;
            padding: 20px;
        }
        
        .hero {
            text-align: center;
            padding: 60px 20px;
            background-color: #f8f9fa;
            border-radius: 10px;
            margin-bottom: 40px;
        }
        
        .hero h2 {
            font-size: 2.5em;
            margin-bottom: 20px;
            color: #333;
        }
        
        .features {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
            gap: 20px;
        }
        
        .feature {
            background: linear-gradient(135deg, #a8edea 0%, #fed6e3 100%);
            padding: 30px;
            border-radius: 10px;
            text-align: center;
            font-weight: bold;
            color: #333;
            transition: transform 0.3s ease;
        }
        
        .feature:hover {
            transform: translateY(-5px);
        }
        
        /* Tablet styles */
        @media (max-width: 768px) {
            .header {
                flex-direction: column;
                gap: 15px;
            }
            
            .nav {
                flex-wrap: wrap;
                justify-content: center;
            }
            
            .hero h2 {
                font-size: 2em;
            }
            
            .features {
                grid-template-columns: repeat(2, 1fr);
            }
        }
        
        /* Mobile styles */
        @media (max-width: 480px) {
            .nav {
                flex-direction: column;
                align-items: center;
            }
            
            .hero h2 {
                font-size: 1.5em;
            }
            
            .features {
                grid-template-columns: 1fr;
            }
            
            .main {
                padding: 10px;
            }
        }
    </style>
</head>
<body>
    <header class="header">
        <h1>Responsive Website</h1>
        <nav class="nav">
            <a href="#">Home</a>
            <a href="#">About</a>
            <a href="#">Services</a>
            <a href="#">Contact</a>
        </nav>
    </header>
    
    <main class="main">
        <section class="hero">
            <h2>Welcome to Our Site</h2>
            <p>This is a responsive website that adapts to different screen sizes.</p>
        </section>
        
        <section class="features">
            <div class="feature">Feature 1</div>
            <div class="feature">Feature 2</div>
            <div class="feature">Feature 3</div>
        </section>
    </main>
</body>
</html>`,
                validation: (code) => {
                    return code.includes('@media') && 
                           code.includes('viewport') && 
                           code.includes('flex-wrap') && 
                           code.includes('grid-template-columns');
                },
                hints: [
                    "Add viewport meta tag for mobile responsiveness",
                    "Use media queries for different screen sizes",
                    "Implement flex-wrap for flexible layouts",
                    "Use responsive grid with auto-fit and minmax"
                ]
            }
        ]
    },
    6: { // JavaScript Basics
        title: "JavaScript Basics",
        challenges: [
            {
                id: 1,
                title: "Variables and Data Types",
                description: "Practice declaring variables and working with different data types in JavaScript.",
                starterCode: `<!DOCTYPE html>
<html>
<head>
    <title>JavaScript Variables</title>
</head>
<body>
    <h1>JavaScript Variables</h1>
    <div id="output"></div>
    
    <script>
        // Declare variables and display them
        // Use let, const, and different data types
        
    </script>
</body>
</html>`,
                solution: `<!DOCTYPE html>
<html>
<head>
    <title>JavaScript Variables</title>
</head>
<body>
    <h1>JavaScript Variables</h1>
    <div id="output"></div>
    
    <script>
        // String variable
        let name = "John Doe";
        
        // Number variables
        let age = 25;
        const PI = 3.14159;
        
        // Boolean variable
        let isStudent = true;
        
        // Array
        let hobbies = ["reading", "coding", "gaming"];
        
        // Object
        let person = {
            firstName: "Jane",
            lastName: "Smith",
            age: 30
        };
        
        // Display variables
        let output = document.getElementById('output');
        output.innerHTML = \`
            <h2>Variable Examples:</h2>
            <p><strong>Name:</strong> \${name}</p>
            <p><strong>Age:</strong> \${age}</p>
            <p><strong>PI:</strong> \${PI}</p>
            <p><strong>Is Student:</strong> \${isStudent}</p>
            <p><strong>Hobbies:</strong> \${hobbies.join(', ')}</p>
            <p><strong>Person:</strong> \${person.firstName} \${person.lastName} (\${person.age} years old)</p>
        \`;
    </script>
</body>
</html>`,
                validation: (code) => {
                    return code.includes('let ') && 
                           code.includes('const ') && 
                           code.includes('[') && 
                           code.includes('{') && 
                           code.includes('document.getElementById');
                },
                hints: [
                    "Use let for variables that can change",
                    "Use const for constants",
                    "Create arrays with square brackets",
                    "Create objects with curly braces"
                ]
            },
            {
                id: 2,
                title: "Math Operations",
                description: "Practice using mathematical operators and built-in Math functions.",
                starterCode: `<!DOCTYPE html>
<html>
<head>
    <title>Math Operations</title>
</head>
<body>
    <h1>JavaScript Math Operations</h1>
    <div id="output"></div>
    
    <script>
        // Perform various math operations
        // Use arithmetic operators and Math functions
        
    </script>
</body>
</html>`,
                solution: `<!DOCTYPE html>
<html>
<head>
    <title>Math Operations</title>
</head>
<body>
    <h1>JavaScript Math Operations</h1>
    <div id="output"></div>
    
    <script>
        // Basic arithmetic
        let a = 10;
        let b = 3;
        
        let sum = a + b;
        let difference = a - b;
        let product = a * b;
        let quotient = a / b;
        let remainder = a % b;
        let power = Math.pow(a, b);
        
        // Math functions
        let randomNum = Math.random();
        let rounded = Math.round(randomNum * 100);
        let ceiling = Math.ceil(4.3);
        let floor = Math.floor(4.7);
        let absolute = Math.abs(-15);
        let squareRoot = Math.sqrt(16);
        
        // Display results
        let output = document.getElementById('output');
        output.innerHTML = \`
            <h2>Arithmetic Operations:</h2>
            <p>\${a} + \${b} = \${sum}</p>
            <p>\${a} - \${b} = \${difference}</p>
            <p>\${a} × \${b} = \${product}</p>
            <p>\${a} ÷ \${b} = \${quotient.toFixed(2)}</p>
            <p>\${a} % \${b} = \${remainder}</p>
            <p>\${a}^\${b} = \${power}</p>
            
            <h2>Math Functions:</h2>
            <p>Random number: \${randomNum.toFixed(4)}</p>
            <p>Rounded random (0-100): \${rounded}</p>
            <p>Ceiling of 4.3: \${ceiling}</p>
            <p>Floor of 4.7: \${floor}</p>
            <p>Absolute value of -15: \${absolute}</p>
            <p>Square root of 16: \${squareRoot}</p>
        \`;
    </script>
</body>
</html>`,
                validation: (code) => {
                    return code.includes('Math.') && 
                           code.includes('+') && 
                           code.includes('-') && 
                           code.includes('*') && 
                           code.includes('/') && 
                           code.includes('%');
                },
                hints: [
                    "Use arithmetic operators (+, -, *, /, %)",
                    "Use Math.pow() for exponents",
                    "Use Math.random() for random numbers",
                    "Use Math.round(), Math.ceil(), Math.floor() for rounding"
                ]
            },
            {
                id: 3,
                title: "String Operations",
                description: "Practice string manipulation, concatenation, and built-in string methods.",
                starterCode: `<!DOCTYPE html>
<html>
<head>
    <title>String Operations</title>
</head>
<body>
    <h1>JavaScript String Operations</h1>
    <div id="output"></div>
    
    <script>
        // Work with strings
        // Use string methods and concatenation
        
    </script>
</body>
</html>`,
                solution: `<!DOCTYPE html>
<html>
<head>
    <title>String Operations</title>
</head>
<body>
    <h1>JavaScript String Operations</h1>
    <div id="output"></div>
    
    <script>
        // String variables
        let firstName = "John";
        let lastName = "Doe";
        let message = "Hello, World!";
        let sentence = "JavaScript is awesome";
        
        // String concatenation
        let fullName = firstName + " " + lastName;
        let greeting = "Hello, " + fullName + "!";
        
        // Template literals
        let templateGreeting = \`Hello, \${firstName} \${lastName}!\`;
        
        // String methods
        let upperMessage = message.toUpperCase();
        let lowerMessage = message.toLowerCase();
        let messageLength = message.length;
        let firstChar = message.charAt(0);
        let lastChar = message.charAt(message.length - 1);
        let replaced = sentence.replace("awesome", "incredible");
        let words = sentence.split(" ");
        let substring = sentence.substring(0, 10);
        
        // Display results
        let output = document.getElementById('output');
        output.innerHTML = \`
            <h2>String Concatenation:</h2>
            <p>Full Name: \${fullName}</p>
            <p>Greeting: \${greeting}</p>
            <p>Template Greeting: \${templateGreeting}</p>
            
            <h2>String Methods:</h2>
            <p>Original: "\${message}"</p>
            <p>Uppercase: "\${upperMessage}"</p>
            <p>Lowercase: "\${lowerMessage}"</p>
            <p>Length: \${messageLength}</p>
            <p>First character: "\${firstChar}"</p>
            <p>Last character: "\${lastChar}"</p>
            <p>Replaced: "\${replaced}"</p>
            <p>Words: [\${words.join(', ')}]</p>
            <p>Substring: "\${substring}"</p>
        \`;
    </script>
</body>
</html>`,
                validation: (code) => {
                    return code.includes('+') && 
                           code.includes('toUpperCase()') && 
                           code.includes('toLowerCase()') && 
                           code.includes('length') && 
                           code.includes('replace(');
                },
                hints: [
                    "Use + for string concatenation",
                    "Use template literals with backticks",
                    "Use toUpperCase() and toLowerCase()",
                    "Use length property and charAt() method"
                ]
            }
        ]
    },
    7: { // JavaScript Conditions
        title: "Conditions, Logic & Functions",
        challenges: [
            {
                id: 1,
                title: "Conditional Statements",
                description: "Practice using if, else if, and else statements to control program flow.",
                starterCode: `<!DOCTYPE html>
<html>
<head>
    <title>Conditional Statements</title>
</head>
<body>
    <h1>JavaScript Conditionals</h1>
    <div id="output"></div>
    
    <script>
        // Create conditional statements
        // Use if, else if, and else
        
    </script>
</body>
</html>`,
                solution: `<!DOCTYPE html>
<html>
<head>
    <title>Conditional Statements</title>
</head>
<body>
    <h1>JavaScript Conditionals</h1>
    <div id="output"></div>
    
    <script>
        let score = 85;
        let age = 18;
        let isStudent = true;
        
        let grade;
        let canVote;
        let discount;
        
        // Grade determination
        if (score >= 90) {
            grade = 'A';
        } else if (score >= 80) {
            grade = 'B';
        } else if (score >= 70) {
            grade = 'C';
        } else if (score >= 60) {
            grade = 'D';
        } else {
            grade = 'F';
        }
        
        // Voting eligibility
        if (age >= 18) {
            canVote = 'Yes, you can vote!';
        } else {
            canVote = 'No, you cannot vote yet.';
        }
        
        // Discount calculation
        if (isStudent && age < 25) {
            discount = '20% student discount';
        } else if (age >= 65) {
            discount = '15% senior discount';
        } else if (isStudent) {
            discount = '10% student discount';
        } else {
            discount = 'No discount available';
        }
        
        // Display results
        let output = document.getElementById('output');
        output.innerHTML = \`
            <h2>Conditional Results:</h2>
            <p><strong>Score:</strong> \${score}</p>
            <p><strong>Grade:</strong> \${grade}</p>
            <p><strong>Age:</strong> \${age}</p>
            <p><strong>Can Vote:</strong> \${canVote}</p>
            <p><strong>Student:</strong> \${isStudent ? 'Yes' : 'No'}</p>
            <p><strong>Discount:</strong> \${discount}</p>
        \`;
    </script>
</body>
</html>`,
                validation: (code) => {
                    return code.includes('if (') && 
                           code.includes('else if') && 
                           code.includes('else') && 
                           code.includes('>=') && 
                           code.includes('&&');
                },
                hints: [
                    "Use if for the first condition",
                    "Use else if for additional conditions",
                    "Use else for the default case",
                    "Use comparison operators (>=, <=, ==, ===)"
                ]
            },
            {
                id: 2,
                title: "Logical Operators",
                description: "Practice using logical operators (&&, ||, !) to combine conditions.",
                starterCode: `<!DOCTYPE html>
<html>
<head>
    <title>Logical Operators</title>
</head>
<body>
    <h1>JavaScript Logical Operators</h1>
    <div id="output"></div>
    
    <script>
        // Use logical operators
        // && (AND), || (OR), ! (NOT)
        
    </script>
</body>
</html>`,
                solution: `<!DOCTYPE html>
<html>
<head>
    <title>Logical Operators</title>
</head>
<body>
    <h1>JavaScript Logical Operators</h1>
    <div id="output"></div>
    
    <script>
        let hasTicket = true;
        let hasMoney = false;
        let isAdult = true;
        let isStudent = true;
        let isWeekend = false;
        
        // AND operator (&&)
        let canWatchMovie = hasTicket && hasMoney;
        let canBuyAlcohol = isAdult && !isStudent;
        
        // OR operator (||)
        let canGetDiscount = isStudent || isWeekend;
        let canEnter = hasTicket || hasMoney;
        
        // NOT operator (!)
        let isNotAdult = !isAdult;
        let isNotWeekend = !isWeekend;
        
        // Complex conditions
        let canGetStudentDiscount = isStudent && !isWeekend;
        let canGetWeekendDiscount = !isStudent && isWeekend;
        
        // Display results
        let output = document.getElementById('output');
        output.innerHTML = \`
            <h2>Logical Operator Examples:</h2>
            <p><strong>Has Ticket:</strong> \${hasTicket}</p>
            <p><strong>Has Money:</strong> \${hasMoney}</p>
            <p><strong>Is Adult:</strong> \${isAdult}</p>
            <p><strong>Is Student:</strong> \${isStudent}</p>
            <p><strong>Is Weekend:</strong> \${isWeekend}</p>
            
            <h3>AND (&&) Results:</h3>
            <p>Can Watch Movie: \${canWatchMovie}</p>
            <p>Can Buy Alcohol: \${canBuyAlcohol}</p>
            
            <h3>OR (||) Results:</h3>
            <p>Can Get Discount: \${canGetDiscount}</p>
            <p>Can Enter: \${canEnter}</p>
            
            <h3>NOT (!) Results:</h3>
            <p>Is Not Adult: \${isNotAdult}</p>
            <p>Is Not Weekend: \${isNotWeekend}</p>
            
            <h3>Complex Conditions:</h3>
            <p>Can Get Student Discount: \${canGetStudentDiscount}</p>
            <p>Can Get Weekend Discount: \${canGetWeekendDiscount}</p>
        \`;
    </script>
</body>
</html>`,
                validation: (code) => {
                    return code.includes('&&') && 
                           code.includes('||') && 
                           code.includes('!') && 
                           code.includes('true') && 
                           code.includes('false');
                },
                hints: [
                    "Use && for AND operations",
                    "Use || for OR operations",
                    "Use ! for NOT operations",
                    "Combine operators for complex conditions"
                ]
            },
            {
                id: 3,
                title: "Functions",
                description: "Practice creating and using functions with parameters and return values.",
                starterCode: `<!DOCTYPE html>
<html>
<head>
    <title>JavaScript Functions</title>
</head>
<body>
    <h1>JavaScript Functions</h1>
    <div id="output"></div>
    
    <script>
        // Create functions
        // Use parameters and return values
        
    </script>
</body>
</html>`,
                solution: `<!DOCTYPE html>
<html>
<head>
    <title>JavaScript Functions</title>
</head>
<body>
    <h1>JavaScript Functions</h1>
    <div id="output"></div>
    
    <script>
        // Function with parameters and return value
        function addNumbers(a, b) {
            return a + b;
        }
        
        // Function with default parameter
        function greet(name = 'Guest') {
            return \`Hello, \${name}!\`;
        }
        
        // Function that returns multiple values (as object)
        function calculateCircle(radius) {
            const area = Math.PI * radius * radius;
            const circumference = 2 * Math.PI * radius;
            return {
                area: area.toFixed(2),
                circumference: circumference.toFixed(2)
            };
        }
        
        // Arrow function
        const multiply = (x, y) => x * y;
        
        // Function with conditional logic
        function getGrade(score) {
            if (score >= 90) return 'A';
            if (score >= 80) return 'B';
            if (score >= 70) return 'C';
            if (score >= 60) return 'D';
            return 'F';
        }
        
        // Function that calls other functions
        function processStudent(name, score) {
            const greeting = greet(name);
            const grade = getGrade(score);
            return \`\${greeting} Your grade is \${grade}.\`;
        }
        
        // Test the functions
        let result1 = addNumbers(5, 3);
        let result2 = greet('John');
        let result3 = greet(); // Uses default parameter
        let circle = calculateCircle(5);
        let result4 = multiply(4, 6);
        let result5 = getGrade(85);
        let result6 = processStudent('Alice', 92);
        
        // Display results
        let output = document.getElementById('output');
        output.innerHTML = \`
            <h2>Function Results:</h2>
            <p><strong>Add Numbers (5 + 3):</strong> \${result1}</p>
            <p><strong>Greet with name:</strong> \${result2}</p>
            <p><strong>Greet without name:</strong> \${result3}</p>
            <p><strong>Circle (radius 5):</strong> Area: \${circle.area}, Circumference: \${circle.circumference}</p>
            <p><strong>Multiply (4 × 6):</strong> \${result4}</p>
            <p><strong>Grade for 85:</strong> \${result5}</p>
            <p><strong>Process Student:</strong> \${result6}</p>
        \`;
    </script>
</body>
</html>`,
                validation: (code) => {
                    return code.includes('function') && 
                           code.includes('return') && 
                           code.includes('=>') && 
                           code.includes('(') && 
                           code.includes(')');
                },
                hints: [
                    "Use function keyword to declare functions",
                    "Use parameters in parentheses",
                    "Use return statement to return values",
                    "Use arrow functions for shorter syntax"
                ]
            }
        ]
    },
    8: { // JavaScript Arrays
        title: "Arrays & Loops",
        challenges: [
            {
                id: 1,
                title: "Array Basics",
                description: "Practice creating arrays and using array methods to manipulate data.",
                starterCode: `<!DOCTYPE html>
<html>
<head>
    <title>Array Basics</title>
</head>
<body>
    <h1>JavaScript Arrays</h1>
    <div id="output"></div>
    
    <script>
        // Work with arrays
        // Use array methods
        
    </script>
</body>
</html>`,
                solution: `<!DOCTYPE html>
<html>
<head>
    <title>Array Basics</title>
</head>
<body>
    <h1>JavaScript Arrays</h1>
    <div id="output"></div>
    
    <script>
        // Creating arrays
        let fruits = ['apple', 'banana', 'orange'];
        let numbers = [1, 2, 3, 4, 5];
        let mixed = ['hello', 42, true, null];
        
        // Array methods
        fruits.push('grape'); // Add to end
        fruits.unshift('mango'); // Add to beginning
        let lastFruit = fruits.pop(); // Remove from end
        let firstFruit = fruits.shift(); // Remove from beginning
        
        // Finding elements
        let index = fruits.indexOf('banana');
        let hasApple = fruits.includes('apple');
        
        // Slicing and splicing
        let sliced = numbers.slice(1, 4); // [2, 3, 4]
        numbers.splice(2, 1, 10); // Replace element at index 2
        
        // Joining arrays
        let combined = fruits.concat(['kiwi', 'pear']);
        let joined = fruits.join(' - ');
        
        // Sorting
        let sortedFruits = [...fruits].sort();
        let reversedNumbers = [...numbers].reverse();
        
        // Display results
        let output = document.getElementById('output');
        output.innerHTML = \`
            <h2>Array Operations:</h2>
            <p><strong>Original Fruits:</strong> [\${fruits.join(', ')}]</p>
            <p><strong>After push/unshift:</strong> [\${fruits.join(', ')}]</p>
            <p><strong>Removed from end:</strong> \${lastFruit}</p>
            <p><strong>Removed from start:</strong> \${firstFruit}</p>
            <p><strong>Final fruits:</strong> [\${fruits.join(', ')}]</p>
            
            <h3>Finding Elements:</h3>
            <p><strong>Index of 'banana':</strong> \${index}</p>
            <p><strong>Has 'apple':</strong> \${hasApple}</p>
            
            <h3>Slicing and Splicing:</h3>
            <p><strong>Sliced numbers:</strong> [\${sliced.join(', ')}]</p>
            <p><strong>After splice:</strong> [\${numbers.join(', ')}]</p>
            
            <h3>Joining:</h3>
            <p><strong>Combined:</strong> [\${combined.join(', ')}]</p>
            <p><strong>Joined with separator:</strong> \${joined}</p>
            
            <h3>Sorting:</h3>
            <p><strong>Sorted fruits:</strong> [\${sortedFruits.join(', ')}]</p>
            <p><strong>Reversed numbers:</strong> [\${reversedNumbers.join(', ')}]</p>
        \`;
    </script>
</body>
</html>`,
                validation: (code) => {
                    return code.includes('[') && 
                           code.includes(']') && 
                           code.includes('.push(') && 
                           code.includes('.pop(') && 
                           code.includes('.join(');
                },
                hints: [
                    "Use square brackets to create arrays",
                    "Use push() to add elements to the end",
                    "Use pop() to remove elements from the end",
                    "Use join() to convert array to string"
                ]
            },
            {
                id: 2,
                title: "Looping Through Arrays",
                description: "Practice using different types of loops to iterate through arrays.",
                starterCode: `<!DOCTYPE html>
<html>
<head>
    <title>Array Loops</title>
</head>
<body>
    <h1>JavaScript Array Loops</h1>
    <div id="output"></div>
    
    <script>
        // Use different types of loops
        // for, forEach, for...of, map, filter
        
    </script>
</body>
</html>`,
                solution: `<!DOCTYPE html>
<html>
<head>
    <title>Array Loops</title>
</head>
<body>
    <h1>JavaScript Array Loops</h1>
    <div id="output"></div>
    
    <script>
        let numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
        let names = ['Alice', 'Bob', 'Charlie', 'Diana', 'Eve'];
        
        // Traditional for loop
        let forLoopSum = 0;
        for (let i = 0; i < numbers.length; i++) {
            forLoopSum += numbers[i];
        }
        
        // forEach loop
        let forEachSum = 0;
        numbers.forEach(function(num) {
            forEachSum += num;
        });
        
        // for...of loop
        let forOfSum = 0;
        for (let num of numbers) {
            forOfSum += num;
        }
        
        // map method
        let doubled = numbers.map(function(num) {
            return num * 2;
        });
        
        // filter method
        let evenNumbers = numbers.filter(function(num) {
            return num % 2 === 0;
        });
        
        // reduce method
        let total = numbers.reduce(function(acc, num) {
            return acc + num;
        }, 0);
        
        // Creating HTML list with forEach
        let nameList = '<ul>';
        names.forEach(function(name) {
            nameList += \`<li>\${name}</li>\`;
        });
        nameList += '</ul>';
        
        // Display results
        let output = document.getElementById('output');
        output.innerHTML = \`
            <h2>Loop Results:</h2>
            <p><strong>Original numbers:</strong> [\${numbers.join(', ')}]</p>
            <p><strong>For loop sum:</strong> \${forLoopSum}</p>
            <p><strong>ForEach sum:</strong> \${forEachSum}</p>
            <p><strong>For...of sum:</strong> \${forOfSum}</p>
            
            <h3>Array Methods:</h3>
            <p><strong>Doubled numbers:</strong> [\${doubled.join(', ')}]</p>
            <p><strong>Even numbers:</strong> [\${evenNumbers.join(', ')}]</p>
            <p><strong>Total (reduce):</strong> \${total}</p>
            
            <h3>Names List:</h3>
            \${nameList}
        \`;
    </script>
</body>
</html>`,
                validation: (code) => {
                    return code.includes('for (') && 
                           code.includes('.forEach(') && 
                           code.includes('for (let') && 
                           code.includes('.map(') && 
                           code.includes('.filter(');
                },
                hints: [
                    "Use for loop with index",
                    "Use forEach for simple iteration",
                    "Use for...of for direct value access",
                    "Use map to transform elements"
                ]
            },
            {
                id: 3,
                title: "Array Manipulation",
                description: "Practice advanced array manipulation techniques including sorting, filtering, and transforming data.",
                starterCode: `<!DOCTYPE html>
<html>
<head>
    <title>Array Manipulation</title>
</head>
<body>
    <h1>Advanced Array Manipulation</h1>
    <div id="output"></div>
    
    <script>
        // Advanced array operations
        // Sorting, filtering, transforming
        
    </script>
</body>
</html>`,
                solution: `<!DOCTYPE html>
<html>
<head>
    <title>Array Manipulation</title>
</head>
<body>
    <h1>Advanced Array Manipulation</h1>
    <div id="output"></div>
    
    <script>
        // Sample data
        let students = [
            { name: 'Alice', age: 20, grade: 85 },
            { name: 'Bob', age: 22, grade: 92 },
            { name: 'Charlie', age: 19, grade: 78 },
            { name: 'Diana', age: 21, grade: 95 },
            { name: 'Eve', age: 20, grade: 88 }
        ];
        
        let products = [
            { name: 'Laptop', price: 999, category: 'Electronics' },
            { name: 'Book', price: 15, category: 'Education' },
            { name: 'Phone', price: 699, category: 'Electronics' },
            { name: 'Pen', price: 2, category: 'Office' },
            { name: 'Tablet', price: 399, category: 'Electronics' }
        ];
        
        // Sorting by different criteria
        let sortedByGrade = [...students].sort((a, b) => b.grade - a.grade);
        let sortedByName = [...students].sort((a, b) => a.name.localeCompare(b.name));
        let sortedByPrice = [...products].sort((a, b) => a.price - b.price);
        
        // Filtering data
        let highGrades = students.filter(student => student.grade >= 90);
        let electronics = products.filter(product => product.category === 'Electronics');
        let affordable = products.filter(product => product.price < 100);
        
        // Transforming data
        let studentNames = students.map(student => student.name);
        let expensiveProducts = products.map(product => ({
            ...product,
            price: product.price * 1.1 // 10% markup
        }));
        
        let gradeSummary = students.map(student => ({
            name: student.name,
            status: student.grade >= 90 ? 'Excellent' : 
                   student.grade >= 80 ? 'Good' : 
                   student.grade >= 70 ? 'Average' : 'Needs Improvement'
        }));
        
        // Finding specific data
        let topStudent = students.reduce((top, current) => 
            current.grade > top.grade ? current : top
        );
        
        let totalValue = products.reduce((sum, product) => sum + product.price, 0);
        
        // Display results
        let output = document.getElementById('output');
        output.innerHTML = \`
            <h2>Student Data:</h2>
            <p><strong>Sorted by Grade (High to Low):</strong></p>
            <ul>\${sortedByGrade.map(s => \`<li>\${s.name}: \${s.grade}</li>\`).join('')}</ul>
            
            <p><strong>High Achievers (90+):</strong></p>
            <ul>\${highGrades.map(s => \`<li>\${s.name}: \${s.grade}</li>\`).join('')}</ul>
            
            <p><strong>Grade Summary:</strong></p>
            <ul>\${gradeSummary.map(s => \`<li>\${s.name}: \${s.status}</li>\`).join('')}</ul>
            
            <h2>Product Data:</h2>
            <p><strong>Electronics Only:</strong></p>
            <ul>\${electronics.map(p => \`<li>\${p.name}: $\${p.price}</li>\`).join('')}</ul>
            
            <p><strong>Affordable Items (< $100):</strong></p>
            <ul>\${affordable.map(p => \`<li>\${p.name}: $\${p.price}</li>\`).join('')}</ul>
            
            <p><strong>With 10% Markup:</strong></p>
            <ul>\${expensiveProducts.map(p => \`<li>\${p.name}: $\${p.price.toFixed(2)}</li>\`).join('')}</ul>
            
            <h2>Summary:</h2>
            <p><strong>Top Student:</strong> \${topStudent.name} (\${topStudent.grade})</p>
            <p><strong>Total Product Value:</strong> $\${totalValue}</p>
        \`;
    </script>
</body>
</html>`,
                validation: (code) => {
                    return code.includes('.sort(') && 
                           code.includes('.filter(') && 
                           code.includes('.map(') && 
                           code.includes('.reduce(') && 
                           code.includes('=>');
                },
                hints: [
                    "Use sort() with comparison functions",
                    "Use filter() to select specific elements",
                    "Use map() to transform elements",
                    "Use reduce() to accumulate values"
                ]
            }
        ]
    }
};

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
        console.log('All challenges completed!');
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
    
    // Get appropriate language for current day
    const currentDay = getCurrentDayFromURL();
    const language = getLanguageForDay(currentDay);
    const config = getMonacoConfig(language, '');
    
    // Add scrollbar configuration
    config.scrollbar = {
        vertical: 'visible',
        horizontal: 'visible'
    };
    
    monacoEditor = monaco.editor.create(editorContainer, config);
    
    // Setup language-specific features
    setupLanguageFeatures(monacoEditor, language);
    
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
    
    // Get appropriate language for current day
    const currentDay = getCurrentDayFromURL();
    const language = getLanguageForDay(currentDay);
    const mainConfig = getMonacoConfig(language, '');
    
    // Add scrollbar configuration
    mainConfig.scrollbar = {
        vertical: 'visible',
        horizontal: 'visible'
    };
    
    monacoEditorMain = monaco.editor.create(editorContainer, mainConfig);
    
    // Setup language-specific features
    setupLanguageFeatures(monacoEditorMain, language);
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
    
    // Get appropriate language and starter code for current day
    const currentDay = getCurrentDayFromURL();
    const language = getLanguageForDay(currentDay);
    
    // Language-specific starter code
    let starterCode = '';
    switch (language) {
        case 'html':
            starterCode = '<!DOCTYPE html>\n<html>\n<head>\n    <title>My Page</title>\n</head>\n<body>\n    <h1>Hello World!</h1>\n</body>\n</html>';
            break;
        case 'css':
            starterCode = '/* CSS Styles */\nbody {\n    font-family: Arial, sans-serif;\n    margin: 0;\n    padding: 20px;\n}\n\nh1 {\n    color: #01D29B;\n    text-align: center;\n}';
            break;
        case 'javascript':
            starterCode = '// JavaScript Code\nconsole.log("Hello, World!");\n\n// Variables\nlet message = "Welcome to JavaScript!";\ndocument.body.innerHTML = `<h1>${message}</h1>`;';
            break;
        default:
            starterCode = '<!DOCTYPE html>\n<html>\n<head>\n    <title>My Page</title>\n</head>\n<body>\n    <h1>Hello World!</h1>\n</body>\n</html>';
    }
    
    const lessonConfig = getMonacoConfig(language, starterCode);
    
    // Add scrollbar configuration
    lessonConfig.scrollbar = {
        vertical: 'visible',
        horizontal: 'visible'
    };
    
    monacoEditorLesson = monaco.editor.create(editorContainer, lessonConfig);
    
    // Setup language-specific features
    setupLanguageFeatures(monacoEditorLesson, language);
}

// Setup language-specific features for Monaco Editor
function setupLanguageFeatures(editor, language) {
    if (!editor || typeof monaco === 'undefined') return;
    
    // Setup HTML-specific features
    if (language === 'html') {
        // Enhanced HTML auto-complete with comprehensive element suggestions
        monaco.languages.registerCompletionItemProvider('html', {
            provideCompletionItems: (model, position) => {
                const word = model.getWordUntilPosition(position);
                const range = {
                    startLineNumber: position.lineNumber,
                    endLineNumber: position.lineNumber,
                    startColumn: word.startColumn,
                    endColumn: word.endColumn
                };

                const suggestions = [
                    // HTML5 Template
                    {
                        label: 'html5',
                        kind: monaco.languages.CompletionItemKind.Snippet,
                        insertText: [
                            '<!DOCTYPE html>',
                            '<html lang="en">',
                            '<head>',
                            '    <meta charset="UTF-8">',
                            '    <meta name="viewport" content="width=device-width, initial-scale=1.0">',
                            '    <title>${1:Document}</title>',
                            '</head>',
                            '<body>',
                            '    ${2}',
                            '</body>',
                            '</html>'
                        ].join('\n'),
                        insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                        documentation: 'HTML5 boilerplate template',
                        range: range
                    },
                    
                    // Structure Elements
                    {
                        label: 'header',
                        kind: monaco.languages.CompletionItemKind.Function,
                        insertText: '<header>\n    ${1}\n</header>',
                        insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                        documentation: 'Header section element',
                        range: range
                    },
                    {
                        label: 'nav',
                        kind: monaco.languages.CompletionItemKind.Function,
                        insertText: '<nav>\n    ${1}\n</nav>',
                        insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                        documentation: 'Navigation element',
                        range: range
                    },
                    {
                        label: 'main',
                        kind: monaco.languages.CompletionItemKind.Function,
                        insertText: '<main>\n    ${1}\n</main>',
                        insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                        documentation: 'Main content element',
                        range: range
                    },
                    {
                        label: 'section',
                        kind: monaco.languages.CompletionItemKind.Function,
                        insertText: '<section>\n    ${1}\n</section>',
                        insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                        documentation: 'Section element',
                        range: range
                    },
                    {
                        label: 'article',
                        kind: monaco.languages.CompletionItemKind.Function,
                        insertText: '<article>\n    ${1}\n</article>',
                        insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                        documentation: 'Article element',
                        range: range
                    },
                    {
                        label: 'aside',
                        kind: monaco.languages.CompletionItemKind.Function,
                        insertText: '<aside>\n    ${1}\n</aside>',
                        insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                        documentation: 'Aside element',
                        range: range
                    },
                    {
                        label: 'footer',
                        kind: monaco.languages.CompletionItemKind.Function,
                        insertText: '<footer>\n    ${1}\n</footer>',
                        insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                        documentation: 'Footer element',
                        range: range
                    },
                    
                    // Content Elements
                    {
                        label: 'div',
                        kind: monaco.languages.CompletionItemKind.Function,
                        insertText: '<div class="${1}">\n    ${2}\n</div>',
                        insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                        documentation: 'Generic container element',
                        range: range
                    },
                    {
                        label: 'span',
                        kind: monaco.languages.CompletionItemKind.Function,
                        insertText: '<span class="${1}">${2}</span>',
                        insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                        documentation: 'Generic inline element',
                        range: range
                    },
                    {
                        label: 'p',
                        kind: monaco.languages.CompletionItemKind.Function,
                        insertText: '<p>${1}</p>',
                        insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                        documentation: 'Paragraph element',
                        range: range
                    },
                    
                    // Heading Elements
                    {
                        label: 'h1',
                        kind: monaco.languages.CompletionItemKind.Function,
                        insertText: '<h1>${1}</h1>',
                        insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                        documentation: 'Main heading',
                        range: range
                    },
                    {
                        label: 'h2',
                        kind: monaco.languages.CompletionItemKind.Function,
                        insertText: '<h2>${1}</h2>',
                        insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                        documentation: 'Secondary heading',
                        range: range
                    },
                    {
                        label: 'h3',
                        kind: monaco.languages.CompletionItemKind.Function,
                        insertText: '<h3>${1}</h3>',
                        insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                        documentation: 'Tertiary heading',
                        range: range
                    },
                    
                    // Form Elements
                    {
                        label: 'form',
                        kind: monaco.languages.CompletionItemKind.Snippet,
                        insertText: [
                            '<form action="${1}" method="${2:POST}">',
                            '    <label for="${3}">${4:Label}:</label>',
                            '    <input type="${5:text}" id="${3}" name="${3}" required>',
                            '    <button type="submit">${6:Submit}</button>',
                            '</form>'
                        ].join('\n'),
                        insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                        documentation: 'HTML form template',
                        range: range
                    },
                    {
                        label: 'input',
                        kind: monaco.languages.CompletionItemKind.Function,
                        insertText: '<input type="${1:text}" id="${2}" name="${2}" ${3:required}>',
                        insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                        documentation: 'Input field',
                        range: range
                    },
                    {
                        label: 'label',
                        kind: monaco.languages.CompletionItemKind.Function,
                        insertText: '<label for="${1}">${2}</label>',
                        insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                        documentation: 'Form label',
                        range: range
                    },
                    {
                        label: 'button',
                        kind: monaco.languages.CompletionItemKind.Function,
                        insertText: '<button type="${1:button}">${2}</button>',
                        insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                        documentation: 'Button element',
                        range: range
                    },
                    {
                        label: 'textarea',
                        kind: monaco.languages.CompletionItemKind.Function,
                        insertText: '<textarea id="${1}" name="${1}" rows="${2:4}" cols="${3:50}">${4}</textarea>',
                        insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                        documentation: 'Text area element',
                        range: range
                    },
                    {
                        label: 'select',
                        kind: monaco.languages.CompletionItemKind.Function,
                        insertText: [
                            '<select id="${1}" name="${1}">',
                            '    <option value="${2}">${3}</option>',
                            '</select>'
                        ].join('\n'),
                        insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                        documentation: 'Select dropdown',
                        range: range
                    },
                    
                    // Media Elements
                    {
                        label: 'img',
                        kind: monaco.languages.CompletionItemKind.Function,
                        insertText: '<img src="${1}" alt="${2}" ${3:width="${4}" height="${5}">',
                        insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                        documentation: 'Image element',
                        range: range
                    },
                    {
                        label: 'video',
                        kind: monaco.languages.CompletionItemKind.Function,
                        insertText: '<video controls>\n    <source src="${1}" type="video/mp4">\n    ${2:Your browser does not support the video tag.}\n</video>',
                        insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                        documentation: 'Video element',
                        range: range
                    },
                    {
                        label: 'audio',
                        kind: monaco.languages.CompletionItemKind.Function,
                        insertText: '<audio controls>\n    <source src="${1}" type="audio/mpeg">\n    ${2:Your browser does not support the audio element.}\n</audio>',
                        insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                        documentation: 'Audio element',
                        range: range
                    },
                    
                    // Link and Text Elements
                    {
                        label: 'a',
                        kind: monaco.languages.CompletionItemKind.Function,
                        insertText: '<a href="${1}">${2}</a>',
                        insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                        documentation: 'Anchor/link element',
                        range: range
                    },
                    {
                        label: 'strong',
                        kind: monaco.languages.CompletionItemKind.Function,
                        insertText: '<strong>${1}</strong>',
                        insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                        documentation: 'Strong/bold text',
                        range: range
                    },
                    {
                        label: 'em',
                        kind: monaco.languages.CompletionItemKind.Function,
                        insertText: '<em>${1}</em>',
                        insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                        documentation: 'Emphasized/italic text',
                        range: range
                    },
                    
                    // List Elements
                    {
                        label: 'ul',
                        kind: monaco.languages.CompletionItemKind.Function,
                        insertText: '<ul>\n    <li>${1}</li>\n    <li>${2}</li>\n</ul>',
                        insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                        documentation: 'Unordered list',
                        range: range
                    },
                    {
                        label: 'ol',
                        kind: monaco.languages.CompletionItemKind.Function,
                        insertText: '<ol>\n    <li>${1}</li>\n    <li>${2}</li>\n</ol>',
                        insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                        documentation: 'Ordered list',
                        range: range
                    },
                    {
                        label: 'li',
                        kind: monaco.languages.CompletionItemKind.Function,
                        insertText: '<li>${1}</li>',
                        insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                        documentation: 'List item',
                        range: range
                    },
                    
                    // Table Elements
                    {
                        label: 'table',
                        kind: monaco.languages.CompletionItemKind.Snippet,
                        insertText: [
                            '<table>',
                            '    <thead>',
                            '        <tr>',
                            '            <th>${1}</th>',
                            '            <th>${2}</th>',
                            '        </tr>',
                            '    </thead>',
                            '    <tbody>',
                            '        <tr>',
                            '            <td>${3}</td>',
                            '            <td>${4}</td>',
                            '        </tr>',
                            '    </tbody>',
                            '</table>'
                        ].join('\n'),
                        insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                        documentation: 'HTML table template',
                        range: range
                    }
                ];
                return { suggestions };
            }
        });
    }
    
    // Setup CSS-specific features
    if (language === 'css') {
        // Enhanced CSS auto-complete with comprehensive property suggestions
        monaco.languages.registerCompletionItemProvider('css', {
            provideCompletionItems: (model, position) => {
                const word = model.getWordUntilPosition(position);
                const range = {
                    startLineNumber: position.lineNumber,
                    endLineNumber: position.lineNumber,
                    startColumn: word.startColumn,
                    endColumn: word.endColumn
                };

                const suggestions = [
                    // Layout Templates
                    {
                        label: 'flexbox',
                        kind: monaco.languages.CompletionItemKind.Snippet,
                        insertText: [
                            'display: flex;',
                            'justify-content: ${1:center};',
                            'align-items: ${2:center};',
                            'gap: ${3:10px};'
                        ].join('\n'),
                        insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                        documentation: 'Flexbox layout template',
                        range: range
                    },
                    {
                        label: 'grid',
                        kind: monaco.languages.CompletionItemKind.Snippet,
                        insertText: [
                            'display: grid;',
                            'grid-template-columns: ${1:repeat(auto-fit, minmax(200px, 1fr))};',
                            'gap: ${2:20px};'
                        ].join('\n'),
                        insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                        documentation: 'CSS Grid layout template',
                        range: range
                    },
                    
                    // Box Model Properties
                    {
                        label: 'margin',
                        kind: monaco.languages.CompletionItemKind.Property,
                        insertText: 'margin: ${1:0};',
                        insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                        documentation: 'Sets the margin on all four sides',
                        range: range
                    },
                    {
                        label: 'padding',
                        kind: monaco.languages.CompletionItemKind.Property,
                        insertText: 'padding: ${1:0};',
                        insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                        documentation: 'Sets the padding on all four sides',
                        range: range
                    },
                    {
                        label: 'border',
                        kind: monaco.languages.CompletionItemKind.Property,
                        insertText: 'border: ${1:1px} ${2:solid} ${3:#000};',
                        insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                        documentation: 'Sets border width, style, and color',
                        range: range
                    },
                    {
                        label: 'border-radius',
                        kind: monaco.languages.CompletionItemKind.Property,
                        insertText: 'border-radius: ${1:5px};',
                        insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                        documentation: 'Rounds the corners of an element',
                        range: range
                    },
                    
                    // Display Properties
                    {
                        label: 'display',
                        kind: monaco.languages.CompletionItemKind.Property,
                        insertText: 'display: ${1|block,inline,inline-block,flex,grid,none|};',
                        insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                        documentation: 'Sets how an element is displayed',
                        range: range
                    },
                    {
                        label: 'position',
                        kind: monaco.languages.CompletionItemKind.Property,
                        insertText: 'position: ${1|static,relative,absolute,fixed,sticky|};',
                        insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                        documentation: 'Sets the positioning method',
                        range: range
                    },
                    {
                        label: 'visibility',
                        kind: monaco.languages.CompletionItemKind.Property,
                        insertText: 'visibility: ${1|visible,hidden|};',
                        insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                        documentation: 'Sets whether element is visible',
                        range: range
                    },
                    
                    // Size Properties
                    {
                        label: 'width',
                        kind: monaco.languages.CompletionItemKind.Property,
                        insertText: 'width: ${1:100%};',
                        insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                        documentation: 'Sets the width of an element',
                        range: range
                    },
                    {
                        label: 'height',
                        kind: monaco.languages.CompletionItemKind.Property,
                        insertText: 'height: ${1:auto};',
                        insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                        documentation: 'Sets the height of an element',
                        range: range
                    },
                    {
                        label: 'max-width',
                        kind: monaco.languages.CompletionItemKind.Property,
                        insertText: 'max-width: ${1:100%};',
                        insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                        documentation: 'Sets the maximum width',
                        range: range
                    },
                    {
                        label: 'min-height',
                        kind: monaco.languages.CompletionItemKind.Property,
                        insertText: 'min-height: ${1:100vh};',
                        insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                        documentation: 'Sets the minimum height',
                        range: range
                    },
                    
                    // Typography Properties
                    {
                        label: 'font-family',
                        kind: monaco.languages.CompletionItemKind.Property,
                        insertText: 'font-family: ${1:"Arial, sans-serif"};',
                        insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                        documentation: 'Sets the font family',
                        range: range
                    },
                    {
                        label: 'font-size',
                        kind: monaco.languages.CompletionItemKind.Property,
                        insertText: 'font-size: ${1:16px};',
                        insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                        documentation: 'Sets the font size',
                        range: range
                    },
                    {
                        label: 'font-weight',
                        kind: monaco.languages.CompletionItemKind.Property,
                        insertText: 'font-weight: ${1|normal,bold,100,200,300,400,500,600,700,800,900|};',
                        insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                        documentation: 'Sets the font weight',
                        range: range
                    },
                    {
                        label: 'text-align',
                        kind: monaco.languages.CompletionItemKind.Property,
                        insertText: 'text-align: ${1|left,center,right,justify|};',
                        insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                        documentation: 'Sets the text alignment',
                        range: range
                    },
                    {
                        label: 'line-height',
                        kind: monaco.languages.CompletionItemKind.Property,
                        insertText: 'line-height: ${1:1.5};',
                        insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                        documentation: 'Sets the line height',
                        range: range
                    },
                    {
                        label: 'text-decoration',
                        kind: monaco.languages.CompletionItemKind.Property,
                        insertText: 'text-decoration: ${1|none,underline,overline,line-through|};',
                        insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                        documentation: 'Sets text decoration',
                        range: range
                    },
                    
                    // Color Properties
                    {
                        label: 'color',
                        kind: monaco.languages.CompletionItemKind.Property,
                        insertText: 'color: ${1:#01D29B};',
                        insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                        documentation: 'Sets the text color',
                        range: range
                    },
                    {
                        label: 'background-color',
                        kind: monaco.languages.CompletionItemKind.Property,
                        insertText: 'background-color: ${1:#121212};',
                        insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                        documentation: 'Sets the background color',
                        range: range
                    },
                    {
                        label: 'background',
                        kind: monaco.languages.CompletionItemKind.Property,
                        insertText: 'background: ${1:linear-gradient(135deg, #01D29B, #121212)};',
                        insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                        documentation: 'Sets background properties',
                        range: range
                    },
                    {
                        label: 'background-image',
                        kind: monaco.languages.CompletionItemKind.Property,
                        insertText: 'background-image: url("${1}");',
                        insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                        documentation: 'Sets background image',
                        range: range
                    },
                    
                    // Animation and Transition Properties
                    {
                        label: 'transition',
                        kind: monaco.languages.CompletionItemKind.Property,
                        insertText: 'transition: ${1:all} ${2:0.3s} ${3:ease};',
                        insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                        documentation: 'Sets transition properties',
                        range: range
                    },
                    {
                        label: 'transform',
                        kind: monaco.languages.CompletionItemKind.Property,
                        insertText: 'transform: ${1|translateX(),translateY(),scale(),rotate()|};',
                        insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                        documentation: 'Applies transformations',
                        range: range
                    },
                    {
                        label: 'animation',
                        kind: monaco.languages.CompletionItemKind.Property,
                        insertText: 'animation: ${1:name} ${2:1s} ${3:ease-in-out} ${4:infinite};',
                        insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                        documentation: 'Sets animation properties',
                        range: range
                    },
                    
                    // Shadow Properties
                    {
                        label: 'box-shadow',
                        kind: monaco.languages.CompletionItemKind.Property,
                        insertText: 'box-shadow: ${1:0} ${2:2px} ${3:4px} rgba(0, 0, 0, 0.1);',
                        insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                        documentation: 'Adds shadow to element',
                        range: range
                    },
                    {
                        label: 'text-shadow',
                        kind: monaco.languages.CompletionItemKind.Property,
                        insertText: 'text-shadow: ${1:1px} ${2:1px} ${3:2px} rgba(0, 0, 0, 0.5);',
                        insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                        documentation: 'Adds shadow to text',
                        range: range
                    },
                    
                    // Flexbox Properties
                    {
                        label: 'justify-content',
                        kind: monaco.languages.CompletionItemKind.Property,
                        insertText: 'justify-content: ${1|flex-start,center,flex-end,space-between,space-around,space-evenly|};',
                        insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                        documentation: 'Aligns flex items along main axis',
                        range: range
                    },
                    {
                        label: 'align-items',
                        kind: monaco.languages.CompletionItemKind.Property,
                        insertText: 'align-items: ${1|stretch,flex-start,center,flex-end,baseline|};',
                        insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                        documentation: 'Aligns flex items along cross axis',
                        range: range
                    },
                    {
                        label: 'flex-direction',
                        kind: monaco.languages.CompletionItemKind.Property,
                        insertText: 'flex-direction: ${1|row,column,row-reverse,column-reverse|};',
                        insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                        documentation: 'Sets the direction of flex items',
                        range: range
                    },
                    {
                        label: 'gap',
                        kind: monaco.languages.CompletionItemKind.Property,
                        insertText: 'gap: ${1:20px};',
                        insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                        documentation: 'Sets gap between flex/grid items',
                        range: range
                    },
                    
                    // Grid Properties
                    {
                        label: 'grid-template-columns',
                        kind: monaco.languages.CompletionItemKind.Property,
                        insertText: 'grid-template-columns: ${1:repeat(auto-fit, minmax(200px, 1fr))};',
                        insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                        documentation: 'Defines grid column sizes',
                        range: range
                    },
                    {
                        label: 'grid-template-rows',
                        kind: monaco.languages.CompletionItemKind.Property,
                        insertText: 'grid-template-rows: ${1:auto};',
                        insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                        documentation: 'Defines grid row sizes',
                        range: range
                    },
                    
                    // Overflow Properties
                    {
                        label: 'overflow',
                        kind: monaco.languages.CompletionItemKind.Property,
                        insertText: 'overflow: ${1|visible,hidden,scroll,auto|};',
                        insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                        documentation: 'Sets how overflow is handled',
                        range: range
                    },
                    
                    // Cursor Properties
                    {
                        label: 'cursor',
                        kind: monaco.languages.CompletionItemKind.Property,
                        insertText: 'cursor: ${1|pointer,default,text,move,not-allowed,grab|};',
                        insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                        documentation: 'Sets cursor type',
                        range: range
                    },
                    
                    // Z-index
                    {
                        label: 'z-index',
                        kind: monaco.languages.CompletionItemKind.Property,
                        insertText: 'z-index: ${1:1};',
                        insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                        documentation: 'Sets the stack order',
                        range: range
                    },
                    
                    // Opacity
                    {
                        label: 'opacity',
                        kind: monaco.languages.CompletionItemKind.Property,
                        insertText: 'opacity: ${1:1};',
                        insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                        documentation: 'Sets the transparency level',
                        range: range
                    }
                ];
                return { suggestions };
            }
        });
    }
    
    // Setup JavaScript-specific features
    if (language === 'javascript') {
        monaco.languages.registerCompletionItemProvider('javascript', {
            provideCompletionItems: (model, position) => {
                const suggestions = [
                    {
                        label: 'function',
                        kind: monaco.languages.CompletionItemKind.Snippet,
                        insertText: [
                            'function ${1:functionName}(${2:parameters}) {',
                            '    ${3:// function body}',
                            '    return ${4:result};',
                            '}'
                        ].join('\n'),
                        insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                        documentation: 'Function declaration template'
                    },
                    {
                        label: 'arrow',
                        kind: monaco.languages.CompletionItemKind.Snippet,
                        insertText: 'const ${1:functionName} = (${2:parameters}) => {\n    ${3:// function body}\n    return ${4:result};\n};',
                        insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                        documentation: 'Arrow function template'
                    },
                    {
                        label: 'addEventListener',
                        kind: monaco.languages.CompletionItemKind.Snippet,
                        insertText: [
                            'document.addEventListener(\'${1:DOMContentLoaded}\', function() {',
                            '    ${2:// event handler}',
                            '});'
                        ].join('\n'),
                        insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                        documentation: 'Event listener template'
                    }
                ];
                return { suggestions };
            }
        });
    }
}

// Challenge Modal Functions
// Helper function to generate element checks for challenges
function generateElementChecks(challengeData) {
    // If challenge already has custom elementChecks, use those
    if (challengeData.elementChecks && challengeData.elementChecks.length > 0) {
        return challengeData.elementChecks;
    }
    
    const checks = [];
    
    // Extract elements from validation function
    if (challengeData.validation) {
        const validationStr = challengeData.validation.toString();
        
        // Enhanced mapping of validation patterns to element checks
        const elementMappings = [
            // HTML Structure
            { pattern: '<!DOCTYPE html>', description: 'DOCTYPE declaration' },
            { pattern: '<html>', description: 'HTML root element' },
            { pattern: '<head>', description: 'Head section' },
            { pattern: '<title>', description: 'Page title' },
            { pattern: '<body>', description: 'Body section' },
            
            // HTML Content Elements
            { pattern: '<h1>', description: 'Main heading (h1)' },
            { pattern: '<h2>', description: 'Sub heading (h2)' },
            { pattern: '<h3>', description: 'Section heading (h3)' },
            { pattern: '<p>', description: 'Paragraph element' },
            { pattern: '<strong>', description: 'Bold/strong text' },
            { pattern: '<em>', description: 'Italic/emphasis text' },
            
            // Links and Media
            { pattern: '<a href=', description: 'Link with href attribute' },
            { pattern: '<img', description: 'Image element' },
            { pattern: 'alt=', description: 'Alt attribute for accessibility' },
            { pattern: '<audio', description: 'Audio element' },
            { pattern: '<video', description: 'Video element' },
            { pattern: '<iframe', description: 'Iframe for embedded content' },
            { pattern: 'controls', description: 'Controls attribute for media' },
            
            // Lists
            { pattern: '<ul>', description: 'Unordered list (ul)' },
            { pattern: '<ol>', description: 'Ordered list (ol)' },
            { pattern: '<li>', description: 'List items (li)' },
            
            // Forms
            { pattern: '<form', description: 'Form container' },
            { pattern: '<input', description: 'Input field' },
            { pattern: '<label', description: 'Label for input' },
            { pattern: '<textarea', description: 'Text area for longer text' },
            { pattern: '<button', description: 'Button element' },
            { pattern: '<select', description: 'Select dropdown menu' },
            { pattern: '<option', description: 'Select option' },
            
            // Input Types
            { pattern: 'type="text"', description: 'Text input field' },
            { pattern: 'type="email"', description: 'Email input field' },
            { pattern: 'type="password"', description: 'Password input field' },
            { pattern: 'type="radio"', description: 'Radio button input' },
            { pattern: 'type="checkbox"', description: 'Checkbox input' },
            { pattern: 'type="tel"', description: 'Telephone input type' },
            
            // Form Validation
            { pattern: 'required', description: 'Required validation attribute' },
            { pattern: 'pattern=', description: 'Pattern validation attribute' },
            { pattern: 'minlength=', description: 'Minimum length validation' },
            
            // CSS Properties
            { pattern: 'font-family', description: 'Font family property' },
            { pattern: 'color', description: 'Text color property' },
            { pattern: 'background-color', description: 'Background color property' },
            { pattern: 'margin', description: 'Margin property for outer spacing' },
            { pattern: 'padding', description: 'Padding property for inner spacing' },
            { pattern: 'border', description: 'Border property for element borders' },
            { pattern: 'width', description: 'Width property for element width' },
            { pattern: 'height', description: 'Height property for element height' },
            { pattern: 'font-size', description: 'Font size property' },
            { pattern: 'display', description: 'Display property for layout' },
            { pattern: 'flex', description: 'Flexbox layout property' },
            { pattern: 'grid', description: 'CSS Grid layout property' },
            { pattern: ':hover', description: 'Hover pseudo-class' },
            { pattern: ':focus', description: 'Focus pseudo-class' },
            
            // CSS Selectors
            { pattern: '.', description: 'Class selector', customCheck: (str) => str.includes('.') && str.includes('{') },
            { pattern: '#', description: 'ID selector or hex color', customCheck: (str) => str.includes('#') && (str.includes('{') || str.includes('color')) },
            { pattern: 'h1 {', description: 'Element selector (h1)' },
            
            // Color Formats
            { pattern: 'rgb(', description: 'RGB color format' },
            { pattern: 'hsl(', description: 'HSL color format' },
            
            // JavaScript
            { pattern: 'let', description: 'Variable declaration (let)' },
            { pattern: 'const', description: 'Constant declaration (const)' },
            { pattern: 'var', description: 'Variable declaration (var)' },
            { pattern: 'function', description: 'Function declaration' },
            { pattern: 'if', description: 'Conditional statement (if)' },
            { pattern: 'for', description: 'For loop' },
            { pattern: 'console.log', description: 'Console output' },
            { pattern: 'document.getElementById', description: 'DOM element selection' },
            { pattern: 'addEventListener', description: 'Event listener' },
            
            // Layout
            { pattern: '<div', description: 'Division container' },
            { pattern: '<span', description: 'Inline span' },
            { pattern: '<header', description: 'Header element' },
            { pattern: '<nav', description: 'Navigation element' },
            { pattern: '<main', description: 'Main content element' },
            { pattern: '<footer', description: 'Footer element' }
        ];
        
        // Check which elements are mentioned in validation
        elementMappings.forEach(mapping => {
            if (mapping.customCheck) {
                if (mapping.customCheck(validationStr)) {
                    checks.push({ element: mapping.pattern, description: mapping.description });
                }
            } else {
                const searchPattern = mapping.pattern.replace(/[<>]/g, '');
                if (validationStr.includes(searchPattern)) {
                    checks.push({ element: mapping.pattern, description: mapping.description });
                }
            }
        });
    }
    
    // If still no checks found, create basic ones based on challenge title and description
    if (checks.length === 0) {
        const title = (challengeData.title || '').toLowerCase();
        const description = (challengeData.description || '').toLowerCase();
        const combined = title + ' ' + description;
        
        if (combined.includes('form')) {
            checks.push({ element: '<form', description: 'Form container' });
            checks.push({ element: '<input', description: 'Input field' });
        }
        if (combined.includes('link') || combined.includes('image')) {
            checks.push({ element: '<a href=', description: 'Link' });
            checks.push({ element: '<img', description: 'Image' });
        }
        if (combined.includes('list')) {
            checks.push({ element: '<ul>', description: 'Unordered list' });
            checks.push({ element: '<ol>', description: 'Ordered list' });
        }
        if (combined.includes('css') || combined.includes('style')) {
            checks.push({ element: 'color', description: 'Color property' });
            checks.push({ element: 'font-family', description: 'Font family property' });
        }
        if (combined.includes('javascript') || combined.includes('variable')) {
            checks.push({ element: 'let', description: 'Variable declaration' });
            checks.push({ element: 'function', description: 'Function declaration' });
        }
    }
    
    return checks;
}

// Function to update element indicators in real-time
function updateElementIndicators(code, elementChecks) {
    const indicatorsContainer = document.getElementById('element-indicators');
    if (!indicatorsContainer || !elementChecks) return;
    
    elementChecks.forEach(check => {
        const indicator = indicatorsContainer.querySelector(`[data-element="${check.element}"]`);
        if (indicator) {
            const icon = indicator.querySelector('i');
            const isPresent = code.includes(check.element);
            
            if (isPresent) {
                icon.className = 'fas fa-check-circle';
                icon.style.color = '#28a745';
                indicator.style.opacity = '1';
            } else {
                icon.className = 'fas fa-circle';
                icon.style.color = '#6c757d';
                indicator.style.opacity = '0.6';
            }
        }
    });
}

// Simple wrapper function for the challenge buttons
function openChallenge(challengeNumber) {
    console.log('🎯 openChallenge called with:', challengeNumber);
    try {
        openChallengeModal(challengeNumber);
    } catch (error) {
        console.error('❌ Error in openChallenge:', error);
        alert('Error opening challenge: ' + error.message);
    }
}

function openChallengeModal(challengeNumber) {
    console.log('🚀 openChallengeModal called with:', challengeNumber);
    
    const challengeModal = document.getElementById('challengeModal');
    console.log('📋 Modal element found:', !!challengeModal);
    
    if (!challengeModal) {
        console.error('❌ Challenge modal not found');
        alert('Challenge modal not found in the page');
        return;
    }
    
    // Get current day and challenge data
    const currentDay = getCurrentDayFromURL() || 1;
    console.log('📅 Current day detected:', currentDay);
    console.log('📊 Challenge data exists:', !!window.challengeData);
    console.log('📊 Day data exists:', !!window.challengeData?.[currentDay]);
    
    const challengeData = window.challengeData?.[currentDay]?.challenges?.[challengeNumber - 1];
    console.log('🎯 Challenge data found:', !!challengeData);
    
    if (!challengeData) {
        console.error('❌ No challenge data found for day', currentDay, 'challenge', challengeNumber);
        alert(`No challenge data found for Day ${currentDay}, Challenge ${challengeNumber}`);
        return;
    }
    
    currentModalChallenge = challengeNumber;
    
    // Set challenge title
    const challengeTitle = challengeModal.querySelector('.challenge-modal-header h2');
    if (challengeTitle) {
        challengeTitle.textContent = `Day ${currentDay} - ${challengeData.title}`;
    }
    
    // Create embedded challenge content
    const challengeContent = challengeModal.querySelector('#modalChallengeContent');
    if (challengeContent) {
        challengeContent.innerHTML = `
            <div class="embedded-challenge">
                <div class="challenge-info">
                    <h3>📝 Challenge Instructions</h3>
                    <p>${challengeData.description}</p>
                </div>
                
                <div class="challenge-requirements">
                    <h4>✅ Requirements to Complete:</h4>
                    <div class="requirements-list">
                        ${challengeData.elementChecks?.map(req => `
                            <div class="requirement-item" data-element="${req.element}">
                                <span class="req-status">⭕</span>
                                <span class="req-text">${req.description}</span>
                            </div>
                        `).join('') || '<div class="requirement-item"><span class="req-status">✅</span><span class="req-text">Complete the challenge</span></div>'}
                    </div>
                </div>
                
                <div class="challenge-editor">
                    <div class="editor-header">
                        <h4>💻 Code Editor</h4>
                        <div class="editor-buttons">
                            <button onclick="runEmbeddedChallenge()" class="run-btn">
                                <i class="fas fa-play"></i> Run Code
                            </button>
                            <button onclick="resetEmbeddedChallenge()" class="reset-btn">
                                <i class="fas fa-undo"></i> Reset
                            </button>
                            <button onclick="checkChallengeCompletion()" class="check-btn">
                                <i class="fas fa-check"></i> Check Completion
                            </button>
                        </div>
                    </div>
                    <div id="monaco-challenge-editor" style="height: 300px; border: 1px solid #333;"></div>
                </div>
                
                <div class="challenge-output">
                    <h4>🖥️ Output Preview</h4>
                    <iframe id="challenge-preview" sandbox="allow-same-origin"></iframe>
                </div>
                
                <div class="challenge-hints">
                    <h4>💡 Hints</h4>
                    <ul>
                        ${challengeData.hints?.map(hint => `<li>${hint}</li>`).join('') || '<li>Complete the challenge using the requirements above</li>'}
                    </ul>
                </div>
            </div>
        `;
    }
    
    // Show modal
    challengeModal.classList.add('active');
    
    // Initialize Monaco Editor
    setTimeout(() => {
        initializeMonacoEditor(challengeData, currentDay);
    }, 200);
}

// Initialize Monaco Editor for challenges
function initializeMonacoEditor(challengeData, currentDay) {
    const editorContainer = document.getElementById('monaco-challenge-editor');
    if (!editorContainer) {
        console.error('Monaco editor container not found');
        return;
    }

    // Destroy existing editor if it exists
    if (window.currentChallengeEditor) {
        window.currentChallengeEditor.dispose();
        window.currentChallengeEditor = null;
    }

    // Determine language based on current day
    let language = 'html';
    if (currentDay >= 3 && currentDay <= 5) {
        language = 'css';
    } else if (currentDay >= 6 && currentDay <= 8) {
        language = 'javascript';
    }

    // Check if Monaco is available
    if (typeof monaco !== 'undefined') {
        try {
            // Monaco Editor configuration
            const editorConfig = {
                value: challengeData.starterCode || '',
                language: language,
                theme: 'vs-dark',
                automaticLayout: true,
                minimap: { enabled: false },
                scrollBeyondLastLine: false,
                fontSize: 14,
                lineNumbers: 'on',
                glyphMargin: true,
                folding: true,
                wordWrap: 'on',
                contextmenu: true,
                selectOnLineNumbers: true,
                quickSuggestions: {
                    other: true,
                    comments: true,
                    strings: true
                },
                suggestOnTriggerCharacters: true,
                acceptSuggestionOnCommitCharacter: true,
                acceptSuggestionOnEnter: 'on',
                accessibilitySupport: 'auto'
            };

            // Create Monaco editor
            window.currentChallengeEditor = monaco.editor.create(editorContainer, editorConfig);

            // Set up language-specific features
            setupAdvancedLanguageFeatures(window.currentChallengeEditor, language);

            // Set up real-time validation
            window.currentChallengeEditor.onDidChangeModelContent(() => {
                updateChallengeRequirements();
            });

            // Initial validation
            updateChallengeRequirements();

            console.log(`✅ Monaco Editor initialized with ${language} support`);

        } catch (error) {
            console.error('❌ Failed to initialize Monaco:', error);
            createFallbackEditor(editorContainer, challengeData.starterCode);
        }
    } else {
        console.warn('⚠️ Monaco not available, using fallback editor');
        createFallbackEditor(editorContainer, challengeData.starterCode);
    }
}

// Create fallback textarea editor
function createFallbackEditor(container, starterCode) {
    container.innerHTML = `
        <textarea 
            id="fallback-challenge-editor" 
            style="width: 100%; height: 300px; background: #1e1e1e; color: #ffffff; 
                   font-family: 'Courier New', Monaco, monospace; font-size: 14px; 
                   padding: 15px; border: none; outline: none; resize: vertical; 
                   line-height: 1.5;"
            placeholder="Write your code here..."
        >${starterCode || ''}</textarea>
    `;

    const textarea = container.querySelector('#fallback-challenge-editor');
    if (textarea) {
        textarea.addEventListener('input', updateChallengeRequirements);
        updateChallengeRequirements();
    }
}

// Setup advanced language features for Monaco
function setupAdvancedLanguageFeatures(editor, language) {
    if (!monaco || !editor) return;

    // HTML completions
    if (language === 'html') {
        monaco.languages.registerCompletionItemProvider('html', {
            provideCompletionItems: (model, position) => {
                const suggestions = [
                    {
                        label: 'html5',
                        kind: monaco.languages.CompletionItemKind.Snippet,
                        insertText: '<!DOCTYPE html>\n<html lang="en">\n<head>\n    <meta charset="UTF-8">\n    <meta name="viewport" content="width=device-width, initial-scale=1.0">\n    <title>Document</title>\n</head>\n<body>\n    $0\n</body>\n</html>',
                        insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                        documentation: 'HTML5 document template'
                    },
                    {
                        label: 'div',
                        kind: monaco.languages.CompletionItemKind.Snippet,
                        insertText: '<div>$0</div>',
                        insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                        documentation: 'HTML div element'
                    },
                    {
                        label: 'h1',
                        kind: monaco.languages.CompletionItemKind.Snippet,
                        insertText: '<h1>$0</h1>',
                        insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                        documentation: 'HTML heading 1'
                    },
                    {
                        label: 'p',
                        kind: monaco.languages.CompletionItemKind.Snippet,
                        insertText: '<p>$0</p>',
                        insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                        documentation: 'HTML paragraph'
                    },
                    {
                        label: 'img',
                        kind: monaco.languages.CompletionItemKind.Snippet,
                        insertText: '<img src="$1" alt="$2">',
                        insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                        documentation: 'HTML image'
                    },
                    {
                        label: 'a',
                        kind: monaco.languages.CompletionItemKind.Snippet,
                        insertText: '<a href="$1">$2</a>',
                        insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                        documentation: 'HTML link'
                    },
                    {
                        label: 'ul',
                        kind: monaco.languages.CompletionItemKind.Snippet,
                        insertText: '<ul>\n    <li>$0</li>\n</ul>',
                        insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                        documentation: 'HTML unordered list'
                    },
                    {
                        label: 'ol',
                        kind: monaco.languages.CompletionItemKind.Snippet,
                        insertText: '<ol>\n    <li>$0</li>\n</ol>',
                        insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                        documentation: 'HTML ordered list'
                    },
                    {
                        label: 'table',
                        kind: monaco.languages.CompletionItemKind.Snippet,
                        insertText: '<table>\n    <tr>\n        <th>$1</th>\n    </tr>\n    <tr>\n        <td>$2</td>\n    </tr>\n</table>',
                        insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                        documentation: 'HTML table'
                    },
                    {
                        label: 'form',
                        kind: monaco.languages.CompletionItemKind.Snippet,
                        insertText: '<form action="$1" method="$2">\n    $0\n</form>',
                        insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                        documentation: 'HTML form'
                    },
                    {
                        label: 'input',
                        kind: monaco.languages.CompletionItemKind.Snippet,
                        insertText: '<input type="$1" name="$2" placeholder="$3">',
                        insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                        documentation: 'HTML input'
                    }
                ];

                return { suggestions };
            }
        });
    }

    // CSS completions
    if (language === 'css') {
        monaco.languages.registerCompletionItemProvider('css', {
            provideCompletionItems: (model, position) => {
                const suggestions = [
                    {
                        label: 'display-flex',
                        kind: monaco.languages.CompletionItemKind.Snippet,
                        insertText: 'display: flex;\njustify-content: $1;\nalign-items: $2;',
                        insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                        documentation: 'Flexbox layout'
                    },
                    {
                        label: 'display-grid',
                        kind: monaco.languages.CompletionItemKind.Snippet,
                        insertText: 'display: grid;\ngrid-template-columns: $1;\ngap: $2;',
                        insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                        documentation: 'Grid layout'
                    },
                    {
                        label: 'center',
                        kind: monaco.languages.CompletionItemKind.Snippet,
                        insertText: 'display: flex;\njustify-content: center;\nalign-items: center;',
                        insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                        documentation: 'Center content with flexbox'
                    },
                    {
                        label: 'transition',
                        kind: monaco.languages.CompletionItemKind.Snippet,
                        insertText: 'transition: $1 $2s ease;',
                        insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                        documentation: 'CSS transition'
                    },
                    {
                        label: 'border-radius',
                        kind: monaco.languages.CompletionItemKind.Snippet,
                        insertText: 'border-radius: ${1:8px};',
                        insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                        documentation: 'Border radius'
                    },
                    {
                        label: 'box-shadow',
                        kind: monaco.languages.CompletionItemKind.Snippet,
                        insertText: 'box-shadow: ${1:0 2px 4px rgba(0, 0, 0, 0.1)};',
                        insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                        documentation: 'Box shadow'
                    },
                    {
                        label: 'gradient',
                        kind: monaco.languages.CompletionItemKind.Snippet,
                        insertText: 'background: linear-gradient(${1:135deg}, ${2:#color1}, ${3:#color2});',
                        insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                        documentation: 'Linear gradient background'
                    }
                ];

                return { suggestions };
            }
        });
    }

    // JavaScript completions
    if (language === 'javascript') {
        monaco.languages.registerCompletionItemProvider('javascript', {
            provideCompletionItems: (model, position) => {
                const suggestions = [
                    {
                        label: 'console.log',
                        kind: monaco.languages.CompletionItemKind.Snippet,
                        insertText: 'console.log($1);',
                        insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                        documentation: 'Console log'
                    },
                    {
                        label: 'function',
                        kind: monaco.languages.CompletionItemKind.Snippet,
                        insertText: 'function ${1:functionName}(${2:parameters}) {\n    $0\n}',
                        insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                        documentation: 'Function declaration'
                    },
                    {
                        label: 'if',
                        kind: monaco.languages.CompletionItemKind.Snippet,
                        insertText: 'if (${1:condition}) {\n    $0\n}',
                        insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                        documentation: 'If statement'
                    },
                    {
                        label: 'for',
                        kind: monaco.languages.CompletionItemKind.Snippet,
                        insertText: 'for (let ${1:i} = 0; ${1:i} < ${2:array}.length; ${1:i}++) {\n    $0\n}',
                        insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                        documentation: 'For loop'
                    },
                    {
                        label: 'forEach',
                        kind: monaco.languages.CompletionItemKind.Snippet,
                        insertText: '${1:array}.forEach(${2:item} => {\n    $0\n});',
                        insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                        documentation: 'Array forEach'
                    },
                    {
                        label: 'addEventListener',
                        kind: monaco.languages.CompletionItemKind.Snippet,
                        insertText: '${1:element}.addEventListener(\'${2:event}\', ${3:function});',
                        insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                        documentation: 'Add event listener'
                    },
                    {
                        label: 'querySelector',
                        kind: monaco.languages.CompletionItemKind.Snippet,
                        insertText: 'document.querySelector(\'${1:selector}\');',
                        insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                        documentation: 'Query selector'
                    },
                    {
                        label: 'getElementById',
                        kind: monaco.languages.CompletionItemKind.Snippet,
                        insertText: 'document.getElementById(\'${1:id}\');',
                        insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                        documentation: 'Get element by ID'
                    }
                ];

                return { suggestions };
            }
        });
    }
}

// Function to run the embedded challenge
function runEmbeddedChallenge() {
    const preview = document.getElementById('challenge-preview');
    if (!preview) return;
    
    let code = '';
    
    // Get code from Monaco editor or fallback textarea
    if (window.currentChallengeEditor) {
        code = window.currentChallengeEditor.getValue();
    } else {
        const fallbackEditor = document.getElementById('fallback-challenge-editor');
        if (fallbackEditor) {
            code = fallbackEditor.value;
        }
    }
    
    if (code.trim()) {
        // Create a more complete HTML document if it's just a fragment
        let fullHtml = code;
        if (!code.toLowerCase().includes('<!doctype') && !code.toLowerCase().includes('<html')) {
            fullHtml = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Preview</title>
    <style>
        body { margin: 20px; font-family: Arial, sans-serif; }
    </style>
</head>
<body>
    ${code}
</body>
</html>`;
        }
        
        const blob = new Blob([fullHtml], { type: 'text/html' });
        const url = URL.createObjectURL(blob);
        preview.src = url;
        
        // Clean up the URL after a delay
        setTimeout(() => URL.revokeObjectURL(url), 2000);
        
        // Also update requirements
        updateChallengeRequirements();
    } else {
        preview.src = 'about:blank';
    }
}

// Function to reset the embedded challenge
function resetEmbeddedChallenge() {
    const currentDay = getCurrentDayFromURL() || 1;
    const challengeData = window.challengeData?.[currentDay]?.challenges?.[currentModalChallenge - 1];
    
    if (challengeData) {
        // Reset Monaco editor or fallback textarea
        if (window.currentChallengeEditor) {
            window.currentChallengeEditor.setValue(challengeData.starterCode || '');
        } else {
            const fallbackEditor = document.getElementById('fallback-challenge-editor');
            if (fallbackEditor) {
                fallbackEditor.value = challengeData.starterCode || '';
            }
        }
        
        // Reset preview
        const preview = document.getElementById('challenge-preview');
        if (preview) {
            preview.src = 'about:blank';
        }
        
        // Update requirements
        updateChallengeRequirements();
    }
}

// Function to update challenge requirements in real-time
function updateChallengeRequirements() {
    let code = '';
    let originalCode = '';
    
    // Get code from Monaco editor or fallback textarea
    if (window.currentChallengeEditor) {
        originalCode = window.currentChallengeEditor.getValue();
        code = originalCode.toLowerCase();
    } else {
        const fallbackEditor = document.getElementById('fallback-challenge-editor');
        if (fallbackEditor) {
            originalCode = fallbackEditor.value;
            code = originalCode.toLowerCase();
        }
    }
    
    if (!code.trim()) return;
    
    const requirements = document.querySelectorAll('.requirement-item');
    let completedCount = 0;
    let totalCount = requirements.length;
    
    requirements.forEach(req => {
        const element = req.dataset.element?.toLowerCase();
        const statusSpan = req.querySelector('.req-status');
        const reqText = req.querySelector('.req-text');
        
        let isCompleted = false;
        
        // More specific checking based on element type
        if (element) {
            if (element.includes('<') && element.includes('>')) {
                // Full tag check (e.g., "<h1>", "<div>")
                isCompleted = code.includes(element);
            } else if (element === 'h1' || element === 'h2' || element === 'h3' || element === 'h4' || element === 'h5' || element === 'h6') {
                // Heading tags
                isCompleted = code.includes(`<${element}`) && code.includes(`</${element}>`);
            } else if (element === 'p' || element === 'div' || element === 'span') {
                // Block/inline elements
                isCompleted = code.includes(`<${element}`) && code.includes(`</${element}>`);
            } else if (element === 'img') {
                // Self-closing elements
                isCompleted = code.includes('<img') && (code.includes('src=') || code.includes('alt='));
            } else if (element === 'ul' || element === 'ol') {
                // Lists
                isCompleted = code.includes(`<${element}`) && code.includes('<li') && code.includes(`</${element}>`);
            } else if (element === 'table') {
                // Tables
                isCompleted = code.includes('<table') && code.includes('<tr') && code.includes('</table>');
            } else if (element === 'form') {
                // Forms
                isCompleted = code.includes('<form') && code.includes('</form>');
            } else if (element === 'input') {
                // Inputs
                isCompleted = code.includes('<input') && code.includes('type=');
            } else {
                // General check
                isCompleted = code.includes(element);
            }
        }
        
        if (isCompleted) {
            statusSpan.textContent = '✅';
            statusSpan.style.color = '#4CAF50';
            req.style.background = 'rgba(76, 175, 80, 0.15)';
            req.style.borderColor = 'rgba(76, 175, 80, 0.3)';
            reqText.style.color = '#4CAF50';
            completedCount++;
        } else {
            statusSpan.textContent = '⭕';
            statusSpan.style.color = '#ff9800';
            req.style.background = 'rgba(255, 152, 0, 0.1)';
            req.style.borderColor = 'rgba(255, 152, 0, 0.2)';
            reqText.style.color = 'var(--text-primary)';
        }
    });
    
    // Auto-update preview if code has meaningful content
    if (originalCode.trim() && originalCode.length > 10) {
        updateCodePreview(originalCode);
    }
    
    // Show completion status
    const completionPercentage = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;
    updateCompletionStatus(completedCount, totalCount, completionPercentage);
}

// Function to automatically update code preview
function updateCodePreview(code) {
    const preview = document.getElementById('challenge-preview');
    if (!preview || !code.trim()) return;
    
    try {
        // Create a more complete HTML document if it's just a fragment
        let fullHtml = code;
        if (!code.toLowerCase().includes('<!doctype') && !code.toLowerCase().includes('<html')) {
            fullHtml = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Live Preview</title>
    <style>
        body { margin: 20px; font-family: Arial, sans-serif; line-height: 1.4; }
        h1, h2, h3 { color: #333; }
        p { margin-bottom: 10px; }
    </style>
</head>
<body>
    ${code}
</body>
</html>`;
        }
        
        const blob = new Blob([fullHtml], { type: 'text/html' });
        const url = URL.createObjectURL(blob);
        preview.src = url;
        
        // Clean up the URL after a delay
        setTimeout(() => URL.revokeObjectURL(url), 2000);
    } catch (error) {
        console.error('Error updating preview:', error);
    }
}

// Function to show completion status
function updateCompletionStatus(completed, total, percentage) {
    // Find or create completion status element
    let statusElement = document.querySelector('.completion-status');
    if (!statusElement) {
        const requirementsSection = document.querySelector('.challenge-requirements');
        if (requirementsSection) {
            statusElement = document.createElement('div');
            statusElement.className = 'completion-status';
            requirementsSection.appendChild(statusElement);
        }
    }
    
    if (statusElement) {
        if (completed === total && total > 0) {
            statusElement.innerHTML = `
                <div style="padding: 10px; background: rgba(76, 175, 80, 0.2); border: 2px solid #4CAF50; border-radius: 8px; margin-top: 15px; text-align: center;">
                    <span style="color: #4CAF50; font-weight: 600; font-size: 1.1rem;">
                        🎉 All Requirements Complete! (${completed}/${total})
                    </span>
                </div>
            `;
        } else if (completed > 0) {
            statusElement.innerHTML = `
                <div style="padding: 8px; background: rgba(1, 210, 155, 0.1); border: 2px solid rgba(1, 210, 155, 0.3); border-radius: 8px; margin-top: 15px; text-align: center;">
                    <span style="color: var(--primary-color); font-weight: 600;">
                        Progress: ${completed}/${total} (${percentage}%)
                    </span>
                </div>
            `;
        } else {
            statusElement.innerHTML = `
                <div style="padding: 8px; background: rgba(255, 152, 0, 0.1); border: 2px solid rgba(255, 152, 0, 0.3); border-radius: 8px; margin-top: 15px; text-align: center;">
                    <span style="color: #ff9800; font-weight: 600;">
                        Start coding to see progress...
                    </span>
                </div>
            `;
        }
    }
}

// Function to check if challenge is completed
function checkChallengeCompletion() {
    const currentDay = getCurrentDayFromURL() || 1;
    const challengeData = window.challengeData?.[currentDay]?.challenges?.[currentModalChallenge - 1];
    
    if (!challengeData) return;
    
    let code = '';
    
    // Get code from Monaco editor or fallback textarea
    if (window.currentChallengeEditor) {
        code = window.currentChallengeEditor.getValue();
    } else {
        const fallbackEditor = document.getElementById('fallback-challenge-editor');
        if (fallbackEditor) {
            code = fallbackEditor.value;
        }
    }
    
    if (!code) return;
    
    // Run the validation function
    let isCompleted = false;
    try {
        isCompleted = challengeData.validation(code);
    } catch (e) {
        console.error('Validation error:', e);
    }
    
    // Show completion status
    if (isCompleted) {
        alert(`🎉 Congratulations! You completed Day ${currentDay} - Challenge ${currentModalChallenge}!\n\nYour code meets all the requirements. Great job!`);
        
        // Mark as completed in localStorage
        const completedChallenges = JSON.parse(localStorage.getItem('completedChallenges') || '{}');
        if (!completedChallenges[currentDay]) completedChallenges[currentDay] = [];
        if (!completedChallenges[currentDay].includes(currentModalChallenge)) {
            completedChallenges[currentDay].push(currentModalChallenge);
            localStorage.setItem('completedChallenges', JSON.stringify(completedChallenges));
        }
    } else {
        alert(`❌ Not quite there yet!\n\nYour code doesn't meet all the requirements. Check the requirements list and try again.\n\nHint: Make sure you've included all the required elements and structure.`);
    }
}

function getCurrentDayFromURL() {
    const url = window.location.pathname;
    if (url.includes('html-fundamentals.html')) return 1;
    if (url.includes('html-forms.html')) return 2;
    if (url.includes('css-basics.html')) return 3;
    if (url.includes('css-layout.html')) return 4;
    if (url.includes('css-advanced.html')) return 5;
    if (url.includes('javascript-basics.html')) return 6;
    if (url.includes('javascript-conditions.html')) return 7;
    if (url.includes('javascript-arrays.html')) return 8;
    if (url.includes('final-project.html')) return 9;
    return 1; // Default
}

// Get the appropriate Monaco Editor language based on current day
function getLanguageForDay(day) {
    if (day <= 2) return 'html';  // Days 1-2: HTML
    if (day <= 5) return 'css';   // Days 3-5: CSS  
    if (day >= 6) return 'javascript'; // Days 6-8: JavaScript
    return 'html'; // Default
}

// Enhanced Monaco Editor configuration for each language
function getMonacoConfig(language, starterCode = '') {
    const baseConfig = {
        value: starterCode,
        language: language,
        theme: 'vs-dark',
        automaticLayout: true,
        minimap: { enabled: false },
        scrollBeyondLastLine: false,
        fontSize: 14,
        lineNumbers: 'on',
        roundedSelection: false,
        wordWrap: 'on',
        tabSize: 2,
        insertSpaces: true,
        detectIndentation: false,
        folding: true,
        bracketMatching: 'always',
        autoClosingBrackets: 'always',
        autoClosingQuotes: 'always',
        autoIndent: 'full',
        formatOnPaste: true,
        formatOnType: true
    };

    // Language-specific enhancements
    switch (language) {
        case 'html':
            return {
                ...baseConfig,
                suggest: {
                    showSnippets: true,
                    snippetsPreventQuickSuggestions: false
                },
                quickSuggestions: {
                    other: true,
                    comments: false,
                    strings: true
                },
                autoClosingTags: true,
                linkedEditing: true,
                emmetOptions: {
                    showExpandedAbbreviation: 'always'
                }
            };
        
        case 'css':
            return {
                ...baseConfig,
                suggest: {
                    showSnippets: true,
                    snippetsPreventQuickSuggestions: false
                },
                quickSuggestions: {
                    other: true,
                    comments: false,
                    strings: true
                },
                colorDecorators: true,
                validate: true
            };
        
        case 'javascript':
            return {
                ...baseConfig,
                suggest: {
                    showSnippets: true,
                    snippetsPreventQuickSuggestions: false
                },
                quickSuggestions: {
                    other: true,
                    comments: false,
                    strings: true
                },
                parameterHints: {
                    enabled: true,
                    cycle: true
                },
                hover: {
                    enabled: true
                },
                occurrencesHighlight: true,
                selectionHighlight: true,
                codeLens: false
            };
        
        default:
            return baseConfig;
    }
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
    
    const outputContainer = challengeModal.querySelector('#modal-output');
    if (!outputContainer) return;
    
    let code = '';
    
    // Get code from either Monaco editor or fallback textarea
    if (currentModalEditor) {
        code = currentModalEditor.getValue();
    } else {
        const fallbackEditor = challengeModal.querySelector('#fallback-editor');
        if (fallbackEditor) {
            code = fallbackEditor.value;
        }
    }
    
    if (code) {
        // Create a safe iframe to run the code
        const iframe = document.createElement('iframe');
        iframe.style.width = '100%';
        iframe.style.height = '300px';
        iframe.style.border = '1px solid #333';
        iframe.style.borderRadius = '5px';
        iframe.style.backgroundColor = '#fff';
        
        outputContainer.innerHTML = '';
        outputContainer.appendChild(iframe);
        
        // Write the code to the iframe
        const iframeDoc = iframe.contentDocument || iframe.contentWindow.document;
        iframeDoc.open();
        iframeDoc.write(code);
        iframeDoc.close();
    }
}

function resetChallengeModal() {
    const challengeModal = document.getElementById('challengeModal');
    if (!challengeModal) return;
    
    const currentDay = getCurrentDayFromURL() || 1;
    const challengeData = window.challengeData?.[currentDay]?.challenges?.[currentModalChallenge - 1];
    
    if (challengeData) {
        // Reset either Monaco editor or fallback textarea
        if (currentModalEditor) {
            currentModalEditor.setValue(challengeData.starterCode);
        } else {
            const fallbackEditor = challengeModal.querySelector('#fallback-editor');
            if (fallbackEditor) {
                fallbackEditor.value = challengeData.starterCode;
            }
        }
        
        const outputContainer = challengeModal.querySelector('#modal-output');
        if (outputContainer) {
            outputContainer.innerHTML = '';
        }
        
        // Reset element indicators
        updateElementIndicators(challengeData.starterCode, challengeData.elementChecks);
    }
}

function validateChallengeModal(challenge, code, output) {
    // Basic validation - can be expanded
    return code.includes('<html>') && code.includes('</html>');
}

function completeChallenge() {
    if (!currentModalChallenge || !currentModalEditor) return;
    
    const currentDay = getCurrentDayFromURL() || 1;
    const challengeData = window.challengeData?.[currentDay]?.challenges?.[currentModalChallenge - 1];
    
    if (!challengeData) return;
    
    const code = currentModalEditor.getValue();
    const isValid = challengeData.validation(code);
    
    if (isValid) {
        console.log(`Challenge ${currentModalChallenge} completed successfully!`);
        closeChallengeModal();
        
        // Show success message
        const notification = document.createElement('div');
        notification.className = 'notification notification-success show';
        notification.innerHTML = `
            <div class="notification-content">
                <i class="fas fa-check-circle"></i>
                <span>Challenge completed successfully! <i class="fas fa-trophy"></i></span>
            </div>
        `;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.remove();
        }, 3000);
        
        // Save progress
        saveChallengeProgress(currentDay, currentModalChallenge);
    } else {
        // Show error message
        const notification = document.createElement('div');
        notification.className = 'notification notification-error show';
        notification.innerHTML = `
            <div class="notification-content">
                <i class="fas fa-exclamation-circle"></i>
                <span>Challenge not complete. Check the hints and try again!</span>
            </div>
        `;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.remove();
        }, 3000);
    }
}

function saveChallengeProgress(day, challenge) {
    const progress = getFromLocalStorage('challengeProgress', {});
    if (!progress[day]) {
        progress[day] = [];
    }
    if (!progress[day].includes(challenge)) {
        progress[day].push(challenge);
    }
    saveToLocalStorage('challengeProgress', progress);
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

// Test function to help debug challenges
function testChallengeSystem() {
    console.log('=== Challenge System Diagnostic ===');
    console.log('Current URL:', window.location.pathname);
    console.log('Detected day:', getCurrentDayFromURL());
    console.log('Challenge modal element:', document.getElementById('challengeModal'));
    console.log('Challenge data available:', Object.keys(window.challengeData || {}));
    
    const currentDay = getCurrentDayFromURL();
    if (window.challengeData[currentDay]) {
        console.log(`Day ${currentDay} has ${window.challengeData[currentDay].challenges.length} challenges`);
        window.challengeData[currentDay].challenges.forEach((challenge, index) => {
            console.log(`  Challenge ${index + 1}: ${challenge.title}`);
        });
    } else {
        console.log(`No challenge data found for day ${currentDay}`);
    }
    console.log('=== End Diagnostic ===');
}

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
window.testChallengeSystem = testChallengeSystem; 