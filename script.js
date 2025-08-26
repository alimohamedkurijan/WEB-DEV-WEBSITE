// ===== HTML GAMES SYSTEM =====
// Game state variables
let currentGame = 0;
let gameScore = 0;
let totalScore = 0;
let gamesPlayed = 0;

// Game data
const htmlGames = {
    1: {
        title: 'Tag Match Game',
        description: 'Match HTML tags with their descriptions',
        type: 'matching',
        questions: [
            { tag: '<h1>', description: 'Main heading', correct: true },
            { tag: '<p>', description: 'Paragraph text', correct: true },
            { tag: '<div>', description: 'Container element', correct: true },
            { tag: '<span>', description: 'Inline text element', correct: true },
            { tag: '<img>', description: 'Image element', correct: true },
            { tag: '<a>', description: 'Hyperlink element', correct: true }
        ]
    },
    2: {
        title: 'Structure Builder',
        description: 'Drag and drop HTML elements in correct order',
        type: 'ordering',
        elements: [
            '<!DOCTYPE html>',
            '<html>',
            '<head>',
            '<title>',
            '</title>',
            '</head>',
            '<body>',
            '</body>',
            '</html>'
        ]
    },
    3: {
        title: 'Code Detective',
        description: 'Find and fix HTML syntax errors',
        type: 'debugging',
        code: `<!DOCTYPE html>
<html>
<head>
    <title>My Page</title>
</head>
<body>
    <h1>Welcome</h1>
    <p>This is a paragraph
    <img src="image.jpg" alt="Image">
    <a href="https://example.com">Link</a>
</body>
</html>`,
        errors: [
            { line: 8, issue: 'Missing closing </p> tag', fix: '</p>' },
            { line: 9, issue: 'Missing closing quote in alt attribute', fix: 'alt="Image"' }
        ]
    },
    4: {
        title: 'Live Coder',
        description: 'Write HTML and see live preview',
        type: 'coding',
        starterCode: `<!DOCTYPE html>
<html>
<head>
    <title>My Page</title>
</head>
<body>
    <h1>Hello World!</h1>
    <p>Start coding here...</p>
</body>
</html>`
    },
    5: {
        title: 'List Master',
        description: 'Create ordered and unordered lists',
        type: 'lists',
        requirements: [
            'Create an unordered list with 3 items',
            'Create an ordered list with 3 items',
            'Use proper list tags (<ul>, <ol>, <li>)'
        ]
    },
    6: {
        title: 'HTML Champion',
        description: 'Final challenge combining all HTML skills',
        type: 'comprehensive',
        requirements: [
            'Create a complete HTML page structure',
            'Include headings, paragraphs, and images',
            'Add proper navigation with links',
            'Use semantic HTML elements',
            'Include a form with various input types'
        ]
    }
};

// ===== GAME FUNCTIONS =====
function startGame(gameNumber) {
    currentGame = gameNumber;
    gameScore = 0;
    
    const game = htmlGames[gameNumber];
    if (!game) return;
    
    // Update modal
    document.getElementById('gameTitle').textContent = game.title;
    document.getElementById('gameContent').innerHTML = generateGameContent(game);
    
    // Show modal
    document.getElementById('gameModal').classList.remove('hidden');
    
    // Initialize game-specific functionality
    initializeGame(game);
}

function generateGameContent(game) {
    switch (game.type) {
        case 'matching':
            return generateMatchingGame(game);
        case 'ordering':
            return generateOrderingGame(game);
        case 'debugging':
            return generateDebuggingGame(game);
        case 'coding':
            return generateCodingGame(game);
        case 'lists':
            return generateListsGame(game);
        case 'comprehensive':
            return generateComprehensiveGame(game);
        default:
            return '<p>Game type not supported</p>';
    }
}

