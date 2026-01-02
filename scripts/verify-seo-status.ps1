# SEO Status Verification Script for ClearCV
# Verifies indexing status, sitemap accessibility, and provides submission URLs

Write-Host "======================================" -ForegroundColor Cyan
Write-Host "ClearCV SEO Status Verification" -ForegroundColor Cyan
Write-Host "======================================`n" -ForegroundColor Cyan

$domain = "clearcvapp.com"
$url = "https://$domain"

# 1. Sitemap Verification
Write-Host "[1/6] Verifying Sitemap..." -ForegroundColor Yellow
$sitemapUrl = "$url/sitemap.xml"
try {
    $sitemap = Invoke-WebRequest -Uri $sitemapUrl -UseBasicParsing
    if ($sitemap.StatusCode -eq 200) {
        Write-Host "  ✅ Sitemap accessible: $sitemapUrl" -ForegroundColor Green
    }
} catch {
    Write-Host "  ❌ Sitemap NOT accessible" -ForegroundColor Red
}

# 2. Robots.txt Verification
Write-Host "`n[2/6] Verifying Robots.txt..." -ForegroundColor Yellow
$robotsUrl = "$url/robots.txt"
try {
    $robots = Invoke-WebRequest -Uri $robotsUrl -UseBasicParsing
    if ($robots.StatusCode -eq 200) {
        Write-Host "  ✅ Robots.txt accessible: $robotsUrl" -ForegroundColor Green
    }
} catch {
    Write-Host "  ❌ Robots.txt NOT accessible" -ForegroundColor Red
}

# 3. Google Indexing Check
Write-Host "`n[3/6] Checking Google Indexing..." -ForegroundColor Yellow
$googleSearchUrl = "https://www.google.com/search?q=site:$domain"
try {
    $googleResults = Invoke-WebRequest -Uri $googleSearchUrl -UseBasicParsing -UserAgent "Mozilla/5.0"
    if ($googleResults.Content -match "did not match any documents" -or $googleResults.Content -match "no results") {
        Write-Host "  ⚠️  NOT INDEXED by Google yet (normal for new site)" -ForegroundColor Yellow
        Write-Host "     Submit via: https://search.google.com/search-console" -ForegroundColor Gray
    } else {
        Write-Host "  ✅ Potentially indexed by Google" -ForegroundColor Green
        Write-Host "     Verify at: $googleSearchUrl" -ForegroundColor Gray
    }
} catch {
    Write-Host "  ⚠️  Could not verify Google indexing" -ForegroundColor Yellow
}

# 4. Bing Indexing Check
Write-Host "`n[4/6] Checking Bing Indexing..." -ForegroundColor Yellow
$bingSearchUrl = "https://www.bing.com/search?q=site:$domain"
try {
    $bingResults = Invoke-WebRequest -Uri $bingSearchUrl -UseBasicParsing -UserAgent "Mozilla/5.0"
    if ($bingResults.Content -match "There are no results" -or $bingResults.Content -match "no results") {
        Write-Host "  ⚠️  NOT INDEXED by Bing yet" -ForegroundColor Yellow
        Write-Host "     Submit via: https://www.bing.com/webmasters" -ForegroundColor Gray
    } else {
        Write-Host "  ✅ Potentially indexed by Bing" -ForegroundColor Green
        Write-Host "     Verify at: $bingSearchUrl" -ForegroundColor Gray
    }
} catch {
    Write-Host "  ⚠️  Could not verify Bing indexing" -ForegroundColor Yellow
}

# 5. Schema.org Validation
Write-Host "`n[5/6] Checking Schema.org Structured Data..." -ForegroundColor Yellow
try {
    $homepage = Invoke-WebRequest -Uri $url -UseBasicParsing
    if ($homepage.Content -match "SoftwareApplication" -and $homepage.Content -match "FAQPage") {
        Write-Host "  ✅ Schema.org structured data present" -ForegroundColor Green
        Write-Host "     Validate at: https://validator.schema.org/" -ForegroundColor Gray
    } else {
        Write-Host "  ⚠️  Schema.org data not detected" -ForegroundColor Yellow
    }
} catch {
    Write-Host "  ❌ Could not fetch homepage" -ForegroundColor Red
}

# 6. Analytics Verification
Write-Host "`n[6/6] Verifying Google Analytics..." -ForegroundColor Yellow
try {
    $homepage = Invoke-WebRequest -Uri $url -UseBasicParsing
    if ($homepage.Content -match "G-VTLG85NBTE") {
        Write-Host "  ✅ Google Analytics tracking code present (G-VTLG85NBTE)" -ForegroundColor Green
    } else {
        Write-Host "  ❌ Analytics tracking code NOT found" -ForegroundColor Red
    }
} catch {
    Write-Host "  ❌ Could not verify Analytics" -ForegroundColor Red
}

# Summary and Submission URLs
Write-Host "`n======================================" -ForegroundColor Cyan
Write-Host "Submission URLs (Manual Action Required)" -ForegroundColor Cyan
Write-Host "======================================`n" -ForegroundColor Cyan

Write-Host "📊 Search Engines:" -ForegroundColor White
Write-Host "  • Google Search Console: https://search.google.com/search-console" -ForegroundColor Gray
Write-Host "  • Bing Webmaster Tools:  https://www.bing.com/webmasters" -ForegroundColor Gray
Write-Host "  • Yandex Webmaster:      https://webmaster.yandex.com/" -ForegroundColor Gray

Write-Host "`n📁 Directories:" -ForegroundColor White
Write-Host "  • AlternativeTo:         https://alternativeto.net/software/create/" -ForegroundColor Gray
Write-Host "  • Slant:                 https://www.slant.co/topics/new" -ForegroundColor Gray
Write-Host "  • Capterra:              https://www.capterra.com/vendors/sign-up" -ForegroundColor Gray
Write-Host "  • G2:                    https://www.g2.com/products/new" -ForegroundColor Gray
Write-Host "  • StartupStash:          https://startupstash.com/submit-a-startup/" -ForegroundColor Gray

Write-Host "`n🚀 Product Launch:" -ForegroundColor White
Write-Host "  • Product Hunt:          https://www.producthunt.com/posts/new" -ForegroundColor Gray
Write-Host "  • Hacker News Show HN:   https://news.ycombinator.com/submit" -ForegroundColor Gray

Write-Host "`n⚙️  Validation Tools:" -ForegroundColor White
Write-Host "  • Schema.org Validator:  https://validator.schema.org/" -ForegroundColor Gray
Write-Host "  • Google Rich Results:   https://search.google.com/test/rich-results" -ForegroundColor Gray
Write-Host "  • PageSpeed Insights:    https://pagespeed.web.dev/" -ForegroundColor Gray

Write-Host "`n✅ Next Steps:" -ForegroundColor Green
Write-Host "  1. Submit sitemap to Google Search Console" -ForegroundColor White
Write-Host "  2. Submit sitemap to Bing Webmaster Tools" -ForegroundColor White
Write-Host "  3. Submit to 3-5 directories (start with AlternativeTo, Slant, Capterra)" -ForegroundColor White
Write-Host "  4. Post to Product Hunt (best days: Tuesday-Thursday, 12:01 AM PT)" -ForegroundColor White
Write-Host "  5. Monitor Google Analytics at https://analytics.google.com`n" -ForegroundColor White
