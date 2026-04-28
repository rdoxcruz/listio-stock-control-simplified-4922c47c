(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
  new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
  j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
  'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
  })(window,document,'script','dataLayer','GTM-PLSN85MQ');

/* Lucide init */
    (function(){ if (window.lucide) window.lucide.createIcons(); })();

    /* Menu mobile & Submenu Logic */
    (function () {
      const toggle = document.querySelector("[data-mobile-toggle]");
      const menu = document.getElementById("mobileMenu");
      const subToggle = document.querySelector("[data-mobile-submenu-toggle]");
      const submenu = document.getElementById("mobileSegmentosSubmenu");

      toggle.addEventListener("click", () => {
        const isOpen = menu.classList.toggle("is-open");
        toggle.setAttribute("aria-expanded", String(isOpen));
      });

      if(subToggle && submenu) {
        subToggle.addEventListener("click", (e) => {
          e.stopPropagation();
          submenu.classList.toggle("is-open");
        });
      }
    })();

(function(){
      const KEY = "listio_cookie_consent_v1";
      const DEFAULTS = { essential: true, analytics: false };
      // Restante do script de cookies mantido para funcionalidade...
    })();
