/**
 * components.js — Listio
 * Header (nav + drawer mobile), Footer e Floating Nav reutilizáveis.
 * Substitui floating-menu.js e nav.js — não são necessários em páginas que usam este arquivo.
 *
 * Como usar em qualquer página:
 *   1. Adicione no <head>:
 *        <link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;700&family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet">
 *        <script src="https://unpkg.com/lucide@latest"></script>
 *        <link href="/assets/css/floating-menu.css" rel="stylesheet" />
 *        <script src="/components.js" defer></script>
 *
 *   2. No <body>, coloque os slots:
 *        <div id="site-header"></div>
 *        ... conteúdo da página ...
 *        <div id="site-footer"></div>
 *        <div id="site-floating-nav"></div>
 */

/* ============================================================
   ESTILOS COMPARTILHADOS DO HEADER
   (necessários em páginas que não herdam os estilos da home)
   ============================================================ */
const HEADER_STYLES = `
<style>
  .lm-header {
    background: #f5f5eb;
    position: relative;
    z-index: 100;
    font-family: 'Space Grotesk', system-ui, sans-serif;
  }
  .lm-nav {
    max-width: 1100px;
    margin: 0 auto;
    padding: 22px 40px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 24px;
    position: relative;
    z-index: 10;
  }
  .lm-logo {
    font-family: 'Space Grotesk', sans-serif;
    font-size: 38px;
    font-weight: 700;
    color: #0e0e0c;
    text-decoration: none;
    letter-spacing: -0.05em;
  }
  .lm-links {
    display: flex;
    align-items: center;
    gap: 28px;
    list-style: none;
    padding: 0;
    margin: 0;
  }
  .lm-links a {
    font-family: 'Inter', sans-serif;
    font-size: 14px;
    font-weight: 500;
    color: #0e0e0c;
    text-decoration: none;
    transition: color 0.15s;
  }
  .lm-links a.active,
  .lm-links a[aria-current="page"] {
    font-weight: 700;
  }
  @media(max-width: 860px) { .lm-links { display: none; } }
  .lm-nav-ctas { display: flex; align-items: center; gap: 10px; }
  .lm-btn-ghost {
    font-family: 'Inter', sans-serif;
    font-size: 14px;
    font-weight: 600;
    color: rgba(14,14,12,0.65);
    text-decoration: none;
    padding: 9px 16px;
    border-radius: 100px;
    transition: background 0.15s, color 0.15s;
  }
  .lm-btn-ghost:hover { background: rgba(0,0,0,0.07); color: #0e0e0c; }
  .lm-btn-dark {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    background: #0e0e0c;
    color: #f5f5eb;
    font-family: 'Inter', sans-serif;
    font-size: 14px;
    font-weight: 700;
    padding: 10px 20px;
    border-radius: 100px;
    text-decoration: none;
    transition: background 0.15s;
  }
  .lm-btn-dark:hover { background: #2a2a28; }
  .lm-hamburger {
    display: none;
    align-items: center;
    justify-content: center;
    background: rgba(0,0,0,0.08);
    border: none;
    border-radius: 10px;
    padding: 8px;
    cursor: pointer;
    color: #0e0e0c;
    flex-shrink: 0;
    transition: background 0.15s;
  }
  .lm-hamburger:hover { background: rgba(0,0,0,0.14); }
  @media(max-width: 860px) {
    .lm-hamburger { display: flex; }
    .lm-btn-dark--desktop { display: none; }
    .lm-btn-ghost { display: none; }
    .lm-lang { display: none; }
  }
  /* Dropdown */
  .lm-dropdown { position: relative; list-style: none; }
  .lm-dropdown-btn {
    display: flex; align-items: center; gap: 5px;
    background: none; border: none; cursor: pointer; outline: none;
    font-family: 'Inter', sans-serif; font-size: 14px; font-weight: 500;
    color: rgba(14,14,12,0.65); padding: 0; margin: 0;
    transition: color 0.15s;
  }
  .lm-dropdown-btn:hover { color: #0e0e0c; }
  .lm-dropdown-menu {
    display: none; position: absolute; top: calc(100% + 14px); left: 50%;
    transform: translateX(-50%);
    background: #fff; border-radius: 14px;
    box-shadow: 0 8px 32px rgba(0,0,0,0.12);
    padding: 8px; min-width: 260px; z-index: 200; flex-direction: column;
  }
  .lm-dropdown:hover .lm-dropdown-menu { display: flex; }
  .lm-dropdown-menu a {
    font-family: 'Inter', sans-serif; font-size: 13px; font-weight: 500;
    color: #444440; text-decoration: none; padding: 8px 12px;
    border-radius: 8px; white-space: nowrap; transition: background 0.12s;
  }
  .lm-dropdown-menu a:hover { background: #f5f4ee; color: #0e0e0c; }
  /* Lang */
  .lm-lang { position: relative; }
  .lm-lang-current {
    display: flex; align-items: center; gap: 4px; cursor: pointer;
    font-family: 'Inter', sans-serif; font-size: 13px; font-weight: 600;
    color: rgba(14,14,12,0.55); padding: 6px 8px; border-radius: 8px;
    transition: background 0.15s; user-select: none;
  }
  .lm-lang-current:hover { background: rgba(0,0,0,0.07); }
  .lm-lang-menu {
    display: none; position: absolute; top: calc(100% + 8px); right: 0;
    background: #fff; border-radius: 10px;
    box-shadow: 0 6px 20px rgba(0,0,0,0.1);
    padding: 6px; z-index: 200; flex-direction: column; min-width: 60px;
  }
  .lm-lang:hover .lm-lang-menu { display: flex; }
  .lm-lang-menu a {
    font-family: 'Inter', sans-serif; font-size: 13px; font-weight: 600;
    color: #444440; text-decoration: none; padding: 6px 16px;
    border-radius: 6px; text-align: center; white-space: nowrap;
    transition: background 0.12s;
  }
  .lm-lang-menu a:hover { background: #f5f4ee; }
  /* Drawer */
  .lm-drawer__overlay {
    display: none; position: fixed; inset: 0;
    background: rgba(0,0,0,0.5); z-index: 299; backdrop-filter: blur(2px);
  }
  .lm-drawer__overlay.open { display: block; }
  .lm-drawer {
    position: fixed; top: 0; right: 0;
    width: min(360px, 90vw); height: 100dvh;
    background: #0e0e0c; z-index: 300;
    display: flex; flex-direction: column;
    transform: translateX(110%);
    transition: transform 0.3s cubic-bezier(0.4,0,0.2,1);
  }
  .lm-drawer.open { transform: translateX(0); }
  .lm-drawer__header {
    display: flex; align-items: center; justify-content: space-between;
    padding: 20px 24px;
    border-bottom: 1px solid rgba(255,255,255,0.07); flex-shrink: 0;
  }
  .lm-drawer__logo {
    font-family: 'Space Grotesk', sans-serif; font-size: 26px; font-weight: 700;
    color: #C8F135; letter-spacing: -0.04em;
  }
  .lm-drawer__close {
    background: rgba(255,255,255,0.07); border: none; border-radius: 8px;
    padding: 7px; cursor: pointer; color: rgba(240,241,233,0.6);
    display: flex; align-items: center; justify-content: center;
    transition: background 0.15s, color 0.15s;
  }
  .lm-drawer__close:hover { background: rgba(255,255,255,0.12); color: #f0f1e9; }
  .lm-drawer__links {
    flex: 1; display: flex; flex-direction: column;
    padding: 8px 12px; overflow-y: auto;
  }
  .lm-drawer__link {
    font-family: 'Inter', sans-serif; font-size: 17px; font-weight: 500;
    color: rgba(240,241,233,0.65); text-decoration: none;
    padding: 14px 12px; border-radius: 10px;
    transition: background 0.15s, color 0.15s;
  }
  .lm-drawer__link:hover { background: rgba(255,255,255,0.05); color: #f0f1e9; }
  .lm-drawer__details summary::-webkit-details-marker { display: none; }
  .lm-drawer__details summary { list-style: none; }
  .lm-drawer__details[open] summary svg { transform: rotate(180deg); }
  .lm-drawer__details summary svg { transition: transform 0.2s ease; }
  .lm-drawer__footer {
    padding: 16px 24px 32px;
    border-top: 1px solid rgba(255,255,255,0.07);
    display: flex; flex-direction: column; gap: 10px; flex-shrink: 0;
  }
  .lm-drawer__login {
    font-family: 'Inter', sans-serif; font-size: 15px; font-weight: 600;
    color: rgba(240,241,233,0.45); text-decoration: none;
    text-align: center; padding: 10px; border-radius: 100px;
    transition: color 0.15s;
  }
  .lm-drawer__login:hover { color: #f0f1e9; }
  .lm-drawer__cta {
    display: flex; align-items: center; justify-content: center; gap: 8px;
    background: #C8F135; color: #0e0e0c;
    font-family: 'Inter', sans-serif; font-size: 16px; font-weight: 700;
    padding: 15px 24px; border-radius: 100px; text-decoration: none;
    transition: background 0.15s;
  }
  .lm-drawer__cta:hover { background: #d5f048; }
</style>`;

