/* =========================================================
   LISTIO floating-menu.js
   Lógica de exibição do módulo de menu flutuante (Scroll)
   ========================================================= */

(function () {
  const floatingNav = document.getElementById('floatingNav');
  
  if (!floatingNav) return;

  // Mostra o menu após rolar suavemente
  const SCROLL_THRESHOLD = 50;

  function onScroll() {
    if (window.scrollY > SCROLL_THRESHOLD) {
      floatingNav.classList.add('is-visible');
    } else {
      floatingNav.classList.remove('is-visible');
    }
  }

  // Throttle simples para otimização de performance
  let ticking = false;
  window.addEventListener('scroll', function() {
    if (!ticking) {
      window.requestAnimationFrame(function() {
        onScroll();
        ticking = false;
      });
      ticking = true;
    }
  }, { passive: true });

  // Checar o estado inicial assim que a página carrega
  onScroll();

  // Lidar com o botão de hamburger mobile no menu flutuante
  const floatingHamburger = document.getElementById('floatingNavHamburger');
  if (floatingHamburger) {
    floatingHamburger.addEventListener('click', function() {
      // Tenta abrir o menu do index.html ou precos/index.html
      const btnIndex = document.getElementById('lmHamburger'); // index.html
      const btnPrecos = document.querySelector('[data-mobile-toggle]'); // precos.html
      
      if (btnIndex) {
        btnIndex.click();
      } else if (btnPrecos) {
        btnPrecos.click();
      }
    });
  }
})();
