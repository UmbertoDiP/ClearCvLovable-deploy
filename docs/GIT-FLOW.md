# Git Flow - ClearCV Lovable

Diagramma e workflow Git per gestione dual-repository (Lovable + Deployment Wrapper)

## 📊 Architettura Git

```
┌─────────────────────────────────────────────────────────────────┐
│                    GitHub: UmbertoDiP                            │
├─────────────────────────────────────────────────────────────────┤
│                                                                   │
│  ┌────────────────────────────────────────────────────────┐     │
│  │  clear-cv-integration (Lovable Repo)                   │     │
│  │  https://github.com/UmbertoDiP/clear-cv-integration    │     │
│  │                                                         │     │
│  │  main branch (auto-commit da Lovable)                  │     │
│  │    ├── lovable-v1.0.0  (tag)                           │     │
│  │    ├── lovable-v1.1.0  (tag)                           │     │
│  │    └── lovable-v1.2.0  (tag)                           │     │
│  │                                                         │     │
│  │  [React app source + build artifacts]                  │     │
│  └────────────────────────────────────────────────────────┘     │
│                         ▲                                        │
│                         │ git submodule                          │
│                         │                                        │
│  ┌────────────────────────────────────────────────────────┐     │
│  │  ClearCvLovable-deploy (Wrapper Repo)                  │     │
│  │  https://github.com/UmbertoDiP/ClearCvLovable-deploy   │     │
│  │                                                         │     │
│  │  master branch                                          │     │
│  │    ├── deploy-v1.0.0  (tag - primo deploy)             │     │
│  │    ├── deploy-v1.0.1  (tag - fix urgente CSS)          │     │
│  │    ├── deploy-v1.1.0  (tag - update Lovable v1.1.0)    │     │
│  │    └── deploy-v1.1.1  (tag - fix urgente API)          │     │
│  │                                                         │     │
│  │  [wrangler.toml, worker.js, patches/]                  │     │
│  └────────────────────────────────────────────────────────┘     │
│                                                                   │
└─────────────────────────────────────────────────────────────────┘
                            │
                            │ wrangler deploy
                            ▼
                ┌───────────────────────┐
                │  Cloudflare Workers   │
                │  clearcv-app          │
                │                       │
                │  https://clearcvapp.com│
                └───────────────────────┘
```

## 🔄 Workflow Scenarios

### Scenario 1: Fix Urgente (NO Lovable)

```
Developer Local                     GitHub                   Cloudflare
─────────────                       ──────                   ──────────

1. Identifica bug
   └─ Studio clear-cv-integration/
      (read-only)

2. Crea fix in patches/
   ├─ patches/css-overrides.css
   └─ patches/js-patches.js

3. Test locale
   └─ wrangler dev

4. Commit + Push
   └─ git push origin master  ──────>  ClearCvLovable-deploy
                                        (deploy-v1.0.1 tag)

5. Deploy                                                    ──────────>
   └─ wrangler deploy                                        clearcv-app
                                                             (live)

6. Purge cache
   └─ Cloudflare Dashboard ────────────────────────────────> Cache PURGED

✅ Fix live in ~5 minuti, NO costi Lovable
```

### Scenario 2: Update Mensile Lovable

```
Lovable.dev                GitHub                  Local                    Cloudflare
───────────                ──────                  ─────                    ──────────

1. Lavora su Lovable
   ├─ Nuove features
   ├─ Refactoring
   └─ UI updates

2. Auto-commit  ────────>  clear-cv-integration
                           (main branch)
                           ├─ commit abc123
                           └─ commit def456

3. Pull locale                                 <─────────
   └─ cd clear-cv-integration
      git pull origin main

4. Tag versione                                ─────────>  clear-cv-integration
   └─ git tag lovable-v1.1.0                              (lovable-v1.1.0 tag)
      git push origin lovable-v1.1.0

5. Studio differenze
   └─ git diff lovable-v1.0.0 lovable-v1.1.0
   └─ Analizza modifiche

6. Rebuild
   └─ npm run build
      (genera dist/)

7. Verifica patches
   └─ Controlla compatibilità
      patches/ esistenti

8. Update submodule
   └─ cd ..
      git add clear-cv-integration

9. Commit + Push                               ─────────>  ClearCvLovable-deploy
   └─ git commit -m "Update Lovable v1.1.0"               (master branch)
      git tag deploy-v1.1.0
      git push origin master
      git push origin deploy-v1.1.0

10. Deploy                                                                  ──────────>
    └─ wrangler deploy                                                     clearcv-app
                                                                           (live)

11. Purge cache                                                            Cache PURGED

✅ Update completo, patches integrate, costi Lovable 1x/mese
```