/* ============================================================
   HTML DO HEADER (nav + drawer + overlay)
   Nav agora é elemento independente, fora do lm-wrap do hero.
   ============================================================ */
const HEADER_HTML = `
${HEADER_STYLES}
<header class="lm-header">
  <nav class="lm-nav" role="banner" aria-label="Navegação principal">
    <a class="lm-logo" href="/">listio</a>
    <ul class="lm-links">
      <li><a href="/#como-funciona">Como funciona</a></li>
      <li><a href="/#recursos">Recursos</a></li>
      <li class="lm-dropdown">
        <button class="lm-dropdown-btn" type="button">Segmentos
          <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
            <polyline points="6 9 12 15 18 9"/>
          </svg>
        </button>
        <div class="lm-dropdown-menu" role="menu">
          <a href="/segmentos/lojas-de-conveniencia">Lojas de Conveniência</a>
          <a href="/segmentos/lojas-de-suplementos">Lojas de Suplementos</a>
          <a href="/segmentos/mercados-de-bairro-mercearias">Mercados de Bairro / Mercearias</a>
          <a href="/segmentos/distribuidores">Distribuidores</a>
          <a href="/segmentos/bebidas">Bebidas (Adegas, Distribuidoras, Depósitos)</a>
          <a href="/segmentos/restaurantes-bares">Restaurantes &amp; Bares</a>
          <a href="/segmentos/farmacias-perfumarias">Farmácias &amp; Perfumarias</a>
          <a href="/segmentos/lojas-de-cosmeticos-beleza">Lojas de Cosméticos e Beleza</a>
          <a href="/segmentos/lojas-de-roupas">Lojas de Roupas</a>
          <a href="/segmentos/material-de-construcao">Lojas de Material de Construção</a>
          <a href="/segmentos/e-commerce">E-commerce Pequeno e Médio</a>
          <a href="/segmentos/cafeterias-torrefacoes">Cafeterias &amp; Torrefações</a>
          <a href="/segmentos/emporios-lojas-especializadas">Empórios &amp; Lojas Especializadas</a>
          <a href="/segmentos/pet-shops-agropecuaria">Pet Shops e Agropecuária</a>
          <a href="/segmentos/auto-pecas">Auto Peças</a>
        </div>
      </li>
      <li><a href="/precos">Preço</a></li>
      <li><a href="/#faq">Dúvidas</a></li>
      <li><a href="/contato">Contato</a></li>
    </ul>
    <div class="lm-nav-ctas">
      <div class="lm-lang" aria-label="Idioma">
        <span class="lm-lang-current" tabindex="0">PT
          <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
            <polyline points="6 9 12 15 18 9"/>
          </svg>
        </span>
        <div class="lm-lang-menu">
          <a href="/" hreflang="pt-BR" aria-current="true">PT</a>
          <a href="/en/" hreflang="en">EN</a>
          <a href="/es/" hreflang="es">ES</a>
        </div>
      </div>
      <a class="lm-btn-ghost" href="https://app.listio.com.br/login">Entrar</a>
      <a class="lm-btn-dark lm-btn-dark--desktop" href="https://app.listio.com.br/cadastro">Começar grátis</a>
      <button class="lm-hamburger" id="lmHamburger" aria-label="Abrir menu" aria-expanded="false" type="button">
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
          <line x1="3" y1="6" x2="21" y2="6"/>
          <line x1="3" y1="12" x2="21" y2="12"/>
          <line x1="3" y1="18" x2="21" y2="18"/>
        </svg>
      </button>
    </div>
  </nav>
</div>

<!-- Drawer mobile -->
<div class="lm-drawer" id="lmDrawer" role="navigation" aria-label="Menu mobile">
  <div class="lm-drawer__header">
    <span class="lm-drawer__logo">listio</span>
    <button class="lm-drawer__close" id="lmDrawerClose" aria-label="Fechar menu" type="button">
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
        <line x1="18" y1="6" x2="6" y2="18"/>
        <line x1="6" y1="6" x2="18" y2="18"/>
      </svg>
    </button>
  </div>
  <div class="lm-drawer__links">
    <a class="lm-drawer__link" href="/#como-funciona">Como funciona</a>
    <a class="lm-drawer__link" href="/#recursos">Recursos</a>
    <details class="lm-drawer__details">
      <summary class="lm-drawer__link" style="display:flex;justify-content:space-between;align-items:center;width:100%;cursor:pointer;">
        Segmentos
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
          <polyline points="6 9 12 15 18 9"/>
        </svg>
      </summary>
      <div class="lm-drawer__submenu" style="padding-left:16px;margin-top:8px;display:flex;flex-direction:column;gap:12px;margin-bottom:8px;">
        <a class="lm-drawer__link" style="font-size:16px;font-weight:500;color:#66665e;" href="/segmentos/lojas-de-conveniencia">Lojas de Conveniência</a>
        <a class="lm-drawer__link" style="font-size:16px;font-weight:500;color:#66665e;" href="/segmentos/lojas-de-suplementos">Lojas de Suplementos</a>
        <a class="lm-drawer__link" style="font-size:16px;font-weight:500;color:#66665e;" href="/segmentos/mercados-de-bairro-mercearias">Mercados de Bairro / Mercearias</a>
        <a class="lm-drawer__link" style="font-size:16px;font-weight:500;color:#66665e;" href="/segmentos/distribuidores">Distribuidores</a>
        <a class="lm-drawer__link" style="font-size:16px;font-weight:500;color:#66665e;" href="/segmentos/bebidas">Bebidas (Adegas, Distribuidoras)</a>
        <a class="lm-drawer__link" style="font-size:16px;font-weight:500;color:#66665e;" href="/segmentos/restaurantes-bares">Restaurantes &amp; Bares</a>
        <a class="lm-drawer__link" style="font-size:16px;font-weight:500;color:#66665e;" href="/segmentos/farmacias-perfumarias">Farmácias &amp; Perfumarias</a>
        <a class="lm-drawer__link" style="font-size:16px;font-weight:500;color:#66665e;" href="/segmentos/lojas-de-cosmeticos-beleza">Cosméticos e Beleza</a>
        <a class="lm-drawer__link" style="font-size:16px;font-weight:500;color:#66665e;" href="/segmentos/lojas-de-roupas">Lojas de Roupas</a>
        <a class="lm-drawer__link" style="font-size:16px;font-weight:500;color:#66665e;" href="/segmentos/material-de-construcao">Material de Construção</a>
        <a class="lm-drawer__link" style="font-size:16px;font-weight:500;color:#66665e;" href="/segmentos/e-commerce">E-commerce Pequeno e Médio</a>
        <a class="lm-drawer__link" style="font-size:16px;font-weight:500;color:#66665e;" href="/segmentos/cafeterias-torrefacoes">Cafeterias &amp; Torrefações</a>
        <a class="lm-drawer__link" style="font-size:16px;font-weight:500;color:#66665e;" href="/segmentos/emporios-lojas-especializadas">Empórios &amp; Lojas Especializadas</a>
        <a class="lm-drawer__link" style="font-size:16px;font-weight:500;color:#66665e;" href="/segmentos/pet-shops-agropecuaria">Pet Shops e Agropecuária</a>
        <a class="lm-drawer__link" style="font-size:16px;font-weight:500;color:#66665e;" href="/segmentos/auto-pecas">Auto Peças</a>
      </div>
    </details>
    <a class="lm-drawer__link" href="/precos">Preços</a>
    <a class="lm-drawer__link" href="/#faq">Dúvidas</a>
    <a class="lm-drawer__link" href="/contato">Contato</a>
  </div>
  <div class="lm-drawer__footer">
    <a class="lm-drawer__login" href="https://app.listio.com.br/login">Entrar</a>
    <a class="lm-drawer__cta" href="https://app.listio.com.br/cadastro">
      Começar grátis
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
        <line x1="5" y1="12" x2="19" y2="12"/>
        <polyline points="12 5 19 12 12 19"/>
      </svg>
    </a>
  </div>
</div>
<div class="lm-drawer__overlay" id="lmDrawerOverlay"></div>
</header>
`;

