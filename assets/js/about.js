      // Define team members
      const teamMembers = [
        {
            name: "A Siva",
            role: "President",
            imgSrc: "assets/images/team/Siva.jpg",
            linkedIn: "https://www.linkedin.com/in/siva-addanki-838517111",
            instagram: "https://www.instagram.com/__mr.vsn_/"
        },
        {
            name: "V Hari Sankar",
            role: "Director Of Technology",
            imgSrc: "assets/images/team/hari.jpeg",
            linkedIn: "https://www.linkedin.com/in/velicharla-hari-sankar/",
            instagram: "https://www.instagram.com/hari_197s/"
        },
        {
            name: "T Vishnu",
            role: "Director Of Community",
            imgSrc: "assets/images/team/vishnu.jpeg",
            linkedIn: "https://www.linkedin.com/in/vishnu-vardhan-tulabandula-b0b47a285/",
            instagram: "https://www.instagram.com/lone_warrior_varma/"
        },
        {
            name: "M Surya",
            role: "Director Of Designing and Planning",
            imgSrc: "assets/images/team/surya.jpg",
            linkedIn: "https://www.linkedin.com/in/s-l-srinivas-mudragada-462a0b28a/",
            instagram: "https://www.instagram.com/_srinivas__mudragada/"
        },
        {
            name: "N Vijay",
            role: "Director Of Internal Relations",
            imgSrc: "assets/images/team/vijay.jpg",
            linkedIn: "https://www.linkedin.com/in/vijay-nandyala/",
            instagram: "https://www.instagram.com/vijju_nandyala/"
        },
        {
            name: "J Bhavan",
            role: "Director Of External Relations",
            imgSrc: "assets/images/team/bhavan.jpeg",
            linkedIn: "https://www.linkedin.com/in/bhavan-jampa-a4200a287/",
            instagram: "https://www.instagram.com/heybvn._/"
        },
        {
            name: "A Aravind",
            role: "Technical Chair",
            imgSrc: "assets/images/team/aravind.jpg",
            linkedIn: "https://www.linkedin.com/in/anubothu-aravind/",
            instagram: "https://www.instagram.com/i.arvn/"
        },
        {
            name: "T Deekshitha",
            role: "Technical Chair",
            imgSrc: "assets/images/team/deekshitha.png",
            linkedIn: "https://www.linkedin.com/in/deekshitha-tadepalli-b96139289/",
            instagram: "#" // Placeholder for Instagram link
        },
        {
            name: "V Venkat",
            role: "Project Management Chair",
            imgSrc: "assets/images/team/venkat.jpg",
            linkedIn: "https://www.linkedin.com/in/vuddagiri-naga-venkat-769aa5257/",
            instagram: "https://www.instagram.com/venkat.vuddagiri_/"
        },
        {
            name: "M Teja",
            role: "Research Chair",
            imgSrc: "assets/images/team/teja.jpeg",
            linkedIn: "https://www.linkedin.com/in/teja-vsai-/",
            instagram: "https://www.instagram.com/teja_chowdary03/"
        },
        {
            name: "M Sai Chand",
            role: "Marketing Chair",
            imgSrc: "assets/images/team/sai_chand.jpg",
            linkedIn: "https://www.linkedin.com/in/v-s-sai-chand-mavireddy-8b7b8728a/",
            instagram: "https://www.instagram.com/m_sai_chand/"
        },
        {
            name: "T Mahipathi Rao",
            role: "External Designer",
            imgSrc: "assets/images/team/mahi.png",
            linkedIn: "https://www.linkedin.com/in/venkata-mahipathi-rao-topella-7327771b3/",
            instagram: "https://www.instagram.com/mahithopella/"
        },
        // Add more team members as needed
    ];
    
    // Function to generate team member cards
    function generateTeamCards() {
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
    
    // Call the function to generate the cards
    generateTeamCards();

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

document.onkeydown = function (e) {
  // Disable F12
  if (e.keyCode === 123) return false;

  // Disable Ctrl+Shift+I
  if (e.ctrlKey && e.shiftKey && e.keyCode === 73) return false;

  // Disable Ctrl+Shift+C
  if (e.ctrlKey && e.shiftKey && e.keyCode === 67) return false;

  // Disable Ctrl+Shift+J
  if (e.ctrlKey && e.shiftKey && e.keyCode === 74) return false;

  // Disable Ctrl+U (View Source)
  if (e.ctrlKey && e.keyCode === 85) return false;
};

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
