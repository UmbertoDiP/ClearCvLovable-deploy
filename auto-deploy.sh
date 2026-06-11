#!/bin/bash
# Auto-deploy ClearCV to Cloudflare Pages
# Usage: ./auto-deploy.sh

set -e

echo "========================================="
echo "ClearCV Auto-Deploy to clearcvapp.com"
echo "========================================="

echo ""
echo "[1/4] Pull latest changes from GitHub..."
git pull origin master || echo "Already up to date"

echo ""
echo "[2/4] Build project (if needed)..."
# Uncomment if build is required:
# cd clear-cv-integration && npm run build && cd ..
echo "Skipping build (using existing dist/)"

echo ""
echo "[3/4] Deploy to Cloudflare Pages (production)..."
npx wrangler pages deploy clear-cv-integration/dist \
  --project-name clearcv-app \
  --branch master \
  --commit-dirty=true \
  2>&1 | tail -10

echo ""
echo "[4/4] Verify deployment..."
sleep 8
echo ""
echo "robots.txt on clearcvapp.com:"
curl -s https://clearcvapp.com/robots.txt | head -10

echo ""
echo "========================================="
echo "✅ Auto-deploy completed!"
echo "========================================="
echo ""
echo "Production URL: https://clearcvapp.com"
echo "Verify: curl -s https://clearcvapp.com/robots.txt | head -20"
