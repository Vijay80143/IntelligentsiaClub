window.addEventListener('DOMContentLoaded', () => {
    const video = document.getElementById('introVideo');
    const videoContainer = document.getElementById('videoContainer');

    // Check if the video has already played using sessionStorage
    const hasPlayed = sessionStorage.getItem('videoPlayed');

    if (!hasPlayed) {
        // Play the video on the first load
        video.play();

        // When the video ends, redirect to index.html
        video.onended = () => {
            sessionStorage.setItem('videoPlayed', 'true'); // Mark as played
            window.location.href = "intelligentsia.html"; // Redirect to index.html
        };
    } else {
        // If video has already played, go directly to index.html
        window.location.href = "intelligentsia.html";
    }
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
