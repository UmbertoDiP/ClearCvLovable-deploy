# Quick Reference - ClearCV Lovable

Comandi rapidi per operazioni comuni. Copia-incolla ready.

## 📁 Navigazione

```bash
# Directory principale (deployment wrapper)
cd C:\Users\umber\Documents\MyProjects\ClearCvLovable

# Directory Lovable app (submodule READ-ONLY)
cd C:\Users\umber\Documents\MyProjects\ClearCvLovable\clear-cv-integration
```

## 🚀 Deploy Completo

```bash
# Build + Deploy in un comando
cd C:\Users\umber\Documents\MyProjects\ClearCvLovable && \
npm run build --prefix clear-cv-integration && \
wrangler deploy

# Poi vai su Cloudflare Dashboard e fai Purge Cache
```

## 🔧 Fix Urgente (NO Lovable)

### CSS Fix

```bash
cd C:\Users\umber\Documents\MyProjects\ClearCvLovable

# Modifica patches/css-overrides.css
code patches/css-overrides.css

# Test locale
wrangler dev

# Deploy
git add patches/css-overrides.css
git commit -m "Fix: [descrizione bug CSS]"
git tag deploy-v1.0.X
git push origin master
git push origin deploy-v1.0.X
wrangler deploy

# Purge cache su Cloudflare Dashboard
```

### JavaScript Fix

```bash
cd C:\Users\umber\Documents\MyProjects\ClearCvLovable

# Modifica patches/js-patches.js
code patches/js-patches.js

# Test locale
wrangler dev

# Deploy
git add patches/js-patches.js
git commit -m "Fix: [descrizione bug JS]"
git tag deploy-v1.0.X
git push origin master
git push origin deploy-v1.0.X
wrangler deploy

# Purge cache su Cloudflare Dashboard
```

### Worker Fix

```bash
cd C:\Users\umber\Documents\MyProjects\ClearCvLovable

# Modifica worker.js per routing/API fix
code worker.js

# Test locale
wrangler dev

# Deploy
git add worker.js
git commit -m "Fix: [descrizione bug worker]"
git tag deploy-v1.0.X
git push origin master
git push origin deploy-v1.0.X
wrangler deploy

# Purge cache su Cloudflare Dashboard
```

## 🔄 Update da Lovable (Mensile)

### Full Workflow

```bash
# 1. Lavora su Lovable.dev fino a completare modifiche

# 2. Pull changes dal submodule
cd C:\Users\umber\Documents\MyProjects\ClearCvLovable\clear-cv-integration
git pull origin main

# 3. Tag versione Lovable
git tag -a lovable-v1.X.0 -m "Lovable update: [descrizione]"
git push origin lovable-v1.X.0
cd ..

# 4. Studio differenze (opzionale ma consigliato)
cd clear-cv-integration
git diff lovable-v1.0.0 lovable-v1.1.0 --stat
cd ..

# 5. Rebuild
npm run build --prefix clear-cv-integration

# 6. Update submodule nel wrapper
git add clear-cv-integration
git commit -m "Update Lovable submodule to v1.X.0

[Descrizione modifiche Lovable]
[Lista patch integrate se applicabile]
"
git tag -a deploy-v1.X.0 -m "Deploy Lovable v1.X.0"
git push origin master
git push origin deploy-v1.X.0

# 7. Deploy
wrangler deploy

# 8. Purge cache su Cloudflare Dashboard
```

### One-Liner Update (veloce)

```bash
cd C:\Users\umber\Documents\MyProjects\ClearCvLovable\clear-cv-integration && \
git pull origin main && \
git tag lovable-v1.X.0 && \
git push origin lovable-v1.X.0 && \
cd .. && \
npm run build --prefix clear-cv-integration && \
git add clear-cv-integration && \
git commit -m "Update Lovable to v1.X.0" && \
git tag deploy-v1.X.0 && \
git push origin master && \
git push origin deploy-v1.X.0 && \
wrangler deploy
```

