// Dynamic Typing Effect (if needed)
const typingElement = document.querySelector('#about h1');
const typingText = ['Web Developer', 'UI/UX Designer', 'Contentprenuer']; // Array of texts to type
let typingIndex = 0;
let charIndex = 0;
let isDeleting = false;

function typeText() {
  if (typingElement) {
    const currentText = typingText[typingIndex];
    typingElement.textContent = currentText.slice(0, charIndex); // Show partial text

    if (!isDeleting && charIndex < currentText.length) {
      charIndex++;
      setTimeout(typeText, 100);
    } else if (isDeleting && charIndex > 0) {
      charIndex--;
      setTimeout(typeText, 50);
    } else {
      isDeleting = !isDeleting; // Toggle deleting mode
      if (!isDeleting) {
        typingIndex = (typingIndex + 1) % typingText.length; // Move to next text
      }
      setTimeout(typeText, 1000);
    }
  }
}

// Start typing effect if element exists
if (typingElement) {
  typeText();
}

