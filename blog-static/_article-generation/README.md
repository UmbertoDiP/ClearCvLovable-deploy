# Article Generation Scripts

Script per generare articoli blog con ChatGPT.

## Location (Path Assoluti)

```
C:\Users\umber\Documents\MyProjects\ClearCvLovable\blog-static\_article-generation\
├── generate-blog-articles.js   → Genera prompt ChatGPT
├── fill-articles-chatgpt.js    → Riempie articoli esistenti
├── generate-blog.py            → Script Python (legacy)
└── README.md                   → Questa guida
```

## Script Disponibili

### 1. generate-blog-articles.js

**Scopo**: Genera prompt ChatGPT per creare articoli SEO-optimized.

**Path Assoluto**:
```
C:\Users\umber\Documents\MyProjects\ClearCvLovable\blog-static\_article-generation\generate-blog-articles.js
```

**Usage**:
```bash
cd C:\Users\umber\Documents\MyProjects\ClearCvLovable\blog-static\_article-generation
node generate-blog-articles.js --count=10 --lang=it --output=both
```

**Output**:
- `../../blog-content/clearcv-blog-it-2026-01-06.csv`
- `../../blog-content/clearcv-blog-it-2026-01-06.json`
- `../../blog-content/clearcv-blog-it-2026-01-06-prompts.md` ← **Usa questo per ChatGPT**

**Parametri**:
- `--count=N` → Numero articoli da generare
- `--lang=XX` → Lingua (it, en, de, fr, es, etc.)
- `--output=csv|json|both` → Formato output

**Workflow**:
1. Genera prompts: `node generate-blog-articles.js --count=5 --lang=it`
2. Apri file prompts: `code ../../blog-content/clearcv-blog-it-YYYY-MM-DD-prompts.md`
3. Copia ogni prompt in ChatGPT
4. Salva output markdown in `../_content/it/[slug].md`
5. Rigenera HTML: `cd ../_build && node generate-html.js --rebuild-all`

---

### 2. fill-articles-chatgpt.js

**Scopo**: Riempie articoli esistenti (template) con contenuto.

**Path Assoluto**:
```
C:\Users\umber\Documents\MyProjects\ClearCvLovable\blog-static\_article-generation\fill-articles-chatgpt.js
```

**Usage**:
```bash
cd C:\Users\umber\Documents\MyProjects\ClearCvLovable\blog-static\_article-generation
node fill-articles-chatgpt.js
```

**Quando usare**:
- Hai già struttura articoli ma manca contenuto
- Vuoi espandere articoli esistenti
- Aggiorni vecchi articoli

---

### 3. generate-blog.py (Legacy)

**Scopo**: Script Python originale per blog generation.

**Path Assoluto**:
```
C:\Users\umber\Documents\MyProjects\ClearCvLovable\blog-static\_article-generation\generate-blog.py
```

**Note**: Deprecato, usa `generate-blog-articles.js` invece.

---

## Quick Reference

### Generare 5 articoli italiani
```bash
cd C:\Users\umber\Documents\MyProjects\ClearCvLovable\blog-static\_article-generation
node generate-blog-articles.js --count=5 --lang=it
```

### Vedere prompts generati
```bash
cat C:\Users\umber\Documents\MyProjects\ClearCvLovable\blog-content\clearcv-blog-it-*-prompts.md
```

### Dove salvare articoli ChatGPT
```
C:\Users\umber\Documents\MyProjects\ClearCvLovable\blog-static\_content\it\[slug-articolo].md
```

### Rigenerare HTML dopo creazione articoli
```bash
cd C:\Users\umber\Documents\MyProjects\ClearCvLovable\blog-static\_build
node generate-html.js --rebuild-all
```

---

## Documentazione Completa

Per guide dettagliate, vedi:
- `../_docs/ARTICLE-GENERATION.md` → Guida completa generazione
- `../_docs/TRANSLATION-PROMPT.md` → Come tradurre articoli
- `../README.md` → Overview sistema blog

---

## Keyword Database

Gli script includono keyword ad alto traffico:

**High Traffic** (1000-10000 searches/month):
- come scrivere un cv perfetto (8100)
- cv europeo 2026 compilabile (5400)
- curriculum vitae esempio (6600)

**Medium Traffic** (100-1000):
- cv con intelligenza artificiale (880)
- cv ats friendly cosa significa (720)

**Long-Tail** (10-100, alta conversione):
- cv sviluppatore software junior (140)
- cv marketing digitale esempio (130)

Per modificare/aggiungere keyword, edita `generate-blog-articles.js` linea 16-57.

---

## Tipi Articoli Generati

1. **Guide** (40%) - Intro → Sezioni → FAQ → Conclusione
2. **How-To** (30%) - Problema → Step-by-step → Errori
3. **Template** (20%) - Esempi pratici → Download
4. **Comparison** (10%) - Opzione A vs B → Tabella → Quando usare

---

## Support

Per problemi:
1. Verifica Node.js: `node --version` (richiede v14+)
2. Controlla path corretti negli script
3. Test con `--count=1` prima di batch grandi
4. Leggi documentazione completa in `../_docs/`
