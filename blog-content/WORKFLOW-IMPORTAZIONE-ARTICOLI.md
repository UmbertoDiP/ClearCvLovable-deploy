# Workflow Importazione Articoli da ChatGPT

## Procedura Standard per Importare Nuovi Articoli

### Step 1: Generazione con ChatGPT

1. Copia il prompt master da `CHATGPT-MASTER-PROMPT-BLOG-ARTICLES.md`
2. Fornisci a ChatGPT topic/keyword desiderato
3. ChatGPT genera articolo in formato Markdown con metadata YAML

**Output ChatGPT**:
```markdown
---
title: "Titolo Articolo"
description: "Meta description"
keywords: "keyword1, keyword2, keyword3"
category: "Guide|Template|Consigli"
tags: "#Tag1, #Tag2, #Tag3"
date: "YYYY-MM-DD"
reading_time: "X min lettura"
word_count: "XXX"
lang: "it-IT"
---

[Contenuto articolo in HTML]
```

### Step 2: Salva Markdown Localmente

Salva l'output di ChatGPT in:
```
blog-content/drafts/[slug-articolo].md
```

Esempio:
```
blog-content/drafts/cv-settore-it.md
blog-content/drafts/lettera-presentazione-perfetta.md
```

### Step 3: Import e Conversione (Claude Code)

**Tu mi passi** il path del file Markdown salvato e io eseguo automaticamente:

#### Verifica 1: Data Articolo
```javascript
// Controllo che la data non sia futura
const articleDate = new Date(metadata.date);
const today = new Date();
if (articleDate > today) {
  console.error(`❌ ERRORE: Data articolo (${metadata.date}) è futura!`);
  // Correggo automaticamente con data di oggi
  metadata.date = today.toISOString().split('T')[0];
}
```

**Regola**: Data massima = oggi (4 gennaio 2026 al momento)

#### Verifica 2: Metadata Coerenza

Controllo che:
- `category` sia una delle 3 valide: "Guide", "Template", "Consigli"
- `tags` siano formattati come `#Tag1, #Tag2` (max 3 tag)
- `word_count` sia realistico (700-1500 parole)
- `reading_time` sia coerente con word count (word_count / 150 = minuti)

#### Verifica 3: Icona Emoji Article Card

Assegno emoji automaticamente in base alla categoria:

| Categoria | Emoji Suggerite |
|-----------|----------------|
| Guide | 📝 📚 📖 ✏️ |
| Template | 📄 📋 🎯 📑 |
| Consigli | 💡 ⚡ 🔍 ✨ |

**Se l'articolo ha già un'emoji nei metadata**, la uso. Altrimenti assegno default.

#### Verifica 4: URL Slug

Genero slug SEO-friendly:
```javascript
const slug = metadata.title
  .toLowerCase()
  .replace(/[^a-z0-9]+/g, '-')
  .replace(/^-|-$/g, '');
// "Come Scrivere CV per IT" → "come-scrivere-cv-per-it"
```

#### Verifica 5: Struttura HTML Completa

Genero il file HTML finale con:
- ✅ Navbar completo (copiato da template)
- ✅ Breadcrumbs: `Blog / [Titolo Articolo]`
- ✅ Article metadata box con categoria e tag
- ✅ Open Graph tags completi
- ✅ Twitter Card tags
- ✅ Schema.org BlogPosting JSON-LD
- ✅ Footer
- ✅ Link agli asset CSS/JS corretti

#### Verifica 6: Link Interni

Controllo che tutti i link a categorie/tag siano corretti:
```html
<a href="/it/blog/categoria/guide">Guide</a>
<a href="/it/blog/tag/cv">#CV</a>
```

#### Verifica 7: CTA Box

Verifico che l'articolo abbia una CTA box alla fine:
```html
<div class="cta-box">
    <h3>🚀 Crea il Tuo CV Perfetto con ClearCV</h3>
    <p>Genera un curriculum professionale in 5 minuti...</p>
    <a href="https://clearcvapp.com" class="cta-button">Inizia Gratis →</a>
</div>
```

