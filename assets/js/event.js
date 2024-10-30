// Function to dynamically render event cards based on events data
function renderEventCards(events) {
  const container = document.getElementById('event-container'); // Get the event container element
  container.innerHTML = events.map(event => `
    <div class="card">
      <div class="card-image">
        <img src="${event.image}" alt="${event.alt}" loading="eager"> <!-- Load images eagerly for performance -->
        <div class="overlay">
          <a href="${event.detailsUrl}" class="learn-more">Event Details</a> <!-- Link to event details -->
        </div>
      </div>
    </div>
  `).join(''); // Convert mapped event HTML into a single string and assign to container’s innerHTML
}

// Fetch events data from JSON file, sort it by ID, and load the navbar
document.addEventListener('DOMContentLoaded', () => {
  fetch('assets/json/event.json') // Fetch JSON file containing events data
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok ' + response.statusText); // Handle network errors
      }
      return response.json(); // Parse response as JSON
    })
    .then(events => {
      // Sort events by ID in descending order (latest event first)
      const sortedEvents = events.sort((a, b) => b.id - a.id);

      // Render the sorted events on the page
      renderEventCards(sortedEvents);

      // Load the footer HTML content for the navbar
      fetch('footer.html')
        .then(response => response.text()) // Convert response to text
        .then(data => {
          document.getElementById('navbar-container').innerHTML = data; // Insert footer content into navbar container

          // Reattach the toggle function for the hamburger menu after loading navbar content
          const navLinks = document.getElementById('navLinks');
          window.toggleMenu = function (hamburger) {
            hamburger.classList.toggle('change'); // Toggle hamburger animation class
            navLinks.classList.toggle('show'); // Toggle visibility of nav links
          };
        })
        .catch(error => console.error('Error loading navbar:', error)); // Log errors if navbar fails to load
    })
    .catch(error => console.error('Error fetching events:', error)); // Log errors if events fail to load
});

// Disable developer tools shortcuts and certain browser actions for security
document.onkeydown = function (e) {
  if (
    e.keyCode === 123 || // Disable F12 (Developer Tools)
    (e.ctrlKey && e.shiftKey && [73, 67, 74].includes(e.keyCode)) || // Disable Ctrl+Shift+I/C/J
    (e.ctrlKey && e.keyCode === 85) // Disable Ctrl+U (View Source)
  ) {
    return false; // Prevent default action
  }
};

// Disable right-click, drag events, PrintScreen, and printing with Ctrl+P
document.addEventListener("contextmenu", (e) => e.preventDefault()); // Disable right-click context menu
document.addEventListener("dragstart", (e) => e.preventDefault()); // Disable dragging images, text, etc.
document.addEventListener('keyup', (e) => {
  if (e.key === 'PrintScreen') navigator.clipboard.writeText(''); // Clear clipboard on PrintScreen
});
document.addEventListener('keydown', (e) => {
  if (e.ctrlKey && e.key === 'p') { // Disable printing with Ctrl+P
    e.preventDefault(); // Prevent print dialog from opening
    e.stopImmediatePropagation(); // Stop event propagation
  }
});