### Scenario 3: Rollback Emergenza

```
Developer Local              GitHub                   Cloudflare
───────────                  ──────                   ──────────

1. Bug critico in produzione

2. Identifica versione stabile
   └─ git tag
      deploy-v1.0.0  ← stable

3. Checkout versione precedente
   └─ git checkout deploy-v1.0.0

4. Deploy                                             ──────────>
   └─ wrangler deploy                                 clearcv-app
                                                      (rollback)

5. Purge cache                                        Cache PURGED

6. Fix bug offline
   └─ git checkout master
      [crea fix]

7. Deploy fix
   └─ git tag deploy-v1.0.2
      wrangler deploy

✅ Rollback istantaneo, fix offline, redeploy
```

## 🏷️ Tagging Strategy

### Lovable Tags (nel submodule)

```bash
lovable-v{MAJOR}.{MINOR}.{PATCH}

Esempi:
lovable-v1.0.0  # Prima versione da Lovable
lovable-v1.1.0  # Secondo update mensile (nuove feature)
lovable-v1.1.1  # Hotfix Lovable (raro)
lovable-v2.0.0  # Breaking changes architetturali
```

**Quando creare**:
- Dopo ogni pull da Lovable
- Quando Lovable fa push di modifiche
- ~1 volta al mese

### Deploy Tags (repository principale)

```bash
deploy-v{MAJOR}.{MINOR}.{PATCH}

Esempi:
deploy-v1.0.0   # Primo deploy Lovable v1.0.0
deploy-v1.0.1   # Fix urgente CSS (no Lovable)
deploy-v1.0.2   # Fix urgente API (no Lovable)
deploy-v1.1.0   # Deploy Lovable v1.1.0
deploy-v1.1.1   # Fix urgente post-update
deploy-v2.0.0   # Deploy Lovable v2.0.0 (breaking)
```

**Quando creare**:
- Dopo ogni `wrangler deploy` in produzione
- Ogni fix urgente
- Ogni update Lovable

### Semantic Versioning

- **MAJOR** (X.0.0): Breaking changes, nuova architettura Lovable
- **MINOR** (1.X.0): Update Lovable con nuove feature
- **PATCH** (1.0.X): Fix urgenti via patches, no Lovable

## 🔀 Branch Strategy

### ClearCvLovable-deploy (Wrapper Repo)

```
master (main branch)
  └─ Sempre deployabile
  └─ NO feature branches (semplice wrapper)
  └─ Fix diretti su master
```

**Perché NO branch**:
- Repository semplice (solo config)
- Fix urgenti devono andare live subito
- NO code review necessario (config files)

### clear-cv-integration (Lovable Repo)

```
main (solo branch)
  └─ Auto-gestito da Lovable
  └─ NO modifica locale
  └─ Solo pull
```

**Perché NO branch**:
- Gestito interamente da Lovable
- Non modifichiamo mai
- Solo lettura + pull

## 🔄 Sync Workflow

### Daily/Weekly (Fix Urgenti)

```bash
# In ClearCvLovable-deploy/
git status
git add patches/
git commit -m "Fix: [descrizione]"
git tag deploy-v1.0.X
git push origin master
git push origin deploy-v1.0.X
wrangler deploy
```

### Monthly (Update Lovable)

