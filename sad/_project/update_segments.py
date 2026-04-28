import os
import re

NEW_HEADER = """<!-- HEADER -->
<div class="top-wrap">
<div class="container">
<header class="site-header" role="banner">
<div class="site-header__inner">

  <!-- Logo -->
  <a aria-label="Listio \u2014 in\u00edcio" class="brand" href="/">
    <span class="brand__name">Listio</span>
  </a>

  <!-- Nav desktop -->
  <nav aria-label="Navega\u00e7\u00e3o principal" class="nav">
    <a href="/#como-funciona">Como funciona</a>
    <a href="/#recursos">Recursos</a>
    <div class="nav__dropdown">
      <button class="nav__dropdown-toggle" aria-expanded="false" aria-haspopup="true" type="button">
        Segmentos
        <i aria-hidden="true" class="icon icon--md" data-lucide="chevron-down"></i>
      </button>
      <div class="nav__dropdown-menu" role="menu">
        <a href="/segmentos/lojas-de-conveniencia" role="menuitem">Lojas de Conveni\u00eancia</a>
        <a href="/segmentos/lojas-de-suplementos" role="menuitem">Lojas de Suplementos</a>
        <a href="/segmentos/mercados-de-bairro-mercearias" role="menuitem">Mercados de Bairro / Mercearias</a>
        <a href="/segmentos/distribuidores" role="menuitem">Distribuidores</a>
        <a href="/segmentos/bebidas" role="menuitem">Bebidas (Adegas, Distribuidoras, Dep\u00f3sitos)</a>
        <a href="/segmentos/restaurantes-bares" role="menuitem">Restaurantes &amp; Bares</a>
        <a href="/segmentos/farmacias-perfumarias" role="menuitem">Farm\u00e1cias &amp; Perfumarias</a>
        <a href="/segmentos/lojas-de-cosmeticos-beleza" role="menuitem">Lojas de Cosm\u00e9ticos e Beleza</a>
        <a href="/segmentos/lojas-de-roupas" role="menuitem">Lojas de Roupas</a>
        <a href="/segmentos/material-de-construcao" role="menuitem">Lojas de Material de Constru\u00e7\u00e3o</a>
        <a href="/segmentos/e-commerce" role="menuitem">E-commerce Pequeno e M\u00e9dio</a>
        <a href="/segmentos/cafeterias-torrefacoes" role="menuitem">Cafeterias &amp; Torrefac\u00f5es</a>
        <a href="/segmentos/emporios-lojas-especializadas" role="menuitem">Emp\u00f3rios &amp; Lojas Especializadas</a>
        <a href="/segmentos/pet-shops-agropecuaria" role="menuitem">Pet Shops e Agropecu\u00e1ria</a>
        <a href="/segmentos/auto-pecas" role="menuitem">Auto Pe\u00e7as</a>
      </div>
    </div>
    <a href="/precos">Pre\u00e7o</a>
    <a href="/#faq">D\u00favidas</a>
    <a href="/contato">Contato</a>
  </nav>

  <!-- Language switcher -->
  <div class="lang-switcher" aria-label="Idioma">
    <span class="lang-switcher__current" role="button" tabindex="0" aria-expanded="false">
      PT <i aria-hidden="true" class="icon icon--md" data-lucide="chevron-down"></i>
    </span>
    <div class="lang-switcher__menu">
      <a href="/" hreflang="pt-BR" aria-current="true">PT</a>
      <a href="/en/" hreflang="en">EN</a>
      <a href="/es/" hreflang="es">ES</a>
    </div>
  </div>

  <!-- CTAs desktop -->
  <div aria-label="A\u00e7\u00f5es" class="header-ctas">
    <a class="btn btn--ghost" data-track="header_login" href="https://app.listio.com.br/login">Entrar</a>
    <a class="btn btn--primary" data-track="header_cta" href="https://app.listio.com.br/cadastro">
      Come\u00e7ar gr\u00e1tis
      <i aria-hidden="true" class="icon icon--md icon--on-lime" data-lucide="arrow-right"></i>
    </a>
  </div>

  <!-- Hamburger -->
  <button aria-controls="mobileMenu" aria-expanded="false" aria-label="Abrir menu" class="mobile-toggle" data-mobile-toggle type="button">
    <i aria-hidden="true" class="icon icon--lg" data-lucide="menu"></i>
  </button>

</div>

<!-- Menu Mobile -->
<div aria-label="Menu mobile" class="mobile-menu" id="mobileMenu" role="navigation">
  <a href="/#como-funciona">Como funciona</a>
  <a href="/#recursos">Recursos</a>
  <div class="mobile-menu__item">
    <button class="mobile-menu__toggle" data-mobile-submenu-toggle aria-expanded="false" type="button">
      <span>Segmentos</span>
      <i aria-hidden="true" class="icon icon--md" data-lucide="chevron-down"></i>
    </button>
    <div class="mobile-menu__submenu">
      <a href="/segmentos/lojas-de-conveniencia">Lojas de Conveni\u00eancia</a>
      <a href="/segmentos/lojas-de-suplementos">Lojas de Suplementos</a>
      <a href="/segmentos/mercados-de-bairro-mercearias">Mercados de Bairro / Mercearias</a>
      <a href="/segmentos/distribuidores">Distribuidores</a>
      <a href="/segmentos/bebidas">Bebidas (Adegas, Distribuidoras, Dep\u00f3sitos)</a>
      <a href="/segmentos/restaurantes-bares">Restaurantes &amp; Bares</a>
      <a href="/segmentos/farmacias-perfumarias">Farm\u00e1cias &amp; Perfumarias</a>
      <a href="/segmentos/lojas-de-cosmeticos-beleza">Lojas de Cosm\u00e9ticos e Beleza</a>
      <a href="/segmentos/lojas-de-roupas">Lojas de Roupas</a>
      <a href="/segmentos/material-de-construcao">Lojas de Material de Constru\u00e7\u00e3o</a>
      <a href="/segmentos/e-commerce">E-commerce Pequeno e M\u00e9dio</a>
      <a href="/segmentos/cafeterias-torrefacoes">Cafeterias &amp; Torrefac\u00f5es</a>
      <a href="/segmentos/emporios-lojas-especializadas">Emp\u00f3rios &amp; Lojas Especializadas</a>
      <a href="/segmentos/pet-shops-agropecuaria">Pet Shops e Agropecu\u00e1ria</a>
      <a href="/segmentos/auto-pecas">Auto Pe\u00e7as</a>
    </div>
  </div>
  <a href="/precos">Pre\u00e7o</a>
  <a href="/#faq">D\u00favidas</a>
  <a href="/contato">Contato</a>
  <!-- Language switcher mobile -->
  <div class="mobile-lang" aria-label="Idioma">
    <a href="/" hreflang="pt-BR" aria-current="true">PT</a>
    <a href="/en/" hreflang="en">EN</a>
    <a href="/es/" hreflang="es">ES</a>
  </div>
  <div class="mobile-ctas">
    <a class="btn" data-track="mobile_login" href="https://app.listio.com.br/login">Entrar</a>
    <a class="btn btn--primary" data-track="mobile_cta" href="https://app.listio.com.br/cadastro">
      Come\u00e7ar gr\u00e1tis
      <i aria-hidden="true" class="icon icon--md icon--on-lime" data-lucide="arrow-right"></i>
    </a>
  </div>
</div>

</header>
</div>
</div>"""

