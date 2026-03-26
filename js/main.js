// ---- Certificate Modal ----
function openCertModal(e, el) {
  e.preventDefault();
  var url = el.getAttribute('data-cert');
  document.getElementById('certIframe').src = url;
  document.getElementById('certModal').classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeCertModal(e) {
  if (e.target === document.getElementById('certModal') || e.currentTarget.classList.contains('cert-modal-close')) {
    document.getElementById('certModal').classList.remove('open');
    document.getElementById('certIframe').src = '';
    document.body.style.overflow = '';
  }
}

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape') {
    document.getElementById('certModal').classList.remove('open');
    document.getElementById('certIframe').src = '';
    document.body.style.overflow = '';
  }
});

document.addEventListener('DOMContentLoaded', function () {

  // ---- Navbar scroll effect ----
  var navbar = document.getElementById('navbar');
  var lastScroll = 0;

  window.addEventListener('scroll', function () {
    var scrollY = window.scrollY;
    if (scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
    lastScroll = scrollY;
  });


  // ---- Mobile menu toggle ----
  var navToggle = document.getElementById('navToggle');
  var navMenu = document.getElementById('navMenu');

  navToggle.addEventListener('click', function () {
    navToggle.classList.toggle('active');
    navMenu.classList.toggle('open');
  });

  // Close menu when clicking a link
  var navLinks = document.querySelectorAll('.nav-link');
  navLinks.forEach(function (link) {
    link.addEventListener('click', function () {
      navToggle.classList.remove('active');
      navMenu.classList.remove('open');
    });
  });


  // ---- Active nav link on scroll ----
  var sections = document.querySelectorAll('section[id]');

  function setActiveNav() {
    var scrollPos = window.scrollY + 120;

    sections.forEach(function (section) {
      var top = section.offsetTop;
      var height = section.offsetHeight;
      var id = section.getAttribute('id');

      if (scrollPos >= top && scrollPos < top + height) {
        navLinks.forEach(function (link) {
          link.classList.remove('active');
          if (link.getAttribute('href') === '#' + id) {
            link.classList.add('active');
          }
        });
      }
    });
  }

  window.addEventListener('scroll', setActiveNav);
  setActiveNav();


  // ---- Fade in on scroll ----
  var fadeElements = document.querySelectorAll(
    '.timeline-item, .skill-category, .project-card, .highlight-card, .about-text, .contact-content, .education-block'
  );

  fadeElements.forEach(function (el) {
    el.classList.add('fade-in');
  });

  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.15,
    rootMargin: '0px 0px -40px 0px'
  });

  fadeElements.forEach(function (el) {
    observer.observe(el);
  });


  // ---- Skill bar animation ----
  var skillFills = document.querySelectorAll('.skill-fill');

  var skillObserver = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        var width = entry.target.getAttribute('data-width');
        entry.target.style.width = width + '%';
        skillObserver.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.3
  });

  skillFills.forEach(function (fill) {
    skillObserver.observe(fill);
  });


  // ---- Smooth scroll for anchor links (fallback) ----
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      var target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

});
