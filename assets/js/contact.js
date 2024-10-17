function loadFooter() {
    fetch('footer.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('footer-placeholder').innerHTML = data;
        })
        .catch(error => console.error('Error loading footer:', error));
}

// Call the function to load the footer
window.onload = loadFooter;

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