## 🏷️ Tagging

### Crea Tag Deploy

```bash
cd C:\Users\umber\Documents\MyProjects\ClearCvLovable

git tag -a deploy-v1.0.X -m "Fix: [descrizione]"
git push origin deploy-v1.0.X
```

### Crea Tag Lovable

```bash
cd C:\Users\umber\Documents\MyProjects\ClearCvLovable\clear-cv-integration

git tag -a lovable-v1.X.0 -m "Lovable update: [descrizione]"
git push origin lovable-v1.X.0
cd ..
```

### Lista Tag

```bash
# Tutti i tag
cd C:\Users\umber\Documents\MyProjects\ClearCvLovable
git tag

# Solo tag deploy
git tag | grep deploy

# Solo tag Lovable
cd clear-cv-integration
git tag | grep lovable
cd ..
```

## 🔍 Studio Codice Lovable

### Esplora Struttura

```bash
cd C:\Users\umber\Documents\MyProjects\ClearCvLovable\clear-cv-integration

# Lista directory src
ls -R src/

# Trova tutti i componenti React
find src/ -name "*.tsx" -o -name "*.jsx"

# Cerca pattern specifici
grep -r "keyword" src/

# Vedi imports Supabase
grep -r "supabase" src/
```

### Analizza Differenze Versioni

```bash
cd C:\Users\umber\Documents\MyProjects\ClearCvLovable\clear-cv-integration

# Differenze tra versioni (summary)
git diff lovable-v1.0.0 lovable-v1.1.0 --stat

# Differenze complete
git diff lovable-v1.0.0 lovable-v1.1.0

# Differenze solo per file specifico
git diff lovable-v1.0.0 lovable-v1.1.0 -- src/components/FileName.tsx

# Log commit tra versioni
git log lovable-v1.0.0..lovable-v1.1.0 --oneline
```

## 🧪 Test Locale

### Dev Server Lovable (porta 8080)

```bash
cd C:\Users\umber\Documents\MyProjects\ClearCvLovable\clear-cv-integration
npm run dev
# → http://localhost:8080
```

### Dev Server Cloudflare Worker (porta 8787)

```bash
cd C:\Users\umber\Documents\MyProjects\ClearCvLovable
wrangler dev
# → http://localhost:8787
```

### Build di Test

```bash
cd C:\Users\umber\Documents\MyProjects\ClearCvLovable
npm run build --prefix clear-cv-integration

# Verifica build artifacts
ls -lh clear-cv-integration/dist/
```

## 🚨 Rollback Emergenza

### Rollback Veloce

```bash
cd C:\Users\umber\Documents\MyProjects\ClearCvLovable

# Checkout versione precedente
git checkout deploy-v1.0.0

# Deploy
wrangler deploy

# Purge cache su Cloudflare Dashboard

# Torna a master per lavorare su fix
git checkout master
```

### Rollback con Fix

```bash
cd C:\Users\umber\Documents\MyProjects\ClearCvLovable

# 1. Rollback a versione stabile
git checkout deploy-v1.0.0
wrangler deploy
# Purge cache

# 2. Torna a master
git checkout master

# 3. Crea fix
code patches/css-overrides.css  # o worker.js

# 4. Test
wrangler dev

# 5. Deploy fix
git add .
git commit -m "Fix: [descrizione]"
git tag deploy-v1.0.X
git push origin master
git push origin deploy-v1.0.X
wrangler deploy
```

## 📊 Status Check

### Verifica Stato Completo

```bash
cd C:\Users\umber\Documents\MyProjects\ClearCvLovable

# Stato repository principale
echo "=== Main Repo Status ==="
git status

# Tag deployment
echo "=== Deploy Tags ==="
git tag | grep deploy

# Stato submodule
echo "=== Submodule Status ==="
cd clear-cv-integration
git status

# Tag Lovable
echo "=== Lovable Tags ==="
git tag | grep lovable

cd ..
```

### Verifica Produzione