Se manca, la aggiungo automaticamente.

### Step 4: Creazione Struttura Directory

Creo automaticamente:
```
blog-static/it/blog/[slug-articolo]/
└── index.html
```

### Step 5: Aggiornamento Blog Index

Aggiungo automaticamente l'article card al blog index (`it/blog/index.html`):

```html
<div class="article-card">
    <div class="article-image">[EMOJI]</div>
    <div class="article-content">
        <div class="article-meta">📅 [DATA] • ⏱️ [READING_TIME]</div>
        <h2 class="article-title">
            <a href="/it/blog/[slug]">[TITLE]</a>
        </h2>
        <p class="article-excerpt">[DESCRIPTION]</p>
        <div class="article-tags">
            [TAGS]
        </div>
    </div>
</div>
```

**Posizione**: Aggiungo in testa alla griglia (articolo più recente per primo)

### Step 6: Aggiornamento Sitemap

Aggiungo l'URL al `sitemap.xml`:

```xml
<url>
  <loc>https://clearcvapp.com/it/blog/[slug]/</loc>
  <lastmod>[DATA]</lastmod>
  <changefreq>monthly</changefreq>
  <priority>0.9</priority>
</url>
```

### Step 7: Aggiornamento Pagine Categoria

Se la categoria dell'articolo è "Guide", aggiungo la card anche a:
```
blog-static/it/blog/categoria/guide/index.html
```

Stessa cosa per "Template" e "Consigli".

### Step 8: Verifica Finale

Eseguo controlli finali:

```bash
# 1. HTML valido
curl -s http://localhost:8080/it/blog/[slug]/ | head -10

# 2. Status 200
curl -I http://localhost:8080/it/blog/[slug]/ | grep "HTTP"

# 3. OG tags presenti
curl -s http://localhost:8080/it/blog/[slug]/ | grep "og:title"

# 4. Schema.org presente
curl -s http://localhost:8080/it/blog/[slug]/ | grep "BlogPosting"
```

### Step 9: Report

Genero un report di importazione:

```
✅ Articolo importato con successo!

📄 Titolo: Come Scrivere un CV per il Settore IT
🔗 URL: https://clearcvapp.com/it/blog/come-scrivere-cv-per-settore-it/
📅 Data: 2026-01-04 (validata ✓)
📁 Categoria: Guide
🏷️ Tag: #CV, #IT, #Settore
📊 Word count: 950 parole
⏱️ Reading time: 6 min lettura
🎨 Emoji: 💻

📋 File generati:
- blog-static/it/blog/come-scrivere-cv-per-settore-it/index.html
- Updated: blog-static/it/blog/index.html (aggiunto article card)
- Updated: blog-static/sitemap.xml (aggiunto URL)
- Updated: blog-static/it/blog/categoria/guide/index.html (aggiunto nella categoria)

✅ Pronto per commit e deploy!
```

---

## Comando Rapido

Per importare un articolo, tu esegui semplicemente:

```
Claude, importa l'articolo da: blog-content/drafts/cv-settore-it.md
```

E io eseguo automaticamente tutti i 9 step sopra.

---

## Checklist Pre-Import (da verificare manualmente)

Prima di passarmi il file Markdown, verifica che:

- [ ] Articolo ha metadata YAML completi
- [ ] Content è in HTML (non Markdown puro)
- [ ] Ha almeno 700 parole
- [ ] Ha almeno 2 tip-box
- [ ] Ha CTA box alla fine
- [ ] Nessun errore ortografico evidente
- [ ] Keywords distribuite naturalmente

---

## Esempio Completo

### Input (da ChatGPT):

File: `blog-content/drafts/cv-settore-it.md`

