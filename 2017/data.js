/* ============================================================================
   LEVEL 1 · EUROPE 2017 — "The Grand Tour"
   May 4 – June 11, 2017 · Joshua & Christina, pre-kids, 39 days, 8 countries.
   Edit this file to tweak anything on the /2017/ page.
   ============================================================================ */

const PAST_TRIP = {

  meta: {
    level: 1,
    year: "2017",
    endYear: 2017,
    title: "The Grand Tour",
    subtitle: "Amsterdam → the Alps → Italy → Greece → Morocco → Spain → Paris",
    dateRange: "May 4 – June 11, 2017",
    days: 39,
    travelers: [
      { name: "Joshua", emoji: "👨" },
      { name: "Christina", emoji: "👩" }
    ],
    stats: [
      { value: "39",  label: "days" },
      { value: "8",   label: "countries" },
      { value: "10",  label: "flights" },
      { value: "15+", label: "trains" }
    ]
  },

  route: {
    stops: [
      { emoji: "🏠", name: "Orlando",      sub: "May 4" },
      { emoji: "🌷", name: "Amsterdam",    sub: "May 5 – 9" },
      { emoji: "🏔️", name: "Zurich",       sub: "May 10 – 11" },
      { emoji: "🛶", name: "Venice",       sub: "May 11 – 14" },
      { emoji: "🎨", name: "Florence",     sub: "May 14 – 16" },
      { emoji: "🌈", name: "Cinque Terre", sub: "May 17 – 18" },
      { emoji: "🏛️", name: "Athens",       sub: "May 19 – 22" },
      { emoji: "🌅", name: "Santorini",    sub: "May 22 – 25" },
      { emoji: "⛲", name: "Rome",         sub: "May 25 – 29" },
      { emoji: "🐪", name: "Marrakech",    sub: "May 29 – Jun 3" },
      { emoji: "🥘", name: "Valencia",     sub: "Jun 3 – 6" },
      { emoji: "⛪", name: "Barcelona",    sub: "Jun 6 – 8" },
      { emoji: "🗼", name: "Paris",        sub: "Jun 9 – 11" },
      { emoji: "🏠", name: "Orlando",      sub: "Home!" }
    ],
    // one mode per hop, in order: fly | train | drive | ferry | bus
    modes: ["fly", "train", "train", "train", "train", "fly", "fly", "fly", "fly", "fly", "train", "train", "fly"]
  },

  chapters: [
    {
      emoji: "🌷",
      name: "Holland in Tulip Season",
      dates: "May 4 – 9",
      color: "#e879a0",
      tagline: "Canals, bikes, and Keukenhof in full bloom.",
      funFact: "The overnight Norwegian hop went Orlando → Oslo → Amsterdam — landing at the Airbnb near 11 PM after a full day of travel.",
      events: [
        { date: "May 4 – 5", emoji: "🛫", title: "Fly Orlando → Oslo → Amsterdam",
          blurb: "Norwegian flights 7052 + 1258, landing in Amsterdam at 9 PM.",
          codes: [{ label: "Norwegian ref", value: "7C2TDL" }],
          note: "Airbnb host Flávio, out by tram 26 — check-in at 11 PM. Long day one!" },
        { date: "Sat, May 6", emoji: "🚲", title: "Haarlem, bike to Lisse & Keukenhof",
          blurb: "Corrie ten Boom house and St. Bavo's in Haarlem, then a rental-bike ride through the bulb fields to the Keukenhof gardens. Windmill photo: acquired.",
          note: "Capped the day at Brouwerij 't IJ — the brewery under a windmill." },
        { date: "Sun, May 7", emoji: "🚲", title: "Hillsong Amsterdam + city bike tour",
          blurb: "Church at the Tropentheater, then the 2 PM We Bike Amsterdam tour.",
          codes: [{ label: "Bike tour", value: "23703112601540" }] },
        { date: "Mon, May 8", emoji: "🕯️", title: "Anne Frank House",
          blurb: "Prinsengracht 263 — the secret annex. No backpacks allowed, none brought." }
      ]
    },
    {
      emoji: "🏔️",
      name: "Rails to Switzerland",
      dates: "May 9 – 11",
      color: "#5b6bf5",
      tagline: "Amsterdam → Cologne → Zurich by train, breakfast beneath the Dom.",
      funFact: "Zurich checklist: Grossmünster, Lake Zurich, Uetliberg, Schober (the city's oldest pastry shop), and dinner at Zeughauskeller — a 15th-century armory turned brewery.",
      events: [
        { date: "Tue, May 9", emoji: "🚄", title: "ICE 121 to Cologne, EC 9 to Zurich",
          blurb: "6:37 AM departure, breakfast outside the Cologne station in the shadow of the cathedral, into Zurich by 5 PM.",
          codes: [{ label: "Rail booking", value: "80538017292743" }] },
        { date: "May 10", emoji: "🏔️", title: "Zurich on foot",
          blurb: "Chocolate, pastry, the world's largest church clock face, and a cable car up Uetliberg." }
      ]
    },
    {
      emoji: "🛶",
      name: "Venice, via the Bernina Express",
      dates: "May 11 – 14",
      color: "#0ea5a4",
      tagline: "One of the world's great train rides, straight into the floating city.",
      funFact: "The Bernina Express climbs over 2,250 m through 55 tunnels and 196 bridges — a UNESCO World Heritage rail line from Chur to Tirano.",
      events: [
        { date: "Thu, May 11", emoji: "🚞", title: "Zurich → Chur → Bernina Express → Milan → Venice",
          blurb: "Four trains, one unforgettable day over the Alps.",
          codes: [{ label: "Bernina booking", value: "58a5bf45137a46.27495983" }],
          note: "Picked up VeniceCards + a Rolling Venice card at the station. Mission for the week: eat tiramisu!!!" },
        { date: "Fri, May 12", emoji: "🎭", title: "Doge's Palace — Secret Itineraries tour",
          blurb: "Hidden passages, then St. Mark's Basilica and a bell-tower climb for the lagoon view.",
          codes: [{ label: "Tour", value: "VIVATK10394279499" }] },
        { date: "Fri, May 12", emoji: "🛶", title: "Gondola ride",
          blurb: "Yes, it's touristy. Yes, it was worth it." },
        { date: "Sat, May 13", emoji: "🏺", title: "Murano & Lido",
          blurb: "Glass museum on Murano, beach air on Lido, cicchetti at the bars." }
      ]
    },
    {
      emoji: "🎨",
      name: "Florence, Pisa & Cinque Terre",
      dates: "May 14 – 19",
      color: "#e0653a",
      tagline: "Renaissance masterpieces, a leaning tower, and five villages on a cliff.",
      funFact: "The Duomo climb and Giotto's bell tower happened on the same day — 877 combined steps, give or take.",
      events: [
        { date: "Sun, May 14", emoji: "⛪", title: "Frecciarossa to Florence + Duomo climb",
          blurb: "Up inside Brunelleschi's dome at 3 PM, bell tower at 5.",
          codes: [{ label: "Duomo order", value: "2071993" }] },
        { date: "Mon, May 15", emoji: "🛵", title: "Vespa wine & countryside tour",
          blurb: "Scooters through the Tuscan hills, wine tasting included.",
          codes: [{ label: "Tour", value: "22369-278914" }] },
        { date: "Tue, May 16", emoji: "🗿", title: "Accademia (hello, David) → Pisa",
          blurb: "Morning with Michelangelo's David, afternoon train to Pisa, night at Hotel La Pace.",
          codes: [{ label: "Accademia order", value: "4945103" }] },
        { date: "Wed, May 17", emoji: "🌈", title: "Leaning Tower → Monterosso al Mare",
          blurb: "Obligatory tower photo, then trains up the coast to Cinque Terre. Coastal trail + all the pesto." },
        { date: "Thu, May 18", emoji: "🌙", title: "Beach day, then a three-train dash to Bologna",
          blurb: "Monterosso → Pisa → Florence → Bologna by 10:35 PM, airport hotel, early flight." }
      ]
    },
    {
      emoji: "🏛️",
      name: "Greece — Athens & Santorini",
      dates: "May 19 – 25",
      color: "#2f7fe8",
      tagline: "Mars Hill, ancient Corinth, and a caldera sunset.",
      funFact: "Walking Acts 17 and 18 in person: the Areopagus in Athens and the ruins of Corinth, with driver Michael for the full-day tour.",
      events: [
        { date: "Fri, May 19", emoji: "🛬", title: "Fly Bologna → Athens",
          blurb: "Evening jazz by the Acropolis after checking into the Airbnb.",
          codes: [{ label: "Flight ref", value: "URTCYW" }] },
        { date: "Sat, May 20", emoji: "🏛️", title: "Athens & Corinth full-day tour",
          blurb: "Acropolis, Parthenon, Mars Hill, then out to Corinth — plus a 1 AM FaceTime for Robbie's graduation party back home." },
        { date: "Mon, May 22", emoji: "🌅", title: "Fly to Santorini",
          blurb: "Three nights in Fira: catamaran day, a rented scooter, the Fira → Oia cliff walk, black-sand beach, and the Akrotiri dig.",
          codes: [{ label: "Flight ref", value: "PZKDHH" }, { label: "Hotel", value: "1902130381" }] }
      ]
    },
    {
      emoji: "⛲",
      name: "Rome",
      dates: "May 25 – 29",
      color: "#b0413e",
      tagline: "Vatican, Colosseum, and gelato-fueled church-hopping — staying with the Bays.",
      funFact: "The hit list: the Pietà, Moses at St. Peter in Chains, the Pantheon, Trevi, Mamertine Prison, and 'the best gelato' at the bottom of the stairs by Trajan's Column.",
      events: [
        { date: "Thu, May 25", emoji: "🛬", title: "Fly Santorini → Rome",
          blurb: "Landed at FCO, met up with the Bays at the Re di Roma apartment.",
          codes: [{ label: "Flight ref", value: "ZYCGY9" }] },
        { date: "Fri, May 26", emoji: "🎨", title: "Vatican tour + dome climb",
          blurb: "Sistine Chapel, the Pietà, and up to the top of St. Peter's dome.",
          codes: [{ label: "Booking ref", value: "BR-605603336" }] },
        { date: "Sat, May 27", emoji: "🏟️", title: "Colosseum — third-level tour",
          blurb: "The upper ring most visitors never see, then the Forum and St. Peter in Chains." }
      ]
    },
    {
      emoji: "🐪",
      name: "Morocco",
      dates: "May 29 – Jun 3",
      color: "#c2410c",
      tagline: "Marrakech souks and four days of 4x4 into the Sahara.",
      funFact: "The desert tour crossed the High Atlas via Aït Benhaddou toward the Erg Chebbi dunes — payment due in dirham, adventure included free.",
      events: [
        { date: "Mon, May 29", emoji: "🛬", title: "Fly Rome → Madrid → Marrakech",
          blurb: "Two Iberia hops with a tight 75-minute connection.",
          codes: [{ label: "Flight ref", value: "ZTV5BH" }] },
        { date: "May 30 – Jun 2", emoji: "🐪", title: "4-day Sahara desert tour",
          blurb: "Morocco Tours 4x4 pickup at 8 AM — mountains, kasbahs, camels, and a night under desert stars." },
        { date: "Jun 2 – 3", emoji: "🕌", title: "Riad el Grably + the souks",
          blurb: "Back to Marrakech for a riad night and a final run through the market.",
          codes: [{ label: "Riad", value: "PFJSKR" }] }
      ]
    },
    {
      emoji: "🥘",
      name: "Spain — Valencia & Barcelona",
      dates: "Jun 3 – 8",
      color: "#e0a10a",
      tagline: "Paella on the beach with the Holmes, then Gaudí's Barcelona.",
      funFact: "Valencia checklist, fully executed: paella at Malvarrosa beach, horchata, the Miguelete bell tower, Central Market, and biking the old riverbed to the City of Arts & Sciences.",
      events: [
        { date: "Sat, Jun 3", emoji: "🛬", title: "Fly Marrakech → Valencia",
          blurb: "Ryanair FR 2217, landing at 10 PM — straight to the Holmes' place on Plaza del Carmen.",
          codes: [{ label: "Flight ref", value: "CT2EMA" }] },
        { date: "Tue, Jun 6", emoji: "🚄", title: "Euromed to Barcelona + Sagrada Família",
          blurb: "6:20 AM train, bags dropped, inside Gaudí's basilica by 4:15 with a Nativity-tower climb.",
          codes: [{ label: "Sagrada", value: "9457775" }] },
        { date: "Wed, Jun 7", emoji: "⛰️", title: "Montserrat day trip",
          blurb: "The serrated mountain monastery outside Barcelona." },
        { date: "Thu, Jun 8", emoji: "🎨", title: "Picasso museum, Park Güell & the beach",
          blurb: "One last tapas run before the night train." }
      ]
    },
    {
      emoji: "🗼",
      name: "Paris Finale",
      dates: "Jun 8 – 11",
      color: "#7c5cf7",
      tagline: "Arrived by sleeper train at dawn; left with the Louvre, the Seine, and the Eiffel Tower sparkling.",
      funFact: "The overnight Intercités de Nuit rolled into Paris Austerlitz at 6:52 AM — nothing like waking up in France.",
      events: [
        { date: "Jun 8 – 9", emoji: "🌙", title: "Night train: Barcelona → Toulouse → Paris",
          blurb: "Renfe-SNCF to Toulouse, then the 10:50 PM sleeper north.",
          codes: [{ label: "BCN→TLS", value: "QJUFYQ" }, { label: "TLS→Paris", value: "QKJXKX" }] },
        { date: "Fri, Jun 9", emoji: "🖼️", title: "Louvre + Montparnasse Tower",
          blurb: "Mona Lisa at 12:30, then the best view of the Eiffel Tower (because you're not in it).",
          codes: [{ label: "Louvre", value: "271704242405" }] },
        { date: "Sat, Jun 10", emoji: "⛵", title: "Seine river cruise + Paris on foot",
          blurb: "Vedettes du Pont Neuf at 10:30, then Sainte-Chapelle, Notre-Dame, Montmartre, and the tower sparkling on the hour.",
          codes: [{ label: "Cruise order", value: "13388" }] },
        { date: "Sun, Jun 11", emoji: "🛬", title: "Fly home: Paris → Manchester → Orlando",
          blurb: "FlyBe 3122 + Condor 5016. 39 days, 8 countries, zero regrets.",
          codes: [{ label: "CDG→MAN", value: "CD3RKD" }, { label: "MAN→MCO", value: "X6UZJY" }] }
      ]
    }
  ],

  achievements: [
    { emoji: "🌷", title: "Tulip Time", detail: "Biked Haarlem → Lisse to Keukenhof at peak bloom, windmill photo included." },
    { emoji: "🚞", title: "Bernina Express", detail: "Rode a UNESCO World Heritage rail line over the Alps — 55 tunnels, 196 bridges." },
    { emoji: "🎭", title: "Secret Passages", detail: "Doge's Palace Secret Itineraries tour + gondola ride in Venice." },
    { emoji: "🧗", title: "Double Dome Day", detail: "Climbed Brunelleschi's dome AND Giotto's bell tower in one Florence afternoon." },
    { emoji: "🛵", title: "Vespa Vineyard Run", detail: "Scooted the Tuscan countryside with wine stops." },
    { emoji: "🌈", title: "Five Lands on Foot", detail: "Hiked the Cinque Terre coastal trail, powered by pesto." },
    { emoji: "🏛️", title: "Acts 17, Live", detail: "Stood on Mars Hill in Athens and walked ancient Corinth." },
    { emoji: "🌅", title: "Caldera Sunset", detail: "Fira → Oia cliff walk, catamaran day, and a scooter lap of Santorini." },
    { emoji: "🐪", title: "Sahara Sleeper", detail: "Four-day 4x4 desert expedition out of Marrakech." },
    { emoji: "🥘", title: "Paella Pilgrimage", detail: "Paella on Malvarrosa beach + horchata in its homeland." },
    { emoji: "🌙", title: "Night Train Survivor", detail: "Slept (sort of) on the Barcelona → Paris sleeper." },
    { emoji: "🖼️", title: "Mona Lisa: Verified", detail: "Louvre, Seine cruise, and the Eiffel Tower sparkling on the hour." }
  ]
};
