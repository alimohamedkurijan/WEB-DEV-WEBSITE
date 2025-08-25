// WebDev LMS - Modern JavaScript for Tailwind CSS Pages
// Global variables
let currentChallenge = 0;
let monacoEditor = null;
let challengeRequirements = {};

// Monaco Editor initialization
function initializeMonacoEditor() {
    if (typeof require !== 'undefined') {
        require.config({ 
            paths: { 
                vs: 'https://cdnjs.cloudflare.com/ajax/libs/monaco-editor/0.44.0/min/vs' 
            } 
        });
        
        require(['vs/editor/editor.main'], function() {
            console.log('Monaco Editor loaded successfully');
        });
    }
}

// Challenge modal functions for Day 1 (HTML Fundamentals)
function openChallenge(challengeNumber) {
    const modal = document.getElementById('challengeModal');
    const title = document.getElementById('challengeTitle');
    const content = document.getElementById('challengeContent');
    
    if (!modal || !title || !content) {
        console.error('Challenge modal elements not found');
        return;
    }
    
    currentChallenge = challengeNumber;
    
    // Set challenge title and content based on challenge number
    const challenges = {
        1: {
            title: 'Challenge 1: Basic Structure',
            requirements: [
                { id: 'doctype', text: 'Include DOCTYPE declaration', completed: false },
                { id: 'html', text: 'Add html, head, and body tags', completed: false },
                { id: 'title', text: 'Set a page title', completed: false },
                { id: 'h1', text: 'Add a main heading (h1)', completed: false },
                { id: 'p', text: 'Include a paragraph with some text', completed: false }
            ],
            content: `
                <div class="space-y-6">
                    <div class="bg-primary/10 border border-primary/20 rounded-2xl p-6">
                        <h3 class="text-xl font-bold text-white mb-4">📝 Task</h3>
                        <p class="text-gray-300 mb-4">Create a simple HTML page with proper document structure.</p>
                        <div class="bg-dark-light rounded-xl p-4">
                            <h4 class="text-primary font-semibold mb-2">Requirements:</h4>
                            <ul id="requirements-list-1" class="text-gray-300 space-y-2 text-sm">
                                <!-- Requirements will be populated here -->
                            </ul>
                        </div>
                    </div>
                    
                    <div class="bg-dark-light/50 rounded-2xl border border-primary/20 p-6">
                        <h3 class="text-xl font-bold text-white mb-4">💻 Code Editor</h3>
                        <div id="monaco-editor-challenge-1" class="w-full h-64 bg-black rounded-xl border border-primary/20"></div>
                        <div class="flex space-x-4 mt-4">
                            <button class="bg-gradient-to-r from-primary to-accent text-white px-6 py-2 rounded-xl font-semibold hover:shadow-lg hover:shadow-primary/25 transition-all duration-300" onclick="runChallenge(1)">
                                <i class="fas fa-play mr-2"></i>Run Code
                            </button>
                            <button class="bg-gray-600 text-white px-6 py-2 rounded-xl font-semibold hover:bg-gray-700 transition-all duration-300" onclick="resetChallenge(1)">
                                <i class="fas fa-undo mr-2"></i>Reset
                            </button>
                        </div>
                    </div>
                    
                    <div class="bg-primary/10 border border-primary/20 rounded-2xl p-6">
                        <h3 class="text-xl font-bold text-white mb-4">🎯 Expected Output</h3>
                        <div class="bg-white rounded-xl p-4">
                            <h1 class="text-3xl font-bold text-gray-800 mb-2">My First Web Page</h1>
                            <p class="text-gray-600">This is a paragraph about my website.</p>
                        </div>
                    </div>
                    
                    <div id="output-window-1" class="bg-dark-light/50 rounded-2xl border border-primary/20 p-6 hidden">
                        <h3 class="text-xl font-bold text-white mb-4">📱 Live Output</h3>
                        <div id="output-content-1" class="bg-white rounded-xl p-4 min-h-32">
                            <!-- Output will be displayed here -->
                        </div>
                    </div>
                </div>
            `
        },
        2: {
            title: 'Challenge 2: Content Elements',
            requirements: [
                { id: 'h1', text: 'Create a main heading (h1)', completed: false },
                { id: 'h2', text: 'Add two subheadings (h2)', completed: false },
                { id: 'p', text: 'Include paragraphs with formatted text', completed: false },
                { id: 'strong', text: 'Use strong and em tags for emphasis', completed: false }
            ],
            content: `
                <div class="space-y-6">
                    <div class="bg-primary/10 border border-primary/20 rounded-2xl p-6">
                        <h3 class="text-xl font-bold text-white mb-4">📝 Task</h3>
                        <p class="text-gray-300 mb-4">Use headings, paragraphs, and text formatting elements.</p>
                        <div class="bg-dark-light rounded-xl p-4">
                            <h4 class="text-primary font-semibold mb-2">Requirements:</h4>
                            <ul id="requirements-list-2" class="text-gray-300 space-y-2 text-sm">
                                <!-- Requirements will be populated here -->
                            </ul>
                        </div>
                    </div>
                    
                    <div class="bg-dark-light/50 rounded-2xl border border-primary/20 p-6">
                        <h3 class="text-xl font-bold text-white mb-4">💻 Code Editor</h3>
                        <div id="monaco-editor-challenge-2" class="w-full h-64 bg-black rounded-xl border border-primary/20"></div>
                        <div class="flex space-x-4 mt-4">
                            <button class="bg-gradient-to-r from-primary to-accent text-white px-6 py-2 rounded-xl font-semibold hover:shadow-lg hover:shadow-primary/25 transition-all duration-300" onclick="runChallenge(2)">
                                <i class="fas fa-play mr-2"></i>Run Code
                            </button>
                            <button class="bg-gray-600 text-white px-6 py-2 rounded-xl font-semibold hover:bg-gray-700 transition-all duration-300" onclick="resetChallenge(2)">
                                <i class="fas fa-undo mr-2"></i>Reset
                            </button>
                        </div>
                    </div>
                    
                    <div id="output-window-2" class="bg-dark-light/50 rounded-2xl border border-primary/20 p-6 hidden">
                        <h3 class="text-xl font-bold text-white mb-4">📱 Live Output</h3>
                        <div id="output-content-2" class="bg-white rounded-xl p-4 min-h-32">
                            <!-- Output will be displayed here -->
                        </div>
                    </div>
                </div>
            `
        },
        3: {
            title: 'Challenge 3: Links & Lists',
            requirements: [
                { id: 'nav', text: 'Create a navigation menu with links', completed: false },
                { id: 'ol', text: 'Add an ordered list with 3 items', completed: false },
                { id: 'ul', text: 'Include an unordered list with 3 items', completed: false },
                { id: 'href', text: 'Use proper link attributes', completed: false }
            ],
            content: `
                <div class="space-y-6">
                    <div class="bg-primary/10 border border-primary/20 rounded-2xl p-6">
                        <h3 class="text-xl font-bold text-white mb-4">📝 Task</h3>
                        <p class="text-gray-300 mb-4">Create navigation links and organize content with lists.</p>
                        <div class="bg-dark-light rounded-xl p-4">
                            <h4 class="text-primary font-semibold mb-2">Requirements:</h4>
                            <ul id="requirements-list-3" class="text-gray-300 space-y-2 text-sm">
                                <!-- Requirements will be populated here -->
                            </ul>
                        </div>
                    </div>
                    
                    <div class="bg-dark-light/50 rounded-2xl border border-primary/20 p-6">
                        <h3 class="text-xl font-bold text-white mb-4">💻 Code Editor</h3>
                        <div id="monaco-editor-challenge-3" class="w-full h-64 bg-black rounded-xl border border-primary/20"></div>
                        <div class="flex space-x-4 mt-4">
                            <button class="bg-gradient-to-r from-primary to-accent text-white px-6 py-2 rounded-xl font-semibold hover:shadow-lg hover:shadow-primary/25 transition-all duration-300" onclick="runChallenge(3)">
                                <i class="fas fa-play mr-2"></i>Run Code
                            </button>
                            <button class="bg-gray-600 text-white px-6 py-2 rounded-xl font-semibold hover:bg-gray-700 transition-all duration-300" onclick="resetChallenge(3)">
                                <i class="fas fa-undo mr-2"></i>Reset
                            </button>
                        </div>
                    </div>
                    
                    <div id="output-window-3" class="bg-dark-light/50 rounded-2xl border border-primary/20 p-6 hidden">
                        <h3 class="text-xl font-bold text-white mb-4">📱 Live Output</h3>
                        <div id="output-content-3" class="bg-white rounded-xl p-4 min-h-32">
                            <!-- Output will be displayed here -->
                        </div>
                    </div>
                </div>
            `
        },
        4: {
            title: 'Challenge 4: Images & Media',
            requirements: [
                { id: 'img', text: 'Add an image with proper alt text', completed: false },
                { id: 'video', text: 'Include a video element', completed: false },
                { id: 'audio', text: 'Add an audio element', completed: false },
                { id: 'attributes', text: 'Use proper media attributes', completed: false }
            ],
            content: `
                <div class="space-y-6">
                    <div class="bg-primary/10 border border-primary/20 rounded-2xl p-6">
                        <h3 class="text-xl font-bold text-white mb-4">📝 Task</h3>
                        <p class="text-gray-300 mb-4">Add images, videos, and other media elements to your page.</p>
                        <div class="bg-dark-light rounded-xl p-4">
                            <h4 class="text-primary font-semibold mb-2">Requirements:</h4>
                            <ul id="requirements-list-4" class="text-gray-300 space-y-2 text-sm">
                                <!-- Requirements will be populated here -->
                            </ul>
                        </div>
                    </div>
                    
                    <div class="bg-dark-light/50 rounded-2xl border border-primary/20 p-6">
                        <h3 class="text-xl font-bold text-white mb-4">💻 Code Editor</h3>
                        <div id="monaco-editor-challenge-4" class="w-full h-64 bg-black rounded-xl border border-primary/20"></div>
                        <div class="flex space-x-4 mt-4">
                            <button class="bg-gradient-to-r from-primary to-accent text-white px-6 py-2 rounded-xl font-semibold hover:shadow-lg hover:shadow-primary/25 transition-all duration-300" onclick="runChallenge(4)">
                                <i class="fas fa-play mr-2"></i>Run Code
                            </button>
                            <button class="bg-gray-600 text-white px-6 py-2 rounded-xl font-semibold hover:bg-gray-700 transition-all duration-300" onclick="resetChallenge(4)">
                                <i class="fas fa-undo mr-2"></i>Reset
                            </button>
                        </div>
                    </div>
                    
                    <div id="output-window-4" class="bg-dark-light/50 rounded-2xl border border-primary/20 p-6 hidden">
                        <h3 class="text-xl font-bold text-white mb-4">📱 Live Output</h3>
                        <div id="output-content-4" class="bg-white rounded-xl p-4 min-h-32">
                            <!-- Output will be displayed here -->
                        </div>
                    </div>
                </div>
            `
        }
    };

    // Day 2 Challenges (HTML Forms)
    const challengesDay2 = {
        5: {
            title: 'Challenge 1: Basic Form',
            requirements: [
                { id: 'form', text: 'Create a form element', completed: false },
                { id: 'input', text: 'Add input fields', completed: false },
                { id: 'label', text: 'Include labels for inputs', completed: false },
                { id: 'submit', text: 'Add a submit button', completed: false }
            ],
            content: `
                <div class="space-y-6">
                    <div class="bg-primary/10 border border-primary/20 rounded-2xl p-6">
                        <h3 class="text-xl font-bold text-white mb-4">📝 Task</h3>
                        <p class="text-gray-300 mb-4">Create a basic HTML form with input fields and labels.</p>
                        <div class="bg-dark-light rounded-xl p-4">
                            <h4 class="text-primary font-semibold mb-2">Requirements:</h4>
                            <ul id="requirements-list-5" class="text-gray-300 space-y-2 text-sm">
                                <!-- Requirements will be populated here -->
                            </ul>
                        </div>
                    </div>

                    <div class="bg-dark-light/50 rounded-2xl border border-primary/20 p-6">
                        <h3 class="text-xl font-bold text-white mb-4">💻 Code Editor</h3>
                        <div id="monaco-editor-challenge-5" class="w-full h-64 bg-black rounded-xl border border-primary/20"></div>
                        <div class="flex space-x-4 mt-4">
                            <button class="bg-gradient-to-r from-primary to-accent text-white px-6 py-2 rounded-xl font-semibold hover:shadow-lg hover:shadow-primary/25 transition-all duration-300" onclick="runChallenge(5)">
                                <i class="fas fa-play mr-2"></i>Run Code
                            </button>
                            <button class="bg-gray-600 text-white px-6 py-2 rounded-xl font-semibold hover:bg-gray-700 transition-all duration-300" onclick="resetChallenge(5)">
                                <i class="fas fa-undo mr-2"></i>Reset
                            </button>
                        </div>
                    </div>

                    <div class="bg-primary/10 border border-primary/20 rounded-2xl p-6">
                        <h3 class="text-xl font-bold text-white mb-4">🎯 Expected Output</h3>
                        <div class="bg-white rounded-xl p-4">
                            <form>
                                <label>Name: <input type="text"></label><br>
                                <label>Email: <input type="email"></label><br>
                                <button type="submit">Submit</button>
                            </form>
                        </div>
                    </div>

                    <div id="output-window-5" class="bg-dark-light/50 rounded-2xl border border-primary/20 p-6 hidden">
                        <h3 class="text-xl font-bold text-white mb-4">📱 Live Output</h3>
                        <div id="output-content-5" class="bg-white rounded-xl p-4 min-h-32">
                            <!-- Output will be displayed here -->
                        </div>
                    </div>
                </div>
            `
        },
        6: {
            title: 'Challenge 2: Input Types',
            requirements: [
                { id: 'text', text: 'Use text input type', completed: false },
                { id: 'email', text: 'Add email input type', completed: false },
                { id: 'password', text: 'Include password input', completed: false },
                { id: 'number', text: 'Add number input type', completed: false }
            ],
            content: `
                <div class="space-y-6">
                    <div class="bg-primary/10 border border-primary/20 rounded-2xl p-6">
                        <h3 class="text-xl font-bold text-white mb-4">📝 Task</h3>
                        <p class="text-gray-300 mb-4">Create a form with different input types for various data.</p>
                        <div class="bg-dark-light rounded-xl p-4">
                            <h4 class="text-primary font-semibold mb-2">Requirements:</h4>
                            <ul id="requirements-list-6" class="text-gray-300 space-y-2 text-sm">
                                <!-- Requirements will be populated here -->
                            </ul>
                        </div>
                    </div>

                    <div class="bg-dark-light/50 rounded-2xl border border-primary/20 p-6">
                        <h3 class="text-xl font-bold text-white mb-4">💻 Code Editor</h3>
                        <div id="monaco-editor-challenge-6" class="w-full h-64 bg-black rounded-xl border border-primary/20"></div>
                        <div class="flex space-x-4 mt-4">
                            <button class="bg-gradient-to-r from-primary to-accent text-white px-6 py-2 rounded-xl font-semibold hover:shadow-lg hover:shadow-primary/25 transition-all duration-300" onclick="runChallenge(6)">
                                <i class="fas fa-play mr-2"></i>Run Code
                            </button>
                            <button class="bg-gray-600 text-white px-6 py-2 rounded-xl font-semibold hover:bg-gray-700 transition-all duration-300" onclick="resetChallenge(6)">
                                <i class="fas fa-undo mr-2"></i>Reset
                            </button>
                        </div>
                    </div>

                    <div class="bg-primary/10 border border-primary/20 rounded-2xl p-6">
                        <h3 class="text-xl font-bold text-white mb-4">🎯 Expected Output</h3>
                        <div class="bg-white rounded-xl p-4">
                            <form>
                                <label>Username: <input type="text"></label><br>
                                <label>Email: <input type="email"></label><br>
                                <label>Password: <input type="password"></label><br>
                                <label>Age: <input type="number"></label>
                            </form>
                        </div>
                    </div>

                    <div id="output-window-6" class="bg-dark-light/50 rounded-2xl border border-primary/20 p-6 hidden">
                        <h3 class="text-xl font-bold text-white mb-4">📱 Live Output</h3>
                        <div id="output-content-6" class="bg-white rounded-xl p-4 min-h-32">
                            <!-- Output will be displayed here -->
                        </div>
                    </div>
                </div>
            `
        },
        7: {
            title: 'Challenge 3: Form Elements',
            requirements: [
                { id: 'select', text: 'Add a select dropdown', completed: false },
                { id: 'textarea', text: 'Include a textarea', completed: false },
                { id: 'checkbox', text: 'Add checkbox inputs', completed: false },
                { id: 'radio', text: 'Include radio buttons', completed: false }
            ],
            content: `
                <div class="space-y-6">
                    <div class="bg-primary/10 border border-primary/20 rounded-2xl p-6">
                        <h3 class="text-xl font-bold text-white mb-4">📝 Task</h3>
                        <p class="text-gray-300 mb-4">Use advanced form elements like dropdowns, textareas, and buttons.</p>
                        <div class="bg-dark-light rounded-xl p-4">
                            <h4 class="text-primary font-semibold mb-2">Requirements:</h4>
                            <ul id="requirements-list-7" class="text-gray-300 space-y-2 text-sm">
                                <!-- Requirements will be populated here -->
                            </ul>
                        </div>
                    </div>

                    <div class="bg-dark-light/50 rounded-2xl border border-primary/20 p-6">
                        <h3 class="text-xl font-bold text-white mb-4">💻 Code Editor</h3>
                        <div id="monaco-editor-challenge-7" class="w-full h-64 bg-black rounded-xl border border-primary/20"></div>
                        <div class="flex space-x-4 mt-4">
                            <button class="bg-gradient-to-r from-primary to-accent text-white px-6 py-2 rounded-xl font-semibold hover:shadow-lg hover:shadow-primary/25 transition-all duration-300" onclick="runChallenge(7)">
                                <i class="fas fa-play mr-2"></i>Run Code
                            </button>
                            <button class="bg-gray-600 text-white px-6 py-2 rounded-xl font-semibold hover:bg-gray-700 transition-all duration-300" onclick="resetChallenge(7)">
                                <i class="fas fa-undo mr-2"></i>Reset
                            </button>
                        </div>
                    </div>

                    <div class="bg-primary/10 border border-primary/20 rounded-2xl p-6">
                        <h3 class="text-xl font-bold text-white mb-4">🎯 Expected Output</h3>
                        <div class="bg-white rounded-xl p-4">
                            <form>
                                <label>Country: <select><option>USA</option><option>Canada</option></select></label><br>
                                <label>Message: <textarea></textarea></label><br>
                                <label><input type="checkbox"> Subscribe to newsletter</label><br>
                                <label><input type="radio" name="gender"> Male</label>
                                <label><input type="radio" name="gender"> Female</label>
                            </form>
                        </div>
                    </div>

                    <div id="output-window-7" class="bg-dark-light/50 rounded-2xl border border-primary/20 p-6 hidden">
                        <h3 class="text-xl font-bold text-white mb-4">📱 Live Output</h3>
                        <div id="output-content-7" class="bg-white rounded-xl p-4 min-h-32">
                            <!-- Output will be displayed here -->
                        </div>
                    </div>
                </div>
            `
        },
        8: {
            title: 'Challenge 4: Advanced Forms',
            requirements: [
                { id: 'required', text: 'Add required attributes', completed: false },
                { id: 'pattern', text: 'Use pattern validation', completed: false },
                { id: 'placeholder', text: 'Include placeholder text', completed: false },
                { id: 'validation', text: 'Implement form validation', completed: false }
            ],
            content: `
                <div class="space-y-6">
                    <div class="bg-primary/10 border border-primary/20 rounded-2xl p-6">
                        <h3 class="text-xl font-bold text-white mb-4">📝 Task</h3>
                        <p class="text-gray-300 mb-4">Create a form with validation attributes and user experience enhancements.</p>
                        <div class="bg-dark-light rounded-xl p-4">
                            <h4 class="text-primary font-semibold mb-2">Requirements:</h4>
                            <ul id="requirements-list-8" class="text-gray-300 space-y-2 text-sm">
                                <!-- Requirements will be populated here -->
                            </ul>
                        </div>
                    </div>

                    <div class="bg-dark-light/50 rounded-2xl border border-primary/20 p-6">
                        <h3 class="text-xl font-bold text-white mb-4">💻 Code Editor</h3>
                        <div id="monaco-editor-challenge-8" class="w-full h-64 bg-black rounded-xl border border-primary/20"></div>
                        <div class="flex space-x-4 mt-4">
                            <button class="bg-gradient-to-r from-primary to-accent text-white px-6 py-2 rounded-xl font-semibold hover:shadow-lg hover:shadow-primary/25 transition-all duration-300" onclick="runChallenge(8)">
                                <i class="fas fa-play mr-2"></i>Run Code
                            </button>
                            <button class="bg-gray-600 text-white px-6 py-2 rounded-xl font-semibold hover:bg-gray-700 transition-all duration-300" onclick="resetChallenge(8)">
                                <i class="fas fa-undo mr-2"></i>Reset
                            </button>
                        </div>
                    </div>

                    <div class="bg-primary/10 border border-primary/20 rounded-2xl p-6">
                        <h3 class="text-xl font-bold text-white mb-4">🎯 Expected Output</h3>
                        <div class="bg-white rounded-xl p-4">
                            <form>
                                <input type="text" required placeholder="Enter your name" pattern="[A-Za-z ]+"><br>
                                <input type="email" required placeholder="Enter your email"><br>
                                <input type="tel" placeholder="Phone (optional)" pattern="[0-9-+() ]+">
                            </form>
                        </div>
                    </div>

                    <div id="output-window-8" class="bg-dark-light/50 rounded-2xl border border-primary/20 p-6 hidden">
                        <h3 class="text-xl font-bold text-white mb-4">📱 Live Output</h3>
                        <div id="output-content-8" class="bg-white rounded-xl p-4 min-h-32">
                            <!-- Output will be displayed here -->
                        </div>
                    </div>
                </div>
            `
        }
    };

    // Day 3 Challenges (CSS Basics)
    const challengesDay3 = {
        9: {
            title: 'Challenge 1: CSS Introduction',
            requirements: [
                { id: 'css', text: 'Add CSS styling to HTML elements', completed: false },
                { id: 'color', text: 'Apply at least one color property', completed: false },
                { id: 'font', text: 'Modify font properties', completed: false },
                { id: 'basic', text: 'Use basic CSS syntax', completed: false }
            ],
            content: `
                <div class="space-y-6">
                    <div class="bg-primary/10 border border-primary/20 rounded-2xl p-6">
                        <h3 class="text-xl font-bold text-white mb-4">📝 Task</h3>
                        <p class="text-gray-300 mb-4">Learn the basics of CSS and understand how it works with HTML.</p>
                        <div class="bg-dark-light rounded-xl p-4">
                            <h4 class="text-primary font-semibold mb-2">Requirements:</h4>
                            <ul id="requirements-list-9" class="text-gray-300 space-y-2 text-sm">
                                <!-- Requirements will be populated here -->
                            </ul>
                        </div>
                    </div>

                    <div class="bg-dark-light/50 rounded-2xl border border-primary/20 p-6">
                        <h3 class="text-xl font-bold text-white mb-4">💻 Code Editor</h3>
                        <div id="monaco-editor-challenge-9" class="w-full h-64 bg-black rounded-xl border border-primary/20"></div>
                        <div class="flex space-x-4 mt-4">
                            <button class="bg-gradient-to-r from-primary to-accent text-white px-6 py-2 rounded-xl font-semibold hover:shadow-lg hover:shadow-primary/25 transition-all duration-300" onclick="runChallenge(9)">
                                <i class="fas fa-play mr-2"></i>Run Code
                            </button>
                            <button class="bg-gray-600 text-white px-6 py-2 rounded-xl font-semibold hover:bg-gray-700 transition-all duration-300" onclick="resetChallenge(9)">
                                <i class="fas fa-undo mr-2"></i>Reset
                            </button>
                        </div>
                    </div>

                    <div class="bg-primary/10 border border-primary/20 rounded-2xl p-6">
                        <h3 class="text-xl font-bold text-white mb-4">🎯 Expected Output</h3>
                        <div class="bg-white rounded-xl p-4">
                            <h1 style="color: blue; font-size: 24px;">Hello World</h1>
                            <p style="color: red; font-family: Arial;">This is styled text</p>
                        </div>
                    </div>

                    <div id="output-window-9" class="bg-dark-light/50 rounded-2xl border border-primary/20 p-6 hidden">
                        <h3 class="text-xl font-bold text-white mb-4">📱 Live Output</h3>
                        <div id="output-content-9" class="bg-white rounded-xl p-4 min-h-32">
                            <!-- Output will be displayed here -->
                        </div>
                    </div>
                </div>
            `
        },
        10: {
            title: 'Challenge 2: CSS Methods',
            requirements: [
                { id: 'inline', text: 'Use inline CSS with style attribute', completed: false },
                { id: 'internal', text: 'Add internal CSS with style tag', completed: false },
                { id: 'external', text: 'Link to external CSS file', completed: false },
                { id: 'methods', text: 'Demonstrate all three CSS methods', completed: false }
            ],
            content: `
                <div class="space-y-6">
                    <div class="bg-primary/10 border border-primary/20 rounded-2xl p-6">
                        <h3 class="text-xl font-bold text-white mb-4">📝 Task</h3>
                        <p class="text-gray-300 mb-4">Practice inline, internal, and external CSS methods.</p>
                        <div class="bg-dark-light rounded-xl p-4">
                            <h4 class="text-primary font-semibold mb-2">Requirements:</h4>
                            <ul id="requirements-list-10" class="text-gray-300 space-y-2 text-sm">
                                <!-- Requirements will be populated here -->
                            </ul>
                        </div>
                    </div>

                    <div class="bg-dark-light/50 rounded-2xl border border-primary/20 p-6">
                        <h3 class="text-xl font-bold text-white mb-4">💻 Code Editor</h3>
                        <div id="monaco-editor-challenge-10" class="w-full h-64 bg-black rounded-xl border border-primary/20"></div>
                        <div class="flex space-x-4 mt-4">
                            <button class="bg-gradient-to-r from-primary to-accent text-white px-6 py-2 rounded-xl font-semibold hover:shadow-lg hover:shadow-primary/25 transition-all duration-300" onclick="runChallenge(10)">
                                <i class="fas fa-play mr-2"></i>Run Code
                            </button>
                            <button class="bg-gray-600 text-white px-6 py-2 rounded-xl font-semibold hover:bg-gray-700 transition-all duration-300" onclick="resetChallenge(10)">
                                <i class="fas fa-undo mr-2"></i>Reset
                            </button>
                        </div>
                    </div>

                    <div class="bg-primary/10 border border-primary/20 rounded-2xl p-6">
                        <h3 class="text-xl font-bold text-white mb-4">🎯 Expected Output</h3>
                        <div class="bg-white rounded-xl p-4">
                            <h1 style="color: blue;">Inline Styled Heading</h1>
                            <p class="internal-style">Internal CSS Styled Text</p>
                            <div class="external-style">External CSS Styled Div</div>
                        </div>
                    </div>

                    <div id="output-window-10" class="bg-dark-light/50 rounded-2xl border border-primary/20 p-6 hidden">
                        <h3 class="text-xl font-bold text-white mb-4">📱 Live Output</h3>
                        <div id="output-content-10" class="bg-white rounded-xl p-4 min-h-32">
                            <!-- Output will be displayed here -->
                        </div>
                    </div>
                </div>
            `
        },
        11: {
            title: 'Challenge 3: Selectors & Properties',
            requirements: [
                { id: 'tag', text: 'Use tag selectors (e.g., p, h1)', completed: false },
                { id: 'class', text: 'Apply class selectors', completed: false },
                { id: 'id', text: 'Use ID selectors', completed: false },
                { id: 'properties', text: 'Apply multiple CSS properties', completed: false }
            ],
            content: `
                <div class="space-y-6">
                    <div class="bg-primary/10 border border-primary/20 rounded-2xl p-6">
                        <h3 class="text-xl font-bold text-white mb-4">📝 Task</h3>
                        <p class="text-gray-300 mb-4">Master CSS selectors, properties, and values.</p>
                        <div class="bg-dark-light rounded-xl p-4">
                            <h4 class="text-primary font-semibold mb-2">Requirements:</h4>
                            <ul id="requirements-list-11" class="text-gray-300 space-y-2 text-sm">
                                <!-- Requirements will be populated here -->
                            </ul>
                        </div>
                    </div>

                    <div class="bg-dark-light/50 rounded-2xl border border-primary/20 p-6">
                        <h3 class="text-xl font-bold text-white mb-4">💻 Code Editor</h3>
                        <div id="monaco-editor-challenge-11" class="w-full h-64 bg-black rounded-xl border border-primary/20"></div>
                        <div class="flex space-x-4 mt-4">
                            <button class="bg-gradient-to-r from-primary to-accent text-white px-6 py-2 rounded-xl font-semibold hover:shadow-lg hover:shadow-primary/25 transition-all duration-300" onclick="runChallenge(11)">
                                <i class="fas fa-play mr-2"></i>Run Code
                            </button>
                            <button class="bg-gray-600 text-white px-6 py-2 rounded-xl font-semibold hover:bg-gray-700 transition-all duration-300" onclick="resetChallenge(11)">
                                <i class="fas fa-undo mr-2"></i>Reset
                            </button>
                        </div>
                    </div>

                    <div class="bg-primary/10 border border-primary/20 rounded-2xl p-6">
                        <h3 class="text-xl font-bold text-white mb-4">🎯 Expected Output</h3>
                        <div class="bg-white rounded-xl p-4">
                            <h1>Tag Selector Styled</h1>
                            <p class="highlight">Class Selector Styled</p>
                            <div id="unique">ID Selector Styled</div>
                        </div>
                    </div>

                    <div id="output-window-11" class="bg-dark-light/50 rounded-2xl border border-primary/20 p-6 hidden">
                        <h3 class="text-xl font-bold text-white mb-4">📱 Live Output</h3>
                        <div id="output-content-11" class="bg-white rounded-xl p-4 min-h-32">
                            <!-- Output will be displayed here -->
                        </div>
                    </div>
                </div>
            `
        },
        12: {
            title: 'Challenge 4: Styling Essentials',
            requirements: [
                { id: 'colors', text: 'Apply color and background-color', completed: false },
                { id: 'fonts', text: 'Use font-family and font-size', completed: false },
                { id: 'borders', text: 'Add border and border-radius', completed: false },
                { id: 'spacing', text: 'Apply margin and padding', completed: false }
            ],
            content: `
                <div class="space-y-6">
                    <div class="bg-primary/10 border border-primary/20 rounded-2xl p-6">
                        <h3 class="text-xl font-bold text-white mb-4">📝 Task</h3>
                        <p class="text-gray-300 mb-4">Apply colors, fonts, borders, and spacing to create beautiful designs.</p>
                        <div class="bg-dark-light rounded-xl p-4">
                            <h4 class="text-primary font-semibold mb-2">Requirements:</h4>
                            <ul id="requirements-list-12" class="text-gray-300 space-y-2 text-sm">
                                <!-- Requirements will be populated here -->
                            </ul>
                        </div>
                    </div>

                    <div class="bg-dark-light/50 rounded-2xl border border-primary/20 p-6">
                        <h3 class="text-xl font-bold text-white mb-4">💻 Code Editor</h3>
                        <div id="monaco-editor-challenge-12" class="w-full h-64 bg-black rounded-xl border border-primary/20"></div>
                        <div class="flex space-x-4 mt-4">
                            <button class="bg-gradient-to-r from-primary to-accent text-white px-6 py-2 rounded-xl font-semibold hover:shadow-lg hover:shadow-primary/25 transition-all duration-300" onclick="runChallenge(12)">
                                <i class="fas fa-play mr-2"></i>Run Code
                            </button>
                            <button class="bg-gray-600 text-white px-6 py-2 rounded-xl font-semibold hover:bg-gray-700 transition-all duration-300" onclick="resetChallenge(12)">
                                <i class="fas fa-undo mr-2"></i>Reset
                            </button>
                        </div>
                    </div>

                    <div class="bg-primary/10 border border-primary/20 rounded-2xl p-6">
                        <h3 class="text-xl font-bold text-white mb-4">🎯 Expected Output</h3>
                        <div class="bg-white rounded-xl p-4">
                            <div class="styled-box">Beautiful Styled Box</div>
                        </div>
                    </div>

                    <div id="output-window-12" class="bg-dark-light/50 rounded-2xl border border-primary/20 p-6 hidden">
                        <h3 class="text-xl font-bold text-white mb-4">📱 Live Output</h3>
                        <div id="output-content-12" class="bg-white rounded-xl p-4 min-h-32">
                            <!-- Output will be displayed here -->
                        </div>
                    </div>
                </div>
            `
        }
    };
    
    // Check if it's a Day 1, Day 2, or Day 3 challenge
    if (challenges[challengeNumber]) {
        // Day 1 challenge
        title.textContent = challenges[challengeNumber].title;
        content.innerHTML = challenges[challengeNumber].content;
        challengeRequirements = challenges[challengeNumber].requirements;
    } else if (challengesDay2[challengeNumber]) {
        // Day 2 challenge
        title.textContent = challengesDay2[challengeNumber].title;
        content.innerHTML = challengesDay2[challengeNumber].content;
        challengeRequirements = challengesDay2[challengeNumber].requirements;
    } else if (challengesDay3[challengeNumber]) {
        // Day 3 challenge
        title.textContent = challengesDay3[challengeNumber].title;
        content.innerHTML = challengesDay3[challengeNumber].content;
        challengeRequirements = challengesDay3[challengeNumber].requirements;
    }

    if (challenges[challengeNumber] || challengesDay2[challengeNumber] || challengesDay3[challengeNumber]) {
        modal.classList.remove('hidden');

        // Populate requirements list
        populateRequirements(challengeNumber);

        // Initialize Monaco Editor for this challenge
        setTimeout(() => {
            initializeChallengeEditor(challengeNumber);
        }, 100);
    }
}

