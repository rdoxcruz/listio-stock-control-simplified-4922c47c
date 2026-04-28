/* =========================================================
   LISTIO nav.js
   - Mobile drawer (overlay + aside)
   - Desktop dropdown (Segmentos / Segments / Segmentos)
   - Mobile submenu accordion
   - Language switcher dropdown
   - Blog anchor fix
   ========================================================= */

(function () {
  'use strict';

  /* ── Mobile Drawer ──────────────────────────────────────── */
  const btn   = document.querySelector('[data-mobile-toggle]');
  const mount = document.getElementById('mobileMenu');

  if (btn && mount && mount.dataset.mounted !== 'true') {
    mount.dataset.mounted = 'true';

    /* middle hamburger bar */
    if (!btn.querySelector('.hamburger-mid')) {
      const mid = document.createElement('span');
      mid.className = 'hamburger-mid';
      mid.setAttribute('aria-hidden', 'true');
      btn.appendChild(mid);
    }

    /* fix anchor links on blog pages */
    if (location.pathname.includes('/blog/')) {
      mount.querySelectorAll('a[href^="#"]').forEach(a => {
        const h = a.getAttribute('href');
        if (h) a.setAttribute('href', '/' + h);
      });
    }

    /* build overlay + drawer */
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

    btn.addEventListener('click', e => {
      e.preventDefault();
      document.body.classList.contains('mobile-nav-open') ? closeMenu() : openMenu();
    });

    overlay.addEventListener('click', closeMenu);

    drawer.addEventListener('click', e => {
      if (e.target.closest('a')) closeMenu();
    });

    document.addEventListener('keydown', e => {
      if (e.key === 'Escape') { closeMenu(); }
    });

    window.addEventListener('resize', () => {
      if (window.innerWidth > 980) closeMenu();
    });

    /* ── Mobile Submenu accordion ─────────────────────────── */
    drawer.querySelectorAll('[data-mobile-submenu-toggle]').forEach(toggle => {
      const item    = toggle.closest('.mobile-menu__item');
      const submenu = item && item.querySelector('.mobile-menu__submenu');
      if (!submenu) return;

      toggle.addEventListener('click', () => {
        const open = item.classList.contains('is-open');
        item.classList.toggle('is-open', !open);
        toggle.setAttribute('aria-expanded', String(!open));
        submenu.style.maxHeight = open ? '0' : submenu.scrollHeight + 'px';
      });
    });
  }

  /* ── Desktop Dropdown ───────────────────────────────────── */
  document.querySelectorAll('.nav__dropdown').forEach(dd => {
    const toggle = dd.querySelector('.nav__dropdown-toggle');
    const menu   = dd.querySelector('.nav__dropdown-menu');
    if (!toggle || !menu) return;

    const open  = () => { dd.classList.add('is-open');    toggle.setAttribute('aria-expanded', 'true');  };
    const close = () => { dd.classList.remove('is-open'); toggle.setAttribute('aria-expanded', 'false'); };

    toggle.addEventListener('click', e => {
      e.stopPropagation();
      dd.classList.contains('is-open') ? close() : open();
    });

    document.addEventListener('click', e => { if (!dd.contains(e.target)) close(); });
    document.addEventListener('keydown', e => { if (e.key === 'Escape') close(); });
  });

  /* ── Language Switcher ──────────────────────────────────── */
  document.querySelectorAll('.lang-switcher').forEach(sw => {
    const current = sw.querySelector('.lang-switcher__current');
    if (!current) return;

    current.addEventListener('click', e => {
      e.stopPropagation();
      sw.classList.toggle('is-open');
    });

    document.addEventListener('click', e => {
      if (!sw.contains(e.target)) sw.classList.remove('is-open');
    });

    document.addEventListener('keydown', e => {
      if (e.key === 'Escape') sw.classList.remove('is-open');
    });
  });

  /* ── Lucide icons ───────────────────────────────────────── */
  if (typeof lucide !== 'undefined') lucide.createIcons();
})();
