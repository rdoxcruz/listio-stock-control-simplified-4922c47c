(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
  new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
  j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
  'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
  })(window,document,'script','dataLayer','GTM-PLSN85MQ');

(function () {
      const wa = document.querySelector("[data-wa]");
      if (!wa) return;
      wa.addEventListener("click", function () {
        // window.dataLayer?.push({ event: "click_whatsapp" });
      });
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
        // init analytics here if needed
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
          const consent = { essential: true, analytics: !!(analyticsToggle && analyticsToggle.checked), ts: Date.now() };
          writeConsent(consent);
          closeBanner(); closeModal();
          applyConsent(consent);
        });
      }

      if (btnClose) btnClose.addEventListener("click", closeModal);

      if (modal){
        modal.addEventListener("click", (e) => { if (e.target === modal) closeModal(); });
      }

      document.addEventListener("keydown", (e) => { if (e.key === "Escape") closeModal(); });
    })();

(function () {
      function initLucide() {
        if (window.lucide && typeof window.lucide.createIcons === "function") {
          window.lucide.createIcons();
        }
      }

      if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", initLucide);
      } else {
        initLucide();
      }

      let tries = 0;
      const t = setInterval(() => {
        tries++;
        if (window.lucide && typeof window.lucide.createIcons === "function") {
          initLucide();
          clearInterval(t);
        }
        if (tries >= 20) clearInterval(t);
      }, 100);
    })();

(function(){
      const btn = document.querySelector("[data-mobile-toggle]");
      const menu = document.getElementById("mobileMenu");
      if(!btn || !menu) return;

      btn.addEventListener("click", () => {
        const isOpen = menu.classList.toggle("is-open");
        btn.setAttribute("aria-expanded", String(isOpen));
      });

      // fecha ao clicar em um link
      menu.querySelectorAll("a").forEach(a => {
        a.addEventListener("click", () => {
          menu.classList.remove("is-open");
          btn.setAttribute("aria-expanded", "false");
        });
      });

      // Submenu de Segmentos no mobile
      const submenuToggle = document.querySelector("[data-mobile-submenu-toggle]");
      const submenu = document.getElementById("mobileSegmentosSubmenu");
      if(submenuToggle && submenu){
        submenuToggle.addEventListener("click", (e) => {
          e.preventDefault();
          submenu.classList.toggle("is-open");
          const icon = submenuToggle.querySelector("i[data-lucide]");
          if(icon){
            const isOpen = submenu.classList.contains("is-open");
            icon.setAttribute("data-lucide", isOpen ? "chevron-up" : "chevron-down");
            if(window.lucide) window.lucide.createIcons();
          }
        });
      }
    })();
