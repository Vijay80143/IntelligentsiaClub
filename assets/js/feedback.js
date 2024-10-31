// Keydown event listener to disable specific keyboard shortcuts
document.onkeydown = function (e) {
    // Disable F12 (opens developer tools)
    if (e.keyCode === 123) return false;

    // Disable Ctrl+Shift+I (opens developer tools in most browsers)
    if (e.ctrlKey && e.shiftKey && e.keyCode === 73) return false;

    // Disable Ctrl+Shift+C (inspects elements in most browsers)
    if (e.ctrlKey && e.shiftKey && e.keyCode === 67) return false;

    // Disable Ctrl+Shift+J (opens JavaScript console in most browsers)
    if (e.ctrlKey && e.shiftKey && e.keyCode === 74) return false;

    // Disable Ctrl+U (view source code)
    if (e.ctrlKey && e.keyCode === 85) return false;
};

// Disable right-click menu to prevent user actions like copying or inspecting
document.addEventListener("contextmenu", (e) => e.preventDefault());

// Disable drag events on the document to prevent dragging images, text, etc.
document.addEventListener("dragstart", (e) => e.preventDefault());

// Disable PrintScreen by clearing clipboard when the key is pressed
document.addEventListener('keyup', (e) => {
    if (e.key === 'PrintScreen') navigator.clipboard.writeText(''); // Clear clipboard content
});

// Disable printing with Ctrl+P to prevent unauthorized printing
document.addEventListener('keydown', (e) => {
    if (e.ctrlKey && e.key === 'p') {
        e.preventDefault(); // Prevent print dialog from opening
        e.stopImmediatePropagation(); // Stop the event from propagating further
    }
});