function populateRequirements(challengeNumber) {
    const requirementsList = document.getElementById(`requirements-list-${challengeNumber}`);
    if (requirementsList && challengeRequirements) {
        requirementsList.innerHTML = challengeRequirements.map(req => `
            <li class="flex items-center space-x-3" data-requirement="${req.id}">
                <span class="text-gray-400">⭕</span>
                <span>${req.text}</span>
            </li>
        `).join('');
    }
}

function closeChallengeModal() {
    const modal = document.getElementById('challengeModal');
    if (modal) {
        modal.classList.add('hidden');
        // Reset requirements
        challengeRequirements = {};
        currentChallenge = 0;
    }
}

function completeChallenge() {
    if (currentChallenge && challengeRequirements) {
        // Check if all requirements are completed
        const allCompleted = challengeRequirements.every(req => req.completed);
        
        if (allCompleted) {
            // Update challenge card to show completed
            const challengeCard = document.querySelector(`[onclick="openChallenge(${currentChallenge})"]`).closest('.bg-gradient-to-br');
            if (challengeCard) {
                challengeCard.classList.add('border-green-500/50', 'bg-green-500/10');
                const button = challengeCard.querySelector('button');
                if (button) {
                    button.innerHTML = '<i class="fas fa-check mr-2"></i>Completed';
                    button.classList.remove('from-primary', 'to-accent');
                    button.classList.add('from-green-500', 'to-green-600');
                    button.onclick = null;
                }
            }
            
            alert('🎉 Challenge completed! Great job!');
            closeChallengeModal();
        } else {
            alert('❌ Please complete all requirements before finishing the challenge!');
        }
    }
}

