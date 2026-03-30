$dir = "c:\Users\Dell\OneDrive\Desktop\hayamarriage beauru"
$files = Get-ChildItem -Path $dir -Filter *.html

$utf8NoBom = New-Object System.Text.UTF8Encoding($false)

foreach ($f in $files) {
    $content = [System.IO.File]::ReadAllText($f.FullName, $utf8NoBom)
    
    # 1. Header
    $target1 = '<a href="https://wa.me/923134089228"><i class="fab fa-whatsapp"></i> 0313-4089228</a>'
    $replace1 = '<a href="https://wa.me/923134089228"><i class="fab fa-whatsapp"></i> 0313-4089228</a>
                <a href="https://maps.google.com/?q=Bowanji+Chowk,+Cantt+Multan,+Pakistan" target="_blank" class="desktop-only-address" style="color: var(--white); font-size: 13px; font-weight: 500; text-decoration: none; display: flex; align-items: center; gap: 6px; transition: var(--transition);"><i class="fas fa-map-marker-alt" style="color: var(--accent);"></i> Bowanji Chowk, Cantt Multan, Pakistan</a>'
    
    # 2. Mobile Menu
    $regex2 = '(?s)(<a href="contact\.html">Contact</a>\s*\n\s*)(<a href="register\.html"[^>]*>Join the Elite</a>)'
    $replace2 = '${1}<a href="https://maps.google.com/?q=Bowanji+Chowk,+Cantt+Multan,+Pakistan" target="_blank" style="color: var(--white); font-size: 0.95rem; display: flex; align-items: center; gap: 10px; border: none; padding-top: 5px; text-decoration: none;"><i class="fas fa-map-marker-alt" style="color: var(--accent);"></i> Bowanji Chowk, Cantt Multan</a>`n        ${2}'
    
    # 3. Footer
    $target3 = '<img src="images/official_logo.png" class="footer-logo-large" alt="Haya Bureau Logo">'
    $replace3 = '<img src="images/official_logo.png" class="footer-logo-large" alt="Haya Bureau Logo">
                
                <div class="footer-contact-col" style="display: flex; flex-direction: column; gap: 8px; margin-top: -10px;">
                    <h4 style="color: var(--accent); font-family: ''Playfair Display'', serif; font-size: 1.1rem; margin-bottom: 5px;">Visit Our Office</h4>
                    <p style="color: var(--white); font-size: 0.9rem; margin: 0; display:flex; align-items:flex-start; gap:8px;"><i class="fas fa-map-marker-alt" style="color: var(--accent); margin-top:4px;"></i> Bowanji Chowk,<br>Cantt Multan, Pakistan</p>
                    <a href="https://maps.google.com/?q=Bowanji+Chowk,+Cantt+Multan,+Pakistan" target="_blank" style="color: var(--accent); font-size: 0.85rem; text-decoration: underline; font-weight: 500;">View on Map</a>
                </div>'
                
    if ($content -notmatch "Bowanji Chowk") {
        $content = $content.Replace($target1, $replace1)
        $content = $content -replace $regex2, $replace2
        $content = $content.Replace($target3, $replace3)
        [System.IO.File]::WriteAllText($f.FullName, $content, $utf8NoBom)
        Write-Host "Updated $($f.Name)"
    }
}
