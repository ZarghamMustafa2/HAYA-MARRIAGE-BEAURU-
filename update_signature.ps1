$dir = "c:\Users\Dell\OneDrive\Desktop\hayamarriage beauru"
$files = Get-ChildItem -Path $dir -Filter *.html

$utf8NoBom = New-Object System.Text.UTF8Encoding($false)

foreach ($f in $files) {
    $content = [System.IO.File]::ReadAllText($f.FullName, $utf8NoBom)
    
    $regex = '(?s)[ \t]*<div class="signature">.*?</div>'
    $replacement = '                <div class="developer-signature" style="font-size: 13px; font-weight: 300; color: var(--accent);">
                    Developed by: <a href="https://wa.me/923079661669" target="_blank" style="color: var(--accent); text-decoration: none; font-weight: 300;">Zargham Mustafa</a>
                </div>'
                
    $newContent = $content -replace $regex, $replacement
    
    if ($content -ne $newContent) {
        [System.IO.File]::WriteAllText($f.FullName, $newContent, $utf8NoBom)
        Write-Host "Updated signature in $($f.Name)"
    }
}
