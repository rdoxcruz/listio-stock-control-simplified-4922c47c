import os, re

ROOT = "C:/Users/rodol/Listio-old"

# ── Blocos reutilizáveis ──────────────────────────────────────────────────────

FOOTER_PT = """
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

FOOTER_EN = """
<!-- FOOTER -->
<footer class="listio-footer" role="contentinfo">
<div class="container listio-footer__inner">
<div class="listio-footer__top">
<div class="listio-footer__brand">
<div class="listio-footer__logo">Listio</div>
<p class="listio-footer__desc">
            Smart stock replenishment for small businesses. Phone checklists<br/>
            and clarity to buy without guesswork.
          </p>
<a class="listio-footer__pill" href="/en/#como-funciona">
<svg aria-hidden="true" class="listio-footer__icon" viewbox="0 0 24 24">
<path d="M4 6h16M4 12h16M4 18h16"></path>
</svg>
            Made for those who restock every week
          </a>
</div>
<nav aria-label="Legal links" class="listio-footer__col">
<a class="listio-footer__link" href="/termos" rel="nofollow">
<svg aria-hidden="true" class="listio-footer__icon" viewbox="0 0 24 24">
<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
<path d="M14 2v6h6"></path>
</svg>
            Terms of Use
          </a>
</nav>
<nav aria-label="Support links" class="listio-footer__col">
<a class="listio-footer__link" href="/privacidade" rel="nofollow">
<svg aria-hidden="true" class="listio-footer__icon" viewbox="0 0 24 24">
<path d="M12 2l8 4v6c0 5-3.5 9.5-8 10-4.5-.5-8-5-8-10V6l8-4z"></path>
</svg>
            Privacy Policy
          </a>
<a class="listio-footer__link" href="/en/contact">
<svg aria-hidden="true" class="listio-footer__icon" viewbox="0 0 24 24">
<path d="M21 15a4 4 0 0 1-4 4H7l-4 3V7a4 4 0 0 1 4-4h10a4 4 0 0 1 4 4z"></path>
</svg>
            Contact
          </a>
</nav>
</div>
</div>
</footer>"""

FOOTER_ES = """
<!-- FOOTER -->
<footer class="listio-footer" role="contentinfo">
<div class="container listio-footer__inner">
<div class="listio-footer__top">
<div class="listio-footer__brand">
<div class="listio-footer__logo">Listio</div>
<p class="listio-footer__desc">
            Reposici\u00f3n de inventario inteligente para peque\u00f1os negocios. Checklists en el celular<br/>
            y claridad para comprar sin suposiciones.
          </p>
<a class="listio-footer__pill" href="/es/#como-funciona">
<svg aria-hidden="true" class="listio-footer__icon" viewbox="0 0 24 24">
<path d="M4 6h16M4 12h16M4 18h16"></path>
</svg>
            Hecho para quienes reponen cada semana
          </a>
</div>
<nav aria-label="Enlaces legales" class="listio-footer__col">
<a class="listio-footer__link" href="/termos" rel="nofollow">
<svg aria-hidden="true" class="listio-footer__icon" viewbox="0 0 24 24">
<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
<path d="M14 2v6h6"></path>
</svg>
            T\u00e9rminos de Uso
          </a>
</nav>
<nav aria-label="Enlaces de soporte" class="listio-footer__col">
<a class="listio-footer__link" href="/privacidade" rel="nofollow">
<svg aria-hidden="true" class="listio-footer__icon" viewbox="0 0 24 24">
<path d="M12 2l8 4v6c0 5-3.5 9.5-8 10-4.5-.5-8-5-8-10V6l8-4z"></path>
</svg>
            Pol\u00edtica de Privacidad
          </a>
<a class="listio-footer__link" href="/es/contacto">
<svg aria-hidden="true" class="listio-footer__icon" viewbox="0 0 24 24">
<path d="M21 15a4 4 0 0 1-4 4H7l-4 3V7a4 4 0 0 1 4-4h10a4 4 0 0 1 4 4z"></path>
</svg>
            Contacto
          </a>
