"""
Fix: Remove erroneously inserted docs links from nav/mobile-menu/mini-links.
The correct insertion (footer Legal column) stays.
"""
import re, os

ROOT = 'C:/Users/rodol/Listio-old'
SKIP_DIRS = {'_project'}

DOCS_LINK_PAT = r'\n    <a class="listio-footer__link" href="https://help\.listio\.com\.br/" target="_blank" rel="noopener">[^<]+</a>'

html_files = []
for dirpath, dirnames, filenames in os.walk(ROOT):
    dirnames[:] = [d for d in dirnames if d not in SKIP_DIRS]
    for fn in filenames:
        if fn.endswith('.html'):
            html_files.append(os.path.join(dirpath, fn))

fixed = 0
for path in html_files:
    with open(path, 'r', encoding='utf-8') as f:
        content = f.read()

    if 'help.listio.com.br' not in content:
        continue

    original = content

    # 1. Remove docs links that appear BEFORE <footer> (nav, mobile-menu)
    if '<footer' in content:
        idx = content.index('<footer')
        before = re.sub(DOCS_LINK_PAT, '', content[:idx])
        content = before + content[idx:]

    # 2. Remove docs links inside <span class="listio-footer__mini-links">
    def clean_mini(m):
        return re.sub(DOCS_LINK_PAT, '', m.group(0))

    content = re.sub(
        r'<span class="listio-footer__mini-links">.*?</span>',
        clean_mini,
        content,
        flags=re.DOTALL
    )

    if content != original:
        with open(path, 'w', encoding='utf-8') as f:
            f.write(content)
        print(f'FIXED: {path}')
        fixed += 1

print(f'\nDone — {fixed} file(s) fixed.')
