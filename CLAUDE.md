# CLAUDE.md — Listio Website

Este arquivo é a fonte de verdade do projeto. Leia integralmente antes de criar ou editar qualquer arquivo.

---

## STACK TÉCNICA

- **Framework:** React + Vite
- **Roteamento:** React Router DOM
- **Estilo:** CSS puro — arquivos `.css` por componente ou página
- **Sem:** Tailwind, Bootstrap, styled-components, CSS-in-JS, shadcn, Material UI
- **Ícones:** Lucide React (`import { IconName } from 'lucide-react'`)
- **Fonte:** Inter via Google Fonts (pesos: 200, 400, 500, 600)
- **Node:** >= 18

---

## ESTRUTURA DE PASTAS

```
src/
  components/
    Nav.jsx + Nav.css
    Footer.jsx + Footer.css
    Layout.jsx
  pages/
    Home.jsx + Home.css
    Funcionalidades.jsx
    FuncionalidadeDetalhe.jsx   ← template para as 6 subpáginas
    ParaQuem.jsx
    SegmentoDetalhe.jsx         ← template para os 5 segmentos
    ComoFunciona.jsx
    Precos.jsx
    Blog.jsx
    Artigo.jsx
    Sobre.jsx
    Contato.jsx
    Termos.jsx
    Privacidade.jsx
  styles/
    global.css                  ← tokens CSS + reset + tipografia base
  App.jsx
  main.jsx
```

---

## ROTAS (React Router)

```jsx
<Route path="/"                                  element={<Home />} />
<Route path="/funcionalidades"                   element={<Funcionalidades />} />
<Route path="/funcionalidades/:slug"             element={<FuncionalidadeDetalhe />} />
<Route path="/para-quem"                         element={<ParaQuem />} />
<Route path="/para-quem/:slug"                   element={<SegmentoDetalhe />} />
<Route path="/como-funciona"                     element={<ComoFunciona />} />
<Route path="/precos"                            element={<Precos />} />
<Route path="/blog"                              element={<Blog />} />
<Route path="/blog/:slug"                        element={<Artigo />} />
<Route path="/sobre"                             element={<Sobre />} />
<Route path="/contato"                           element={<Contato />} />
<Route path="/termos"                            element={<Termos />} />
<Route path="/privacidade"                       element={<Privacidade />} />
```

---

## TOKENS CSS — global.css

Cole exatamente isso no `:root`. Nunca use valores hardcoded — sempre use os tokens.

```css
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@200;400;500;600&display=swap');

*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

html { font-size: 16px; }

body {
  font-family: var(--font-base);
  background-color: var(--white);
  color: var(--ink);
  -webkit-font-smoothing: antialiased;
}

:root {
  /* Cores primárias */
  --green:          #D4DA42;
  --green-dark:     #B8BE2A;
  --green-subtle:   #F2F5C2;

  /* Neutros */
  --ink:            #1A1A18;
  --charcoal:       #292929;
  --muted:          #6B6B66;
  --surface:        #F4F4F4;
  --canvas:         #F8F8F8;
  --line:           #E2E3D8;
  --white:          #FFFFFF;

  /* Cores auxiliares — somente para status e categorias */
  --blue:           #4A90E2;
  --blue-subtle:    #EBF3FD;
  --pink:           #E96B8A;
  --pink-subtle:    #FDF0F3;
  --amber:          #F5A623;
  --amber-subtle:   #FEF9EE;
  --red:            #E53935;
  --red-subtle:     #FFF5F5;

  /* Tipografia */
  --font-base:      'Inter', sans-serif;

  /* Border radius */
  --r-sm:           6px;
  --r-md:           8px;
  --r-lg:           12px;
  --r-xl:           16px;
  --r-2xl:          24px;
  --r-pill:         9999px;

  /* Espaçamento (base 4px) */
  --sp-xs:          4px;
  --sp-sm:          8px;
  --sp-md:          12px;
  --sp-lg:          16px;
  --sp-xl:          24px;
  --sp-2xl:         32px;
  --sp-3xl:         48px;
  --sp-4xl:         64px;
  --sp-5xl:         96px;
}
```