function runChallenge(challengeNumber) {
    if (monacoEditor) {
        const code = monacoEditor.getValue();
        
        // Show output window
        const outputWindow = document.getElementById(`output-window-${challengeNumber}`);
        const outputContent = document.getElementById(`output-content-${challengeNumber}`);
        
        if (outputWindow && outputContent) {
            outputWindow.classList.remove('hidden');
            
            // Create a safe iframe to run the HTML code
            const iframe = document.createElement('iframe');
            iframe.style.width = '100%';
            iframe.style.height = '200px';
            iframe.style.border = 'none';
            iframe.style.borderRadius = '8px';
            
            // Clear previous content
            outputContent.innerHTML = '';
            outputContent.appendChild(iframe);
            
            // Write the HTML code to the iframe
            const iframeDoc = iframe.contentDocument || iframe.contentWindow.document;
            iframeDoc.open();
            iframeDoc.write(code);
            iframeDoc.close();
            
            // Check requirements after running
            setTimeout(() => {
                checkRequirements(challengeNumber, code);
            }, 100);
        }
    }
}

function resetChallenge(challengeNumber) {
    if (monacoEditor) {
        monacoEditor.setValue(getStarterCode(challengeNumber));
        
        // Hide output window
        const outputWindow = document.getElementById(`output-window-${challengeNumber}`);
        if (outputWindow) {
            outputWindow.classList.add('hidden');
        }
        
        // Reset requirements
        if (challengeRequirements) {
            challengeRequirements.forEach(req => req.completed = false);
            populateRequirements(challengeNumber);
        }
    }
}

