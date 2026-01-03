# Blog Workflow Autopubblicazione WordPress

Sistema completo per generare, riempire e auto-pubblicare articoli blog in massa con ChatGPT + WordPress.

## Panoramica

```
[1] Generate       → [2] Fill ChatGPT  → [3] Import WordPress → [4] Auto-Publish
    Structure          API Content          WP All Import         Cron Schedule
    (30 articoli)      (AI content)         (bulk upload)         (1/day)
```

**Tempo totale**: 2-3 ore per 30 articoli
**Costo**: $3-6 (OpenAI API) + $0 (WordPress gratis)

---

## Step 1: Generate Article Structure (5 min)

Genera scheletro articoli con metadati SEO:

```bash
cd scripts

# Italiano - 30 articoli
node generate-blog-articles.js --count=30 --lang=it --output=both

# English - 30 articoli
node generate-blog-articles.js --count=30 --lang=en --output=both
```

**Output**:
```
blog-content/
├── clearcv-blog-it-2026-01-03.json          # Dati strutturati
├── clearcv-blog-it-2026-01-03.csv           # Per import WordPress
└── clearcv-blog-it-2026-01-03-prompts.md    # Prompts ChatGPT
```

**Contenuto JSON** (esempio):
```json
[
  {
    "title": "come scrivere un cv perfetto",
    "slug": "come-scrivere-cv-perfetto",
    "content": "<!-- TO BE FILLED BY CHATGPT -->",
    "excerpt": "Guida completa: come scrivere un cv perfetto...",
    "status": "scheduled",
    "publish_date": "2026-01-04T00:00:00.000Z",
    "author": "ClearCV Blog",
    "category": "Guide CV",
    "tags": "cv gratis, curriculum vitae, cv maker, scrivere, perfetto",
    "meta_description": "come scrivere un cv perfetto - Guida completa 2026...",
    "focus_keyphrase": "come scrivere un cv perfetto",
    "seo_title": "come scrivere un cv perfetto - Guida 2026 | ClearCV",
    "lang": "it",
    "chatgpt_prompt": "Scrivi un articolo SEO-optimized..."
  }
]
```

---

## Step 2: Fill Content con ChatGPT API (1-2 ore)

### Opzione A: ChatGPT API (Automatico, $3-6)

**Setup iniziale** (una volta):
```bash
# Installa dipendenze
npm install openai dotenv

# Crea file .env
echo "OPENAI_API_KEY=sk-..." > .env
```

**Run**:
```bash
# Riempi articoli con AI (automatico)
node fill-articles-chatgpt.js --input=../blog-content/clearcv-blog-it-2026-01-03.json
```

**Output**:
```
🚀 Starting ChatGPT content generation

[1/30] Processing: come scrivere un cv perfetto
  📡 Calling ChatGPT API...
  ✅ Generated 2847 tokens (2103 output)
  💰 Estimated cost: $0.0634

[2/30] Processing: cv europeo 2026 compilabile
  📡 Calling ChatGPT API...
  ✅ Generated 2692 tokens (1989 output)
  💰 Estimated cost: $0.0598

...

✅ Generation Complete!

📊 Statistics:
   Success: 30
   Errors: 0
   Total cost: $4.23

📁 Output files:
   JSON: clearcv-blog-it-2026-01-03-filled.json
   CSV: clearcv-blog-it-2026-01-03-filled.csv
```

**Costo stimato**:
- GPT-4 Turbo: ~$0.10-$0.20 per articolo → $3-6 per 30 articoli
- GPT-3.5 Turbo: ~$0.01-$0.02 per articolo → $0.30-0.60 per 30 articoli

### Opzione B: ChatGPT Manuale (Gratis, 3-4 ore)

Se non vuoi usare API (gratis ma più lento):

```bash
# Leggi prompts
cat blog-content/clearcv-blog-it-2026-01-03-prompts.md

# Copia ogni prompt a ChatGPT web
# Incolla output markdown in Excel/Google Sheets
# Esporta a CSV manualmente
```

---

## Step 3: Import WordPress (10 min)

### 3.1 Installa WP All Import Plugin

```bash
WordPress Admin → Plugins → Add New
Cerca: WP All Import
Installa → Attiva

# Pro version (opzionale): $99/anno
# - Scheduling automatico
# - Aggiornamenti incrementali
# Free version: OK per import una-tantum
```

