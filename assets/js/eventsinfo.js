let currentIndex = 0;

  // Extract the event ID from the URL
  const params = new URLSearchParams(window.location.search);
  const eventId = params.get('id');

  // Fetch the events data from the JSON file
  fetch('assets/json/eventsinfo.json') // Updated path
    .then(response => response.json())
    .then(events => {
      const event = events[eventId];

      if (event) {
        // Display Event Content
        document.getElementById('event-content').innerHTML = `
          <h1>${event.title}</h1>
          ${event.content}
        `;

        // Display Event Info
        document.getElementById('event-info').innerHTML = `
          <h2>Event Details</h2>
          <p><strong>Category:</strong> ${event.Category}</p>
          <p><strong>Date:</strong> ${event.Date}</p>
          <p><strong>Venue:</strong> ${event.Venue}</p>
        `;

        // Display Slides
        const slidesContainer = document.getElementById('event-slides');
        slidesContainer.innerHTML = event.images
          .map(image => `<img src="${image}" alt="${event.title} Image">`)
          .join('');

        showSlide(0); // Show the first slide initially
      } else {
        document.getElementById('event-details').innerHTML = `<p>Event not found!</p>`;
      }
    })
    .catch(error => {
      console.error('Error fetching events:', error);
      document.getElementById('event-details').innerHTML = `<p>Error loading event details.</p>`;
    });

  function showSlide(index) {
    const slides = document.querySelector('.slides');
    const totalSlides = slides.children.length;
    currentIndex = (index + totalSlides) % totalSlides;
    slides.style.transform = `translateX(${-currentIndex * 100}%)`;
  }

  function nextSlide() {
    showSlide(currentIndex + 1);
  }

  function prevSlide() {
    showSlide(currentIndex - 1);
  }
