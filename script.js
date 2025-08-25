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
            title: "CSS Introduction",
            requirements: [
                { id: 'css', text: 'Use CSS styling (inline, internal, or external)' },
                { id: 'color', text: 'Apply colors to text or background' },
                { id: 'font', text: 'Change font size or font family' },
                { id: 'basic', text: 'Create a basic styled page' }
            ],
            content: `
                <div class="space-y-6">
                    <div class="bg-primary/10 border border-primary/20 rounded-2xl p-6">
                        <h3 class="text-xl font-bold text-primary mb-4">🎯 Challenge: CSS Introduction</h3>
                        <p class="text-gray-300 mb-4">Create a simple HTML page and style it with CSS to make it look attractive.</p>
                        
                        <div class="bg-dark-light/50 rounded-xl p-4 mb-4">
                            <h4 class="text-primary font-semibold mb-3">📋 Requirements:</h4>
                            <ul id="requirements-list-9" class="space-y-2 text-gray-300">
                                <li data-requirement="css"><span class="text-gray-400">⭕</span> Use CSS styling (inline, internal, or external)</li>
                                <li data-requirement="color"><span class="text-gray-400">⭕</span> Apply colors to text or background</li>
                                <li data-requirement="font"><span class="text-gray-400">⭕</span> Change font size or font family</li>
                                <li data-requirement="basic"><span class="text-gray-400">⭕</span> Create a basic styled page</li>
                            </ul>
                        </div>
                    </div>
                    
                    <div class="bg-dark-light/50 rounded-2xl p-6 border border-primary/20">
                        <h4 class="text-primary font-semibold mb-3">💡 Tips:</h4>
                        <ul class="text-gray-300 space-y-2 text-sm">
                            <li>• Use <code class="bg-black px-2 py-1 rounded text-green-400">style="color: blue;"</code> for inline CSS</li>
                            <li>• Use <code class="bg-black px-2 py-1 rounded text-green-400">&lt;style&gt;</code> tags for internal CSS</li>
                            <li>• Use <code class="bg-black px-2 py-1 rounded text-green-400">&lt;link&gt;</code> for external CSS</li>
                            <li>• Try different colors like red, blue, green, purple</li>
                            <li>• Experiment with font sizes like 16px, 24px, 32px</li>
                        </ul>
                    </div>
                    
                    <div class="bg-black rounded-xl p-4">
                        <h4 class="text-primary font-semibold mb-3">📝 Starter Code:</h4>
                        <div class="flex justify-between items-center mb-3">
                            <span class="text-white font-medium">HTML with CSS</span>
                            <button class="bg-primary text-white px-4 py-2 rounded-lg hover:bg-accent transition-colors duration-200" onclick="resetChallenge(9)">
                                <i class="fas fa-undo mr-2"></i>Reset
                            </button>
                        </div>
                        <div id="editor-9" class="h-64"></div>
                    </div>
                    
                    <div class="bg-dark-light/50 rounded-2xl p-6 border border-primary/20">
                        <h4 class="text-primary font-semibold mb-3">🎨 Example Result:</h4>
                        <div class="bg-white rounded-xl p-6 text-gray-800">
                            <h1 style="color: #01d29b; font-size: 32px; font-family: Arial, sans-serif;">Welcome to My Website</h1>
                            <p style="color: #333; font-size: 18px; background-color: #f0f0f0; padding: 15px; border-radius: 8px;">This is a styled paragraph with custom colors and fonts!</p>
                        </div>
                    </div>
                </div>
            `
        },
        10: {
            title: "CSS Methods",
            requirements: [
                { id: 'inline', text: 'Use inline CSS with style attribute' },
                { id: 'internal', text: 'Use internal CSS with style tags' },
                { id: 'external', text: 'Use external CSS with link tag' },
                { id: 'methods', text: 'Combine at least two CSS methods' }
            ],
            content: `
                <div class="space-y-6">
                    <div class="bg-primary/10 border border-primary/20 rounded-2xl p-6">
                        <h3 class="text-xl font-bold text-primary mb-4">🎯 Challenge: CSS Methods</h3>
                        <p class="text-gray-300 mb-4">Practice all three methods of applying CSS: inline, internal, and external.</p>
                        
                        <div class="bg-dark-light/50 rounded-xl p-4 mb-4">
                            <h4 class="text-primary font-semibold mb-3">📋 Requirements:</h4>
                            <ul id="requirements-list-10" class="space-y-2 text-gray-300">
                                <li data-requirement="inline"><span class="text-gray-400">⭕</span> Use inline CSS with style attribute</li>
                                <li data-requirement="internal"><span class="text-gray-400">⭕</span> Use internal CSS with style tags</li>
                                <li data-requirement="external"><span class="text-gray-400">⭕</span> Use external CSS with link tag</li>
                                <li data-requirement="methods"><span class="text-gray-400">⭕</span> Combine at least two CSS methods</li>
                            </ul>
                        </div>
                    </div>
                    
                    <div class="bg-dark-light/50 rounded-2xl p-6 border border-primary/20">
                        <h4 class="text-primary font-semibold mb-3">🔄 Flex Direction Values:</h4>
                        <ul class="text-gray-300 space-y-2 text-sm">
                            <li>• <code class="bg-black px-2 py-1 rounded text-green-400">flex-direction: row</code> - Items flow left to right</li>
                            <li>• <code class="bg-black px-2 py-1 rounded text-green-400">flex-direction: column</code> - Items flow top to bottom</li>
                            <li>• <code class="bg-black px-2 py-1 rounded text-green-400">flex-direction: row-reverse</code> - Items flow right to left</li>
                            <li>• <code class="bg-black px-2 py-1 rounded text-green-400">flex-direction: column-reverse</code> - Items flow bottom to top</li>
                        </ul>
                    </div>
                    
                    <div class="bg-black rounded-xl p-4">
                        <h4 class="text-primary font-semibold mb-3">📝 Starter Code:</h4>
                        <div class="flex justify-between items-center mb-3">
                            <span class="text-white font-medium">HTML with Multiple CSS Methods</span>
                            <button class="bg-primary text-white px-4 py-2 rounded-lg hover:bg-accent transition-colors duration-200" onclick="resetChallenge(10)">
                                <i class="fas fa-undo mr-2"></i>Reset
                            </button>
                        </div>
                        <div id="editor-10" class="h-64"></div>
                    </div>
                    
                    <div class="bg-dark-light/50 rounded-2xl p-6 border border-primary/20">
                        <h4 class="text-primary font-semibold mb-3">🎨 Example Layouts:</h4>
                        <div class="space-y-4">
                            <div class="bg-white rounded-xl p-4 text-gray-800">
                                <h5 class="font-semibold mb-2">Row Layout:</h5>
                                <div style="display: flex; flex-direction: row; gap: 15px; background-color: #f0f0f0; padding: 15px; border-radius: 6px;">
                                    <div style="background-color: #01d29b; color: white; padding: 10px; border-radius: 4px;">1</div>
                                    <div style="background-color: #00b894; color: white; padding: 10px; border-radius: 4px;">2</div>
                                    <div style="background-color: #01d29b; color: white; padding: 10px; border-radius: 4px;">3</div>
                                </div>
                            </div>
                            <div class="bg-white rounded-xl p-4 text-gray-800">
                                <h5 class="font-semibold mb-2">Column Layout:</h5>
                                <div style="display: flex; flex-direction: column; gap: 10px; background-color: #f0f0f0; padding: 15px; border-radius: 6px;">
                                    <div style="background-color: #01d29b; color: white; padding: 10px; border-radius: 4px;">1</div>
                                    <div style="background-color: #00b894; color: white; padding: 10px; border-radius: 4px;">2</div>
                                    <div style="background-color: #01d29b; color: white; padding: 10px; border-radius: 4px;">3</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            `
        },
        11: {
            title: "Selectors & Properties",
            requirements: [
                { id: 'tag', text: 'Use tag selectors (h1, p, div)' },
                { id: 'class', text: 'Use class selectors with dot notation' },
                { id: 'id', text: 'Use ID selectors with hash notation' },
                { id: 'properties', text: 'Apply at least 2 CSS properties' }
            ],
            content: `
                <div class="space-y-6">
                    <div class="bg-primary/10 border border-primary/20 rounded-2xl p-6">
                        <h3 class="text-xl font-bold text-primary mb-4">🎯 Challenge: Selectors & Properties</h3>
                        <p class="text-gray-300 mb-4">Master CSS selectors and apply various properties to style your elements.</p>
                        
                        <div class="bg-dark-light/50 rounded-xl p-4 mb-4">
                            <h4 class="text-primary font-semibold mb-3">📋 Requirements:</h4>
                            <ul id="requirements-list-11" class="space-y-2 text-gray-300">
                                <li data-requirement="tag"><span class="text-gray-400">⭕</span> Use tag selectors (h1, p, div)</li>
                                <li data-requirement="class"><span class="text-gray-400">⭕</span> Use class selectors with dot notation</li>
                                <li data-requirement="id"><span class="text-gray-400">⭕</span> Use ID selectors with hash notation</li>
                                <li data-requirement="properties"><span class="text-gray-400">⭕</span> Apply at least 2 CSS properties</li>
                            </ul>
                        </div>
                    </div>
                    
                    <div class="bg-dark-light/50 rounded-2xl p-6 border border-primary/20">
                        <h4 class="text-primary font-semibold mb-3">🎯 Selector Types:</h4>
                        <ul class="text-gray-300 space-y-2 text-sm">
                            <li>• <strong>Tag:</strong> <code class="bg-black px-2 py-1 rounded text-green-400">h1 { color: red; }</code></li>
                            <li>• <strong>Class:</strong> <code class="bg-black px-2 py-1 rounded text-green-400">.highlight { background: yellow; }</code></li>
                            <li>• <strong>ID:</strong> <code class="bg-black px-2 py-1 rounded text-green-400">#unique { border: 2px solid blue; }</code></li>
                            <li>• <strong>Properties:</strong> color, background-color, font-size, margin, padding, border</li>
                        </ul>
                    </div>
                    
                    <div class="bg-black rounded-xl p-4">
                        <h4 class="text-primary font-semibold mb-3">📝 Starter Code:</h4>
                        <div class="flex justify-between items-center mb-3">
                            <span class="text-white font-medium">HTML with CSS Selectors</span>
                            <button class="bg-primary text-white px-4 py-2 rounded-lg hover:bg-accent transition-colors duration-200" onclick="resetChallenge(11)">
                                <i class="fas fa-undo mr-2"></i>Reset
                            </button>
                        </div>
                        <div id="editor-11" class="h-64"></div>
                    </div>
                    
                    <div class="bg-dark-light/50 rounded-2xl p-6 border border-primary/20">
                        <h4 class="text-primary font-semibold mb-3">💡 Example Structure:</h4>
                        <div class="bg-black rounded-xl p-4">
                            <code class="text-green-400 text-sm">
&lt;h1&gt;Tag Selector Styled&lt;/h1&gt;<br>
&lt;p class="highlight"&gt;Class Selector Styled&lt;/p&gt;<br>
&lt;div id="unique"&gt;ID Selector Styled&lt;/div&gt;<br>
<br>
&lt;style&gt;<br>
h1 { color: red; }<br>
.highlight { background: yellow; }<br>
#unique { border: 2px solid blue; }<br>
&lt;/style&gt;
                            </code>
                        </div>
                    </div>
                </div>
            `
        },
        12: {
            title: "Styling Essentials",
            requirements: [
                { id: 'colors', text: 'Apply colors to text or background' },
                { id: 'fonts', text: 'Change font properties' },
                { id: 'borders', text: 'Add borders or border-radius' },
                { id: 'spacing', text: 'Use margin or padding for spacing' }
            ],
            content: `
                <div class="space-y-6">
                    <div class="bg-primary/10 border border-primary/20 rounded-2xl p-6">
                        <h3 class="text-xl font-bold text-primary mb-4">🎯 Challenge: Styling Essentials</h3>
                        <p class="text-gray-300 mb-4">Apply fundamental CSS properties to create a beautifully styled page.</p>
                        
                        <div class="bg-dark-light/50 rounded-xl p-4 mb-4">
                            <h4 class="text-primary font-semibold mb-3">📋 Requirements:</h4>
                            <ul id="requirements-list-12" class="space-y-2 text-gray-300">
                                <li data-requirement="colors"><span class="text-gray-400">⭕</span> Apply colors to text or background</li>
                                <li data-requirement="fonts"><span class="text-gray-400">⭕</span> Change font properties</li>
                                <li data-requirement="borders"><span class="text-gray-400">⭕</span> Add borders or border-radius</li>
                                <li data-requirement="spacing"><span class="text-gray-400">⭕</span> Use margin or padding for spacing</li>
                            </ul>
                        </div>
                    </div>
                    
                    <div class="bg-dark-light/50 rounded-2xl p-6 border border-primary/20">
                        <h4 class="text-primary font-semibold mb-3">🎨 Essential Properties:</h4>
                        <ul class="text-gray-300 space-y-2 text-sm">
                            <li>• <strong>Colors:</strong> <code class="bg-black px-2 py-1 rounded text-green-400">color: #333;</code>, <code class="bg-black px-2 py-1 rounded text-green-400">background-color: #f0f0f0;</code></li>
                            <li>• <strong>Fonts:</strong> <code class="bg-black px-2 py-1 rounded text-green-400">font-family: Arial;</code>, <code class="bg-black px-2 py-1 rounded text-green-400">font-size: 18px;</code></li>
                            <li>• <strong>Borders:</strong> <code class="bg-black px-2 py-1 rounded text-green-400">border: 2px solid blue;</code>, <code class="bg-black px-2 py-1 rounded text-green-400">border-radius: 8px;</code></li>
                            <li>• <strong>Spacing:</strong> <code class="bg-black px-2 py-1 rounded text-green-400">margin: 20px;</code>, <code class="bg-black px-2 py-1 rounded text-green-400">padding: 15px;</code></li>
                        </ul>
                    </div>
                    
                    <div class="bg-black rounded-xl p-4">
                        <h4 class="text-primary font-semibold mb-3">📝 Starter Code:</h4>
                        <div class="flex justify-between items-center mb-3">
                            <span class="text-white font-medium">HTML with CSS Styling</span>
                            <button class="bg-primary text-white px-4 py-2 rounded-lg hover:bg-accent transition-colors duration-200" onclick="resetChallenge(12)">
                                <i class="fas fa-undo mr-2"></i>Reset
                            </button>
                        </div>
                        <div id="editor-12" class="h-64"></div>
                    </div>
                    
                    <div class="bg-dark-light/50 rounded-2xl p-6 border border-primary/20">
                        <h4 class="text-primary font-semibold mb-3">🎨 Example Result:</h4>
                        <div class="bg-white rounded-xl p-6 text-gray-800">
                            <h1 style="color: #01d29b; font-family: 'Arial', sans-serif; font-size: 28px; margin-bottom: 20px;">Beautiful Heading</h1>
                            <div style="background-color: #f8f9fa; border: 2px solid #01d29b; border-radius: 12px; padding: 20px; margin: 15px 0;">
                                <p style="color: #333; font-size: 16px; line-height: 1.6;">This is a styled box with borders, background, and proper spacing!</p>
                            </div>
                        </div>
                    </div>
                </div>
            `
        }
    };

    // Day 4 Challenges (CSS Layout & Flexbox)
    const challengesDay4 = {
        13: {
            title: "Basic Flexbox",
            requirements: [
                { id: 'display', text: 'Use display: flex on container' },
                { id: 'justify', text: 'Use justify-content property' },
                { id: 'align', text: 'Use align-items property' },
                { id: 'items', text: 'Have at least 3 flex items' }
            ],
            content: `
                <div class="space-y-6">
                    <div class="bg-primary/10 border border-primary/20 rounded-2xl p-6">
                        <h3 class="text-xl font-bold text-primary mb-4">🎯 Challenge: Basic Flexbox</h3>
                        <p class="text-gray-300 mb-4">Create a simple flexbox layout with basic alignment properties.</p>
                        
                        <div class="bg-dark-light/50 rounded-xl p-4 mb-4">
                            <h4 class="text-primary font-semibold mb-3">📋 Requirements:</h4>
                            <ul id="requirements-list-13" class="space-y-2 text-gray-300">
                                <li data-requirement="display"><span class="text-gray-400">⭕</span> Use display: flex on container</li>
                                <li data-requirement="justify"><span class="text-gray-400">⭕</span> Use justify-content property</li>
                                <li data-requirement="align"><span class="text-gray-400">⭕</span> Use align-items property</li>
                                <li data-requirement="items"><span class="text-gray-400">⭕</span> Have at least 3 flex items</li>
                            </ul>
                        </div>
                    </div>
                    
                    <div class="bg-dark-light/50 rounded-2xl p-6 border border-primary/20">
                        <h4 class="text-primary font-semibold mb-3">💡 Flexbox Basics:</h4>
                        <ul class="text-gray-300 space-y-2 text-sm">
                            <li>• <code class="bg-black px-2 py-1 rounded text-green-400">display: flex</code> - Creates flex container</li>
                            <li>• <code class="bg-black px-2 py-1 rounded text-green-400">justify-content: center</code> - Centers items horizontally</li>
                            <li>• <code class="bg-black px-2 py-1 rounded text-green-400">align-items: center</code> - Centers items vertically</li>
                            <li>• <code class="bg-black px-2 py-1 rounded text-green-400">gap: 20px</code> - Adds space between items</li>
                        </ul>
                    </div>
                    
                    <div class="bg-black rounded-xl p-4">
                        <h4 class="text-primary font-semibold mb-3">📝 Starter Code:</h4>
                        <div class="flex justify-between items-center mb-3">
                            <span class="text-white font-medium">HTML with Flexbox</span>
                            <button class="bg-primary text-white px-4 py-2 rounded-lg hover:bg-accent transition-colors duration-200" onclick="resetChallenge(13)">
                                <i class="fas fa-undo mr-2"></i>Reset
                            </button>
                        </div>
                        <div id="editor-13" class="h-64"></div>
                    </div>
                    
                    <div class="bg-dark-light/50 rounded-2xl p-6 border border-primary/20">
                        <h4 class="text-primary font-semibold mb-3">🎨 Example Result:</h4>
                        <div class="bg-white rounded-xl p-6 text-gray-800">
                            <div style="display: flex; justify-content: center; align-items: center; gap: 20px; background-color: #f0f0f0; padding: 20px; border-radius: 8px;">
                                <div style="background-color: #01d29b; color: white; padding: 15px; border-radius: 6px;">Item 1</div>
                                <div style="background-color: #00b894; color: white; padding: 15px; border-radius: 6px;">Item 2</div>
                                <div style="background-color: #01d29b; color: white; padding: 15px; border-radius: 6px;">Item 3</div>
                            </div>
                        </div>
                    </div>
                </div>
            `
        },
        14: {
            title: "Flex Direction",
            requirements: [
                { id: 'row', text: 'Create a row layout (horizontal)' },
                { id: 'column', text: 'Create a column layout (vertical)' },
                { id: 'direction', text: 'Use flex-direction property' },
                { id: 'responsive', text: 'Make layout responsive' }
            ],
            content: `
                <div class="space-y-6">
                    <div class="bg-primary/10 border border-primary/20 rounded-2xl p-6">
                        <h3 class="text-xl font-bold text-primary mb-4">🎯 Challenge: Flex Direction</h3>
                        <p class="text-gray-300 mb-4">Master flex-direction and create both row and column layouts.</p>
                        
                        <div class="bg-dark-light/50 rounded-xl p-4 mb-4">
                            <h4 class="text-primary font-semibold mb-3">📋 Requirements:</h4>
                            <ul id="requirements-list-14" class="space-y-2 text-gray-300">
                                <li data-requirement="row"><span class="text-gray-400">⭕</span> Create a row layout (horizontal)</li>
                                <li data-requirement="column"><span class="text-gray-400">⭕</span> Create a column layout (vertical)</li>
                                <li data-requirement="direction"><span class="text-gray-400">⭕</span> Use flex-direction property</li>
                                <li data-requirement="responsive"><span class="text-gray-400">⭕</span> Make layout responsive</li>
                            </ul>
                        </div>
                    </div>
                    
                    <div class="bg-dark-light/50 rounded-2xl p-6 border border-primary/20">
                        <h4 class="text-primary font-semibold mb-3">🔄 Flex Direction Values:</h4>
                        <ul class="text-gray-300 space-y-2 text-sm">
                            <li>• <code class="bg-black px-2 py-1 rounded text-green-400">flex-direction: row</code> - Items flow left to right</li>
                            <li>• <code class="bg-black px-2 py-1 rounded text-green-400">flex-direction: column</code> - Items flow top to bottom</li>
                            <li>• <code class="bg-black px-2 py-1 rounded text-green-400">flex-direction: row-reverse</code> - Items flow right to left</li>
                            <li>• <code class="bg-black px-2 py-1 rounded text-green-400">flex-direction: column-reverse</code> - Items flow bottom to top</li>
                        </ul>
                    </div>
                    
                    <div class="bg-black rounded-xl p-4">
                        <h4 class="text-primary font-semibold mb-3">📝 Starter Code:</h4>
                        <div class="flex justify-between items-center mb-3">
                            <span class="text-white font-medium">HTML with Flex Direction</span>
                            <button class="bg-primary text-white px-4 py-2 rounded-lg hover:bg-accent transition-colors duration-200" onclick="resetChallenge(14)">
                                <i class="fas fa-undo mr-2"></i>Reset
                            </button>
                        </div>
                        <div id="editor-14" class="h-64"></div>
                    </div>
                    
                    <div class="bg-dark-light/50 rounded-2xl p-6 border border-primary/20">
                        <h4 class="text-primary font-semibold mb-3">🎨 Example Layouts:</h4>
                        <div class="space-y-4">
                            <div class="bg-white rounded-xl p-4 text-gray-800">
                                <h5 class="font-semibold mb-2">Row Layout:</h5>
                                <div style="display: flex; flex-direction: row; gap: 15px; background-color: #f0f0f0; padding: 15px; border-radius: 6px;">
                                    <div style="background-color: #01d29b; color: white; padding: 10px; border-radius: 4px;">1</div>
                                    <div style="background-color: #00b894; color: white; padding: 10px; border-radius: 4px;">2</div>
                                    <div style="background-color: #01d29b; color: white; padding: 10px; border-radius: 4px;">3</div>
                                </div>
                            </div>
                            <div class="bg-white rounded-xl p-4 text-gray-800">
                                <h5 class="font-semibold mb-2">Column Layout:</h5>
                                <div style="display: flex; flex-direction: column; gap: 10px; background-color: #f0f0f0; padding: 15px; border-radius: 6px;">
                                    <div style="background-color: #01d29b; color: white; padding: 10px; border-radius: 4px;">1</div>
                                    <div style="background-color: #00b894; color: white; padding: 10px; border-radius: 4px;">2</div>
                                    <div style="background-color: #01d29b; color: white; padding: 10px; border-radius: 4px;">3</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            `
        },
        15: {
            title: "Flex Properties",
            requirements: [
                { id: 'grow', text: 'Use flex-grow property' },
                { id: 'shrink', text: 'Use flex-shrink property' },
                { id: 'basis', text: 'Use flex-basis property' },
                { id: 'shorthand', text: 'Use flex shorthand property' }
            ],
            content: `
                <div class="space-y-6">
                    <div class="bg-primary/10 border border-primary/20 rounded-2xl p-6">
                        <h3 class="text-xl font-bold text-primary mb-4">🎯 Challenge: Flex Properties</h3>
                        <p class="text-gray-300 mb-4">Use flex-grow, flex-shrink, and flex-basis for dynamic sizing.</p>
                        
                        <div class="bg-dark-light/50 rounded-xl p-4 mb-4">
                            <h4 class="text-primary font-semibold mb-3">📋 Requirements:</h4>
                            <ul id="requirements-list-15" class="space-y-2 text-gray-300">
                                <li data-requirement="grow"><span class="text-gray-400">⭕</span> Use flex-grow property</li>
                                <li data-requirement="shrink"><span class="text-gray-400">⭕</span> Use flex-shrink property</li>
                                <li data-requirement="basis"><span class="text-gray-400">⭕</span> Use flex-basis property</li>
                                <li data-requirement="shorthand"><span class="text-gray-400">⭕</span> Use flex shorthand property</li>
                            </ul>
                        </div>
                    </div>
                    
                    <div class="bg-dark-light/50 rounded-2xl p-6 border border-primary/20">
                        <h4 class="text-primary font-semibold mb-3">🔧 Flex Properties:</h4>
                        <ul class="text-gray-300 space-y-2 text-sm">
                            <li>• <code class="bg-black px-2 py-1 rounded text-green-400">flex-grow: 1</code> - Item grows to fill space</li>
                            <li>• <code class="bg-black px-2 py-1 rounded text-green-400">flex-shrink: 0</code> - Item doesn't shrink</li>
                            <li>• <code class="bg-black px-2 py-1 rounded text-green-400">flex-basis: 200px</code> - Initial size of item</li>
                            <li>• <code class="bg-black px-2 py-1 rounded text-green-400">flex: 1 0 auto</code> - Shorthand for grow:1, shrink:0, basis:auto</li>
                        </ul>
                    </div>
                    
                    <div class="bg-black rounded-xl p-4">
                        <h4 class="text-primary font-semibold mb-3">📝 Starter Code:</h4>
                        <div class="flex justify-between items-center mb-3">
                            <span class="text-white font-medium">HTML with Flex Properties</span>
                            <button class="bg-primary text-white px-4 py-2 rounded-lg hover:bg-accent transition-colors duration-200" onclick="resetChallenge(15)">
                                <i class="fas fa-undo mr-2"></i>Reset
                            </button>
                        </div>
                        <div id="editor-15" class="h-64"></div>
                    </div>
                    
                    <div class="bg-dark-light/50 rounded-2xl p-6 border border-primary/20">
                        <h4 class="text-primary font-semibold mb-3">🎨 Example with Flex Properties:</h4>
                        <div class="bg-white rounded-xl p-4 text-gray-800">
                            <div style="display: flex; gap: 10px; background-color: #f0f0f0; padding: 15px; border-radius: 6px;">
                                <div style="flex: 1; background-color: #01d29b; color: white; padding: 15px; border-radius: 4px; text-align: center;">Flex: 1 (Grows)</div>
                                <div style="flex: 2; background-color: #00b894; color: white; padding: 15px; border-radius: 4px; text-align: center;">Flex: 2 (Grows 2x)</div>
                                <div style="flex: 0 0 100px; background-color: #01d29b; color: white; padding: 15px; border-radius: 4px; text-align: center;">Fixed: 100px</div>
                            </div>
                        </div>
                    </div>
                </div>
            `
        },
        16: {
            title: "Complex Layouts",
            requirements: [
                { id: 'navigation', text: 'Create a navigation bar' },
                { id: 'grid', text: 'Create a card grid layout' },
                { id: 'responsive', text: 'Make layout responsive' },
                { id: 'advanced', text: 'Use advanced flexbox properties' }
            ],
            content: `
                <div class="space-y-6">
                    <div class="bg-primary/10 border border-primary/20 rounded-2xl p-6">
                        <h3 class="text-xl font-bold text-primary mb-4">🎯 Challenge: Complex Layouts</h3>
                        <p class="text-gray-300 mb-4">Build a responsive navigation and card grid using flexbox.</p>
                        
                        <div class="bg-dark-light/50 rounded-xl p-4 mb-4">
                            <h4 class="text-primary font-semibold mb-3">📋 Requirements:</h4>
                            <ul id="requirements-list-16" class="space-y-2 text-gray-300">
                                <li data-requirement="navigation"><span class="text-gray-400">⭕</span> Create a navigation bar</li>
                                <li data-requirement="grid"><span class="text-gray-400">⭕</span> Create a card grid layout</li>
                                <li data-requirement="responsive"><span class="text-gray-400">⭕</span> Make layout responsive</li>
                                <li data-requirement="advanced"><span class="text-gray-400">⭕</span> Use advanced flexbox properties</li>
                            </ul>
                        </div>
                    </div>
                    
                    <div class="bg-dark-light/50 rounded-2xl p-6 border border-primary/20">
                        <h4 class="text-primary font-semibold mb-3">🏗️ Layout Components:</h4>
                        <ul class="text-gray-300 space-y-2 text-sm">
                            <li>• <strong>Navigation:</strong> Use <code class="bg-black px-2 py-1 rounded text-green-400">justify-content: space-between</code></li>
                            <li>• <strong>Card Grid:</strong> Use <code class="bg-black px-2 py-1 rounded text-green-400">flex-wrap: wrap</code> and <code class="bg-black px-2 py-1 rounded text-green-400">gap</code></li>
                            <li>• <strong>Responsive:</strong> Use <code class="bg-black px-2 py-1 rounded text-green-400">flex-direction: column</code> on mobile</li>
                            <li>• <strong>Advanced:</strong> Use <code class="bg-black px-2 py-1 rounded text-green-400">flex: 1</code> for equal widths</li>
                        </ul>
                    </div>
                    
                    <div class="bg-black rounded-xl p-4">
                        <h4 class="text-primary font-semibold mb-3">📝 Starter Code:</h4>
                        <div class="flex justify-between items-center mb-3">
                            <span class="text-white font-medium">HTML with Complex Flexbox Layout</span>
                            <button class="bg-primary text-white px-4 py-2 rounded-lg hover:bg-accent transition-colors duration-200" onclick="resetChallenge(16)">
                                <i class="fas fa-undo mr-2"></i>Reset
                            </button>
                        </div>
                        <div id="editor-16" class="h-64"></div>
                    </div>
                    
                    <div class="bg-dark-light/50 rounded-2xl p-6 border border-primary/20">
                        <h4 class="text-primary font-semibold mb-3">🎨 Example Complex Layout:</h4>
                        <div class="bg-white rounded-xl p-4 text-gray-800 space-y-4">
                            <nav style="display: flex; justify-content: space-between; align-items: center; background-color: #333; color: white; padding: 15px; border-radius: 6px;">
                                <div style="font-weight: bold; font-size: 18px;">Logo</div>
                                <div style="display: flex; gap: 20px;">
                                    <a href="#" style="color: white; text-decoration: none;">Home</a>
                                    <a href="#" style="color: white; text-decoration: none;">About</a>
                                    <a href="#" style="color: white; text-decoration: none;">Contact</a>
                                </div>
                            </nav>
                            <div style="display: flex; flex-wrap: wrap; gap: 15px; justify-content: center;">
                                <div style="flex: 1; min-width: 200px; background-color: #f0f0f0; padding: 20px; border-radius: 6px; text-align: center;">Card 1</div>
                                <div style="flex: 1; min-width: 200px; background-color: #f0f0f0; padding: 20px; border-radius: 6px; text-align: center;">Card 2</div>
                                <div style="flex: 1; min-width: 200px; background-color: #f0f0f0; padding: 20px; border-radius: 6px; text-align: center;">Card 3</div>
                            </div>
                        </div>
                    </div>
                </div>
            `
        }
    };

    // Check if it's a Day 1, Day 2, Day 3, or Day 4 challenge
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
    } else if (challengesDay4[challengeNumber]) {
        // Day 4 challenge
        title.textContent = challengesDay4[challengeNumber].title;
        content.innerHTML = challengesDay4[challengeNumber].content;
        challengeRequirements = challengesDay4[challengeNumber].requirements;
    }

    if (challenges[challengeNumber] || challengesDay2[challengeNumber] || challengesDay3[challengeNumber] || challengesDay4[challengeNumber]) {
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
                        completed = code.includes('<form>') && code.includes('</form>');
                        break;
                    case 'input':
                        completed = code.includes('<input');
                        break;
                    case 'label':
                        completed = code.includes('<label>') && code.includes('</label>');
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
                        completed = code.includes('<select>') && code.includes('</select>');
                        break;
                    case 'textarea':
                        completed = code.includes('<textarea>') && code.includes('</textarea>');
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
                        completed = code.includes('required') || code.includes('pattern=');
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
                        completed = code.includes('color:') || code.includes('background-color:');
                        break;
                    case 'font':
                        completed = code.includes('font-size:') || code.includes('font-family:');
                        break;
                    case 'basic':
                        completed = code.includes('style=') || code.includes('<style>');
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
                        completed = (code.includes('style=') || code.includes('<style>')) && 
                                  (code.includes('<link') || code.includes('style='));
                        break;
                }
                break;

            case 11: // Selectors & Properties
                switch (req.id) {
                    case 'tag':
                        completed = code.includes('h1 {') || code.includes('p {') || code.includes('div {');
                        break;
                    case 'class':
                        completed = code.includes('.') && code.includes('{');
                        break;
                    case 'id':
                        completed = code.includes('#') && code.includes('{');
                        break;
                    case 'properties':
                        const propertyCount = (code.match(/:/g) || []).length;
                        completed = propertyCount >= 2;
                        break;
                }
                break;

            case 12: // Styling Essentials
                switch (req.id) {
                    case 'colors':
                        completed = code.includes('color:') || code.includes('background-color:');
                        break;
                    case 'fonts':
                        completed = code.includes('font-family:') || code.includes('font-size:');
                        break;
                    case 'borders':
                        completed = code.includes('border:') || code.includes('border-radius:');
                        break;
                    case 'spacing':
                        completed = code.includes('margin:') || code.includes('padding:');
                        break;
                }
                break;

            // Day 4 Challenges (CSS Layout & Flexbox)
            case 13: // Basic Flexbox
                switch (req.id) {
                    case 'display':
                        completed = code.includes('display: flex;');
                        break;
                    case 'justify':
                        completed = code.includes('justify-content:');
                        break;
                    case 'align':
                        completed = code.includes('align-items:');
                        break;
                    case 'items':
                        const itemCount = (code.match(/<div/g) || []).length;
                        completed = itemCount >= 3;
                        break;
                }
                break;

            case 14: // Flex Direction
                switch (req.id) {
                    case 'row':
                        completed = code.includes('flex-direction: row;');
                        break;
                    case 'column':
                        completed = code.includes('flex-direction: column;');
                        break;
                    case 'direction':
                        completed = code.includes('flex-direction:');
                        break;
                    case 'responsive':
                        completed = code.includes('@media (max-width: 768px) {');
                        break;
                }
                break;

            case 15: // Flex Properties
                switch (req.id) {
                    case 'grow':
                        completed = code.includes('flex-grow:');
                        break;
                    case 'shrink':
                        completed = code.includes('flex-shrink:');
                        break;
                    case 'basis':
                        completed = code.includes('flex-basis:');
                        break;
                    case 'shorthand':
                        completed = code.includes('flex:');
                        break;
                }
                break;

            case 16: // Complex Layouts
                switch (req.id) {
                    case 'navigation':
                        completed = code.includes('<nav style="display: flex; justify-content: space-between; align-items: center; background-color: #333; color: white; padding: 15px; border-radius: 6px;">');
                        break;
                    case 'grid':
                        completed = code.includes('<div style="display: flex; flex-wrap: wrap; gap: 15px; justify-content: center;">');
                        break;
                    case 'responsive':
                        completed = code.includes('@media (max-width: 768px) {');
                        break;
                    case 'advanced':
                        completed = code.includes('flex: 1;');
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
</html>`,
        // Day 2 Starter Codes (HTML Forms)
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
    <!-- Use advanced form elements like dropdowns, textareas, and buttons -->
    
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
</html>`,
        // Day 3 Starter Codes (CSS Basics)
        9: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>CSS Introduction</title>
</head>
<body>
    <!-- Add CSS styling to HTML elements -->
    
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
    <!-- Practice inline, internal, and external CSS methods -->
    
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
    <!-- Master CSS selectors, properties, and values -->
    
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
    <!-- Apply colors, fonts, borders, and spacing -->
    
</body>
</html>`,
        // Day 4 Starter Codes (CSS Layout & Flexbox)
        13: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Basic Flexbox</title>
</head>
<body>
    <div class="flex-container">
        <div class="flex-item">Item 1</div>
        <div class="flex-item">Item 2</div>
        <div class="flex-item">Item 3</div>
    </div>
    
    <style>
        .flex-container {
            /* Add flexbox properties here */
        }
        
        .flex-item {
            background-color: #01d29b;
            color: white;
            padding: 15px;
            margin: 5px;
            border-radius: 6px;
        }
    </style>
</body>
</html>`,
        14: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Flex Direction</title>
</head>
<body>
    <div class="row-layout">
        <div class="item">1</div>
        <div class="item">2</div>
        <div class="item">3</div>
    </div>
    
    <div class="column-layout">
        <div class="item">1</div>
        <div class="item">2</div>
        <div class="item">3</div>
    </div>
    
    <style>
        .row-layout {
            /* Add row flexbox properties */
        }
        
        .column-layout {
            /* Add column flexbox properties */
        }
        
        .item {
            background-color: #01d29b;
            color: white;
            padding: 10px;
            margin: 5px;
            border-radius: 4px;
        }
    </style>
</body>
</html>`,
        15: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Flex Properties</title>
</head>
<body>
    <div class="flex-container">
        <div class="growing-item">Grows to fill space</div>
        <div class="fixed-item">Fixed size item</div>
        <div class="flexible-item">Flexible item</div>
    </div>
    
    <style>
        .flex-container {
            display: flex;
            gap: 10px;
            background-color: #f0f0f0;
            padding: 15px;
            border-radius: 6px;
        }
        
        .growing-item {
            /* Add flex-grow property */
            background-color: #01d29b;
            color: white;
            padding: 15px;
            border-radius: 4px;
        }
        
        .fixed-item {
            /* Add flex-basis property */
            background-color: #00b894;
            color: white;
            padding: 15px;
            border-radius: 4px;
        }
        
        .flexible-item {
            /* Add flex shorthand property */
            background-color: #01d29b;
            color: white;
            padding: 15px;
            border-radius: 4px;
        }
    </style>
</body>
</html>`,
        16: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Complex Layouts</title>
</head>
<body>
    <nav class="navbar">
        <div class="logo">Logo</div>
        <div class="nav-links">
            <a href="#">Home</a>
            <a href="#">About</a>
            <a href="#">Contact</a>
        </div>
    </nav>
    
    <div class="card-grid">
        <div class="card">Card 1</div>
        <div class="card">Card 2</div>
        <div class="card">Card 3</div>
    </div>
    
    <style>
        .navbar {
            /* Add navigation flexbox properties */
        }
        
        .nav-links {
            /* Add navigation links flexbox properties */
        }
        
        .card-grid {
            /* Add card grid flexbox properties */
        }
        
        .card {
            background-color: #f0f0f0;
            padding: 20px;
            border-radius: 6px;
            text-align: center;
        }
        
        /* Add responsive design here */
    </style>
</body>
</html>`
    };
    
    return starterCodes[challengeNumber] || '';
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
