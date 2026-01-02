# SEO & Analytics Setup - ClearCV

**Data Setup Iniziale**: 2025-11-24
**Dominio**: https://clearcvapp.com
**Stato**: ✅ Configurazione Completata

---

## 📊 Strumenti Configurati

### 1. Google Analytics 4
- **Account**: ClearCV
- **Proprietà**: ClearCV App
- **Measurement ID**: `G-VTLG85NBTE`
- **Stream Web**: ClearCV Website (https://clearcvapp.com)
- **Data Raccolta**: Attiva
- **Eventi Custom Configurati**:
  - Performance metrics
  - PWA installation tracking
  - Resource optimization

**Dashboard**: https://analytics.google.com/analytics/web/

---

### 2. Google Search Console
- **Proprietà Verificata**: https://clearcvapp.com
- **Metodo Verifica**: Tag HTML (`meta name="google-site-verification"`)
- **Sitemap Inviata**: https://clearcvapp.com/sitemap.xml
- **Stato Indicizzazione**: In corso (richiede 1-7 giorni)

**Dashboard**: https://search.google.com/search-console

---

### 3. Cloudflare Analytics
- **Zone ID**: `5748abacc12287c0d678c98badcc9c79`
- **Account ID**: `3b6245b263d581a0eddebc30df4797d6`
- **Piano**: Free
- **Cache**: Attiva (96.66% hit rate)
- **Workers**: clearcv-app

**Dashboard**: https://dash.cloudflare.com/5748abacc12287c0d678c98badcc9c79

---

## 🎯 Keywords Target (SEO)

### Keywords Primarie
1. **cv maker gratis** (ITA)
2. **professional resume builder** (ENG)
3. **cv online gratis** (ITA)
4. **curriculum vitae maker** (ITA/ENG)
5. **resume builder gratis** (ITA)

### Keywords Secondarie
- cv generator gratis
- resume maker online
- cv builder professional
- cv creator gratis
- professional cv maker

### Long-tail Keywords
- crea cv gratis online
- curriculum vitae europeo gratis
- cv professionale pdf gratis
- resume builder with AI
- cv maker with translation

---

## 📈 Metriche da Monitorare

### Google Analytics
- **Traffico**: Visitatori unici, sessioni, visualizzazioni pagina
- **Fonti**: Organico, diretto, social, referral
- **Comportamento**: Bounce rate, tempo sessione, pagine per sessione
- **Conversioni**:
  - Download PDF CV
  - Registrazioni utenti
  - Upgrade piano premium

### Google Search Console
- **Impressioni**: Quante volte appare nei risultati Google
- **Click**: Quanti cliccano sul risultato
- **CTR**: Click-through rate (%)
- **Posizione Media**: Ranking per ogni keyword
- **Errori Indicizzazione**: Pagine con problemi

### Cloudflare
- **Visitatori Unici**: Ultimi 24h / 7 giorni / 30 giorni
- **Richieste Totali**: Volume traffico
- **Cache Hit Rate**: % richieste servite da cache
- **Bandwidth**: Dati trasferiti

---

## 🔧 Configurazione Tecnica SEO

### Meta Tags (index.html)
```html
<title>CV Maker Gratis | Professional Resume Builder Online - ClearCV</title>
<meta name="description" content="Crea CV professionali gratis con ClearCV. CV maker gratis con template moderni, traduzione automatica in inglese e download PDF.">
<meta name="keywords" content="cv maker gratis, professional resume builder, cv online gratis, curriculum vitae maker...">
<meta name="robots" content="index, follow">
<link rel="canonical" href="https://clearcvapp.com/en/">
```

### Sitemap.xml
- **URL**: https://clearcvapp.com/sitemap.xml
- **Pagine**: 3 (homepage, index.html, privacy policy)
- **Ultimo Aggiornamento**: 2025-11-18
- **Frequenza Cambio**: weekly (homepage), monthly (privacy)

### Robots.txt
- **URL**: https://clearcvapp.com/robots.txt
- **Sitemap**: Dichiarata
- **Disallow**: Backend, tests, scripts, node_modules, .git, file .json, .py, .md

### Structured Data (JSON-LD)
- **Type**: WebApplication
- **Schema.org**: Presente
- **Dati**: Nome, descrizione, URL, categoria, pricing

### Hreflang
- Italiano: `<link rel="alternate" hreflang="it" href="https://clearcvapp.com/it/">`
- Inglese: `<link rel="alternate" hreflang="en" href="https://clearcvapp.com/">`
- Default: `<link rel="alternate" hreflang="x-default" href="https://clearcvapp.com/">`

---

## 🚀 Deploy History

| Data | Version ID | Modifiche |
|------|-----------|-----------|
| 2025-11-24 | `32c050c6-9ea7-4110-94a1-8ca1f5178f4f` | Sitemap + robots.txt fix + Search Console verification |
| 2025-11-24 | `9fb6cfa7-1a70-40a9-a18a-df5224763b6d` | Google Analytics integration (G-VTLG85NBTE) |
| 2025-11-24 | `2a26cd9e-8e58-44c5-8df8-81ea476d5b75` | Cache refresh deploy |

---

## 📝 Note Setup

### Problemi Risolti
1. **Domain inconsistency**: `cvclearapp.com` → `clearcvapp.com` in sitemap + robots.txt
2. **Outdated sitemap dates**: 2024-01-09 → 2025-11-18
3. **CSP headers**: Aggiunti domini Google Analytics
4. **Cache Cloudflare**: Aggiornata con re-deploy

### Configurazioni Attive
- ✅ Google Analytics tracking attivo
- ✅ Search Console verification attivo
- ✅ Sitemap submitted e in elaborazione
- ✅ CSP headers configurati per Analytics
- ✅ Events tracking (performance, PWA, optimization)

### Prossimi Step
1. ⏳ Aspettare 24-48h per primi dati Analytics significativi
2. ⏳ Aspettare 1-7 giorni per indicizzazione Google Search Console
3. 📊 Iniziare monitoraggio settimanale con `/seo-report`

---

## 🔗 Link Rapidi

- **Sito Live**: https://clearcvapp.com
- **Analytics Dashboard**: https://analytics.google.com/analytics/web/
- **Search Console**: https://search.google.com/search-console
- **Cloudflare Dashboard**: https://dash.cloudflare.com/5748abacc12287c0d678c98badcc9c79
- **Sitemap**: https://clearcvapp.com/sitemap.xml
- **Robots.txt**: https://clearcvapp.com/robots.txt

---

**Documento creato**: 2025-11-24
**Ultima modifica**: 2025-11-24
**Autore**: Claude Code Assistant
