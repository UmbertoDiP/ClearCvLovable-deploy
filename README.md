# ClearCV Lovable - Deployment Wrapper

Configurazione deployment per ClearCV app generata con Lovable, pubblicata su https://clearcvapp.com

## 🎯 Filosofia Progetto

Questo repository è un **wrapper di deployment** per l'app Lovable. La strategia è:

1. **clear-cv-integration** (submodule) = codice Lovable → **READ-ONLY**, mai modificare
2. **worker.js + patches/** = fix urgenti applicati via wrapper
3. **Update mensili** da Lovable per risparmio costi
4. **Fix immediati** via patches per produzione

📖 **Leggi la strategia completa**: [`STRATEGY.md`](./STRATEGY.md)

## 🚀 Quick Start

### Setup Iniziale

```bash
git clone --recurse-submodules https://github.com/UmbertoDiP/ClearCvLovable-deploy.git
cd ClearCvLovable-deploy
wrangler login
```

### Deploy

```bash
# Build Lovable app
cd clear-cv-integration
npm install
npm run build
cd ..

# Deploy to Cloudflare
wrangler deploy
```

### Fix Urgente (Senza Lovable)

```bash
# Modifica patches
nano patches/css-overrides.css

# Opzionale: aggiorna worker.js per iniettare patch

# Test locale
wrangler dev

# Deploy
wrangler deploy

# Purge cache
# → Cloudflare Dashboard → Caching → Purge Everything
```

### Update da Lovable (Mensile)

```bash
# 1. Lavora su Lovable.dev
# 2. Pull changes
cd clear-cv-integration
git pull origin main
git tag lovable-v1.X.0
cd ..

# 3. Rebuild
npm run build --prefix clear-cv-integration

# 4. Deploy
wrangler deploy
git add clear-cv-integration
git commit -m "Update Lovable to v1.X.0"
git push
```

## 📁 Struttura

```
ClearCvLovable/
├── README.md                    # Questo file
├── STRATEGY.md                  # Strategia completa progetto ⭐
├── wrangler.toml               # Config Cloudflare Workers
├── worker.js                   # Worker con routing SPA + patches
├── patches/                    # Fix urgenti (NO Lovable)
│   ├── css-overrides.css      # Override CSS
│   ├── js-patches.js          # Patch JavaScript
│   └── README.md              # Guida patches
├── docs/
│   ├── lovable-analysis/      # Analisi versioni Lovable
│   └── issues/                # Bug tracking
└── clear-cv-integration/       # Submodule Lovable (READ-ONLY)
    ├── dist/                  # Build artifacts
    └── src/                   # Source code React
```

## 🔗 Links

- **Production**: https://clearcvapp.com
- **Lovable Project**: https://lovable.dev/projects/REPLACE_WITH_PROJECT_ID
- **Lovable GitHub**: https://github.com/UmbertoDiP/clear-cv-integration
- **Cloudflare Dashboard**: https://dash.cloudflare.com

## 📊 Versioning

### Git Tags

- `lovable-v1.X.0` → Versioni Lovable (nel submodule)
- `deploy-v1.X.Y` → Versioni deployment (repository principale)

### Comandi

```bash
# Lista versioni
git tag

# Vedi differenze
cd clear-cv-integration
git diff lovable-v1.0.0 lovable-v1.1.0

# Rollback emergenza
git checkout deploy-v1.0.0
wrangler deploy
```

## 🛠️ Development

### Local Dev (Lovable)

```bash
cd clear-cv-integration
npm run dev
# → http://localhost:8080
```

### Local Dev (Cloudflare Worker)

```bash
wrangler dev
# → http://localhost:8787
```

## 📝 Workflow Scenari

### Scenario: Bug Critico in Produzione

1. **Studio** codice Lovable (read-only)
2. **Fix** via `patches/` o `worker.js`
3. **Test** con `wrangler dev`
4. **Deploy** con `wrangler deploy`
5. **Purge** cache Cloudflare
6. **Annota** per prossimo update Lovable

### Scenario: Update Mensile Lovable

1. **Lavora** su Lovable.dev
2. **Pull** submodule: `cd clear-cv-integration && git pull`
3. **Tag**: `git tag lovable-v1.X.0`
4. **Studio** differenze: `git diff lovable-v1.0.0 lovable-v1.1.0`
5. **Rebuild**: `npm run build`
6. **Verifica** compatibilità patches esistenti
7. **Deploy**: `wrangler deploy`
8. **Tag deployment**: `git tag deploy-v1.X.0`

## ⚠️ REGOLE CRITICHE

### ❌ MAI FARE

- Modificare codice in `clear-cv-integration/` direttamente
- Committare in `clear-cv-integration/` (è un submodule)
- Merge/rebase del submodule
- Push forzati sul submodule

### ✅ SEMPRE FARE

- Studio codice Lovable prima di fix
- Documentare ogni patch con commenti
- Tag ogni versione Lovable
- Tag ogni deployment
- Purge cache dopo deploy
- Test locale prima di produzione

## 💰 Risparmio Costi

- **Update Lovable**: ~1x al mese
- **Fix urgenti**: via patches (gratis)
- **Risparmio stimato**: 70-80% costi Lovable

## 📞 Support

Per dettagli completi, leggi [`STRATEGY.md`](./STRATEGY.md)

---

**Current Version**: Lovable v1.0.0 / Deploy v1.0.0
**Last Updated**: 2025-01-01
**Maintainer**: Umberto Di Puorto


## Audit Tecnico
- **Linguaggi:** HTML/CSS/JS o generico
- **Framework/Librerie Principali:** Nessuno/Non rilevato

*Generato automaticamente per la catalogazione dei progetti.*
