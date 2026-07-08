# OptimatX Gallery: Ranked, Buildable Backlog of Generative-Math Visualization Ideas

## TL;DR
- **Farm out ~8 easy wins first**, chosen to fill the *variety gaps* in your current six: number theory (Times-Tables circle, Ulam spiral, Pascal mod-n), true chaos as static point-clouds (De Jong/Clifford attractors, logistic bifurcation), IFS/random-iteration (Barnsley fern / chaos game), tilings (Truchet), plus a shallow Mandelbrot that reuses your Julia Canvas-2D code almost verbatim.
- **Build exactly two showpieces:** a **WebGL Mandelbrot deep-zoom** (introduces WebGL as a reusable capability + a click-to-set-*c* link into your existing Julia set) and one **animated** piece — recommend **Gray-Scott reaction-diffusion** over the double pendulum, because it conceptually extends your cellular automaton and delivers far more sustained visual payoff.
- **Everything below reuses your house conventions** (Slider, `ramp()`/artcolor, `var(--accent)` strokes, Piece card). Only the two showpieces introduce genuinely new patterns: WebGL, and the repo's first `requestAnimationFrame` loop (which needs *manual* `prefers-reduced-motion` gating + IntersectionObserver offscreen-pause).

## Key Findings
Your gallery currently covers escape-time fractal, cellular automaton, phyllotaxis, polar curve, damped oscillation, and recursion. The biggest missing families — **motion/animation, chaos/attractors, number theory, tilings/tessellation, wave physics, and IFS/random-iteration** — are exactly where the highest-variety easy wins live. Almost every easy win below is a *static, recompute-on-slider-change* piece identical in pattern to your existing six, so they drop in cleanly with no new infrastructure. Several literally reuse existing renderers: the attractors, Mandelbrot, Chladni, wave-interference, and logistic-bifurcation pieces all reuse the Julia set's `createImageData/putImageData` per-pixel buffer; Ulam and Pascal-mod-n reuse the cellular automaton's `fillRect` grid; the parametric curves reuse the harmonograph's SVG `<polyline>`; the chaos game reuses the phyllotaxis dot loop; and L-systems generalize the fractal-tree recursion. The two showpieces are worth their added complexity because they each unlock something durable: WebGL as a reusable capability, and the first animation loop in the repo (a template all future animated pieces can copy).

---

## Details: The Backlog

### FAMILY A — Curves & Polar/Parametric
*Closest to your Maurer rose & harmonograph. Canvas or SVG, static, easy.*

**A1. Lissajous figures** — *Two perpendicular sine oscillations trace endlessly varied closed knots.*
- **Math:** x(t) = A·sin(a·t + δ), y(t) = B·sin(b·t), t ∈ [0, 2π]. Closed iff a/b is rational; a and b set the number of horizontal/vertical lobes; δ is the phase shift.
- **Presets** (δ = π/2 unless noted): frequency ratios 1:2, 1:3, 2:3, 3:4, 3:5, 4:5, 5:6; a diagonal-line/ellipse at 1:1 (δ from 0→π/2 opens the line into an ellipse). The most striking are odd:even ratios with |a−b|=1 (e.g. 4:5, 5:6).
- **Sliders:** a (1–10, step 1), b (1–10, step 1), δ (0–π, step 0.01); optionally A/B amplitude.
- **Tech:** SVG single `<polyline>` (~2000–4000 points) — *direct clone of the harmonograph renderer.*
- **Difficulty:** easy win. **Static.**
- **Reference:** Wikipedia "Lissajous curve"; datagenetics.com Lissajous article (interactive lobe-ratio explainer).
- **House conventions:** Slider, `var(--accent)` stroke, Piece card.

