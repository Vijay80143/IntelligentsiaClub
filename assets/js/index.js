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
    if (e.keyCode === 123) {
      alert("Developer tools are disabled!");
      return false;
    }
    // Disable Ctrl+Shift+I
    if (e.ctrlKey && e.shiftKey && e.keyCode === 73) {
      alert("Developer tools are disabled!");
      return false;
    }
    // Disable Ctrl+Shift+C
    if (e.ctrlKey && e.shiftKey && e.keyCode === 67) {
      alert("Element inspection is disabled!");
      return false;
    }
    // Disable Ctrl+Shift+J
    if (e.ctrlKey && e.shiftKey && e.keyCode === 74) {
      alert("Console access is disabled!");
      return false;
    }
    // Disable Ctrl+U (View Source)
    if (e.ctrlKey && e.keyCode === 85) {
      alert("Viewing page source is disabled!");
      return false;
    }
  };

  // Disable right-click menu
  document.addEventListener("contextmenu", function (e) {
    e.preventDefault();
    alert("Right-click is disabled!");
  });

  // Disable drag events (images, text, etc.)
  document.addEventListener("dragstart", function (e) {
    e.preventDefault();
    alert("Dragging is disabled!");
  });


  document.addEventListener('keyup', (e) => {
    if (e.key == 'PrintScreen') {
        navigator.clipboard.writeText('');
        alert('Screenshots disabled!');
    }
});

/** TO DISABLE PRINTS WHIT CTRL+P **/
document.addEventListener('keydown', (e) => {
    if (e.ctrlKey && e.key == 'p') {
        alert('This section is not allowed to print or export to PDF');
        e.cancelBubble = true;
        e.preventDefault();
        e.stopImmediatePropagation();
    }
});