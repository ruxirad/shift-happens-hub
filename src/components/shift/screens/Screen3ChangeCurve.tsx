import { useState } from "react";
import { ScreenShell, EyebrowLabel } from "../ScreenShell";
import { FacilitatorNote } from "../FacilitatorNote";
import { STAGES, type Stage } from "../ShiftHappensApp";

const DESCRIPTORS: Record<Stage, string> = {
  Shock: "'Wait, what just happened?'",
  Denial: "'This won't really affect us.'",
  Frustration: "'Why are we doing this?'",
  Depression: "'I'm not sure this is worth it.'",
  Experimentation: "'Maybe I'll try it this way.'",
  Decision: "'Okay, this could actually work.'",
  Integration: "'This is just how we work now.'",
};

// Plot 7 points along a U-shaped curve. Width 800, height 280.
const POINTS = STAGES.map((stage, i) => {
  const x = 60 + (i * (800 - 120)) / 6;
  // U-curve: low point at index 3
  const t = (i - 3) / 3; // -1 .. 1
  const y = 60 + (1 - t * t) * 0; // placeholder
  const yCurve = 60 + (1 - (1 - Math.abs(t)) * (1 - Math.abs(t))) * 0;
  void yCurve;
  // proper U: y high (small) at ends, large (low on screen) at middle
  const yU = 70 + (1 - t * t) * 160; // 70 at ends, 230 at middle
  return { stage, x, y: yU };
});

export function Screen3ChangeCurve({
  votes,
  onVote,
}: {
  votes: Record<Stage, number>;
  onVote: (s: Stage) => void;
}) {
  const [hover, setHover] = useState<Stage | null>(null);
  const max = Math.max(1, ...Object.values(votes));
  const total = Object.values(votes).reduce((a, b) => a + b, 0);

  const pathD =
    `M ${POINTS[0].x} ${POINTS[0].y} ` +
    POINTS.slice(1)
      .map((p, i) => {
        const prev = POINTS[i];
        const cx = (prev.x + p.x) / 2;
        return `Q ${cx} ${prev.y}, ${cx} ${(prev.y + p.y) / 2} T ${p.x} ${p.y}`;
      })
      .join(" ");

  return (
    <ScreenShell>
      <EyebrowLabel>The Change Curve · 0:08–0:13</EyebrowLabel>
      <h2 className="font-serif text-4xl md:text-5xl font-semibold leading-tight">
        Where are you on the curve?
      </h2>

      <div className="mt-10 rounded-lg bg-card border border-border p-4 md:p-8 overflow-hidden">
        <svg viewBox="0 0 800 300" className="w-full h-auto">
          <path
            d={pathD}
            fill="none"
            stroke="oklch(0.58 0.14 255)"
            strokeWidth="1.5"
            opacity="0.6"
          />
          {POINTS.map((p) => {
            const isHover = hover === p.stage;
            return (
              <g
                key={p.stage}
                onMouseEnter={() => setHover(p.stage)}
                onMouseLeave={() => setHover(null)}
                onClick={() => setHover(p.stage)}
                className="cursor-pointer"
              >
                <circle
                  cx={p.x}
                  cy={p.y}
                  r={isHover ? 8 : 5}
                  fill={isHover ? "oklch(0.58 0.14 255)" : "oklch(0.98 0.005 250)"}
                  className="transition-all"
                />
                <text
                  x={p.x}
                  y={p.y < 150 ? p.y - 16 : p.y + 24}
                  textAnchor="middle"
                  fontSize="11"
                  fill="oklch(0.72 0.05 255)"
                  className="font-sans select-none"
                >
                  {p.stage}
                </text>
              </g>
            );
          })}
        </svg>
        <div className="h-6 mt-2 text-sm text-foreground/90 font-serif italic text-center">
          {hover ? `${hover} — ${DESCRIPTORS[hover]}` : "Hover or tap a stage"}
        </div>
      </div>

      <div className="mt-12">
        <p className="font-serif text-xl md:text-2xl text-foreground">
          Which stage are you in right now with a current change?
        </p>
        <div className="mt-5 grid grid-cols-2 md:grid-cols-4 gap-2">
          {STAGES.map((s) => (
            <button
              key={s}
              onClick={() => onVote(s)}
              className="px-3 py-3 text-sm rounded-md border border-border bg-card hover:bg-surface-2 hover:border-primary/60 transition-all"
            >
              {s}
            </button>
          ))}
        </div>

        <div className="mt-8 space-y-2">
          {STAGES.map((s) => {
            const v = votes[s];
            const pct = (v / max) * 100;
            return (
              <div key={s} className="flex items-center gap-3 text-xs">
                <div className="w-24 text-muted-foreground">{s}</div>
                <div className="flex-1 h-2 rounded-full bg-border overflow-hidden">
                  <div
                    className="h-full bg-primary transition-all duration-500"
                    style={{ width: `${pct}%` }}
                  />
                </div>
                <div className="w-6 text-right tabular-nums text-muted-foreground">
                  {v}
                </div>
              </div>
            );
          })}
        </div>
        <div className="mt-3 text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
          {total} {total === 1 ? "vote" : "votes"}
        </div>
      </div>

      <FacilitatorNote>
        Invite 2–3 people to share why. Normalize wherever they land.
      </FacilitatorNote>
    </ScreenShell>
  );
}