```bash
# 1. Lavora su Lovable.dev

# 2. Pull submodule
cd clear-cv-integration
git pull origin main
git tag lovable-v1.X.0
git push origin lovable-v1.X.0
cd ..

# 3. Update wrapper
git add clear-cv-integration
git commit -m "Update Lovable to v1.X.0"
git tag deploy-v1.X.0
git push origin master
git push origin deploy-v1.X.0

# 4. Deploy
npm run build --prefix clear-cv-integration
wrangler deploy
```

## 📜 Commit Message Convention

### Per Fix Urgenti

```
Fix: [breve descrizione]

- Dettagli fix
- File modificati
- TODO: Integrare in Lovable v1.X.0

Related: [link issue se presente]
```

Esempio:
```
Fix: Button width in modal dialog

- Added min-width to .modal-button class
- Override in patches/css-overrides.css
- TODO: Integrate in Lovable v1.1.0

Related: https://github.com/UmbertoDiP/ClearCvLovable-deploy/issues/5
```

### Per Update Lovable

```
Update Lovable submodule to v1.X.0

- Pulled latest changes from Lovable
- Integrated fixes from patches:
  - [fix1]
  - [fix2]
- Rebuilt dist/

Lovable changes:
- [feature1]
- [feature2]
- [bugfix1]
```

### Per Deploy

```
Deploy v1.X.Y to production

- Changes: [summary]
- Tested: [what was tested]
- Rollback: deploy-v1.X.Y-1 if issues
```

## 🔍 Git Commands Reference

### Check Status

```bash
# Stato repository principale
git status

# Stato submodule
cd clear-cv-integration
git status
cd ..

# Differenze non committate
git diff

# Differenze tra versioni Lovable
cd clear-cv-integration
git diff lovable-v1.0.0 lovable-v1.1.0
```

### Tag Management

```bash
# Lista tutti i tag
git tag

# Lista tag filtrati
git tag | grep lovable
git tag | grep deploy

# Crea annotated tag
git tag -a deploy-v1.0.1 -m "Fix: CSS button width"

# Push tag
git push origin deploy-v1.0.1

# Push tutti i tag
git push origin --tags

# Elimina tag locale
git tag -d deploy-v1.0.1

# Elimina tag remote
git push origin :refs/tags/deploy-v1.0.1
```

### Submodule Management

```bash
# Update submodule
cd clear-cv-integration
git pull origin main
cd ..
git add clear-cv-integration
git commit -m "Update submodule"

# Checkout submodule specifica versione
cd clear-cv-integration
git checkout lovable-v1.0.0
cd ..

# Update submodule to latest
git submodule update --remote clear-cv-integration
```

### History

```bash
# Log grafico
git log --oneline --decorate --graph --all

# Log con tag
git log --oneline --decorate

# History submodule
cd clear-cv-integration
git log --oneline
cd ..

# Differenze tra deploy
git diff deploy-v1.0.0 deploy-v1.1.0
```

### Rollback

```bash
# Rollback to tag
git checkout deploy-v1.0.0
wrangler deploy

# Torna a master
git checkout master

# Reset hard (ATTENZIONE!)
git reset --hard deploy-v1.0.0
```

## 🎯 Best Practices

### ✅ DO

- Tag ogni deployment
- Commit message descrittivi
- Push subito dopo commit
- Tag Lovable dopo ogni pull
- Documenta fix in commit message

### ❌ DON'T

- Modificare clear-cv-integration localmente
- Commit direttamente nel submodule
- Skip tag deployment
- Force push su master
- Merge manuale submodule

## 🚨 Troubleshooting

### Submodule Non Aggiornato

```bash
git submodule update --init --recursive
cd clear-cv-integration
git pull origin main
cd ..
```

### Conflitto Submodule

```bash
# Reset submodule a versione corretta
cd clear-cv-integration
git fetch origin
git reset --hard origin/main
cd ..
git add clear-cv-integration
git commit -m "Reset submodule to origin/main"
```

### Tag Duplicato

```bash
# Elimina tag locale
git tag -d deploy-v1.0.1

# Elimina tag remote
git push origin :refs/tags/deploy-v1.0.1

# Ricrea tag corretto
git tag -a deploy-v1.0.1 -m "Corrected tag"
git push origin deploy-v1.0.1
```

---

**Last Updated**: 2025-01-01
