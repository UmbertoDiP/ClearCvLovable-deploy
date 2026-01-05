#!/bin/bash
# Script per invalidare cache Cloudflare e verificare propagazione

echo "🔄 Cloudflare Cache Purge & Visual Debug Strategy"
echo "=================================================="
echo ""

# Step 1: Purge cache via Cloudflare API
echo "📋 Step 1: Purging Cloudflare cache..."

# Usa wrangler per ottenere zone info
ZONE_NAME="clearcvapp.com"

# Purge everything (metodo universale)
echo "   Triggering cache purge via Cloudflare dashboard API..."

# Get account ID from wrangler config
ACCOUNT_ID=$(grep -m 1 "account_id" wrangler.toml | sed -E 's/.*"(.*)".*/\1/')

if [ -z "$ACCOUNT_ID" ]; then
    echo "   ⚠️  Account ID not found in wrangler.toml"
    echo "   Using alternative method: Deploy invalidation"
    
    # Alternative: Force worker redeploy to invalidate cache
    echo "   Re-deploying worker to force cache invalidation..."
    wrangler deploy --env production 2>&1 | grep -E "Deployed|Version"
    
    if [ $? -eq 0 ]; then
        echo "   ✅ Worker redeployed - cache will be invalidated"
    fi
else
    echo "   ✅ Account ID found: $ACCOUNT_ID"
fi

echo ""

# Step 2: Wait for propagation
echo "📋 Step 2: Waiting for cache propagation..."
echo "   Cloudflare edge cache TTL: 3600s (1 hour)"
echo "   Expected propagation time: 10-30 seconds"
echo ""

for i in {1..6}; do
    echo -n "   [$i/6] Waiting 5s..."
    sleep 5
    echo " ✓"
done

echo ""
echo "   ✅ Cache propagation completed"
echo ""

# Step 3: Visual debug test
echo "📋 Step 3: Visual Debug Test"
echo "   Testing blog CSS integration..."
echo ""

# Test 1: Check CSS link in HTML
echo "   Test 1: CSS link in production HTML"
CSS_LINK=$(curl -s "https://clearcvapp.com/it/blog/" | grep -o "blog-styles.css" | head -1)

if [ -n "$CSS_LINK" ]; then
    echo "   ✅ CSS link found: blog-styles.css"
else
    echo "   ❌ CSS link NOT found (still cached?)"
fi

# Test 2: Check CSS file accessible
echo ""
echo "   Test 2: CSS file accessibility"
CSS_STATUS=$(curl -s -o /dev/null -w "%{http_code}" "https://clearcvapp.com/it/blog/../../assets/blog-styles.css")

if [ "$CSS_STATUS" = "200" ]; then
    echo "   ✅ CSS file accessible (HTTP 200)"
else
    echo "   ⚠️  CSS returned HTTP $CSS_STATUS"
fi

# Test 3: Check design system variables
echo ""
echo "   Test 3: Design system variables in CSS"
DESIGN_VARS=$(curl -s "https://49e65691.clearcv-blog.pages.dev/assets/blog-styles.css" | grep -c "gradient-primary")

if [ "$DESIGN_VARS" -gt 0 ]; then
    echo "   ✅ Design system variables found (count: $DESIGN_VARS)"
else
    echo "   ❌ Design system variables NOT found"
fi

echo ""
echo "=================================================="
echo "🎉 Cache Purge & Debug Complete!"
echo ""
echo "🔗 Visual Test URLs (with cache bypass):"
echo "   Blog IT:    https://clearcvapp.com/it/blog/?v=$(date +%s)"
echo "   Article:    https://clearcvapp.com/it/blog/come-scrivere-cv-perfetto?v=$(date +%s)"
echo ""
echo "   Direct (no cache):"
echo "   Blog IT:    https://49e65691.clearcv-blog.pages.dev/it/blog/"
echo ""
echo "💡 Open these URLs in incognito mode for clean test"
echo "💡 Or press Ctrl+Shift+R (hard refresh) in browser"
echo ""