/* ============================================================
   ESTILOS DO FOOTER
   (extraídos do page-index.css — autocontidos, sem dependências externas)
   ============================================================ */
const FOOTER_STYLES = `
<style>
  .listio-footer {
    background: #0e0e0c;
    color: #ffffff;
  }
  .listio-footer__inner {
    width: min(1120px, calc(100% - 44px));
    margin-inline: auto;
    padding: 56px 0 28px;
    display: grid;
    gap: 40px;
  }
  .listio-footer__top {
    display: grid;
    grid-template-columns: 1.6fr 1fr 1fr 1fr;
    gap: 32px;
    align-items: start;
  }
  .listio-footer__brand {
    display: grid;
    gap: 10px;
  }
  .listio-footer__logo {
    font-family: 'Space Grotesk', system-ui, sans-serif;
    font-weight: 600;
    font-size: 22px;
    letter-spacing: -0.02em;
    color: #ffffff;
    line-height: 1.1;
  }
  .listio-footer__desc {
    margin: 0;
    font-size: 14px;
    line-height: 1.55;
    color: #6B6B66;
    max-width: 52ch;
  }
  .listio-footer__pill {
    margin-top: 4px;
    display: inline-flex;
    align-items: center;
    gap: 10px;
    padding: 10px 14px;
    border-radius: 999px;
    background: rgba(255,255,255,.08);
    border: 1px solid rgba(255,255,255,.12);
    color: #ffffff;
    font-size: 14px;
    font-weight: 600;
    line-height: 1;
    text-decoration: none;
    transition: background .12s ease;
  }
  .listio-footer__pill:hover {
    background: rgba(255,255,255,.14);
  }
  .listio-footer__title {
    font-size: 11px;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: .08em;
    color: #6B6B66;
    margin-bottom: 4px;
  }
  .listio-footer__col {
    display: grid;
    gap: 10px;
    align-content: start;
    justify-items: start;
  }
  .listio-footer__link {
    font-size: 14px;
    font-weight: 400;
    color: #6B6B66;
    text-decoration: none;
    padding: 3px 0;
    transition: color .12s ease;
  }
  .listio-footer__link:hover {
    color: #ffffff;
  }
  .listio-footer__bottom {
    padding-top: 20px;
    border-top: 1px solid #292929;
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-wrap: wrap;
    gap: 10px 14px;
  }
  .listio-footer__copy {
    font-size: 13px;
    color: #6B6B66;
    line-height: 1.4;
  }
  .listio-footer__mini-links {
    font-size: 13px;
    color: #6B6B66;
    display: inline-flex;
    align-items: center;
    gap: 16px;
    flex-wrap: wrap;
  }
  .listio-footer__mini-links a {
    color: #6B6B66;
    text-decoration: none;
    transition: color .12s ease;
  }
  .listio-footer__mini-links a:hover {
    color: #ffffff;
  }
  @media (max-width: 980px) {
    .listio-footer__top {
      grid-template-columns: 1fr 1fr;
      gap: 28px;
    }
    .listio-footer__brand {
      grid-column: 1 / -1;
    }
    .listio-footer__bottom {
      flex-direction: column;
      gap: 12px;
      text-align: center;
    }
  }
  @media (max-width: 480px) {
    .listio-footer__top {
      grid-template-columns: 1fr;
      gap: 24px;
    }
  }
</style>
`;