function generateMatchingGame(game) {
    const shuffledQuestions = [...game.questions].sort(() => Math.random() - 0.5);
    
    return `
        <div class="space-y-6">
            <div class="bg-primary/10 border border-primary/20 rounded-2xl p-6">
                <h3 class="text-xl font-bold text-white mb-4">🎯 Task</h3>
                <p class="text-gray-300 mb-4">Match each HTML tag with its correct description. Click on the matching pairs!</p>
            </div>
            
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div class="space-y-4">
                    <h4 class="text-lg font-semibold text-primary">HTML Tags</h4>
                    ${shuffledQuestions.map((q, index) => `
                        <div class="bg-dark-light p-4 rounded-xl border border-primary/20 cursor-pointer hover:border-primary/40 transition-all duration-200" 
                             onclick="selectTag(${index})" data-tag="${index}">
                            <code class="text-primary font-mono text-lg">${q.tag}</code>
                        </div>
                    `).join('')}
                </div>
                
                <div class="space-y-4">
                    <h4 class="text-lg font-semibold text-primary">Descriptions</h4>
                    ${shuffledQuestions.map((q, index) => `
                        <div class="bg-dark-light p-4 rounded-xl border border-primary/20 cursor-pointer hover:border-primary/40 transition-all duration-200" 
                             onclick="selectDescription(${index})" data-desc="${index}">
                            <span class="text-gray-300">${q.description}</span>
                        </div>
                    `).join('')}
                </div>
            </div>
            
            <div class="text-center">
                <div class="bg-primary/10 border border-primary/20 rounded-2xl p-6">
                    <h4 class="text-lg font-semibold text-white mb-2">Score: <span id="currentScore" class="text-primary">0</span></h4>
                    <button onclick="checkMatchingGame()" class="bg-gradient-to-r from-primary to-accent text-white px-8 py-3 rounded-xl font-semibold hover:shadow-lg hover:shadow-primary/25 transition-all duration-300">
                        <i class="fas fa-check mr-2"></i>Check Answers
                    </button>
                </div>
            </div>
        </div>
    `;
}

function generateOrderingGame(game) {
    const shuffledElements = [...game.elements].sort(() => Math.random() - 0.5);
    
    return `
        <div class="space-y-6">
            <div class="bg-primary/10 border border-primary/20 rounded-2xl p-6">
                <h3 class="text-xl font-bold text-white mb-4">🎯 Task</h3>
                <p class="text-gray-300 mb-4">Drag and drop HTML elements in the correct order to build a proper HTML structure.</p>
            </div>
            
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <h4 class="text-lg font-semibold text-primary mb-4">Available Elements</h4>
                    <div id="sourceElements" class="space-y-2">
                        ${shuffledElements.map((element, index) => `
                            <div class="bg-dark-light p-3 rounded-xl border border-primary/20 cursor-move" 
                                 draggable="true" data-element="${element}" data-index="${index}">
                                <code class="text-primary font-mono">${element}</code>
                            </div>
                        `).join('')}
                    </div>
                </div>
                
                <div>
                    <h4 class="text-lg font-semibold text-primary mb-4">Your Structure</h4>
                    <div id="targetStructure" class="min-h-64 bg-dark-light/30 rounded-xl border-2 border-dashed border-primary/20 p-4">
                        <p class="text-gray-500 text-center">Drag elements here to build your HTML structure</p>
                    </div>
                </div>
            </div>
            
            <div class="text-center">
                <button onclick="checkOrderingGame()" class="bg-gradient-to-r from-primary to-accent text-white px-8 py-3 rounded-xl font-semibold hover:shadow-lg hover:shadow-primary/25 transition-all duration-300">
                    <i class="fas fa-check mr-2"></i>Check Structure
                </button>
            </div>
        </div>
    `;
}

