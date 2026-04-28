/* =========================
   Listio main.js (complete)
   Mobile menu toggle + drawer
   ========================= */

(function () {
  const btn = document.querySelector('[data-mobile-toggle]');
  const menu = document.getElementById('mobileMenu');

  if (!btn || !menu) return;

  // Ensure correct anchors on blog pages (optional safety)
  // If you prefer, remove this block and fix HTML links instead.
  const fixAnchors = () => {
    const isBlog = location.pathname.includes('/blog/');
    if (!isBlog) return;

    const map = new Set(['#como-funciona', '#recursos', '#para-quem', '#faq']);
    menu.querySelectorAll('a[href^="#"]').forEach((a) => {
      if (map.has(a.getAttribute('href'))) {
        a.setAttribute('href', '/' + a.getAttribute('href'));
      }
    });
  };
  fixAnchors();

  // Create overlay + drawer wrapper around existing .mobile-menu content
  const overlay = document.createElement('div');
  overlay.className = 'mobile-overlay';
  overlay.setAttribute('data-mobile-overlay', 'true');

  const drawer = document.createElement('aside');
  drawer.className = 'mobile-drawer';
  drawer.setAttribute('aria-hidden', 'true');

  // Move existing menu content into drawer
  while (menu.firstChild) drawer.appendChild(menu.firstChild);

  // Replace menu content with overlay + drawer
  menu.appendChild(overlay);
  menu.appendChild(drawer);

  function openMenu() {
    document.body.classList.add('mobile-nav-open');
    btn.setAttribute('aria-expanded', 'true');
    drawer.setAttribute('aria-hidden', 'false');
  }

  function closeMenu() {
    document.body.classList.remove('mobile-nav-open');
    btn.setAttribute('aria-expanded', 'false');
    drawer.setAttribute('aria-hidden', 'true');
  }

  btn.addEventListener('click', () => {
    const isOpen = document.body.classList.contains('mobile-nav-open');
    isOpen ? closeMenu() : openMenu();
  });

  overlay.addEventListener('click', closeMenu);

  drawer.addEventListener('click', (e) => {
    const link = e.target.closest('a');
    if (link) closeMenu();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeMenu();
  });

  // Close menu on resize to desktop to avoid stuck state
  window.addEventListener('resize', () => {
    if (window.innerWidth > 860) closeMenu();
  });
})();