```markdown
---
title: "CV per il Settore IT: Guida Completa e Template"
description: "Scopri come creare un CV efficace per il settore IT e tecnologia. Template, esempi e consigli specifici per sviluppatori e professionisti tech."
keywords: "cv settore it, curriculum sviluppatore, cv programmatore, cv tech"
category: "Guide"
tags: "#CV, #IT, #Tecnologia"
date: "2026-01-05"
reading_time: "7 min lettura"
word_count: "980"
lang: "it-IT"
emoji: "💻"
---

<h2>Introduzione</h2>
<p>Il settore IT è altamente competitivo...</p>

[... resto del contenuto ...]

<div class="cta-box">
    <h3>🚀 Crea il Tuo CV Tech con ClearCV</h3>
    <p>Template ottimizzati per il settore IT...</p>
    <a href="https://clearcvapp.com" class="cta-button">Inizia Gratis →</a>
</div>
```

### Output (dopo import):

**Console output**:
```
⚠️  WARNING: Data articolo (2026-01-05) è futura!
✅ Data corretta automaticamente: 2026-01-04

✅ Metadata validati
✅ Categoria: Guide ✓
✅ Tags: 3 tag validi ✓
✅ Word count realistico: 980 ✓
✅ Reading time coerente: 7 min ✓
✅ Emoji personalizzata: 💻 ✓

📁 Creato: blog-static/it/blog/cv-settore-it/index.html
📝 Aggiornato: blog-static/it/blog/index.html
🗺️  Aggiornato: blog-static/sitemap.xml
📂 Aggiornato: blog-static/it/blog/categoria/guide/index.html

✅ Articolo pronto per deploy!

Verifica locale:
  http://localhost:8080/it/blog/cv-settore-it/
```

---

## Note Importanti

### Date Management

**REGOLA ASSOLUTA**: La data dell'articolo NON può MAI essere futura.

Se ChatGPT genera una data futura:
- ❌ **SBAGLIATO**: `date: "2026-01-10"` (siamo il 4 gennaio)
- ✅ **CORRETTO**: Io la correggo automaticamente con `date: "2026-01-04"`

**Eccezione**: Se tu mi dici esplicitamente "usa data passata", posso usare una data nei 7 giorni precedenti.

### Icone Emoji

Se ChatGPT non fornisce emoji nei metadata, io assegno automaticamente:

| Keyword nell'articolo | Emoji assegnata |
|----------------------|----------------|
| "settore", "tech", "IT" | 💻 |
| "neolaureato" | 🎓 |
| "errori", "evitare" | ⚠️ |
| "europass" | 🇪🇺 |
| "template" | 📋 |
| Default Guide | 📝 |
| Default Template | 📄 |
| Default Consigli | 💡 |

### SEO Keywords

Quando importo l'articolo, eseguo anche un'analisi keyword density:
- Keyword principale deve apparire 1-2% delle parole totali
- Se troppo bassa, suggerisco dove aggiungere keyword naturalmente
- Se troppo alta (keyword stuffing), avverto

---

## FAQ

**Q: Posso importare articoli in altre lingue?**
A: Sì, ma per ora il workflow automatico supporta solo italiano. Per altre lingue, devo creare manualmente.

**Q: Posso modificare un articolo dopo l'import?**
A: Sì, puoi modificare `blog-static/it/blog/[slug]/index.html` manualmente. Poi fai commit e redeploy.

**Q: Come aggiorno la data di un articolo?**
A: Modifica manualmente l'HTML dell'articolo, aggiorna `article:modified_time` nell'Open Graph, e aggiorna `lastmod` nel sitemap.xml.

**Q: Posso cambiare categoria dopo l'import?**
A: Sì, ma devi:
1. Modificare metadata nell'articolo
2. Rimuovere dalla vecchia categoria page
3. Aggiungere alla nuova categoria page
4. Aggiornare article card nel blog index

**Q: Come gestisco articoli multilingua?**
A: Per ora generi solo IT. Quando vuoi altre lingue, usi ChatGPT per tradurre, poi importi con lo stesso workflow modificando il path (`en/blog/`, `es/blog/`, etc.)

---

**Versione**: 1.0
**Data**: 2026-01-04
**Autore**: ClearCV Blog Team
