(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
  new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
  j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
  'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
  })(window,document,'script','dataLayer','GTM-PLSN85MQ');

/* =========================
      Lucide init
    ========================== */
    (function(){
      if (window.lucide && typeof window.lucide.createIcons === "function") {
        window.lucide.createIcons();
      }
    })();

    /* =========================
      Menu mobile + tracking simples
    ========================== */
    (function () {
      const toggle = document.querySelector('[data-mobile-toggle]');
      const menu = document.getElementById('mobileMenu');
      if (!toggle || !menu) return;

      function setOpen(isOpen){
        menu.classList.toggle('is-open', isOpen);
        toggle.setAttribute('aria-expanded', String(isOpen));
      }

      toggle.addEventListener('click', () => {
        const isOpen = menu.classList.contains('is-open');
        setOpen(!isOpen);
      });

      menu.addEventListener('click', (e) => {
        const link = e.target.closest('a');
        if (!link) return;
        setOpen(false);
      });

      document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') setOpen(false);
      });

      document.addEventListener('click', (e) => {
        const el = e.target.closest('[data-track]');
        if (!el) return;
        const ev = el.getAttribute('data-track');
        console.log('[track]', ev);
      });
    })();

    /* =========================
      Contador suave nas métricas
    ========================== */
    (function(){
      const els = document.querySelectorAll('.trust__metric[data-counter]');
      if (!els.length) return;

      const formatBR = (n) => {
        try { return new Intl.NumberFormat('pt-BR').format(n); }
        catch { return String(n); }
      };

      const animate = (el) => {
        const target = Number(el.getAttribute('data-counter') || '0');
        if (!target) return;

        const start = 0;
        const duration = 650;
        const t0 = performance.now();

        function frame(t){
          const p = Math.min(1, (t - t0) / duration);
          const eased = 1 - Math.pow(1 - p, 3);
          const value = Math.round(start + (target - start) * eased);
          el.textContent = `+${formatBR(value)}`;
          if (p < 1) requestAnimationFrame(frame);
        }
        requestAnimationFrame(frame);
      };

      const io = new IntersectionObserver((entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting){
            animate(e.target);
            io.unobserve(e.target);
          }
        });
      }, { threshold: 0.35 });

      els.forEach(el => io.observe(el));
    })();

    /* =========================
      FAQ: abre 1 por vez
    ========================== */
    (function(){
      const root = document.querySelector('[data-faq]');
      if (!root) return;

      const items = Array.from(root.querySelectorAll('details.faq__item'));

      root.addEventListener('toggle', (e) => {
        const current = e.target;
        if (!(current instanceof HTMLDetailsElement)) return;
        if (!current.open) return;

        items.forEach((it) => {
          if (it !== current) it.open = false;
        });
      }, true);
    })();

    /* =========================
      Ano automático no rodapé
    ========================== */
    (function(){
      const year = document.getElementById("year");
      if (year) year.textContent = String(new Date().getFullYear());
    })();

(function(){
      const KEY = "listio_cookie_consent_v1";
      const DEFAULTS = { essential: true, analytics: false };

      const banner = document.querySelector("[data-cookie-banner]");
      const modal  = document.querySelector("[data-cookie-modal]");
      const openButtons = document.querySelectorAll("[data-open-cookie-settings]");

      const btnAccept  = document.querySelector("[data-cookie-accept]");
      const btnDecline = document.querySelectorAll("[data-cookie-decline]");
      const btnSave    = document.querySelector("[data-cookie-save]");
      const btnClose   = document.querySelector("[data-cookie-close]");
      const analyticsToggle = document.querySelector("[data-cookie-analytics]");

      function readConsent(){
        try{
          const raw = localStorage.getItem(KEY);
          return raw ? JSON.parse(raw) : null;
        }catch(e){
          return null;
        }
      }

      function writeConsent(value){
        try{
          localStorage.setItem(KEY, JSON.stringify(value));
        }catch(e){}
      }

      function openBanner(){
        if (!banner) return;
        banner.classList.add("is-open");
      }

      function closeBanner(){
        if (!banner) return;
        banner.classList.remove("is-open");
      }

      function openModal(){
        if (!modal) return;
        modal.classList.add("is-open");
        const current = readConsent() || DEFAULTS;
        if (analyticsToggle) analyticsToggle.checked = !!current.analytics;
      }

      function closeModal(){
        if (!modal) return;
        modal.classList.remove("is-open");
      }

      function applyConsent(consent){
        // Conecte GA4/GTM aqui se quiser condicionar analytics
        // console.log("[consent]", consent);
      }

      const saved = readConsent();
      if (!saved) openBanner();
      else applyConsent(saved);

      openButtons.forEach(btn => {
        btn.addEventListener("click", () => {
          closeBanner();
          openModal();
        });
      });

      if (btnAccept){
        btnAccept.addEventListener("click", () => {
          const consent = { essential: true, analytics: true, ts: Date.now() };
          writeConsent(consent);
          closeBanner();
          closeModal();
          applyConsent(consent);
        });
      }

      btnDecline.forEach(btn => {
        btn.addEventListener("click", () => {
          const consent = { essential: true, analytics: false, ts: Date.now() };
          writeConsent(consent);
          closeBanner();
          closeModal();
          applyConsent(consent);
        });
      });

      if (btnSave){
        btnSave.addEventListener("click", () => {
          const consent = {
            essential: true,
            analytics: !!(analyticsToggle && analyticsToggle.checked),
            ts: Date.now()
          };
          writeConsent(consent);
          closeBanner();
          closeModal();
          applyConsent(consent);
        });
      }

      if (btnClose) btnClose.addEventListener("click", closeModal);

      if (modal){
        modal.addEventListener("click", (e) => {
          if (e.target === modal) closeModal();
        });
      }

      document.addEventListener("keydown", (e) => {
        if (e.key === "Escape") closeModal();
      });
    })();
