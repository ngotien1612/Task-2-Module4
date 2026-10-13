/**
 * Module 4 Task 2: Management System
 * Interactive Logic: Carousel, Dropdowns, Login flow, Course Modals
 */

document.addEventListener('DOMContentLoaded', () => {
  /* ====================================================
     1. GLOBAL NAVIGATION DROPDOWN
     ==================================================== */
  const dropdownBtn = document.getElementById('navDropdownBtn');
  const dropdownMenu = document.getElementById('navDropdownMenu');

  if (dropdownBtn && dropdownMenu) {
    dropdownBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      const isExpanded = dropdownMenu.classList.contains('show');
      if (isExpanded) {
        dropdownMenu.classList.remove('show');
        dropdownBtn.setAttribute('aria-expanded', 'false');
      } else {
        dropdownMenu.classList.add('show');
        dropdownBtn.setAttribute('aria-expanded', 'true');
      }
    });

    // Close dropdown on outside click
    document.addEventListener('click', (e) => {
      if (!dropdownBtn.contains(e.target) && !dropdownMenu.contains(e.target)) {
        dropdownMenu.classList.remove('show');
        dropdownBtn.setAttribute('aria-expanded', 'false');
      }
    });
  }

  /* ====================================================
     2. HERO CAROUSEL (index.html)
     ==================================================== */
  const slides = document.querySelectorAll('.hero-slide');
  const prevBtn = document.querySelector('.carousel-prev');
  const nextBtn = document.querySelector('.carousel-next');
  const indicators = document.querySelectorAll('.indicator-dot');
  let currentSlideIndex = 0;
  let carouselInterval = null;

  if (slides.length > 0) {
    function showSlide(index) {
      if (index < 0) {
        currentSlideIndex = slides.length - 1;
      } else if (index >= slides.length) {
        currentSlideIndex = 0;
      } else {
        currentSlideIndex = index;
      }

      slides.forEach((slide, idx) => {
        if (idx === currentSlideIndex) {
          slide.classList.add('active');
        } else {
          slide.classList.remove('active');
        }
      });

      indicators.forEach((indicator, idx) => {
        if (idx === currentSlideIndex) {
          indicator.classList.add('active');
        } else {
          indicator.classList.remove('active');
        }
      });
    }

    function nextSlide() {
      showSlide(currentSlideIndex + 1);
    }

    function prevSlide() {
      showSlide(currentSlideIndex - 1);
    }

    if (nextBtn) {
      nextBtn.addEventListener('click', () => {
        nextSlide();
        resetCarouselInterval();
      });
    }

    if (prevBtn) {
      prevBtn.addEventListener('click', () => {
        prevSlide();
        resetCarouselInterval();
      });
    }

    indicators.forEach((dot) => {
      dot.addEventListener('click', () => {
        const slideIdx = parseInt(dot.getAttribute('data-slide-to'), 10);
        showSlide(slideIdx);
        resetCarouselInterval();
      });
    });

    function startCarouselInterval() {
      carouselInterval = setInterval(nextSlide, 5000);
    }

    function resetCarouselInterval() {
      if (carouselInterval) {
        clearInterval(carouselInterval);
      }
      startCarouselInterval();
    }

    const carouselSection = document.querySelector('.hero-carousel-section');
    if (carouselSection) {
      carouselSection.addEventListener('mouseenter', () => {
        if (carouselInterval) clearInterval(carouselInterval);
      });
      carouselSection.addEventListener('mouseleave', () => {
        startCarouselInterval();
      });
    }

    startCarouselInterval();
  }

  /* ====================================================
     3. LOGIN PAGE FLOW (login.html)
     ==================================================== */
  const loginForm = document.getElementById('loginForm');
  const togglePasswordBtn = document.getElementById('togglePassword');
  const passwordInput = document.getElementById('passwordInput');

  // Toggle Show/Hide Password
  if (togglePasswordBtn && passwordInput) {
    togglePasswordBtn.addEventListener('click', () => {
      if (passwordInput.type === 'password') {
        passwordInput.type = 'text';
        togglePasswordBtn.textContent = 'Hide';
      } else {
        passwordInput.type = 'password';
        togglePasswordBtn.textContent = 'Show';
      }
    });
  }

  // Intercept Login Form Submission
  if (loginForm) {
    loginForm.addEventListener('submit', (e) => {
      e.preventDefault();
      alert('Login successful!');
      window.location.href = 'courses.html';
    });
  }

  /* ====================================================
     4. COURSES MODAL FLOW (courses.html)
     ==================================================== */
  const courseModalElement = document.getElementById('courseModal');
  const modalCourseTitle = document.getElementById('modalCourseTitle');
  const modalCourseDesc = document.getElementById('modalCourseDesc');
  const learnMoreButtons = document.querySelectorAll('.btn-learn-more');

  const courseData = {
    HTML: {
      title: 'HTML',
      desc: 'HTML stands for HyperText Markup Language. It creates the structure of a web page using headings, paragraphs, images, and links.'
    },
    CSS: {
      title: 'CSS',
      desc: 'CSS stands for Cascading Style Sheets. It controls the appearance of web pages, including colors, fonts, spacing, and layout.'
    },
    Bootstrap: {
      title: 'Bootstrap',
      desc: "Bootstrap is a front-end framework. It provides ready-made components and a responsive grid system to build websites quickly."
    },
    JavaScript: {
      title: 'JavaScript',
      desc: 'JavaScript is a programming language that makes web pages interactive. It can handle button clicks, form validation, popups, and dynamic content.'
    }
  };

  if (courseModalElement && learnMoreButtons.length > 0) {
    // Check if Bootstrap JS is available
    let bsModal = null;
    if (typeof bootstrap !== 'undefined' && bootstrap.Modal) {
      bsModal = new bootstrap.Modal(courseModalElement);
    }

    learnMoreButtons.forEach((btn) => {
      btn.addEventListener('click', () => {
        const courseKey = btn.getAttribute('data-course');
        const course = courseData[courseKey];

        if (course) {
          if (modalCourseTitle) modalCourseTitle.textContent = course.title;
          if (modalCourseDesc) modalCourseDesc.textContent = course.desc;

          if (bsModal) {
            bsModal.show();
          } else {
            // Vanilla fallback if Bootstrap JS is blocked or offline
            courseModalElement.classList.add('show');
            courseModalElement.style.display = 'block';
            document.body.classList.add('modal-open');
            let backdrop = document.querySelector('.modal-backdrop');
            if (!backdrop) {
              backdrop = document.createElement('div');
              backdrop.className = 'modal-backdrop fade show';
              document.body.appendChild(backdrop);
            }
          }
        }
      });
    });

    // Fallback close handling
    const closeButtons = courseModalElement.querySelectorAll('[data-bs-dismiss="modal"]');
    closeButtons.forEach((closeBtn) => {
      closeBtn.addEventListener('click', () => {
        if (!bsModal) {
          courseModalElement.classList.remove('show');
          courseModalElement.style.display = 'none';
          document.body.classList.remove('modal-open');
          const backdrop = document.querySelector('.modal-backdrop');
          if (backdrop) backdrop.remove();
        }
      });
    });
  }
});
