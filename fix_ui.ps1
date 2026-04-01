$dir = "c:\Users\Dell\OneDrive\Desktop\hayamarriage beauru\HAYA-MARRIAGE-BEAURU-"

# 1. Update sidebars in dashboard, search, profiles
$files = Get-ChildItem -Path $dir -Filter "*.html" | Where-Object { $_.Name -ne "index.html.bak" }

foreach ($file in $files) {
    $content = Get-Content -Path $file.FullName -Raw

    # Remove <aside class="...sidebar...">...</aside> entirely
    $content = [regex]::Replace($content, '(?is)<aside[^>]*class="[^"]*sidebar[^"]*"[^>]*>.*?</aside>', '')

    # Update grids to 100%
    $content = $content -replace "grid-template-columns: 280px 1fr;", "grid-template-columns: 1fr;"
    $content = $content -replace "grid-template-columns: 350px 1fr;", "grid-template-columns: 1fr;"
    $content = $content -replace "grid-template-columns: 300px 1fr;", "grid-template-columns: 1fr;"
    
    # Inline onclicks for the mobile menu toggle as fail-safe
    $content = [regex]::Replace($content, '(?i)<button class="mobile-toggle" aria-label="Open Menu">', '<button class="mobile-toggle" aria-label="Open Menu" onclick="if(window.openMenu) window.openMenu();">')
    $content = [regex]::Replace($content, '(?i)<i class="fas fa-times close-btn"></i>', '<i class="fas fa-times close-btn" onclick="if(window.closeMenu) window.closeMenu();"></i>')

    Set-Content -Path $file.FullName -Value $content -Encoding UTF8
    Write-Host "Updated $($file.Name)"
}

Write-Host "Cleanup complete."
