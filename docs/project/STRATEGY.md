# ClearCV Lovable - Strategia di Gestione Progetto

## 🎯 Obiettivo Principale

Mantenere l'app ClearCV in produzione su https://clearcvapp.com riducendo i costi di Lovable, aggiornando l'app solo quando necessario (circa 1 volta al mese) e applicando fix urgenti tramite wrapper personalizzato.

## 📋 Architettura Progetto

### Repository Structure

```
ClearCvLovable/                     # Repository deployment (modificabile)
├── .git/                           # Git principale
├── wrangler.toml                   # Config Cloudflare Workers
├── worker.js                       # Worker wrapper per fix/routing
├── patches/                        # Fix e patch personalizzate
│   ├── css-overrides.css          # Override CSS urgenti
│   ├── js-patches.js              # Patch JavaScript
│   └── api-wrappers.js            # Wrapper API personalizzati
└── clear-cv-integration/           # Submodule Lovable (READ-ONLY)
    ├── .git/                       # Git separato (GitHub)
    ├── dist/                       # Build artifacts
    └── src/                        # Source code (da Lovable)
```

### Principi Fondamentali

1. **clear-cv-integration è READ-ONLY**
   - NON modificare mai direttamente
   - Solo pull da GitHub quando Lovable fa push
   - Studio e analisi del codice per capire struttura

2. **Fix urgenti via wrapper**
   - Modifiche in `worker.js` per intercettare richieste
   - CSS override in `patches/css-overrides.css`
   - JavaScript patches via `patches/js-patches.js`

3. **Aggiornamenti mensili da Lovable**
   - Circa 1 aggiornamento al mese per evitare costi eccessivi
   - Tagging Git per tracciare versioni
   - Rebuild e redeploy dopo ogni sync

## 🔄 Workflow Operativo

### Scenario 1: Fix Urgente (Senza Lovable)

**Quando**: Bug critico in produzione, non si vuole pagare Lovable

**Procedura**:

1. **Identifica il problema**
   ```bash
   cd C:\Users\umber\Documents\MyProjects\ClearCvLovable
   # Analizza il codice in clear-cv-integration (solo lettura)
   ```

2. **Crea patch nel wrapper**
   ```bash
   # Modifica worker.js per intercettare/fixare
   # O crea override CSS in patches/css-overrides.css
   # O patch JS in patches/js-patches.js
   ```

3. **Test locale**
   ```bash
   wrangler dev
   # Verifica fix su http://localhost:8787
   ```

4. **Deploy patch**
   ```bash
   git add worker.js patches/
   git commit -m "Fix: [descrizione bug]"
   git push
   wrangler deploy
   ```

5. **Purge cache Cloudflare**
   - Dashboard → Caching → Purge Everything

**Esempi di fix via wrapper**:

```javascript
// worker.js - Esempio intercettazione API
if (url.pathname === '/api/problematic-endpoint') {
  // Fix inline invece di modificare Lovable
  return new Response(JSON.stringify({fixed: true}), {
    headers: {'Content-Type': 'application/json'}
  });
}

// CSS override injection
if (url.pathname === '/index.html') {
  const html = await asset.text();
  const patched = html.replace(
    '</head>',
    '<link rel="stylesheet" href="/patches/css-overrides.css"></head>'
  );
  return new Response(patched, {headers: {'Content-Type': 'text/html'}});
}
```

### Scenario 2: Aggiornamento da Lovable (Mensile)

**Quando**: Circa 1 volta al mese, quando servono nuove feature o refactoring

**Procedura**:

1. **Lavora su Lovable**
   - Vai su https://lovable.dev/projects/[PROJECT_ID]
   - Implementa le modifiche necessarie
   - Lovable fa auto-commit su GitHub

2. **Pull aggiornamento locale**
   ```bash
   cd C:\Users\umber\Documents\MyProjects\ClearCvLovable\clear-cv-integration
   git pull origin main
   cd ..
   ```

3. **Tag versione Lovable**
   ```bash
   cd clear-cv-integration
   git tag -a lovable-v1.1.0 -m "Lovable update: [descrizione]"
   git push origin lovable-v1.1.0
   cd ..
   ```

