"""
Genera favicon.ico, apple-touch-icon.png e íconos PWA a partir del diseño
provisional de favicon.svg (mismo dibujo, rasterizado con Pillow).
Uso: python3 scripts/generate-icons.py   (requiere: pip install pillow)
Reemplazar cuando exista el logotipo oficial.
"""
from pathlib import Path
from PIL import Image, ImageDraw

ROOT = Path(__file__).resolve().parent.parent
PUBLIC = ROOT / "public"


def draw(size: int, rounded: bool = True) -> Image.Image:
    s = size / 64
    scale = 4  # supersampling para bordes suaves
    big = size * scale
    k = s * scale
    img = Image.new("RGBA", (big, big), (0, 0, 0, 0))
    d = ImageDraw.Draw(img)
    radius = int(10 * k) if rounded else 0
    d.rounded_rectangle([0, 0, big - 1, big - 1], radius=radius, fill=(0, 0, 0, 255))
    white = (244, 246, 250, 255)
    d.rectangle([16 * k, 14 * k, 24 * k, 50 * k], fill=white)
    d.rectangle([40 * k, 14 * k, 48 * k, 50 * k], fill=white)
    d.rectangle([24 * k, 28 * k, 40 * k, 36 * k], fill=white)
    d.line([10 * k, 56 * k, 58 * k, 10 * k], fill=(255, 176, 32, 255), width=int(5 * k))
    for cx, cy in ((10, 56), (58, 10)):
        r = 2.5 * k
        d.ellipse([cx * k - r, cy * k - r, cx * k + r, cy * k + r], fill=(255, 176, 32, 255))
    return img.resize((size, size), Image.LANCZOS)


(PUBLIC / "icons").mkdir(parents=True, exist_ok=True)
draw(256).save(PUBLIC / "favicon.ico", sizes=[(16, 16), (32, 32), (48, 48)])
draw(180, rounded=False).convert("RGB").save(PUBLIC / "apple-touch-icon.png", optimize=True)
draw(192).save(PUBLIC / "icons" / "icon-192.png", optimize=True)
draw(512).save(PUBLIC / "icons" / "icon-512.png", optimize=True)
print("✓ favicon.ico, apple-touch-icon.png, icons/icon-192.png, icons/icon-512.png")
