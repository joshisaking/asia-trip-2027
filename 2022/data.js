/* ============================================================================
   LEVEL 3 · EUROPE 2022 — "Alps on Toddler Mode"
   Apr 28 – May 14, 2022 · Joshua, Christina & toddler Lucas · Switzerland,
   Czechia & Spain in the Covid era. Edit this file to tweak the /2022/ page.
   ============================================================================ */

const PAST_TRIP = {

  meta: {
    level: 3,
    year: "2022",
    endYear: 2022,
    title: "Alps on Toddler Mode",
    subtitle: "Switzerland → Prague → Spain, with a 2-year-old co-pilot",
    dateRange: "Apr 28 – May 14, 2022",
    days: 17,
    travelers: [
      { name: "Joshua", emoji: "👨" },
      { name: "Christina", emoji: "👩" },
      { name: "Lucas (age 2)", emoji: "👶" }
    ],
    stats: [
      { value: "17", label: "days" },
      { value: "3",  label: "countries" },
      { value: "7",  label: "flights" },
      { value: "1",  label: "toddler" }
    ]
  },

  route: {
    stops: [
      { emoji: "🏠", name: "Atlanta",     sub: "Apr 28" },
      { emoji: "🐻", name: "Bern",        sub: "Apr 29 – May 6 · the Bays" },
      { emoji: "🏔️", name: "Grindelwald", sub: "May 2 – 3 · day trips" },
      { emoji: "🏰", name: "Prague",      sub: "May 6 – 10 · Jenna & Nick" },
      { emoji: "🍊", name: "Valencia",    sub: "May 10 – 13 · the Holmes" },
      { emoji: "🎨", name: "Madrid",      sub: "May 13 – 14" },
      { emoji: "🏠", name: "Atlanta",     sub: "Home!" }
    ],
    modes: ["fly", "train", "fly", "fly", "train", "fly"]
  },

  chapters: [
    {
      emoji: "🐻",
      name: "Switzerland — Bern Base Camp",
      dates: "Apr 28 – May 6",
      color: "#2f7fe8",
      tagline: "A week with the Bays: trams, toboggans, and the Bernese Oberland.",
      funFact: "Getting to the Bays was an adventure itself: train from Zurich Airport, then tram 7 to the last stop at Ostring — with a 6-ride tram ticket from the station machine.",
      events: [
        { date: "Apr 28 – 29", emoji: "🛫", title: "Fly Atlanta → Newark → Zurich",
          blurb: "United UA786 + the overnight to Zurich, landing 11:35 AM, then trains and trams to Bern.",
          codes: [{ label: "United conf", value: "K2LRWJ" }] },
        { date: "Apr 30 – May 1", emoji: "🛷", title: "Bern weekend: zoo, riverwalk & the Gurten toboggan",
          blurb: "Rosengarten views over the old town, playgrounds for Lucas, and the toboggan run on Bern's local mountain (dry weather only — it cooperated)." },
        { date: "May 2 – 3", emoji: "🏔️", title: "Grindelwald, Lauterbrunnen & Mürren",
          blurb: "Cliff walk, glacier canyon, waterfall valley — the Alps at full volume, toddler in tow. Harder Kulm above Interlaken on the way home." },
        { date: "Wed, May 4", emoji: "🏞️", title: "Thun day trip",
          blurb: "Castle town on the lake, an easy win before packing up." }
      ]
    },
    {
      emoji: "🏰",
      name: "Prague",
      dates: "May 6 – 10",
      color: "#c2410c",
      tagline: "Introducing Lucas to Jenna, Nick & YADI in the golden city.",
      funFact: "Lucas's Prague food tour: döner kebabs and trdelník — the chimney-cake pastry rolled in cinnamon sugar. Toddler approved.",
      events: [
        { date: "Fri, May 6", emoji: "🛫", title: "Train to Zurich, fly to Prague",
          blurb: "SWISS LX1498, 80 minutes in the air, then Hotel Rezidence Emmy.",
          codes: [{ label: "SWISS", value: "36HZ9K" }, { label: "Capital One travel", value: "H-Z-Q1U8JGCHP" }, { label: "Hotel", value: "CZEndkwnzu2n-4907566" }] },
        { date: "May 7 – 9", emoji: "🥨", title: "Prague with Jenna, Nick & YADI",
          blurb: "City-center wanders with Lucas, old friends, new kid — and the 48-hour countdown to fill out Spain's entry form." }
      ]
    },
    {
      emoji: "🍊",
      name: "Spain — Valencia & Madrid",
      dates: "May 10 – 14",
      color: "#e0a10a",
      tagline: "Beach days with the Holmes, churros con chocolate, and a Madrid finale.",
      funFact: "Guilligan's park was closed, but the beach, tapas, a bike ride, and churros y chocolate more than covered for it.",
      events: [
        { date: "Tue, May 10", emoji: "🛫", title: "Fly Prague → Frankfurt → Valencia",
          blurb: "Two Lufthansa hops, then straight to Michael Holmes's place.",
          codes: [{ label: "Lufthansa", value: "37FZAY" }, { label: "Capital One travel", value: "H-Z-R1OH92ROV" }] },
        { date: "Fri, May 13", emoji: "🚄", title: "Train to Madrid",
          blurb: "One night at Apartamentos Fucar, steps from the Prado neighborhood.",
          codes: [{ label: "Booking.com", value: "2916394678" }] },
        { date: "Sat, May 14", emoji: "🛬", title: "Fly Madrid → Charlotte → Atlanta",
          blurb: "American AA749 + AA2040, row 35 A-B-C — three seats, one exhausted toddler, mission accomplished.",
          codes: [{ label: "MAD→CLT", value: "VUZVEP" }, { label: "CLT→ATL", value: "VKLVOF" }] }
      ]
    }
  ],

  achievements: [
    { emoji: "🧸", title: "Toddler Mode: Activated", detail: "Lucas's first Europe trip at age 2 — three countries, zero meltdown disqualifications." },
    { emoji: "😷", title: "Paperwork Boss Fight", detail: "Covid entry forms, QR codes, and FFP2 masks cleared for Switzerland, Czechia AND Spain." },
    { emoji: "🛷", title: "Toboggan Time Trial", detail: "Gurten fun park's run, high above Bern." },
    { emoji: "🏔️", title: "Alps with a Stroller", detail: "Grindelwald cliff walk, Lauterbrunnen, Mürren and Harder Kulm." },
    { emoji: "🥨", title: "Trdelník Tour Guide", detail: "Showed Lucas the chimney-cake ropes in Prague's city center." },
    { emoji: "🍊", title: "Valencia Sunshine", detail: "Beach, tapas, bikes and churros con chocolate with the Holmes." },
    { emoji: "🐻", title: "Bern Like a Local", detail: "A week on the Bays' tram line — 6-ride ticket, last stop Ostring." }
  ],

  timeCapsule: [
    { emoji: "😷", title: "Masks everywhere", detail: "FFP2 masks required in Czech public places; masks for 12+ on Swiss transit; ages 6+ indoors in Spain." },
    { emoji: "📋", title: "Entry forms", detail: "Switzerland and Spain both required entry forms completed within 48 hours of arrival." },
    { emoji: "📱", title: "QR codes to ride", detail: "Vaccine cards + Covid certificate QR codes checked in Switzerland and Prague." },
    { emoji: "🧪", title: "Sherpa was the sherpa", detail: "apply.joinsherpa.com was the source of truth for every border's rules that spring." }
  ]
};