</nav>
</div>
</div>
</footer>"""

SEGMENTS_EN = """
        <a href="/segmentos/lojas-de-conveniencia" role="menuitem">Convenience Stores</a>
        <a href="/segmentos/lojas-de-suplementos" role="menuitem">Supplement Stores</a>
        <a href="/segmentos/mercados-de-bairro-mercearias" role="menuitem">Neighborhood Markets / Grocery</a>
        <a href="/segmentos/distribuidores" role="menuitem">Distributors</a>
        <a href="/segmentos/bebidas" role="menuitem">Beverages (Wine Shops, Distributors)</a>
        <a href="/segmentos/restaurantes-bares" role="menuitem">Restaurants &amp; Bars</a>
        <a href="/segmentos/farmacias-perfumarias" role="menuitem">Pharmacies &amp; Beauty</a>
        <a href="/segmentos/lojas-de-cosmeticos-beleza" role="menuitem">Cosmetics &amp; Beauty Stores</a>
        <a href="/segmentos/lojas-de-roupas" role="menuitem">Clothing Stores</a>
        <a href="/segmentos/material-de-construcao" role="menuitem">Building Material Stores</a>
        <a href="/segmentos/e-commerce" role="menuitem">Small &amp; Mid E-commerce</a>
        <a href="/segmentos/cafeterias-torrefacoes" role="menuitem">Coffee Shops &amp; Roasters</a>
        <a href="/segmentos/emporios-lojas-especializadas" role="menuitem">Specialty Stores</a>
        <a href="/segmentos/pet-shops-agropecuaria" role="menuitem">Pet Shops</a>
        <a href="/segmentos/auto-pecas" role="menuitem">Auto Parts</a>"""

SEGMENTS_ES = """
        <a href="/segmentos/lojas-de-conveniencia" role="menuitem">Tiendas de Conveniencia</a>
        <a href="/segmentos/lojas-de-suplementos" role="menuitem">Tiendas de Suplementos</a>
        <a href="/segmentos/mercados-de-bairro-mercearias" role="menuitem">Mercados de Barrio / Abarrotes</a>
        <a href="/segmentos/distribuidores" role="menuitem">Distribuidores</a>
        <a href="/segmentos/bebidas" role="menuitem">Bebidas (Vinotecas, Distribuidoras)</a>
        <a href="/segmentos/restaurantes-bares" role="menuitem">Restaurantes &amp; Bares</a>
        <a href="/segmentos/farmacias-perfumarias" role="menuitem">Farmacias &amp; Perfumer\u00edas</a>
        <a href="/segmentos/lojas-de-cosmeticos-beleza" role="menuitem">Tiendas de Cosm\u00e9ticos</a>
        <a href="/segmentos/lojas-de-roupas" role="menuitem">Tiendas de Ropa</a>
        <a href="/segmentos/material-de-construcao" role="menuitem">Materiales de Construcci\u00f3n</a>
        <a href="/segmentos/e-commerce" role="menuitem">E-commerce Peque\u00f1o y Mediano</a>
        <a href="/segmentos/cafeterias-torrefacoes" role="menuitem">Caf\u00e8ter\u00edas &amp; Tostadores</a>
        <a href="/segmentos/emporios-lojas-especializadas" role="menuitem">Tiendas Especializadas</a>
        <a href="/segmentos/pet-shops-agropecuaria" role="menuitem">Pet Shops</a>
        <a href="/segmentos/auto-pecas" role="menuitem">Repuestos de Autom\u00f3viles</a>"""

def make_header_en():
    return """<!-- HEADER -->
