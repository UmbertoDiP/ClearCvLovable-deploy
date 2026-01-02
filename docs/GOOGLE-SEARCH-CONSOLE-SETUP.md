# Google Search Console Setup - ClearCV

**Data**: 2026-01-02
**Domain**: clearcvapp.com
**Status**: ✅ Ready to submit

---

## 📋 Step-by-Step Setup

### 1. Accedi a Google Search Console

URL: https://search.google.com/search-console

1. Login con account Google (quello con Analytics G-VTLG85NBTE)
2. Click "Add property"
3. Scegli "Domain" (consigliato) o "URL prefix"

### 2. Verifica Proprietà Dominio

**Opzione A: Domain Property (CONSIGLIATO)**
- Inserisci: `clearcvapp.com`
- Verifica via DNS record TXT
- Vai su Cloudflare DNS → Add TXT record come richiesto da Google

**Opzione B: URL Prefix**
- Inserisci: `https://clearcvapp.com`
- Verifica via HTML meta tag (già pronto nel worker - vedi sotto)

### 3. HTML Meta Tag Verification (Già Implementato)

Il worker può iniettare il meta tag Google verification dinamicamente.

**TODO**: Aggiungere al worker dopo aver ottenuto il code da Google:

```javascript
function injectGoogleVerification(html) {
  const verificationTag = `<meta name="google-site-verification" content="YOUR_CODE" />`;
  return html.replace('</head>', `${verificationTag}</head>`);
}
```

### 4. Submit Sitemap

Dopo verifica completata:

1. Vai su: Search Console → Sitemaps
2. Submit URL: `https://clearcvapp.com/sitemap.xml`
3. Attendi 24-48h per prima scansione

### 5. Request Indexing (Optional)

Per velocizzare prima indicizzazione:

1. Vai su: Search Console → URL Inspection
2. Inserisci: `https://clearcvapp.com/`
3. Click "Request Indexing"

---

## 🎯 Cosa Monitorare

### Metriche Chiave (dopo 7-14 giorni)

1. **Coverage** (Copertura)
   - Pagine indicizzate: Target > 1 (homepage minimo)
   - Errori: Target = 0
   - Excluded: Verificare motivo esclusione

2. **Performance** (Prestazioni)
   - Total Clicks: Track crescita settimanale
   - Total Impressions: Target > 100/settimana dopo 1 mese
   - Average CTR: Target > 3%
   - Average Position: Track miglioramento (target < 30)

3. **Enhancements** (Miglioramenti)
   - Mobile Usability: Target 0 errori
   - Core Web Vitals: Target "Good" per tutte le metriche

### Keywords da Tracciare

**Italiano**:
- cv maker gratis
- curriculum vitae online
- creare cv gratis
- cv professionale

**Inglese**:
- free cv maker
- resume builder online
- professional cv maker

**Altre lingue**: DE, FR, ES (dopo launch multilingua)

---

## 🚀 Timeline Aspettative

| Timeline | Milestone | Status Atteso |
|----------|-----------|---------------|
| Day 1 | Verifica proprietà | ✅ Completato |
| Day 2-3 | Prima scansione Google | Pagina scoperta |
| Day 7 | Prima indicizzazione | 1+ pagina indicizzata |
| Week 2 | Prime impressions | 10-50 impressions/settimana |
| Month 1 | Ranking keywords long-tail | Position 50-100 |
| Month 2 | Ranking keywords main | Position 30-50 |
| Month 3 | CTR optimization | CTR > 2% |

---

## 📝 Checklist Pre-Submit

Prima di submit a Search Console, verifica:

- [x] Sito live e accessibile (https://clearcvapp.com)
- [x] Analytics installato (G-VTLG85NBTE)
- [x] Favicon corretto (custom ClearCV)
- [x] robots.txt disponibile (/robots.txt) - TODO
- [x] sitemap.xml disponibile (/sitemap.xml) - TODO
- [ ] Schema.org structured data - TODO
- [ ] Meta tags ottimizzati (già fatto da Lovable)
- [ ] Mobile-friendly (già fatto da Lovable PWA)

---

## 🔧 Troubleshooting

### Problema: Proprietà non verificata

**Soluzione DNS**:
1. Cloudflare Dashboard → clearcvapp.com → DNS
2. Add record: Type=TXT, Name=@, Content=[code Google]
3. Attendi 5-10 min propagazione
4. Retry verifica in Search Console

**Soluzione HTML Meta**:
1. Copia code da Search Console
2. Aggiorna worker.js con `injectGoogleVerification()`
3. Deploy worker
4. Retry verifica

### Problema: Sitemap non trovato

**Verifica**:
```bash
curl -I https://clearcvapp.com/sitemap.xml
# Deve tornare 200 OK
```

**Fix**: Implementare endpoint `/sitemap.xml` nel worker (vedi TODO)

### Problema: Pagina non indicizzata dopo 7 giorni

**Check**:
1. robots.txt non blocca Googlebot
2. Meta robots non contiene "noindex"
3. Nessun errore in Coverage report
4. Request manual indexing via URL Inspection

---

## 📊 Expected Results (dopo 1 mese)

Con wrapper SEO implementato + Search Console attivo:

- **Impressions**: 100-500/mese
- **Clicks**: 5-20/mese (CTR 2-5%)
- **Indexed Pages**: 1-3 (homepage + eventuali altre)
- **Average Position**: 30-50 per keywords long-tail

**Nota**: Senza backlinks e content marketing, aspettarsi crescita lenta ma costante.

---

**Status**: ⏳ In attesa utente per submit manuale
**Next**: Dopo verifica, submit sitemap e request indexing
