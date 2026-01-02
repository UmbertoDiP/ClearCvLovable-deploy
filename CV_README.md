# CV Project - Clear Structure

Progetto CV con separazione completa tra **dati** e **presentazione**.

## 📁 Struttura File

```
ClearCvLovable/
├── CV_BACKUP_ORIGINALE.html    # ✅ Backup immutabile del CV originale
├── CV_LAVORO.html               # ⚙️  Copia di lavoro (da modificare se necessario)
├── CV_TEMPLATE.html             # 🎨 Template pulito che legge da JSON
├── cv_data.json                 # 📊 Dati strutturati del CV
├── extract_cv_data.py           # 🔧 Script Python per estrarre dati da HTML
└── CV_README.md                 # 📖 Questa documentazione
```

## 🎯 Obiettivi Raggiunti

### ✅ Separazione Dati/Presentazione

- **cv_data.json**: Contiene TUTTI i dati del CV
  - Header (nome, titolo, foto base64)
  - Contatti (email, telefono, LinkedIn, P.IVA, location)
  - Skills (Frontend, Backend, Database, DevOps, Security, PKI)
  - Esperienza lavorativa (job_title, company, dates, description)
  - Formazione (qualification, dates, details)
  - Certificazioni
  - Lingue
  - Footer disclaimer

- **CV_TEMPLATE.html**: Template pulito con:
  - CSS embedded per styling completo
  - JavaScript che legge cv_data.json
  - Rendering dinamico di tutte le sezioni
  - Layout ottimizzato A4 multipagina
  - Print-ready (stampa perfetta)

### ✅ Versionamento Git

- Repository Git inizializzato
- Commit baseline con file originali
- Commit separati per:
  - Script estrazione dati
  - JSON generato
  - Template HTML pulito

### ✅ File Originale Preservato

- `CV_BACKUP_ORIGINALE.html` NON deve mai essere modificato
- Contiene il CV completo e funzionante come riferimento

## 🚀 Come Usare

### 1. Visualizzare il CV

Apri `CV_TEMPLATE.html` in un browser moderno.
Il CV si carica automaticamente dal JSON.

### 2. Modificare i Dati del CV

Modifica `cv_data.json` direttamente:

```json
{
  "header": {
    "name": "Nome Cognome",
    "title": "Titolo Professionale"
  },
  "contacts": [
    {"type": "link", "label": "email@example.com", "value": "mailto:email@example.com"}
  ],
  "experience": [
    {
      "job_title": "Posizione Lavorativa",
      "company": "Azienda",
      "dates": "Gen 2020 - Presente",
      "description": "Descrizione del ruolo..."
    }
  ]
}
```

Salva il file e ricarica `CV_TEMPLATE.html`.

### 3. Estrarre Nuovi Dati dall'HTML (se necessario)

Se parti da un nuovo HTML export:

```bash
python extract_cv_data.py
```

Lo script:
- Legge `CV_LAVORO.html`
- Estrae tutti i dati strutturati
- Genera `cv_data.json` aggiornato

## 🎨 Layout e Design

### Header
- Immagine profilo: 160x160px, bordo circolare
- Nome: 28pt, font-weight 700
- Titolo: 16pt, colore secondario
- Allineamento ottimizzato per A4

### Layout Due Colonne
- **Sidebar (35%)**: Contatti, Skills
- **Main Content (65%)**: Profilo, Esperienza, Formazione

### Pagine Multiple
- **Pagina 1**: Header, Contatti, Skills, Prime 3 esperienze
- **Pagina 2**: Resto esperienze, Formazione
- Footer su ogni pagina con disclaimer e numero pagina

### Stampa
- Ottimizzato per stampa A4
- Break di pagina automatici
- Colori preservati (print-color-adjust)

## 🔧 Manutenzione

### Aggiungere una Sezione

1. Aggiungi dati in `cv_data.json`:
```json
"certifications": [
  {
    "name": "Certificazione Nome",
    "issuer": "Ente Certificatore",
    "date": "2024"
  }
]
```

2. Modifica `CV_TEMPLATE.html` per renderizzare la nuova sezione:
```javascript
data.certifications.forEach(cert => {
    // Rendering logic
});
```

### Modificare lo Stile

Modifica il CSS nel `<style>` di `CV_TEMPLATE.html`.

Variabili CSS disponibili:
```css
:root {
    --color-primary: #1e40af;
    --color-text-main: #1a1a1a;
    --color-background: #f9f9f9;
}
```

## 📝 Note Tecniche

- **JSON Size**: 38KB (175 righe)
- **Encoding**: UTF-8
- **Font**: Inter (Google Fonts fallback)
- **Browser Support**: Modern browsers (Chrome, Firefox, Edge, Safari)
- **Print Support**: Optimized for A4 landscape

## 🔄 Workflow Modifiche

1. Modifica `cv_data.json`
2. Ricarica `CV_TEMPLATE.html` per vedere cambiamenti
3. Commit delle modifiche su Git
4. Push su repository remoto

## 🎯 Prossimi Step (Opzionali)

- [ ] Aggiungere sezione Certificazioni
- [ ] Aggiungere sezione Lingue
- [ ] Ottimizzare spacing tra sezioni
- [ ] Export PDF automatico
- [ ] Multi-lingua (EN/IT)
- [ ] Temi alternativi (colori)

## 📦 Dipendenze

- **Python 3.x** (per script estrazione)
- **BeautifulSoup4** (`pip install beautifulsoup4`)
- **lxml** (`pip install lxml`)

## 🐛 Troubleshooting

**Il CV non si carica**
- Verifica che `cv_data.json` sia nella stessa directory di `CV_TEMPLATE.html`
- Apri la console browser (F12) per vedere errori JavaScript

**Immagine non visibile**
- L'immagine è embedded come base64 nel JSON
- Verifica che `header.photo_url` contenga `data:image/jpeg;base64,...`

**Stampa tagliata**
- Usa "Stampa in PDF" invece di stampa fisica
- Imposta margini a 0 nelle opzioni di stampa

## 📄 Licenza

© 2025 - Progetto personale CV

---

**Ultimo aggiornamento**: 2 Gennaio 2025
