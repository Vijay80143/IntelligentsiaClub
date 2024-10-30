// Wait for the DOM content to load before running the script
window.addEventListener('DOMContentLoaded', () => {
    const video = document.getElementById('introVideo'); // Video element
    const videoContainer = document.getElementById('videoContainer'); // Video container element

    // Check if the video has already played using sessionStorage
    const hasPlayed = sessionStorage.getItem('videoPlayed');

    if (!hasPlayed) {
        // If video hasn't played yet, play it on first load
        video.play();

        // When the video ends, mark it as played and redirect to main page
        video.onended = () => {
            sessionStorage.setItem('videoPlayed', 'true'); // Save play status
            window.location.href = "intelligentsia.html"; // Redirect to main page
        };
    } else {
        // If the video has already played, skip directly to the main page
        window.location.href = "intelligentsia.html";
    }
});

// Disable certain developer tools and right-click actions for security purposes
document.onkeydown = function (e) {
    // Disable F12 (opens developer tools)
    if (e.keyCode === 123) return false;

    // Disable Ctrl+Shift+I (opens developer tools)
    if (e.ctrlKey && e.shiftKey && e.keyCode === 73) return false;

    // Disable Ctrl+Shift+C (inspects elements)
    if (e.ctrlKey && e.shiftKey && e.keyCode === 67) return false;

    // Disable Ctrl+Shift+J (opens JavaScript console)
    if (e.ctrlKey && e.shiftKey && e.keyCode === 74) return false;

    // Disable Ctrl+U (view page source)
    if (e.ctrlKey && e.keyCode === 85) return false;
};

// Disable right-click menu
document.addEventListener("contextmenu", (e) => e.preventDefault());

// Disable drag events to prevent copying of assets
document.addEventListener("dragstart", (e) => e.preventDefault());

// Disable PrintScreen by clearing clipboard when the key is pressed
document.addEventListener('keyup', (e) => {
    if (e.key === 'PrintScreen') navigator.clipboard.writeText(''); // Clear clipboard
});

// Disable printing with Ctrl+P to prevent unauthorized printing
document.addEventListener('keydown', (e) => {
    if (e.ctrlKey && e.key === 'p') {
        e.preventDefault(); // Prevent print dialog
        e.stopImmediatePropagation(); // Stop the event propagation
    }
});
