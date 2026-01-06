# Wrapper Deployment System

## Architettura

```
┌─────────────────┐
│   LOVABLE       │  Generate & export progetto React/Vite
│   (read-only)   │  Non si modifica MAI internamente
└────────┬────────┘
         │ export
         ▼
┌─────────────────┐
│ clear-cv-       │  Progetto esportato da Lovable
│ integration/    │  Viene sovrascritto ad ogni export
└────────┬────────┘
         │
         │ build (npm run build)
         ▼
┌─────────────────┐
│ dist/           │  Build output di Lovable
└────────┬────────┘
         │
         ▼
┌─────────────────────────────────┐
│   WRAPPER DEPLOYMENT SCRIPT     │
│   (deploy-wrapper.ps1)          │
│                                 │
│  1. Build Lovable (unmodified)  │
│  2. Merge sitemap externally    │
│  3. Copy blog-static/           │
│  4. Deploy to Cloudflare        │
└────────┬────────────────────────┘
         │
         ▼
┌─────────────────┐
│  CLOUDFLARE     │  https://clearcvapp.com
│  PAGES          │  Via Wrangler
└─────────────────┘
```

## Workflow Completo

### Step 1: Export da Lovable

Quando esporti una nuova versione da Lovable:
1. Esporta il progetto
2. Sovrascrive `clear-cv-integration/` completamente
3. NON preoccuparti di merge sitemap o blog - il wrapper lo fa

### Step 2: Deploy con Wrapper

```powershell
# Windows
.\deploy-wrapper.ps1

# Linux/Mac
chmod +x deploy-wrapper.sh
./deploy-wrapper.sh
```

### Step 3: Verifica

```bash
curl -s https://clearcvapp.com/sitemap.xml | grep -c '<url>'
# Expected: 36 (12 app + 24 blog)
```

## Come Funziona il Wrapper

### 1. Build Lovable Unmodified

```powershell
cd clear-cv-integration
npm run build
cd ..
```

Output: `clear-cv-integration/dist/` con sitemap app-only (12 URLs)

### 2. Merge Sitemap (Esterno)

```python
# Legge dist/sitemap.xml (12 URLs da Lovable)
# Legge blog-static/sitemap.xml (24 URLs blog)
# Merge → scrive dist/sitemap.xml (36 URLs)
```

**IMPORTANTE**: Il merge avviene FUORI da Lovable, su dist/ già buildato.

### 3. Copy Blog Static

```powershell
Copy-Item blog-static → dist/blog-static
```

### 4. Deploy Cloudflare

```bash
cd clear-cv-integration/dist
wrangler pages deploy . --project-name=clearcv
```

## Vantaggi di Questo Approccio

✅ **Lovable read-only**: Non si modifica mai internamente
✅ **Re-export sicuro**: Puoi ri-esportare da Lovable senza perdere setup
✅ **Versioning pulito**: clear-cv-integration/ è sempre clean export di Lovable
✅ **Maintenance facile**: Wrapper script è unico punto di customizzazione

## File Struttura

```
ClearCvLovable/
├── clear-cv-integration/       # ← Export Lovable (IMMUTABILE)
│   ├── src/                    # ← Codice React
│   ├── public/                 # ← Assets
│   ├── package.json            # ← Dependencies
│   ├── vite.config.ts          # ← Vite config (NON MODIFICATO)
│   └── dist/                   # ← Build output (creato da npm run build)
│
├── blog-static/                # ← Blog statico (ESTERNO a Lovable)
│   ├── sitemap.xml             # ← 24 URLs blog
│   └── it/blog/                # ← HTML statico blog
│
├── deploy-wrapper.ps1          # ← Script deployment Windows
├── deploy-wrapper.sh           # ← Script deployment Linux/Mac
└── WRAPPER-DEPLOYMENT-README.md # ← Questa doc
```

## Updating da Lovable

Quando Lovable rilascia una nuova versione dell'app:

```bash
# 1. Export nuovo da Lovable → sovrascrive clear-cv-integration/
# 2. Deploy con wrapper
.\deploy-wrapper.ps1

# DONE! Il wrapper gestisce automaticamente sitemap + blog
```

## Troubleshooting

### Sitemap non ha blog URLs

```bash
# Verifica merge manuale
python -c "
import xml.etree.ElementTree as ET
app = ET.parse('clear-cv-integration/dist/sitemap.xml')
print('App URLs:', len(app.getroot()))
blog = ET.parse('blog-static/sitemap.xml')
print('Blog URLs:', len(blog.getroot()))
"
```

### Blog pages 404

```bash
# Verifica blog-static copiato
ls clear-cv-integration/dist/blog-static/
```

### Wrangler deploy fallisce

```bash
# Verifica autenticazione Cloudflare
wrangler whoami

# Re-login se necessario
wrangler login
```

## Next Steps

Dopo primo deploy successful:
1. Test completo: https://clearcvapp.com/sitemap.xml (36 URLs)
2. Test blog: https://clearcvapp.com/it/blog/
3. Google Search Console: Submit sitemap

---

**Remember**: Il progetto in `clear-cv-integration/` è un export immutabile di Lovable. Tutte le customizzazioni sono nel wrapper esterno.