function checkRequirements(challengeNumber, code) {
    if (!challengeRequirements) return;
    
    const requirementsList = document.getElementById(`requirements-list-${challengeNumber}`);
    if (!requirementsList) return;
    
    // Check each requirement based on the challenge
    challengeRequirements.forEach(req => {
        let completed = false;
        
        switch (challengeNumber) {
            case 1: // Basic Structure
                switch (req.id) {
                    case 'doctype':
                        completed = code.includes('<!DOCTYPE html>');
                        break;
                    case 'html':
                        completed = code.includes('<html') && code.includes('<head') && code.includes('<body');
                        break;
                    case 'title':
                        completed = code.includes('<title>') && code.includes('</title>');
                        break;
                    case 'h1':
                        completed = code.includes('<h1>') && code.includes('</h1>');
                        break;
                    case 'p':
                        completed = code.includes('<p>') && code.includes('</p>');
                        break;
                }
                break;
                
            case 2: // Content Elements
                switch (req.id) {
                    case 'h1':
                        completed = code.includes('<h1>') && code.includes('</h1>');
                        break;
                    case 'h2':
                        const h2Count = (code.match(/<h2>/g) || []).length;
                        completed = h2Count >= 2;
                        break;
                    case 'p':
                        completed = code.includes('<p>') && code.includes('</p>');
                        break;
                    case 'strong':
                        completed = code.includes('<strong>') && code.includes('<em>');
                        break;
                }
                break;
                
            case 3: // Links & Lists
                switch (req.id) {
                    case 'nav':
                        completed = code.includes('<nav>') && code.includes('</nav>');
                        break;
                    case 'ol':
                        completed = code.includes('<ol>') && code.includes('</ol>');
                        break;
                    case 'ul':
                        completed = code.includes('<ul>') && code.includes('</ul>');
                        break;
                    case 'href':
                        completed = code.includes('href=');
                        break;
                }
                break;
                
            case 4: // Images & Media
                switch (req.id) {
                    case 'img':
                        completed = code.includes('<img') && code.includes('alt=');
                        break;
                    case 'video':
                        completed = code.includes('<video>') || code.includes('<video ');
                        break;
                    case 'audio':
                        completed = code.includes('<audio>') || code.includes('<audio ');
                        break;
                    case 'attributes':
                        completed = code.includes('src=') || code.includes('alt=');
                        break;
                }
                break;

            // Day 2 Challenges (HTML Forms)
            case 5: // Basic Form
                switch (req.id) {
                    case 'form':
                        completed = code.includes('<form') && code.includes('</form>');
                        break;
                    case 'input':
                        completed = code.includes('<input');
                        break;
                    case 'label':
                        completed = code.includes('<label') && code.includes('</label>');
                        break;
                    case 'submit':
                        completed = code.includes('type="submit"') || code.includes('<button');
                        break;
                }
                break;

            case 6: // Input Types
                switch (req.id) {
                    case 'text':
                        completed = code.includes('type="text"');
                        break;
                    case 'email':
                        completed = code.includes('type="email"');
                        break;
                    case 'password':
                        completed = code.includes('type="password"');
                        break;
                    case 'number':
                        completed = code.includes('type="number"');
                        break;
                }
                break;

            case 7: // Form Elements
                switch (req.id) {
                    case 'select':
                        completed = code.includes('<select') && code.includes('</select>');
                        break;
                    case 'textarea':
                        completed = code.includes('<textarea') && code.includes('</textarea>');
                        break;
                    case 'checkbox':
                        completed = code.includes('type="checkbox"');
                        break;
                    case 'radio':
                        completed = code.includes('type="radio"');
                        break;
                }
                break;

            case 8: // Advanced Forms
                switch (req.id) {
                    case 'required':
                        completed = code.includes('required');
                        break;
                    case 'pattern':
                        completed = code.includes('pattern=');
                        break;
                    case 'placeholder':
                        completed = code.includes('placeholder=');
                        break;
                    case 'validation':
                        completed = (code.includes('required') || code.includes('pattern=')) && code.includes('placeholder=');
                        break;
                }
                break;

            // Day 3 Challenges (CSS Basics)
            case 9: // CSS Introduction
                switch (req.id) {
                    case 'css':
                        completed = code.includes('style=') || code.includes('<style>') || code.includes('.css');
                        break;
                    case 'color':
                        completed = code.includes('color:') || code.includes('color=');
                        break;
                    case 'font':
                        completed = code.includes('font-size:') || code.includes('font-family:') || code.includes('font=');
                        break;
                    case 'basic':
                        completed = code.includes('style=') || code.includes('<style>') || code.includes('.css');
                        break;
                }
                break;

            case 10: // CSS Methods
                switch (req.id) {
                    case 'inline':
                        completed = code.includes('style=');
                        break;
                    case 'internal':
                        completed = code.includes('<style>') && code.includes('</style>');
                        break;
                    case 'external':
                        completed = code.includes('<link') && code.includes('.css');
                        break;
                    case 'methods':
                        completed = code.includes('style=') && code.includes('<style>') && code.includes('<link');
                        break;
                }
                break;

            case 11: // Selectors & Properties
                switch (req.id) {
                    case 'tag':
                        completed = code.includes('h1 {') || code.includes('p {') || code.includes('div {');
                        break;
                    case 'class':
                        completed = code.includes('.highlight') || code.includes('class=');
                        break;
                    case 'id':
                        completed = code.includes('#unique') || code.includes('id=');
                        break;
                    case 'properties':
                        completed = (code.includes('color:') || code.includes('background:') || code.includes('font:')) && 
                                  (code.includes('margin:') || code.includes('padding:') || code.includes('border:'));
                        break;
                }
                break;

            case 12: // Styling Essentials
                switch (req.id) {
                    case 'colors':
                        completed = code.includes('color:') && code.includes('background-color:');
                        break;
                    case 'fonts':
                        completed = code.includes('font-family:') && code.includes('font-size:');
                        break;
                    case 'borders':
                        completed = code.includes('border:') && code.includes('border-radius:');
                        break;
                    case 'spacing':
                        completed = code.includes('margin:') && code.includes('padding:');
                        break;
                }
                break;
        }
        
        req.completed = completed;
        
        // Update visual indicator
        const requirementItem = requirementsList.querySelector(`[data-requirement="${req.id}"]`);
        if (requirementItem) {
            const indicator = requirementItem.querySelector('span:first-child');
            if (indicator) {
                if (completed) {
                    indicator.textContent = '✅';
                    indicator.className = 'text-green-400';
                } else {
                    indicator.textContent = '⭕';
                    indicator.className = 'text-gray-400';
                }
            }
        }
    });
}

