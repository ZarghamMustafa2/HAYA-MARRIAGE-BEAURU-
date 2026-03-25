$dir = "c:\Users\Dell\OneDrive\Desktop\hayamarriage beauru"
$files = Get-ChildItem -Path $dir -Filter *.html

$utf8NoBom = New-Object System.Text.UTF8Encoding($false)

foreach ($f in $files) {
    $content = [System.IO.File]::ReadAllText($f.FullName, $utf8NoBom)
    
    $regex = '(?s)[ \t]*<div class="footer-contact-col".*?</div>'
    $newContent = $content -replace $regex, ''
    
    if ($content -ne $newContent) {
        [System.IO.File]::WriteAllText($f.FullName, $newContent, $utf8NoBom)
        Write-Host "Cleaned footer in $($f.Name)"
    }
}
