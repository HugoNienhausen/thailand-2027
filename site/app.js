/* Thailand 2027 – App-Logik (ohne Framework, ohne Build-Schritt) */
(function () {
  "use strict";
  const T = window.TRIP;
  const IS_ARTIFACT = !!window.IS_ARTIFACT;

  /* ---------- Helfer ---------- */
  const $ = (s, el) => (el || document).querySelector(s);
  const h = (s) => String(s == null ? "" : s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const fmt = (s) => h(s)
    .replace(/\[\[(.+?)\]\]/g, '<span class="hl">$1</span>')
    .replace(/\{\{(.+?)\}\}/g, '<span class="hl hl-p">$1</span>')
    .replace(/\(\((.+?)\)\)/g, '<span class="hl hl-g">$1</span>')
    .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>");
  const mapsUrl = (q) => "https://www.google.com/maps/search/?api=1&query=" + encodeURIComponent(q);
  const euro = (n) => (Math.round(n * 100) / 100).toLocaleString("de-DE", { minimumFractionDigits: n % 1 ? 2 : 0, maximumFractionDigits: 2 }) + " €";
  const WD = ["Sonntag", "Montag", "Dienstag", "Mittwoch", "Donnerstag", "Freitag", "Samstag"];
  const WD2 = ["So", "Mo", "Di", "Mi", "Do", "Fr", "Sa"];
  const MON = ["Januar", "Februar", "März", "April", "Mai", "Juni", "Juli", "August", "September", "Oktober", "November", "Dezember"];
  const parseISO = (s) => { const p = s.split("-").map(Number); return new Date(p[0], p[1] - 1, p[2]); };
  const fmtLong = (iso) => { const d = parseISO(iso); return WD[d.getDay()] + ", " + d.getDate() + ". " + MON[d.getMonth()]; };
  const fmtMid = (iso) => { const d = parseISO(iso); return WD2[d.getDay()] + " " + d.getDate() + ". " + MON[d.getMonth()].slice(0, 3) + "."; };
  const fmtNum = (iso) => { const d = parseISO(iso); return d.getDate() + "." + (d.getMonth() + 1) + "."; };
  const nightsBetween = (a, b) => Math.round((parseISO(b) - parseISO(a)) / 86400000);
  const place = (id) => T.places.find((p) => p.id === id);
  const hotel = (id) => T.hotels.find((x) => x.id === id);
  const flight = (id) => T.flights.find((f) => f.id === id);
  const day = (n) => T.days.find((d) => d.n === n);
  const TZ = { BCN: 1, AUH: 4, BKK: 7, CNX: 7, URT: 7, KBV: 7, SAI: 7, KOS: 7, PNH: 7 };
  const toMin = (t) => { const m = /(\d{1,2}):(\d{2})/.exec(t || ""); return m ? +m[1] * 60 + +m[2] : null; };
  function flightDuration(f) {
    if (!f.dep || !f.arr) return null;
    let d = toMin(f.arr) - toMin(f.dep) - (TZ[f.to] - TZ[f.from]) * 60;
    if (d < 0) d += 1440;
    return Math.floor(d / 60) + " Std. " + (d % 60 ? (d % 60) + " Min." : "");
  }
  function haversine(a, b) {
    const R = 6371, toR = (x) => (x * Math.PI) / 180;
    const dLat = toR(b.lat - a.lat), dLng = toR(b.lng - a.lng);
    const s = Math.sin(dLat / 2) ** 2 + Math.cos(toR(a.lat)) * Math.cos(toR(b.lat)) * Math.sin(dLng / 2) ** 2;
    return 2 * R * Math.asin(Math.sqrt(s));
  }
  const totalKm = Math.round(T.flights.reduce((s, f) => s + haversine(T.airports[f.from], T.airports[f.to]), 0) / 100) * 100;

  const store = {
    get(k, d) { try { const v = localStorage.getItem("th27:" + k); return v == null ? d : JSON.parse(v); } catch (e) { return d; } },
    set(k, v) { try { localStorage.setItem("th27:" + k, JSON.stringify(v)); } catch (e) { /* privat / blockiert */ } }
  };
  const S = {
    group: store.get("group", T.groupSizeDefault),
    done: store.get("done", {}),
    bingo: store.get("bingo", {}),
    bingoLines: store.get("bingoLines", 0),
    pack: store.get("pack", {}),
    packCustom: store.get("packCustom", []),
    food: store.get("food", {}),
    learned: store.get("learned", {}),
    quizBest: store.get("quizBest", null),
    open: store.get("open", {}),
    openCustom: store.get("openCustom", []),
    rates: store.get("rates", null) || Object.assign({}, T.rates),
    budgetOpt: store.get("budgetOpt", {}),
    langTab: store.get("langTab", "thai")
  };
  const save = (k) => store.set(k, S[k]);

  /* ---------- Icons (24x24, Strich) ---------- */
  const I = {
    plane: '<path d="M3 13l8 2 5 6 2-1-2-7 5-3-1-3-6 2-7-4-2 1 5 5-3 1z" fill="currentColor" stroke="none"/>',
    bed: '<path d="M3 18V8M3 12h18v6M3 15h18M7 12V9h5v3"/>',
    utensils: '<path d="M6 3v6M9 3v6M7.5 3v18M6 9a1.5 1.5 0 0 0 3 0M17 3c-2 2-2 7 0 9v9"/>',
    landmark: '<path d="M4 21h16M5 21V11M19 21V11M9 21v-7M15 21v-7M3 11h18L12 3z"/>',
    walk: '<circle cx="13" cy="4" r="1.6"/><path d="M9.5 21l2.5-7M14.5 21l-2-6-2-1.5 1-5 3 1.5 2 3M8.5 13l-1.5 2"/>',
    coffee: '<path d="M4 8h12v6a4 4 0 0 1-4 4H8a4 4 0 0 1-4-4zM16 9h2a2 2 0 0 1 0 4h-2M6 2v2M10 2v2"/>',
    moon: '<path d="M20 14.5A8 8 0 0 1 9.5 4a8 8 0 1 0 10.5 10.5z"/>',
    sun: '<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M2 12h2M20 12h2M5 5l1.5 1.5M17.5 17.5L19 19M5 19l1.5-1.5M17.5 6.5L19 5"/>',
    cocktail: '<path d="M4 3h16l-8 9zM12 12v7M8 21h8"/>',
    leaf: '<path d="M20 4c-8 0-14 6-14 14 8 0 14-6 14-14zM6 18l8-8"/>',
    boat: '<path d="M3 17c2 2 4 2 6 0s4 2 6 0 4 2 6 0M5 14l1-5h12l1 5M12 4v5"/>',
    van: '<path d="M3 16V8h11l4 4h3v4M3 16h2M9 16h6M19 16h2"/><circle cx="7" cy="17" r="2"/><circle cx="17" cy="17" r="2"/>',
    ticket: '<path d="M3 9V6h18v3a2 2 0 0 0 0 4v5H3v-5a2 2 0 0 0 0-4zM9 6v12"/>',
    star: '<path d="M12 3l2.7 5.6 6.1.9-4.4 4.3 1 6.1L12 17l-5.5 2.9 1-6.1L3.2 9.5l6.1-.9z"/>',
    pin: '<path d="M12 22s7-6 7-12a7 7 0 1 0-14 0c0 6 7 12 7 12z"/><circle cx="12" cy="10" r="2.5"/>',
    phone: '<path d="M5 3h4l2 5-2.5 1.5a11 11 0 0 0 6 6L16 13l5 2v4a2 2 0 0 1-2 2A17 17 0 0 1 3 5a2 2 0 0 1 2-2z"/>',
    link: '<path d="M14 4h6v6M20 4l-9 9M19 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1h5"/>',
    check: '<path d="M5 12l4 4L19 6"/>',
    left: '<path d="M15 5l-7 7 7 7"/>',
    right: '<path d="M9 5l7 7-7 7"/>',
    home: '<path d="M3 11l9-8 9 8v10h-6v-6H9v6H3z"/>',
    calendar: '<rect x="3" y="5" width="18" height="16" rx="2"/><path d="M3 10h18M8 3v4M16 3v4"/>',
    map: '<path d="M3 6l6-2 6 2 6-2v14l-6 2-6-2-6 2zM9 4v14M15 6v14"/>',
    game: '<path d="M6 9h12a4 4 0 0 1 4 4v2a3 3 0 0 1-5.5 1.6L15 15H9l-1.5 1.6A3 3 0 0 1 2 15v-2a4 4 0 0 1 4-4zM7 12v3M5.5 13.5h3"/><circle cx="16.5" cy="12.5" r=".9"/><circle cx="18.5" cy="14.5" r=".9"/>',
    more: '<circle cx="5" cy="12" r="1.6"/><circle cx="12" cy="12" r="1.6"/><circle cx="19" cy="12" r="1.6"/>',
    copy: '<rect x="9" y="9" width="11" height="11" rx="2"/><path d="M5 15V5a2 2 0 0 1 2-2h10"/>',
    bag: '<path d="M5 8h14l-1 13H6zM9 8V6a3 3 0 0 1 6 0v2"/>',
    music: '<path d="M9 18V6l11-2v12"/><circle cx="6" cy="18" r="3"/><circle cx="17" cy="16" r="3"/>',
    flower: '<circle cx="12" cy="12" r="2.5"/><path d="M12 3a3 3 0 0 1 0 6 3 3 0 0 1 0-6zM12 15a3 3 0 0 1 0 6 3 3 0 0 1 0-6zM3 12a3 3 0 0 1 6 0 3 3 0 0 1-6 0zM15 12a3 3 0 0 1 6 0 3 3 0 0 1-6 0z"/>',
    bell: '<path d="M6 17V11a6 6 0 0 1 12 0v6l2 2H4zM10 21h4"/>',
    alert: '<circle cx="12" cy="12" r="9"/><path d="M12 8v5M12 16h.01"/>',
    wallet: '<rect x="3" y="6" width="18" height="13" rx="2"/><path d="M16 12h5M3 10h18"/>',
    clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
    luggage: '<rect x="5" y="7" width="14" height="14" rx="2"/><path d="M9 7V4h6v3M5 12h14"/>',
    chat: '<path d="M4 5h16v11H9l-5 4z"/>',
    fire: '<path d="M12 3c1 4 5 5 5 10a5 5 0 0 1-10 0c0-2 1-3 2-4 0 2 1 3 2 3 0-4-1-6 1-9z"/>',
    grid: '<rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/>',
    question: '<circle cx="12" cy="12" r="9"/><path d="M9.5 9.5a2.5 2.5 0 1 1 3.5 2.3c-.7.3-1 .8-1 1.7M12 17h.01"/>',
    share: '<path d="M12 3v12M8 7l4-4 4 4M5 12v8h14v-8"/>',
    sparkle: '<path d="M12 2l1.8 5.2L19 9l-5.2 1.8L12 16l-1.8-5.2L5 9l5.2-1.8z"/>',
    info: '<circle cx="12" cy="12" r="9"/><path d="M12 11v5M12 8h.01"/>',
    boxing: '<path d="M7 10V7a2 2 0 0 1 2-2h7a3 3 0 0 1 3 3v5a4 4 0 0 1-4 4H9a2 2 0 0 1-2-2v-1H5a2 2 0 0 1 0-4z"/>',
    plus: '<path d="M12 5v14M5 12h14"/>',
    x: '<path d="M6 6l12 12M18 6L6 18"/>',
    doc: '<path d="M6 3h8l4 4v14H6zM14 3v4h4M9 13h6M9 17h6"/>'
  };
  const KIND_ICON = { flight: "plane", arrive: "plane", hotel: "bed", meal: "utensils", sight: "landmark", explore: "walk", food: "utensils", cafe: "coffee", rest: "moon", free: "sun", bar: "cocktail", spa: "leaf", market: "bag", activity: "ticket", boat: "boat", transfer: "van", ferry: "boat", nature: "leaf", music: "music", info: "info", sport: "boxing", home: "home" };
  const icon = (n, cls) => '<svg class="ic ' + (cls || "") + '" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' + (I[n] || I.star) + "</svg>";

  /* ---------- Zeit & Reise-Phase ---------- */
  const tripStart = parseISO(T.start);
  const depart = (() => { const m = toMin(T.startTime); const d = new Date(tripStart); d.setMinutes(m); return d; })();
  function dayIndexFor(date) {
    const d0 = new Date(date.getFullYear(), date.getMonth(), date.getDate());
    const n = Math.round((d0 - tripStart) / 86400000) + 1;
    return n >= 1 && n <= T.days.length ? n : null;
  }
  const todayIndex = () => dayIndexFor(new Date());
  function phase() {
    const now = new Date();
    if (todayIndex()) return "during";
    return now < tripStart ? "before" : "after";
  }
  const daysUntil = () => { const n = new Date(); const t0 = new Date(n.getFullYear(), n.getMonth(), n.getDate()); return Math.round((tripStart - t0) / 86400000); };

  /* ---------- Bausteine ---------- */
  const mapBtn = (q, label) => q ? '<a class="btn btn-sm" target="_blank" rel="noopener" href="' + mapsUrl(q) + '">' + icon("pin") + (label || "Karte") + "</a>" : "";
  const linkBtn = (l) => l ? '<a class="btn btn-sm" target="_blank" rel="noopener" href="' + h(l.url) + '">' + icon("link") + "Buchung</a>" : "";
  const phoneBtn = (p) => p ? '<button class="btn btn-sm" type="button" data-act="copy" data-copy="' + h(p) + '">' + icon("phone") + '<span>' + h(p) + "</span></button>" : "";
  const zoneChip = (p) => p ? '<span class="chip chip-zone" style="--zc:' + p.color + '">' + (p.zone ? "Zone " + p.zone : "Stopover") + " · " + h(p.name) + "</span>" : "";
  function costBadge(c) {
    if (!c) return "";
    let s = c.pp != null ? euro(c.pp) + " p.P." : euro(c.total) + " zusammen";
    if (c.note) s += " · " + c.note;
    return '<span class="badge badge-cost">' + icon("wallet") + h(s) + "</span>";
  }
  function flightCard(f) {
    const dur = flightDuration(f);
    return '<div class="flight"><div><b>' + f.from + "</b><small>" + h(T.airports[f.from].city) + (f.dep ? " · " + f.dep : "") + '</small></div>' +
      '<div class="fl-mid">' + icon("plane") + (dur ? "<span>" + dur + "</span>" : "") + '</div>' +
      '<div class="fl-to"><b>' + f.to + "</b><small>" + h(T.airports[f.to].city) + (f.arr ? " · " + f.arr : "") + "</small></div></div>" +
      (f.note ? '<p class="small muted" style="margin-top:6px">' + h(f.note) + "</p>" : "");
  }

  /* ---------- Karte (SVG) ---------- */
  const MAP = { lon0: 96.9, lon1: 107.9, lat0: 5.6, lat1: 20.7, w: 430, h: 606 };
  const px = (lng, lat) => [((lng - MAP.lon0) / (MAP.lon1 - MAP.lon0)) * MAP.w, ((MAP.lat1 - lat) / (MAP.lat1 - MAP.lat0)) * MAP.h];
  const THAILAND = [[99.95,20.45],[100.55,20.15],[100.45,19.55],[101.25,19.55],[101.05,18.35],[101.35,17.55],[102.15,18.15],[102.75,17.95],[103.75,18.35],[104.45,17.65],[104.75,16.55],[105.6,15.65],[105.15,14.4],[103.95,14.35],[102.55,13.6],[102.35,12.75],[102.9,11.7],[102.45,12.15],[101.9,12.6],[100.95,13.0],[100.9,13.5],[100.3,13.45],[100.0,12.6],[99.75,11.5],[99.55,10.5],[99.25,9.3],[99.95,8.55],[100.35,7.6],[100.95,6.75],[101.65,6.45],[102.05,6.2],[101.9,5.75],[101.1,5.65],[100.25,6.45],[99.65,7.1],[99.0,7.9],[98.35,7.75],[98.25,8.6],[98.5,9.6],[98.75,10.6],[99.0,11.3],[99.2,12.3],[99.05,13.1],[98.4,14.0],[98.45,15.2],[98.65,16.1],[98.4,16.9],[97.95,17.8],[97.6,18.5],[97.85,19.3],[98.4,19.7],[98.95,20.05],[99.5,20.1]];
  const CAMBODIA = [[102.45,13.55],[102.95,14.2],[103.55,14.4],[104.6,14.4],[105.2,14.35],[106.0,14.35],[107.0,14.4],[107.55,14.2],[107.6,13.3],[107.5,12.3],[106.6,11.65],[106.2,11.4],[105.85,10.9],[105.35,10.85],[104.95,10.5],[104.45,10.4],[103.95,10.6],[103.55,10.55],[103.15,10.95],[102.95,11.5],[102.75,12.15],[102.4,12.75]];
  const poly = (pts) => pts.map((p, i) => (i ? "L" : "M") + px(p[0], p[1]).map((v) => v.toFixed(1)).join(" ")).join(" ") + "Z";
  function arc(a, b, bend) {
    const [x1, y1] = px(a.lng, a.lat), [x2, y2] = px(b.lng, b.lat);
    const mx = (x1 + x2) / 2, my = (y1 + y2) / 2, dx = x2 - x1, dy = y2 - y1, len = Math.hypot(dx, dy) || 1;
    const cx = mx - (dy / len) * len * bend, cy = my + (dx / len) * len * bend;
    return "M" + x1.toFixed(1) + " " + y1.toFixed(1) + " Q" + cx.toFixed(1) + " " + cy.toFixed(1) + " " + x2.toFixed(1) + " " + y2.toFixed(1);
  }
  const line = (a, b) => { const p = px(a.lng, a.lat), q = px(b.lng, b.lat); return "M" + p[0].toFixed(1) + " " + p[1].toFixed(1) + " L" + q[0].toFixed(1) + " " + q[1].toFixed(1); };
  function renderMap() {
    const P = Object.fromEntries(T.places.map((p) => [p.id, p]));
    const A = T.airports;
    const labels = { bangkok: [-12, -14, "end"], chiangmai: [14, 4, "start"], khaosok: [-14, -8, "end"], railay: [-14, 14, "end"], siemreap: [14, -8, "start"], kohrong: [-14, 12, "end"], kampot: [0, 24, "middle"], phnompenh: [14, 2, "start"] };
    let s = '<svg class="map" viewBox="0 0 ' + MAP.w + " " + MAP.h + '" role="img" aria-label="Routenkarte Thailand und Kambodscha">';
    s += '<defs><pattern id="dots" width="14" height="14" patternUnits="userSpaceOnUse"><g class="dots"><circle cx="1.2" cy="1.2" r="1.2"/></g></pattern></defs>';
    s += '<rect width="100%" height="100%" fill="url(#dots)"/>';
    s += '<path class="land" d="' + poly(THAILAND) + '"/><path class="land" d="' + poly(CAMBODIA) + '"/>';
    const lab = (lng, lat, cls, txt, anchor) => { const q = px(lng, lat); return '<text class="' + cls + '" x="' + q[0].toFixed(0) + '" y="' + q[1].toFixed(0) + '" text-anchor="' + (anchor || "middle") + '">' + txt + "</text>"; };
    s += lab(100.6, 16.3, "clabel", "THAILAND") + lab(105.0, 12.6, "clabel", "KAMBODSCHA") + lab(103.0, 19.4, "clabel", "LAOS") + lab(106.9, 16.8, "clabel", "VIETNAM");
    s += lab(97.0, 11.0, "sea", "Andamanensee", "start") + lab(101.4, 9.6, "sea", "Golf von Thailand");
    // Routen: Luft (gestrichelt orange), Boden/Boot (durchgezogen)
    s += '<path class="route route-air" d="' + arc(P.bangkok, P.chiangmai, 0.18) + '"/>';
    s += '<path class="route route-air" d="' + arc(P.chiangmai, A.URT, -0.14) + '"/>';
    s += '<path class="route" d="' + line(A.URT, P.khaosok) + '"/>';
    s += '<path class="route" d="' + line(P.khaosok, P.railay) + '"/>';
    s += '<path class="route route-air" d="' + arc(P.railay, P.siemreap, -0.22) + '"/>';
    s += '<path class="route route-air" d="' + arc(P.siemreap, A.KOS, 0.16) + '"/>';
    s += '<path class="route" d="' + line(A.KOS, P.kohrong) + '"/>';
    s += '<path class="route" d="' + line(P.kohrong, P.kampot) + '"/>';
    s += '<path class="route" d="' + line(P.kampot, P.phnompenh) + '"/>';
    s += '<path class="route route-air" d="' + arc(P.phnompenh, P.bangkok, 0.12) + '"/>';
    [A.URT, A.KOS].forEach((a) => { const q = px(a.lng, a.lat); s += '<circle class="ap" cx="' + q[0].toFixed(1) + '" cy="' + q[1].toFixed(1) + '" r="3"/>'; });
    T.places.filter((p) => p.zone).forEach((p) => {
      const q = px(p.lng, p.lat), L = labels[p.id] || [12, 4, "start"];
      s += '<a href="#ort-' + p.id + '" aria-label="' + h(p.name) + '"><g class="node"><circle cx="' + q[0].toFixed(1) + '" cy="' + q[1].toFixed(1) + '" r="11" fill="' + p.color + '"/><text x="' + q[0].toFixed(1) + '" y="' + q[1].toFixed(1) + '">' + p.zone + "</text></g>" +
        '<text class="nlabel" x="' + (q[0] + L[0]).toFixed(1) + '" y="' + (q[1] + L[1]).toFixed(1) + '" text-anchor="' + L[2] + '">' + h(p.name) + "</text></a>";
    });
    return s + "</svg>";
  }
  function renderHaul() {
    const A = T.airports, k1 = Math.round(haversine(A.BCN, A.AUH)), k2 = Math.round(haversine(A.AUH, A.BKK));
    return '<svg class="haul" viewBox="0 0 400 90" role="img" aria-label="Langstrecke Barcelona – Abu Dhabi – Bangkok">' +
      '<path class="arc" d="M40 55 Q120 10 200 55"/><path class="arc" d="M200 55 Q280 10 360 55"/>' +
      '<circle cx="40" cy="55" r="6"/><circle cx="200" cy="55" r="6"/><circle cx="360" cy="55" r="6"/>' +
      '<text x="40" y="78" text-anchor="middle">Barcelona</text><text x="200" y="78" text-anchor="middle">Abu Dhabi</text><text x="360" y="78" text-anchor="middle">Bangkok</text>' +
      '<text class="km" x="120" y="24" text-anchor="middle">ca. ' + k1.toLocaleString("de-DE") + ' km</text><text class="km" x="280" y="24" text-anchor="middle">ca. ' + k2.toLocaleString("de-DE") + " km</text></svg>";
  }

  /* ---------- Views ---------- */
  function viewStart() {
    const ph = phase(), ti = todayIndex();
    let cd = "";
    if (ph === "before") {
      cd = '<div class="card-orange countdown"><div class="eyebrow" style="color:rgba(255,255,255,.85)">Countdown</div><div class="cd-title">Noch <span id="cdDays">' + daysUntil() + "</span> Tage bis zum Abflug</div>" +
        '<div class="cd-grid"><div><b id="cd-d">–</b><small>Tage</small></div><div><b id="cd-h">–</b><small>Std.</small></div><div><b id="cd-m">–</b><small>Min.</small></div><div><b id="cd-s">–</b><small>Sek.</small></div></div>' +
        '<p class="small" style="margin-top:10px;opacity:.92">Samstag, 30. Januar 2027 · 21:50 Uhr ab Barcelona</p></div>';
    } else if (ph === "during") {
      const d = day(ti), p = place(d.place);
      cd = '<a class="card-orange countdown" style="display:block;text-decoration:none" href="#tag-' + ti + '"><div class="eyebrow" style="color:rgba(255,255,255,.85)">Heute · Tag ' + ti + " von " + T.days.length + '</div><div class="cd-title">' + h(d.title) + '</div><p style="margin-top:4px">' + h(d.where) + " · " + fmtLong(d.date) + '</p><p class="small" style="margin-top:8px;font-weight:700">Tagesplan öffnen ›</p></a>';
      void p;
    } else {
      cd = '<div class="card-orange countdown"><div class="eyebrow" style="color:rgba(255,255,255,.85)">Nach der Reise</div><div class="cd-title">23 Tage, 2 Länder, 7 Zonen – geschafft.</div><p class="small" style="margin-top:6px">Bingo, Food-Challenge und Quiz bleiben gespeichert.</p></div>';
    }
    const zones = T.places.map((p) => '<a class="zone" href="#ort-' + p.id + '" style="--zc:' + p.color + '"><span class="zone-n">' + (p.zone || "✈") + '</span><span class="zone-k">' + (p.zone ? "Zone " + p.zone : "Stopover") + " · " + h(p.country) + '</span><span class="zone-name">' + h(p.name) + '</span><span class="zone-d">' + h(p.dates) + " · " + p.nights + (p.nights === 1 ? " Nacht" : " Nächte") + "</span></a>").join("");
    return {
      html:
        '<section class="hero-head"><h1>Thailand<span class="yr">2027</span></h1><p class="sub">' + h(T.subtitle) + " · 30. Januar bis 21. Februar</p></section>" +
        '<div class="hero-photo"><img class="photo" src="img/cover.jpg" alt="Wat Arun in Bangkok bei Sonnenuntergang" width="1400" height="1050"><img class="sticker" src="img/sixty.png" alt="Sixty and sexy – Papas 60. Geburtstag"><span class="hero-cap">Wat Arun, Bangkok · Tag 3</span></div>' +
        cd +
        '<div class="stats"><div class="stat"><b>' + T.days.length + '</b><span>Tage</span></div><div class="stat"><b>' + T.flights.length + '</b><span>Flüge</span></div><div class="stat"><b>' + T.hotels.length + '</b><span>Hotels</span></div><div class="stat"><b>' + (totalKm / 1000).toLocaleString("de-DE") + 'k</b><span>km in der Luft</span></div></div>' +
        '<div class="sec"><h2>Die Route</h2><a href="#karte">Große Karte ›</a></div><div class="map-wrap">' + renderMap() + "</div>" +
        '<div class="sec"><h2>Die 7 Zonen</h2><a href="#orte">Alle Orte ›</a></div><div class="zones">' + zones + "</div>" +
        '<div class="sec"><h2>Schnell zur Hand</h2></div><div class="quick">' +
        '<a href="#plan">' + icon("calendar") + "Tagesplan</a><a href=\"#hotels\">" + icon("bed") + "Hotels</a><a href=\"#spiele\">" + icon("game") + "Spiele</a><a href=\"#packliste\">" + icon("luggage") + "Packliste</a><a href=\"#geld\">" + icon("wallet") + "Währungsrechner</a><a href=\"#offen\">" + icon("alert") + "Offene Punkte</a></div>" +
        '<p class="foot">' + h(T.source) + ' · <a href="reiseplan-original.pdf" target="_blank" rel="noopener">Original-PDF öffnen</a></p>',
      mount() {
        if (ph !== "before") return;
        const tick = () => {
          const ms = Math.max(0, depart - new Date());
          const d = Math.floor(ms / 86400000), hh = Math.floor((ms % 86400000) / 3600000), mm = Math.floor((ms % 3600000) / 60000), ss = Math.floor((ms % 60000) / 1000);
          const set = (id, v) => { const el = $("#" + id); if (el) el.textContent = String(v).padStart(2, "0"); };
          set("cd-d", d); set("cd-h", hh); set("cd-m", mm); set("cd-s", ss);
        };
        tick(); timers.push(setInterval(tick, 1000));
      }
    };
  }

  function dayStrip(active) {
    const ti = todayIndex();
    return '<div class="daystrip" id="daystrip">' + T.days.map((d) => {
      const p = place(d.place), dt = parseISO(d.date);
      return '<a class="daychip' + (d.n === active ? " on" : "") + (d.n === ti ? " today" : "") + '" href="#tag-' + d.n + '" style="--zc:' + (p ? p.color : "var(--muted)") + '" aria-label="Tag ' + d.n + '"><small>' + WD2[dt.getDay()] + "</small><b>" + dt.getDate() + "." + (dt.getMonth() + 1) + '</b><span class="dot"></span></a>';
    }).join("") + "</div>";
  }
  function renderItem(d, it, idx, nowMin, isToday) {
    if (it.walk) return '<li class="tl-item tl-walk"><span></span><span class="tl-icon">' + icon("walk") + '</span><div class="tl-body">' + h(it.walk) + "</div></li>";
    if (it.remind) return '<li class="tl-item tl-remind"><span class="tl-time"></span><span class="tl-icon">' + icon("bell") + '</span><div class="tl-body" style="padding-right:10px">' + h(it.remind) + "</div></li>";
    const id = "d" + d.n + "-" + idx, done = !!S.done[id], m = toMin(it.t);
    let cls = "tl-item" + (done ? " is-done" : "");
    if (isToday && m != null && nowMin != null && !done) cls += m < nowMin ? " is-past" : "";
    const f = it.flight ? flight(it.flight) : null;
    let body = '<div class="tl-h">' + fmt(it.h) + "</div>";
    if (it.d) body += '<div class="tl-d">' + fmt(it.d) + "</div>";
    if (f) body += flightCard(f);
    if (it.stops) body += '<ul class="stops">' + it.stops.map((s) => '<li class="stop"><div><b>' + h(s.name) + "</b>" + (s.note ? "<small>" + h(s.note) + "</small>" : "") + "</div>" + mapBtn(s.map, "") + "</li>").join("") + "</ul>";
    const meta = [costBadge(it.cost), it.opt ? '<span class="badge badge-opt">optional</span>' : "", linkBtn(it.link), mapBtn(it.map), phoneBtn(it.phone)].filter(Boolean).join("");
    if (meta) body += '<div class="tl-meta">' + meta + "</div>";
    if (it.tip) body += '<div class="tl-tip"><b>Tipp:</b> ' + h(it.tip) + "</div>";
    body += '<input class="ck tl-check" type="checkbox" id="ck-' + id + '" data-ck="done" data-id="' + id + '"' + (done ? " checked" : "") + ' aria-label="Erledigt">';
    return '<li class="' + cls + '" data-min="' + (m == null ? "" : m) + '"><span class="tl-time">' + h(it.t || "") + '</span><span class="tl-icon">' + icon(KIND_ICON[it.k] || "star") + '</span><div class="tl-body">' + body + "</div></li>";
  }
  function viewTag(n) {
    const d = day(n); if (!d) return viewPlan();
    const p = place(d.place), ti = todayIndex(), isToday = ti === n;
    const now = new Date(), nowMin = now.getHours() * 60 + now.getMinutes();
    const items = d.items.map((it, i) => renderItem(d, it, i, nowMin, isToday)).join("");
    let night = "";
    if (d.night.hotel) { const ho = hotel(d.night.hotel); night = '<div class="night">' + icon("bed") + "<div><b>Übernachtung:</b> " + h(ho.name) + (ho.status === "open" ? ' <span class="badge badge-open">noch offen</span>' : "") + "</div>" + (ho.status === "open" ? "" : mapBtn(ho.map, "")) + "</div>"; }
    else night = '<div class="night">' + icon(d.n === T.days.length ? "home" : "plane") + "<div><b>Übernachtung:</b> " + h(d.night.text) + "</div></div>";
    const prev = d.n > 1 ? '<a class="btn" href="#tag-' + (d.n - 1) + '">' + icon("left") + "Tag " + (d.n - 1) + "</a>" : "<span></span>";
    const next = d.n < T.days.length ? '<a class="btn" href="#tag-' + (d.n + 1) + '">Tag ' + (d.n + 1) + icon("right") + "</a>" : "<span></span>";
    const banner = ti && !isToday ? '<a class="chip chip-today" href="#tag-' + ti + '" style="margin-bottom:10px">Heute: Tag ' + ti + " ›</a>" : "";
    return {
      html: dayStrip(n) + banner +
        '<header class="dayhead"><div class="eyebrow">Tag ' + d.n + " von " + T.days.length + (isToday ? " · Heute" : "") + "</div><h1>" + h(d.title) + '</h1><div class="row">' + zoneChip(p) + '<span class="chip">' + fmtLong(d.date) + "</span></div>" + (p ? "" : '<p class="small muted" style="margin-top:6px">' + h(d.where) + "</p>") + "</header>" +
        '<ul class="tl">' + items + "</ul>" + night +
        '<div class="daynav">' + prev + '<a class="btn btn-ghost" href="#uebersicht">Übersicht</a>' + next + "</div>",
      mount() {
        const strip = $("#daystrip"), on = $(".daychip.on", strip);
        if (strip && on) strip.scrollLeft = on.offsetLeft - strip.clientWidth / 2 + on.offsetWidth / 2;
        if (isToday) { const nxt = Array.from(document.querySelectorAll(".tl-item[data-min]")).find((li) => li.dataset.min !== "" && +li.dataset.min >= nowMin && !li.classList.contains("is-done")); if (nxt) nxt.classList.add("is-next"); }
      }
    };
  }
  const viewPlan = () => viewTag(todayIndex() || 1);
  function viewUebersicht() {
    const ti = todayIndex();
    return {
      html: '<a class="backlink" href="#plan">' + icon("left") + 'Zum Tagesplan</a><div class="eyebrow">Plan</div><h1 class="view-title">Alle 23 Tage</h1><ul class="ov">' +
        T.days.map((d) => { const p = place(d.place), dt = parseISO(d.date), ho = d.night.hotel ? hotel(d.night.hotel) : null;
          return '<li><a href="#tag-' + d.n + '"' + (d.n === ti ? ' class="today"' : "") + '><div class="d"><small>' + WD2[dt.getDay()] + "</small><b>" + dt.getDate() + "." + (dt.getMonth() + 1) + '</b></div><div><div class="t">' + h(d.title) + '</div><div class="w"><span class="pill-dot" style="--zc:' + (p ? p.color : "var(--muted)") + '"></span> ' + h(d.where) + (ho ? " · " + h(ho.name) : d.night.text ? " · " + h(d.night.text) : "") + "</div></div></a></li>"; }).join("") + "</ul>"
    };
  }

  const seg = (on) => '<div class="seg"><a href="#orte"' + (on === "orte" ? ' class="on"' : "") + '>Ziele</a><a href="#hotels"' + (on === "hotels" ? ' class="on"' : "") + '>Hotels</a><a href="#karte"' + (on === "karte" ? ' class="on"' : "") + '>Karte</a></div>';
  function viewOrte() {
    return { html: '<div class="eyebrow">Orte</div><h1 class="view-title">Wo wir hinfahren</h1>' + seg("orte") + '<div class="zones">' +
      T.places.map((p) => '<a class="zone" href="#ort-' + p.id + '" style="--zc:' + p.color + '"><span class="zone-n">' + (p.zone || "✈") + '</span><span class="zone-k">' + (p.zone ? "Zone " + p.zone : "Stopover") + " · " + h(p.country) + '</span><span class="zone-name">' + h(p.name) + '</span><span class="zone-d">' + h(p.tagline) + "</span></a>").join("") + "</div>" };
  }
  function viewOrt(id) {
    const p = place(id); if (!p) return viewOrte();
    const hotels = p.hotels.map((hid) => hotel(hid)).filter(Boolean);
    const days = p.days.map((n) => day(n)).filter(Boolean);
    const spots = []; const seen = {};
    days.forEach((d) => d.items.forEach((it) => {
      const add = (name, q, kind) => { if (!q || seen[q]) return; seen[q] = 1; spots.push({ name, q, kind }); };
      if (it.map && it.k !== "hotel" && it.k !== "transfer") add(it.h.replace(/\[\[|\]\]|\{\{|\}\}|\(\(|\)\)|\*\*/g, ""), it.map, it.k);
      (it.stops || []).forEach((s) => add(s.name, s.map, "stop"));
    }));
    return {
      html: '<a class="backlink" href="#orte">' + icon("left") + 'Alle Orte</a>' +
        '<header class="ort-head" style="--zc:' + p.color + '"><span class="zone-n">' + (p.zone || "✈") + '</span><div class="zone-k">' + (p.zone ? "Zone " + p.zone : "Stopover") + " · " + h(p.country) + "</div><h1>" + h(p.name) + '</h1><div class="meta"><span>' + h(p.dates) + "</span><span>" + p.nights + (p.nights === 1 ? " Nacht" : " Nächte") + "</span></div></header>" +
        '<p class="ort-text">' + h(p.text) + "</p>" +
        '<div class="sec"><h2>Unterkunft</h2></div>' + hotels.map(hotelCard).join("") +
        '<div class="sec"><h2>Programm</h2><a href="#tag-' + days[0].n + '">Zum Tagesplan ›</a></div><ul class="ov">' + days.map((d) => { const dt = parseISO(d.date); return '<li><a href="#tag-' + d.n + '"><div class="d"><small>' + WD2[dt.getDay()] + "</small><b>" + dt.getDate() + "." + (dt.getMonth() + 1) + '</b></div><div><div class="t">' + h(d.title) + '</div><div class="w">' + d.items.filter((it) => it.h && it.k !== "hotel").slice(0, 3).map((it) => it.h.replace(/\[\[|\]\]|\{\{|\}\}|\(\(|\)\)|\*\*/g, "")).join(" · ") + "</div></div></a></li>"; }).join("") + "</ul>" +
        (spots.length ? '<div class="sec"><h2>Essen & Orte</h2></div><ul class="plist">' + spots.map((s) => '<li><span>' + icon(KIND_ICON[s.kind] || "pin") + " " + h(s.name) + "</span>" + mapBtn(s.q, "") + "</li>").join("") + "</ul>" : "") +
        '<div class="sec"><h2>Gut zu wissen</h2></div><div class="card"><p class="small" style="margin-bottom:10px"><b>Wetter:</b> ' + h(p.climate) + '</p><ul class="tips">' + p.tips.map((t) => "<li>" + icon("sparkle") + "<span>" + h(t) + "</span></li>").join("") + "</ul></div>"
    };
  }
  function hotelCard(ho) {
    const p = place(ho.place), n = nightsBetween(ho.checkIn, ho.checkOut);
    return '<div class="card hotel" style="--zc:' + (p ? p.color : "var(--line)") + '"><div class="row" style="justify-content:space-between"><span class="chip chip-zone" style="--zc:' + p.color + '">' + h(p.name) + "</span>" + (ho.status === "open" ? '<span class="badge badge-open">' + icon("alert") + "noch offen</span>" : '<span class="badge badge-ok">' + icon("check") + "im Plan</span>") + "</div><h3>" + h(ho.name) + '</h3><div class="dates"><div>Check-in<b>' + fmtMid(ho.checkIn) + "</b></div><div>Check-out<b>" + fmtMid(ho.checkOut) + '</b></div></div><div class="row"><span class="badge">' + n + (n === 1 ? " Nacht" : " Nächte") + "</span>" + (ho.status === "open" ? mapBtn(ho.map, "Hotels suchen") : mapBtn(ho.map, "Google Maps")) + '<a class="btn btn-sm" href="#tag-' + (p.days.find((dn) => day(dn).date === ho.checkIn) || p.days[0]) + '">' + icon("calendar") + "Tag</a></div></div>";
  }
  function viewHotels() {
    const open = T.hotels.filter((x) => x.status === "open").length;
    return { html: '<div class="eyebrow">Orte</div><h1 class="view-title">Unsere Hotels</h1>' + seg("hotels") + '<p class="lede" style="margin-bottom:12px">' + T.hotels.length + " Unterkünfte, " + (T.hotels.length - open) + " im Plan, " + open + " noch offen.</p>" + T.hotels.map(hotelCard).join("") };
  }
  function viewKarte() {
    return { html: '<div class="eyebrow">Orte</div><h1 class="view-title">Die Route</h1>' + seg("karte") + '<div class="map-wrap">' + renderMap() + "</div>" +
      '<div class="legend">' + T.places.filter((p) => p.zone).map((p) => '<a href="#ort-' + p.id + '" style="--zc:' + p.color + '"><span class="n">' + p.zone + "</span>" + h(p.name) + "<small>" + h(p.dates) + "</small></a>").join("") + "</div>" +
      '<div class="sec"><h2>Langstrecke</h2></div><div class="card">' + renderHaul() + '<p class="small muted" style="margin-top:6px">Hin und zurück über Abu Dhabi. Alle Flüge zusammen: ca. ' + totalKm.toLocaleString("de-DE") + ' km.</p></div><p class="small muted" style="margin-top:12px">Die Karte ist stilisiert; für Navigation die Google-Maps-Buttons im Tagesplan nutzen.</p>' };
  }

  /* ---------- Spiele ---------- */
  function viewSpiele() {
    const bOn = Object.keys(S.bingo).filter((k) => S.bingo[k]).length, fPts = T.food.reduce((s, f) => s + (S.food[f.id] ? f.pts : 0), 0), fMax = T.food.reduce((s, f) => s + f.pts, 0);
    const lAll = T.phrases.thai.length + T.phrases.khmer.length, lOn = Object.keys(S.learned).filter((k) => S.learned[k]).length;
    const g = (href, gc, ic, title, text, pct, prog) => '<a class="game" href="' + href + '" style="--gc:' + gc + '"><span class="gi">' + icon(ic) + "</span><h3>" + title + "</h3><p>" + text + '</p><div class="prog"><i style="width:' + Math.round(pct) + '%"></i></div><p class="small muted">' + prog + "</p></a>";
    return { html: '<div class="eyebrow">Spiele</div><h1 class="view-title">Für unterwegs</h1><p class="lede" style="margin-bottom:14px">Für Wartezeiten, Bootsfahrten und lange Abende. Fortschritt bleibt auf diesem Gerät gespeichert.</p><div class="games">' +
      g("#bingo", "var(--hl-y)", "grid", "Reise-Bingo", "24 Dinge, die uns garantiert passieren.", (bOn / 24) * 100, bOn + " / 24 · " + S.bingoLines + " Bingo" + (S.bingoLines === 1 ? "" : "s")) +
      g("#quiz", "var(--hl-b)", "question", "Quiz", "16 Fragen zu Thailand & Kambodscha.", S.quizBest == null ? 0 : (S.quizBest / T.quiz.length) * 100, S.quizBest == null ? "Noch nicht gespielt" : "Bestes Ergebnis: " + S.quizBest + " / " + T.quiz.length) +
      g("#sprache", "var(--hl-g)", "chat", "Sprach-Trainer", "Thai und Khmer – die wichtigsten Sätze.", (lOn / lAll) * 100, lOn + " / " + lAll + " gelernt") +
      g("#food", "var(--hl-p)", "fire", "Food-Challenge", "20 Gerichte, 3 Mutproben.", (fPts / fMax) * 100, fPts + " / " + fMax + " Punkte") + "</div>" };
  }
  const LINES = (() => { const L = []; for (let r = 0; r < 5; r++) L.push([0, 1, 2, 3, 4].map((c) => r * 5 + c)); for (let c = 0; c < 5; c++) L.push([0, 1, 2, 3, 4].map((r) => r * 5 + c)); L.push([0, 6, 12, 18, 24]); L.push([4, 8, 12, 16, 20]); return L; })();
  const bingoOn = (i) => i === 12 || !!S.bingo[i];
  const bingoWins = () => LINES.filter((l) => l.every(bingoOn));
  function viewBingo() {
    const items = T.bingo.slice(0, 12).concat([T.bingoCenter], T.bingo.slice(12, 24));
    const wins = bingoWins(), winSet = new Set(wins.flat());
    return { html: '<a class="backlink" href="#spiele">' + icon("left") + 'Spiele</a><div class="eyebrow">Spiel</div><h1 class="view-title">Reise-Bingo</h1><p class="lede">Antippen, sobald es passiert ist. Fünf in einer Reihe sind ein Bingo – es zählen Zeilen, Spalten und Diagonalen.</p>' +
      '<div class="bingo" id="bingo">' + items.map((t, i) => '<button type="button" class="bcell' + (i === 12 ? " free" : "") + (bingoOn(i) ? " on" : "") + (winSet.has(i) ? " win" : "") + '" data-act="bingo" data-i="' + i + '"' + (i === 12 ? " disabled" : "") + ' aria-pressed="' + bingoOn(i) + '">' + h(t) + "</button>").join("") + "</div>" +
      '<div class="bingo-banner" id="bingoBanner">' + (wins.length ? '<div class="card-sky"><b>' + wins.length + (wins.length === 1 ? " Bingo" : " Bingos") + "!</b> Weiter geht's – das volle Brett hat 12 Reihen.</div>" : "") + "</div>" +
      '<div class="row" style="margin-top:14px"><button class="btn btn-sm" type="button" data-act="bingo-reset">Zurücksetzen</button></div><div id="confirmBox"></div>' };
  }
  let quiz = null;
  const shuffle = (a) => { const b = a.slice(); for (let i = b.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [b[i], b[j]] = [b[j], b[i]]; } return b; };
  function viewQuiz() {
    if (!quiz) quiz = { i: 0, score: 0, picked: null, opts: shuffle([0, 1, 2, 3]) };
    const q = T.quiz[quiz.i];
    let inner;
    if (quiz.i >= T.quiz.length) {
      const pct = quiz.score / T.quiz.length;
      const txt = pct === 1 ? "Perfekt. Du bist bereit für Angkor." : pct >= 0.7 ? "Stark – Reiseleiter-Niveau." : pct >= 0.4 ? "Solide. Der Rest kommt unterwegs." : "Gut, dass wir eine App haben.";
      inner = '<div class="card" style="text-align:center;padding:24px"><div class="eyebrow">Ergebnis</div><div class="score-big">' + quiz.score + " / " + T.quiz.length + '</div><p style="margin-top:8px">' + txt + "</p>" + (S.quizBest != null ? '<p class="small muted" style="margin-top:4px">Bestes Ergebnis: ' + S.quizBest + "</p>" : "") + '<div class="row" style="justify-content:center;margin-top:14px"><button class="btn btn-primary" type="button" data-act="quiz-restart">Nochmal spielen</button></div></div>';
    } else {
      const answered = quiz.picked != null;
      inner = '<div class="row" style="justify-content:space-between"><span class="eyebrow">Frage ' + (quiz.i + 1) + " von " + T.quiz.length + '</span><span class="badge">' + quiz.score + ' richtig</span></div><div class="prog" style="margin-top:8px"><i style="width:' + ((quiz.i) / T.quiz.length) * 100 + '%"></i></div>' +
        '<div class="quiz-q">' + h(q.q) + '</div><div class="opts">' + quiz.opts.map((oi) => { let cls = "opt"; if (answered) { if (oi === q.c) cls += " right"; else if (oi === quiz.picked) cls += " wrong"; } return '<button type="button" class="' + cls + '" data-act="quiz-pick" data-o="' + oi + '"' + (answered ? " disabled" : "") + ">" + h(q.a[oi]) + "</button>"; }).join("") + "</div>" +
        (answered ? '<div class="explain"><b>' + (quiz.picked === q.c ? "Richtig!" : "Leider nein – richtig ist: " + h(q.a[q.c]) + ".") + "</b> " + h(q.x) + '</div><div class="row" style="margin-top:12px;justify-content:flex-end"><button class="btn btn-primary" type="button" data-act="quiz-next">' + (quiz.i + 1 >= T.quiz.length ? "Ergebnis" : "Weiter") + icon("right") + "</button></div>" : "");
    }
    return { html: '<a class="backlink" href="#spiele">' + icon("left") + 'Spiele</a><div class="eyebrow">Spiel</div><h1 class="view-title">Thailand-&-Kambodscha-Quiz</h1>' + inner };
  }
  let langQuiz = null;
  function viewSprache() {
    const tab = S.langTab, list = T.phrases[tab];
    const tabs = '<div class="seg"><a href="#sprache" data-act="lang" data-tab="thai"' + (tab === "thai" ? ' class="on"' : "") + '>Thai 🇹🇭</a><a href="#sprache" data-act="lang" data-tab="khmer"' + (tab === "khmer" ? ' class="on"' : "") + '>Khmer 🇰🇭</a></div>';
    let body;
    if (langQuiz && langQuiz.tab === tab) {
      if (langQuiz.i >= langQuiz.qs.length) {
        body = '<div class="card" style="text-align:center;padding:24px"><div class="eyebrow">Ergebnis</div><div class="score-big">' + langQuiz.score + " / " + langQuiz.qs.length + '</div><div class="row" style="justify-content:center;margin-top:14px"><button class="btn btn-primary" type="button" data-act="lang-quiz">Nochmal</button><button class="btn" type="button" data-act="lang-cards">Zu den Karten</button></div></div>';
      } else {
        const q = langQuiz.qs[langQuiz.i], answered = langQuiz.picked != null;
        body = '<div class="row" style="justify-content:space-between"><span class="eyebrow">Frage ' + (langQuiz.i + 1) + " von " + langQuiz.qs.length + '</span><span class="badge">' + langQuiz.score + ' richtig</span></div>' +
          '<div class="quiz-q">Was heißt „' + h(list[q.idx].tr) + "“?</div>" + (list[q.idx].orig ? '<p class="muted" style="font-size:1.4rem;margin:-6px 0 12px">' + h(list[q.idx].orig) + "</p>" : "") +
          '<div class="opts">' + q.opts.map((oi) => { let cls = "opt"; if (answered) { if (oi === q.idx) cls += " right"; else if (oi === langQuiz.picked) cls += " wrong"; } return '<button type="button" class="' + cls + '" data-act="lang-pick" data-o="' + oi + '"' + (answered ? " disabled" : "") + ">" + h(list[oi].de) + "</button>"; }).join("") + "</div>" +
          (answered ? '<div class="row" style="margin-top:12px;justify-content:flex-end"><button class="btn btn-primary" type="button" data-act="lang-next">Weiter' + icon("right") + "</button></div>" : "");
      }
    } else {
      body = '<div class="cards">' + list.map((ph, i) => { const k = tab + ":" + i, learned = !!S.learned[k];
        return '<div class="fc' + (learned ? " learned" : "") + '" id="fc-' + i + '"><button class="fc-btn" type="button" data-act="flip" data-i="' + i + '" aria-label="Karte umdrehen"><div class="fc-in"><div class="fc-face"><b>' + h(ph.de) + '</b><small>Antippen zum Umdrehen</small></div><div class="fc-face fc-back"><b>' + h(ph.tr) + "</b>" + (ph.orig ? '<div class="orig">' + h(ph.orig) + "</div>" : "") + (ph.note ? "<small>" + h(ph.note) + "</small>" : "") + '</div></div></button><input class="ck fc-learn" type="checkbox" data-ck="learned" data-id="' + k + '"' + (learned ? " checked" : "") + ' aria-label="Gelernt"></div>'; }).join("") + "</div>" +
        '<div class="row" style="margin-top:16px"><button class="btn btn-primary" type="button" data-act="lang-quiz">' + icon("question") + "Abfragen (8 Fragen)</button></div>";
    }
    return { html: '<a class="backlink" href="#spiele">' + icon("left") + 'Spiele</a><div class="eyebrow">Spiel</div><h1 class="view-title">Sprach-Trainer</h1>' + tabs + body };
  }
  function viewFood() {
    const pts = T.food.reduce((s, f) => s + (S.food[f.id] ? f.pts : 0), 0), max = T.food.reduce((s, f) => s + f.pts, 0);
    return { html: '<a class="backlink" href="#spiele">' + icon("left") + 'Spiele</a><div class="eyebrow">Spiel</div><h1 class="view-title">Food-Challenge</h1><p class="lede">Probiert = Punkt. Mutproben zählen mehr. Wer am Ende die meisten Punkte hat, bestimmt das Restaurant am letzten Abend.</p>' +
      '<div class="card-orange" style="margin:12px 0"><div class="eyebrow" style="color:rgba(255,255,255,.85)">Dein Punktestand</div><div class="cd-title"><span id="foodPts">' + pts + "</span> von " + max + " Punkten</div></div>" +
      '<div class="food-list">' + T.food.map((f) => '<button type="button" class="food' + (S.food[f.id] ? " on" : "") + '" data-act="food" data-id="' + f.id + '" aria-pressed="' + !!S.food[f.id] + '"><span class="em">' + f.emoji + "</span><div><b>" + h(f.name) + "</b><small>" + h(f.where) + (f.note ? " · " + h(f.note) : "") + '</small></div><span class="pts">+' + f.pts + "</span></button>").join("") + "</div>" };
  }

  /* ---------- Mehr ---------- */
  function viewMehr() {
    const item = (href, ic, b, s) => '<a href="' + href + '">' + icon(ic) + "<div><b>" + b + "</b><small>" + s + "</small></div>" + icon("right", "chev") + "</a>";
    return { html: '<div class="eyebrow">Mehr</div><h1 class="view-title">Werkzeuge & Infos</h1><div class="more-list">' +
      item("#packliste", "luggage", "Packliste", "Abhaken, eigene Sachen ergänzen") + item("#geld", "wallet", "Währungsrechner", "Baht, Dollar, Riel, Dirham") + item("#zeit", "clock", "Uhrzeiten", "Barcelona · Bangkok · Abu Dhabi") +
      item("#fluege", "plane", "Flüge", T.flights.length + " Flüge, Online-Check-in-Erinnerungen") + item("#budget", "ticket", "Budget", "Was die Aktivitäten kosten") + item("#offen", "alert", "Offene Punkte", "Was noch zu klären ist") +
      item("#infos", "info", "Gut zu wissen", "Einreise, Geld, Steckdosen, Benehmen") + item("#notfall", "phone", "Notfall", "Notrufnummern & Botschaften") + item("#installieren", "share", "Als App installieren", "Auf den Home-Bildschirm, auch offline") +
      '<a href="reiseplan-original.pdf" target="_blank" rel="noopener">' + icon("doc") + "<div><b>Original-PDF</b><small>Der Reiseplan von Paula (borrador 1)</small></div>" + icon("link", "chev") + "</a></div>" };
  }
  function viewPackliste() {
    const total = T.packing.reduce((s, g) => s + g.items.length, 0) + S.packCustom.length, on = Object.keys(S.pack).filter((k) => S.pack[k]).length;
    const groups = T.packing.map((g, gi) => '<div class="pk-group"><h3>' + h(g.group) + "</h3>" + g.items.map((it, ii) => { const k = gi + ":" + ii, c = !!S.pack[k]; return '<div class="pk' + (c ? " on" : "") + '"><input class="ck" type="checkbox" id="pk-' + k.replace(":", "-") + '" data-ck="pack" data-id="' + k + '"' + (c ? " checked" : "") + '><label for="pk-' + k.replace(":", "-") + '">' + h(it) + "</label></div>"; }).join("") + "</div>").join("");
    const custom = '<div class="pk-group"><h3>Eigene Sachen</h3>' + (S.packCustom.length ? S.packCustom.map((it, i) => { const k = "c:" + i, c = !!S.pack[k]; return '<div class="pk' + (c ? " on" : "") + '"><input class="ck" type="checkbox" id="pk-c-' + i + '" data-ck="pack" data-id="' + k + '"' + (c ? " checked" : "") + '><label for="pk-c-' + i + '">' + h(it) + '</label><button class="x" type="button" data-act="pack-del" data-i="' + i + '" aria-label="Entfernen">' + icon("x") + "</button></div>"; }).join("") : '<p class="small muted">Noch nichts ergänzt.</p>') +
      '<form class="addrow" data-form="pack-add"><input class="txt" id="packNew" type="text" placeholder="z. B. Lieblingskissen" maxlength="60" autocomplete="off"><button class="btn btn-primary" type="submit">' + icon("plus") + "Hinzufügen</button></form></div>";
    return { html: '<a class="backlink" href="#mehr">' + icon("left") + 'Mehr</a><div class="eyebrow">Werkzeug</div><h1 class="view-title">Packliste</h1><div class="prog"><i style="width:' + (total ? (on / total) * 100 : 0) + '%"></i></div><p class="small muted" style="margin-top:6px">' + on + " von " + total + " gepackt</p>" + groups + custom };
  }
  function viewGeld() {
    const R = S.rates;
    return { html: '<a class="backlink" href="#mehr">' + icon("left") + 'Mehr</a><div class="eyebrow">Werkzeug</div><h1 class="view-title">Währungsrechner</h1>' +
      '<div class="card"><div class="money-row"><input class="txt" id="amt" type="number" inputmode="decimal" min="0" step="any" value="100" aria-label="Betrag"><select class="sel" id="cur" aria-label="Währung"><option value="EUR">Euro (EUR)</option><option value="THB">Baht (THB)</option><option value="USD">US-Dollar (USD)</option><option value="KHR">Riel (KHR)</option><option value="AED">Dirham (AED)</option></select></div><div class="money-out" id="moneyOut"></div></div>' +
      '<div class="sec"><h2>Schnell umgerechnet</h2></div><div class="row" id="quickMoney">' + [[100, "THB"], [500, "THB"], [1000, "THB"], [10, "USD"], [20000, "KHR"], [100, "AED"]].map((q) => '<button class="btn btn-sm" type="button" data-act="money-quick" data-a="' + q[0] + '" data-c="' + q[1] + '">' + q[0].toLocaleString("de-DE") + " " + q[1] + "</button>").join("") + "</div>" +
      '<div class="sec"><h2>Kurse (1 €)</h2><button class="btn btn-sm" type="button" data-act="rates-reset">Zurücksetzen</button></div><div class="card"><div class="rates">' + ["THB", "USD", "KHR", "AED"].map((c) => '<label>' + c + '<input class="txt" type="number" inputmode="decimal" step="any" min="0" data-rate="' + c + '" id="rate-' + c + '" value="' + R[c] + '"></label>').join("") + '</div><p class="small muted" style="margin-top:8px">Standardwerte vom ' + h(T.ratesDate) + ". Vor der Reise aktualisieren – die Werte bleiben auf diesem Gerät gespeichert.</p></div>",
      mount() { calcMoney(); } };
  }
  function calcMoney() {
    const amt = parseFloat(($("#amt") || {}).value) || 0, cur = ($("#cur") || {}).value || "EUR", R = Object.assign({ EUR: 1 }, S.rates);
    const inEur = amt / R[cur];
    const out = $("#moneyOut"); if (!out) return;
    const names = { EUR: "Euro", THB: "Baht", USD: "US-Dollar", KHR: "Riel", AED: "Dirham" };
    out.innerHTML = ["EUR", "THB", "USD", "KHR", "AED"].filter((c) => c !== cur).map((c) => { const v = inEur * R[c]; return '<div class="mo"><b>' + v.toLocaleString("de-DE", { maximumFractionDigits: c === "KHR" ? 0 : 2 }) + "</b><small>" + names[c] + " (" + c + ")</small></div>"; }).join("");
  }
  function viewZeit() {
    const zones = [["Barcelona", "Europe/Madrid"], ["Thailand & Kambodscha", "Asia/Bangkok"], ["Abu Dhabi", "Asia/Dubai"]];
    return { html: '<a class="backlink" href="#mehr">' + icon("left") + 'Mehr</a><div class="eyebrow">Werkzeug</div><h1 class="view-title">Uhrzeiten</h1><div class="clocks">' + zones.map((z, i) => '<div class="clock"><small>' + z[0] + '</small><b id="clk-' + i + '">–</b><small id="clkd-' + i + '"></small></div>').join("") + '</div><div class="card" style="margin-top:12px"><p class="small"><b>Zeitverschiebung im Februar:</b> Thailand und Kambodscha sind Barcelona 6 Stunden voraus, Abu Dhabi 3 Stunden. Wenn es zu Hause 12 Uhr mittags ist, ist es in Bangkok 18 Uhr.</p></div>',
      mount() { const f = zones.map((z) => [new Intl.DateTimeFormat("de-DE", { hour: "2-digit", minute: "2-digit", second: "2-digit", timeZone: z[1] }), new Intl.DateTimeFormat("de-DE", { weekday: "long", day: "numeric", month: "long", timeZone: z[1] })]);
        const tick = () => { const n = new Date(); f.forEach((ff, i) => { const a = $("#clk-" + i), b = $("#clkd-" + i); if (a) a.textContent = ff[0].format(n); if (b) b.textContent = ff[1].format(n); }); };
        tick(); timers.push(setInterval(tick, 1000)); } };
  }
  function viewFluege() {
    return { html: '<a class="backlink" href="#mehr">' + icon("left") + 'Mehr</a><div class="eyebrow">Werkzeug</div><h1 class="view-title">Flüge</h1><p class="lede" style="margin-bottom:12px">' + T.flights.length + " Flüge, zusammen ca. " + totalKm.toLocaleString("de-DE") + ' km. Online-Check-in jeweils am Vortag – die Erinnerungen stehen im Tagesplan.</p><div class="stack">' +
      T.flights.map((f) => '<div class="card"><div class="row" style="justify-content:space-between"><span class="eyebrow">Tag ' + f.day + " · " + fmtLong(f.date) + '</span><a class="small" href="#tag-' + f.day + '">Tagesplan ›</a></div>' + flightCard(f) + "</div>").join("") + "</div>" };
  }
  function viewBudget() {
    const rows = []; T.days.forEach((d) => d.items.forEach((it, i) => { if (it.cost) rows.push({ id: "d" + d.n + "-" + i, day: d, it }); }));
    const n = S.group;
    let pp = 0, total = 0;
    const trs = rows.map((r) => { const c = r.it.cost, inc = !r.it.opt || !!S.budgetOpt[r.id];
      const perPerson = c.pp != null ? c.pp : c.total / n, all = c.pp != null ? c.pp * n : c.total;
      if (inc) { pp += perPerson; total += all; }
      return '<tr' + (inc ? "" : ' style="opacity:.5"') + '><td>' + (r.it.opt ? '<input class="ck" type="checkbox" data-ck="budgetOpt" data-id="' + r.id + '"' + (inc ? " checked" : "") + ' aria-label="Einrechnen" style="vertical-align:middle;margin-right:6px">' : "") + '<a href="#tag-' + r.day.n + '" style="color:inherit;text-decoration:none"><b>' + h(r.it.h.replace(/\[\[|\]\]|\{\{|\}\}|\(\(|\)\)|\*\*/g, "").replace(/\s*\(.*?€.*?\)\s*$/, "")) + '</b><br><small class="muted">' + fmtNum(r.day.date) + " · " + h(r.day.where) + (c.note ? " · " + h(c.note) : "") + '</small></a></td><td class="num">' + euro(perPerson) + '</td><td class="num">' + euro(all) + "</td></tr>"; }).join("");
    return { html: '<a class="backlink" href="#mehr">' + icon("left") + 'Mehr</a><div class="eyebrow">Werkzeug</div><h1 class="view-title">Budget</h1><p class="lede">Alle Aktivitäten mit Preis aus dem Reiseplan. Flüge und Hotels sind nicht enthalten. Optionales lässt sich mit dem Häkchen einrechnen.</p>' +
      '<div class="card" style="margin:12px 0"><div class="row" style="justify-content:space-between"><span><b>Wir sind</b></span><span class="stepper"><button type="button" data-act="group" data-d="-1" aria-label="weniger">−</button><b>' + n + '</b><button type="button" data-act="group" data-d="1" aria-label="mehr">+</button></span><span>Personen</span></div></div>' +
      '<div class="tbl-wrap"><table class="tbl"><thead><tr><th>Aktivität</th><th class="num">pro Person</th><th class="num">zusammen</th></tr></thead><tbody>' + trs + '</tbody><tfoot><tr><td>Summe</td><td class="num">' + euro(pp) + '</td><td class="num">' + euro(total) + '</td></tr></tfoot></table></div><p class="small muted" style="margin-top:10px">Nicht im Plan, aber fällig: Angkor-Pass ca. 37 USD p.P. (1 Tag), Kambodscha-E-Visum 30 USD p.P.</p>' };
  }
  function viewOffen() {
    const all = T.openItems.concat(S.openCustom.map((t, i) => ({ id: "c" + i, text: t, src: "custom", ci: i })));
    const open = all.filter((o) => !S.open[o.id]).length;
    return { html: '<a class="backlink" href="#mehr">' + icon("left") + 'Mehr</a><div class="eyebrow">Werkzeug</div><h1 class="view-title">Offene Punkte</h1><p class="lede" style="margin-bottom:10px">' + open + " von " + all.length + ' noch offen. Punkte aus dem Reiseplan und Hinweise der App.</p>' +
      all.map((o) => { const c = !!S.open[o.id]; return '<div class="pk' + (c ? " on" : "") + '"><input class="ck" type="checkbox" id="op-' + o.id + '" data-ck="open" data-id="' + o.id + '"' + (c ? " checked" : "") + '><label for="op-' + o.id + '">' + h(o.text) + (o.src === "app" ? ' <span class="badge" style="margin-left:4px">Hinweis</span>' : "") + "</label>" + (o.src === "custom" ? '<button class="x" type="button" data-act="open-del" data-i="' + o.ci + '" aria-label="Entfernen">' + icon("x") + "</button>" : "") + "</div>"; }).join("") +
      '<form class="addrow" data-form="open-add"><input class="txt" id="openNew" type="text" placeholder="Neuer Punkt" maxlength="120" autocomplete="off"><button class="btn btn-primary" type="submit">' + icon("plus") + "Hinzufügen</button></form>" };
  }
  function viewInfos() {
    const N = T.info, kv = (arr) => '<div class="kv">' + arr.map((e) => "<div><h4>" + h(e.h) + "</h4><p>" + h(e.t) + "</p></div>").join("") + "</div>";
    return { html: '<a class="backlink" href="#mehr">' + icon("left") + 'Mehr</a><div class="eyebrow">Infos</div><h1 class="view-title">Gut zu wissen</h1>' +
      '<div class="sec"><h2>Einreise</h2></div>' + kv(N.entry) + '<div class="sec"><h2>Geld</h2></div>' + kv(N.money) +
      '<div class="sec"><h2>Benehmen</h2></div><div class="card"><ul class="tips">' + N.etiquette.map((t) => "<li>" + icon("sparkle") + "<span>" + h(t) + "</span></li>").join("") + "</ul></div>" +
      '<div class="sec"><h2>Gesundheit</h2></div><div class="card"><ul class="tips">' + N.health.map((t) => "<li>" + icon("sparkle") + "<span>" + h(t) + "</span></li>").join("") + "</ul></div>" +
      '<div class="sec"><h2>Steckdosen</h2></div>' + kv(N.plugs) + '<div class="sec"><h2>Apps für unterwegs</h2></div>' + kv(N.apps) +
      '<div class="sec"><h2>Quellen</h2></div><p class="src">Stand Oktober 2026. ' + N.sources.map((s) => '<a href="' + h(s.url) + '" target="_blank" rel="noopener">' + h(s.label) + "</a>").join(" · ") + "</p>" };
  }
  function viewNotfall() {
    const N = T.info;
    return { html: '<a class="backlink" href="#mehr">' + icon("left") + 'Mehr</a><div class="eyebrow">Infos</div><h1 class="view-title">Notfall</h1><div class="stack">' +
      N.emergency.map((e) => '<div class="card"><h3 style="font-family:var(--font-serif);font-size:1.2rem;margin-bottom:4px">' + h(e.country) + "</h3>" + e.numbers.map((nn) => '<div class="num-row"><span>' + h(nn[0]) + '</span><span class="row"><b>' + nn[1] + "</b>" + (IS_ARTIFACT ? "" : '<a class="btn btn-sm" href="tel:' + nn[1] + '">' + icon("phone") + "Anrufen</a>") + "</span></div>").join("") + "</div>").join("") +
      '<div class="card"><h3 style="font-family:var(--font-serif);font-size:1.2rem;margin-bottom:8px">Botschaften</h3><ul class="plist" style="margin-top:4px">' + N.embassies.map((e) => "<li><span>" + h(e.name) + "</span>" + mapBtn(e.map, "") + "</li>").join("") + "</ul></div>" +
      '<div class="card"><h3 style="font-family:var(--font-serif);font-size:1.2rem;margin-bottom:6px">Wenn etwas passiert</h3><ul class="plain"><li>Pass-Kopie und Versicherungsnummer sind in der Packliste – vorher ins Handy fotografieren.</li><li>Krankenhäuser mit internationalem Standard: Bumrungrad und Bangkok Hospital (Bangkok), Royal Angkor International Hospital (Siem Reap).</li><li>Die Reiseversicherung vor dem Krankenhausbesuch anrufen – sie nennt die Klinik und übernimmt direkt.</li></ul></div></div>' };
  }
  function viewInstallieren() {
    const standalone = window.navigator.standalone === true || (window.matchMedia && window.matchMedia("(display-mode: standalone)").matches);
    return { html: '<a class="backlink" href="#mehr">' + icon("left") + 'Mehr</a><div class="eyebrow">App</div><h1 class="view-title">Als App installieren</h1>' +
      (standalone ? '<div class="card-sky" style="margin-bottom:12px"><b>Schon installiert.</b> Du nutzt die App gerade vom Home-Bildschirm.</div>' : "") +
      (IS_ARTIFACT ? '<div class="card" style="margin-bottom:12px"><p class="small">Diese Vorschau läuft auf claude.ai. Die installierbare Version (mit Offline-Modus) liegt im Ordner <b>site</b> des Projekts und läuft, sobald sie unter einer eigenen Adresse veröffentlicht ist – die Schritte unten gelten dann für alle in der Familie.</p></div>' : "") +
      '<div class="card"><h3 style="font-family:var(--font-serif);font-size:1.2rem;margin-bottom:10px">iPhone & iPad</h3><ol class="steps"><li><span>Diese Seite in <b>Safari</b> öffnen (nicht in Chrome oder Instagram).</span></li><li><span>Unten auf <b>Teilen</b> ' + icon("share") + ' tippen.</span></li><li><span>Nach unten scrollen und <b>„Zum Home-Bildschirm“</b> wählen.</span></li><li><span>Oben rechts auf <b>Hinzufügen</b> tippen. Fertig – das Icon „Thailand 2027“ liegt auf dem Home-Bildschirm und öffnet wie eine App, auch ohne Internet.</span></li></ol></div>' +
      '<div class="card"><h3 style="font-family:var(--font-serif);font-size:1.2rem;margin-bottom:10px">Android</h3><ol class="steps"><li><span>Seite in <b>Chrome</b> öffnen.</span></li><li><span>Oben rechts auf die drei Punkte, dann <b>„App installieren“</b> oder „Zum Startbildschirm hinzufügen“.</span></li></ol></div>' +
      '<div class="card"><h3 style="font-family:var(--font-serif);font-size:1.2rem;margin-bottom:6px">Gut zu wissen</h3><ul class="plain"><li>Häkchen, Bingo, Packliste und Kurse werden nur auf dem jeweiligen Gerät gespeichert.</li><li>Wird der Reiseplan aktualisiert, holt sich die App die neue Version beim nächsten Öffnen mit Internet.</li><li>Google-Maps-Buttons öffnen die Maps-App, Buchungslinks den Browser.</li></ul></div>' };
  }

  /* ---------- Router ---------- */
  const ROUTES = {
    start: viewStart, plan: viewPlan, tag: viewTag, uebersicht: viewUebersicht,
    orte: viewOrte, ort: viewOrt, hotels: viewHotels, karte: viewKarte,
    spiele: viewSpiele, bingo: viewBingo, quiz: viewQuiz, sprache: viewSprache, food: viewFood,
    mehr: viewMehr, packliste: viewPackliste, geld: viewGeld, zeit: viewZeit, fluege: viewFluege, budget: viewBudget, offen: viewOffen, infos: viewInfos, notfall: viewNotfall, installieren: viewInstallieren
  };
  const TAB_OF = { start: "start", plan: "plan", tag: "plan", uebersicht: "plan", orte: "orte", ort: "orte", hotels: "orte", karte: "orte", spiele: "spiele", bingo: "spiele", quiz: "spiele", sprache: "spiele", food: "spiele" };
  let timers = [], lastHash = null;
  function parseHash() {
    const raw = (location.hash || "#start").slice(1);
    const m = /^([a-z]+)(?:-(.+))?$/.exec(raw);
    if (!m || !ROUTES[m[1]]) return { name: "start", arg: null };
    return { name: m[1], arg: m[2] || null };
  }
  function render(keepScroll) {
    timers.forEach(clearInterval); timers = [];
    const r = parseHash();
    const v = r.name === "tag" ? viewTag(+r.arg) : r.name === "ort" ? viewOrt(r.arg) : ROUTES[r.name]();
    const view = $("#view"); view.innerHTML = v.html;
    const tab = TAB_OF[r.name] || "mehr";
    document.querySelectorAll("[data-tab]").forEach((a) => a.classList.toggle("on", a.dataset.tab === tab));
    const ti = todayIndex(), tc = $("#todayChip"); if (tc) { tc.hidden = !ti; if (ti) tc.href = "#tag-" + ti; }
    if (!keepScroll && location.hash !== lastHash) window.scrollTo(0, 0);
    lastHash = location.hash;
    if (v.mount) v.mount();
    document.title = (r.name === "start" ? "" : (($(".view-title") || $(".dayhead h1") || $(".ort-head h1") || {}).textContent || "") + " · ") + "Thailand 2027";
  }
  const rerender = () => render(true);

  /* ---------- Interaktion ---------- */
  let toastT = null;
  function toast(msg) { const t = $("#toast"); if (!t) return; t.textContent = msg; t.classList.add("show"); clearTimeout(toastT); toastT = setTimeout(() => t.classList.remove("show"), 1800); }
  function copyText(s) {
    const done = () => toast("Kopiert: " + s);
    if (navigator.clipboard && navigator.clipboard.writeText) { navigator.clipboard.writeText(s).then(done).catch(() => fallback()); } else fallback();
    function fallback() { try { const ta = document.createElement("textarea"); ta.value = s; ta.setAttribute("readonly", ""); ta.style.position = "fixed"; ta.style.opacity = "0"; document.body.appendChild(ta); ta.select(); document.execCommand("copy"); document.body.removeChild(ta); done(); } catch (e) { toast(s); } }
  }
  function confetti() {
    if (window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const c = document.createElement("canvas"); c.className = "confetti"; document.body.appendChild(c);
    const ctx = c.getContext("2d"); const W = (c.width = window.innerWidth), H = (c.height = window.innerHeight);
    const cols = ["#F05A28", "#FFE86B", "#3C8BD9", "#F9B8CA", "#4CAF50", "#A98BD6"];
    const ps = Array.from({ length: 140 }, () => ({ x: Math.random() * W, y: -20 - Math.random() * H * 0.5, vx: (Math.random() - 0.5) * 3, vy: 2 + Math.random() * 4, r: 4 + Math.random() * 6, c: cols[Math.floor(Math.random() * cols.length)], a: Math.random() * Math.PI, va: (Math.random() - 0.5) * 0.3 }));
    const t0 = performance.now();
    (function frame(t) { ctx.clearRect(0, 0, W, H); ps.forEach((p) => { p.x += p.vx; p.y += p.vy; p.a += p.va; ctx.save(); ctx.translate(p.x, p.y); ctx.rotate(p.a); ctx.fillStyle = p.c; ctx.fillRect(-p.r / 2, -p.r / 2, p.r, p.r * 0.6); ctx.restore(); });
      if (t - t0 < 2600) requestAnimationFrame(frame); else c.remove(); })(t0);
  }
  document.addEventListener("click", (e) => {
    const el = e.target.closest("[data-act]"); if (!el) return;
    const act = el.dataset.act;
    if (act === "copy") { e.preventDefault(); copyText(el.dataset.copy); }
    else if (act === "bingo") { const i = +el.dataset.i; const before = bingoWins().length; S.bingo[i] = !S.bingo[i]; save("bingo"); const after = bingoWins().length; if (after > before) { S.bingoLines = after; save("bingoLines"); confetti(); toast("BINGO!"); } else if (after < S.bingoLines) { S.bingoLines = after; save("bingoLines"); } rerender(); }
    else if (act === "bingo-reset") { const box = $("#confirmBox"); if (box) box.innerHTML = '<div class="card" style="margin-top:10px"><p class="small"><b>Wirklich alle Felder löschen?</b></p><div class="row" style="margin-top:8px"><button class="btn btn-primary btn-sm" type="button" data-act="bingo-reset-yes">Ja, löschen</button><button class="btn btn-sm" type="button" data-act="bingo-reset-no">Abbrechen</button></div></div>'; }
    else if (act === "bingo-reset-yes") { S.bingo = {}; S.bingoLines = 0; save("bingo"); save("bingoLines"); rerender(); toast("Bingo zurückgesetzt"); }
    else if (act === "bingo-reset-no") { const box = $("#confirmBox"); if (box) box.innerHTML = ""; }
    else if (act === "quiz-pick") { if (quiz.picked != null) return; quiz.picked = +el.dataset.o; if (quiz.picked === T.quiz[quiz.i].c) quiz.score++; rerender(); }
    else if (act === "quiz-next") { quiz.i++; quiz.picked = null; quiz.opts = shuffle([0, 1, 2, 3]); if (quiz.i >= T.quiz.length && (S.quizBest == null || quiz.score > S.quizBest)) { S.quizBest = quiz.score; save("quizBest"); } rerender(); }
    else if (act === "quiz-restart") { quiz = null; rerender(); }
    else if (act === "lang") { e.preventDefault(); S.langTab = el.dataset.tab; save("langTab"); langQuiz = null; rerender(); }
    else if (act === "flip") { const fc = el.closest(".fc"); if (fc) fc.classList.toggle("flip"); }
    else if (act === "lang-quiz") { const list = T.phrases[S.langTab]; const idxs = shuffle(list.map((_, i) => i)).slice(0, 8); langQuiz = { tab: S.langTab, i: 0, score: 0, picked: null, qs: idxs.map((idx) => ({ idx, opts: shuffle([idx].concat(shuffle(list.map((_, i) => i).filter((i) => i !== idx)).slice(0, 3))) })) }; rerender(); }
    else if (act === "lang-cards") { langQuiz = null; rerender(); }
    else if (act === "lang-pick") { if (langQuiz.picked != null) return; langQuiz.picked = +el.dataset.o; if (langQuiz.picked === langQuiz.qs[langQuiz.i].idx) langQuiz.score++; rerender(); }
    else if (act === "lang-next") { langQuiz.i++; langQuiz.picked = null; rerender(); }
    else if (act === "food") { const id = el.dataset.id; S.food[id] = !S.food[id]; save("food"); rerender(); if (S.food[id]) { const f = T.food.find((x) => x.id === id); if (f && f.pts >= 3) { confetti(); toast("Mutprobe bestanden: +" + f.pts); } } }
    else if (act === "pack-del") { S.packCustom.splice(+el.dataset.i, 1); save("packCustom"); rerender(); }
    else if (act === "open-del") { S.openCustom.splice(+el.dataset.i, 1); save("openCustom"); rerender(); }
    else if (act === "group") { S.group = Math.min(20, Math.max(1, S.group + +el.dataset.d)); save("group"); rerender(); }
    else if (act === "money-quick") { const a = $("#amt"), c = $("#cur"); if (a && c) { a.value = el.dataset.a; c.value = el.dataset.c; calcMoney(); } }
    else if (act === "rates-reset") { S.rates = Object.assign({}, T.rates); save("rates"); rerender(); toast("Kurse zurückgesetzt"); }
  });
  document.addEventListener("change", (e) => {
    const el = e.target; if (!el.dataset) return;
    if (el.dataset.ck) { const k = el.dataset.ck, id = el.dataset.id; S[k][id] = el.checked; save(k);
      if (k === "done") { const li = el.closest(".tl-item"); if (li) li.classList.toggle("is-done", el.checked); }
      else if (k === "learned") { const fc = el.closest(".fc"); if (fc) fc.classList.toggle("learned", el.checked); }
      else if (k === "pack" || k === "open") { const row = el.closest(".pk"); if (row) row.classList.toggle("on", el.checked); if (k === "pack") { const p = $(".prog i"); const total = T.packing.reduce((s, g) => s + g.items.length, 0) + S.packCustom.length, on = Object.keys(S.pack).filter((x) => S.pack[x]).length; if (p) p.style.width = (on / total) * 100 + "%"; const lab = p && p.parentElement.nextElementSibling; if (lab) lab.textContent = on + " von " + total + " gepackt"; } }
      else if (k === "budgetOpt") rerender();
    }
    if (el.id === "cur") calcMoney();
    if (el.dataset.rate) { const v = parseFloat(el.value); if (v > 0) { S.rates[el.dataset.rate] = v; save("rates"); calcMoney(); } }
  });
  document.addEventListener("input", (e) => { if (e.target.id === "amt") calcMoney(); });
  document.addEventListener("submit", (e) => {
    const f = e.target.closest("[data-form]"); if (!f) return; e.preventDefault();
    if (f.dataset.form === "pack-add") { const inp = $("#packNew"); const v = (inp.value || "").trim(); if (v) { S.packCustom.push(v); save("packCustom"); rerender(); } }
    if (f.dataset.form === "open-add") { const inp = $("#openNew"); const v = (inp.value || "").trim(); if (v) { S.openCustom.push(v); save("openCustom"); rerender(); } }
  });
  window.addEventListener("hashchange", () => render(false));

  /* ---------- Start ---------- */
  function start(data) {
    if (data && data.hash && !location.hash) { try { history.replaceState(null, "", data.hash); } catch (e) { /* egal */ } }
    render(false);
    if (window.claude && window.claude.hot && window.claude.hot.snapshot) window.claude.hot.snapshot(() => ({ hash: location.hash }));
  }
  if (window.claude && window.claude.hot && window.claude.hot.ready) window.claude.hot.ready(start); else start((window.claude && window.claude.hot && window.claude.hot.data) || {});
})();
