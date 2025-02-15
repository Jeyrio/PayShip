// script.js

// Wait for the DOM to be fully loaded before running any code
document.addEventListener('DOMContentLoaded', function() {
  // =========== MOBILE NAVIGATION VARIABLES ==============
  const mobileNavToggle = document.querySelector('.mobile-nav-toggle');
  const navContainer = document.querySelector('.nav-container');
  const dropdowns = document.querySelectorAll('.dropdown');

  // Handle dropdowns on mobile
  dropdowns.forEach(dropdown => {
    const dropdownToggle = dropdown.querySelector('a.dropdown-toggle');

    if(dropdownToggle) {
      dropdownToggle.addEventListener('click', function(e) {
        if (window.innerWidth <= 768) {
          e.preventDefault();
          dropdown.classList.toggle('active');
          e.stopPropagation();
        }
      });
    }
  });


  // Toggle mobile menu
mobileNavToggle.addEventListener('click', () => {
  const isOpen = navContainer.classList.contains('active');
  navContainer.classList.toggle('active');
  mobileNavToggle.setAttribute('aria-expanded', !isOpen);
  mobileNavToggle.classList.toggle('active');
  
  // Prevent body scrolling when menu is open
document.body.style.overflow = isOpen ? 'auto' : 'hidden';

});

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
  if (!navContainer.contains(e.target) && !mobileNavToggle.contains(e.target)) {
    navContainer.classList.remove('active');
    mobileNavToggle.classList.remove('active');
    mobileNavToggle.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = 'auto';

    // Close all dropdowns
    dropdowns.forEach(dropdown => dropdown.classList.remove('active'));
  }
});

// Close mobile menu when window is resized above mobile breakpoint
window .addEventListener('resize', () => {
  if (window.innerWidth > 768) {
    navContainer.classList.remove('active');
    mobileNavToggle.classList.remove('active');
    mobileNavToggle.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = 'auto';

    // Reset all dropdowns
    dropdowns.forEach(dropdown => {
      dropdown.classList.remove('active');
    });
  }
});

// ============== IMAGE SLIDER =====================
const slides = document.querySelectorAll('.slide');
const dots = document.querySelectorAll('.dot');
const prevBtn = document.querySelector('.prev');
const nextBtn = document.querySelector('.next');
const slider = document.querySelector('.slider');
let currentSlide = 0;
let slideInterval;
let isHovered = false;

// Function to show a specific slide
function showSlide(index) {
  // Remove active class from all slides and dots
  slides.forEach(slide => slide.classList.remove('active'));
  dots.forEach(dot => dot.classList.remove('active'));

  // Add active class to current slide and dot
  slides[index].classList.add('active');
  dots[index].classList.add('active');
}

// Function to show next slide
function nextSlide() {
  currentSlide++;
  if (currentSlide >= slides.length) {
    currentSlide = 0;
  }

  showSlide(currentSlide);
}

// Function to show previous slide
function prevSlide() {
  currentSlide--;
  if (currentSlide < 0) {
    currentSlide = slides.length - 1;
  }
  showSlide(currentSlide);
}

// Start automatic slideshow
function startSlideshow() {
  if (!isHovered) { // Only start if not hovered
  slideInterval = setInterval(nextSlide, 5000); // Change slide every 5 seconds
  }
}

// Stop automatic slideshow
function stopSlideshow() {
  clearInterval(slideInterval);
}

// Event Listeners for navigation buttons
if(nextBtn) {
nextBtn.addEventListener('click', () => {
  stopSlideshow();
  nextSlide();
  startSlideshow();
});
}

if (prevBtn) {
prevBtn.addEventListener('click', () => {
  stopSlideshow();
  prevSlide();
  startSlideshow();
});
}

// Event listeners for dots
dots.forEach((dot, index) => {
  dot.addEventListener('click', () => {
    stopSlideshow();
    currentSlide = index;
    showSlide(currentSlide);
    // nextSlide();
    startSlideshow();
  });
});

// Hover handlers
slider.addEventListener('mouseenter', () => {
  isHovered = true;
  stopSlideshow();
});

slider.addEventListener('mouseleave', () => {
  isHovered = false;
  startSlideshow();
});

// Start the slideshow initially
startSlideshow();

