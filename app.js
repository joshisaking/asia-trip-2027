/* ============================================================
   KINGS TAKE ASIA — app.js
   Renders the whole site from TRIP_DATA (data.js).
   You shouldn't need to touch this file to update trip details.
   ============================================================ */

(function () {
  "use strict";

  const D = TRIP_DATA;
  const $ = (sel) => document.querySelector(sel);
  const mapMQ = window.matchMedia("(max-width: 700px)");

  const esc = (s) =>
    String(s ?? "").replace(/[&<>"']/g, (m) =>
      ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[m])
    );

  const BADGES = {
    confirmed: '<span class="badge badge-confirmed">✓ Confirmed</span>',
    needed: '<span class="badge badge-needed">⚠ Not yet booked</span>',
    verify: '<span class="badge badge-verify">🔍 Verify</span>',
  };
  const badge = (status) => BADGES[status] || "";

  const flightById = (id) => D.flights.find((f) => f.id === id);
  const hotelById = (id) => D.hotels.find((h) => h.id === id);

  const copyChip = (label, value) =>
    `<button class="copy" type="button" data-value="${esc(value)}" title="Tap to copy">
       <span><span class="cl">${esc(label)}</span><span class="cv">${esc(value)}</span></span>
       <span class="ci">📋</span>
     </button>`;

  const codeChips = (codes) =>
    codes && codes.length
      ? `<div class="codes">${codes.map((c) => copyChip(c.label, c.value)).join("")}</div>`
      : "";

  const mapsLink = (address) =>
    /TBD/i.test(address)
      ? ""
      : `<a class="map-link" href="https://maps.google.com/?q=${encodeURIComponent(address)}" target="_blank" rel="noopener">📍 Open in Google Maps</a>`;

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
    const meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.content = dark ? "#171221" : "#ff5d8a";
  }

  /* ---------------- hero ---------------- */
  function renderHero() {
    document.title = `${D.meta.title} ✈️ ${D.meta.dateRange}`;
    $("#heroTitle").textContent = D.meta.title;
    $("#heroSub").textContent = D.meta.subtitle;
    $("#heroDates").textContent = D.meta.dateRange;

    $("#travelers").innerHTML = D.meta.travelers
      .map((t) => `<span class="traveler">${t.emoji} ${esc(t.name.split(" ")[0])}</span>`)
      .join("");

    $("#heroStats").innerHTML = D.meta.stats
      .map((s) => `<span class="hstat"><b>${esc(s.value)}</b><span>${esc(s.label)}</span></span>`)
      .join("");
  }

  /* ---------------- countdown ---------------- */
  function startCountdown() {
    const box = $("#countdown");
    const dep = new Date(D.meta.departureISO);
    const end = new Date(D.meta.tripEndISO);
    const pad = (n) => String(n).padStart(2, "0");

    function tick() {
      const now = new Date();
      if (now < dep) {
        const diff = dep - now;
        const d = Math.floor(diff / 864e5);
        const h = Math.floor(diff / 36e5) % 24;
        const m = Math.floor(diff / 6e4) % 60;
        const s = Math.floor(diff / 1e3) % 60;
        box.innerHTML = [
          [d, "days"], [pad(h), "hours"], [pad(m), "mins"], [pad(s), "secs"],
        ]
          .map(([v, l]) => `<div class="cd-box"><div class="cd-num">${v}</div><div class="cd-lbl">${l}</div></div>`)
          .join("");
      } else if (now < end) {
        const day = Math.min(D.meta.tripDays, Math.floor((now - dep) / 864e5) + 1);
        box.innerHTML = `<div class="cd-msg">✈️ Trip in progress — Day ${day} of ${D.meta.tripDays}!</div>`;
      } else {
        box.innerHTML = `<div class="cd-msg">🎉 Trip complete — what a ride!</div>`;
      }
    }
    tick();
    setInterval(tick, 1000);
  }

  /* ---------------- booking progress ---------------- */
  function renderProgress() {
    const pieces = [...D.flights, ...D.hotels];
    const done = pieces.filter((p) => p.status === "confirmed").length;
    const pct = Math.round((done / pieces.length) * 100);
    const open = D.todos.filter((t) => !t.done).length;

    $("#progressCard").innerHTML = `
      <div class="progress-top">
        <span class="progress-title">🧩 Booking progress: ${done} of ${pieces.length} travel pieces locked in</span>
        <span class="progress-pct">${pct}%</span>
      </div>
      <div class="progress-bar"><div class="progress-fill" style="width:0%"></div></div>
      ${open ? `<p class="progress-note">⚠️ ${open} open item${open > 1 ? "s" : ""} — <a href="#todo">see the to-do list</a></p>` : `<p class="progress-note">🎉 Everything is booked!</p>`}
    `;
    requestAnimationFrame(() =>
      requestAnimationFrame(() => {
        const fill = $("#progressCard .progress-fill");
        if (fill) fill.style.width = pct + "%";
      })
    );

    const openCount = $("#todoCount");
    if (open) openCount.textContent = open;
    else openCount.style.display = "none";
  }

  /* ---------------- route map ----------------
     Atlanta is home, so the trip is a full loop: ATL → SEA → NRT →
     Karuizawa → Yokohama → Cebu → HND → ATL. Renders a wide serpentine
     on tablet/desktop and a swipe-free vertical "subway map" on phones,
     picked (and re-picked live via mapMQ) by viewport width. */
  function renderRouteMap() {
    const st = (id) => (flightById(id) || {}).status || "ground";
    const segClass = { confirmed: "seg-ok", needed: "seg-bad", verify: "seg-bad", ground: "seg-ground" };
    const segDash = { "seg-ok": "2 11", "seg-bad": "8 8", "seg-ground": "1 9" };
    const needsBook = (s) => s === "needed" || s === "verify";
    const PLANE = '<path d="M-1,-8 L18,0 L-1,8 L4,0 Z" fill="var(--ink)" opacity="0.9"/>';

    const journey = [
      { emoji: "🧳", name: "Atlanta", sub: "Home · Dec 28", target: "ch-prelude" },
      { emoji: "🌲", name: "Seattle", sub: "Dec 28 – 30", target: "ch-prelude" },
      { emoji: "⛩️", name: "Tokyo · Narita", sub: "Dec 31", target: "ch-karuizawa" },
      { emoji: "⛄", name: "Karuizawa", sub: "Dec 31 – Jan 4", target: "ch-karuizawa" },
      { emoji: "🎡", name: "Yokohama", sub: "Jan 4 – 8", target: "ch-yokohama" },
      { emoji: "🏝️", name: "Cebu", sub: "Jan 8 – 14", target: "ch-cebu" },
      { emoji: "🗼", name: "Tokyo · Haneda", sub: "Jan 14 – 17", target: "ch-finaljapan" },
      { emoji: "🏡", name: "Atlanta", sub: "Home!", target: "ch-homeward" },
    ];
    // 7 segments connecting the 8 stops above, in order.
    const segStatus = [st("atl-sea"), st("sea-nrt"), "ground", "ground", st("jpn-ceb"), st("ceb-jpn"), st("hnd-atl")];
    const ariaLabel = `Trip route map: ${journey.map((j) => j.name).join(" to ")}`;

    function buildDesktop() {
      const pts = [
        { x: 80, y: 110 }, { x: 300, y: 110 }, { x: 530, y: 110 }, { x: 760, y: 110 },
        { x: 760, y: 310 }, { x: 400, y: 310 },
        { x: 180, y: 510 }, { x: 530, y: 510 },
      ];
      const above = [true, true, true, true, false, false, false, false];
      const segPaths = [
        "M80,110 L300,110",
        "M300,110 L530,110",
        "M530,110 L760,110",
        "M760,110 L880,110 A60,60 0 0 1 940,170 L940,250 A60,60 0 0 1 880,310 L760,310",
        "M760,310 L400,310",
        "M400,310 L120,310 A60,60 0 0 0 60,370 L60,450 A60,60 0 0 0 120,510 L180,510",
        "M180,510 L530,510",
      ];
      const segMeta = [
        { label: { x: 190, y: 96 } },
        {},
        { ground: { x: 645, y: 96 } },
        { ground: { x: 962, y: 216 } },
        { label: { x: 580, y: 296 } },
        { label: { x: 262, y: 296 } },
        {},
      ];
      const planePath = "M80,110 L300,110 L530,110 L760,110 L880,110 A60,60 0 0 1 940,170 L940,250 A60,60 0 0 1 880,310 L760,310 L400,310 L120,310 A60,60 0 0 0 60,370 L60,450 A60,60 0 0 0 120,510 L180,510 L530,510";

      const segsSVG = segPaths
        .map((d, i) => {
          const status = segStatus[i];
          const cls = segClass[status];
          const meta = segMeta[i];
          let extra = "";
          if (meta.label && needsBook(status)) {
            extra += `<text x="${meta.label.x}" y="${meta.label.y}" text-anchor="middle" class="map-seg-label" fill="var(--bad)">⚠ BOOK ME</text>`;
          }
          if (meta.ground) {
            extra += `<text x="${meta.ground.x}" y="${meta.ground.y}" text-anchor="middle" font-size="17">🚄</text>`;
          }
          return `<path d="${d}" fill="none" class="${cls}" stroke-width="${cls === "seg-ground" ? 4 : 5}" stroke-linecap="round" stroke-dasharray="${segDash[cls]}"/>${extra}`;
        })
        .join("");

      const stopsSVG = journey
        .map((s, i) => {
          const { x, y } = pts[i];
          const ay = above[i];
          return `
        <g class="map-stop" data-target="${s.target}" tabindex="0" role="button" aria-label="${esc(s.name)}">
          <circle class="halo" cx="${x}" cy="${y}" r="26" fill="var(--chip)"/>
          <circle cx="${x}" cy="${y}" r="22" fill="var(--card)" stroke="var(--line)" stroke-width="2"/>
          <text x="${x}" y="${y + 7}" text-anchor="middle" font-size="20">${s.emoji}</text>
          <text x="${x}" y="${ay ? y - 54 : y + 46}" text-anchor="middle" class="map-label">${esc(s.name)}</text>
          <text x="${x}" y="${ay ? y - 36 : y + 64}" text-anchor="middle" class="map-sublabel">${esc(s.sub)}</text>
        </g>`;
        })
        .join("");

      return `
      <svg viewBox="0 0 1000 595" role="img" aria-label="${esc(ariaLabel)}">
        ${segsSVG}
        ${stopsSVG}
        <g>${PLANE}<animateMotion dur="30s" repeatCount="indefinite" rotate="auto" path="${planePath}"/></g>
      </svg>`;
    }

    function buildMobile() {
      const STEP = 140, START = 60, CX = 46, LX = CX + 34;
      const ys = journey.map((_, i) => START + i * STEP);
      const height = ys[ys.length - 1] + 110;

      const segsSVG = segStatus
        .map((status, i) => {
          const y1 = ys[i] + 26, y2 = ys[i + 1] - 26;
          const mid = (y1 + y2) / 2;
          const cls = segClass[status];
          let extra = "";
          if (needsBook(status)) {
            extra = `<text x="${LX}" y="${mid + 5}" text-anchor="start" class="map-seg-label" fill="var(--bad)">⚠ BOOK ME</text>`;
          } else if (status === "ground") {
            extra = `<text x="${CX}" y="${mid + 6}" text-anchor="middle" font-size="15">🚄</text>`;
          }
          return `<path d="M${CX},${y1} L${CX},${y2}" fill="none" class="${cls}" stroke-width="${cls === "seg-ground" ? 4 : 5}" stroke-linecap="round" stroke-dasharray="${segDash[cls]}"/>${extra}`;
        })
        .join("");

      const stopsSVG = journey
        .map((s, i) => {
          const y = ys[i];
          return `
        <g class="map-stop" data-target="${s.target}" tabindex="0" role="button" aria-label="${esc(s.name)}">
          <circle class="halo" cx="${CX}" cy="${y}" r="26" fill="var(--chip)"/>
          <circle cx="${CX}" cy="${y}" r="22" fill="var(--card)" stroke="var(--line)" stroke-width="2"/>
          <text x="${CX}" y="${y + 7}" text-anchor="middle" font-size="19">${s.emoji}</text>
          <text x="${LX}" y="${y - 3}" text-anchor="start" class="map-label">${esc(s.name)}</text>
          <text x="${LX}" y="${y + 15}" text-anchor="start" class="map-sublabel">${esc(s.sub)}</text>
        </g>`;
        })
        .join("");

      const planePath = "M" + ys.map((y) => `${CX},${y}`).join(" L");

      return `
      <svg viewBox="0 0 320 ${height}" role="img" aria-label="${esc(ariaLabel)}">
        ${segsSVG}
        ${stopsSVG}
        <g>${PLANE}<animateMotion dur="22s" repeatCount="indefinite" rotate="auto" path="${planePath}"/></g>
      </svg>`;
    }

    $("#routeMap").innerHTML = mapMQ.matches ? buildMobile() : buildDesktop();

    $("#routeMap").querySelectorAll(".map-stop").forEach((g) => {
      const go = () => {
        const el = document.getElementById(g.dataset.target);
        if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
      };
      g.addEventListener("click", go);
      g.addEventListener("keydown", (e) => {
        if (e.key === "Enter" || e.key === " ") { e.preventDefault(); go(); }
      });
    });
  }

  /* ---------------- timeline ---------------- */
  function flightTimelineDetails(f) {
    const chips = f.reservations.flatMap((r) => r.codes.map((c) => copyChip(c.label, c.value)));
    return `
      <div class="event-details">
        <div class="fact-rows">
          <div class="fact"><span class="fl">Route</span><span><b>${esc(f.from.code)}</b> ${esc(f.from.city)} → <b>${esc(f.to.code)}</b> ${esc(f.to.city)}</span></div>
          <div class="fact"><span class="fl">Times</span><span>${esc(f.depart.time)} ${esc(f.depart.tz)} → ${esc(f.arrive.time)} ${esc(f.arrive.tz)} · ${esc(f.duration)}</span></div>
          ${f.flightNo !== "—" ? `<div class="fact"><span class="fl">Flight</span><span><b>${esc(f.flightNo)}</b> · ${esc(f.airline)} · ${esc(f.cabin)}</span></div>` : ""}
        </div>
        ${chips.length ? `<div class="codes">${chips.join("")}</div>` : ""}
      </div>`;
  }

  function hotelInTimelineDetails(h) {
    return `
      <div class="event-details">
        <div class="fact-rows">
          <div class="fact"><span class="fl">Check-in</span><span><b>${esc(h.checkIn.date)}</b> · ${esc(h.checkIn.time)}</span></div>
          <div class="fact"><span class="fl">Stay</span><span>${h.nights} nights · ${esc(h.room)}</span></div>
          <div class="fact"><span class="fl">Address</span><span>${esc(h.address)}</span></div>
        </div>
        ${codeChips(h.codes)}
        ${mapsLink(h.address)}
      </div>`;
  }

  function renderTimeline() {
    // group consecutive timeline entries by phase
    const groups = [];
    for (const ev of D.timeline) {
      const last = groups[groups.length - 1];
      if (last && last.phase === ev.phase) last.events.push(ev);
      else groups.push({ phase: ev.phase, events: [ev] });
    }

    $("#timelineList").innerHTML = groups
      .map((g) => {
        const ph = D.phases.find((p) => p.id === g.phase);
        return `
        <div class="chapter" id="ch-${esc(g.phase)}" style="--ph: var(--ph-${esc(g.phase)})">
          <div class="chapter-head reveal" data-emoji="${ph.emoji}">
            <h3 class="chapter-name">${ph.emoji} ${esc(ph.name)} <span class="chapter-dates">${esc(ph.dates)}</span></h3>
            ${ph.tagline ? `<p class="chapter-tagline">${esc(ph.tagline)}</p>` : ""}
            <div class="chapter-meta">
              ${ph.weather ? `<span>${esc(ph.weather)}</span>` : ""}
              ${ph.ideas ? `<span>🎯 ${esc(ph.ideas)}</span>` : ""}
              ${ph.funFact ? `<span class="chapter-fact">💡 ${esc(ph.funFact)}</span>` : ""}
            </div>
          </div>
          <div class="events">
            ${g.events
              .map((ev) => {
                const ref = ev.ref ? flightById(ev.ref) || hotelById(ev.ref) : null;
                const status = ref ? ref.status : "";
                const isFlight = ref && !!flightById(ev.ref);
                const filterType = ev.type === "flight" ? "flight" : ev.type.startsWith("hotel") ? "hotel" : "moment";
                let details = "";
                if (ref && ev.type === "flight") details = flightTimelineDetails(ref);
                if (ref && ev.type === "hotel-in") details = hotelInTimelineDetails(ref);
                if (ref && ev.type === "hotel-out")
                  details = `<div class="event-details"><div class="fact"><span class="fl">Checkout</span><span><b>${esc(ref.checkOut.date)}</b> · ${esc(ref.checkOut.time)}</span></div></div>`;
                return `
                <div class="event ${esc(status)}" data-type="${filterType}" data-status="${esc(status)}">
                  <div class="event-dot">${ev.emoji}</div>
                  <div class="event-card">
                    <div class="event-top">
                      <span class="event-date">${esc(ev.date)}</span>
                      ${badge(status)}
                    </div>
                    <h4 class="event-title">${esc(ev.title)}</h4>
                    <p class="event-blurb">${esc(ev.blurb)}</p>
                    ${details}
                  </div>
                </div>`;
              })
              .join("")}
          </div>
        </div>`;
      })
      .join("");
  }

  /* ---------------- flights section ---------------- */
  function renderFlights() {
    $("#flightCards").innerHTML = D.flights
      .map((f) => {
        const emoji = f.status === "needed" ? "🎟️" : "✈️";
        return `
      <article class="tcard ${esc(f.status)} reveal">
        <div class="tcard-top">
          <div class="tcard-emoji">${emoji}</div>
          <div>
            <h3 class="tcard-title">${esc(f.from.city)} → ${esc(f.to.city)}</h3>
            <p class="tcard-sub">${esc(f.airline === "TBD" ? "Airline TBD" : f.airline)}${f.flightNo !== "—" ? ` · ${esc(f.flightNo)}` : ""}${f.aircraft ? ` · ${esc(f.aircraft)}` : ""}</p>
          </div>
          ${badge(f.status)}
        </div>
        <div class="route-line">
          <div><div class="route-code">${esc(f.from.code)}</div><div class="route-city">${esc(f.depart.time)}</div></div>
          <div class="route-arrow"><span>✈️</span></div>
          <div style="text-align:right"><div class="route-code">${esc(f.to.code)}</div><div class="route-city">${esc(f.arrive.time)}</div></div>
        </div>
        <div class="fact-rows">
          <div class="fact"><span class="fl">Departs</span><span><b>${esc(f.depart.date)}</b> · ${esc(f.depart.time)} · ${esc(f.depart.tz)}</span></div>
          <div class="fact"><span class="fl">Arrives</span><span><b>${esc(f.arrive.date)}</b> · ${esc(f.arrive.time)} · ${esc(f.arrive.tz)}</span></div>
          <div class="fact"><span class="fl">Duration</span><span>${esc(f.duration)}</span></div>
          ${f.cabin !== "—" ? `<div class="fact"><span class="fl">Cabin</span><span>${esc(f.cabin)}</span></div>` : ""}
        </div>
        ${f.reservations
          .map(
            (r) => `
          <div class="res-block">
            <p class="res-via">🎫 ${esc(r.via)}</p>
            <div class="pax-list">${r.passengers.map((p) => `<span class="pax">${esc(p)}</span>`).join("")}</div>
            ${codeChips(r.codes)}
            ${r.note ? `<p class="tnote">${esc(r.note)}</p>` : ""}
          </div>`
          )
          .join("")}
        ${f.note ? `<p class="tnote">💬 ${esc(f.note)}</p>` : ""}
      </article>`;
      })
      .join("");
  }

  /* ---------------- hotels section ---------------- */
  function renderHotels() {
    $("#hotelCards").innerHTML = D.hotels
      .map(
        (h) => `
      <article class="tcard ${esc(h.status)} reveal">
        <div class="tcard-top">
          <div class="tcard-emoji">${h.emoji}</div>
          <div>
            <h3 class="tcard-title">${esc(h.name)}</h3>
            <p class="tcard-sub">${esc(h.brand ? h.brand + " · " : "")}${h.nights} nights · ${esc(h.guests)}</p>
          </div>
          ${badge(h.status)}
        </div>
        <div class="fact-rows">
          <div class="fact"><span class="fl">Check-in</span><span><b>${esc(h.checkIn.date)}</b> · ${esc(h.checkIn.time)}</span></div>
          <div class="fact"><span class="fl">Check-out</span><span><b>${esc(h.checkOut.date)}</b> · ${esc(h.checkOut.time)}</span></div>
          <div class="fact"><span class="fl">Room</span><span>${esc(h.room)}</span></div>
          ${h.price ? `<div class="fact"><span class="fl">Price</span><span>${esc(h.price)}</span></div>` : ""}
          ${h.cancellation ? `<div class="fact"><span class="fl">Cancel by</span><span>${esc(h.cancellation)}</span></div>` : ""}
          <div class="fact"><span class="fl">Address</span><span>${esc(h.address)}</span></div>
        </div>
        ${codeChips(h.codes)}
        ${mapsLink(h.address)}
        ${h.note ? `<p class="tnote">💬 ${esc(h.note)}</p>` : ""}
      </article>`
      )
      .join("");
  }

  /* ---------------- todos ---------------- */
  function renderTodos() {
    const open = D.todos.filter((t) => !t.done).length;
    $("#todoSub").textContent = open
      ? `${open} thing${open > 1 ? "s" : ""} left to lock in before wheels up. You've got this! 💪`
      : "All clear — everything is booked and verified! 🎉";

    $("#todoList").innerHTML = D.todos
      .map(
        (t) => `
      <div class="todo-item ${t.done ? "done" : ""} reveal">
        <div class="todo-check">${t.done ? "✅" : "⭕"}</div>
        <div>
          <p class="todo-title">${esc(t.title)} <span class="prio prio-${esc(t.priority)}">${esc(t.priority)}</span></p>
          <p class="todo-detail">${esc(t.detail)}</p>
        </div>
      </div>`
      )
      .join("");
  }

  /* ---------------- quick reference ---------------- */
  function renderQuickRef() {
    const order = [
      { kind: "flight", id: "atl-sea" },
      { kind: "hotel", id: "seattle-w" },
      { kind: "flight", id: "sea-nrt" },
      { kind: "hotel", id: "karuizawa-hotel" },
      { kind: "hotel", id: "yokohama-hotel" },
      { kind: "flight", id: "jpn-ceb" },
      { kind: "hotel", id: "cebu-hotel" },
      { kind: "flight", id: "ceb-jpn" },
      { kind: "hotel", id: "japan-final" },
      { kind: "flight", id: "hnd-atl" },
    ];

    $("#quickRef").innerHTML = order
      .map((o) => {
        if (o.kind === "flight") {
          const f = flightById(o.id);
          const chips = [
            ...(f.flightNo !== "—" ? [copyChip("Flight", f.flightNo)] : []),
            ...f.reservations.flatMap((r) => r.codes.map((c) => copyChip(c.label, c.value))),
          ];
          return `
          <div class="qr-group reveal">
            <div class="qr-head"><h3 class="qr-title">✈️ ${esc(f.from.code)} → ${esc(f.to.code)}${f.airline === "TBD" ? "" : ` · ${esc(f.airline)}`}</h3>${badge(f.status)}</div>
            <p class="qr-sub">${esc(f.depart.date)} · ${esc(f.depart.time)}</p>
            ${chips.length ? `<div class="codes">${chips.join("")}</div>` : `<p class="qr-sub">Nothing to copy yet — this flight still needs booking.</p>`}
          </div>`;
        }
        const h = hotelById(o.id);
        const hChips = [
          ...h.codes.map((c) => copyChip(c.label, c.value)),
          ...(/TBD/i.test(h.address) ? [] : [copyChip("Address", h.address)]),
        ];
        return `
        <div class="qr-group reveal">
          <div class="qr-head"><h3 class="qr-title">${h.emoji} ${esc(h.name)}</h3>${badge(h.status)}</div>
          <p class="qr-sub">${esc(h.checkIn.date)} → ${esc(h.checkOut.date)} · ${h.nights} nights</p>
          ${hChips.length ? `<div class="codes">${hChips.join("")}</div>` : `<p class="qr-sub">Nothing to copy yet — this stay still needs booking.</p>`}
          ${mapsLink(h.address)}
        </div>`;
      })
      .join("");

    $("#goodToKnow").innerHTML = D.goodToKnow
      .map(
        (k) => `
      <div class="know reveal">
        <h3>${k.emoji} ${esc(k.title)}</h3>
        <p>${esc(k.detail)}</p>
      </div>`
      )
      .join("");
  }

  /* ---------------- level select (past trips) ---------------- */
  function renderLevels() {
    if (typeof TRIP_LEVELS === "undefined") return;
    $("#levelGrid").innerHTML = TRIP_LEVELS
      .map((l) => {
        const status = l.status === "current"
          ? '<span class="level-status current">▶ Now playing — you are here!</span>'
          : '<span class="level-status cleared">✓ Cleared ★★★</span>';
        const href = l.status === "current" ? "#top" : l.href;
        return `
        <a class="level-card reveal" href="${href}">
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
      })
      .join("");
  }

  /* ---------------- filters ---------------- */
  function initFilters() {
    const chips = document.querySelectorAll("#filters .chip");
    chips.forEach((chip) => {
      chip.addEventListener("click", () => {
        chips.forEach((c) => c.setAttribute("aria-pressed", c === chip ? "true" : "false"));
        const mode = chip.dataset.filter;
        document.querySelectorAll("#timelineList .event").forEach((ev) => {
          const show =
            mode === "all" ||
            (mode === "needed"
              ? ev.dataset.status === "needed" || ev.dataset.status === "verify"
              : ev.dataset.type === mode);
          ev.style.display = show ? "" : "none";
        });
        document.querySelectorAll("#timelineList .chapter").forEach((ch) => {
          const any = [...ch.querySelectorAll(".event")].some((e) => e.style.display !== "none");
          ch.style.display = any ? "" : "none";
        });
      });
    });
  }

  /* ---------------- copy / toast / share ---------------- */
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

  function initCopy() {
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
  }

  function initShare() {
    $("#shareBtn").addEventListener("click", async () => {
      const data = {
        title: document.title,
        text: "Follow along on the Kings' Asia adventure! ✈️🌏",
        url: location.href,
      };
      if (navigator.share) {
        try { await navigator.share(data); } catch (e) { /* user cancelled */ }
      } else {
        copyText(location.href).then(() => toast("Link copied — send it to the fam! 💌"));
      }
    });
  }

  /* ---------------- scroll reveal ---------------- */
  function initReveal() {
    const els = document.querySelectorAll(".reveal");
    if (!("IntersectionObserver" in window)) {
      els.forEach((el) => el.classList.add("in"));
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((en) => {
          if (en.isIntersecting) {
            en.target.classList.add("in");
            io.unobserve(en.target);
          }
        });
      },
      { threshold: 0.06 }
    );
    els.forEach((el) => io.observe(el));
  }

  /* ---------------- service worker ---------------- */
  function initSW() {
    if ("serviceWorker" in navigator && (location.protocol === "https:" || location.hostname === "localhost")) {
      navigator.serviceWorker.register("sw.js").catch(() => {});
    }
  }

  /* ---------------- boot ---------------- */
  initTheme();
  renderHero();
  startCountdown();
  renderProgress();
  renderRouteMap();
  renderTimeline();
  renderFlights();
  renderHotels();
  renderTodos();
  renderQuickRef();
  renderLevels();
  initFilters();
  initCopy();
  initShare();
  initReveal();
  initSW();

  // Re-lay the route map if the viewport crosses the mobile/desktop breakpoint
  // (e.g. rotating a phone/tablet, or resizing a browser window).
  if (mapMQ.addEventListener) mapMQ.addEventListener("change", renderRouteMap);
  else if (mapMQ.addListener) mapMQ.addListener(renderRouteMap);
})();