FOOTER = """
<!-- FOOTER -->
<footer class="listio-footer" role="contentinfo">
<div class="container listio-footer__inner">
<div class="listio-footer__top">
<div class="listio-footer__brand">
<div class="listio-footer__logo">Listio</div>
<p class="listio-footer__desc">
            Reposi\u00e7\u00e3o de estoque inteligente para pequenos com\u00e9rcios. Checklists no celular<br/>
            e clareza para comprar sem achismo.
          </p>
<a class="listio-footer__pill" href="/como-funciona">
<svg aria-hidden="true" class="listio-footer__icon" viewbox="0 0 24 24">
<path d="M4 6h16M4 12h16M4 18h16"></path>
</svg>
            Feito para quem rep\u00f5e toda semana
          </a>
</div>
<nav aria-label="Links legais" class="listio-footer__col">
<a class="listio-footer__link" href="/termos" rel="nofollow">
<svg aria-hidden="true" class="listio-footer__icon" viewbox="0 0 24 24">
<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
<path d="M14 2v6h6"></path>
</svg>
            Termos de Uso
          </a>
</nav>
<nav aria-label="Links de suporte" class="listio-footer__col">
<a class="listio-footer__link" href="/privacidade" rel="nofollow">
<svg aria-hidden="true" class="listio-footer__icon" viewbox="0 0 24 24">
<path d="M12 2l8 4v6c0 5-3.5 9.5-8 10-4.5-.5-8-5-8-10V6l8-4z"></path>
</svg>
            Pol\u00edtica de Privacidade
          </a>
<a class="listio-footer__link" href="/contato">
<svg aria-hidden="true" class="listio-footer__icon" viewbox="0 0 24 24">
<path d="M21 15a4 4 0 0 1-4 4H7l-4 3V7a4 4 0 0 1 4-4h10a4 4 0 0 1 4 4z"></path>
</svg>
            Contato
          </a>
</nav>
</div>
</div>
</footer>"""

NAV_INCLUDES = '<link href="/assets/css/nav.css" rel="stylesheet"/>\n<script src="/assets/js/nav.js" defer></script>\n'

seg_root = "C:/Users/rodol/Listio-old/segmentos"
segments = [d for d in os.listdir(seg_root) if os.path.isdir(os.path.join(seg_root, d))]

for seg in sorted(segments):
    path = os.path.join(seg_root, seg, "index.html")
    if not os.path.exists(path):
        print(f"SKIP: {seg}")
        continue

    with open(path, "r", encoding="utf-8") as f:
        html = f.read()

    original = html

    # 1. nav.css + nav.js no head
    if "/assets/css/nav.css" not in html:
        html = html.replace("</head>", NAV_INCLUDES + "</head>", 1)

    # 2. Substituir bloco de header (com ou sem comentário <!-- HEADER -->)
    header_pattern = re.compile(
        r'(?:<!-- HEADER -->\s*)?' +
        r'<div class="top-wrap">.*?</div>\s*</div>\s*(?=<main)',
        re.DOTALL
    )
    if header_pattern.search(html):
        html = header_pattern.sub(NEW_HEADER + "\n", html)
    else:
        print(f"  WARN header pattern not found: {seg}")

    # 3. Footer antes de </body>
    if "listio-footer" not in html:
        # Remove placeholder vazio se existir
        html = html.replace("<!-- Mobile menu toggle -->", "")
        html = html.replace("</body>", FOOTER + "\n\n</body>", 1)

    if html != original:
        with open(path, "w", encoding="utf-8") as f:
            f.write(html)
        print(f"OK: {seg}")
    else:
        print(f"UNCHANGED: {seg}")

print("\nConcluido.")
