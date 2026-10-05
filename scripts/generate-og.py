"""
Genera public/og-image.jpg (1200×630) a partir de scripts/og-template.html.
Requiere: pip install playwright pillow && playwright install chromium
Uso: python3 scripts/generate-og.py
"""
from pathlib import Path
from playwright.sync_api import sync_playwright
from PIL import Image

ROOT = Path(__file__).resolve().parent.parent
template = (ROOT / "scripts" / "og-template.html").as_uri()
png = ROOT / ".og-tmp.png"

with sync_playwright() as p:
    browser = p.chromium.launch()
    page = browser.new_page(viewport={"width": 1200, "height": 630})
    page.goto(template, wait_until="load", timeout=20000)
    page.wait_for_timeout(800)
    page.screenshot(path=str(png))
    browser.close()

Image.open(png).convert("RGB").save(ROOT / "public" / "og-image.jpg", quality=86, optimize=True, progressive=True)
png.unlink()
print("✓ public/og-image.jpg")
