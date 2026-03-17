// Theme toggle
const toggleBtn = document.getElementById('theme-toggle');
toggleBtn.addEventListener('click', () => {
  const html = document.documentElement;
  const current = html.getAttribute('data-theme');
  const next = current === 'dark' ? 'light' : 'dark';
  html.setAttribute('data-theme', next);
  localStorage.setItem('theme', next);
  toggleBtn.textContent = next === 'dark' ? '🌙' : '☀️';
});

// Load saved theme
document.addEventListener('DOMContentLoaded', () => {
  const saved = localStorage.getItem('theme');
  if(saved) document.documentElement.setAttribute('data-theme', saved);
});

// Typewriter
const typewriter = document.getElementById('typewriter');
const frases = ["Estudante de TI", "Interessada em Pedagogia", "Desenvolvendo Projetos"];
let idx = 0, char = 0, erase = false;

function type() {
  if(!erase && char < frases[idx].length) {
    typewriter.textContent += frases[idx][char++];
    setTimeout(type, 80);
  } else if(erase && char > 0) {
    typewriter.textContent = frases[idx].substring(0, char--);
    setTimeout(type, 40);
  } else {
    erase = !erase;
    if(!erase) idx = (idx + 1) % frases.length;
    setTimeout(type, 1500);
  }
}
type();

// IntersectionObserver for animations
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if(entry.isIntersecting) entry.target.classList.add('visible');
  });
}, { threshold: 0.1 });

document.querySelectorAll('.animate-on-scroll').forEach(el => observer.observe(el));

// Stubs for tilt, particles, scroll bar, modal lightbox, cursor, etc.
// Implementações completas podem ser adicionadas conforme especificação detalhada