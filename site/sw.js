/* Thailand 2027 – Service Worker: App-Hülle offline verfügbar machen. Bei Änderungen VERSION hochzählen. */
const VERSION = "th27-v1";
const SHELL = ["./", "./index.html", "./app.css", "./app.js", "./data.js", "./manifest.webmanifest", "./img/cover.jpg", "./img/sixty.png", "./icons/icon-192.png", "./icons/icon-512.png", "./icons/apple-touch-icon.png", "./icons/favicon-32.png"];
const FONT_CACHE = "th27-fonts";

self.addEventListener("install", (e) => {
  e.waitUntil(caches.open(VERSION).then((c) => c.addAll(SHELL)).then(() => self.skipWaiting()));
});
self.addEventListener("activate", (e) => {
  e.waitUntil(caches.keys().then((keys) => Promise.all(keys.filter((k) => k !== VERSION && k !== FONT_CACHE).map((k) => caches.delete(k)))).then(() => self.clients.claim()));
});
self.addEventListener("fetch", (e) => {
  const req = e.request;
  if (req.method !== "GET") return;
  const url = new URL(req.url);
  // Google Fonts: erst Cache, im Hintergrund aktualisieren
  if (url.hostname === "fonts.googleapis.com" || url.hostname === "fonts.gstatic.com") {
    e.respondWith(caches.open(FONT_CACHE).then(async (c) => {
      const hit = await c.match(req);
      const net = fetch(req).then((res) => { if (res.ok) c.put(req, res.clone()); return res; }).catch(() => hit);
      return hit || net;
    }));
    return;
  }
  if (url.origin !== location.origin) return;
  // Seitenaufrufe: Netz zuerst (damit Updates ankommen), sonst Cache
  if (req.mode === "navigate") {
    e.respondWith(fetch(req).then((res) => { caches.open(VERSION).then((c) => c.put("./index.html", res.clone())); return res; }).catch(() => caches.match("./index.html")));
    return;
  }
  // Alles andere: Cache zuerst, sonst Netz (und merken)
  e.respondWith(caches.match(req).then((hit) => hit || fetch(req).then((res) => { if (res.ok) caches.open(VERSION).then((c) => c.put(req, res.clone())); return res; })));
});
