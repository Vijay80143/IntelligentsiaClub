// Render event cards dynamically
function renderEventCards(events) {
  const container = document.getElementById('event-container');
  container.innerHTML = events.map(event => `
    <div class="card">
      <div class="card-image">
        <img src="${event.image}" alt="${event.alt}" loading="eager">
        <div class="overlay">
          <a href="${event.detailsUrl}" class="learn-more">Event Details</a>
        </div>
      </div>
    </div>
  `).join('');
}

// Fetch events data from JSON file and sort by ID
document.addEventListener('DOMContentLoaded', () => {
  fetch('assets/json/event.json') // Path to your JSON file
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok ' + response.statusText);
      }
      return response.json();
    })
    .then(events => {
      // Sort events by ID in descending order
      const sortedEvents = events.sort((a, b) => b.id - a.id);

      // Render sorted events
      renderEventCards(sortedEvents);

      // Load Navbar
      fetch('footer.html')
        .then(response => response.text())
        .then(data => {
          document.getElementById('navbar-container').innerHTML = data;

          const navLinks = document.getElementById('navLinks');
          window.toggleMenu = function (hamburger) {
            hamburger.classList.toggle('change');
            navLinks.classList.toggle('show');
          };
        })
        .catch(error => console.error('Error loading navbar:', error));
    })
    .catch(error => console.error('Error fetching events:', error));
});

// Disable developer tools and browser actions
document.onkeydown = function (e) {
  if (
    e.keyCode === 123 || // F12
    (e.ctrlKey && e.shiftKey && [73, 67, 74].includes(e.keyCode)) || // Ctrl+Shift+I/C/J
    (e.ctrlKey && e.keyCode === 85) // Ctrl+U
  ) {
    return false;
  }
};

// Disable right-click, drag, PrintScreen, and printing with Ctrl+P
document.addEventListener("contextmenu", (e) => e.preventDefault());
document.addEventListener("dragstart", (e) => e.preventDefault());
document.addEventListener('keyup', (e) => {
  if (e.key === 'PrintScreen') navigator.clipboard.writeText('');
});
document.addEventListener('keydown', (e) => {
  if (e.ctrlKey && e.key === 'p') {
    e.preventDefault();
    e.stopImmediatePropagation();
  }
});
