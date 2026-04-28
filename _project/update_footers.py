"""
Replaces the footer in every HTML page with the new 4-column dark footer.
Language is detected from the file path (/en/ → EN, /es/ → ES, else PT).
"""
import re, os, glob

# ── Footer blocks ─────────────────────────────────────────────────────────────

PT_FOOTER = """\
<footer class="listio-footer" role="contentinfo">
<div class="container listio-footer__inner">
<div class="listio-footer__top">

  <div class="listio-footer__brand">
    <div class="listio-footer__logo">Listio</div>
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
    <a class="listio-footer__link" href="/termos" rel="nofollow">Termos de Uso</a>
    <a class="listio-footer__link" href="/privacidade" rel="nofollow">Política de Privacidade</a>
  </nav>

</div>
<div class="listio-footer__bottom">
  <span class="listio-footer__copy">© 2026 Listio. Todos os direitos reservados.</span>
  <span class="listio-footer__mini-links">
    <a href="/termos" rel="nofollow">Termos</a>
    <a href="/privacidade" rel="nofollow">Privacidade</a>
    <a href="/contato">Contato</a>
  </span>
</div>
</div>
</footer>"""

EN_FOOTER = """\
<footer class="listio-footer" role="contentinfo">
<div class="container listio-footer__inner">
<div class="listio-footer__top">

  <div class="listio-footer__brand">
    <div class="listio-footer__logo">Listio</div>
    <p class="listio-footer__desc">
      Smart inventory replenishment for small businesses.<br/>
      Mobile checklists and clear guidance on what to buy.
    </p>
    <a class="listio-footer__pill" href="https://app.listio.com.br/cadastro">Start for free →</a>
  </div>

  <nav aria-label="Product" class="listio-footer__col">
    <span class="listio-footer__title">Product</span>
    <a class="listio-footer__link" href="/en/pricing">Pricing</a>
    <a class="listio-footer__link" href="/en/#how-it-works">How it works</a>
    <a class="listio-footer__link" href="/en/#features">Features</a>
    <a class="listio-footer__link" href="/en/#for-whom">For whom</a>
  </nav>

  <nav aria-label="Segments" class="listio-footer__col">
    <span class="listio-footer__title">Segments</span>
    <a class="listio-footer__link" href="#">Convenience Stores</a>
    <a class="listio-footer__link" href="#">Grocery Markets</a>
    <a class="listio-footer__link" href="#">Wine Shops &amp; Beverages</a>
    <a class="listio-footer__link" href="#">Bars &amp; Restaurants</a>
    <a class="listio-footer__link" href="#">E-commerce</a>
  </nav>

  <nav aria-label="Legal" class="listio-footer__col">
    <span class="listio-footer__title">Legal</span>
    <a class="listio-footer__link" href="/en/contact">Contact</a>
    <a class="listio-footer__link" href="/termos" rel="nofollow">Terms of Use</a>
    <a class="listio-footer__link" href="/privacidade" rel="nofollow">Privacy Policy</a>
  </nav>

</div>
<div class="listio-footer__bottom">
  <span class="listio-footer__copy">© 2026 Listio. All rights reserved.</span>
  <span class="listio-footer__mini-links">
    <a href="/termos" rel="nofollow">Terms</a>
    <a href="/privacidade" rel="nofollow">Privacy</a>
    <a href="/en/contact">Contact</a>
  </span>
</div>
</div>
</footer>"""

ES_FOOTER = """\
<footer class="listio-footer" role="contentinfo">
<div class="container listio-footer__inner">
<div class="listio-footer__top">

  <div class="listio-footer__brand">
    <div class="listio-footer__logo">Listio</div>
    <p class="listio-footer__desc">
      Reposición de inventario inteligente para pequeños negocios.<br/>
      Checklists en el celular y claridad sobre qué comprar.
    </p>
    <a class="listio-footer__pill" href="https://app.listio.com.br/cadastro">Empezar gratis →</a>
  </div>

  <nav aria-label="Producto" class="listio-footer__col">
    <span class="listio-footer__title">Producto</span>
    <a class="listio-footer__link" href="/es/precios">Precios</a>
    <a class="listio-footer__link" href="/es/#como-funciona">Cómo funciona</a>
    <a class="listio-footer__link" href="/es/#recursos">Recursos</a>
    <a class="listio-footer__link" href="/es/#para-quien">Para quién</a>
  </nav>

  <nav aria-label="Segmentos" class="listio-footer__col">
    <span class="listio-footer__title">Segmentos</span>
    <a class="listio-footer__link" href="#">Tiendas de Conveniencia</a>
    <a class="listio-footer__link" href="#">Mercados de Barrio</a>
    <a class="listio-footer__link" href="#">Vinotecas &amp; Bebidas</a>
    <a class="listio-footer__link" href="#">Bares &amp; Restaurantes</a>
    <a class="listio-footer__link" href="#">E-commerce</a>
  </nav>

  <nav aria-label="Legal" class="listio-footer__col">
    <span class="listio-footer__title">Legal</span>
    <a class="listio-footer__link" href="/es/contacto">Contacto</a>
    <a class="listio-footer__link" href="/termos" rel="nofollow">Términos de Uso</a>
    <a class="listio-footer__link" href="/privacidade" rel="nofollow">Política de Privacidad</a>
  </nav>

</div>
<div class="listio-footer__bottom">
  <span class="listio-footer__copy">© 2026 Listio. Todos los derechos reservados.</span>
  <span class="listio-footer__mini-links">
    <a href="/termos" rel="nofollow">Términos</a>
    <a href="/privacidade" rel="nofollow">Privacidad</a>
    <a href="/es/contacto">Contacto</a>
  </span>
</div>
</div>
</footer>"""

# ── Helpers ────────────────────────────────────────────────────────────────────

def pick_footer(path):
    p = path.replace('\\', '/')
    if '/en/' in p:
        return EN_FOOTER
    if '/es/' in p:
        return ES_FOOTER
    return PT_FOOTER

# Matches any <footer ...>...</footer> block (greedy across newlines)
FOOTER_RE = re.compile(r'<footer\b[^>]*>.*?</footer>', re.DOTALL)

# ── Run ────────────────────────────────────────────────────────────────────────

root = os.path.join(os.path.dirname(__file__), '..')
files = glob.glob(os.path.join(root, '**', 'index.html'), recursive=True)

# Exclude _project folder
files = [f for f in files if '_project' not in f.replace('\\', '/')]

updated = []
skipped = []

for path in sorted(files):
    with open(path, 'r', encoding='utf-8') as fh:
        html = fh.read()

    if '<footer' not in html:
        skipped.append(path)
        continue

    new_footer = pick_footer(path)
    new_html, count = FOOTER_RE.subn(new_footer, html)

    if count == 0:
        skipped.append(path)
        continue

    with open(path, 'w', encoding='utf-8') as fh:
        fh.write(new_html)

    updated.append(f'  [{count}] {os.path.relpath(path, root)}')

print(f'Updated {len(updated)} files:')
for line in updated:
    print(line)
if skipped:
    print(f'\nSkipped (no <footer>): {len(skipped)}')
