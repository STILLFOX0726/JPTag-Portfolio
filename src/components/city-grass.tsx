// Decorative hero backdrop: a city skyline with slowly twinkling windows and swaying grass.
// Shapes come from a seeded PRNG so server and client render identical markup.

const W = 800;
const H = 400;
const GROUND = 360;

function rng(seed: number) {
  return () => {
    seed = (seed * 1664525 + 1013904223) % 4294967296;
    return seed / 4294967296;
  };
}

type Building = { x: number; w: number; h: number };
type Light = { x: number; y: number; dur: number; delay: number };

function skyline(seed: number, minH: number, maxH: number) {
  const r = rng(seed);
  const buildings: Building[] = [];
  for (let x = 0; x < W;) {
    const w = 34 + r() * 46;
    buildings.push({ x, w, h: minH + r() * (maxH - minH) });
    x += w + 4 + r() * 10;
  }
  return buildings;
}

const far = skyline(7, 70, 170);
const near = skyline(23, 40, 115);

const lights: Light[] = (() => {
  const r = rng(91);
  const out: Light[] = [];
  for (const b of near) {
    for (let y = GROUND - b.h + 12; y < GROUND - 14; y += 16) {
      for (let x = b.x + 7; x < b.x + b.w - 9; x += 12) {
        if (r() < 0.22) out.push({ x, y, dur: 7 + r() * 9, delay: -r() * 16 });
      }
    }
  }
  return out;
})();

const grass: string[][] = (() => {
  const r = rng(5);
  // Four clumps so each can sway on its own slow rhythm.
  const groups: string[][] = [[], [], [], []];
  for (let x = -6; x < W + 6; x += 5) {
    const h = 18 + r() * 34;
    const lean = (r() - 0.5) * 18;
    const base = H + 2;
    groups[Math.floor(r() * 4)]!.push(
      `M${x - 2.5} ${base} Q${x + lean * 0.4} ${base - h * 0.6} ${x + lean} ${base - h} Q${x + lean * 0.3 + 1} ${base - h * 0.55} ${x + 2.5} ${base}Z`,
    );
  }
  return groups;
})();

export function CityGrass({ className }: { className?: string }) {
  return (
    <div className={`city-grass ${className ?? ""}`} aria-hidden="true">
      <svg viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="xMaxYMax meet">
        <g className="cg-far">
          {far.map((b, i) => (
            <rect key={i} x={b.x} y={GROUND - b.h} width={b.w} height={b.h + 40} rx={2} />
          ))}
        </g>
        <g className="cg-near">
          {near.map((b, i) => (
            <rect key={i} x={b.x} y={GROUND - b.h} width={b.w} height={b.h + 40} rx={2} />
          ))}
        </g>
        <g className="cg-lights">
          {lights.map((l, i) => (
            <rect
              key={i}
              x={l.x}
              y={l.y}
              width={5}
              height={7}
              rx={1}
              style={{ animationDuration: `${l.dur}s`, animationDelay: `${l.delay}s` }}
            />
          ))}
        </g>
        {grass.map((blades, i) => (
          <g key={i} className={`cg-grass cg-grass--${i}`}>
            {blades.map((d, j) => (
              <path key={j} d={d} />
            ))}
          </g>
        ))}
      </svg>
    </div>
  );
}