/* ============================================================
   HTML DO FOOTER
   ============================================================ */
const FOOTER_HTML = `${FOOTER_STYLES}
<footer class="listio-footer" role="contentinfo">
  <div class="container listio-footer__inner">
    <div class="listio-footer__top">
      <div class="listio-footer__brand">
        <div class="listio-footer__logo">listio</div>
        <p class="listio-footer__desc">
          Reposição de estoque inteligente para pequenos comércios.<br/>
          Checklist no celular, sugestão automática do que comprar.
        </p>
        <a class="listio-footer__pill" href="https://app.listio.com.br/cadastro">Começar grátis →</a>
      </div>
      <nav aria-label="Produto" class="listio-footer__col">
        <span class="listio-footer__title">Produto</span>
        <a class="listio-footer__link" href="/precos">Preços</a>
        <a class="listio-footer__link" href="/#como-funciona">Como funciona</a>
        <a class="listio-footer__link" href="/#recursos">Recursos</a>
        <a class="listio-footer__link" href="/#para-quem">Para quem é</a>
      </nav>
      <nav aria-label="Segmentos" class="listio-footer__col">
        <span class="listio-footer__title">Segmentos</span>
        <a class="listio-footer__link" href="/segmentos/lojas-de-conveniencia">Conveniência</a>
        <a class="listio-footer__link" href="/segmentos/mercados-de-bairro-mercearias">Mercearias</a>
        <a class="listio-footer__link" href="/segmentos/bebidas">Adegas e Bebidas</a>
        <a class="listio-footer__link" href="/segmentos/restaurantes-bares">Bares e Restaurantes</a>
        <a class="listio-footer__link" href="/segmentos/e-commerce">E-commerce</a>
      </nav>
      <nav aria-label="Legal" class="listio-footer__col">
        <span class="listio-footer__title">Legal</span>
        <a class="listio-footer__link" href="/contato">Contato</a>
        <a class="listio-footer__link" href="https://help.listio.com.br/" target="_blank" rel="noopener">Documentação</a>
        <a class="listio-footer__link" href="/termos" rel="nofollow">Termos de Uso</a>
        <a class="listio-footer__link" href="/privacidade" rel="nofollow">Política de Privacidade</a>
      </nav>
    </div>
    <div class="listio-footer__bottom">
      <span class="listio-footer__copy">&copy; ${new Date().getFullYear()} listio. Todos os direitos reservados.</span>
      <span class="listio-footer__mini-links">
        <a href="/termos" rel="nofollow">Termos</a>
        <a href="/privacidade" rel="nofollow">Privacidade</a>
        <a href="/contato">Contato</a>
      </span>
    </div>
  </div>
</footer>
`;

