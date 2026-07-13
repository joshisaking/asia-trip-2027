/* ============================================================================
   PIXEL PARADE (pixels.js) — retro bitmap hero scenes, one per level.

   Every level page's hero header gets an 8-bit side-scroller strip: the King
   family (crowns included — they're Kings) marching toward the goal flag,
   joined by characters derived from that trip's destinations. No licensed
   characters — every sprite below is original, drawn as ASCII pixel maps.

   HOW IT WORKS
   - Each sprite is 1–2 "frames" of strings; each character is one pixel,
     looked up in the sprite's `pal` palette ("." = transparent).
   - Frames are drawn side-by-side on one <canvas>, scaled up with CSS
     image-rendering: pixelated. A steps(2) CSS animation flips the frames
     (walk cycles, spinning windmills, blinking lighthouses, waving flags).
   - Walkers march across the hero via one shared CSS keyframe animation;
     staggered negative delays keep the family parading together.
   - prefers-reduced-motion: everything renders as a static, spread-out scene
     (see styles.css) — no timers, no JS animation loops anywhere.

   The scene used is picked from <html data-trip="...">  ("home" = the
   current-adventure page). Add a scene to SCENES to give a new level one.
   ============================================================================ */

(function () {
  "use strict";

  const host = document.getElementById("pixelScene");
  if (!host) return;

  /* ---------------------------------------------------------------- */
  /* shared palette chips                                              */
  /* ---------------------------------------------------------------- */
  const INK = "#26203a";   // universal outline/dark
  const SKIN = "#f6c39a";
  const CROWN = "#ffd23e";
  const WHITE = "#fdfdf6";

  /* ---------------------------------------------------------------- */
  /* THE FAMILY — consistent outfits on every level                    */
  /* ---------------------------------------------------------------- */

  // Joshua — teal shirt, jeans, crown. 10×15, 2-frame walk.
  const DAD = {
    pal: { c: CROWN, h: "#5c3a21", s: SKIN, k: INK, t: "#12939c", p: "#3a55c6", b: "#33261d" },
    frames: [
      [
        "..c.c.c...",
        "..ccccc...",
        ".hhhhhhhh.",
        ".hhhhhhhh.",
        ".hhssssss.",
        ".hhssssks.",
        "...sssss..",
        "....ss....",
        ".tttttttt.",
        ".ttttttts.",
        "..tttttt..",
        "..pppppp..",
        ".ppp..ppp.",
        ".pp....pp.",
        "bbb....bbb"
      ],
      [
        "..c.c.c...",
        "..ccccc...",
        ".hhhhhhhh.",
        ".hhhhhhhh.",
        ".hhssssss.",
        ".hhssssks.",
        "...sssss..",
        "....ss....",
        ".tttttttt.",
        "sttttttt..",
        "..tttttt..",
        "..pppppp..",
        "...pppp...",
        "...pp.pp..",
        "...bb.bbb."
      ]
    ]
  };

  // Christina — rose dress, ponytail, crown. 11×15, 2-frame walk.
  const MOM = {
    pal: { c: CROWN, H: "#4a2c1a", s: SKIN, k: INK, d: "#e0446a", b: "#33261d" },
    frames: [
      [
        "...c.c.c...",
        "...ccccc...",
        "..HHHHHHHH.",
        ".HHHHHHHHH.",
        "HHHHssssss.",
        "HHHHsssks..",
        ".HH.sssss..",
        ".....ss....",
        "...dddddd..",
        "..sdddddds.",
        "...dddddd..",
        "..ddddddd..",
        ".ddddddddd.",
        "...s...s...",
        "..bb...bb.."
      ],
      [
        "...c.c.c...",
        "...ccccc...",
        "..HHHHHHHH.",
        ".HHHHHHHHH.",
        "HHHHssssss.",
        "HHHHsssks..",
        ".HH.sssss..",
        ".....ss....",
        "...dddddd..",
        "..sdddddds.",
        "...dddddd..",
        "..ddddddd..",
        ".ddddddddd.",
        "....s.s....",
        "...bb.bb..."
      ]
    ]
  };

  // Lucas at 2 (Alps on Toddler Mode) — tiny waddler with his teddy. 8×10.
  const TODDLER = {
    pal: { c: CROWN, h: "#5c3a21", s: SKIN, k: INK, y: "#ffc93f", T: "#8a5a2b", p: "#3a55c6", b: "#33261d" },
    frames: [
      [
        "..c.c.c.",
        "..ccccc.",
        ".hhhhhh.",
        ".hsssss.",
        ".hsssks.",
        "..ssss..",
        ".yyyyTT.",
        ".yyyyTT.",
        ".pp..pp.",
        ".bb..bb."
      ],
      [
        "..c.c.c.",
        "..ccccc.",
        ".hhhhhh.",
        ".hsssss.",
        ".hsssks.",
        "..ssss..",
        ".yyyyTT.",
        ".yyyyTT.",
        "..pppp..",
        "...bbb.."
      ]
    ]
  };

  // Lucas at 4 (2024) — flying a little Dutch tricolor for King's Day. 10×13.
  const KID_FLAG = {
    pal: { c: CROWN, h: "#5c3a21", s: SKIN, k: INK, y: "#ffc93f", p: "#3a55c6", b: "#33261d", f: "#8f8a80", r: "#d64545", w: WHITE },
    frames: [
      [
        ".....rrrf.",
        ".....wwwf.",
        ".....pppf.",
        "..c.c.c.f.",
        "..ccccc.f.",
        ".hhhhhh.f.",
        ".hsssks.f.",
        "..ssss..f.",
        ".yyyyyysf.",
        ".yyyyyy...",
        "..pppp....",
        ".pp..pp...",
        ".bb..bb..."
      ],
      [
        ".....rr.f.",
        ".....wwwf.",
        ".....pp.f.",
        "..c.c.c.f.",
        "..ccccc.f.",
        ".hhhhhh.f.",
        ".hsssks.f.",
        "..ssss..f.",
        ".yyyyyysf.",
        ".yyyyyy...",
        "..pppp....",
        "..pppp....",
        "..b..b...."
      ]
    ]
  };

  // Lucas at 7 (Asia) — green tee, ready for Japan. 9×12.
  const KID_BIG = {
    pal: { c: CROWN, h: "#5c3a21", s: SKIN, k: INK, g: "#2e9e5b", p: "#3a55c6", b: "#33261d" },
    frames: [
      [
        "..c.c.c..",
        "..ccccc..",
        ".hhhhhhh.",
        ".hssssss.",
        ".hsssks..",
        "..sssss..",
        ".ggggggg.",
        ".ggggggs.",
        "..ggggg..",
        "..ppppp..",
        ".pp..pp..",
        ".bb...bb."
      ],
      [
        "..c.c.c..",
        "..ccccc..",
        ".hhhhhhh.",
        ".hssssss.",
        ".hsssks..",
        "..sssss..",
        ".ggggggg.",
        ".ggggggs.",
        "..ggggg..",
        "..ppppp..",
        "...ppp...",
        "..bb.bb.."
      ]
    ]
  };

  // Leila at 4 (Asia) — pigtails, pink dress, crown. 8×11.
  const GIRL = {
    pal: { c: CROWN, H: "#3b2416", s: SKIN, k: INK, P: "#ff8ab0", b: "#33261d" },
    frames: [
      [
        "..c.c.c.",
        "..ccccc.",
        ".HHHHHH.",
        "HHssssHH",
        "H.sssksH",
        "..ssss..",
        ".PPPPPP.",
        ".PPPPPP.",
        "PPPPPPPP",
        "..s..s..",
        ".bb..bb."
      ],
      [
        "..c.c.c.",
        "..ccccc.",
        ".HHHHHH.",
        "HHssssHH",
        "H.sssksH",
        "..ssss..",
        ".PPPPPP.",
        ".PPPPPP.",
        "PPPPPPPP",
        "...ss...",
        "...bbb.."
      ]
    ]
  };

  // Christina pushing baby Leila's stroller (2024). 22×15 composite —
  // cream pram, teal canopy, crowned baby peeking out, wheels that "spin".
  const STROLLER_MOM = {
    pal: {
      c: CROWN, H: "#4a2c1a", s: SKIN, k: INK, d: "#e0446a", b: "#33261d",
      v: "#16a3a3", B: "#f5efe0", W: "#3b3245", w: "#a89fc0"
    },
    frames: [
      [
        "...c.c.c..............",
        "...ccccc..............",
        "..HHHHHHHH............",
        ".HHHHHHHHH............",
        "HHHHssssss............",
        "HHHHsssks.............",
        ".HH.sssss........vvvv.",
        ".....ss......cc..vvvvv",
        "...dddddd....ss.vvvvvv",
        "..sddddddssBBssBBBBBBB",
        "...dddddd...BBBBBBBBB.",
        "..ddddddd...BBBBBBBBB.",
        ".ddddddddd..WWW....WWW",
        "...s...s....WwW....WwW",
        "..bb...bb...WWW....WWW"
      ],
      [
        "...c.c.c..............",
        "...ccccc..............",
        "..HHHHHHHH............",
        ".HHHHHHHHH............",
        "HHHHssssss............",
        "HHHHsssks.............",
        ".HH.sssss........vvvv.",
        ".....ss......cc..vvvvv",
        "...dddddd....ss.vvvvvv",
        "..sddddddssBBssBBBBBBB",
        "...dddddd...BBBBBBBBB.",
        "..ddddddd...BBBBBBBBB.",
        ".ddddddddd..WwW....WwW",
        "....s.s.....WWW....WWW",
        "...bb.bb....WWW....WWW"
      ]
    ]
  };

  /* ---------------------------------------------------------------- */
  /* DESTINATION COMPANIONS                                            */
  /* ---------------------------------------------------------------- */

  // Sahara camel (2017 — Morocco). 20×14.
  const CAMEL = {
    pal: { m: "#c98f4a", d: "#9c6a30", k: INK, r: "#c2410c" },
    frames: [
      [
        "................mm..",
        "................mmm.",
        "......m..m......mm..",
        ".....mmmmmm....mm...",
        "....mmmmmmmm..mm....",
        "...mmmmmmmmmmmmm....",
        "...mmmmrrmmmmmm.....",
        "...mmmmrrmmmmm......",
        "....mmmmmmmmm.......",
        "....mm.....mm.......",
        "...mm.......mm......",
        "...mm........mm.....",
        "..dd..........dd....",
        "...................."
      ],
      [
        "................mm..",
        "................mmm.",
        "......m..m......mm..",
        ".....mmmmmm....mm...",
        "....mmmmmmmm..mm....",
        "...mmmmmmmmmmmmm....",
        "...mmmmrrmmmmmm.....",
        "...mmmmrrmmmmm......",
        "....mmmmmmmmm.......",
        ".....mm...mm........",
        ".....mm...mm........",
        "....mm.....mm.......",
        "....dd.....dd.......",
        "...................."
      ]
    ]
  };

  // Highland coo (2018 — Scotland). Shaggy, horned, unbothered. 18×12.
  const HIGHLAND_COW = {
    pal: { o: "#c76b2e", d: "#8f4718", n: "#e8b98a", k: INK, w: "#efe6d8" },
    frames: [
      [
        "..................",
        "ww..........ww....",
        ".www.oooo.www.....",
        "...w.oooo.w.......",
        "..oooooooooooooo..",
        ".oooooooooooooooo.",
        ".oonnooooooooooo..",
        ".oonnoooooooooo...",
        "..oooooooooooo....",
        "..dd..dd..dd..dd..",
        "..dd..dd..dd..dd..",
        ".................."
      ],
      [
        "..................",
        "ww..........ww....",
        ".www.oooo.www.....",
        "...w.oooo.w.......",
        "..oooooooooooooo..",
        ".oooooooooooooooo.",
        ".oonnooooooooooo..",
        ".oonnoooooooooo...",
        "..oooooooooooo....",
        "...dd.dd..dd.dd...",
        "...dd.dd..dd.dd...",
        ".................."
      ]
    ]
  };

  // Irish sheep (2018). 12×9.
  const SHEEP = {
    pal: { w: "#f2efe4", g: "#d9d2c0", k: INK, f: "#3b3245" },
    frames: [
      [
        "....wwwww...",
        "..wwwwwwwww.",
        "ffwwwwwwwwww",
        "fkwwwwwwwwww",
        "ffwwwwwwwww.",
        "..wwwwwwww..",
        "..gg....gg..",
        "..ff....ff..",
        "............"
      ],
      [
        "....wwwww...",
        "..wwwwwwwww.",
        "ffwwwwwwwwww",
        "fkwwwwwwwwww",
        "ffwwwwwwwww.",
        "..wwwwwwww..",
        "...gg..gg...",
        "...ff..ff...",
        "............"
      ]
    ]
  };

  // Bern bear (2022 — Switzerland's bear city). 16×11.
  const BEAR = {
    pal: { n: "#6b4423", d: "#4c2f16", k: INK, m: "#a8763e" },
    frames: [
      [
        "..nn............",
        ".nnnn...........",
        ".nknnnnnnnnnnn..",
        ".nnmnnnnnnnnnnn.",
        "..nnnnnnnnnnnnn.",
        "..nnnnnnnnnnnn..",
        "..nnnnnnnnnnnn..",
        "..nnn.nnnn.nnn..",
        "..dd...dd...dd..",
        "..dd...dd...dd..",
        "................"
      ],
      [
        "..nn............",
        ".nnnn...........",
        ".nknnnnnnnnnnn..",
        ".nnmnnnnnnnnnnn.",
        "..nnnnnnnnnnnnn.",
        "..nnnnnnnnnnnn..",
        "..nnnnnnnnnnnn..",
        "..nnnn.nnn.nnn..",
        "...dd..dd...dd..",
        "...dd..dd...dd..",
        "................"
      ]
    ]
  };

  // Crowned orange lion (2024 — the Dutch royal lion, in King's-Day orange,
  // who also guards Flanders and Lille). 15×12.
  const LION = {
    pal: { c: CROWN, o: "#f59e0b", m: "#92400e", k: INK },
    frames: [
      [
        ".c.c.c.........",
        ".ccccc.......m.",
        ".mmmmm......mm.",
        "mmooomm......m.",
        "moookom........",
        "mooooom........",
        "mmooooooooooo..",
        ".mmoooooooooo..",
        "..ooooooooooo..",
        "..oo..oo..oo...",
        "..mm..mm..mm...",
        "..............."
      ],
      [
        ".c.c.c.........",
        ".ccccc........m",
        ".mmmmm.......mm",
        "mmooomm........",
        "moookom........",
        "mooooom........",
        "mmooooooooooom.",
        ".mmoooooooooo..",
        "..ooooooooooo..",
        "...oo.oo..oo...",
        "...mm.mm..mm...",
        "..............."
      ]
    ]
  };

  // White rabbit (2024 — Utrecht, a city that loves its bunnies). Hops. 10×8.
  const RABBIT = {
    pal: { w: "#f5f2ea", g: "#d8d2c2", k: INK, p: "#f2a6b8" },
    frames: [
      [
        "..w..w....",
        "..w..w....",
        "..wwww....",
        "..wkww.ww.",
        ".wwwwwwww.",
        ".wwwwwwww.",
        "..gg..gg..",
        ".........."
      ],
      [
        ".w..w.....",
        ".w..w.....",
        ".wwww.....",
        ".wkwwwww..",
        "wwwwwwwww.",
        ".wwwwwww..",
        ".g.....g..",
        ".........."
      ]
    ]
  };

  // Red-crowned crane (Asia — Japan's lucky bird). 12×14.
  const CRANE = {
    pal: { w: WHITE, r: "#e03131", k: INK, g: "#5a5468" },
    frames: [
      [
        ".....rr.....",
        "....wwwwk...",
        "....ww......",
        "....ww......",
        "....ww......",
        "...www......",
        "..wwwwwwww..",
        ".wwwwwwwwww.",
        ".wwwwwwwkkk.",
        "..wwwwwwkk..",
        "...g........",
        "...g........",
        "...gg.......",
        "............"
      ],
      [
        ".....rr.....",
        "....wwwwk...",
        "....ww......",
        "....ww......",
        "....ww......",
        "...www......",
        "..wwwwwwww..",
        ".wwwwwwwwww.",
        ".wwwwwwwkkk.",
        "..wwwwwwkk..",
        "....g.......",
        "....g.......",
        "....gg......",
        "............"
      ]
    ]
  };

  // Sea turtle (Asia — Cebu's reefs). 15×8.
  const TURTLE = {
    pal: { g: "#2f9e6e", d: "#1d7a52", s: "#8fd6a8", k: INK },
    frames: [
      [
        ".....ddddd.....",
        "...ddgggggdd...",
        "..dggsgsgsggd..",
        ".dgggggggggggss",
        ".dggggggggggsks",
        "..ss.gg..gg.ss.",
        "..s...........s",
        "..............."
      ],
      [
        ".....ddddd.....",
        "...ddgggggdd...",
        "..dggsgsgsggd..",
        ".dgggggggggggss",
        ".dggggggggggsks",
        ".ss..gg..gg....",
        ".s.............",
        "..............."
      ]
    ]
  };

  /* ---------------------------------------------------------------- */
  /* LANDMARKS (background sprites)                                    */
  /* ---------------------------------------------------------------- */

  // Dutch windmill — the blades spin between frames. 19×24.
  const WINDMILL = {
    pal: { s: "#e8dcc3", d: "#b09b72", r: "#a84a32", k: INK, w: "#5f4426" },
    frames: [
      [
        "....w....w.........",
        ".....w..w..........",
        "......ww...........",
        "......ww...........",
        ".....w..w..........",
        "....w....w.........",
        "...w......w........",
        "......rr...........",
        ".....rrrr..........",
        "....ssssss.........",
        "....ssssss.........",
        "....ssssss.........",
        "...ssssssss........",
        "...ssssssss........",
        "...ssssssss........",
        "..ssssssssss.......",
        "..ssssssssss.......",
        "..ssskksssss.......",
        "..ssskksssss.......",
        ".ssssssssssss......",
        ".ssssssssssss......",
        ".ssdddddddsss......",
        ".ssdddddddsss......",
        "..................."
      ],
      [
        "...................",
        "...w...............",
        "....w....w.........",
        ".....w..w..........",
        "......ww...........",
        "......wwww.........",
        ".....w....w........",
        "....w.rr...w.......",
        ".....rrrr..........",
        "....ssssss.........",
        "....ssssss.........",
        "....ssssss.........",
        "...ssssssss........",
        "...ssssssss........",
        "...ssssssss........",
        "..ssssssssss.......",
        "..ssssssssss.......",
        "..ssskksssss.......",
        "..ssskksssss.......",
        ".ssssssssssss......",
        ".ssssssssssss......",
        ".ssdddddddsss......",
        ".ssdddddddsss......",
        "..................."
      ]
    ]
  };

  // Greek temple (2017 — Athens). 21×13.
  const TEMPLE = {
    pal: { w: "#efe7d2", g: "#cbbfa0", k: INK },
    frames: [
      [
        "..........w..........",
        "......wwwwwwwww......",
        "..wwwwwwwwwwwwwwwww..",
        ".wwwwwwwwwwwwwwwwwww.",
        ".ggggggggggggggggggg.",
        "..ww...ww...ww...ww..",
        "..ww...ww...ww...ww..",
        "..ww...ww...ww...ww..",
        "..ww...ww...ww...ww..",
        "..ww...ww...ww...ww..",
        ".ggggggggggggggggggg.",
        "wwwwwwwwwwwwwwwwwwwww",
        "....................."
      ]
    ]
  };

  // Eiffel-style iron tower (2017 — Paris finale). 15×26.
  const TOWER_PARIS = {
    pal: { t: "#7a6248", d: "#5d4a35", k: INK },
    frames: [
      [
        ".......t.......",
        ".......t.......",
        "......ttt......",
        "......ttt......",
        "......t.t......",
        "......t.t......",
        ".....tt.tt.....",
        ".....t...t.....",
        ".....t...t.....",
        "....ttttttt....",
        "....tt...tt....",
        "....t.....t....",
        "...tt.....tt...",
        "...t.......t...",
        "...t.......t...",
        "..ttttttttttt..",
        "..tt.......tt..",
        "..t.........t..",
        ".tt.........tt.",
        ".t...........t.",
        ".t....ttt....t.",
        "tt...tt.tt...tt",
        "t....t...t....t",
        "t...tt...tt...t",
        "ddddd.....ddddd",
        "..............."
      ]
    ]
  };

  // Castle (2018 — Edinburgh & Český Krumlov energy). 22×17.
  const CASTLE = {
    pal: { s: "#9aa3b2", d: "#6f7889", k: INK, f: "#d64545", w: "#3b3245" },
    frames: [
      [
        "..f...............f..",
        "..ff..............ff.",
        "..f...............f..",
        ".sss.....sss.....sss.",
        ".s.s.....s.s.....s.s.",
        ".sss..s..sss..s..sss.",
        ".sssssssssssssssssss.",
        ".sssssssssssssssssss.",
        ".ssswwssssssssswwsss.",
        ".ssswwsssdddssswwsss.",
        ".sssssssdddddsssssss.",
        ".sssssssddwddsssssss.",
        ".sssssssddwddsssssss.",
        ".sssssssddwddsssssss.",
        "sssssssssssssssssssss",
        "sssssssssssssssssssss",
        "....................."
      ],
      [
        "...f...............f.",
        "..ff..............ff.",
        "..f...............f..",
        ".sss.....sss.....sss.",
        ".s.s.....s.s.....s.s.",
        ".sss..s..sss..s..sss.",
        ".sssssssssssssssssss.",
        ".sssssssssssssssssss.",
        ".ssswwssssssssswwsss.",
        ".ssswwsssdddssswwsss.",
        ".sssssssdddddsssssss.",
        ".sssssssddwddsssssss.",
        ".sssssssddwddsssssss.",
        ".sssssssddwddsssssss.",
        "sssssssssssssssssssss",
        "sssssssssssssssssssss",
        "....................."
      ]
    ]
  };

  // Lighthouse (2018 — Irish & Adriatic coasts). Light blinks. 11×21.
  const LIGHTHOUSE = {
    pal: { w: "#f3ede0", r: "#d64545", k: INK, y: "#ffe066", g: "#8d86a8" },
    frames: [
      [
        "....ggg....",
        "...yyyyy...",
        "...y.y.y...",
        "...yyyyy...",
        "....www....",
        "...wwwww...",
        "...rrrrr...",
        "...rrrrr...",
        "...wwwww...",
        "...wwwww...",
        "..rrrrrrr..",
        "..rrrrrrr..",
        "..wwwwwww..",
        "..wwwwwww..",
        ".rrrrrrrrr.",
        ".rrrrrrrrr.",
        ".wwwwwwwww.",
        ".wwwkkwwww.",
        ".wwwkkwwww.",
        "ggggggggggg",
        "..........."
      ],
      [
        "....ggg....",
        "...ykyky...",
        "...k.y.k...",
        "...ykyky...",
        "....www....",
        "...wwwww...",
        "...rrrrr...",
        "...rrrrr...",
        "...wwwww...",
        "...wwwww...",
        "..rrrrrrr..",
        "..rrrrrrr..",
        "..wwwwwww..",
        "..wwwwwww..",
        ".rrrrrrrrr.",
        ".rrrrrrrrr.",
        ".wwwwwwwww.",
        ".wwwkkwwww.",
        ".wwwkkwwww.",
        "ggggggggggg",
        "..........."
      ]
    ]
  };

  // The Alps (2022 backdrop). 30×15.
  const ALPS = {
    pal: { m: "#7d8fc4", d: "#5f6fa3", w: "#ffffff", e: "#e7ecfa" },
    frames: [
      [
        "..........ww..................",
        ".........wwww.................",
        "........wwewww......ww........",
        ".......mwwmwww.....wwww.......",
        ".......mmmmmwm....wwewww......",
        "......mmmmmmmm...mwwwwwm......",
        ".....mmmmdmmmm..mmwmwmmm......",
        "....mmmmmmmmmm..mmmmmmmmm.....",
        "...mmmmmmmdmmmmmmmmmdmmmm.....",
        "...mmmmmmmmmmmmmmmmmmmmmmm....",
        "..mmmmmdmmmmmmmmmmmmmmdmmmm...",
        ".mmmmmmmmmmmmmmdmmmmmmmmmmm...",
        ".mmmmmmmmmmmmmmmmmmmmmmmmmmm..",
        "mmmmmmmmmmmmmmmmmmmmmmmmmmmmm.",
        ".............................."
      ]
    ]
  };

  // Prague spires (2022). 18×17.
  const SPIRES = {
    pal: { d: "#584a63", s: "#8a7a96", g: "#e8b23e", k: INK, w: "#f3ede0" },
    frames: [
      [
        "....g........g....",
        "....d........d....",
        "...ddd......ddd...",
        "...ddd......ddd...",
        "..ddddd....ddddd..",
        "..ddddd....ddddd..",
        "..sdsds..g.sdsds..",
        "..sssss..d.sssss..",
        "..sssss.ddd.ssss..",
        "..swsss.ddd.wsss..",
        "..sssssdddddssss..",
        "..ssssssdsdsssss..",
        "..sswsssdwdsswss..",
        "..ssssssdddsssss..",
        "..ssssssdddsssss..",
        "ssssssssssssssssss",
        ".................."
      ]
    ]
  };

  // Beach umbrella + sun sand (2022 Valencia · 2024 Costa del Sol). 15×13.
  const UMBRELLA = {
    pal: { r: "#ff5d5d", w: "#fdf6e3", p: "#8f8a80", k: INK, y: "#ffd23e" },
    frames: [
      [
        ".......r.......",
        ".....rrrrr.....",
        "...rrwwrwwrr...",
        "..rwwrrrrrwwr..",
        ".rrwrrwwwrrwrr.",
        ".r..r..p..r..r.",
        ".......p.......",
        ".......p.......",
        ".......p.......",
        ".......p.......",
        "....yyyppyy....",
        "..yyyyyyyyyyy..",
        "..............."
      ]
    ]
  };

  // Utrecht's Dom Tower (2024). 13×27.
  const DOM_TOWER = {
    pal: { s: "#c9b791", d: "#a08a5e", k: INK, w: "#efe7d2" },
    frames: [
      [
        "......s......",
        ".....sss.....",
        "....s.s.s....",
        "....s.s.s....",
        "....sssss....",
        "....s.s.s....",
        "....s.s.s....",
        "....sssss....",
        "...ss.s.ss...",
        "...s..s..s...",
        "...sssssss...",
        "...ss.k.ss...",
        "...ss.k.ss...",
        "...sssssss...",
        "..sss.s.sss..",
        "..ss..s..ss..",
        "..sssssssss..",
        "..ss.kkk.ss..",
        "..ss.kkk.ss..",
        "..sssssssss..",
        ".sssssssssss.",
        ".ss.kk.kk.ss.",
        ".ss.kk.kk.ss.",
        ".ss.kk.kk.ss.",
        ".sssssssssss.",
        "ddddddddddddd",
        "............."
      ]
    ]
  };

  // Tulip row (2024 & 2017 — Holland in bloom). Sways. 22×9.
  const TULIPS = {
    pal: { r: "#e8455a", y: "#ffc93f", p: "#f28ab8", o: "#ff7a1a", g: "#3f9e4d", d: "#2e7a3a" },
    frames: [
      [
        ".rr...yy...pp...oo....",
        ".rr...yy...pp...oo....",
        ".rr...yy...pp...oo....",
        "..g....g....g....g....",
        "..g....g....g....g....",
        ".gg...dgg..gg...dgg...",
        "..g....g....g....g....",
        "dddddddddddddddddddddd",
        "......................"
      ],
      [
        "..rr...yy...pp...oo...",
        "..rr...yy...pp...oo...",
        ".rr...yy...pp...oo....",
        "..g....g....g....g....",
        "..g....g....g....g....",
        "..gg...gg..dgg...gg...",
        "..g....g....g....g....",
        "dddddddddddddddddddddd",
        "......................"
      ]
    ]
  };

  // Shamrock patch (2018 — the Emerald Isle). Sways. 19×5.
  const SHAMROCKS = {
    pal: { g: "#2e9e5b", d: "#1d7a44" },
    frames: [
      [
        "gg.gg.........gg.gg",
        "ggggg..gg.gg..ggggg",
        ".ggg...ggggg...ggg.",
        "..d.....ggg.....d..",
        "..d......d......d.."
      ],
      [
        ".gg.gg........gg.gg",
        ".ggggg.gg.gg..ggggg",
        "..ggg..ggggg...ggg.",
        "..d.....ggg.....d..",
        "..d......d......d.."
      ]
    ]
  };

  // Torii gate (Asia — Japan). 19×14.
  const TORII = {
    pal: { r: "#e03131", d: "#a61e1e", k: INK },
    frames: [
      [
        "rrrrrrrrrrrrrrrrrrr",
        ".rrrrrrrrrrrrrrrrr.",
        "...rr.........rr...",
        "...rr.........rr...",
        "..rrrrrrrrrrrrrrr..",
        "...rr.........rr...",
        "...rr.........rr...",
        "...rr.........rr...",
        "...rr.........rr...",
        "...rr.........rr...",
        "...rr.........rr...",
        "...rr.........rr...",
        "..dddd.......dddd..",
        "..................."
      ]
    ]
  };

  // Snow-capped volcano (Asia — the Fuji silhouette from the train). 28×13.
  const FUJI = {
    pal: { m: "#8a7ab8", d: "#6d5f99", w: "#ffffff", e: "#e9e4fa" },
    frames: [
      [
        "............wwww............",
        "...........wwwwww...........",
        "..........wwwewwww..........",
        ".........wewwwwweww.........",
        ".........mwwmwwwwmw.........",
        "........mmmwmmmwmmmm........",
        ".......mmmmmmmmmmmmmm.......",
        "......mmmmmmdmmmmmmmmm......",
        ".....mmmmmmmmmmmmdmmmmm.....",
        "....mmmdmmmmmmmmmmmmmmmm....",
        "...mmmmmmmmmmdmmmmmmmdmmm...",
        "..mmmmmmmmmmmmmmmmmmmmmmmm..",
        "............................"
      ]
    ]
  };

  // Palm tree (Asia — Cebu; also at home on any beach level). 14×16.
  const PALM = {
    pal: { g: "#2e9e5b", d: "#1d7a44", t: "#8a5a2b", b: "#6d4522", y: "#ffd23e" },
    frames: [
      [
        "...ggg..ggg...",
        ".gggggggggggg.",
        "ggggg.gg.ggggg",
        "gg..ggggg...gg",
        ".....ggg......",
        "....ggtgg.....",
        "....d.t..d....",
        "......tt......",
        "......tt......",
        ".....tt.......",
        ".....tt.......",
        "....tt........",
        "....tt........",
        "....bb........",
        "..............",
        ".............."
      ]
    ]
  };

  // Goal flag — the crowned finish line on every cleared level. 10×22.
  const GOAL_FLAG = {
    pal: { c: CROWN, p: "#8f8a80", f: "#2e9e5b", w: WHITE, k: INK },
    frames: [
      [
        "...c.c.c..",
        "...ccccc..",
        "....pp....",
        "....ppffff",
        "....pfffff",
        "....pfwwff",
        "....pfwwff",
        "....pfffff",
        "....ppffff",
        "....pp....",
        "....pp....",
        "....pp....",
        "....pp....",
        "....pp....",
        "....pp....",
        "....pp....",
        "....pp....",
        "....pp....",
        "....pp....",
        "....pp....",
        "...pppp...",
        ".........."
      ],
      [
        "...c.c.c..",
        "...ccccc..",
        "....pp....",
        "....ppfff.",
        "....pfffff",
        "....pfwwf.",
        "....pfwwff",
        "....pffff.",
        "....ppfff.",
        "....pp....",
        "....pp....",
        "....pp....",
        "....pp....",
        "....pp....",
        "....pp....",
        "....pp....",
        "....pp....",
        "....pp....",
        "....pp....",
        "....pp....",
        "...pppp...",
        ".........."
      ]
    ]
  };

  // Spinning coin. 8×9.
  const COIN = {
    pal: { c: "#ffd23e", d: "#d99e14", w: "#fff3c4" },
    frames: [
      [
        "..cccc..",
        ".cccccc.",
        "cccwwccc",
        "ccwwcccc",
        "ccwwcccc",
        "cccwwccc",
        ".cccccc.",
        "..cccc..",
        "........"
      ],
      [
        "...cc...",
        "...dc...",
        "...dc...",
        "...dc...",
        "...dc...",
        "...dc...",
        "...dc...",
        "...cc...",
        "........"
      ]
    ]
  };

  // Pixel cloud. 16×6.
  const CLOUD = {
    pal: { w: "#ffffff", s: "#e6ecf7" },
    frames: [
      [
        ".....wwww.......",
        "...wwwwwwww.....",
        "..wwwwwwwwwww...",
        ".wwwwwwwwwwwwww.",
        "wwsswwwwwsswwww.",
        "................"
      ]
    ]
  };

  // Pixel jet, forever en route. 19×8.
  const PLANE = {
    pal: { w: "#f5f5ff", g: "#c3c8de", k: INK, r: "#e0446a" },
    frames: [
      [
        "...................",
        "rr.....w...........",
        "rrw...www..........",
        "rwwwwwwwwwwwwwww...",
        "rwwwwwwwwwwwwwwwww.",
        "rrwwkk.kk.kk.wwww..",
        "....www............",
        ".....ww............"
      ]
    ]
  };

  /* ---------------------------------------------------------------- */
  /* GROUND TILES — 8×8, themed per level                              */
  /* ---------------------------------------------------------------- */
  function groundTile(top, brick, mortar) {
    return {
      pal: { t: top, b: brick, m: mortar },
      frames: [
        [
          "tttttttt",
          "tttttttt",
          "bbbmbbbb",
          "bbbmbbbb",
          "mmmmmmmm",
          "bmbbbbbm",
          "bmbbbbbm",
          "mmmmmmmm"
        ]
      ]
    };
  }

  /* ---------------------------------------------------------------- */
  /* SCENES — who marches on which level                               */
  /* ---------------------------------------------------------------- */
  // walkers: [sprite, delay(s), rest(%), lift(sprite px)] — same speed, so the
  // family parades as a group; rest is the static reduced-motion position.
  const SCENES = {
    t2017: {
      ground: groundTile("#e0b25c", "#c98f4a", "#a06e30"), // Mediterranean sand
      landmarks: [[WINDMILL, 10], [TEMPLE, 45], [TOWER_PARIS, 80]],
      coins: [26, 31, 59, 64],
      flag: true,
      walkers: [
        [DAD, 0, 22], [MOM, 1.4, 32], [CAMEL, 3.4, 48]
      ]
    },
    t2018: {
      ground: groundTile("#57a05c", "#3f7a46", "#2e5c35"), // Irish green
      landmarks: [[CASTLE, 14], [SHAMROCKS, 44], [LIGHTHOUSE, 81]],
      coins: [28, 33, 60, 65],
      flag: true,
      walkers: [
        [DAD, 0, 20], [MOM, 1.4, 30], [SHEEP, 3.4, 44], [HIGHLAND_COW, 5.0, 58]
      ]
    },
    t2022: {
      ground: groundTile("#eef2fa", "#9aa3b2", "#6f7889"), // alpine snow & stone
      landmarks: [[ALPS, 16, true], [SPIRES, 50], [UMBRELLA, 80]],
      coins: [30, 35, 63, 68],
      flag: true,
      walkers: [
        [DAD, 0, 18], [TODDLER, 1.5, 27], [MOM, 2.6, 35], [BEAR, 4.8, 52]
      ]
    },
    t2024: {
      ground: groundTile("#ff9a2e", "#d4703a", "#a34d22"), // King's-Day orange brick
      landmarks: [[DOM_TOWER, 10], [TULIPS, 38], [UMBRELLA, 68]],
      coins: [24, 29, 53, 58],
      flag: true,
      walkers: [
        [DAD, 0, 16], [KID_FLAG, 1.5, 25], [STROLLER_MOM, 3.3, 36], [LION, 5.6, 55], [RABBIT, 7.0, 64]
      ]
    },
    home: {
      ground: groundTile("#b65cf7", "#7a3fb8", "#5b2e8a"), // sunset-neon pavement
      landmarks: [[FUJI, 14, true], [TORII, 48], [PALM, 82]],
      coins: [28, 33, 61, 66],
      flag: false, // current level — the goal flag isn't planted yet
      walkers: [
        [DAD, 0, 14], [KID_BIG, 1.4, 23], [GIRL, 2.5, 31], [MOM, 3.6, 40], [CRANE, 5.8, 56], [TURTLE, 7.2, 66]
      ]
    }
  };

  const GROUND_H = 8;       // ground strip height in sprite px
  const SCENE_H = 46;       // total scene height in sprite px
  const MARCH_SECONDS = 34; // one full crossing
  const HEAD_START = 12;    // leader starts this far in, so the parade is visible on load

  /* ---------------------------------------------------------------- */
  /* renderer                                                          */
  /* ---------------------------------------------------------------- */
  const sceneKey = document.documentElement.dataset.trip || "home";
  const scene = SCENES[sceneKey];
  if (!scene) return;

  const mobileMQ = window.matchMedia("(max-width: 700px)");

  function makeCanvas(sprite, scale) {
    const frames = sprite.frames;
    const h = frames[0].length;
    const w = frames[0][0].length;
    const c = document.createElement("canvas");
    c.width = w * frames.length;
    c.height = h;
    const ctx = c.getContext("2d");
    frames.forEach((frame, fi) => {
      frame.forEach((row, y) => {
        for (let x = 0; x < w; x++) {
          const color = sprite.pal[row[x]];
          if (color) {
            ctx.fillStyle = color;
            ctx.fillRect(fi * w + x, y, 1, 1);
          }
        }
      });
    });
    c.style.width = w * frames.length * scale + "px";
    c.style.height = h * scale + "px";
    return { canvas: c, w, h, n: frames.length };
  }

  // A sprite element: fixed-size window + (optionally frame-flipping) canvas.
  function spriteEl(sprite, scale, stepSeconds) {
    const { canvas, w, h, n } = makeCanvas(sprite, scale);
    const strip = document.createElement("div");
    strip.className = "px-strip";
    strip.style.width = w * scale + "px";
    strip.style.height = h * scale + "px";
    if (n > 1) {
      canvas.classList.add("px-anim");
      canvas.style.animationDuration = (stepSeconds || 0.44) + "s";
    }
    strip.appendChild(canvas);
    return strip;
  }

  function build() {
    const scale = mobileMQ.matches ? 2 : 3;
    host.textContent = "";
    host.style.height = SCENE_H * scale + "px";

    // ground
    const tile = makeCanvas(scene.ground, scale);
    const ground = document.createElement("div");
    ground.className = "px-ground";
    ground.style.height = GROUND_H * scale + "px";
    ground.style.backgroundImage = "url(" + tile.canvas.toDataURL() + ")";
    ground.style.backgroundSize = 8 * scale + "px " + 8 * scale + "px";
    host.appendChild(ground);

    // clouds + the plane that carried everyone here
    [[9, 2, 78, 18], [64, 6, 110, 30]].forEach(([rest, top, dur, delay]) => {
      const cl = document.createElement("div");
      cl.className = "px-cloud";
      cl.style.top = top * scale + "px";
      cl.style.setProperty("--rest", rest + "%");
      cl.style.animationDuration = dur + "s";
      cl.style.animationDelay = -delay + "s";
      cl.appendChild(spriteEl(CLOUD, scale));
      host.appendChild(cl);
    });
    const plane = document.createElement("div");
    plane.className = "px-cloud px-plane";
    plane.style.top = scale + "px";
    plane.style.setProperty("--rest", "82%");
    plane.style.animationDuration = "21s";
    plane.style.animationDelay = "-4s";
    plane.appendChild(spriteEl(PLANE, scale));
    host.appendChild(plane);

    // landmarks ("big" ones — mountain backdrops — render a scale step larger)
    scene.landmarks.forEach(([sprite, x, big]) => {
      const lm = document.createElement("div");
      lm.className = "px-land";
      lm.style.left = x + "%";
      lm.style.bottom = GROUND_H * scale + "px";
      lm.appendChild(spriteEl(sprite, scale + (big ? 1 : 0), 1.1));
      host.appendChild(lm);
    });

    // coins
    scene.coins.forEach((x, i) => {
      const coin = document.createElement("div");
      coin.className = "px-coin";
      coin.style.left = x + "%";
      coin.style.bottom = (GROUND_H + 17) * scale + "px";
      coin.style.animationDelay = -(i * 0.45) + "s";
      coin.appendChild(spriteEl(COIN, scale, 0.8));
      host.appendChild(coin);
    });

    // goal flag on cleared levels
    if (scene.flag) {
      const flag = document.createElement("div");
      flag.className = "px-land px-flag";
      flag.style.left = "94%";
      flag.style.bottom = GROUND_H * scale + "px";
      flag.appendChild(spriteEl(GOAL_FLAG, scale, 0.9));
      host.appendChild(flag);
    }

    // the parade
    scene.walkers.forEach(([sprite, delay, rest, lift]) => {
      const wk = document.createElement("div");
      wk.className = "px-walker";
      if (sprite === RABBIT) wk.classList.add("px-hopper");
      wk.style.bottom = (GROUND_H + (lift || 0)) * scale + "px";
      wk.style.setProperty("--rest", rest + "%");
      wk.style.animationDuration = MARCH_SECONDS + "s";
      wk.style.animationDelay = -(HEAD_START - delay) + "s";
      wk.appendChild(spriteEl(sprite, scale));
      host.appendChild(wk);
    });
  }

  build();
  if (mobileMQ.addEventListener) mobileMQ.addEventListener("change", build);
  else if (mobileMQ.addListener) mobileMQ.addListener(build);
})();
