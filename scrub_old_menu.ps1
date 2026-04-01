$dir = "c:\Users\Dell\OneDrive\Desktop\hayamarriage beauru\HAYA-MARRIAGE-BEAURU-"
$files = Get-ChildItem -Path $dir -Filter "*.html"

foreach ($file in $files) {
    if ($file.Name -ne "index.html.bak") {
        $content = Get-Content -Path $file.FullName -Raw
        # Remove old desktop .nav-links and adjacent .btn-join-elite from the header
        $pattern = '(?is)(<div class="header-right">\s*)<ul class="nav-links">.*?</ul>\s*(?:<a[^>]*class="btn-join-elite"[^>]*>.*?</a>\s*)?'
        $content = [regex]::Replace($content, $pattern, '$1')
        Set-Content -Path $file.FullName -Value $content -Encoding UTF8
        Write-Host "Cleaned old menu from $($file.Name)"
    }
}

$cssPath = Join-Path $dir "styles\main.css"
$cssContent = Get-Content -Path $cssPath -Raw

# 1) Make .mobile-toggle visible globally
$cssContent = [regex]::Replace($cssContent, '(?s)(\.mobile-toggle\s*\{[^}]*)display:\s*none;', '$1display: block;')

# 2) Clean up the @media query: remove .nav-links references, and .mobile-toggle logic since it's global now
$cssContent = [regex]::Replace($cssContent, '(?is)@media\s*\(max-width:\s*768px\)\s*\{\s*\.header-left\s*,\s*\.header-right\s*\.nav-links\s*\{\s*display:\s*none;\s*\}\s*\.mobile-toggle\s*\{\s*display:\s*block;\s*color:\s*var\(--accent\);\s*/\*\s*Royal Gold\s*\*/\s*\}\s*\.header-inner\s*\{\s*padding-right:\s*10px;\s*\}\s*\}', "@media (max-width: 768px) {`n    .header-left {`n        display: none;`n    }`n    .header-inner {`n        padding-right: 10px;`n    }`n}")

# 3) Remove all unused top-nav CSS classes (.nav-links, .nav-link, .nav-link:hover, etc.)
$cssContent = [regex]::Replace($cssContent, '(?is)\.nav-links\s*\{.*?\}', '')
$cssContent = [regex]::Replace($cssContent, '(?is)\.nav-link\s*\{.*?\}', '')
$cssContent = [regex]::Replace($cssContent, '(?is)\.nav-link:hover[^\}]*\}', '')
$cssContent = [regex]::Replace($cssContent, '(?is)\.nav-link\.active[^\}]*\}', '')
$cssContent = [regex]::Replace($cssContent, '(?is)header\.nav-transparent\s*\.nav-link[^\}]*\}', '')
$cssContent = [regex]::Replace($cssContent, '(?is)header\.nav-solid\s*\.nav-link[^\}]*\}', '')
$cssContent = [regex]::Replace($cssContent, '(?is)header\.scrolled\s*\.nav-link[^\}]*\}', '')

Set-Content -Path $cssPath -Value $cssContent -Encoding UTF8
Write-Host "Cleaned unused CSS rules & set mobile-toggle active globally!"