/* ============================================================
   HTML DO FLOATING NAV
   ============================================================ */
const FLOATING_NAV_HTML = `
<nav class="floating-nav" id="floatingNav" aria-label="Menu Rápido">
  <a href="/" class="floating-nav__logo">listio</a>
  <ul class="floating-nav__links">
    <li><a class="floating-nav__link" href="/#como-funciona">Como funciona</a></li>
    <li><a class="floating-nav__link" href="/#recursos">Recursos</a></li>
    <li class="floating-nav__dropdown">
      <button class="floating-nav__dropdown-btn" type="button">
        Segmentos
        <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
          <polyline points="6 9 12 15 18 9"/>
        </svg>
      </button>
      <div class="floating-nav__dropdown-menu" role="menu">
        <a href="/segmentos/lojas-de-conveniencia">Lojas de Conveniência</a>
        <a href="/segmentos/lojas-de-suplementos">Lojas de Suplementos</a>
        <a href="/segmentos/mercados-de-bairro-mercearias">Mercados de Bairro / Mercearias</a>
        <a href="/segmentos/distribuidores">Distribuidores</a>
        <a href="/segmentos/bebidas">Bebidas (Adegas, Distribuidoras, Depósitos)</a>
        <a href="/segmentos/restaurantes-bares">Restaurantes &amp; Bares</a>
        <a href="/segmentos/farmacias-perfumarias">Farmácias &amp; Perfumarias</a>
        <a href="/segmentos/lojas-de-cosmeticos-beleza">Lojas de Cosméticos e Beleza</a>
        <a href="/segmentos/lojas-de-roupas">Lojas de Roupas</a>
        <a href="/segmentos/material-de-construcao">Lojas de Material de Construção</a>
        <a href="/segmentos/e-commerce">E-commerce Pequeno e Médio</a>
        <a href="/segmentos/cafeterias-torrefacoes">Cafeterias &amp; Torrefações</a>
        <a href="/segmentos/emporios-lojas-especializadas">Empórios &amp; Lojas Especializadas</a>
        <a href="/segmentos/pet-shops-agropecuaria">Pet Shops e Agropecuária</a>
        <a href="/segmentos/auto-pecas">Auto Peças</a>
      </div>
    </li>
    <li><a class="floating-nav__link" href="/precos/">Preços</a></li>
    <li><a class="floating-nav__link" href="/#faq">Dúvidas</a></li>
    <li><a class="floating-nav__link" href="/contato/">Contato</a></li>
  </ul>
  <div class="floating-nav__actions">
    <a class="floating-nav__icon-btn" href="https://app.listio.com.br/login" aria-label="Entrar">
      <i data-lucide="user"></i>
    </a>
    <a class="floating-nav__cta" href="https://app.listio.com.br/cadastro" data-track="floating_menu_cta">
      Começar grátis
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
        <line x1="5" y1="12" x2="19" y2="12"/>
        <polyline points="12 5 19 12 12 19"/>
      </svg>
    </a>
    <button class="floating-nav__icon-btn" id="floatingNavHamburger" aria-label="Abrir menu completo" type="button">
      <i data-lucide="menu"></i>
    </button>
  </div>
</nav>
`;

