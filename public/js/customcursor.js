// Get the cursor element
const cursor = document.querySelector('.cursor');

// Update cursor position on mouse move
document.addEventListener('mousemove', (e) => {
  // Use clientX and clientY for viewport coordinates
  cursor.style.left = `${e.clientX}px`;
  cursor.style.top = `${e.clientY}px`;
});

// Add hover effect for all interactive elements
const interactiveElements = document.querySelectorAll('a, button, input, [data-hover]');

interactiveElements.forEach((element) => {
  // Enlarge cursor on mouse enter
  element.addEventListener('mouseenter', () => {
    cursor.style.width = '25px';
    cursor.style.height = '25px';
  });

  // Reset cursor size on mouse leave
  element.addEventListener('mouseleave', () => {
    cursor.style.width = '12px';
    cursor.style.height = '12px';
  });
});


// Function to detect if DevTools is open
function isDevToolsOpen() {
  const devtools = /./;
  devtools.toString = function () {
    this.opened = true; // This will be triggered when DevTools is open
  };
  console.log('%c', devtools);
  return devtools.opened === true;
}

// Check DevTools state and toggle cursor visibility
function toggleCursor() {
  const htmlElement = document.documentElement;
  if (isDevToolsOpen()) {
    htmlElement.style.cursor = 'auto'; // Show default cursor
  } else {
    htmlElement.style.cursor = 'none'; // Hide default cursor
  }
}

// Continuously check DevTools state
setInterval(toggleCursor, 1000); // Check every second