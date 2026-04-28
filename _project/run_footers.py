import re, glob, os

ROOT = 'C:/Users/rodol/Listio-old'

PT_FOOTER = """\
<footer class="listio-footer" role="contentinfo">
<div class="container listio-footer__inner">
<div class="listio-footer__top">
  <div class="listio-footer__brand">
    <div class="listio-footer__logo">Listio</div>
    <p class="listio-footer__desc">
      Reposi\u00e7\u00e3o de estoque inteligente para pequenos com\u00e9rcios.<br/>
      Checklist no celular, sugest\u00e3o autom\u00e1tica do que comprar.
    </p>
    <a class="listio-footer__pill" href="https://app.listio.com.br/cadastro">Come\u00e7ar gr\u00e1tis \u2192</a>
  </div>
  <nav aria-label="Produto" class="listio-footer__col">
    <span class="listio-footer__title">Produto</span>
    <a class="listio-footer__link" href="/precos">Pre\u00e7os</a>
    <a class="listio-footer__link" href="/#como-funciona">Como funciona</a>
    <a class="listio-footer__link" href="/#recursos">Recursos</a>
    <a class="listio-footer__link" href="/#para-quem">Para quem \u00e9</a>
  </nav>
  <nav aria-label="Segmentos" class="listio-footer__col">
    <span class="listio-footer__title">Segmentos</span>
    <a class="listio-footer__link" href="/segmentos/lojas-de-conveniencia">Conveni\u00eancia</a>
    <a class="listio-footer__link" href="/segmentos/mercados-de-bairro-mercearias">Mercearias</a>
    <a class="listio-footer__link" href="/segmentos/bebidas">Adegas e Bebidas</a>
    <a class="listio-footer__link" href="/segmentos/restaurantes-bares">Bares e Restaurantes</a>
    <a class="listio-footer__link" href="/segmentos/e-commerce">E-commerce</a>
  </nav>
  <nav aria-label="Legal" class="listio-footer__col">
    <span class="listio-footer__title">Legal</span>
    <a class="listio-footer__link" href="/contato">Contato</a>
    <a class="listio-footer__link" href="/termos" rel="nofollow">Termos de Uso</a>
    <a class="listio-footer__link" href="/privacidade" rel="nofollow">Pol\u00edtica de Privacidade</a>
  </nav>
</div>
<div class="listio-footer__bottom">
  <span class="listio-footer__copy">&copy; 2026 Listio. Todos os direitos reservados.</span>
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
    <a class="listio-footer__pill" href="https://app.listio.com.br/cadastro">Start for free \u2192</a>
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
  <span class="listio-footer__copy">&copy; 2026 Listio. All rights reserved.</span>
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
      Reposici\u00f3n de inventario inteligente para peque\u00f1os negocios.<br/>
      Checklists en el celular y claridad sobre qu\u00e9 comprar.
    </p>
    <a class="listio-footer__pill" href="https://app.listio.com.br/cadastro">Empezar gratis \u2192</a>
  </div>
  <nav aria-label="Producto" class="listio-footer__col">
    <span class="listio-footer__title">Producto</span>
    <a class="listio-footer__link" href="/es/precios">Precios</a>
    <a class="listio-footer__link" href="/es/#como-funciona">C\u00f3mo funciona</a>
    <a class="listio-footer__link" href="/es/#recursos">Recursos</a>
    <a class="listio-footer__link" href="/es/#para-quien">Para qui\u00e9n</a>
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
    <a class="listio-footer__link" href="/termos" rel="nofollow">T\u00e9rminos de Uso</a>
    <a class="listio-footer__link" href="/privacidade" rel="nofollow">Pol\u00edtica de Privacidad</a>
  </nav>
</div>
<div class="listio-footer__bottom">
  <span class="listio-footer__copy">&copy; 2026 Listio. Todos los derechos reservados.</span>
  <span class="listio-footer__mini-links">
    <a href="/termos" rel="nofollow">T\u00e9rminos</a>
    <a href="/privacidade" rel="nofollow">Privacidad</a>
    <a href="/es/contacto">Contacto</a>
  </span>
</div>
</div>
</footer>"""

FOOTER_RE = re.compile(r'<footer\b[^>]*>.*?</footer>', re.DOTALL)

def pick_footer(path):
    p = path.replace('\\', '/')
    if '/en/' in p: return EN_FOOTER
    if '/es/' in p: return ES_FOOTER
    return PT_FOOTER

files = glob.glob(ROOT + '/**/*.html', recursive=True)
files = [f for f in files if '_project' not in f.replace('\\', '/')]

updated, skipped = [], []
for path in sorted(files):
    with open(path, 'r', encoding='utf-8') as fh:
        html = fh.read()
    if '<footer' not in html:
        skipped.append(path)
        continue
    new_html, count = FOOTER_RE.subn(pick_footer(path), html)
    if count == 0:
        skipped.append(path)
        continue
    with open(path, 'w', encoding='utf-8') as fh:
        fh.write(new_html)
    updated.append(os.path.relpath(path, ROOT))

print(f'Updated {len(updated)} files:')
for f in updated: print(' ', f)
if skipped: print(f'Skipped (no footer): {len(skipped)}')
