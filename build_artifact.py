#!/usr/bin/env python3
"""Baut aus site/ die Einzeldatei-Version für die claude.ai-Vorschau (ohne doctype/html/head/body,
CSS und JS inline, Bilder bleiben als Dateien daneben)."""
import pathlib, re, sys

ROOT = pathlib.Path(__file__).resolve().parent
SITE = ROOT / "site"
OUT = pathlib.Path(sys.argv[1]) if len(sys.argv) > 1 else ROOT / "dist-artifact" / "index.html"

html = (SITE / "index.html").read_text(encoding="utf-8")
css = (SITE / "app.css").read_text(encoding="utf-8")
data = (SITE / "data.js").read_text(encoding="utf-8")
app = (SITE / "app.js").read_text(encoding="utf-8")

fonts = re.search(r'<link rel="stylesheet" href="https://fonts\.googleapis\.com[^"]*">', html).group(0)
body = re.search(r"<body>(.*)</body>", html, re.S).group(1)
body = re.sub(r"<script[^>]*>.*?</script>", "", body, flags=re.S).strip()

page = "\n".join([
    "<title>Thailand 2027</title>",
    '<meta name="claude:viewport-fit-sides" content="cover">',
    fonts,
    "<style>\n" + css + "\n</style>",
    body,
    "<script>\nwindow.IS_ARTIFACT = true;\n" + data + "\n" + app + "\n</script>",
])
OUT.parent.mkdir(parents=True, exist_ok=True)
OUT.write_text(page, encoding="utf-8")
print("written", OUT, len(page), "bytes")
