// Wait for the DOM content to fully load before executing the code
document.addEventListener('DOMContentLoaded', () => {
  // Fetch the 'footer.html' content to include in the current page
  fetch('footer.html')
    .then(response => response.text()) // Convert the response to text
    .then(data => {
      // Insert the fetched footer HTML into the element with ID 'navbar-container'
      document.getElementById('navbar-container').innerHTML = data;

      // Reattach the toggle function after loading the navbar content dynamically
      const navLinks = document.getElementById('navLinks'); // Get navigation links element
      window.toggleMenu = function (hamburger) {
        // Toggle 'change' class for hamburger animation
        hamburger.classList.toggle('change');
        // Toggle 'show' class to display the navigation menu links
        navLinks.classList.toggle('show');
      };
    })
    .catch(error => console.error('Error loading navbar:', error)); // Log any errors in loading navbar
});

// Disable specific key combinations and actions for security
document.onkeydown = function (e) {
  // Disable F12 key to prevent DevTools from opening
  if (e.keyCode === 123) return false;

  // Disable Ctrl+Shift+I (Inspect Element)
  if (e.ctrlKey && e.shiftKey && e.keyCode === 73) return false;

  // Disable Ctrl+Shift+C (Open Console)
  if (e.ctrlKey && e.shiftKey && e.keyCode === 67) return false;

  // Disable Ctrl+Shift+J (Open DevTools Console)
  if (e.ctrlKey && e.shiftKey && e.keyCode === 74) return false;

  // Disable Ctrl+U (View Source)
  if (e.ctrlKey && e.keyCode === 85) return false;
};

// Disable right-click menu to prevent context menu actions
document.addEventListener("contextmenu", (e) => e.preventDefault());

// Disable drag events to prevent users from dragging images, text, etc.
document.addEventListener("dragstart", (e) => e.preventDefault());

// Disable PrintScreen functionality by clearing clipboard content on PrintScreen key press
document.addEventListener('keyup', (e) => {
  if (e.key === 'PrintScreen') navigator.clipboard.writeText(''); // Clears clipboard if PrintScreen is pressed
});

// Disable printing with Ctrl+P
document.addEventListener('keydown', (e) => {
  if (e.ctrlKey && e.key === 'p') { // Check if Ctrl+P is pressed
    e.preventDefault(); // Prevent default print dialog from opening
    e.stopImmediatePropagation(); // Stop further propagation of the event
  }
});