/* ============================================================
   INICIALIZAÇÃO — injeta componentes e inicializa tudo
   Substitui floating-menu.js e nav.js — não são mais necessários.
   ============================================================ */
document.addEventListener('DOMContentLoaded', function () {

  // ── Injeta header ──
  var headerSlot = document.getElementById('site-header');
  if (headerSlot) {
    headerSlot.innerHTML = HEADER_HTML;
    initDrawer();
    markActiveLink();
  }

  // ── Injeta footer ──
  var footerSlot = document.getElementById('site-footer');
  if (footerSlot) {
    footerSlot.innerHTML = FOOTER_HTML;
  }

  // ── Injeta floating nav e inicializa sua lógica ──
  var floatingSlot = document.getElementById('site-floating-nav');
  if (floatingSlot) {
    floatingSlot.innerHTML = FLOATING_NAV_HTML;
    initFloatingMenu();
  }

  // ── Inicializa Lucide em toda a página ──
  if (typeof lucide !== 'undefined') lucide.createIcons();

});

/* ── Drawer mobile do header ── */
function initDrawer() {
  var btn = document.getElementById('lmHamburger');
  var closeBtn = document.getElementById('lmDrawerClose');
  var drawer = document.getElementById('lmDrawer');
  var overlay = document.getElementById('lmDrawerOverlay');
  if (!btn || !drawer) return;

  function openMenu() {
    drawer.classList.add('open');
    if (overlay) overlay.classList.add('open');
    btn.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
  }
  function closeMenu() {
    drawer.classList.remove('open');
    if (overlay) overlay.classList.remove('open');
    btn.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  }

  btn.addEventListener('click', openMenu);
  if (closeBtn) closeBtn.addEventListener('click', closeMenu);
  if (overlay) overlay.addEventListener('click', closeMenu);
  drawer.querySelectorAll('.lm-drawer__link, .lm-drawer__cta, .lm-drawer__login').forEach(function (a) {
    a.addEventListener('click', closeMenu);
  });
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape') closeMenu(); });
}