### 3.2 Import CSV

```bash
# WordPress Admin
WP All Import → New Import

# Step 1: Upload File
Browse → Seleziona clearcv-blog-it-2026-01-03-filled.csv
Continue

# Step 2: Select Import Type
Post Type: Posts
Continue

# Step 3: Drag & Drop Fields
Title          → {title}
Content        → {content}
Excerpt        → {excerpt}
Post Status    → {status}
Post Date      → {publish_date}
Post Author    → {author}
Categories     → {category}
Tags           → {tags}

# Advanced → Custom Fields (Yoast SEO)
_yoast_wpseo_title          → {seo_title}
_yoast_wpseo_metadesc       → {meta_description}
_yoast_wpseo_focuskw        → {focus_keyphrase}

# Step 4: Import Settings
- Duplicate handling: Skip duplicates
- Cron scheduling: Daily (se Pro version)

# Step 5: Confirm & Run
Run Import
```

**Risultato**:
```
✅ Imported 30 posts
   - Published: 0
   - Scheduled: 30 (1 per day for next 30 days)
   - Draft: 0
```

---

## Step 4: Auto-Publish Scheduling

### Metodo 1: WordPress Cron (Built-in)

WordPress già supporta scheduled posts:

```php
// wp-config.php (verifica che sia abilitato)
define('DISABLE_WP_CRON', false); // Default: false = enabled
```

**Verifica scheduling**:
```bash
WordPress → Posts → All Posts
Filtro: Scheduled

# Dovresti vedere:
- 2026-01-04 00:00 - come scrivere un cv perfetto
- 2026-01-05 00:00 - cv europeo 2026 compilabile
- 2026-01-06 00:00 - curriculum vitae esempio
...
```

### Metodo 2: WP Crontrol (Controllo avanzato)

Per debug/test:

```bash
Plugin → Add New → WP Crontrol
Installa → Attiva

# Tools → Cron Events
# Verifica eventi scheduled
publish_future_post - Orari: [00:00 ogni giorno]
```

### Metodo 3: Server Cron (Production)

Per garantire esecuzione affidabile:

```bash
# cPanel → Cron Jobs
# Aggiungi:
0 * * * * curl https://blog.clearcvapp.com/wp-cron.php?doing_wp_cron > /dev/null 2>&1

# Ogni ora, triggera wp-cron manualmente
```

---

## WordPress WPML Multilingua Setup

### 4.1 Traduzioni Automatiche (Opzione 1: Weglot)

**Plugin**: Weglot Translate ($99/anno)

```bash
Plugin → Add New → Weglot Translate
Installa → Attiva

# Setup
Weglot → Settings
- Original language: Italian
- Destination languages: English, Spanish, French, German
- Translation engine: Neural Machine Translation

# Auto-translate articoli esistenti
Weglot → Translate → Auto-translate all pages
```

**Pro**:
- Traduzione automatica istantanea
- Mantiene SEO (URL lang, hreflang)

**Contro**:
- Costo $99/anno
- Traduzioni non perfette (ma 90% accurate)

### 4.2 Traduzioni Manuali (Opzione 2: WPML)

**Plugin**: WPML Multilingual CMS ($39/anno)

```bash
Plugin → Add New → Upload Plugin
Carica: wpml-multilingual-cms.zip

# Configurazione
WPML → Languages
- Default: Italian
- Additional: English, Spanish, French, German

# Traduci articoli
Posts → All Posts
Colonna "Languages": + icona (aggiungi traduzione)
- Duplica da IT
- Modifica contenuto in lingua target
```

**Workflow generazione multilingua**:
```bash
# Genera articoli per ogni lingua
node generate-blog-articles.js --count=30 --lang=it --output=both
node generate-blog-articles.js --count=30 --lang=en --output=both
node generate-blog-articles.js --count=30 --lang=es --output=both
node generate-blog-articles.js --count=30 --lang=fr --output=both
node generate-blog-articles.js --count=30 --lang=de --output=both

# Fill con ChatGPT
node fill-articles-chatgpt.js --input=../blog-content/clearcv-blog-it-2026-01-03.json
node fill-articles-chatgpt.js --input=../blog-content/clearcv-blog-en-2026-01-03.json
# ...

# Import 5 CSV (uno per lingua)
```

**Costo totale**: $20-30 per 150 articoli (30 × 5 lingue)

---

## URLs Finali Blog