---

## TIPOGRAFIA

| Token      | Tamanho | Peso | Uso |
|------------|---------|------|-----|
| display    | 48px    | 600  | Hero principal |
| h1         | 36px    | 600  | Título de página |
| h2         | 28px    | 600  | Título de seção |
| h3         | 20px    | 600  | Subtítulo de card |
| body-lg    | 18px    | 400  | Texto de apoio, subtítulo hero |
| body       | 16px    | 400  | Texto corrido |
| body-sm    | 14px    | 500  | Label de campo, nav link |
| caption    | 12px    | 400  | Metadado, data, horário |
| overline   | 11px    | 600  | Tag acima de título (uppercase, letter-spacing 0.08em) |

Parágrafos: `line-height: 1.7`. Títulos: `line-height: 1.2`.

---

## REGRAS DE DESIGN — NUNCA VIOLAR

1. **Sem box-shadow** — hierarquia via borda (`1px solid var(--line)`) e cor de fundo
2. **Verde `#D4DA42` é exclusivo** para CTA primário, badge de destaque e fundo de seção accent
3. **Fundos de página e card:** sempre `#FFFFFF` ou `#F4F4F4` — nunca tons amarelados/esverdeados como `#F0F1E9`
4. **Sem Tailwind** — CSS puro com tokens
5. **Mobile first** — escrever CSS mobile primeiro, depois `@media (min-width: 768px)` e `(min-width: 1024px)`
6. **Máximo 1 botão Primary por seção**
7. **CTA de cadastro:** sempre `href="https://app.listio.com.br/cadastro"`

---

## COMPONENTES

### Botões

```css
/* Base */
.btn {
  font-family: var(--font-base);
  font-size: 14px;
  font-weight: 600;
  padding: 12px 24px;
  border-radius: var(--r-md);
  border: none;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  gap: var(--sp-sm);
  transition: background 150ms ease, color 150ms ease;
  text-decoration: none;
}

/* Primary — único CTA principal da tela */
.btn-primary { background: var(--green); color: var(--ink); }
.btn-primary:hover { background: var(--green-dark); }

/* Secondary solid */
.btn-secondary { background: var(--ink); color: var(--white); }
.btn-secondary:hover { background: var(--charcoal); }

/* Ghost / Outline */
.btn-ghost { background: transparent; color: var(--ink); border: 1px solid var(--line); }
.btn-ghost:hover { background: var(--surface); }

/* Subtle */
.btn-subtle { background: var(--surface); color: var(--muted); border: 1px solid var(--line); }

/* Danger */
.btn-danger { background: var(--red-subtle); color: var(--red); border: 1px solid #FDDEDE; }

/* Tamanhos */
.btn-sm { padding: 8px 16px; font-size: 12px; border-radius: var(--r-sm); }
.btn-lg { padding: 14px 32px; font-size: 16px; }
.btn-full { width: 100%; justify-content: center; }
```

### Cards

```css
/* Card padrão */
.card {
  background: var(--white);
  border: 1px solid var(--line);
  border-radius: var(--r-lg);
  padding: var(--sp-xl);
}
.card:hover { border-color: var(--green); transition: border-color 150ms ease; }
.card.selected { border: 1.5px solid var(--green); background: var(--green-subtle); }

/* Card de superfície */
.card-surface {
  background: var(--surface);
  border-radius: var(--r-lg);
  padding: 20px 24px;
}

/* Card dark (destaque) */
.card-dark {
  background: var(--ink);
  color: var(--white);
  border-radius: var(--r-xl);
  padding: var(--sp-2xl);
}

/* Card accent (verde) */
.card-accent {
  background: var(--green);
  color: var(--ink);
  border-radius: var(--r-xl);
  padding: var(--sp-2xl);
}
```

### Inputs

