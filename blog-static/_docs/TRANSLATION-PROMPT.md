# Prompt di Traduzione Articoli Blog ClearCV

## Istruzioni per ChatGPT

Copia e incolla questo prompt ogni volta che devi tradurre un articolo del blog.

---

## PROMPT PER CHATGPT

```
Traduci questo articolo markdown del blog ClearCV nella lingua indicata, seguendo queste regole CRITICHE:

**LINGUA TARGET**: [SPECIFICA: en/de/fr/es/pt/nl/pl/ro/el/cs/hu/sv/da/fi/no/sk/hr/sl/bg/lt/lv/et]

**REGOLE OBBLIGATORIE**:

1. **Mantieni TUTTA la struttura markdown originale**:
   - Ogni `#`, `##`, `###` deve rimanere esattamente nella stessa posizione
   - Ogni `**testo**` (grassetto) diventa **text** tradotto
   - Ogni `*testo*` (corsivo) diventa *text* tradotto
   - Ogni `[link](url)` mantiene lo stesso URL, traduci solo il testo del link
   - Mantieni tutte le liste `- item` e `1. item`

2. **NON tradurre**:
   - URL e link (es. `https://clearcvapp.com`)
   - Nomi di brand: "ClearCV", "CV", "Europass"
   - Termini tecnici SEO quando appropriato
   - Emoji (mantienili identici)

3. **Traduci in modo naturale**:
   - Usa tono professionale ma accessibile
   - Target audience: job seekers 25-40 anni
   - Adatta idiomi e modi di dire alla cultura target
   - Mantieni il significato, non tradurre letteralmente

4. **Localizzazione specifica**:
   - Date: adatta al formato locale (IT: 05/01/2026 → US: 01/05/2026)
   - Valute: mantieni € per EU, converti per altre
   - Esempi di nomi: usa nomi locali per la lingua target
   - Riferimenti culturali: adatta se necessario

5. **SEO Keywords**:
   - Traduci le keyword mantenendo lo stesso intento di ricerca
   - Esempio IT: "come scrivere un cv" → EN: "how to write a resume"
   - Non forzare keyword se non sono naturali nella lingua target

6. **Output Format**:
   - Restituisci SOLO il markdown tradotto
   - NON aggiungere note, commenti o spiegazioni
   - NON modificare la lunghezza complessiva più del ±15%

---

**ARTICOLO DA TRADURRE:**

```markdown
[INCOLLA QUI IL CONTENUTO DEL FILE .md ORIGINALE]
```

---

**CHECKLIST POST-TRADUZIONE** (per te, non per ChatGPT):
- [ ] Tutti gli header `#` sono presenti nella stessa posizione
- [ ] Tutti i link funzionano (URL non modificati)
- [ ] Grassetto e corsivo sono preservati
- [ ] Liste numerate/bullet sono identiche
- [ ] ClearCV e brand non tradotti
- [ ] Tono professionale ma accessibile
- [ ] Lunghezza simile (±15%)
```

---

## Esempio Pratico

### Input (Italiano):
```markdown
# Come Scrivere un CV Perfetto

Il curriculum vitae è il tuo **biglietto da visita** nel mondo del lavoro.

## 1. Dati Personali

Includi sempre:
- Nome e cognome
- Email professionale
- Telefono

