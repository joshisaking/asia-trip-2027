/* ============================================================
   PAST TRIP PAGES — shared renderer (past.js)
   Renders an archive page from PAST_TRIP (each year's data.js)
   plus the shared TRIP_LEVELS registry (levels.js).
   ============================================================ */

(function () {
  "use strict";

  const D = PAST_TRIP;
  const $ = (sel) => document.querySelector(sel);
  const mapMQ = window.matchMedia("(max-width: 700px)");

  const esc = (s) =>
    String(s ?? "").replace(/[&<>"']/g, (m) =>
      ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[m])
    );

  const copyChip = (label, value) =>
    `<button class="copy" type="button" data-value="${esc(value)}" title="Tap to copy">
       <span><span class="cl">${esc(label)}</span><span class="cv">${esc(value)}</span></span>
       <span class="ci">📋</span>
     </button>`;

  const mapsLink = (address) =>
    `<a class="map-link" href="https://maps.google.com/?q=${encodeURIComponent(address)}" target="_blank" rel="noopener">📍 Open in Google Maps</a>`;

  /* ---------------- theme ---------------- */
  function initTheme() {
    const saved = localStorage.getItem("trip-theme");
    const dark = saved ? saved === "dark" : matchMedia("(prefers-color-scheme: dark)").matches;
    applyTheme(dark);
    $("#themeToggle").addEventListener("click", () => {
      const isDark = document.documentElement.dataset.theme === "dark";
      applyTheme(!isDark);
      localStorage.setItem("trip-theme", !isDark ? "dark" : "light");
    });
  }
  function applyTheme(dark) {
    document.documentElement.dataset.theme = dark ? "dark" : "light";
    $("#themeToggle").textContent = dark ? "☀️" : "🌙";
  }

  /* ---------------- hero ---------------- */
  function renderHero() {
    document.title = `${D.meta.title} · Europe ${D.meta.year} 👑`;
    $("#levelChip").textContent = `🕹️ Level ${D.meta.level} · Europe ${D.meta.year}`;
    $("#heroTitle").textContent = D.meta.title;
    $("#heroSub").textContent = D.meta.subtitle;
    $("#heroDates").textContent = D.meta.dateRange;

    $("#travelers").innerHTML = D.meta.travelers
      .map((t) => `<span class="traveler">${t.emoji} ${esc(t.name)}</span>`)
      .join("");

    const yearsAgo = Math.max(0, new Date().getFullYear() - D.meta.endYear);
    $("#stamp").innerHTML = `
      <div class="stamp-top">LEVEL CLEARED</div>
      <span class="stamp-stars">★★★</span>
      <div class="stamp-sub">${yearsAgo} years ago · ${D.meta.days} days of memories banked</div>`;

    $("#heroStats").innerHTML = D.meta.stats
      .map((s) => `<span class="hstat"><b>${esc(s.value)}</b><span>${esc(s.label)}</span></span>`)
      .join("");
  }

  /* ---------------- route map (generic snake) ----------------
     Works for any number of stops: 4 per row on desktop, snaking
     left→right→left; a single vertical line on phones. */
  const MODE_EMOJI = { train: "🚄", drive: "🚗", ferry: "⛴️", bus: "🚌" };
  const PLANE = '<path d="M-1,-8 L18,0 L-1,8 L4,0 Z" fill="var(--ink)" opacity="0.9"/>';

  function stopSVG(s, x, y, labelAbove, horizLabel) {
    const nameY = horizLabel ? y - 3 : labelAbove ? y - 54 : y + 46;
    const subY = horizLabel ? y + 15 : labelAbove ? y - 36 : y + 64;
    const lx = horizLabel ? x + 34 : x;
    const anchor = horizLabel ? "start" : "middle";
    return `
      <g class="map-stop">
        <circle cx="${x}" cy="${y}" r="22" fill="var(--card)" stroke="var(--line)" stroke-width="2"/>
        <text x="${x}" y="${y + 7}" text-anchor="middle" font-size="19">${s.emoji}</text>
        <text x="${lx}" y="${nameY}" text-anchor="${anchor}" class="map-label">${esc(s.name)}</text>
        <text x="${lx}" y="${subY}" text-anchor="${anchor}" class="map-sublabel">${esc(s.sub)}</text>
      </g>`;
  }

  function segSVG(d, mode) {
    const fly = mode === "fly";
    return `<path d="${d}" fill="none" class="${fly ? "seg-fly" : "seg-ground"}"
      stroke-width="${fly ? 5 : 4}" stroke-linecap="round" stroke-dasharray="${fly ? "2 11" : "1 9"}"/>`;
  }

  function buildDesktopMap() {
    const stops = D.route.stops, modes = D.route.modes;
    const COLS = [120, 380, 640, 900], PER = 4, ROWY = 200, Y0 = 110, R = 60;
    const pos = stops.map((_, i) => {
      const row = Math.floor(i / PER), k = i % PER;
      const col = row % 2 === 0 ? k : PER - 1 - k;
      return { x: COLS[col], y: Y0 + row * ROWY, row };
    });
    const rows = Math.floor((stops.length - 1) / PER) + 1;
    const height = Y0 + (rows - 1) * ROWY + 110;

    let segs = "", emojis = "", planePath = `M${pos[0].x},${pos[0].y}`;
    for (let i = 0; i < stops.length - 1; i++) {
      const a = pos[i], b = pos[i + 1], mode = modes[i];
      let d;
      if (a.row === b.row) {
        d = `M${a.x},${a.y} L${b.x},${b.y}`;
        planePath += ` L${b.x},${b.y}`;
        if (MODE_EMOJI[mode]) emojis += `<text x="${(a.x + b.x) / 2}" y="${a.y - 14}" text-anchor="middle" font-size="16">${MODE_EMOJI[mode]}</text>`;
      } else {
        const right = a.row % 2 === 0;                    // even rows end at the right edge
        const ex = right ? a.x + R : a.x - R;             // edge x (960 / 40)
        const sw1 = right ? 1 : 0;
        const arc = `A${R},${R} 0 0 ${sw1}`;
        d = `M${a.x},${a.y} ${arc} ${ex},${a.y + R} L${ex},${b.y - R} ${arc} ${b.x},${b.y}`;
        planePath += ` ${arc} ${ex},${a.y + R} L${ex},${b.y - R} ${arc} ${b.x},${b.y}`;
        if (MODE_EMOJI[mode]) emojis += `<text x="${ex}" y="${(a.y + b.y) / 2 + 6}" text-anchor="middle" font-size="16">${MODE_EMOJI[mode]}</text>`;
      }
      segs += segSVG(d, mode);
    }

    const stopsSVG = stops.map((s, i) => stopSVG(s, pos[i].x, pos[i].y, pos[i].row === 0, false)).join("");
    return `
      <svg viewBox="0 0 1000 ${height}" role="img" aria-label="Route map: ${esc(stops.map((s) => s.name).join(" to "))}">
        ${segs}${emojis}${stopsSVG}
        <g>${PLANE}<animateMotion dur="${8 * rows + 10}s" repeatCount="indefinite" rotate="auto" path="${planePath}"/></g>
      </svg>`;
  }

  function buildMobileMap() {
    const stops = D.route.stops, modes = D.route.modes;
    const STEP = 132, START = 56, CX = 46, LX = CX + 34;
    const ys = stops.map((_, i) => START + i * STEP);
    const height = ys[ys.length - 1] + 90;

    const segs = modes
      .map((mode, i) => {
        const y1 = ys[i] + 26, y2 = ys[i + 1] - 26, mid = (y1 + y2) / 2;
        const emoji = MODE_EMOJI[mode]
          ? `<text x="${CX}" y="${mid + 6}" text-anchor="middle" font-size="15">${MODE_EMOJI[mode]}</text>` : "";
        return segSVG(`M${CX},${y1} L${CX},${y2}`, mode) + emoji;
      })
      .join("");
    const stopsSVG = stops.map((s, i) => stopSVG(s, CX, ys[i], false, true)).join("");
    const planePath = "M" + ys.map((y) => `${CX},${y}`).join(" L");

    return `
      <svg viewBox="0 0 320 ${height}" role="img" aria-label="Route map: ${esc(stops.map((s) => s.name).join(" to "))}">
        ${segs}${stopsSVG}
        <g>${PLANE}<animateMotion dur="${3 * stops.length}s" repeatCount="indefinite" rotate="auto" path="${planePath}"/></g>
      </svg>`;
  }

  function renderRouteMap() {
    $("#routeMap").innerHTML = mapMQ.matches ? buildMobileMap() : buildDesktopMap();
  }

  /* ---------------- timeline ---------------- */
  function renderTimeline() {
    $("#timelineList").innerHTML = D.chapters
      .map(
        (ch) => `
      <div class="chapter" style="--ph: ${esc(ch.color)}">
        <div class="chapter-head reveal" data-emoji="${ch.emoji}">
          <h3 class="chapter-name">${ch.emoji} ${esc(ch.name)} <span class="chapter-dates">${esc(ch.dates)}</span></h3>
          ${ch.tagline ? `<p class="chapter-tagline">${esc(ch.tagline)}</p>` : ""}
          ${ch.funFact ? `<div class="chapter-meta"><span class="chapter-fact">💡 ${esc(ch.funFact)}</span></div>` : ""}
        </div>
        <div class="events">
          ${ch.events
            .map((ev) => {
              const facts = (ev.facts || [])
                .map(([l, v]) => `<div class="fact"><span class="fl">${esc(l)}</span><span>${esc(v)}</span></div>`)
                .join("");
              const codes = (ev.codes || []).map((c) => copyChip(c.label, c.value)).join("");
              const hasDetails = facts || codes || ev.address;
              return `
              <div class="event">
                <div class="event-dot">${ev.emoji}</div>
                <div class="event-card">
                  <div class="event-top"><span class="event-date">${esc(ev.date)}</span></div>
                  <h4 class="event-title">${esc(ev.title)}</h4>
                  ${ev.blurb ? `<p class="event-blurb">${esc(ev.blurb)}</p>` : ""}
                  ${hasDetails ? `
                  <div class="event-details">
                    ${facts ? `<div class="event-facts">${facts}</div>` : ""}
                    ${codes ? `<div class="codes">${codes}</div>` : ""}
                    ${ev.address ? `<div class="fact" style="margin-top:6px"><span class="fl">Address</span><span>${esc(ev.address)}</span></div>${mapsLink(ev.address)}` : ""}
                  </div>` : ""}
                  ${ev.note ? `<p class="tnote">💬 ${esc(ev.note)}</p>` : ""}
                </div>
              </div>`;
            })
            .join("")}
        </div>
      </div>`
      )
      .join("");
  }

  /* ---------------- achievements + time capsule ---------------- */
  function renderAchievements() {
    $("#achGrid").innerHTML = D.achievements
      .map(
        (a) => `
      <div class="ach reveal">
        <div class="ach-emoji">${a.emoji}</div>
        <div><h3>${esc(a.title)}</h3><p>${esc(a.detail)}</p></div>
      </div>`
      )
      .join("");

    const cap = $("#capsule");
    if (D.timeCapsule && D.timeCapsule.length) {
      $("#capsuleGrid").innerHTML = D.timeCapsule
        .map((k) => `<div class="know reveal"><h3>${k.emoji} ${esc(k.title)}</h3><p>${esc(k.detail)}</p></div>`)
        .join("");
    } else if (cap) {
      cap.remove();
    }
  }

  /* ---------------- level select ---------------- */
  function levelCard(l) {
    const status = l.status === "current"
      ? '<span class="level-status current">▶ Now playing</span>'
      : '<span class="level-status cleared">✓ Cleared ★★★</span>';
    return `
      <a class="level-card reveal" href="${l.href}">
        <div class="level-top" data-emoji="${l.emoji}" style="background:${l.grad}">
          <span class="level-year">${esc(l.year)}</span>
          <span class="level-num">Level ${l.level}</span>
        </div>
        <div class="level-body">
          <h3 class="level-title">${l.emoji} ${esc(l.title)}</h3>
          <p class="level-dates">${esc(l.dates)}</p>
          <p class="level-blurb">${esc(l.blurb)}</p>
          ${status}
        </div>
      </a>`;
  }

  function renderLevels() {
    $("#levelGrid").innerHTML = TRIP_LEVELS.map(levelCard).join("");
    $("#levelLinks").innerHTML = TRIP_LEVELS
      .filter((l) => l.year !== D.meta.year)
      .map((l) => `<a href="${l.href}">${l.emoji} ${esc(l.year)}</a>`)
      .join("");
  }

  /* ---------------- copy / toast / reveal / sw ---------------- */
  let toastTimer;
  function toast(msg) {
    const t = $("#toast");
    t.textContent = msg;
    t.classList.add("show");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => t.classList.remove("show"), 1900);
  }

  function copyText(text) {
    if (navigator.clipboard && window.isSecureContext) return navigator.clipboard.writeText(text);
    return new Promise((resolve, reject) => {
      const ta = document.createElement("textarea");
      ta.value = text;
      ta.style.cssText = "position:fixed;opacity:0";
      document.body.appendChild(ta);
      ta.select();
      try { document.execCommand("copy") ? resolve() : reject(); }
      catch (e) { reject(e); }
      finally { ta.remove(); }
    });
  }

  document.addEventListener("click", (e) => {
    const btn = e.target.closest(".copy");
    if (!btn) return;
    copyText(btn.dataset.value).then(
      () => {
        btn.classList.add("copied");
        const icon = btn.querySelector(".ci");
        if (icon) icon.textContent = "✅";
        toast(`Copied: ${btn.dataset.value}`);
        setTimeout(() => {
          btn.classList.remove("copied");
          if (icon) icon.textContent = "📋";
        }, 1600);
      },
      () => toast("Couldn't copy — long-press to select instead")
    );
  });

  function initReveal() {
    const els = document.querySelectorAll(".reveal");
    if (!("IntersectionObserver" in window)) {
      els.forEach((el) => el.classList.add("in"));
      return;
    }
    const io = new IntersectionObserver(
      (entries) => entries.forEach((en) => {
        if (en.isIntersecting) { en.target.classList.add("in"); io.unobserve(en.target); }
      }),
      { threshold: 0.06 }
    );
    els.forEach((el) => io.observe(el));
  }

  /* ---------------- boot ---------------- */
  initTheme();
  renderHero();
  renderRouteMap();
  renderTimeline();
  renderAchievements();
  renderLevels();
  initReveal();
  if (mapMQ.addEventListener) mapMQ.addEventListener("change", renderRouteMap);
  else if (mapMQ.addListener) mapMQ.addListener(renderRouteMap);
  if ("serviceWorker" in navigator && (location.protocol === "https:" || location.hostname === "localhost")) {
    navigator.serviceWorker.register("/sw.js").catch(() => {});
  }
})();
