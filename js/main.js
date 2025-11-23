// Mobile menu toggle (safe: guards missing elements, works without Bootstrap JS)
(function () {
  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  const navCollapse = document.getElementById('mainNavbar');

  if (!mobileMenuBtn || !navCollapse) return;

  // Toggle the collapsed menu (adds/removes the Bootstrap "show" class)
  mobileMenuBtn.addEventListener('click', () => {
    const isOpen = navCollapse.classList.toggle('show');
    mobileMenuBtn.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
  });

  // Close the mobile menu when any internal nav link is clicked
  navCollapse.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      if (navCollapse.classList.contains('show')) {
        navCollapse.classList.remove('show');
        mobileMenuBtn.setAttribute('aria-expanded', 'false');
      }
    });
  });

  // Ensure menu is closed when resizing to desktop widths
  window.addEventListener('resize', () => {
    if (window.innerWidth >= 992 && navCollapse.classList.contains('show')) {
      navCollapse.classList.remove('show');
      mobileMenuBtn.setAttribute('aria-expanded', 'false');
    }
  });
})();

// Carousel functionality
 (function() {
    const slides = document.querySelectorAll('.carousel-slide');
    const dots = document.querySelectorAll('.carousel-dot');
    let current = 0;
    let timer = null;
    function show(index) {
      slides.forEach((s, i) => {
        const active = i === index;
        s.classList.toggle('active', active);
        s.setAttribute('aria-hidden', !active);
        dots[i].classList.toggle('active', active);
      });
      current = index;
    }
    function next() { show((current + 1) % slides.length); }

    // attach dot handlers
    dots.forEach((d, i) => d.addEventListener('click', () => {
      show(i);
      resetTimer();
    }));

    function resetTimer() {
      if (timer) clearInterval(timer);
      timer = setInterval(next, 6000);
    }

    // start
    resetTimer();
    // pause on hover
    const container = document.querySelector('.carousel-container');
    container.addEventListener('mouseenter', () => clearInterval(timer));
    container.addEventListener('mouseleave', resetTimer);
  })();

// Fade-in animation on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');

            // Trigger counter animation for stat numbers
            if (entry.target.querySelector('.stat-number')) {
                const statNumbers = entry.target.querySelectorAll('.stat-number');
                statNumbers.forEach(statNumber => {
                    if (!statNumber.hasAttribute('data-counted')) {
                        animateCounter(statNumber);
                        statNumber.setAttribute('data-counted', 'true');
                    }
                });
            }
        }
    });
}, observerOptions);

// Counter animation function
function animateCounter(element) {
    const target = parseInt(element.getAttribute('data-target'));
    const duration = 2000; // 2 seconds
    const increment = target / (duration / 16); // 60fps
    let current = 0;

    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            current = target;
            clearInterval(timer);
        }

        // Format the number based on the original content
        const originalText = element.getAttribute('data-target');
        if (element.textContent.includes('+')) {
            element.textContent = Math.floor(current) + '+';
        } else if (element.textContent.includes('%')) {
            element.textContent = Math.floor(current) + '%';
        } else if (element.textContent.includes('hr')) {
            element.textContent = Math.floor(current) + 'hr';
        } else {
            element.textContent = Math.floor(current);
        }
    }, 16);
}

document.querySelectorAll('.fade-in').forEach(el => {
    observer.observe(el);
});

// Navbar background on scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.style.background = '#7ba5c0a4';
    } else {
        navbar.style.background = '#7ba5c0a4';
    }
});

// Add some interactive hover effects
document.querySelectorAll('.service-card').forEach(card => {
    card.addEventListener('mouseenter', function () {
        this.style.transform = 'translateY(-10px) scale(1.02)';
    });

    card.addEventListener('mouseleave', function () {
        this.style.transform = 'translateY(-10px)';
    });
});

// Testimonial card hover effects
document.querySelectorAll('.testimonial-card').forEach(card => {
    card.addEventListener('mouseenter', function () {
        this.style.transform = 'translateY(-5px) scale(1.02)';
        this.style.background = 'rgba(255, 255, 255, 0.15)';
    });

    card.addEventListener('mouseleave', function () {
        this.style.transform = 'translateY(-5px)';
        this.style.background = 'rgba(255, 255, 255, 0.1)';
    });
});
