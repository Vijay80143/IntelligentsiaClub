const accordionItems = document.querySelectorAll('.accordion-item');

accordionItems.forEach(item => {
    const header = item.querySelector('.accordion-header');
    const arrow = item.querySelector('.accordion-arrow i');
    const content = item.querySelector('.accordion-content');

    header.addEventListener('click', () => {
        const isOpen = content.style.maxHeight;
        
        accordionItems.forEach(i => {
            const otherContent = i.querySelector('.accordion-content');
            const otherArrow = i.querySelector('.accordion-arrow i');
            if (i !== item) {
                otherContent.style.maxHeight = null;
                otherArrow.classList.remove('rotate');
            }
        });

        if (!isOpen) {
            content.style.maxHeight = content.scrollHeight + "px";
            arrow.classList.add('rotate');
        } else {
            content.style.maxHeight = null;
            arrow.classList.remove('rotate');
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

const cards = document.querySelectorAll('.card');
const totalCards = cards.length;
const cardsToShow = 3; // Number of cards to show at a time
let currentIndex = 0;

function updateDisplay() {
cards.forEach((card, index) => {
    card.classList.add('hidden'); // Hide all cards
    if (index >= currentIndex && index < currentIndex + cardsToShow) {
        card.classList.remove('hidden'); // Show only the current set of cards
    }
});
document.getElementById('grid').style.opacity = 1; // Show grid

// Show or hide arrows based on current index
document.getElementById('prev').classList.toggle('hidden', currentIndex === 0); // Hide left arrow if at start
document.getElementById('next').classList.toggle('hidden', currentIndex + cardsToShow >= totalCards); // Hide right arrow if at end
}

document.getElementById('next').addEventListener('click', () => {
currentIndex += cardsToShow;
if (currentIndex >= totalCards) currentIndex = totalCards - cardsToShow; // Don't go beyond the last set
updateDisplay();
});

document.getElementById('prev').addEventListener('click', () => {
currentIndex -= cardsToShow;
if (currentIndex < 0) currentIndex = 0; // Don't go below zero
updateDisplay();
});

// Initialize display
updateDisplay();
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


document.onkeydown = function (e) {
    // Disable F12
    if (e.keyCode === 123) {
      alert("Developer tools are disabled!");
      return false;
    }
    // Disable Ctrl+Shift+I
    if (e.ctrlKey && e.shiftKey && e.keyCode === 73) {
      alert("Developer tools are disabled!");
      return false;
    }
    // Disable Ctrl+Shift+C
    if (e.ctrlKey && e.shiftKey && e.keyCode === 67) {
      alert("Element inspection is disabled!");
      return false;
    }
    // Disable Ctrl+Shift+J
    if (e.ctrlKey && e.shiftKey && e.keyCode === 74) {
      alert("Console access is disabled!");
      return false;
    }
    // Disable Ctrl+U (View Source)
    if (e.ctrlKey && e.keyCode === 85) {
      alert("Viewing page source is disabled!");
      return false;
    }
  };

  // Disable right-click menu
  document.addEventListener("contextmenu", function (e) {
    e.preventDefault();
    alert("Right-click is disabled!");
  });

  // Disable drag events (images, text, etc.)
  document.addEventListener("dragstart", function (e) {
    e.preventDefault();
    alert("Dragging is disabled!");
  });


  document.addEventListener('keyup', (e) => {
    if (e.key == 'PrintScreen') {
        navigator.clipboard.writeText('');
        alert('Screenshots disabled!');
    }
});

/** TO DISABLE PRINTS WHIT CTRL+P **/
document.addEventListener('keydown', (e) => {
    if (e.ctrlKey && e.key == 'p') {
        alert('This section is not allowed to print or export to PDF');
        e.cancelBubble = true;
        e.preventDefault();
        e.stopImmediatePropagation();
    }
});
