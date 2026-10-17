# King Family Trips (asia-trip-2027)

A private family travel site. The homepage is the current trip (Asia, Dec 30 2026 → Jan 17
2027), and past trips at `/2017/`, `/2018/`, `/2022/` and `/2024/` are video-game-style "levels".

- Plain HTML/CSS/JS with no build step. Live at https://asia-trip-2027.vercel.app/
- **A push to `main` auto-deploys.**
- **All trip data lives in `data.js`.**
  - Statuses drive the badges and the route map: `"confirmed"` = green, `"needed"` = red, `"verify"` = amber.
  - When a flight is booked, flip its status and mark the matching `todos` entry `done: true`.
- Preview with `npx serve .`. See `README.md` for details.
