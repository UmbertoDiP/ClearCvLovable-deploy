# Verification script for navbar integration
# Tests that navbar, theme toggle, and language selector work correctly

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "ClearCV Blog Navbar Verification" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

$baseUrl = "https://clearcvapp.com"

# Test 1: Verify navbar HTML structure
Write-Host "[1/5] Testing navbar HTML structure..." -ForegroundColor Yellow
$response = Invoke-WebRequest -Uri "$baseUrl/it/blog/" -UseBasicParsing
$content = $response.Content

if ($content -match '<nav class="sticky top-0') {
    Write-Host "  PASS: Navbar found in HTML" -ForegroundColor Green
} else {
    Write-Host "  FAIL: Navbar not found" -ForegroundColor Red
}

# Test 2: Verify JavaScript files
Write-Host "[2/5] Testing JavaScript files..." -ForegroundColor Yellow

$jsFiles = @(
    "$baseUrl/assets/theme-manager.js",
    "$baseUrl/assets/language-manager.js"
)

foreach ($jsFile in $jsFiles) {
    try {
        $jsResponse = Invoke-WebRequest -Uri $jsFile -UseBasicParsing
        if ($jsResponse.StatusCode -eq 200) {
            Write-Host "  PASS: $(Split-Path $jsFile -Leaf) accessible (HTTP $($jsResponse.StatusCode))" -ForegroundColor Green
        } else {
            Write-Host "  FAIL: $(Split-Path $jsFile -Leaf) returned HTTP $($jsResponse.StatusCode)" -ForegroundColor Red
        }
    } catch {
        Write-Host "  FAIL: $(Split-Path $jsFile -Leaf) not accessible" -ForegroundColor Red
    }
}

# Test 3: Verify design system CSS loaded
Write-Host "[3/5] Testing design system CSS..." -ForegroundColor Yellow
if ($content -match 'blog-styles\.css') {
    Write-Host "  PASS: Design system CSS linked" -ForegroundColor Green
} else {
    Write-Host "  FAIL: Design system CSS not linked" -ForegroundColor Red
}

# Test 4: Verify language selector HTML
Write-Host "[4/5] Testing language selector..." -ForegroundColor Yellow
if ($content -match 'language-selector-button') {
    Write-Host "  PASS: Language selector button found" -ForegroundColor Green
} else {
    Write-Host "  FAIL: Language selector button not found" -ForegroundColor Red
}

if ($content -match 'language-selector-dropdown') {
    Write-Host "  PASS: Language dropdown found" -ForegroundColor Green
} else {
    Write-Host "  FAIL: Language dropdown not found" -ForegroundColor Red
}

# Test 5: Verify theme toggle button
Write-Host "[5/5] Testing theme toggle..." -ForegroundColor Yellow
if ($content -match 'theme-toggle') {
    Write-Host "  PASS: Theme toggle button found" -ForegroundColor Green
} else {
    Write-Host "  FAIL: Theme toggle button not found" -ForegroundColor Red
}

if ($content -match 'toggleTheme') {
    Write-Host "  PASS: Theme toggle function found" -ForegroundColor Green
} else {
    Write-Host "  FAIL: Theme toggle function not found" -ForegroundColor Red
}

# Summary
Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "Verification Summary" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "Navbar Structure: Integrated from main app" -ForegroundColor White
Write-Host "Language Selector: 23 languages with flag icons" -ForegroundColor White
Write-Host "Theme Toggle: Light/Dark mode switcher" -ForegroundColor White
Write-Host "LocalStorage: Shared with main app" -ForegroundColor White
Write-Host "  - cv-app-language (language preference)" -ForegroundColor Gray
Write-Host "  - clearcv_settings (theme preference)" -ForegroundColor Gray
Write-Host ""
Write-Host "Production URLs:" -ForegroundColor Yellow
Write-Host "  IT Blog: https://clearcvapp.com/it/blog/" -ForegroundColor Cyan
Write-Host "  EN Blog: https://clearcvapp.com/en/blog/" -ForegroundColor Cyan
Write-Host "  Article: https://clearcvapp.com/it/blog/come-scrivere-cv-perfetto" -ForegroundColor Cyan
Write-Host ""
Write-Host "Manual Testing:" -ForegroundColor Yellow
Write-Host "  1. Open blog in browser" -ForegroundColor White
Write-Host "  2. Click language selector (should show 23 languages)" -ForegroundColor White
Write-Host "  3. Change language (page should reload with new language)" -ForegroundColor White
Write-Host "  4. Click theme toggle (should switch between light/dark)" -ForegroundColor White
Write-Host "  5. Navigate to main app (theme and language should persist)" -ForegroundColor White
Write-Host ""