4. **Studio nuovo codice**
   ```bash
   # Leggi le modifiche per capire struttura
   cd clear-cv-integration
   git log --oneline -10
   git diff lovable-v1.0.0 lovable-v1.1.0

   # Studia file modificati
   # NON MODIFICARE - solo analisi
   ```

5. **Rebuild app**
   ```bash
   cd clear-cv-integration
   npm install  # Se nuove dipendenze
   npm run build
   cd ..
   ```

6. **Verifica patches compatibilità**
   ```bash
   # Controlla se le tue patch in worker.js sono ancora valide
   # Adatta se necessario per nuova versione Lovable
   ```

7. **Deploy nuova versione**
   ```bash
   git add clear-cv-integration
   git commit -m "Update Lovable submodule to v1.1.0"
   git push
   wrangler deploy
   ```

8. **Tag deployment**
   ```bash
   git tag -a deploy-v1.1.0 -m "Deploy Lovable v1.1.0 to production"
   git push origin deploy-v1.1.0
   ```

### Scenario 3: Studio Codice (Sempre)

**Quando**: Prima di ogni fix o update, per capire struttura

**Procedura**:

1. **Naviga nel codice Lovable**
   ```bash
   cd C:\Users\umber\Documents\MyProjects\ClearCvLovable\clear-cv-integration

   # Esplora struttura
   ls -R src/

   # Leggi componenti React
   cat src/components/ComponentName.tsx

   # Cerca pattern specifici
   grep -r "keyword" src/
   ```

2. **Identifica entry points**
   ```bash
   # Main entry
   cat src/main.tsx

   # Routes
   cat src/App.tsx

   # API integrations
   grep -r "supabase" src/
   ```

3. **Documenta findings**
   ```bash
   cd ..
   # Crea note in docs/
   mkdir -p docs/lovable-analysis
   echo "# Analysis v1.0.0" > docs/lovable-analysis/v1.0.0.md
   ```

4. **NON MODIFICARE MAI**
   - Se trovi bug, annota in `docs/`
   - Fix via wrapper o aspetta prossimo update Lovable

## 📊 Tracking Versioni

### Git Tags Strategia

**Lovable versions** (nel submodule):
```bash
lovable-v1.0.0   # Prima versione Lovable
lovable-v1.1.0   # Secondo update mensile
lovable-v1.2.0   # Terzo update mensile
```

**Deployment versions** (repository principale):
```bash
deploy-v1.0.0    # Primo deploy
deploy-v1.0.1    # Fix urgente (no Lovable)
deploy-v1.0.2    # Altro fix urgente
deploy-v1.1.0    # Deploy Lovable v1.1.0
deploy-v1.1.1    # Fix urgente post-update
```

### Comandi Quick Reference

```bash
# Lista versioni Lovable
cd clear-cv-integration && git tag | grep lovable

# Lista deployment
git tag | grep deploy

# Vedi differenze tra versioni Lovable
cd clear-cv-integration
git diff lovable-v1.0.0 lovable-v1.1.0

# Vedi deployment history
git log --oneline --decorate --graph
```

## 💰 Risparmio Costi

### Costi Lovable (Stimati)

- **Uso intensivo**: $X/mese (modifiche giornaliere)
- **Uso mensile**: $Y/mese (1 aggiornamento al mese)
- **Risparmio**: ~70-80% con strategia wrapper

### Quando Usare Lovable

✅ **Usa Lovable per**:
- Nuove feature importanti
- Refactoring architetturale
- Aggiornamenti UI maggiori
- Modifiche complesse multi-file

❌ **NON usare Lovable per**:
- Fix CSS minori
- Correzioni testo/copia
- Hotfix urgenti
- Tweak UI piccoli
- Modifiche routing/API

## 🛠️ Struttura Patches

### patches/css-overrides.css

```css
/* Override CSS per fix urgenti senza toccare Lovable */

/* Fix Button Width Bug */
.modal-button {
  min-width: 120px !important;
}

/* Fix Mobile Menu */
@media (max-width: 768px) {
  .mobile-nav {
    z-index: 9999 !important;
  }
}
```

### patches/js-patches.js

