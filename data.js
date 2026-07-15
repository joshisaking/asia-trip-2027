/* ============================================================================
   KING FAMILY ASIA TRIP 2026–27 — TRIP DATA
   ----------------------------------------------------------------------------
   This is the ONLY file you need to edit as bookings change.

   HOW TO UPDATE (the 3 common cases):

   1) You booked one of the missing flights:
      - Find it in `flights` (status: "needed"), change status to "confirmed",
        fill in airline / flightNo / times / codes like the confirmed examples.
      - Delete or check off the matching item in `todos` (set done: true).

   2) You verified the Chase Travel booking:
      - Update the "japan-final" entry in `hotels` with the real property,
        set its status to "confirmed", and set done: true on the todo.

   3) Anything else changed (seats, times, codes):
      - Just edit the text below. The site re-renders everything from this file.

   Statuses used everywhere:
     "confirmed" → green badge
     "needed"    → red "NOT YET BOOKED" badge
     "verify"    → amber "VERIFY" badge
   ============================================================================ */

const TRIP_DATA = {

  meta: {
    title: "The Kings Take Asia",
    subtitle: "Atlanta → Seattle → Japan → Philippines → home again",
    dateRange: "Dec 28, 2026 – Jan 17, 2027",
    // Trip start: the day everyone leaves for Seattle (ATL→SEA flight still TBD,
    // so this counts down to the start of that day, Atlanta time). Once the
    // flight is booked, swap in its exact departure time here.
    departureISO: "2026-12-28T00:01:00-05:00",
    // Rough end of trip (evening of the day they land back home, Atlanta/Eastern time).
    tripEndISO: "2027-01-18T00:00:00-05:00",
    tripDays: 21,
    travelers: [
      { name: "Joshua King",    emoji: "👨" },
      { name: "Christina King", emoji: "👩" },
      { name: "Lucas King",     emoji: "👦" },
      { name: "Leila King",     emoji: "👧" }
    ],
    stats: [
      { value: "21",      label: "days" },
      { value: "2",       label: "countries" },
      { value: "~18,000", label: "miles" },
      { value: "19",      label: "nights" }
    ]
  },

  /* ==========================================================================
     PHASES — the "chapters" of the trip. Used for timeline headers & colors.
     ========================================================================== */
  phases: [
    {
      id: "prelude",
      emoji: "🧳",
      name: "Getting to the Starting Line",
      dates: "Dec 28 – 30",
      tagline: "Home (Atlanta) → Seattle, with two downtown nights before the big flight.",
      weather: "🌧️ Seattle in late Dec: typically 37–47°F (3–8°C), bring a rain layer",
      funFact: "Sleeping in Seattle beats sprinting for an 11:50 AM international departure — and Dec 29 is wide open. Pike Place morning, anyone?"
    },
    {
      id: "wheelsup",
      emoji: "🛫",
      name: "Wheels Up",
      dates: "Dec 30 – 31",
      tagline: "Across the Pacific — and across the International Date Line.",
      weather: "",
      funFact: "The flight is about 10¼ hours, but you land a calendar day later — Dec 31 mostly vanishes into the date line. Don't worry, you get the day back on the way home."
    },
    {
      id: "karuizawa",
      emoji: "⛄",
      name: "Karuizawa — Snow & New Year",
      dates: "Dec 31 – Jan 4 · 4 nights",
      tagline: "Mountain resort town at the foot of Mt. Asama.",
      weather: "❄️ Typically 19–36°F (−7 to 2°C) — pack real winter layers",
      funFact: "You'll ring in the New Year the Japanese way: temple bells struck 108 times at midnight (joya no kane), and hatsumōde — the year's first shrine visit — on Jan 1.",
      ideas: "Onsen soak · snow play · Shiraito Falls · New Year's temple bells"
    },
    {
      id: "yokohama",
      emoji: "🎡",
      name: "Yokohama — Big City Lights",
      dates: "Jan 4 – 8 · 4 nights",
      tagline: "Japan's second-largest city, right on the bay.",
      weather: "🧥 Typically 37–54°F (3–12°C), crisp and mostly dry",
      funFact: "The hotel sits near Japan's largest Chinatown and Yamashita Park. The giant Cosmo Clock 21 ferris wheel doubles as the world's biggest clock.",
      ideas: "Cup Noodles Museum (build your own cup!) · Cosmo World · Chinatown snacks · harbor walks"
    },
    {
      id: "cebu",
      emoji: "🏝️",
      name: "Cebu — Island Time",
      dates: "Jan 8 – 14 · 6 nights",
      tagline: "Beach week on Mactan Island, Philippines.",
      weather: "☀️ Typically 75–86°F (24–30°C) — dry season, swim weather",
      funFact: "Mactan is where Magellan's 1521 expedition met local hero Lapu-Lapu. Today it's the launch point for island-hopping boats and some of the best snorkeling in the Visayas.",
      ideas: "Island-hopping boat day · snorkeling · resort pools · fresh mango everything"
    },
    {
      id: "finaljapan",
      emoji: "❓",
      name: "Back to Japan — Final Stretch",
      dates: "Jan 14 – 17 · 3 nights",
      tagline: "Return to Japan for the last few days — lodging still needs to be booked.",
      weather: "",
      funFact: "Nowhere to sleep yet for these 3 nights — top priority on the to-do list! Tokyo? Somewhere near Haneda for an easy departure? Time to decide and book."
    },
    {
      id: "homeward",
      emoji: "🏠",
      name: "Homeward",
      dates: "Jan 17",
      tagline: "Tokyo → Atlanta. Home sweet home.",
      weather: "",
      funFact: "DL294 departs Tokyo at 4:25 PM and lands in Atlanta at 2:50 PM the same day — you touch down 95 minutes before you took off. Time travel, courtesy of the date line. Welcome home!"
    }
  ],

  /* ==========================================================================
     FLIGHTS — one entry per flight LEG (even if booked as two reservations).
     ========================================================================== */
  flights: [
    {
      id: "atl-sea",
      status: "needed",
      phase: "prelude",
      from: { code: "ATL", city: "Atlanta (home)" },
      to:   { code: "SEA", city: "Seattle" },
      airline: "Alaska Airlines (planned)",
      flightNo: "—",
      cabin: "—",
      depart: { date: "Mon, Dec 28, 2026", time: "TBD", tz: "Atlanta" },
      arrive: { date: "Mon, Dec 28, 2026", time: "TBD", tz: "Seattle" },
      duration: "≈ 5h 45m",
      note: "The very first leg of the trip. The W Seattle is booked for Dec 28 (check-in 4:00 PM), so aim to land Monday afternoon/evening. Book this!",
      reservations: []
    },
    {
      id: "sea-nrt",
      status: "confirmed",
      phase: "wheelsup",
      from: { code: "SEA", city: "Seattle" },
      to:   { code: "NRT", city: "Tokyo Narita" },
      airline: "Japan Airlines",
      flightNo: "JL67",
      aircraft: "Boeing 787-9",
      cabin: "Premium Economy",
      depart: { date: "Wed, Dec 30, 2026", time: "11:50 AM", tz: "Seattle" },
      arrive: { date: "Thu, Dec 31, 2026", time: "3:05 PM",  tz: "Japan (+1 day)" },
      duration: "≈ 10h 15m",
      note: "One plane, two reservations: booked as two separate tickets to split loyalty points across accounts. All four of you are on the same flight.",
      reservations: [
        {
          via: "JAL award ticket",
          passengers: ["Joshua King", "Lucas King"],
          codes: [
            { label: "JAL confirmation", value: "EW6X63" }
          ]
        },
        {
          via: "Alaska Airlines (Atmos Rewards) — same physical flight",
          passengers: ["Christina King", "Leila King"],
          codes: [
            { label: "Alaska confirmation", value: "NQHBRY" },
            { label: "Confirmation code",   value: "AAN6Q9" },
            { label: "E-ticket · Christina", value: "0272137089357" },
            { label: "E-ticket · Leila",     value: "0272137089358" }
          ],
          note: "Double-check these codes with Alaska before the trip (see To-Do)."
        }
      ]
    },
    {
      id: "jpn-ceb",
      status: "needed",
      phase: "cebu",
      from: { code: "TYO", city: "Japan · airport TBD" },
      to:   { code: "CEB", city: "Cebu" },
      airline: "TBD",
      flightNo: "—",
      cabin: "—",
      depart: { date: "Fri, Jan 8, 2027", time: "TBD", tz: "Japan" },
      arrive: { date: "Fri, Jan 8, 2027", time: "TBD", tz: "Philippines" },
      duration: "≈ 5h nonstop",
      note: "Needed for Jan 8: Yokohama checkout and Cebu check-in are the same day. Book this!",
      reservations: []
    },
    {
      id: "ceb-jpn",
      status: "needed",
      phase: "finaljapan",
      from: { code: "CEB", city: "Cebu" },
      to:   { code: "TYO", city: "Japan · airport TBD" },
      airline: "TBD",
      flightNo: "—",
      cabin: "—",
      depart: { date: "Thu, Jan 14, 2027", time: "TBD", tz: "Philippines" },
      arrive: { date: "Thu, Jan 14, 2027", time: "TBD", tz: "Japan" },
      duration: "≈ 5h nonstop",
      note: "Needed for Jan 14: Dusit Thani checkout is at noon. Book this!",
      reservations: []
    },
    {
      id: "hnd-atl",
      status: "confirmed",
      phase: "homeward",
      from: { code: "HND", city: "Tokyo Haneda" },
      to:   { code: "ATL", city: "Atlanta (home)" },
      airline: "Delta (ticketed via Virgin Atlantic)",
      flightNo: "DL294",
      aircraft: "Airbus A350-900",
      cabin: "Main Cabin",
      depart: { date: "Sun, Jan 17, 2027", time: "4:25 PM", tz: "Japan" },
      arrive: { date: "Sun, Jan 17, 2027", time: "2:50 PM", tz: "Atlanta (same day!)" },
      duration: "≈ 12h 25m · direct",
      note: "Seats 45A / 46A + 2 more — check the reservation for the full seat map.",
      reservations: [
        {
          via: "Delta / Virgin Atlantic",
          passengers: ["Joshua King", "Christina King", "Lucas King", "Leila King"],
          codes: [
            { label: "Confirmation", value: "DQQINO" }
          ]
        }
      ]
    }
  ],

  /* ==========================================================================
     HOTELS / STAYS — in date order. The "japan-final" entry is the known gap.
     ========================================================================== */
  hotels: [
    {
      id: "seattle-w",
      status: "confirmed",
      phase: "prelude",
      emoji: "🎸",
      name: "W Seattle",
      brand: "W Hotels · booked via Chase Travel \"The Edit\"",
      address: "1112 4th Ave, Seattle, WA 98101",
      checkIn:  { date: "Mon, Dec 28, 2026", time: "4:00 PM" },
      checkOut: { date: "Wed, Dec 30, 2026", time: "12:00 PM" },
      nights: 2,
      room: "The Edit — Chase Travel plan",
      guests: "2 guests on the booking · primary: Joshua L King",
      codes: [
        { label: "Hotel confirmation", value: "78076207" },
        { label: "Chase Trip ID", value: "1020477405" }
      ],
      note: "Labeled \"Seattle Stay 1\" in Chase with 2 guests — confirm how the other half of the family is covered (see To-Do). Checkout is officially noon, but JL67 departs 11:50 AM on the 30th: be out the door by ~8 AM. (Conf shows as \"78076207-\" in the Chase app.)"
    },
    {
      id: "karuizawa-hotel",
      status: "confirmed",
      phase: "karuizawa",
      emoji: "⛄",
      name: "ANA Holiday Inn Resort Karuizawa",
      brand: "IHG",
      address: "2023-16 Kitakaruizawa Agatsumagun, Gunma, Kitasaku Gun, Japan 377-1412",
      checkIn:  { date: "Thu, Dec 31, 2026", time: "3:00 PM" },
      checkOut: { date: "Mon, Jan 4, 2027",  time: "11:00 AM" },
      nights: 4,
      room: "1 King Premium",
      guests: "4 guests",
      codes: [
        { label: "Hotel confirmation", value: "93058402517" },
        { label: "Trip ID", value: "1016065470" }
      ],
      note: "New Year's Eve + New Year's Day here. Landing at NRT 3:05 PM — the trek up to Kitakaruizawa is ~3–4 hrs (train + bus/taxi, or rental car), so expect an evening arrival."
    },
    {
      id: "yokohama-hotel",
      status: "confirmed",
      phase: "yokohama",
      emoji: "🎡",
      name: "Hyatt Regency Yokohama",
      brand: "Hyatt",
      address: "280-2 Yamashita-cho, Naka-ku, Yokohama 231-8340, Japan",
      checkIn:  { date: "Mon, Jan 4, 2027", time: "3:00 PM (standard)" },
      checkOut: { date: "Fri, Jan 8, 2027", time: "11:00 AM (standard)" },
      nights: 4,
      room: "Regency Suite, 2 Twin Beds (LP Free Suite)",
      guests: "2 adults · 2 children",
      codes: [
        { label: "Confirmation", value: "6322590" }
      ],
      note: "Karuizawa → Yokohama is roughly 2.5–3 hrs by shinkansen + local train. The hotel is steps from Chinatown and Yamashita Park."
    },
    {
      id: "cebu-hotel",
      status: "confirmed",
      phase: "cebu",
      emoji: "🏝️",
      name: "Dusit Thani Mactan Cebu Resort",
      brand: "Dusit",
      address: "Punta Engano Road, Lapu-Lapu, Cebu, Philippines 6015",
      checkIn:  { date: "Fri, Jan 8, 2027",  time: "3:00 PM" },
      checkOut: { date: "Thu, Jan 14, 2027", time: "12:00 PM" },
      nights: 6,
      room: "Dusit Club · 2 Doubles · Sea View (2 Twin)",
      guests: "4 guests",
      codes: [
        { label: "Stay reference", value: "2508069188" }
      ],
      price: "$1,991.40 total",
      cancellation: "Free cancellation until Dec 25, 2026, 6:00 PM (property time)",
      note: "⚠️ This stay REPLACED an earlier booking (conf 2425769260, Jan 7–14) — verify the old one is cancelled so you're not double-charged. See To-Do."
    },
    {
      id: "japan-final",
      status: "needed",
      phase: "finaljapan",
      emoji: "🏨",
      name: "Final Tokyo-area stay — not yet booked",
      brand: "",
      address: "Location TBD (Tokyo area?)",
      checkIn:  { date: "Thu, Jan 14, 2027", time: "—" },
      checkOut: { date: "Sun, Jan 17, 2027", time: "—" },
      nights: 3,
      room: "TBD",
      guests: "4 guests",
      codes: [
        { label: "Chase Travel Trip ID (unconfirmed link)", value: "1018055048" }
      ],
      note: "Not booked yet — 3 nights needed between the Cebu return and flying home from Haneda (HND) on Jan 17. The Chase Travel Trip ID above may or may not be related; don't assume it covers this until verified."
    }
  ],

  /* ==========================================================================
     TIMELINE — the day-by-day story. Events reference flights/hotels by id
     (ref), so codes/times stay in sync automatically. "moment" events are
     just for fun/context and live entirely here.
     ========================================================================== */
  timeline: [
    { phase: "prelude", date: "Mon, Dec 28", emoji: "🧳", type: "flight", ref: "atl-sea",
      title: "Fly Atlanta → Seattle",
      blurb: "STILL NEEDS BOOKING — the opening leg. The W is holding the beds from Monday, so land by afternoon/evening." },

    { phase: "prelude", date: "Mon, Dec 28", emoji: "🎸", type: "hotel-in", ref: "seattle-w",
      title: "Check in: W Seattle",
      blurb: "Two downtown nights to start the trip easy — and Dec 29 is a free Seattle day. Pike Place? Great Wheel?" },

    { phase: "wheelsup", date: "Wed, Dec 30", emoji: "🧳", type: "hotel-out", ref: "seattle-w",
      title: "Early checkout → SEA airport",
      blurb: "JL67 leaves at 11:50 AM — be out the door by ~8 AM for bags, trains, and international check-in." },

    { phase: "wheelsup", date: "Wed, Dec 30", emoji: "🛫", type: "flight", ref: "sea-nrt",
      title: "Fly Seattle → Tokyo",
      blurb: "The big one. Wheels up 11:50 AM on JAL 67 — next stop, Japan." },

    { phase: "karuizawa", date: "Thu, Dec 31", emoji: "🛬", type: "moment",
      title: "Land at Narita, 3:05 PM — New Year's Eve!",
      blurb: "Grab bags, clear immigration, and start the ~3–4 hr journey to the mountains (shinkansen + bus/taxi, or rental car)." },

    { phase: "karuizawa", date: "Thu, Dec 31", emoji: "⛄", type: "hotel-in", ref: "karuizawa-hotel",
      title: "Check in: ANA Holiday Inn Resort Karuizawa",
      blurb: "Home for the next 4 nights. Ring in 2027 with temple bells in the snow." },

    { phase: "karuizawa", date: "Fri, Jan 1", emoji: "🎍", type: "moment",
      title: "New Year's Day in Japan",
      blurb: "Hatsumōde (first shrine visit), osechi treats, maybe the year's first onsen. 明けましておめでとう!" },

    { phase: "yokohama", date: "Mon, Jan 4", emoji: "🚄", type: "hotel-out", ref: "karuizawa-hotel",
      title: "Check out (11 AM) → train to Yokohama",
      blurb: "Shinkansen down from the mountains, ~2.5–3 hrs door to door." },

    { phase: "yokohama", date: "Mon, Jan 4", emoji: "🎡", type: "hotel-in", ref: "yokohama-hotel",
      title: "Check in: Hyatt Regency Yokohama",
      blurb: "4 nights of city adventures — Cup Noodles Museum, Chinatown, the big ferris wheel." },

    { phase: "cebu", date: "Fri, Jan 8", emoji: "🧳", type: "hotel-out", ref: "yokohama-hotel",
      title: "Check out of Yokohama",
      blurb: "Trade winter coats for swimsuits — travel day to the Philippines." },

    { phase: "cebu", date: "Fri, Jan 8", emoji: "✈️", type: "flight", ref: "jpn-ceb",
      title: "Fly Japan → Cebu",
      blurb: "STILL NEEDS BOOKING — this is the flight that makes beach week happen." },

    { phase: "cebu", date: "Fri, Jan 8", emoji: "🏝️", type: "hotel-in", ref: "cebu-hotel",
      title: "Check in: Dusit Thani Mactan Cebu",
      blurb: "6 nights of sea-view island time. 85°F and sunny, probably." },

    { phase: "finaljapan", date: "Thu, Jan 14", emoji: "🧳", type: "hotel-out", ref: "cebu-hotel",
      title: "Check out of Cebu (12 PM)",
      blurb: "One last mango shake, then back to Japan." },

    { phase: "finaljapan", date: "Thu, Jan 14", emoji: "✈️", type: "flight", ref: "ceb-jpn",
      title: "Fly Cebu → Japan",
      blurb: "STILL NEEDS BOOKING — return leg to Japan for the final stretch." },

    { phase: "finaljapan", date: "Jan 14 – 17", emoji: "🏨", type: "hotel-in", ref: "japan-final",
      title: "Final Tokyo-area stay — book this!",
      blurb: "3 nights, not yet booked. Needs to be sorted before flying home from Haneda on Jan 17." },

    { phase: "homeward", date: "Sun, Jan 17", emoji: "🛬", type: "flight", ref: "hnd-atl",
      title: "Fly Tokyo → Atlanta — home!",
      blurb: "Depart 4:25 PM, land 2:50 PM the same day. Yes, before you left. The date line gives back. Welcome home!" }
  ],

  /* ==========================================================================
     TO-DO — open items. Set done: true (or delete) as you knock them out.
     ========================================================================== */
  todos: [
    {
      done: false,
      priority: "high",
      title: "Book flight: Atlanta → Seattle (Mon, Dec 28)",
      detail: "The W Seattle is now booked for Dec 28–30 (check-in 4:00 PM), so book the flight to land Monday afternoon/evening. JL67 departs SEA at 11:50 AM on the 30th."
    },
    {
      done: false,
      priority: "medium",
      title: "Confirm the Seattle W booking covers all 4",
      detail: "Chase shows this as \"Seattle Stay 1\" with 2 guests (primary: Joshua, Trip #1020477405). If there's a \"Seattle Stay 2\" for the second room, send its details over to add here — if not, adjust the booking."
    },
    {
      done: false,
      priority: "high",
      title: "Book flight: Japan → Cebu (Fri, Jan 8)",
      detail: "Yokohama checkout and Cebu check-in are both Jan 8 — this flight is the hinge of the whole trip. ~5h nonstop options exist from NRT/HND."
    },
    {
      done: false,
      priority: "high",
      title: "Book flight: Cebu → Japan (Thu, Jan 14)",
      detail: "Dusit checkout is 12 PM. Return to Japan for the final stretch (flight home departs HND Jan 17)."
    },
    {
      done: false,
      priority: "high",
      title: "Book lodging for the final Tokyo-area stay (Jan 14–17)",
      detail: "Confirmed not booked yet — 3 nights needed between the Cebu return flight and flying home from Haneda on Jan 17. (The Chase Travel Trip ID #1018055048 on file may or may not be related — worth a check, but don't assume it covers this. It's not the W Seattle stay; that one is Trip #1020477405.)"
    },
    {
      done: false,
      priority: "high",
      title: "Verify the OLD Cebu booking is cancelled",
      detail: "Superseded booking: conf 2425769260 / Trip ID 1015472871 (Jan 7–14). The new Dusit stay is 2508069188. Make sure the old one is cancelled to avoid a double charge. (New booking has free cancellation until Dec 25, 2026, 6 PM property time.)"
    },
    {
      done: false,
      priority: "medium",
      title: "Confirm Alaska codes for Christina & Leila (SEA→NRT)",
      detail: "Codes on file: NQHBRY / AAN6Q9, e-tickets 0272137089357 & 0272137089358. Double-check with Alaska that both passengers are ticketed on JL67, Dec 30."
    }
  ],

  /* ==========================================================================
     GOOD TO KNOW — stable reference facts for the quick-reference section.
     ========================================================================== */
  goodToKnow: [
    { emoji: "🕐", title: "Time zones", detail: "Japan is 14 hrs ahead of Atlanta (UTC+9 vs UTC−5). Cebu is 13 hrs ahead (UTC+8) — 1 hr behind Japan." },
    { emoji: "💴", title: "Money", detail: "Japan: yen (¥) — cash still matters at small spots. Philippines: peso (₱). Cards fine at the resort." },
    { emoji: "🔌", title: "Plugs & power", detail: "Japan: Type A (US-style 2-prong), 100V — US plugs fit. Philippines: 220V, Type A/B/C — check chargers for '100–240V'." },
    { emoji: "🚨", title: "Emergency numbers", detail: "Japan: 110 (police) / 119 (fire & ambulance). Philippines: 911." },
    { emoji: "📶", title: "Staying connected", detail: "Grab eSIMs before leaving (Ubigi/Airalo etc.), or airport SIMs. This site works offline once loaded — add it to your home screen!" },
    { emoji: "🧳", title: "Packing reality check", detail: "One trip, two seasons: −7°C snow in Karuizawa AND 30°C beach in Cebu. Layers + swimsuits." }
  ]
};