// Cleanup on page unload
window.addEventListener('beforeunload', () => {
  stopSlideshow();
});

// ============== TRACKING FUNCTIONALIY ==========
const trackingInput = document.getElementById('tracking-input');
const trackButton = document.getElementById('track-button');

trackButton.addEventListener('click', function(e) {
  e.preventDefault();
  const trackingId = trackingInput.value.trim();

  if (trackingId) {
    // Here you would typically make an API call to your backend
    alert(`Tracking shipment with Id: ${trackingId}`);
    // Reset input
    trackingInput.value = '';
  } else {
    alert('Please enter a tracking number');
  }
});

// Function to handle tracking from home page
function handleHomePageTracking() {
  const trackingInput = document.getElementById('tracking-input');
  const trackButton = document.getElementById('track-button');

  if (trackingInput && trackButton) {
    trackButton.addEventListener('click', (e) => {
      const trackingId = trackingInput.value.trim();

      if(trackingId) {
        // Add tracking ID to url as a parameter
        e.preventDefault();
        window.location.href = `track.html?id=${encodeURIComponent(trackingId)}`;
      }
    });
  }
}

// Function to handle tracking page
const handleTrackingPage = () => {
  const trackForm = document.getElementById('track-form');
  const trackingResults = document.getElementById('tracking-results');

  if (trackForm) {
    // check if there's a tracking ID in the url
    const urlParams = new URLSearchParams(window.location.search);
    const trackingId = urlParams.get('id');

    if (trackingId) {
      // Pre-fill the tracking input if Id exists in URL
      document.getElementById('tracking-id').value = trackingId;
      // Automatically submit the form
      trackForm.dispatchEvent(new Event('submit'));
    }

    trackForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const trackingId = document.getElementById('tracking-id').value.trim();

      if (trackingId) {
        // Show loading state
        trackForm.querySelector('button').textContent = 'Tracking...';

        try {
          // Stimulate API call (replace with actual API call)
          await new Promise(resolve => setTimeout(resolve, 1500));

          // Update tracking results (replace with actual data)
          document.getElementById('package-id').textContent = trackingId;
          document.getElementById('status').textContent = 'In Transit';
          document.getElementById('current-location').textContent = 'Lagos, Nigeria';
          document.getElementById('estimated-delivery').textContent = '2 days';

          // Show results
          trackingResults.classList.remove('hidden');
        } catch (error) {
          alert('Error tracking package. Please try again.');
        } finally {
          // Reset button text
          trackForm.querySelector('button').textContent = 'Track Package';
        }
      }
    });
  }
};

handleHomePageTracking();
handleTrackingPage();



// ============ CONTACT FORM =============
const contactForm = document.getElementById('contact-form');

contactForm.addEventListener('submit', function(e) {
  e.preventDefault();

  // Get form data
  const formData = new FormData(this);
  const formObject = {};
  formData.forEach((value, key) => formObject[key] = value);

  // Here you would typically send this data to your backend
  console.log('Form submitted with data:', formObject);
  alert('Thank you for your message! We will get back to you shortly.');

  // Reset form
  this.reset();
});

// Handle Contact Form Submission
function handleContactForm() {
  const contactForm = document.getElementById('contact-form');

  if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      
      // Get form data
      const formData = new FormData(this);
      const formObject = {};
      formData.forEach((value, key) => formObject[key] = value);
      
      try {
        // Show loading state
        const submitButton = contactForm.querySelector('button[type="submit"]');
        // const originalButtonText = submitButton.textContent;
        submitButton.textContent = 'Sending...';
        submitButton.disabled = true;

        // Stimulate API call (replace with actual API call)
        await new Promise(resolve => setTimeout(resolve, 1500));

        // Show success message
        alert('Thank you for your message! We will get back to you shortly.');
        contactForm.reset();
      }
      catch (error) {
        console.error('Error submitting form:', error);
        alert('There was an error sending your message. Please try again.');
      }
      finally{
        // Reset button state
        const submitButton = contactForm.querySelector('button[type="submit"]');
        submitButton.textContent = 'Send Message';
        submitButton.disabled = false;
      }
    });
  }
}
handleContactForm();

});

// ============== WALLET ADDRESS ==================