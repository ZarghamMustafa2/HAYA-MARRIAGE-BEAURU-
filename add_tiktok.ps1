$targetFooter = '<a href="https://wa.me/923706462317" target="_blank"><i class="fab fa-whatsapp"></i></a>'
$tiktokFooter = "`n                    <a href=`"https://www.tiktok.com/@hayamarriageburea`" target=`"_blank`" rel=`"noopener noreferrer`"><i class=`"fab fa-tiktok`"></i></a>"

$targetInline = '<a href="https://wa.me/923706462317" target="_blank" style="color: var(--accent); transition: 0.3s;" onmouseover="this.style.color=''var(--primary)''" onmouseout="this.style.color=''var(--accent)''"><i class="fab fa-whatsapp"></i></a>'
$tiktokInline = "`n                            <a href=`"https://www.tiktok.com/@hayamarriageburea`" target=`"_blank`" rel=`"noopener noreferrer`" style=`"color: var(--accent); transition: 0.3s;`" onmouseover=`"this.style.color='var(--primary)'`" onmouseout=`"this.style.color='var(--accent)'`"><i class=`"fab fa-tiktok`"></i></a>"

Get-ChildItem -Filter *.html | Where-Object { $_.Name -notlike "*.bak" } | ForEach-Object {
    $content = [System.IO.File]::ReadAllText($_.FullName, [System.Text.Encoding]::UTF8)
    $modified = $false
    
    if ($content.Contains($targetFooter) -and -not $content.Contains("fa-tiktok")) {
        $content = $content.Replace($targetFooter, $targetFooter + $tiktokFooter)
        $modified = $true
    }
    
    if ($content.Contains($targetInline)) {
        if (-not $content.Contains($tiktokInline.Trim())) {
            $content = $content.Replace($targetInline, $targetInline + $tiktokInline)
            $modified = $true
        }
    }
    
    if ($modified) {
        [System.IO.File]::WriteAllText($_.FullName, $content, [System.Text.Encoding]::UTF8)
        Write-Host "Updated $($_.Name)"
    }
}
