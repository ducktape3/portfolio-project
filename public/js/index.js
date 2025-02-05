// JavaScript for Portfolio Website

// Smooth Scrolling for Navigation Links
document.querySelectorAll('header nav a').forEach(link => {
  link.addEventListener('click', event => {
    event.preventDefault();
    const targetId = event.target.getAttribute('href').slice(1); // Get target section ID
    const targetSection = document.getElementById(targetId);

    if (targetSection) {
      window.scrollTo({
        top: targetSection.offsetTop,
        behavior: 'smooth' // Smooth scrolling effect
      });
    }
  });
});

// Smooth Scrolling for Logo Click
document.querySelectorAll('.logo a').forEach(logo => {
  logo.addEventListener('click', event => {
    event.preventDefault();
    const targetId = event.target.getAttribute('href').slice(1); // Get target section ID
    const targetSection = document.getElementById(targetId);

    if (targetSection) {
      window.scrollTo({
        top: targetSection.offsetTop,
        behavior: 'smooth' // Smooth scrolling effect
      });
    }
  });
});

// Smooth Scrolling for Footer Navigation Links
document.querySelectorAll('footer nav a').forEach(link => {
  link.addEventListener('click', event => {
    event.preventDefault();
    const targetId = event.target.getAttribute('href').slice(1); // Get target section ID
    const targetSection = document.getElementById(targetId);

    if (targetSection) {
      window.scrollTo({
        top: targetSection.offsetTop,
        behavior: 'smooth' // Smooth scrolling effect
      });
    }
  });
});

// Ensure DOM is loaded before running scripts
document.addEventListener("DOMContentLoaded", function () {
  
  // Sticky Header
  function handleStickyHeader() {
    const stickyHeader = document.querySelector('.sticky-header');
    const aboutSection = document.getElementById('about');

    if (!stickyHeader || !aboutSection) return; // Prevent errors

    const aboutSectionTop = aboutSection.offsetTop;

    if (window.scrollY >= aboutSectionTop - 50) {
      stickyHeader.classList.add('visible');
    } else {
      stickyHeader.classList.remove('visible');
    }
  }

  // Mobile Sticky Header
  function handleMobileStickyHeader() {
    const mobileStickyHeader = document.querySelector('.mobile-header .sticky-header');
    const aboutSection = document.getElementById('about');

    if (!mobileStickyHeader || !aboutSection) return; 

    const aboutSectionTop = aboutSection.offsetTop;

    if (window.scrollY >= aboutSectionTop - 50) {
      mobileStickyHeader.classList.add('visible');
    } else {
      mobileStickyHeader.classList.remove('visible');
    }
  }

  // Attach scroll event for sticky headers
  window.addEventListener('scroll', () => {
    handleStickyHeader();
    handleMobileStickyHeader();
  });

  // Toggle Mobile Menu (Normal)
  function toggleMenu() {
    const mobileNav = document.querySelector('.mobile-nav');
    mobileNav.classList.toggle('active');

    // Close sticky menu if it's open
    const stickyMobileNav = document.querySelector('.sticky-mobile-nav');
    if (stickyMobileNav.classList.contains('active')) {
      stickyMobileNav.classList.remove('active');
    }
  }

  // Toggle Mobile Menu (Sticky)
  function toggleStickyMenu() {
    const stickyMobileNav = document.querySelector('.sticky-mobile-nav');
    stickyMobileNav.classList.toggle('active');

    // Close normal mobile menu if it's open
    const mobileNav = document.querySelector('.mobile-nav');
    if (mobileNav.classList.contains('active')) {
      mobileNav.classList.remove('active');
    }
  }

  // Add event listeners for the menu icons
  document.querySelector(".menu-icon").addEventListener("click", toggleMenu);
  document.querySelector(".sticky-header .menu-icon").addEventListener("click", toggleStickyMenu);
  
});