<div class="top-wrap">
<div class="container">
<header class="site-header" role="banner">
<div class="site-header__inner">

  <a aria-label="Listio \u2014 home" class="brand" href="/en/">
    <span class="brand__name">Listio</span>
  </a>

  <nav aria-label="Main navigation" class="nav">
    <a href="/en/#como-funciona">How it works</a>
    <a href="/en/#recursos">Features</a>
    <div class="nav__dropdown">
      <button class="nav__dropdown-toggle" aria-expanded="false" aria-haspopup="true" type="button">
        Segments
        <i aria-hidden="true" class="icon icon--md" data-lucide="chevron-down"></i>
      </button>
      <div class="nav__dropdown-menu" role="menu">""" + SEGMENTS_EN + """
      </div>
    </div>
    <a href="/en/pricing">Pricing</a>
    <a href="/en/#faq">FAQ</a>
    <a href="/en/contact">Contact</a>
  </nav>

  <div class="lang-switcher" aria-label="Language">
    <span class="lang-switcher__current" role="button" tabindex="0" aria-expanded="false">
      EN <i aria-hidden="true" class="icon icon--md" data-lucide="chevron-down"></i>
    </span>
    <div class="lang-switcher__menu">
      <a href="/" hreflang="pt-BR">PT</a>
      <a href="/en/" hreflang="en" aria-current="true">EN</a>
      <a href="/es/" hreflang="es">ES</a>
    </div>
  </div>

  <div aria-label="Actions" class="header-ctas">
    <a class="btn btn--ghost" data-track="header_login" href="https://app.listio.com.br/login">Log in</a>
    <a class="btn btn--primary" data-track="header_cta" href="https://app.listio.com.br/cadastro">
      Start free
      <i aria-hidden="true" class="icon icon--md icon--on-lime" data-lucide="arrow-right"></i>
    </a>
  </div>

  <button aria-controls="mobileMenu" aria-expanded="false" aria-label="Open menu" class="mobile-toggle" data-mobile-toggle type="button">
    <i aria-hidden="true" class="icon icon--lg" data-lucide="menu"></i>
  </button>

</div>

<div aria-label="Mobile menu" class="mobile-menu" id="mobileMenu" role="navigation">
  <a href="/en/#como-funciona">How it works</a>
  <a href="/en/#recursos">Features</a>
  <div class="mobile-menu__item">
    <button class="mobile-menu__toggle" data-mobile-submenu-toggle aria-expanded="false" type="button">
      <span>Segments</span>
      <i aria-hidden="true" class="icon icon--md" data-lucide="chevron-down"></i>
    </button>
    <div class="mobile-menu__submenu">
      <a href="/segmentos/lojas-de-conveniencia">Convenience Stores</a>
      <a href="/segmentos/lojas-de-suplementos">Supplement Stores</a>
      <a href="/segmentos/mercados-de-bairro-mercearias">Neighborhood Markets / Grocery</a>
      <a href="/segmentos/distribuidores">Distributors</a>
      <a href="/segmentos/bebidas">Beverages (Wine Shops, Distributors)</a>
      <a href="/segmentos/restaurantes-bares">Restaurants &amp; Bars</a>
      <a href="/segmentos/farmacias-perfumarias">Pharmacies &amp; Beauty</a>
      <a href="/segmentos/lojas-de-cosmeticos-beleza">Cosmetics &amp; Beauty Stores</a>
      <a href="/segmentos/lojas-de-roupas">Clothing Stores</a>
      <a href="/segmentos/material-de-construcao">Building Material Stores</a>
      <a href="/segmentos/e-commerce">Small &amp; Mid E-commerce</a>
      <a href="/segmentos/cafeterias-torrefacoes">Coffee Shops &amp; Roasters</a>
      <a href="/segmentos/emporios-lojas-especializadas">Specialty Stores</a>
      <a href="/segmentos/pet-shops-agropecuaria">Pet Shops</a>
      <a href="/segmentos/auto-pecas">Auto Parts</a>
    </div>
  </div>
  <a href="/en/pricing">Pricing</a>
  <a href="/en/#faq">FAQ</a>
  <a href="/en/contact">Contact</a>
  <div class="mobile-lang" aria-label="Language">
    <a href="/" hreflang="pt-BR">PT</a>
    <a href="/en/" hreflang="en" aria-current="true">EN</a>
    <a href="/es/" hreflang="es">ES</a>
  </div>
  <div class="mobile-ctas">
    <a class="btn" data-track="mobile_login" href="https://app.listio.com.br/login">Log in</a>
    <a class="btn btn--primary" data-track="mobile_cta" href="https://app.listio.com.br/cadastro">
      Start free
      <i aria-hidden="true" class="icon icon--md icon--on-lime" data-lucide="arrow-right"></i>
    </a>
  </div>
