# 👑 Kings Take Asia — Trip Site

Private family itinerary site for the Asia trip, **Dec 30, 2026 → Jan 17, 2027**.
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
| `data.js` | **The itinerary. Edit this one.** |
| `index.html` / `styles.css` / `app.js` | Page shell, styling, rendering — data-driven, no trip facts inside |
| `sw.js` + `manifest.webmanifest` | Offline support + Add-to-Home-Screen |
| `robots.txt` + `vercel.json` | Keep search engines out |
| `scripts/generate-icons.py` | Regenerates the PNG icons (`python3 scripts/generate-icons.py`), stdlib only |