```bash
# HTTP headers
curl -I https://clearcvapp.com/

# Status code
curl -s -o /dev/null -w "%{http_code}" https://clearcvapp.com/

# Full response
curl https://clearcvapp.com/ | head -50
```

## 🔑 Cloudflare

### Wrangler Login

```bash
cd C:\Users\umber\Documents\MyProjects\ClearCvLovable
wrangler login
```

### Verifica Account

```bash
wrangler whoami
```

### Deploy Info

```bash
# Mostra config senza deploy
wrangler deploy --dry-run

# Lista workers
wrangler list

# Mostra worker corrente
wrangler dev --inspect
```

## 🧹 Cleanup

### Cleanup Build Artifacts

```bash
cd C:\Users\umber\Documents\MyProjects\ClearCvLovable\clear-cv-integration
rm -rf dist/
npm run build
```

### Cleanup Node Modules

```bash
cd C:\Users\umber\Documents\MyProjects\ClearCvLovable\clear-cv-integration
rm -rf node_modules/
npm install
```

### Cleanup Git

```bash
cd C:\Users\umber\Documents\MyProjects\ClearCvLovable

# Remove untracked files (ATTENZIONE!)
git clean -fd

# Reset modifiche non committate (ATTENZIONE!)
git reset --hard
```

## 📝 Documentation

### Apri Documentazione

```bash
cd C:\Users\umber\Documents\MyProjects\ClearCvLovable

# Strategia completa
code STRATEGY.md

# Git flow
code docs/GIT-FLOW.md

# README
code README.md

# Quick reference (questo file)
code QUICK-REFERENCE.md
```

### Crea Nuova Analisi

```bash
cd C:\Users\umber\Documents\MyProjects\ClearCvLovable

# Analisi versione Lovable
echo "# Analysis lovable-v1.X.0" > docs/lovable-analysis/v1.X.0.md
code docs/lovable-analysis/v1.X.0.md

# Issue tracking
echo "# Issue: [titolo]" > docs/issues/issue-NNN.md
code docs/issues/issue-NNN.md
```

## 🔗 URLs Utili

```bash
# Production
open https://clearcvapp.com

# Cloudflare Dashboard
open https://dash.cloudflare.com

# GitHub - Deployment repo
open https://github.com/UmbertoDiP/ClearCvLovable-deploy

# GitHub - Lovable repo
open https://github.com/UmbertoDiP/clear-cv-integration

# Lovable Project (sostituisci PROJECT_ID)
open https://lovable.dev/projects/REPLACE_WITH_PROJECT_ID
```

## ⚡ Alias Utili (Opzionale)

Aggiungi al tuo `.bashrc` o `.zshrc`:

```bash
# ClearCV Aliases
alias cvcd="cd C:\Users\umber\Documents\MyProjects\ClearCvLovable"
alias cvbuild="cd C:\Users\umber\Documents\MyProjects\ClearCvLovable && npm run build --prefix clear-cv-integration"
alias cvdeploy="cd C:\Users\umber\Documents\MyProjects\ClearCvLovable && wrangler deploy"
alias cvdev="cd C:\Users\umber\Documents\MyProjects\ClearCvLovable && wrangler dev"
alias cvstatus="cd C:\Users\umber\Documents\MyProjects\ClearCvLovable && git status && cd clear-cv-integration && git status && cd .."
alias cvtags="cd C:\Users\umber\Documents\MyProjects\ClearCvLovable && git tag && cd clear-cv-integration && git tag && cd .."
```

Poi:

```bash
source ~/.bashrc  # o ~/.zshrc
```

Uso:

```bash
cvcd        # Naviga a ClearCvLovable
cvbuild     # Build app
cvdeploy    # Deploy su Cloudflare
cvdev       # Dev server locale
cvstatus    # Status completo
cvtags      # Lista tutti i tag
```

---

**Tip**: Bookmark questo file! Tutti i comandi sono pronti per copia-incolla.

**Last Updated**: 2025-01-01