```javascript
/* Patch JavaScript per fix runtime senza toccare Lovable */

// Fix PDF export bug
window.addEventListener('load', () => {
  if (window.pdfExport) {
    window.pdfExport.fixEncoding = true;
  }
});
```

### worker.js Patterns

```javascript
// Pattern 1: CSS Override Injection
async function injectPatches(html) {
  return html.replace(
    '</head>',
    '<link rel="stylesheet" href="/patches/css-overrides.css">' +
    '<script src="/patches/js-patches.js"></script>' +
    '</head>'
  );
}

// Pattern 2: API Response Transform
async function transformApiResponse(response) {
  const data = await response.json();
  // Applica fix ai dati
  data.fixed = true;
  return new Response(JSON.stringify(data), {
    headers: response.headers
  });
}

// Pattern 3: Route Redirect
if (url.pathname === '/old-route') {
  return Response.redirect('https://clearcvapp.com/new-route', 301);
}
```

## 📝 Checklist Operativa

### Prima di Ogni Fix Urgente

- [ ] Studio codice Lovable per capire root cause
- [ ] Verifico se fix è possibile via wrapper
- [ ] Documento il problema in `docs/issues/`
- [ ] Implemento fix in `worker.js` o `patches/`
- [ ] Test locale con `wrangler dev`
- [ ] Deploy e purge cache
- [ ] Annoto fix per prossimo update Lovable

### Prima di Ogni Update Lovable

- [ ] Rivedo lista fix urgenti applicati
- [ ] Planifico modifiche da fare su Lovable
- [ ] Backup versione corrente (git tag)
- [ ] Lavoro su Lovable
- [ ] Pull e tag nuovo submodule
- [ ] Studio differenze codice
- [ ] Verifico compatibilità patches esistenti
- [ ] Rebuild e deploy
- [ ] Test completo produzione
- [ ] Cleanup patches ora integrate in Lovable

## 🎓 Best Practices

1. **Mai modificare clear-cv-integration direttamente**
   - Se lo fai, perdi sync con Lovable
   - Usa sempre wrapper pattern

2. **Documenta ogni fix wrapper**
   - Commenta perché il fix è necessario
   - Annota ticket Lovable per integrarlo

3. **Test locale sempre**
   - `wrangler dev` prima di ogni deploy
   - Verifica fix non rompono altre funzioni

4. **Tag aggressivo**
   - Tag ogni versione Lovable
   - Tag ogni deployment
   - Facile rollback in caso problemi

5. **Purge cache dopo deploy**
   - Cloudflare cache può nascondere fix
   - Sempre purge dopo wrangler deploy

## 🚀 Quick Commands

```bash
# Studio codice Lovable
cd clear-cv-integration && ls -R src/

# Fix urgente CSS
echo ".fix { color: red; }" >> patches/css-overrides.css
wrangler deploy

# Update da Lovable
cd clear-cv-integration && git pull && cd .. && npm run build --prefix clear-cv-integration && wrangler deploy

# Rollback emergenza
git checkout deploy-v1.0.0 && wrangler deploy

# Vedi differenze versioni
cd clear-cv-integration && git diff lovable-v1.0.0 lovable-v1.1.0 --stat
```

## 📞 Contatti Lovable

- **Project URL**: https://lovable.dev/projects/REPLACE_WITH_PROJECT_ID
- **GitHub Repo**: https://github.com/UmbertoDiP/clear-cv-integration
- **Update Frequency**: ~1x al mese (massimo risparmio)

## 🔐 Credenziali e Secrets

### Cloudflare Workers
- **Account**: (vedi Cloudflare Dashboard)
- **Worker Name**: `clearcv-app`
- **KV Namespaces**:
  - `CV_STORAGE`: `db6a944b74b04ecd91f027a7ad7257df`
  - `USER_SESSIONS`: `aa90ab4794204ce3aa63b6879bbad956`

### Supabase
- **Project ID**: `plbdiehcqwaakrbksclh`
- **URL**: `https://plbdiehcqwaakrbksclh.supabase.co`
- **Keys**: vedi `clear-cv-integration/.env`

---

**Last Updated**: 2025-01-01
**Current Version**: Lovable v1.0.0 / Deploy v1.0.0
