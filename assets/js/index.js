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

