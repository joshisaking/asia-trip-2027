# 👑 King Family Trips

Private family travel site. The homepage is the **current adventure** (Asia, Dec 30, 2026 → Jan 17, 2027); past trips live at `/2017/`, `/2018/`, and `/2022/` as video-game-style "levels" linked from the Level Select menu.
Live at **https://asia-trip-2027.vercel.app/**

Plain HTML/CSS/JS — no build step, no dependencies. Vercel serves the repo root as-is.

## ✏️ Updating the itinerary (the only thing you'll ever need to do)

**All trip data lives in [`data.js`](data.js).** Edit it, commit to `main`, and Vercel redeploys automatically in ~30 seconds. The file has instructions at the top; the common cases:

- **Booked one of the missing flights?** Find it in `flights` (it has `status: "needed"`), flip it to `"confirmed"`, and fill in the airline / times / confirmation codes like the confirmed examples. Then mark the matching `todos` entry `done: true`.
- **Verified the Chase Travel booking?** Update the `japan-final` entry in `hotels` with the real property details and set it to `"confirmed"`.
- **Anything else** (seats, codes, notes, fun facts) — it's all just text in that one file.

Statuses drive all the badges and the route map: `"confirmed"` = green, `"needed"` = red **NOT YET BOOKED**, `"verify"` = amber.

## 🧪 Previewing locally

```bash
npx serve .        # or: python3 -m http.server 8000
```

Then open the printed URL. (Opening `index.html` directly also works — the service worker just won't register.)

## 🔒 Privacy

The site is **unlisted, not secret**: anyone with the URL can view it (that's the point — easy to share with family), but it stays out of search engines via three layers:

- `<meta name="robots" content="noindex, nofollow, noarchive">` in the page
- `robots.txt` disallowing all crawlers
- `X-Robots-Tag` response header on every request (see `vercel.json`)

Want a real lock? Vercel **Deployment Protection → Password Protection** can be enabled on paid plans in the project settings — no code changes needed. (A JavaScript "password prompt" would only be decoration, so this site doesn't pretend.)

## 📱 Offline / travel mode

The site is a small PWA: after the first visit it's cached by a service worker (`sw.js`) and keeps working with no signal — useful mid-flight. On a phone: **Share → Add to Home Screen** to get an app-style icon.

When you update `data.js`, online visitors get the new version on next load (network-first strategy); offline visitors see the last version they loaded.

## 🗂 Files

| File | What it is |
|---|---|
| `data.js` | **The current trip's itinerary. Edit this one.** |
| `index.html` / `styles.css` / `app.js` | Current-trip page shell, styling, rendering — data-driven, no trip facts inside |
| `levels.js` | The Level Select registry — one entry per trip, shared by every page |
| `2017/` `2018/` `2022/` | Past-trip pages: each folder is just an `index.html` + a `data.js` with that trip's story |
| `past.js` + `past.css` | Shared renderer + level theming for all past-trip pages |
| `sw.js` + `manifest.webmanifest` | Offline support + Add-to-Home-Screen |
| `robots.txt` + `vercel.json` | Keep search engines out |
| `scripts/generate-icons.py` | Regenerates the PNG icons (`python3 scripts/generate-icons.py`), stdlib only |

## 🕹️ Adding another past trip ("level")

1. Copy an existing year folder (e.g. `2022/`) to the new year, and rewrite its `data.js` — route stops, chapters/events, achievements. The comments at the top show the shape.
2. In the new `index.html`, change `data-trip="tYYYY"`, the `<title>`, and the `theme-color`.
3. Give the level its own colors: add an `html[data-trip="tYYYY"]` block in `past.css` (hero gradient + accent).
4. Add the trip to `levels.js` — it then appears in every Level Select menu automatically.
5. Optional: add the new pages to the precache list in `sw.js` and bump its cache version.