</div>

</header>
</div>
</div>"""

def make_header_es():
    return """<!-- HEADER -->
<div class="top-wrap">
<div class="container">
<header class="site-header" role="banner">
<div class="site-header__inner">

  <a aria-label="Listio \u2014 inicio" class="brand" href="/es/">
    <span class="brand__name">Listio</span>
  </a>

  <nav aria-label="Navegaci\u00f3n principal" class="nav">
    <a href="/es/#como-funciona">C\u00f3mo funciona</a>
    <a href="/es/#recursos">Funciones</a>
    <div class="nav__dropdown">
      <button class="nav__dropdown-toggle" aria-expanded="false" aria-haspopup="true" type="button">
        Segmentos
        <i aria-hidden="true" class="icon icon--md" data-lucide="chevron-down"></i>
      </button>
      <div class="nav__dropdown-menu" role="menu">""" + SEGMENTS_ES + """
      </div>
    </div>
    <a href="/es/precios">Precio</a>
    <a href="/es/#faq">Dudas</a>
    <a href="/es/contacto">Contacto</a>
  </nav>

  <div class="lang-switcher" aria-label="Idioma">
    <span class="lang-switcher__current" role="button" tabindex="0" aria-expanded="false">
      ES <i aria-hidden="true" class="icon icon--md" data-lucide="chevron-down"></i>
    </span>
    <div class="lang-switcher__menu">
      <a href="/" hreflang="pt-BR">PT</a>
      <a href="/en/" hreflang="en">EN</a>
      <a href="/es/" hreflang="es" aria-current="true">ES</a>
    </div>
  </div>

  <div aria-label="Acciones" class="header-ctas">
    <a class="btn btn--ghost" data-track="header_login" href="https://app.listio.com.br/login">Entrar</a>
    <a class="btn btn--primary" data-track="header_cta" href="https://app.listio.com.br/cadastro">
      Comenzar gratis
      <i aria-hidden="true" class="icon icon--md icon--on-lime" data-lucide="arrow-right"></i>
    </a>
  </div>

  <button aria-controls="mobileMenu" aria-expanded="false" aria-label="Abrir men\u00fa" class="mobile-toggle" data-mobile-toggle type="button">
    <i aria-hidden="true" class="icon icon--lg" data-lucide="menu"></i>
  </button>

</div>

<div aria-label="Men\u00fa m\u00f3vil" class="mobile-menu" id="mobileMenu" role="navigation">
  <a href="/es/#como-funciona">C\u00f3mo funciona</a>
  <a href="/es/#recursos">Funciones</a>
  <div class="mobile-menu__item">
    <button class="mobile-menu__toggle" data-mobile-submenu-toggle aria-expanded="false" type="button">
      <span>Segmentos</span>
      <i aria-hidden="true" class="icon icon--md" data-lucide="chevron-down"></i>
    </button>
    <div class="mobile-menu__submenu">
      <a href="/segmentos/lojas-de-conveniencia">Tiendas de Conveniencia</a>
      <a href="/segmentos/lojas-de-suplementos">Tiendas de Suplementos</a>
      <a href="/segmentos/mercados-de-bairro-mercearias">Mercados de Barrio / Abarrotes</a>
      <a href="/segmentos/distribuidores">Distribuidores</a>
      <a href="/segmentos/bebidas">Bebidas (Vinotecas, Distribuidoras)</a>
      <a href="/segmentos/restaurantes-bares">Restaurantes &amp; Bares</a>
      <a href="/segmentos/farmacias-perfumarias">Farmacias &amp; Perfumer\u00edas</a>
      <a href="/segmentos/lojas-de-cosmeticos-beleza">Tiendas de Cosm\u00e9ticos</a>
      <a href="/segmentos/lojas-de-roupas">Tiendas de Ropa</a>
      <a href="/segmentos/material-de-construcao">Materiales de Construcci\u00f3n</a>
      <a href="/segmentos/e-commerce">E-commerce Peque\u00f1o y Mediano</a>
      <a href="/segmentos/cafeterias-torrefacoes">Caf\u00e8ter\u00edas &amp; Tostadores</a>
      <a href="/segmentos/emporios-lojas-especializadas">Tiendas Especializadas</a>
      <a href="/segmentos/pet-shops-agropecuaria">Pet Shops</a>
      <a href="/segmentos/auto-pecas">Repuestos de Autom\u00f3viles</a>
    </div>
  </div>
  <a href="/es/precios">Precio</a>
  <a href="/es/#faq">Dudas</a>
  <a href="/es/contacto">Contacto</a>
  <div class="mobile-lang" aria-label="Idioma">
    <a href="/" hreflang="pt-BR">PT</a>
    <a href="/en/" hreflang="en">EN</a>
    <a href="/es/" hreflang="es" aria-current="true">ES</a>
  </div>
  <div class="mobile-ctas">
    <a class="btn" data-track="mobile_login" href="https://app.listio.com.br/login">Entrar</a>
    <a class="btn btn--primary" data-track="mobile_cta" href="https://app.listio.com.br/cadastro">
      Comenzar gratis
      <i aria-hidden="true" class="icon icon--md icon--on-lime" data-lucide="arrow-right"></i>
    </a>
  </div>
