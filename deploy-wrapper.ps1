# Deployment Wrapper per Lovable Export
# NON modifica il codice interno di Lovable, wrappa solo il deployment

Write-Host "======================================" -ForegroundColor Cyan
Write-Host "  CLEARCV DEPLOYMENT WRAPPER" -ForegroundColor Cyan
Write-Host "======================================" -ForegroundColor Cyan
Write-Host ""

# Step 1: Build progetto Lovable (unmodified)
Write-Host "Step 1/4: Building Lovable project..." -ForegroundColor Yellow
Set-Location clear-cv-integration
npm run build
if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Build failed" -ForegroundColor Red
    exit 1
}
Set-Location ..

# Step 2: Merge sitemap (wrapper esterno)
Write-Host ""
Write-Host "Step 2/4: Merging sitemaps (wrapper)..." -ForegroundColor Yellow

$mergeScript = @'
import xml.etree.ElementTree as ET
import sys

NS = {'ns': 'http://www.sitemaps.org/schemas/sitemap/0.9',
      'xhtml': 'http://www.w3.org/1999/xhtml'}

ET.register_namespace('', 'http://www.sitemaps.org/schemas/sitemap/0.9')
ET.register_namespace('xhtml', 'http://www.w3.org/1999/xhtml')

try:
    # Read app sitemap from Lovable dist
    app_tree = ET.parse('clear-cv-integration/dist/sitemap.xml')
    app_root = app_tree.getroot()

    # Read blog sitemap from static blog
    blog_tree = ET.parse('blog-static/sitemap.xml')
    blog_root = blog_tree.getroot()

    # Merge
    merged_root = app_root
    for url in blog_root.findall('ns:url', NS):
        merged_root.append(url)

    # Write back to Lovable dist
    merged_tree = ET.ElementTree(merged_root)
    ET.indent(merged_tree, space='  ')
    merged_tree.write('clear-cv-integration/dist/sitemap.xml',
                      encoding='UTF-8',
                      xml_declaration=True)

    url_count = len(merged_root.findall('ns:url', NS))
    print(f"✓ Merged sitemap created: {url_count} URLs")
except Exception as e:
    print(f"❌ Error: {e}", file=sys.stderr)
    sys.exit(1)
'@

$mergeScript | python
if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Sitemap merge failed" -ForegroundColor Red
    exit 1
}

# Step 3: Copy blog-static to dist
Write-Host ""
Write-Host "Step 3/4: Copying blog-static to dist..." -ForegroundColor Yellow
Copy-Item -Path "blog-static" -Destination "clear-cv-integration\dist\" -Recurse -Force
Write-Host "✓ Blog static copied" -ForegroundColor Green

# Step 4: Deploy to Cloudflare
Write-Host ""
Write-Host "Step 4/4: Deploying to Cloudflare..." -ForegroundColor Yellow
Set-Location clear-cv-integration\dist
wrangler pages deploy . --project-name=clearcv
if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Deployment failed" -ForegroundColor Red
    Set-Location ..\..
    exit 1
}
Set-Location ..\..

Write-Host ""
Write-Host "======================================" -ForegroundColor Green
Write-Host "  ✓ DEPLOYMENT COMPLETED" -ForegroundColor Green
Write-Host "======================================" -ForegroundColor Green
Write-Host ""
Write-Host "Verify sitemap:" -ForegroundColor Cyan
Write-Host "  curl -s https://clearcvapp.com/sitemap.xml | grep -c '<url>'" -ForegroundColor Gray
Write-Host ""
