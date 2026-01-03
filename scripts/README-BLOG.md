# Quick Start: Blog Generation System

Sistema completo per generare in massa articoli blog SEO-optimized con ChatGPT.

## TL;DR (5 minuti)

```bash
# 1. Genera 30 articoli IT
cd scripts
node generate-blog-articles.js --count=30 --lang=it --output=both

# 2. Riempi con ChatGPT (manuale o API)
# Manuale: copia prompts da blog-content/*-prompts.md
# API: node fill-articles-chatgpt.js --input=../blog-content/clearcv-blog-it-2026-01-03.json

# 3. Import WordPress
# WP Admin → WP All Import → clearcv-blog-it-2026-01-03-filled.csv

# 4. Verifica autopubblicazione
# WordPress → Posts → Scheduled (1 al giorno)
```

## Files Generati

```
blog-content/
├── clearcv-blog-it-2026-01-03.json           # Dati strutturati
├── clearcv-blog-it-2026-01-03.csv            # Per import WordPress
├── clearcv-blog-it-2026-01-03-prompts.md     # Prompts ChatGPT
├── clearcv-blog-it-2026-01-03-filled.json    # Dopo ChatGPT API
└── clearcv-blog-it-2026-01-03-filled.csv     # Import finale WordPress
```

## Workflow Completo

### Step 1: Generate Structure (5 min)

```bash
# Italiano
node generate-blog-articles.js --count=30 --lang=it --output=both

# English
node generate-blog-articles.js --count=30 --lang=en --output=both

# Batch multilingua (150 articoli)
for lang in it en es fr de; do
  node generate-blog-articles.js --count=30 --lang=$lang --output=both
done
```

### Step 2: Fill Content

#### Opzione A: ChatGPT API (Automatico, ~$4)

```bash
# Setup (una volta)
npm install openai dotenv
echo "OPENAI_API_KEY=sk-..." > .env

# Run
node fill-articles-chatgpt.js --input=../blog-content/clearcv-blog-it-2026-01-03.json

# Output: clearcv-blog-it-2026-01-03-filled.csv
```

#### Opzione B: ChatGPT Manuale (Gratis, ~3 ore)

```bash
# 1. Apri file prompts
cat blog-content/clearcv-blog-it-2026-01-03-prompts.md

# 2. Copia ogni prompt su ChatGPT web
# 3. Incolla output in Excel/Google Sheets
# 4. Esporta CSV manualmente
```

### Step 3: Import WordPress (10 min)

```
WordPress Admin → Plugins → WP All Import
→ New Import → Upload CSV
→ Map fields (title, content, excerpt, etc.)
→ Run Import
```

**Mapping campi**:

| CSV Column        | WordPress Field               |
|-------------------|-------------------------------|
| title             | Post Title                    |
| content           | Post Content                  |
| excerpt           | Post Excerpt                  |
| status            | Post Status (scheduled)       |
| publish_date      | Post Date                     |
| category          | Categories                    |
| tags              | Tags                          |
| meta_description  | Yoast SEO → Meta Description  |
| seo_title         | Yoast SEO → SEO Title         |
| focus_keyphrase   | Yoast SEO → Focus Keyphrase   |

### Step 4: Verify (2 min)

```bash
# WordPress
Posts → All Posts → Filter: Scheduled

# URLs (dopo autopubblicazione)
https://clearcvapp.com/blog/come-scrivere-cv-perfetto
https://clearcvapp.com/en/blog/how-to-write-perfect-cv
```

## Keywords Database

Lo script include **45 keywords** pre-selezionate:

- **High Traffic** (1000-10000 ricerche/mese): 10 keywords
- **Medium Traffic** (100-1000 ricerche/mese): 10 keywords
- **Long-Tail** (10-100 ricerche/mese): 25 keywords

**Esempio output**:

| Keyword | Volume | Difficulty | Publish Date |
|---------|--------|------------|--------------|
| come scrivere un cv perfetto | 8100 | medium | 2026-01-04 |
| cv europeo 2026 compilabile | 5400 | low | 2026-01-05 |
| curriculum vitae esempio | 6600 | medium | 2026-01-06 |

## ChatGPT Prompt Template