/* ── Floating nav: scroll visibility + dropdown + hamburger ── */
function initFloatingMenu() {
  var floatingNav = document.getElementById('floatingNav');
  if (!floatingNav) return;

  // Mostra/esconde ao rolar
  var SCROLL_THRESHOLD = 50;
  function onScroll() {
    if (window.scrollY > SCROLL_THRESHOLD) {
      floatingNav.classList.add('is-visible');
    } else {
      floatingNav.classList.remove('is-visible');
    }
  }
  var ticking = false;
  window.addEventListener('scroll', function () {
    if (!ticking) {
      window.requestAnimationFrame(function () { onScroll(); ticking = false; });
      ticking = true;
    }
  }, { passive: true });
  onScroll();

  // Dropdown de Segmentos — funciona em touch e desktop
  floatingNav.querySelectorAll('.floating-nav__dropdown').forEach(function (dropdown) {
    var btn = dropdown.querySelector('.floating-nav__dropdown-btn');
    var menu = dropdown.querySelector('.floating-nav__dropdown-menu');
    if (!btn || !menu) return;

    btn.addEventListener('click', function (e) {
      e.stopPropagation();
      var isOpen = dropdown.classList.contains('is-open');
      // Fecha todos os outros
      floatingNav.querySelectorAll('.floating-nav__dropdown.is-open').forEach(function (d) {
        d.classList.remove('is-open');
      });
      if (!isOpen) dropdown.classList.add('is-open');
    });
  });

  // Fecha dropdown ao clicar fora
  document.addEventListener('click', function () {
    floatingNav.querySelectorAll('.floating-nav__dropdown.is-open').forEach(function (d) {
      d.classList.remove('is-open');
    });
  });

  // Hamburger mobile: abre o drawer do header
  var floatingHamburger = document.getElementById('floatingNavHamburger');
  if (floatingHamburger) {
    floatingHamburger.addEventListener('click', function () {
      var drawerBtn = document.getElementById('lmHamburger');
      if (drawerBtn) drawerBtn.click();
    });
  }
}

/* ── Marca link ativo com base na URL atual ── */
function markActiveLink() {
  var currentPath = window.location.pathname.replace(/\/$/, '') || '/';
  document.querySelectorAll('.lm-links a, .floating-nav__links a').forEach(function (link) {
    var href = link.getAttribute('href');
    if (!href) return;
    var linkPath = href.split('#')[0].replace(/\/$/, '') || '/';
    if (linkPath && linkPath === currentPath) {
      link.setAttribute('aria-current', 'page');
    }
  });
}