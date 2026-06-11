# Auto-Deploy Setup - Cloudflare Pages ← GitHub

**Obiettivo**: Ogni push a GitHub fa auto-deploy su clearcvapp.com (mai indietro)

## Workflow Automatizzato

### OPZIONE A - Cloudflare Pages Git Integration (CONSIGLIATA)

**Setup Dashboard** (una tantum):
1. Dashboard Cloudflare → Pages → clearcv-app → Settings → Builds & deployments
2. Connect to Git → GitHub
3. Autorizza Cloudflare su GitHub repo
4. Configura:
   - Production branch: `master`
   - Build command: `npm run build` (se necessario)
   - Build output directory: `clear-cv-integration/dist`
5. Save

**Risultato**: Ogni `git push origin master` triggera auto-deploy automatico

---

### OPZIONE B - CLI Script Auto-Deploy (Attuale)

**Script**: `auto-deploy.sh`

```bash
#!/bin/bash
# Auto-deploy ClearCV to Cloudflare Pages

set -e

echo "[1/4] Pull latest changes..."
git pull origin master

echo "[2/4] Build project (if needed)..."
# cd clear-cv-integration && npm run build && cd ..

echo "[3/4] Deploy to Cloudflare Pages..."
npx wrangler pages deploy clear-cv-integration/dist \
  --project-name clearcv-app \
  --branch master \
  --commit-dirty=true

echo "[4/4] Verify deployment..."
sleep 5
curl -s https://clearcvapp.com/robots.txt | head -5

echo "✅ Auto-deploy completed!"
```

**Uso**:
```bash
chmod +x auto-deploy.sh
./auto-deploy.sh
```

---

### OPZIONE C - Git Hook Pre-Push (Automatico)

**Setup** (una tantum):

```bash
# Crea pre-push hook
cat > .git/hooks/pre-push << 'HOOK'
#!/bin/bash
# Auto-deploy before push

echo "🚀 Auto-deploying to Cloudflare Pages..."

npx wrangler pages deploy clear-cv-integration/dist \
  --project-name clearcv-app \
  --branch master \
  --commit-dirty=true \
  2>&1 | tail -5

echo "✅ Deployment complete. Proceeding with git push..."
HOOK

chmod +x .git/hooks/pre-push
```

**Risultato**: Ogni `git push` fa PRIMA deploy, POI push a GitHub

---

## Verifica Auto-Deploy Funziona

```bash
# Test workflow
echo "test" >> README.md
git add README.md
git commit -m "Test auto-deploy"
git push origin master

# Se OPZIONE A: Cloudflare fa auto-deploy
# Se OPZIONE C: Hook fa auto-deploy PRIMA di push
```

---

## Monitoring & Rollback

**Verifica deployment**:
```bash
curl -s https://clearcvapp.com/robots.txt | head -10
```

**Rollback** (se deploy rotto):
```bash
# Via dashboard
Cloudflare Pages → clearcv-app → Deployments → [OLD DEPLOYMENT] → Rollback

# Via CLI
npx wrangler pages deployment list --project-name clearcv-app
npx wrangler pages deployment rollback [DEPLOYMENT-ID]
```

---

**Creato**: 2026-04-22
**Status**: Proxy disabilitato, production branch = master, auto-deploy pronto
