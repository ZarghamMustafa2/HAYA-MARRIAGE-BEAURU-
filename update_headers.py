import os
import re

dir_path = "c:/Users/Dell/OneDrive/Desktop/hayamarriage beauru"

# The new header template
# We use {header_class} to preserve the dark/light mode class of the page.
header_template = """    <header id="mainHeader" class="{header_class}">
        <div class="container header-inner" style="display: flex; justify-content: space-between; align-items: center; position: relative;">
            <ul class="nav-links" style="display: flex; gap: 25px; list-style: none; margin: 0; padding: 0;">
                <li><a href="index.html" class="nav-link{index_active}">Home</a></li>
                <li><a href="profiles.html" class="nav-link{profiles_active}">Profiles</a></li>
                <li><a href="about.html" class="nav-link{about_active}">Our Story</a></li>
            </ul>
            
            <div class="logo-center" style="position: absolute; left: 50%; transform: translateX(-50%); text-align: center;">
                <a href="index.html">
                    <img src="images/image_3e3df8.png" alt="Haya Bureau Logo" style="height: 130px; background: transparent !important; border: none !important; box-shadow: none !important; filter: drop-shadow(0px 0px 10px rgba(212, 175, 55, 0.5));">
                </a>
            </div>

            <div style="display: flex; align-items: center; gap: 25px;">
                <ul class="nav-links" style="display: flex; gap: 25px; list-style: none; margin: 0; padding: 0;">
                    <li><a href="packages.html" class="nav-link{packages_active}">Membership</a></li>
                    <li><a href="contact.html" class="nav-link{contact_active}">Contact</a></li>
                </ul>
                <a href="register.html" class="btn-primary btn-minimal">Join the Elite</a>
            </div>
        </div>
    </header>"""

for filename in os.listdir(dir_path):
    if filename.endswith(".html"):
        filepath = os.path.join(dir_path, filename)
        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()
        
        # Determine active links
        active_dict = {
            "index_active": " active" if filename == "index.html" else "",
            "profiles_active": " active" if filename == "profiles.html" else "",
            "about_active": " active" if filename == "about.html" else "",
            "packages_active": " active" if filename == "packages.html" else "",
            "contact_active": " active" if filename == "contact.html" else "",
        }

        # Find the existing mainHeader class
        match = re.search(r'<header id="mainHeader" class="(.*?)">', content)
        header_class = match.group(1) if match else "nav-solid"
        
        # Build replacement header
        replacement_header = header_template.format(header_class=header_class, **active_dict)
        
        # Replace the entire <header ...>...</header> block
        content_new = re.sub(r'<header id="mainHeader".*?</header>', replacement_header, content, flags=re.DOTALL)
        
        # Remove global-fixed-logo
        content_new = re.sub(r'<!-- Global Fixed Transparent Logo -->\s*<div class="global-fixed-logo">.*?</div>', '', content_new, flags=re.DOTALL)
        
        # If the file had any changes, write back
        if content != content_new:
            with open(filepath, 'w', encoding='utf-8') as f:
                f.write(content_new)
            print(f"Updated {filename}")