Ogni articolo include prompt ottimizzato:

```markdown
Scrivi un articolo SEO-optimized per blog in italiano:

**Keyword principale**: come scrivere un cv perfetto
**Keywords secondarie**: curriculum vitae, cv gratis, cv online
**Lunghezza**: 1800-2200 parole
**Tono**: Professionale ma accessibile

**Struttura**:
# [H1 Titolo con keyword]
[Intro 100 parole]
## [3-5 H2 Sections]
## FAQ (4-6 domande)
## Conclusione + CTA

**SEO Checklist**:
- Keyword in H1, primo paragrafo, 2+ H2
- Link interno a clearcvapp.com
- 4-6 FAQ
- Meta description 155 caratteri
```

## WordPress Setup (Una volta)

### Required Plugins

1. **WPML** o **Weglot** (multilingua)
2. **Yoast SEO** (SEO optimization)
3. **WP All Import** (bulk import)
4. **WP Super Cache** (performance)

### URL Structure

```
blog.clearcvapp.com/it/come-scrivere-cv-perfetto
blog.clearcvapp.com/en/how-to-write-perfect-cv

# Reverse proxy via worker.js:
clearcvapp.com/blog/come-scrivere-cv-perfetto     → blog.clearcvapp.com/it/...
clearcvapp.com/en/blog/how-to-write-perfect-cv    → blog.clearcvapp.com/en/...
```

## Costi e ROI

### Costi

```
WordPress Hosting (SiteGround)    €3.99/mese
WPML Multilingua                  €3.25/mese (€39/anno)
ChatGPT API (30 articoli)         $4-6 una tantum
---
Totale Mensile                    ~€8-10/mese
```

### ROI (dopo 3 mesi)

```
Articoli:                90 (30/mese)
Keywords:                300-500
Traffico:                1000-3000 visite/mese
Conversioni (1%):        10-30 registrazioni/mese
CAC:                     €0.33-1.20

vs Google Ads:           €1-3 per click
Saving:                  100-300x
```

## Customization

### Aggiungi Keywords

Edit `generate-blog-articles.js`:

```javascript
const KEYWORDS_IT = [
  // Aggiungi qui
  { keyword: "tua keyword", volume: 500, difficulty: "low" },
];
```

### Modifica Template Articolo

Edit `ARTICLE_TYPES` in `generate-blog-articles.js`:

```javascript
const ARTICLE_TYPES = {
  custom: {
    title_pattern: "{keyword} - {suffix}",
    structure: `
      # {title}
      [La tua struttura]
    `
  }
};
```

### Aggiungi Lingue

```bash
# Duplica keywords
const KEYWORDS_PT = [...]; // Portoghese

# Generate
node generate-blog-articles.js --count=30 --lang=pt --output=both
```

## Troubleshooting

### "Module not found: openai"

```bash
npm install openai dotenv
```

### "CSV import fails"

- Verifica encoding: UTF-8
- Verifica delimiter: virgola (,)
- Verifica escape: doppi apici ("")

### "Scheduled posts don't publish"

```bash
# WordPress
Plugins → WP Crontrol → Verify "publish_future_post" event

# Server
cPanel → Cron Jobs → Add:
0 * * * * curl https://blog.clearcvapp.com/wp-cron.php
```

### "Reverse proxy 404"

```bash
# Verify DNS
nslookup blog.clearcvapp.com

# Redeploy worker
npm run deploy

# Test
curl https://clearcvapp.com/blog/test-article
```

## Next Steps

1. **Test con 1 articolo**: End-to-end workflow
2. **Scale a 30 articoli IT**: Primo batch completo
3. **Multilingua**: 30 × 5 lingue = 150 articoli
4. **Monitor**: Google Search Console → Performance
5. **Iterate**: Top keywords → più articoli

## Documentazione Completa

- **Workflow dettagliato**: `../docs/BLOG-WORKFLOW-AUTOPUBLISH.md`
- **WordPress setup**: `../docs/WORDPRESS-BLOG-SETUP.md`

## Support

Issues? Check:
- Logs: `node generate-blog-articles.js` output
- WordPress: Admin → Tools → Site Health
- Cloudflare Worker: Dashboard → Workers → Logs