function generateDebuggingGame(game) {
    return `
        <div class="space-y-6">
            <div class="bg-primary/10 border border-primary/20 rounded-2xl p-6">
                <h3 class="text-xl font-bold text-white mb-4">🎯 Task</h3>
                <p class="text-gray-300 mb-4">Find and fix the HTML syntax errors in the code below. Click on errors to fix them!</p>
            </div>
            
            <div class="bg-dark-light rounded-2xl p-6">
                <h4 class="text-lg font-semibold text-primary mb-4">HTML Code with Errors</h4>
                <pre class="bg-black text-green-400 p-4 rounded-xl overflow-x-auto text-sm" id="debugCode">${game.code}</pre>
            </div>
            
            <div class="bg-red-500/10 border border-red-500/20 rounded-2xl p-6">
                <h4 class="text-lg font-semibold text-red-400 mb-4">Found Errors</h4>
                <div id="errorList" class="space-y-2">
                    ${game.errors.map((error, index) => `
                        <div class="bg-red-500/20 p-3 rounded-xl border border-red-500/30">
                            <span class="text-red-400 font-semibold">Line ${error.line}:</span>
                            <span class="text-red-300 ml-2">${error.issue}</span>
                            <button onclick="fixError(${index})" class="ml-4 bg-red-500 text-white px-3 py-1 rounded-lg text-sm hover:bg-red-600 transition-colors">
                                Fix
                            </button>
                        </div>
                    `).join('')}
                </div>
            </div>
            
            <div class="text-center">
                <button onclick="checkDebuggingGame()" class="bg-gradient-to-r from-primary to-accent text-white px-8 py-3 rounded-xl font-semibold hover:shadow-lg hover:shadow-primary/25 transition-all duration-300">
                    <i class="fas fa-check mr-2"></i>Check Fixes
                </button>
            </div>
        </div>
    `;
}

function generateCodingGame(game) {
    return `
        <div class="space-y-6">
            <div class="bg-primary/10 border border-primary/20 rounded-2xl p-6">
                <h3 class="text-xl font-bold text-white mb-4">🎯 Task</h3>
                <p class="text-gray-300 mb-4">Write HTML code and see the live preview. Experiment with different elements!</p>
            </div>
            
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div>
                    <h4 class="text-lg font-semibold text-primary mb-4">HTML Code</h4>
                    <textarea id="htmlCode" class="w-full h-64 bg-black text-white p-4 rounded-xl border border-primary/20 font-mono text-sm resize-none" 
                              placeholder="Write your HTML code here...">${game.starterCode}</textarea>
                    <button onclick="updatePreview()" class="mt-4 bg-gradient-to-r from-primary to-accent text-white px-6 py-2 rounded-xl font-semibold hover:shadow-lg hover:shadow-primary/25 transition-all duration-300">
                        <i class="fas fa-eye mr-2"></i>Update Preview
                    </button>
                </div>
                
                <div>
                    <h4 class="text-lg font-semibold text-primary mb-4">Live Preview</h4>
                    <div id="livePreview" class="w-full h-64 bg-white text-black p-4 rounded-xl border border-primary/20 overflow-auto"></div>
                </div>
            </div>
            
            <div class="text-center">
                <button onclick="completeCodingGame()" class="bg-gradient-to-r from-primary to-accent text-white px-8 py-3 rounded-xl font-semibold hover:shadow-lg hover:shadow-primary/25 transition-all duration-300">
                    <i class="fas fa-check mr-2"></i>Complete Challenge
                </button>
            </div>
        </div>
    `;
}

function generateListsGame(game) {
    return `
        <div class="space-y-6">
            <div class="bg-primary/10 border border-primary/20 rounded-2xl p-6">
                <h3 class="text-xl font-bold text-white mb-4">🎯 Task</h3>
                <p class="text-gray-300 mb-4">Create ordered and unordered lists using proper HTML tags. Check the requirements below!</p>
            </div>
            
            <div class="bg-dark-light rounded-2xl p-6">
                <h4 class="text-lg font-semibold text-primary mb-4">Requirements</h4>
                <ul class="space-y-2 text-gray-300">
                    ${game.requirements.map(req => `<li>• ${req}</li>`).join('')}
                </ul>
            </div>
            
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div>
                    <h4 class="text-lg font-semibold text-primary mb-4">Your HTML Code</h4>
                    <textarea id="listsCode" class="w-full h-64 bg-black text-white p-4 rounded-xl border border-primary/20 font-mono text-sm resize-none" 
                              placeholder="Create your lists here..."></textarea>
                </div>
                
                <div>
                    <h4 class="text-lg font-semibold text-primary mb-4">Preview</h4>
                    <div id="listsPreview" class="w-full h-64 bg-white text-black p-4 rounded-xl border border-primary/20 overflow-auto"></div>
                </div>
            </div>
            
            <div class="text-center">
                <button onclick="checkListsGame()" class="bg-gradient-to-r from-primary to-accent text-white px-8 py-3 rounded-xl font-semibold hover:shadow-lg hover:shadow-primary/25 transition-all duration-300">
                    <i class="fas fa-check mr-2"></i>Check Lists
                </button>
            </div>
        </div>
    `;
}

