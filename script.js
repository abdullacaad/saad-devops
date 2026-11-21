// =====================
//  ACTIVE NAV LINK on scroll
// =====================
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link');

function updateActiveLink() {
  const scrollY = window.scrollY + 100;
  let current = '';

  sections.forEach(section => {
    if (scrollY >= section.offsetTop) {
      current = section.getAttribute('id');
    }
  });

  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === `#${current}`) {
      link.classList.add('active');
    }
  });
}

window.addEventListener('scroll', updateActiveLink);
updateActiveLink();


// =====================
//  SMOOTH SCROLL for nav links
// =====================
navLinks.forEach(link => {
  link.addEventListener('click', (e) => {
    const href = link.getAttribute('href');
    if (href.startsWith('#')) {
      e.preventDefault();
      const target = document.querySelector(href);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  });
});


// =====================
//  CONTACT FORM handler
// =====================
function handleForm(e) {
  e.preventDefault();
  const successEl = document.getElementById('form-success');
  successEl.style.display = 'block';
  e.target.reset();
  setTimeout(() => {
    successEl.style.display = 'none';
  }, 4000);
}


// =====================
//  SECTION ENTRANCE ANIMATIONS
// =====================
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, { threshold: 0.08 });

document.querySelectorAll('.section').forEach(section => {
  section.style.opacity = '0';
  section.style.transform = 'translateY(24px)';
  section.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
  observer.observe(section);
});

// Add visible state via CSS
const style = document.createElement('style');
style.textContent = `.section.visible { opacity: 1 !important; transform: none !important; }`;
document.head.appendChild(style);


// =====================
//  CERTIFICATE IMAGE FALLBACK
// =====================
document.querySelectorAll('.cert-image').forEach(image => {
  image.addEventListener('error', () => {
    const placeholder = document.createElement('div');
    placeholder.className = 'cert-placeholder';
    placeholder.innerHTML = '<span>Certificate image coming soon</span>';
    image.replaceWith(placeholder);
  });

});
