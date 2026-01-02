# SEO Monitoring Guide - ClearCV

Guida completa per monitorare e ottimizzare continuamente le performance SEO e Analytics del sito.

---

## 🔄 Frequenza Monitoraggio Consigliata

### Giornaliero (Quick Check - 5 min)
- **Google Analytics Real-time**: Traffico corrente
- **Cloudflare Analytics**: Visitatori ultimi 24h

### Settimanale (Report Completo - 30 min)
- ✅ **Comando Claude Code**: `/seo-report`
- Analisi traffico settimanale
- Verifica posizionamento keywords
- Check errori Search Console

### Mensile (Deep Analysis - 2 ore)
- Analisi trend mensili
- Ottimizzazione contenuti
- Competitor analysis
- A/B testing meta descriptions

---

## 🎯 Come Usare il Sistema di Monitoraggio

### Metodo 1: Comando Claude Code (Automatico)

**Uso**:
```
/seo-report
```

**Cosa fa**:
1. Raccoglie dati da Google Analytics
2. Raccoglie dati da Google Search Console
3. Raccoglie dati da Cloudflare
4. Genera report automatico in `docs/reports/YYYY-MM-DD_seo_report.md`
5. Fornisce raccomandazioni SEO personalizzate

**Output**:
- Report markdown completo
- Grafici e tabelle
- Insights e azioni consigliate

---

### Metodo 2: Analisi Manuale (Passo-Passo)

Se preferisci analizzare manualmente o il comando non è disponibile:

#### Step 1: Google Analytics Dashboard

**URL**: https://analytics.google.com/analytics/web/

**Cosa controllare**:

**A. Panoramica Traffico** (Report → Acquisizione → Panoramica)
- **Visitatori unici** ultimi 7/30 giorni
- **Sessioni totali**
- **Bounce rate** (ideale < 50%)
- **Durata media sessione** (ideale > 2 min)

**B. Fonti Traffico** (Report → Acquisizione → Traffico)
- **Organic Search**: Traffico da Google (obiettivo: >60%)
- **Direct**: Visite dirette
- **Social**: Da social media
- **Referral**: Da altri siti

**C. Pagine Popolari** (Report → Coinvolgimento → Pagine e schermate)
- Quali pagine ricevono più visite
- Quali hanno bounce rate alto (da ottimizzare)

**D. Conversioni** (Report → Coinvolgimento → Eventi)
- PDF downloads
- Registrazioni
- Click CTA importanti

**E. Tempo Reale** (Report → Tempo reale)
- Utenti attivi ora
- Pagine visualizzate ora
- Eventi in tempo reale

---

#### Step 2: Google Search Console

**URL**: https://search.google.com/search-console

**Cosa controllare**:

**A. Rendimento** (menu Rendimento)
| Metrica | Cosa significa | Obiettivo |
|---------|---------------|-----------|
| **Impressioni** | Quante volte appari su Google | Crescita mese su mese |
| **Click** | Quanti cliccano sul tuo risultato | Crescita mese su mese |
| **CTR** | % click / impressioni | > 3% (media settore) |
| **Posizione media** | Ranking medio keywords | < 20 (prima pagina) |

**Filtra per**:
- Ultimi 7 giorni vs precedenti 7
- Ultimi 28 giorni vs precedenti 28
- Query specifiche (es. "cv maker gratis")

**B. Copertura / Pagine** (menu Copertura o Pagine)
- **Pagine indicizzate**: Quante pagine Google ha ind

icizzato
- **Errori**: Pagine con problemi (404, redirect, crawl errors)
- **Esclusioni**: Pagine non indicizzate (verificare se intenzionale)

**C. Query Principali** (Rendimento → Query)
Ordina per:
- **Impressioni**: Quali keywords ti mostrano di più
- **Click**: Quali portano traffico effettivo
- **CTR**: Quali hanno miglior tasso conversione impression→click
- **Posizione**: Dove sei posizionato

**D. Sitemap** (menu Sitemap)
- **Stato**: Operazione riuscita
- **Pagine trovate**: 3
- **Ultima lettura**: Data recente

---

#### Step 3: Cloudflare Analytics

**URL**: https://dash.cloudflare.com/5748abacc12287c0d678c98badcc9c79

**Cosa controllare**:

**A. Panoramica** (tab Analisi)
- **Visitatori unici** (24h / 7 giorni / 30 giorni)
- **Richieste totali**
- **Percentuale cache** (ideale > 90%)
- **Bandwidth** utilizzato