function generateComprehensiveGame(game) {
    return `
        <div class="space-y-6">
            <div class="bg-primary/10 border border-primary/20 rounded-2xl p-6">
                <h3 class="text-xl font-bold text-white mb-4">🎯 Task</h3>
                <p class="text-gray-300 mb-4">Create a complete HTML page that combines all the skills you've learned. This is your final challenge!</p>
            </div>
            
            <div class="bg-dark-light rounded-2xl p-6">
                <h4 class="text-lg font-semibold text-primary mb-4">Requirements</h4>
                <ul class="space-y-2 text-gray-300">
                    ${game.requirements.map(req => `<li>• ${req}</li>`).join('')}
                </ul>
            </div>
            
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div>
                    <h4 class="text-lg font-semibold text-primary mb-4">Your HTML Code</h4>
                    <textarea id="comprehensiveCode" class="w-full h-64 bg-black text-white p-4 rounded-xl border border-primary/20 font-mono text-sm resize-none" 
                              placeholder="Create your complete HTML page here..."></textarea>
                </div>
                
                <div>
                    <h4 class="text-lg font-semibold text-primary mb-4">Live Preview</h4>
                    <div id="comprehensivePreview" class="w-full h-64 bg-white text-black p-4 rounded-xl border border-primary/20 overflow-auto"></div>
                </div>
            </div>
            
            <div class="text-center">
                <button onclick="checkComprehensiveGame()" class="bg-gradient-to-r from-primary to-accent text-white px-8 py-3 rounded-xl font-semibold hover:shadow-lg hover:shadow-primary/25 transition-all duration-300">
                    <i class="fas fa-check mr-2"></i>Submit Final Challenge
                </button>
            </div>
        </div>
    `;
}

function initializeGame(game) {
    switch (game.type) {
        case 'ordering':
            initializeDragAndDrop();
            break;
        case 'coding':
        case 'lists':
        case 'comprehensive':
            updatePreview();
            break;
    }
}

function initializeDragAndDrop() {
    const sourceElements = document.querySelectorAll('#sourceElements [draggable]');
    const targetStructure = document.getElementById('targetStructure');
    
    sourceElements.forEach(element => {
        element.addEventListener('dragstart', handleDragStart);
        element.addEventListener('dragend', handleDragEnd);
    });
    
    targetStructure.addEventListener('dragover', handleDragOver);
    targetStructure.addEventListener('drop', handleDrop);
}

function handleDragStart(e) {
    e.dataTransfer.setData('text/plain', e.target.dataset.element);
    e.target.style.opacity = '0.5';
}

function handleDragEnd(e) {
    e.target.style.opacity = '1';
}

function handleDragOver(e) {
    e.preventDefault();
}

function handleDrop(e) {
    e.preventDefault();
    const element = e.dataTransfer.getData('text/plain');
    const targetStructure = document.getElementById('targetStructure');
    
    if (targetStructure.querySelector('.text-gray-500')) {
        targetStructure.innerHTML = '';
    }
    
    const newElement = document.createElement('div');
    newElement.className = 'bg-dark-light p-3 rounded-xl border border-primary/20 mb-2';
    newElement.innerHTML = `<code class="text-primary font-mono">${element}</code>`;
    targetStructure.appendChild(newElement);
}

// Game completion functions
function checkMatchingGame() {
    gameScore = Math.floor(Math.random() * 60) + 40;
    completeGame(gameScore);
}

function checkOrderingGame() {
    const targetStructure = document.getElementById('targetStructure');
    const elements = targetStructure.querySelectorAll('code');
    let correctOrder = 0;
    
    if (elements.length === htmlGames[2].elements.length) {
        correctOrder = Math.floor(Math.random() * 40) + 60;
    }
    
    gameScore = correctOrder;
    completeGame(gameScore);
}

function checkDebuggingGame() {
    gameScore = Math.floor(Math.random() * 60) + 40;
    completeGame(gameScore);
}

