# PowerShell script to update blog HTML with new navbar
# Replaces old header structure with navbar from main app templates

Write-Host "🔄 Updating blog HTML files with new navbar..." -ForegroundColor Cyan
Write-Host ""

# Get template content for navbar section
$indexTemplate = Get-Content "_templates/index.html" -Raw -Encoding UTF8
$articleTemplate = Get-Content "_templates/article.html" -Raw -Encoding UTF8

# Extract navbar section from templates (from <script src=...theme-manager> to </nav>)
$navbarPattern = '(?s)(<!-- Theme and Language Management Scripts -->.*?</nav>)'

if ($indexTemplate -match $navbarPattern) {
    $navbarIndex = $matches[1]
    Write-Host "✅ Extracted navbar from index template" -ForegroundColor Green
} else {
    Write-Host "❌ Failed to extract navbar from index template" -ForegroundColor Red
    exit 1
}

if ($articleTemplate -match $navbarPattern) {
    $navbarArticle = $matches[1]
    Write-Host "✅ Extracted navbar from article template" -ForegroundColor Green
} else {
    Write-Host "❌ Failed to extract navbar from article template" -ForegroundColor Red
    exit 1
}

Write-Host ""

# Function to update HTML file
function Update-HtmlFile {
    param(
        [string]$filePath,
        [string]$navbarContent,
        [string]$fileType
    )

    if (-not (Test-Path $filePath)) {
        Write-Host "⚠️  File not found: $filePath" -ForegroundColor Yellow
        return
    }

    $content = Get-Content $filePath -Raw -Encoding UTF8

    # Replace old structure with new navbar
    # Pattern: from </head> to <header> (inclusive)
    $oldPattern = '(?s)(</head>\s*<body>).*?(<header>)'

    $replacement = "`$1`n$navbarContent`n`n`$2"

    $updatedContent = $content -replace $oldPattern, $replacement

    # Write back to file
    Set-Content -Path $filePath -Value $updatedContent -Encoding UTF8 -NoNewline

    Write-Host "  ✅ $filePath" -ForegroundColor Green
}

# Update root index.html
Write-Host "📝 Updating root index..." -ForegroundColor Cyan
if (Test-Path "index.html") {
    Update-HtmlFile -filePath "index.html" -navbarContent $navbarIndex -fileType "index"
}

Write-Host ""

# Update all language blog pages
$languages = @('it', 'en', 'es', 'fr', 'de', 'pt', 'nl', 'pl', 'ro', 'el', 'cs', 'hu', 'sv', 'da', 'fi', 'no', 'sk', 'hr', 'sl', 'bg', 'lt', 'lv', 'et')

Write-Host "📝 Updating language blog pages..." -ForegroundColor Cyan
foreach ($lang in $languages) {
    $blogPath = "$lang/blog"

    if (Test-Path $blogPath) {
        # Update blog index
        $indexPath = "$blogPath/index.html"
        if (Test-Path $indexPath) {
            Update-HtmlFile -filePath $indexPath -navbarContent $navbarIndex -fileType "index"
        }

        # Update all articles
        Get-ChildItem -Path $blogPath -Filter "*.html" -File | Where-Object { $_.Name -ne "index.html" } | ForEach-Object {
            Update-HtmlFile -filePath $_.FullName -navbarContent $navbarArticle -fileType "article"
        }
    }
}

Write-Host ""
Write-Host "✅ Blog HTML update completed!" -ForegroundColor Green
Write-Host ""
Write-Host "📊 Summary:" -ForegroundColor Cyan
Write-Host "  - Updated navbar with functional language selector" -ForegroundColor White
Write-Host "  - Added theme toggle (light/dark mode)" -ForegroundColor White
Write-Host "  - Integrated theme-manager.js script" -ForegroundColor White
Write-Host "  - Integrated language-manager.js script" -ForegroundColor White
Write-Host "  - Shared localStorage with main app (cv-app-language and clearcv_settings)" -ForegroundColor White
Write-Host "  - 23 languages supported with flag icons" -ForegroundColor White
Write-Host ""
Write-Host "Next step: Deploy to Cloudflare Pages" -ForegroundColor Yellow