function initializeChallengeEditor(challengeNumber) {
    console.log('Initializing editor for challenge', challengeNumber);
    
    if (typeof require !== 'undefined') {
        require(['vs/editor/editor.main'], function() {
            const editorContainer = document.getElementById(`monaco-editor-challenge-${challengeNumber}`);
            if (editorContainer) {
                // Destroy previous editor if exists
                if (monacoEditor) {
                    monacoEditor.destroy();
                }
                
                monacoEditor = monaco.editor.create(editorContainer, {
                    value: getStarterCode(challengeNumber),
                    language: 'html',
                    theme: 'vs-dark',
                    automaticLayout: true,
                    minimap: { enabled: false },
                    fontSize: 14,
                    lineNumbers: 'on',
                    roundedSelection: false,
                    scrollBeyondLastLine: false,
                    readOnly: false,
                    cursorStyle: 'line',
                    wordWrap: 'on',
                    suggestOnTriggerCharacters: true,
                    quickSuggestions: true,
                    acceptSuggestionOnEnter: 'on',
                    tabCompletion: 'on',
                    wordBasedSuggestions: true,
                    suggest: {
                        showKeywords: true,
                        showSnippets: true,
                        showClasses: true,
                        showFunctions: true,
                        showVariables: true,
                        showConstants: true,
                        showEnums: true,
                        showEnumsMembers: true,
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
                
                // Add HTML snippets for better autocomplete
                monaco.languages.registerCompletionItemProvider('html', {
                    provideCompletionItems: function(model, position) {
                        const suggestions = [
                            {
                                label: 'h1',
                                kind: monaco.languages.CompletionItemKind.Class,
                                insertText: 'h1',
                                detail: 'Heading 1',
                                documentation: 'Main page heading'
                            },
                            {
                                label: 'h2',
                                kind: monaco.languages.CompletionItemKind.Class,
                                insertText: 'h2',
                                detail: 'Heading 2',
                                documentation: 'Section heading'
                            },
                            {
                                label: 'p',
                                kind: monaco.languages.CompletionItemKind.Class,
                                insertText: 'p',
                                detail: 'Paragraph',
                                documentation: 'Text paragraph'
                            },
                            {
                                label: 'div',
                                kind: monaco.languages.CompletionItemKind.Class,
                                insertText: 'div',
                                detail: 'Division',
                                documentation: 'Content division'
                            },
                            {
                                label: 'img',
                                kind: monaco.languages.CompletionItemKind.Class,
                                insertText: 'img src="" alt=""',
                                detail: 'Image',
                                documentation: 'Image element',
                                insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
                            },
                            {
                                label: 'a',
                                kind: monaco.languages.CompletionItemKind.Class,
                                insertText: 'a href=""',
                                detail: 'Link',
                                documentation: 'Hyperlink',
                                insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
                            }
                        ];
                        return { suggestions: suggestions };
                    }
                });
            }
        });
    }
}

function getStarterCode(challengeNumber) {
    const starterCodes = {
        1: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>My First Web Page</title>
</head>
<body>
    <!-- Add your content here -->
    
</body>
</html>`,
        2: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Text Elements</title>
</head>
<body>
    <!-- Add headings, paragraphs, and formatting here -->
    
</body>
</html>`,
        3: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Links & Lists</title>
</head>
<body>
    <!-- Add navigation, links, and lists here -->
    
</body>
</html>`,
        4: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Images & Media</title>
</head>
<body>
    <!-- Add images, videos, and audio here -->
    
</body>
</html>`
    };

    // Day 2 Challenges (HTML Forms)
    const starterCodesDay2 = {
        5: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Basic Form</title>
</head>
<body>
    <!-- Create a basic form with input fields and labels -->
    
</body>
</html>`,
        6: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Input Types</title>
</head>
<body>
    <!-- Create a form with different input types -->
    
</body>
</html>`,
        7: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Form Elements</title>
</head>
<body>
    <!-- Use advanced form elements like dropdowns and textareas -->
    
</body>
</html>`,
        8: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Advanced Forms</title>
</head>
<body>
    <!-- Create a form with validation attributes -->
    
</body>
</html>`
    };

    // Day 3 Challenges (CSS Basics)
    const starterCodesDay3 = {
        9: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>CSS Introduction</title>
</head>
<body>
    <h1>Hello World</h1>
    <p>This is a paragraph</p>
    
    <!-- Add CSS styling to make this look better -->
    
</body>
</html>`,
        10: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>CSS Methods</title>
</head>
<body>
    <h1>Inline Styled Heading</h1>
    <p>Internal CSS Styled Text</p>
    <div>External CSS Styled Div</div>
    
    <!-- Use all three CSS methods: inline, internal, and external -->
    
</body>
</html>`,
        11: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Selectors & Properties</title>
</head>
<body>
    <h1>Tag Selector Styled</h1>
    <p class="highlight">Class Selector Styled</p>
    <div id="unique">ID Selector Styled</div>
    
    <!-- Use tag, class, and ID selectors with CSS properties -->
    
</body>
</html>`,
        12: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Styling Essentials</title>
</head>
<body>
    <div class="styled-box">Beautiful Styled Box</div>
    
    <!-- Apply colors, fonts, borders, and spacing -->
    
</body>
</html>`
    };
    
    // Return Day 1, Day 2, or Day 3 starter code based on challenge number
    if (starterCodes[challengeNumber]) {
        return starterCodes[challengeNumber];
    } else if (starterCodesDay2[challengeNumber]) {
        return starterCodesDay2[challengeNumber];
    } else if (starterCodesDay3[challengeNumber]) {
        return starterCodesDay3[challengeNumber];
    }

    return '';
}

// Copy code functionality
function copyCode(button) {
    const codeBlock = button.closest('.bg-dark-light\\/50').querySelector('code');
    if (codeBlock) {
        const textArea = document.createElement('textarea');
        textArea.value = codeBlock.textContent;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);

        // Show feedback
        const originalText = button.innerHTML;
        button.innerHTML = '<i class="fas fa-check"></i>';
        button.classList.add('text-primary');

        setTimeout(() => {
            button.innerHTML = originalText;
            button.classList.remove('text-primary');
        }, 2000);
    }
}

// Page initialization
function initializePage() {
    // Initialize Monaco Editor
    initializeMonacoEditor();
    
    console.log('WebDev LMS Day 1 page initialized successfully');
}

// Initialize when DOM is loaded
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializePage);
} else {
    initializePage();
}
