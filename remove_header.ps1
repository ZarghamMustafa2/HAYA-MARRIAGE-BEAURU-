$dir = "c:\Users\Dell\OneDrive\Desktop\hayamarriage beauru"
$files = Get-ChildItem -Path $dir -Filter *.html

$utf8NoBom = New-Object System.Text.UTF8Encoding($false)

foreach ($f in $files) {
    $content = [System.IO.File]::ReadAllText($f.FullName, $utf8NoBom)
    
    $regex1 = '(?s)[ \t]*[\r\n]*[ \t]*<a href="https://maps\.google\.com/[^>]*class="desktop-only-address"[^>]*>.*?</a>'
    $regex2 = '(?s)[ \t]*[\r\n]*[ \t]*<a href="https://maps\.google\.com/[^>]*>.*?Bowanji Chowk, Cantt Multan</a>'
    
    $newContent = $content -replace $regex1, ''
    $newContent = $newContent -replace $regex2, ''
    
    if ($content -ne $newContent) {
        [System.IO.File]::WriteAllText($f.FullName, $newContent, $utf8NoBom)
        Write-Host "Cleaned header in $($f.Name)"
    }
}
