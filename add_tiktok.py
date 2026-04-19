import glob

html_files = glob.glob("*.html")
tiktok_link_footer = '\n                    <a href="https://www.tiktok.com/@hayamarriageburea" target="_blank" rel="noopener noreferrer"><i class="fab fa-tiktok"></i></a>'

tiktok_link_inline = '\n                            <a href="https://www.tiktok.com/@hayamarriageburea" target="_blank" rel="noopener noreferrer" style="color: var(--accent); transition: 0.3s;" onmouseover="this.style.color=\'var(--primary)\'" onmouseout="this.style.color=\'var(--accent)\'"><i class="fab fa-tiktok"></i></a>'

for f in html_files:
    if f.endswith('.bak'): continue
    with open(f, 'r', encoding='utf-8') as file:
        content = file.read()
    
    modified = False
    
    target_footer = '<a href="https://wa.me/923706462317" target="_blank"><i class="fab fa-whatsapp"></i></a>'
    if target_footer in content and "fa-tiktok" not in content:
        content = content.replace(target_footer, target_footer + tiktok_link_footer)
        modified = True

    target_inline = '<a href="https://wa.me/923706462317" target="_blank" style="color: var(--accent); transition: 0.3s;" onmouseover="this.style.color=\'var(--primary)\'" onmouseout="this.style.color=\'var(--accent)\'"><i class="fab fa-whatsapp"></i></a>'
    
    if target_inline in content:
        content = content.replace(target_inline, target_inline + tiktok_link_inline)
        modified = True
            
    if modified:
        with open(f, 'w', encoding='utf-8') as file:
            file.write(content)
        print(f"Updated {f}")
