/* ============================================================================
   LEVEL 2 · EUROPE 2018 — "Emerald & Adriatic"
   Sep 6 – Oct 1, 2018 · Joshua & Christina · Ireland, Scotland, England,
   Croatia & Czechia. Edit this file to tweak anything on the /2018/ page.
   ============================================================================ */

const PAST_TRIP = {

  meta: {
    level: 2,
    year: "2018",
    endYear: 2018,
    title: "Emerald & Adriatic",
    subtitle: "Ireland → Scotland → England → Croatia → Czechia",
    dateRange: "Sep 6 – Oct 1, 2018",
    days: 26,
    travelers: [
      { name: "Joshua", emoji: "👨" },
      { name: "Christina", emoji: "👩" }
    ],
    stats: [
      { value: "26", label: "days" },
      { value: "5",  label: "countries" },
      { value: "7",  label: "flights" },
      { value: "9",  label: "beds" }
    ]
  },

  route: {
    stops: [
      { emoji: "🏠", name: "Orlando",    sub: "Sep 6" },
      { emoji: "☘️", name: "Dublin",     sub: "Sep 7 – 9" },
      { emoji: "💍", name: "Galway",     sub: "Sep 9 – 10" },
      { emoji: "🌊", name: "Shannon",    sub: "Sep 10 – 11 · Cliffs of Moher" },
      { emoji: "🚜", name: "Fife",       sub: "Sep 11 – 13 · Dave & Kath" },
      { emoji: "🏰", name: "Edinburgh",  sub: "Sep 13 – 16" },
      { emoji: "🎡", name: "London",     sub: "Sep 16 – 19 · via Suffolk" },
      { emoji: "🌊", name: "Split",      sub: "Sep 19 – 22" },
      { emoji: "🏖️", name: "Brač",       sub: "Sep 22 – 24" },
      { emoji: "🏰", name: "Prague",     sub: "Sep 24 – Oct 1 · Jenna & Nick" },
      { emoji: "🧜", name: "Copenhagen", sub: "Oct 1 · layover speedrun" },
      { emoji: "🏠", name: "Orlando",    sub: "Home!" }
    ],
    modes: ["fly", "drive", "drive", "fly", "bus", "train", "fly", "ferry", "fly", "fly", "fly"]
  },

  chapters: [
    {
      emoji: "☘️",
      name: "Ireland",
      dates: "Sep 6 – 11",
      color: "#0f9d6b",
      tagline: "Dublin pints, Galway rings, and the Cliffs of Moher.",
      funFact: "Galway to-do list: a 'cloudy' glass of Guinness at Ward's, a Claddagh ring, and McDonnagh's fish & chips. All achieved.",
      events: [
        { date: "Sep 6 – 7", emoji: "🛫", title: "Fly Orlando → Oslo → Dublin",
          blurb: "Norwegian overnight, rental car from Dan Dooley, Airbnb on Dublin Bay.",
          codes: [{ label: "Norwegian ref", value: "VJEJJN" }, { label: "Car rental", value: "WFX0320F9E" }] },
        { date: "Sat, Sep 8", emoji: "📖", title: "Book of Kells, walking tour & Guinness",
          blurb: "Trinity College at 8:30, Sandeman tour from Barnardo Square, the Storehouse at 1:30, then a cliff hike + dinner in Howth.",
          codes: [{ label: "Guinness", value: "JK738901" }] },
        { date: "Sun, Sep 9", emoji: "🥃", title: "Church in Swords, Slane Distillery, drive to Galway",
          blurb: "Sunday service, a distillery on the Slane Castle grounds, then two hours west." },
        { date: "Mon, Sep 10", emoji: "🌊", title: "Cliffs of Moher",
          blurb: "Parked in Doolin, shuttle to the trailhead, and hiked the edge of Ireland. Overnight in Shannon." }
      ]
    },
    {
      emoji: "🏰",
      name: "Scotland",
      dates: "Sep 11 – 16",
      color: "#4664d6",
      tagline: "Farm days in Fife with Dave & Kath, then Edinburgh and the Highlands.",
      funFact: "St Andrews delivered the classic trio: the beach, the cathedral ruins, and the university.",
      events: [
        { date: "Tue, Sep 11", emoji: "🛫", title: "Fly Shannon → Edinburgh",
          blurb: "Aer Lingus, then out to The Farmhouse in Leven, Fife.",
          codes: [{ label: "Aer Lingus ref", value: "2GWA2S" }] },
        { date: "Wed, Sep 12", emoji: "⛳", title: "St Andrews day",
          blurb: "Beach walk, cathedral, and the auld grey toun." },
        { date: "Fri, Sep 14", emoji: "🏔️", title: "Rabbie's Highlands tour",
          blurb: "8 AM departure from Waterloo Place — lochs, glens, and highland coos.",
          codes: [{ label: "Tour", value: "707699" }] },
        { date: "Sat, Sep 15", emoji: "🏰", title: "The Royal Mile",
          blurb: "Castle to Holyrood on foot, exploring Edinburgh's closes." }
      ]
    },
    {
      emoji: "🎡",
      name: "England",
      dates: "Sep 16 – 19",
      color: "#b0413e",
      tagline: "A train south, friends in Suffolk, London landmarks, and an Oxford literary pilgrimage.",
      funFact: "The Oxford day was a full Inklings circuit: C.S. Lewis's home, his church, the Eagle and Child pub, and the Bodleian's Tolkien exhibition.",
      events: [
        { date: "Sun, Sep 16", emoji: "🚄", title: "Train Edinburgh → Cambridge",
          blurb: "Church at King's in the morning, then the 14:00 LNER south with a change at Peterborough — dinner with the Bennetts in West Row.",
          codes: [{ label: "Rail ref", value: "35RHF3CG" }] },
        { date: "Mon, Sep 17", emoji: "🎡", title: "Into London",
          blurb: "Big Ben, the bridges, Buckingham Palace, Westminster, Notting Hill — the greatest-hits walk." },
        { date: "Tue, Sep 18", emoji: "📚", title: "Oxford: Lewis & Tolkien day",
          blurb: "10 AM tour of the Kilns (£25 cash, worth every pound), Holy Trinity, a pint at the Eagle and Child, and the 2 PM Tolkien exhibition.",
          codes: [{ label: "Tolkien exhibit", value: "20180820-805109" }] }
      ]
    },
    {
      emoji: "🌊",
      name: "Croatia",
      dates: "Sep 19 – 24",
      color: "#0ea5a4",
      tagline: "Split's old town, Krka waterfalls, island boats, and Brač's famous beach.",
      funFact: "Zlatni Rat — the 'Golden Horn' on Brač — is a shape-shifting spit of pebbles that bends with the wind and currents.",
      events: [
        { date: "Wed, Sep 19", emoji: "🛬", title: "Fly London Gatwick → Split",
          blurb: "Norwegian into the Adriatic sunshine; Airbnb inside the old town, dinner at Konoba Grego Lavonte.",
          codes: [{ label: "Norwegian ref", value: "RFX8JN" }] },
        { date: "Thu, Sep 20", emoji: "💦", title: "Krka National Park",
          blurb: "Picked up the rental car and chased waterfalls all afternoon.",
          codes: [{ label: "Car rental", value: "140620186382" }] },
        { date: "Fri, Sep 21", emoji: "🚤", title: "Waterworld island tour — Vis & the Blue Cave",
          blurb: "7:30 AM from Matejuška pier: five islands, one glowing cave.",
          codes: [{ label: "Booking", value: "15334273" }] },
        { date: "Sep 22 – 24", emoji: "🏖️", title: "Ferry to Brač + Zlatni Rat beach",
          blurb: "Two nights in Supetar and a day on Croatia's most famous beach." }
      ]
    },
    {
      emoji: "🏰",
      name: "Czechia",
      dates: "Sep 24 – Oct 1",
      color: "#c2410c",
      tagline: "A week in Prague with Jenna & Nick, plus a fairy-tale side quest to Český Krumlov.",
      funFact: "Prague list: Old Town, the castle, the bone church, a pub pouring every Czech beer — and yes, a beer spa is a real thing there.",
      events: [
        { date: "Mon, Sep 24", emoji: "🛬", title: "Fly Split → Prague",
          blurb: "SmartWings via Priceline, straight to Jenna & Nick's place. JENNA AND NICK!",
          codes: [{ label: "Priceline", value: "141-286-504-37" }] },
        { date: "Sep 25 – 27", emoji: "🍻", title: "Prague with locals",
          blurb: "Old Town, castle views, camper coffee shop, and their friends — the best way to see a city." },
        { date: "Sep 28 – 29", emoji: "🛶", title: "Český Krumlov road trip + kayaking",
          blurb: "Budget rental at 8 AM (highway sticker from the gas station — important!), a storybook town, and paddling the Vltava.",
          codes: [{ label: "Car (Orbitz)", value: "42232617US0" }] },
        { date: "Mon, Oct 1", emoji: "🧜", title: "Home via a Copenhagen speedrun",
          blurb: "Morning flight, luggage into lockers, an afternoon exploring Copenhagen, then the evening Norwegian to Orlando.",
          codes: [{ label: "Norwegian ref", value: "RGIE66" }] }
      ]
    }
  ],

  achievements: [
    { emoji: "🍺", title: "Perfect Pour", detail: "Guinness Storehouse tour, followed by the 'cloudy' pint at Ward's in Galway." },
    { emoji: "🌊", title: "Cliff Walker", detail: "Howth cliff hike AND the Cliffs of Moher in one week." },
    { emoji: "💍", title: "Claddagh Acquired", detail: "The real thing, from Galway." },
    { emoji: "🏔️", title: "Highland Raid", detail: "Full-day Rabbie's tour into the Scottish Highlands." },
    { emoji: "🦁", title: "Wardrobe Hunter", detail: "C.S. Lewis's Kilns, the Eagle and Child, and the Tolkien exhibition in one Oxford day." },
    { emoji: "🚤", title: "Blue Cave Raider", detail: "Island-hopped from Split to Vis and the glowing Blue Cave of Biševo." },
    { emoji: "💦", title: "Chasing Waterfalls", detail: "Krka National Park's cascades." },
    { emoji: "🏖️", title: "Golden Horn", detail: "Beach day at Zlatni Rat, Brač." },
    { emoji: "🛶", title: "Vltava Paddler", detail: "Kayaked past Český Krumlov's castle." },
    { emoji: "🥐", title: "Layover Speedrun", detail: "Copenhagen in an afternoon, luggage in lockers." },
    { emoji: "🤝", title: "Friends Everywhere", detail: "Dave & Kath's farmhouse in Fife, the Bennetts in Suffolk, Jenna & Nick in Prague." }
  ]
};
