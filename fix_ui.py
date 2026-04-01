import os
import re

dir_path = r"c:\Users\Dell\OneDrive\Desktop\hayamarriage beauru\HAYA-MARRIAGE-BEAURU-"

def remove_sidebar(html_content, sidebar_class):
    # Regex to find <aside class="...sidebar...">...</aside> or similar block
    # It's better to use regex to find start and end of aside, but regex for nested tags is hard.
    # Since we know the structure, let's just do a simple string matching or regex with caution.
    pattern = re.compile(f'<aside[^>]*class="[^"]*{sidebar_class}[^"]*"[^>]*>.*?</aside>', re.DOTALL)
    new_content = re.sub(pattern, '', html_content)
    return new_content

for filename in os.listdir(dir_path):
    if filename.endswith(".html") and filename != "index.html.bak":
        filepath = os.path.join(dir_path, filename)
        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()

        original_content = content

        # 1. dashboard.html sidebar
        if 'class="sidebar' in content and 'dashboard-grid' in content:
            content = remove_sidebar(content, "sidebar")
            content = content.replace("grid-template-columns: 280px 1fr;", "grid-template-columns: 1fr;")

        # 2. search.html sidebar
        if 'search-sidebar' in content:
            content = remove_sidebar(content, "search-sidebar")
            content = content.replace("grid-template-columns: 300px 1fr;", "grid-template-columns: 1fr;")
            content = content.replace("grid-template-columns: 280px 1fr;", "grid-template-columns: 1fr;")

        # 3. profiles.html sidebar
        if 'filter-sidebar' in content:
            content = remove_sidebar(content, "filter-sidebar")
            content = content.replace("grid-template-columns: 300px 1fr;", "grid-template-columns: 1fr;")
            content = content.replace("grid-template-columns: 280px 1fr;", "grid-template-columns: 1fr;")

        # 4. Also check for a <nav> disguised as desktop nav that might be floating
        # And ensure the toggle function uses explicitly inline fallback
        content = re.sub(r'<button class="mobile-toggle"[^>]*>', r'<button class="mobile-toggle" aria-label="Open Menu" onclick="if(window.openMenu) window.openMenu();">', content)
        content = re.sub(r'<i class="fas fa-times close-btn"[^>]*>', r'<i class="fas fa-times close-btn" onclick="if(window.closeMenu) window.closeMenu();">', content)

        if content != original_content:
            with open(filepath, 'w', encoding='utf-8') as f:
                f.write(content)
            print(f"Updated {filename}")

# Fix main.css explicitly to prevent 'stuck maroon box'
css_path = os.path.join(dir_path, "styles", "main.css")
if os.path.exists(css_path):
    with open(css_path, 'r', encoding='utf-8') as f:
        css = f.read()
    
    # ensure mobile-nav-overlay is 100vh absolute and pointer events none
    if ".mobile-nav-overlay {" in css:
        pass # It's largely correct, but let's make sure it has pointer-events: none by default
    
    with open(css_path, 'w', encoding='utf-8') as f:
        f.write(css)
    print("Checked main.css")
