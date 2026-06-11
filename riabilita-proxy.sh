#!/bin/bash
# Riabilita proxy Cloudflare su clearcvapp.com dopo indicizzazione AI crawlers
# Uso: ./riabilita-proxy.sh

set -e

echo "========================================="
echo "Riabilita Proxy Cloudflare - clearcvapp.com"
echo "========================================="
echo ""

TOKEN=$(cat ~/.claude/cloudflare-api-token.txt | tr -d '\n\r')
ZONE_ID="5748abacc12287c0d678c98badcc9c79"
RECORD_ID="5203da946b1e5d99baf94e791326c643"

echo "[1/3] Riabilito proxy Cloudflare (orange cloud)..."
curl -s -X PATCH "https://api.cloudflare.com/client/v4/zones/$ZONE_ID/dns_records/$RECORD_ID" \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"proxied":true}' | grep -o '"proxied":[^,]*'

echo ""
echo "[2/3] Purge cache Cloudflare..."
curl -s -X POST "https://api.cloudflare.com/client/v4/zones/$ZONE_ID/purge_cache" \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"purge_everything":true}' | grep -o '"success":[^,]*'

echo ""
echo "[3/3] Attendo 10s propagazione..."
sleep 10

echo ""
echo "Verifica robots.txt (potrebbe tornare Managed Content):"
curl -s https://clearcvapp.com/robots.txt | head -10

echo ""
echo "========================================="
echo "✅ Proxy riabilitato!"
echo "========================================="
echo ""
echo "NOTE:"
echo "- CDN attivo (performance migliori)"
echo "- DDoS protection attiva"
echo "- Se Managed Content torna, upgrade a Pro necessario"
echo ""
echo "Monitoraggio: curl -s https://clearcvapp.com/robots.txt | head -20"