```css
.input {
  height: 44px;
  padding: 12px 16px;
  font-family: var(--font-base);
  font-size: 14px;
  color: var(--ink);
  background: var(--white);
  border: 1px solid var(--line);
  border-radius: var(--r-md);
  width: 100%;
  outline: none;
  transition: border-color 150ms ease;
}
.input:focus { border: 1.5px solid var(--green); }
.input:disabled { background: var(--surface); opacity: 0.6; cursor: not-allowed; }
.input.error { border: 1.5px solid var(--red); }
.input::placeholder { color: var(--muted); }

.label {
  display: block;
  font-size: 12px;
  font-weight: 500;
  color: var(--ink);
  margin-bottom: 6px;
}
.field-error { font-size: 12px; color: var(--red); margin-top: 4px; }
```

### Badges / Tags

```css
.badge {
  display: inline-flex;
  align-items: center;
  padding: 4px 10px;
  border-radius: var(--r-pill);
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 0.02em;
}
.badge-green  { background: var(--green-subtle); color: #5a7a00; }
.badge-blue   { background: var(--blue-subtle);  color: #1A4F8A; }
.badge-amber  { background: var(--amber-subtle); color: #8A5A00; }
.badge-red    { background: var(--red-subtle);   color: #B71C1C; }
.badge-gray   { background: var(--surface);      color: var(--muted); }
.badge-dark   { background: var(--ink);          color: var(--green); }
.badge-accent { background: var(--green);        color: var(--ink); }
```

### Seções de página

Toda seção usa esta estrutura:

```jsx
<section className="section">
  <div className="container">
    {/* conteúdo */}
  </div>
</section>
```

```css
.section { padding: var(--sp-5xl) 0; }
.section-sm { padding: var(--sp-4xl) 0; }

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 var(--sp-xl);
}

/* Variantes de fundo de seção */
.section-white  { background: var(--white); }
.section-gray   { background: var(--canvas); }
.section-green  { background: var(--green); }   /* texto: var(--ink) */
.section-dark   { background: var(--ink); color: var(--white); }

/* Cabeçalho de seção (overline + título + subtítulo) */
.section-header { text-align: center; max-width: 640px; margin: 0 auto var(--sp-3xl); }
.section-overline {
  display: inline-block;
  font-size: 11px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: var(--muted);
  margin-bottom: var(--sp-sm);
}
.section-green .section-overline { color: var(--charcoal); }
.section-dark .section-overline  { color: var(--muted); }
```

---

## NAV — Nav.jsx

```
Altura: 60px
Posição: fixed top-0, z-index 100
Fundo: #FFFFFF com backdrop-filter: blur(14px)
Borda inferior: 1px solid var(--line)

Conteúdo (esquerda → direita):
  [Logo] → link para /
  Links: Funcionalidades · Para quem é · Como funciona · Preços · Blog
  [Botão Ghost "Entrar"] [Botão Primary "Criar conta grátis"]

Mobile (< 768px):
  Hambúrguer icon (Lucide: Menu)
  Drawer/menu que abre com todos os links + CTAs
  Botão "Criar conta grátis" full-width no final do drawer
```

---

## FOOTER — Footer.jsx

```
Fundo: var(--ink) — #1A1A18
Cor de texto: var(--white)
Links: cor var(--muted), hover var(--white)

Layout 4 colunas desktop, 2 tablet, 1 mobile:
  Col 1 — Brand:   [Logo branco] · Tagline · Links sociais (Instagram, LinkedIn)
  Col 2 — Produto: Funcionalidades · Preços · Como funciona · Para quem é
  Col 3 — Empresa: Sobre · Blog · Contato
  Col 4 — Legal:   Termos de uso · Política de privacidade

Barra inferior:
  Linha 1px solid #292929
  "© 2026 Listio. Todos os direitos reservados." · CNPJ
```

---

## PÁGINAS — ESTRUTURA DE SEÇÕES

### Home (/)