**B. Traffico per Paese**
- Da quali paesi arrivano visitatori
- Opportunità localizzazione

**C. Performance**
- **Cache hit rate**: Efficienza cache
- **Bandwidth saved**: Risparmio grazie a cache

---

## 📊 Metriche Chiave da Tracciare

### Traffico
```
Visitatori Unici (7 giorni): ___
Sessioni (7 giorni): ___
Trend vs settimana precedente: ↑ +X% / ↓ -X%
```

### Posizionamento SEO
```
Posizione media Google: ___
Impressioni totali: ___
CTR medio: ___%
Click totali: ___
```

### Conversioni
```
PDF downloads: ___
Registrazioni: ___
Conversion rate: ___%
```

### Performance Tecnica
```
Bounce rate: ___%
Durata media sessione: ___ min
Pagine per sessione: ___
Cache hit rate: ___%
```

---

## 🎯 Keywords Performance Tracking

### Come Monitorare Posizionamento Keywords

**Manuale** (Google Search Console):
1. Vai su Rendimento → Query
2. Cerca keyword specifica (es. "cv maker gratis")
3. Annota:
   - Posizione media
   - Impressioni
   - Click
   - CTR

**Tool Esterni** (opzionali):
- **Google Trends**: Verifica volume ricerche
- **Ubersuggest**: Analisi competitors
- **Ahrefs/SEMrush**: (a pagamento) Tracking completo

### Tabella Tracking Keywords

| Keyword | Posizione | Impressioni | Click | CTR | Trend |
|---------|-----------|-------------|-------|-----|-------|
| cv maker gratis | ___ | ___ | ___ | ___% | ↑/↓/→ |
| professional resume builder | ___ | ___ | ___ | ___% | ↑/↓/→ |
| cv online gratis | ___ | ___ | ___ | ___% | ↑/↓/→ |
| curriculum vitae maker | ___ | ___ | ___ | ___% | ↑/↓/→ |
| resume builder gratis | ___ | ___ | ___ | ___% | ↑/↓/→ |

**Aggiorna**: Settimanalmente

---

## 🔍 Analisi SERP (Search Engine Results Page)

### Come Analizzare la Concorrenza

**Step 1**: Apri navigazione in incognito
**Step 2**: Cerca su Google la tua keyword target
**Step 3**: Analizza i primi 10 risultati

**Cosa annotare per ogni competitor**:

```markdown
## Competitor: [Nome Sito]
- **Posizione**: #X
- **Title**: [Il loro title tag]
- **Description**: [La loro meta description]
- **URL**: [URL risultato]
- **Cosa fanno meglio**: [Es. Title più accattivante, descrizione più chiara]
- **Opportunità**: [Cosa possiamo migliorare]
```

### Competitor Analysis Template

```markdown
# SERP Analysis: "cv maker gratis"
**Data**: 2025-11-24
**Search Engine**: Google.it
**Location**: Italia

## Top 3 Competitors

### #1: [Competitor Name]
- **Title**: "..."
- **Description**: "..."
- **Strengths**:
  - X
  - Y
- **Weaknesses**:
  - A
  - B
- **Nostra opportunità**:
  - Possiamo fare meglio su Z

### #2: [Competitor Name]
...

### #3: [Competitor Name]
...

## Insights
- **Cosa funziona**: [Pattern comuni nei top risultati]
- **Cosa manca**: [Opportunità non sfruttate]
- **Azioni consigliate**:
  1. Migliorare title includendo...
  2. Ottimizzare description con...
  3. Aggiungere contenuto su...
```

---

## 🚀 Azioni SEO Basate sui Dati

### Se Impressioni Alte ma CTR Basso
**Problema**: Appari nei risultati ma pochi cliccano
**Soluzione**:
- ✅ Migliorare **title tag** (più accattivante)
- ✅ Ottimizzare **meta description** (call-to-action chiara)
- ✅ Aggiungere **structured data** per rich snippets

### Se Posizione Alta ma Pochi Click
**Problema**: Sei in prima pagina ma non converti
**Soluzione**:
- ✅ A/B test title/description diversi
- ✅ Aggiungere emoji nel title (⭐ 🎯)
- ✅ Highlight USP (es. "Gratis", "Senza Registrazione")

