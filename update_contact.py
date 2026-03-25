import os
import re

dir_path = "c:/Users/Dell/OneDrive/Desktop/hayamarriage beauru"

# 1. Header Desktop
header_target = r'(<a href="https://wa\.me/[0-9]+"><i class="fab fa-whatsapp"></i>[^<]+</a>)'
header_replacement = r'\1\n                <a href="https://maps.google.com/?q=Bowanji+Chowk,+Cantt+Multan,+Pakistan" target="_blank" class="desktop-only-address" style="color: var(--white); font-size: 13px; font-weight: 500; text-decoration: none; display: flex; align-items: center; gap: 6px; transition: var(--transition);"><i class="fas fa-map-marker-alt" style="color: var(--accent);"></i> Bowanji Chowk, Cantt Multan, Pakistan</a>'

# 2. Header Mobile
mobile_target = r'(<a href="contact\.html">Contact</a>\s*\n\s*)(<a href="register\.html"[^>]+>Join the Elite</a>)'
mobile_replacement = r'\1<a href="https://maps.google.com/?q=Bowanji+Chowk,+Cantt+Multan,+Pakistan" target="_blank" style="color: var(--white); font-size: 0.95rem; display: flex; align-items: center; gap: 10px; border: none; padding-top: 5px;"><i class="fas fa-map-marker-alt" style="color: var(--accent);"></i> Bowanji Chowk, Cantt Multan</a>\n        \2'

# 3. Footer Desktop & Mobile
footer_target = r'(<img src="images/official_logo\.png" class="footer-logo-large" alt="Haya Bureau Logo">)'
footer_replacement = r'''\1
                
                <div class="footer-contact-col" style="display: flex; flex-direction: column; gap: 8px; margin-top: -10px;">
                    <h4 style="color: var(--accent); font-family: \'Playfair Display\', serif; font-size: 1.1rem; margin-bottom: 5px;">Visit Our Office</h4>
                    <p style="color: var(--white); font-size: 0.9rem; margin: 0;"><i class="fas fa-map-marker-alt" style="color: var(--accent); width: 20px;"></i> Bowanji Chowk, Cantt Multan, Pakistan</p>
                    <a href="https://maps.google.com/?q=Bowanji+Chowk,+Cantt+Multan,+Pakistan" target="_blank" style="color: var(--accent); font-size: 0.85rem; text-decoration: underline; font-weight: 500;">View on Map</a>
                </div>'''

modified_count = 0

for filename in os.listdir(dir_path):
    if filename.endswith(".html"):
        filepath = os.path.join(dir_path, filename)
        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()

        new_content = content
        
        # Only inject if not already there
        if "Bowanji Chowk" not in new_content:
            new_content = re.sub(header_target, header_replacement, new_content)
            new_content = re.sub(mobile_target, mobile_replacement, new_content)
            new_content = re.sub(footer_target, footer_replacement, new_content)

        if new_content != content:
            with open(filepath, 'w', encoding='utf-8') as f:
                f.write(new_content)
            print(f"Updated {filename}")
            modified_count += 1

print(f"Update complete. Modified {modified_count} files.")
