/* ==================================
   LISTIO main.js
   - Mobile drawer menu (overlay)
   - Fixes anchor links on /blog/*
   - Close on ESC / overlay / link click
   ==================================
   NOTE: Se nav.js estiver incluído, este arquivo é redundante.
   Mantido para compatibilidade com páginas que não incluem nav.js.
   ================================== */

(function () {
  const btn   = document.querySelector('[data-mobile-toggle]');
  const mount = document.getElementById('mobileMenu');

  if (!btn || !mount) return;

  /* Guard: evita montar duas vezes */
  if (mount.dataset.mounted === 'true') return;
  mount.dataset.mounted = 'true';

  /* Garante a barrinha do meio do hamburger */
  if (!btn.querySelector('.hamburger-mid')) {
    const mid = document.createElement('span');
    mid.className = 'hamburger-mid';
    mid.setAttribute('aria-hidden', 'true');
    btn.appendChild(mid);
  }

  /* Corrige anchors no blog (#faq -> /#faq) */
  const isBlog = location.pathname.includes('/blog/');
  if (isBlog) {
    mount.querySelectorAll('a[href^="#"]').forEach((a) => {
      const href = a.getAttribute('href');
      if (href) a.setAttribute('href', '/' + href);
    });
  }

  /* Monta overlay + drawer */
  const overlay = document.createElement('div');
  overlay.className = 'mobile-overlay';

  const drawer = document.createElement('aside');
  drawer.className = 'mobile-drawer';
  drawer.setAttribute('aria-hidden', 'true');

  while (mount.firstChild) drawer.appendChild(mount.firstChild);

  mount.appendChild(overlay);
  mount.appendChild(drawer);

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

  btn.addEventListener('click', (e) => {
    e.preventDefault();
    const isOpen = document.body.classList.contains('mobile-nav-open');
    isOpen ? closeMenu() : openMenu();
  });

  overlay.addEventListener('click', closeMenu);

  drawer.addEventListener('click', (e) => {
    if (e.target.closest('a')) closeMenu();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeMenu();
  });

  window.addEventListener('resize', () => {
    if (window.innerWidth > 980) closeMenu();
  });
})();
