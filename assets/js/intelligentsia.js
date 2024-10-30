$(document).ready(function () {
    // Desktop FAQ Functionality
    const desktopQuestions = $(".grid .card"); // All FAQ questions for desktop
    const desktopQuestionsCount = desktopQuestions.length; // Total number of questions
    const desktopShowCount = 3; // Number of questions to show at a time
    let desktopCurrentIndex = 0;

    // Function to show desktop FAQ questions based on current index
    function showDesktopQuestions() {
        desktopQuestions.each(function (index) {
            // Toggle visibility based on current index and show count
            $(this).toggle(index >= desktopCurrentIndex && index < desktopCurrentIndex + desktopShowCount);
        });
    }

    // Initially show the first set of questions
    showDesktopQuestions();

    // Event listener for "Next" button on desktop
    $("#next-desktop").on("click", function () {
        if (desktopCurrentIndex + desktopShowCount < desktopQuestionsCount) {
            desktopCurrentIndex += desktopShowCount; // Move to next set
            showDesktopQuestions();
        }
    });

    // Event listener for "Previous" button on desktop
    $("#prev-desktop").on("click", function () {
        if (desktopCurrentIndex - desktopShowCount >= 0) {
            desktopCurrentIndex -= desktopShowCount; // Move to previous set
            showDesktopQuestions();
        }
    });

    // Mobile FAQ Functionality
    const mobileQuestions = document.querySelectorAll(".faq-card"); // All FAQ questions for mobile
    const mobileQuestionsCount = mobileQuestions.length; // Total number of questions
    let mobileCurrentQuestion = 0;

    // Function to show a single mobile question based on the current index
    function showMobileQuestion(index) {
        mobileQuestions.forEach((question, i) => {
            question.classList.toggle("hidden", i !== index); // Show current question, hide others
        });
    }

    // Initialize with the first mobile question displayed
    showMobileQuestion(mobileCurrentQuestion);

    // Event listener for "Next" button on mobile
    $("#next-mobile").on("click", function () {
        if (mobileCurrentQuestion + 1 < mobileQuestionsCount) {
            mobileCurrentQuestion++; // Go to the next question
            showMobileQuestion(mobileCurrentQuestion);
        }
    });

    // Event listener for "Previous" button on mobile
    $("#prev-mobile").on("click", function () {
        if (mobileCurrentQuestion - 1 >= 0) {
            mobileCurrentQuestion--; // Go to the previous question
            showMobileQuestion(mobileCurrentQuestion);
        }
    });
});

// Carousel initialization using Flipster library
const flipster = $('.carousel').flipster({
    style: 'carousel',
    spacing: -0.3,
    loop: true // Enables continuous loop of carousel items
});

// Autoplay functionality for carousel
let autoplayInterval = setInterval(() => {
    flipster.flipster('next'); // Moves to the next image every 2 seconds
}, 2000); // Autoplay interval in milliseconds

// Stop autoplay when user interacts with the carousel
$('.carousel').on('click', function() {
    clearInterval(autoplayInterval); // Clears the autoplay interval
});

// Navbar loading and toggle function
document.addEventListener('DOMContentLoaded', () => {
    fetch('footer.html') // Fetch external navbar content
        .then(response => response.text())
        .then(data => {
            document.getElementById('navbar-container').innerHTML = data; // Insert navbar HTML

            // Toggle function for mobile navbar
            const navLinks = document.getElementById('navLinks');
            window.toggleMenu = function (hamburger) {
                hamburger.classList.toggle('change'); // Change icon on click
                navLinks.classList.toggle('show'); // Show/hide navbar
            };
        })
        .catch(error => console.error('Error loading navbar:', error));
});

// Disable certain developer tools and shortcuts
document.onkeydown = function (e) {
    if (
        e.keyCode === 123 || // F12
        (e.ctrlKey && e.shiftKey && [73, 67, 74].includes(e.keyCode)) || // Ctrl+Shift+I/C/J
        (e.ctrlKey && e.keyCode === 85) // Ctrl+U
    ) {
        return false; // Disable the action
    }
};

// Disable right-click menu
document.addEventListener("contextmenu", (e) => e.preventDefault());

// Disable drag events for images, text, etc.
document.addEventListener("dragstart", (e) => e.preventDefault());

// Disable PrintScreen by clearing clipboard content
document.addEventListener('keyup', (e) => {
    if (e.key === 'PrintScreen') navigator.clipboard.writeText(''); // Clear clipboard
});

// Disable printing with Ctrl+P
document.addEventListener('keydown', (e) => {
    if (e.ctrlKey && e.key === 'p') {
        e.preventDefault();
        e.stopImmediatePropagation();
    }
});

// Chatbot functionality setup
let responses = []; // Store chatbot responses loaded from JSON

// Load responses from a JSON file
fetch('assets/json/chatbot.json')
    .then(response => response.json())
    .then(data => responses = data) // Store loaded responses
    .catch(error => console.error('Error loading chatbot data:', error));

// Chatbox elements and interaction
const chatboxButton = document.querySelector('.chatbox__button img');
const chatboxSupport = document.querySelector('.chatbox__support');
const sendButton = document.getElementById('sendButton');
const userInput = document.getElementById('userInput');
const chatboxMessages = document.querySelector('.chatbox__messages');

// Toggle chatbox visibility
chatboxButton.addEventListener('click', () => {
    chatboxSupport.classList.toggle('chatbox--active'); // Show/hide chatbox
});

// Handle sending message and getting bot response
sendButton.addEventListener('click', () => {
    const userMessage = userInput.value.trim().toLowerCase(); // Normalize input
    if (userMessage) {
        displayMessage(userMessage, 'user'); // Display user message
        const botResponse = getResponse(userMessage); // Get bot response
        displayMessage(botResponse, 'bot'); // Display bot response
        userInput.value = ''; // Clear input field
    }
});

// Find appropriate response based on user message
function getResponse(userMessage) {
    for (let item of responses) {
        const matchedQuestion = item.questions.some(q => userMessage.includes(q.toLowerCase()));
        if (matchedQuestion) {
            return Array.isArray(item.answer) ? item.answer.join(' ') : item.answer;
        }
    }
    return "Sorry, I don't understand."; // Default message if no match is found
}

// Display a message in the chatbox
function displayMessage(message, type) {
    const messageDiv = document.createElement('div');
    messageDiv.classList.add('message', type); // Add user or bot style
    messageDiv.textContent = message; // Set message text
    chatboxMessages.appendChild(messageDiv); // Append to chatbox
    chatboxMessages.scrollTop = chatboxMessages.scrollHeight; // Scroll to bottom
}


// 1. FAQ Toggling
// Desktop: Shows a limited number of questions at a time with next/prev buttons.
// Mobile: Displays one question at a time, also with next/prev buttons.
// 2. Carousel Initialization and Autoplay
// Uses Flipster to create a looping carousel, advancing every 2 seconds.
// Stops autoplay if the user clicks on the carousel.
// 3. Dynamic Navbar Loading
// Loads the footer.html content into the navbar container and reattaches a toggleMenu function for toggling mobile navigation.
// 4. Restricting Developer Tools and Actions
// Disables key combinations and actions (F12, Ctrl+Shift+I/C/J/U, right-click, dragging, PrintScreen, and printing with Ctrl+P) to limit viewing or copying the page's source.
// 5. Chatbot with JSON-based Responses
// Loads possible responses from a JSON file and toggles the chatbox display when the chat icon is clicked.
// Matches user input with keywords to find and return responses; defaults to a message if no match is found.
