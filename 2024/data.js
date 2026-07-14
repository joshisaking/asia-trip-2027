/* ============================================================================
   LEVEL 4 · EUROPE 2024 — "Player 4 Joins the Party"
   Apr 21 – May 6, 2024 · Joshua, Christina, Lucas (4) & Leila (1) · Netherlands,
   Spain, France & a Belgium day trip — the first trip as a family of four.
   Edit this file to tweak anything on the /2024/ page.
   ============================================================================ */

const PAST_TRIP = {

  meta: {
    level: 4,
    year: "2024",
    endYear: 2024,
    title: "Player 4 Joins the Party",
    subtitle: "Netherlands → Spain → France, with a 4-year-old and a 1-year-old in the party",
    dateRange: "Apr 21 – May 6, 2024",
    days: 16,
    travelers: [
      { name: "Joshua", emoji: "👨" },
      { name: "Christina", emoji: "👩" },
      { name: "Lucas (age 4)", emoji: "👦" },
      { name: "Leila (age 1)", emoji: "👶" }
    ],
    stats: [
      { value: "16", label: "days" },
      { value: "4",  label: "countries" },
      { value: "4",  label: "flights" },
      { value: "4",  label: "players" }
    ]
  },

  route: {
    stops: [
      { emoji: "🏠", name: "Atlanta",      sub: "Apr 21" },
      { emoji: "🌷", name: "Utrecht",      sub: "Apr 22 – 28 · King's Day" },
      { emoji: "🏖️", name: "Torremolinos", sub: "Apr 28 – May 2 · Costa del Sol" },
      { emoji: "🧇", name: "Lille",        sub: "May 2 – 6 · the Taylors" },
      { emoji: "🗼", name: "Paris CDG",    sub: "May 6 · homeward hop" },
      { emoji: "🏠", name: "Atlanta",      sub: "Home!" }
    ],
    modes: ["fly", "fly", "fly", "train", "fly"]
  },

  chapters: [
    {
      emoji: "🌷",
      name: "Utrecht — Canals & King's Day",
      dates: "Apr 21 – 28",
      color: "#e8590c",
      tagline: "A canal-city home base while the whole country dressed in orange.",
      funFact: "April 27 was Koningsdag — King's Day, the Netherlands' biggest party. A family named King, in the Netherlands, on King's Day. Checkmate.",
      events: [
        { date: "Apr 21 – 22", emoji: "🛫", title: "Fly Atlanta → Amsterdam",
          blurb: "Delta DL70 overnight, wheels up 3:25 PM and wheels down at 6 AM — first international flight ever for 1-year-old Leila.",
          codes: [{ label: "Virgin Atlantic booking", value: "FBZQNT" }] },
        { date: "Mon, Apr 22", emoji: "🏨", title: "Check in: Crowne Plaza Utrecht Centraal",
          blurb: "Six nights right by Utrecht Centraal — landing at 6 AM with a 3 PM check-in is the classic jet-lag boss fight.",
          codes: [{ label: "IHG confirmation", value: "61989637" }] },
        { date: "Apr 22 – 26", emoji: "🚲", title: "Utrecht at stroller speed",
          blurb: "The Dom Tower, the two-level canal wharves of the Oudegracht, bakfiets bikes everywhere — Miffy's hometown in peak tulip season." },
        { date: "Sat, Apr 27", emoji: "🧡", title: "King's Day",
          blurb: "Koningsdag: orange everything, boats on the canals, street markets on every corner — the King family at the King's party." }
      ]
    },
    {
      emoji: "🏖️",
      name: "Costa del Sol — Torremolinos",
      dates: "Apr 28 – May 2",
      color: "#0ea5a4",
      tagline: "Trading canals for chiringuitos on Spain's sunshine coast.",
      funFact: "Torremolinos' beachfront chiringuitos grill espetos — sardines on cane skewers, cooked over open fire in old fishing boats filled with sand.",
      events: [
        { date: "Sun, Apr 28", emoji: "🛫", title: "Fly Amsterdam → Malaga",
          blurb: "KLM 1545, 1:35 → 4:35 PM, then straight to the Airbnb a few streets from the beach.",
          codes: [{ label: "KLM confirmation", value: "GR9K7I" }] },
        { date: "Apr 28 – May 2", emoji: "🏖️", title: "Beach base on Calle Brasil",
          blurb: "Four nights of Mediterranean sand, paella and playgrounds — sandcastles count as architecture appreciation.",
          address: "Calle Brasil, 18, 29620 Torremolinos, Malaga, Spain" }
      ]
    },
    {
      emoji: "🧇",
      name: "Lille — French Finale with the Taylors",
      dates: "May 2 – 6",
      color: "#3556e8",
      tagline: "Two families, two rooms, one Flemish-flavored corner of France.",
      funFact: "The Hotel Euralille booking said it plainly: two rooms — 'Taylors and Kings.' Lille's old town paid everyone off in Méert waffles and Flemish gables.",
      events: [
        { date: "Thu, May 2", emoji: "🛫", title: "Fly Malaga → Lille",
          blurb: "Volotea V72097, 9:40 AM → 12:25 PM, from the Costa del Sol to French Flanders in one hop.",
          codes: [{ label: "Volotea", value: "V5M8JV" }, { label: "Capital One travel", value: "H-FDOKHM" }] },
        { date: "May 2 – 6", emoji: "🏨", title: "Hotel Euralille — Kings & Taylors",
          blurb: "Queen room with a sofa bed for the Kings, king room for the Taylors, four nights side by side.",
          codes: [{ label: "Kings room", value: "3451451063" }, { label: "Taylors room", value: "3472341231" }],
          address: "335 Bd de Leeds, 59777 Lille, France" },
        { date: "May 3 – 5", emoji: "🧇", title: "Vieux Lille with friends",
          blurb: "The Grand Place, cobbled old-town lanes, and waffle stops — France at kid pace, with backup adults." },
        { date: "Sun, May 5", emoji: "🍫", title: "Day trip to Belgium — Mouscron",
          blurb: "A train across the border from Lille with Jenna and Yadi to officially claim country #4. Wandered into Mouscron's town square just as a local chocolatier was closing up shop and grabbed authentic Belgian chocolates to bring home, then settled into a tavern in the square for Belgian beers and local dishes — where Lucas tried escargot for the first time. A few hours round trip, well worth the detour before flying home." },
        { date: "Mon, May 6", emoji: "🛬", title: "Home via Paris",
          blurb: "The hop down to Charles de Gaulle, then Air France AF0032 — depart 2 PM, land Atlanta 5:25 PM. Family of four: level cleared.",
          codes: [{ label: "Virgin Atlantic booking", value: "FAD8DS" }] }
      ]
    }
  ],

  achievements: [
    { emoji: "👨‍👩‍👧‍👦", title: "Full Party Assembled", detail: "First international trip as a family of four — Lucas (4) and Leila (1) both on the roster." },
    { emoji: "🍼", title: "Player 4 Has Joined", detail: "Leila's first passport stamps at age 1: Netherlands, Spain and France." },
    { emoji: "🧡", title: "Kings on King's Day", detail: "In the Netherlands for Koningsdag, April 27 — the one day the whole country celebrates the family name." },
    { emoji: "🌷", title: "Tulip Season II", detail: "Back in Holland at peak bloom, seven years after the Grand Tour." },
    { emoji: "🏖️", title: "Beach Level: Co-op Mode", detail: "Costa del Sol sand with two kids under five. Nobody ate the sand (probably)." },
    { emoji: "🤝", title: "Two-Family Raid Party", detail: "Linked up with the Taylors in Lille — adjacent rooms at Hotel Euralille." },
    { emoji: "🍫", title: "Bonus Level: Belgium", detail: "A Sunday train from Lille to Mouscron with Jenna and Yadi — chocolates, beer, and Lucas's first escargot, all for country #4." },
    { emoji: "✈️", title: "Four-Airline Combo", detail: "Delta, KLM, Volotea and Air France, all in 16 days." },
    { emoji: "🚄", title: "De Gaulle Dash", detail: "Lille → Charles de Gaulle → Atlanta with the full crew, the gear, and the stroller." }
  ],

  timeCapsule: [
    { emoji: "👶", title: "Leila was 1", detail: "The whole trip happened before her first memories — the photos will have to testify that she was there." },
    { emoji: "👦", title: "Lucas was 4", detail: "Big-brother debut abroad: old enough for window seats and waffles, young enough to nap in the stroller too." },
    { emoji: "🧸", title: "Toddler Mode: Legacy", detail: "Two years after the Alps, the original toddler-mode player was now the big kid showing his sister the ropes." }
  ]
};