| # | Seção | Fundo |
|---|-------|-------|
| 1 | Hero: título h1 + subtítulo + CTA Primary + CTA Ghost + prova social | white |
| 2 | Métricas: 4 números grandes em linha | **green** |
| 3 | O Problema: overline + h2 + grid 3 cards de dor | white |
| 4 | Grid de Funcionalidades: h2 + grid 2×3 de cards + CTA Ghost | white |
| 5 | Para quem é: chips de segmento + conteúdo dinâmico | gray |
| 6 | Como Funciona: 4 steps numerados em linha | white |
| 7 | Tabela Comparativa: Planilha vs Listio | white |
| 8 | Depoimentos: carrossel de cards | white |
| 9 | CTA Final: h2 + CTA dark + linha de confiança | **green** |

### /funcionalidades

| # | Seção | Fundo |
|---|-------|-------|
| 1 | Hero: h1 + subtítulo + CTA | white |
| 2 | Grid 2 colunas de cards grandes (6 funcionalidades) | white |
| 3 | CTA Final | **green** |

### /funcionalidades/:slug
*(checklists · reposicao · pedidos · fornecedores · multi-loja · painel)*

| # | Seção | Fundo |
|---|-------|-------|
| 1 | Hero: breadcrumb + badge + h1 + subtítulo + CTA | white |
| 2 | Problema → Solução (2 colunas: X vs ✓) | white |
| 3 | Como funciona: 3 steps com visual | white |
| 4 | Features incluídas: grid 2 colunas | gray |
| 5 | Depoimento relacionado | white |
| 6 | CTA + links para outras funcionalidades | **green** |

### /para-quem

| # | Seção | Fundo |
|---|-------|-------|
| 1 | Hero: h1 + subtítulo + CTA | white |
| 2 | Grid de segmentos (5 cards) | white |
| 3 | CTA Final | **green** |

### /para-quem/:slug
*(lojas-conveniencia · minimercados · bares-restaurantes · adegas · pequenas-redes)*

| # | Seção | Fundo |
|---|-------|-------|
| 1 | Hero: breadcrumb + h1 + subtítulo + CTA | white |
| 2 | Desafios específicos do segmento (3 cards) | white |
| 3 | Funcionalidades mais usadas pelo segmento | gray |
| 4 | Depoimento do segmento | white |
| 5 | CTA Final | **green** |

### /como-funciona

| # | Seção | Fundo |
|---|-------|-------|
| 1 | Hero: h1 + subtítulo + CTA | white |
| 2 | Passo a passo: 4 steps alternados (texto + visual) | white |
| 3 | Compatibilidade: mobile / tablet / desktop | gray |
| 4 | FAQ accordion (4 perguntas) | white |
| 5 | CTA Final | **green** |

### /precos

| # | Seção | Fundo |
|---|-------|-------|
| 1 | Hero: h1 + toggle Mensal/Anual | white |
| 2 | Cards de planos (Grátis · Pro · Business) + tabela comparativa | white |
| 3 | Garantia: "Cancele quando quiser" + 3 itens de confiança | **green** |
| 4 | FAQ de preços (accordion) | white |

### /blog

| # | Seção | Fundo |
|---|-------|-------|
| 1 | Header: h1 + subtítulo + chips de categoria | white |
| 2 | Artigo em destaque (card grande) | white |
| 3 | Grid de artigos 3 colunas + paginação | white |

### /blog/:slug

| # | Seção | Fundo |
|---|-------|-------|
| 1 | Header: breadcrumb + tag + h1 + meta + imagem de capa | white |
| 2 | Corpo do artigo (max-width 720px centralizado) | white |
| 3 | CTA inline contextual | **green** |
| 4 | Artigos relacionados (3 cards) | white |

### /sobre

| # | Seção | Fundo |
|---|-------|-------|
| 1 | Hero: h1 + subtítulo + visual | white |
| 2 | Missão e valores (3 cards) | **green** |
| 3 | Números da empresa (grid de métricas) | white |
| 4 | Time (grid de cards com foto + nome + cargo) | white |
| 5 | CTA Final | **dark** |

