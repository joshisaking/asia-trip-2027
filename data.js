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
    // Trip start: DL714 ATL→SEA departs 9:15 PM Atlanta time on Dec 28.
    departureISO: "2026-12-28T21:15:00-05:00",
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
      emoji: "⛩️",
      name: "Back to Japan — Kyoto Finale",
      dates: "Jan 14 – 17 · 3 nights",
      tagline: "Return to Japan for the last few days — Kyoto, then a night near Haneda before flying home. Fully booked!",
      weather: "🧥 Typically 37–48°F (3–9°C) in mid-January, crisp and mostly dry",
      funFact: "Kyoto Station puts you steps from temples, shrines, and the Nishiki Market food stalls — a great low-key way to close out the trip. Then it's one easy hop to Hotel JAL City Haneda for the night before the flight home."
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
      status: "confirmed",
      phase: "prelude",
      from: { code: "ATL", city: "Atlanta (home)" },
      to:   { code: "SEA", city: "Seattle" },
      airline: "Delta Air Lines",
      flightNo: "DL714",
      aircraft: "—",
      cabin: "Delta Main Classic",
      depart: { date: "Mon, Dec 28, 2026", time: "9:15 PM", tz: "Atlanta" },
      arrive: { date: "Mon, Dec 28, 2026", time: "11:55 PM", tz: "Seattle" },
      duration: "5h 40m · nonstop",
      note: "The very first leg of the trip. Lands late (11:55 PM) — the W Seattle check-in is 4:00 PM but a late arrival is fine, the room's booked for Dec 28. Seat assignments weren't guaranteed at booking; check in for seats.",
      reservations: [
        {
          via: "Delta Air Lines",
          passengers: ["Joshua King", "Christina King", "Lucas King", "Leila King"],
          codes: [
            { label: "Airline reference", value: "G7A7HM" },
            { label: "Agency reference", value: "DLUFHX" },
            { label: "Trip ID", value: "1029332652" }
          ]
        }
      ]
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
      status: "confirmed",
      phase: "cebu",
      from: { code: "NRT", city: "Tokyo Narita" },
      to:   { code: "CEB", city: "Cebu" },
      airline: "Philippine Airlines",
      flightNo: "PR429 / PR2845",
      cabin: "Economy",
      depart: { date: "Fri, Jan 8, 2027", time: "9:35 PM", tz: "Japan" },
      arrive: { date: "Sat, Jan 9, 2027", time: "6:25 AM", tz: "Philippines" },
      duration: "9h 50m total (6h 50m flying) · 1 connection",
      note: "One-stop via Manila (MNL), NOT nonstop: PR429 NRT→MNL 9:35 PM–2:00 AM, then a 3-hour layover, then PR2845 MNL→CEB 5:00 AM–6:25 AM. Booked via Atmos Rewards, split across two separate reservations to use each parent's Global Companion Award. Yokohama checkout is Jan 8, so head straight to Narita.",
      reservations: [
        {
          via: "Alaska Airlines (Atmos Rewards) — Joshua's account",
          passengers: ["Joshua King", "Lucas King"],
          codes: [
            { label: "Alaska confirmation", value: "GCQIGQ" },
            { label: "Philippine Airlines confirmation", value: "CNZV7C" }
          ],
          note: "25,000 Atmos points redeemed (Joshua) + Global Companion Award applied to Lucas (code GLCOMP25KSRMR164216). $92.00 in taxes/fees charged."
        },
        {
          via: "Alaska Airlines (Atmos Rewards) — Christina's account",
          passengers: ["Christina King", "Leila King"],
          codes: [
            { label: "Alaska confirmation", value: "SNLNQQ" },
            { label: "Philippine Airlines confirmation", value: "CO3R6W" }
          ],
          note: "25,000 Atmos points redeemed (Christina) + Global Companion Award applied to Leila (code GLCOMP25KQRXD080022). $92.00 in taxes/fees charged."
        }
      ]
    },
    {
      id: "ceb-jpn",
      status: "confirmed",
      phase: "finaljapan",
      from: { code: "CEB", city: "Cebu" },
      to:   { code: "KIX", city: "Osaka Kansai" },
      airline: "Philippine Airlines",
      flightNo: "PR410",
      cabin: "Economy",
      depart: { date: "Thu, Jan 14, 2027", time: "8:25 AM", tz: "Philippines" },
      arrive: { date: "Thu, Jan 14, 2027", time: "1:35 PM", tz: "Japan" },
      duration: "4h 10m · nonstop",
      note: "Booked via Bilt (points redemption, not the Atmos companion-award strategy). Arrives into KIX/Osaka, not Tokyo — factor that into the Jan 14–17 lodging decision. Dusit Thani checkout is at noon, same day.",
      reservations: [
        {
          via: "Bilt Travel Portal",
          passengers: ["Joshua King", "Christina King", "Lucas King", "Leila King"],
          codes: [
            { label: "Airline confirmation", value: "CH4YSU" }
          ],
          note: "74,208 Bilt points redeemed · $0.00 billed to card."
        }
      ]
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
      guests: "4 guests · primary: Joshua L King",
      codes: [
        { label: "Hotel confirmation", value: "78076207" },
        { label: "Chase Trip ID", value: "1020477405" }
      ],
      note: "Confirmed to cover all 4 of you (the \"2 guests\" shown in Chase was just a display quirk). Checkout is officially noon, but JL67 departs 11:50 AM on the 30th: be out the door by ~8 AM. (Conf shows as \"78076207-\" in the Chase app.)"
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
        { label: "Stay reference", value: "2508069188" },
        { label: "Chase Trip ID", value: "1020377878" }
      ],
      price: "$1,991.40 total",
      cancellation: "Free cancellation until Dec 25, 2026, 6:00 PM (property time)",
      note: "This stay replaced an earlier booking (conf 2425769260, Jan 7–14) — that old one has been verified cancelled, no double-charge risk."
    },
    {
      id: "kyoto-hotel",
      status: "confirmed",
      phase: "finaljapan",
      emoji: "⛩️",
      name: "Mercure Kyoto Station",
      brand: "Accor / ALL",
      address: "288 Aburanokojicho, Shimogyo-ku, 600-8231 Kyoto, Japan",
      checkIn:  { date: "Thu, Jan 14, 2027", time: "2:00 PM" },
      checkOut: { date: "Sat, Jan 16, 2027", time: "11:00 AM" },
      nights: 2,
      room: "Superior Room, 2 Single Beds (Hollywood Twin, bath tub)",
      guests: "2 adults, 2 children",
      codes: [
        { label: "Reservation N°", value: "QNZHDMXT" }
      ],
      price: "¥24,000 total (paid at hotel)",
      cancellation: "Free cancellation until 18:00 the day before arrival (Jan 13, 2027)",
      note: "Covers only 2 of the 3 final nights — checkout is Jan 16, but the flight home doesn't leave Haneda until Jan 17. Still need lodging for the night of Jan 16–17 (Kyoto, or move to Tokyo/near Haneda for that last night)."
    },
    {
      id: "haneda-hotel",
      status: "confirmed",
      phase: "finaljapan",
      emoji: "🏨",
      name: "Hotel JAL City Haneda Tokyo (WEST WING)",
      brand: "Okura / Nikko Hotels",
      address: "4-4 Haneda Asahicho, Ota-ku, Tokyo 144-0042, Japan",
      checkIn:  { date: "Sat, Jan 16, 2027", time: "—" },
      checkOut: { date: "Sun, Jan 17, 2027", time: "—" },
      nights: 1,
      room: "Non-smoking Quad Style [MEMBER PRICE] ADVANCE 55",
      guests: "3 adults (booking engine's occupancy label for the family of 4)",
      codes: [
        { label: "Confirmation #", value: "70786SG008355" },
        { label: "Itinerary #", value: "9542B4906156" }
      ],
      price: "¥32,448 total, taxes/fees included",
      note: "Replaces the earlier Mercure Haneda booking (wrong dates), which was cancelled. This one has the correct dates — closes the final lodging gap before the Jan 17 flight home. Hotel phone: 81-3-57352525."
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
      blurb: "DL714, 9:15 PM–11:55 PM. Late arrival into Seattle, but the W Seattle room is booked for Dec 28 regardless." },

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
      title: "Fly Narita → Cebu (via Manila)",
      blurb: "Booked! PR429 + PR2845 via Philippine Airlines, one stop in Manila with a 3-hour layover. Depart 9:35 PM Jan 8, land in Cebu 6:25 AM Jan 9." },

    { phase: "cebu", date: "Fri, Jan 8", emoji: "🏝️", type: "hotel-in", ref: "cebu-hotel",
      title: "Check in: Dusit Thani Mactan Cebu",
      blurb: "6 nights of sea-view island time. 85°F and sunny, probably. Heads up: the flight doesn't land until 6:25 AM Sat Jan 9 — confirm the late arrival with the hotel (see To-Do)." },

    { phase: "finaljapan", date: "Thu, Jan 14", emoji: "🧳", type: "hotel-out", ref: "cebu-hotel",
      title: "Check out of Cebu (12 PM)",
      blurb: "One last mango shake, then back to Japan." },

    { phase: "finaljapan", date: "Thu, Jan 14", emoji: "✈️", type: "flight", ref: "ceb-jpn",
      title: "Fly Cebu → Osaka",
      blurb: "PR410, nonstop, 8:25 AM–1:35 PM. Booked! Lands at KIX, not Tokyo — worth factoring into the final lodging pick." },

    { phase: "finaljapan", date: "Jan 14 – 16", emoji: "⛩️", type: "hotel-in", ref: "kyoto-hotel",
      title: "Check in: Mercure Kyoto Station",
      blurb: "2 nights in Kyoto to close out the trip — culture, food, and a slower pace before heading home." },

    { phase: "finaljapan", date: "Sat, Jan 16", emoji: "🏨", type: "hotel-in", ref: "haneda-hotel",
      title: "Check in: Hotel JAL City Haneda Tokyo",
      blurb: "Last stop before flying home — right by the airport for an easy Jan 17 departure." },

    { phase: "homeward", date: "Sun, Jan 17", emoji: "🛬", type: "flight", ref: "hnd-atl",
      title: "Fly Tokyo → Atlanta — home!",
      blurb: "Depart 4:25 PM, land 2:50 PM the same day. Yes, before you left. The date line gives back. Welcome home!" }
  ],

  /* ==========================================================================
     TO-DO — open items. Set done: true (or delete) as you knock them out.
     ========================================================================== */
  todos: [
    {
      done: true,
      priority: "high",
      title: "Book flight: Atlanta → Seattle (Mon, Dec 28)",
      detail: "Booked: Delta DL714, departs ATL 9:15 PM, arrives SEA 11:55 PM. Airline ref G7A7HM / agency ref DLUFHX / Trip ID 1029332652. Seats weren't assigned at booking — check in for seats."
    },
    {
      done: true,
      priority: "medium",
      title: "Confirm the Seattle W booking covers all 4",
      detail: "Confirmed: the one booking (Trip #1020477405 / conf 78076207) covers all 4 of you. The \"2 guests\" shown in Chase was just a display quirk."
    },
    {
      done: true,
      priority: "high",
      title: "Book flight: Japan → Cebu (Fri, Jan 8)",
      detail: "Booked — but NOT nonstop and NOT landing Jan 8: PR429 NRT→MNL (9:35 PM–2:00 AM), a 3-hour Manila layover, then PR2845 MNL→CEB (5:00 AM–6:25 AM), landing Sat Jan 9. Booked as two separate reservations so each parent's Atmos account could apply its own 25K Global Companion Award: Joshua's account covered Joshua + Lucas (Alaska conf GCQIGQ / PA conf CNZV7C), Christina's covered herself + Leila (Alaska conf SNLNQQ / PA conf CO3R6W) — 50K Atmos + both companion certs used, $92 taxes/fees per reservation. IMPORTANT: the Dusit Thani check-in on file is Jan 8, 3:00 PM, but you won't land in Cebu until 6:25 AM Jan 9 — call the hotel to confirm the late arrival is fine and you're not charged a no-show for the night of the 8th."
    },
    {
      done: true,
      priority: "high",
      title: "Book flight: Cebu → Japan (Thu, Jan 14)",
      detail: "Booked via Bilt (PR410, Philippine Airlines, nonstop CEB→KIX, 8:25 AM–1:35 PM, conf CH4YSU, 74,208 points, $0 billed) — went a different route than the Atmos + Global Companion Award strategy used for the outbound Cebu flight. Lands at Osaka (KIX), not Tokyo — factor that into the Jan 14–17 lodging pick."
    },
    {
      done: true,
      priority: "medium",
      title: "Bilt → Atmos point transfers — no longer needed",
      detail: "Both Asia flights are booked. NRT→CEB used 50K in native Atmos points (25K per parent's account) plus both parents' Global Companion Awards; CEB→KIX was booked separately with Bilt points. No Bilt→Atmos transfer was needed after all — Bilt points and the full 100K Chase UR bonus remain free for future travel."
    },
    {
      done: true,
      priority: "high",
      title: "Book lodging for the night of Jan 16–17",
      detail: "Booked: Hotel JAL City Haneda Tokyo (WEST WING), Jan 16–17, confirmation #70786SG008355 / itinerary #9542B4906156. (An earlier Mercure Haneda booking had the wrong dates and was cancelled — this replaces it with the correct Jan 16–17 dates.)"
    },
    {
      done: true,
      priority: "high",
      title: "Verify the OLD Cebu booking is cancelled",
      detail: "Confirmed cancelled. Superseded booking: conf 2425769260 / Trip ID 1015472871 (Jan 7–14). Current stay is Dusit Thani, conf 2508069188 / Chase Trip ID 1020377878 — no double-charge risk."
    },
    {
      done: true,
      priority: "medium",
      title: "Confirm Alaska codes for Christina & Leila (SEA→NRT)",
      detail: "Confirmed via Alaska confirmation email: NQHBRY / AAN6Q9, e-tickets 0272137089357 & 0272137089358, both ticketed on JL67, Dec 30, Premium Economy."
    }
  ],

  /* ==========================================================================
     GOOD TO KNOW — stable reference facts for the quick-reference section.
     ========================================================================== */
  goodToKnow: [
    { emoji: "💳", title: "Asia flights: award strategy", detail: "Both Asia flights are booked. NRT→CEB (Jan 8–9, via Manila): 50K Atmos points across Joshua's and Christina's accounts, plus both parents' 25K Global Companion Awards applied to Lucas and Leila. CEB→KIX (Jan 14): booked with Bilt points instead (PR410). ATL→SEA was booked with cash on Delta (DL714), kept off Atmos as planned." },
    { emoji: "🕐", title: "Time zones", detail: "Japan is 14 hrs ahead of Atlanta (UTC+9 vs UTC−5). Cebu is 13 hrs ahead (UTC+8) — 1 hr behind Japan." },
    { emoji: "💴", title: "Money", detail: "Japan: yen (¥) — cash still matters at small spots. Philippines: peso (₱). Cards fine at the resort." },
    { emoji: "🔌", title: "Plugs & power", detail: "Japan: Type A (US-style 2-prong), 100V — US plugs fit. Philippines: 220V, Type A/B/C — check chargers for '100–240V'." },
    { emoji: "🚨", title: "Emergency numbers", detail: "Japan: 110 (police) / 119 (fire & ambulance). Philippines: 911." },
    { emoji: "📶", title: "Staying connected", detail: "Grab eSIMs before leaving (Ubigi/Airalo etc.), or airport SIMs. This site works offline once loaded — add it to your home screen!" },
    { emoji: "🧳", title: "Packing reality check", detail: "One trip, two seasons: −7°C snow in Karuizawa AND 30°C beach in Cebu. Layers + swimsuits." }
  ]
};