**A2. Spirograph (hypotrochoid / epicycloid gear curves)** — *Two-radii roulette curves; the classic toy.*
- **Math (hypotrochoid, confirmed identical on Wikipedia & MathWorld):** x(θ) = (R−r)·cos θ + d·cos(((R−r)/r)·θ), y(θ) = (R−r)·sin θ − d·sin(((R−r)/r)·θ). **Epitrochoid:** replace (R−r) with (R+r) and use −d·cos/−d·sin. Hypocycloid = hypotrochoid with d=r; epicycloid = epitrochoid with d=r. Petal count = R / gcd(R,r); run θ to 2π·r/gcd(R,r) so the curve closes.
- **Presets (R, r, d):** (10, 5, 1) → ellipse (Tusi couple, the R=2r special case; Wikipedia); (4, 2, 2) → hypocycloid; (96, 36, 12) → 5-lobe rosette (a real Spirograph gear ratio, per Firgelli's Spirograph mechanism doc; gcd=12, (96−36)/12 = 5 lobes, closes in 3 laps); coprime R,r such as (113, 30) → dense 113-lobe lace.
- **Sliders:** R (10–120), r (10–90), d (0–90).
- **Tech:** SVG polyline — reuses harmonograph renderer.
- **Difficulty:** easy win. **Static.**
- **Reference:** Wikipedia "Hypotrochoid"/"Epitrochoid"; Wolfram MathWorld "Hypotrochoid."
- **House conventions:** Slider, `var(--accent)`, Piece card.

**A3. Gielis Superformula / supershape** — *Six parameters generate flowers, stars, polygons, shells — a superset of your Maurer rose.*
- **Math (polar):** r(φ) = ( |cos(mφ/4)/a|^{n₂} + |sin(mφ/4)/b|^{n₃} )^{−1/n₁}, then x = r·cos φ, y = r·sin φ, φ ∈ [0, 2π]. m = rotational symmetry; n₁,n₂,n₃ = form/curvature; a,b = scaling. (Gielis 2003; the patent expired 2020, so it's free to use.)
- **Presets (a, b, m, n₁, n₂, n₃),** from Gielis/tcl-lang.org superformula gallery: (1, 1.8, 6, 1, 2, 1.4); (1.5, 2, 8, 0.9, 1.8, 0.8); (1, 2, 10, 0.9, 1.7, 1.1); (1.6, 1, 12, 1.5, 2, 7.5); (2.7, 2.6, 6, 12, 8.3, 5.3); (1.19, 2.8, 32, 3, 0.9, 6). A plain circle is n₁=n₂=n₃=2, a=b=1, m=0.
- **Sliders:** m (0–20, step 1), n₁ (0.1–20), n₂ (0.1–20), n₃ (0.1–20); optionally a, b.
- **Tech:** SVG polyline or Canvas path — reuses harmonograph/Maurer renderer.
- **Difficulty:** easy win. **Static.**
- **Reference:** Wikipedia "Superformula"; Johan Gielis (2003) "A generic geometric transformation…"; tcl-lang.org preset list.
- **House conventions:** Slider, `var(--accent)`, Piece card.

**A4. Butterfly curve (Fay)** — *A single transcendental parametric curve shaped like a butterfly.*
- **Math:** x(t) = sin(t)·(e^{cos t} − 2cos(4t) − sin⁵(t/12)), y(t) = cos(t)·(same bracket), t ∈ [0, 12π] (needs many periods to close).
- **Presets:** essentially one canonical form; expose a "detail" slider = sample count (5000–20000) and an optional harmonic k on the cos(4t) term for variation.
- **Sliders:** t-range multiplier, sample count, harmonic k.
- **Tech:** SVG polyline.
- **Difficulty:** easy win. **Static.**
- **Reference:** Wolfram MathWorld "Butterfly Curve"; Temple H. Fay (1989), *American Mathematical Monthly*.
- **House conventions:** Slider, `var(--accent)`, Piece card.

**A5. Times-Tables / modular multiplication circle** — *Draw chords from k to (m·k mod N) on a circle; cardioids, nephroids, and Mandelbrot cusps emerge.* **(Top pick.)**
- **Math:** place N points evenly on a circle at angle 2πk/N. For each k = 0…N−1, draw a chord from k to point (m·k mod N). m=2 → cardioid (the main cardioid of the Mandelbrot set), m=3 → nephroid, m=6 → ranunculoid; larger m with large N reveals layered caustic envelopes.
- **Presets:** N=200, m=2 (cardioid); N=300, m=3 (nephroid); N=400, m=51; N=511, m=2; large N (~1000) with m near small integers for lace-like caustics. Use fractional m steps to morph smoothly between integers.
- **Sliders:** N (10–1000, step 1), m (2–200, step 0.1 for smooth morphing).
- **Tech:** SVG/Canvas — one `moveTo/lineTo` per k. Trivially simple.
- **Difficulty:** easy win. **Static. Fills the number-theory gap.**
- **Reference:** Mathologer "Times Tables, Mandelbrot and the Heart of Mathematics" (YouTube); redblobgames.com "Mathologer's multiplication on a circle"; nathaniel.ai "Modular multiplication."
- **House conventions:** Slider, `ramp()` color by chord index, `var(--accent)`, Piece card.

---

### FAMILY B — Dynamical Systems & Chaos

**B1. De Jong attractor** — *Iterate a 2D trig map millions of times; plot a density histogram for a glowing dust cloud.* **(Top pick — ship with B2.)**
- **Math:** x_{n+1} = sin(a·y_n) − cos(b·x_n), y_{n+1} = sin(c·x_n) − cos(d·y_n).
- **Canonical Paul Bourke presets (a, b, c, d),** verbatim from paulbourke.net/fractals/peterdejong/: (1.641, 1.902, 0.316, 1.525); (0.970, −1.899, 1.381, −1.506); (1.4, −2.3, 2.4, −2.1); (2.01, −2.53, 1.61, −0.33) — de Jong's "chicken legs"; (−2.7, −0.09, −0.86, −2.2); (−0.827, −1.637, 1.659, −0.943); (−2.24, 0.43, −0.65, −2.43); (−2, −2, −1.2, 2); (−0.709, 1.638, 0.452, 1.740).
- **Rendering technique (this is the whole trick):** do **not** draw points directly. Accumulate a 2D occupancy histogram — increment a `Float32Array` grid cell per hit over ~1–5M iterations — then map density→color through `ramp()` with a log or gamma curve. This is Bourke's own method and is what produces the smooth glowing gradients; naive point-plotting looks grainy.
- **Sliders:** a, b, c, d (each −3 to 3, step 0.001), iteration count, gamma.
- **Tech:** Canvas 2D via `createImageData/putImageData` — **reuses the Julia set's per-pixel buffer**, accumulating instead of escape-time counting.
- **Difficulty:** easy win. **Static. Fills the chaos/attractor gap.**
- **Reference:** Paul Bourke "Peter de Jong Attractors."
- **House conventions:** Slider, `ramp()` color, Piece card.

**B2. Clifford attractor** — *Sibling of De Jong; smoother "fractal dream" rings and swirls.*
- **Math:** x_{n+1} = sin(a·y_n) + c·cos(a·x_n), y_{n+1} = sin(b·x_n) + d·cos(b·y_n).
- **Canonical Paul Bourke presets (a, b, c, d),** from paulbourke.net/fractals/clifford/: (−1.4, 1.6, 1.0, 0.7); (1.6, −0.6, −1.2, 1.6); (1.7, 1.7, 0.6, 1.2); (1.5, −1.8, 1.6, 0.9); (−1.7, 1.3, −0.1, −1.2); (−1.7, 1.8, −1.9, −0.4); (−1.8, −2.0, −0.5, −0.9). Keep values roughly within [−2, 2] to stay bounded.
- **Sliders / tech / difficulty:** identical to De Jong — share one engine and swap the map function. Density-histogram render, Canvas 2D ImageData.
- **Reference:** Paul Bourke "Clifford Attractors."
- **Integration note:** Ship **De Jong + Clifford (+ optionally a Svensson variant)** as *one* "Strange Attractors" Piece with a map-selector dropdown, echoing how your cellular automaton exposes Rule 90/30/110/150/182 presets.

**B3. Lorenz attractor (2D projection)** — *The butterfly of chaos theory, integrated and projected.*
- **Math (ODEs):** ẋ = σ(y−x), ẏ = x(ρ−z)−y, ż = xy−βz. Integrate with RK4 (or small-step Euler, dt≈0.01); plot the x–z or y–z projection as a polyline.
- **Presets:** σ=10, ρ=28, β=8/3 (the classic chaotic butterfly). Also σ=13, ρ=21 (settles to a fixed point — ρ<24 converges); σ=15, ρ=35 (wilder). Attractor's fractal dimension ≈ 2.06.
- **Sliders:** σ (0–20), ρ (0–50), β (0–5), integration steps.
- **Tech:** Canvas 2D polyline of the integrated trajectory. Can be **static** (integrate N steps, then draw) or animated as a stretch.
- **Difficulty:** easy win (static). **Static.**
- **Reference:** Wikipedia "Lorenz system" (gives the classic parameters and the RK4 approach); Paul Bourke fractals index.
- **House conventions:** Slider, `var(--accent)` or `ramp()` by time index, Piece card.

**B4. Thomas cyclically-symmetric attractor** — *One-parameter, elegantly symmetric swirling chaos.*
- **Math (ODEs):** ẋ = sin(y) − b·x, ẏ = sin(z) − b·y, ż = sin(x) − b·z. Integrate and project to 2D.
- **Presets:** b=0.19 (classic structured chaos). Bifurcation landmarks (Wikipedia): chaotic onset at b≈0.208186; pitchfork at b=1; Hopf at b≈0.32899 → fixed point above. Use b ∈ [0.1, 0.3].
- **Sliders:** b (0.05–0.5, step 0.005), steps.
- **Tech:** Canvas 2D projected polyline.
- **Difficulty:** easy win. **Static.**
- **Reference:** Wikipedia "Thomas' cyclically symmetric attractor."
- **House conventions:** Slider, `ramp()`, Piece card.

**B5. Logistic map + bifurcation diagram** — *Sweep the growth rate and watch period-doubling cascade into chaos. Pairs intellectually with your Rule 30.*
- **Math:** x_{n+1} = r·x_n·(1−x_n). For each r across a horizontal sweep, iterate ~1000 times, discard the first ~100–500 transient values, and plot the remaining visited x-values as dots.
- **Presets / known landmarks:** sweep r ∈ [2.4, 4.0]. First bifurcation (period 1→2) at r=3; period-2→4 at r ≈ 3.449; period-4→8 at r ≈ 3.544; **onset of chaos at r ≈ 3.56995** (OEIS A098587; more precisely r∞ ≈ 3.5699456), the accumulation point of the period-doubling cascade; the prominent **period-3 window** opens near r ≈ 3.8284. The bifurcation-interval ratio converges to **Feigenbaum's first constant δ = 4.669201609102990671853203820466** (Mitchell Feigenbaum, discovered 1975, published 1978). Bonus link: the substitution c = r/2 − r²/4 maps the logistic map onto the real slice of the Mandelbrot set.
- **Sliders:** r_min, r_max (to zoom the sweep), iterations, transient-discard count, x₀.
- **Tech:** Canvas 2D, one pixel/dot per (r, x) — reuses the Julia per-pixel buffer idea.
- **Difficulty:** easy win. **Static. Fills a chaos-diagram gap.**
- **Reference:** Wikipedia "Logistic map" / "Bifurcation diagram"; Wolfram MathWorld "Feigenbaum Constant"; Strogatz, *Nonlinear Dynamics and Chaos* (1994); johndcook.com "Logistic bifurcation diagram in detail."
- **House conventions:** Slider, `ramp()` by density, Piece card.

**B6. Barnsley fern / chaos game (IFS)** — *Random iteration of affine maps grows a fern (or Sierpinski triangle).* **(Top pick.)**
- **Math:** pick one of 4 affine maps f(x,y) = (a·x + b·y + e, c·x + d·y + f) by probability, iterate from (0,0), plot each point. **Barnsley fern (a, b, c, d, e, f | p):** (0, 0, 0, 0.16, 0, 0 | 0.01) stem; (0.85, 0.04, −0.04, 0.85, 0, 1.6 | 0.85); (0.20, −0.26, 0.23, 0.22, 0, 1.6 | 0.07); (−0.15, 0.28, 0.26, 0.24, 0, 0.44 | 0.07).
- **Chaos-game variant:** N vertices + a "jump fraction." A triangle with jump fraction 1/2 → the Sierpinski triangle; other fractions, vertex counts, and jump restrictions give other gaskets. Perturbing the fern coefficients gives "mutant" ferns and trees.
- **Sliders:** preset selector (fern / Sierpinski / mutant fern), point count (50k–200k), jump fraction, vertex count.
- **Tech:** Canvas 2D point plotting (`arc()` or 1px `fillRect` per point) — **reuses the phyllotaxis per-dot loop.**
- **Difficulty:** easy win. **Static. Fills the IFS/random-iteration gap; connects to your Sierpinski-via-Rule-90.**
- **Reference:** Wikipedia "Barnsley fern" (exact coefficient table); Michael Barnsley, *Fractals Everywhere* (1988); The Coding Train chaos-game videos.
- **House conventions:** Slider, `var(--accent)`/`ramp()`, Piece card.

**B7. Double pendulum** — *SHOWPIECE CANDIDATE (animated). Two coupled rods; the textbook of sensitive dependence.*
- **Math (angular accelerations from the Lagrangian; masses m₁,m₂, lengths l₁,l₂, gravity g; angles θ₁,θ₂, angular velocities ω₁,ω₂):**
  θ₁″ = [−g(2m₁+m₂)sin θ₁ − m₂g·sin(θ₁−2θ₂) − 2sin(θ₁−θ₂)·m₂(ω₂²l₂ + ω₁²l₁cos(θ₁−θ₂))] / [l₁(2m₁+m₂ − m₂cos(2θ₁−2θ₂))], with the symmetric companion expression for θ₂″. Integrate with RK4, dt ≈ 0.005–0.01.
- **Presets:** m₁=m₂=1, l₁=l₂=1, g=9.8; start θ₁=θ₂=π/2 (gentle) or near π (maximum chaos). Show 1–3 near-identical copies to dramatize exponential divergence; trace the lower bob's path.
- **Sliders:** m₁, m₂, l₁, l₂, g, initial θ₁, θ₂, trail length.
- **Tech:** Canvas 2D, `requestAnimationFrame` loop.
- **Difficulty:** **showpiece** (the lighter of the two). **Animated** — needs manual `prefers-reduced-motion` gating + IntersectionObserver offscreen-pause.
- **Reference:** scipython.com "The double pendulum" (full Lagrangian derivation + code); Physics LibreTexts §17.5; myPhysicsLab double pendulum.
- **House conventions:** Slider, `var(--accent)` rods + `ramp()` trail, Piece card, plus the new animation-gating pattern.

**B8. Mandelbrot set — shallow (Canvas 2D reuse)** — *The canonical fractal, a ~20-line reuse of your Julia code.* **(Top pick.)**
- **Math:** iterate z_{n+1} = z_n² + c with z₀=0 and c = the pixel's complex coordinate; escape-time count. (Your Julia set fixes c and varies z₀; Mandelbrot fixes z₀=0 and varies c — the *only* change.)
- **Smooth coloring (upgrade your Julia too):** instead of an integer iteration count, use the normalized/continuous count ν = n + 1 − log₂(log₂|z_n|), with a bailout radius ≥ 2 (a larger bailout such as 2⁸ looks smoother), mapped through `ramp()`. This kills the color banding your escape-time Julia currently shows.
- **Presets:** home view center (−0.5, 0), width ≈ 3; named zoom targets — Seahorse Valley (−0.75, 0.1), Elephant Valley (0.275, 0), Triple Spiral (−0.088, 0.654).
- **The linking trick (high value, low cost):** click a point in the Mandelbrot → set that c as the parameter for your existing Julia set piece. This ties two gallery pieces together and teaches the Mandelbrot↔Julia relationship.
- **Sliders:** max iterations, center x/y, zoom, color offset.
- **Tech:** Canvas 2D `createImageData/putImageData` — **direct reuse of the Julia escape-time code.**
- **Difficulty:** easy win. **Static.**
- **Reference:** Inigo Quilez "smooth iteration count" (iquilezles.org/articles/msetsmooth/); Wikibooks "Fractals/color mandelbrot" (normalized iteration count derivation).
- **House conventions:** Slider, `ramp()` color, Piece card.

**B9. Mandelbrot deep-zoom — WebGL** — *SHOWPIECE. GPU per-pixel iteration for smooth, real-time zoom.*
- **Math:** same z²+c escape-time + smooth coloring (Quilez), but the per-pixel loop runs in a GLSL fragment shader for massive parallelism.
- **Precision caveat (scope this carefully):** native WebGL uses 32-bit floats and goes "mushy" past roughly 10⁶–10⁷ zoom. Going deeper needs 64-bit emulation. Two documented routes: **double-float emulation** (split each value into hi/lo 32-bit parts — reaches ~10¹⁴ at 4–8× cost) or **perturbation theory** (compute one high-precision reference orbit via a bignum/WASM library, then each pixel as a float-precision delta — used by deep zoomers past 10¹³, the same technique as Kalles Fraktaler). **For a club piece, ship single precision first** (still gorgeous to ~10⁵) and document double-float/perturbation as a later upgrade.
- **Presets:** same named zoom targets as B8.
- **Sliders:** max iterations, zoom, pan (or click/scroll to navigate), palette offset.
- **Tech:** **WebGL** — client-side only, fully compatible with your static export; just new to the repo. Build a reusable WebGL-canvas wrapper here that Gray-Scott (D3) can share.
- **Difficulty:** **showpiece.** Static per frame (recompute on pan/zoom); optionally add a rAF loop *only* for palette-cycling.
- **Reference:** Inigo Quilez msetsmooth + Shadertoy "Mandelbrot – smooth" (ID 4df3Rn); Ambrose Cavalier "WebGL Mandelbrot Deep Zoom" (perturbation write-up, cites K. I. Martin's "Superfractalthing Maths"); gpfault.net "Rendering the Mandelbrot Set With WebGL" (a clean starter shader).
- **House conventions:** Piece card + Slider; establishes the reusable WebGL wrapper.

---

### FAMILY C — Tilings, Packing & Geometry
*Canvas/SVG, mostly easy, static.*

**C1. Truchet tiles** — *Dead-simple tiles with random orientation; mazes and meandering loops emerge.* **(Top pick.)**
- **Algorithm:** a grid of square tiles; each tile drawn in one of 2 (Smith arc variant) or 4 (original diagonal) orientations, chosen randomly or by rule. Smith arc tiles = two quarter-circle arcs; random placement yields flowing, mostly-closed loops of near-constant width.
- **Presets:** "Smith arcs, random"; "diagonal, random"; rule-based (e.g. encode the binary digits of √2 to embed a message); multi-scale nesting.
- **Sliders:** grid size / tile count, tile type (arc / diagonal / triangle), random seed, line weight.
- **Tech:** Canvas 2D (`arc()`/`lineTo` per tile) or SVG.
- **Difficulty:** easy win. **Static. Fills the tiling gap.**
- **Reference:** Cyril Stanley Smith, "The Tiling Patterns of Sébastien Truchet…" *Leonardo* 20(4), 1987; Kerry Mitchell "Generalizations of Truchet Tiles" (Bridges 2020); Observable @osteele "truchet-tile-generation."
- **House conventions:** Slider, `var(--accent)` strokes, Piece card.

**C2. Voronoi / Delaunay (draggable points)** — *Partition the plane into nearest-neighbor cells; interactive.*
- **Math:** the Voronoi diagram (each cell = the region closest to its seed) is the dual of the Delaunay triangulation. Use **d3-delaunay:** `d3.Delaunay.from(points).voronoi([xmin, ymin, xmax, ymax])`.
- **Presets:** random seeds; blue-noise seeds; Lloyd's-relaxation-smoothed (move each seed to its cell centroid and call `voronoi.update()` a few times).
- **Interaction:** this one is *drag-based* rather than slider-based — drag seed points; add a slider for point count and Lloyd iterations. (Introduces a drag-interaction pattern but still **no rAF**.)
- **Tech:** Canvas 2D or SVG via d3-delaunay's `render`/`renderCell` methods.
- **Difficulty:** easy win. **Static** (recompute on drag).
- **Reference:** d3-delaunay docs (d3js.org/d3-delaunay); Observable @d3/hover-voronoi and @d3/circle-dragging-iii (Mike Bostock).
- **House conventions:** Slider (count), `ramp()` cell fills, Piece card.

**C3. Circle packing / Apollonian gasket** — *Recursively fill gaps with mutually tangent circles.*
- **Math:** Apollonian gasket via **Descartes' Circle Theorem** — for three mutually tangent circles with curvatures k₁,k₂,k₃, the fourth satisfies k₄ = k₁+k₂+k₃ ± 2√(k₁k₂ + k₂k₃ + k₃k₁); recurse into each gap. Simpler alternative: greedy random packing (place the largest non-overlapping circle repeatedly).
- **Presets:** starting curvatures (−1, 2, 2, 3) for the classic gasket bounded by an outer circle; random greedy pack; bounded-in-circle.
- **Sliders:** recursion depth / circle count, minimum radius.
- **Tech:** SVG `<circle>` per circle, or Canvas `arc()`. The recursion echoes your fractal tree.
- **Difficulty:** easy win (random pack) to moderate (true Apollonian). **Static.**
- **Reference:** Wikipedia "Apollonian gasket" / "Descartes' theorem"; Paul Bourke circle-packing pages.
- **House conventions:** Slider, `ramp()` by radius/curvature, `var(--accent)`, Piece card.

**C4. L-systems (turtle graphics)** — *One rewrite engine drives Koch, dragon, Sierpinski arrowhead, and plants — generalizes your fractal tree.* **(Top pick.)**
- **Math:** an axiom string + production rules applied in parallel n times, then interpreted with a turtle (F = draw forward, +/− = turn ±angle, [ ] = push/pop position+heading). Canonical rules:
  - **Koch curve:** axiom `F`, rule `F → F+F−−F+F`, angle 60°.
  - **Sierpinski arrowhead:** axiom `A`, rules `A → B−A−B`, `B → A+B+A`, angle 60°.
  - **Heighway dragon:** axiom `FX`, rules `X → X+YF+`, `Y → −FX−Y`, angle 90°.
  - **Fractal plant:** axiom `X`, rules `X → F+[[X]−X]−F[−FX]+X`, `F → FF`, angle 25°.
- **Sliders:** rule/preset selector, iteration depth, angle (fine-tune), length scale.
- **Tech:** SVG path or Canvas `lineTo`. Generalizes your existing fractal-tree recursion.
- **Difficulty:** easy win. **Static.**
- **Reference:** Wikipedia "L-system" (rule tables above are quoted from it); Prusinkiewicz & Lindenmayer, *The Algorithmic Beauty of Plants* (algorithmicbotany.org); The Coding Train L-system videos.
- **House conventions:** Slider, `var(--accent)` stroke, Piece card — a rule-preset dropdown mirrors your cellular-automaton rule selector.

**C5. Penrose / aperiodic tiling** — *Non-repeating fivefold-symmetric tiling.* **(Stretch — harder.)**
- **Math:** P3 rhombus tiling via deflation/subdivision of thick + thin rhombs, or de Bruijn's pentagrid construction.
- **Difficulty:** moderate/hard. **Static.** Include only if a strong member wants it.
- **Reference:** Wikipedia "Penrose tiling"; Jason Davies' Penrose-tiling explorer.

---

### FAMILY D — Waves, Fields & Simulation

**D1. Chladni plate nodal patterns** — *Standing-wave nodal lines; where the sand settles.*
- **Math (Paul Bourke's square-plate, center-constrained model):** plot the zero set of f(x,y) = cos(nπx/L)·cos(mπy/L) − cos(mπx/L)·cos(nπy/L). Grains gather on nodal lines where |f| ≈ 0. The pattern is trivial when n=m and symmetric under swapping (n,m).
- **Presets:** integer (n,m) pairs 1–8, e.g. (1,2), (2,3), (3,5), (4,7), (5,8); higher modes → denser, near-fractal patterns.
- **Sliders:** n (1–12, step 1), m (1–12, step 1), threshold width.
- **Tech:** Canvas 2D per-pixel — color by |f| through `ramp()`, or threshold to draw the nodal lines. **Reuses the Julia ImageData loop.**
- **Difficulty:** easy win. **Static. Fills the wave-physics gap.**
- **Reference:** Paul Bourke "Chladni plate" (2003), as reproduced at dynamicmath.xyz "Chladni patterns."
- **House conventions:** Slider, `ramp()` color, Piece card.

**D2. 2D wave interference / ripple tank** — *Two point sources; interference fringes.*
- **Math:** amplitude(x,y) = Σᵢ A·sin(k·rᵢ − φᵢ) (optionally ×1/rᵢ for falloff), where rᵢ = distance to source i and k = 2π/λ. Color by amplitude with a diverging palette (±).
- **Presets:** two sources, varying separation and wavelength; classic double-slit-like fringes at separation ≈ several λ.
- **Sliders:** source separation, wavelength λ, number of sources, phase.
- **Tech:** Canvas 2D per-pixel ImageData — reuses the Julia loop.
- **Difficulty:** easy win. **Static** (or animate the phase as a stretch).
- **Reference:** standard wave-superposition; Paul Bourke interference notes.
- **House conventions:** Slider, `ramp()` (diverging palette for ±amplitude), Piece card.

**D3. Gray-Scott reaction-diffusion** — *SHOWPIECE (recommended live-motion piece). Turing patterns grow, breathe, and self-replicate.* 
- **Math (two coupled PDEs; u,v = concentrations of chemicals U,V):** ∂u/∂t = Dᵤ·∇²u − uv² + F(1−u); ∂v/∂t = D_v·∇²v + uv² − (F+k)v. Discretize on a grid; compute ∇² with a 3×3 Laplacian; step with explicit Euler. **Karl Sims' canonical values:** Dᵤ=1.0, D_v=0.5 (D_v is half of Dᵤ), F=0.055, k=0.062, Δt=1.0, with the Laplacian as a 3×3 convolution (center weight −1, edge-adjacent 0.2, diagonals 0.05). Seed with u=1, v=0 everywhere plus a small central patch of v and a little noise to break symmetry.
- **Feed/kill presets (F, k):** **coral growth (0.0545, 0.062)** and **"mitosis" (0.0367, 0.0649)** are Karl Sims' two named examples verbatim; his interactive map sweeps F from 0.01→0.1 and k from 0.045→0.07. Other widely-used regimes (Pearson 1993 and common implementations): worms (0.058, 0.065), spots (0.03, 0.062), maze (0.029, 0.057), gliders (0.014, 0.054), spirals (0.018, 0.051). Most (F,k) pairs die out, so presets are essential.
- **Sliders:** F (0.01–0.07, step 0.001), k (0.045–0.07, step 0.001), Dᵤ, D_v, a paint-brush to seed V, speed (sim steps/frame).
- **Tech:** Canvas 2D ImageData with two double-buffered `Float32Array` grids — CPU is fine at ~200×200; or WebGL ping-pong for larger/faster (reuses the B9 WebGL wrapper). **Animated:** rAF loop running several sim steps per frame.
- **Difficulty:** **showpiece. Animated** — needs manual `prefers-reduced-motion` gating + IntersectionObserver offscreen-pause. **Conceptually extends your cellular automaton into continuous space.**
- **Reference:** Karl Sims "Reaction-Diffusion Tutorial" (karlsims.com/rd.html) — canonical parameters and the coral/mitosis presets; John E. Pearson (1993) "Complex Patterns in a Simple System," *Science*, for the regime map; The Coding Train "Reaction-Diffusion" (Coding Challenge 13).
- **House conventions:** Slider + preset dropdown, `ramp()` color, Piece card, plus the animation-gating pattern (shared with the double pendulum).

**D4. Boids / flocking** — *Emergent flocking from three local rules.* **(Animated; lower priority.)**
- **Math:** each agent steers by Separation + Alignment + Cohesion within a neighborhood radius; update velocity and position each frame.
- **Presets:** tune the three rule weights + perception radius + max speed.
- **Tech:** Canvas 2D, rAF loop.
- **Difficulty:** moderate; **animated** (gating + offscreen pause). Lower priority than Gray-Scott.
- **Reference:** Craig Reynolds, "Flocks, Herds, and Schools: A Distributed Behavioral Model," SIGGRAPH '87, *Computer Graphics* 21(4):25–34; Daniel Shiffman, *The Nature of Code*, ch. 5.
- **House conventions:** Slider, `var(--accent)` agents, Piece card, animation gating.

---

### FAMILY E — Number Theory & Discrete
*Canvas 2D grids, easy, static.*

**E1. Ulam spiral of primes** — *Spiral the integers outward; mark primes; diagonal lines appear.*
- **Math:** walk the integers 1, 2, 3, … in an outward square spiral on a grid; color a cell if its number is prime. Prime-rich diagonals correspond to prime-generating quadratics (e.g. Euler's n²+n+41).
- **Presets:** grid sizes 101×101, 201×201; start-value offset (start at 41 to highlight Euler's polynomial diagonal).
- **Sliders:** grid size, start number, dot size.
- **Tech:** Canvas 2D `fillRect` per cell — **direct reuse of the cellular automaton's grid renderer.**
- **Difficulty:** easy win. **Static. Fills the number-theory gap.**
- **Reference:** Wikipedia "Ulam spiral"; Stanisław Ulam (1963).
- **House conventions:** Slider, `var(--accent)` dots, Piece card.

**E2. Pascal's triangle mod n** — *Color binomial coefficients by residue; Sierpinski and kaleidoscopes emerge. Ties directly back to your CA hero.* **(Top pick.)**
- **Math:** compute C(i,j) mod p and color each cell by its residue. To avoid big-integer overflow, build the triangle with the additive Pascal recurrence taken mod p, or use **Lucas' theorem**. mod 2 → the Sierpinski triangle; other moduli → richer nested patterns.
- **Presets:** mod 2 (Sierpinski), mod 3, mod 5, mod 6, mod 7; 128–512 rows.
- **Sliders:** modulus (2–16, step 1), number of rows.
- **Tech:** Canvas 2D `fillRect` per cell — reuses the CA grid. **Directly connects to your cellular-automaton hero: Rule 90 = Sierpinski = Pascal mod 2.**
- **Difficulty:** easy win. **Static.**
- **Reference:** Wikipedia "Pascal's triangle" (patterns/Lucas' theorem); Wolfram MathWorld "Pascal's Triangle."
- **House conventions:** Slider, `ramp()` by residue, Piece card.

**E3. Collatz paths / tree** — *The 3n+1 problem drawn as bending directed paths or an inverse tree.*
- **Math:** the sequence n → n/2 (even) or 3n+1 (odd) until 1. Visual (Numberphile / Coding Train style): draw each starting number's sequence as a path where every even step rotates the line slightly one way and every odd step the other; overlay thousands of sequences → an organic coral/branch structure. Alternative: draw the inverse tree growing from 1.
- **Presets:** number of sequences (1000–20000), even-angle & odd-angle (e.g. even +6°, odd −8°), segment length.
- **Sliders:** count, even angle, odd angle, segment length, line alpha.
- **Tech:** SVG or Canvas polylines — reuses fractal-tree/harmonograph path drawing.
- **Difficulty:** easy win. **Static. Fills the number-theory gap.**
- **Reference:** The Coding Train "Collatz Conjecture" coding challenge; Wikipedia "Collatz conjecture."
- **House conventions:** Slider, `var(--accent)` at low alpha, Piece card.

**E4. Recamán's sequence (arcs)** — *A jumpy integer sequence drawn as alternating semicircle arcs.*
- **Math:** a(0)=0; a(n) = a(n−1)−n if that value is positive and not already used, else a(n−1)+n. Connect consecutive terms on a number line with semicircle arcs, alternating above/below.
- **Presets:** first 62 terms (the Numberphile view); first 200; circular/octagonal layout variants.
- **Sliders:** number of terms, arc style, orientation.
- **Tech:** SVG arcs (path `A` command) or Canvas `arc()`.
- **Difficulty:** easy win. **Static.**
- **Reference:** Numberphile "Recamán" video; johndcook.com Recamán post (has the arc-drawing code); OEIS A005132.
- **House conventions:** Slider, `var(--accent)`/`ramp()` by index, Piece card.

**E5. Stern-Brocot / Farey / Ford circles** — *The rationals, organized as a tree or on a circle.*
- **Math:** Stern-Brocot / Farey sequence via the mediant (a/b, c/d → (a+c)/(b+d)). **Ford circles:** for each reduced fraction p/q, draw a circle of radius 1/(2q²) tangent to the x-axis at p/q — all Ford circles are mutually tangent or non-crossing.
- **Presets:** Farey order F_n for n = 5…12; Ford circles up to denominator q ≤ 20.
- **Sliders:** depth / maximum denominator.
- **Tech:** SVG circles + lines.
- **Difficulty:** easy win (Ford circles) to moderate (full tree). **Static.**
- **Reference:** Wikipedia "Stern–Brocot tree" / "Ford circles" / "Farey sequence."
- **House conventions:** Slider, `var(--accent)`, Piece card.

---

## Recommendations

### Stage 1 — farm out these 8 easy wins first
Chosen to maximize variety vs. the existing six, visual impact, and code simplicity. Each is one afternoon, ownable by one member.

1. **Times-Tables modular circle (A5)** — highest wow-to-code ratio; opens the number-theory family; trivial line drawing.
2. **Strange Attractors: De Jong + Clifford (B1+B2, one piece)** — opens the chaos family; reuses the Julia ImageData buffer; canonical Bourke presets are listed above.
3. **Mandelbrot shallow + Julia link (B8)** — a ~20-line reuse of the Julia code, plus the click-to-set-*c* cross-link that ties two gallery pieces together; also upgrades your Julia to smooth iteration-count coloring.
4. **Barnsley fern / chaos game (B6)** — opens the IFS family; reuses the phyllotaxis dot loop; exact coefficients above.
5. **Truchet tiles (C1)** — opens the tiling family; dead-simple code; big aesthetic payoff.
6. **Logistic bifurcation (B5)** — a chaos *diagram* that pairs intellectually with your Rule 30; per-pixel plot.
7. **L-systems engine (C4)** — generalizes your fractal tree into a whole preset family (Koch/dragon/arrowhead/plant) from one engine.
8. **Pascal's triangle mod n (E2)** — ties straight back to your CA hero (Rule 90 ↔ Sierpinski ↔ Pascal mod 2); reuses the `fillRect` grid.

**Runners-up to assign next:** Lissajous (A1), Spirograph (A2), Chladni (D1), Ulam spiral (E1), Collatz (E3), Voronoi drag (C2), Superformula (A3).

### Stage 2 — build the two showpieces
- **WebGL Mandelbrot deep-zoom (B9) — do this first of the two.** Ship single precision (beautiful to ~10⁵ zoom) and build the reusable WebGL-canvas wrapper; document double-float/perturbation as a later deep-zoom upgrade. *Justification:* introduces WebGL as a durable new capability, and the Gray-Scott showpiece can reuse the same GPU wrapper.
- **Gray-Scott reaction-diffusion (D3) — the recommended live-motion piece over the double pendulum.** *Justification:* it conceptually extends your existing cellular automaton, offers far more sustained and varied visual payoff (coral, mitosis, worms, spots, mazes via presets), and its rAF loop + `prefers-reduced-motion` gating + IntersectionObserver pause becomes the reusable template for every future animated piece. **Keep the double pendulum (B7) as the backup** — it's the lighter-weight way to introduce the exact same animation-gating pattern if a member is passionate about physics.

### Benchmarks that would change these picks
- If WebGL proves painful in the static-export build (unlikely — it's client-only), fall back to the shallow Canvas-2D Mandelbrot (B8) as your "fractal upgrade" and promote a second easy win into Stage 2.
- If animation battery/perf on mobile is unacceptable even *with* offscreen-pause, ship Gray-Scott as a "click to run N steps" static grower instead of a continuous loop — still gorgeous, no rAF.
- If members want maximum variety fastest, prioritize the number-theory trio (A5, E1, E2), since that family is entirely absent from the gallery today.

## Caveats
- **Animation is genuinely new here.** Any rAF piece (double pendulum, Gray-Scott, boids, optionally an animated Lorenz) needs *manual* `prefers-reduced-motion` handling — your global CSS that kills CSS animations will **not** stop a canvas rAF loop — plus IntersectionObserver to pause when offscreen. Budget extra time for the two showpieces accordingly.
- **Attractor quality depends on the density-histogram technique,** not naive point plotting: accumulate hits in a float grid over millions of iterations, then map density→color with a log/gamma ramp. Naive plotting looks grainy — a documented pitfall (Bourke's own note, and echoed by multiple implementers).
- **Some preset values are "good-looking suggestions," not universal standards.** The De Jong and Clifford (a,b,c,d) sets are Paul Bourke's canonical *published* values, and the Gray-Scott coral/mitosis pairs are Karl Sims' verbatim values — but the other Gray-Scott regime labels (worms/spots/maze/etc.) come from Pearson and various implementations and differ slightly between sources, and the Spirograph rosette triples beyond the mathematical special cases come from applied/tool sources. Treat all of these as starting points and expose sliders.
- **WebGL deep-zoom depth is precision-limited.** 32-bit floats smear past ~10⁶–10⁷; deeper requires double-float emulation (~10¹⁴) or perturbation theory (>10¹³) — both real, both add significant complexity. Scope the first version to shallow-but-smooth GPU zoom.
- **ODE pieces need a stable integrator.** Use RK4 (or small-step Euler with care) and a fixed dt; large steps blow up. By design, the double pendulum's exact trajectory is not reproducible across machines — that *is* the sensitive-dependence lesson, but note it.
- **Verification honesty:** equations are quoted from primary/canonical sources (Paul Bourke for the attractors; Wikipedia/MathWorld for the curves and logistic map; Karl Sims for Gray-Scott; Inigo Quilez for smooth coloring). A few regime labels and some superformula tuples are from secondary implementations and should be sanity-checked visually on first render.