### /contato

| # | Seção | Fundo |
|---|-------|-------|
| 1 | Hero: h1 + subtítulo | white |
| 2 | Formulário: Nome · Email · Telefone · Assunto (select) · Mensagem · CTA | white |
| 3 | Canais alternativos: email · WhatsApp · Instagram · Horário | gray |

### /termos e /privacidade

```
Layout simples de leitura
Coluna central max-width 800px, centralizada
h1 + data de atualização
Seções numeradas com h2
Parágrafos com line-height 1.8
```

---

## RESPONSIVIDADE

```css
/* Mobile first — escrever CSS base para mobile */

/* Tablet */
@media (min-width: 640px) { ... }

/* Desktop */
@media (min-width: 1024px) { ... }

/* Desktop large */
@media (min-width: 1280px) { ... }
```

Regras mobile:
- Grid sempre 1 coluna
- Padding horizontal: 16px
- Botões CTA: full-width
- Nav: hambúrguer + drawer
- Hero: coluna única, visual abaixo do texto

---

## DADOS DE EXEMPLO (usar até ter conteúdo real)

```js
// src/data/funcionalidades.js
export const funcionalidades = [
  { slug: 'checklists',    nome: 'Checklists',             icone: 'CheckSquare', categoria: 'Operação' },
  { slug: 'reposicao',     nome: 'Reposição Automática',   icone: 'RefreshCw',   categoria: 'Estoque' },
  { slug: 'pedidos',       nome: 'Gestão de Pedidos',      icone: 'ShoppingCart',categoria: 'Compras' },
  { slug: 'fornecedores',  nome: 'Gestão de Fornecedores', icone: 'Truck',       categoria: 'Compras' },
  { slug: 'multi-loja',    nome: 'Multi-loja',             icone: 'Store',       categoria: 'Gestão', badge: 'Novo' },
  { slug: 'painel',        nome: 'Painel e Métricas',      icone: 'BarChart2',   categoria: 'Visão geral' },
];

// src/data/segmentos.js
export const segmentos = [
  { slug: 'lojas-conveniencia',  nome: 'Lojas de Conveniência' },
  { slug: 'minimercados',        nome: 'Minimercados' },
  { slug: 'bares-restaurantes',  nome: 'Bares e Restaurantes' },
  { slug: 'adegas',              nome: 'Adegas' },
  { slug: 'pequenas-redes',      nome: 'Pequenas Redes' },
];
```

---

## PLACEHOLDERS DE IMAGEM

Enquanto não há imagens reais, use:

```jsx
// Retângulo placeholder
<div className="img-placeholder" style={{ aspectRatio: '16/9' }} />
```

```css
.img-placeholder {
  background: var(--surface);
  border-radius: var(--r-lg);
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}
.img-placeholder::after {
  content: '[imagem]';
  font-size: 12px;
  color: var(--muted);
  font-family: var(--font-base);
}
```

---

## ANTI-PATTERNS — NUNCA FAZER

```
❌ box-shadow em qualquer elemento
❌ Fundos #F0F1E9, #F7F8F2 ou qualquer tom amarelado/esverdeado
❌ Usar --green fora de CTA primário, badge de destaque ou seção accent
❌ Dois botões Primary na mesma seção
❌ Importar qualquer biblioteca de UI (Tailwind, MUI, Chakra, etc.)
❌ Valores de cor hardcoded (usar sempre os tokens --green, --ink, etc.)
❌ font-weight: 700 ou 800 — máximo 600
❌ border-radius acima de 24px em cards (exceto --r-pill em badges)
❌ Criar rotas fora das definidas acima sem consultar
❌ Alterar a URL do CTA de cadastro
```

---

## CTA DE CADASTRO

```
URL: https://app.listio.com.br/cadastro
Texto padrão: "Criar conta grátis"
Variações aceitas: "Começar grátis" · "Experimentar grátis" · "Começar agora"
```

---

*Listio Design System · v1.0 · 2026*