Dopo reverse proxy (worker.js configurato):

### Italiano (default)
```
clearcvapp.com/blog/come-scrivere-cv-perfetto
clearcvapp.com/blog/cv-europeo-2026
```

### Multilingua
```
clearcvapp.com/en/blog/how-to-write-perfect-cv
clearcvapp.com/es/blog/como-escribir-cv-perfecto
clearcvapp.com/fr/blog/comment-ecrire-cv-parfait
clearcvapp.com/de/blog/wie-schreibe-perfekter-lebenslauf
```

**Hreflang automatico** (gestito da WPML/Weglot):
```html
<link rel="alternate" hreflang="it" href="https://clearcvapp.com/blog/come-scrivere-cv-perfetto" />
<link rel="alternate" hreflang="en" href="https://clearcvapp.com/en/blog/how-to-write-perfect-cv" />
<link rel="alternate" hreflang="es" href="https://clearcvapp.com/es/blog/como-escribir-cv-perfecto" />
```

---

## Checklist Completa

### Setup Iniziale (Una volta)
- [ ] WordPress installato su `blog.clearcvapp.com`
- [ ] SSL attivo (Let's Encrypt)
- [ ] Plugin installati:
  - [ ] WPML o Weglot (multilingua)
  - [ ] Yoast SEO
  - [ ] WP All Import
  - [ ] WP Super Cache
  - [ ] Wordfence Security
- [ ] Tema Astra configurato
- [ ] Reverse proxy attivo in worker.js

### Per Ogni Batch Articoli
- [ ] Genera struttura: `node generate-blog-articles.js`
- [ ] Fill ChatGPT: `node fill-articles-chatgpt.js` o manuale
- [ ] Import WordPress: WP All Import → CSV
- [ ] Verifica scheduling: Posts → Scheduled
- [ ] Test URL: `curl https://clearcvapp.com/blog/test-article`
- [ ] Submit sitemap Google: Search Console → Sitemaps

---

## Costi e ROI

### Costi Mensili (30 articoli/mese)
```
WordPress Hosting (SiteGround)      €3.99
WPML Multilingua                    €3.25/mese (€39/anno)
ChatGPT API (30 articoli)           $4-6
---
Totale                              ~€10-12/mese
```

### ROI Atteso (dopo 3 mesi)
```
Articoli pubblicati:                90 (30/mese × 3)
Keywords posizionate:               300-500
Traffico organico:                  1000-3000 visite/mese
Conversioni (1% rate):              10-30 registrazioni/mese
CAC (Customer Acquisition Cost):    €0.33-1.20
```

**Confronto vs Ads**:
- Google Ads CPC: €1-3 per click
- Blog Organic: €0.01 per visita (ammortizzato)
- **Saving: 100-300x vs Ads**

---

## Troubleshooting

### Import fallisce
```bash
# Verifica formato CSV
- Encoding: UTF-8
- Delimiter: virgola (,)
- Quotes: doppi apici (")
- Escape: doppi apici raddoppiati ("")

# Test manuale
WordPress → Posts → Add New
Incolla contenuto da JSON
Verifica rendering
```

### Scheduled posts non pubblicano
```bash
# Verifica WP Cron
Plugin → WP Crontrol → Cron Events
Cerca: publish_future_post

# Se manca, aggiungi manualmente
wp-config.php:
define('ALTERNATE_WP_CRON', true);

# O setup server cron (vedi Step 4.3)
```

### Reverse proxy non funziona
```bash
# Test diretto WordPress
curl https://blog.clearcvapp.com/it/test-article

# Test reverse proxy
curl https://clearcvapp.com/blog/test-article

# Verifica DNS
nslookup blog.clearcvapp.com
# Deve puntare a IP hosting WordPress

# Redeploy worker
npm run deploy
```

---

## Next Steps

1. **Genera primo batch**: 30 articoli IT
2. **Test workflow completo**: 1 articolo end-to-end
3. **Scale up**: 30 articoli × 5 lingue = 150 articoli
4. **Monitor**: Google Search Console + Analytics
5. **Iterate**: Analizza top keywords, genera più articoli

**Timeline**:
- Oggi: Setup WordPress + plugin (2 ore)
- Domani: Genera 30 articoli IT (3 ore)
- Week 1: Import + test autopublish
- Week 2-4: Scala a 5 lingue (150 articoli totali)
