(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
  new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
  j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
  'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
  })(window,document,'script','dataLayer','GTM-PLSN85MQ');

/* Lucide init */
    (function(){
      if (window.lucide && typeof window.lucide.createIcons === "function") {
        window.lucide.createIcons();
      }
    })();

    // Auto year
    (function(){
      const year = document.getElementById("year");
      if (year) year.textContent = String(new Date().getFullYear());
    })();

    // Mobile menu (close on outside click / ESC / link click)
    (function () {
      const toggle = document.querySelector("[data-mobile-toggle]");
      const menu = document.getElementById("mobileMenu");
      if (!toggle || !menu) return;

      function setOpen(isOpen){
        menu.classList.toggle("is-open", isOpen);
        toggle.setAttribute("aria-expanded", String(isOpen));
      }

      toggle.addEventListener("click", () => {
        setOpen(!menu.classList.contains("is-open"));
      });

      menu.addEventListener("click", (e) => {
        const clickable = e.target.closest("a,button");
        if (!clickable) return;
        setOpen(false);
      });

      document.addEventListener("keydown", (e) => {
        if (e.key === "Escape") setOpen(false);
      });

      document.addEventListener("click", (e) => {
        const insideMenu = e.target.closest("#mobileMenu");
        const insideToggle = e.target.closest("[data-mobile-toggle]");
        if (insideMenu || insideToggle) return;
        setOpen(false);
      });
    })();

    // Remove cover if Make doesn't provide URL
    (function(){
      const wrap = document.querySelector("[data-cover-wrap]");
      if (!wrap) return;
      const img = wrap.querySelector("img");
      const src = (img && img.getAttribute("src")) ? img.getAttribute("src").trim() : "";
      if (!src || src === "") wrap.remove();
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
        }catch(e){ return null; }
      }
      function writeConsent(value){
        try{ localStorage.setItem(KEY, JSON.stringify(value)); }catch(e){}
      }

      function openBanner(){ if (banner) banner.classList.add("is-open"); }
      function closeBanner(){ if (banner) banner.classList.remove("is-open"); }

      function openModal(){
        if (!modal) return;
        modal.classList.add("is-open");
        const current = readConsent() || DEFAULTS;
        if (analyticsToggle) analyticsToggle.checked = !!current.analytics;
      }
      function closeModal(){ if (modal) modal.classList.remove("is-open"); }

      function applyConsent(consent){
        // Connect GA4/GTM here according to consent.analytics
      }

      const saved = readConsent();
      if (!saved) openBanner();
      else applyConsent(saved);

      openButtons.forEach(btn => {
        btn.addEventListener("click", () => { closeBanner(); openModal(); });
      });

      if (btnAccept){
        btnAccept.addEventListener("click", () => {
          const consent = { essential: true, analytics: true, ts: Date.now() };
          writeConsent(consent);
          closeBanner(); closeModal();
          applyConsent(consent);
        });
      }

      btnDecline.forEach(btn => {
        btn.addEventListener("click", () => {
          const consent = { essential: true, analytics: false, ts: Date.now() };
          writeConsent(consent);
          closeBanner(); closeModal();
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
          closeBanner(); closeModal();
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
