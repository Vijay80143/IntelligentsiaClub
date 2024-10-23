$(document).ready(function () {
    // Desktop FAQ Functionality
    const desktopQuestions = $(".grid .card");
    const desktopQuestionsCount = desktopQuestions.length;
    const desktopShowCount = 3; // Number of questions to show at a time
    let desktopCurrentIndex = 0;

    function showDesktopQuestions() {
        desktopQuestions.each(function (index) {
            $(this).toggle(index >= desktopCurrentIndex && index < desktopCurrentIndex + desktopShowCount);
        });
    }

    // Initially show the first set of questions
    showDesktopQuestions();

    $("#next-desktop").on("click", function () {
        // Check if we can go to the next set of questions
        if (desktopCurrentIndex + desktopShowCount < desktopQuestionsCount) {
            desktopCurrentIndex += desktopShowCount; // Move to the next set
            showDesktopQuestions();
        }
    });

    $("#prev-desktop").on("click", function () {
        // Check if we can go to the previous set of questions
        if (desktopCurrentIndex - desktopShowCount >= 0) {
            desktopCurrentIndex -= desktopShowCount; // Move to the previous set
            showDesktopQuestions();
        }
    });

    // Mobile FAQ Functionality
    const mobileQuestions = document.querySelectorAll(".faq-card");
    const mobileQuestionsCount = mobileQuestions.length;
    let mobileCurrentQuestion = 0;

    function showMobileQuestion(index) {
        mobileQuestions.forEach((question, i) => {
            question.classList.toggle("hidden", i !== index);
        });
    }

    // Initialize with the first mobile question displayed
    showMobileQuestion(mobileCurrentQuestion);

    // Functionality to show next mobile question
    $("#next-mobile").on("click", function () {
        if (mobileCurrentQuestion + 1 < mobileQuestionsCount) { // Prevent going beyond the last question
            mobileCurrentQuestion++; // Go to the next question
            showMobileQuestion(mobileCurrentQuestion);
        }
    });

    // Functionality to show previous mobile question
    $("#prev-mobile").on("click", function () {
        if (mobileCurrentQuestion - 1 >= 0) { // Prevent going before the first question
            mobileCurrentQuestion--; // Go to the previous question
            showMobileQuestion(mobileCurrentQuestion);
        }
    });
});



// Carousel initialization
const flipster = $('.carousel').flipster({
style: 'carousel',
spacing: -0.3,
loop: true  // Allows continuous loop
});

// Autoplay functionality
let autoplayInterval = setInterval(() => {
flipster.flipster('next');  // Moves to the next image every 5 seconds
}, 2000);  // 5000 milliseconds = 5 seconds

// Stop autoplay when user interacts with the carousel (optional)
$('.carousel').on('click', function() {
clearInterval(autoplayInterval);
});


document.addEventListener('DOMContentLoaded', () => {
    fetch('footer.html')
      .then(response => response.text())
      .then(data => {
        document.getElementById('navbar-container').innerHTML = data;

        // Reattach the toggle function after loading the navbar
        const navLinks = document.getElementById('navLinks');
        window.toggleMenu = function (hamburger) {
          hamburger.classList.toggle('change');
          navLinks.classList.toggle('show');
        };
      })
      .catch(error => console.error('Error loading navbar:', error));
  });


document.onkeydown = function (e) {
    // Disable F12
    if (e.keyCode === 123) return false;
  
    // Disable Ctrl+Shift+I
    if (e.ctrlKey && e.shiftKey && e.keyCode === 73) return false;
  
    // Disable Ctrl+Shift+C
    if (e.ctrlKey && e.shiftKey && e.keyCode === 67) return false;
  
    // Disable Ctrl+Shift+J
    if (e.ctrlKey && e.shiftKey && e.keyCode === 74) return false;
  
    // Disable Ctrl+U (View Source)
    if (e.ctrlKey && e.keyCode === 85) return false;
  };
  
  // Disable right-click menu
  document.addEventListener("contextmenu", (e) => e.preventDefault());
  
  // Disable drag events (images, text, etc.)
  document.addEventListener("dragstart", (e) => e.preventDefault());
  
  // Disable PrintScreen
  document.addEventListener('keyup', (e) => {
    if (e.key === 'PrintScreen') navigator.clipboard.writeText('');
  });
  
  // Disable printing with Ctrl+P
  document.addEventListener('keydown', (e) => {
    if (e.ctrlKey && e.key === 'p') {
      e.preventDefault();
      e.stopImmediatePropagation();
    }
  });
  
  let responses = []; // Store chatbot responses from JSON

  // Load responses from JSON file
  fetch('assets/json/chatbot.json')
      .then(response => response.json())
      .then(data => responses = data)
      .catch(error => console.error('Error loading chatbot data:', error));
  
  const chatboxButton = document.querySelector('.chatbox__button img');
  const chatboxSupport = document.querySelector('.chatbox__support');
  const sendButton = document.getElementById('sendButton');
  const userInput = document.getElementById('userInput');
  const chatboxMessages = document.querySelector('.chatbox__messages');
  
  // Toggle chatbox visibility
  chatboxButton.addEventListener('click', () => {
      chatboxSupport.classList.toggle('chatbox--active');
  });
  
  // Send message and get bot response
  sendButton.addEventListener('click', () => {
      const userMessage = userInput.value.trim().toLowerCase();
      if (userMessage) {
          displayMessage(userMessage, 'user');
          const botResponse = getResponse(userMessage);
          displayMessage(botResponse, 'bot');
          userInput.value = '';
      }
  });
  
  function getResponse(userMessage) {
      for (let item of responses) {
          const matchedQuestion = item.questions.some(q => userMessage.includes(q.toLowerCase()));
          if (matchedQuestion) {
              return Array.isArray(item.answer) ? item.answer.join(' ') : item.answer;
          }
      }
      return "Sorry, I don't understand.";
  }
  
  function displayMessage(message, type) {
      const messageDiv = document.createElement('div');
      messageDiv.classList.add('message', type);
      messageDiv.textContent = message;
      chatboxMessages.appendChild(messageDiv);
      chatboxMessages.scrollTop = chatboxMessages.scrollHeight;
  }
  
