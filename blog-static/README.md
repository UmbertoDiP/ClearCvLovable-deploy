# ClearCV Blog - Sistema Statico Multilingua

Blog statico per ClearCV con supporto a 23 lingue.

## Struttura Directory

```
blog-static/
├── _build/              ← Script generazione HTML
│   └── generate-html.js
├── _content/            ← Contenuti markdown per lingua
│   ├── it/              ← Articoli italiani
│   ├── en/              ← Articoli inglesi
│   └── [22 altre lingue]
├── _templates/          ← Template HTML condivisi
│   ├── article.html     ← Template singolo articolo
│   └── index.html       ← Template lista articoli
├── _docs/               ← Documentazione
│   ├── TRANSLATION-PROMPT.md   ← Guida traduzione
│   ├── ARTICLE-GENERATION.md   ← Guida creazione articoli
│   └── README-BLOG-SYSTEM.md   ← Sistema blog
├── assets/              ← CSS, JS, risorse statiche
├── it/, en/, de/, ...   ← Output HTML generato (NON modificare)
└── README.md            ← Questo file
```

## Quick Start

### 1. Creare Nuovo Articolo

```bash
# 1. Scrivi articolo in italiano
nano _content/it/nuovo-articolo.md

# 2. Traduci in altre lingue (vedi _docs/TRANSLATION-PROMPT.md)

# 3. Rigenera HTML
cd _build
node generate-html.js --rebuild-all
```

### 2. Modificare Articolo Esistente

```bash
# 1. Modifica file markdown
nano _content/it/come-scrivere-cv-perfetto.md

# 2. Rigenera HTML
cd _build
node generate-html.js --rebuild-all
```

## Lingue Supportate (23)

it, en, de, fr, es, pt, nl, pl, ro, el, cs, hu, sv, da, fi, no, sk, hr, sl, bg, lt, lv, et

## Documentazione

- **Traduzione**: `_docs/TRANSLATION-PROMPT.md`
- **Generazione Articoli**: `_docs/ARTICLE-GENERATION.md`
- **Sistema Completo**: `_docs/README-BLOG-SYSTEM.md`

## Regole Importanti

❌ **MAI modificare HTML** in `it/blog/`, `en/blog/`, ecc. direttamente
✅ **SEMPRE modificare** file `.md` in `_content/`
✅ **SEMPRE rigenerare** con `node generate-html.js --rebuild-all`

## Deploy

Deploy automatico su Cloudflare Pages:
- Push su `master` → Auto-deploy
- URL: https://clearcvapp.com/[lang]/blog/