### Se Bounce Rate Alto
**Problema**: Utenti abbandonano subito
**Soluzione**:
- ✅ Migliorare **velocità caricamento**
- ✅ Rendere **CTA più chiara**
- ✅ Migliorare **UX mobile**
- ✅ Aggiungere **social proof** (recensioni, testimonial)

### Se Poche Impressioni
**Problema**: Google non ti mostra abbastanza
**Soluzione**:
- ✅ **Content marketing**: Scrivere blog post su keywords correlate
- ✅ **Link building**: Ottenere backlink da siti autorevoli
- ✅ **Social media**: Condividere contenuti
- ✅ **Long-tail keywords**: Targetizzare keywords meno competitive

---

## 📈 Ottimizzazione Continua

### Ciclo Settimanale

**Lunedì**: Genera report con `/seo-report`
**Mercoledì**: Analizza competitors SERP
**Venerdì**: Implementa ottimizzazioni basate su dati

### Checklist Settimanale

- [ ] Eseguito `/seo-report`
- [ ] Controllato posizionamento top 5 keywords
- [ ] Verificato errori Search Console
- [ ] Analizzato bounce rate pagine principali
- [ ] Identificato 1-2 azioni di miglioramento
- [ ] Implementato ottimizzazioni (se necessario)
- [ ] Documentato cambiamenti per tracking futuro

### Esperimenti A/B Suggeriti

**Title Tag** (testare varianti):
- Versione A: "CV Maker Gratis | Professional Resume Builder"
- Versione B: "Crea CV Gratis Online in 5 Minuti | ClearCV"
- Misura: CTR dopo 2 settimane

**Meta Description**:
- Versione A: Focus su "gratis" e "veloce"
- Versione B: Focus su "professionale" e "PDF"
- Misura: CTR e bounce rate

**Landing Page CTA**:
- Versione A: "Crea il Tuo CV Ora"
- Versione B: "Inizia Gratis - No Registrazione"
- Misura: Conversion rate

---

## 🔗 Tool Esterni Utili (Opzionali)

### Gratuiti
- **Google Trends**: Analisi volume ricerche
- **Google PageSpeed Insights**: Performance sito
- **Mobile-Friendly Test**: Test mobile Google
- **Rich Results Test**: Verifica structured data

### Freemium
- **Ubersuggest**: Keywords research e competitors
- **AnswerThePublic**: Idee contenuti long-tail
- **Screaming Frog** (free fino 500 URL): Audit tecnico SEO

### A Pagamento (Avanzati)
- **Ahrefs**: Backlinks, keywords, competitors
- **SEMrush**: Suite completa SEO/SEM
- **Moz Pro**: SEO toolbox

---

## 📝 Template Tracciamento Manuale

Se preferisci tracciare manualmente:

```markdown
# SEO Weekly Report - Week of YYYY-MM-DD

## 📊 Metriche Principali

### Traffico
- Visitatori unici: ___
- Sessioni: ___
- Bounce rate: ___%
- Trend vs settimana scorsa: ↑ +X% / ↓ -X%

### SEO
- Posizione media: ___
- Impressioni: ___
- Click: ___
- CTR: ___%

### Conversioni
- PDF downloads: ___
- Registrazioni: ___
- Conversion rate: ___%

## 🎯 Top 5 Keywords

1. [keyword]: Posizione #___, ___ click, ___% CTR
2. [keyword]: Posizione #___, ___ click, ___% CTR
3. [keyword]: Posizione #___, ___ click, ___% CTR
4. [keyword]: Posizione #___, ___ click, ___% CTR
5. [keyword]: Posizione #___, ___ click, ___% CTR

## 🔍 Insights Principali

- [Insight 1]
- [Insight 2]
- [Insight 3]

## ✅ Azioni per Prossima Settimana

- [ ] [Azione 1]
- [ ] [Azione 2]
- [ ] [Azione 3]
```

---

## 🎓 Risorse Apprendimento SEO

### Guide Ufficiali
- **Google Search Central**: https://developers.google.com/search
- **Google Analytics Academy**: https://analytics.google.com/analytics/academy/
- **Cloudflare Learning**: https://www.cloudflare.com/learning/

### Blog/Community
- **Moz Blog**: Aggiornamenti SEO
- **Search Engine Journal**: News e guide
- **Ahrefs Blog**: Tutorial SEO avanzato

---

**Documento creato**: 2025-11-24
**Ultima modifica**: 2025-11-24
**Prossimo aggiornamento**: Settimanale con `/seo-report`
