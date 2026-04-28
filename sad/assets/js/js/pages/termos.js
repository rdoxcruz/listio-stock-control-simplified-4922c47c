// Icons
    (function(){
      if (window.lucide && typeof window.lucide.createIcons === "function") {
        window.lucide.createIcons();
      }
    })();

    // Ano
    (function(){
      const year = document.getElementById("year");
      if (year) year.textContent = String(new Date().getFullYear());
    })();

    // Menu mobile (funciona + fecha no clique fora + ESC)
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
        const link = e.target.closest("a,button");
        if (!link) return;
        setOpen(false);
      });

      document.addEventListener("click", (e) => {
        const insideMenu = e.target.closest("#mobileMenu");
        const insideToggle = e.target.closest("[data-mobile-toggle]");
        if (insideMenu || insideToggle) return;
        setOpen(false);
      });

      document.addEventListener("keydown", (e) => {
        if (e.key === "Escape") setOpen(false);
      });
    })();
