// Back to Top Button Logic
const backToTopBtn = document.getElementById("backToTopBtn");
const progressIndicator = document.querySelector(".progress-indicator");

// Show/hide button based on scroll position
window.addEventListener("scroll", () => {
    const scrollY = window.scrollY;
    const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = (scrollY / totalHeight) * 100;

    // Update progress indicator height
    progressIndicator.style.height = `${progress}%`;

    // Show button if scrolled down
    if (scrollY > 100) {
        backToTopBtn.classList.add("visible");
    } else {
        backToTopBtn.classList.remove("visible");
    }
});

// Scroll to top when button is clicked
backToTopBtn.addEventListener("click", () => {
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
});