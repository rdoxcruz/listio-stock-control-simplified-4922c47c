# Projeto reorganizado

## O que foi feito
- Extração do CSS inline das páginas para `/assets/css/pages/`
- Extração do JavaScript inline das páginas para `/assets/js/pages/`
- Centralização dos CSS de template em `/assets/css/templates/`
- Remoção das duplicações de `/en/assets` e `/es/assets`, apontando tudo para `/assets`
- Criação de snapshots de componentes em `/_project/components/`
- Geração de inventário de rotas e relatório de extração em `/_project/reports/`

## Estrutura principal
- `/assets/css/blog.css` → CSS compartilhado do blog
- `/assets/css/templates/` → CSS de templates como blog-post e segmentos
- `/assets/css/pages/` → CSS extraído de cada página
- `/assets/js/main.js` e `/assets/js/config.js` → JS global
- `/assets/js/pages/` → JS extraído de cada página
- `/_project/components/` → snapshots de header/footer para referência futura
- `/_project/reports/routes.txt` → inventário de rotas
- `/_project/reports/extraction-report.json` → mapa do que foi extraído por página

## Observações
- As URLs públicas foram preservadas.
- A reorganização foi feita para facilitar manutenção e futuras edições por IA sem reescrever páginas inteiras.
- Antes de publicar, vale fazer um teste local em um servidor estático para validar comportamento de scripts.
