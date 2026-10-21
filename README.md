# Thailand 2027 – Familien-Reise-App

Interaktive Web-App aus dem Canva-Reiseplan „Vorbereitung und Zeitplan für die Thailand-Reise (borrador 1)“.
Läuft als Website und als installierbare App auf iPhone, iPad und Android (PWA) – ohne App Store.

## Ordner

- `site/` – die fertige App (statische Dateien, kein Build nötig)
  - `index.html`, `app.css`, `app.js` – Oberfläche und Logik
  - `data.js` – **alle Reisedaten** (Tage, Hotels, Flüge, Orte, Spiele, Packliste). Hier ändern, wenn sich der Plan ändert.
  - `manifest.webmanifest`, `sw.js`, `icons/` – macht die Seite installierbar und offline nutzbar
  - `reiseplan-original.pdf` – das Original-PDF
- `build_artifact.py` – baut die Einzeldatei-Vorschau für claude.ai (optional)

## Lokal ansehen

```bash
cd site
python3 -m http.server 8080
# dann http://localhost:8080 im Browser öffnen
```

## Veröffentlichen (damit die Familie sie nutzen kann)

Eingerichtet: **GitHub Pages** unter **https://sixtyundsexy.com** (Datei `site/CNAME`). Jeder Push auf `main` veröffentlicht den Ordner `site/` automatisch
(Workflow in `.github/workflows/pages.yml`). Die Seite ist per `noindex` und `robots.txt` von Suchmaschinen ausgenommen.

Alternativen, falls gewünscht:

- **Netlify Drop**: https://app.netlify.com/drop öffnen, den Ordner `site` hineinziehen, fertig. Die Adresse an die Familie schicken.
- **GitHub Pages**: Inhalt von `site/` in ein Repository, Pages aktivieren.
- **Vercel / Cloudflare Pages**: Ordner `site` als Projekt deployen.

Wichtig: Die Seite muss über `https://` laufen, sonst gibt es keinen Offline-Modus (Service Worker).

## Auf dem iPhone installieren

1. Adresse in **Safari** öffnen.
2. **Teilen** → **„Zum Home-Bildschirm“** → **Hinzufügen**.
3. Das Icon „Thailand 2027“ öffnet die App bildschirmfüllend, auch ohne Internet.

Die gleiche Anleitung steht in der App unter *Mehr → Als App installieren*.

## Plan ändern

`site/data.js` bearbeiten (z. B. Hotel eintragen, Uhrzeit ändern) und neu hochladen.
Bei jeder Änderung in `sw.js` die `VERSION` hochzählen (`th27-v2`, …), damit alle Geräte die neue Version laden.

## Echte App-Store-App (optional)

Wenn irgendwann eine „richtige“ iOS-App gewünscht ist: Der Ordner `site` lässt sich unverändert mit
[Capacitor](https://capacitorjs.com) in ein Xcode-Projekt packen. Dafür braucht es einen Mac mit Xcode und
einen Apple-Developer-Account (99 $/Jahr) – für die Familie ist die PWA-Variante oben der einfachere Weg.

## Fotos

Die Fotos der Orte, Highlights und Hotel-Umgebungen liegen in `site/img/p/` (je `<key>-640.jpg` und `<key>-1200.jpg`).
Sie stammen von Wikimedia Commons (CC BY / CC BY-SA / CC0); Urheber und Lizenz stehen in `site/data.js`
unter `photos` und werden in der App unter **Mehr → Infos → Bildnachweise** angezeigt. Hotelfotos zeigen bewusst
nur die Umgebung, weil die Hotelbilder der Buchungsportale nicht frei verwendbar sind.

Eigene Fotos einbauen (z. B. das echte Hotel):

1. Bild als JPEG in zwei Breiten ablegen: `site/img/p/<key>-640.jpg` und `site/img/p/<key>-1200.jpg`
   (z. B. `magick foto.jpg -resize 1200x\> -quality 74 site/img/p/reddoor-1200.jpg`).
2. In `site/data.js` unter `photos` einen Eintrag ergänzen:
   `reddoor: { cap: "Chiang Mai RedDoor Pool Villa", by: "Paula", lic: "eigenes Foto", page: "" }`.
3. Beim Hotel, Ort oder Tagespunkt `photo: "reddoor"` setzen (bei Tagespunkten geht auch eine Liste: `photo: ["a", "b"]`).
4. `VERSION` in `site/sw.js` hochzählen und pushen.

