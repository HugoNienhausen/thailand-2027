/* Thailand 2027 – Reisedaten
   Quelle: "Vorbereitung und Zeitplan für die Thailand-Reise (borrador 1)" (Canva-PDF).
   Alles, was hier steht, kann direkt bearbeitet werden – die App liest nur diese Datei.
   Mini-Markup in Texten:  [[gelb]]  {{rosa}}  ((grün))  **fett**
*/
window.TRIP = {
  title: "Thailand 2027",
  subtitle: "Thailand · Kambodscha · Abu Dhabi",
  tagline: "Papas 60. Geburtstag – 23 Tage, 2 Länder, 7 Zonen",
  start: "2027-01-30",
  end: "2027-02-21",
  startTime: "21:50",
  groupSizeDefault: 6,
  source: "Reiseplan (borrador 1) von Paula, Oktober 2026",

  /* ---------- Zonen / Ziele ---------- */
  places: [
    { id: "bangkok", zone: 1, name: "Bangkok", country: "Thailand", color: "#F05A28", photo: "bangkok",
      lat: 13.7563, lng: 100.5018, dates: "31. Jan – 2. Feb & 19. – 20. Feb", nights: 3,
      hotels: ["mandison", "bangkok2"], days: [2, 3, 4, 21, 22],
      tagline: "Tempel, Chinatown & Rooftop-Cocktails",
      text: "Der Einstieg in die Reise: die großen Tempel am Fluss, die alte Kaufmannsstraße Song Wat Road, abends Street Food in Chinatown und ein Cocktail über den Dächern der Stadt. Am Ende der Reise kommen wir noch einmal für eine Nacht zurück.",
      climate: "Februar: ca. 33 °C am Tag, 24 °C nachts, trocken und heiß.",
      tips: [
        "Großer Palast und Tempel: Schultern und Knie bedecken, Schuhe werden am Eingang ausgezogen.",
        "Wat Pho → Wat Arun: die kleine Fähre am Tha-Tien-Pier bringt uns in 5 Minuten über den Fluss.",
        "Mit Grab oder Bolt (Apps) fahren wir günstig und ohne Verhandeln. Für den Fluss: Chao Phraya Express Boat.",
        "Chinatown heißt auf Thai Yaowarat – die Straße lebt ab 18 Uhr richtig auf."
      ] },
    { id: "chiangmai", zone: 2, name: "Chiang Mai", country: "Thailand", color: "#3C8BD9", photo: "chiangmai",
      lat: 18.7883, lng: 98.9853, dates: "2. – 5. Feb", nights: 3,
      hotels: ["reddoor"], days: [4, 5, 6, 7],
      tagline: "Altstadt-Tempel, Kochkurs & Jazz",
      text: "Die entspannte Stadt im Norden: über 300 Tempel, kühle Abende, der beste Khao Soi des Landes und ein Kochkurs mitten im Dschungel. Abends Nachtmärkte und Jazz am North Gate.",
      climate: "Februar: ca. 32 °C am Tag, aber nachts bis 16 °C – eine leichte Jacke lohnt sich (auch für Doi Suthep).",
      tips: [
        "Rote Sammeltaxis (Songthaew) fahren für wenig Geld hoch zum Doi Suthep.",
        "Im Fah Lanna Spa vorher reservieren, wenn wir die Massage machen wollen.",
        "Viele Khao-Soi-Lokale schließen am Nachmittag – Öffnungszeiten vorher checken.",
        "Zum Long-Neck-Village nur mit Roller, wenn alle sicher fahren – sonst Fahrer buchen."
      ] },
    { id: "khaosok", zone: 3, name: "Khao Sok", country: "Thailand", color: "#4CAF50", photo: "khaosok",
      lat: 8.95, lng: 98.80, dates: "5. – 7. Feb", nights: 2,
      hotels: ["baandin"], days: [7, 8, 9],
      tagline: "Dschungel, Cheow-Lan-See & Elefanten",
      text: "Einer der ältesten Regenwälder der Welt. Bootstour über den smaragdgrünen Cheow-Lan-See mit seinen Kalksteinfelsen, Nachtsafari auf der Suche nach Tieren und ein Tag im Elefantenschutzgebiet. Und mit Glück: die Rafflesia, die größte Blume der Welt.",
      climate: "Februar: ca. 32 °C, schwül; trockenere Zeit, kurze Schauer sind im Regenwald trotzdem möglich.",
      tips: [
        "Dry Bag und wasserdichte Handyhülle für die Bootstour einpacken.",
        "Für die Nachtsafari: feste Schuhe, lange Hose, Stirnlampe, Mückenspray.",
        "Die Rafflesia blüht nur wenige Tage – im Park nach aktuellen Blüten fragen.",
        "Wanderwege in der App AllTrails vorab offline speichern."
      ] },
    { id: "railay", zone: 3, name: "Railay Beach", country: "Thailand", color: "#2A9D8F", photo: "railay",
      lat: 8.0115, lng: 98.8372, dates: "7. – 10. Feb", nights: 3,
      hotels: ["avatar"], days: [9, 10, 11, 12],
      tagline: "Kalksteinfelsen, Inseltouren & Strand",
      text: "Die Halbinsel ist nur per Longtail-Boot erreichbar – keine Straßen, keine Autos. Diamond Cave, der Traumstrand Phra Nang und zwei Bootstage zu den Inseln rund um Krabi.",
      climate: "Februar: ca. 32 °C, Hochsaison, ruhige See – perfekt für Bootstouren.",
      tips: [
        "Railay hat kaum Geldautomaten – genug Bargeld mitnehmen.",
        "Die Affen am Phra Nang Beach klauen alles, was nach Essen aussieht.",
        "Zum Flughafen Krabi: Longtail nach Ao Nang / Ao Nam Mao, dann Taxi (ca. 1 Std. insgesamt).",
        "Riffschuhe und Schnorchel lohnen sich für die Inseltouren."
      ] },
    { id: "siemreap", zone: 4, name: "Siem Reap", country: "Kambodscha", color: "#C9961A", photo: "siemreap",
      lat: 13.3671, lng: 103.8448, dates: "10. – 13. Feb", nights: 3,
      hotels: ["isann"], days: [12, 13, 14, 15],
      tagline: "Angkor Wat bei Sonnenaufgang",
      text: "Das Tor zu Angkor: Sonnenaufgang über dem größten Tempel der Welt, Tuk-Tuk-Tour durch die Tempelanlagen, das schwimmende Dorf Kompong Phluk auf dem Tonle-Sap-See und abends Old Market und Pub Street.",
      climate: "Februar: ca. 33 °C am Tag, morgens angenehme 22 °C – der Sonnenaufgang ist die beste Zeit.",
      tips: [
        "Angkor-Pass nur offiziell kaufen (Angkor Enterprise, Ticket-Office oder online): 37 USD für 1 Tag, 62 USD für 3 Tage. Kinder unter 12 frei.",
        "Am Angkor Wat gilt Kleiderordnung: Knie und Schultern bedeckt, sonst kein Zutritt zur oberen Ebene.",
        "Der Flughafen Siem Reap–Angkor (SAI) liegt ca. 45 km östlich der Stadt – rund eine Stunde Transfer einplanen.",
        "Bezahlt wird fast überall in US-Dollar, Riel gibt es als Wechselgeld."
      ] },
    { id: "kohrong", zone: 5, name: "Koh Rong", country: "Kambodscha", color: "#A98BD6", photo: "kohrong",
      lat: 10.7312, lng: 103.2503, dates: "13. – 16. Feb", nights: 3,
      hotels: ["goldenbeach"], days: [15, 16, 17, 18],
      tagline: "Inselzeit, Sonnenuntergänge & leuchtendes Plankton",
      text: "Drei Tage Strand: weißer Sand, Sonnenuntergang in der Beach-Bar und nachts das leuchtende Plankton im Meer. Hier wird nichts geplant – außer dem Valentinstag.",
      climate: "Februar: ca. 31 °C, Trockenzeit, klares Wasser.",
      tips: [
        "Auf der Insel gibt es kaum Geldautomaten – Bargeld (USD) vorher abheben.",
        "Plankton leuchtet am besten in dunklen Nächten, weit weg von Licht.",
        "Fähre ab Sihanoukville ca. 45 Minuten – Tickets am Hafen oder vorab online.",
        "Riffschuhe gegen Seeigel, Sonnencreme nicht vergessen."
      ] },
    { id: "kampot", zone: 6, name: "Kampot", country: "Kambodscha", color: "#E8788F", photo: "kampot",
      lat: 10.6104, lng: 104.1819, dates: "16. – 18. Feb", nights: 2,
      hotels: ["srelodge"], days: [18, 19, 20],
      tagline: "Pfefferplantage & Flussleben",
      text: "Kleine Stadt am Fluss mit französischem Kolonialflair. Berühmt für den besten Pfeffer der Welt – wir besuchen La Plantation und probieren uns durch.",
      climate: "Februar: ca. 33 °C, trocken.",
      tips: [
        "Abends am Fluss: Sonnenuntergang und Bootsfahrten mit Glühwürmchen.",
        "Kep mit dem Krabbenmarkt ist nur 30 Minuten entfernt – Krabbe mit grünem Kampot-Pfeffer!",
        "Pfeffer aus dem Hofladen ist das beste Mitbringsel."
      ] },
    { id: "phnompenh", zone: 7, name: "Phnom Penh", country: "Kambodscha", color: "#2F9E8F", photo: "phnompenh",
      lat: 11.5564, lng: 104.9282, dates: "18. – 19. Feb", nights: 1,
      hotels: ["amana"], days: [20, 21],
      tagline: "Hauptstadt am Mekong",
      text: "Eine Nacht in der Hauptstadt: Mittagessen, Old Market und ein Abend am Fluss, bevor es zurück nach Bangkok geht.",
      climate: "Februar: ca. 34 °C am Tag, trocken und heiß.",
      tips: [
        "Tuk-Tuks am besten per App (PassApp oder Grab) – Festpreis, kein Verhandeln.",
        "Der Flughafen Techo (KTI) liegt ca. 20 km südlich der Stadt – mehr Zeit für den Weg einplanen.",
        "Riverside und Königspalast lohnen sich, wenn noch Zeit bleibt."
      ] },
    { id: "abudhabi", zone: 0, name: "Abu Dhabi", country: "Vereinigte Arabische Emirate", color: "#C8A27A", photo: "abudhabi",
      lat: 24.4539, lng: 54.3773, dates: "20. – 21. Feb", nights: 1,
      hotels: ["abudhabi"], days: [22, 23],
      tagline: "Stopover: Große Moschee & Qasr Al Watan",
      text: "Eine Nacht auf dem Rückweg. Die Sheikh-Zayed-Moschee gehört zu den schönsten Gebäuden der Welt, der Präsidentenpalast Qasr Al Watan liegt gleich daneben.",
      climate: "Februar: ca. 25 °C am Tag, 15 °C nachts – angenehm.",
      tips: [
        "Moschee: lange Hosen und Ärmel, Frauen mit Kopftuch (Abayas gibt es vor Ort). Eintritt frei, Online-Registrierung empfohlen.",
        "Qasr Al Watan: Ticket vorab online kaufen.",
        "Taxis sind günstig und überall – ideal für den kurzen Stopp."
      ] }
  ],

  /* ---------- Hotels ---------- */
  hotels: [
    { id: "mandison", photo: "bangkok_day", name: "The Mandison Bangkok", place: "bangkok", checkIn: "2027-01-31", checkOut: "2027-02-02", status: "plan", map: "The Mandison Bangkok" },
    { id: "reddoor", photo: "chiangmai_night", name: "Chiang Mai RedDoor Pool Villa", place: "chiangmai", checkIn: "2027-02-02", checkOut: "2027-02-05", status: "plan", map: "Chiang Mai RedDoor Pool Villa" },
    { id: "baandin", photo: "cheow_lan_hotel", name: "Baandin Chiewlarn", place: "khaosok", checkIn: "2027-02-05", checkOut: "2027-02-07", status: "plan", map: "Baandin Chiewlarn Khao Sok" },
    { id: "avatar", photo: "railay_boats", name: "Avatar Railay", place: "railay", checkIn: "2027-02-07", checkOut: "2027-02-10", status: "plan", map: "Avatar Railay Resort" },
    { id: "isann", photo: "siemreap_river", name: "Isann Villas", place: "siemreap", checkIn: "2027-02-10", checkOut: "2027-02-13", status: "plan", map: "Isann Villas Siem Reap" },
    { id: "goldenbeach", photo: "kohrong_hotel", name: "Golden Beach Resort", place: "kohrong", checkIn: "2027-02-13", checkOut: "2027-02-16", status: "plan", map: "Golden Beach Resort Koh Rong" },
    { id: "srelodge", photo: "kampot_river", name: "Sre Lodge", place: "kampot", checkIn: "2027-02-16", checkOut: "2027-02-18", status: "plan", map: "Sre Lodge Kampot" },
    { id: "amana", photo: "phnompenh_river", name: "Amana Hotel and Residences", place: "phnompenh", checkIn: "2027-02-18", checkOut: "2027-02-19", status: "plan", map: "Amana Hotel and Residences Phnom Penh" },
    { id: "bangkok2", name: "Hotel in Bangkok – noch offen", place: "bangkok", checkIn: "2027-02-19", checkOut: "2027-02-20", status: "open", map: "Hotels Bangkok" },
    { id: "abudhabi", name: "Hotel in Abu Dhabi – noch offen", place: "abudhabi", checkIn: "2027-02-20", checkOut: "2027-02-21", status: "open", map: "Hotels Abu Dhabi" }
  ],

  /* ---------- Flüge ---------- */
  airports: {
    BCN: { city: "Barcelona", lat: 41.2974, lng: 2.0833 },
    AUH: { city: "Abu Dhabi", lat: 24.4330, lng: 54.6511 },
    BKK: { city: "Bangkok", lat: 13.6900, lng: 100.7501 },
    CNX: { city: "Chiang Mai", lat: 18.7668, lng: 98.9626 },
    URT: { city: "Surat Thani", lat: 9.1325, lng: 99.1356 },
    KBV: { city: "Krabi", lat: 8.0991, lng: 98.9862 },
    SAI: { city: "Siem Reap", lat: 13.3651, lng: 104.2199 },
    KOS: { city: "Sihanoukville", lat: 10.5797, lng: 103.6370 },
    PNH: { city: "Phnom Penh", lat: 11.26, lng: 104.86 }
  },
  flights: [
    { id: "f1", day: 1, date: "2027-01-30", from: "BCN", to: "AUH", dep: "21:50", arr: null, note: "Umstieg in Abu Dhabi: 1 Std. 25 Min." },
    { id: "f2", day: 2, date: "2027-01-31", from: "AUH", to: "BKK", dep: null, arr: "18:00", note: "Ankunft am 31. Januar (Ortszeit)" },
    { id: "f3", day: 4, date: "2027-02-02", from: "BKK", to: "CNX", dep: "13:45", arr: "15:00" },
    { id: "f4", day: 7, date: "2027-02-05", from: "CNX", to: "URT", dep: "08:00", arr: "10:05" },
    { id: "f5", day: 12, date: "2027-02-10", from: "KBV", to: "SAI", dep: "11:40", arr: "16:00", note: "mit Zwischenstopp" },
    { id: "f6", day: 15, date: "2027-02-13", from: "SAI", to: "KOS", dep: "12:30", arr: "13:35" },
    { id: "f7", day: 21, date: "2027-02-19", from: "PNH", to: "BKK", dep: "10:35", arr: "11:35" },
    { id: "f8", day: 22, date: "2027-02-20", from: "BKK", to: "AUH", dep: "14:40", arr: "19:05" },
    { id: "f9", day: 23, date: "2027-02-21", from: "AUH", to: "BCN", dep: "14:05", arr: "18:35" }
  ],

  /* ---------- Tagesplan ----------
     Item-Felder: t = Uhrzeit/Label, k = Art (flight, hotel, meal, sight, explore, food, cafe, rest, free,
     bar, spa, market, activity, boat, transfer, ferry, nature, music, info, sport, home, arrive),
     h = Titel, d = Beschreibung, map = Google-Maps-Suche, cost = {pp:€, total:€, note}, link = {label,url},
     phone, opt = optional, stops = [{name, note, map}], tip = Tipp aus der App (nicht aus dem PDF),
     walk = Fußweg-Verbinder, remind = Erinnerung */
  days: [
    { n: 1, date: "2027-01-30", place: "transit", where: "Barcelona → Abu Dhabi", title: "Abflug",
      items: [
        { t: "21:50", k: "flight", h: "Flug [[Barcelona → Abu Dhabi]]", d: "Umstieg in Abu Dhabi (1 Std. 25 Min.), dann weiter nach Bangkok. Ankunft am 31. Januar um 18:00 Uhr Ortszeit.", tip: "Thailand Digital Arrival Card (TDAC) spätestens 3 Tage vor Ankunft online ausfüllen." }
      ],
      night: { text: "Im Flugzeug" } },
    { n: 2, date: "2027-01-31", place: "bangkok", where: "Bangkok", title: "Ankunft in Bangkok",
      items: [
        { t: "18:00", k: "arrive", h: "Ankunft in [[Bangkok]]", d: "Landung um 18:00 Uhr Ortszeit (Barcelona: 12:00 Uhr)." },
        { t: "", k: "hotel", h: "Check-in: {{The Mandison Bangkok}}", map: "The Mandison Bangkok" },
        { t: "ab 18:00", k: "free", h: "FREI", d: "Ankommen, duschen, erstes Pad Thai um die Ecke." }
      ],
      night: { hotel: "mandison" } },
    { n: 3, date: "2027-02-01", place: "bangkok", where: "Bangkok", title: "Tempel, Chinatown & Rooftop",
      items: [
        { t: "08:00", k: "meal", h: "Frühstück" },
        { t: "09:30", k: "sight", h: "[[Großer Palast]]", photo: "grand_palace", d: "Königspalast mit dem Tempel des Smaragd-Buddha.", map: "Grand Palace Bangkok", tip: "Kleiderordnung: Schultern und Knie bedeckt." },
        { walk: "ca. 12 Min. zu Fuß" },
        { t: "11:00", k: "sight", h: "[[Wat Pho]]", photo: "wat_pho", d: "Der 46 Meter lange liegende Buddha.", map: "Wat Pho Bangkok" },
        { walk: "ca. 5 Min. – mit der kleinen Fähre über den Fluss (Tha Tien Pier)" },
        { t: "12:30", k: "sight", h: "[[Wat Arun]]", photo: "wat_arun", d: "Der Tempel der Morgenröte am Fluss – das Motiv vom Cover.", map: "Wat Arun Bangkok" },
        { walk: "ca. 38 Min. zu Fuß" },
        { t: "14:00", k: "explore", h: "[[Song Wat Road]] erkunden", d: "Eine coole Straße mit kleinen Läden und Cafés. Wir suchen uns **spontan** etwas zum **Mittagessen** aus.", map: "Song Wat Road Bangkok" },
        { t: "16:00", k: "cafe", h: "**Mango Sticky Rice** bei {{Wanjai Cafe House}}", map: "Wanjai Cafe House Bangkok" },
        { t: "17:00", k: "rest", h: "Pause im Hotel" },
        { t: "19:00", k: "food", h: "Street-Food-Tour durch [[Chinatown]]", photo: "yaowarat", d: "Wir probieren verschiedene Restaurants aus dem Michelin-Guide für Bangkok. Wichtig: Bei jedem Restaurant nur eine **Kleinigkeit essen**, damit wir möglichst viel probieren können!",
          stops: [
            { name: "Khao Gaeng Jek Pui", note: "Berühmt für sein Red Curry (ca. 1,20 €).", map: "Khao Gaeng Jek Pui Bangkok" },
            { name: "Pa Tong Go Savoey", note: "Thailändische Donuts mit Pandan-Custard.", map: "Pa Tong Go Savoey Bangkok" },
            { name: "Nai-Ek Roll Noodles", note: "Reisnudelsuppe mit Schweinerippchen.", map: "Nai Ek Roll Noodles Bangkok" },
            { name: "Ann Guay Tiew Kua Gai", note: "Gebratene Nudeln mit Hähnchen – typisch thailändisches Comfort Food.", map: "Ann Guay Tiew Kua Gai Bangkok" }
          ] },
        { t: "23:00", k: "bar", h: "Rooftop-Cocktails", d: "{{Akara Sky Hanuman Bangkok}} – Cocktails mit Aussicht auf Bangkok.", map: "Akara Sky Hanuman Bangkok" },
        { remind: "Check-in für den Flug nach Chiang Mai" }
      ],
      night: { hotel: "mandison" } },
    { n: 4, date: "2027-02-02", place: "chiangmai", where: "Bangkok → Chiang Mai", title: "Auf in den Norden",
      items: [
        { t: "13:45", k: "flight", h: "Flug [[Bangkok → Chiang Mai]]", d: "Ankunft um 15:00 Uhr.", flight: "f3" },
        { t: "", k: "hotel", h: "Check-in: {{Chiang Mai RedDoor Pool Villa}}", map: "Chiang Mai RedDoor Pool Villa" },
        { t: "16:30", k: "sight", h: "Altstadt von [[Chiang Mai]]", photo: "thaphae", d: "Durch die Altstadt spazieren und die wichtigsten Tempel besuchen:",
          stops: [
            { name: "Wat Chiang Man", note: "Der älteste Tempel der Stadt.", map: "Wat Chiang Man" },
            { name: "Wat Sri Suphan", note: "Der Silbertempel.", map: "Wat Sri Suphan Chiang Mai" },
            { name: "Wat Chedi Luang", note: "Riesiger Chedi mitten in der Altstadt.", map: "Wat Chedi Luang" }
          ] },
        { t: "19:00", k: "spa", h: "Massage (wer Lust hat)", d: "Eine Empfehlung wäre das {{Fah Lanna Spa}}, kostet ca. 25 € pro Person und die Bewertungen sind mega. Ist ein richtig schönes Luxus-Spa. Sonst gibt's auf der Straße auch Massagen für ca. 16 €. Können wir uns ja noch überlegen!", opt: true, cost: { pp: 25, note: "Spa, optional" }, map: "Fah Lanna Spa Chiang Mai" },
        { t: "20:00", k: "food", h: "Street-Food-Tour und Nachtmärkte", d: "Wir starten unsere eigene kulinarische Tour durch Chiang Mai mit verschiedenen Street-Food-Ständen und Nachtmärkten.",
          stops: [
            { name: "Stopp 1: Neng Roasted Pork", note: "very very worth it", map: "Neng Earthen Jar Roast Pork Chiang Mai" },
            { name: "Stopp 2: Chang Phuak Market oder Chiang Mai Gate Market", note: "Zwei Nachtmärkte mit Street Food.", map: "Chang Phuak Market Chiang Mai" }
          ] }
      ],
      night: { hotel: "reddoor" } },
    { n: 5, date: "2027-02-03", place: "chiangmai", where: "Chiang Mai", title: "Kochkurs & Doi Suthep",
      items: [
        { t: "08:20–14:00", k: "activity", h: "[[Zapp E Lee Cooking Class]] (5 Stunden)", d: "Ein Kochkurs mitten im Dschungel für 36 € pro Person. Inklusive: kostenloser Transfer (innerhalb der Altstadt), Besuch eines lokalen Marktes, wir kochen 5 Gerichte unserer Wahl, alle Rezepte bekommen wir danach mit Fotos und Anleitungen zugeschickt.", cost: { pp: 36 }, map: "Zapp E Lee Cooking Class Chiang Mai" },
        { t: "15:00", k: "rest", h: "Zurück zum Hotel", d: "Wer Lust hat, kann noch zu {{KUMO Matcha}} gehen und eine kleine Kaffeepause machen, bevor wir zum Tempel fahren.", map: "KUMO Matcha Chiang Mai" },
        { t: "18:00", k: "sight", h: "[[Wat Phra That Doi Suthep]]", photo: "doi_suthep", d: "Der Bergtempel über der Stadt – Sonnenuntergang über Chiang Mai. Eintritt ca. 0,80 € pro Person.", cost: { pp: 0.8 }, map: "Wat Phra That Doi Suthep", tip: "Rund 300 Stufen die Naga-Treppe hoch. Abends wird es hier oben kühl." },
        { t: "21:00", k: "meal", h: "Abendessen bei {{Khao Soi Lung Prakit Kad Kom}}", d: "Sehr bekannt für seinen Khao Soi.", map: "Khao Soi Lung Prakit Kad Kom Chiang Mai", tip: "Öffnungszeiten checken – viele Khao-Soi-Lokale schließen nachmittags." }
      ],
      night: { hotel: "reddoor" } },
    { n: 6, date: "2027-02-04", place: "chiangmai", where: "Chiang Mai", title: "Long Neck Village & Jazz",
      items: [
        { t: "08:30", k: "meal", h: "Frühstück (viel)" },
        { t: "09:30", k: "activity", h: "[[Long Neck Tribe Village]]", photo: "long_neck", d: "Ca. 50 Minuten mit dem Motorrad vom Hotel entfernt.", map: "Long Neck Village Chiang Mai" },
        { t: "14:00", k: "meal", h: "Mittagessen bei {{Yook Samai}} (muy importante)", d: "Sehr empfehlenswert, dort gibt es angeblich die besten Curry-Nudeln.", map: "Yook Samai Chiang Mai" },
        { t: "14:00–21:00", k: "free", h: "Freizeit", d: "Restaurant-Tipp: {{Kai Yang Cheng Doy}} – bekannt für gegrilltes Hähnchen.", map: "Kai Yang Cheng Doy Chiang Mai" },
        { t: "21:00", k: "music", h: "Jazz Night: {{North Gate Jazz Co-Op}}", d: "Die bekannteste Jazz-Bar der Stadt, direkt am alten Nordtor.", map: "North Gate Jazz Co-Op Chiang Mai" },
        { remind: "Check-in für den Flug nach Surat Thani" }
      ],
      night: { hotel: "reddoor" } },
    { n: 7, date: "2027-02-05", place: "khaosok", where: "Chiang Mai → Surat Thani → Khao Sok", title: "Ab in den Dschungel",
      items: [
        { t: "08:00", k: "flight", h: "Flug [[Chiang Mai → Surat Thani]]", d: "Ankunft um 10:05 Uhr.", flight: "f4" },
        { t: "", k: "hotel", h: "Check-in: {{Baandin Chiewlarn}}", map: "Baandin Chiewlarn Khao Sok" },
        { t: "12:00", k: "nature", h: "[[Khao Sok Nationalpark]]", photo: "khaosok_jungle", d: "Einer der ältesten Regenwälder der Welt.", map: "Khao Sok National Park" },
        { t: "15:00", k: "boat", h: "Bootstour auf dem [[Cheow-Lan-See]]", photo: "cheow_lan_boat", d: "Bootstour: 66 € alle zusammen, plus Nationalpark-Gebühr 340 THB pro Person (ca. 54 € alle zusammen). Für Wanderungen können wir die App AllTrails nutzen, um passende Routen zu finden.", cost: { total: 66, note: "+ Parkgebühr 340 THB p.P. (ca. 54 € zusammen)" }, link: { label: "Cheow Lan Prebirth Tour | Booking", url: "https://www.cheowlanprebirthtour.com/booking?product_id=3" }, phone: "+66 93 740 8911", map: "Cheow Lan Lake Pier Khao Sok" },
        { t: "17:00", k: "free", h: "FREI" },
        { t: "20:00", k: "nature", h: "Nachtsafari (31,80 € p.P.)", d: "Wir machen eine geführte Tour durch den Dschungel und suchen nach nachtaktiven Tieren und Reptilien.", cost: { pp: 31.8 }, link: { label: "Khao Sok Night Trek | Guided Rainforest Walk After Dark", url: "https://www.khaosoktravel.com/khao-sok-night-trekking" }, phone: "+66 62 424 9832" }
      ],
      night: { hotel: "baandin" } },
    { n: 8, date: "2027-02-06", place: "khaosok", where: "Khao Sok", title: "Elefanten & die größte Blume der Welt",
      items: [
        { t: "09:00", k: "nature", h: "[[Elefantenschutzgebiet]] (26,50 € p.P.)", photo: "elephant", d: "Wir besuchen ein Elefantenschutzgebiet und können die Elefanten füttern und mit ihnen Zeit verbringen.", cost: { pp: 26.5 }, link: { label: "Elephant Bathing in Khao Sok | Hands-On Elephant Experience", url: "https://www.khaosoktravel.com/khao-sok-elephant-bathing" }, phone: "+66 62 424 9832" },
        { t: "Danach", k: "nature", h: "Auf der Suche nach der ((Rafflesia))", photo: "rafflesia", d: "Die größte Blume der Welt!!! Bis zu einem Meter Durchmesser – und sie riecht nach verwesendem Fleisch.", tip: "Sie blüht nur wenige Tage. Im Park oder im Hotel fragen, ob gerade eine blüht." }
      ],
      night: { hotel: "baandin" } },
    { n: 9, date: "2027-02-07", place: "railay", where: "Khao Sok → Railay Beach", title: "Ans Meer",
      items: [
        { t: "10:00", k: "transfer", h: "Transfer von Khao Sok nach [[Railay Beach]]", d: "Jacob gibt uns Bescheid, wie genau wir hinkommen.", tip: "Railay ist nur per Longtail-Boot erreichbar (ab Ao Nang oder Ao Nam Mao)." },
        { t: "", k: "hotel", h: "Check-in: {{Avatar Railay}}", map: "Avatar Railay Resort" },
        { t: "15:00", k: "nature", h: "[[Diamond Cave]]", d: "Wir erkunden die Höhle und machen eine kleine Wanderung (Jacob).", map: "Diamond Cave Railay" },
        { t: "Danach", k: "explore", h: "[[Phra Nang Beach]]", photo: "phra_nang", d: "Zum Strand gehen und die Gegend erkunden.", map: "Phra Nang Cave Beach Railay", tip: "Achtung Affen – nichts Essbares offen tragen." },
        { remind: "Noch offen: Bootstour suchen (Ao Nang, Phi Phi, Diamond Cave)" }
      ],
      night: { hotel: "avatar" } },
    { n: 10, date: "2027-02-08", place: "railay", where: "Railay Beach", title: "4-Island-Tour",
      items: [
        { t: "08:30", k: "meal", h: "Aufstehen und Frühstück" },
        { t: "10:00–16:00", k: "boat", h: "Premium [[4-Island-Tour]] mit dem Longtail-Boot (32 € p.P.)", photo: "four_islands", d: "Wir machen eine ca. 6-stündige Bootstour zu vier Inseln, inklusive Mittagessen.", cost: { pp: 32 }, link: { label: "Krabi: Premium 4-Island Day Trip by Long-tail Boat with Lunch", url: "https://www.getyourguide.com/en-gb/ao-nang-l89867/krabi-premium-4-island-day-trip-by-long-tail-boat-t746660" } },
        { t: "ab 16:00", k: "free", h: "FREI", d: "Zurück nach Railay, entspannen und den restlichen Nachmittag am Strand genießen." }
      ],
      night: { hotel: "avatar" } },
    { n: 11, date: "2027-02-09", place: "railay", where: "Railay Beach", title: "Hong Islands",
      items: [
        { t: "07:00", k: "meal", h: "Aufstehen und Frühstück" },
        { t: "09:00–15:00", k: "boat", h: "[[Hong-Islands-Tour]] mit dem Speedboat (30 € p.P.)", photo: "hong_islands", d: "Wir machen einen ca. 6-stündigen Ausflug zu den Hong Islands, inklusive Mittagessen.", cost: { pp: 30 }, link: { label: "Krabi: Hong Islands Day Trip by Speedboat with Lunch", url: "https://www.getyourguide.com/en-gb/krabi-l2174/krabi-hong-islands-day-trip-by-speedboat-with-lunch-t144153/" } },
        { t: "ab 15:00", k: "free", h: "FREI", d: "Zurück nach Railay und den restlichen Nachmittag am Strand entspannen." },
        { remind: "Check-in für den Flug nach Siem Reap" }
      ],
      night: { hotel: "avatar" } },
    { n: 12, date: "2027-02-10", place: "siemreap", where: "Railay → Siem Reap", title: "Willkommen in Kambodscha",
      items: [
        { t: "11:40", k: "flight", h: "Flug [[Krabi → Siem Reap]]", d: "Wir fliegen um 11:40 Uhr vom Flughafen Krabi nach Siem Reap und kommen um 16:00 Uhr an (mit Zwischenstopp).", flight: "f5", tip: "Von Railay zum Flughafen ca. 1 Std. (Longtail + Taxi) – früh los. E-Visum und e-Arrival für Kambodscha vorher erledigen." },
        { t: "", k: "hotel", h: "Check-in: {{Isann Villas}}", map: "Isann Villas Siem Reap" },
        { t: "18:00", k: "explore", h: "Spaziergang durch [[Siem Reap]] und FREI" },
        { t: "20:00", k: "meal", h: "Abendessen im ម្ចាស់ដើមជ្រូកអាំងទឹកឃ្មុំ", d: "Khmer-Lokal für Grillschwein mit Honig (der Name heißt ungefähr genau das).", map: "ម្ចាស់ដើមជ្រូកអាំងទឹកឃ្មុំ Siem Reap" }
      ],
      night: { hotel: "isann" } },
    { n: 13, date: "2027-02-11", place: "siemreap", where: "Siem Reap", title: "Angkor Wat bei Sonnenaufgang",
      items: [
        { t: "04:00", k: "rest", h: "Aufstehen", d: "Ja, wirklich." },
        { t: "04:30", k: "transfer", h: "Treffpunkt bei [[Krong Siem Reap]] (ca. 5 € p.P.)", d: "Wir treffen unseren Guide für die Tuk-Tuk-Tour. Frühstück ist inklusive.", cost: { pp: 5 }, map: "Krong Siem Reap" },
        { t: "04:45", k: "sight", h: "Abfahrt nach [[Angkor Wat]]", photo: ["angkor", "ta_prohm"], d: "Wir schauen uns Angkor Wat bei Sonnenaufgang an und erkunden die Tempelanlagen.", link: { label: "Tour combinado de 1 día de Angkor Wat al amanecer en tuk tuk", url: "https://www.getyourguide.com/es-es/siem-reap-l274/siem-reap-tour-de-3-dias-por-angkor-wat-y-un-pueblo-flotante-t1155181" }, map: "Angkor Wat", tip: "Angkor-Pass (37 USD, 1 Tag) nur bei Angkor Enterprise kaufen. Knie und Schultern bedeckt. Der Link im PDF zeigt auf eine 3-Tages-Tour – bitte prüfen." },
        { t: "19:00", k: "market", h: "[[Old Market]] erkunden", map: "Old Market Siem Reap" },
        { t: "20:00", k: "meal", h: "Abendessen im {{Sambo Khmer & Thai Restaurant}}", map: "Sambo Khmer & Thai Restaurant Siem Reap" },
        { t: "22:00", k: "bar", h: "[[Pub Street]]", photo: "pub_street", d: "Die Partymeile von Siem Reap.", map: "Pub Street Siem Reap" }
      ],
      night: { hotel: "isann" } },
    { n: 14, date: "2027-02-12", place: "siemreap", where: "Siem Reap", title: "Schwimmendes Dorf Kompong Phluk",
      items: [
        { t: "07:00", k: "meal", h: "Frühstück" },
        { t: "08:30–13:30", k: "boat", h: "Ausflug zum schwimmenden Dorf [[Kompong Phluk]] (21 € p.P.)", photo: "kompong_phluk", d: "Wir machen eine ca. 5-stündige Tour und erkunden das schwimmende Dorf auf dem Tonle-Sap-See.", cost: { pp: 21 }, link: { label: "Desde Siem Reap: tour de medio día por el pueblo flotante de Kompong Phluk", url: "https://www.getyourguide.com/es-es/siem-reap-l274/desde-siem-reap-tour-de-medio-dia-por-el-pueblo-flotante-de-kompong-phluk-t164625/" }, map: "Kompong Phluk" },
        { t: "17:00", k: "free", h: "FREI" },
        { remind: "Check-in für den Flug nach Sihanoukville" }
      ],
      night: { hotel: "isann" } },
    { n: 15, date: "2027-02-13", place: "kohrong", where: "Siem Reap → Sihanoukville → Koh Rong", title: "Auf die Insel",
      items: [
        { t: "12:30", k: "flight", h: "Flug [[Siem Reap → Sihanoukville]]", d: "Wir landen um 13:35 Uhr.", flight: "f6" },
        { t: "Danach", k: "ferry", h: "Fähre nach [[Koh Rong]]", d: "Vom Hafen in Sihanoukville mit der Schnellfähre auf die Insel.", map: "Sihanoukville Ferry Pier Koh Rong" },
        { t: "", k: "hotel", h: "Check-in: {{Golden Beach Resort}}", map: "Golden Beach Resort Koh Rong" },
        { t: "17:00", k: "rest", h: "Entspannen im Hotel" }
      ],
      night: { hotel: "goldenbeach" } },
    { n: 16, date: "2027-02-14", place: "kohrong", where: "Koh Rong", title: "Inselzeit (und Valentinstag)",
      items: [
        { t: "Nachmittag", k: "free", h: "Aktivitäten im Hotel" },
        { t: "Abends", k: "bar", h: "Sonnenuntergang bei {{Koh Rong Sunset & Bar}}", map: "Koh Rong Sunset Bar" }
      ],
      night: { hotel: "goldenbeach" } },
    { n: 17, date: "2027-02-15", place: "kohrong", where: "Koh Rong", title: "Royal Beach & leuchtendes Plankton",
      items: [
        { t: "Vormittags", k: "explore", h: "[[Royal Beach]]", photo: "royal_beach", map: "Royal Beach Koh Rong" },
        { t: "Abends", k: "nature", h: "Biolumineszierendes ((Plankton))", d: "Suchen auf Google Maps nach „Phytoplancton bioluminescent“. Von dort fahren Boote raus, mit denen wir das leuchtende Plankton im Meer beobachten können.", map: "Phytoplancton bioluminescent Koh Rong", tip: "Je dunkler die Nacht, desto besser leuchtet es." }
      ],
      night: { hotel: "goldenbeach" } },
    { n: 18, date: "2027-02-16", place: "kampot", where: "Koh Rong → Kampot", title: "Zurück aufs Festland",
      items: [
        { t: "Fähre + Van", k: "ferry", h: "Fahrt nach [[Kampot]]", d: "Mit der Fähre zurück nach Sihanoukville, dann mit dem Van nach Kampot." },
        { t: "", k: "hotel", h: "Check-in: {{Sre Lodge}}", map: "Sre Lodge Kampot" },
        { t: "Danach", k: "rest", h: "Ankommen und entspannen" }
      ],
      night: { hotel: "srelodge" } },
    { n: 19, date: "2027-02-17", place: "kampot", where: "Kampot", title: "Pfefferplantage",
      items: [
        { t: "09:00–13:00", k: "activity", h: "Besuch der Pfefferplantage [[La Plantation]] (12 € p.P.)", photo: "kampot_pepper", d: "Wir machen eine ca. 4-stündige Tour durch die Plantage und probieren verschiedene Pfeffersorten.", cost: { pp: 12 }, link: { label: "Kampot: tour por la plantación de pimienta La Plantation con cata", url: "https://www.getyourguide.com/es-es/kampot-l126703/kampot-tour-por-la-plantacion-de-pimienta-la-plantation-con-cata-t1507867/" }, map: "La Plantation Kampot" },
        { t: "18:00", k: "free", h: "FREI" }
      ],
      night: { hotel: "srelodge" } },
    { n: 20, date: "2027-02-18", place: "phnompenh", where: "Kampot → Phnom Penh", title: "In die Hauptstadt",
      items: [
        { t: "10:00", k: "meal", h: "Frühstück" },
        { t: "11:00", k: "transfer", h: "Fahrt mit dem Van nach [[Phnom Penh]]", d: "Ca. 3 Stunden." },
        { t: "", k: "hotel", h: "Check-in: {{Amana Hotel and Residences}}", map: "Amana Hotel and Residences Phnom Penh" },
        { t: "14:00", k: "meal", h: "Mittagessen im {{Restaurant 126}}", map: "Restaurant 126 Phnom Penh" },
        { t: "16:00", k: "market", h: "[[Old Market]] erkunden", d: "Phsar Chas, der alte Markt am Fluss.", map: "Old Market Phsar Chas Phnom Penh" },
        { remind: "Check-in für den Flug nach Bangkok" }
      ],
      night: { hotel: "amana" } },
    { n: 21, date: "2027-02-19", place: "bangkok", where: "Phnom Penh → Bangkok", title: "Zurück nach Bangkok",
      items: [
        { t: "10:35", k: "flight", h: "Flug [[Phnom Penh → Bangkok]]", d: "Ankunft um 11:35 Uhr.", flight: "f7", tip: "Der neue Flughafen Techo liegt ca. 20 km südlich – früh losfahren." },
        { t: "", k: "hotel", h: "Hotel in Bangkok: **noch offen**", d: "Für diese Nacht steht im Plan noch kein Hotel." },
        { t: "17:00", k: "sport", h: "Muay-Thai-Boxen im [[Rajadamnern Stadium]]? (27 € p.P.)", photo: "rajadamnern", d: "Noch nicht entschieden.", opt: true, cost: { pp: 27, note: "optional" }, map: "Rajadamnern Stadium Bangkok" },
        { t: "Abends", k: "meal", h: "Abendessen: {{Thipsamai}}", d: "Das berühmteste Pad Thai der Stadt.", map: "Thipsamai Pad Thai Bangkok" }
      ],
      night: { hotel: "bangkok2" } },
    { n: 22, date: "2027-02-20", place: "abudhabi", where: "Bangkok → Abu Dhabi", title: "Stopover in Abu Dhabi",
      items: [
        { t: "14:40", k: "flight", h: "Flug [[Bangkok → Abu Dhabi]]", d: "Ankunft um 19:05 Uhr Ortszeit.", flight: "f8" },
        { t: "", k: "hotel", h: "Hotel in Abu Dhabi: **noch offen**" },
        { t: "Ideen", k: "sight", h: "Was wir in Abu Dhabi anschauen können", photo: "abudhabi",
          stops: [
            { name: "Sheikh Zayed Grand Mosque", note: "Eine der größten Moscheen der Welt – abends beleuchtet.", map: "Sheikh Zayed Grand Mosque" },
            { name: "Qasr Al Watan", note: "Der Präsidentenpalast, direkt daneben.", map: "Qasr Al Watan" }
          ] }
      ],
      night: { hotel: "abudhabi" } },
    { n: 23, date: "2027-02-21", place: "transit", where: "Abu Dhabi → Barcelona", title: "Heimflug",
      items: [
        { t: "14:05", k: "flight", h: "Flug [[Abu Dhabi → Barcelona]]", d: "Ankunft um 18:35 Uhr.", flight: "f9" },
        { t: "18:35", k: "home", h: "Willkommen zu Hause", d: "23 Tage, 2 Länder, 7 Zonen – und ein 60. Geburtstag." }
      ],
      night: { text: "Zu Hause" } }
  ],

  /* ---------- Offene Punkte (aus dem PDF + Hinweise der App) ---------- */
  openItems: [
    { id: "o1", text: "Hotel in Bangkok für die Nacht 19. → 20. Februar festlegen", src: "pdf" },
    { id: "o2", text: "Hotel in Abu Dhabi (20. → 21. Februar) buchen", src: "pdf" },
    { id: "o3", text: "Bootstour ab Railay suchen: Ao Nang, Phi Phi, Diamond Cave", src: "pdf" },
    { id: "o4", text: "Muay Thai im Rajadamnern Stadium am 19.2. – ja oder nein? (27 € p.P.)", src: "pdf" },
    { id: "o5", text: "Massage in Chiang Mai: Fah Lanna Spa (ca. 25 €) oder auf der Straße (ca. 16 €)?", src: "pdf" },
    { id: "o6", text: "Transfer Khao Sok → Railay am 7.2.: Jacob gibt Bescheid", src: "pdf" },
    { id: "o7", text: "Angkor-Buchung prüfen: Text sagt 1-Tages-Tour bei Sonnenaufgang, der Link zeigt auf eine 3-Tages-Tour mit schwimmendem Dorf", src: "app" },
    { id: "o8", text: "Angkor-Pass kaufen (37 USD p.P. für 1 Tag) – nur offiziell bei Angkor Enterprise", src: "app" },
    { id: "o9", text: "Kambodscha: E-Visum (30 USD p.P.) beantragen und e-Arrival-Karte (gratis, max. 7 Tage vorher) ausfüllen", src: "app" },
    { id: "o10", text: "Thailand: Digital Arrival Card (TDAC) online ausfüllen – max. 3 Tage vor jeder Einreise (31.1. und 19.2.)", src: "app" },
    { id: "o11", text: "Online-Check-ins am Vortag: 1.2. (Chiang Mai), 4.2. (Surat Thani), 9.2. (Siem Reap), 12.2. (Sihanoukville), 18.2. (Bangkok)", src: "pdf" },
    { id: "o12", text: "Öffnungszeiten von Khao Soi Lung Prakit Kad Kom für 21 Uhr prüfen", src: "app" },
    { id: "o13", text: "US-Dollar in kleinen Scheinen für Kambodscha besorgen", src: "app" }
  ],

  /* ---------- Packliste ---------- */
  packing: [
    { group: "Dokumente & Geld", items: ["Reisepass (mind. 6 Monate gültig)", "Kopien / Fotos der Pässe", "Flugtickets & Buchungen (offline gespeichert)", "Kambodscha E-Visum + e-Arrival", "Thailand TDAC ausgefüllt", "Kreditkarte + Bargeld (USD in kleinen Scheinen)", "Reiseversicherung (Nummer notiert)", "Internationaler Führerschein (für Roller)"] },
    { group: "Kleidung", items: ["Leichte, luftige Kleidung", "Tempel-Outfit: Schultern & Knie bedeckt", "Badesachen", "Sonnenhut & Sonnenbrille", "Regenjacke oder Poncho", "Leichte Jacke (Chiang Mai nachts, Flugzeug)", "Feste Schuhe (Nachtsafari)", "Flip-Flops / Sandalen", "Tuch oder Sarong", "Lange Hose & Ärmel für die Moschee"] },
    { group: "Gesundheit", items: ["Mückenspray (DEET)", "Sonnencreme LSF 50", "After-Sun", "Reiseapotheke (Durchfall, Schmerzmittel, Pflaster)", "Desinfektionsgel", "Persönliche Medikamente", "Tabletten gegen Seekrankheit (Boote!)", "Ohrstöpsel"] },
    { group: "Technik", items: ["Steckeradapter (Typ G für Abu Dhabi, A/C für Asien)", "Powerbank", "Ladekabel", "Dry Bag (Boote, Khao Sok)", "Wasserdichte Handyhülle", "Stirnlampe (Nachtsafari, Koh Rong)", "Kopfhörer", "Kamera + Speicherkarten"] },
    { group: "Sonstiges", items: ["Tagesrucksack", "Wiederbefüllbare Trinkflasche", "Schnorchel & Riffschuhe (optional)", "Reisehandtuch", "Snacks für die Flüge", "Spielkarten", "Geburtstagsüberraschung für Papa"] }
  ],

  /* ---------- Sprach-Trainer ---------- */
  phrases: {
    thai: [
      { de: "Hallo / Auf Wiedersehen", tr: "Sawasdee (khrap / kha)", orig: "สวัสดี", note: "Männer hängen „khrap“ an, Frauen „kha“." },
      { de: "Danke", tr: "Khop khun (khrap / kha)", orig: "ขอบคุณ" },
      { de: "Ja", tr: "Chai", orig: "ใช่" },
      { de: "Nein", tr: "Mai chai", orig: "ไม่ใช่" },
      { de: "Lecker!", tr: "Aroi!", orig: "อร่อย" },
      { de: "Wie viel kostet das?", tr: "Tao rai?", orig: "เท่าไหร่" },
      { de: "Nicht scharf, bitte", tr: "Mai phet", orig: "ไม่เผ็ด" },
      { de: "Entschuldigung", tr: "Khor thot", orig: "ขอโทษ" },
      { de: "Die Rechnung, bitte", tr: "Check bin", orig: "เช็คบิล" },
      { de: "Wasser", tr: "Nam", orig: "น้ำ" },
      { de: "Prost!", tr: "Chon!", orig: "ชน" },
      { de: "Kein Problem / Macht nichts", tr: "Mai pen rai", orig: "ไม่เป็นไร", note: "Die thailändische Lebensphilosophie in drei Silben." },
      { de: "Wo ist die Toilette?", tr: "Hong nam yu nai?", orig: "ห้องน้ำอยู่ไหน" },
      { de: "Eins, zwei, drei", tr: "Nueng, song, sam", orig: "หนึ่ง สอง สาม" }
    ],
    khmer: [
      { de: "Hallo", tr: "Sua s'dei", orig: "សួស្តី" },
      { de: "Danke", tr: "Orkun", orig: "អរគុណ" },
      { de: "Ja", tr: "Baat (Männer) / Chaa (Frauen)", orig: "បាទ / ចាស" },
      { de: "Nein", tr: "Ot te", orig: "អត់ទេ" },
      { de: "Lecker!", tr: "Chhnganh!", orig: "ឆ្ងាញ់" },
      { de: "Wie viel kostet das?", tr: "Thlai pon'man?", orig: "ថ្លៃប៉ុន្មាន" },
      { de: "Entschuldigung", tr: "Som toh", orig: "សុំទោស" },
      { de: "Wasser", tr: "Tuk", orig: "ទឹក" },
      { de: "Prost!", tr: "Chul muoy!", orig: "ជល់មួយ" },
      { de: "Auf Wiedersehen", tr: "Lea heuy", orig: "លាហើយ" },
      { de: "Nicht scharf", tr: "Ot het", orig: "អត់ហឹរ" },
      { de: "Eins, zwei, drei", tr: "Muoy, pi, bei", orig: "មួយ ពីរ បី" }
    ]
  },

  /* ---------- Quiz ---------- */
  quiz: [
    { q: "Wie heißt die Währung in Thailand?", a: ["Baht", "Riel", "Dong", "Ringgit"], c: 0, x: "1 € sind ungefähr 37–38 Baht (Stand Oktober 2026)." },
    { q: "Wie viel Zeitunterschied haben Barcelona und Bangkok im Februar?", a: ["+6 Stunden", "+5 Stunden", "+7 Stunden", "+8 Stunden"], c: 0, x: "Thailand und Kambodscha sind UTC+7, Spanien im Winter UTC+1. Abu Dhabi liegt mit UTC+4 dazwischen." },
    { q: "Was bedeutet „Wat Arun“?", a: ["Tempel der Morgenröte", "Tempel des Smaragd-Buddha", "Tempel des Friedens", "Weißer Tempel"], c: 0, x: "Wat Arun ist der Tempel auf dem Cover unseres Reiseplans – wir sehen ihn am 1. Februar." },
    { q: "Angkor Wat wurde ursprünglich gebaut als …", a: ["hinduistischer Tempel für Vishnu", "buddhistisches Kloster", "Königspalast", "Festung gegen die Siamesen"], c: 0, x: "Erbaut im 12. Jahrhundert unter König Suryavarman II., später wurde er buddhistisch." },
    { q: "Wie heißt der größte See Südostasiens, an dem Kompong Phluk liegt?", a: ["Tonle Sap", "Inle-See", "Toba-See", "Chao-Phraya-See"], c: 0, x: "Der Tonle Sap wächst in der Regenzeit auf das Fünffache seiner Größe." },
    { q: "Was ist Khao Soi?", a: ["Curry-Nudelsuppe aus Nordthailand", "Gegrillter Fisch mit Chili", "Grüner Papayasalat", "Süßer Klebreis mit Mango"], c: 0, x: "Mit knusprigen Nudeln obendrauf – das Nationalgericht von Chiang Mai." },
    { q: "Die Rafflesia ist …", a: ["die größte Blume der Welt", "ein seltener Papagei", "eine Affenart", "ein Wasserfall im Khao Sok"], c: 0, x: "Bis zu einem Meter Durchmesser und sie riecht nach verwesendem Fleisch. Wir suchen sie am 6. Februar." },
    { q: "Wofür ist Kampot weltberühmt?", a: ["Pfeffer", "Kaffee", "Seide", "Perlen"], c: 0, x: "Kampot-Pfeffer hat eine geschützte Herkunftsbezeichnung wie Champagner." },
    { q: "Was heißt „Sawasdee“?", a: ["Hallo", "Danke", "Lecker", "Entschuldigung"], c: 0, x: "Mit „khrap“ (Männer) oder „kha“ (Frauen) am Ende wird es höflich." },
    { q: "Welche zweite Währung wird in Kambodscha fast überall akzeptiert?", a: ["US-Dollar", "Euro", "Thai Baht", "Yen"], c: 0, x: "Preise stehen oft in Dollar, Wechselgeld gibt es in Riel (ca. 4.100 Riel = 1 USD)." },
    { q: "Wodurch entstand der Cheow-Lan-See im Khao-Sok-Nationalpark?", a: ["Durch einen Staudamm", "Durch einen Vulkankrater", "Durch einen Meteoriten", "Durch einen Gletscher"], c: 0, x: "Der Ratchaprapha-Damm hat in den 1980ern das Tal geflutet – daher die Kalksteinfelsen mitten im Wasser." },
    { q: "Muay Thai wird auch genannt …", a: ["Kunst der acht Gliedmaßen", "Weg der leeren Hand", "Tanz des Tigers", "Kunst der sanften Hand"], c: 0, x: "Fäuste, Ellbogen, Knie und Schienbeine – acht Waffen." },
    { q: "Phnom Penh liegt am Zusammenfluss welcher Flüsse?", a: ["Mekong und Tonle Sap", "Mekong und Chao Phraya", "Ganges und Mekong", "Tonle Sap und Irrawaddy"], c: 0, x: "Der Tonle-Sap-Fluss wechselt in der Regenzeit sogar die Fließrichtung." },
    { q: "Was ist Fisch-Amok?", a: ["Fisch-Curry, im Bananenblatt gedämpft", "Frittierter Fisch mit Mango", "Scharfe Fischsuppe", "Roher Fischsalat"], c: 0, x: "Das Nationalgericht Kambodschas – cremig mit Kokosmilch und Kroeung-Paste." },
    { q: "Wie lang ist der liegende Buddha im Wat Pho?", a: ["46 Meter", "12 Meter", "25 Meter", "100 Meter"], c: 0, x: "46 Meter lang und 15 Meter hoch, mit Perlmutt-Fußsohlen." },
    { q: "Wofür steht die „60“ auf dem Cover des Reiseplans?", a: ["Papas 60. Geburtstag", "60 Tempel in 23 Tagen", "60 Grad im Schatten", "60 Tage Reise"], c: 0, x: "Sixty and sexy." }
  ],

  /* ---------- Reise-Bingo ---------- */
  bingo: [
    "Tuk-Tuk gefahren", "Mönch in Orange gesehen", "Gecko im Zimmer", "7-Eleven-Besuch", "Elefant berührt",
    "Mango Sticky Rice gegessen", "Affe gesehen", "Sonnenaufgang gesehen", "Longtail-Boot gefahren", "Massage bekommen",
    "Thai-Eistee getrunken", "Nachtmarkt besucht", "Rooftop-Bar", "Barfuß im Tempel", "Kabelsalat fotografiert",
    "Roller mit 3+ Personen gesehen", "Khao Soi gegessen", "Tropenregen erlebt", "Plankton leuchten sehen", "Pfeffer probiert",
    "Papa hat gefeilscht", "Jemand hat sich verlaufen", "Kokosnuss getrunken", "„Sawasdee“ gesagt"
  ],
  bingoCenter: "60!",

  /* ---------- Food-Challenge ---------- */
  food: [
    { id: "padthai", name: "Pad Thai", emoji: "🍜", where: "Thailand", pts: 1, note: "Am 19.2. bei Thipsamai – dem Original." },
    { id: "mango", name: "Mango Sticky Rice", emoji: "🥭", where: "Thailand", pts: 1, note: "Steht am 1.2. im Plan (Wanjai Cafe House)." },
    { id: "khaosoi", name: "Khao Soi", emoji: "🍛", where: "Chiang Mai", pts: 1, note: "Curry-Nudelsuppe mit knusprigen Nudeln." },
    { id: "somtam", name: "Som Tam (Papayasalat)", emoji: "🥗", where: "Thailand", pts: 1, note: "Scharf! „Mai phet“ sagen." },
    { id: "tomyum", name: "Tom Yum Gung", emoji: "🍲", where: "Thailand", pts: 1, note: "Sauer-scharfe Garnelensuppe." },
    { id: "massaman", name: "Massaman Curry", emoji: "🥘", where: "Thailand", pts: 1, note: "Mild, mit Erdnüssen und Kartoffeln." },
    { id: "thaitea", name: "Thai-Eistee", emoji: "🧋", where: "Thailand", pts: 1, note: "Knallorange und sehr süß." },
    { id: "roti", name: "Roti mit Banane", emoji: "🥞", where: "Thailand", pts: 1, note: "Vom Straßenstand, mit Kondensmilch." },
    { id: "coconut", name: "Kokosnuss direkt aus der Nuss", emoji: "🥥", where: "überall", pts: 1 },
    { id: "toastie", name: "7-Eleven-Toastie", emoji: "🥪", where: "Thailand", pts: 1, note: "Kult. Ham & Cheese, frisch gepresst." },
    { id: "amok", name: "Fisch-Amok", emoji: "🐟", where: "Kambodscha", pts: 1, note: "Das Nationalgericht, im Bananenblatt." },
    { id: "loklak", name: "Lok Lak", emoji: "🥩", where: "Kambodscha", pts: 1, note: "Rindfleisch mit Pfeffer-Limetten-Dip." },
    { id: "baisach", name: "Bai Sach Chrouk", emoji: "🐖", where: "Kambodscha", pts: 1, note: "Grillschwein mit Reis – das Khmer-Frühstück." },
    { id: "nombanhchok", name: "Nom Banh Chok (Khmer-Nudeln)", emoji: "🍝", where: "Kambodscha", pts: 1 },
    { id: "crab", name: "Krabbe mit grünem Kampot-Pfeffer", emoji: "🦀", where: "Kampot / Kep", pts: 2, note: "Das Gericht der Region." },
    { id: "pepper", name: "Frischer Pfeffer direkt von der Pflanze", emoji: "🌶️", where: "La Plantation", pts: 1, note: "Am 17.2. im Plan." },
    { id: "beer", name: "Chang, Singha oder Angkor Beer", emoji: "🍺", where: "überall", pts: 1 },
    { id: "durian", name: "Durian", emoji: "🫣", where: "überall", pts: 3, note: "Mutprobe. Riecht nach … Durian." },
    { id: "insects", name: "Gebratene Insekten", emoji: "🦗", where: "Nachtmärkte", pts: 3, note: "Mutprobe. Grillen sind der Einstieg." },
    { id: "spider", name: "Frittierte Vogelspinne", emoji: "🕷️", where: "Kambodscha", pts: 5, note: "Königsklasse." }
  ],

  /* ---------- Gut zu wissen ---------- */
  info: {
    entry: [
      { h: "Thailand", t: "Seit dem 15. September 2026 gelten neue Einreiseregeln: Die 60-Tage-Regel wurde abgeschafft, die meisten EU-Länder dürfen 30 Tage visumfrei einreisen. Unsere Aufenthalte (10 Nächte und 1 Nacht) liegen deutlich darunter. Zusätzlich: Thailand Digital Arrival Card (TDAC) online ausfüllen, maximal 3 Tage vor jeder Einreise. Vor Abreise beim Auswärtigen Amt bzw. Ministerio de Exteriores prüfen." },
      { h: "Kambodscha", t: "Touristen-E-Visum online beantragen (30 USD, gültig 3 Monate, 30 Tage Aufenthalt) oder Visum bei Ankunft. Dazu die kostenlose e-Arrival-Karte, maximal 7 Tage vor Ankunft. Ein Passfoto und Pass mit 6 Monaten Gültigkeit mitnehmen." },
      { h: "Vereinigte Arabische Emirate", t: "Deutsche und Spanier reisen visumfrei ein – der Stempel kommt am Flughafen." }
    ],
    money: [
      { h: "Thailand – Baht (THB)", t: "1 € ≈ 37,6 THB (Oktober 2026). Geldautomaten überall, aber mit ca. 220 THB Gebühr pro Abhebung – lieber größere Beträge abheben. Street Food: 50–100 THB pro Gericht." },
      { h: "Kambodscha – US-Dollar & Riel", t: "Preise stehen in US-Dollar, Wechselgeld unter 1 USD kommt in Riel (ca. 4.100 Riel = 1 USD). Kleine, unbeschädigte Dollarscheine mitnehmen – zerrissene Scheine werden abgelehnt." },
      { h: "Abu Dhabi – Dirham (AED)", t: "1 € ≈ 4,2 AED. Karte wird fast überall akzeptiert." },
      { h: "Trinkgeld", t: "Keine Pflicht. Üblich: Kleingeld aufrunden, 20–50 THB bei Massagen, 1–2 USD für Guides und Fahrer in Kambodscha." }
    ],
    etiquette: [
      "Tempel: Schuhe aus, Schultern und Knie bedeckt, Füße nie Richtung Buddha strecken.",
      "Der Kopf gilt als heilig, die Füße als unrein – niemandem auf den Kopf fassen, nicht auf Menschen zeigen mit den Füßen.",
      "Thailand: Die Königsfamilie wird nicht kritisiert, auch nicht im Scherz (Majestätsbeleidigung ist strafbar).",
      "Ruhig bleiben, nicht laut werden – „Gesicht wahren“ ist in beiden Ländern wichtig.",
      "Der Wai-Gruß (Hände zusammen, leichte Verbeugung) wird freundlich erwidert.",
      "Frauen berühren keine Mönche – auch nicht beim Geldübergeben."
    ],
    health: [
      "Leitungswasser nicht trinken; Eiswürfel in Restaurants sind in der Regel in Ordnung (Fabrikeis mit Loch).",
      "Mückenschutz auch tagsüber – Dengue wird von Tagmücken übertragen.",
      "Sonne: LSF 50, Hut, viel trinken. Die Sonne steht hier viel höher als zu Hause.",
      "Impfungen (Hepatitis A, Typhus, ggf. Tollwut) rechtzeitig beim Arzt besprechen.",
      "Auf Booten: Reisetabletten für die Empfindlichen, Dry Bag für Handys."
    ],
    plugs: [
      { h: "Thailand", t: "230 V, Steckdosen Typ A/B/C/O – der Euro-Stecker passt meistens." },
      { h: "Kambodscha", t: "230 V, Typ A/C/G – Euro-Stecker passt meistens, Adapter schadet nicht." },
      { h: "Abu Dhabi", t: "230 V, Typ G (britisch) – Adapter nötig." }
    ],
    apps: [
      { h: "Grab", t: "Taxi, Tuk-Tuk und Essen bestellen in Thailand und Kambodscha – Festpreise." },
      { h: "Bolt", t: "Alternative zu Grab in Thailand, oft günstiger." },
      { h: "PassApp", t: "Die Tuk-Tuk-App in Kambodscha." },
      { h: "Google Maps", t: "Offline-Karten für Bangkok, Chiang Mai, Krabi, Siem Reap und Phnom Penh vorher herunterladen." },
      { h: "Google Translate", t: "Thai und Khmer offline-Pakete laden – die Kamera-Übersetzung hilft bei Speisekarten." },
      { h: "AllTrails", t: "Wanderrouten im Khao Sok." },
      { h: "eSIM", t: "Vorab eine eSIM (z. B. Airalo, Holafly) oder am Flughafen eine lokale SIM (AIS/TrueMove in Thailand, Smart/Cellcard in Kambodscha)." }
    ],
    emergency: [
      { country: "Thailand", numbers: [["Touristenpolizei", "1155"], ["Polizei", "191"], ["Rettungsdienst", "1669"]] },
      { country: "Kambodscha", numbers: [["Polizei", "117"], ["Rettungsdienst", "119"], ["Feuerwehr", "118"]] },
      { country: "Abu Dhabi", numbers: [["Polizei", "999"], ["Rettungsdienst", "998"]] }
    ],
    embassies: [
      { name: "Deutsche Botschaft Bangkok", map: "German Embassy Bangkok" },
      { name: "Embajada de España en Bangkok", map: "Embajada de España Bangkok" },
      { name: "Deutsche Botschaft Phnom Penh", map: "German Embassy Phnom Penh" }
    ],
    sources: [
      { label: "TAT News – neue Visa-Regeln Thailand (Sept. 2026)", url: "https://www.tatnews.org/?p=85981" },
      { label: "Rödl & Partner – Thailand visa exemption scheme (Aug. 2026)", url: "https://www.roedl.com/en/insights/thailand-visa-exemption-scheme/" },
      { label: "KPMG – Kambodscha E-Visum-Gebühren", url: "https://kpmg.com/kh/en/insights/2025/01/technical-update.html" },
      { label: "Hello Angkor – Angkor-Pass-Preise 2026", url: "https://helloangkor.com/angkor-ticket-prices/" },
      { label: "Angkor Enterprise – offizieller Ticketverkauf", url: "https://www.angkorenterprise.gov.kh/" },
      { label: "Wechselkurs EUR/THB (exchange-rates.org)", url: "https://www.exchange-rates.org/converter/thb-eur" }
    ]
  },

  /* ---------- Wechselkurse (Standardwerte, in der App änderbar) ---------- */
  photos: {
    bangkok: { cap: "Bangkok bei Nacht am Chao Phraya", by: "Swaminathan Gurgaon, India https://www.flickr.com/people/ara", lic: "CC BY 2.0", page: "https://commons.wikimedia.org/wiki/File:Statetower.jpg" },
    bangkok_day: { cap: "Umgebung: Bangkok am Chao Phraya", by: "Piyatad", lic: "CC BY-SA 3.0", page: "https://commons.wikimedia.org/wiki/File:Chao_Phraya_River_Skyline_-_panoramio.jpg" },
    grand_palace: { cap: "Wat Phra Kaew im Großen Palast", by: "Basile Morin", lic: "CC BY-SA 4.0", page: "https://commons.wikimedia.org/wiki/File:%E0%B8%A7%E0%B8%B1%E0%B8%94%E0%B8%9E%E0%B8%A3%E0%B8%B0%E0%B8%A8%E0%B8%A3%E0%B8%B5%E0%B8%A3%E0%B8%B1%E0%B8%95%E0%B8%99%E0%B8%A8%E0%B8%B2%E0%B8%AA%E0%B8%94%E0%B8%B2%E0%B8%A3%E0%B8%B2%E0%B8%A1_%E0%B8%A7%E0%B8%B1%E0%B8%94%E0%B8%9E%E0%B8%A3%E0%B8%B0%E0%B9%81%E0%B8%81%E0%B9%89%E0%B8%A7_%E0%B8%81%E0%B8%A3%E0%B8%B8%E0%B8%87%E0%B9%80%E0%B8%97%E0%B8%9E%E0%B8%A1%E0%B8%AB%E0%B8%B2%E0%B8%99%E0%B8%84%E0%B8%A3_-_Wat_Phra_Kaew,_Temple_of_Emerald_Buddha,_Bangkok,_Thailand.jpg" },
    wat_pho: { cap: "Der liegende Buddha im Wat Pho", by: "Diego Delso", lic: "CC BY-SA 3.0", page: "https://commons.wikimedia.org/wiki/File:Wat_Pho,_Bangkok,_Tailandia,_2013-08-22,_DD_06.jpg" },
    wat_arun: { cap: "Wat Arun in der Abenddämmerung", by: "McKay Savage from London, UK", lic: "CC BY 2.0", page: "https://commons.wikimedia.org/wiki/File:Wat_Arun_aglow_at_night_(6491938121).jpg" },
    yaowarat: { cap: "Yaowarat Road, Bangkoks Chinatown", by: "Ninara from Helsinki, Finland", lic: "CC BY 2.0", page: "https://commons.wikimedia.org/wiki/File:Yaowarat_at_night_(32455695783).jpg" },
    chiangmai: { cap: "Wat Chedi Luang in der Altstadt", by: "Vyacheslav Argenberg", lic: "CC BY 4.0", page: "https://commons.wikimedia.org/wiki/File:Wat_Chedi_Luang,_Stupa,_Chiang_Mai,_Thailand.jpg" },
    chiangmai_night: { cap: "Umgebung: Tempel in Chiang Mai bei Nacht", by: "Vyacheslav Argenberg", lic: "CC BY 4.0", page: "https://commons.wikimedia.org/wiki/File:Wat_Chedi_Luang,_Night,_Chiang_Mai,_Thailand.jpg" },
    thaphae: { cap: "Tha-Phae-Tor, Eingang zur Altstadt", by: "Jakub Hałun", lic: "CC BY-SA 4.0", page: "https://commons.wikimedia.org/wiki/File:20171105_Tha_Phae_Gate_Chiang_Mai_9784_DxO.jpg" },
    doi_suthep: { cap: "Der goldene Chedi von Doi Suthep", by: "Supanut Arunoprayote. Feel free to use any of my images, but", lic: "CC BY 4.0", page: "https://commons.wikimedia.org/wiki/File:Wat_Phra_That_Doi_Suthep_(I).jpg" },
    long_neck: { cap: "Weberin im Kayan-Dorf", by: "Ranieljosecastaneda", lic: "CC BY-SA 4.0", page: "https://commons.wikimedia.org/wiki/File:KAYAN_PEOPLE_IN_THAILAND.jpg" },
    khaosok: { cap: "Kalksteinfelsen im Cheow-Lan-See", by: "Vyacheslav Argenberg", lic: "CC BY 4.0", page: "https://commons.wikimedia.org/wiki/File:Karst_formations_on_Cheow_Lan_Lake,_Thailand.jpg" },
    khaosok_jungle: { cap: "Morgennebel im Khao-Sok-Nationalpark", by: "Vyacheslav Argenberg", lic: "CC BY 4.0", page: "https://commons.wikimedia.org/wiki/File:Cheow_Lan_Lake,_Rainforest,_Khao_Sok,_Thailand.jpg" },
    cheow_lan_boat: { cap: "Mit dem Boot über den Cheow-Lan-See", by: "Vyacheslav Argenberg", lic: "CC BY 4.0", page: "https://commons.wikimedia.org/wiki/File:Karst_landscape_of_Cheow_Lan_Lake,_Thailand.jpg" },
    cheow_lan_hotel: { cap: "Umgebung: der Cheow-Lan-See", by: "The Cosmonaut", lic: "CC BY-SA 2.5 ca", page: "https://commons.wikimedia.org/wiki/File:Cheow_Lan_Lake_shoreline.jpg" },
    elephant: { cap: "Asiatischer Elefant", by: "Chirstelle EL JAMALI", lic: "CC BY 4.0", page: "https://commons.wikimedia.org/wiki/File:Elephant_d%27Asie_(Elephant_nature_park,_Tha%C3%AFlande).jpg" },
    rafflesia: { cap: "Rafflesia kerrii, bis zu 90 cm groß", by: "Wilhelm Albert Mertin", lic: "CC BY 2.0 de", page: "https://commons.wikimedia.org/wiki/File:Rafflesia_kerrii_Meijer_3.JPG" },
    railay: { cap: "Railay West mit seinen Kalksteinwänden", by: "Wendy Harman", lic: "CC BY 2.0", page: "https://commons.wikimedia.org/wiki/File:Railay.jpg" },
    railay_boats: { cap: "Umgebung: Longtail-Boote am Strand von Railay", by: "Krzysztof Golik", lic: "CC BY-SA 4.0", page: "https://commons.wikimedia.org/wiki/File:West_Rai_Leh_(3).jpg" },
    phra_nang: { cap: "Phra Nang Beach", by: "kallerna", lic: "CC BY-SA 3.0", page: "https://commons.wikimedia.org/wiki/File:Phra_Nang_beach_29.jpg" },
    four_islands: { cap: "Koh Poda, eine der vier Inseln", by: "kallerna", lic: "CC BY-SA 3.0", page: "https://commons.wikimedia.org/wiki/File:Koh_Poda_13.jpg" },
    hong_islands: { cap: "Kajaks in der Lagune von Koh Hong", by: "Wolfgang Holzem", lic: "CC BY-SA 4.0", page: "https://commons.wikimedia.org/wiki/File:4.Ko_Hong_Island_-_Andaman_Sea_-_Krabi_Province,_Thailand.jpg" },
    siemreap: { cap: "Die Gesichter des Bayon in Angkor Thom", by: "Photo Dharma from Penang, Malaysia", lic: "CC BY 2.0", page: "https://commons.wikimedia.org/wiki/File:Angkor_-_Bayon_-_004_Tower_Faces_(8581824754).jpg" },
    siemreap_river: { cap: "Umgebung: der Siem-Reap-Fluss am Abend", by: "Bahnfrend", lic: "CC BY-SA 4.0", page: "https://commons.wikimedia.org/wiki/File:Siem_Reap_River,_Siem_Reap,_2018_(04).jpg" },
    angkor: { cap: "Sonnenaufgang über Angkor Wat", by: "Christophe95", lic: "CC BY-SA 4.0", page: "https://commons.wikimedia.org/wiki/File:Angkor_Wat_at_sunrise_3.jpg" },
    ta_prohm: { cap: "Ta Prohm, vom Dschungel überwachsen", by: "GayleKaren", lic: "CC BY-SA 3.0", page: "https://commons.wikimedia.org/wiki/File:Angkor_Wat_Ta_Prohm_Temple_doorway_overgrown_with_tree_roots.jpg" },
    pub_street: { cap: "Pub Street bei Nacht", by: "Marcin Konsek", lic: "CC BY-SA 4.0", page: "https://commons.wikimedia.org/wiki/File:2016_Siem_Reab,_Pub_Street_noc%C4%85.jpg" },
    kompong_phluk: { cap: "Stelzenhäuser in Kompong Phluk", by: "Qilin", lic: "CC BY 2.0", page: "https://commons.wikimedia.org/wiki/File:Kompong_Phluk.jpg" },
    kohrong: { cap: "Strand auf Koh Rong", by: "Treehill", lic: "CC BY-SA 4.0", page: "https://commons.wikimedia.org/wiki/File:Sunset_Beach,_Koh_Rong_Ranloem_-_1.jpg" },
    kohrong_hotel: { cap: "Umgebung: Strand auf Koh Rong", by: "Wikirictor", lic: "CC BY-SA 3.0", page: "https://commons.wikimedia.org/wiki/File:Cambodia_island_paradise_koh_rong_sanloem.jpg" },
    royal_beach: { cap: "Weißer Sand auf Koh Rong", by: "TomFitzhenry", lic: "CC BY-SA 4.0", page: "https://commons.wikimedia.org/wiki/File:Long-beach-kog-rong-cambodia.jpg" },
    kampot: { cap: "Sonnenuntergang am Kampot-Fluss", by: "Marcin Konsek", lic: "CC BY-SA 4.0", page: "https://commons.wikimedia.org/wiki/File:2016_Kampot,_Zach%C3%B3d_s%C5%82o%C5%84ca_nad_rzek%C4%85_Praek_Tuek_Chhu_(20).jpg" },
    kampot_river: { cap: "Umgebung: der Fluss bei Kampot", by: "Adam Jones from Kelowna, BC, Canada", lic: "CC BY-SA 2.0", page: "https://commons.wikimedia.org/wiki/File:Sunset_Boat_along_Kampot_River_-_Kampot_-_Cambodia_(48528860111).jpg" },
    kampot_pepper: { cap: "Pfefferranken auf einer Plantage bei Kampot", by: "PsamatheM", lic: "CC BY-SA 4.0", page: "https://commons.wikimedia.org/wiki/File:03-La_Plantation_Pepper_Farm,_Kampot_Province-nX-9.jpg" },
    phnompenh: { cap: "Der Königspalast von Phnom Penh", by: "Marcin Konsek", lic: "CC BY-SA 4.0", page: "https://commons.wikimedia.org/wiki/File:2016_Phnom_Penh,_Pa%C5%82ac_Kr%C3%B3lewski,_Pawilon_Chanchhaya_(02).jpg" },
    phnompenh_river: { cap: "Umgebung: die Uferpromenade von Phnom Penh", by: "Christophe95", lic: "CC BY-SA 4.0", page: "https://commons.wikimedia.org/wiki/File:Riverside_Park,_Phnom_Penh.jpg" },
    rajadamnern: { cap: "Rajadamnern Stadium am Kampfabend", by: "Mynameisfootlong", lic: "CC BY 4.0", page: "https://commons.wikimedia.org/wiki/File:RajInfront.jpg" },
    abudhabi: { cap: "Scheich-Zayid-Moschee bei Nacht", by: "HasselbladWhisperer", lic: "CC0", page: "https://en.wikipedia.org/wiki/File:Sheikh_Zayed_Grand_Mosque_At_Night.jpg" }
  },
  rates: { THB: 37.6, USD: 1.14, KHR: 4670, AED: 4.19 },
  ratesDate: "Oktober 2026"
};
