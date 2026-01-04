# PowerShell script to update blog HTML with new navbar

Write-Host "Updating blog HTML files with new navbar..." -ForegroundColor Cyan
Write-Host ""

# Get template content
$indexTemplate = Get-Content "_templates/index.html" -Raw -Encoding UTF8
$articleTemplate = Get-Content "_templates/article.html" -Raw -Encoding UTF8

# Extract navbar section
$navbarPattern = '(?s)(<!-- Theme and Language Management Scripts -->.*?</nav>)'

if ($indexTemplate -match $navbarPattern) {
    $navbarIndex = $matches[1]
    Write-Host "Extracted navbar from index template" -ForegroundColor Green
} else {
    Write-Host "Failed to extract navbar from index template" -ForegroundColor Red
    exit 1
}

if ($articleTemplate -match $navbarPattern) {
    $navbarArticle = $matches[1]
    Write-Host "Extracted navbar from article template" -ForegroundColor Green
} else {
    Write-Host "Failed to extract navbar from article template" -ForegroundColor Red
    exit 1
}

Write-Host ""

# Function to update HTML file
function Update-HtmlFile {
    param(
        [string]$filePath,
        [string]$navbarContent
    )

    if (-not (Test-Path $filePath)) {
        return
    }

    $content = Get-Content $filePath -Raw -Encoding UTF8

    # Replace old structure with new navbar
    $oldPattern = '(?s)(</head>\s*<body>).*?(<header>)'
    $replacement = "`$1`n$navbarContent`n`n`$2"
    $updatedContent = $content -replace $oldPattern, $replacement

    Set-Content -Path $filePath -Value $updatedContent -Encoding UTF8 -NoNewline

    Write-Host "  Updated: $filePath" -ForegroundColor Green
}

# Update root index
Write-Host "Updating root index..." -ForegroundColor Cyan
if (Test-Path "index.html") {
    Update-HtmlFile -filePath "index.html" -navbarContent $navbarIndex
}

Write-Host ""

# Update all language pages
$languages = @('it', 'en', 'es', 'fr', 'de')

Write-Host "Updating language blog pages..." -ForegroundColor Cyan
foreach ($lang in $languages) {
    $blogPath = "$lang/blog"

    if (Test-Path $blogPath) {
        # Update blog index
        $indexPath = "$blogPath/index.html"
        if (Test-Path $indexPath) {
            Update-HtmlFile -filePath $indexPath -navbarContent $navbarIndex
        }

        # Update all articles
        Get-ChildItem -Path $blogPath -Filter "*.html" -File | Where-Object { $_.Name -ne "index.html" } | ForEach-Object {
            Update-HtmlFile -filePath $_.FullName -navbarContent $navbarArticle
        }
    }
}

Write-Host ""
Write-Host "Blog HTML update completed!" -ForegroundColor Green
Write-Host ""
Write-Host "Next: Deploy to Cloudflare Pages" -ForegroundColor Yellow
