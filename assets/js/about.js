document.addEventListener('DOMContentLoaded', () => {
    fetch('assets/json/about.json')
      .then(response => response.json())
      .then(data => {
        const teamMembers = data.teamMembers;
        generateTeamCards(teamMembers);
      })
      .catch(error => console.error('Error loading team members:', error));
  });
  
  // Modify the generateTeamCards function to accept teamMembers as a parameter
  function generateTeamCards(teamMembers) {
    const container = document.getElementById('core-team-container');
    
    teamMembers.forEach(member => {
      const cardItem = document.createElement('div');
      cardItem.className = 'card-item';
  
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
      
      container.appendChild(cardItem);
    });
  }
  
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
  