</div>

</header>
</div>
</div>"""

NAV_INCLUDES = '<link href="/assets/css/nav.css" rel="stylesheet"/>\n<script src="/assets/js/nav.js" defer></script>\n'

PAGES = [
    {
        "path": "en/contact/index.html",
        "lang": "en",
        "header_fn": make_header_en,
        "footer": FOOTER_EN,
    },
    {
        "path": "es/contacto/index.html",
        "lang": "es",
        "header_fn": make_header_es,
        "footer": FOOTER_ES,
    },
    {
        "path": "es/precios/index.html",
        "lang": "es",
        "header_fn": make_header_es,
        "footer": None,  # already has listio-footer
    },
    {
        "path": "es/privacidad/index.html",
        "lang": "es",
        "header_fn": make_header_es,
        "footer": FOOTER_ES,
    },
    {
        "path": "es/termos/index.html",
        "lang": "es",
        "header_fn": make_header_es,
        "footer": FOOTER_ES,
    },
]

header_pattern = re.compile(
    r'(?:<!-- HEADER -->\s*)?<div class="top-wrap"[^>]*>.*?</div>\s*</div>\s*(?:<!--.*?-->\s*)?(?=<main)',
    re.DOTALL
)

old_footer_pattern = re.compile(
    r'<footer class="footer"[^>]*>.*?</footer>',
    re.DOTALL
)

for page in PAGES:
    fpath = os.path.join(ROOT, page["path"])
    if not os.path.exists(fpath):
        print(f"MISSING: {page['path']}")
        continue

    with open(fpath, "r", encoding="utf-8") as f:
        html = f.read()

    original = html

    # 1. Fix malformed </link><link...></link></link> in head
    html = re.sub(r'</link>\s*(<link [^>]+/>)\s*</link>\s*</link>\s*</head>',
                  r'\1\n</head>', html)

    # 2. Add nav.css + nav.js
    if "/assets/css/nav.css" not in html:
        html = html.replace("</head>", NAV_INCLUDES + "</head>", 1)

    # 3. Replace header
    new_header = page["header_fn"]()
    if header_pattern.search(html):
        html = header_pattern.sub(new_header + "\n", html)
    else:
        print(f"  WARN: header pattern not found in {page['path']}")

    # 4. Replace old footer if needed
    if page["footer"] and "listio-footer" not in html:
        if old_footer_pattern.search(html):
            html = old_footer_pattern.sub(page["footer"], html)
        else:
            html = html.replace("</body>", page["footer"] + "\n\n</body>", 1)

    if html != original:
        with open(fpath, "w", encoding="utf-8") as f:
            f.write(html)
        print(f"OK: {page['path']}")
    else:
        print(f"UNCHANGED: {page['path']}")

print("\nConcluido.")
