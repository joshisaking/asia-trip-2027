/* ============================================================================
   TRIP LEVELS — the "level select" registry shared by every page.
   Add a new past trip here (and create its /<year>/ folder) and it will
   automatically appear in the level-select menus on every page.
   ============================================================================ */

const TRIP_LEVELS = [
  {
    level: 1,
    year: "2017",
    href: "/2017/",
    emoji: "🏛️",
    title: "The Grand Tour",
    dates: "May 4 – Jun 11, 2017",
    blurb: "39 days, 8 countries: Amsterdam to the Alps, Italy, Greece, Morocco, Spain & Paris.",
    grad: "linear-gradient(140deg, #fbbf24 0%, #06b6d4 45%, #1d4ed8 100%)",
    status: "cleared"
  },
  {
    level: 2,
    year: "2018",
    href: "/2018/",
    emoji: "☘️",
    title: "Emerald & Adriatic",
    dates: "Sep 6 – Oct 1, 2018",
    blurb: "Ireland, Scotland & England, then sunshine in Croatia and castles in Czechia.",
    grad: "linear-gradient(140deg, #a3e635 0%, #10b981 45%, #0e7490 100%)",
    status: "cleared"
  },
  {
    level: 3,
    year: "2022",
    href: "/2022/",
    emoji: "🧸",
    title: "Alps on Toddler Mode",
    dates: "Apr 28 – May 14, 2022",
    blurb: "Switzerland, Prague & Spain with 2-year-old Lucas — masks, forms, and trdelník.",
    grad: "linear-gradient(140deg, #38bdf8 0%, #818cf8 45%, #e11d48 100%)",
    status: "cleared"
  },
  {
    level: 4,
    year: "2026–27",
    href: "/",
    emoji: "🌏",
    title: "The Kings Take Asia",
    dates: "Dec 30, 2026 – Jan 17, 2027",
    blurb: "Japan snow, Tokyo-bay city lights and Philippine beaches — the current adventure.",
    grad: "linear-gradient(140deg, #ff9e57 0%, #ff5d8a 45%, #8e5cf7 100%)",
    status: "current"
  }
];
