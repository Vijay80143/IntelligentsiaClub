// Wait for the DOM content to load before executing the code
document.addEventListener('DOMContentLoaded', () => {
    // Fetch data from the about.json file in the assets/json directory
    fetch('assets/json/about.json')
      .then(response => response.json()) // Parse the JSON response
      .then(data => {
        const teamMembers = data.teamMembers; // Extract team members array from data
        generateTeamCards(teamMembers); // Call function to create team member cards
      })
      .catch(error => console.error('Error loading team members:', error)); // Log any errors
});

// Function to dynamically generate team member cards
// Accepts teamMembers array as a parameter
function generateTeamCards(teamMembers) {
    const container = document.getElementById('core-team-container'); // Find the core team container

    teamMembers.forEach(member => { // Loop through each team member
        const cardItem = document.createElement('div'); // Create a card div for each team member
        cardItem.className = 'card-item'; // Assign a CSS class for styling

        // Insert team member details into the cardItem div
        cardItem.innerHTML = `
            <img class="card-image" src="${member.imgSrc}" alt="${member.name}">
            <div class="card-content">
                <h3 class="card-title">${member.name}</h3>
                <p class="card-description">${member.role}</p>
                <div class="social-links">
                    <a href="${member.linkedIn}" target="_blank">
                        <img src="https://img.icons8.com/fluency/48/linkedin.png" alt="LinkedIn"/>
                    </a>
                    <a href="${member.instagram}" target="_blank">
                        <img src="https://img.icons8.com/fluency/48/instagram-new.png" alt="Instagram"/>
                    </a>
                </div>
            </div>
        `;
        
        container.appendChild(cardItem); // Append each card to the container
    });
}

// Disable right-click menu to prevent context actions
document.addEventListener("contextmenu", (e) => e.preventDefault());

// Disable drag events for images, text, etc.
document.addEventListener("dragstart", (e) => e.preventDefault());

// Disable PrintScreen key functionality
document.addEventListener('keyup', (e) => {
    if (e.key === 'PrintScreen') navigator.clipboard.writeText(''); // Clears clipboard on PrintScreen press
});

// Disable printing with Ctrl+P shortcut
document.addEventListener('keydown', (e) => {
    if (e.ctrlKey && e.key === 'p') { // Check if Ctrl+P is pressed
        e.preventDefault(); // Prevent default print dialog
        e.stopImmediatePropagation(); // Stop further propagation
    }
});

// Wait for DOM content to load before loading the footer
document.addEventListener('DOMContentLoaded', () => {
    // Fetch the footer HTML content
    fetch('footer.html')
      .then(response => response.text()) // Parse the response as text
      .then(data => {
        document.getElementById('navbar-container').innerHTML = data; // Insert footer into the navbar container

        // Reattach the toggle function after loading the navbar
        const navLinks = document.getElementById('navLinks'); // Get navigation links element
        window.toggleMenu = function (hamburger) {
          hamburger.classList.toggle('change'); // Toggle hamburger menu class for animation
          navLinks.classList.toggle('show'); // Toggle show class to display menu links
        };
      })
      .catch(error => console.error('Error loading navbar:', error)); // Log any errors with loading navbar
});
