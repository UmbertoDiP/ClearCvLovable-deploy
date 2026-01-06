# Prompt Master ChatGPT per Generazione e Traduzione Articoli Blog

## Come Usare Questo Prompt

Copia e incolla questo prompt completo in ChatGPT. ChatGPT genererà l'articolo in italiano e poi ti chiederà conferma per procedere con ogni traduzione. Puoi proseguire la conversazione dicendo "procedi" o "traduci in [lingua]".

---

## PROMPT DA COPIARE

Sei un esperto copywriter SEO per blog professionali. Devi creare un articolo per il blog di **ClearCV**, un'app per generare CV professionali con AI.

### STEP 1: Genera Articolo in Italiano

Genera un articolo completo in italiano sul tema: **[INSERISCI QUI IL TEMA DELL'ARTICOLO]**

**Requisiti Tecnici:**
- Formato: Markdown con YAML frontmatter
- Lunghezza: Minimo 2000 parole
- Stile: Professionale, pratico, basato su dati reali
- SEO: Ottimizzato per parole chiave rilevanti
- CTA: Include almeno 2 call-to-action verso ClearCV

**Struttura YAML Frontmatter:**
```yaml
---
title: "[Titolo principale articolo - max 60 caratteri]"
description: "[Descrizione meta per SEO - max 160 caratteri]"
keywords: "[keyword1, keyword2, keyword3, keyword4, keyword5]"
date: "[YYYY-MM-DD - data odierna]"
readTime: "[Tempo lettura stimato es. 12 min]"
author: "ClearCV Team"
category: "Guide"
tags: ["tag1", "tag2", "tag3", "tag4"]
featured: true
lastModified: "[YYYY-MM-DD - data odierna]"
---
```

**Struttura Contenuto Markdown:**

1. **Titolo H1** - Catchy e informativo
2. **Introduzione** - Problema + Soluzione (2-3 paragrafi)
3. **Sezioni H2 principali** (4-6 sezioni):
   - Ogni sezione 300-400 parole
   - Sottosezioni H3 quando necessario
   - Liste puntate e numerate
   - Grassetto per concetti chiave
4. **Statistiche e Dati** - Includi numeri reali quando possibile
5. **Esempi Pratici** - Almeno 2-3 esempi concreti
6. **Call to Action ClearCV** - Link a https://clearcvapp.com
7. **Conclusione** - Riepilogo + prossimi step

**Tono e Stile:**
- Autorevole ma accessibile
- Usa "tu" per rivolgerti al lettore
- Esempi concreti e actionable
- Evita frasi generiche tipo "è importante" senza spiegare perché
- Dati numerici quando possibile (es. "75% dei CV vengono scartati")

**Link Interno ClearCV:**
Inserisci almeno 2 CTA:
- Primo CTA: Nel corpo dell'articolo (es. "Crea il tuo CV con ClearCV →")
- Secondo CTA: Nella conclusione con box dedicato

**Formato Output:**
Genera il file markdown completo con frontmatter. Usa questo formato esatto:

```markdown
---
title: "Titolo Articolo"
description: "Descrizione breve"
keywords: "keyword1, keyword2, keyword3"
date: "2026-01-06"
readTime: "12 min"
author: "ClearCV Team"
category: "Guide"
tags: ["tag1", "tag2", "tag3"]
featured: true
lastModified: "2026-01-06"
---

# Titolo Principale

Contenuto articolo...

## Sezione 1

Testo...

### Sottosezione 1.1

Testo...
```

---

### STEP 2: Traduzioni Sequenziali

Dopo aver generato l'articolo in italiano, attendi la mia conferma e poi procedi con le traduzioni nelle seguenti lingue **IN QUESTO ORDINE**:

1. 🇬🇧 **Inglese** (en)
2. 🇩🇪 **Tedesco** (de)
3. 🇫🇷 **Francese** (fr)
4. 🇪🇸 **Spagnolo** (es)
5. 🇵🇹 **Portoghese** (pt)
6. 🇳🇱 **Olandese** (nl)
7. 🇵🇱 **Polacco** (pl)
8. 🇷🇴 **Rumeno** (ro)
9. 🇬🇷 **Greco** (el)
10. 🇨🇿 **Ceco** (cs)
11. 🇭🇺 **Ungherese** (hu)
12. 🇸🇪 **Svedese** (sv)
13. 🇩🇰 **Danese** (da)
14. 🇫🇮 **Finlandese** (fi)
15. 🇳🇴 **Norvegese** (no)
16. 🇸🇰 **Slovacco** (sk)
17. 🇭🇷 **Croato** (hr)
18. 🇸🇮 **Sloveno** (sl)
19. 🇧🇬 **Bulgaro** (bg)
20. 🇱🇹 **Lituano** (lt)
21. 🇱🇻 **Lettone** (lv)
22. 🇪🇪 **Estone** (et)

**Regole Traduzione:**

1. **Mantieni Struttura Frontmatter** - Traduci solo i campi: `title`, `description`, `keywords`, `category`, `tags`
2. **NON tradurre:** `date`, `readTime`, `author`, `featured`, `lastModified`
3. **Traduci tutto il contenuto markdown** - Titoli, paragrafi, liste, esempi
4. **Adatta culturalmente** quando necessario (es. esempi specifici per paese)
5. **Mantieni link ClearCV** come https://clearcvapp.com (non tradurre URL)
6. **Nome file FISSO** - Tutti gli articoli si chiamano `article-1.md`, `article-2.md`, etc. (STESSO nome per tutte le lingue)

**Esempio Frontmatter Tradotto (Inglese):**
```yaml
---
title: "How to Write a Perfect Resume in 2026"
description: "Complete guide to create a professional resume that captures recruiters' attention. Over 2000 words of practical advice."
keywords: "perfect resume, cv writing, resume guide 2026, professional cv, effective resume"
date: "2026-01-06"
readTime: "12 min"
author: "ClearCV Team"
category: "Guides"
tags: ["resume", "career", "guide", "job"]
featured: true
lastModified: "2026-01-06"
---
```

**Workflow Conversazione:**

Dopo l'articolo italiano, ti dirò:
- **"procedi"** → Traduci nella prossima lingua della lista
- **"traduci in [lingua]"** → Vai a quella lingua specifica
- **"ferma"** → Stop traduzioni
- **"riprendi"** → Continua dall'ultima lingua fatta

**Formato Output Traduzioni:**

Per ogni traduzione, fornisci il file markdown completo con:

- **Nome file FISSO**: `article-1.md` (uguale per tutte le lingue)
- Frontmatter tradotto
- Contenuto completo tradotto

**IMPORTANTE**: Il nome file NON cambia tra lingue. Solo il contenuto è tradotto.

---

## Fine Prompt

**IMPORTANTE:** Prima di iniziare, dimmi il tema dell'articolo da generare!

---

## Esempio Utilizzo

1. Copia il prompt sopra in ChatGPT
2. Sostituisci **[INSERISCI QUI IL TEMA DELL'ARTICOLO]** con il tuo tema
3. ChatGPT genera l'articolo italiano completo
4. Verifica l'articolo
5. Dici "procedi" per iniziare le traduzioni
6. ChatGPT traduce una lingua per volta
7. Continui dicendo "procedi" fino a completare tutte le 23 lingue

---

## Salvataggio File

**Path file articoli:** `C:\Users\umber\Documents\MyProjects\ClearCvLovable\blog-static\_content\[LANG]\article-N.md`

**Convenzione Nome File:**

- Primo articolo: `article-1.md`
- Secondo articolo: `article-2.md`
- Terzo articolo: `article-3.md`
- etc.

**Struttura Cartelle (23 lingue):**

```text
blog-static/_content/
├── it/article-1.md    (Italiano)
├── en/article-1.md    (English)
├── de/article-1.md    (Deutsch)
├── fr/article-1.md    (Français)
├── es/article-1.md    (Español)
├── pt/article-1.md    (Português)
├── nl/article-1.md    (Nederlands)
├── pl/article-1.md    (Polski)
├── ro/article-1.md    (Română)
├── el/article-1.md    (Ελληνικά)
├── cs/article-1.md    (Čeština)
├── hu/article-1.md    (Magyar)
├── sv/article-1.md    (Svenska)
├── da/article-1.md    (Dansk)
├── fi/article-1.md    (Suomi)
├── no/article-1.md    (Norsk)
├── sk/article-1.md    (Slovenčina)
├── hr/article-1.md    (Hrvatski)
├── sl/article-1.md    (Slovenščina)
├── bg/article-1.md    (Български)
├── lt/article-1.md    (Lietuvių)
├── lv/article-1.md    (Latviešu)
└── et/article-1.md    (Eesti)
```

**Vantaggi naming fisso:**

- ✅ Nessuna traduzione nome file necessaria
- ✅ URL consistenti: `/[lang]/blog/article-1`
- ✅ Facile trovare traduzioni (stesso path, diversa lingua)
- ✅ Semplice aggiungere nuovi articoli (incrementa numero)

---

## Generazione HTML dopo Traduzioni

Dopo aver salvato tutti i file markdown, rigenera il blog:

```bash
cd blog-static/_build
node generate-html.js --rebuild-all
```

Questo genererà gli HTML per tutte le 23 lingue automaticamente.
