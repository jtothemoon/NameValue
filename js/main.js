// Nav scroll shadow
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 10);
});

// Mobile hamburger menu
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('open');
  navLinks.classList.toggle('open');
});

// Close menu when a nav link is clicked
navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('open');
    navLinks.classList.remove('open');
  });
});

// Fade-up on scroll
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.fade-up').forEach(el => observer.observe(el));

// Mockup PNG download
function downloadMockup(index, filename) {
  const cards = document.querySelectorAll('.mockup-card');
  const target = cards[index];
  const btn = target.querySelector('.mockup-download');
  btn.style.display = 'none';
  html2canvas(target, {
    backgroundColor: '#0F172A',
    scale: 2
  }).then(canvas => {
    btn.style.display = '';
    const link = document.createElement('a');
    link.download = filename;
    link.href = canvas.toDataURL('image/png');
    link.click();
  });
}

// Form submit (visual only)
function handleSubmit() {
  const company = document.getElementById('company').value;
  const name = document.getElementById('name').value;
  const email = document.getElementById('email').value;
  const size = document.getElementById('size').value;

  if (!company || !name || !email || !size) {
    alert('모든 항목을 입력해주세요.');
    return;
  }

  const btn = document.querySelector('.form-submit');
  btn.textContent = '문의가 접수되었습니다!';
  btn.style.background = '#10B981';
  btn.disabled = true;
}