function completeCodingGame() {
    gameScore = Math.floor(Math.random() * 60) + 40;
    completeGame(gameScore);
}

function checkListsGame() {
    const code = document.getElementById('listsCode').value;
    let score = 0;
    
    if (code.includes('<ul>') && code.includes('</ul>')) score += 30;
    if (code.includes('<ol>') && code.includes('</ol>')) score += 30;
    if (code.includes('<li>') && code.includes('</li>')) score += 40;
    
    gameScore = score;
    completeGame(gameScore);
}

function checkComprehensiveGame() {
    const code = document.getElementById('comprehensiveCode').value;
    let score = 0;
    
    if (code.includes('<!DOCTYPE html>')) score += 20;
    if (code.includes('<html>')) score += 20;
    if (code.includes('<head>') && code.includes('<title>')) score += 20;
    if (code.includes('<body>')) score += 20;
    if (code.includes('<h1>') || code.includes('<h2>')) score += 10;
    if (code.includes('<p>')) score += 10;
    
    gameScore = score;
    completeGame(score);
}

function completeGame(score) {
    gameScore = score;
    totalScore += score;
    gamesPlayed++;
    
    // Update display
    const totalScoreElement = document.getElementById('totalScore');
    const gamesPlayedElement = document.getElementById('gamesPlayed');
    const scoreElement = document.getElementById(`score-${currentGame}`);
    
    if (totalScoreElement) totalScoreElement.textContent = totalScore;
    if (gamesPlayedElement) gamesPlayedElement.textContent = gamesPlayed;
    if (scoreElement) scoreElement.textContent = Math.max(parseInt(scoreElement.textContent) || 0, score);
    
    // Show completion message
    const gameContent = document.getElementById('gameContent');
    if (gameContent) {
        gameContent.innerHTML = `
            <div class="text-center space-y-6">
                <div class="bg-green-500/20 border border-green-500/20 rounded-2xl p-8">
                    <i class="fas fa-trophy text-green-400 text-6xl mb-4"></i>
                    <h3 class="text-2xl font-bold text-white mb-2">Game Complete!</h3>
                    <p class="text-gray-300 mb-4">Congratulations! You've completed ${htmlGames[currentGame].title}</p>
                    <div class="text-3xl font-bold text-green-400">Score: ${score}/100</div>
                </div>
                
                <div class="flex justify-center space-x-4">
                    <button onclick="startGame(${currentGame})" class="bg-primary text-white px-6 py-2 rounded-xl font-semibold hover:bg-primary/80 transition-colors">
                        <i class="fas fa-redo mr-2"></i>Play Again
                    </button>
                    <button onclick="closeGameModal()" class="bg-gray-600 text-white px-6 py-2 rounded-xl font-semibold hover:bg-gray-700 transition-colors">
                        <i class="fas fa-times mr-2"></i>Close
                    </button>
                </div>
            </div>
        `;
    }
}

function updatePreview() {
    const codeInputs = ['htmlCode', 'listsCode', 'comprehensiveCode'];
    const previews = ['livePreview', 'listsPreview', 'comprehensivePreview'];
    
    codeInputs.forEach((inputId, index) => {
        const input = document.getElementById(inputId);
        const preview = document.getElementById(previews[index]);
        
        if (input && preview) {
            const code = input.value;
            preview.innerHTML = code;
        }
    });
}

function closeGameModal() {
    const modal = document.getElementById('gameModal');
    if (modal) {
        modal.classList.add('hidden');
    }
    currentGame = 0;
    gameScore = 0;
}

// ===== GLOBAL FUNCTION EXPORTS FOR GAMES =====
window.startGame = startGame;
window.closeGameModal = closeGameModal;
window.checkMatchingGame = checkMatchingGame;
window.checkOrderingGame = checkOrderingGame;
window.checkDebuggingGame = checkDebuggingGame;
window.completeCodingGame = completeCodingGame;
window.checkListsGame = checkListsGame;
window.checkComprehensiveGame = checkComprehensiveGame;
window.updatePreview = updatePreview;
window.selectTag = () => {};
window.selectDescription = () => {};
window.fixError = () => {};

console.log('🎮 HTML Games system loaded successfully!');
