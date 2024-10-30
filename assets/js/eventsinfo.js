let currentIndex = 0; // Track the current slide index

// Extract the event ID from the URL's query parameters
const params = new URLSearchParams(window.location.search);
const eventId = params.get('id'); // Retrieve 'id' parameter value from the URL

// Fetch the events data from the specified JSON file
fetch('assets/json/eventsinfo.json') // Updated path to JSON file
  .then(response => response.json()) // Parse the response as JSON
  .then(events => {
    const event = events[eventId]; // Find the event using the eventId

    if (event) {
      // Display the main content of the event
      document.getElementById('event-content').innerHTML = `
        <h1>${event.title}</h1>
        ${event.content} <!-- Display event title and content -->
      `;

      // Display additional event information
      document.getElementById('event-info').innerHTML = `
        <h2>Event Details</h2>
        <p><strong>Category:</strong> ${event.Category}</p>
        <p><strong>Date:</strong> ${event.Date}</p>
        <p><strong>Venue:</strong> ${event.Venue}</p> <!-- Display category, date, and venue -->
      `;

      // Display the event's images as slides
      const slidesContainer = document.getElementById('event-slides');
      slidesContainer.innerHTML = event.images
        .map(image => `<img src="${image}" alt="${event.title} Image">`) // Display each image
        .join('');

      showSlide(0); // Show the first slide initially
    } else {
      // Display an error message if the event is not found
      document.getElementById('event-details').innerHTML = `<p>Event not found!</p>`;
    }
  })
  .catch(error => {
    console.error('Error fetching events:', error);
    // Display an error message if fetching fails
    document.getElementById('event-details').innerHTML = `<p>Error loading event details.</p>`;
  });

// Function to display the slide at a specific index
function showSlide(index) {
  const slides = document.querySelector('.slides'); // Select the slides container
  const totalSlides = slides.children.length; // Get the total number of slides
  currentIndex = (index + totalSlides) % totalSlides; // Update currentIndex within valid range
  slides.style.transform = `translateX(${-currentIndex * 100}%)`; // Move to the current slide
}

// Function to show the next slide
function nextSlide() {
  showSlide(currentIndex + 1); // Increment slide index by 1
}

// Function to show the previous slide
function prevSlide() {
  showSlide(currentIndex - 1); // Decrement slide index by 1
}

// Disable developer tools and certain browser shortcuts
document.onkeydown = function (e) {
  if (
    e.keyCode === 123 || // Disable F12 (Developer Tools)
    (e.ctrlKey && e.shiftKey && [73, 67, 74].includes(e.keyCode)) || // Disable Ctrl+Shift+I, Ctrl+Shift+C, Ctrl+Shift+J
    (e.ctrlKey && e.keyCode === 85) // Disable Ctrl+U (View Source)
  ) {
    return false; // Prevent default action
  }
};

// Disable right-click, drag events, PrintScreen, and Ctrl+P
document.addEventListener("contextmenu", (e) => e.preventDefault()); // Disable right-click menu
document.addEventListener("dragstart", (e) => e.preventDefault()); // Disable drag events

// Disable PrintScreen by clearing clipboard on PrintScreen key press
document.addEventListener('keyup', (e) => {
  if (e.key === 'PrintScreen') navigator.clipboard.writeText(''); // Clear clipboard
});

// Disable printing with Ctrl+P
document.addEventListener('keydown', (e) => {
  if (e.ctrlKey && e.key === 'p') { // Disable Ctrl+P
    e.preventDefault(); // Prevent print dialog
    e.stopImmediatePropagation(); // Stop further propagation
  }
});
