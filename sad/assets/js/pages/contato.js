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

    // Ano automático
    (function(){
      const year = document.getElementById("year");
      if (year) year.textContent = String(new Date().getFullYear());
    })();

    // Menu mobile (fecha ao clicar fora / ESC / click em link)
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

    // WhatsApp submit + copy
    (function(){
      const WHATSAPP_NUMBER = "5519974013453"; // 55 + DDD + número
      const form = document.getElementById("contactForm");
      const copyBtn = document.getElementById("copyBtn");
      const hint = document.getElementById("hint");

      function buildMessage(){
        const name = (document.getElementById("name").value || "").trim();
        const store = (document.getElementById("store").value || "").trim();
        const subject = (document.getElementById("subject").value || "").trim();
        const message = (document.getElementById("message").value || "").trim();

        const lines = [
          "Olá! Vim pelo site do Listio.",
          "",
          `Nome: ${name || "-"}`,
          `Loja: ${store || "-"}`,
          `Assunto: ${subject || "-"}`,
          "",
          message || "-"
        ];
        return lines.join("\n");
      }

      function openWhatsApp(){
        const text = buildMessage();
        const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
        window.open(url, "_blank", "noopener,noreferrer");
      }

      function validate(){
        const requiredIds = ["name","subject","message"];
        let ok = true;

        requiredIds.forEach((id) => {
          const el = document.getElementById(id);
          const value = (el.value || "").trim();
          if (!value){
            ok = false;
            el.style.borderColor = "rgba(41,41,41,.30)";
            el.style.background = "rgba(212,218,66,.12)";
          } else {
            el.style.borderColor = "rgba(41,41,41,.14)";
            el.style.background = "#FFFFFF";
          }
        });

        hint.textContent = ok
          ? "Ao enviar, você será redirecionado para o WhatsApp com a mensagem preenchida."
          : "Preencha Nome, Assunto e Mensagem para enviar.";

        return ok;
      }

      form.addEventListener("submit", (e) => {
        e.preventDefault();
        if (!validate()) return;
        openWhatsApp();
      });

      copyBtn.addEventListener("click", async () => {
        const text = buildMessage();
        try{
          await navigator.clipboard.writeText(text);
          hint.textContent = "Mensagem copiada. Agora é só colar no WhatsApp.";
        }catch{
          hint.textContent = "Não consegui copiar automaticamente. Selecione e copie o texto manualmente.";
        }
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
        // Conecte GA4/GTM aqui conforme consent.analytics
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
