// ─── HAMBURGER ────────────────────────────────────────────────
(function () {
  const burger = document.getElementById('hamburger');
  const navList = document.getElementById('nav-links');

  burger.addEventListener('click', () => {
    const isOpen = navList.classList.toggle('open');
    burger.classList.toggle('active', isOpen);
    burger.setAttribute('aria-expanded', isOpen);
  });

  // Tutup menu saat klik link di dalamnya
  navList.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      navList.classList.remove('open');
      burger.classList.remove('active');
      burger.setAttribute('aria-expanded', false);
    });
  });

  // Tutup menu saat klik di luar navbar
  document.addEventListener('click', (e) => {
    if (!e.target.closest('.navbar')) {
      navList.classList.remove('open');
      burger.classList.remove('active');
      burger.setAttribute('aria-expanded', false);
    }
  });
})();
const toggle = document.getElementById('theme-toggle');
const root = document.documentElement;

// Load saved theme
const saved = localStorage.getItem('eco-theme') || 'light';
root.setAttribute('data-theme', saved);
toggle.textContent = saved === 'dark' ? '☀️' : '🌙';

toggle.addEventListener('click', () => {
  const current = root.getAttribute('data-theme');
  const next = current === 'dark' ? 'light' : 'dark';
  root.setAttribute('data-theme', next);
  localStorage.setItem('eco-theme', next);
  toggle.textContent = next === 'dark' ? '☀️' : '🌙';
});
