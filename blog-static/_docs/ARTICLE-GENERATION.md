# Generazione Articoli Blog ClearCV

Questa guida spiega come generare nuovi articoli per il blog ClearCV usando ChatGPT.

## Location

Script: `blog-static/_docs/generate-blog-articles.js`

## Come Funziona

Lo script genera **prompt per ChatGPT** che creano articoli SEO-optimized basati su keyword research.

### Step 1: Genera Prompts

```bash
cd blog-static/_docs
node generate-blog-articles.js --count=10 --lang=it --output=both
```

Output generato in `../../blog-content/`:
- `clearcv-blog-it-2026-01-06.csv` → Per import WordPress
- `clearcv-blog-it-2026-01-06.json` → Per API WordPress
- `clearcv-blog-it-2026-01-06-prompts.md` → Prompt ChatGPT

### Step 2: Copia Prompt a ChatGPT

```bash
# Apri file prompts
cat ../../blog-content/clearcv-blog-it-2026-01-06-prompts.md
```

Per ogni articolo:
1. Copia il prompt
2. Incolla in ChatGPT
3. Attendi generazione articolo markdown
4. Copia output

### Step 3: Salva Articoli

Per ogni articolo generato da ChatGPT:

```bash
# Crea file markdown
nano ../content/it/[slug-articolo].md
# Incolla contenuto markdown da ChatGPT

# Crea metadata (opzionale)
nano ../_content/it/[slug-articolo].json
```

**Metadata JSON esempio**:
```json
{
  "title": "Come Scrivere un CV Perfetto",
  "description": "Guida completa con esempi",
  "excerpt": "Scopri come creare un CV vincente",
  "date": "2026-01-06",
  "readTime": "8 min",
  "keywords": "cv, curriculum, guida",
  "tags": ["CV", "Guida"]
}
```

### Step 4: Rigenera HTML

```bash
cd ../build
node generate-html.js --rebuild-all
```

## Keyword Database

Lo script include keyword ad alto traffico:

### High Traffic (1000-10000 searches/month)
- come scrivere un cv perfetto (8100)
- cv europeo 2026 compilabile (5400)
- curriculum vitae esempio (6600)

### Medium Traffic (100-1000 searches/month)
- cv con intelligenza artificiale (880)
- cv ats friendly cosa significa (720)

### Long-Tail (10-100, alta conversione)
- cv sviluppatore software junior (140)
- cv marketing digitale esempio (130)

## Tipi di Articoli

Lo script genera 4 tipi di articoli:

1. **Guide** (40%)
   - Struttura: Intro → Sezioni → FAQ → Conclusione
   - Esempio: "Come Scrivere un CV Perfetto"

2. **How-To** (30%)
   - Struttura: Problema → Step-by-step → Errori comuni
   - Esempio: "Come Creare CV ATS-Friendly"

3. **Template** (20%)
   - Struttura: Esempi pratici → Download
   - Esempio: "CV Europeo Template Gratis"

4. **Comparison** (10%)
   - Struttura: Opzione A vs B → Tabella → Quando usare
   - Esempio: "CV Cronologico vs Funzionale"

## SEO Checklist (Applicata Automaticamente)

Ogni prompt include:
- ✅ Keyword in H1, primo paragrafo, 2+ H2
- ✅ Densità keyword 1-2% naturale
- ✅ Link interno a clearcvapp.com
- ✅ 4-6 FAQ formato Q&A
- ✅ CTA finale chiaro
- ✅ Meta description 155 caratteri
- ✅ URL slug SEO-friendly

## Personalizzazione Prompts

Modifica `generate-blog-articles.js` per:

### Aggiungere Keyword

```javascript
const KEYWORDS_IT = [
  { keyword: "tua nuova keyword", volume: 500, difficulty: "low" },
  // ...
];
```

### Modificare Template Articoli

```javascript
const ARTICLE_TYPES = {
  guide: {
    title_pattern: "{keyword} - Guida Completa 2026",
    structure: `...`
  }
};
```

### Cambiare Lingua

```bash
node generate-blog-articles.js --lang=en --count=20
```

## Workflow Completo Esempio

```bash
# 1. Genera 5 articoli italiani
cd blog-static/_docs
node generate-blog-articles.js --count=5 --lang=it

# 2. Apri file prompts
code ../../blog-content/clearcv-blog-it-2026-01-06-prompts.md

# 3. Per ogni prompt:
#    - Copia → ChatGPT → Genera
#    - Salva markdown in _content/it/[slug].md

# 4. Traduci articoli (vedi TRANSLATION-PROMPT.md)

# 5. Rigenera HTML
cd ../_build
node generate-html.js --rebuild-all

# 6. Verifica output
ls ../it/blog/
```

## Note Importanti

⚠️ **Limiti ChatGPT**:
- Free tier: 3-4 articoli/ora
- Plus: 25 articoli/ora (GPT-4o)
- Pro: 500 articoli/giorno

⚠️ **Quality Check**:
- Verifica keyword density (1-2%)
- Controlla link ClearCV presente
- Verifica lunghezza (1800-2200 parole)
- Leggi FAQ per coerenza

✅ **Best Practice**:
- Genera batch di 5-10 articoli
- Pubblica 1 articolo/giorno
- Monitora performance SEO
- Aggiorna articoli vecchi ogni 6 mesi

## Alternative Automatizzazione

### Con OpenAI API (Automatico)

```javascript
// Esempio script automatico
const OpenAI = require('openai');
const fs = require('fs');

async function generateArticle(keyword) {
  const prompt = generateChatGPTPrompt(keyword, 'it', 'guide');
  const response = await openai.chat.completions.create({
    model: 'gpt-4o',
    messages: [{ role: 'user', content: prompt }]
  });
  
  const markdown = response.choices[0].message.content;
  fs.writeFileSync(`../_content/it/${slugify(keyword)}.md`, markdown);
}
```

**Costo**: ~$0.03 per articolo (GPT-4o)

## Support

Per problemi:
1. Verifica Node.js installato: `node --version`
2. Controlla path corretti in script
3. Verifica keyword database aggiornato
4. Test con `--count=1` prima di batch grandi
