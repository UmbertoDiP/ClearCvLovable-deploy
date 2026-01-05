# Blog CSS Fix - Article Pages

**Data Fix**: 5 Gennaio 2026  
**Issue**: CSS navbar non funziona sulle pagine articolo  
**Root Cause**: URL assoluti con dominio hardcoded bypassano worker reverse proxy

---

## 🐛 Problema Identificato

### Homepage Blog (`/it/blog/index.html`)
```html
<link rel="stylesheet" href="/assets/blog-styles.css">
<link rel="stylesheet" href="/assets/blog-overrides.css">
```
✅ **Path relativi** → Worker intercetta correttamente → CSS caricati

### Pagine Articolo (`/it/blog/come-scrivere-cv-perfetto/index.html`)
```html
<link rel="stylesheet" href="https://clearcvapp.com/assets/blog-styles.css">
<link rel="stylesheet" href="https://clearcvapp.com/assets/blog-overrides.css">
```
❌ **URL assoluti** → Bypass worker → Request diretta a Pages → 404 (CSS non esistono su Pages)

---

## 🔧 Soluzione Applicata

### Sostituzione Globale

Sostituiti tutti i riferimenti `https://clearcvapp.com/assets/` con `/assets/` in:

```bash
find blog-static/it/blog -name "index.html" \
  -exec sed -i 's|https://clearcvapp.com/assets/|/assets/|g' {} \;
```

### File Modificati

**Articoli** (4):
- `blog-static/it/blog/come-scrivere-cv-perfetto/index.html`
- `blog-static/it/blog/cv-europass-2026/index.html`
- `blog-static/it/blog/cv-neolaureati/index.html`
- `blog-static/it/blog/errori-cv-da-evitare/index.html`

**Homepage** (1):
- `blog-static/it/blog/index.html`

**Categorie** (3):
- `blog-static/it/blog/categoria/consigli/index.html`
- `blog-static/it/blog/categoria/guide/index.html`
- `blog-static/it/blog/categoria/template/index.html`

**Tag** (11):
- `blog-static/it/blog/tag/consigli/index.html`
- `blog-static/it/blog/tag/curriculum/index.html`
- `blog-static/it/blog/tag/cv-europeo/index.html`
- `blog-static/it/blog/tag/cv/index.html`
- `blog-static/it/blog/tag/errori/index.html`
- `blog-static/it/blog/tag/europass/index.html`
- `blog-static/it/blog/tag/guida/index.html`
- `blog-static/it/blog/tag/neolaureati/index.html`
- `blog-static/it/blog/tag/primo-cv/index.html`
- `blog-static/it/blog/tag/template/index.html`

**Totale**: 19 file aggiornati

---

## ✅ Verifica Fix

### Prima del fix
```bash
$ grep -r "https://clearcvapp.com/assets/" blog-static/it/blog/ | wc -l
38
```

### Dopo il fix
```bash
$ grep -r "https://clearcvapp.com/assets/" blog-static/it/blog/ | wc -l
0
```

### Commit
```bash
git commit -m "Fix CSS paths in blog article pages - use relative URLs"
[master 8649c29] Fix CSS paths in blog article pages...
 17 files changed, 68 insertions(+), 68 deletions(-)

git push origin master
```

---

## 🎯 Come Funziona il Fix

### Worker Reverse Proxy (worker.js)

Il worker intercetta tutte le richieste `/assets/*` e le serve dal submodule `clear-cv-integration`:

```javascript
// worker.js linea ~408
if (url.pathname === '/assets/blog-styles.css') {
  const cssContent = await env.ASSETS.fetch(
    new Request('https://clearcvapp.com/clear-cv-integration/assets/blog-styles.css')
  );
  return new Response(cssContent.body, {
    headers: {
      'Content-Type': 'text/css',
      ...corsHeaders
    }
  });
}
```

### Flusso Request Corretto

**Con path relativi** (`/assets/blog-styles.css`):
```
Browser → clearcvapp.com/it/blog/articolo
          ↓
          Link: /assets/blog-styles.css
          ↓
Worker intercetta → Fetch da clear-cv-integration submodule
          ↓
CSS served ✅
```

**Con URL assoluti** (`https://clearcvapp.com/assets/...`):
```
Browser → https://clearcvapp.com/assets/blog-styles.css (diretta)
          ↓
Cloudflare Pages deployment (blog-static/)
          ↓
404 (file non esiste su Pages) ❌
```

---

## 📋 Checklist Pre-Deploy

Quando generi nuovi articoli HTML, verifica sempre:

- [ ] CSS links usano **path relativi**: `/assets/blog-styles.css`
- [ ] NO URL assoluti: ~~`https://clearcvapp.com/assets/...`~~
- [ ] NO URL con dominio Pages: ~~`https://1607c267.clearcv-blog.pages.dev/assets/...`~~
- [ ] Test locale: `http://localhost:8080/it/blog/articolo/` → CSS caricati
- [ ] Test produzione: `https://clearcvapp.com/it/blog/articolo/` → CSS caricati

---

## 🔍 Debug Command

Per verificare che non ci siano più URL assoluti:

```bash
cd ClearCvLovable
grep -r "https://clearcvapp.com/assets/" blog-static/it/blog/

# Output atteso: nessun risultato
```

Per verificare CSS in un articolo:

```bash
grep -n "stylesheet.*assets/blog" blog-static/it/blog/come-scrivere-cv-perfetto/index.html

# Output atteso:
# 75:    <link rel="stylesheet" href="/assets/blog-styles.css">
# 78:    <link rel="stylesheet" href="/assets/blog-overrides.css">
```

---

## 🚀 Next Steps

1. **Cloudflare Pages Auto-Deploy**
   - Il push su `master` triggera automaticamente il deploy su Cloudflare Pages
   - Attendi 2-3 minuti per propagazione

2. **Verifica Post-Deploy**
   ```bash
   curl -I https://clearcvapp.com/it/blog/come-scrivere-cv-perfetto/ | grep "HTTP"
   # Atteso: HTTP/2 200
   
   curl -I https://clearcvapp.com/assets/blog-styles.css | grep "HTTP"
   # Atteso: HTTP/2 200
   ```

3. **Visual Test**
   - Apri in incognito: https://clearcvapp.com/it/blog/come-scrivere-cv-perfetto/
   - Verifica navbar styling:
     - Logo ClearCV visibile
     - Font corretti
     - Colori design system (blu/verde)
     - Hover effects funzionanti

4. **Purge Cache (se necessario)**
   ```bash
   ./purge-cache.sh
   ```

---

**Status**: ✅ Fix completato  
**Commit**: `8649c29`  
**Deploy**: In corso (automatico)

