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


// Load footer dynamically
function loadFooter() {
fetch('footer.html')
    .then(response => response.text())
    .then(data => {
        document.getElementById('footer-placeholder').innerHTML = data;
    })
    .catch(error => console.error('Error loading footer:', error));
}

window.onload = loadFooter;


