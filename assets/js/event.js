// List of events with their details
const events = [
  { id: 1, image: 'assets/images/events/1st_event.jpeg', alt: 'Event 1', detailsUrl: 'eventdetails.html?id=1' },
  { id: 2, image: 'assets/images/events/2nd_event.jpg', alt: 'Event 2', detailsUrl: '#' },
  { id: 3, image: 'assets/images/events/3rd_event.jpg', alt: 'Event 3', detailsUrl: '#' },
  { id: 4, image: 'assets/images/events/4th_event.jpg', alt: 'Event 4', detailsUrl: '#' },
  { id: 5, image: 'assets/images/events/5th_event.jpeg', alt: 'Event 5', detailsUrl: '#' },
  { id: 6, image: 'assets/images/events/6th_event.jpeg', alt: 'Event 6', detailsUrl: '#' },
];

// Render event cards dynamically
function renderEventCards() {
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

// Initialize event cards on DOMContentLoaded
document.addEventListener('DOMContentLoaded', () => {
  renderEventCards();

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
});

// Disable developer tools and other browser actions
document.onkeydown = function (e) {
  if (e.keyCode === 123 || (e.ctrlKey && e.shiftKey && [73, 67, 74].includes(e.keyCode)) || (e.ctrlKey && e.keyCode === 85)) {
      return false;
  }
};

document.addEventListener("contextmenu", e => e.preventDefault());
document.addEventListener("dragstart", e => e.preventDefault());
document.addEventListener('keyup', e => { if (e.key === 'PrintScreen') navigator.clipboard.writeText(''); });
document.addEventListener('keydown', e => {
  if (e.ctrlKey && e.key === 'p') {
      e.preventDefault();
      e.stopImmediatePropagation();
  }
});
