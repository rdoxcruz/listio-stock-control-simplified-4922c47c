(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
  new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
  j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
  'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
  })(window,document,'script','dataLayer','GTM-PLSN85MQ');

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

      menu.querySelectorAll("a").forEach(a => {
        a.addEventListener("click", () => {
          menu.classList.remove("is-open");
          btn.setAttribute("aria-expanded", "false");
        });
      });

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