[Crea il tuo CV con ClearCV →](https://clearcvapp.com)
```

### Output Inglese (en):
```markdown
# How to Write a Perfect Resume

Your resume is your **calling card** in the job market.

## 1. Personal Information

Always include:
- First and last name
- Professional email
- Phone number

[Create your CV with ClearCV →](https://clearcvapp.com)
```

---

## Workflow Completo

### Step 1: Traduci con ChatGPT
```bash
# Copia contenuto italiano
cat blog-static/_content/it/come-scrivere-cv-perfetto.md

# Incolla nel prompt sopra → ChatGPT traduce
# Copia output tradotto
```

### Step 2: Salva traduzione
```bash
# Per Inglese (en)
nano blog-static/_content/en/how-to-write-perfect-cv.md
# Incolla traduzione e salva

# Per Tedesco (de)
nano blog-static/_content/de/perfekten-lebenslauf-schreiben.md
# Incolla traduzione e salva

# Ripeti per tutte le 23 lingue se necessario
```

### Step 3: Crea metadata (opzionale)
```bash
# blog-static/_content/en/how-to-write-perfect-cv.json
{
  "title": "How to Write a Perfect CV - Complete Guide",
  "description": "Learn how to create a perfect CV that stands out to recruiters. Templates, examples, and practical tips.",
  "excerpt": "Complete guide to writing a winning CV. Discover the ideal structure, what to include, and common mistakes to avoid.",
  "date": "2026-01-03",
  "readTime": "8 min",
  "keywords": "cv, resume, perfect cv, job application, how to write resume",
  "tags": ["CV", "Guide", "Resume", "Job Search"]
}
```

### Step 4: Rigenera HTML
```bash
cd blog-static/_build
node generate-html.js --rebuild-all
```

---

## Lingue Supportate (Tutte le 23)

| Codice | Lingua        | Nome file esempio                      |
|--------|---------------|----------------------------------------|
| `it`   | Italiano      | `come-scrivere-cv-perfetto.md`        |
| `en`   | English       | `how-to-write-perfect-cv.md`          |
| `de`   | Deutsch       | `perfekten-lebenslauf-schreiben.md`   |
| `fr`   | Français      | `comment-ecrire-cv-parfait.md`        |
| `es`   | Español       | `como-escribir-cv-perfecto.md`        |
| `pt`   | Português     | `como-escrever-cv-perfeito.md`        |
| `nl`   | Nederlands    | `perfecte-cv-schrijven.md`            |
| `pl`   | Polski        | `jak-napisac-idealne-cv.md`           |
| `ro`   | Română        | `cum-sa-scrii-cv-perfect.md`          |
| `el`   | Ελληνικά      | `pos-na-grapsete-teleio-cv.md`        |
| `cs`   | Čeština       | `jak-napsat-dokonale-cv.md`           |
| `hu`   | Magyar        | `tokeletes-oneletrajz-iras.md`        |
| `sv`   | Svenska       | `hur-man-skriver-perfekt-cv.md`       |
| `da`   | Dansk         | `hvordan-skrive-perfekt-cv.md`        |
| `fi`   | Suomi         | `taydellisen-cv-kirjoittaminen.md`    |
| `no`   | Norsk         | `hvordan-skrive-perfekt-cv.md`        |
| `sk`   | Slovenčina    | `ako-napisat-dokonale-cv.md`          |
| `hr`   | Hrvatski      | `kako-napisati-savrseni-cv.md`        |
| `sl`   | Slovenščina   | `kako-napisati-popoln-cv.md`          |
| `bg`   | Български     | `kak-da-napishete-perfektno-cv.md`    |
| `lt`   | Lietuvių      | `kaip-parasiti-puiku-cv.md`           |
| `lv`   | Latviešu      | `ka-rakstit-perfektu-cv.md`           |
| `et`   | Eesti         | `kuidas-kirjutada-taitlikku-cv.md`    |

---

## Note Importanti

✅ **SEMPRE rigenera HTML** dopo aver aggiunto/modificato file markdown:
```bash
cd blog-static/_build && node generate-html.js --rebuild-all
```

✅ **NON modificare MAI** gli HTML in `blog-static/it/blog/`, `blog-static/en/blog/`, ecc. direttamente

✅ **Slug dei file** devono essere URL-friendly:
- ✅ `how-to-write-perfect-cv.md`
- ❌ `How To Write Perfect CV.md`
- ❌ `how_to_write_perfect_cv.md`

✅ **Encoding UTF-8** sempre, specialmente per lingue con caratteri speciali (el, bg, ro, etc.)

---

## Automazione Futura (Opzionale)

Se vuoi automatizzare con API:

```javascript
// Script esempio con OpenAI API
const OpenAI = require('openai');
const fs = require('fs');

async function translateArticle(sourcePath, targetLang) {
  const content = fs.readFileSync(sourcePath, 'utf8');
  const prompt = `Traduci in ${targetLang}:\n\n${content}`;

  const response = await openai.chat.completions.create({
    model: 'gpt-4o',
    messages: [{ role: 'user', content: prompt }],
  });

  return response.choices[0].message.content;
}
```

**Costo stimato**: ~$0.03 per articolo con GPT-4o

---

## Contatti

Per problemi o domande sul sistema di traduzione, verifica:
1. File sorgente `.md` esiste in `_content/it/`
2. Markdown è valido (no HTML custom)
3. Template aggiornato in `_templates/article.html`
4. Ricostruito con `node generate-html.js --rebuild-all`
